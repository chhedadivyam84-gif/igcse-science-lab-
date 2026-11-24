import { createHash } from 'crypto';
import type { Difficulty, QuestionType, SubjectSlug } from '@/lib/types';

/**
 * The generated question bank.
 *
 * Every question here is produced by code from a template, and every answer
 * is *computed*, never typed — so a calculation question cannot carry a wrong
 * answer. Templates are seeded, so the bank is identical on every build and
 * each question keeps a stable id (a hash of its subject, subtopic and stem):
 * re-seeding inserts only what is new and never disturbs a student's history.
 */

export type GenQuestion = {
  id: string;
  subject: SubjectSlug;
  subtopic: string;
  type: QuestionType;
  difficulty: Difficulty;
  stem: string;
  options: { id: string; text: string; why?: string }[];
  answer: string;
  markScheme: string[];
  marks: number;
  explanation: string;
  hint?: string;
};

export type GenFlashcard = {
  id: string;
  subject: SubjectSlug;
  subtopic: string;
  front: string;
  back: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
};

export type Made = {
  stem: string;
  answer: string;
  explanation: string;
  markScheme?: string[];
  hint?: string;
  options?: { id: string; text: string; why?: string }[];
  type?: QuestionType;
  marks?: number;
  difficulty?: Difficulty;
};

export type Template = {
  subject: SubjectSlug;
  subtopic: string;
  difficulty?: Difficulty;
  marks?: number;
  /** How many distinct variants to try to produce. */
  count?: number;
  make: (r: Rng) => Made | null;
};

// --- deterministic randomness -------------------------------------------------

export class Rng {
  private state: number;
  constructor(seed: number) {
    this.state = seed >>> 0 || 1;
  }
  next(): number {
    // mulberry32
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  /** Integer in [min, max]. */
  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }
  /** A value from min to max in steps of `step`. */
  step(min: number, max: number, step: number): number {
    const n = Math.round((max - min) / step);
    return round(min + this.int(0, n) * step, 10);
  }
  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.next() * items.length)];
  }
  shuffle<T>(items: readonly T[]): T[] {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

export function hashSeed(text: string): number {
  return parseInt(createHash('sha1').update(text).digest('hex').slice(0, 8), 16);
}

export function stableId(prefix: string, ...parts: string[]): string {
  return `${prefix}_${createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 22)}`;
}

// --- number formatting ---------------------------------------------------------

export function round(value: number, dp: number): number {
  const f = Math.pow(10, dp);
  return Math.round(value * f) / f;
}

/** Significant figures, without trailing float noise; large/small numbers in standard form. */
export function sf(value: number, figures = 3): string {
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e6 || abs < 1e-3) {
    const exp = Math.floor(Math.log10(abs));
    const mant = Number((value / Math.pow(10, exp)).toPrecision(figures));
    return `${mant} × 10^${exp}`;
  }
  return String(Number(value.toPrecision(figures)));
}

/** A clean number for use inside a question stem. */
export function n(value: number): string {
  return String(Number(value.toPrecision(10)));
}

// --- building ------------------------------------------------------------------

const LETTERS = ['a', 'b', 'c', 'd'];

/**
 * Multiple choice from one correct text and distractors. Distractor texts that
 * duplicate the answer are dropped; null if fewer than 3 options remain.
 */
export function mcq(
  r: Rng,
  correct: string,
  distractors: string[],
  why: Record<string, string> = {},
): { options: { id: string; text: string; why?: string }[]; answer: string } | null {
  const unique = [...new Set(distractors.filter((d) => d && d.trim() !== correct.trim()))];
  const chosen = r.shuffle(unique).slice(0, 3);
  if (chosen.length < 2) return null;
  const all = r.shuffle([correct, ...chosen]);
  const options = all.map((text, i) => ({ id: LETTERS[i], text, ...(why[text] ? { why: why[text] } : {}) }));
  return { options, answer: LETTERS[all.indexOf(correct)] };
}

/** Numeric distractors for an MCQ: common slips rather than random numbers. */
export function numericDistractors(value: number, unit: string, extra: number[] = []): string[] {
  const candidates = [value * 10, value / 10, value * 2, value / 2, ...extra].filter(
    (v) => Number.isFinite(v) && Math.abs(v - value) > Math.abs(value) * 0.05,
  );
  return candidates.map((v) => `${sf(v)}${unit ? ` ${unit}` : ''}`);
}

/** Runs every template, keeping only distinct, valid stems. */
export function expand(templates: Template[], prefix: string): GenQuestion[] {
  const out: GenQuestion[] = [];
  templates.forEach((t, index) => {
    const r = new Rng(hashSeed(`${prefix}:${t.subject}:${t.subtopic}:${index}`));
    const want = t.count ?? 40;
    const seen = new Set<string>();
    for (let attempt = 0; attempt < want * 4 && seen.size < want; attempt++) {
      const made = t.make(r);
      if (!made || seen.has(made.stem)) continue;
      seen.add(made.stem);
      const type = made.type ?? (made.options ? 'MCQ' : 'NUMERICAL');
      const marks = made.marks ?? t.marks ?? (type === 'MCQ' ? 1 : 2);
      out.push({
        id: stableId('gq', t.subject, t.subtopic, made.stem),
        subject: t.subject,
        subtopic: t.subtopic,
        type,
        difficulty: made.difficulty ?? t.difficulty ?? 'STANDARD',
        stem: made.stem,
        options: made.options ?? [],
        answer: made.answer,
        markScheme: made.markScheme ?? [`${made.answer} (${marks})`],
        marks,
        explanation: made.explanation,
        hint: made.hint,
      });
    }
  });
  return out;
}

export function card(
  subject: SubjectSlug,
  subtopic: string,
  front: string,
  back: string,
  difficulty: GenFlashcard['difficulty'] = 'MEDIUM',
): GenFlashcard {
  return { id: stableId('gf', subject, subtopic, front), subject, subtopic, front, back, difficulty };
}
