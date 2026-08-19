import Link from 'next/link';
import { ArrowRight, Atom, Braces, CheckCircle2, Sparkles, Zap } from 'lucide-react';

import { LazyHeroScene } from '@/components/three/LazyScene';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Badge, LinkButton } from '@/components/ui';
import { NavIcon } from '@/components/layout/icons';
import { PRIMARY_NAV, SECONDARY_NAV, SUBJECTS } from '@/lib/nav';
import { curriculumStats, syllabuses } from '@/lib/curriculum';
import { getSessionUser } from '@/lib/auth';
import { aiStatus } from '@/lib/ai';

export default async function HomePage() {
  const session = await getSessionUser();
  const stats = curriculumStats();
  const ai = aiStatus();

  const entryPoints = [...PRIMARY_NAV, ...SECONDARY_NAV].filter((item) =>
    ['/tutor', '/learn', '/practice', '/lab', '/notes', '/explainer', '/progress'].includes(item.href),
  );

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative isolate overflow-hidden">
        {/* Grid, masked so it dissolves outward instead of stopping on a hard
            edge — an unmasked grid is the giveaway of a template hero. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-cell opacity-[0.16]"
          style={{
            maskImage: 'radial-gradient(70% 55% at 50% 0%, #000 35%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(70% 55% at 50% 0%, #000 35%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="aurora aurora-drift pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem]"
          aria-hidden="true"
        />

        {/* The 3D scene sits behind the copy and never intercepts clicks. */}
        <div className="pointer-events-none absolute inset-0 -z-10 h-[42rem]" aria-hidden="true">
          <LazyHeroScene />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28">
          <div className="max-w-3xl">
            <Reveal>
              <Badge tone="accent" icon={<Sparkles className="h-3 w-3" />}>
                Cambridge IGCSE Physics 0625 · Chemistry 0620
              </Badge>
            </Reveal>

            <Reveal delay={0.05}>
              {/* The serif italic against the grotesque is what gives the line
                  its editorial weight — one face alone reads as a template. */}
              <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-ink sm:text-7xl lg:text-8xl">
                Master IGCSE{' '}
                <span className="font-display gradient-text block italic sm:inline">
                  Physics &amp; Chemistry
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-lg text-ink-muted sm:text-xl">
                Understand the concept. Visualise it. Practise it. Master it.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={session ? '/dashboard' : '/signup'} variant="primary" size="lg">
                  {session ? 'Go to dashboard' : 'Start learning'}
                  <ArrowRight className="h-4 w-4" />
                </LinkButton>
                <LinkButton href="/tutor" variant="secondary" size="lg">
                  <Sparkles className="h-4 w-4" />
                  Ask NOVA a question
                </LinkButton>
              </div>
            </Reveal>
          </div>

          {/* Subject entry points */}
          <Stagger className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2">
            {SUBJECTS.map((subject) => {
              const syllabus = syllabuses.find((s) => s.subject.slug === subject.slug);
              const topics = syllabus?.topics.length ?? 0;
              const subtopics = syllabus?.topics.reduce((n, t) => n + t.subtopics.length, 0) ?? 0;

              return (
                <StaggerItem key={subject.slug}>
                  <Link
                    href={`/learn/${subject.slug}`}
                    className={`group hover-lift border-gradient relative flex h-full flex-col justify-between overflow-hidden rounded-panel p-6 shadow-panel backdrop-blur-xl sm:p-8`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${subject.gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`font-mono text-sm ${subject.accentClass}`}>{subject.code}</span>
                        {subject.slug === 'physics' ? (
                          <Zap className={`h-5 w-5 ${subject.accentClass}`} />
                        ) : (
                          <Atom className={`h-5 w-5 ${subject.accentClass}`} />
                        )}
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                        {subject.name}
                      </h2>
                      <p className="mt-2 max-w-sm text-sm text-ink-muted">{subject.tagline}</p>
                    </div>
                    <div className="relative mt-8 flex items-center justify-between">
                      <span className="text-sm text-ink-muted">
                        {topics} topics · {subtopics} subtopics
                      </span>
                      <span className={`flex items-center gap-1 text-sm font-medium ${subject.accentClass}`}>
                        Open
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Entry points                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <p className="eyebrow">Everything in one place</p>
          <h2 className="font-display mt-3 max-w-2xl text-balance text-4xl leading-[1.05] text-ink sm:text-5xl">
            Don&rsquo;t memorise science. Understand it.
          </h2>
        </Reveal>

        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {entryPoints.map((item) => (
            <StaggerItem key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
              >
                <NavIcon name={item.icon} className="h-5 w-5 text-accent" />
                <h3 className="mt-3 text-base font-semibold text-ink">{item.label}</h3>
                <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How it works                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow">The loop</p>
                <h2 className="font-display mt-3 text-balance text-4xl leading-[1.05] text-ink sm:text-5xl">
                  Ask a question. Watch it come alive.
                </h2>
                <p className="mt-4 text-pretty text-ink-muted">
                  Every answer is anchored to the platform&rsquo;s own curriculum database — the same
                  objectives, definitions and equations you will meet in the papers — so explanations
                  stay at IGCSE level instead of drifting into university physics.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge tone={ai.configured ? 'positive' : 'caution'}>
                    {ai.configured ? `AI connected · ${ai.model}` : 'AI not configured'}
                  </Badge>
                  <Badge tone="neutral">{stats.subtopics} subtopics mapped</Badge>
                  <Badge tone="neutral">{stats.formulas} equations</Badge>
                  <Badge tone="neutral">{stats.definitions} definitions</Badge>
                </div>
              </div>
            </Reveal>

            <Stagger className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  step: '01',
                  title: 'Understand',
                  body: 'Five explanation modes, from "explain it like I am 12" to exactly what a marker wants to see.',
                },
                {
                  step: '02',
                  title: 'Visualise',
                  body: 'Programmatically drawn diagrams and interactive simulations, so the science is accurate, not decorative.',
                },
                {
                  step: '03',
                  title: 'Practise',
                  body: 'Structured questions with mark schemes, and an exam mode that removes every distraction.',
                },
                {
                  step: '04',
                  title: 'Master',
                  body: 'Mastery that decays over time, weak-topic targeting, and a plan for what to do today.',
                },
              ].map((item) => (
                <StaggerItem key={item.step}>
                  <div className="h-full rounded-card border border-line bg-surface p-5">
                    <span className="font-mono text-xs text-accent">{item.step}</span>
                    <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-muted">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Accuracy                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Content you can trust</p>
              <h2 className="font-display mt-3 text-balance text-4xl leading-[1.05] text-ink sm:text-5xl">
                From confused → confident.
              </h2>
              <p className="mt-4 text-pretty text-ink-muted">
                Getting science wrong confidently is worse than not knowing it. So the platform keeps
                three things visibly separate.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  {
                    title: 'Syllabus structure',
                    body: 'Topic and subtopic numbering mapped from the published Cambridge specifications, versioned so it can be updated when Cambridge revises them.',
                  },
                  {
                    title: 'Authored explanation',
                    body: 'Lessons, definitions, worked examples and misconceptions written for this platform — clearly labelled as teaching material, not official wording.',
                  },
                  {
                    title: 'AI-generated practice',
                    body: 'Anything a model writes is labelled AI-generated and queued for human review before it reaches the question bank. Nothing here is presented as a Cambridge past paper.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
                    <div>
                      <p className="text-sm font-medium text-ink">{item.title}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel h-full p-6">
              <div className="flex items-center gap-2">
                <Braces className="h-4 w-4 text-accent" />
                <p className="eyebrow">In the database right now</p>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ['Topics', stats.topics],
                  ['Subtopics', stats.subtopics],
                  ['Learning objectives', stats.objectives],
                  ['Full lessons', stats.lessons],
                  ['Practice questions', stats.questions],
                  ['Flashcards', stats.flashcards],
                  ['Equations', stats.formulas],
                  ['Definitions', stats.definitions],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <dt className="text-xs text-ink-muted">{label}</dt>
                    <dd className="mt-0.5 text-2xl font-semibold tabular-nums text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-line pt-4 text-xs text-ink-muted">
                These are live counts from the curriculum database, not marketing figures. Lessons are
                being written subtopic by subtopic — the ones still in progress say so on the page.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Closing                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <h2 className="font-display text-balance text-4xl leading-[1.05] text-ink sm:text-5xl">
              Your AI science lab for IGCSE.
            </h2>
            <p className="mt-4 text-ink-muted">
              Built around the two specifications you are actually sitting.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton href={session ? '/dashboard' : '/signup'} variant="primary" size="lg">
                {session ? 'Continue where you left off' : 'Create your account'}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/learn" variant="secondary" size="lg">
                Browse the syllabus
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs text-ink-muted sm:px-6">
          <p>
            IGCSE Science Lab is an independent study tool. It is not endorsed by or affiliated with
            Cambridge Assessment International Education. &ldquo;Cambridge IGCSE&rdquo; and the syllabus codes
            0625 and 0620 are used to identify the specifications this tool is designed around. Always
            check the official syllabus document published by Cambridge for authoritative requirements.
          </p>
          {/* Payment providers require these to be reachable from every page a
              student can pay from, so they live in the shared footer. */}
          <nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
            <Link href="/legal/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/legal/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/legal/refunds" className="hover:text-ink">
              Refunds &amp; cancellation
            </Link>
            <Link href="/legal/contact" className="hover:text-ink">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
