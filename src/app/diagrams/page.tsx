import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { Paywall, TrialBanner } from '@/components/billing/Paywall';
import { aiStatus } from '@/lib/ai';
import { diagramLibraryIndex } from '@/lib/diagrams/library';
import { DiagramWorkbench } from '@/components/diagram/DiagramWorkbench';

export const metadata: Metadata = {
  title: 'Diagram generator',
  description: 'Labelled scientific diagrams drawn programmatically for accuracy.',
};
export const dynamic = 'force-dynamic';

export default async function DiagramsPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const entitlements = await entitlementsFor(session.id);
  const locked = !entitlements.can('diagram');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Diagrams</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Labelled, accurate, drawn to order
        </h1>
        <p className="mt-3 text-ink-muted">
          Components, arrows, labels and the explanation that goes with them.
        </p>
      </header>

      <TrialBanner daysLeft={entitlements.plan === 'TRIAL' ? entitlements.trialDaysLeft : 0} />

      {locked ? (
        <Paywall feature="diagram" />
      ) : (
        <DiagramWorkbench library={diagramLibraryIndex} aiConfigured={aiStatus().configured} />
      )}
    </div>
  );
}
