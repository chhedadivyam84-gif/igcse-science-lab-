import { z } from 'zod';

import { db } from '@/lib/db';
import { handleRoute, ok } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { SUBJECT_SLUGS } from '@/lib/types';

export const dynamic = 'force-dynamic';

const schema = z.object({
  // Validated against the real subject list, so a hand-crafted request cannot
  // write a slug that no page can render.
  subjects: z.array(z.enum(SUBJECT_SLUGS)).max(SUBJECT_SLUGS.length).optional(),
  targetGrade: z.string().trim().max(4).optional(),
  examSeries: z.string().trim().max(40).optional(),
});

/** Updates the signed-in student's own profile. Never another account's. */
export const PATCH = handleRoute('profile', async (request) => {
  const user = await requireUser();
  const body = schema.parse(await request.json());

  const data: Record<string, unknown> = {};
  if (body.subjects) {
    // De-duplicated and stored in the platform's own order, so the dashboard
    // renders subjects consistently however they were clicked.
    const chosen = SUBJECT_SLUGS.filter((slug) => body.subjects!.includes(slug));
    data.subjects = JSON.stringify(chosen);
  }
  if (body.targetGrade !== undefined) data.targetGrade = body.targetGrade || null;
  if (body.examSeries !== undefined) data.examSeries = body.examSeries || null;

  const updated = await db.user.update({
    where: { id: user.id },
    data,
    select: { subjects: true, targetGrade: true, examSeries: true },
  });

  return ok(updated);
});
