import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { entitlementsFor } from '@/lib/billing/entitlements';
import { Paywall, TrialBanner } from '@/components/billing/Paywall';
import { aiStatus } from '@/lib/ai';
import { parseList } from '@/lib/json';
import { TutorChat } from '@/components/tutor/TutorChat';
import { asSubjectSlug } from '@/lib/subjects';

export const metadata: Metadata = {
  title: 'Ask NOVA',
  description: 'An AI tutor for Cambridge IGCSE Physics, Chemistry, Biology, Maths and ICT, with five explanation modes.',
};
export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ c?: string; topic?: string; subject?: string }>;
};

export default async function TutorPage({ searchParams }: Props) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const entitlements = await entitlementsFor(session.id);
  const locked = !entitlements.can('tutor');

  const { c, topic, subject } = await searchParams;
  const ai = aiStatus();

  const conversation = c
    ? await db.aIConversation.findFirst({
        where: { id: c, userId: session.id },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      })
    : null;

  const initialMessages =
    conversation?.messages.map((message) => ({
      id: message.id,
      role: message.role as 'user' | 'assistant',
      content: message.content,
      grounding: parseList<string>(message.grounding),
      aiAssisted: message.provider !== 'curriculum',
    })) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6">
        <p className="eyebrow">NOVA</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Your science tutor
        </h1>
      </header>

      <TrialBanner daysLeft={entitlements.plan === 'TRIAL' ? entitlements.trialDaysLeft : 0} />

      {locked ? (
        <Paywall feature="tutor" />
      ) : (
        <TutorChat
          initialMessages={initialMessages}
          conversationId={conversation?.id}
          topicHint={topic}
          subject={asSubjectSlug(subject)}
          aiConfigured={ai.configured}
        />
      )}
    </div>
  );
}
