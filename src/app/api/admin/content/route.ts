import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireOwner } from '@/lib/auth';
import { DIFFICULTIES, QUESTION_TYPES } from '@/lib/types';

export const dynamic = 'force-dynamic';

const questionSchema = z.object({
  kind: z.literal('question'),
  id: z.string(),
  stem: z.string().min(4).max(4000),
  answer: z.string().max(4000),
  explanation: z.string().max(4000),
  marks: z.number().min(1).max(20),
  difficulty: z.enum(DIFFICULTIES),
  type: z.enum(QUESTION_TYPES),
  markScheme: z.array(z.string().max(500)).max(20),
});

const lessonSchema = z.object({
  kind: z.literal('lesson'),
  id: z.string(),
  title: z.string().min(2).max(200),
  body: z.string().min(10).max(40000),
  analogy: z.string().max(2000).optional(),
  misconceptions: z.array(z.string().max(600)).max(12),
  examTips: z.array(z.string().max(600)).max(12),
  readingMinutes: z.number().min(1).max(60),
});

const definitionSchema = z.object({
  kind: z.literal('definition'),
  id: z.string(),
  term: z.string().min(2).max(120),
  statement: z.string().min(4).max(1200),
  examWording: z.string().max(1200).optional(),
});

const formulaSchema = z.object({
  kind: z.literal('formula'),
  id: z.string(),
  name: z.string().min(2).max(120),
  expression: z.string().min(1).max(200),
  resultUnit: z.string().max(60),
  notes: z.string().max(600).optional(),
});

const schema = z.discriminatedUnion('kind', [questionSchema, lessonSchema, definitionSchema, formulaSchema]);

/** Edits authored content. Every write is admin-only and validated. */
export const PATCH = handleRoute('admin/content', async (request) => {
  await requireOwner();
  const body = await parseBody(request, schema);

  try {
    if (body.kind === 'question') {
      await db.question.update({
        where: { id: body.id },
        data: {
          stem: body.stem,
          answer: body.answer,
          explanation: body.explanation,
          marks: body.marks,
          difficulty: body.difficulty,
          type: body.type,
          markScheme: JSON.stringify(body.markScheme),
        },
      });
    } else if (body.kind === 'lesson') {
      await db.lesson.update({
        where: { id: body.id },
        data: {
          title: body.title,
          body: body.body,
          analogy: body.analogy ?? null,
          misconceptions: JSON.stringify(body.misconceptions),
          examTips: JSON.stringify(body.examTips),
          readingMinutes: body.readingMinutes,
        },
      });
    } else if (body.kind === 'definition') {
      await db.definition.update({
        where: { id: body.id },
        data: { term: body.term, statement: body.statement, examWording: body.examWording ?? null },
      });
    } else {
      await db.formula.update({
        where: { id: body.id },
        data: {
          name: body.name,
          expression: body.expression,
          resultUnit: body.resultUnit,
          notes: body.notes ?? null,
        },
      });
    }
  } catch {
    return fail('That record no longer exists.', 404);
  }

  return ok({ ok: true });
});
