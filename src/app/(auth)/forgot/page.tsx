import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { ForgotForm } from './ForgotForm';

export const metadata: Metadata = { title: 'Forgot your password' };
export const dynamic = 'force-dynamic';

export default async function ForgotPage() {
  if (await getSessionUser()) redirect('/dashboard');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Forgot your password</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Enter the email address on your account and we will send you a link to choose a new
        password.
      </p>

      <ForgotForm />

      <p className="mt-6 text-sm text-ink-muted">
        Remembered it?{' '}
        <Link href="/signin" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
