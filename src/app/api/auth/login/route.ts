import { z } from 'zod';
import { db } from '@/lib/db';
import { startSession, syncOwnerRole, verifyPassword } from '@/lib/auth';
import { isOwnerEmail } from '@/lib/owner';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { rateLimit } from '@/lib/ratelimit';

const schema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
});

export const POST = handleRoute('auth/login', async (request) => {
  const body = await parseBody(request, schema);

  // Throttled per email so one account cannot be brute-forced from many IPs.
  const limit = rateLimit(`login:${body.email}`, 10, 15 * 60 * 1000);
  if (!limit.ok) {
    return fail(`Too many sign-in attempts. Try again in ${Math.ceil(limit.resetInSeconds / 60)} minutes.`, 429);
  }

  const user = await db.user.findUnique({ where: { email: body.email } });

  // Same message and roughly the same work either way, so the response does not
  // reveal whether an email is registered.
  const valid = user ? await verifyPassword(body.password, user.passwordHash) : false;
  if (!user || !valid) {
    return fail('That email and password combination was not recognised.', 401);
  }

  // Ownership comes from OWNER_EMAIL, so the role column is reconciled on the
  // way in rather than being something anyone can grant.
  const role = await syncOwnerRole(user.id, user.email);
  const owner = isOwnerEmail(user.email);

  await startSession({ id: user.id, email: user.email, name: user.name, role, owner });

  return ok({ id: user.id, name: user.name, email: user.email, role, owner });
});
