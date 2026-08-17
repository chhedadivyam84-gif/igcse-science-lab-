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

const modelSchema = z.object({
  reply: z.string(),
  actions: z
    .array(
      z.object({
        kind: z.enum(ACTION_KINDS),
        target: z.string().default(''),
        label: z.string().max(48),
      }),
    )
    .default([]),
});

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

  // What the student is looking at, resolved from the URL they are on.
  const context = await describeLocation(body.pathname);
  const grounding = await buildGrounding(`${body.message} ${context.hint}`.trim());

  const system = [
    ASSISTANT_SYSTEM,
    context.hint ? `The student is currently on: ${context.hint}` : '',
    grounding.text,
  ]
    .filter(Boolean)
    .join('\n\n');

  const raw = await provider.complete({
    system,
    messages: [...body.history, { role: 'user' as const, content: body.message }],
    maxTokens: 700,
    temperature: 0.4,
    responseFormat: 'json',
  });

  const parsed = extractJson<unknown>(raw, null);
  const validated = parsed ? modelSchema.safeParse(parsed) : null;
  if (!validated?.success) {
    return fail('The assistant returned something unreadable. Please try again.', 502, {
      code: 'ai_shape',
    });
  }

  const actions: AssistantAction[] = [];
  for (const action of validated.data.actions.slice(0, 3)) {
    const href = await resolveAction(action.kind, action.target);
    if (href) actions.push({ kind: action.kind, label: action.label, href });
  }

  return ok({
    reply: validated.data.reply,
    actions,
    grounding: grounding.sourceRefs,
  });
});

/** Turns the current pathname into something the model can reason about. */
async function describeLocation(pathname?: string): Promise<{ hint: string }> {
  if (!pathname) return { hint: '' };

  const learn = pathname.match(/^\/learn\/(physics|chemistry)\/([^/]+)\/([^/?]+)/);
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
