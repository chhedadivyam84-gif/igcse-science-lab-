import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/lib/auth';
import { FlashcardDeck } from '@/components/flashcards/FlashcardDeck';

export const metadata: Metadata = {
  title: 'Flashcards',
  description: 'Spaced-repetition flashcards built from the syllabus.',
};
export const dynamic = 'force-dynamic';

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string; subtopic?: string }>;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const { subject, subtopic } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">Flashcards</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Recall, not recognition
        </h1>
        <p className="mt-2 text-ink-muted">
          Rate each card honestly. Cards you find hard come back sooner; ones you know well are pushed
          further out.
        </p>
      </header>

      <FlashcardDeck initialSubject={subject} initialSubtopicId={subtopic} />
    </div>
  );
}
