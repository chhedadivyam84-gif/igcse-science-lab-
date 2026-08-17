import 'server-only';

import {
  AiRequestError,
  type AiProvider,
  type CompletionRequest,
  type ImageRequest,
} from './provider';

/**
 * Google Gemini provider.
 *
 * Uses the REST API over plain fetch rather than the SDK — the surface we need
 * is small, and it keeps the dependency tree (and install time) down.
 */

const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Gemini 3.x models spend "thinking" tokens before answering, and those count
 * against maxOutputTokens. It cannot be switched off on the flash tier
 * (thinkingBudget: 0 is rejected; thinkingLevel: "low" still spent 289 on a
 * one-sentence reply). Measured usage on the structured prompts here reached
 * ~2000, so the caller's budget is treated as the budget for the *answer* and
 * this headroom is added on top. Set generously: running out mid-object
 * truncates the JSON and fails schema validation.
 */
const THINKING_HEADROOM = 4096;

/** Gemini returns 503 under load fairly readily; a short retry absorbs it. */
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_ATTEMPTS = 3;

type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };
type GeminiContent = { role: 'user' | 'model'; parts: GeminiPart[] };

type GeminiResponse = {
  candidates?: {
    content?: { parts?: { text?: string; thought?: boolean }[] };
    finishReason?: string;
  }[];
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string };
};

export class GoogleProvider implements AiProvider {
  readonly id = 'google';
  readonly model: string;

  constructor(
    private readonly apiKey: string,
    model: string,
  ) {
    this.model = model;
  }

  private endpoint(method: 'generateContent' | 'streamGenerateContent', stream = false) {
    const query = stream ? '?alt=sse' : '';
    return `${BASE}/${encodeURIComponent(this.model)}:${method}${query}`;
  }

  private body(request: CompletionRequest) {
    return {
      // Gemini calls the assistant role "model".
      contents: request.messages.map<GeminiContent>((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      })),
      systemInstruction: { parts: [{ text: request.system }] },
      generationConfig: {
        maxOutputTokens: (request.maxTokens ?? 2048) + THINKING_HEADROOM,
        temperature: request.temperature ?? 0.4,
        // Native structured output: guarantees well-formed JSON and drops the
        // ```json fences the model otherwise wraps it in.
        ...(request.responseFormat === 'json' ? { responseMimeType: 'application/json' } : {}),
      },
    };
  }

  private async post(url: string, payload: unknown): Promise<Response> {
    let lastError = 'The Google AI request failed.';

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const response = await fetch(url, {
        method: 'POST',
        // The key travels in a header, never in the URL, so it cannot end up in
        // proxy or server access logs.
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.apiKey },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (response?.ok) return response;

      if (!response) {
        lastError = 'Could not reach the Google AI API. Check your network connection.';
      } else {
        let detail = '';
        try {
          detail = ((await response.json()) as GeminiResponse).error?.message ?? '';
        } catch {
          // Body was not JSON; the status code alone will have to do.
        }
        lastError = describe(response.status, detail);

        if (!RETRY_STATUSES.has(response.status)) throw new AiRequestError(lastError);
      }

      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** (attempt - 1)));
      }
    }

    throw new AiRequestError(lastError);
  }

  async complete(request: CompletionRequest): Promise<string> {
    const response = await this.post(this.endpoint('generateContent'), this.body(request));
    const data = (await response.json()) as GeminiResponse;

    if (data.promptFeedback?.blockReason) {
      throw new AiRequestError(
        `Google AI declined to answer that request (${data.promptFeedback.blockReason.toLowerCase()}). Try rephrasing it.`,
      );
    }

    const text = textOf(data);

    // An empty answer with MAX_TOKENS means thinking consumed the whole budget.
    // Say so, rather than handing the UI a blank response.
    if (!text && data.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
      throw new AiRequestError(
        'The model spent its whole output budget reasoning and returned nothing. Try a shorter question, or set AI_MODEL to a lighter model such as gemini-3.1-flash-lite.',
      );
    }

    return text;
  }

  async *stream(request: CompletionRequest): AsyncGenerator<string, void, unknown> {
    const response = await this.post(this.endpoint('streamGenerateContent', true), this.body(request));
    const reader = response.body?.getReader();
    if (!reader) throw new AiRequestError('Google AI returned an empty response.');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // Google terminates SSE frames with CRLFCRLF, so normalise line endings
      // before splitting — matching on "\n\n" alone never fires.
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');

      const frames = buffer.split('\n\n');
      // The last element is an incomplete frame; keep it for the next chunk.
      buffer = frames.pop() ?? '';

      for (const frame of frames) {
        const line = frame.split('\n').find((l) => l.startsWith('data:'));
        if (!line) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;

        try {
          const chunk = textOf(JSON.parse(payload) as GeminiResponse);
          if (chunk) yield chunk;
        } catch {
          // A malformed frame is skipped rather than killing the whole stream.
        }
      }
    }
  }

  async describeImage(request: ImageRequest): Promise<string> {
    const response = await this.post(this.endpoint('generateContent'), {
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: request.image.mediaType, data: request.image.base64 } },
            { text: request.prompt },
          ],
        },
      ],
      systemInstruction: { parts: [{ text: request.system }] },
      generationConfig: { maxOutputTokens: request.maxTokens ?? 1600 },
    });

    return textOf((await response.json()) as GeminiResponse);
  }
}

/** Joins answer text, skipping any reasoning parts the model chooses to expose. */
function textOf(data: GeminiResponse): string {
  return (
    data.candidates?.[0]?.content?.parts
      ?.filter((part) => !part.thought)
      .map((part) => part.text ?? '')
      .join('') ?? ''
  );
}

function describe(status: number, detail: string): string {
  if (status === 400 && /api key not valid/i.test(detail)) {
    return 'The Google AI credential was rejected. Check GOOGLE_API_KEY.';
  }
  if (status === 400) return `Google AI rejected the request${detail ? `: ${detail}` : '.'}`;
  if (status === 401 || status === 403) {
    return 'The Google AI API key was rejected, or it lacks access to this model. Check GOOGLE_API_KEY and AI_MODEL.';
  }
  if (status === 404) {
    // Google retires pinned model versions, so name the alias that keeps working.
    return 'That Google AI model is unavailable or retired. Set AI_MODEL to a current model — "gemini-flash-latest" tracks the newest flash model.';
  }
  if (status === 429) return 'Google AI is rate limiting requests. Try again shortly.';
  if (status === 503) {
    return 'That Google AI model is busy right now. It was retried automatically — try again in a moment, or switch AI_MODEL to a less loaded model.';
  }
  if (status >= 500) return 'Google AI is temporarily unavailable.';
  return `Google AI returned an error (${status}).`;
}
