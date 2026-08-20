'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Clock, Flag, RotateCcw } from 'lucide-react';

import { ExamCalculator } from './ExamCalculator';
import { Badge, Button, EmptyState, ErrorState, Panel, ProgressBar, Skeleton, Textarea } from '@/components/ui';
import { MISTAKE_META, type MistakeCategory } from '@/lib/types';
import { cn, groupBy, percent } from '@/lib/utils';

type Question = {
  id: string;
  type: string;
  difficulty: string;
  stem: string;
  marks: number;
  subject: string;
  origin: string;
  subtopic: { id: string; number: string; title: string; slug: string; topicSlug: string } | null;
  options: { id: string; text: string }[];
};

type Result = {
  questionId: string;
  isCorrect: boolean;
  marksAwarded: number;
  marks: number;
  answer: string;
  markScheme: string[];
  explanation: string;
  mistakeCategory: MistakeCategory | null;
  subtopic: { number: string; title: string } | null;
};

type Phase = 'sitting' | 'marking' | 'results';

/** Roughly the pace of a real paper: about 75 seconds per mark. */
const SECONDS_PER_MARK = 75;

export function ExamRunner({
  subject,
  count = 12,
  paper,
}: {
  subject?: string;
  count?: number;
  /** Paper number, e.g. "4". Sits the predicted paper for that blueprint
   *  instead of a generic practice set, timed to the real paper's length. */
  paper?: string;
}) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [paperMeta, setPaperMeta] = useState<{ name: string; marks: number; target: number; minutes: number; complete: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('sitting');
  const [remaining, setRemaining] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [markingQueue, setMarkingQueue] = useState<{ question: Question; data: Omit<Result, 'marksAwarded' | 'isCorrect' | 'mistakeCategory'> }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setQuestions(null);
    setError(null);
    setAnswers({});
    setFlagged(new Set());
    setResults([]);
    setMarkingQueue([]);
    setIndex(0);
    setPhase('sitting');

    setPaperMeta(null);

    // A predicted paper comes from the blueprint endpoint and carries its own
    // timing; a generic practice paper is paced at 75 seconds per mark.
    const url =
      paper && subject
        ? `/api/predicted?subject=${subject}&paper=${paper}`
        : `/api/quiz?${new URLSearchParams({
            mode: 'exam',
            count: String(count),
            ...(subject ? { subject } : {}),
          })}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not start the paper.');
        return;
      }
      if (!data.questions?.length) {
        setError(data.message ?? 'There are not enough questions in the bank for a paper yet.');
        return;
      }
      const loaded = data.questions as Question[];
      setQuestions(loaded);

      if (paper) {
        setPaperMeta({
          name: data.paper.name,
          marks: data.marksBuilt,
          target: data.marksTarget,
          minutes: data.minutes,
          complete: data.complete,
        });
        setRemaining(data.minutes * 60);
      } else {
        setRemaining(loaded.reduce((sum, q) => sum + q.marks, 0) * SECONDS_PER_MARK);
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    }
  }, [subject, count, paper]);

  useEffect(() => {
    void load();
  }, [load]);

  const finish = useCallback(async () => {
    if (!questions || submitting) return;
    setSubmitting(true);
    setPhase('marking');

    const collected: Result[] = [];
    const queue: typeof markingQueue = [];

    for (const question of questions) {
      const response = answers[question.id] ?? '';
      try {
        const res = await fetch('/api/attempts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: question.id, response, timeMs: 0, mode: 'exam' }),
        });
        const data = await res.json();
        if (!res.ok) continue;

        if (data.requiresSelfMark) {
          queue.push({
            question,
            data: {
              questionId: question.id,
              answer: data.answer,
              markScheme: data.markScheme,
              explanation: data.explanation,
              marks: data.marks,
              subtopic: null,
            },
          });
        } else {
          collected.push({
            questionId: question.id,
            isCorrect: data.isCorrect,
            marksAwarded: data.marksAwarded,
            marks: data.marks,
            answer: data.answer,
            markScheme: data.markScheme,
            explanation: data.explanation,
            mistakeCategory: data.mistakeCategory ?? null,
            subtopic: data.subtopic ? { number: data.subtopic.number, title: data.subtopic.title } : null,
          });
        }
      } catch {
        // A failed request simply leaves that question unmarked rather than
        // losing the whole paper.
      }
    }

    setResults(collected);
    setMarkingQueue(queue);
    setSubmitting(false);
    if (!queue.length) setPhase('results');
  }, [questions, answers, submitting]);

  // Countdown.
  useEffect(() => {
    if (phase !== 'sitting' || !questions) return;
    const timer = setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          clearInterval(timer);
          void finish();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, questions, finish]);

  async function selfMark(questionId: string, marks: number) {
    const entry = markingQueue.find((item) => item.question.id === questionId);
    if (!entry) return;

    const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, response: answers[questionId] ?? '', timeMs: 0, mode: 'exam', selfMarks: marks }),
    });
    const data = await res.json();

    setResults((current) => [
      ...current,
      {
        questionId,
        isCorrect: Boolean(data.isCorrect),
        marksAwarded: data.marksAwarded ?? marks,
        marks: entry.data.marks,
        answer: entry.data.answer,
        markScheme: entry.data.markScheme,
        explanation: entry.data.explanation,
        mistakeCategory: data.mistakeCategory ?? null,
        subtopic: data.subtopic ? { number: data.subtopic.number, title: data.subtopic.title } : null,
      },
    ]);

    setMarkingQueue((current) => {
      const next = current.filter((item) => item.question.id !== questionId);
      if (!next.length) setPhase('results');
      return next;
    });
  }

  if (error) return <ErrorState description={error} onRetry={load} />;
  if (!questions) return <Skeleton className="h-96 w-full" />;

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const answered = questions.filter((q) => (answers[q.id] ?? '').trim()).length;

  /* ---- Marking phase --------------------------------------------------- */
  if (phase === 'marking') {
    const entry = markingQueue[0];
    if (!entry) {
      return (
        <Panel>
          <p className="text-sm text-ink-muted">Marking your paper…</p>
        </Panel>
      );
    }

    return (
      <Panel>
        <p className="eyebrow">Marking · {markingQueue.length} to go</p>
        <h2 className="mt-1.5 text-lg font-semibold text-ink">{entry.question.stem}</h2>

        <div className="mt-4 rounded-card border border-line bg-surface-raised/50 p-4">
          <p className="text-sm font-medium text-ink">Your answer</p>
          <p className="mt-1 whitespace-pre-line text-sm text-ink-muted">
            {answers[entry.question.id]?.trim() || '(left blank)'}
          </p>
        </div>

        <div className="mt-4 rounded-card border border-accent/25 bg-accent/[0.06] p-4">
          <p className="text-sm font-medium text-ink">Mark scheme</p>
          <ul className="mt-2 space-y-1">
            {entry.data.markScheme.map((point, i) => (
              <li key={i} className="text-sm text-ink-muted">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-sm text-ink">Award yourself the marks you earned:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.from({ length: entry.data.marks + 1 }, (_, m) => (
            <Button key={m} variant="secondary" size="sm" onClick={() => selfMark(entry.question.id, m)}>
              {m} / {entry.data.marks}
            </Button>
          ))}
        </div>
      </Panel>
    );
  }

  /* ---- Results --------------------------------------------------------- */
  if (phase === 'results') {
    return <ExamResults questions={questions} results={results} onRestart={load} />;
  }

  /* ---- Sitting the paper ----------------------------------------------- */
  const question = questions[index];
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const lowTime = remaining < 300;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_15rem]">
      <div className="min-w-0 space-y-4">
        <Panel>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-ink-muted">
              Question {index + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Badge tone="neutral">
                {question.marks} mark{question.marks === 1 ? '' : 's'}
              </Badge>
              <button
                type="button"
                onClick={() =>
                  setFlagged((current) => {
                    const next = new Set(current);
                    if (next.has(question.id)) next.delete(question.id);
                    else next.add(question.id);
                    return next;
                  })
                }
                aria-pressed={flagged.has(question.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs transition-colors',
                  flagged.has(question.id)
                    ? 'border-caution bg-caution/10 text-caution'
                    : 'border-line text-ink-muted hover:text-ink',
                )}
              >
                <Flag className="h-3 w-3" />
                {flagged.has(question.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>
          </div>

          <p className="whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink">{question.stem}</p>

          <div className="mt-5">
            {question.type === 'MCQ' ? (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-card border px-4 py-3 text-left text-sm transition-colors',
                      answers[question.id] === option.id
                        ? 'border-accent bg-accent/[0.07]'
                        : 'border-line hover:border-accent/40',
                    )}
                  >
                    <span className="font-mono text-xs text-ink-faint">{option.id.toUpperCase()}</span>
                    <span className="text-ink">{option.text}</span>
                  </button>
                ))}
              </div>
            ) : (
              <Textarea
                value={answers[question.id] ?? ''}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                rows={question.type === 'NUMERICAL' ? 2 : 6}
                placeholder={question.type === 'NUMERICAL' ? 'Your answer, including the unit' : 'Your answer'}
                aria-label="Your answer"
              />
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <Button variant="secondary" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              Previous
            </Button>
            {index === questions.length - 1 ? (
              <Button variant="primary" onClick={finish} loading={submitting}>
                Submit paper
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setIndex((i) => i + 1)}>
                Next
              </Button>
            )}
          </div>
        </Panel>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <Panel className={cn('p-4', lowTime && 'border-negative/40')}>
          <div className="flex items-center gap-2">
            <Clock className={cn('h-4 w-4', lowTime ? 'text-negative' : 'text-ink-muted')} />
            <span className={cn('font-mono text-2xl font-semibold tabular-nums', lowTime ? 'text-negative' : 'text-ink')}>
              {minutes}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">
            {totalMarks} marks · {answered}/{questions.length} answered
          </p>
          <ProgressBar value={(answered / questions.length) * 100} className="mt-3" />
          {paperMeta && !paperMeta.complete && (
            // Said plainly rather than hidden: a short paper sat as if it were
            // full length teaches the wrong pace.
            <p className="mt-3 border-t border-line pt-3 text-xs text-caution">
              The real {paperMeta.name} is {paperMeta.target} marks. The bank can fill{' '}
              {paperMeta.marks} so far, and the time has been scaled to match.
            </p>
          )}
        </Panel>

        <Panel className="p-4">
          <p className="eyebrow mb-2.5">Questions</p>
          <div className="grid grid-cols-6 gap-1.5">
            {questions.map((q, i) => {
              const done = (answers[q.id] ?? '').trim().length > 0;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to question ${i + 1}`}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-md border text-xs transition-colors',
                    i === index
                      ? 'border-accent bg-accent text-[rgb(var(--surface-0))]'
                      : flagged.has(q.id)
                        ? 'border-caution bg-caution/15 text-caution'
                        : done
                          ? 'border-positive/40 bg-positive/10 text-ink'
                          : 'border-line text-ink-faint',
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <ul className="mt-3 space-y-1 text-2xs text-ink-faint">
            <li>Green — answered</li>
            <li>Amber — flagged for review</li>
          </ul>
        </Panel>

        <ExamCalculator />

        <Button variant="secondary" size="sm" className="w-full" onClick={finish} loading={submitting}>
          Submit paper
        </Button>
      </aside>
    </div>
  );
}

function ExamResults({
  questions,
  results,
  onRestart,
}: {
  questions: Question[];
  results: Result[];
  onRestart: () => void;
}) {
  const totalAwarded = results.reduce((sum, r) => sum + r.marksAwarded, 0);
  const totalAvailable = results.reduce((sum, r) => sum + r.marks, 0);
  const score = percent(totalAwarded, totalAvailable);

  const byQuestion = new Map(questions.map((q) => [q.id, q]));

  const topicRows = useMemo(() => {
    const withTopic = results
      .map((result) => ({ result, question: byQuestion.get(result.questionId) }))
      .filter((row) => row.question?.subtopic);

    const grouped = groupBy(withTopic, (row) => row.question!.subtopic!.number);
    return Object.entries(grouped)
      .map(([number, rows]) => ({
        number,
        title: rows[0].question!.subtopic!.title,
        subject: rows[0].question!.subject,
        slug: rows[0].question!.subtopic!.slug,
        topicSlug: rows[0].question!.subtopic!.topicSlug,
        awarded: rows.reduce((sum, row) => sum + row.result.marksAwarded, 0),
        available: rows.reduce((sum, row) => sum + row.result.marks, 0),
      }))
      .sort((a, b) => percent(a.awarded, a.available) - percent(b.awarded, b.available));
  }, [results, byQuestion]);

  const mistakeCounts = useMemo(() => {
    const counts = new Map<MistakeCategory, number>();
    for (const result of results) {
      if (result.mistakeCategory) counts.set(result.mistakeCategory, (counts.get(result.mistakeCategory) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [results]);

  if (!results.length) {
    return (
      <EmptyState
        title="No answers were recorded"
        description="Something went wrong while marking. Your attempts may not have been saved."
        action={
          <Button variant="primary" onClick={onRestart}>
            Try another paper
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <Panel>
        <p className="eyebrow">Paper complete</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <h2 className="text-4xl font-semibold tabular-nums text-ink">
            {totalAwarded}
            <span className="text-2xl text-ink-muted"> / {totalAvailable}</span>
          </h2>
          <Badge tone={score >= 70 ? 'positive' : score >= 50 ? 'caution' : 'negative'}>{score}%</Badge>
        </div>
        <ProgressBar
          value={score}
          tone={score >= 70 ? 'positive' : score >= 50 ? 'caution' : 'negative'}
          className="mt-4"
        />
        <p className="mt-3 text-xs text-ink-faint">
          This is your score on this set of practice questions. It is not a Cambridge grade and does not
          map to grade boundaries.
        </p>
      </Panel>

      <Panel>
        <p className="eyebrow mb-3">Topic breakdown</p>
        <ul className="space-y-2.5">
          {topicRows.map((row) => {
            const topicScore = percent(row.awarded, row.available);
            return (
              <li key={row.number}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <Link
                    href={`/learn/${row.subject}/${row.topicSlug}/${row.slug}`}
                    className="min-w-0 truncate text-ink hover:text-accent"
                  >
                    <span className="font-mono text-xs text-ink-faint">{row.number}</span> {row.title}
                  </Link>
                  <span className="shrink-0 font-mono text-ink-muted">
                    {row.awarded}/{row.available}
                  </span>
                </div>
                <ProgressBar
                  value={topicScore}
                  tone={topicScore >= 70 ? 'positive' : topicScore >= 40 ? 'caution' : 'negative'}
                  className="mt-1.5"
                />
              </li>
            );
          })}
        </ul>
      </Panel>

      {mistakeCounts.length > 0 && (
        <Panel>
          <p className="eyebrow mb-3">Weakness analysis</p>
          <ul className="space-y-3">
            {mistakeCounts.map(([category, count]) => (
              <li key={category}>
                <p className="text-sm font-medium text-ink">
                  {MISTAKE_META[category].label} × {count}
                </p>
                <p className="mt-0.5 text-sm text-ink-muted">{MISTAKE_META[category].remedy}</p>
              </li>
            ))}
          </ul>
          <Link href="/mistakes" className="mt-4 inline-block text-sm text-accent hover:underline">
            See every mistake you have logged
          </Link>
        </Panel>
      )}

      <Panel>
        <p className="eyebrow mb-3">Question by question</p>
        <ul className="space-y-3">
          {results.map((result) => {
            const question = byQuestion.get(result.questionId);
            if (!question) return null;
            return (
              <li key={result.questionId} className="rounded-card border border-line p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 flex-1 text-sm text-ink">{question.stem}</p>
                  <Badge tone={result.marksAwarded === result.marks ? 'positive' : result.marksAwarded > 0 ? 'caution' : 'negative'}>
                    {result.marksAwarded}/{result.marks}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-ink-muted">{result.explanation}</p>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Button variant="primary" onClick={onRestart}>
        <RotateCcw className="h-4 w-4" /> Sit another paper
      </Button>
    </div>
  );
}
