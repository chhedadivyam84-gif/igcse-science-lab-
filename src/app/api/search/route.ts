import { z } from 'zod';
import { db } from '@/lib/db';
import { handleRoute, ok } from '@/lib/api';
import { getSessionUser } from '@/lib/auth';
import { keywords } from '@/lib/ai/grounding';

export const dynamic = 'force-dynamic';

const query = z.object({
  q: z.string().trim().min(1).max(120),
  limit: z.coerce.number().min(1).max(30).default(8),
});

export type SearchHit = {
  kind: 'topic' | 'subtopic' | 'lesson' | 'definition' | 'formula' | 'simulation' | 'question' | 'note';
  title: string;
  detail: string;
  href: string;
  subject: string | null;
  badge: string | null;
};

/**
 * Global search across every kind of content the platform holds. Personal
 * results (saved notes) are only included for the signed-in owner.
 */
export const GET = handleRoute('search', async (request) => {
  const url = new URL(request.url);
  const params = query.parse(Object.fromEntries(url.searchParams));
  const words = keywords(params.q);
  const terms = words.length ? words : [params.q.toLowerCase()];
  const user = await getSessionUser();

  const [subtopics, lessons, definitions, formulas, sims, questions, notes] = await Promise.all([
    db.subtopic.findMany({
      where: { OR: [...terms.map((t) => ({ title: { contains: t } })), ...terms.map((t) => ({ summary: { contains: t } }))] },
      include: { topic: { include: { version: { include: { subject: true } } } } },
      take: params.limit,
    }),
    db.lesson.findMany({
      where: { OR: terms.map((t) => ({ title: { contains: t } })) },
      include: { subtopic: { include: { topic: { include: { version: { include: { subject: true } } } } } } },
      take: params.limit,
    }),
    db.definition.findMany({
      where: { OR: [...terms.map((t) => ({ term: { contains: t } })), ...terms.map((t) => ({ statement: { contains: t } }))] },
      include: { subject: true },
      take: params.limit,
    }),
    db.formula.findMany({
      where: { OR: [...terms.map((t) => ({ name: { contains: t } })), ...terms.map((t) => ({ expression: { contains: t } }))] },
      include: { subject: true },
      take: params.limit,
    }),
    db.simulation.findMany({
      where: { OR: [...terms.map((t) => ({ title: { contains: t } })), ...terms.map((t) => ({ description: { contains: t } }))] },
      include: { subject: true },
      take: params.limit,
    }),
    db.question.findMany({
      where: { reviewStatus: 'APPROVED', OR: terms.map((t) => ({ stem: { contains: t } })) },
      include: { subject: true, subtopic: true },
      take: params.limit,
    }),
    user
      ? db.note.findMany({
          where: { userId: user.id, OR: terms.map((t) => ({ title: { contains: t } })) },
          take: params.limit,
        })
      : Promise.resolve([]),
  ]);

  const hits: SearchHit[] = [
    ...subtopics.map((s) => ({
      kind: 'subtopic' as const,
      title: `${s.number} ${s.title}`,
      detail: s.summary,
      href: `/learn/${s.topic.version.subject.slug}/${s.topic.slug}/${s.slug}`,
      subject: s.topic.version.subject.slug,
      badge: 'Syllabus',
    })),
    ...lessons.map((l) => ({
      kind: 'lesson' as const,
      title: l.title,
      detail: `${l.readingMinutes} min read · ${l.subtopic.number} ${l.subtopic.title}`,
      href: `/learn/${l.subtopic.topic.version.subject.slug}/${l.subtopic.topic.slug}/${l.subtopic.slug}`,
      subject: l.subtopic.topic.version.subject.slug,
      badge: 'Lesson',
    })),
    ...definitions.map((d) => ({
      kind: 'definition' as const,
      title: d.term,
      detail: d.examWording ?? d.statement,
      href: `/learn/${d.subject.slug}?definition=${encodeURIComponent(d.term)}`,
      subject: d.subject.slug,
      badge: 'Definition',
    })),
    ...formulas.map((f) => ({
      kind: 'formula' as const,
      title: f.name,
      detail: `${f.expression} — result in ${f.resultUnit}`,
      href: f.subject.slug === 'chemistry' ? '/tools/mole' : '/tools/physics',
      subject: f.subject.slug,
      badge: 'Formula',
    })),
    ...sims.map((s) => ({
      kind: 'simulation' as const,
      title: s.title,
      detail: s.description,
      href: `/lab/${s.slug}`,
      subject: s.subject.slug,
      badge: 'Simulation',
    })),
    ...questions.map((q) => ({
      kind: 'question' as const,
      title: q.stem.slice(0, 90),
      detail: `${q.type} · ${q.marks} mark${q.marks === 1 ? '' : 's'}${q.subtopic ? ` · ${q.subtopic.number} ${q.subtopic.title}` : ''}`,
      href: q.subtopic ? `/practice?subtopic=${q.subtopic.id}` : '/practice',
      subject: q.subject.slug,
      badge: q.origin === 'AI_GENERATED' ? 'AI question' : 'Question',
    })),
    ...notes.map((n) => ({
      kind: 'note' as const,
      title: n.title,
      detail: `Your notes · ${n.style} style`,
      href: `/notes?open=${n.id}`,
      subject: null,
      badge: 'Your notes',
    })),
  ];

  return ok({ query: params.q, hits: hits.slice(0, params.limit * 3), total: hits.length });
});
