import { z } from 'zod';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireFeature } from '@/lib/billing/entitlements';
import { googleApiKeys } from '@/lib/ai';
import { GoogleProvider } from '@/lib/ai/google';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Narration for the explainer studio: the whole storyboard as one track. */
const schema = z.object({
  texts: z.array(z.string().trim().min(1).max(700)).min(1).max(10),
});

const MODEL = () => process.env.AI_TTS_MODEL?.trim() || 'gemini-3.1-flash-tts-preview';
const VOICE = () => process.env.AI_TTS_VOICE?.trim() || 'Charon';
const STYLE =
  'Read this aloud as an engaging, warm science teacher narrating an explainer video: clear British English, natural rhythm, steady pace, slight emphasis on key terms. Read only the text below.';

export const POST = handleRoute('tts', async (request) => {
  await requireFeature('explainer');
  const body = await parseBody(request, schema);

  const keys = googleApiKeys();
  if (!keys.length) return fail('No Google AI key is set, so the narrator voice is unavailable.', 503, { code: 'tts_unavailable' });

  // One request for the whole script, played as one continuous track. Per-
  // scene clips hit the TTS model's tiny per-minute quota (later scenes came
  // back silent), and phones only let a sound start from a tap — a single
  // track started by the Play tap keeps narrating to the end.
  const voice = new GoogleProvider(keys, MODEL());
  const script = body.texts.join('\n\n');
  try {
    const wav = await voice.speak(script, VOICE(), STYLE);
    return ok({
      audio: `data:audio/wav;base64,${wav.toString('base64')}`,
      // Share of the track each scene takes, by length of its narration; the
      // player turns these into scene start times.
      weights: body.texts.map((t) => t.length + 25),
    });
  } catch (error) {
    console.warn('[tts] narration failed:', error instanceof Error ? error.message : error);
    return fail('The narrator voice could not be generated right now.', 502, { code: 'tts_failed' });
  }
});
