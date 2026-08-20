import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { createResetToken } from '@/lib/password-reset';
import { isEmailConfigured, sendEmail } from '@/lib/email';
import { passwordResetEmail } from '@/lib/email/templates';
import { rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
});

/**
 * Starts a password reset.
 *
 * Always answers the same way whether or not the address is registered. Saying
 * "no account with that email" would turn this endpoint into a way to test
 * which of a list of addresses have accounts here, which is exactly the kind of
 * thing a stranger should not be able to learn.
 */
export const POST = handleRoute('auth/forgot', async (request) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const limit = rateLimit(`forgot:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return fail('Too many reset requests from this connection. Try again later.', 429);
  }

  const body = await parseBody(request, schema);

  // Without a mail provider nothing can reach the student, and pretending
  // otherwise would leave them waiting for an email that will never arrive.
  if (!isEmailConfigured()) {
    return fail(
      'Password reset is unavailable because email is not set up on this server. Please contact support.',
      503,
      { code: 'email_unconfigured' },
    );
  }

  const user = await db.user.findUnique({ where: { email: body.email } });

  if (user) {
    const token = await createResetToken(user.id);
    const message = passwordResetEmail({ name: user.name, token });
    await sendEmail({ ...message, to: user.email });
  }

  // Identical response either way.
  return ok({
    sent: true,
    message: 'If an account exists for that address, a reset link is on its way.',
  });
});
