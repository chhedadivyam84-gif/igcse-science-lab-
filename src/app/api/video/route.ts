import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { STORYBOARD_SYSTEM } from '@/lib/ai/prompts';
import { storyboardFromCurriculum } from '@/lib/ai/fallback';
import { findLibraryDiagram } from '@/lib/diagrams/library';
import { extractJson } from '@/lib/json';
import { clamp } from '@/lib/utils';
import type { Storyboard } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VISUALS = ['intro', 'diagram', 'particles', 'wave', 'circuit', 'graph', 'summary'] as const;

const schema = z.object({
  request: z.string().trim().min(4, 'Say what the explainer should cover.').max(300),
  subject: z.enum(['physics', 'chemistry']).optional(),
  save: z.boolean().default(true),
});

const modelSchema = z.object({
  title: z.string(),
  subject: z.enum(['physics', 'chemistry']),
  scenes: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        narration: z.string(),
        seconds: z.number(),
        visual: z.string(),
        bullets: z.array(z.string()).default([]),
      }),
    )
    .min(3),
});

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
    const raw = await provider.complete({
      system: `${STORYBOARD_SYSTEM}\n\n${grounding.text}`,
      messages: [{ role: 'user', content: body.request }],
      maxTokens: 2600,
      temperature: 0.4,
      responseFormat: 'json',
    });

    const parsed = extractJson<unknown>(raw, null);
    const validated = parsed ? modelSchema.safeParse(parsed) : null;
    if (!validated?.success) {
      return fail('The AI returned a storyboard in an unexpected format. Please try again.', 502, {
        code: 'ai_shape',
      });
    }

    // Attach a checked diagram to any scene asking for one, so the visual that
    // carries the science is drawn from verified data.
    const libraryDiagram = findLibraryDiagram(body.request);

    storyboard = {
      title: validated.data.title,
      subject: validated.data.subject,
      scenes: validated.data.scenes.slice(0, 8).map((scene, index) => {
        const visual = (VISUALS as readonly string[]).includes(scene.visual) ? scene.visual : 'summary';
        return {
          id: scene.id || `scene-${index + 1}`,
          title: scene.title,
          narration: scene.narration,
          seconds: clamp(Math.round(scene.seconds), 5, 20),
          visual,
          diagram: visual === 'diagram' ? (libraryDiagram ?? undefined) : undefined,
          bullets: scene.bullets.slice(0, 4),
        };
      }),
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
