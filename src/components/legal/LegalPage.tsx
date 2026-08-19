import type { ReactNode } from 'react';
import Link from 'next/link';

import { Notice } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POLICY_UPDATED, legalDetailsComplete, missingLegalDetails } from '@/lib/legal';

/**
 * Shared shell for the four policy pages.
 *
 * These are read under stress — a parent checking whether a charge can be
 * reversed, a student looking for a contact address — so the type is set wider
 * and plainer than the rest of the site, and nothing animates in late.
 *
 * While any operator detail is still `PENDING` the page says so at the top.
 * Publishing a policy with an invented address would be worse than publishing
 * an obviously unfinished one.
 */
export function LegalPage({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode;
}) {
  const incomplete = !legalDetailsComplete();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <header>
          <p className="eyebrow">Legal</p>
          <h1 className="font-display mt-3 text-balance text-4xl leading-[1.05] text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-ink-muted">{summary}</p>
          <p className="mt-2 text-xs text-ink-faint">Last updated {POLICY_UPDATED}</p>
        </header>
      </Reveal>

      {incomplete && (
        <div className="mt-8">
          <Notice tone="caution" title="This policy is not finished">
            The operator&rsquo;s {missingLegalDetails().join(', ')}{' '}
            {missingLegalDetails().length === 1 ? 'has' : 'have'} not been filled in yet, so this
            page is not yet a complete legal statement. If you need these details before paying,
            please contact us first.
          </Notice>
        </div>
      )}

      <div className="prose-science mt-10 text-[0.9375rem] leading-relaxed text-ink-muted">
        {children}
      </div>

      <footer className="mt-14 border-t border-line pt-6 text-xs text-ink-faint">
        <p>
          IGCSE Science Lab is an independent study tool. It is not endorsed by or affiliated with
          Cambridge Assessment International Education.
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/legal/terms" className="hover:text-ink">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/legal/refunds" className="hover:text-ink">
            Refunds &amp; cancellation
          </Link>
          <Link href="/legal/contact" className="hover:text-ink">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}

/** A titled clause. Numbered by the page, not by this component. */
export function Clause({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="font-display text-xl text-ink">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
