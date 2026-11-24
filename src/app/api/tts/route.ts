import { z } from 'zod';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireFeature } from '@/lib/billing/entitlements';
import { googleApiKeys } from '@/lib/ai';
import { GoogleProvider } from '@/lib/ai/google';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Narration for the explainer studio.
 *
 * One request voices every scene of a storyboard, so it counts as a single
 * explainer rather than eating the AI quota once per scene. Scenes are voiced
 * a few at a time: firing all of them at once trips Gemini's rate limit.
 */
const schema = z.object({
  texts: z.array(z.string().trim().min(1).max(700)).min(1).max(8),
});

const MODEL = () => process.env.AI_TTS_MODEL?.trim() || 'gemini-3.1-flash-tts-preview';
const VOICE = () => process.env.AI_TTS_VOICE?.trim() || 'Charon';
const STYLE =
  'Read this aloud as an engaging, warm science teacher narrating an explainer video: clear British English, natural rhythm, steady pace, slight emphasis on key terms. Read only the text below.';
const CONCURRENCY = 3;

export const POST = handleRoute('tts', async (request) => {
  await requireFeature('explainer');
  const body = await parseBody(request, schema);

  const keys = googleApiKeys();
  if (!keys.length) return fail('No Google AI key is set, so the narrator voice is unavailable.', 503, { code: 'tts_unavailable' });

  const voice = new GoogleProvider(keys, MODEL());
  const audio: (string | null)[] = new Array(body.texts.length).fill(null);

  let next = 0;
  async function worker() {
    while (next < body.texts.length) {
      const index = next++;
      try {
        const wav = await voice.speak(body.texts[index], VOICE(), STYLE);
        audio[index] = `data:audio/wav;base64,${wav.toString('base64')}`;
      } catch (error) {
        console.warn(`[tts] scene ${index + 1} failed:`, error instanceof Error ? error.message : error);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, body.texts.length) }, worker));

  if (audio.every((a) => a === null)) {
    return fail('The narrator voice could not be generated right now.', 502, { code: 'tts_failed' });
  }
  return ok({ audio });
});
