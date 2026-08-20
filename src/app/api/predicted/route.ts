import { z } from 'zod';

import { handleRoute, fail, ok } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { SUBJECT_SLUGS } from '@/lib/types';
import { buildPredictedPaper } from '@/lib/exam/predicted';

export const dynamic = 'force-dynamic';

const query = z.object({
  subject: z.enum(SUBJECT_SLUGS),
  paper: z.string().min(1).max(2),
});

/**
 * A predicted paper, built to the real paper's blueprint.
 *
 * Answers and mark schemes are deliberately absent: they come back from
 * /api/attempts once the student has committed, so the paper cannot be read out
 * of the network response before it is sat.
 */
export const GET = handleRoute('predicted', async (request) => {
  await requireUser();
  const url = new URL(request.url);
  const params = query.parse(Object.fromEntries(url.searchParams));

  const result = await buildPredictedPaper(params.subject, params.paper);
  if ('error' in result) return fail(result.error, 400);

  return ok(result);
});
