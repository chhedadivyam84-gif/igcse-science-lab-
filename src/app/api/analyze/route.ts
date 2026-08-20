import { fail, handleRoute, ok } from '@/lib/api';
import { requireAiAccess } from '@/lib/ai/guard';
import { getAiProvider } from '@/lib/ai';
import { buildGrounding } from '@/lib/ai/grounding';
import { ANALYSE_SYSTEM } from '@/lib/ai/prompts';
import { asSubjectSlug } from '@/lib/subjects';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] as const;
type Allowed = (typeof ALLOWED)[number];

/**
 * Explains a photo of a student's work.
 *
 * The prompt asks for teaching rather than a finished answer, so this helps
 * with understanding without becoming a way to complete a live assessment.
 */
export const POST = handleRoute('analyze', async (request) => {
  await requireAiAccess('photo');

  const form = await request.formData().catch(() => null);
  if (!form) return fail('Send the image as multipart/form-data.', 400);

  const file = form.get('image');
  const note = String(form.get('note') ?? '').slice(0, 500);
  const subject = String(form.get('subject') ?? '');

  if (!(file instanceof File)) return fail('Attach an image file.', 400);
  if (file.size === 0) return fail('That file is empty.', 400);
  if (file.size > MAX_BYTES) {
    return fail(`Images must be under ${MAX_BYTES / 1024 / 1024} MB. Try a smaller photo.`, 413);
  }
  if (!ALLOWED.includes(file.type as Allowed)) {
    return fail('Upload a PNG, JPEG, WebP or GIF image.', 415);
  }

  const provider = getAiProvider();
  if (!provider?.describeImage) {
    return fail(
      'No AI model with image support is connected, so photos cannot be analysed. You can still type the question into Ask AI or Explain Anything.',
      503,
      { code: 'ai_unavailable' },
    );
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString('base64');
  const grounding = note
    ? await buildGrounding(note, {
        subject: asSubjectSlug(subject),
      })
    : { text: '', sourceRefs: [] as string[] };

  const answer = await provider.describeImage({
    system: `${ANALYSE_SYSTEM}\n\n${grounding.text}`,
    prompt: note
      ? `The student says: "${note}". Help them understand this.`
      : 'Help the student understand what is in this image.',
    image: { mediaType: file.type as Allowed, base64 },
    maxTokens: 1800,
  });

  return ok({ answer, sourceRefs: grounding.sourceRefs, aiAssisted: true });
});
