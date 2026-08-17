import 'server-only';

import type { SessionUser } from '@/lib/auth';
import { checkAiQuota } from '@/lib/ratelimit';
import { RateLimitError } from '@/lib/api';
import { requireFeature } from '@/lib/billing/entitlements';
import type { Feature } from '@/lib/billing/plans';

/**
 * Every AI route runs through this: signed in, entitled to the feature, and
 * within the abuse quota. Keeping it in one place means a new route cannot
 * accidentally skip the paywall or the rate limit.
 *
 * Order matters — entitlement is checked before quota so a free-tier student
 * gets "subscribe to continue" rather than a confusing rate-limit message.
 */
export async function requireAiAccess(feature: Feature): Promise<SessionUser> {
  const { user } = await requireFeature(feature);

  const quota = checkAiQuota(user.id);
  if (!quota.ok) {
    throw new RateLimitError(
      `You have reached your AI usage limit. Try again in ${
        quota.resetInSeconds > 120
          ? `${Math.ceil(quota.resetInSeconds / 60)} minutes`
          : `${quota.resetInSeconds} seconds`
      }.`,
      quota.resetInSeconds,
    );
  }

  return user;
}
