import { z } from 'zod';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider, googleApiKey } from '@/lib/ai';
import { GoogleProvider } from '@/lib/ai/google';
import { buildGrounding } from '@/lib/ai/grounding';
import { extractJson } from '@/lib/json';
import { SUBJECT_SLUGS } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * NOVA image explanations (Pro).
 *
 * Two steps, because image models draw well but get science wrong:
 *  1. the text model, grounded in the syllabus, writes a precise brief —
 *     exactly what to draw, every label spelled out, nothing invented;
 *  2. the image model draws that brief as a clean textbook diagram.
 * The brief's caption is shown under the image so the student gets the
 * explanation in words as well.
 */
const schema = z.object({
  question: z.string().trim().min(3).max(1000),
  subject: z.enum(SUBJECT_SLUGS).optional(),
});

const briefSchema = z.object({
  title: z.string().trim().min(2),
  drawing: z.string().trim().min(20),
  labels: z.array(z.string().trim()).max(12).default([]),
  caption: z.string().trim().min(10),
});

const BRIEF_SYSTEM = `You plan a single teaching image for a Cambridge IGCSE student.

Return ONLY JSON:
{
  "title": "short title, max 8 words",
  "drawing": "precise description of ONE clear labelled diagram that explains the idea: what objects to draw, where, arrows and their direction, colours. 60-120 words.",
  "labels": ["every text label that must appear, spelled exactly, max 12, each max 4 words"],
  "caption": "2 to 4 sentences explaining what the image shows and why, at IGCSE level"
}

Rules:
- Every fact, label, direction and arrow must be scientifically correct at IGCSE level and agree with <curriculum_context>.
- Prefer a clean labelled diagram over a scene. No people, no decoration.
- Keep labels short; the image model must spell them, so fewer is safer.`;

const IMAGE_MODEL = () => process.env.AI_IMAGE_MODEL?.trim() || 'gemini-3.1-flash-image';

export const POST = handleRoute('tutor-image', async (request) => {
  await requireAiAccess('image');
  const body = await parseBody(request, schema);

  const key = googleApiKey();
  const planner = getAiProvider();
  if (!key || !planner) {
    return fail('Image explanations need the Google AI key to be set.', 503, { code: 'image_unavailable' });
  }

  const grounding = await buildGrounding(body.question, { subject: body.subject });
  const raw = await planner.complete({
    system: `${BRIEF_SYSTEM}\n\n${grounding.text}`,
    messages: [{ role: 'user', content: body.question }],
    maxTokens: 1200,
    temperature: 0.2,
    responseFormat: 'json',
  });
  const brief = briefSchema.safeParse(extractJson<unknown>(raw, null));
  if (!brief.success) {
    return fail('NOVA could not plan that image. Try asking more specifically.', 502, { code: 'ai_shape' });
  }

  const { title, drawing, labels, caption } = brief.data;
  const prompt = [
    'Create a clean, accurate educational science diagram in the style of a modern textbook illustration.',
    'Flat vector style, white background, clear thin outlines, soft colours, high contrast, no photographic realism, no people, no watermark-style text.',
    `Title at the top: "${title}".`,
    `Draw: ${drawing}`,
    labels.length
      ? `Add these labels exactly as written, in a clean sans-serif font, with thin leader lines: ${labels.map((l) => `"${l}"`).join(', ')}. Do not add any other text.`
      : 'Do not add any text other than the title.',
    'Landscape 16:9 composition.',
  ].join('\n');

  try {
    const image = await new GoogleProvider(key, IMAGE_MODEL()).draw(prompt);
    return ok({
      title,
      caption,
      image: `data:${image.mimeType};base64,${image.data}`,
      sourceRefs: grounding.sourceRefs,
    });
  } catch (error) {
    console.warn('[tutor-image] generation failed:', error instanceof Error ? error.message : error);
    return fail('The image could not be generated right now. Please try again.', 502, { code: 'image_failed' });
  }
});
