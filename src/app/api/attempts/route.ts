import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { parseList, parseJson } from '@/lib/json';
import { recordAttempt } from '@/lib/progress';
import { MISTAKE_CATEGORIES, PRACTICE_MODES, type Difficulty, type MistakeCategory } from '@/lib/types';

export const dynamic = 'force-dynamic';

const schema = z.object({
  questionId: z.string(),
  response: z.string().max(4000),
  timeMs: z.number().min(0).max(3_600_000).default(0),
  mode: z.enum(PRACTICE_MODES).default('topic'),
  /** Marks the student awarded themselves against the mark scheme. */
  selfMarks: z.number().min(0).max(20).optional(),
  /** Optional override when the student disagrees with the auto-classification. */
  mistakeCategory: z.enum(MISTAKE_CATEGORIES).optional(),
});

/** Question types a computer can mark reliably. */
const AUTO_MARKED = new Set(['MCQ', 'NUMERICAL']);

export const POST = handleRoute('attempts', async (request) => {
  const user = await requireUser();
  const body = await parseBody(request, schema);

  const question = await db.question.findUnique({
    where: { id: body.questionId },
    include: { subtopic: true },
  });
  if (!question) return fail('Question not found.', 404);

  const markScheme = parseList<string>(question.markScheme);
  const options = parseJson<{ id: string; text: string; why?: string }[]>(question.options, []);

  // --- written answers: the student marks against the scheme ---------------
  if (!AUTO_MARKED.has(question.type) && body.selfMarks === undefined) {
    return ok({
      requiresSelfMark: true,
      marks: question.marks,
      answer: question.answer,
      markScheme,
      explanation: question.explanation,
      recorded: false,
    });
  }

  let isCorrect: boolean;
  let marksAwarded: number;
  let unitProblem = false;

  if (question.type === 'MCQ') {
    isCorrect = body.response.trim().toLowerCase() === question.answer.trim().toLowerCase();
    marksAwarded = isCorrect ? question.marks : 0;
  } else if (question.type === 'NUMERICAL') {
    const result = markNumerical(body.response, question.answer);
    isCorrect = result.correct;
    unitProblem = result.unitProblem;
    marksAwarded = isCorrect ? question.marks : result.numberCorrect ? Math.max(question.marks - 1, 1) : 0;
  } else {
    marksAwarded = Math.min(body.selfMarks ?? 0, question.marks);
    isCorrect = marksAwarded >= question.marks;
  }

  const mistake = isCorrect
    ? null
    : {
        category: body.mistakeCategory ?? classify(question.type, unitProblem),
        detail: buildDetail(question.stem, body.response, question.answer, unitProblem),
      };

  const outcome = await recordAttempt({
    userId: user.id,
    questionId: question.id,
    subtopicId: question.subtopicId,
    response: body.response,
    isCorrect,
    marksAwarded,
    timeMs: body.timeMs,
    mode: body.mode,
    difficulty: question.difficulty as Difficulty,
    mistake,
  });

  return ok({
    recorded: true,
    isCorrect,
    marksAwarded,
    marks: question.marks,
    answer: question.answer,
    markScheme,
    explanation: question.explanation,
    unitProblem,
    // Now that the answer is committed, the distractor rationales are useful.
    options,
    mistakeCategory: mistake?.category ?? null,
    subtopic: question.subtopic
      ? { id: question.subtopic.id, number: question.subtopic.number, title: question.subtopic.title, slug: question.subtopic.slug }
      : null,
    progress: {
      mastery: outcome.mastery,
      previousMastery: outcome.previousMastery,
      xpEarned: outcome.xpEarned,
      streakDays: outcome.streakDays,
    },
    achievements: outcome.newAchievements,
  });
});

/**
 * Marks a numerical answer: the value must be within 1.5%, and if a unit was
 * expected it must be present. A right number with a missing unit is reported
 * separately so the mistake analyser can log it as a unit error.
 */
function markNumerical(response: string, expected: string) {
  const responseValue = firstNumber(response);
  const expectedValue = firstNumber(expected);

  if (responseValue === null || expectedValue === null) {
    return {
      correct: response.trim().toLowerCase() === expected.trim().toLowerCase(),
      numberCorrect: false,
      unitProblem: false,
    };
  }

  const tolerance = Math.max(Math.abs(expectedValue) * 0.015, 1e-9);
  const numberCorrect = Math.abs(responseValue - expectedValue) <= tolerance;

  const expectedUnit = unitOf(expected);
  const responseUnit = unitOf(response);
  const unitProblem = Boolean(expectedUnit) && responseUnit !== expectedUnit;

  return { correct: numberCorrect && !unitProblem, numberCorrect, unitProblem };
}

/** Reads the first number, understanding "3.2 × 10^4" and "3.2e4". */
function firstNumber(text: string): number | null {
  const normalised = text
    .replace(/\s/g, '')
    .replace(/×10\^?/gi, 'e')
    .replace(/x10\^?/gi, 'e')
    .replace(/⁻/g, '-')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)));
  const match = normalised.match(/-?\d+(?:\.\d+)?(?:e-?\d+)?/i);
  return match ? Number(match[0]) : null;
}

/** Everything after the number, normalised for comparison. */
function unitOf(text: string): string {
  const stripped = text
    .replace(/-?\d+(?:\.\d+)?/g, ' ')
    .replace(/×\s*10\s*\^?\s*-?\d*/gi, ' ')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, ' ')
    .replace(/[()]/g, ' ')
    .trim()
    .toLowerCase();
  // Collapse whitespace and strip trailing punctuation so "5.0 m/s." matches "5 m/s".
  return stripped.replace(/\s+/g, ' ').replace(/[.,;]+$/, '');
}

function classify(type: string, unitProblem: boolean): MistakeCategory {
  if (unitProblem) return 'UNIT';
  if (type === 'NUMERICAL') return 'CALCULATION';
  if (type === 'GRAPH') return 'GRAPH';
  if (type === 'MCQ') return 'CONCEPTUAL';
  return 'CONCEPTUAL';
}

function buildDetail(stem: string, response: string, answer: string, unitProblem: boolean): string {
  if (unitProblem) {
    return `Right value, wrong or missing unit. Expected "${answer}", you wrote "${response}".`;
  }
  return `Answered "${response.slice(0, 120)}" — expected "${answer.slice(0, 120)}" for: ${stem.slice(0, 120)}`;
}
