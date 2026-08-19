import { z } from 'zod';
import { SUBJECT_SLUGS } from '@/lib/types';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { EXPLAIN_SYSTEM } from '@/lib/ai/prompts';
import { explainFromCurriculum } from '@/lib/ai/fallback';
import { findLibraryDiagram } from '@/lib/diagrams/library';
import { extractJson } from '@/lib/json';
import type { ExplainResult } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  question: z.string().trim().min(4, 'Ask a fuller question.').max(400),
  subject: z.enum(SUBJECT_SLUGS).optional(),
});

// The model's JSON is validated before it reaches the UI, so a malformed
// response produces a clear error rather than a half-rendered lesson.
const modelSchema = z.object({
  simple: z.string(),
  igcse: z.string(),
  analogy: z.string(),
  keyTerms: z.array(z.object({ term: z.string(), meaning: z.string() })).default([]),
  formulae: z.array(z.object({ expression: z.string(), meaning: z.string() })).default([]),
  workedExample: z
    .object({ prompt: z.string(), steps: z.array(z.string()), answer: z.string() })
    .nullable()
    .default(null),
  commonMistake: z.string().default(''),
  examQuestion: z
    .object({ stem: z.string(), marks: z.number(), markScheme: z.array(z.string()) })
    .default({ stem: '', marks: 0, markScheme: [] }),
  quiz: z
    .array(
      z.object({
        stem: z.string(),
        options: z.array(z.string()),
        answerIndex: z.number(),
        why: z.string(),
      }),
    )
    .default([]),
  diagramHint: z.string().default(''),
});

export const POST = handleRoute('explain', async (request) => {
  await requireAiAccess('explain');
  const body = await parseBody(request, schema);

  const provider = getAiProvider();

  if (!provider) {
    const fallback = await explainFromCurriculum(body.question, body.subject);
    if (!fallback) {
      return fail(
        'No AI model is connected and nothing in the curriculum database matched that question. Add an API key in .env, or try naming the topic directly.',
        503,
        { code: 'ai_unavailable' },
      );
    }
    return ok(fallback);
  }

  const grounding = await buildGrounding(body.question, { subject: body.subject });
  const raw = await provider.complete({
    system: `${EXPLAIN_SYSTEM}\n\n${grounding.text}`,
    messages: [{ role: 'user', content: body.question }],
    maxTokens: 3000,
    temperature: 0.3,
    responseFormat: 'json',
  });

  const parsed = extractJson<unknown>(raw, null);
  if (!parsed) {
    return fail('The AI response could not be read. Please try again.', 502, { code: 'ai_parse' });
  }

  const validated = modelSchema.safeParse(parsed);
  if (!validated.success) {
    return fail('The AI response was incomplete. Please try again.', 502, { code: 'ai_shape' });
  }
  const data = validated.data;

  // A checked library diagram always beats a generated one for accuracy.
  const diagram =
    findLibraryDiagram(body.question) ??
    (data.diagramHint ? findLibraryDiagram(data.diagramHint) : null);

  const result: ExplainResult = {
    question: body.question,
    simple: data.simple,
    igcse: data.igcse,
    analogy: data.analogy,
    diagram,
    keyTerms: data.keyTerms.slice(0, 8),
    formulae: data.formulae.slice(0, 4),
    workedExample: data.workedExample,
    commonMistake: data.commonMistake,
    examQuestion: data.examQuestion,
    // Drop any quiz item whose answerIndex does not point at a real option.
    quiz: data.quiz.filter((q) => q.options.length >= 2 && q.answerIndex >= 0 && q.answerIndex < q.options.length),
    sourceRefs: grounding.sourceRefs,
    aiAssisted: true,
  };

  return ok(result);
});
