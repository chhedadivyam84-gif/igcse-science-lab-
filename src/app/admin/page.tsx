import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { isOwnerEmail, ownerConfigured, ownerEmail } from '@/lib/owner';
import { parseList } from '@/lib/json';
import { AdminConsole } from '@/components/admin/AdminConsole';

export const metadata: Metadata = { title: 'Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  // Middleware already blocks this route. Re-checking here against the database
  // row means the guard survives any future routing change, and never trusts a
  // claim carried in the session token.
  const account = await db.user.findUnique({ where: { id: session.id }, select: { email: true } });
  if (!ownerConfigured() || !isOwnerEmail(account?.email)) redirect('/dashboard');

  const [
    userCount,
    attemptCount,
    approvedQuestions,
    pendingRows,
    lessonCount,
    aiMessageCount,
    noteCount,
    unverifiedObjectives,
    userRows,
    versionRows,
  ] = await Promise.all([
    db.user.count(),
    db.questionAttempt.count(),
    db.question.count({ where: { reviewStatus: 'APPROVED' } }),
    db.question.findMany({
      where: { reviewStatus: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      take: 30,
      include: { subject: true, subtopic: true },
    }),
    db.lesson.count({ where: { status: 'PUBLISHED' } }),
    db.aIMessage.count(),
    db.note.count(),
    db.learningObjective.count({ where: { verified: false } }),
    db.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { _count: { select: { attempts: true } } },
    }),
    db.syllabusVersion.findMany({
      include: {
        subject: true,
        topics: { include: { _count: { select: { subtopics: true } } } },
      },
      orderBy: { code: 'asc' },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">Owner console</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Content and users
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Review generated content before it reaches students, manage syllabus versions, and check how
          the platform is being used.
        </p>
      </header>

      <AdminConsole
        ownerEmail={ownerEmail() ?? ''}
        stats={{
          users: userCount,
          attempts: attemptCount,
          questions: approvedQuestions,
          pendingQuestions: pendingRows.length,
          lessons: lessonCount,
          aiMessages: aiMessageCount,
          notes: noteCount,
          unverifiedObjectives,
        }}
        pending={pendingRows.map((question) => ({
          id: question.id,
          stem: question.stem,
          type: question.type,
          difficulty: question.difficulty,
          marks: question.marks,
          answer: question.answer,
          explanation: question.explanation,
          markScheme: parseList<string>(question.markScheme),
          createdAt: question.createdAt.toISOString(),
          subject: question.subject.slug,
          subtopic: question.subtopic ? `${question.subtopic.number} ${question.subtopic.title}` : null,
        }))}
        users={userRows.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          xp: user.xp,
          createdAt: user.createdAt.toISOString(),
          attempts: user._count.attempts,
          plan: user.plan,
          trialEndsAt: user.trialEndsAt?.toISOString() ?? null,
        }))}
        versions={versionRows.map((version) => ({
          id: version.id,
          code: version.code,
          label: version.label,
          provenance: version.provenance,
          isActive: version.isActive,
          sourceNote: version.sourceNote,
          subject: version.subject.name,
          topics: version.topics.length,
          subtopics: version.topics.reduce((sum, topic) => sum + topic._count.subtopics, 0),
        }))}
      />
    </div>
  );
}
