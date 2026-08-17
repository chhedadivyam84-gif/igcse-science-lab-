import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { ExamRunner } from '@/components/practice/ExamRunner';

export const metadata: Metadata = {
  title: 'Exam mode',
  description: 'A timed, distraction-free practice paper with topic breakdown and weakness analysis.',
};
export const dynamic = 'force-dynamic';

export default async function ExamPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const { subject } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-5">
        <p className="eyebrow">Exam mode</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Practice paper
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Timed at roughly the pace of a real paper. Flag anything you want to revisit, and you will only
          see the answers once you submit.
        </p>
      </header>

      <ExamRunner subject={subject} />
    </div>
  );
}
