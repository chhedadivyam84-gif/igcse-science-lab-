import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { masteryBand, progressForUser } from '@/lib/progress';
import { parseList } from '@/lib/json';
import { Badge, Card, ProgressBar } from '@/components/ui';
import { subjectTone } from '@/lib/subjects';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ subject: string; topic: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject, topic } = await params;
  const row = await db.topic.findFirst({
    where: { slug: topic, version: { subject: { slug: subject } } },
  });
  return { title: row ? `${row.number} ${row.title}` : 'Topic' };
}

export default async function TopicPage({ params }: Params) {
  const { subject: slug, topic: topicSlug } = await params;
  const session = await getSessionUser();

  const [topic, progress] = await Promise.all([
    db.topic.findFirst({
      where: { slug: topicSlug, version: { subject: { slug }, isActive: true } },
      include: {
        version: { include: { subject: true } },
        subtopics: {
          orderBy: { order: 'asc' },
          include: {
            objectives: { orderBy: { order: 'asc' } },
            _count: { select: { lessons: true, questions: true, flashcards: true, simulations: true } },
          },
        },
      },
    }),
    session ? progressForUser(session.id) : Promise.resolve([]),
  ]);

  if (!topic) notFound();

  const masteryByNumber = new Map(progress.map((p) => [p.number, p.mastery]));
  const isPhysics = slug === 'physics';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-faint">
        <Link href="/learn" className="hover:text-ink">
          Learn
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/learn/${slug}`} className="hover:text-ink">
          {topic.version.subject.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-muted">Topic {topic.number}</span>
      </nav>

      <header className="mb-8">
        <Badge tone={subjectTone(topic.version.subject.slug)}>
          {topic.version.subject.name} {topic.version.subject.code}
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          <span className="text-ink-faint">{topic.number}.</span> {topic.title}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">{topic.summary}</p>
      </header>

      <ol className="space-y-3">
        {topic.subtopics.map((subtopic) => {
          const mastery = masteryByNumber.get(subtopic.number);
          const band = mastery !== undefined ? masteryBand(mastery) : null;
          const prerequisites = parseList<string>(subtopic.prerequisites);

          return (
            <li key={subtopic.id}>
              <Card interactive className="p-0">
                <Link href={`/learn/${slug}/${topic.slug}/${subtopic.slug}`} className="block p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="font-mono text-xs text-ink-faint">{subtopic.number}</span>
                      <h2 className="mt-0.5 text-lg font-semibold text-ink">{subtopic.title}</h2>
                      <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{subtopic.summary}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint" />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {subtopic._count.lessons > 0 ? (
                      <Badge tone="positive">Full lesson</Badge>
                    ) : (
                      <Badge tone="caution">Objectives only</Badge>
                    )}
                    {subtopic._count.questions > 0 && (
                      <Badge tone="neutral">{subtopic._count.questions} questions</Badge>
                    )}
                    {subtopic._count.flashcards > 0 && (
                      <Badge tone="neutral">{subtopic._count.flashcards} cards</Badge>
                    )}
                    {subtopic._count.simulations > 0 && <Badge tone="accent">Simulation</Badge>}
                    {prerequisites.length > 0 && (
                      <span className="text-xs text-ink-faint">Review first: {prerequisites.join(', ')}</span>
                    )}
                  </div>

                  {subtopic.objectives.length > 0 && (
                    <ul className="mt-4 space-y-1 border-t border-line pt-3">
                      {subtopic.objectives.slice(0, 3).map((objective) => (
                        <li key={objective.id} className="flex gap-2 text-xs text-ink-muted">
                          <span className="font-mono text-ink-faint">{objective.code}</span>
                          <span>{objective.statement}</span>
                        </li>
                      ))}
                      {subtopic.objectives.length > 3 && (
                        <li className="text-xs text-ink-faint">
                          + {subtopic.objectives.length - 3} more objectives
                        </li>
                      )}
                    </ul>
                  )}

                  {mastery !== undefined && band && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-faint">Your mastery · {band.label}</span>
                        <span className="font-mono text-ink">{mastery}%</span>
                      </div>
                      <ProgressBar value={mastery} tone={band.tone} className="mt-1" />
                    </div>
                  )}
                </Link>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
