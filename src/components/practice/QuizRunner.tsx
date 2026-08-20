'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Keyboard, Lightbulb, PenLine, RotateCcw, X } from 'lucide-react';

import { Badge, Button, EmptyState, ErrorState, Panel, ProgressBar, Skeleton, Textarea } from '@/components/ui';
import { MISTAKE_META, type MistakeCategory, type PracticeMode } from '@/lib/types';
import { cn, percent } from '@/lib/utils';
import { HandwritingPad } from '@/components/input/HandwritingPad';
import { subjectTone, subjectName } from '@/lib/subjects';

type Question = {
  id: string;
  type: string;
  difficulty: string;
  stem: string;
  marks: number;
  hint: string | null;
  origin: string;
  subject: string;
  subtopic: { id: string; number: string; title: string; slug: string; topicSlug: string } | null;
  options: { id: string; text: string }[];
};

type Marked = {
  recorded: boolean;
  requiresSelfMark?: boolean;
  isCorrect?: boolean;
  marksAwarded?: number;
  marks: number;
  answer: string;
  markScheme: string[];
  explanation: string;
  unitProblem?: boolean;
  options?: { id: string; text: string; why?: string }[];
  mistakeCategory?: MistakeCategory | null;
  subtopic?: { id: string; number: string; title: string; slug: string } | null;
  progress?: { mastery: number; previousMastery: number; xpEarned: number; streakDays: number };
  achievements?: { key: string; title: string; description: string }[];
};

export function QuizRunner({
  mode,
  subject,
  subtopicId,
  count = 8,
}: {
  mode: PracticeMode;
  subject?: string;
  subtopicId?: string;
  count?: number;
}) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [emptyMessage, setEmptyMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState('');
  const [marked, setMarked] = useState<Marked | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  /** Typed or handwritten. Remembered across questions so the choice sticks. */
  const [inputMode, setInputMode] = useState<'type' | 'write'>('type');
  const [results, setResults] = useState<{ correct: boolean; marks: number; total: number }[]>([]);
  const startedAt = useRef(Date.now());

  const load = useCallback(async () => {
    setQuestions(null);
    setError(null);
    setEmptyMessage(null);
    setResults([]);
    setIndex(0);
    setMarked(null);
    setResponse('');

    const params = new URLSearchParams({ mode, count: String(count) });
    if (subject) params.set('subject', subject);
    if (subtopicId) params.set('subtopicId', subtopicId);

    try {
      const res = await fetch(`/api/quiz?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Could not load questions.');
        return;
      }
      if (!data.questions.length) {
        setEmptyMessage(data.message ?? 'No questions available for that selection.');
        setQuestions([]);
        return;
      }
      setQuestions(data.questions as Question[]);
      startedAt.current = Date.now();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    }
  }, [mode, subject, subtopicId, count]);

  useEffect(() => {
    void load();
  }, [load]);

  const question = questions?.[index];

  async function submit(selfMarks?: number) {
    if (!question || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          response,
          timeMs: Date.now() - startedAt.current,
          mode,
          selfMarks,
        }),
      });
      const data = (await res.json()) as Marked;
      if (!res.ok) {
        setError('Could not record that answer.');
        return;
      }
      setMarked(data);
      if (data.recorded) {
        setResults((current) => [
          ...current,
          { correct: Boolean(data.isCorrect), marks: data.marksAwarded ?? 0, total: data.marks },
        ]);
      }
    } catch {
      setError('Could not reach the server.');
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    setMarked(null);
    setResponse('');
    setShowHint(false);
    startedAt.current = Date.now();
    setIndex((i) => i + 1);
  }

  if (error) return <ErrorState description={error} onRetry={load} />;
  if (questions === null) return <Skeleton className="h-96 w-full" />;

  if (emptyMessage) {
    return (
      <EmptyState
        title="Nothing to practise here yet"
        description={emptyMessage}
        action={
          <Button variant="secondary" onClick={load}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
        }
      />
    );
  }

  // ---- Session finished ---------------------------------------------------
  if (index >= questions.length) {
    const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
    const availableMarks = results.reduce((sum, r) => sum + r.total, 0);
    const correct = results.filter((r) => r.correct).length;

    return (
      <Panel>
        <p className="eyebrow">Session complete</p>
        <h2 className="mt-1.5 text-2xl font-semibold text-ink">
          {totalMarks} / {availableMarks} marks
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          {correct} of {results.length} questions fully correct ({percent(totalMarks, availableMarks)}%)
        </p>
        <ProgressBar
          value={percent(totalMarks, availableMarks)}
          tone={percent(totalMarks, availableMarks) >= 70 ? 'positive' : 'caution'}
          className="mt-4"
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary" onClick={load}>
            <RotateCcw className="h-4 w-4" /> Another set
          </Button>
          <Link
            href="/mistakes"
            className="inline-flex h-10 items-center rounded-xl border border-line px-4 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            Review my mistakes
          </Link>
        </div>
      </Panel>
    );
  }

  if (!question) return null;

  const isMcq = question.type === 'MCQ';
  /** Marked by comparing the typed text, so it always needs a typed answer. */
  const autoMarked = question.type === 'NUMERICAL';

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-muted">
            Question {index + 1} of {questions.length}
          </span>
          <span className="text-ink-faint">
            {question.marks} mark{question.marks === 1 ? '' : 's'}
          </span>
        </div>
        <ProgressBar value={(index / questions.length) * 100} />
      </div>

      <Panel>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone={subjectTone(question.subject)}>{subjectName(question.subject)}</Badge>
          <Badge tone="neutral">{question.type}</Badge>
          <Badge
            tone={
              question.difficulty === 'CHALLENGE'
                ? 'negative'
                : question.difficulty === 'FOUNDATION'
                  ? 'positive'
                  : 'neutral'
            }
          >
            {question.difficulty.toLowerCase()}
          </Badge>
          {question.origin === 'AI_GENERATED' && <Badge tone="caution">AI-generated</Badge>}
          {question.subtopic && (
            <span className="text-xs text-ink-faint">
              {question.subtopic.number} {question.subtopic.title}
            </span>
          )}
        </div>

        <p className="whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink">{question.stem}</p>

        {/* Answer input */}
        <div className="mt-5">
          {isMcq ? (
            <div className="space-y-2">
              {question.options.map((option) => {
                const chosen = response === option.id;
                const revealed = marked?.options?.find((o) => o.id === option.id);
                const isAnswer = marked && marked.answer === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={Boolean(marked)}
                    onClick={() => setResponse(option.id)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-card border px-4 py-3 text-left text-sm transition-colors',
                      marked && isAnswer
                        ? 'border-positive bg-positive/10'
                        : marked && chosen
                          ? 'border-negative bg-negative/10'
                          : chosen
                            ? 'border-accent bg-accent/[0.07]'
                            : 'border-line hover:border-accent/40',
                    )}
                  >
                    <span className="font-mono text-xs text-ink-faint">{option.id.toUpperCase()}</span>
                    <span className="flex-1 text-ink">
                      {option.text}
                      {marked && revealed?.why && (
                        <span className="mt-1 block text-xs text-ink-muted">{revealed.why}</span>
                      )}
                    </span>
                    {marked && isAnswer && <Check className="h-4 w-4 shrink-0 text-positive" />}
                    {marked && chosen && !isAnswer && <X className="h-4 w-4 shrink-0 text-negative" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {/* Written papers are handwritten, so practice should allow it:
                  working, diagrams and "½mv²" are all faster by hand than by
                  keyboard. Marking is unchanged — these questions are marked by
                  the student against the expected answer either way. */}
              <div className="mb-2 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setInputMode('type')}
                  aria-pressed={inputMode === 'type'}
                  disabled={Boolean(marked)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors disabled:opacity-50 ${
                    inputMode === 'type'
                      ? 'bg-accent/12 text-accent'
                      : 'text-ink-muted hover:bg-surface-raised'
                  }`}
                >
                  <Keyboard className="h-3.5 w-3.5" /> Type
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('write')}
                  aria-pressed={inputMode === 'write'}
                  disabled={Boolean(marked)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors disabled:opacity-50 ${
                    inputMode === 'write'
                      ? 'bg-accent/12 text-accent'
                      : 'text-ink-muted hover:bg-surface-raised'
                  }`}
                >
                  <PenLine className="h-3.5 w-3.5" /> Write by hand
                </button>
              </div>

              {inputMode === 'type' ? (
                <Textarea
                  value={response}
                  onChange={(event) => setResponse(event.target.value)}
                  rows={question.type === 'NUMERICAL' ? 2 : 5}
                  disabled={Boolean(marked)}
                  placeholder={
                    question.type === 'NUMERICAL'
                      ? 'Your answer, including the unit'
                      : 'Write your full answer here'
                  }
                  aria-label="Your answer"
                />
              ) : (
                <div className="space-y-2">
                  <HandwritingPad
                    // Keyed on the question: without this React reuses the same
                    // canvas and the previous answer's writing is still on it.
                    key={question.id}
                    height={autoMarked ? 200 : 280}
                    disabled={Boolean(marked)}
                    ariaLabel={autoMarked ? 'Your working' : 'Write your answer by hand'}
                    // A numerical answer is auto-marked by comparing text, which
                    // no drawing can satisfy — so there the pad holds the working
                    // and the marked answer is typed on the line below, exactly
                    // as the paper is laid out. A written answer is self-marked
                    // against the scheme, so the drawing is the whole answer and
                    // the recorded response only has to show one was given.
                    onChange={
                      autoMarked
                        ? undefined
                        : ({ isEmpty }) => setResponse(isEmpty ? '' : '[handwritten answer]')
                    }
                  />
                  {autoMarked && (
                    <Textarea
                      value={response}
                      onChange={(event) => setResponse(event.target.value)}
                      rows={1}
                      disabled={Boolean(marked)}
                      placeholder="Final answer, including the unit"
                      aria-label="Final answer"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hint */}
        {question.hint && !marked && (
          <div className="mt-4">
            {showHint ? (
              <p className="flex items-start gap-2 rounded-card border border-caution/25 bg-caution/[0.07] p-3 text-sm text-ink-muted">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caution" />
                {question.hint}
              </p>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowHint(true)}>
                <Lightbulb className="h-3.5 w-3.5" /> Show a hint
              </Button>
            )}
          </div>
        )}

        {/* Actions */}
        {!marked && (
          <Button
            variant="primary"
            className="mt-5"
            loading={submitting}
            disabled={!response.trim()}
            onClick={() => submit()}
          >
            Check answer
          </Button>
        )}
      </Panel>

      {/* Self-marking for written answers */}
      {marked?.requiresSelfMark && (
        <Panel className="border-accent/25">
          <p className="eyebrow mb-2">Mark your own answer</p>
          <p className="text-sm text-ink-muted">
            Written answers are marked against the scheme rather than auto-marked, because an examiner
            awards points for specific statements.
          </p>

          <div className="mt-4 rounded-card border border-line bg-surface-raised/50 p-4">
            <p className="text-sm font-medium text-ink">Expected answer</p>
            <p className="mt-1.5 text-sm text-ink-muted">{marked.answer}</p>
            <p className="mt-4 text-sm font-medium text-ink">Mark scheme</p>
            <ul className="mt-1.5 space-y-1">
              {marked.markScheme.map((point, i) => (
                <li key={i} className="text-sm text-ink-muted">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-sm text-ink">How many marks did you earn?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: marked.marks + 1 }, (_, m) => (
              <Button key={m} variant="secondary" size="sm" loading={submitting} onClick={() => submit(m)}>
                {m}
              </Button>
            ))}
          </div>
        </Panel>
      )}

      {/* Feedback */}
      {marked?.recorded && (
        <Panel
          className={cn(
            marked.isCorrect ? 'border-positive/30' : 'border-negative/30',
          )}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={marked.isCorrect ? 'positive' : 'negative'}>
              {marked.isCorrect ? 'Correct' : 'Not quite'}
            </Badge>
            <span className="text-sm text-ink-muted">
              {marked.marksAwarded} / {marked.marks} marks
            </span>
            {marked.unitProblem && <Badge tone="caution">Unit error</Badge>}
            {marked.progress && marked.progress.xpEarned > 0 && (
              <span className="text-sm text-accent">+{marked.progress.xpEarned} XP</span>
            )}
          </div>

          {!marked.isCorrect && (
            <p className="mt-3 text-sm">
              <span className="text-ink-muted">Answer: </span>
              <span className="font-medium text-ink">{marked.answer}</span>
            </p>
          )}

          <div className="prose-science mt-3">
            <p>{marked.explanation}</p>
          </div>

          {marked.markScheme.length > 0 && (
            <details className="mt-4 rounded-card border border-line bg-surface-raised/40 p-3">
              <summary className="cursor-pointer text-sm font-medium text-accent">Mark scheme</summary>
              <ul className="mt-2 space-y-1">
                {marked.markScheme.map((point, i) => (
                  <li key={i} className="text-sm text-ink-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </details>
          )}

          {marked.mistakeCategory && (
            <div className="mt-4 rounded-card border border-caution/25 bg-caution/[0.06] p-3.5">
              <p className="text-sm font-medium text-ink">
                Logged as: {MISTAKE_META[marked.mistakeCategory].label}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{MISTAKE_META[marked.mistakeCategory].remedy}</p>
            </div>
          )}

          {marked.subtopic && (
            <p className="mt-4 text-sm text-ink-muted">
              Revise:{' '}
              <Link
                href={`/learn/${question.subject}/${question.subtopic?.topicSlug}/${marked.subtopic.slug}`}
                className="text-accent hover:underline"
              >
                {marked.subtopic.number} {marked.subtopic.title}
              </Link>
              {marked.progress && (
                <span className="text-ink-faint">
                  {' '}
                  · mastery {marked.progress.previousMastery}% → {marked.progress.mastery}%
                </span>
              )}
            </p>
          )}

          {marked.achievements && marked.achievements.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {marked.achievements.map((achievement) => (
                <Badge key={achievement.key} tone="accent">
                  Achievement: {achievement.title}
                </Badge>
              ))}
            </div>
          )}

          <Button variant="primary" className="mt-5" onClick={next}>
            {index === questions.length - 1 ? 'Finish' : 'Next question'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Panel>
      )}
    </div>
  );
}
