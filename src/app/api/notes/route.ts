import { z } from 'zod';
import { SUBJECT_SLUGS } from '@/lib/types';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { requireUser } from '@/lib/auth';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { NOTES_SYSTEM } from '@/lib/ai/prompts';
import { notesFromCurriculum } from '@/lib/ai/fallback';
import { extractJson, parseJson } from '@/lib/json';
import type { NoteBlock, NoteDoc } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STYLES = ['clean', 'notebook', 'revision', 'mindmap', 'formula'] as const;

const schema = z.object({
  request: z.string().trim().min(4, 'Say what the notes should cover.').max(300),
  style: z.enum(STYLES).default('clean'),
  subject: z.enum(SUBJECT_SLUGS).optional(),
  save: z.boolean().default(true),
});

const blockSchema: z.ZodType<NoteBlock> = z.discriminatedUnion('type', [
  z.object({ type: z.literal('heading'), text: z.string() }),
  z.object({ type: z.literal('text'), text: z.string() }),
  z.object({ type: z.literal('bullets'), items: z.array(z.string()) }),
  z.object({ type: z.literal('definition'), term: z.string(), statement: z.string() }),
  z.object({ type: z.literal('formula'), expression: z.string(), meaning: z.string(), unit: z.string().optional() }),
  z.object({ type: z.literal('table'), headers: z.array(z.string()), rows: z.array(z.array(z.string())) }),
  z.object({
    type: z.literal('callout'),
    tone: z.enum(['tip', 'warning', 'exam']),
    title: z.string(),
    text: z.string(),
  }),
  z.object({
    type: z.literal('mindmap'),
    centre: z.string(),
    branches: z.array(z.object({ label: z.string(), leaves: z.array(z.string()) })),
  }),
  z.object({ type: z.literal('diagram'), diagramKey: z.string(), caption: z.string() }),
]) as z.ZodType<NoteBlock>;

const modelSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  blocks: z.array(blockSchema).min(1),
});

export const GET = handleRoute('notes/list', async (request) => {
  const user = await requireUser();
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 50);

  const notes = await db.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return ok(
    notes.map((note) => ({
      id: note.id,
      title: note.title,
      style: note.style,
      createdAt: note.createdAt,
      generatedBy: note.generatedBy,
      doc: parseJson<NoteDoc | null>(note.content, null),
    })),
  );
});

export const POST = handleRoute('notes/create', async (request) => {
  const user = await requireAiAccess('notes');
  const body = await parseBody(request, schema);

  const provider = getAiProvider();
  let doc: NoteDoc | null = null;

  if (!provider) {
    doc = await notesFromCurriculum(body.request, body.style, body.subject);
    if (!doc) {
      return fail(
        'No AI model is connected and nothing in the curriculum database matched that request. Add an API key in .env, or name the topic directly.',
        503,
        { code: 'ai_unavailable' },
      );
    }
  } else {
    const grounding = await buildGrounding(body.request, { subject: body.subject });
    const raw = await provider.complete({
      system: `${NOTES_SYSTEM}\n\nThe requested note style is "${body.style}".\n\n${grounding.text}`,
      messages: [{ role: 'user', content: body.request }],
      maxTokens: 3000,
      temperature: 0.35,
      responseFormat: 'json',
    });

    const parsed = extractJson<unknown>(raw, null);
    const validated = parsed ? modelSchema.safeParse(parsed) : null;
    if (!validated?.success) {
      return fail('The AI returned notes in an unexpected format. Please try again.', 502, {
        code: 'ai_shape',
      });
    }

    doc = {
      title: validated.data.title,
      subtitle: validated.data.subtitle,
      style: body.style,
      blocks: validated.data.blocks,
      sourceRefs: grounding.sourceRefs,
      aiAssisted: true,
    };
  }

  let id: string | null = null;
  if (body.save) {
    const saved = await db.note.create({
      data: {
        userId: user.id,
        title: doc.title,
        style: body.style,
        content: JSON.stringify(doc),
        sourceRefs: JSON.stringify(doc.sourceRefs),
        generatedBy: doc.aiAssisted ? 'ai' : 'curriculum',
      },
    });
    id = saved.id;
  }

  return ok({ id, doc });
});
