import 'server-only';

import type { SubjectSlug } from '@/lib/types';
import { db } from '@/lib/db';
import { addDays, clamp, daysBetween, isoDate } from '@/lib/utils';
import type { Difficulty, MistakeCategory } from '@/lib/types';

/**
 * Mastery, streaks and XP.
 *
 * Mastery is an exponentially weighted average of recent results that decays
 * with time, so a topic learned in March does not stay green in November. The
 * stored value is what the student earned; `effectiveMastery` is what they
 * would score today, and the UI shows the second.
 */

/** Attempts weigh more early on, so a new topic moves quickly and then settles. */
function learningRate(attempts: number): number {
  if (attempts <= 1) return 0.6;
  if (attempts <= 3) return 0.4;
  if (attempts <= 8) return 0.28;
  return 0.18;
}

const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  FOUNDATION: 0.85,
  STANDARD: 1,
  CHALLENGE: 1.15,
};

/** Half-life, in days, of unrehearsed knowledge. */
const FORGETTING_HALF_LIFE = 60;
/** Mastery never decays below this fraction of the stored value. */
const DECAY_FLOOR = 0.55;

export function effectiveMastery(mastery: number, lastStudiedAt: Date | null): number {
  if (!lastStudiedAt) return mastery;
  const days = Math.max(0, daysBetween(isoDate(lastStudiedAt), isoDate()));
  const factor = Math.max(DECAY_FLOOR, 2 ** (-days / FORGETTING_HALF_LIFE));
  return Math.round(mastery * factor);
}

export const MASTERY_BANDS = [
  { min: 85, label: 'Mastered', tone: 'positive' as const },
  { min: 65, label: 'Confident', tone: 'accent' as const },
  { min: 40, label: 'Developing', tone: 'caution' as const },
  { min: 0, label: 'Needs work', tone: 'negative' as const },
];

export function masteryBand(value: number) {
  return MASTERY_BANDS.find((band) => value >= band.min) ?? MASTERY_BANDS[MASTERY_BANDS.length - 1];
}

export type AttemptOutcome = {
  mastery: number;
  previousMastery: number;
  xpEarned: number;
  streakDays: number;
  newAchievements: { key: string; title: string; description: string }[];
};

export async function recordAttempt(params: {
  userId: string;
  questionId: string;
  subtopicId: string | null;
  response: string;
  isCorrect: boolean;
  marksAwarded: number;
  timeMs: number;
  mode: string;
  difficulty: Difficulty;
  mistake?: { category: MistakeCategory; detail: string } | null;
}): Promise<AttemptOutcome> {
  const attempt = await db.questionAttempt.create({
    data: {
      userId: params.userId,
      questionId: params.questionId,
      response: params.response,
      isCorrect: params.isCorrect,
      marksAwarded: params.marksAwarded,
      timeMs: params.timeMs,
      mode: params.mode,
    },
  });

  let previousMastery = 0;
  let mastery = 0;

  if (params.subtopicId) {
    const existing = await db.progress.findUnique({
      where: { userId_subtopicId: { userId: params.userId, subtopicId: params.subtopicId } },
    });

    previousMastery = existing ? effectiveMastery(existing.mastery, existing.lastStudiedAt) : 0;
    const attempts = (existing?.attempts ?? 0) + 1;
    const alpha = learningRate(attempts);
    const target = params.isCorrect ? 100 * DIFFICULTY_WEIGHT[params.difficulty] : 0;
    mastery = clamp(Math.round(previousMastery + (target - previousMastery) * alpha), 0, 100);

    await db.progress.upsert({
      where: { userId_subtopicId: { userId: params.userId, subtopicId: params.subtopicId } },
      update: {
        mastery,
        attempts,
        correct: (existing?.correct ?? 0) + (params.isCorrect ? 1 : 0),
        lastStudiedAt: new Date(),
      },
      create: {
        userId: params.userId,
        subtopicId: params.subtopicId,
        mastery,
        attempts: 1,
        correct: params.isCorrect ? 1 : 0,
        lastStudiedAt: new Date(),
      },
    });
  }

  if (!params.isCorrect && params.mistake) {
    await db.mistake.create({
      data: {
        userId: params.userId,
        attemptId: attempt.id,
        subtopicId: params.subtopicId,
        category: params.mistake.category,
        detail: params.mistake.detail,
      },
    });
  }

  const xpEarned = params.isCorrect ? 10 + params.marksAwarded * 5 : 3;
  const streakDays = await touchStreak(params.userId);
  await db.user.update({
    where: { id: params.userId },
    data: { xp: { increment: xpEarned } },
  });

  const newAchievements = await grantAchievements(params.userId, mastery);

  return { mastery, previousMastery, xpEarned, streakDays, newAchievements };
}

/** Advances the streak if this is a new day, resets it if a day was missed. */
export async function touchStreak(userId: string): Promise<number> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { lastActiveOn: true, streakDays: true },
  });
  if (!user) return 0;

  const today = isoDate();
  if (user.lastActiveOn === today) return user.streakDays;

  const continued = user.lastActiveOn ? daysBetween(user.lastActiveOn, today) === 1 : false;
  const streakDays = continued ? user.streakDays + 1 : 1;

  await db.user.update({ where: { id: userId }, data: { lastActiveOn: today, streakDays } });
  return streakDays;
}

async function grantAchievements(userId: string, mastery: number) {
  const earned: { key: string; title: string; description: string }[] = [];

  const [attemptCount, user, conversationCount, noteCount] = await Promise.all([
    db.questionAttempt.count({ where: { userId } }),
    db.user.findUnique({ where: { id: userId }, select: { streakDays: true } }),
    db.aIMessage.count({ where: { conversation: { userId }, role: 'user' } }),
    db.note.count({ where: { userId } }),
  ]);

  const candidates: string[] = [];
  if (attemptCount >= 1) candidates.push('first-steps');
  if ((user?.streakDays ?? 0) >= 3) candidates.push('streak-3');
  if ((user?.streakDays ?? 0) >= 7) candidates.push('streak-7');
  if (mastery >= 80) candidates.push('topic-master');
  if (conversationCount >= 25) candidates.push('curious');
  if (noteCount >= 10) candidates.push('note-taker');

  for (const key of candidates) {
    const achievement = await db.achievement.findUnique({ where: { key } });
    if (!achievement) continue;
    const already = await db.userAchievement.findUnique({
      where: { userId_achievementId: { userId, achievementId: achievement.id } },
    });
    if (already) continue;

    await db.userAchievement.create({ data: { userId, achievementId: achievement.id } });
    await db.user.update({ where: { id: userId }, data: { xp: { increment: achievement.xp } } });
    earned.push({ key, title: achievement.title, description: achievement.description });
  }

  return earned;
}

/** XP curve: each level costs a little more than the last. */
export function levelFromXp(xp: number): { level: number; into: number; needed: number; label: string } {
  let level = 1;
  let remaining = xp;
  let cost = 150;
  while (remaining >= cost) {
    remaining -= cost;
    level++;
    cost = Math.round(cost * 1.18);
  }
  const labels = ['Novice', 'Apprentice', 'Analyst', 'Investigator', 'Physicist', 'Chemist', 'Scholar', 'Laureate'];
  return {
    level,
    into: remaining,
    needed: cost,
    label: labels[Math.min(level - 1, labels.length - 1)],
  };
}

export type SubtopicProgress = {
  subtopicId: string;
  number: string;
  title: string;
  slug: string;
  topicSlug: string;
  subject: SubjectSlug;
  mastery: number;
  attempts: number;
  correct: number;
  lastStudiedAt: Date | null;
};

export async function progressForUser(userId: string): Promise<SubtopicProgress[]> {
  const rows = await db.progress.findMany({
    where: { userId },
    include: {
      subtopic: { include: { topic: { include: { version: { include: { subject: true } } } } } },
    },
  });

  return rows.map((row) => ({
    subtopicId: row.subtopicId,
    number: row.subtopic.number,
    title: row.subtopic.title,
    slug: row.subtopic.slug,
    topicSlug: row.subtopic.topic.slug,
    subject: row.subtopic.topic.version.subject.slug as SubjectSlug,
    mastery: effectiveMastery(row.mastery, row.lastStudiedAt),
    attempts: row.attempts,
    correct: row.correct,
    lastStudiedAt: row.lastStudiedAt,
  }));
}

export function subjectMastery(progress: SubtopicProgress[], subject: SubjectSlug, totalSubtopics: number) {
  const rows = progress.filter((p) => p.subject === subject);
  if (!rows.length || totalSubtopics === 0) {
    return { studied: 0, total: totalSubtopics, mastery: 0, mastered: 0 };
  }
  // Averaged across the whole syllabus, not just what has been touched — a
  // student who has studied one subtopic well is not 100% ready.
  const sum = rows.reduce((total, row) => total + row.mastery, 0);
  return {
    studied: rows.length,
    total: totalSubtopics,
    mastery: Math.round(sum / totalSubtopics),
    mastered: rows.filter((r) => r.mastery >= 85).length,
  };
}

/** SM-2 style scheduler for flashcards. */
export function scheduleCard(
  state: { ease: number; intervalDays: number; repetitions: number; lapses: number },
  rating: 'again' | 'hard' | 'good' | 'easy',
) {
  let { ease, intervalDays, repetitions, lapses } = state;

  if (rating === 'again') {
    repetitions = 0;
    lapses += 1;
    intervalDays = 0;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    const quality = rating === 'hard' ? 3 : rating === 'good' ? 4 : 5;
    ease = clamp(ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)), 1.3, 2.8);
    repetitions += 1;
    if (repetitions === 1) intervalDays = rating === 'easy' ? 3 : 1;
    else if (repetitions === 2) intervalDays = rating === 'easy' ? 7 : 4;
    else intervalDays = Math.round(intervalDays * ease * (rating === 'hard' ? 0.7 : 1));
    intervalDays = clamp(intervalDays, 1, 365);
  }

  return {
    ease: Number(ease.toFixed(2)),
    intervalDays,
    repetitions,
    lapses,
    dueOn: addDays(isoDate(), Math.max(intervalDays, rating === 'again' ? 0 : 1)),
  };
}
