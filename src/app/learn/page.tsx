import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Atom, Info, Zap } from 'lucide-react';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { progressForUser } from '@/lib/progress';
import { Badge, Notice, Panel, ProgressBar } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Browse the full Cambridge IGCSE Physics 0625 and Chemistry 0620 syllabus.',
};
export const dynamic = 'force-dynamic';

export default async function LearnPage() {
  const session = await getSessionUser();

  const [subjects, progress] = await Promise.all([
    db.subject.findMany({
      orderBy: { code: 'desc' },
      include: {
        versions: {
          where: { isActive: true },
          include: {
            topics: {
              orderBy: { order: 'asc' },
              include: {
                subtopics: {
                  orderBy: { order: 'asc' },
                  include: { _count: { select: { lessons: true, questions: true } } },
                },
              },
            },
          },
        },
      },
    }),
    session ? progressForUser(session.id) : Promise.resolve([]),
  ]);

  const masteryByNumber = new Map(progress.map((p) => [p.number, p.mastery]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">The syllabus</p>
        <h1 className="font-display mt-2 text-4xl leading-[1.05] text-ink sm:text-5xl">
          Every topic, mapped
        </h1>
        <p className="mt-3 text-ink-muted">
          Both specifications, broken into the same topic and subtopic structure the papers use. Open
          any subtopic for objectives, lessons, formulae, misconceptions and practice.
        </p>
      </header>

      <div className="space-y-10">
        {subjects.map((subject) => {
          const version = subject.versions[0];
          if (!version) return null;
          const isPhysics = subject.slug === 'physics';

          return (
            <section key={subject.id}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {isPhysics ? (
                    <Zap className="h-5 w-5 text-physics" />
                  ) : (
                    <Atom className="h-5 w-5 text-chemistry" />
                  )}
                  <h2 className="text-xl font-semibold tracking-tight text-ink">
                    {subject.name}{' '}
                    <span className={`font-mono text-base ${isPhysics ? 'text-physics' : 'text-chemistry'}`}>
                      {subject.code}
                    </span>
                  </h2>
                </div>
                <Badge tone="neutral">{version.label}</Badge>
              </div>

              <Notice tone="neutral" className="mb-4">
                <p className="flex items-start gap-2 text-xs">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{version.sourceNote}</span>
                </p>
              </Notice>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {version.topics.map((topic) => {
                  const withLessons = topic.subtopics.filter((s) => s._count.lessons > 0).length;

                  return (
                    <Panel key={topic.id} className="flex flex-col">
                      <Link
                        href={`/learn/${subject.slug}/${topic.slug}`}
                        className="group flex items-start justify-between gap-3"
                      >
                        <div>
                          <span className="font-mono text-xs text-ink-faint">Topic {topic.number}</span>
                          <h3 className="mt-1 text-base font-semibold text-ink group-hover:text-accent">
                            {topic.title}
                          </h3>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <p className="mt-2 text-sm text-ink-muted">{topic.summary}</p>

                      <ul className="mt-4 flex-1 space-y-1">
                        {topic.subtopics.map((subtopic) => {
                          const mastery = masteryByNumber.get(subtopic.number);
                          return (
                            <li key={subtopic.id}>
                              <Link
                                href={`/learn/${subject.slug}/${topic.slug}/${subtopic.slug}`}
                                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface-raised"
                              >
                                <span className="w-8 shrink-0 font-mono text-xs text-ink-faint">
                                  {subtopic.number}
                                </span>
                                <span className="min-w-0 flex-1 truncate text-ink-muted">{subtopic.title}</span>
                                {mastery !== undefined && (
                                  <span className="shrink-0 font-mono text-xs text-accent">{mastery}%</span>
                                )}
                                {subtopic._count.lessons === 0 && (
                                  <span
                                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-caution/60"
                                    title="Lesson still being written"
                                  />
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-4 border-t border-line pt-3">
                        <div className="flex items-center justify-between text-xs text-ink-faint">
                          <span>
                            {withLessons} of {topic.subtopics.length} subtopics have full lessons
                          </span>
                        </div>
                        <ProgressBar
                          value={(withLessons / Math.max(topic.subtopics.length, 1)) * 100}
                          tone={isPhysics ? 'physics' : 'chemistry'}
                          className="mt-2"
                        />
                      </div>
                    </Panel>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
