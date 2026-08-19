// Relative import (not the `@/` alias) so the Prisma seed script can run this
// file through tsx without extra path resolution.
import type { Difficulty, Provenance, QuestionType, SubjectSlug, Tier } from '../types';

/**
 * The curriculum seed format.
 *
 * This is the single source of truth for syllabus structure. It is versioned:
 * when Cambridge revises a specification, add a new SyllabusSeed rather than
 * editing the old one, so past cohorts keep the structure they were taught.
 *
 * Provenance is explicit and surfaced in the UI. Nothing in here is presented
 * as the official Cambridge wording unless it has been checked against the
 * published specification and marked OFFICIAL_CHECKED by an administrator.
 */

export type ObjectiveSeed = {
  code: string;
  statement: string;
  tier: Tier;
};

export type WorkedExample = {
  prompt: string;
  steps: string[];
  answer: string;
};

export type LessonSeed = {
  slug: string;
  title: string;
  readingMinutes: number;
  /** Light markdown: `### heading`, `- bullet`, `1. step`, **bold**, `code`. */
  body: string;
  analogy?: string;
  misconceptions: string[];
  examTips: string[];
  workedExamples: WorkedExample[];
};

export type FlashcardSeed = {
  front: string;
  back: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
};

export type QuestionSeed = {
  type: QuestionType;
  difficulty: Difficulty;
  stem: string;
  options?: { id: string; text: string; why?: string }[];
  answer: string;
  markScheme: string[];
  marks: number;
  explanation: string;
  hint?: string;
};

export type SubtopicSeed = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  /** Subtopic numbers that should be understood first. */
  prerequisites?: string[];
  objectives?: ObjectiveSeed[];
  lessons?: LessonSeed[];
  flashcards?: FlashcardSeed[];
  questions?: QuestionSeed[];
  /** Simulation slugs from src/lib/curriculum/simulations.ts */
  simulations?: string[];
};

export type TopicSeed = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  subtopics: SubtopicSeed[];
};

export type SyllabusSeed = {
  subject: {
    code: string;
    slug: SubjectSlug;
    name: string;
    tagline: string;
    accent: SubjectSlug;
  };
  version: {
    code: string;
    label: string;
    examFrom: number;
    examTo: number;
    provenance: Provenance;
    sourceNote: string;
  };
  topics: TopicSeed[];
};

export type FormulaSeed = {
  key: string;
  subject: SubjectSlug;
  subtopicNumber?: string;
  name: string;
  expression: string;
  variables: { symbol: string; label: string; unit: string; si: string }[];
  resultUnit: string;
  notes?: string;
};

export type DefinitionSeed = {
  subject: SubjectSlug;
  subtopicNumber?: string;
  term: string;
  statement: string;
  examWording?: string;
};
