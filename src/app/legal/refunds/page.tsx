import type { Metadata } from 'next';
import Link from 'next/link';

import { Clause, LegalPage } from '@/components/legal/LegalPage';
import { PRICING, TRIAL_DAYS } from '@/lib/billing/plans';
import { BUSINESS, REFUND_WINDOW_DAYS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Refunds and cancellation',
  description: `Cancel any time, and request a full refund within ${REFUND_WINDOW_DAYS} days of payment.`,
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refunds and cancellation"
      summary={`You can cancel at any time, and you can ask for a full refund within ${REFUND_WINDOW_DAYS} days of any payment.`}
    >
      <Clause heading="1. Try before you pay">
        <p>
          Every new account gets <strong>{TRIAL_DAYS} days of full access</strong> without entering
          a card. The trial is intended to be a genuine trial: it is the whole product, not a
          reduced version of it, so you can decide before any money changes hands.
        </p>
        <p>
          After the trial the free tier continues indefinitely — the syllabus, lessons, simulations,
          calculators, question bank, exam mode, flashcards and progress tracking all remain
          available at no cost. A paid subscription adds the AI features on top.
        </p>
      </Clause>

      <Clause heading="2. Refund window">
        <p>
          If you are not satisfied, email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
            {BUSINESS.email}
          </a>{' '}
          within <strong>{REFUND_WINDOW_DAYS} days</strong> of a payment and we will refund it in
          full. You do not need to give a reason.
        </p>
        <p>
          This applies to each payment separately, including renewals. If a renewal charge takes you
          by surprise, the {REFUND_WINDOW_DAYS}-day window applies to that charge from the date it
          was taken.
        </p>
      </Clause>

      <Clause heading="3. How refunds are paid">
        <p>
          Refunds are issued to the original payment method through our payment processor, Razorpay.
          We start the refund within <strong>3 working days</strong> of accepting your request.
          Banks and card issuers then typically take a further <strong>5 to 10 working days</strong>{' '}
          to credit the money, which is outside our control.
        </p>
        <p>
          We cannot refund to a different card, account or person than the one that paid.
        </p>
      </Clause>

      <Clause heading="4. Cancelling a subscription">
        <p>
          You can cancel whenever you like from your{' '}
          <Link href="/account" className="text-accent hover:underline">
            account page
          </Link>
          . Cancelling stops the next renewal.
        </p>
        <p>
          <strong>You keep Pro access until the end of the period you have already paid for.</strong>{' '}
          Cancelling does not cut you off immediately, and it does not by itself trigger a refund —
          if you also want the last payment back, ask within the {REFUND_WINDOW_DAYS}-day window
          above.
        </p>
      </Clause>

      <Clause heading="5. Outside the refund window">
        <p>
          After {REFUND_WINDOW_DAYS} days we do not generally refund a payment, because the free
          trial and the permanent free tier exist precisely so that nobody has to pay to find out
          whether the product suits them.
        </p>
        <p>
          We will still consider a refund where a charge was clearly wrong — a duplicate payment, a
          charge after you cancelled, or a period during which the service was substantially
          unavailable. Write to us and explain; we would rather fix a genuine mistake than argue
          about it.
        </p>
      </Clause>

      <Clause heading="6. Prices">
        <p>
          Pro costs {PRICING.MONTHLY.label} {PRICING.MONTHLY.per} or {PRICING.YEARLY.label}{' '}
          {PRICING.YEARLY.per}, in Indian rupees, inclusive of any applicable taxes. If we change the
          price, the new price applies from your next renewal and never to a period you have already
          paid for.
        </p>
      </Clause>

      <Clause heading="7. Contacting us about a payment">
        <p>
          Email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
            {BUSINESS.email}
          </a>{' '}
          with the email address on the account and the approximate date of the charge. Full contact
          details are on the{' '}
          <Link href="/legal/contact" className="text-accent hover:underline">
            contact page
          </Link>
          .
        </p>
        <p>
          Please contact us before raising a dispute with your bank. A chargeback takes weeks and
          usually locks the account while it is investigated; an email is normally settled in days.
        </p>
      </Clause>
    </LegalPage>
  );
}
