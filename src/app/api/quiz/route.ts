import { z } from 'zod';
import { SUBJECT_SLUGS } from '@/lib/types';
import { db } from '@/lib/db';
import { fail, handleRoute, ok } from '@/lib/api';
import { getSessionUser, requireUser } from '@/lib/auth';
import { parseList, parseJson } from '@/lib/json';
import { progressForUser } from '@/lib/progress';
import { seededShuffle } from '@/lib/utils';
import { PRACTICE_MODES } from '@/lib/types';

export const dynamic = 'force-dynamic';

const query = z.object({
  mode: z.enum(PRACTICE_MODES).default('quick'),
  subject: z.enum(SUBJECT_SLUGS).optional(),
  subtopicId: z.string().optional(),
  count: z.coerce.number().min(1).max(40).default(8),
});

/**
 * Builds a question set for a practice session.
 *
 * Answers, mark schemes and explanations are deliberately NOT returned — they
 * come back from /api/attempts after the student has committed to an answer, so
 * the correct option cannot be read out of the network response.
 */
export const GET = handleRoute('quiz', async (request) => {
  await requireUser();
  const url = new URL(request.url);
  const params = query.parse(Object.fromEntries(url.searchParams));

  const where: Record<string, unknown> = { reviewStatus: 'APPROVED' };
  if (params.subject) where.subject = { slug: params.subject };
  if (params.subtopicId) where.subtopicId = params.subtopicId;
  if (params.mode === 'challenge') where.difficulty = 'CHALLENGE';
  if (params.mode === 'quick') where.type = 'MCQ';

  if (params.mode === 'weak') {
    const user = await requireUser();
    const progress = await progressForUser(user.id);
    const weak = progress
      .filter((p) => p.mastery < 65)
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, 6)
      .map((p) => p.subtopicId);

    if (!weak.length) {
      return ok({
        questions: [],
        empty: 'weak-none',
        message:
          'No weak topics yet — answer some practice questions first and this mode will target whatever you find hardest.',
      });
    }
    where.subtopicId = { in: weak };
  }

  // Sample from the WHOLE bank, not the first 200 rows: with thousands of
  // questions, a fixed window meant students saw the same few hundred forever.
  // Questions this student has not answered yet come first; once everything
  // has been seen, any question can come back.
  const ids = (await db.question.findMany({ where, select: { id: true } })).map((q: { id: string }) => q.id);
  const session = await getSessionUser().catch(() => null);
  const answered = session
    ? new Set(
        (
          await db.questionAttempt.findMany({
            where: { userId: session.id },
            select: { questionId: true },
            distinct: ['questionId'],
          })
        ).map((a: { questionId: string }) => a.questionId),
      )
    : new Set<string>();
  const seed = Date.now() % 100000;
  const fresh = seededShuffle(ids.filter((id: string) => !answered.has(id)), seed);
  const seen = seededShuffle(ids.filter((id: string) => answered.has(id)), seed + 1);
  const pickedIds = [...fresh, ...seen].slice(0, params.count);

  const rows = pickedIds.length
    ? await db.question.findMany({
        where: { id: { in: pickedIds } },
        include: { subtopic: { include: { topic: true } }, subject: true },
      })
    : [];

  if (!rows.length) {
    return ok({
      questions: [],
      empty: 'no-questions',
      message: 'There are no questions in the bank for that selection yet.',
    });
  }

  const order = new Map(pickedIds.map((id, i) => [id, i]));
  const shuffled = [...rows].sort((x, y) => (order.get(x.id) ?? 0) - (order.get(y.id) ?? 0));

  return ok({
    questions: shuffled.map((q) => ({
      id: q.id,
      type: q.type,
      difficulty: q.difficulty,
      stem: q.stem,
      marks: q.marks,
      hint: q.hint,
      origin: q.origin,
      subject: q.subject.slug,
      subtopic: q.subtopic
        ? { id: q.subtopic.id, number: q.subtopic.number, title: q.subtopic.title, slug: q.subtopic.slug, topicSlug: q.subtopic.topic.slug }
        : null,
      // Distractor rationales are stripped until the answer is submitted.
      options: parseList<{ id: string; text: string }>(q.options).map((o) => ({ id: o.id, text: o.text })),
    })),
    empty: null,
  });
});

/** Fetches a single question the student has already attempted, for review. */
export const POST = handleRoute('quiz/review', async (request) => {
  const user = await requireUser();
  const body = z.object({ questionId: z.string() }).parse(await request.json());

  const attempted = await db.questionAttempt.findFirst({
    where: { userId: user.id, questionId: body.questionId },
  });
  if (!attempted) {
    return fail('You have not attempted that question yet.', 403);
  }

  const question = await db.question.findUnique({ where: { id: body.questionId } });
  if (!question) return fail('Question not found.', 404);

  return ok({
    id: question.id,
    stem: question.stem,
    answer: question.answer,
    markScheme: parseList<string>(question.markScheme),
    explanation: question.explanation,
    options: parseJson<{ id: string; text: string; why?: string }[]>(question.options, []),
  });
});
