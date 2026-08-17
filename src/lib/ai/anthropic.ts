import 'server-only';

import Anthropic from '@anthropic-ai/sdk';
import {
  AiRequestError,
  type AiProvider,
  type CompletionRequest,
  type ImageRequest,
} from './provider';

export class AnthropicProvider implements AiProvider {
  readonly id = 'anthropic';
  readonly model: string;
  private readonly client: Anthropic;

  constructor(apiKey: string, model: string) {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  async complete(request: CompletionRequest): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: request.maxTokens ?? 2048,
        temperature: request.temperature ?? 0.4,
        system: request.system,
        messages: request.messages.map((m) => ({ role: m.role, content: m.content })),
      });

      return response.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map((block) => block.text)
        .join('');
    } catch (error) {
      throw new AiRequestError(describe(error), error);
    }
  }

  async *stream(request: CompletionRequest): AsyncGenerator<string, void, unknown> {
    try {
      const stream = this.client.messages.stream({
        model: this.model,
        max_tokens: request.maxTokens ?? 2048,
        temperature: request.temperature ?? 0.4,
        system: request.system,
        messages: request.messages.map((m) => ({ role: m.role, content: m.content })),
      });

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          yield event.delta.text;
        }
      }
    } catch (error) {
      throw new AiRequestError(describe(error), error);
    }
  }

  async describeImage(request: ImageRequest): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: request.maxTokens ?? 1600,
        system: request.system,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: request.image.mediaType, data: request.image.base64 },
              },
              { type: 'text', text: request.prompt },
            ],
          },
        ],
      });

      return response.content
        .filter((block): block is Anthropic.TextBlock => block.type === 'text')
        .map((block) => block.text)
        .join('');
    } catch (error) {
      throw new AiRequestError(describe(error), error);
    }
  }
}

function describe(error: unknown): string {
  if (error instanceof Anthropic.APIError) {
    if (error.status === 401) return 'The AI API key was rejected. Check ANTHROPIC_API_KEY in .env.';
    if (error.status === 429) return 'The AI provider is rate limiting requests. Try again shortly.';
    if (error.status && error.status >= 500) return 'The AI provider is temporarily unavailable.';
    return `The AI provider returned an error (${error.status}).`;
  }
  if (error instanceof Error && error.message.includes('fetch')) {
    return 'Could not reach the AI provider. Check your network connection.';
  }
  return 'The AI request failed unexpectedly.';
}
