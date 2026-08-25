'use client';

import { useState, type ReactNode } from 'react';
import { Eye, FlaskConical, HelpCircle, MessageSquareText, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Panel } from '@/components/ui';

/**
 * Every simulation follows the same learning cycle, so the structure itself
 * teaches the method: Observe → Change → Predict → Experiment → Explain.
 *
 * The prediction step is deliberately gated — the explanation stays hidden
 * until the student has committed to an answer, because predicting first is
 * what makes a simulation teach rather than entertain.
 */
export type SimContent = {
  observe: string;
  variables: string;
  predict: { question: string; options: string[]; answerIndex: number; why: string };
  experiment: string[];
  explain: ReactNode;
};

export function SimShell({
  title,
  description,
  stage,
  controls,
  readouts,
  content,
}: {
  title: string;
  description: string;
  stage: ReactNode;
  controls: ReactNode;
  readouts?: ReactNode;
  content: SimContent;
}) {
  const [choice, setChoice] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-4">
          <div className="overflow-hidden rounded-panel border border-line bg-surface">{stage}</div>
          {readouts}
        </div>

        <aside className="space-y-4">
          <Panel className="p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Change the variables
            </p>
            <div className="space-y-4">{controls}</div>
          </Panel>

          <Panel className="p-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <Eye className="h-3.5 w-3.5" /> Observe
            </p>
            <p className="text-sm text-ink-muted">{content.observe}</p>
          </Panel>
        </aside>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-caution">
            <HelpCircle className="h-3.5 w-3.5" /> Predict
          </p>
          <p className="text-sm font-medium text-ink">{content.predict.question}</p>
          <div className="mt-3 space-y-1.5">
            {content.predict.options.map((option, index) => {
              const answered = choice !== null;
              const isCorrect = index === content.predict.answerIndex;
              const isChosen = choice === index;
              return (
                <button
                  key={index}
                  type="button"
                  disabled={answered}
                  onClick={() => setChoice(index)}
                  className={cn(
                    'w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                    answered && isCorrect
                      ? 'border-positive bg-positive/10 text-ink'
                      : answered && isChosen
                        ? 'border-negative bg-negative/10 text-ink'
                        : 'border-line text-ink-muted hover:border-accent/40',
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {choice !== null && <p className="mt-3 text-sm text-ink-muted">{content.predict.why}</p>}
        </Panel>

        <Panel>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
            <FlaskConical className="h-3.5 w-3.5" /> Experiment
          </p>
          <ol className="space-y-2">
            {content.experiment.map((step, index) => (
              <li key={index} className="flex gap-2.5 text-sm text-ink-muted">
                <span className="font-mono text-xs text-ink-faint">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-positive">
            <MessageSquareText className="h-3.5 w-3.5" /> Explain
          </p>
          <div className="prose-science">{content.explain}</div>
        </Panel>
      </div>
    </div>
  );
}

/** Consistent numeric readout used across simulations. */
export function Readout({
  label,
  value,
  unit,
  tone = 'accent',
}: {
  label: string;
  value: string | number;
  unit?: string;
  tone?: 'accent' | 'physics' | 'chemistry' | 'positive' | 'negative';
}) {
  const colours = {
    accent: 'text-accent',
    physics: 'text-physics',
    chemistry: 'text-chemistry',
    positive: 'text-positive',
    negative: 'text-negative',
  };
  return (
    <div className="rounded-card border border-line bg-surface px-3.5 py-2.5">
      <p className="text-2xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={cn('mt-0.5 font-mono text-lg font-semibold tabular-nums', colours[tone])}>
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-ink-muted">{unit}</span>}
      </p>
    </div>
  );
}
