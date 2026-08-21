import 'server-only';

import { db } from '@/lib/db';
import { parseList } from '@/lib/json';
import { seededShuffle } from '@/lib/utils';
import type { SubjectSlug } from '@/lib/types';
import { blueprintFor, paperFor, type PaperBlueprint } from './blueprints';

/**
 * Builds a predicted paper.
 *
 * What "predicted" honestly means here: a paper assembled to the real paper's
 * structure — its mark total, its timing, its question style — and weighted
 * towards the topics that recur across series. It is not a leak, it contains no
 * past-paper text, and every question was written for this platform.
 *
 * Two decisions worth knowing about:
 *
 *   - The paper is deterministic for a given subject and paper number. Two
 *     students revising together sit the same paper and can compare marks,
 *     which a freshly shuffled set would make impossible.
 *   - If the bank cannot fill the blueprint, the builder says so rather than
 *     padding to length. A 40-mark paper labelled 80 teaches the wrong timing,
 *     which is worse than no paper at all.
 */

export type PredictedQuestion = {
  id: string;
  type: string;
  difficulty: string;
  stem: string;
  marks: number;
  subject: string;
  origin: string;
  highYield: boolean;
  subtopic: { id: string; number: string; title: string; slug: string; topicSlug: string } | null;
  options: { id: string; text: string }[];
};

export type PredictedPaper = {
  paper: PaperBlueprint;
  syllabusCode: string;
  seriesLabel: string;
  questions: PredictedQuestion[];
  /** Marks the assembled paper actually carries. */
  marksBuilt: number;
  /** Marks the real paper carries. */
  marksTarget: number;
  /** True when the bank filled the blueprint. */
  complete: boolean;
  /** How many of the questions are drawn from the high-yield list. */
  highYieldCount: number;
  minutes: number;
};

/**
 * Picks questions summing as close to the mark total as possible, never over.
 *
 * A single greedy pass is not good enough here. Whole questions rarely tile to
 * the target by luck, so greedy can stop several marks short while questions
 * that would have fitted a *different* combination sit unused — Chemistry Paper
 * 6 landed on 36 of 40 with 53 marks available. That then reads as "the bank
 * cannot fill this paper", which is simply false.
 *
 * So this searches for an exact fit instead. Candidates arrive in priority
 * order (high-yield first) and a total is only ever recorded the first time it
 * is reached, which keeps the search biased towards those earlier questions.
 * The pools are at most a few dozen questions against a target under 200, so
 * the work is trivial.
 */
function fillToTarget<T extends { marks: number }>(candidates: T[], target: number): T[] {
  /** Mark total -> the indices that reach it. */
  const reachable = new Map<number, number[]>([[0, []]]);

  for (let i = 0; i < candidates.length; i++) {
    const marks = candidates[i].marks;
    if (marks <= 0) continue;
    // Snapshot, so each question is used at most once per total.
    for (const [sum, picked] of [...reachable]) {
      const next = sum + marks;
      if (next > target || reachable.has(next)) continue;
      reachable.set(next, [...picked, i]);
    }
    if (reachable.has(target)) break;
  }

  const best = reachable.has(target)
    ? target
    : Math.max(...reachable.keys());

  return (reachable.get(best) ?? []).map((index) => candidates[index]);
}

/** A stable seed per paper, so the same paper comes back every time. */
function seedFor(subject: string, paperNumber: string): number {
  let hash = 0;
  for (const ch of `${subject}:${paperNumber}`) hash = (hash * 31 + ch.charCodeAt(0)) % 100000;
  return hash;
}

export async function buildPredictedPaper(
  subject: SubjectSlug,
  paperNumber: string,
): Promise<PredictedPaper | { error: string }> {
  const paper = paperFor(subject, paperNumber);
  if (!paper) return { error: 'That paper does not exist for this subject.' };
  if (!paper.buildable) {
    return { error: paper.note ?? 'A predicted version of this paper cannot be assembled.' };
  }

  const blueprint = blueprintFor(subject);

  const rows = await db.question.findMany({
    where: {
      reviewStatus: 'APPROVED',
      subject: { slug: subject },
      // Three distinct paper shapes, and they must not borrow from each other:
      // a multiple-choice paper is all MCQ; an Alternative-to-Practical paper is
      // only the experimental-skills questions; a theory paper is everything
      // else, which means excluding both.
      ...(paper.style === 'MCQ'
        ? { type: 'MCQ', practical: false }
        : paper.style === 'PRACTICAL'
          ? { practical: true }
          : { type: { not: 'MCQ' }, practical: false }),
      // Core papers do not carry Extended-only material.
      ...(paper.tier === 'CORE' ? { difficulty: { not: 'CHALLENGE' } } : {}),
    },
    include: { subtopic: { include: { topic: true } }, subject: true },
  });

  if (!rows.length) {
    return { error: 'There are no questions in the bank for this paper yet.' };
  }

  // High-yield first, in rank order; everything else shuffled behind them, so
  // the paper leads with what recurs and fills out with breadth.
  const seed = seedFor(subject, paperNumber);
  const ranked = rows.filter((q) => q.highYield).sort((a, b) => a.examRank - b.examRank);
  const rest = seededShuffle(
    rows.filter((q) => !q.highYield),
    seed,
  );

  const chosen = fillToTarget([...ranked, ...rest], paper.marks);
  const marks = chosen.reduce((sum, q) => sum + q.marks, 0);

  return {
    paper,
    syllabusCode: blueprint.syllabusCode,
    seriesLabel: blueprint.seriesLabel,
    questions: chosen.map((q) => ({
      id: q.id,
      type: q.type,
      difficulty: q.difficulty,
      stem: q.stem,
      marks: q.marks,
      subject: q.subject.slug,
      origin: q.origin,
      highYield: q.highYield,
      subtopic: q.subtopic
        ? {
            id: q.subtopic.id,
            number: q.subtopic.number,
            title: q.subtopic.title,
            slug: q.subtopic.slug,
            topicSlug: q.subtopic.topic.slug,
          }
        : null,
      // Answers, mark schemes and distractor rationales stay on the server
      // until the student submits, exactly as the practice endpoint does.
      options: parseList<{ id: string; text: string }>(q.options).map((o) => ({ id: o.id, text: o.text })),
    })),
    marksBuilt: marks,
    marksTarget: paper.marks,
    // Whole questions rarely tile exactly to the mark total, so a paper that
    // lands on 79 of 80 is finished, not short. The warning is for papers the
    // bank genuinely cannot fill.
    complete: marks >= paper.marks - 2,
    highYieldCount: chosen.filter((q) => q.highYield).length,
    // Scale the time with the paper actually built, so the pace per mark is
    // right even when the bank cannot yet fill the blueprint.
    minutes: Math.max(5, Math.round((marks / paper.marks) * paper.minutes)),
  };
}

/** The recurring question forms for a subject, ranked. Answers are not included. */
export async function highYieldFor(subject: SubjectSlug) {
  const rows = await db.question.findMany({
    where: { reviewStatus: 'APPROVED', subject: { slug: subject }, highYield: true },
    include: { subtopic: { include: { topic: true } } },
    orderBy: { examRank: 'asc' },
  });

  return rows.map((q) => ({
    id: q.id,
    rank: q.examRank,
    stem: q.stem,
    marks: q.marks,
    type: q.type,
    trap: q.trap,
    subtopic: q.subtopic
      ? {
          id: q.subtopic.id,
          number: q.subtopic.number,
          title: q.subtopic.title,
          slug: q.subtopic.slug,
          topicSlug: q.subtopic.topic.slug,
        }
      : null,
  }));
}
