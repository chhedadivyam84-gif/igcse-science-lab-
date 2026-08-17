import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { Paywall, TrialBanner } from '@/components/billing/Paywall';
import { aiStatus } from '@/lib/ai';
import { NotesWorkbench } from '@/components/notes/NotesWorkbench';

export const metadata: Metadata = {
  title: 'AI handwritten notes',
  description: 'Generate handwritten-style revision notes grounded in the IGCSE syllabus.',
};
export const dynamic = 'force-dynamic';

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; subject?: string }>;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const entitlements = await entitlementsFor(session.id);
  const locked = !entitlements.can('notes');

  const { topic, subject } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="no-print mb-6 max-w-2xl">
        <p className="eyebrow">AI handwritten notes</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Revision notes worth reading
        </h1>
        <p className="mt-3 text-ink-muted">
          Five styles, built from the platform&rsquo;s curriculum database so definitions, equations and
          exam wording stay accurate. Print straight to PDF when you are done.
        </p>
      </header>

      <div className="no-print">
        <TrialBanner daysLeft={entitlements.plan === 'TRIAL' ? entitlements.trialDaysLeft : 0} />
      </div>

      {locked ? (
        <Paywall feature="notes" />
      ) : (
        <NotesWorkbench
          initialTopic={topic}
          initialSubject={subject === 'physics' || subject === 'chemistry' ? subject : undefined}
          aiConfigured={aiStatus().configured}
        />
      )}
    </div>
  );
}
