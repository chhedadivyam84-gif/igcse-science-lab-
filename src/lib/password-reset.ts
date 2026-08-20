import 'server-only';

import crypto from 'node:crypto';
import { db } from './db';

/**
 * Password reset tokens.
 *
 * Three rules, all of which matter:
 *
 *   1. Only the SHA-256 hash is stored. A stolen database therefore yields no
 *      usable reset links — the raw token existed only in the email.
 *   2. A token works once. `usedAt` is stamped inside the same transaction that
 *      changes the password, so a link forwarded to someone else is inert.
 *   3. Tokens expire in an hour, and requesting a new one invalidates any
 *      outstanding ones, so a forgotten old email cannot be used later.
 */

const TOKEN_TTL_MINUTES = 60;

function hash(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Issues a token for a user and returns the RAW value, which the caller must
 * put in the email and then forget. It is never stored or logged.
 */
export async function createResetToken(userId: string): Promise<string> {
  // Any earlier request is superseded — one live link per account.
  await db.passwordResetToken.deleteMany({ where: { userId, usedAt: null } });

  const token = crypto.randomBytes(32).toString('base64url');
  await db.passwordResetToken.create({
    data: {
      userId,
      tokenHash: hash(token),
      expiresAt: new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000),
    },
  });
  return token;
}

export type ResetTokenCheck =
  | { ok: true; userId: string; tokenId: string }
  | { ok: false; reason: 'invalid' | 'expired' | 'used' };

/** Looks a token up without consuming it — used to render the reset form. */
export async function checkResetToken(token: string): Promise<ResetTokenCheck> {
  if (!token) return { ok: false, reason: 'invalid' };

  const row = await db.passwordResetToken.findUnique({ where: { tokenHash: hash(token) } });
  if (!row) return { ok: false, reason: 'invalid' };
  if (row.usedAt) return { ok: false, reason: 'used' };
  if (row.expiresAt.getTime() < Date.now()) return { ok: false, reason: 'expired' };

  return { ok: true, userId: row.userId, tokenId: row.id };
}

/**
 * Marks a token used. Returns false if it was already consumed, which is what
 * makes two simultaneous submissions safe: the second one loses.
 */
export async function consumeResetToken(tokenId: string): Promise<boolean> {
  const result = await db.passwordResetToken.updateMany({
    where: { id: tokenId, usedAt: null },
    data: { usedAt: new Date() },
  });
  return result.count === 1;
}

/** Human wording for each failure, so the page never has to invent one. */
export const RESET_FAILURE_MESSAGE: Record<'invalid' | 'expired' | 'used', string> = {
  invalid: 'That reset link is not valid. Request a new one below.',
  expired: 'That reset link has expired. Reset links last one hour — request a new one below.',
  used: 'That reset link has already been used. Request a new one below.',
};
