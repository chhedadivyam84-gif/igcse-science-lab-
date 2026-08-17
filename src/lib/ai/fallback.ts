import 'server-only';

import { findLibraryDiagram } from '@/lib/diagrams/library';
import type { ExplainResult, NoteDoc, NoteStyle, Storyboard, SubjectSlug } from '@/lib/types';
import { searchCurriculum } from './grounding';

/**
 * Curriculum-only generators, used when no AI provider is configured.
 *
 * These never invent content. They assemble what the platform already holds and
 * return `aiAssisted: false`, so the UI can tell the student exactly what they
 * are looking at instead of silently degrading.
 */

export const NO_AI_NOTICE =
  'No AI model is connected, so this was assembled directly from the platform curriculum database rather than generated. Add an API key in .env to enable full generation.';

export async function explainFromCurriculum(
  question: string,
  subject?: SubjectSlug,
): Promise<ExplainResult | null> {
  const results = await searchCurriculum(question, { subject, limit: 2 });
  const primary = results.subtopics[0];
  if (!primary) return null;

  const lesson = primary.lessons[0];
  const definition = results.definitions[0];

  return {
    question,
    simple:
      definition?.statement ??
      `${primary.title}: ${primary.summary}`,
    igcse: lesson
      ? lesson.body.slice(0, 1400)
      : `${primary.summary}\n\nThis subtopic (${primary.number}) covers:\n${primary.objectives
          .map((o) => `- ${o.statement}`)
          .join('\n')}`,
    analogy: '',
    diagram: findLibraryDiagram(question),
    keyTerms: results.definitions.slice(0, 5).map((d) => ({ term: d.term, meaning: d.statement })),
    formulae: results.formulas.slice(0, 4).map((f) => ({
      expression: f.expression,
      meaning: `${f.name} — result in ${f.resultUnit}`,
    })),
    workedExample: null,
    commonMistake: lesson?.misconceptions[0] ?? '',
    examQuestion: { stem: '', marks: 0, markScheme: [] },
    quiz: [],
    sourceRefs: results.subtopics.map((s) => s.number),
    aiAssisted: false,
  };
}

export async function notesFromCurriculum(
  request: string,
  style: NoteStyle,
  subject?: SubjectSlug,
): Promise<NoteDoc | null> {
  const results = await searchCurriculum(request, { subject, limit: 2 });
  const primary = results.subtopics[0];
  if (!primary) return null;

  const lesson = primary.lessons[0];
  const blocks: NoteDoc['blocks'] = [{ type: 'heading', text: primary.title }];

  blocks.push({ type: 'text', text: primary.summary });

  if (primary.objectives.length) {
    blocks.push({ type: 'heading', text: 'You need to be able to' });
    blocks.push({ type: 'bullets', items: primary.objectives.map((o) => o.statement) });
  }

  for (const definition of results.definitions.slice(0, 4)) {
    blocks.push({ type: 'definition', term: definition.term, statement: definition.examWording ?? definition.statement });
  }

  for (const formula of results.formulas.slice(0, 4)) {
    blocks.push({
      type: 'formula',
      expression: formula.expression,
      meaning: formula.name,
      unit: formula.resultUnit,
    });
  }

  if (lesson?.misconceptions.length) {
    blocks.push({
      type: 'callout',
      tone: 'warning',
      title: 'Common mistake',
      text: lesson.misconceptions[0],
    });
  }

  if (lesson?.examTips.length) {
    blocks.push({
      type: 'callout',
      tone: 'exam',
      title: 'In the exam',
      text: lesson.examTips.join(' '),
    });
  }

  return {
    title: primary.title,
    subtitle: `${primary.subject === 'physics' ? 'Physics 0625' : 'Chemistry 0620'} · ${primary.number} ${primary.topicTitle}`,
    style,
    blocks,
    sourceRefs: results.subtopics.map((s) => s.number),
    aiAssisted: false,
  };
}

export async function storyboardFromCurriculum(
  request: string,
  subject?: SubjectSlug,
): Promise<Storyboard | null> {
  const results = await searchCurriculum(request, { subject, limit: 1 });
  const primary = results.subtopics[0];
  if (!primary) return null;

  const lesson = primary.lessons[0];
  const diagram = findLibraryDiagram(request);

  const scenes: Storyboard['scenes'] = [
    {
      id: 'scene-1',
      title: 'What this is',
      narration: primary.summary,
      seconds: 9,
      visual: 'intro',
      bullets: [primary.title, `Syllabus ${primary.number}`],
    },
  ];

  if (primary.objectives.length) {
    scenes.push({
      id: 'scene-2',
      title: 'What you need to know',
      narration: primary.objectives.map((o) => o.statement).join(' '),
      seconds: 12,
      visual: 'summary',
      bullets: primary.objectives.slice(0, 4).map((o) => o.statement.slice(0, 90)),
    });
  }

  if (diagram) {
    scenes.push({
      id: 'scene-3',
      title: diagram.title,
      narration: diagram.explanation.join(' '),
      seconds: 14,
      visual: 'diagram',
      diagram,
      bullets: diagram.keyTerms.slice(0, 3).map((t) => t.term),
    });
  }

  if (lesson?.examTips.length) {
    scenes.push({
      id: 'scene-4',
      title: 'In the exam',
      narration: lesson.examTips.join(' '),
      seconds: 12,
      visual: 'summary',
      bullets: lesson.examTips.slice(0, 3),
    });
  }

  return {
    title: primary.title,
    subject: primary.subject,
    scenes,
    sourceRefs: [primary.number],
    aiAssisted: false,
  };
}
