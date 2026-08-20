import 'server-only';

import type { EmailMessage } from './index';
import { siteUrl } from './index';

/**
 * The wording of every email the platform sends.
 *
 * Kept apart from the sending code so the text can be read and changed without
 * touching delivery, and so every message carries the same footer. Plain text
 * is written first and the HTML mirrors it — a student reading either gets the
 * same information, and text-only clients are not sent an empty message.
 */

const PRODUCT = 'IGCSE Science Lab';

function wrap(bodyHtml: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1d24;max-width:520px;">
${bodyHtml}
<hr style="border:none;border-top:1px solid #e6e8ec;margin:24px 0;">
<p style="font-size:12px;color:#6b7280;">${PRODUCT} — an independent study tool. Not endorsed by or affiliated with Cambridge Assessment International Education.</p>
</div>`;
}

/** The reset link is the whole message: short-lived, single use, never reusable. */
export function passwordResetEmail(params: { name: string; token: string }): EmailMessage {
  const link = `${siteUrl()}/reset/${params.token}`;
  const text = `Hello ${params.name},

Someone asked to reset the password for your ${PRODUCT} account.

Open this link to choose a new password:
${link}

The link works once and expires in 1 hour.

If this was not you, ignore this email — your password has not been changed.`;

  return {
    to: '',
    subject: `Reset your ${PRODUCT} password`,
    text,
    html: wrap(`<p>Hello ${escape(params.name)},</p>
<p>Someone asked to reset the password for your ${PRODUCT} account.</p>
<p><a href="${link}" style="display:inline-block;background:#0d7490;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;">Choose a new password</a></p>
<p style="font-size:13px;color:#6b7280;">Or paste this into your browser:<br>${link}</p>
<p>The link works once and expires in <b>1 hour</b>.</p>
<p>If this was not you, ignore this email — your password has not been changed.</p>`),
  };
}

export function welcomeEmail(params: { name: string; trialDays: number }): EmailMessage {
  const text = `Hello ${params.name},

Your ${PRODUCT} account is ready.

You have ${params.trialDays} days of full access, including the AI tutor, notes, diagrams and explainers. No card is needed.

After the trial the syllabus, lessons, simulations, calculators, question bank, exam mode, flashcards and progress tracking stay free — for good.

Start here: ${siteUrl()}/learn

Good luck with your revision.`;

  return {
    to: '',
    subject: `Welcome to ${PRODUCT}`,
    text,
    html: wrap(`<p>Hello ${escape(params.name)},</p>
<p>Your ${PRODUCT} account is ready.</p>
<p>You have <b>${params.trialDays} days of full access</b>, including the AI tutor, notes, diagrams and explainers. No card is needed.</p>
<p>After the trial the syllabus, lessons, simulations, calculators, question bank, exam mode, flashcards and progress tracking stay free — for good.</p>
<p><a href="${siteUrl()}/learn" style="display:inline-block;background:#0d7490;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;">Start studying</a></p>`),
  };
}

/** Sent after a payment is verified, so the student has a record of the charge. */
export function paymentReceiptEmail(params: {
  name: string;
  amountLabel: string;
  interval: string;
  renewsAt?: string | null;
}): EmailMessage {
  const renews = params.renewsAt ? `\nNext renewal: ${params.renewsAt}` : '';
  const text = `Hello ${params.name},

Thank you — your ${PRODUCT} Pro subscription is active.

Amount: ${params.amountLabel}
Billing: ${params.interval.toLowerCase()}${renews}

You can cancel at any time from your account page, and you keep access until the end of the period you have paid for. Refunds are covered by our refunds policy: ${siteUrl()}/legal/refunds

Manage your subscription: ${siteUrl()}/account`;

  return {
    to: '',
    subject: `Your ${PRODUCT} Pro subscription`,
    text,
    html: wrap(`<p>Hello ${escape(params.name)},</p>
<p>Thank you — your <b>${PRODUCT} Pro</b> subscription is active.</p>
<table style="border-collapse:collapse;margin:12px 0;">
<tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Amount</td><td style="padding:4px 0;font-weight:600;">${escape(params.amountLabel)}</td></tr>
<tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Billing</td><td style="padding:4px 0;">${escape(params.interval.toLowerCase())}</td></tr>
${params.renewsAt ? `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;">Next renewal</td><td style="padding:4px 0;">${escape(params.renewsAt)}</td></tr>` : ''}
</table>
<p>You can cancel at any time from your <a href="${siteUrl()}/account">account page</a>, and you keep access until the end of the period you have paid for. Refunds are covered by our <a href="${siteUrl()}/legal/refunds">refunds policy</a>.</p>`),
  };
}

function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
