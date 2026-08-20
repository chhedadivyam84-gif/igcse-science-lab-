import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getSessionUser } from '@/lib/auth';
import { AuthForm } from '../AuthForm';

export const metadata: Metadata = { title: 'Sign in' };

export default async function SignInPage() {
  if (await getSessionUser()) redirect('/dashboard');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Sign in to pick up your progress, plan and saved notes.
      </p>

      {/* AuthForm reads ?next= from the URL, so it needs a Suspense boundary. */}
      <Suspense fallback={<div className="mt-8 h-64" />}>
        <AuthForm mode="signin" />
      </Suspense>

      <p className="mt-6 text-sm text-ink-muted">
        No account yet?{' '}
        <Link href="/signup" className="text-accent hover:underline">
          Create one
        </Link>
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        <Link href="/forgot" className="text-accent hover:underline">
          Forgot your password?
        </Link>
      </p>
    </div>
  );
}
