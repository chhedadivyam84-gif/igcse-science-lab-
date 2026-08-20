import { z } from 'zod';
import { db } from '@/lib/db';
import { hashPassword, startSession } from '@/lib/auth';
import { isOwnerEmail } from '@/lib/owner';
import { TRIAL_DAYS } from '@/lib/billing/plans';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { sendEmail } from '@/lib/email';
import { welcomeEmail } from '@/lib/email/templates';
import { rateLimit } from '@/lib/ratelimit';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(80),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  password: z
    .string()
    .min(10, 'Use at least 10 characters.')
    .max(200, 'That password is too long.'),
  targetGrade: z.string().trim().max(4).optional(),
  examSeries: z.string().trim().max(40).optional(),
});

export const POST = handleRoute('auth/register', async (request) => {
  // Registration is throttled per-IP to slow down automated sign-ups.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const limit = rateLimit(`register:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return fail('Too many accounts created from this connection. Try again later.', 429);
  }

  const body = await parseBody(request, schema);

  const existing = await db.user.findUnique({ where: { email: body.email } });
  if (existing) {
    return fail('An account already exists with that email address.', 409, {
      fields: { email: 'Already registered — try signing in instead.' },
    });
  }

  // Registering with the configured OWNER_EMAIL claims the owner account. There
  // is no other route to it, and no in-app way to grant it to anyone else.
  const owner = isOwnerEmail(body.email);

  const user = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash: await hashPassword(body.password),
      role: owner ? 'ADMIN' : 'STUDENT',
      targetGrade: body.targetGrade || null,
      examSeries: body.examSeries || null,
      // Every new account gets full access for the trial period. No card needed.
      plan: 'TRIAL',
      trialEndsAt: new Date(Date.now() + TRIAL_DAYS * 86_400_000),
    },
  });

  await startSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: owner ? 'ADMIN' : 'STUDENT',
    owner,
  });

  // Deliberately not awaited: a slow or failing mail provider must not break a
  // registration that has already succeeded. sendEmail never throws, so nothing
  // can escape here.
  void sendEmail({ ...welcomeEmail({ name: user.name, trialDays: TRIAL_DAYS }), to: user.email });

  return ok({ id: user.id, name: user.name, email: user.email, role: user.role, owner }, { status: 201 });
});
