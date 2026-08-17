'use client';

import { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';

/**
 * Scientific-ish calculator for exam mode.
 *
 * Expressions are parsed with shunting-yard and evaluated over a fixed operator
 * table — never `eval`, so nothing typed here can execute arbitrary code.
 */
export function ExamCalculator() {
  const [open, setOpen] = useState(false);
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);

  function evaluate() {
    const value = calculate(expression);
    setHistory((current) =>
      [{ input: expression, output: value === null ? 'not a valid expression' : formatNumber(value) }, ...current].slice(0, 6),
    );
    if (value !== null) setExpression(formatNumber(value));
  }

  if (!open) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Calculator className="h-4 w-4" /> Calculator
      </Button>
    );
  }

  return (
    <div className="w-full max-w-xs rounded-card border border-line bg-surface p-3 shadow-lift">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Calculator</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close calculator" className="text-ink-faint hover:text-ink">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex gap-2">
        <Input
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              evaluate();
            }
          }}
          placeholder="e.g. 0.5*2.4*15^2"
          aria-label="Expression"
          className="font-mono"
        />
        <Button variant="primary" size="sm" onClick={evaluate}>
          =
        </Button>
      </div>

      <div className="mt-2 grid grid-cols-6 gap-1">
        {['7', '8', '9', '/', '(', ')', '4', '5', '6', '*', '^', 'π', '1', '2', '3', '-', '.', 'C', '0', '00', 'e', '+', '√(', '⌫'].map(
          (key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (key === 'C') setExpression('');
                else if (key === '⌫') setExpression((current) => current.slice(0, -1));
                else setExpression((current) => current + key);
              }}
              className="rounded-md border border-line py-1.5 font-mono text-xs text-ink transition-colors hover:bg-surface-raised"
            >
              {key}
            </button>
          ),
        )}
      </div>

      {history.length > 0 && (
        <ul className="mt-2 space-y-0.5 border-t border-line pt-2">
          {history.map((entry, index) => (
            <li key={index} className="truncate font-mono text-2xs text-ink-faint">
              {entry.input} = <span className="text-ink-muted">{entry.output}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return 'undefined';
  const rounded = Number(value.toPrecision(10));
  return String(rounded);
}

const PRECEDENCE: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
const RIGHT_ASSOCIATIVE = new Set(['^']);

/** Returns null for anything that is not a well-formed arithmetic expression. */
export function calculate(input: string): number | null {
  const normalised = input
    .replace(/π/g, String(Math.PI))
    .replace(/(?<![\d.])e(?![\d])/g, String(Math.E))
    .replace(/√\(/g, 'sqrt(')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\s+/g, '');

  if (!normalised) return null;

  const tokens = normalised.match(/(\d+\.?\d*(?:[eE][+-]?\d+)?|sqrt|[()+\-*/^])/g);
  if (!tokens || tokens.join('') !== normalised) return null;

  const output: (number | string)[] = [];
  const operators: string[] = [];
  let previous: string | null = null;

  for (const token of tokens) {
    if (/^\d/.test(token)) {
      output.push(Number(token));
    } else if (token === 'sqrt') {
      operators.push(token);
    } else if (token in PRECEDENCE) {
      // Leading minus, or a minus directly after another operator, is unary.
      if (token === '-' && (previous === null || previous in PRECEDENCE || previous === '(')) {
        output.push(0);
      }
      while (operators.length) {
        const top = operators[operators.length - 1];
        if (top === '(') break;
        const higher = top === 'sqrt' || PRECEDENCE[top] > PRECEDENCE[token];
        const equal = PRECEDENCE[top] === PRECEDENCE[token] && !RIGHT_ASSOCIATIVE.has(token);
        if (higher || equal) output.push(operators.pop()!);
        else break;
      }
      operators.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      let matched = false;
      while (operators.length) {
        const top = operators.pop()!;
        if (top === '(') {
          matched = true;
          break;
        }
        output.push(top);
      }
      if (!matched) return null;
      if (operators[operators.length - 1] === 'sqrt') output.push(operators.pop()!);
    }
    previous = token;
  }

  while (operators.length) {
    const top = operators.pop()!;
    if (top === '(') return null;
    output.push(top);
  }

  const stack: number[] = [];
  for (const item of output) {
    if (typeof item === 'number') {
      stack.push(item);
      continue;
    }
    if (item === 'sqrt') {
      const value = stack.pop();
      if (value === undefined) return null;
      stack.push(Math.sqrt(value));
      continue;
    }
    const b = stack.pop();
    const a = stack.pop();
    if (a === undefined || b === undefined) return null;
    switch (item) {
      case '+': stack.push(a + b); break;
      case '-': stack.push(a - b); break;
      case '*': stack.push(a * b); break;
      case '/': stack.push(a / b); break;
      case '^': stack.push(a ** b); break;
      default: return null;
    }
  }

  return stack.length === 1 && Number.isFinite(stack[0]) ? stack[0] : null;
}
