import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Minus, Sparkles } from 'lucide-react';

import { getSessionUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { isRazorpayConfigured, isTestMode } from '@/lib/billing/razorpay';
import { FEATURE_META, FEATURES, FREE_FOREVER, PRICING, TRIAL_DAYS } from '@/lib/billing/plans';
import { UpgradeButton } from '@/components/billing/UpgradeButton';
import { Badge, LinkButton, Notice, Panel } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One month of everything, free. Then keep the whole syllabus, simulations and practice free forever — or add the AI tutor for ₹99 a month.',
};
export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const session = await getSessionUser();
  const entitlements = session ? await entitlementsFor(session.id) : null;
  const paymentsReady = isRazorpayConfigured();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h1 className="font-display mt-3 text-balance text-5xl leading-[1.02] text-ink sm:text-6xl">
            Start with everything, free for a month.
          </h1>
          <p className="mt-4 text-pretty text-ink-muted">
            No card needed to begin. After {TRIAL_DAYS} days the syllabus, simulations, calculators and
            the full question bank stay free — for good. Pro keeps the AI features switched on.
          </p>
        </header>
      </Reveal>

      {entitlements?.plan === 'TRIAL' && (
        <Reveal delay={0.05}>
          <div className="mx-auto mt-8 max-w-md text-center">
            <Badge tone="accent">
              {entitlements.trialDaysLeft} {entitlements.trialDaysLeft === 1 ? 'day' : 'days'} left in
              your trial
            </Badge>
          </div>
        </Reveal>
      )}

      {entitlements?.plan === 'PRO' && (
        <Reveal delay={0.05}>
          <div className="mx-auto mt-8 max-w-lg">
            <Notice tone="positive" title="You are on Pro">
              Everything is unlocked.{' '}
              <Link href="/account" className="text-accent hover:underline">
                Manage your subscription
              </Link>
            </Notice>
          </div>
        </Reveal>
      )}

      {/* ---- Plans -------------------------------------------------------- */}
      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Reveal delay={0.08}>
          <Panel className="flex h-full flex-col">
            <div>
              <h2 className="text-xl font-semibold text-ink">Free</h2>
              <p className="mt-1 text-sm text-ink-muted">Everything the platform already knows.</p>
              <p className="mt-5 text-4xl font-semibold text-ink">
                ₹0<span className="ml-1 text-base font-normal text-ink-muted">forever</span>
              </p>
            </div>

            <ul className="mt-6 flex-1 space-y-2.5">
              {FREE_FOREVER.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                  {item}
                </li>
              ))}
              <li className="flex gap-2.5 text-sm text-ink-faint">
                <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                No AI tutor, notes, diagrams or explainers after the trial
              </li>
            </ul>

            <LinkButton
              href={session ? '/learn' : '/signup'}
              variant="secondary"
              size="lg"
              className="mt-6 w-full"
            >
              {session ? 'Keep studying' : `Start free — ${TRIAL_DAYS} days of everything`}
            </LinkButton>
          </Panel>
        </Reveal>

        <Reveal delay={0.12}>
          <Panel className="relative flex h-full flex-col border-accent/40">
            <div
              className="pointer-events-none absolute inset-0 rounded-panel bg-gradient-to-br from-accent/10 via-transparent to-chemistry/10"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-ink">Pro</h2>
                <Badge tone="accent">
                  <Sparkles className="h-3 w-3" /> AI included
                </Badge>
              </div>
              <p className="mt-1 text-sm text-ink-muted">Everything in Free, plus the AI that teaches.</p>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
                <span className="text-4xl font-semibold text-ink">{PRICING.MONTHLY.label}</span>
                <span className="text-base text-ink-muted">{PRICING.MONTHLY.per}</span>
              </div>
              <p className="mt-1 text-sm text-ink-muted">
                or <span className="font-medium text-ink">{PRICING.YEARLY.label}</span>{' '}
                {PRICING.YEARLY.per} — {PRICING.YEARLY.note?.toLowerCase()}
              </p>
            </div>

            <ul className="relative mt-6 flex-1 space-y-2.5">
              <li className="flex gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="font-medium">Everything in Free</span>
              </li>
              {FEATURES.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    <span className="text-ink">{FEATURE_META[feature].label}</span> —{' '}
                    {FEATURE_META[feature].blurb}
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative mt-6 space-y-2">
              {paymentsReady ? (
                <>
                  <UpgradeButton interval="MONTHLY">Subscribe — {PRICING.MONTHLY.label}/month</UpgradeButton>
                  <UpgradeButton interval="YEARLY" variant="secondary">
                    Pay yearly — {PRICING.YEARLY.label}
                  </UpgradeButton>
                </>
              ) : (
                <Notice tone="caution" title="Payments not connected yet">
                  Add your Razorpay keys to <code className="formula">.env</code> to accept
                  subscriptions. Until then the owner can grant access to individual accounts from the
                  owner console.
                </Notice>
              )}
              <p className="text-center text-xs text-ink-faint">
                Cancel any time — you keep access until the end of the period you paid for.
              </p>
            </div>
          </Panel>
        </Reveal>
      </div>

      {isTestMode() && (
        <Notice tone="caution" className="mx-auto mt-8 max-w-2xl">
          Razorpay is in <strong>test mode</strong>. Payments will not be charged. Swap in your live
          keys when you are ready to take real money.
        </Notice>
      )}

      {/* ---- Questions ---------------------------------------------------- */}
      <Reveal delay={0.1}>
        <section className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-xl font-semibold text-ink">Questions</h2>
          <dl className="mt-5 space-y-5">
            {[
              {
                q: 'What happens when my trial ends?',
                a: `Nothing is deleted. You keep your notes, progress, mistakes and flashcards, and you keep using the syllabus, simulations, calculators, question bank and exam mode. Only the AI features stop.`,
              },
              {
                q: 'Why are the AI features the paid ones?',
                a: 'They are the parts that cost money every time you use them. Charging for those, rather than for the content, keeps the platform genuinely useful for students who cannot pay.',
              },
              {
                q: 'Do I need a card to start?',
                a: `No. The ${TRIAL_DAYS}-day trial begins as soon as you create an account, with no payment details.`,
              },
              {
                q: 'Can I cancel?',
                a: 'Yes, from your account page. Cancelling stops the renewal — you keep full access until the end of the period you have already paid for.',
              },
              {
                q: 'Is this an official Cambridge product?',
                a: 'No. It is an independent study tool built around the 0625 and 0620 specifications, and it is not endorsed by or affiliated with Cambridge Assessment International Education.',
              },
            ].map((item) => (
              <div key={item.q}>
                <dt className="font-medium text-ink">{item.q}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      {/* Anyone about to pay should be one click from the refund terms. */}
      <Reveal delay={0.05}>
        {/* Padded for thumbs — these sit directly under the payment buttons,
            so they are the last thing someone taps before deciding to pay. */}
        <nav className="mt-14 flex flex-wrap justify-center gap-x-2 border-t border-line pt-4 text-xs text-ink-faint">
          <Link href="/legal/terms" className="rounded px-2 py-2.5 hover:text-ink">
            Terms
          </Link>
          <Link href="/legal/privacy" className="rounded px-2 py-2.5 hover:text-ink">
            Privacy
          </Link>
          <Link href="/legal/refunds" className="rounded px-2 py-2.5 hover:text-ink">
            Refunds &amp; cancellation
          </Link>
          <Link href="/legal/contact" className="rounded px-2 py-2.5 hover:text-ink">
            Contact
          </Link>
        </nav>
      </Reveal>
    </div>
  );
}
