'use client';

import Link from 'next/link';
import { Lock, Sparkles } from 'lucide-react';
import { Badge, LinkButton, Panel } from '@/components/ui';
import { FEATURE_META, PRICING, type Feature } from '@/lib/billing/plans';

/**
 * Shown when a free-tier student reaches a paid feature.
 *
 * Written to be useful rather than punitive: it names what they still have,
 * because the free tier is genuinely substantial and a student who feels
 * cheated does not subscribe.
 */
export function Paywall({ feature }: { feature: Feature }) {
  const meta = FEATURE_META[feature];

  return (
    <Panel className="border-accent/30">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/12">
          <Lock className="h-5 w-5 text-accent" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink">{meta.label} is part of Pro</h2>
            <Badge tone="accent">Your trial has ended</Badge>
          </div>

          <p className="mt-2 text-sm text-ink-muted">
            {meta.blurb}. The AI features are what a subscription pays for — everything else on the
            platform stays free, and nothing you have already made has been taken away.
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-2xl font-semibold text-ink">{PRICING.MONTHLY.label}</span>
            <span className="text-sm text-ink-muted">{PRICING.MONTHLY.per}</span>
            <span className="text-sm text-ink-faint">
              · or {PRICING.YEARLY.label} {PRICING.YEARLY.per}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <LinkButton href="/pricing" variant="primary">
              <Sparkles className="h-4 w-4" /> See what Pro includes
            </LinkButton>
            <LinkButton href="/learn" variant="secondary">
              Keep studying for free
            </LinkButton>
          </div>

          <p className="mt-4 text-xs text-ink-faint">
            Still free: the whole syllabus, every lesson and simulation, the calculators, the periodic
            table, the full question bank, exam mode, flashcards and your progress.{' '}
            <Link href="/pricing" className="text-accent hover:underline">
              Compare the plans
            </Link>
          </p>
        </div>
      </div>
    </Panel>
  );
}

/** Slim banner shown during the trial so the deadline is never a surprise. */
export function TrialBanner({ daysLeft }: { daysLeft: number }) {
  if (daysLeft <= 0) return null;

  const urgent = daysLeft <= 7;

  return (
    <div
      className={`mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-card border px-4 py-3 ${
        urgent ? 'border-caution/40 bg-caution/[0.07]' : 'border-accent/25 bg-accent/[0.05]'
      }`}
    >
      <Sparkles className={`h-4 w-4 shrink-0 ${urgent ? 'text-caution' : 'text-accent'}`} />
      <p className="text-sm text-ink">
        <span className="font-medium">
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
        </span>{' '}
        of your free trial — you have full access to every AI feature.
      </p>
      <Link href="/pricing" className="ml-auto text-sm font-medium text-accent hover:underline">
        View plans
      </Link>
    </div>
  );
}
