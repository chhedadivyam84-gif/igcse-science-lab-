import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowRight, FlaskConical, GraduationCap, Lightbulb, Sparkles } from 'lucide-react';

import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { masteryBand, progressForUser } from '@/lib/progress';
import { parseList } from '@/lib/json';
import { RichText } from '@/components/content/RichText';
import { Badge, Card, LinkButton, Notice, Panel, ProgressBar, SectionHeader } from '@/components/ui';
import type { WorkedExample } from '@/lib/curriculum/types';
import { calculatorFor, subjectTone } from '@/lib/subjects';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ subject: string; topic: string; subtopic: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subject, topic, subtopic } = await params;
  const row = await db.subtopic.findFirst({
    where: { slug: subtopic, topic: { slug: topic, version: { subject: { slug: subject } } } },
  });
  return { title: row ? `${row.number} ${row.title}` : 'Subtopic' };
}

export default async function SubtopicPage({ params }: Params) {
  const { subject: slug, topic: topicSlug, subtopic: subtopicSlug } = await params;
  const session = await getSessionUser();

  const subtopic = await db.subtopic.findFirst({
    where: {
      slug: subtopicSlug,
      topic: { slug: topicSlug, version: { subject: { slug }, isActive: true } },
    },
    include: {
      topic: { include: { version: { include: { subject: true } } } },
      objectives: { orderBy: { order: 'asc' } },
      lessons: { where: { status: 'PUBLISHED' }, orderBy: { order: 'asc' } },
      definitions: true,
      formulas: true,
      simulations: true,
      flashcards: { take: 6 },
      _count: { select: { questions: true, flashcards: true } },
    },
  });

  if (!subtopic) notFound();

  const progress = session ? await progressForUser(session.id) : [];
  const mine = progress.find((p) => p.number === subtopic.number);
  const band = mine ? masteryBand(mine.mastery) : null;
  const tone = subjectTone(slug);
  const calculatorHref = calculatorFor(slug);

  const prerequisiteNumbers = parseList<string>(subtopic.prerequisites);
  const prerequisites = prerequisiteNumbers.length
    ? await db.subtopic.findMany({
        where: { number: { in: prerequisiteNumbers }, topic: { version: { subject: { slug } } } },
        include: { topic: true },
      })
    : [];

  const lesson = subtopic.lessons[0];
  const misconceptions = lesson ? parseList<string>(lesson.misconceptions) : [];
  const examTips = lesson ? parseList<string>(lesson.examTips) : [];
  const workedExamples = lesson ? parseList<WorkedExample>(lesson.workedExamples) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-ink-faint">
        <Link href="/learn" className="hover:text-ink">
          Learn
        </Link>
        <span>/</span>
        <Link href={`/learn/${slug}`} className="hover:text-ink">
          {subtopic.topic.version.subject.name}
        </Link>
        <span>/</span>
        <Link href={`/learn/${slug}/${topicSlug}`} className="hover:text-ink">
          {subtopic.topic.title}
        </Link>
      </nav>

      {/* ---- What am I learning, and why? -------------------------------- */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={tone}>
            {subtopic.topic.version.subject.name} {subtopic.topic.version.subject.code}
          </Badge>
          <span className="font-mono text-sm text-ink-faint">{subtopic.number}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{subtopic.title}</h1>
        <p className="mt-3 max-w-2xl text-pretty text-ink-muted">{subtopic.summary}</p>

        {mine && band && (
          <div className="mt-5 max-w-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-faint">Your mastery · {band.label}</span>
              <span className="font-mono text-ink">{mine.mastery}%</span>
            </div>
            <ProgressBar value={mine.mastery} tone={band.tone} className="mt-1.5" />
            <p className="mt-1.5 text-xs text-ink-faint">
              {mine.correct} of {mine.attempts} questions correct
            </p>
          </div>
        )}
      </header>

      {prerequisites.length > 0 && (
        <Notice tone="caution" title="Review these first" className="mb-6">
          <ul className="mt-1 flex flex-wrap gap-2">
            {prerequisites.map((prerequisite) => (
              <li key={prerequisite.id}>
                <Link
                  href={`/learn/${slug}/${prerequisite.topic.slug}/${prerequisite.slug}`}
                  className="text-sm text-accent hover:underline"
                >
                  {prerequisite.number} {prerequisite.title}
                </Link>
              </li>
            ))}
          </ul>
        </Notice>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-6">
          {/* ---- What do I need to know? --------------------------------- */}
          {subtopic.objectives.length > 0 && (
            <Panel>
              <SectionHeader
                eyebrow="Learning objectives"
                title="What you need to be able to do"
                description="Teacher-mapped phrasing — check against the official Cambridge syllabus for exact wording."
              />
              <ul className="space-y-2.5">
                {subtopic.objectives.map((objective) => (
                  <li key={objective.id} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 font-mono text-xs text-ink-faint">{objective.code}</span>
                    <span className="text-sm text-ink-muted">{objective.statement}</span>
                    {objective.tier === 'SUPPLEMENT' && (
                      <Badge tone="accent" className="ml-auto shrink-0">
                        Supplement
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {/* ---- The lesson --------------------------------------------- */}
          {lesson ? (
            <Panel>
              <SectionHeader
                eyebrow={`${lesson.readingMinutes} minute read`}
                title={lesson.title}
              />
              <RichText text={lesson.body} />

              {lesson.analogy && (
                <div className="mt-6 rounded-card border border-accent/25 bg-accent/[0.06] p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                    <Lightbulb className="h-3.5 w-3.5" /> Think of it like this
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{lesson.analogy}</p>
                </div>
              )}
            </Panel>
          ) : (
            <Panel>
              <SectionHeader eyebrow="Lesson" title="Full lesson still being written" />
              <p className="text-sm text-ink-muted">
                The objectives above are mapped and the practice bank covers this subtopic, but the
                written lesson has not been authored yet. In the meantime you can ask NOVA to teach it —
                it answers from the same curriculum database.
              </p>
              <LinkButton
                href={`/tutor?topic=${encodeURIComponent(`${subtopic.number} ${subtopic.title}`)}&subject=${slug}`}
                variant="primary"
                size="sm"
                className="mt-4"
              >
                <Sparkles className="h-4 w-4" /> Teach me this topic
              </LinkButton>
            </Panel>
          )}

          {/* ---- Worked examples ---------------------------------------- */}
          {workedExamples.length > 0 && (
            <Panel>
              <SectionHeader eyebrow="Worked examples" title="Method, step by step" />
              <div className="space-y-4">
                {workedExamples.map((example, index) => (
                  <div key={index} className="rounded-card border border-line bg-surface-raised/60 p-4">
                    <p className="text-sm font-medium text-ink">{example.prompt}</p>
                    <ol className="mt-3 space-y-1.5">
                      {example.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-3 text-sm text-ink-muted">
                          <span className="font-mono text-xs text-ink-faint">{stepIndex + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 border-t border-line pt-3 font-mono text-sm text-positive">
                      {example.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {/* ---- Misconceptions and exam technique ----------------------- */}
          {(misconceptions.length > 0 || examTips.length > 0) && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {misconceptions.length > 0 && (
                <Panel>
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-negative">
                    <AlertTriangle className="h-4 w-4" /> Common misconceptions
                  </p>
                  <ul className="space-y-2.5">
                    {misconceptions.map((item, index) => (
                      <li key={index} className="text-sm text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}
              {examTips.length > 0 && (
                <Panel>
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
                    <GraduationCap className="h-4 w-4" /> In the exam
                  </p>
                  <ul className="space-y-2.5">
                    {examTips.map((item, index) => (
                      <li key={index} className="text-sm text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}
            </div>
          )}
        </div>

        {/* ---- Sidebar ------------------------------------------------- */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Panel className="p-4">
            <p className="eyebrow mb-3">Am I ready?</p>
            <div className="space-y-2">
              <LinkButton
                href={`/practice?subtopic=${subtopic.id}&mode=topic`}
                variant="primary"
                size="sm"
                className="w-full"
              >
                Practise this subtopic
              </LinkButton>
              <LinkButton
                href={`/flashcards?subtopic=${subtopic.id}`}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Flashcards ({subtopic._count.flashcards})
              </LinkButton>
              <LinkButton
                href={`/tutor?topic=${encodeURIComponent(`${subtopic.number} ${subtopic.title}`)}&subject=${slug}`}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                <Sparkles className="h-3.5 w-3.5" /> Ask NOVA
              </LinkButton>
              <LinkButton
                href={`/notes?topic=${encodeURIComponent(subtopic.title)}&subject=${slug}`}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                Generate notes
              </LinkButton>
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              {subtopic._count.questions} question{subtopic._count.questions === 1 ? '' : 's'} in the bank
            </p>
          </Panel>

          {subtopic.simulations.length > 0 && (
            <Panel className="p-4">
              <p className="eyebrow mb-3">Try it</p>
              <ul className="space-y-2">
                {subtopic.simulations.map((simulation) => (
                  <li key={simulation.id}>
                    <Link
                      href={`/lab/${simulation.slug}`}
                      className="flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-surface-raised"
                    >
                      <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="text-sm text-ink-muted">{simulation.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {subtopic.formulas.length > 0 && (
            <Panel className="p-4">
              <p className="eyebrow mb-3">Equations</p>
              <ul className="space-y-2.5">
                {subtopic.formulas.map((formula) => (
                  <li key={formula.id}>
                    <p className="font-mono text-sm text-ink">{formula.expression}</p>
                    <p className="text-xs text-ink-faint">
                      {formula.name} · {formula.resultUnit}
                    </p>
                  </li>
                ))}
              </ul>
              {/* Only Physics and Chemistry have a calculator. This used to be a
                  two-way ternary, which sent every Maths and Biology student to
                  the mole calculator. */}
              {calculatorHref && (
                <Link
                  href={calculatorHref}
                  className="mt-3 flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  Open calculator <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </Panel>
          )}

          {subtopic.definitions.length > 0 && (
            <Panel className="p-4">
              <p className="eyebrow mb-3">Definitions to learn</p>
              <dl className="space-y-3">
                {subtopic.definitions.map((definition) => (
                  <div key={definition.id}>
                    <dt className="text-sm font-medium text-ink">{definition.term}</dt>
                    <dd className="mt-0.5 text-xs text-ink-muted">
                      {definition.examWording ?? definition.statement}
                    </dd>
                  </div>
                ))}
              </dl>
            </Panel>
          )}

          {subtopic.flashcards.length > 0 && (
            <Panel className="p-4">
              <p className="eyebrow mb-3">Quick recall</p>
              <ul className="space-y-2">
                {subtopic.flashcards.slice(0, 4).map((card) => (
                  <li key={card.id}>
                    <Card className="p-3">
                      <p className="text-sm text-ink">{card.front}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </aside>
      </div>
    </div>
  );
}
