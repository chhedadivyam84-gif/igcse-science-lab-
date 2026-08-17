import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getSessionUser } from '@/lib/auth';
import { AuthForm } from '../AuthForm';

export const metadata: Metadata = { title: 'Create your account' };

export default async function SignUpPage() {
  if (await getSessionUser()) redirect('/dashboard');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Create your account</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Progress, mastery and mistake tracking are all tied to your account.
      </p>

      <Suspense fallback={<div className="mt-8 h-96" />}>
        <AuthForm mode="signup" />
      </Suspense>

      <p className="mt-6 text-sm text-ink-muted">
        Already registered?{' '}
        <Link href="/signin" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
