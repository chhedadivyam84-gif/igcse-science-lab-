import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { Badge, Notice } from '@/components/ui';
import { ExamRunner } from '@/components/practice/ExamRunner';
import { isSubjectSlug, subjectDisplay } from '@/lib/subjects';
import { formatDuration, paperFor } from '@/lib/exam/blueprints';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ subject: string; paper: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject, paper } = await params;
  const display = subjectDisplay(subject);
  return { title: `${display.name} predicted Paper ${paper}` };
}

export default async function PredictedPaperPage({ params }: Params) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const { subject, paper: paperNumber } = await params;
  if (!isSubjectSlug(subject)) notFound();

  const paper = paperFor(subject, paperNumber);
  if (!paper || !paper.buildable) notFound();

  const display = subjectDisplay(subject);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-ink-faint">
        <Link href="/papers" className="hover:text-ink">
          Predicted papers
        </Link>
        <span>/</span>
        <Link href={`/papers/${subject}`} className="hover:text-ink">
          {display.name}
        </Link>
        <span>/</span>
        <span className="text-ink-muted">Paper {paper.number}</span>
      </nav>

      <header className="mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={display.tone}>
            {display.name} {display.code}
          </Badge>
          <Badge tone="accent">Predicted</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Paper {paper.number} — {paper.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          {paper.marks} marks · {formatDuration(paper.minutes)} ·{' '}
          {paper.calculator === 'ALLOWED'
            ? 'calculator allowed'
            : paper.calculator === 'NOT_ALLOWED'
              ? 'no calculator'
              : 'no calculator needed'}
          . You will only see the answers once you submit.
        </p>
      </header>

      <Notice tone="neutral" className="mb-5">
        Original questions written for this platform, weighted towards the topics that recur. This is
        not a Cambridge past paper and it is not a leak — it predicts the shape of the paper and the
        topics, not the wording.
      </Notice>

      <ExamRunner subject={subject} paper={paper.number} />
    </div>
  );
}
