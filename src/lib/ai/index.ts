import 'server-only';

import { AnthropicProvider } from './anthropic';
import { GoogleProvider } from './google';
import type { AiProvider } from './provider';

export * from './provider';

const cache = new Map<string, AiProvider | null>();

/** Each provider has its own sensible model, so AI_MODEL stays optional. */
const DEFAULT_MODELS: Record<string, string> = {
  anthropic: 'claude-sonnet-5',
  // An alias rather than a pinned version: Google retires specific versions
  // (2.0-flash and 2.5-pro are already gone), which would 404 a pinned default.
  google: 'gemini-flash-latest',
};

/**
 * Low-latency models, used where waiting is worse than being slightly less thorough.
 *
 * This exists because of a measured problem: the reasoning models spend their
 * "thinking" budget before emitting the first token, which was timed between 6
 * and 30 seconds. That is fine for a written answer that streams into a page,
 * and unusable for a spoken conversation — nobody talks to a tutor who pauses
 * for half a minute. These models do little or no thinking, so they start
 * talking almost immediately.
 */
const FAST_MODELS: Record<string, string> = {
  anthropic: 'claude-haiku-4-5-20251001',
  google: 'gemini-3.1-flash-lite',
};

export type ProviderOptions = {
  /** Prefer latency over depth. Used by the voice agent. */
  fast?: boolean;
};

/**
 * Returns the configured provider, or null when none is available.
 *
 * Callers must handle null by falling back to curriculum-only output — the app
 * never pretends a model answered when it did not.
 */
export function getAiProvider(options: ProviderOptions = {}): AiProvider | null {
  const key = options.fast ? 'fast' : 'default';
  const existing = cache.get(key);
  if (existing !== undefined) return existing;

  const provider = (process.env.AI_PROVIDER ?? 'anthropic').toLowerCase();
  const normalised = provider === 'gemini' ? 'google' : provider;

  const model = options.fast
    ? process.env.AI_VOICE_MODEL?.trim() || FAST_MODELS[normalised] || ''
    : process.env.AI_MODEL?.trim() || DEFAULT_MODELS[normalised] || '';

  let built: AiProvider | null = null;

  if (normalised === 'anthropic') {
    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
    built = apiKey ? new AnthropicProvider(apiKey, model || DEFAULT_MODELS.anthropic) : null;
  } else if (normalised === 'google') {
    const keys = googleApiKeys();
    built = keys.length ? new GoogleProvider(keys, model || DEFAULT_MODELS.google, googleFallbackModels()) : null;
  } else if (normalised === 'none') {
    built = null;
  } else {
    console.warn(
      `AI_PROVIDER="${provider}" is not recognised. Add an implementation in src/lib/ai/ and register it here.`,
    );
    built = null;
  }

  cache.set(key, built);
  return built;
}

export function aiStatus(): {
  configured: boolean;
  provider: string;
  model: string | null;
  voiceModel: string | null;
} {
  const provider = getAiProvider();
  return {
    configured: provider !== null,
    provider: process.env.AI_PROVIDER ?? 'anthropic',
    model: provider?.model ?? null,
    voiceModel: getAiProvider({ fast: true })?.model ?? null,
  };
}

/** The Google AI key, whichever name it was saved under on the host. */
export function googleApiKey(): string | undefined {
  return (
    process.env.Api?.trim() ||
    process.env.API?.trim() ||
    process.env.api?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    undefined
  );
}

/**
 * Every Google AI key configured on the host, de-duplicated. Two AI Studio
 * projects mean two separate quotas: when one is busy or rate limited the
 * request moves to the next.
 */
export function googleApiKeys(): string[] {
  const names = ['Api', 'API', 'api', 'GOOGLE_API_KEY', 'GOOGLE_API_KEY_2', 'GEMINI_API_KEY', 'Api2', 'API_2', 'api2'];
  return [...new Set(names.map((n) => process.env[n]?.trim()).filter((v): v is string => !!v))];
}

/** Models tried, in order, when the main one is overloaded on every key. */
export function googleFallbackModels(): string[] {
  const configured = process.env.AI_FALLBACK_MODELS?.split(',').map((m) => m.trim()).filter(Boolean);
  return configured?.length ? configured : ['gemini-flash-latest', 'gemini-3.1-flash-lite'];
}
