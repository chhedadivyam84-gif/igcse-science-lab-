import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireOwner } from '@/lib/auth';
import { isOwnerEmail } from '@/lib/owner';

export const dynamic = 'force-dynamic';

const schema = z.object({
  userId: z.string(),
  role: z.enum(['STUDENT', 'ADMIN']),
});

/**
 * Sets an account's role label.
 *
 * Since the admin panel is owner-locked, this does NOT grant panel access — it
 * is a label on the account. Access is decided solely by OWNER_EMAIL, which
 * cannot be changed from inside the running application. The response says so
 * explicitly so nothing here can be mistaken for a way in.
 */
export const PATCH = handleRoute('admin/users', async (request) => {
  await requireOwner();
  const body = await parseBody(request, schema);

  const user = await db.user.findUnique({ where: { id: body.userId } });
  if (!user) return fail('User not found.', 404);

  if (isOwnerEmail(user.email)) {
    return fail('The owner account role is derived from OWNER_EMAIL and cannot be edited here.', 400);
  }

  await db.user.update({ where: { id: body.userId }, data: { role: body.role } });

  return ok({
    ok: true,
    role: body.role,
    grantsAdminAccess: false,
    notice:
      'Role updated. This is a label only — admin access is locked to the OWNER_EMAIL account and cannot be granted from the app.',
  });
});
