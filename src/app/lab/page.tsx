import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';

import { db } from '@/lib/db';
import { parseList } from '@/lib/json';
import { isSimulationAvailable } from '@/components/sim/available';
import { Badge, Card, Notice, Panel } from '@/components/ui';
import { isSubjectSlug, subjectTextClass, subjectTone } from '@/lib/subjects';

export const metadata: Metadata = {
  title: 'Simulation Lab',
  description: 'Interactive physics and chemistry simulations built around observe, predict, experiment, explain.',
};
export const dynamic = 'force-dynamic';

export default async function LabPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;

  const simulations = await db.simulation.findMany({
    where: isSubjectSlug(subject) ? { subject: { slug: subject } } : {},
    include: { subject: true, subtopic: { include: { topic: true } } },
    orderBy: [{ subjectId: 'asc' }, { order: 'asc' }],
  });

  const available = simulations.filter((s) => isSimulationAvailable(s.component));
  const planned = simulations.filter((s) => !isSimulationAvailable(s.component));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Simulation Lab</p>
        <h1 className="font-display mt-2 text-4xl leading-[1.05] text-ink sm:text-5xl">
          Change something. See what happens.
        </h1>
        <p className="mt-3 text-ink-muted">
          Every simulation follows the same cycle: observe it, change the variables, predict what will
          happen, run the experiment, then read the explanation.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <FilterLink href="/lab" label="All" active={!subject} />
        <FilterLink href="/lab?subject=physics" label="Physics" active={subject === 'physics'} />
        <FilterLink href="/lab?subject=chemistry" label="Chemistry" active={subject === 'chemistry'} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {available.map((simulation) => {
          const concepts = parseList<string>(simulation.concepts);
          const isPhysics = simulation.subject.slug === 'physics';

          return (
            <Card key={simulation.id} interactive className="p-0">
              <Link href={`/lab/${simulation.slug}`} className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <Badge tone={subjectTone(simulation.subject.slug)}>{simulation.subject.name}</Badge>
                  <FlaskConical className={`h-4 w-4 ${subjectTextClass(simulation.subject.slug)}`} />
                </div>
                <h2 className="mt-3 text-base font-semibold text-ink">{simulation.title}</h2>
                <p className="mt-1.5 flex-1 text-sm text-ink-muted">{simulation.description}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {concepts.slice(0, 3).map((concept) => (
                    <li key={concept} className="rounded-full bg-surface-raised px-2 py-0.5 text-2xs text-ink-muted">
                      {concept}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-xs text-ink-faint">
                    {simulation.subtopic ? `${simulation.subtopic.number} ${simulation.subtopic.title}` : 'General'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink-faint" />
                </div>
              </Link>
            </Card>
          );
        })}
      </div>

      {planned.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-ink">Planned</h2>
          <Notice tone="neutral" className="mt-3">
            These are mapped to the syllabus and listed here for transparency, but the interactive
            versions have not been built yet. They are not clickable, because a button that does nothing
            is worse than an honest gap.
          </Notice>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((simulation) => (
              <Panel key={simulation.id} className="p-4 opacity-70">
                <div className="flex items-start justify-between gap-3">
                  <Badge tone="neutral">{simulation.subject.name}</Badge>
                  <Badge tone="caution">Planned</Badge>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink">{simulation.title}</h3>
                <p className="mt-1 text-xs text-ink-muted">{simulation.description}</p>
              </Panel>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function FilterLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active ? 'border-accent bg-accent/10 font-medium text-accent' : 'border-line text-ink-muted hover:text-ink'
      }`}
    >
      {label}
    </Link>
  );
}
