import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth';
import { Panel } from '@/components/ui';
import { SubjectPicker } from '@/components/account/SubjectPicker';
import { parseStudentSubjects } from '@/lib/subjects';

export const metadata: Metadata = {
  title: 'Which subjects are you taking?',
  description: 'Tell us your Cambridge IGCSE subjects so your dashboard, study plan and predicted papers match them.',
};
export const dynamic = 'force-dynamic';

export default async function OnboardingSubjectsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/signin?next=/onboarding/subjects');

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-6">
        <p className="eyebrow">Setting up</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Which subjects are you taking?
        </h1>
        <p className="mt-3 text-pretty text-ink-muted">
          Pick the Cambridge IGCSE subjects you are entered for. Your dashboard, your study plan and
          your predicted papers will follow them, so you are not reading past five subjects you do not
          sit.
        </p>
      </header>

      <Panel>
        <SubjectPicker
          initial={parseStudentSubjects(user.subjects)}
          redirectTo="/dashboard"
          submitLabel="Continue to my dashboard"
        />
      </Panel>

      <p className="mt-5 text-center text-sm text-ink-muted">
        <Link href="/dashboard" className="hover:text-ink">
          Skip for now
        </Link>
      </p>
    </div>
  );
}
