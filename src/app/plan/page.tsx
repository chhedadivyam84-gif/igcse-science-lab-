import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { getOrCreateTodayPlan } from '@/lib/plan';
import { PlanList } from '@/components/dashboard/PlanList';
import { Panel, SectionHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Study plan',
  description: 'A daily plan built from your mastery scores, due flashcards and mistake patterns.',
};
export const dynamic = 'force-dynamic';

export default async function PlanPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const plan = await getOrCreateTodayPlan(session.id);
  const totalMinutes = plan.items.reduce((sum, item) => sum + item.minutes, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Today</h1>
        <p className="mt-2 text-ink-muted">
          About {totalMinutes} minutes, ordered so the highest-value work comes first.
        </p>
      </header>

      <Panel>
        <PlanList initialItems={plan.items} />
      </Panel>

      <Panel className="mt-6">
        <SectionHeader eyebrow="How this is built" title="Nothing here is arbitrary" />
        <ul className="space-y-2.5 text-sm text-ink-muted">
          <li>
            <strong className="text-ink">Weakest topics first.</strong> The two subtopics with the lowest
            mastery scores, because that is where the marks are.
          </li>
          <li>
            <strong className="text-ink">Flashcards that are due.</strong> Spaced repetition only works if
            you review on the day a card comes round.
          </li>
          <li>
            <strong className="text-ink">Your dominant mistake pattern.</strong> If you keep losing marks
            on unit conversions, reading about forces will not fix it.
          </li>
          <li>
            <strong className="text-ink">Something new.</strong> The next subtopic you have not started, so
            coverage keeps growing.
          </li>
          <li>
            <strong className="text-ink">Mixed practice.</strong> Interleaving topics is harder than
            blocking them, and that is exactly why it works better.
          </li>
        </ul>
        <p className="mt-4 text-xs text-ink-faint">
          The plan regenerates each day, and you can rebuild it at any time after doing some work.
        </p>
      </Panel>
    </div>
  );
}
