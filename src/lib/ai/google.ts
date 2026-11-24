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

  private readonly keys: string[];

  /**
   * @param apiKeys one key, or several (e.g. two Google AI Studio projects)
   * @param fallbackModels tried in order when the main model is overloaded or
   *   rate limited on every key; only for text, never for TTS or images.
   */
  constructor(
    apiKeys: string | string[],
    model: string,
    private readonly fallbackModels: string[] = [],
  ) {
    this.keys = [...new Set((Array.isArray(apiKeys) ? apiKeys : [apiKeys]).filter(Boolean))];
    this.model = model;
  }

  private endpoint(model: string, method: 'generateContent' | 'streamGenerateContent', stream = false) {
    const query = stream ? '?alt=sse' : '';
    return `${BASE}/${encodeURIComponent(model)}:${method}${query}`;
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

  /**
   * Sends a request, working around load instead of failing on it:
   *  - each model is tried with every key (a busy or rate-limited key moves
   *    straight on to the next — separate AI Studio projects have separate
   *    quotas);
   *  - if the main model is overloaded on every key, the fallback models are
   *    tried the same way.
   * Errors that another key or model cannot fix (a bad request, content
   * blocked) are thrown at once.
   */
  private async post(
    method: 'generateContent' | 'streamGenerateContent',
    payload: unknown,
    options: { stream?: boolean; fallback?: boolean } = {},
  ): Promise<Response> {
    const models = [this.model, ...(options.fallback === false ? [] : this.fallbackModels.filter((m) => m !== this.model))];
    let lastError = 'The Google AI request failed.';

    for (const [mi, model] of models.entries()) {
      for (const [ki, key] of this.keys.entries()) {
        for (let attempt = 1; attempt <= 2; attempt++) {
          const response = await fetch(this.endpoint(model, method, options.stream), {
            method: 'POST',
            // The key travels in a header, never in the URL, so it cannot end
            // up in proxy or server access logs.
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
            body: JSON.stringify(payload),
          }).catch(() => null);

          if (response?.ok) {
            if (mi > 0 || ki > 0) console.warn(`[ai] answered by ${model} on key ${ki + 1} after the main option was busy`);
            return response;
          }

          if (!response) {
            lastError = 'Could not reach the Google AI API. Check your network connection.';
            break; // network trouble: try the next key/model rather than hammering this one
          }

          let detail = '';
          try {
            detail = ((await response.json()) as GeminiResponse).error?.message ?? '';
          } catch {
            // Body was not JSON; the status code alone will have to do.
          }
          lastError = describe(response.status, detail);

          // A fallback model this account cannot use: skip it.
          if (mi > 0 && (response.status === 404 || response.status === 403)) break;
          // This key is rejected or out of quota: the next key may work.
          if (response.status === 429 || response.status === 401 || response.status === 403) break;
          if (!RETRY_STATUSES.has(response.status)) throw new AiRequestError(lastError);
          if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    throw new AiRequestError(lastError);
  }

  /**
   * Text-to-speech with a Gemini -tts model. Returns a WAV file: Gemini sends
   * raw 24 kHz 16-bit mono PCM, which browsers cannot play without a header.
   */
  async speak(text: string, voice: string, style: string): Promise<Buffer> {
    const response = await this.post('generateContent', {
      contents: [{ role: 'user', parts: [{ text: `${style}\n\n${text}` }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
      },
    }, { fallback: false });
    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { inlineData?: { data?: string; mimeType?: string } }[] } }[];
    };
    const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData;
    if (!part?.data) throw new AiRequestError('Google AI returned no audio.');

    const pcm = Buffer.from(part.data, 'base64');
    const rate = Number(/rate=(\d+)/.exec(part.mimeType ?? '')?.[1] ?? 24000);
    return wav(pcm, rate);
  }

  /** Image generation with a Gemini image ("Nano Banana") model. */
  async draw(prompt: string): Promise<{ mimeType: string; data: string }> {
    const response = await this.post(
      'generateContent',
      { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } },
      { fallback: false },
    );
    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { inlineData?: { data?: string; mimeType?: string } }[] } }[];
    };
    const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData;
    if (!part?.data) throw new AiRequestError('Google AI returned no image.');
    return { mimeType: part.mimeType ?? 'image/png', data: part.data };
  }

  async complete(request: CompletionRequest): Promise<string> {
    const response = await this.post('generateContent', this.body(request));
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
    const response = await this.post('streamGenerateContent', this.body(request), { stream: true });
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
    const response = await this.post('generateContent', {
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
  if (status === 429) return 'Google AI is rate limiting requests on every key. Try again in a minute.';
  if (status === 503) {
    return 'Google AI is very busy right now — every model and key was tried. Please try again in a minute.';
  }
  if (status >= 500) return 'Google AI is temporarily unavailable.';
  return `Google AI returned an error (${status}).`;
}

/** Wrap 16-bit mono PCM in a minimal WAV header. */
function wav(pcm: Buffer, sampleRate: number): Buffer {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}
