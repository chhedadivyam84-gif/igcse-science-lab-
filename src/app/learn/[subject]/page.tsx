import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Info } from 'lucide-react';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { masteryBand, progressForUser } from '@/lib/progress';
import { subjectTextClass, subjectTone } from '@/lib/subjects';
import { Badge, LinkButton, Notice, Panel, ProgressBar } from '@/components/ui';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject } = await params;
  const row = await db.subject.findUnique({ where: { slug: subject } });
  return row ? { title: `${row.name} ${row.code}` } : { title: 'Subject' };
}

export default async function SubjectPage({ params }: Params) {
  const { subject: slug } = await params;
  // Any seeded subject is valid — the database lookup below is the gate, so
  // adding a syllabus never requires editing a list of allowed slugs here.
  const session = await getSessionUser();
  const [subject, progress] = await Promise.all([
    db.subject.findUnique({
      where: { slug },
      include: {
        versions: {
          where: { isActive: true },
          include: {
            topics: {
              orderBy: { order: 'asc' },
              include: {
                subtopics: {
                  orderBy: { order: 'asc' },
                  include: { _count: { select: { lessons: true, questions: true, flashcards: true } } },
                },
              },
            },
          },
        },
        _count: { select: { formulas: true, definitions: true, simulations: true } },
      },
    }),
    session ? progressForUser(session.id) : Promise.resolve([]),
  ]);

  if (!subject) notFound();
  const version = subject.versions[0];
  if (!version) notFound();

  const masteryByNumber = new Map(progress.filter((p) => p.subject === slug).map((p) => [p.number, p.mastery]));
  // Was `slug === 'physics' ? 'physics' : 'chemistry'`, which drew Biology,
  // the maths syllabuses and ICT in Chemistry's colour.
  const tone = subjectTone(slug);
  const subtopicTotal = version.topics.reduce((n, t) => n + t.subtopics.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-faint">
        <Link href="/learn" className="hover:text-ink">
          Learn
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-muted">{subject.name}</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{subject.name}</h1>
          <span className={`font-mono text-xl ${subjectTextClass(slug)}`}>
            {subject.code}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-ink-muted">{subject.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone={tone}>{version.topics.length} topics</Badge>
          <Badge tone="neutral">{subtopicTotal} subtopics</Badge>
          <Badge tone="neutral">{subject._count.formulas} equations</Badge>
          <Badge tone="neutral">{subject._count.definitions} definitions</Badge>
          <Badge tone="neutral">{subject._count.simulations} simulations</Badge>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <LinkButton href={`/practice?subject=${slug}`} variant="primary" size="sm">
            Practise {subject.name}
          </LinkButton>
          <LinkButton href={`/lab?subject=${slug}`} variant="secondary" size="sm">
            Simulations
          </LinkButton>
          <LinkButton href={`/flashcards?subject=${slug}`} variant="secondary" size="sm">
            Flashcards
          </LinkButton>
          <LinkButton href={`/map?subject=${slug}`} variant="secondary" size="sm">
            Knowledge map
          </LinkButton>
        </div>
      </header>

      <Notice tone="neutral" className="mb-6">
        <p className="flex items-start gap-2 text-xs">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            <strong className="text-ink">{version.label}.</strong> {version.sourceNote}
          </span>
        </p>
      </Notice>

      <div className="space-y-4">
        {version.topics.map((topic) => (
          <Panel key={topic.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-ink-faint">Topic {topic.number}</span>
                <h2 className="mt-0.5 text-lg font-semibold text-ink">{topic.title}</h2>
                <p className="mt-1 max-w-2xl text-sm text-ink-muted">{topic.summary}</p>
              </div>
              <Link
                href={`/learn/${slug}/${topic.slug}`}
                className="flex shrink-0 items-center gap-1 text-sm text-accent hover:underline"
              >
                Open topic <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {topic.subtopics.map((subtopic) => {
                const mastery = masteryByNumber.get(subtopic.number);
                const band = mastery !== undefined ? masteryBand(mastery) : null;

                return (
                  <li key={subtopic.id}>
                    <Link
                      href={`/learn/${slug}/${topic.slug}/${subtopic.slug}`}
                      className="flex h-full flex-col rounded-card border border-line bg-surface p-3 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-ink-faint">{subtopic.number}</span>
                        {subtopic._count.lessons === 0 ? (
                          <Badge tone="caution">Objectives only</Badge>
                        ) : (
                          <Badge tone="neutral">{subtopic._count.lessons} lesson</Badge>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-ink">{subtopic.title}</p>
                      <p className="mt-1 line-clamp-2 flex-1 text-xs text-ink-muted">{subtopic.summary}</p>

                      {mastery !== undefined && band && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-ink-faint">{band.label}</span>
                            <span className="font-mono text-ink">{mastery}%</span>
                          </div>
                          <ProgressBar value={mastery} tone={band.tone} className="mt-1" />
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}
