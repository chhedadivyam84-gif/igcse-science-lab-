import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { ASSISTANT_SYSTEM } from '@/lib/ai/prompts';
import { extractJson } from '@/lib/json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ACTION_KINDS = ['learn', 'practice', 'simulation', 'flashcards', 'notes', 'explain', 'voice', 'page'] as const;

const schema = z.object({
  message: z.string().trim().min(1).max(1000),
  /** Where the student is, so answers can be about what they are looking at. */
  pathname: z.string().max(300).optional(),
  history: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().max(2000) }))
    .max(8)
    .default([]),
});

const actionsSchema = z.array(
  z.object({
    kind: z.enum(ACTION_KINDS),
    target: z.string().default(''),
    label: z.string().max(48),
  }),
);

/** Separates the prose answer from the trailing action list. */
const ACTION_MARKER = '<<<ACTIONS>>>';

/** Static destinations the assistant may link to, by name. */
const PAGES: Record<string, string> = {
  dashboard: '/dashboard',
  progress: '/progress',
  mistakes: '/mistakes',
  plan: '/plan',
  practice: '/practice',
  lab: '/lab',
  learn: '/learn',
  'periodic-table': '/periodic-table',
  mole: '/tools/mole',
  'physics-calculator': '/tools/physics',
  flashcards: '/flashcards',
  exam: '/exam',
};

export type AssistantAction = { kind: string; label: string; href: string };

/**
 * The assistant.
 *
 * The model proposes an intent and a target; this route resolves them into real
 * links against the database. That inversion is the whole point — a model that
 * writes its own URLs eventually writes a broken one, and a dead link in a paid
 * product is worse than no suggestion at all. Anything that cannot be resolved
 * is dropped silently rather than shown.
 */
/**
 * Streams the answer as it is written, then sends the resolved actions.
 *
 * The panel used to wait for a complete JSON object before showing anything,
 * which meant several seconds of a blank box even though the first sentence was
 * ready almost immediately. Now the prose streams straight through and the
 * action buttons arrive at the end, so the panel starts answering in about a
 * second.
 *
 * Wire format is newline-delimited JSON, one object per line:
 *   {"type":"delta","text":"..."}     — append to the reply
 *   {"type":"actions","actions":[…]}  — resolved links, once
 *   {"type":"error","error":"..."}    — something went wrong mid-stream
 *   {"type":"done"}
 */
export const POST = handleRoute('assistant', async (request) => {
  await requireAiAccess('tutor');
  const body = await parseBody(request, schema);

  // Fast model: an assistant panel has to feel instant to be worth opening.
  const provider = getAiProvider({ fast: true });
  if (!provider) {
    return fail('No AI model is connected, so the assistant cannot answer.', 503, {
      code: 'ai_unavailable',
    });
  }

  // Sequential on purpose: the grounding search is seeded with the page hint,
  // so it cannot start until the location is known.
  const context = await describeLocation(body.pathname);
  const grounding = await buildGrounding(`${body.message} ${context.hint}`.trim());

  const system = [
    ASSISTANT_SYSTEM,
    context.hint ? `The student is currently on: ${context.hint}` : '',
    grounding.text,
  ]
    .filter(Boolean)
    .join('\n\n');

  const encoder = new TextEncoder();
  const line = (value: unknown) => encoder.encode(`${JSON.stringify(value)}\n`);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let full = '';
      let emitted = 0; // how much of the prose has already been sent

      try {
        for await (const chunk of provider.stream({
          system,
          messages: [...body.history, { role: 'user' as const, content: body.message }],
          maxTokens: 700,
          temperature: 0.4,
        })) {
          full += chunk;

          // Everything before the marker is the answer. Once the marker starts
          // appearing, stop emitting so a half-written "<<<ACTIONS" never
          // flashes up in the panel.
          const markerAt = full.indexOf(ACTION_MARKER);
          const safeEnd =
            markerAt >= 0 ? markerAt : Math.max(0, full.length - ACTION_MARKER.length);

          if (safeEnd > emitted) {
            controller.enqueue(line({ type: 'delta', text: full.slice(emitted, safeEnd) }));
            emitted = safeEnd;
          }
          if (markerAt >= 0) break;
        }

        // Flush any tail that was being held back as a possible marker.
        const markerAt = full.indexOf(ACTION_MARKER);
        const proseEnd = markerAt >= 0 ? markerAt : full.length;
        if (proseEnd > emitted) {
          controller.enqueue(line({ type: 'delta', text: full.slice(emitted, proseEnd) }));
        }

        controller.enqueue(line({ type: 'actions', actions: await parseActions(full) }));
        controller.enqueue(line({ type: 'done' }));
      } catch (error) {
        console.error('[api:assistant] stream failed', error);
        controller.enqueue(
          line({ type: 'error', error: 'The assistant stopped mid-answer. Please try again.' }),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      // Stops proxies buffering the stream and undoing the whole point.
      'X-Accel-Buffering': 'no',
    },
  });
});

/** Reads the trailing action list, resolving each to a real link. */
async function parseActions(full: string): Promise<AssistantAction[]> {
  const markerAt = full.indexOf(ACTION_MARKER);
  if (markerAt < 0) return [];

  const parsed = extractJson<unknown>(full.slice(markerAt + ACTION_MARKER.length), null);
  const validated = parsed ? actionsSchema.safeParse(parsed) : null;
  if (!validated?.success) return [];

  const actions: AssistantAction[] = [];
  for (const action of validated.data.slice(0, 3)) {
    const href = await resolveAction(action.kind, action.target);
    if (href) actions.push({ kind: action.kind, label: action.label, href });
  }
  return actions;
}

/** Turns the current pathname into something the model can reason about. */
async function describeLocation(pathname?: string): Promise<{ hint: string }> {
  if (!pathname) return { hint: '' };

  // Any subject slug, not a fixed pair — this was left behind when Biology,
  // the three maths syllabuses and ICT were added, so the assistant had no idea
  // what page the student was on for five of the seven subjects.
  const learn = pathname.match(/^\/learn\/([a-z-]+)\/([^/]+)\/([^/?]+)/);
  if (learn) {
    const subtopic = await db.subtopic.findFirst({
      where: { slug: learn[3], topic: { slug: learn[2] } },
      select: { number: true, title: true },
    });
    if (subtopic) {
      return { hint: `the subtopic page for ${subtopic.number} ${subtopic.title}` };
    }
  }

  const lab = pathname.match(/^\/lab\/([^/?]+)/);
  if (lab) {
    const simulation = await db.simulation.findUnique({
      where: { slug: lab[1] },
      select: { title: true },
    });
    if (simulation) return { hint: `the "${simulation.title}" simulation` };
  }

  const named: Record<string, string> = {
    '/dashboard': 'their dashboard',
    '/practice': 'the practice page',
    '/exam': 'exam mode',
    '/progress': 'their progress page',
    '/mistakes': 'their mistakes page',
    '/periodic-table': 'the periodic table',
    '/tools/mole': 'the mole calculator',
    '/tools/physics': 'the physics calculator',
    '/flashcards': 'flashcards',
    '/lab': 'the simulation lab',
    '/learn': 'the syllabus browser',
  };

  return { hint: named[pathname] ?? '' };
}

/** Maps a model intent to a real link, or null when it cannot be resolved. */
async function resolveAction(kind: string, target: string): Promise<string | null> {
  const clean = target.trim();

  switch (kind) {
    case 'voice':
      return '/voice';

    case 'page':
      return PAGES[clean.toLowerCase()] ?? null;

    case 'notes':
      return clean ? `/notes?topic=${encodeURIComponent(clean)}` : '/notes';

    case 'explain':
      return clean ? `/explain?q=${encodeURIComponent(clean)}` : '/explain';

    case 'simulation': {
      const simulation = await db.simulation.findFirst({
        where: { OR: [{ slug: clean }, { title: { contains: clean } }] },
        select: { slug: true },
      });
      return simulation ? `/lab/${simulation.slug}` : null;
    }

    case 'learn': {
      const subtopic = await findSubtopic(clean);
      if (!subtopic) return null;
      return `/learn/${subtopic.subject}/${subtopic.topicSlug}/${subtopic.slug}`;
    }

    case 'practice': {
      if (clean.toLowerCase() === 'weak') return '/practice?mode=weak';
      if (clean.toLowerCase() === 'mixed' || !clean) return '/practice?mode=mixed';
      const subtopic = await findSubtopic(clean);
      return subtopic ? `/practice?mode=topic&subtopic=${subtopic.id}` : '/practice?mode=mixed';
    }

    case 'flashcards': {
      if (!clean || clean.toLowerCase() === 'due') return '/flashcards';
      const subtopic = await findSubtopic(clean);
      return subtopic ? `/flashcards?subtopic=${subtopic.id}` : '/flashcards';
    }

    default:
      return null;
  }
}

async function findSubtopic(target: string) {
  const row = await db.subtopic.findFirst({
    where: { OR: [{ number: target }, { title: { contains: target } }] },
    include: { topic: { include: { version: { include: { subject: true } } } } },
  });
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    topicSlug: row.topic.slug,
    subject: row.topic.version.subject.slug,
  };
}
