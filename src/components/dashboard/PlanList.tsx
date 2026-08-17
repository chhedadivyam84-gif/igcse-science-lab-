'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, RefreshCw } from 'lucide-react';
import { Button, Spinner } from '@/components/ui';
import { cn, pluralise } from '@/lib/utils';
import type { PlanItem } from '@/lib/types';

/** Today's study plan. Ticking an item persists immediately. */
export function PlanList({ initialItems }: { initialItems: PlanItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [busy, setBusy] = useState<string | null>(null);

  async function post(action: 'toggle' | 'regenerate', itemId?: string) {
    setBusy(itemId ?? 'all');
    // Optimistic: the tick responds immediately, then reconciles with the server.
    if (action === 'toggle' && itemId) {
      setItems((current) => current.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)));
    }
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, itemId }),
      });
      if (response.ok) {
        const data = (await response.json()) as { items: PlanItem[] };
        setItems(data.items);
      }
    } finally {
      setBusy(null);
    }
  }

  const totalMinutes = items.reduce((sum, item) => sum + (item.done ? 0 : item.minutes), 0);
  const doneCount = items.filter((item) => item.done).length;

  if (!items.length) {
    return <p className="text-sm text-ink-muted">No plan items — use the app a little and one will appear.</p>;
  }

  return (
    <div>
      <p className="mb-3 text-sm text-ink-muted">
        {doneCount === items.length
          ? 'All done for today. Well played.'
          : `About ${pluralise(totalMinutes, 'minute')} left · ${doneCount}/${items.length} complete`}
      </p>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'flex items-start gap-3 rounded-card border border-line bg-surface p-3 transition-opacity',
              item.done && 'opacity-55',
            )}
          >
            <button
              type="button"
              onClick={() => post('toggle', item.id)}
              aria-pressed={item.done}
              aria-label={item.done ? `Mark "${item.label}" as not done` : `Mark "${item.label}" as done`}
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                item.done ? 'border-positive bg-positive text-white' : 'border-line hover:border-accent',
              )}
            >
              {busy === item.id ? <Spinner className="h-3 w-3" /> : item.done ? <Check className="h-3 w-3" /> : null}
            </button>

            <div className="min-w-0 flex-1">
              <Link
                href={item.href}
                className={cn('block text-sm font-medium text-ink hover:text-accent', item.done && 'line-through')}
              >
                {item.label}
              </Link>
              <p className="mt-0.5 text-xs text-ink-faint">
                {item.minutes} min · {item.reason}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Button
        variant="ghost"
        size="sm"
        className="mt-3 w-full"
        loading={busy === 'all'}
        onClick={() => post('regenerate')}
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Rebuild plan
      </Button>
    </div>
  );
}
