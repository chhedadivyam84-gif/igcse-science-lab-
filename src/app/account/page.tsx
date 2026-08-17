import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { isRazorpayConfigured } from '@/lib/billing/razorpay';
import { FEATURES, FEATURE_META, PLAN_META, PRICING, formatPrice } from '@/lib/billing/plans';
import { UpgradeButton } from '@/components/billing/UpgradeButton';
import { CancelSubscription } from '@/components/billing/CancelSubscription';
import { Badge, LinkButton, Notice, Panel, SectionHeader } from '@/components/ui';
import { levelFromXp } from '@/lib/progress';

export const metadata: Metadata = { title: 'Your account' };
export const dynamic = 'force-dynamic';

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const { upgraded } = await searchParams;
  const entitlements = await entitlementsFor(user.id);
  const level = levelFromXp(user.xp);

  const subscription = await db.subscription.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  const planMeta = PLAN_META[entitlements.plan];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <p className="eyebrow">Account</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {user.name}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">{user.email}</p>
      </header>

      {upgraded === '1' && (
        <Notice tone="positive" title="You are on Pro" className="mb-6">
          <span className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
            Payment confirmed — every AI feature is unlocked. Thank you for supporting the platform.
          </span>
        </Notice>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="min-w-0 space-y-6">
          {/* ---- Plan ---------------------------------------------------- */}
          <Panel>
            <SectionHeader
              eyebrow="Subscription"
              title="Your plan"
              action={<Badge tone={planMeta.tone}>{planMeta.label}</Badge>}
            />

            {entitlements.isOwner ? (
              <p className="text-sm text-ink-muted">
                You are the platform owner, so every feature is unlocked without a subscription.
              </p>
            ) : entitlements.plan === 'TRIAL' ? (
              <>
                <p className="text-sm text-ink-muted">
                  You have{' '}
                  <span className="font-medium text-ink">
                    {entitlements.trialDaysLeft} {entitlements.trialDaysLeft === 1 ? 'day' : 'days'}
                  </span>{' '}
                  left of full access, ending{' '}
                  {entitlements.trialEndsAt?.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  . No card is needed until then.
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  After that, everything except the AI features stays free — nothing you have made will
                  be deleted.
                </p>
              </>
            ) : entitlements.plan === 'PRO' ? (
              <>
                <p className="text-sm text-ink-muted">
                  {subscription?.grantedByOwner
                    ? 'Access was granted directly by the owner.'
                    : `${subscription?.interval === 'YEARLY' ? 'Yearly' : 'Monthly'} subscription${
                        subscription ? ` · ${formatPrice(subscription.amountMinor, subscription.currency)}` : ''
                      }`}
                </p>
                {entitlements.renewsAt && (
                  <p className="mt-1 text-sm text-ink-muted">
                    {entitlements.cancelAtPeriodEnd ? 'Access ends' : 'Renews'} on{' '}
                    {entitlements.renewsAt.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
                {entitlements.cancelAtPeriodEnd && (
                  <Notice tone="caution" className="mt-4">
                    Your subscription will not renew. You keep full access until the date above.
                  </Notice>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-ink-muted">
                  Your trial ended on{' '}
                  {entitlements.trialEndsAt?.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  . You still have the full syllabus, every simulation, the calculators, the question
                  bank, exam mode, flashcards and all your progress.
                </p>
                <div className="mt-5">
                  {isRazorpayConfigured() ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      <UpgradeButton interval="MONTHLY">
                        Subscribe — {PRICING.MONTHLY.label}/mo
                      </UpgradeButton>
                      <UpgradeButton interval="YEARLY" variant="secondary">
                        Yearly — {PRICING.YEARLY.label}
                      </UpgradeButton>
                    </div>
                  ) : (
                    <LinkButton href="/pricing" variant="primary">
                      See plans
                    </LinkButton>
                  )}
                </div>
              </>
            )}

            {entitlements.plan === 'PRO' && !subscription?.grantedByOwner && !entitlements.cancelAtPeriodEnd && (
              <div className="mt-6 border-t border-line pt-4">
                <CancelSubscription />
              </div>
            )}
          </Panel>

          {/* ---- What you can use --------------------------------------- */}
          <Panel>
            <SectionHeader eyebrow="Access" title="AI features" />
            <ul className="space-y-2">
              {FEATURES.map((feature) => {
                const allowed = entitlements.can(feature);
                return (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        allowed ? 'bg-positive' : 'bg-ink-faint'
                      }`}
                    />
                    <span className={allowed ? 'text-ink' : 'text-ink-faint'}>
                      {FEATURE_META[feature].label}
                    </span>
                    {allowed ? (
                      <Link
                        href={FEATURE_META[feature].href}
                        className="ml-auto text-xs text-accent hover:underline"
                      >
                        Open
                      </Link>
                    ) : (
                      <span className="ml-auto text-xs text-ink-faint">Pro</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        <aside className="space-y-4">
          <Panel className="p-4">
            <p className="eyebrow mb-3">Study profile</p>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Level</dt>
                <dd className="text-ink">
                  {level.level} · {level.label}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">XP</dt>
                <dd className="font-mono text-ink">{user.xp}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-muted">Streak</dt>
                <dd className="font-mono text-ink">{user.streakDays}</dd>
              </div>
              {user.targetGrade && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Target</dt>
                  <dd className="text-ink">{user.targetGrade}</dd>
                </div>
              )}
              {user.examSeries && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Exams</dt>
                  <dd className="text-ink">{user.examSeries}</dd>
                </div>
              )}
            </dl>
          </Panel>

          <Panel className="p-4">
            <p className="eyebrow mb-2">Links</p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/pricing" className="text-accent hover:underline">
                  Plans and pricing
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-accent hover:underline">
                  Your progress
                </Link>
              </li>
            </ul>
          </Panel>
        </aside>
      </div>
    </div>
  );
}
