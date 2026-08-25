'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, HelpCircle } from 'lucide-react';

import { Badge, Button, Input, Label, Notice, Panel, SectionHeader, Select } from '@/components/ui';
import { PREFIXES, SOLVERS, solve, type SolverEntry } from '@/lib/solver';
import { cn } from '@/lib/utils';

/**
 * Known values → choose the unknown → substitution → answer → unit → explanation.
 *
 * Prefixes are applied explicitly rather than guessed, so a student sees the
 * conversion happen instead of it being silently absorbed.
 */
export function PhysicsCalculator() {
  const [key, setKey] = useState(SOLVERS[0].key);
  const entry = useMemo(() => SOLVERS.find((s) => s.key === key) ?? SOLVERS[0], [key]);

  const [target, setTarget] = useState(entry.variables[0].symbol);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [prefixes, setPrefixes] = useState<Record<string, number>>({});
  const [showWhy, setShowWhy] = useState(false);

  function pickEquation(nextKey: string) {
    const next = SOLVERS.find((s) => s.key === nextKey) ?? SOLVERS[0];
    setKey(nextKey);
    setTarget(next.variables[0].symbol);
    setInputs({});
    setPrefixes({});
    setShowWhy(false);
  }

  const known: Record<string, number> = {};
  const blank: string[] = [];
  for (const variable of entry.variables) {
    if (variable.symbol === target) continue;
    const raw = inputs[variable.symbol];
    const parsed = raw === undefined || raw.trim() === '' ? NaN : Number(raw);
    if (Number.isFinite(parsed)) {
      known[variable.symbol] = parsed * (prefixes[variable.symbol] ?? 1);
    } else {
      blank.push(variable.symbol);
    }
  }

  const result = blank.length === 0 ? solve(entry, known, target) : null;
  const targetVariable = entry.variables.find((v) => v.symbol === target);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[19rem_1fr]">
      <div className="space-y-4">
        <Panel className="p-4">
          <Label htmlFor="equation">Equation</Label>
          <Select id="equation" value={key} onChange={(event) => pickEquation(event.target.value)}>
            {SOLVERS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.name} — {option.expression}
              </option>
            ))}
          </Select>

          <div className="mt-4">
            <Label htmlFor="target">Solve for</Label>
            <Select
              id="target"
              value={target}
              onChange={(event) => {
                setTarget(event.target.value);
                setShowWhy(false);
              }}
            >
              {entry.variables.map((variable) => (
                <option key={variable.symbol} value={variable.symbol}>
                  {variable.symbol} — {variable.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-5 space-y-3.5">
            <p className="eyebrow">Known values</p>
            {entry.variables
              .filter((variable) => variable.symbol !== target)
              .map((variable) => (
                <div key={variable.symbol}>
                  <Label htmlFor={`v-${variable.symbol}`} hint={variable.unit || undefined}>
                    {variable.symbol} — {variable.label}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id={`v-${variable.symbol}`}
                      inputMode="decimal"
                      value={inputs[variable.symbol] ?? ''}
                      onChange={(event) =>
                        setInputs((current) => ({ ...current, [variable.symbol]: event.target.value }))
                      }
                      placeholder="0"
                      className="flex-1"
                    />
                    <Select
                      aria-label={`Prefix for ${variable.label}`}
                      value={prefixes[variable.symbol] ?? 1}
                      onChange={(event) =>
                        setPrefixes((current) => ({ ...current, [variable.symbol]: Number(event.target.value) }))
                      }
                      className="w-24"
                    >
                      {PREFIXES.map((prefix) => (
                        <option key={prefix.label} value={prefix.factor}>
                          {prefix.symbol || '—'}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              ))}
          </div>

          {entry.note && (
            <p className="mt-4 border-t border-line pt-3 text-xs text-ink-muted">{entry.note}</p>
          )}
        </Panel>
      </div>

      <div className="min-w-0 space-y-4">
        <Panel>
          <SectionHeader
            eyebrow="Working"
            title={entry.name}
            action={<Badge tone="physics">{entry.expression}</Badge>}
          />

          {!result ? (
            <div className="rounded-card border border-dashed border-line px-4 py-10 text-center">
              <Calculator className="mx-auto h-6 w-6 text-ink-faint" />
              <p className="mt-3 text-sm text-ink-muted">
                {blank.length
                  ? `Enter a value for ${blank.join(', ')} to calculate ${target}.`
                  : `That combination cannot be solved for ${target}.`}
              </p>
            </div>
          ) : (
            <>
              <ol className="space-y-2.5">
                {result.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-0.5 w-16 shrink-0 text-2xs uppercase tracking-wide text-ink-faint">
                      {['Formula', 'Rearrange', 'Substitute', 'Answer'][Math.min(index, 3)]}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-sm',
                        index === result.steps.length - 1 ? 'font-semibold text-positive' : 'text-ink',
                      )}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 rounded-card border border-accent/25 bg-accent/[0.06] p-4">
                <p className="text-2xs uppercase tracking-wide text-accent">Final answer</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-ink">
                  {result.formatted}
                  {result.unit && <span className="ml-2 text-base font-normal text-ink-muted">{result.unit}</span>}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Given to 3 significant figures. In the exam, match the significant figures of the data
                  you were given.
                </p>
              </div>

              {result.warnings.map((warning) => (
                <Notice key={warning} tone="caution" className="mt-3">
                  <span className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {warning}
                  </span>
                </Notice>
              ))}

              <Button variant="secondary" size="sm" className="mt-4" onClick={() => setShowWhy((s) => !s)}>
                <HelpCircle className="h-3.5 w-3.5" /> {showWhy ? 'Hide' : 'Why?'}
              </Button>

              {showWhy && targetVariable && (
                <div className="prose-science mt-4 border-t border-line pt-4">
                  <p>
                    You are finding <strong>{targetVariable.label.toLowerCase()}</strong>, measured in{' '}
                    <strong>{targetVariable.unit || 'no units'}</strong>.
                  </p>
                  <p>
                    The equation <code className="formula">{entry.expression}</code> was rearranged to make{' '}
                    <code className="formula">{target}</code> the subject, then the known values were
                    substituted in.
                  </p>
                  <p>
                    In an exam, write these lines out separately. The formula line and the substitution
                    line each carry a method mark, so you still score them even if the arithmetic goes
                    wrong.
                  </p>
                  {entry.note && <p>{entry.note}</p>}
                </div>
              )}
            </>
          )}
        </Panel>

        <Panel className="p-4">
          <p className="eyebrow mb-2.5">Unit reminder</p>
          <div className="scroll-x">
            <table className="w-full min-w-[22rem] text-sm">
              <tbody>
                {entry.variables.map((variable) => (
                  <tr key={variable.symbol} className="border-b border-line/60 last:border-0">
                    <td className="py-1.5 pr-3 font-mono text-ink">{variable.symbol}</td>
                    <td className="py-1.5 pr-3 text-ink-muted">{variable.label}</td>
                    <td className="py-1.5 text-right font-mono text-ink-faint">{variable.unit || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
