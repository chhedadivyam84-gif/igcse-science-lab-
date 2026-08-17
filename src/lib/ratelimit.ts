/**
 * In-process sliding-window rate limiter.
 *
 * Sufficient for a single Node instance, which is how this app is meant to run
 * today. If the deployment is ever scaled horizontally, swap the `hits` Map for
 * Redis — the exported signature is designed not to change.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetInSeconds: number;
  limit: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    const oldest = bucket.timestamps[0];
    buckets.set(key, bucket);
    return {
      ok: false,
      remaining: 0,
      resetInSeconds: Math.ceil((windowMs - (now - oldest)) / 1000),
      limit,
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return {
    ok: true,
    remaining: limit - bucket.timestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
    limit,
  };
}

/** Both ceilings an AI route has to satisfy: burst protection and a daily cap. */
export function checkAiQuota(userId: string): RateLimitResult {
  const perMinute = Number(process.env.AI_RATE_LIMIT_PER_MINUTE ?? 12);
  const perDay = Number(process.env.AI_RATE_LIMIT_PER_DAY ?? 300);

  const minute = rateLimit(`ai:min:${userId}`, perMinute, 60_000);
  if (!minute.ok) return minute;
  return rateLimit(`ai:day:${userId}`, perDay, 86_400_000);
}

// Periodically drop empty buckets so a long-running process doesn't leak keys.
if (typeof setInterval === 'function') {
  const timer = setInterval(
    () => {
      const now = Date.now();
      for (const [key, bucket] of buckets) {
        if (bucket.timestamps.every((t) => now - t > 86_400_000)) buckets.delete(key);
      }
    },
    30 * 60 * 1000,
  );
  // Don't hold the event loop open in short-lived processes (build, scripts).
  timer.unref?.();
}
