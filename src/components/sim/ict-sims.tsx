'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Input, Slider } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Validation checker                                                         */
/* -------------------------------------------------------------------------- */

type CheckResult = { name: string; description: string; passed: boolean; why: string };

/**
 * Validation against a real field, live.
 *
 * The examinable point that a written explanation struggles to land is that
 * validation cannot catch a wrong-but-plausible value. Typing a valid date that
 * simply is not yours passes every check on screen — which is the whole reason
 * verification exists as a separate idea.
 */
export function ValidationChecker() {
  const [value, setValue] = useState('15');

  const checks: CheckResult[] = [
    {
      name: 'Presence check',
      description: 'The field is not left blank.',
      passed: value.trim().length > 0,
      why: 'A required field must contain something.',
    },
    {
      name: 'Type check',
      description: 'The data is the right kind — digits only for an age.',
      passed: /^\d+$/.test(value.trim()),
      why: 'An age field must not accept letters or symbols.',
    },
    {
      name: 'Range check',
      description: 'The value lies between 11 and 18 inclusive.',
      passed: /^\d+$/.test(value.trim()) && Number(value) >= 11 && Number(value) <= 18,
      why: 'The school only enrols students aged 11 to 18.',
    },
    {
      name: 'Length check',
      description: 'The entry is 1 or 2 characters long.',
      passed: value.trim().length >= 1 && value.trim().length <= 2,
      why: 'No valid age in this range needs more than two digits.',
    },
  ];

  const passedAll = checks.every((c) => c.passed);
  const passedCount = checks.filter((c) => c.passed).length;

  return (
    <SimShell
      title="Validation checker"
      description="Which validation checks a value passes — and what validation still cannot catch."
      stage={
        <div className="p-5">
          <p className="text-xs uppercase tracking-wide text-ink-faint">Student age field</p>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-label="Student age"
            className="mt-2 max-w-xs font-mono"
            placeholder="Type a value"
          />

          <div className="mt-5 space-y-2">
            {checks.map((check) => (
              <div
                key={check.name}
                className={cn(
                  'flex items-start gap-3 rounded-card border px-3.5 py-2.5',
                  check.passed ? 'border-positive/30 bg-positive/[0.06]' : 'border-negative/30 bg-negative/[0.06]',
                )}
              >
                {check.passed ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-negative" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{check.name}</p>
                  <p className="text-xs text-ink-muted">{check.description}</p>
                </div>
              </div>
            ))}
          </div>

          {passedAll && (
            <div className="mt-4 rounded-card border border-caution/30 bg-caution/[0.07] px-3.5 py-2.5">
              <p className="text-sm text-ink">
                Every validation check passes — but the computer still has no idea whether this is
                actually <em>this student&apos;s</em> age. Only verification can tell you that.
              </p>
            </div>
          )}
        </div>
      }
      controls={
        <div className="space-y-2">
          <p className="text-sm text-ink-muted">Try these:</p>
          {['15', '', '9', 'abc', '150', '18'].map((sample) => (
            <button
              key={sample || 'blank'}
              type="button"
              onClick={() => setValue(sample)}
              className="w-full rounded-lg border border-line px-3 py-1.5 text-left font-mono text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              {sample === '' ? '(leave blank)' : sample}
            </button>
          ))}
        </div>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Checks passed" value={`${passedCount} / ${checks.length}`} tone={passedAll ? 'positive' : 'negative'} />
          <Readout label="Accepted by the system" value={passedAll ? 'yes' : 'no'} tone={passedAll ? 'positive' : 'negative'} />
          <Readout label="Verified as correct" value="unknown" tone="negative" />
        </div>
      }
      content={{
        observe:
          'Different values fail different checks. But once a value passes them all, the system accepts it without knowing whether it is true.',
        variables: 'The value typed into the age field.',
        predict: {
          question:
            'A student aged 14 types 17 by mistake. Which check catches the error?',
          options: ['The range check', 'The type check', 'The length check', 'None of them'],
          answerIndex: 3,
          why: '17 is a whole number, it is between 11 and 18, and it is two characters long — so it passes every validation check. Validation only tests whether data is *reasonable*. Catching a reasonable but wrong value needs verification: double entry, or a visual check against the original document.',
        },
        experiment: [
          'Type 15 and confirm every check passes.',
          'Try 9 and 150 and note that only the range check fails — the others cannot tell.',
          'Type abc and see the type check and range check both fail.',
          'Leave the field blank and identify which check exists precisely for that case.',
        ],
        explain: (
          <>
            <p>
              <strong>Validation</strong> is an automatic check by the computer that the data entered
              is <em>reasonable</em> — the right type, within range, present, the right length or the
              right format.
            </p>
            <p>
              <strong>Verification</strong> is a check that the data was entered <em>accurately</em>,
              matching the original source. The two methods are double entry, where the data is typed
              twice and the computer compares the copies, and a visual check, where a person
              proofreads the entry against the original document.
            </p>
            <p>
              The distinction is worth marks in nearly every series, and the reason is exactly what
              this simulation shows: no validation check can tell a correct age from a plausible wrong
              one.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Spreadsheet references                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Relative against absolute references, replicated down a column.
 *
 * Students learn the dollar-sign rule and then still forget it under exam
 * conditions, because they have never watched a formula break. Toggling the
 * absolute reference off and seeing the tax rate walk down the sheet into empty
 * cells is the memorable version.
 */
export function SpreadsheetReferences() {
  const [absolute, setAbsolute] = useState(true);
  const [rows, setRows] = useState(4);

  const prices = [12.5, 8.0, 24.99, 5.25, 40.0, 3.75];
  const quantities = [3, 10, 2, 8, 1, 12];
  const TAX_ROW = 1; // F1 holds the tax rate.
  const taxRate = 0.15;

  const shown = prices.slice(0, rows);

  return (
    <SimShell
      title="Spreadsheet references"
      description="What actually happens to a formula when you replicate it down a column."
      stage={
        <div className="p-5">
          <div className="scroll-x">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr>
                  {['', 'B — price', 'C — qty', 'D — total inc. tax', 'F'].map((h) => (
                    <th key={h} className="border border-line bg-surface-raised px-3 py-1.5 text-left text-xs font-medium text-ink-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((price, i) => {
                  const row = i + TAX_ROW + 1;
                  // A relative reference walks down with the formula; an absolute one does not.
                  const taxCell = absolute ? '$F$1' : `F${TAX_ROW + i}`;
                  const taxRefValid = absolute || TAX_ROW + i === TAX_ROW;
                  const total = taxRefValid ? price * quantities[i] * (1 + taxRate) : price * quantities[i];
                  return (
                    <tr key={i}>
                      <td className="border border-line bg-surface-raised px-3 py-1.5 font-mono text-xs text-ink-faint">{row}</td>
                      <td className="border border-line px-3 py-1.5 font-mono text-xs text-ink">{price.toFixed(2)}</td>
                      <td className="border border-line px-3 py-1.5 font-mono text-xs text-ink">{quantities[i]}</td>
                      <td className={cn('border border-line px-3 py-1.5 font-mono text-xs', taxRefValid ? 'text-ink' : 'text-negative')}>
                        <span className="block text-ink-faint">=B{row}*C{row}*(1+{taxCell})</span>
                        <span className="block">{total.toFixed(2)}{!taxRefValid && ' ← tax lost'}</span>
                      </td>
                      <td className="border border-line px-3 py-1.5 font-mono text-xs text-ink-muted">
                        {TAX_ROW + i === TAX_ROW ? `${taxRate}` : <span className="text-ink-faint">empty</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!absolute && (
            <p className="mt-4 rounded-card border border-negative/30 bg-negative/[0.06] px-3.5 py-2.5 text-sm text-ink">
              Without the dollar signs the tax reference moves down with the formula into empty cells,
              so every row after the first silently loses the tax. The spreadsheet reports no error.
            </p>
          )}
        </div>
      }
      controls={
        <>
          <div>
            <p className="mb-1.5 text-sm text-ink-muted">Tax reference</p>
            <div className="flex gap-1.5">
              {[true, false].map((option) => (
                <button
                  key={String(option)}
                  type="button"
                  onClick={() => setAbsolute(option)}
                  className={cn(
                    'flex-1 rounded-lg border px-2.5 py-1.5 font-mono text-xs transition-colors',
                    absolute === option ? 'border-accent bg-accent/10 text-accent' : 'border-line text-ink-muted hover:border-accent/40',
                  )}
                >
                  {option ? '$F$1' : 'F1'}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Rows replicated" value={rows} min={2} max={6} step={1} onChange={setRows} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Reference type" value={absolute ? 'absolute' : 'relative'} tone={absolute ? 'positive' : 'negative'} />
          <Readout label="Rows calculated correctly" value={absolute ? `${rows} / ${rows}` : `1 / ${rows}`} tone={absolute ? 'positive' : 'negative'} />
          <Readout label="Error reported" value="none" tone="negative" />
        </div>
      }
      content={{
        observe:
          'With $F$1 every row picks up the tax rate. With F1 the reference walks downwards and only the first row is right — and nothing warns you.',
        variables: 'Whether the tax cell is referenced absolutely or relatively, and how many rows you replicate.',
        predict: {
          question: 'The formula =B2*C2*(1+F1) is copied from row 2 to row 5. Which cell does the tax now come from?',
          options: ['F1', 'F4', 'F5', '$F$1'],
          answerIndex: 1,
          why: 'Copying down three rows moves every relative reference down three rows, so F1 becomes F4. B2 and C2 become B5 and C5, which is what you wanted — but F1 was never meant to move, and F4 is empty.',
        },
        experiment: [
          'Start with $F$1 and replicate six rows. Check every total includes the tax.',
          'Switch to F1 and watch the totals below the first row lose the tax silently.',
          'Work out, for row 5, which cell the relative reference has landed on.',
          'Explain why B and C should stay relative even though F must be absolute.',
        ],
        explain: (
          <>
            <p>
              A <strong>relative reference</strong> changes when the formula is copied — it describes a
              cell by where it sits <em>relative to the formula</em>. An{' '}
              <strong>absolute reference</strong>, fixed with dollar signs, always points at the same
              cell no matter where the formula goes.
            </p>
            <p>
              The test to apply to every reference in a formula is simple: <em>when this formula moves
              down a row, should this reference move with it?</em> The price and the quantity are on
              the same row as the formula, so they should. The tax rate lives in one cell for the whole
              sheet, so it must not.
            </p>
            <p>
              What makes this dangerous in practice is that the spreadsheet reports no error. An empty
              cell is treated as zero, so the totals are simply wrong — which is exactly why exam
              questions ask you to write the formula &ldquo;so that it can be replicated&rdquo;.
            </p>
          </>
        ),
      }}
    />
  );
}
