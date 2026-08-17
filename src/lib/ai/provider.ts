/**
 * Provider-agnostic AI interface.
 *
 * Nothing above this file imports a vendor SDK. Swapping model providers means
 * adding one implementation and one line in index.ts.
 */

export type AiMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type CompletionRequest = {
  system: string;
  messages: AiMessage[];
  maxTokens?: number;
  temperature?: number;
  /**
   * Set by routes whose prompt demands a JSON object. Providers with a native
   * structured-output mode use it; the rest ignore it and rely on the prompt.
   */
  responseFormat?: 'json';
};

export type ImageRequest = {
  system: string;
  prompt: string;
  image: { mediaType: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif'; base64: string };
  maxTokens?: number;
};

export interface AiProvider {
  /** Stable identifier stored alongside generated content for auditing. */
  readonly id: string;
  readonly model: string;
  complete(request: CompletionRequest): Promise<string>;
  stream(request: CompletionRequest): AsyncGenerator<string, void, unknown>;
  /** Optional — providers without vision simply omit this. */
  describeImage?(request: ImageRequest): Promise<string>;
}

export class AiUnavailableError extends Error {
  constructor(message = 'No AI provider is configured.') {
    super(message);
  }
}

/** Thrown for upstream failures so routes can return a useful message. */
export class AiRequestError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
  }
}
