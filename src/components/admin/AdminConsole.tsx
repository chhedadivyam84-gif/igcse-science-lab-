'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, ShieldCheck, X } from 'lucide-react';

import { Badge, Button, EmptyState, Notice, Panel, SectionHeader, Select, Stat, Textarea } from '@/components/ui';
import { cn, relativeTime } from '@/lib/utils';
import { subjectTone } from '@/lib/subjects';

export type PendingQuestion = {
  id: string;
  stem: string;
  type: string;
  difficulty: string;
  marks: number;
  answer: string;
  explanation: string;
  markScheme: string[];
  createdAt: string;
  subject: string;
  subtopic: string | null;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  createdAt: string;
  attempts: number;
  plan: string;
  trialEndsAt: string | null;
};

export type AdminVersion = {
  id: string;
  code: string;
  label: string;
  provenance: string;
  isActive: boolean;
  sourceNote: string | null;
  subject: string;
  topics: number;
  subtopics: number;
};

export type AdminStats = {
  users: number;
  attempts: number;
  questions: number;
  pendingQuestions: number;
  lessons: number;
  aiMessages: number;
  notes: number;
  unverifiedObjectives: number;
};

type Tab = 'overview' | 'review' | 'syllabus' | 'users';

export function AdminConsole({
  ownerEmail,
  stats,
  pending,
  users,
  versions,
}: {
  ownerEmail: string;
  stats: AdminStats;
  pending: PendingQuestion[];
  users: AdminUser[];
  versions: AdminVersion[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');
  const [busy, setBusy] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  async function review(id: string, status: 'APPROVED' | 'REJECTED') {
    setBusy(id);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: 'question', entityId: id, status, notes: notes[id] }),
      });
      if (response.ok) router.refresh();
      else setMessage('Could not save that decision.');
    } finally {
      setBusy(null);
    }
  }

  async function setRole(userId: string, role: string) {
    setBusy(userId);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
      });
      const data = await response.json();
      if (response.ok) router.refresh();
      else setMessage(data.error ?? 'Could not change that role.');
    } finally {
      setBusy(null);
    }
  }

  /** Gives an account Pro access without a payment — used before Razorpay is
   *  connected, and for scholarships or goodwill afterwards. */
  async function grant(userId: string, email: string) {
    const months = Number(window.prompt(`Grant Pro access to ${email} for how many months?`, '12'));
    if (!Number.isFinite(months) || months < 1) return;

    setBusy(userId);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/grant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, months }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        router.refresh();
      } else {
        setMessage(data.error ?? 'Could not grant access.');
      }
    } finally {
      setBusy(null);
    }
  }

  async function setProvenance(versionId: string, provenance: string) {
    setBusy(versionId);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/syllabus', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ versionId, provenance }),
      });
      if (response.ok) router.refresh();
      else setMessage('Could not update that syllabus version.');
    } finally {
      setBusy(null);
    }
  }

  const tabs: { value: Tab; label: string; count?: number }[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'review', label: 'Review queue', count: pending.length },
    { value: 'syllabus', label: 'Syllabus versions' },
    { value: 'users', label: 'Users', count: users.length },
  ];

  return (
    <div className="space-y-6">
      <Panel className="flex flex-wrap items-center gap-x-4 gap-y-2 border-accent/25 py-3.5">
        <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
        <p className="text-sm text-ink">
          This console is locked to <span className="font-mono text-accent">{ownerEmail}</span>.
        </p>
        <p className="text-xs text-ink-muted sm:ml-auto">
          Set by <code className="formula">OWNER_EMAIL</code> — it cannot be granted from inside the app.
        </p>
      </Panel>

      <div className="scroll-x flex gap-2 pb-1">
        {tabs.map((entry) => (
          <button
            key={entry.value}
            type="button"
            onClick={() => setTab(entry.value)}
            aria-pressed={tab === entry.value}
            className={cn(
              'shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
              tab === entry.value
                ? 'border-accent bg-accent/10 font-medium text-accent'
                : 'border-line text-ink-muted hover:text-ink',
            )}
          >
            {entry.label}
            {entry.count !== undefined && entry.count > 0 && (
              <span className="ml-1.5 rounded-full bg-surface-raised px-1.5 py-0.5 text-2xs">{entry.count}</span>
            )}
          </button>
        ))}
      </div>

      {message && <Notice tone="caution">{message}</Notice>}

      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Students" value={stats.users} />
            <Stat label="Questions answered" value={stats.attempts} />
            <Stat label="Approved questions" value={stats.questions} tone="positive" />
            <Stat
              label="Awaiting review"
              value={stats.pendingQuestions}
              tone={stats.pendingQuestions > 0 ? 'caution' : 'neutral'}
            />
            <Stat label="Published lessons" value={stats.lessons} />
            <Stat label="Tutor messages" value={stats.aiMessages} />
            <Stat label="Notes generated" value={stats.notes} />
            <Stat
              label="Unverified objectives"
              value={stats.unverifiedObjectives}
              tone={stats.unverifiedObjectives > 0 ? 'caution' : 'positive'}
            />
          </div>

          <Notice tone="neutral" title="What “verified” means here">
            Learning objectives are seeded as teacher-mapped paraphrases and marked unverified. Marking a
            syllabus version <strong>OFFICIAL_CHECKED</strong> is a statement that a person has compared
            it line by line against the published Cambridge specification. Until then, the student-facing
            pages say so.
          </Notice>
        </>
      )}

      {tab === 'review' && (
        <>
          <Notice tone="caution" title="Nothing reaches students unreviewed">
            AI-generated questions are stored with review status PENDING and are never served by the
            practice engine. Approving one is what publishes it.
          </Notice>

          {pending.length === 0 ? (
            <EmptyState
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Review queue is empty"
              description="Nothing is waiting. Generated questions appear here as soon as a student creates them."
            />
          ) : (
            <div className="space-y-4">
              {pending.map((question) => (
                <Panel key={question.id}>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge tone="caution">AI-generated</Badge>
                    <Badge tone={subjectTone(question.subject)}>
                      {question.subject}
                    </Badge>
                    <Badge tone="neutral">{question.type}</Badge>
                    <Badge tone="neutral">
                      {question.marks} mark{question.marks === 1 ? '' : 's'}
                    </Badge>
                    {question.subtopic && <span className="text-xs text-ink-faint">{question.subtopic}</span>}
                    <span className="ml-auto text-2xs text-ink-faint">{relativeTime(question.createdAt)}</span>
                  </div>

                  <p className="text-sm text-ink">{question.stem}</p>

                  <dl className="mt-4 space-y-2 rounded-card border border-line bg-surface-raised/40 p-3.5 text-sm">
                    <div>
                      <dt className="text-xs text-ink-faint">Answer</dt>
                      <dd className="text-ink">{question.answer}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-faint">Mark scheme</dt>
                      <dd className="text-ink-muted">
                        <ul className="space-y-0.5">
                          {question.markScheme.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-ink-faint">Explanation</dt>
                      <dd className="text-ink-muted">{question.explanation}</dd>
                    </div>
                  </dl>

                  <Textarea
                    value={notes[question.id] ?? ''}
                    onChange={(event) => setNotes((current) => ({ ...current, [question.id]: event.target.value }))}
                    rows={2}
                    placeholder="Reviewer notes (optional)"
                    className="mt-3"
                    aria-label="Reviewer notes"
                  />

                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      loading={busy === question.id}
                      onClick={() => review(question.id, 'APPROVED')}
                    >
                      <Check className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      loading={busy === question.id}
                      onClick={() => review(question.id, 'REJECTED')}
                    >
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </Panel>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'syllabus' && (
        <div className="space-y-4">
          {versions.map((version) => (
            <Panel key={version.id}>
              <SectionHeader
                eyebrow={version.subject}
                title={version.label}
                action={
                  <div className="flex items-center gap-2">
                    {version.isActive && <Badge tone="positive">Active</Badge>}
                    <Badge
                      tone={
                        version.provenance === 'OFFICIAL_CHECKED'
                          ? 'positive'
                          : version.provenance === 'TEACHER_MAPPED'
                            ? 'caution'
                            : 'negative'
                      }
                    >
                      {version.provenance.replace('_', ' ').toLowerCase()}
                    </Badge>
                  </div>
                }
              />

              <p className="text-sm text-ink-muted">{version.sourceNote}</p>

              <dl className="mt-4 flex flex-wrap gap-6 text-sm">
                <div>
                  <dt className="text-xs text-ink-faint">Code</dt>
                  <dd className="font-mono text-ink">{version.code}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-faint">Topics</dt>
                  <dd className="font-mono text-ink">{version.topics}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-faint">Subtopics</dt>
                  <dd className="font-mono text-ink">{version.subtopics}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <label className="text-sm text-ink-muted" htmlFor={`prov-${version.id}`}>
                  Provenance
                </label>
                <Select
                  id={`prov-${version.id}`}
                  value={version.provenance}
                  disabled={busy === version.id}
                  onChange={(event) => setProvenance(version.id, event.target.value)}
                  className="w-56"
                >
                  <option value="UNVERIFIED">Unverified</option>
                  <option value="TEACHER_MAPPED">Teacher-mapped</option>
                  <option value="OFFICIAL_CHECKED">Checked against official syllabus</option>
                </Select>
              </div>
            </Panel>
          ))}

          <Notice tone="neutral" title="Adding a new specification">
            When Cambridge revises a syllabus, add a new seed in{' '}
            <code className="formula">src/lib/curriculum/</code> and re-run{' '}
            <code className="formula">npm run db:seed</code>. Existing versions are preserved, so students
            already partway through a cohort keep the structure they were taught.
          </Notice>
        </div>
      )}

      {tab === 'users' && (
        <Panel>
          <SectionHeader eyebrow="Accounts" title={`${users.length} users`} />
          <Notice tone="neutral" className="mb-4">
            The role column is a label. It does not grant access to this console — that is decided
            entirely by <code className="formula">OWNER_EMAIL</code>, so no account edited here can ever
            reach the owner console.
          </Notice>
          <div className="scroll-x">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="pb-2 font-medium text-ink-muted">Name</th>
                  <th className="pb-2 font-medium text-ink-muted">Email</th>
                  <th className="pb-2 font-medium text-ink-muted">Attempts</th>
                  <th className="pb-2 font-medium text-ink-muted">XP</th>
                  <th className="pb-2 font-medium text-ink-muted">Joined</th>
                  <th className="pb-2 font-medium text-ink-muted">Plan</th>
                  <th className="pb-2 font-medium text-ink-muted">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isOwner = user.email.toLowerCase() === ownerEmail.toLowerCase();
                  return (
                    <tr key={user.id} className="border-b border-line/60 last:border-0">
                      <td className="py-2.5 text-ink">
                        {user.name}
                        {isOwner && (
                          <Badge tone="accent" className="ml-2">
                            You
                          </Badge>
                        )}
                      </td>
                      <td className="py-2.5 text-ink-muted">{user.email}</td>
                      <td className="py-2.5 font-mono text-ink-muted">{user.attempts}</td>
                      <td className="py-2.5 font-mono text-ink-muted">{user.xp}</td>
                      <td className="py-2.5 text-ink-faint">{relativeTime(user.createdAt)}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <Badge
                            tone={
                              user.plan === 'PRO' ? 'positive' : user.plan === 'TRIAL' ? 'accent' : 'neutral'
                            }
                          >
                            {user.plan}
                          </Badge>
                          {!isOwner && user.plan !== 'PRO' && (
                            <button
                              type="button"
                              disabled={busy === user.id}
                              onClick={() => grant(user.id, user.email)}
                              className="text-xs text-accent underline-offset-4 hover:underline disabled:opacity-50"
                            >
                              Grant Pro
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5">
                        {isOwner ? (
                          <span className="text-sm text-ink-faint">Owner</span>
                        ) : (
                          <Select
                            value={user.role}
                            disabled={busy === user.id}
                            onChange={(event) => setRole(user.id, event.target.value)}
                            aria-label={`Role label for ${user.name}`}
                            className="w-32"
                          >
                            <option value="STUDENT">Student</option>
                            <option value="ADMIN">Admin</option>
                          </Select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </div>
  );
}
