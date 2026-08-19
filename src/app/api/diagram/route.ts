import { z } from 'zod';
import { SUBJECT_SLUGS } from '@/lib/types';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { DIAGRAM_SYSTEM } from '@/lib/ai/prompts';
import { findLibraryDiagram } from '@/lib/diagrams/library';
import { extractJson } from '@/lib/json';
import { clamp } from '@/lib/utils';
import type { DiagramNode, DiagramSpec } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  request: z.string().trim().min(4, 'Describe the diagram you want.').max(300),
  subject: z.enum(SUBJECT_SLUGS).optional(),
  save: z.boolean().default(true),
  /** Skip the checked library and force a generated diagram. */
  forceGenerate: z.boolean().default(false),
});

const nodeSchema: z.ZodType<DiagramNode> = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('box'), id: z.string(), x: z.number(), y: z.number(), w: z.number(), h: z.number(), label: z.string(), tone: z.string().optional() }),
  z.object({ kind: z.literal('circle'), id: z.string(), x: z.number(), y: z.number(), r: z.number(), label: z.string().optional(), tone: z.string().optional() }),
  z.object({ kind: z.literal('line'), id: z.string(), x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(), tone: z.string().optional(), dashed: z.boolean().optional() }),
  z.object({ kind: z.literal('arrow'), id: z.string(), x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(), label: z.string().optional(), tone: z.string().optional() }),
  z.object({ kind: z.literal('label'), id: z.string(), x: z.number(), y: z.number(), text: z.string(), anchor: z.enum(['start', 'middle', 'end']).optional(), tone: z.string().optional() }),
  z.object({ kind: z.literal('coil'), id: z.string(), x: z.number(), y: z.number(), w: z.number(), h: z.number(), turns: z.number(), tone: z.string().optional() }),
  z.object({ kind: z.literal('field'), id: z.string(), x: z.number(), y: z.number(), w: z.number(), h: z.number(), density: z.number().optional(), tone: z.string().optional() }),
  z.object({ kind: z.literal('wave'), id: z.string(), x: z.number(), y: z.number(), w: z.number(), h: z.number(), cycles: z.number(), tone: z.string().optional() }),
  z.object({ kind: z.literal('curve'), id: z.string(), points: z.array(z.tuple([z.number(), z.number()])), tone: z.string().optional(), dashed: z.boolean().optional() }),
]) as z.ZodType<DiagramNode>;

const modelSchema = z.object({
  title: z.string(),
  caption: z.string(),
  width: z.number().default(720),
  height: z.number().default(420),
  nodes: z.array(nodeSchema).min(2),
  keyTerms: z.array(z.object({ term: z.string(), meaning: z.string() })).default([]),
  explanation: z.array(z.string()).default([]),
});

export const POST = handleRoute('diagram', async (request) => {
  const user = await requireAiAccess('diagram');
  const body = await parseBody(request, schema);

  // Scientific diagrams are drawn from checked data whenever one exists — a
  // generated layout is only a fallback, never a preference.
  if (!body.forceGenerate) {
    const library = findLibraryDiagram(body.request);
    if (library) {
      const id = body.save ? await save(user.id, library) : null;
      return ok({ id, spec: library, source: 'library' });
    }
  }

  const provider = getAiProvider();
  if (!provider) {
    return fail(
      'No AI model is connected, and this request does not match one of the platform\'s checked diagrams. Add an API key in .env, or try a topic such as "transformer", "ionic bonding" or "refraction".',
      503,
      { code: 'ai_unavailable' },
    );
  }

  const grounding = await buildGrounding(body.request, { subject: body.subject });
  const raw = await provider.complete({
    system: `${DIAGRAM_SYSTEM}\n\n${grounding.text}`,
    messages: [{ role: 'user', content: body.request }],
    maxTokens: 3000,
    temperature: 0.2,
    responseFormat: 'json',
  });

  const parsed = extractJson<unknown>(raw, null);
  const validated = parsed ? modelSchema.safeParse(parsed) : null;
  if (!validated?.success) {
    // Set AI_DEBUG=1 to see what the model actually produced. Off by default so
    // raw model output never reaches a student.
    if (process.env.AI_DEBUG === '1') {
      console.error('[diagram] schema rejected. raw head:\n', raw.slice(0, 1500));
      if (validated) console.error('[diagram] issues:', JSON.stringify(validated.error.issues.slice(0, 6)));
    }
    return fail('The AI returned a diagram in an unexpected format. Please try again.', 502, {
      code: 'ai_shape',
    });
  }

  const width = clamp(validated.data.width, 320, 1200);
  const height = clamp(validated.data.height, 240, 900);

  const spec: DiagramSpec = {
    title: validated.data.title,
    caption: validated.data.caption,
    width,
    height,
    // Clamp coordinates so a stray value cannot push content off the canvas.
    nodes: validated.data.nodes.map((node) => clampNode(node, width, height)),
    keyTerms: validated.data.keyTerms.slice(0, 8),
    explanation: validated.data.explanation.slice(0, 8),
    sourceRefs: grounding.sourceRefs,
    aiAssisted: true,
  };

  const id = body.save ? await save(user.id, spec) : null;
  return ok({ id, spec, source: 'generated' });
});

function clampNode(node: DiagramNode, width: number, height: number): DiagramNode {
  const cx = (v: number) => clamp(v, 0, width);
  const cy = (v: number) => clamp(v, 0, height);
  switch (node.kind) {
    case 'box':
    case 'coil':
    case 'field':
    case 'wave':
      return { ...node, x: cx(node.x), y: cy(node.y) };
    case 'circle':
      return { ...node, x: cx(node.x), y: cy(node.y) };
    case 'line':
    case 'arrow':
      return { ...node, x1: cx(node.x1), y1: cy(node.y1), x2: cx(node.x2), y2: cy(node.y2) };
    case 'label':
      return { ...node, x: cx(node.x), y: cy(node.y) };
    case 'curve':
      return { ...node, points: node.points.map(([x, y]) => [cx(x), cy(y)] as [number, number]) };
  }
}

async function save(userId: string, spec: DiagramSpec) {
  const media = await db.generatedMedia.create({
    data: { userId, kind: 'DIAGRAM', title: spec.title, spec: JSON.stringify(spec) },
  });
  return media.id;
}
