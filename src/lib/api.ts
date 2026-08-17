import 'server-only';

import { NextResponse } from 'next/server';
import { ZodError, type TypeOf, type ZodTypeAny } from 'zod';
import { AuthError } from './auth';
import { PaywallError } from './billing/entitlements';
import { AiRequestError, AiUnavailableError } from './ai/provider';

/**
 * Shared plumbing for every API route: validation, consistent error shapes and
 * logging. Routes stay readable and nothing leaks a stack trace to the client.
 */

export type ApiError = {
  error: string;
  /** Field-level messages for form display. */
  fields?: Record<string, string>;
  code?: string;
  /** Set on 402 responses so the client knows which feature to advertise. */
  feature?: string;
};

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function fail(message: string, status = 400, extra?: Omit<ApiError, 'error'>) {
  return NextResponse.json({ error: message, ...extra } satisfies ApiError, { status });
}

/**
 * Parses and validates a JSON body, throwing a ZodError that handleRoute maps
 * to a 422. Generic over the schema rather than its type so `.default()` values
 * come back as required fields.
 */
export async function parseBody<S extends ZodTypeAny>(request: Request, schema: S): Promise<TypeOf<S>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    throw new BadRequestError('Request body must be valid JSON.');
  }
  return schema.parse(raw);
}

export class BadRequestError extends Error {}

export class RateLimitError extends Error {
  constructor(
    message: string,
    readonly retryAfter: number,
  ) {
    super(message);
  }
}

/**
 * Wraps a route handler so every failure mode produces a predictable response.
 * Unexpected errors are logged server-side and reported generically.
 */
export function handleRoute(name: string, handler: (request: Request) => Promise<Response>) {
  return async (request: Request) => {
    const started = Date.now();
    try {
      const response = await handler(request);
      log(name, request, response.status, started);
      return response;
    } catch (error) {
      if (error instanceof ZodError) {
        const fields: Record<string, string> = {};
        for (const issue of error.issues) {
          fields[issue.path.join('.') || '_'] = issue.message;
        }
        log(name, request, 422, started);
        return fail('Some of the values sent were not valid.', 422, { fields });
      }
      if (error instanceof BadRequestError) {
        log(name, request, 400, started);
        return fail(error.message, 400);
      }
      if (error instanceof AuthError) {
        log(name, request, error.status, started);
        return fail(error.message, error.status);
      }
      if (error instanceof PaywallError) {
        // 402 so the client can show the upgrade prompt rather than an error.
        log(name, request, 402, started);
        return fail(error.message, 402, { code: 'upgrade_required', feature: error.feature });
      }
      if (error instanceof RateLimitError) {
        log(name, request, 429, started);
        return NextResponse.json({ error: error.message, code: 'rate_limited' } satisfies ApiError, {
          status: 429,
          headers: { 'Retry-After': String(error.retryAfter) },
        });
      }
      if (error instanceof AiUnavailableError) {
        log(name, request, 503, started);
        return fail(error.message, 503, { code: 'ai_unavailable' });
      }
      if (error instanceof AiRequestError) {
        // The upstream cause is dropped from the client response on purpose;
        // AI_DEBUG=1 surfaces it in the server log for diagnosis.
        if (process.env.AI_DEBUG === '1') {
          console.error(`[api:${name}] AI error:`, error.message, error.cause ?? '');
        }
        log(name, request, 502, started);
        return fail(error.message, 502, { code: 'ai_error' });
      }

      console.error(`[api:${name}] unhandled error`, error);
      log(name, request, 500, started);
      return fail('Something went wrong on our side. Please try again.', 500);
    }
  };
}

function log(name: string, request: Request, status: number, started: number) {
  const duration = Date.now() - started;
  // Deliberately does not log request bodies — they can contain student work.
  console.log(`[api:${name}] ${request.method} ${status} ${duration}ms`);
}
