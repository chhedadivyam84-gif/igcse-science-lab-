import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { VOICE_SYSTEM } from '@/lib/ai/prompts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The spoken tutor.
 *
 * Separate from /api/tutor rather than a flag on it, because the constraints are
 * genuinely different: a fast model instead of a reasoning one, a much smaller
 * token budget, and a prompt that forbids markdown. Sharing one route would mean
 * one of the two modes always carrying settings that hurt it.
 */
const schema = z.object({
  message: z.string().trim().min(1, 'Say something first.').max(1000),
  conversationId: z.string().cuid().optional(),
  subject: z.enum(['physics', 'chemistry']).optional(),
  topicHint: z.string().max(160).optional(),
});

export const POST = handleRoute('voice', async (request) => {
  const user = await requireAiAccess('voice');
  const body = await parseBody(request, schema);

  // Latency is the whole product here, so the fast model is not optional.
  const provider = getAiProvider({ fast: true });
  if (!provider) {
    return fail(
      'No AI model is connected, so the voice tutor cannot answer. Add a key in .env — the written tutor and the whole curriculum still work without one.',
      503,
      { code: 'ai_unavailable' },
    );
  }

  // --- conversation ---------------------------------------------------------
  let conversationId = body.conversationId;
  if (conversationId) {
    const existing = await db.aIConversation.findFirst({
      where: { id: conversationId, userId: user.id },
      select: { id: true },
    });
    if (!existing) conversationId = undefined;
  }
  if (!conversationId) {
    const created = await db.aIConversation.create({
      data: {
        userId: user.id,
        title: body.message.slice(0, 70),
        mode: 'VOICE',
      },
    });
    conversationId = created.id;
  }

  // Spoken exchanges are short, so more of them fit in the same context — and a
  // voice conversation relies far more on what was just said.
  const history = await db.aIMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'desc' },
    take: 12,
    select: { role: true, content: true },
  });
  history.reverse();

  const grounding = await buildGrounding(body.message, { subject: body.subject });

  await db.aIMessage.create({
    data: { conversationId, role: 'user', content: body.message },
  });

  const system = [
    VOICE_SYSTEM,
    body.topicHint ? `The student is currently studying: ${body.topicHint}.` : '',
    grounding.text,
  ]
    .filter(Boolean)
    .join('\n\n');

  const messages = [
    ...history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user' as const, content: body.message },
  ];

  const convId = conversationId;
  const encoder = new TextEncoder();
  let collected = '';

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        // A tight cap keeps replies conversational — a long answer is a worse
        // answer when it is being spoken aloud.
        for await (const chunk of provider.stream({ system, messages, maxTokens: 320, temperature: 0.6 })) {
          collected += chunk;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'The voice tutor stopped unexpectedly.';
        controller.enqueue(encoder.encode(` Sorry, something went wrong. ${message}`));
        collected += `\n[error: ${message}]`;
      } finally {
        controller.close();
        await db.aIMessage.create({
          data: {
            conversationId: convId,
            role: 'assistant',
            content: collected,
            grounding: JSON.stringify(grounding.sourceRefs),
            provider: provider.id,
          },
        });
        await db.aIConversation.update({
          where: { id: convId },
          data: { updatedAt: new Date() },
        });
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Conversation-Id': conversationId,
      'X-Grounding': JSON.stringify(grounding.sourceRefs),
    },
  });
});
