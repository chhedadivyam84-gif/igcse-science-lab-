'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * The characters a science answer needs and a keyboard does not have.
 *
 * Without this a student cannot write m/s², 10⁻³ or Δ at all. They type "m/s2"
 * and hope, or give up and write something the marker rejects. The marker now
 * accepts the typed forms too (src/lib/marking.ts), but being able to write the
 * answer properly is the point — the exam is written in these symbols.
 *
 * Grouped rather than one long strip, because a student hunting for ⇌ should
 * not have to read past twenty superscripts to find it.
 */
const GROUPS: { label: string; symbols: string[] }[] = [
  {
    label: 'Powers',
    symbols: ['²', '³', '⁻', '¹', '⁴', '⁰', '×10', '^'],
  },
  {
    label: 'Maths',
    symbols: ['×', '÷', '±', '√', 'π', '≈', '≤', '≥', '≠', '°', '∴'],
  },
  {
    label: 'Science',
    symbols: ['Δ', 'λ', 'μ', 'Ω', 'ρ', 'θ', '⇌', '→', '⁺', '⁻', '∝'],
  },
];

export function SymbolPad({
  onInsert,
  className,
}: {
  /** Called with the character to insert at the cursor. */
  onInsert: (symbol: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('rounded-card border border-line bg-surface-raised/40', className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-3 py-2 text-xs text-ink-muted transition-colors hover:text-ink"
      >
        <span>
          Symbols — <span className="font-mono">²</span> <span className="font-mono">³</span>{' '}
          <span className="font-mono">×10</span> <span className="font-mono">Δ</span>
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="space-y-2.5 border-t border-line px-3 py-2.5">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 text-2xs uppercase tracking-wide text-ink-faint">{group.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.symbols.map((symbol, index) => (
                  <button
                    // ⁻ appears in two groups, so the index keeps keys unique.
                    key={`${symbol}-${index}`}
                    type="button"
                    onClick={() => onInsert(symbol)}
                    aria-label={`Insert ${symbol}`}
                    className="min-w-9 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-sm text-ink transition-colors hover:border-accent/50 hover:bg-accent/[0.08] hover:text-accent"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Inserts text at the cursor of a textarea or input, keeping the caret after it.
 *
 * Appending to the end would be maddening halfway through typing an answer, and
 * setting `.value` directly does not tell React, so the change is dispatched
 * through the element's own setter.
 */
export function insertAtCursor(
  element: HTMLTextAreaElement | HTMLInputElement | null,
  symbol: string,
  onChange: (next: string) => void,
) {
  if (!element) return;
  const start = element.selectionStart ?? element.value.length;
  const end = element.selectionEnd ?? start;
  const next = element.value.slice(0, start) + symbol + element.value.slice(end);

  onChange(next);

  // Restore the caret after React has re-rendered with the new value.
  requestAnimationFrame(() => {
    element.focus();
    const caret = start + symbol.length;
    element.setSelectionRange(caret, caret);
  });
}
