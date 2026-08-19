import type { Metadata } from 'next';
import Link from 'next/link';

import { Clause, LegalPage } from '@/components/legal/LegalPage';
import { BUSINESS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'What IGCSE Science Lab stores, who it is shared with, and how to get a copy or have it deleted.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      summary="What we store, who we share it with, and how to get it back or have it deleted."
    >
      <Clause heading="1. Who we are">
        <p>
          {BUSINESS.productName} is operated by {BUSINESS.legalName}. We decide what is collected and
          why, which makes us the data fiduciary for your information. Contact details are on the{' '}
          <Link href="/legal/contact" className="text-accent hover:underline">
            contact page
          </Link>
          .
        </p>
      </Clause>

      <Clause heading="2. What we collect">
        <p>
          <strong>Account details.</strong> Your name, email address and password. The password is
          stored only as a bcrypt hash — we cannot read it, and neither can anyone who obtains a copy
          of the database.
        </p>
        <p>
          <strong>Study data.</strong> Your answers to practice questions, flashcard reviews,
          progress and streaks, mistakes, study sessions and daily plans, and optional preferences
          such as your target grade and exam series.
        </p>
        <p>
          <strong>Things you create.</strong> Notes, generated diagrams and explainers, and your
          conversations with the AI tutor, including any photograph you upload to the photo-help
          feature.
        </p>
        <p>
          <strong>Payment records.</strong> If you subscribe, we store the subscription identifier,
          status, amount and renewal date. <strong>We never see or store your card details</strong> —
          those go directly to our payment processor.
        </p>
      </Clause>

      <Clause heading="3. Why we collect it">
        <p>
          To give you an account and keep you signed in; to show your progress and adapt practice to
          your weak areas; to answer your questions through the AI features; to take payment and give
          you the access you paid for; and to keep the service running and secure.
        </p>
        <p>
          We do not sell your data. We do not use it for advertising. We do not build profiles of you
          for anyone else&rsquo;s benefit.
        </p>
      </Clause>

      <Clause heading="4. Who else sees it">
        <p>These companies process data on our behalf, and only for the purposes below.</p>
        <p>
          <strong>Google.</strong> When you use an AI feature, the text of your question — and, for
          photo help, the image you upload — is sent to Google&rsquo;s Gemini API to generate a
          reply. Do not upload anything you would not want processed by a third party. Avoid
          photographing anything that identifies you or someone else.
        </p>
        <p>
          <strong>Razorpay.</strong> Handles payments and holds the card details we never receive.
        </p>
        <p>
          <strong>Render and Neon.</strong> Host the application and the database respectively.
        </p>
        <p>
          Some of these providers operate servers outside India, so your data may be processed
          abroad. We otherwise disclose data only where the law requires it.
        </p>
      </Clause>

      <Clause heading="5. Students under 18">
        <p>
          This is a study tool for an examination normally taken at around 14 to 16 years old, so we
          expect many users to be minors.
        </p>
        <p>
          <strong>
            If you are under 18, please ask a parent or guardian before creating an account, and
            before making any payment.
          </strong>{' '}
          A parent or guardian may contact us at any time to see what we hold about their child, to
          correct it, or to have the account and its data deleted.
        </p>
        <p>
          We do not knowingly use children&rsquo;s data for advertising, tracking or profiling, and
          we do not sell it.
        </p>
      </Clause>

      <Clause heading="6. How long we keep it">
        <p>
          We keep your account and study data for as long as the account exists, because that history
          is the product — your progress would be meaningless if we discarded it.
        </p>
        <p>
          If you delete your account we remove your personal data, except records we must retain for
          tax and accounting purposes, such as proof that a payment was made and refunded. Those are
          kept for as long as Indian law requires and are not used for anything else.
        </p>
      </Clause>

      <Clause heading="7. Your rights">
        <p>
          You can ask us to give you a copy of your data, correct anything wrong, or delete your
          account entirely. Email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
            {BUSINESS.email}
          </a>{' '}
          from the address on the account and we will respond within 30 days.
        </p>
        <p>
          You may also withdraw consent or complain to the relevant data protection authority if you
          believe we have handled your information badly.
        </p>
      </Clause>

      <Clause heading="8. Security">
        <p>
          Passwords are hashed, the site is served over HTTPS, sessions are signed, and payment
          credentials never touch our servers. No system is perfectly secure, but we do not store
          card data, so the most damaging category of information simply is not there to lose.
        </p>
        <p>
          If a breach ever affects your data, we will tell you and the appropriate authority.
        </p>
      </Clause>

      <Clause heading="9. Cookies">
        <p>
          We set one essential cookie to keep you signed in. There are no advertising or third-party
          tracking cookies. Blocking the sign-in cookie will prevent you from logging in.
        </p>
      </Clause>

      <Clause heading="10. Changes">
        <p>
          If we change this policy we will update the date at the top of this page. Where a change
          materially affects your rights, we will tell account holders by email rather than relying
          on you to notice.
        </p>
      </Clause>
    </LegalPage>
  );
}
