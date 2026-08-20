import type { Metadata } from 'next';
import Link from 'next/link';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { parseList } from '@/lib/json';
import { progressForUser } from '@/lib/progress';
import { KnowledgeMap, MapLegendBadges, type MapNode } from '@/components/map/KnowledgeMap';
import { ALL_SUBJECTS } from '@/lib/subjects';
import { SUBJECT_SLUGS, type SubjectSlug } from '@/lib/types';

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
  // Any seeded subject, not a hardcoded pair. Previously anything other than
  // "chemistry" silently fell back to physics, which made the map unreachable
  // for Biology, the three maths syllabuses and ICT.
  const subject: SubjectSlug =
    raw && (SUBJECT_SLUGS as readonly string[]).includes(raw) ? (raw as SubjectSlug) : 'physics';

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
        {/* One chip per subject, generated from the subject list so a new
            syllabus appears here without anyone remembering to add it. */}
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_SUBJECTS.map(({ slug, display }) => (
            <Link
              key={slug}
              href={`/map?subject=${slug}`}
              aria-current={subject === slug ? 'page' : undefined}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                subject === slug
                  ? `border-current font-medium ${display.textClass}`
                  : 'border-line text-ink-muted hover:text-ink'
              }`}
            >
              {display.name}
            </Link>
          ))}
        </div>
      </header>

      <KnowledgeMap nodes={nodes} subject={subject} />
    </div>
  );
}
