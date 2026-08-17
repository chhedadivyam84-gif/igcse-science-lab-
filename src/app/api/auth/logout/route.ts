import { endSession } from '@/lib/auth';
import { handleRoute, ok } from '@/lib/api';

export const POST = handleRoute('auth/logout', async () => {
  await endSession();
  return ok({ ok: true });
});
