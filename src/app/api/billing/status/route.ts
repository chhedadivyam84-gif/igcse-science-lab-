import { db } from '@/lib/db';
import { fail, handleRoute, ok } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { cancelSubscription, isRazorpayConfigured } from '@/lib/billing/razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Current plan and access, for the account page and upgrade prompts. */
export const GET = handleRoute('billing/status', async () => {
  const user = await requireUser();
  const entitlements = await entitlementsFor(user.id);

  const subscription = await db.subscription.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      interval: true,
      status: true,
      currentPeriodEnd: true,
      cancelAtPeriodEnd: true,
      grantedByOwner: true,
      amountMinor: true,
      currency: true,
      createdAt: true,
    },
  });

  return ok({
    plan: entitlements.plan,
    hasFullAccess: entitlements.hasFullAccess,
    trialDaysLeft: entitlements.trialDaysLeft,
    trialEndsAt: entitlements.trialEndsAt,
    renewsAt: entitlements.renewsAt,
    cancelAtPeriodEnd: entitlements.cancelAtPeriodEnd,
    isOwner: entitlements.isOwner,
    paymentsConfigured: isRazorpayConfigured(),
    subscription,
  });
});

/**
 * Cancels at the end of the paid period.
 *
 * Deliberately never cancels immediately: the student paid for the full period
 * and keeps access until it ends.
 */
export const DELETE = handleRoute('billing/cancel', async () => {
  const user = await requireUser();

  const subscription = await db.subscription.findFirst({
    where: { userId: user.id, status: { in: ['active', 'authenticated', 'pending'] } },
    orderBy: { createdAt: 'desc' },
  });

  if (!subscription) return fail('You do not have an active subscription.', 404);

  if (subscription.grantedByOwner) {
    return fail('This access was granted directly by the owner, so there is nothing to cancel.', 400);
  }

  if (subscription.providerId) {
    await cancelSubscription(subscription.providerId, true);
  }

  await db.subscription.update({
    where: { id: subscription.id },
    data: { cancelAtPeriodEnd: true },
  });

  return ok({
    ok: true,
    cancelAtPeriodEnd: true,
    accessUntil: subscription.currentPeriodEnd,
    message: 'Your subscription will not renew. You keep full access until the end of the period you have paid for.',
  });
});
