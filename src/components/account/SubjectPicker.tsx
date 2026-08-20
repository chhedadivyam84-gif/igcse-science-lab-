'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

import { Button, Notice } from '@/components/ui';
import { ALL_SUBJECTS } from '@/lib/subjects';
import type { SubjectSlug } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Which subjects the student is actually entered for.
 *
 * This only changes what the platform leads with — the dashboard, the study
 * plan and the predicted papers. Every subject stays reachable from the Learn
 * pages, because a student picking up a new subject in March should not have to
 * edit a setting before they can read about it.
 */
export function SubjectPicker({
  initial,
  redirectTo,
  submitLabel = 'Save my subjects',
}: {
  initial: SubjectSlug[];
  /** Where to go after saving. Omit to stay put and just confirm. */
  redirectTo?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [chosen, setChosen] = useState<Set<SubjectSlug>>(new Set(initial));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(slug: SubjectSlug) {
    setSaved(false);
    setChosen((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects: [...chosen] }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? 'Could not save your subjects.');
        return;
      }
      setSaved(true);
      router.refresh();
      if (redirectTo) router.push(redirectTo);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {ALL_SUBJECTS.map(({ slug, display }) => {
          const active = chosen.has(slug);
          return (
            <li key={slug}>
              <button
                type="button"
                onClick={() => toggle(slug)}
                aria-pressed={active}
                className={cn(
                  'flex w-full items-center gap-3 rounded-card border px-4 py-3 text-left transition-all',
                  active
                    ? 'border-accent bg-accent/[0.08] shadow-lift'
                    : 'border-line hover:border-accent/40 hover:bg-surface-raised',
                )}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                    active ? 'border-accent bg-accent text-white' : 'border-line',
                  )}
                >
                  {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0">
                  <span className={cn('block text-sm font-medium', active ? display.textClass : 'text-ink')}>
                    {display.name}
                  </span>
                  <span className="block font-mono text-xs text-ink-faint">{display.code}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {error && (
        <Notice tone="caution" className="mt-4">
          {error}
        </Notice>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={save} disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
        <span className="text-sm text-ink-muted">
          {chosen.size === 0
            ? 'Nothing selected — you will see all seven subjects.'
            : `${chosen.size} subject${chosen.size === 1 ? '' : 's'} selected`}
        </span>
        {saved && !redirectTo && (
          <span className="flex items-center gap-1.5 text-sm text-positive">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-faint">
        This changes what your dashboard, study plan and predicted papers lead with. Every subject
        stays available under Learn, so you can still read anything you like.
      </p>
    </div>
  );
}
