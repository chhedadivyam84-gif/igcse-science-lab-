import { z } from 'zod';
import { getAiProvider } from '@/lib/ai';
import { extractJson } from '@/lib/json';
import { checkAiQuota } from '@/lib/ratelimit';

/**
 * Marks a written answer against its mark scheme, point by point, the way a
 * Cambridge examiner does: a marking point is credited when the student's
 * answer conveys it — in any wording, with ordinary spelling slips — and not
 * otherwise. Vague or contradictory statements earn nothing, and a correct
 * point stated alongside a wrong one that cancels it is not credited.
 *
 * Returns null when no model is available, the quota is spent or the reply is
 * unusable; the caller then falls back to the student marking themselves.
 */

export type WrittenMark = {
  marksAwarded: number;
  points: { text: string; met: boolean; comment?: string }[];
  feedback: string;
};

const replySchema = z.object({
  points: z
    .array(z.object({ index: z.coerce.number().int(), met: z.boolean(), comment: z.string().optional() }))
    .default([]),
  feedback: z.string().default(''),
});

const SYSTEM = `You are a strict but fair Cambridge IGCSE examiner marking one student answer.

You are given the question, the mark scheme as numbered marking points, the model answer, and the student's answer.

For EACH marking point decide whether the student's answer earns it:
- Credit the point if the meaning is clearly there, in any wording. Ignore spelling and grammar slips that do not change the meaning.
- Do NOT credit vague, incomplete or merely related statements, or a point that is contradicted elsewhere in the answer.
- Do not credit the same statement for two different points.
- If the mark scheme has fewer points than the marks, use the model answer to decide what else earns credit.
- Never award more marks than the question is worth.

Return ONLY JSON:
{ "points": [ { "index": 1, "met": true, "comment": "short reason, max 15 words" } ], "feedback": "2-3 sentences to the student: what earned marks, exactly what was missing, how to phrase it for full marks" }
The response must parse with JSON.parse.`;

export async function markWritten(input: {
  userId: string;
  stem: string;
  answer: string;
  markScheme: string[];
  marks: number;
  response: string;
}): Promise<WrittenMark | null> {
  if (!input.response.trim()) {
    return {
      marksAwarded: 0,
      points: input.markScheme.map((text) => ({ text, met: false })),
      feedback: 'No answer was given.',
    };
  }

  const provider = getAiProvider({ fast: true }) ?? getAiProvider();
  if (!provider) return null;
  if (!checkAiQuota(input.userId).ok) return null;

  const scheme = input.markScheme.length ? input.markScheme : [input.answer];
  const prompt = [
    `Question (${input.marks} mark${input.marks === 1 ? '' : 's'}): ${input.stem}`,
    'Mark scheme:',
    ...scheme.map((p, i) => `${i + 1}. ${p}`),
    `Model answer: ${input.answer}`,
    `Student answer: ${input.response.slice(0, 3000)}`,
  ].join('\n');

  try {
    const raw = await provider.complete({
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 900,
      temperature: 0,
      responseFormat: 'json',
    });
    const parsed = replySchema.safeParse(extractJson<unknown>(raw, null));
    if (!parsed.success) return null;

    const met = new Map(parsed.data.points.map((p) => [p.index, p]));
    const points = scheme.map((text, i) => ({
      text,
      met: met.get(i + 1)?.met ?? false,
      comment: met.get(i + 1)?.comment,
    }));
    // Each scheme point carries the marks in its trailing "(n)", defaulting to 1.
    const worth = (text: string) => Number(text.match(/\((\d+)\)\s*$/)?.[1] ?? 1);
    const earned = points.reduce((sum, p) => sum + (p.met ? worth(p.text) : 0), 0);

    return {
      marksAwarded: Math.min(input.marks, earned),
      points,
      feedback: parsed.data.feedback.trim(),
    };
  } catch (error) {
    console.warn('[mark-written] failed:', error instanceof Error ? error.message : error);
    return null;
  }
}
