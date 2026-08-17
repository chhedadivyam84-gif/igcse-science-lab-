import 'server-only';

import { db } from '@/lib/db';
import { AuthError, requireUser, type SessionUser } from '@/lib/auth';
import { isOwnerEmail } from '@/lib/owner';
import { PREMIUM_FEATURES, TRIAL_DAYS, type Feature, type PlanId } from './plans';

/**
 * Who can use what.
 *
 * Access is always *recomputed* from the trial window and the live subscription
 * rather than read from `user.plan`. A stale column, a missed webhook or a
 * hand-edited row therefore cannot hand out paid access.
 */

export type Entitlements = {
  plan: PlanId;
  /** True while the student has full access, whether by trial or subscription. */
  hasFullAccess: boolean;
  /** Days remaining in the trial; 0 once it has ended. */
  trialDaysLeft: number;
  trialEndsAt: Date | null;
  /** Set when a paid subscription is what grants access. */
  renewsAt: Date | null;
  cancelAtPeriodEnd: boolean;
  isOwner: boolean;
  can: (feature: Feature) => boolean;
};

const DAY_MS = 86_400_000;

/** Statuses Razorpay uses for a subscription that is currently paid up. */
const LIVE_STATUSES = ['active', 'authenticated', 'pending'];

export function trialEndFor(user: { trialEndsAt: Date | null; createdAt: Date }): Date {
  // Legacy rows predate the field, so their trial runs from when they signed up.
  return user.trialEndsAt ?? new Date(user.createdAt.getTime() + TRIAL_DAYS * DAY_MS);
}

export async function entitlementsFor(userId: string): Promise<Entitlements> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, createdAt: true, trialEndsAt: true, plan: true },
  });

  if (!user) return denied();

  const now = Date.now();
  const trialEndsAt = trialEndFor(user);
  const trialActive = trialEndsAt.getTime() > now;
  const trialDaysLeft = trialActive ? Math.ceil((trialEndsAt.getTime() - now) / DAY_MS) : 0;

  // The owner is not asked to pay for their own product.
  const isOwner = isOwnerEmail(user.email);

  const subscription = await db.subscription.findFirst({
    where: {
      userId,
      status: { in: LIVE_STATUSES },
      OR: [{ currentPeriodEnd: null }, { currentPeriodEnd: { gt: new Date() } }],
    },
    orderBy: { createdAt: 'desc' },
  });

  const subscribed = Boolean(subscription);
  const hasFullAccess = isOwner || subscribed || trialActive;
  const plan: PlanId = subscribed || isOwner ? 'PRO' : trialActive ? 'TRIAL' : 'FREE';

  // Keep the denormalised column in step so admin listings and the dashboard
  // read the truth, but never rely on it for access.
  if (user.plan !== plan) {
    await db.user.update({ where: { id: userId }, data: { plan } }).catch(() => {
      // A failed cache write must not break the request.
    });
  }

  return {
    plan,
    hasFullAccess,
    trialDaysLeft,
    trialEndsAt,
    renewsAt: subscription?.currentPeriodEnd ?? null,
    cancelAtPeriodEnd: subscription?.cancelAtPeriodEnd ?? false,
    isOwner,
    can: (feature) => (PREMIUM_FEATURES.has(feature) ? hasFullAccess : true),
  };
}

function denied(): Entitlements {
  return {
    plan: 'FREE',
    hasFullAccess: false,
    trialDaysLeft: 0,
    trialEndsAt: null,
    renewsAt: null,
    cancelAtPeriodEnd: false,
    isOwner: false,
    can: (feature) => !PREMIUM_FEATURES.has(feature),
  };
}

/** Thrown when a free-tier student hits a paid feature. */
export class PaywallError extends Error {
  readonly status = 402;
  constructor(
    readonly feature: Feature,
    message: string,
  ) {
    super(message);
  }
}

/**
 * Guard for premium API routes: signed in, and entitled to this feature.
 * Returns both so callers do not have to look the user up twice.
 */
export async function requireFeature(
  feature: Feature,
): Promise<{ user: SessionUser; entitlements: Entitlements }> {
  const user = await requireUser();
  const entitlements = await entitlementsFor(user.id);

  if (!entitlements.can(feature)) {
    throw new PaywallError(
      feature,
      'Your free trial has ended. Subscribe to keep using the AI features — everything else stays free.',
    );
  }

  return { user, entitlements };
}

/** Used by the owner console to hand out access without a payment. */
export async function grantOwnerAccess(userId: string, months: number, note: string) {
  const currentPeriodEnd = new Date(Date.now() + months * 30 * DAY_MS);

  const subscription = await db.subscription.create({
    data: {
      userId,
      provider: 'manual',
      interval: months >= 12 ? 'YEARLY' : 'MONTHLY',
      status: 'active',
      amountMinor: 0,
      currentPeriodEnd,
      grantedByOwner: true,
      note,
    },
  });

  await db.user.update({ where: { id: userId }, data: { plan: 'PRO' } });
  return subscription;
}

export { AuthError };
