import type { Metadata } from 'next';
import Link from 'next/link';

import { Clause, LegalPage } from '@/components/legal/LegalPage';
import { PRICING, TRIAL_DAYS } from '@/lib/billing/plans';
import { BUSINESS, REFUND_WINDOW_DAYS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms of service',
  description:
    'The agreement between you and IGCSE Science Lab: what you get, what it costs, and what it is not.',
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      summary="The agreement between you and us. Written to be read, not to be impenetrable."
    >
      <Clause heading="1. Who this is between">
        <p>
          These terms are between you and {BUSINESS.legalName}, who operates{' '}
          {BUSINESS.productName}. By creating an account you agree to them. If you do not, please do
          not use the service.
        </p>
        <p>
          If you are under 18, you need a parent or guardian&rsquo;s permission to have an account,
          and they must be the one to agree to these terms and to make any payment.
        </p>
      </Clause>

      <Clause heading="2. What this service is — and is not">
        <p>
          {BUSINESS.productName} is an <strong>independent study tool</strong> built around the
          Cambridge IGCSE Physics 0625 and Chemistry 0620 specifications.
        </p>
        <p>
          <strong>
            We are not affiliated with, endorsed by, or connected to Cambridge Assessment
            International Education.
          </strong>{' '}
          The syllabus codes are used only to identify which specifications the material is designed
          around. Nothing here is official Cambridge material, and no question in this product is a
          past paper question. Always check the official syllabus published by Cambridge for
          authoritative requirements.
        </p>
      </Clause>

      <Clause heading="3. No guarantee about accuracy or results">
        <p>
          Teaching material is written carefully and reviewed, but it may still contain errors. The
          AI features generate explanations on demand and{' '}
          <strong>can be confidently wrong</strong>. Treat AI output as a study aid to be checked,
          never as an authority.
        </p>
        <p>
          <strong>We do not guarantee any examination grade or outcome.</strong> Anyone promising you
          a grade in exchange for a subscription is selling you something they cannot deliver. Your
          results depend on your own work.
        </p>
        <p>
          Do not rely on this service for anything where being wrong carries real consequences,
          including laboratory safety decisions.
        </p>
      </Clause>

      <Clause heading="4. Your account">
        <p>
          Keep your password to yourself and your account details accurate. You are responsible for
          what happens under your account. Tell us promptly if you think someone else has access to
          it.
        </p>
        <p>
          One account is for one person. Sharing a paid account with others, or reselling access, is
          not permitted.
        </p>
      </Clause>

      <Clause heading="5. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>copy, scrape or redistribute the teaching material or question bank;</li>
          <li>
            resell, sublicense or present the service as your own, including to a school or tuition
            centre without our written agreement;
          </li>
          <li>attempt to break, overload, or gain unauthorised access to any part of the system;</li>
          <li>
            use the AI features to generate content that is unlawful, abusive, or unrelated to
            studying science;
          </li>
          <li>upload photographs of other people without their agreement.</li>
        </ul>
        <p>
          We may suspend or close an account that breaks these rules. Where it is fair to do so, we
          will warn you first.
        </p>
      </Clause>

      <Clause heading="6. Free trial, free tier and payment">
        <p>
          New accounts get {TRIAL_DAYS} days of full access without a card. After that, the free tier
          continues indefinitely and includes the syllabus, lessons, simulations, calculators,
          question bank, exam mode, flashcards and progress tracking.
        </p>
        <p>
          Pro adds the AI features for {PRICING.MONTHLY.label} {PRICING.MONTHLY.per} or{' '}
          {PRICING.YEARLY.label} {PRICING.YEARLY.per}. Subscriptions renew automatically until
          cancelled. You may cancel at any time and keep access to the end of the period you paid
          for.
        </p>
        <p>
          Refunds are covered by the{' '}
          <Link href="/legal/refunds" className="text-accent hover:underline">
            refunds and cancellation policy
          </Link>{' '}
          — in short, {REFUND_WINDOW_DAYS} days, no reason needed.
        </p>
      </Clause>

      <Clause heading="7. Fair use of the AI features">
        <p>
          AI requests cost us money for each use, so Pro is subject to reasonable per-minute and
          per-day limits to prevent automated abuse. These limits are set well above normal studying
          and you are unlikely to meet them by revising hard.
        </p>
      </Clause>

      <Clause heading="8. Who owns what">
        <p>
          We own the platform, the written lessons, the authored question bank and the design. You
          get a personal, non-transferable right to use them for your own study while your account is
          active.
        </p>
        <p>
          <strong>Your notes and your work remain yours.</strong> We store them to provide the
          service and we do not claim ownership of them.
        </p>
      </Clause>

      <Clause heading="9. Availability">
        <p>
          We aim to keep the service running but do not promise uninterrupted availability. It may be
          unavailable for maintenance, or because a third party we depend on fails. Features may
          change or be withdrawn as the product develops.
        </p>
        <p>
          If we withdraw a paid feature permanently and you are mid-subscription, contact us and we
          will refund the unused part.
        </p>
      </Clause>

      <Clause heading="10. Liability">
        <p>
          Nothing in these terms limits liability for fraud, death or personal injury caused by
          negligence, or anything else that cannot lawfully be excluded.
        </p>
        <p>
          Otherwise, and to the extent the law allows, our total liability to you is limited to the
          amount you paid us in the twelve months before the claim. We are not liable for examination
          results, lost study time, or indirect losses.
        </p>
      </Clause>

      <Clause heading="11. Ending the agreement">
        <p>
          You can stop using the service and delete your account whenever you like. We may end the
          agreement if you seriously or repeatedly break these terms, and we will refund any unused
          paid period unless the breach was deliberate.
        </p>
      </Clause>

      <Clause heading="12. Changes to these terms">
        <p>
          We may update these terms. The date at the top shows when they last changed, and we will
          email account holders about material changes rather than expecting you to check. If you do
          not accept a change, you may cancel and request a refund of the unused period.
        </p>
      </Clause>

      <Clause heading="13. Governing law">
        <p>
          These terms are governed by the laws of India, and the courts of {BUSINESS.jurisdiction}{' '}
          have jurisdiction over any dispute.
        </p>
        <p>
          Please write to us before starting any formal proceedings — most problems are quicker to
          fix by email.
        </p>
      </Clause>
    </LegalPage>
  );
}
