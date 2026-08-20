import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { QuizRunner } from '@/components/practice/QuizRunner';
import { Badge, LinkButton, Notice, Panel } from '@/components/ui';
import { PRACTICE_MODES, type PracticeMode } from '@/lib/types';
import { ALL_SUBJECTS, subjectTone } from '@/lib/subjects';

export const metadata: Metadata = {
  title: 'Practice',
  description: 'MCQ, structured and numerical questions with mark schemes and explanations.',
};
export const dynamic = 'force-dynamic';

const MODE_META: Record<PracticeMode, { label: string; description: string; count: number }> = {
  quick: { label: 'Quick quiz', description: 'Five multiple-choice questions, mixed topics.', count: 5 },
  topic: { label: 'Topic practice', description: 'Everything from one subtopic.', count: 8 },
  mixed: { label: 'Mixed practice', description: 'Interleaved topics — harder, and better for recall.', count: 10 },
  challenge: { label: 'Difficult questions', description: 'Challenge-level questions only.', count: 6 },
  exam: { label: 'Exam mode', description: 'Timed, distraction-free, marked at the end.', count: 12 },
  timed: { label: 'Timed test', description: 'Against the clock, with feedback as you go.', count: 10 },
  weak: { label: 'Weak topics', description: 'Targets whatever your mastery scores say you find hardest.', count: 8 },
  random: { label: 'Random challenge', description: 'Anything from any subject you study.', count: 8 },
};

type Props = {
  searchParams: Promise<{ mode?: string; subject?: string; subtopic?: string }>;
};

export default async function PracticePage({ searchParams }: Props) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const params = await searchParams;
  const mode = (PRACTICE_MODES as readonly string[]).includes(params.mode ?? '')
    ? (params.mode as PracticeMode)
    : null;

  const subtopic = params.subtopic
    ? await db.subtopic.findUnique({
        where: { id: params.subtopic },
        include: { topic: { include: { version: { include: { subject: true } } } } },
      })
    : null;

  // Exam mode has its own interface.
  if (mode === 'exam') redirect('/exam');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">Practice</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {mode ? MODE_META[mode].label : 'Choose how you want to practise'}
        </h1>
        {mode && <p className="mt-2 text-ink-muted">{MODE_META[mode].description}</p>}
        {subtopic && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone={subjectTone(subtopic.topic.version.subject.slug)}>
              {subtopic.number} {subtopic.title}
            </Badge>
            <Link
              href={`/learn/${subtopic.topic.version.subject.slug}/${subtopic.topic.slug}/${subtopic.slug}`}
              className="text-xs text-accent hover:underline"
            >
              Open the lesson
            </Link>
          </div>
        )}
      </header>

      {mode ? (
        <>
          <QuizRunner
            mode={mode}
            subject={params.subject}
            subtopicId={params.subtopic}
            count={MODE_META[mode].count}
          />
          <p className="mt-6 text-center">
            <Link href="/practice" className="text-sm text-ink-muted hover:text-ink">
              Change practice mode
            </Link>
          </p>
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(MODE_META) as PracticeMode[])
              .filter((key) => key !== 'topic' || subtopic)
              .map((key) => {
                const meta = MODE_META[key];
                const href =
                  key === 'exam'
                    ? '/exam'
                    : `/practice?mode=${key}${params.subject ? `&subject=${params.subject}` : ''}${
                        params.subtopic ? `&subtopic=${params.subtopic}` : ''
                      }`;

                return (
                  <Link
                    key={key}
                    href={href}
                    className="group rounded-card border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-base font-semibold text-ink">{meta.label}</h2>
                      <span className="text-xs text-ink-faint">{meta.count} Qs</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{meta.description}</p>
                  </Link>
                );
              })}
          </div>

          <Panel className="mt-6">
            <p className="eyebrow mb-2">Filter</p>
            {/* Built from ALL_SUBJECTS rather than listed by hand: the two
                hard-coded buttons here meant a Biology or Maths student had no
                way to filter practice to their own subject at all. */}
            <div className="flex flex-wrap gap-2">
              <LinkButton href="/practice" variant={!params.subject ? 'primary' : 'secondary'} size="sm">
                All subjects
              </LinkButton>
              {ALL_SUBJECTS.map(({ slug, display }) => (
                <LinkButton
                  key={slug}
                  href={`/practice?subject=${slug}`}
                  variant={params.subject === slug ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {display.name}
                </LinkButton>
              ))}
            </div>
          </Panel>

          <Notice tone="neutral" className="mt-4">
            Questions are written in the style of Cambridge IGCSE papers. They are original practice
            material, not past-paper questions. Anything produced by the AI is labelled AI-generated and
            is reviewed before it enters the bank.
          </Notice>
        </>
      )}
    </div>
  );
}
