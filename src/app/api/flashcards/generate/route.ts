import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { extractJson } from '@/lib/json';
import type { SubjectSlug } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * AI flashcards: a fresh set of 50–60 cards for one subtopic every time.
 *
 * "Fresh" is enforced, not hoped for: the fronts already in that subtopic's
 * deck are sent to the model as a do-not-repeat list, and anything that still
 * comes back near-identical is dropped before saving. The cards are written
 * in two halves in parallel, each with its own focus, so a set arrives in
 * about the time one half takes and the halves do not overlap.
 *
 * New cards are saved into the subtopic's deck (origin AI_GENERATED), so they
 * join spaced repetition and the deck grows with every request.
 */
const schema = z.object({
  subtopicId: z.string().min(1),
  /** Optional narrower focus, e.g. "transformers only". */
  focus: z.string().trim().max(160).optional(),
  count: z.number().int().min(10).max(60).default(60),
});

const cardSchema = z.object({
  front: z.string().trim().min(3).max(400),
  back: z.string().trim().min(1).max(700),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).catch('MEDIUM'),
});

const HALVES = [
  'definitions, key terms, laws and rules, equations (with every symbol and its SI unit), units, standard values and the key facts an examiner expects word for word',
  'explanations ("why…", "what happens when…"), the steps of processes and mechanisms, experiments and practical details, real-world applications, comparisons, and the commonest exam mistakes',
];

function system(count: number, focus: string, avoid: string[]) {
  return `You write flashcards for Cambridge IGCSE students revising one subtopic.

Return ONLY JSON: { "cards": [ { "front": "...", "back": "...", "difficulty": "EASY" | "MEDIUM" | "HARD" } ] }

Write exactly ${count} cards focused on: ${focus}.

Rules:
- Every card tests ONE fact or idea. Front: a clear question or prompt, max 25 words. Back: the answer an examiner would accept, max 45 words, with the unit where there is one.
- Everything must be correct at Cambridge IGCSE level and agree with <curriculum_context>. Leave out anything you are not sure of.
- Mix difficulties: about a third EASY, a third MEDIUM, a third HARD (HARD = extended/supplement content or multi-step reasoning).
- No two cards may test the same thing. Vary the angle: recall, explain, apply, compare, calculate a quick value, spot the mistake.
- Plain text, no markdown. Write powers and subscripts with Unicode (m/s², H₂O).
${avoid.length ? `- These fronts already exist in the deck. Do NOT repeat them or ask the same thing in other words:\n${avoid.map((f) => `  • ${f}`).join('\n')}` : ''}
The response must parse with JSON.parse.`;
}

const key = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(what|is|the|a|an|of|define|state|which|why|does|do|how)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const POST = handleRoute('flashcards/generate', async (request) => {
  await requireAiAccess('flashcard-generation');
  const body = await parseBody(request, schema);

  const subtopic = await db.subtopic.findUnique({
    where: { id: body.subtopicId },
    include: { topic: { include: { version: { include: { subject: true } } } } },
  });
  if (!subtopic) return fail('That topic could not be found.', 404);

  const provider = getAiProvider();
  if (!provider) return fail('AI flashcards need the AI key to be set.', 503, { code: 'ai_unavailable' });

  const subject = subtopic.topic.version.subject.slug as SubjectSlug;
  const existing = await db.flashcard.findMany({
    where: { subtopicId: subtopic.id },
    select: { front: true },
    orderBy: { createdAt: 'desc' },
    take: 300,
  });
  const avoid = existing.map((c) => c.front.slice(0, 140));

  const label = `${subtopic.number} ${subtopic.title}${body.focus ? ` — focus: ${body.focus}` : ''}`;
  const grounding = await buildGrounding(`${subtopic.title} ${body.focus ?? ''}`, {
    subject,
    subtopicNumber: subtopic.number,
  });

  const half = Math.ceil(body.count / 2);
  const results = await Promise.allSettled(
    HALVES.map((focus) =>
      provider.complete({
        system: `${system(half, focus, avoid)}\n\n${grounding.text}`,
        messages: [{ role: 'user', content: `Subtopic: ${label} (${subtopic.topic.version.subject.name})` }],
        maxTokens: 8000,
        temperature: 0.9,
        responseFormat: 'json',
      }),
    ),
  );

  const seen = new Set(existing.map((c) => key(c.front)));
  const fresh: z.infer<typeof cardSchema>[] = [];
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    const parsed = extractJson<{ cards?: unknown[] }>(result.value, {});
    for (const raw of parsed.cards ?? []) {
      const card = cardSchema.safeParse(raw);
      if (!card.success) continue;
      const k = key(card.data.front);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      fresh.push(card.data);
    }
  }

  if (!fresh.length) {
    return fail('The AI could not write new cards right now. Please try again.', 502, { code: 'ai_shape' });
  }

  const created = await db.flashcard.createManyAndReturn({
    data: fresh.slice(0, body.count).map((card) => ({
      subtopicId: subtopic.id,
      front: card.front,
      back: card.back,
      difficulty: card.difficulty,
      origin: 'AI_GENERATED',
    })),
  });

  const subtopicInfo = {
    number: subtopic.number,
    title: subtopic.title,
    slug: subtopic.slug,
    topicSlug: subtopic.topic.slug,
    subjectSlug: subject,
  };

  return ok({
    added: created.length,
    deckSize: existing.length + created.length,
    cards: created.map((card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
      difficulty: card.difficulty,
      origin: card.origin,
      subtopic: subtopicInfo,
      repetitions: 0,
      isNew: true,
    })),
  });
});
