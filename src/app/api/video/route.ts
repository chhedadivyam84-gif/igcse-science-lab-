import { z } from 'zod';
import { SUBJECT_SLUGS } from '@/lib/types';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { STORYBOARD_REVIEW_SYSTEM, STORYBOARD_SYSTEM } from '@/lib/ai/prompts';
import { storyboardFromCurriculum } from '@/lib/ai/fallback';
import { findLibraryDiagram } from '@/lib/diagrams/library';
import { extractJson } from '@/lib/json';
import { clamp } from '@/lib/utils';
import type { GraphShape, Storyboard, StoryboardScene } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VISUALS = [
  'intro',
  'definition',
  'equation',
  'process',
  'graph',
  'compare',
  'particles',
  'wave',
  'circuit',
  'diagram',
  'summary',
] as const;
const SHAPES: GraphShape[] = ['linear', 'proportional', 'levelling', 'decay', 'inverse', 'curve-up', 'peak'];

const schema = z.object({
  request: z.string().trim().min(4, 'Say what the explainer should cover.').max(300),
  subject: z.enum(SUBJECT_SLUGS).optional(),
  save: z.boolean().default(true),
});

const str = z.string().trim();
const sideSchema = z.object({ title: str, points: z.array(str).default([]) });

const sceneSchema = z.object({
  id: z.string().default(''),
  title: str,
  narration: str,
  seconds: z.coerce.number().default(10),
  visual: z.string().default('summary'),
  caption: str.optional(),
  bullets: z.array(str).default([]),
  labels: z.array(str).optional(),
  term: str.optional(),
  definition: str.optional(),
  equation: z
    .object({
      expression: str,
      legend: z.array(z.object({ symbol: str, meaning: str, unit: str.optional() })).default([]),
    })
    .optional()
    .catch(undefined),
  steps: z.array(str).optional().catch(undefined),
  graph: z.object({ xLabel: str, yLabel: str, shape: z.string(), note: str.optional() }).optional().catch(undefined),
  compare: z.object({ left: sideSchema, right: sideSchema }).optional().catch(undefined),
  particleMode: z.string().optional(),
  waveMode: z.string().optional(),
  circuitMode: z.string().optional(),
});

const modelSchema = z.object({
  title: z.string(),
  subject: z.preprocess((v) => (typeof v === 'string' ? v.toLowerCase().trim() : v), z.enum(SUBJECT_SLUGS)).catch('physics'),
  scenes: z.array(sceneSchema).min(3),
});

/**
 * Models fill unused blocks with null, "" or {} ("graph": null on a
 * definition scene). Strip those before validating so an unused block is
 * simply absent instead of failing the whole storyboard.
 */
function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean).filter((v) => v !== undefined);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const c = clean(v);
      if (c === undefined || c === null || c === '') continue;
      if (typeof c === 'object' && !Array.isArray(c) && !Object.keys(c as object).length) continue;
      out[k] = c;
    }
    return out;
  }
  return value === null ? undefined : value;
}

type ModelStoryboard = z.infer<typeof modelSchema>;

function pick<T extends string>(value: string | undefined, allowed: readonly T[]): T | undefined {
  return allowed.find((option) => option === value);
}

/**
 * Turn a model scene into a player scene, downgrading any visual whose data is
 * missing. A graph with no axes or an equation with no expression would
 * otherwise render as a generic animation that teaches the wrong thing.
 */
function toScene(
  scene: ModelStoryboard['scenes'][number],
  index: number,
  libraryDiagram: ReturnType<typeof findLibraryDiagram>,
): StoryboardScene {
  let visual = (VISUALS as readonly string[]).includes(scene.visual) ? scene.visual : 'summary';
  const graphShape = pick(scene.graph?.shape, SHAPES);

  if (visual === 'equation' && !scene.equation?.expression) visual = 'definition';
  if (visual === 'definition' && !(scene.term && scene.definition)) visual = scene.steps?.length ? 'process' : 'summary';
  if (visual === 'process' && (scene.steps?.length ?? 0) < 2) visual = 'summary';
  if (visual === 'graph' && !(scene.graph && graphShape)) visual = 'summary';
  if (visual === 'compare' && !(scene.compare?.left.points.length && scene.compare?.right.points.length)) visual = 'summary';
  if (visual === 'diagram' && !libraryDiagram) visual = scene.steps?.length ? 'process' : 'summary';

  return {
    id: scene.id || `scene-${index + 1}`,
    title: scene.title,
    narration: scene.narration,
    seconds: clamp(Math.round(scene.seconds), 6, 20),
    visual,
    diagram: visual === 'diagram' ? (libraryDiagram ?? undefined) : undefined,
    bullets: scene.bullets.slice(0, 4),
    caption: scene.caption,
    labels: scene.labels?.slice(0, 6),
    term: scene.term,
    definition: scene.definition,
    equation: scene.equation
      ? { expression: scene.equation.expression, legend: scene.equation.legend.slice(0, 5) }
      : undefined,
    steps: scene.steps?.slice(0, 5),
    graph: scene.graph && graphShape ? { ...scene.graph, shape: graphShape } : undefined,
    compare: scene.compare
      ? {
          left: { title: scene.compare.left.title, points: scene.compare.left.points.slice(0, 4) },
          right: { title: scene.compare.right.title, points: scene.compare.right.points.slice(0, 4) },
        }
      : undefined,
    particleMode: pick(scene.particleMode, ['solid', 'liquid', 'gas', 'diffusion'] as const) ?? 'gas',
    waveMode: pick(scene.waveMode, ['transverse', 'longitudinal'] as const) ?? 'transverse',
    circuitMode: pick(scene.circuitMode, ['series', 'parallel'] as const) ?? 'series',
  };
}

export const POST = handleRoute('video', async (request) => {
  const user = await requireAiAccess('explainer');
  const body = await parseBody(request, schema);

  const provider = getAiProvider();
  let storyboard: Storyboard | null = null;

  if (!provider) {
    storyboard = await storyboardFromCurriculum(body.request, body.subject);
    if (!storyboard) {
      return fail(
        'No AI model is connected and nothing in the curriculum database matched that request. Add an API key in .env, or name the topic directly.',
        503,
        { code: 'ai_unavailable' },
      );
    }
  } else {
    const grounding = await buildGrounding(body.request, { subject: body.subject });
    const system = `${STORYBOARD_SYSTEM}\n\n${grounding.text}`;
    const raw = await provider.complete({
      system,
      messages: [{ role: 'user', content: body.request }],
      maxTokens: 7000,
      temperature: 0.2,
      responseFormat: 'json',
    });

    const parsed = extractJson<unknown>(raw, null);
    const validated = parsed ? modelSchema.safeParse(clean(parsed)) : null;
    if (parsed && !validated?.success) console.warn('[video] storyboard rejected:', validated?.error?.issues.slice(0, 3));
    if (!validated?.success) {
      return fail('The AI returned a storyboard in an unexpected format. Please try again.', 502, {
        code: 'ai_shape',
      });
    }

    // Second pass: an examiner-style check that fixes wrong facts, equations,
    // graph shapes and visuals that do not match the narration. If the review
    // itself fails, the first draft (already validated) is used.
    let draft: ModelStoryboard = validated.data;
    try {
      const reviewed = await provider.complete({
        system: `${STORYBOARD_REVIEW_SYSTEM}\n\n${grounding.text}`,
        messages: [
          {
            role: 'user',
            content: `Student request: ${body.request}\n\nStoryboard to check:\n${JSON.stringify(draft)}`,
          },
        ],
        maxTokens: 7000,
        temperature: 0,
        responseFormat: 'json',
      });
      const checked = modelSchema.safeParse(clean(extractJson<unknown>(reviewed, null)));
      if (checked.success) draft = checked.data;
    } catch (error) {
      console.warn('[video] storyboard review skipped:', error instanceof Error ? error.message : error);
    }

    // Attach a checked diagram to any scene asking for one, so the visual that
    // carries the science is drawn from verified data.
    const libraryDiagram = findLibraryDiagram(body.request);

    storyboard = {
      title: draft.title,
      subject: draft.subject,
      scenes: draft.scenes.slice(0, 8).map((scene, index) => toScene(scene, index, libraryDiagram)),
      sourceRefs: grounding.sourceRefs,
      aiAssisted: true,
    };
  }

  let id: string | null = null;
  if (body.save) {
    const media = await db.generatedMedia.create({
      data: {
        userId: user.id,
        kind: 'EXPLAINER',
        title: storyboard.title,
        spec: JSON.stringify(storyboard),
      },
    });
    id = media.id;
  }

  return ok({ id, storyboard });
});
