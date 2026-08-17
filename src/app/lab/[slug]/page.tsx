import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { db } from '@/lib/db';
import { parseList } from '@/lib/json';
import { isSimulationAvailable } from '@/components/sim/available';
import { SimulationRunner } from '@/components/sim/registry';
import { Badge, EmptyState, LinkButton } from '@/components/ui';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const simulation = await db.simulation.findUnique({ where: { slug } });
  return simulation
    ? { title: simulation.title, description: simulation.description }
    : { title: 'Simulation' };
}

export default async function SimulationPage({ params }: Params) {
  const { slug } = await params;

  const simulation = await db.simulation.findUnique({
    where: { slug },
    include: { subject: true, subtopic: { include: { topic: true } } },
  });

  if (!simulation) notFound();

  const concepts = parseList<string>(simulation.concepts);
  const isPhysics = simulation.subject.slug === 'physics';
  const available = isSimulationAvailable(simulation.component);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-faint">
        <Link href="/lab" className="hover:text-ink">
          Simulation Lab
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-muted">{simulation.title}</span>
      </nav>

      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={isPhysics ? 'physics' : 'chemistry'}>
            {simulation.subject.name} {simulation.subject.code}
          </Badge>
          {simulation.subtopic && (
            <Link
              href={`/learn/${simulation.subject.slug}/${simulation.subtopic.topic.slug}/${simulation.subtopic.slug}`}
              className="text-xs text-accent hover:underline"
            >
              {simulation.subtopic.number} {simulation.subtopic.title}
            </Link>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {simulation.title}
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">{simulation.description}</p>

        {concepts.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {concepts.map((concept) => (
              <li key={concept}>
                <Badge tone="neutral">{concept}</Badge>
              </li>
            ))}
          </ul>
        )}
      </header>

      {available ? (
        <SimulationRunner component={simulation.component} />
      ) : (
        <EmptyState
          title="This simulation has not been built yet"
          description="It is mapped to the syllabus and listed in the catalogue, but the interactive version is still to come. The lesson, questions and flashcards for this subtopic are already available."
          action={
            simulation.subtopic ? (
              <LinkButton
                href={`/learn/${simulation.subject.slug}/${simulation.subtopic.topic.slug}/${simulation.subtopic.slug}`}
                variant="primary"
              >
                Open the subtopic
              </LinkButton>
            ) : (
              <LinkButton href="/lab" variant="primary">
                Back to the lab
              </LinkButton>
            )
          }
        />
      )}
    </div>
  );
}
