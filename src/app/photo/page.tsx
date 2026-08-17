import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { aiStatus } from '@/lib/ai';
import { PhotoHelp } from '@/components/photo/PhotoHelp';

export const metadata: Metadata = {
  title: 'Ask with a photo',
  description: 'Upload a photo of your working and get the method explained.',
};
export const dynamic = 'force-dynamic';

export default async function PhotoPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">Ask with a photo</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Show it, don&rsquo;t type it
        </h1>
        <p className="mt-2 text-ink-muted">
          Photograph a question, a diagram or your own working. NOVA finds where the reasoning goes
          wrong and teaches the method from there.
        </p>
      </header>

      <PhotoHelp aiConfigured={aiStatus().configured} />
    </div>
  );
}
