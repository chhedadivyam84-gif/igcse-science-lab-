import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AlertTriangle, ArrowRight, Clock, FileText } from 'lucide-react';

import { getSessionUser } from '@/lib/auth';
import { Badge, Card, LinkButton, Notice, Panel, SectionHeader } from '@/components/ui';
import { isSubjectSlug, subjectDisplay } from '@/lib/subjects';
import { blueprintFor, formatDuration } from '@/lib/exam/blueprints';
import { highYieldFor } from '@/lib/exam/predicted';
import { HIGH_YIELD_BASIS } from '@/lib/curriculum/high-yield';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject } = await params;
  const display = subjectDisplay(subject);
  return {
    title: `${display.name} — most asked and predicted papers`,
    description: `The ${display.name} ${display.code} question forms that recur, and a predicted paper built to the real paper's structure.`,
  };
}

export default async function SubjectPapersPage({ params }: Params) {
  const session = await getSessionUser();
  if (!session) redirect('/signin');

  const { subject } = await params;
  if (!isSubjectSlug(subject)) notFound();

  const display = subjectDisplay(subject);
  const blueprint = blueprintFor(subject);
  const highYield = await highYieldFor(subject);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-ink-faint">
        <Link href="/papers" className="hover:text-ink">
          Predicted papers
        </Link>
        <span>/</span>
        <span className="text-ink-muted">{display.name}</span>
      </nav>

      <header className="mb-8">
        <Badge tone={display.tone}>
          {display.name} {display.code}
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Most asked, and predicted papers
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-ink-muted">{blueprint.seriesLabel}.</p>
      </header>

      {/* ---- Predicted papers ------------------------------------------- */}
      <section className="mb-10">
        <SectionHeader
          eyebrow="Predicted papers"
          title="Sit a paper at the real pace"
          description="Each paper is built to the published mark total and timing, and weighted towards the topics that recur. The same paper comes back every time, so you can compare with a classmate."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {blueprint.papers.map((paper) => (
            <Card key={paper.number} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    Paper {paper.number} — {paper.name}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {paper.marks} marks
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDuration(paper.minutes)}
                    </span>
                    <span>{paper.weight}% of the qualification</span>
                  </p>
                  {paper.calculator !== 'NOT_APPLICABLE' && (
                    <p className="mt-1 text-xs text-ink-faint">
                      {paper.calculator === 'ALLOWED' ? 'Calculator allowed' : 'No calculator'}
                    </p>
                  )}
                </div>
                <Badge tone={paper.tier === 'EXTENDED' ? 'accent' : 'neutral'}>
                  {paper.tier === 'ALL' ? 'All' : paper.tier === 'CORE' ? 'Core' : 'Extended'}
                </Badge>
              </div>

              {paper.buildable ? (
                <LinkButton
                  href={`/papers/${subject}/${paper.number}`}
                  variant="primary"
                  size="sm"
                  className="mt-4"
                >
                  Sit the predicted paper <ArrowRight className="h-3.5 w-3.5" />
                </LinkButton>
              ) : (
                <p className="mt-4 flex items-start gap-2 rounded-card border border-line bg-surface-raised/50 p-3 text-xs text-ink-muted">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caution" />
                  {paper.note}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* ---- Most asked --------------------------------------------------- */}
      <section>
        <SectionHeader
          eyebrow="Most asked"
          title="The question forms that keep coming back"
          description={HIGH_YIELD_BASIS}
        />

        {highYield.length === 0 ? (
          <Notice tone="neutral">
            The most-asked list for {display.name} has not been compiled yet.
          </Notice>
        ) : (
          <ol className="space-y-3">
            {highYield.map((item) => (
              <li key={item.id}>
                <Panel className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={display.tone}>#{item.rank} most asked</Badge>
                    {item.subtopic && (
                      <Link
                        href={`/learn/${subject}/${item.subtopic.topicSlug}/${item.subtopic.slug}`}
                        className="text-xs text-accent hover:underline"
                      >
                        {item.subtopic.number} {item.subtopic.title}
                      </Link>
                    )}
                    <span className="ml-auto text-xs text-ink-faint">
                      {item.marks} mark{item.marks === 1 ? '' : 's'}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-sm text-ink">{item.stem}</p>

                  {item.trap && (
                    <p className="mt-3 flex items-start gap-2 rounded-card border border-caution/25 bg-caution/[0.07] p-3 text-sm text-ink-muted">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caution" />
                      <span>
                        <span className="font-medium text-ink">Where the marks go: </span>
                        {item.trap}
                      </span>
                    </p>
                  )}

                  {item.subtopic && (
                    <LinkButton
                      href={`/practice?mode=topic&subtopic=${item.subtopic.id}`}
                      variant="secondary"
                      size="sm"
                      className="mt-4"
                    >
                      Practise this <ArrowRight className="h-3.5 w-3.5" />
                    </LinkButton>
                  )}
                </Panel>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
