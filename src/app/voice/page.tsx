import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { aiStatus } from '@/lib/ai';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { Paywall } from '@/components/billing/Paywall';
import { VoiceTutor } from '@/components/voice/VoiceTutor';
import { Badge, Notice } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Talk to NOVA',
  description: 'A spoken science tutor for Cambridge IGCSE Physics and Chemistry. Ask out loud, get answers out loud.',
};
export const dynamic = 'force-dynamic';

export default async function VoicePage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; topic?: string }>;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const { subject, topic } = await searchParams;
  const entitlements = await entitlementsFor(session.id);
  const ai = aiStatus();

  if (!entitlements.can('voice')) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Paywall feature="voice" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Talk to NOVA</p>
        <h1 className="font-display mt-2 text-4xl leading-[1.05] text-ink sm:text-5xl">
          Ask out loud. Get answers out loud.
        </h1>
        <p className="mt-3 text-ink-muted">
          Hands-free, like sitting with a tutor. It listens, works out the answer and talks back —
          grounded in the same syllabus database as everything else here.
        </p>

        {topic && (
          <div className="mt-4">
            <Badge tone="accent">Context: {topic}</Badge>
          </div>
        )}
      </header>

      {!ai.configured ? (
        <Notice tone="caution" title="No AI model connected">
          The voice tutor needs a live model. Add a key to <code className="formula">.env</code>.
          Everything the platform already holds — lessons, simulations, the question bank — works
          without one.
        </Notice>
      ) : (
        <>
          <VoiceTutor
            subject={subject === 'physics' || subject === 'chemistry' ? subject : undefined}
            topicHint={topic}
          />

          <p className="mt-6 text-xs text-ink-faint">
            Spoken answers use <span className="font-mono">{ai.voiceModel}</span> — a faster model than
            the written tutor, chosen because a conversation cannot tolerate a long pause before the
            first word. For depth over speed, use{' '}
            <a href="/tutor" className="text-accent hover:underline">
              the written tutor
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
