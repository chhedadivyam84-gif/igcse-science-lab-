import { db } from '@/lib/db';
import { verifyWebhookSignature } from '@/lib/billing/razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Razorpay webhook — the authoritative source for subscription state.
 *
 * Three rules, because this endpoint is public:
 *  1. Verify the HMAC signature before reading anything. An unsigned request is
 *     rejected outright, otherwise anyone could grant themselves a subscription.
 *  2. Record every event by its id, which is unique — a retried delivery cannot
 *     extend access twice.
 *  3. Always answer 200 once the event is stored. Returning an error makes
 *     Razorpay retry an event we have already handled.
 *
 * This route deliberately does NOT use handleRoute: it needs the raw body for
 * signature verification, and its own response conventions.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get('x-razorpay-signature');

  if (!verifyWebhookSignature(raw, signature)) {
    console.warn('[billing/webhook] rejected: bad signature');
    return new Response(JSON.stringify({ error: 'Invalid signature.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let event: {
    event?: string;
    payload?: {
      subscription?: { entity?: RazorpaySubscriptionEntity };
      payment?: { entity?: { id?: string } };
    };
  };

  try {
    event = JSON.parse(raw);
  } catch {
    return new Response(JSON.stringify({ error: 'Malformed body.' }), { status: 400 });
  }

  const eventType = event.event ?? 'unknown';
  // Razorpay sends the delivery id in a header; fall back to a content hash so
  // idempotency still holds if the header is ever absent.
  const eventId =
    request.headers.get('x-razorpay-event-id') ??
    `${eventType}:${signature?.slice(0, 32) ?? Math.random().toString(36)}`;

  const existing = await db.paymentEvent.findUnique({ where: { eventId } });
  if (existing) {
    return Response.json({ ok: true, deduplicated: true });
  }

  const record = await db.paymentEvent.create({
    data: { provider: 'razorpay', eventId, eventType, payload: raw.slice(0, 20000) },
  });

  try {
    await handleEvent(eventType, event.payload?.subscription?.entity);
    await db.paymentEvent.update({ where: { id: record.id }, data: { handled: true } });
  } catch (error) {
    // Stored but unhandled: visible in the owner console rather than lost.
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[billing/webhook] handler failed', eventType, message);
    await db.paymentEvent.update({ where: { id: record.id }, data: { error: message } });
  }

  return Response.json({ ok: true });
}

type RazorpaySubscriptionEntity = {
  id?: string;
  status?: string;
  current_end?: number | null;
  customer_id?: string;
  notes?: { userId?: string; interval?: string };
};

/** Statuses that mean the student should have access right now. */
const GRANTS_ACCESS = new Set(['active', 'authenticated', 'pending']);

async function handleEvent(eventType: string, entity: RazorpaySubscriptionEntity | undefined) {
  if (!entity?.id) return;

  const status = entity.status ?? statusFromEvent(eventType);
  const currentPeriodEnd = entity.current_end ? new Date(entity.current_end * 1000) : null;

  const existing = await db.subscription.findUnique({ where: { providerId: entity.id } });

  // The checkout route normally creates the row first; `notes.userId` covers the
  // case where a subscription was started outside our flow.
  const userId = existing?.userId ?? entity.notes?.userId;
  if (!userId) {
    throw new Error(`No user could be matched to subscription ${entity.id}`);
  }

  const data = {
    status,
    currentPeriodEnd,
    providerCustomerId: entity.customer_id ?? existing?.providerCustomerId ?? null,
    cancelAtPeriodEnd: eventType === 'subscription.pending' ? false : existing?.cancelAtPeriodEnd ?? false,
  };

  if (existing) {
    await db.subscription.update({ where: { id: existing.id }, data });
  } else {
    await db.subscription.create({
      data: {
        userId,
        provider: 'razorpay',
        providerId: entity.id,
        interval: entity.notes?.interval === 'YEARLY' ? 'YEARLY' : 'MONTHLY',
        amountMinor: 0,
        ...data,
      },
    });
  }

  if (eventType === 'subscription.cancelled') {
    await db.subscription.updateMany({
      where: { providerId: entity.id },
      data: { cancelAtPeriodEnd: true },
    });
  }

  // Mirror onto the user for fast listings. Entitlements still recompute.
  await db.user.update({
    where: { id: userId },
    data: { plan: GRANTS_ACCESS.has(status) ? 'PRO' : 'FREE' },
  });
}

function statusFromEvent(eventType: string): string {
  if (eventType.endsWith('activated') || eventType.endsWith('charged')) return 'active';
  if (eventType.endsWith('cancelled')) return 'cancelled';
  if (eventType.endsWith('completed')) return 'completed';
  if (eventType.endsWith('halted')) return 'halted';
  if (eventType.endsWith('pending')) return 'pending';
  return 'created';
}
