import { biology0610 } from './biology';
import { chemistry0620 } from './chemistry';
import { ict0417 } from './ict';
import { physics0625 } from './physics';
import { definitions } from './definitions';
import { formulas } from './formulas';
import { simulations } from './simulations';
import type { SubtopicSeed, SyllabusSeed, TopicSeed } from './types';
import type { SubjectSlug } from '../types';

export { biology0610, chemistry0620, ict0417, physics0625, definitions, formulas, simulations };
export type * from './types';

/**
 * Active syllabus versions. Adding a revised specification is a matter of
 * appending a new seed here and flipping `isActive` at seed time — nothing in
 * the application reads the syllabus any other way.
 */
export const syllabuses: SyllabusSeed[] = [physics0625, chemistry0620, biology0610, ict0417];

export function syllabusFor(subject: SubjectSlug): SyllabusSeed {
  const found = syllabuses.find((s) => s.subject.slug === subject);
  if (!found) throw new Error(`No syllabus seeded for subject "${subject}"`);
  return found;
}

/** Flattens a syllabus into subtopics, carrying the parent topic along. */
export function allSubtopics(
  seed: SyllabusSeed,
): { topic: TopicSeed; subtopic: SubtopicSeed }[] {
  return seed.topics.flatMap((topic) => topic.subtopics.map((subtopic) => ({ topic, subtopic })));
}

export function findSubtopicByNumber(number: string): {
  syllabus: SyllabusSeed;
  topic: TopicSeed;
  subtopic: SubtopicSeed;
} | null {
  for (const syllabus of syllabuses) {
    for (const topic of syllabus.topics) {
      const subtopic = topic.subtopics.find((s) => s.number === number);
      if (subtopic) return { syllabus, topic, subtopic };
    }
  }
  return null;
}

/** Counts used by the marketing copy on the homepage — never hard-coded. */
export function curriculumStats() {
  const topics = syllabuses.reduce((n, s) => n + s.topics.length, 0);
  const subtopics = syllabuses.reduce(
    (n, s) => n + s.topics.reduce((m, t) => m + t.subtopics.length, 0),
    0,
  );
  const objectives = syllabuses.reduce(
    (n, s) =>
      n +
      s.topics.reduce(
        (m, t) => m + t.subtopics.reduce((k, st) => k + (st.objectives?.length ?? 0), 0),
        0,
      ),
    0,
  );
  const lessons = syllabuses.reduce(
    (n, s) =>
      n +
      s.topics.reduce(
        (m, t) => m + t.subtopics.reduce((k, st) => k + (st.lessons?.length ?? 0), 0),
        0,
      ),
    0,
  );
  const questions = syllabuses.reduce(
    (n, s) =>
      n +
      s.topics.reduce(
        (m, t) => m + t.subtopics.reduce((k, st) => k + (st.questions?.length ?? 0), 0),
        0,
      ),
    0,
  );
  const flashcards = syllabuses.reduce(
    (n, s) =>
      n +
      s.topics.reduce(
        (m, t) => m + t.subtopics.reduce((k, st) => k + (st.flashcards?.length ?? 0), 0),
        0,
      ),
    0,
  );

  return {
    topics,
    subtopics,
    objectives,
    lessons,
    questions,
    flashcards,
    formulas: formulas.length,
    definitions: definitions.length,
    simulations: simulations.length,
  };
}
