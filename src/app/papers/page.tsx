import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, ClipboardList } from 'lucide-react';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { Badge, Card, Notice } from '@/components/ui';
import { ALL_SUBJECTS, parseStudentSubjects } from '@/lib/subjects';
import { blueprintFor, buildablePapers } from '@/lib/exam/blueprints';

export const metadata: Metadata = {
  title: 'Predicted papers',
  description:
    'The question forms that come up most, and a predicted paper built to the real paper’s structure for every Cambridge IGCSE subject.',
};
export const dynamic = 'force-dynamic';

export default async function PapersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  // The student's own subjects first, the rest still listed underneath —
  // someone picking up a new subject should not have to change a setting to
  // look at its papers.
  const chosen = parseStudentSubjects(user.subjects);
  const ordered = [
    ...ALL_SUBJECTS.filter(({ slug }) => chosen.includes(slug)),
    ...ALL_SUBJECTS.filter(({ slug }) => !chosen.includes(slug)),
  ];

  // How many high-yield questions each subject actually has, so the cards
  // promise only what exists.
  const counts = await db.question.groupBy({
    by: ['subjectId'],
    where: { highYield: true, reviewStatus: 'APPROVED' },
    _count: { _all: true },
  });
  const subjects = await db.subject.findMany();
  const bySlug = new Map(subjects.map((s) => [s.id, s.slug]));
  const highYieldBySlug = new Map<string, number>();
  for (const row of counts) {
    const slug = bySlug.get(row.subjectId);
    if (slug) highYieldBySlug.set(slug, row._count._all);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">Exam preparation</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Most asked, and predicted papers
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-ink-muted">
          The question forms that recur across series, and a paper built to the real paper&apos;s mark
          total and timing so you practise at the right pace.
        </p>
      </header>

      <Notice tone="neutral" className="mb-6">
        These are original questions written for this platform, weighted towards the topics the
        syllabus makes examinable year after year. They are not Cambridge past papers, they are not a
        leak, and nothing here is endorsed by Cambridge.
      </Notice>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ordered.map(({ slug, display }) => {
          const blueprint = blueprintFor(slug);
          const papers = buildablePapers(slug);
          const highYield = highYieldBySlug.get(slug) ?? 0;

          return (
            <Card key={slug} interactive className="p-0">
              <Link href={`/papers/${slug}`} className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <Badge tone={display.tone}>
                    {display.name} {display.code}
                  </Badge>
                  <ClipboardList className="h-4 w-4 text-ink-faint" />
                </div>
                <p className="mt-3 text-sm text-ink-muted">
                  {highYield} most-asked question {highYield === 1 ? 'form' : 'forms'} · {papers.length}{' '}
                  predicted {papers.length === 1 ? 'paper' : 'papers'}
                </p>
                <p className="mt-1 text-xs text-ink-faint">{blueprint.seriesLabel}</p>
                <span className="mt-4 flex items-center gap-1 text-sm text-accent">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
