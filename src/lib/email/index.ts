import 'server-only';

/**
 * Transactional email.
 *
 * Over REST, with no SDK — the surface needed is one POST, and keeping it
 * dependency-free means one less package holding a sending credential. This
 * mirrors src/lib/billing/razorpay.ts.
 *
 * With no provider configured the app does not pretend to have sent anything:
 * `send` returns `{ delivered: false }` and the caller tells the user plainly.
 * The same honesty rule as the AI fallback — never claim work that did not
 * happen.
 */

export type EmailMessage = {
  to: string;
  subject: string;
  /** Plain text. Always sent, and used as the body when no HTML is given. */
  text: string;
  html?: string;
};

export type SendResult = {
  delivered: boolean;
  /** Set when delivery failed or was skipped; safe to show a developer. */
  reason?: string;
};

export type EmailConfig = { apiKey: string; from: string };

export function emailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!apiKey || !from) return null;
  return { apiKey, from };
}

export function isEmailConfigured(): boolean {
  return emailConfig() !== null;
}

/**
 * Sends one message.
 *
 * Never throws: a failed welcome email must not take down a successful
 * registration, and a failed reset email must not leak that the address
 * exists. Callers decide what to tell the user from `delivered`.
 */
export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  const config = emailConfig();

  if (!config) {
    // Loud in the server log, silent to the visitor. During development this
    // is how you read the reset link without a mail provider.
    console.warn(
      `[email] not configured — would have sent to ${message.to}: ${message.subject}\n${message.text}`,
    );
    return { delivered: false, reason: 'Email is not configured on this server.' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.html ? { html: message.html } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error(`[email] provider returned ${response.status}: ${detail.slice(0, 300)}`);
      return { delivered: false, reason: `Provider error (${response.status}).` };
    }

    return { delivered: true };
  } catch (error) {
    console.error('[email] send failed', error);
    return { delivered: false, reason: 'Could not reach the email provider.' };
  }
}

/** The site's own address, used to build links inside emails. */
export function siteUrl(): string {
  const raw = process.env.APP_URL?.trim() || 'http://localhost:3210';
  return raw.replace(/\/+$/, '');
}
