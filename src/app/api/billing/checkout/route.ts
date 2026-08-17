import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { amountFor, createSubscription, isRazorpayConfigured, razorpayConfig } from '@/lib/billing/razorpay';
import { rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ interval: z.enum(['MONTHLY', 'YEARLY']) });

/**
 * Starts a subscription. Returns the ids the browser checkout needs.
 *
 * The subscription row is created here in `created` state; access is only
 * granted once the webhook (or the verified checkout handshake) confirms
 * payment, so an abandoned checkout never yields free access.
 */
export const POST = handleRoute('billing/checkout', async (request) => {
  const user = await requireUser();
  const body = await parseBody(request, schema);

  // Creating subscriptions is cheap for us but not for Razorpay; throttle it.
  const limit = rateLimit(`checkout:${user.id}`, 6, 10 * 60 * 1000);
  if (!limit.ok) {
    return fail('Too many checkout attempts. Please wait a few minutes and try again.', 429);
  }

  if (!isRazorpayConfigured()) {
    return fail(
      'Payments are not connected yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env, or ask the owner to grant you access directly.',
      503,
      { code: 'payments_unconfigured' },
    );
  }

  const entitlements = await entitlementsFor(user.id);
  if (entitlements.plan === 'PRO' && !entitlements.isOwner) {
    return fail('You already have an active subscription.', 409, { code: 'already_subscribed' });
  }

  const account = await db.user.findUnique({ where: { id: user.id } });
  if (!account) return fail('Account not found.', 404);

  const subscription = await createSubscription({
    interval: body.interval,
    userId: account.id,
    email: account.email,
    name: account.name,
  });

  await db.subscription.create({
    data: {
      userId: account.id,
      provider: 'razorpay',
      providerId: subscription.id,
      providerCustomerId: subscription.customer_id ?? null,
      interval: body.interval,
      status: subscription.status || 'created',
      amountMinor: amountFor(body.interval),
      currency: 'INR',
    },
  });

  return ok({
    subscriptionId: subscription.id,
    keyId: razorpayConfig()!.keyId,
    amountMinor: amountFor(body.interval),
    currency: 'INR',
    interval: body.interval,
    // Razorpay's hosted page, used as a fallback if the inline script is blocked.
    shortUrl: subscription.short_url ?? null,
    prefill: { name: account.name, email: account.email },
  });
});
