import 'server-only';

import type { SubjectSlug } from '@/lib/types';
import { db } from '@/lib/db';
import { isoDate } from '@/lib/utils';
import { progressForUser } from '@/lib/progress';
import type { PlanItem } from '@/lib/types';
import { subjectName } from '@/lib/subjects';

/**
 * Builds a study plan for today from what the student has actually done:
 * weakest topics first, then spaced-repetition cards that are due, then the
 * error category they lose the most marks to, then something new.
 *
 * A new student with no history gets a sensible starter plan rather than an
 * empty page, and every item says why it is there.
 */
export async function buildDailyPlan(userId: string): Promise<PlanItem[]> {
  const [progress, dueCards, mistakes] = await Promise.all([
    progressForUser(userId),
    countDueCards(userId),
    db.mistake.groupBy({
      by: ['category'],
      where: { userId, resolved: false },
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
      take: 1,
    }),
  ]);

  const items: PlanItem[] = [];

  const weak = progress.filter((p) => p.mastery < 70).sort((a, b) => a.mastery - b.mastery);

  for (const subtopic of weak.slice(0, 2)) {
    items.push({
      id: `learn-${subtopic.subtopicId}`,
      label: `${subjectName(subtopic.subject)}: ${subtopic.title}`,
      subject: subtopic.subject,
      subtopicNumber: subtopic.number,
      href: `/learn/${subtopic.subject}/${subtopic.topicSlug}/${subtopic.slug}`,
      minutes: 20,
      kind: 'learn',
      reason: `Mastery is ${subtopic.mastery}% — your lowest scoring area.`,
      done: false,
    });
  }

  if (dueCards > 0) {
    items.push({
      id: 'flashcards-due',
      label: `Flashcards — ${dueCards} due`,
      subject: null,
      subtopicNumber: null,
      href: '/flashcards',
      minutes: Math.min(20, Math.max(5, Math.round(dueCards / 3))),
      kind: 'flashcards',
      reason: 'Spaced repetition works best on the day cards come round.',
      done: false,
    });
  }

  const topMistake = mistakes[0];
  if (topMistake) {
    items.push({
      id: `mistakes-${topMistake.category}`,
      label: 'Review your mistake patterns',
      subject: null,
      subtopicNumber: null,
      href: '/mistakes',
      minutes: 10,
      kind: 'review',
      reason: `${topMistake._count.category} unresolved ${topMistake.category.toLowerCase()} error${
        topMistake._count.category === 1 ? '' : 's'
      } logged.`,
      done: false,
    });
  }

  // Something new: the first subtopic with a lesson that has not been started.
  const untouched = await db.subtopic.findFirst({
    where: {
      lessons: { some: { status: 'PUBLISHED' } },
      progress: { none: { userId } },
    },
    include: { topic: { include: { version: { include: { subject: true } } } } },
    orderBy: [{ topic: { order: 'asc' } }, { order: 'asc' }],
  });

  if (untouched) {
    const subject = untouched.topic.version.subject.slug as SubjectSlug;
    items.push({
      id: `new-${untouched.id}`,
      label: `New: ${untouched.title}`,
      subject,
      subtopicNumber: untouched.number,
      href: `/learn/${subject}/${untouched.topic.slug}/${untouched.slug}`,
      minutes: 15,
      kind: 'learn',
      reason: 'You have not started this subtopic yet.',
      done: false,
    });
  }

  items.push({
    id: 'practice-mixed',
    label: progress.length ? 'Mixed practice' : 'Try a quick quiz',
    subject: null,
    subtopicNumber: null,
    href: progress.length ? '/practice?mode=mixed' : '/practice?mode=quick',
    minutes: 15,
    kind: 'practice',
    reason: progress.length
      ? 'Interleaving topics improves recall more than blocking them.'
      : 'A short quiz gives the planner something to work with.',
    done: false,
  });

  return items.slice(0, 5);
}

async function countDueCards(userId: string): Promise<number> {
  const today = isoDate();
  const [due, unseen] = await Promise.all([
    db.flashcardReview.count({ where: { userId, dueOn: { lte: today } } }),
    db.flashcard.count({ where: { reviews: { none: { userId } } } }),
  ]);
  // Unseen cards count towards the plan, capped so a new account is not told to
  // do 400 cards on day one.
  return due + Math.min(unseen, 15);
}

/** Loads today's saved plan, generating and storing one on first request. */
export async function getOrCreateTodayPlan(userId: string): Promise<{ date: string; items: PlanItem[] }> {
  const date = isoDate();
  const existing = await db.dailyPlan.findUnique({ where: { userId_date: { userId, date } } });

  if (existing) {
    return { date, items: JSON.parse(existing.items) as PlanItem[] };
  }

  const items = await buildDailyPlan(userId);
  await db.dailyPlan.create({ data: { userId, date, items: JSON.stringify(items) } });
  return { date, items };
}
