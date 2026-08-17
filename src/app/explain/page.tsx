import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { Paywall, TrialBanner } from '@/components/billing/Paywall';
import { aiStatus } from '@/lib/ai';
import { ExplainWorkbench } from '@/components/explain/ExplainWorkbench';

export const metadata: Metadata = {
  title: 'Explain Anything',
  description: 'Ask one question and get a complete mini-lesson: explanation, diagram, worked example, exam question and quiz.',
};
export const dynamic = 'force-dynamic';

export default async function ExplainPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const entitlements = await entitlementsFor(session.id);
  const locked = !entitlements.can('explain');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Explain Anything</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Ask a question. Watch it come alive.
        </h1>
        <p className="mt-3 text-ink-muted">
          One question produces ten things: a simple explanation, the IGCSE version, an analogy, a
          diagram, key terms, formulae, a worked example, the common mistake, an exam question and a quiz.
        </p>
      </header>

      <TrialBanner daysLeft={entitlements.plan === 'TRIAL' ? entitlements.trialDaysLeft : 0} />

      {locked ? <Paywall feature="explain" /> : <ExplainWorkbench aiConfigured={aiStatus().configured} />}
    </div>
  );
}
