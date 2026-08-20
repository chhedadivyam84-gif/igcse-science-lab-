import 'server-only';

import { db } from '@/lib/db';
import { parseList } from '@/lib/json';
import { unique } from '@/lib/utils';
import type { SubjectSlug } from '@/lib/types';

/**
 * Retrieval over the curriculum database.
 *
 * Every AI route calls this first, so answers are anchored to content that
 * exists in the platform rather than to whatever the model recalls. The
 * returned `sourceRefs` are shown to the student as the provenance of the answer.
 */

export type GroundingContext = {
  /** Formatted block injected into the system prompt. */
  text: string;
  /** Subtopic numbers used, e.g. ["4.5", "4.2"]. */
  sourceRefs: string[];
  subjects: SubjectSlug[];
  /** True when nothing relevant was found — routes should say so plainly. */
  empty: boolean;
};

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'is', 'are', 'was', 'were', 'be', 'been',
  'for', 'on', 'with', 'as', 'by', 'at', 'from', 'it', 'this', 'that', 'these', 'those',
  'how', 'why', 'what', 'when', 'where', 'which', 'who', 'does', 'do', 'did', 'can', 'could',
  'explain', 'describe', 'tell', 'me', 'about', 'please', 'my', 'i', 'you', 'give', 'like',
]);

export function keywords(query: string): string[] {
  return unique(
    query
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2 && !STOPWORDS.has(word)),
  ).slice(0, 8);
}

export type CurriculumSearchResult = {
  subtopics: {
    number: string;
    title: string;
    summary: string;
    subject: SubjectSlug;
    topicTitle: string;
    slug: string;
    topicSlug: string;
    objectives: { code: string; statement: string; tier: string }[];
    lessons: { title: string; body: string; misconceptions: string[]; examTips: string[] }[];
    score: number;
  }[];
  definitions: { term: string; statement: string; examWording: string | null; subject: SubjectSlug }[];
  formulas: { name: string; expression: string; resultUnit: string; notes: string | null; subject: SubjectSlug }[];
};

/** Keyword search across subtopics, definitions and formulas. */
export async function searchCurriculum(
  query: string,
  options: { subject?: SubjectSlug; subtopicNumber?: string; limit?: number } = {},
): Promise<CurriculumSearchResult> {
  const words = keywords(query);
  const limit = options.limit ?? 4;

  const subtopicRows = await db.subtopic.findMany({
    where: {
      ...(options.subtopicNumber
        ? { number: options.subtopicNumber }
        : words.length
          ? {
              OR: [
                ...words.map((w) => ({ title: { contains: w } })),
                ...words.map((w) => ({ summary: { contains: w } })),
                ...words.map((w) => ({ lessons: { some: { body: { contains: w } } } })),
              ],
            }
          : {}),
      ...(options.subject
        ? { topic: { version: { subject: { slug: options.subject } } } }
        : {}),
    },
    include: {
      objectives: { orderBy: { order: 'asc' } },
      lessons: { orderBy: { order: 'asc' }, take: 1 },
      topic: { include: { version: { include: { subject: true } } } },
    },
    take: 24,
  });

  const scored = subtopicRows
    .map((row) => {
      const haystack = `${row.title} ${row.summary} ${row.lessons[0]?.body ?? ''}`.toLowerCase();
      // Title matches are worth much more than a passing mention in the body.
      const score = words.reduce((total, word) => {
        let s = 0;
        if (row.title.toLowerCase().includes(word)) s += 6;
        if (row.summary.toLowerCase().includes(word)) s += 3;
        if (haystack.includes(word)) s += 1;
        return total + s;
      }, options.subtopicNumber ? 100 : 0);

      return {
        number: row.number,
        title: row.title,
        summary: row.summary,
        subject: row.topic.version.subject.slug as SubjectSlug,
        topicTitle: row.topic.title,
        slug: row.slug,
        topicSlug: row.topic.slug,
        objectives: row.objectives.map((o) => ({ code: o.code, statement: o.statement, tier: o.tier })),
        lessons: row.lessons.map((l) => ({
          title: l.title,
          body: l.body,
          misconceptions: parseList<string>(l.misconceptions),
          examTips: parseList<string>(l.examTips),
        })),
        score,
      };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  /* Definitions and formulas do not depend on each other, so they go together.
     Awaiting them in turn cost a whole extra database round trip on every AI
     request, which is money the assistant does not have to spend when the
     database is on another continent from the server. */
  const [definitionRows, formulaRows] = await Promise.all([
    words.length
      ? db.definition.findMany({
          where: {
            OR: [
              ...words.map((w) => ({ term: { contains: w } })),
              ...words.map((w) => ({ statement: { contains: w } })),
            ],
            ...(options.subject ? { subject: { slug: options.subject } } : {}),
          },
          include: { subject: true },
          take: 6,
        })
      : Promise.resolve([]),

    words.length
      ? db.formula.findMany({
          where: {
            OR: [
              ...words.map((w) => ({ name: { contains: w } })),
              ...words.map((w) => ({ expression: { contains: w } })),
            ],
            ...(options.subject ? { subject: { slug: options.subject } } : {}),
          },
          include: { subject: true },
          take: 6,
        })
      : Promise.resolve([]),
  ]);

  return {
    subtopics: scored,
    definitions: definitionRows.map((d) => ({
      term: d.term,
      statement: d.statement,
      examWording: d.examWording,
      subject: d.subject.slug as SubjectSlug,
    })),
    formulas: formulaRows.map((f) => ({
      name: f.name,
      expression: f.expression,
      resultUnit: f.resultUnit,
      notes: f.notes,
      subject: f.subject.slug as SubjectSlug,
    })),
  };
}

/** Formats search results into the block that goes into the system prompt. */
export async function buildGrounding(
  query: string,
  options: { subject?: SubjectSlug; subtopicNumber?: string } = {},
): Promise<GroundingContext> {
  const results = await searchCurriculum(query, options);
  const sourceRefs = results.subtopics.map((s) => s.number);
  const subjects = unique(results.subtopics.map((s) => s.subject));

  if (!results.subtopics.length && !results.definitions.length && !results.formulas.length) {
    return {
      text: 'No matching content was found in the platform curriculum database for this question.',
      sourceRefs: [],
      subjects: [],
      empty: true,
    };
  }

  const parts: string[] = ['<curriculum_context>'];

  for (const s of results.subtopics) {
    parts.push(
      `<subtopic number="${s.number}" subject="${s.subject}" title="${s.title}">`,
      `Topic: ${s.topicTitle}`,
      `Summary: ${s.summary}`,
    );
    if (s.objectives.length) {
      parts.push('Learning objectives (teacher-mapped, not verbatim Cambridge wording):');
      for (const o of s.objectives) parts.push(`  - [${o.tier}] ${o.statement}`);
    }
    const lesson = s.lessons[0];
    if (lesson) {
      // Trim long lesson bodies — the model needs the substance, not every word.
      parts.push(`Lesson "${lesson.title}":`, lesson.body.slice(0, 2200));
      if (lesson.misconceptions.length) {
        parts.push('Known misconceptions:');
        for (const m of lesson.misconceptions) parts.push(`  - ${m}`);
      }
      if (lesson.examTips.length) {
        parts.push('Exam technique notes:');
        for (const t of lesson.examTips) parts.push(`  - ${t}`);
      }
    }
    parts.push('</subtopic>');
  }

  if (results.definitions.length) {
    parts.push('<definitions>');
    for (const d of results.definitions) {
      parts.push(`- ${d.term}: ${d.statement}${d.examWording ? ` (exam wording: ${d.examWording})` : ''}`);
    }
    parts.push('</definitions>');
  }

  if (results.formulas.length) {
    parts.push('<formulae>');
    for (const f of results.formulas) {
      parts.push(`- ${f.name}: ${f.expression} — result in ${f.resultUnit}${f.notes ? `. ${f.notes}` : ''}`);
    }
    parts.push('</formulae>');
  }

  parts.push('</curriculum_context>');

  return { text: parts.join('\n'), sourceRefs, subjects, empty: false };
}
