import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { MISTAKE_META, type MistakeCategory } from '@/lib/types';
import { percent, relativeTime } from '@/lib/utils';
import { Badge, EmptyState, LinkButton, Notice, Panel, ProgressBar, SectionHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'My mistakes',
  description: 'What you keep losing marks on, and what to do about it.',
};
export const dynamic = 'force-dynamic';

export default async function MistakesPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const [mistakes, grouped, bySubtopic] = await Promise.all([
    db.mistake.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: 'desc' },
      take: 40,
      include: { subtopic: { include: { topic: { include: { version: { include: { subject: true } } } } } } },
    }),
    db.mistake.groupBy({
      by: ['category'],
      where: { userId: session.id },
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    }),
    db.mistake.groupBy({
      by: ['subtopicId'],
      where: { userId: session.id, subtopicId: { not: null } },
      _count: { subtopicId: true },
      orderBy: { _count: { subtopicId: 'desc' } },
      take: 5,
    }),
  ]);

  if (!mistakes.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <EmptyState
          icon={<AlertTriangle className="h-6 w-6" />}
          title="No mistakes logged yet"
          description="Every question you get wrong is classified automatically — conceptual, calculation, unit, formula, misread, definition or graph — so patterns become visible. Answer some questions and this page fills itself in."
          action={
            <LinkButton href="/practice?mode=quick" variant="primary">
              Start practising
            </LinkButton>
          }
        />
      </div>
    );
  }

  const total = grouped.reduce((sum, row) => sum + row._count.category, 0);
  const dominant = grouped[0];

  const topSubtopics = await db.subtopic.findMany({
    where: { id: { in: bySubtopic.map((row) => row.subtopicId!).filter(Boolean) } },
    include: { topic: { include: { version: { include: { subject: true } } } } },
  });
  const countBySubtopic = new Map(bySubtopic.map((row) => [row.subtopicId, row._count.subtopicId]));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">My mistakes</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          The marks you keep giving away
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Every wrong answer is categorised by its root cause, not just logged. Fixing a pattern is worth
          more than re-reading a topic.
        </p>
      </header>

      {dominant && (
        <Notice tone="caution" title="Your biggest pattern" className="mb-6">
          <p>
            {percent(dominant._count.category, total)}% of your mistakes are{' '}
            <strong className="text-ink">{MISTAKE_META[dominant.category as MistakeCategory].label.toLowerCase()}</strong>.{' '}
            {MISTAKE_META[dominant.category as MistakeCategory].remedy}
          </p>
        </Notice>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-6">
          <Panel>
            <SectionHeader eyebrow="By type" title="Where the marks go" />
            <ul className="space-y-3.5">
              {grouped.map((row) => {
                const meta = MISTAKE_META[row.category as MistakeCategory];
                if (!meta) return null;
                const share = percent(row._count.category, total);

                return (
                  <li key={row.category}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-ink">{meta.label}</span>
                      <span className="font-mono text-xs text-ink-muted">
                        {row._count.category} · {share}%
                      </span>
                    </div>
                    <ProgressBar
                      value={share}
                      tone={share > 35 ? 'negative' : share > 20 ? 'caution' : 'accent'}
                      className="mt-1.5"
                    />
                    <p className="mt-1.5 text-xs text-ink-muted">{meta.description}</p>
                    <p className="mt-0.5 text-xs text-accent">{meta.remedy}</p>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel>
            <SectionHeader eyebrow="Recent" title="Latest mistakes" />
            <ul className="space-y-2.5">
              {mistakes.map((mistake) => {
                const meta = MISTAKE_META[mistake.category as MistakeCategory];
                return (
                  <li key={mistake.id} className="rounded-card border border-line p-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="caution">{meta?.label ?? mistake.category}</Badge>
                      {mistake.subtopic && (
                        <Link
                          href={`/learn/${mistake.subtopic.topic.version.subject.slug}/${mistake.subtopic.topic.slug}/${mistake.subtopic.slug}`}
                          className="text-xs text-accent hover:underline"
                        >
                          {mistake.subtopic.number} {mistake.subtopic.title}
                        </Link>
                      )}
                      <span className="ml-auto text-2xs text-ink-faint">{relativeTime(mistake.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-muted">{mistake.detail}</p>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        <aside className="space-y-4">
          <Panel className="p-4">
            <p className="eyebrow mb-3">Topics to revise</p>
            {topSubtopics.length ? (
              <ul className="space-y-2">
                {topSubtopics
                  .sort((a, b) => (countBySubtopic.get(b.id) ?? 0) - (countBySubtopic.get(a.id) ?? 0))
                  .map((subtopic) => (
                    <li key={subtopic.id}>
                      <Link
                        href={`/learn/${subtopic.topic.version.subject.slug}/${subtopic.topic.slug}/${subtopic.slug}`}
                        className="flex items-center justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-surface-raised"
                      >
                        <span className="min-w-0 truncate text-sm text-ink">{subtopic.title}</span>
                        <span className="shrink-0 font-mono text-xs text-negative">
                          {countBySubtopic.get(subtopic.id)}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">No topic stands out yet.</p>
            )}
          </Panel>

          <Panel className="p-4">
            <p className="eyebrow mb-2">Fix it</p>
            <div className="space-y-2">
              <LinkButton href="/practice?mode=weak" variant="primary" size="sm" className="w-full">
                Practise weak topics
              </LinkButton>
              <LinkButton href="/flashcards" variant="secondary" size="sm" className="w-full">
                Review flashcards
              </LinkButton>
              <LinkButton href="/plan" variant="secondary" size="sm" className="w-full">
                Today&rsquo;s plan
              </LinkButton>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}
