import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { QUESTION_SYSTEM } from '@/lib/ai/prompts';
import { extractJson } from '@/lib/json';
import { DIFFICULTIES, QUESTION_TYPES } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  subtopicId: z.string(),
  count: z.number().min(1).max(6).default(3),
  difficulty: z.enum(DIFFICULTIES).optional(),
  types: z.array(z.enum(QUESTION_TYPES)).optional(),
});

const modelSchema = z.object({
  questions: z
    .array(
      z.object({
        type: z.enum(QUESTION_TYPES),
        difficulty: z.enum(DIFFICULTIES),
        stem: z.string(),
        options: z.array(z.object({ id: z.string(), text: z.string(), why: z.string().default('') })).default([]),
        answer: z.string(),
        marks: z.number().min(1).max(12),
        markScheme: z.array(z.string()).default([]),
        explanation: z.string(),
        hint: z.string().optional(),
      }),
    )
    .min(1),
});

/**
 * Generates extra practice questions for a subtopic.
 *
 * Everything created here is stored with origin AI_GENERATED and reviewStatus
 * PENDING. The practice engine only serves APPROVED questions, so generated
 * items reach students through the admin review queue, never automatically.
 */
export const POST = handleRoute('questions', async (request) => {
  await requireAiAccess('question-generation');
  const body = await parseBody(request, schema);

  const subtopic = await db.subtopic.findUnique({
    where: { id: body.subtopicId },
    include: {
      objectives: true,
      topic: { include: { version: { include: { subject: true } } } },
    },
  });
  if (!subtopic) return fail('Subtopic not found.', 404);

  const provider = getAiProvider();
  if (!provider) {
    return fail(
      'No AI model is connected, so new questions cannot be generated. The authored question bank is still available in Practice.',
      503,
      { code: 'ai_unavailable' },
    );
  }

  const grounding = await buildGrounding(`${subtopic.title} ${subtopic.summary}`, {
    subtopicNumber: subtopic.number,
  });

  const instruction = [
    `Write ${body.count} question(s) on "${subtopic.number} ${subtopic.title}" for Cambridge IGCSE ${subtopic.topic.version.subject.name} ${subtopic.topic.version.subject.code}.`,
    body.difficulty ? `Difficulty: ${body.difficulty}.` : 'Vary the difficulty.',
    body.types?.length ? `Use only these types: ${body.types.join(', ')}.` : '',
    subtopic.objectives.length
      ? `Target these objectives:\n${subtopic.objectives.map((o) => `- ${o.statement}`).join('\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  const raw = await provider.complete({
    system: `${QUESTION_SYSTEM}\n\n${grounding.text}`,
    messages: [{ role: 'user', content: instruction }],
    maxTokens: 3000,
    temperature: 0.6,
    responseFormat: 'json',
  });

  const parsed = extractJson<unknown>(raw, null);
  const validated = parsed ? modelSchema.safeParse(parsed) : null;
  if (!validated?.success) {
    return fail('The AI returned questions in an unexpected format. Please try again.', 502, {
      code: 'ai_shape',
    });
  }

  const created = [];
  for (const q of validated.data.questions.slice(0, body.count)) {
    const row = await db.question.create({
      data: {
        subjectId: subtopic.topic.version.subject.id,
        subtopicId: subtopic.id,
        type: q.type,
        difficulty: q.difficulty,
        stem: q.stem,
        options: JSON.stringify(q.type === 'MCQ' ? q.options : []),
        answer: q.answer,
        markScheme: JSON.stringify(q.markScheme),
        marks: q.marks,
        explanation: q.explanation,
        hint: q.hint ?? null,
        origin: 'AI_GENERATED',
        reviewStatus: 'PENDING',
      },
    });
    await db.contentReview.create({
      data: { entityType: 'question', entityId: row.id, status: 'PENDING' },
    });
    created.push(row);
  }

  return ok({
    created: created.length,
    pendingReview: true,
    notice:
      'These are AI-generated practice questions, not Cambridge past-paper questions. They are queued for review and will appear in Practice once an administrator approves them.',
    questions: created.map((q) => ({
      id: q.id,
      type: q.type,
      difficulty: q.difficulty,
      stem: q.stem,
      marks: q.marks,
      origin: q.origin,
      reviewStatus: q.reviewStatus,
    })),
  });
});
