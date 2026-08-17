import type { Metadata } from 'next';
import Link from 'next/link';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { parseList } from '@/lib/json';
import { progressForUser } from '@/lib/progress';
import { KnowledgeMap, MapLegendBadges, type MapNode } from '@/components/map/KnowledgeMap';

export const metadata: Metadata = {
  title: 'Knowledge map',
  description: 'How the syllabus fits together, including what to understand before what.',
};
export const dynamic = 'force-dynamic';

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject: raw } = await searchParams;
  const subject = raw === 'chemistry' ? 'chemistry' : 'physics';

  const session = await getSessionUser();
  const [subtopics, progress] = await Promise.all([
    db.subtopic.findMany({
      where: { topic: { version: { subject: { slug: subject }, isActive: true } } },
      include: {
        topic: true,
        _count: { select: { lessons: true } },
      },
      orderBy: [{ topic: { order: 'asc' } }, { order: 'asc' }],
    }),
    session ? progressForUser(session.id) : Promise.resolve([]),
  ]);

  const masteryByNumber = new Map(progress.map((p) => [p.number, p.mastery]));

  const nodes: MapNode[] = subtopics.map((subtopic) => ({
    id: subtopic.id,
    number: subtopic.number,
    title: subtopic.title,
    summary: subtopic.summary,
    slug: subtopic.slug,
    topicSlug: subtopic.topic.slug,
    topicNumber: subtopic.topic.number,
    topicTitle: subtopic.topic.title,
    subject,
    prerequisites: parseList<string>(subtopic.prerequisites),
    mastery: masteryByNumber.get(subtopic.number) ?? null,
    hasLesson: subtopic._count.lessons > 0,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">Knowledge map</p>
          <MapLegendBadges subject={subject} />
        </div>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          How it all connects
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Each row is a topic, each box a subtopic. Arrows point from something you should understand
          first to what it unlocks — so before electric circuits, review charge and current.
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href="/map?subject=physics"
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              subject === 'physics' ? 'border-physics bg-physics/10 font-medium text-physics' : 'border-line text-ink-muted hover:text-ink'
            }`}
          >
            Physics
          </Link>
          <Link
            href="/map?subject=chemistry"
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              subject === 'chemistry'
                ? 'border-chemistry bg-chemistry/10 font-medium text-chemistry'
                : 'border-line text-ink-muted hover:text-ink'
            }`}
          >
            Chemistry
          </Link>
        </div>
      </header>

      <KnowledgeMap nodes={nodes} subject={subject} />
    </div>
  );
}
