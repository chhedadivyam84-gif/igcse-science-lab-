'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Check, Lightbulb, Sparkles, X } from 'lucide-react';

import { DiagramCanvas, DiagramNotes } from '@/components/diagram/DiagramCanvas';
import { RichText } from '@/components/content/RichText';
import { Badge, Button, EmptyState, ErrorState, Input, Notice, Panel, SectionHeader, Select, Skeleton } from '@/components/ui';
import type { ExplainResult } from '@/lib/types';

const EXAMPLES = [
  'Why does a metal conduct electricity?',
  'Why does a transformer only work with a.c.?',
  'What is the difference between a strong acid and a concentrated acid?',
  'Why does the Moon stay in orbit?',
];

export function ExplainWorkbench({ aiConfigured }: { aiConfigured: boolean }) {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [result, setResult] = useState<ExplainResult | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  async function run(text: string) {
    const value = text.trim();
    if (value.length < 4) {
      setError('Ask a fuller question — at least a few words.');
      return;
    }

    setPending(true);
    setError(null);
    setResult(null);
    setQuizAnswers({});

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: value, subject: subject || undefined }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not build an explanation.');
        return;
      }
      setResult(data as ExplainResult);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <Panel>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            run(question);
          }}
          className="space-y-3"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Why does a metal conduct electricity?"
              aria-label="Your question"
              className="flex-1"
            />
            <Select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              aria-label="Subject"
              className="sm:w-40"
            >
              <option value="">Either subject</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </Select>
            <Button type="submit" variant="primary" loading={pending} className="sm:w-32">
              <Sparkles className="h-4 w-4" />
              Explain
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setQuestion(example);
                  run(example);
                }}
                className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
              >
                {example}
              </button>
            ))}
          </div>
        </form>
      </Panel>

      {!aiConfigured && (
        <Notice tone="caution" title="AI model not connected">
          Explanations will be assembled from the curriculum database, which means no analogy, worked
          example or quiz. Add an API key to <code className="formula">.env</code> for the full output.
        </Notice>
      )}

      {error && <ErrorState description={error} onRetry={() => run(question)} />}

      {pending && (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      )}

      {!pending && !result && !error && (
        <EmptyState
          icon={<Lightbulb className="h-6 w-6" />}
          title="One question in, a full mini-lesson out"
          description="You get a simple explanation, the IGCSE-level version, an analogy, a diagram where one helps, key terms, formulae, a worked example, the common mistake, an exam question and a quick quiz."
        />
      )}

      {result && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={result.aiAssisted ? 'accent' : 'caution'}>
              {result.aiAssisted ? 'AI-assisted' : 'From curriculum database'}
            </Badge>
            {result.sourceRefs.length > 0 && (
              <Badge tone="neutral">Grounded in syllabus {result.sourceRefs.join(', ')}</Badge>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel>
              <SectionHeader eyebrow="01 · Simple" title="In plain words" />
              <p className="prose-science">{result.simple}</p>
            </Panel>
            <Panel>
              <SectionHeader eyebrow="02 · IGCSE level" title="What the papers expect" />
              <RichText text={result.igcse} />
            </Panel>
          </div>

          {result.analogy && (
            <Panel className="border-accent/25">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                <Lightbulb className="h-3.5 w-3.5" /> 03 · Analogy
              </p>
              <p className="mt-2 text-ink-muted">{result.analogy}</p>
            </Panel>
          )}

          {result.diagram && (
            <Panel>
              <SectionHeader
                eyebrow="04 · Diagram"
                title="Drawn from checked data"
                description="Scientific diagrams are drawn programmatically rather than generated as an image, so the labels and positions stay accurate."
              />
              <DiagramCanvas spec={result.diagram} />
              <div className="mt-5 border-t border-line pt-5">
                <DiagramNotes spec={result.diagram} />
              </div>
            </Panel>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            {result.keyTerms.length > 0 && (
              <Panel>
                <SectionHeader eyebrow="05 · Key terms" title="Vocabulary that scores" />
                <dl className="space-y-3">
                  {result.keyTerms.map((term) => (
                    <div key={term.term}>
                      <dt className="text-sm font-medium text-ink">{term.term}</dt>
                      <dd className="text-sm text-ink-muted">{term.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </Panel>
            )}

            {result.formulae.length > 0 && (
              <Panel>
                <SectionHeader eyebrow="06 · Formulae" title="Equations you need" />
                <ul className="space-y-3">
                  {result.formulae.map((formula) => (
                    <li key={formula.expression}>
                      <p className="font-mono text-sm text-ink">{formula.expression}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{formula.meaning}</p>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>

          {result.workedExample && (
            <Panel>
              <SectionHeader eyebrow="07 · Worked example" title="Method, line by line" />
              <p className="text-sm font-medium text-ink">{result.workedExample.prompt}</p>
              <ol className="mt-3 space-y-1.5">
                {result.workedExample.steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm text-ink-muted">
                    <span className="font-mono text-xs text-ink-faint">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 border-t border-line pt-3 font-mono text-sm text-positive">
                {result.workedExample.answer}
              </p>
            </Panel>
          )}

          {result.commonMistake && (
            <Panel className="border-negative/25">
              <p className="text-xs font-semibold uppercase tracking-wide text-negative">
                08 · Common mistake
              </p>
              <p className="mt-2 text-ink-muted">{result.commonMistake}</p>
            </Panel>
          )}

          {result.examQuestion.stem && (
            <Panel>
              <SectionHeader
                eyebrow="09 · Exam question"
                title={`Worth ${result.examQuestion.marks} mark${result.examQuestion.marks === 1 ? '' : 's'}`}
                description="Written in exam style for practice. This is not a Cambridge past-paper question."
              />
              <p className="text-ink">{result.examQuestion.stem}</p>
              <details className="mt-4 rounded-card border border-line bg-surface-raised/50 p-3">
                <summary className="cursor-pointer text-sm font-medium text-accent">Show mark scheme</summary>
                <ul className="mt-2.5 space-y-1.5">
                  {result.examQuestion.markScheme.map((point, index) => (
                    <li key={index} className="text-sm text-ink-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              </details>
            </Panel>
          )}

          {result.quiz.length > 0 && (
            <Panel>
              <SectionHeader eyebrow="10 · Quick quiz" title="Check you have it" />
              <div className="space-y-5">
                {result.quiz.map((item, questionIndex) => {
                  const chosen = quizAnswers[questionIndex];
                  const answered = chosen !== undefined;

                  return (
                    <div key={questionIndex}>
                      <p className="text-sm font-medium text-ink">{item.stem}</p>
                      <div className="mt-2.5 space-y-1.5">
                        {item.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === item.answerIndex;
                          const isChosen = chosen === optionIndex;
                          return (
                            <button
                              key={optionIndex}
                              type="button"
                              disabled={answered}
                              onClick={() =>
                                setQuizAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                              }
                              className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                                answered && isCorrect
                                  ? 'border-positive bg-positive/10 text-ink'
                                  : answered && isChosen
                                    ? 'border-negative bg-negative/10 text-ink'
                                    : 'border-line text-ink-muted hover:border-accent/40'
                              }`}
                            >
                              {answered && isCorrect && <Check className="h-3.5 w-3.5 shrink-0 text-positive" />}
                              {answered && isChosen && !isCorrect && (
                                <X className="h-3.5 w-3.5 shrink-0 text-negative" />
                              )}
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {answered && <p className="mt-2 text-sm text-ink-muted">{item.why}</p>}
                    </div>
                  );
                })}
              </div>
            </Panel>
          )}

          <Panel className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-ink">Turn this into a lesson</h3>
              <p className="mt-1 text-sm text-ink-muted">
                Generate revision notes and an animated explainer from the same question.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary"
                onClick={() => router.push(`/notes?topic=${encodeURIComponent(result.question)}`)}
              >
                <BookOpen className="h-4 w-4" /> Make notes
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/explainer?topic=${encodeURIComponent(result.question)}`)}
              >
                Create explainer
              </Button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
