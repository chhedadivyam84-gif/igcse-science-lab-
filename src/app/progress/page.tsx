import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { levelFromXp, masteryBand, progressForUser, subjectMastery } from '@/lib/progress';
import { percent, relativeTime } from '@/lib/utils';
import { Badge, EmptyState, LinkButton, Panel, ProgressBar, ProgressRing, SectionHeader, Stat } from '@/components/ui';

export const metadata: Metadata = { title: 'Progress' };
export const dynamic = 'force-dynamic';

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const [progress, subjects, attempts, achievements, sessionsCount] = await Promise.all([
    progressForUser(user.id),
    db.subject.findMany({
      select: {
        slug: true,
        name: true,
        versions: {
          where: { isActive: true },
          select: {
            topics: {
              orderBy: { order: 'asc' },
              select: { number: true, title: true, slug: true, subtopics: { select: { number: true } } },
            },
          },
        },
      },
    }),
    db.questionAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: { isCorrect: true, marksAwarded: true, createdAt: true },
    }),
    db.userAchievement.findMany({ where: { userId: user.id }, include: { achievement: true } }),
    db.questionAttempt.count({ where: { userId: user.id } }),
  ]);

  const masteryByNumber = new Map(progress.map((p) => [p.number, p]));
  const level = levelFromXp(user.xp);
  const accuracy = percent(attempts.filter((a) => a.isCorrect).length, attempts.length);

  const totals = Object.fromEntries(
    subjects.map((subject) => [
      subject.slug,
      subject.versions[0]?.topics.reduce((n, t) => n + t.subtopics.length, 0) ?? 0,
    ]),
  ) as Record<string, number>;

  const physics = subjectMastery(progress, 'physics', totals.physics ?? 0);
  const chemistry = subjectMastery(progress, 'chemistry', totals.chemistry ?? 0);

  if (!progress.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <EmptyState
          title="No progress recorded yet"
          description="Mastery is calculated from the questions you answer, and it decays over time so it always reflects what you could do today. Answer a few questions to get started."
          action={
            <LinkButton href="/practice?mode=quick" variant="primary">
              Take a quick quiz
            </LinkButton>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <p className="eyebrow">Progress</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Where you actually stand
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Mastery is an average across the whole syllabus, not just the parts you have touched — and it
          decays if you leave a topic alone, so it stays honest.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Questions answered" value={sessionsCount} />
        <Stat
          label="Overall accuracy"
          value={`${accuracy}%`}
          sub={`last ${attempts.length} attempts`}
          tone={accuracy >= 70 ? 'positive' : 'caution'}
        />
        <Stat label="Current streak" value={user.streakDays} sub="days" tone="caution" />
        <Stat label={`Level ${level.level}`} value={level.label} sub={`${user.xp} XP`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {[
          { data: physics, slug: 'physics' as const, name: 'Physics 0625', tone: 'physics' as const },
          { data: chemistry, slug: 'chemistry' as const, name: 'Chemistry 0620', tone: 'chemistry' as const },
        ].map(({ data, slug, name, tone }) => {
          const subject = subjects.find((s) => s.slug === slug);
          const topics = subject?.versions[0]?.topics ?? [];

          return (
            <Panel key={slug}>
              <div className="flex items-center gap-5">
                <ProgressRing value={data.mastery} size={92} tone={tone}>
                  <span className="text-xl font-semibold tabular-nums text-ink">{data.mastery}%</span>
                </ProgressRing>
                <div>
                  <h2 className="text-lg font-semibold text-ink">{name}</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {data.studied} of {data.total} subtopics started · {data.mastered} mastered
                  </p>
                  <LinkButton href={`/learn/${slug}`} variant="secondary" size="sm" className="mt-3">
                    Open syllabus
                  </LinkButton>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-line pt-5">
                {topics.map((topic) => {
                  const rows = topic.subtopics
                    .map((s) => masteryByNumber.get(s.number))
                    .filter(Boolean) as NonNullable<ReturnType<typeof masteryByNumber.get>>[];
                  const average = topic.subtopics.length
                    ? Math.round(rows.reduce((sum, r) => sum + r.mastery, 0) / topic.subtopics.length)
                    : 0;

                  return (
                    <div key={topic.number}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <Link href={`/learn/${slug}/${topic.slug}`} className="min-w-0 truncate text-ink hover:text-accent">
                          <span className="font-mono text-xs text-ink-faint">{topic.number}</span> {topic.title}
                        </Link>
                        <span className="shrink-0 font-mono text-xs text-ink-muted">{average}%</span>
                      </div>
                      <ProgressBar value={average} tone={tone} className="mt-1.5" />
                    </div>
                  );
                })}
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-8">
        <SectionHeader
          eyebrow="Every subtopic you have studied"
          title="Detailed mastery"
          description="Sorted lowest first — the top of this list is where the marks are."
        />
        <div className="scroll-x">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pb-2 font-medium text-ink-muted">Subtopic</th>
                <th className="pb-2 font-medium text-ink-muted">Accuracy</th>
                <th className="pb-2 font-medium text-ink-muted">Last studied</th>
                <th className="pb-2 text-right font-medium text-ink-muted">Mastery</th>
              </tr>
            </thead>
            <tbody>
              {[...progress]
                .sort((a, b) => a.mastery - b.mastery)
                .map((row) => {
                  const band = masteryBand(row.mastery);
                  return (
                    <tr key={row.subtopicId} className="border-b border-line/60 last:border-0">
                      <td className="py-2.5">
                        <Link
                          href={`/learn/${row.subject}/${row.topicSlug}/${row.slug}`}
                          className="text-ink hover:text-accent"
                        >
                          <span className="font-mono text-xs text-ink-faint">{row.number}</span> {row.title}
                        </Link>
                      </td>
                      <td className="py-2.5 font-mono text-ink-muted">
                        {row.correct}/{row.attempts}
                      </td>
                      <td className="py-2.5 text-ink-faint">
                        {row.lastStudiedAt ? relativeTime(row.lastStudiedAt) : '—'}
                      </td>
                      <td className="py-2.5 text-right">
                        <Badge tone={band.tone}>{row.mastery}%</Badge>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Panel>

      {achievements.length > 0 && (
        <Panel className="mt-6">
          <SectionHeader eyebrow="Achievements" title={`${achievements.length} earned`} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((entry) => (
              <li key={entry.id} className="rounded-card border border-line p-3.5">
                <p className="text-sm font-medium text-ink">{entry.achievement.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{entry.achievement.description}</p>
                <p className="mt-2 text-2xs text-ink-faint">{relativeTime(entry.earnedAt)}</p>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
