import type { Metadata } from 'next';
import Link from 'next/link';

import { Notice } from '@/components/ui';
import { RESET_FAILURE_MESSAGE, checkResetToken } from '@/lib/password-reset';
import { ResetForm } from './ResetForm';

export const metadata: Metadata = { title: 'Choose a new password' };
export const dynamic = 'force-dynamic';

/**
 * The token is validated here, on the server, before the form is shown.
 *
 * Showing the form first and only rejecting on submit would have a student
 * type a password twice before being told the link had expired.
 */
export default async function ResetPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const check = await checkResetToken(token);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Choose a new password</h1>

      {check.ok ? (
        <>
          <p className="mt-1.5 text-sm text-ink-muted">
            Pick something you have not used elsewhere. You will be signed in straight away.
          </p>
          <ResetForm token={token} />
        </>
      ) : (
        <>
          <div className="mt-6">
            <Notice tone="caution" title="This link cannot be used">
              {RESET_FAILURE_MESSAGE[check.reason]}
            </Notice>
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            <Link href="/forgot" className="text-accent hover:underline">
              Request a new reset link
            </Link>
          </p>
        </>
      )}

      <p className="mt-6 text-sm text-ink-muted">
        <Link href="/signin" className="text-accent hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
