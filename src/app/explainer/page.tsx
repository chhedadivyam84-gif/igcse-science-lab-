import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { Paywall, TrialBanner } from '@/components/billing/Paywall';
import { aiStatus } from '@/lib/ai';
import { ExplainerStudio } from '@/components/explainer/ExplainerStudio';

export const metadata: Metadata = {
  title: 'Create explainer',
  description: 'Animated, narrated concept explainers built as teaching storyboards.',
};
export const dynamic = 'force-dynamic';

export default async function ExplainerPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const entitlements = await entitlementsFor(session.id);
  const locked = !entitlements.can('explainer');

  const { topic } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Create explainer</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          An animated walkthrough that actually teaches
        </h1>
        <p className="mt-3 text-ink-muted">
          Not a cinematic clip — a storyboard that goes from what it is, through the mechanism step by
          step, to a real example and what the exam expects. Play it, scrub it, turn narration on.
        </p>
      </header>

      <TrialBanner daysLeft={entitlements.plan === 'TRIAL' ? entitlements.trialDaysLeft : 0} />

      {locked ? (
        <Paywall feature="explainer" />
      ) : (
        <ExplainerStudio initialTopic={topic} aiConfigured={aiStatus().configured} />
      )}
    </div>
  );
}
