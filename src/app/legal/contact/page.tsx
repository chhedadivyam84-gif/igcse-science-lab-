import type { Metadata } from 'next';
import Link from 'next/link';

import { Clause, LegalPage } from '@/components/legal/LegalPage';
import { BUSINESS, PENDING, REFUND_WINDOW_DAYS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'How to reach IGCSE Science Lab about your account, a payment, or your data.',
};

/** Renders a detail, or an honest gap — never an invented value. */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <strong>{label}:</strong>{' '}
      {value === PENDING ? (
        <span className="text-caution">not published yet — please email us</span>
      ) : (
        value
      )}
    </p>
  );
}

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact us"
      summary="A real person reads these. Email is the fastest way to reach us."
    >
      <Clause heading="Operator">
        <Detail label="Business name" value={BUSINESS.legalName} />
        <Detail label="Address" value={BUSINESS.address} />
        <Detail label="Phone" value={BUSINESS.phone} />
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
            {BUSINESS.email}
          </a>
        </p>
      </Clause>

      <Clause heading="What to write to us about">
        <p>
          <strong>Payments and refunds.</strong> Include the email address on the account and roughly
          when the charge was taken. Refund terms are on the{' '}
          <Link href="/legal/refunds" className="text-accent hover:underline">
            refunds page
          </Link>{' '}
          — {REFUND_WINDOW_DAYS} days, no reason required.
        </p>
        <p>
          <strong>Your data.</strong> Ask for a copy, a correction, or deletion of your account. Write
          from the address on the account so we know it is you.
        </p>
        <p>
          <strong>Mistakes in the material.</strong> If a lesson, answer or mark scheme looks wrong,
          please tell us — include the topic and what you think is incorrect. Corrections are
          genuinely welcome.
        </p>
        <p>
          <strong>Parents and guardians.</strong> You may contact us about your child&rsquo;s account
          at any time, including to have it deleted.
        </p>
      </Clause>

      <Clause heading="Response times">
        <p>
          We aim to reply within <strong>2 working days</strong>, and to data requests within{' '}
          <strong>30 days</strong>. This is a small operation, not a call centre, so please allow a
          little patience — but do chase us if you have heard nothing.
        </p>
      </Clause>

      <Clause heading="Before you dispute a charge">
        <p>
          If something has gone wrong with a payment, please email us first. A chargeback typically
          takes several weeks and locks the account while the bank investigates, whereas we can
          usually refund within days.
        </p>
      </Clause>
    </LegalPage>
  );
}
