import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { buildDailyPlan, getOrCreateTodayPlan } from '@/lib/plan';
import { isoDate } from '@/lib/utils';
import type { PlanItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export const GET = handleRoute('plan', async () => {
  const user = await requireUser();
  return ok(await getOrCreateTodayPlan(user.id));
});

const schema = z.object({
  action: z.enum(['toggle', 'regenerate']),
  itemId: z.string().optional(),
});

export const POST = handleRoute('plan/update', async (request) => {
  const user = await requireUser();
  const body = await parseBody(request, schema);
  const date = isoDate();

  if (body.action === 'regenerate') {
    const items = await buildDailyPlan(user.id);
    await db.dailyPlan.upsert({
      where: { userId_date: { userId: user.id, date } },
      update: { items: JSON.stringify(items) },
      create: { userId: user.id, date, items: JSON.stringify(items) },
    });
    return ok({ date, items });
  }

  if (!body.itemId) return fail('itemId is required when toggling an item.', 400);

  const plan = await db.dailyPlan.findUnique({ where: { userId_date: { userId: user.id, date } } });
  if (!plan) return fail('No plan exists for today yet.', 404);

  const items = (JSON.parse(plan.items) as PlanItem[]).map((item) =>
    item.id === body.itemId ? { ...item, done: !item.done } : item,
  );

  await db.dailyPlan.update({
    where: { userId_date: { userId: user.id, date } },
    data: { items: JSON.stringify(items) },
  });

  return ok({ date, items });
});
