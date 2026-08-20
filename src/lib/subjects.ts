import { SUBJECT_SLUGS, type SubjectSlug } from './types';

/**
 * How a subject is shown to a student: its name, its syllabus code and the
 * colour it is drawn in.
 *
 * Deliberately a small static map rather than a read of the curriculum seed,
 * so client components can import it without pulling the whole syllabus into
 * the browser bundle.
 *
 * This exists because the UI repeatedly used `slug === 'physics' ? … : …`,
 * which quietly labelled every Biology, Maths and ICT topic as Chemistry once
 * the platform grew past two subjects. Anything that needs a subject's name or
 * colour should come here.
 */
export type SubjectDisplay = {
  name: string;
  code: string;
  /** Matches a Badge tone and the Tailwind colour tokens. */
  tone: SubjectSlug;
  /** Written out in full because Tailwind scans source text — a class built
   *  as `text-${tone}` is not in the stylesheet and silently renders black. */
  textClass: string;
};

const DISPLAY: Record<SubjectSlug, SubjectDisplay> = {
  physics: { name: 'Physics', code: '0625', tone: 'physics', textClass: 'text-physics' },
  chemistry: { name: 'Chemistry', code: '0620', tone: 'chemistry', textClass: 'text-chemistry' },
  biology: { name: 'Biology', code: '0610', tone: 'biology', textClass: 'text-biology' },
  maths: { name: 'Mathematics', code: '0580', tone: 'maths', textClass: 'text-maths' },
  'add-maths': {
    name: 'Additional Mathematics',
    code: '0606',
    tone: 'add-maths',
    textClass: 'text-add-maths',
  },
  'intl-maths': {
    name: 'International Mathematics',
    code: '0607',
    tone: 'intl-maths',
    textClass: 'text-intl-maths',
  },
  ict: { name: 'ICT', code: '0417', tone: 'ict', textClass: 'text-ict' },
};

/**
 * Narrows an arbitrary string — a query parameter, usually — to a subject.
 *
 * Exported because the alternative that grew up around the codebase was
 * `subject === 'physics' || subject === 'chemistry' ? subject : undefined`,
 * which does not just mislabel a Biology request: it discards the subject
 * entirely, so the tutor, the notes writer and the photo analyser were answering
 * five of the seven subjects with no syllabus grounding at all.
 */
export function isSubjectSlug(value: string | undefined | null): value is SubjectSlug {
  return typeof value === 'string' && (SUBJECT_SLUGS as readonly string[]).includes(value);
}

/** The subject if it is one, otherwise undefined. Never a different subject. */
export function asSubjectSlug(value: string | undefined | null): SubjectSlug | undefined {
  return isSubjectSlug(value) ? value : undefined;
}

/** Falls back to the slug itself, so an unknown subject is never mislabelled
 *  as a different real one — the old ternary's actual failure. */
export function subjectDisplay(slug: string): SubjectDisplay {
  if (isSubjectSlug(slug)) return DISPLAY[slug];
  return { name: slug, code: '', tone: 'physics', textClass: 'text-accent' };
}

export function subjectTextClass(slug: string): string {
  return subjectDisplay(slug).textClass;
}

export function subjectName(slug: string): string {
  return subjectDisplay(slug).name;
}

/** e.g. "Physics 0625" — the form used in headings and badges. */
export function subjectNameWithCode(slug: string): string {
  const d = subjectDisplay(slug);
  return d.code ? `${d.name} ${d.code}` : d.name;
}

export function subjectTone(slug: string): SubjectSlug {
  return subjectDisplay(slug).tone;
}

/**
 * The calculator tool for a subject, where one exists.
 *
 * Partial on purpose. The UI used to pick between the two tools with a
 * ternary, which meant a Maths or Biology student following "Open calculator"
 * landed on the mole calculator. A subject with no entry should show no link.
 */
export const CALCULATOR_BY_SUBJECT: Partial<Record<SubjectSlug, string>> = {
  physics: '/tools/physics',
  chemistry: '/tools/mole',
};

export function calculatorFor(slug: string): string | null {
  return isSubjectSlug(slug) ? (CALCULATOR_BY_SUBJECT[slug] ?? null) : null;
}

/** Every subject, in teaching order — for filters and switchers. */
export const ALL_SUBJECTS: { slug: SubjectSlug; display: SubjectDisplay }[] = SUBJECT_SLUGS.map(
  (slug) => ({ slug, display: DISPLAY[slug] }),
);
