import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireOwner } from '@/lib/auth';
import { grantOwnerAccess } from '@/lib/billing/entitlements';

export const dynamic = 'force-dynamic';

const schema = z.object({
  userId: z.string(),
  months: z.number().min(1).max(36),
  note: z.string().max(200).optional(),
});

/**
 * Grants Pro access to an account without a payment.
 *
 * Owner-only. Useful for early customers, scholarships, refunds and testing —
 * and it is what makes the platform usable before Razorpay is connected.
 */
export const POST = handleRoute('admin/grant', async (request) => {
  const owner = await requireOwner();
  const body = await parseBody(request, schema);

  const user = await db.user.findUnique({ where: { id: body.userId }, select: { id: true, email: true } });
  if (!user) return fail('User not found.', 404);

  const subscription = await grantOwnerAccess(
    user.id,
    body.months,
    body.note?.trim() || `Granted by ${owner.email}`,
  );

  return ok({
    ok: true,
    email: user.email,
    months: body.months,
    accessUntil: subscription.currentPeriodEnd,
    message: `${user.email} now has Pro access until ${subscription.currentPeriodEnd?.toLocaleDateString('en-GB')}.`,
  });
});
