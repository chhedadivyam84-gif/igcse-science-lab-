import 'server-only';

import crypto from 'node:crypto';
import { PRICING, type Interval } from './plans';

/**
 * Razorpay over REST.
 *
 * No SDK: the surface needed is three endpoints and an HMAC check, and keeping
 * it dependency-free means one less package with access to payment credentials.
 *
 * Money is handled only in paise (integers). Nothing here uses floats.
 */

const API = 'https://api.razorpay.com/v1';

export type RazorpayConfig = {
  keyId: string;
  keySecret: string;
  webhookSecret: string;
  planIds: Partial<Record<Interval, string>>;
};

export function razorpayConfig(): RazorpayConfig | null {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!keyId || !keySecret) return null;

  return {
    keyId,
    keySecret,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET?.trim() ?? '',
    planIds: {
      MONTHLY: process.env.RAZORPAY_PLAN_MONTHLY?.trim() || undefined,
      YEARLY: process.env.RAZORPAY_PLAN_YEARLY?.trim() || undefined,
    },
  };
}

export function isRazorpayConfigured(): boolean {
  return razorpayConfig() !== null;
}

/** True when the account is still on Razorpay test keys. */
export function isTestMode(): boolean {
  return razorpayConfig()?.keyId.startsWith('rzp_test') ?? false;
}

export class RazorpayError extends Error {}

async function call<T>(path: string, init: RequestInit & { body?: string } = {}): Promise<T> {
  const config = razorpayConfig();
  if (!config) throw new RazorpayError('Razorpay is not configured.');

  const auth = Buffer.from(`${config.keyId}:${config.keySecret}`).toString('base64');

  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  }).catch(() => {
    throw new RazorpayError('Could not reach Razorpay. Check your network connection.');
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: { description?: string; code?: string };
  };

  if (!response.ok) {
    throw new RazorpayError(
      data.error?.description ?? `Razorpay returned an error (${response.status}).`,
    );
  }

  return data as T;
}

export type RazorpaySubscription = {
  id: string;
  status: string;
  plan_id: string;
  customer_id?: string;
  current_end?: number | null;
  short_url?: string;
};

/**
 * Creates a subscription for a student.
 *
 * `notes.userId` is the link back to our account — the webhook uses it so a
 * payment can always be matched even if the customer record differs.
 */
export async function createSubscription(params: {
  interval: Interval;
  userId: string;
  email: string;
  name: string;
}): Promise<RazorpaySubscription> {
  const config = razorpayConfig();
  if (!config) throw new RazorpayError('Razorpay is not configured.');

  const planId = config.planIds[params.interval];
  if (!planId) {
    throw new RazorpayError(
      `No Razorpay plan id is set for the ${params.interval.toLowerCase()} plan. Create the plan in the Razorpay dashboard and set RAZORPAY_PLAN_${params.interval} in .env.`,
    );
  }

  // 12 monthly cycles, or 5 yearly — Razorpay requires a finite count.
  const totalCount = params.interval === 'MONTHLY' ? 12 : 5;

  return call<RazorpaySubscription>('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      plan_id: planId,
      total_count: totalCount,
      customer_notify: 1,
      notes: {
        userId: params.userId,
        email: params.email,
        interval: params.interval,
      },
    }),
  });
}

export async function fetchSubscription(id: string): Promise<RazorpaySubscription> {
  return call<RazorpaySubscription>(`/subscriptions/${encodeURIComponent(id)}`);
}

export async function cancelSubscription(id: string, atCycleEnd = true): Promise<RazorpaySubscription> {
  return call<RazorpaySubscription>(`/subscriptions/${encodeURIComponent(id)}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ cancel_at_cycle_end: atCycleEnd ? 1 : 0 }),
  });
}

/**
 * Verifies a webhook signature in constant time.
 *
 * Without this, anyone who knows the endpoint could grant themselves a
 * subscription by posting a fake "payment succeeded" event.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const config = razorpayConfig();
  if (!config?.webhookSecret || !signature) return false;

  const expected = crypto.createHmac('sha256', config.webhookSecret).update(rawBody).digest('hex');

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

/** Verifies the handshake the browser checkout returns after payment. */
export function verifyCheckoutSignature(params: {
  subscriptionId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const config = razorpayConfig();
  if (!config) return false;

  const expected = crypto
    .createHmac('sha256', config.keySecret)
    .update(`${params.paymentId}|${params.subscriptionId}`)
    .digest('hex');

  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(params.signature, 'utf8');
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export function amountFor(interval: Interval): number {
  return PRICING[interval].amountMinor;
}
