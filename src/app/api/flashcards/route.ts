import { z } from 'zod';
import { SUBJECT_SLUGS } from '@/lib/types';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { scheduleCard, touchStreak } from '@/lib/progress';
import { isoDate, seededShuffle } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const query = z.object({
  subject: z.enum(SUBJECT_SLUGS).optional(),
  subtopicId: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  limit: z.coerce.number().min(1).max(60).default(20),
});

/**
 * Returns cards that are due today, topped up with unseen cards so a session is
 * never empty just because nothing has come round yet.
 */
export const GET = handleRoute('flashcards', async (request) => {
  const user = await requireUser();
  const url = new URL(request.url);
  const params = query.parse(Object.fromEntries(url.searchParams));
  const today = isoDate();

  const where: Record<string, unknown> = {};
  if (params.subtopicId) where.subtopicId = params.subtopicId;
  if (params.difficulty) where.difficulty = params.difficulty;
  if (params.subject) {
    where.subtopic = { topic: { version: { subject: { slug: params.subject } } } };
  }

  const cards = await db.flashcard.findMany({
    where,
    include: {
      subtopic: { include: { topic: true } },
      reviews: { where: { userId: user.id } },
    },
    take: 400,
  });

  const due = cards.filter((card) => {
    const review = card.reviews[0];
    return !review || review.dueOn <= today;
  });

  const pool = due.length ? due : cards;
  const selected = seededShuffle(pool, Number(today.replace(/-/g, ''))).slice(0, params.limit);

  return ok({
    dueCount: due.length,
    totalCount: cards.length,
    cards: selected.map((card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
      difficulty: card.difficulty,
      origin: card.origin,
      subtopic: card.subtopic
        ? { number: card.subtopic.number, title: card.subtopic.title, slug: card.subtopic.slug, topicSlug: card.subtopic.topic.slug }
        : null,
      repetitions: card.reviews[0]?.repetitions ?? 0,
      isNew: !card.reviews[0],
    })),
  });
});

const reviewSchema = z.object({
  flashcardId: z.string(),
  rating: z.enum(['again', 'hard', 'good', 'easy']),
});

export const POST = handleRoute('flashcards/review', async (request) => {
  const user = await requireUser();
  const body = await parseBody(request, reviewSchema);

  const card = await db.flashcard.findUnique({ where: { id: body.flashcardId } });
  if (!card) return fail('Card not found.', 404);

  const existing = await db.flashcardReview.findUnique({
    where: { userId_flashcardId: { userId: user.id, flashcardId: card.id } },
  });

  const next = scheduleCard(
    {
      ease: existing?.ease ?? 2.5,
      intervalDays: existing?.intervalDays ?? 0,
      repetitions: existing?.repetitions ?? 0,
      lapses: existing?.lapses ?? 0,
    },
    body.rating,
  );

  await db.flashcardReview.upsert({
    where: { userId_flashcardId: { userId: user.id, flashcardId: card.id } },
    update: { ...next, lastRating: body.rating },
    create: { userId: user.id, flashcardId: card.id, ...next, lastRating: body.rating },
  });

  const streakDays = await touchStreak(user.id);
  await db.user.update({ where: { id: user.id }, data: { xp: { increment: body.rating === 'again' ? 2 : 5 } } });

  return ok({ ...next, streakDays });
});
