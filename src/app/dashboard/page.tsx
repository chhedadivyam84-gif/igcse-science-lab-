import type { Metadata } from 'next';
import { ALL_SUBJECTS, subjectName, subjectTone } from '@/lib/subjects';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ArrowRight,
  Award,
  Brain,
  Flame,
  MessageCircle,
  NotebookPen,
  Target,
  TrendingUp,
} from 'lucide-react';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { levelFromXp, masteryBand, progressForUser, subjectMastery } from '@/lib/progress';
import { getOrCreateTodayPlan } from '@/lib/plan';
import { percent, relativeTime } from '@/lib/utils';
import { Badge, EmptyState, LinkButton, Panel, ProgressBar, ProgressRing, SectionHeader, Stat } from '@/components/ui';
import { PlanList } from '@/components/dashboard/PlanList';

export const metadata: Metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const [progress, plan, subtopicCounts, recentAttempts, conversations, notes, achievements, mistakeGroups] =
    await Promise.all([
      progressForUser(user.id),
      getOrCreateTodayPlan(user.id),
      db.subject.findMany({
        select: {
          slug: true,
          versions: {
            where: { isActive: true },
            select: { topics: { select: { _count: { select: { subtopics: true } } } } },
          },
        },
      }),
      db.questionAttempt.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 40,
        include: { question: { include: { subtopic: true } } },
      }),
      db.aIConversation.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
        take: 4,
      }),
      db.note.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 4 }),
      db.userAchievement.findMany({
        where: { userId: user.id },
        include: { achievement: true },
        orderBy: { earnedAt: 'desc' },
        take: 4,
      }),
      db.mistake.groupBy({
        by: ['category'],
        where: { userId: user.id, resolved: false },
        _count: { category: true },
        orderBy: { _count: { category: 'desc' } },
        take: 3,
      }),
    ]);

  const totals = Object.fromEntries(
    subtopicCounts.map((subject) => [
      subject.slug,
      subject.versions[0]?.topics.reduce((n, t) => n + t._count.subtopics, 0) ?? 0,
    ]),
  ) as Record<string, number>;

  // Only the subjects the student has actually started. This used to be the
  // two sciences, which meant a Biology or Maths student saw no bars at all —
  // and the overall figure summed mastery across every subject while dividing
  // by the Physics and Chemistry subtopic count alone, so it was simply wrong.
  const subjectCards = ALL_SUBJECTS.map(({ slug, display }) => ({
    slug,
    display,
    data: subjectMastery(progress, slug, totals[slug] ?? 0),
  })).filter((card) => card.data.studied > 0);

  const overallTotal = subjectCards.reduce((n, card) => n + card.data.total, 0);
  const overall =
    overallTotal > 0 ? Math.round(progress.reduce((sum, p) => sum + p.mastery, 0) / overallTotal) : 0;
  const topicsMastered = subjectCards.reduce((n, card) => n + card.data.mastered, 0);

  const level = levelFromXp(user.xp);
  const continueLearning = [...progress]
    .filter((p) => p.mastery < 90)
    .sort((a, b) => {
      const recency = (b.lastStudiedAt?.getTime() ?? 0) - (a.lastStudiedAt?.getTime() ?? 0);
      return recency !== 0 ? recency : a.mastery - b.mastery;
    })
    .slice(0, 3);

  const needsRevision = [...progress].filter((p) => p.mastery < 55).sort((a, b) => a.mastery - b.mastery).slice(0, 5);
  const correct = recentAttempts.filter((a) => a.isCorrect).length;
  const accuracy = percent(correct, recentAttempts.length);

  const isNew = progress.length === 0 && recentAttempts.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <p className="eyebrow">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {greeting()}, {user.name.split(' ')[0]}
        </h1>
        {user.examSeries && (
          <p className="mt-1 text-sm text-ink-muted">
            Working towards {user.targetGrade ? `grade ${user.targetGrade}, ` : ''}
            {user.examSeries}
          </p>
        )}
      </header>

      {isNew && (
        <Panel className="mb-8 border-accent/25">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-ink">Your dashboard is empty — that&rsquo;s expected</h2>
              <p className="mt-1 max-w-2xl text-sm text-ink-muted">
                Mastery, weak topics and your study plan are all calculated from what you actually do.
                Answer a few questions and this page fills itself in.
              </p>
            </div>
            <LinkButton href="/practice?mode=quick" variant="primary">
              Take a quick quiz <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </Panel>
      )}

      {/* Top stats ---------------------------------------------------------- */}
      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        <Panel className="flex items-center gap-6">
          <ProgressRing value={overall} size={104} tone="accent">
            <span className="text-2xl font-semibold tabular-nums text-ink">{overall}%</span>
            <span className="text-2xs uppercase tracking-wide text-ink-faint">overall</span>
          </ProgressRing>
          <div className="space-y-3">
            {subjectCards.map(({ slug, display, data }) => (
              <div key={slug}>
                <div className="flex items-baseline justify-between gap-6">
                  <span className={`text-sm ${display.textClass}`}>
                    {display.name} {display.code}
                  </span>
                  <span className="font-mono text-sm text-ink">{data.mastery}%</span>
                </div>
                <ProgressBar value={data.mastery} tone={display.tone} className="mt-1.5 w-44" />
                <p className="mt-1 text-xs text-ink-faint">
                  {data.studied} of {data.total} subtopics started
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat
            label="Streak"
            value={user.streakDays}
            sub={user.streakDays === 1 ? 'day' : 'days in a row'}
            tone={user.streakDays > 0 ? 'caution' : 'neutral'}
            icon={<Flame className="h-3.5 w-3.5" />}
          />
          <Stat
            label={`Level ${level.level}`}
            value={level.label}
            sub={`${level.into} / ${level.needed} XP`}
            icon={<Award className="h-3.5 w-3.5" />}
          />
          <Stat
            label="Topics mastered"
            value={topicsMastered}
            sub="at 85% or above"
            tone="positive"
            icon={<Target className="h-3.5 w-3.5" />}
          />
          <Stat
            label="Recent accuracy"
            value={recentAttempts.length ? `${accuracy}%` : '—'}
            sub={recentAttempts.length ? `last ${recentAttempts.length} questions` : 'no attempts yet'}
            tone={accuracy >= 70 ? 'positive' : accuracy > 0 ? 'caution' : 'neutral'}
            icon={<TrendingUp className="h-3.5 w-3.5" />}
          />
        </div>
      </div>

      {/* Main grid ---------------------------------------------------------- */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <SectionHeader
              eyebrow="Pick up where you left off"
              title="Continue learning"
              action={
                <Link href="/progress" className="text-sm text-accent hover:underline">
                  All progress
                </Link>
              }
            />
            {continueLearning.length ? (
              <ul className="space-y-2">
                {continueLearning.map((item) => {
                  const band = masteryBand(item.mastery);
                  return (
                    <li key={item.subtopicId}>
                      <Link
                        href={`/learn/${item.subject}/${item.topicSlug}/${item.slug}`}
                        className="group flex items-center gap-4 rounded-card border border-line bg-surface p-3.5 transition-all hover:border-accent/40"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone={subjectTone(item.subject)}>{subjectName(item.subject)}</Badge>
                            <span className="font-mono text-xs text-ink-faint">{item.number}</span>
                          </div>
                          <p className="mt-1.5 truncate text-sm font-medium text-ink">{item.title}</p>
                          <ProgressBar value={item.mastery} tone={band.tone} className="mt-2" />
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-mono text-sm font-semibold text-ink">{item.mastery}%</p>
                          <p className="text-2xs uppercase tracking-wide text-ink-faint">{band.label}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState
                icon={<Brain className="h-6 w-6" />}
                title="Nothing in progress yet"
                description="Open a topic or answer a few questions and it will appear here with your mastery score."
                action={
                  <LinkButton href="/learn" variant="secondary">
                    Browse the syllabus
                  </LinkButton>
                }
              />
            )}
          </Panel>

          <Panel>
            <SectionHeader
              eyebrow="Diagnosis"
              title="Needs revision"
              description="Mastery decays over time, so topics resurface here if you have not touched them for a while."
              action={
                <Link href="/mistakes" className="text-sm text-accent hover:underline">
                  My mistakes
                </Link>
              }
            />
            {needsRevision.length ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {needsRevision.map((item) => (
                  <li key={item.subtopicId}>
                    <Link
                      href={`/learn/${item.subject}/${item.topicSlug}/${item.slug}`}
                      className="flex items-center justify-between gap-3 rounded-card border border-line bg-surface px-3.5 py-3 text-sm transition-colors hover:border-negative/40"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-ink">{item.title}</span>
                        <span className="block text-xs text-ink-faint">
                          {item.number} · {subjectName(item.subject)}
                        </span>
                      </span>
                      <span className="font-mono text-sm text-negative">{item.mastery}%</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">
                {progress.length
                  ? 'Nothing is below 55% right now. Keep the streak going.'
                  : 'Answer some questions and weak areas will be identified automatically.'}
              </p>
            )}

            {mistakeGroups.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="eyebrow mb-2">Where you lose marks</p>
                <div className="flex flex-wrap gap-2">
                  {mistakeGroups.map((group) => (
                    <Badge key={group.category} tone="caution">
                      {group.category.toLowerCase()} × {group._count.category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Panel>

          <div className="grid gap-6 sm:grid-cols-2">
            <Panel>
              <SectionHeader eyebrow="Ask AI" title="Recent questions" />
              {conversations.length ? (
                <ul className="space-y-2">
                  {conversations.map((conversation) => (
                    <li key={conversation.id}>
                      <Link
                        href={`/tutor?c=${conversation.id}`}
                        className="flex items-start gap-2.5 rounded-lg p-2 text-sm transition-colors hover:bg-surface-raised"
                      >
                        <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span className="min-w-0">
                          <span className="block truncate text-ink">{conversation.title}</span>
                          <span className="block text-xs text-ink-faint">
                            {conversation.mode} · {relativeTime(conversation.updatedAt)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-muted">
                  You have not asked NOVA anything yet.{' '}
                  <Link href="/tutor" className="text-accent hover:underline">
                    Start a conversation
                  </Link>
                  .
                </p>
              )}
            </Panel>

            <Panel>
              <SectionHeader eyebrow="Notes" title="Recently generated" />
              {notes.length ? (
                <ul className="space-y-2">
                  {notes.map((note) => (
                    <li key={note.id}>
                      <Link
                        href={`/notes?open=${note.id}`}
                        className="flex items-start gap-2.5 rounded-lg p-2 text-sm transition-colors hover:bg-surface-raised"
                      >
                        <NotebookPen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span className="min-w-0">
                          <span className="block truncate text-ink">{note.title}</span>
                          <span className="block text-xs text-ink-faint">
                            {note.style} · {relativeTime(note.createdAt)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-muted">
                  No notes yet.{' '}
                  <Link href="/notes" className="text-accent hover:underline">
                    Generate a set
                  </Link>
                  .
                </p>
              )}
            </Panel>
          </div>
        </div>

        {/* Sidebar ---------------------------------------------------------- */}
        <div className="space-y-6">
          <Panel>
            <SectionHeader eyebrow="Today" title="Your plan" />
            <PlanList initialItems={plan.items} />
          </Panel>

          <Panel>
            <SectionHeader eyebrow="Level" title={`${level.label} · Level ${level.level}`} />
            <ProgressBar value={(level.into / level.needed) * 100} tone="accent" />
            <p className="mt-2 text-xs text-ink-muted">
              {level.needed - level.into} XP to level {level.level + 1} · {user.xp} XP total
            </p>

            {achievements.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="eyebrow mb-2.5">Recent achievements</p>
                <ul className="space-y-2">
                  {achievements.map((entry) => (
                    <li key={entry.id} className="flex items-start gap-2.5">
                      <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caution" />
                      <span>
                        <span className="block text-sm text-ink">{entry.achievement.title}</span>
                        <span className="block text-xs text-ink-faint">{entry.achievement.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Panel>

          <Panel>
            <SectionHeader eyebrow="Quiz performance" title="Last 40 questions" />
            {recentAttempts.length ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tabular-nums text-ink">{accuracy}%</span>
                  <span className="text-sm text-ink-muted">
                    {correct} of {recentAttempts.length} correct
                  </span>
                </div>
                <ProgressBar
                  value={accuracy}
                  tone={accuracy >= 70 ? 'positive' : accuracy >= 50 ? 'caution' : 'negative'}
                  className="mt-3"
                />
                <div className="mt-4 flex flex-wrap gap-1">
                  {recentAttempts
                    .slice(0, 20)
                    .reverse()
                    .map((attempt) => (
                      <span
                        key={attempt.id}
                        title={attempt.question.subtopic?.title ?? 'Question'}
                        className={`h-5 w-3 rounded-sm ${attempt.isCorrect ? 'bg-positive/70' : 'bg-negative/70'}`}
                      />
                    ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-ink-muted">No attempts recorded yet.</p>
            )}
            <LinkButton href="/practice" variant="secondary" size="sm" className="mt-5 w-full">
              Practise now
            </LinkButton>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
