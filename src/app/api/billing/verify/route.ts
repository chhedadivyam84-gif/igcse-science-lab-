import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { fetchSubscription, verifyCheckoutSignature } from '@/lib/billing/razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  razorpay_subscription_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

/**
 * Confirms a subscription immediately after the browser checkout closes.
 *
 * The webhook is the authority, but it can take a few seconds to arrive and the
 * student is watching the screen. This verifies the signed handshake so access
 * turns on at once — and because the state is then re-read from Razorpay's API,
 * a forged request cannot grant anything.
 */
export const POST = handleRoute('billing/verify', async (request) => {
  const user = await requireUser();
  const body = await parseBody(request, schema);

  const valid = verifyCheckoutSignature({
    subscriptionId: body.razorpay_subscription_id,
    paymentId: body.razorpay_payment_id,
    signature: body.razorpay_signature,
  });

  if (!valid) {
    console.warn('[billing/verify] bad signature for user', user.id);
    return fail('That payment could not be verified. If you were charged, contact support.', 400, {
      code: 'bad_signature',
    });
  }

  const subscription = await db.subscription.findUnique({
    where: { providerId: body.razorpay_subscription_id },
  });

  // The row must already belong to this user — a valid signature for someone
  // else's subscription must not upgrade the caller.
  if (!subscription || subscription.userId !== user.id) {
    return fail('That subscription does not belong to this account.', 403);
  }

  // Trust Razorpay's own record of the status rather than anything posted here.
  const live = await fetchSubscription(body.razorpay_subscription_id);

  await db.subscription.update({
    where: { id: subscription.id },
    data: {
      status: live.status ?? 'active',
      currentPeriodEnd: live.current_end ? new Date(live.current_end * 1000) : null,
      providerCustomerId: live.customer_id ?? subscription.providerCustomerId,
    },
  });

  const entitlements = await entitlementsFor(user.id);

  return ok({
    plan: entitlements.plan,
    hasFullAccess: entitlements.hasFullAccess,
    renewsAt: entitlements.renewsAt,
    status: live.status,
  });
});
