import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { hashPassword, startSession } from '@/lib/auth';
import { isOwnerEmail } from '@/lib/owner';
import {
  RESET_FAILURE_MESSAGE,
  checkResetToken,
  consumeResetToken,
} from '@/lib/password-reset';
import { rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  token: z.string().min(10, 'That reset link is not valid.'),
  password: z
    .string()
    .min(10, 'Use at least 10 characters.')
    .max(200, 'That password is too long.'),
});

/**
 * Completes a password reset.
 *
 * The token is consumed *before* the password is written. If two requests
 * arrive together only one can win the update, so a forwarded link cannot be
 * replayed to set a second password.
 */
export const POST = handleRoute('auth/reset', async (request) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const limit = rateLimit(`reset:${ip}`, 10, 60 * 60 * 1000);
  if (!limit.ok) {
    return fail('Too many attempts from this connection. Try again later.', 429);
  }

  const body = await parseBody(request, schema);

  const check = await checkResetToken(body.token);
  if (!check.ok) {
    return fail(RESET_FAILURE_MESSAGE[check.reason], 400, { code: `token_${check.reason}` });
  }

  const claimed = await consumeResetToken(check.tokenId);
  if (!claimed) {
    return fail(RESET_FAILURE_MESSAGE.used, 400, { code: 'token_used' });
  }

  const user = await db.user.update({
    where: { id: check.userId },
    data: { passwordHash: await hashPassword(body.password) },
  });

  // Signing them in immediately avoids sending someone who has just proved
  // control of the mailbox back to a login form to type the new password again.
  await startSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
    owner: isOwnerEmail(user.email),
  });

  return ok({ id: user.id, name: user.name, email: user.email });
});
