import type { SubjectSlug } from '@/lib/types';
import { z } from 'zod';
import { db } from '@/lib/db';
import { handleRoute, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding, searchCurriculum } from '@/lib/ai/grounding';
import { tutorSystemPrompt } from '@/lib/ai/prompts';
import { NO_AI_NOTICE } from '@/lib/ai/fallback';
import { TUTOR_MODES } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  message: z.string().trim().min(2, 'Ask a question first.').max(2000),
  mode: z.enum(TUTOR_MODES).default('IGCSE'),
  conversationId: z.string().cuid().optional(),
  subject: z.enum(['physics', 'chemistry']).optional(),
  subtopicNumber: z.string().max(8).optional(),
  topicHint: z.string().max(160).optional(),
});

export const POST = handleRoute('tutor', async (request) => {
  const user = await requireAiAccess('tutor');
  const body = await parseBody(request, schema);

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
        mode: body.mode,
        subtopicId: null,
      },
    });
    conversationId = created.id;
  }

  const history = await db.aIMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
    take: 20,
    select: { role: true, content: true },
  });

  const grounding = await buildGrounding(body.message, {
    subject: body.subject,
    subtopicNumber: body.subtopicNumber,
  });

  await db.aIMessage.create({
    data: { conversationId, role: 'user', content: body.message },
  });

  const provider = getAiProvider();
  const encoder = new TextEncoder();

  // --- no provider: answer from the curriculum database only -----------------
  if (!provider) {
    const text = await curriculumAnswer(body.message, body.subject, body.subtopicNumber);
    await db.aIMessage.create({
      data: {
        conversationId,
        role: 'assistant',
        content: text,
        grounding: JSON.stringify(grounding.sourceRefs),
        provider: 'curriculum',
      },
    });
    return new Response(encoder.encode(text), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Conversation-Id': conversationId,
        'X-Grounding': JSON.stringify(grounding.sourceRefs),
        'X-AI-Assisted': 'false',
      },
    });
  }

  // --- streamed model response ----------------------------------------------
  const system = tutorSystemPrompt(body.mode, grounding.text, body.topicHint);
  const messages = [
    ...history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user' as const, content: body.message },
  ];

  const convId = conversationId;
  let collected = '';

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of provider.stream({ system, messages, maxTokens: 1600 })) {
          collected += chunk;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'The AI request failed. Please try again.';
        controller.enqueue(encoder.encode(`\n\n_[${message}]_`));
        collected += `\n\n[error: ${message}]`;
      } finally {
        controller.close();
        // Persist after the client has the whole answer.
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
          data: { updatedAt: new Date(), mode: body.mode },
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
      'X-AI-Assisted': 'true',
    },
  });
});

/** Assembles an answer purely from stored curriculum content. */
async function curriculumAnswer(
  question: string,
  subject?: SubjectSlug,
  subtopicNumber?: string,
): Promise<string> {
  const results = await searchCurriculum(question, { subject, subtopicNumber, limit: 2 });
  const lines: string[] = [`**${NO_AI_NOTICE}**`, ''];

  if (!results.subtopics.length && !results.definitions.length && !results.formulas.length) {
    lines.push(
      'Nothing in the curriculum database matched that question. Try naming the topic directly — for example "electromagnetic induction" or "ionic bonding" — or browse the syllabus from the Learn page.',
    );
    return lines.join('\n');
  }

  for (const subtopic of results.subtopics) {
    lines.push(`### ${subtopic.number} ${subtopic.title}`, '', subtopic.summary, '');
    if (subtopic.objectives.length) {
      lines.push('**You should be able to:**');
      for (const objective of subtopic.objectives) lines.push(`- ${objective.statement}`);
      lines.push('');
    }
    const lesson = subtopic.lessons[0];
    if (lesson) {
      lines.push(lesson.body.slice(0, 1800), '');
      if (lesson.misconceptions.length) {
        lines.push('**Watch out for:**');
        for (const m of lesson.misconceptions) lines.push(`- ${m}`);
        lines.push('');
      }
    }
  }

  if (results.definitions.length) {
    lines.push('### Definitions');
    for (const d of results.definitions) lines.push(`- **${d.term}** — ${d.examWording ?? d.statement}`);
    lines.push('');
  }

  if (results.formulas.length) {
    lines.push('### Equations');
    for (const f of results.formulas) lines.push(`- \`${f.expression}\` — ${f.name} (${f.resultUnit})`);
  }

  return lines.join('\n');
}
