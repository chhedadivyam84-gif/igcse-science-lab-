import type { SubjectSlug } from '../types';

/**
 * The shape of the real papers.
 *
 * A predicted paper is only worth sitting if it is the length, the mark total
 * and the pace of the thing it predicts — otherwise it teaches the wrong
 * timing, which is how well-prepared students still run out of paper. So the
 * numbers here are the published assessment structure, not estimates, and each
 * subject carries the source they came from.
 *
 * `buildable` is the honest part. A written theory paper can be assembled from
 * a question bank; a practical test in a laboratory, an ICT paper marked on a
 * spreadsheet file, or a graphics-calculator investigation cannot be. Those are
 * listed anyway — a student planning revision needs to see the whole
 * qualification — but they are not offered as predicted papers.
 *
 * Structures are those published for the series named in `seriesLabel`.
 * Cambridge revises specifications; when that happens add a new entry rather
 * than editing this one, the same rule the curriculum seeds follow.
 */

export type PaperTier = 'CORE' | 'EXTENDED' | 'ALL';
export type Calculator = 'ALLOWED' | 'NOT_ALLOWED' | 'NOT_APPLICABLE';
export type PaperStyle = 'MCQ' | 'THEORY' | 'PRACTICAL' | 'INVESTIGATION';

export type PaperBlueprint = {
  /** Paper number as Cambridge labels it. */
  number: string;
  name: string;
  tier: PaperTier;
  calculator: Calculator;
  minutes: number;
  marks: number;
  /** Percentage of the qualification. */
  weight: number;
  style: PaperStyle;
  /** Whether this platform can honestly assemble a predicted version. */
  buildable: boolean;
  /** Shown when buildable is false, so the reason is never a mystery. */
  note?: string;
};

export type SubjectBlueprint = {
  subject: SubjectSlug;
  syllabusCode: string;
  /** The series this structure was published for. */
  seriesLabel: string;
  source: string;
  papers: PaperBlueprint[];
};

/**
 * Physics, Chemistry and Biology share one assessment structure: a
 * multiple-choice paper, a theory paper, and a practical component that is
 * either sat in a laboratory (Paper 5) or answered on paper (Paper 6).
 */
function sciencePapers(): PaperBlueprint[] {
  return [
    {
      number: '1',
      name: 'Multiple Choice (Core)',
      tier: 'CORE',
      calculator: 'ALLOWED',
      minutes: 45,
      marks: 40,
      weight: 30,
      style: 'MCQ',
      buildable: true,
    },
    {
      number: '2',
      name: 'Multiple Choice (Extended)',
      tier: 'EXTENDED',
      calculator: 'ALLOWED',
      minutes: 45,
      marks: 40,
      weight: 30,
      style: 'MCQ',
      buildable: true,
    },
    {
      number: '3',
      name: 'Theory (Core)',
      tier: 'CORE',
      calculator: 'ALLOWED',
      minutes: 75,
      marks: 80,
      weight: 50,
      style: 'THEORY',
      buildable: true,
    },
    {
      number: '4',
      name: 'Theory (Extended)',
      tier: 'EXTENDED',
      calculator: 'ALLOWED',
      minutes: 75,
      marks: 80,
      weight: 50,
      style: 'THEORY',
      buildable: true,
    },
    {
      number: '5',
      name: 'Practical Test',
      tier: 'ALL',
      calculator: 'ALLOWED',
      minutes: 75,
      marks: 40,
      weight: 20,
      style: 'PRACTICAL',
      buildable: false,
      note: 'Sat at the bench with real apparatus. Nothing on a screen can stand in for it — use your school practical sessions.',
    },
    {
      number: '6',
      name: 'Alternative to Practical',
      tier: 'ALL',
      calculator: 'ALLOWED',
      minutes: 60,
      marks: 40,
      weight: 20,
      style: 'PRACTICAL',
      buildable: false,
      note: 'Written, but it examines apparatus, readings and sources of error rather than syllabus theory. Our bank is theory, so predicting it would be guesswork.',
    },
  ];
}

const BLUEPRINTS: Record<SubjectSlug, SubjectBlueprint> = {
  physics: {
    subject: 'physics',
    syllabusCode: '0625',
    seriesLabel: 'for examination from 2023',
    source: 'Cambridge IGCSE Physics 0625 syllabus and learner guide, assessment overview.',
    papers: sciencePapers(),
  },
  chemistry: {
    subject: 'chemistry',
    syllabusCode: '0620',
    seriesLabel: 'for examination from 2023',
    source: 'Cambridge IGCSE Chemistry 0620 syllabus, assessment overview.',
    papers: sciencePapers(),
  },
  biology: {
    subject: 'biology',
    syllabusCode: '0610',
    seriesLabel: 'for examination from 2023',
    source: 'Cambridge IGCSE Biology 0610 syllabus, assessment overview.',
    papers: sciencePapers(),
  },

  ict: {
    subject: 'ict',
    syllabusCode: '0417',
    seriesLabel: 'for examination from 2023',
    source: 'Cambridge IGCSE Information and Communication Technology 0417 syllabus, assessment overview.',
    papers: [
      {
        number: '1',
        name: 'Theory',
        tier: 'ALL',
        calculator: 'NOT_APPLICABLE',
        minutes: 90,
        marks: 80,
        weight: 40,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '2',
        name: 'Document Production, Databases and Presentations',
        tier: 'ALL',
        calculator: 'NOT_APPLICABLE',
        minutes: 135,
        marks: 70,
        weight: 30,
        style: 'PRACTICAL',
        buildable: false,
        note: 'Marked on the files you produce in real software. It has to be practised in the applications themselves.',
      },
      {
        number: '3',
        name: 'Spreadsheets and Website Authoring',
        tier: 'ALL',
        calculator: 'NOT_APPLICABLE',
        minutes: 135,
        marks: 70,
        weight: 30,
        style: 'PRACTICAL',
        buildable: false,
        note: 'Marked on the files you produce in real software. It has to be practised in the applications themselves.',
      },
    ],
  },

  maths: {
    subject: 'maths',
    syllabusCode: '0580',
    seriesLabel: 'for examination from 2025',
    source: 'Cambridge IGCSE Mathematics 0580 assessment overview, 2025-2027 structure.',
    papers: [
      {
        number: '1',
        name: 'Non-calculator (Core)',
        tier: 'CORE',
        calculator: 'NOT_ALLOWED',
        minutes: 90,
        marks: 80,
        weight: 50,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '2',
        name: 'Non-calculator (Extended)',
        tier: 'EXTENDED',
        calculator: 'NOT_ALLOWED',
        minutes: 120,
        marks: 100,
        weight: 50,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '3',
        name: 'Calculator (Core)',
        tier: 'CORE',
        calculator: 'ALLOWED',
        minutes: 90,
        marks: 80,
        weight: 50,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '4',
        name: 'Calculator (Extended)',
        tier: 'EXTENDED',
        calculator: 'ALLOWED',
        minutes: 120,
        marks: 100,
        weight: 50,
        style: 'THEORY',
        buildable: true,
      },
    ],
  },

  'add-maths': {
    subject: 'add-maths',
    syllabusCode: '0606',
    seriesLabel: 'for examination from 2025',
    source: 'Cambridge IGCSE Additional Mathematics 0606 assessment overview and 2025 specimen papers.',
    papers: [
      {
        number: '1',
        name: 'Non-calculator',
        tier: 'ALL',
        calculator: 'NOT_ALLOWED',
        minutes: 120,
        marks: 80,
        weight: 50,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '2',
        name: 'Calculator',
        tier: 'ALL',
        calculator: 'ALLOWED',
        minutes: 120,
        marks: 80,
        weight: 50,
        style: 'THEORY',
        buildable: true,
      },
    ],
  },

  'intl-maths': {
    subject: 'intl-maths',
    syllabusCode: '0607',
    seriesLabel: 'for examination from 2025',
    source: 'Cambridge IGCSE International Mathematics 0607 assessment overview, 2025-2027 structure.',
    papers: [
      {
        number: '1',
        name: 'Non-calculator (Core)',
        tier: 'CORE',
        calculator: 'NOT_ALLOWED',
        minutes: 75,
        marks: 60,
        weight: 40,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '2',
        name: 'Non-calculator (Extended)',
        tier: 'EXTENDED',
        calculator: 'NOT_ALLOWED',
        minutes: 90,
        marks: 75,
        weight: 40,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '3',
        name: 'Calculator (Core)',
        tier: 'CORE',
        calculator: 'ALLOWED',
        minutes: 75,
        marks: 60,
        weight: 40,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '4',
        name: 'Calculator (Extended)',
        tier: 'EXTENDED',
        calculator: 'ALLOWED',
        minutes: 90,
        marks: 75,
        weight: 40,
        style: 'THEORY',
        buildable: true,
      },
      {
        number: '5',
        name: 'Investigation (Core)',
        tier: 'CORE',
        calculator: 'ALLOWED',
        minutes: 75,
        marks: 40,
        weight: 20,
        style: 'INVESTIGATION',
        buildable: false,
        note: 'One long open investigation with a graphics calculator, marked on how you explore and generalise. A bank of short questions cannot imitate it.',
      },
      {
        number: '6',
        name: 'Investigation and Modelling (Extended)',
        tier: 'EXTENDED',
        calculator: 'ALLOWED',
        minutes: 90,
        marks: 50,
        weight: 20,
        style: 'INVESTIGATION',
        buildable: false,
        note: 'Open investigation and modelling with a graphics calculator, marked on how you explore and generalise. A bank of short questions cannot imitate it.',
      },
    ],
  },
};

export function blueprintFor(subject: SubjectSlug): SubjectBlueprint {
  return BLUEPRINTS[subject];
}

export function paperFor(subject: SubjectSlug, number: string): PaperBlueprint | null {
  return BLUEPRINTS[subject].papers.find((p) => p.number === number) ?? null;
}

/** The papers a predicted version can honestly be built for. */
export function buildablePapers(subject: SubjectSlug): PaperBlueprint[] {
  return BLUEPRINTS[subject].papers.filter((p) => p.buildable);
}

/**
 * The paper a student should be shown first: the Extended theory paper, which
 * carries the most marks and is what "the exam" means to most candidates.
 */
export function defaultPaper(subject: SubjectSlug): PaperBlueprint {
  const buildable = buildablePapers(subject);
  return (
    buildable.find((p) => p.style === 'THEORY' && p.tier === 'EXTENDED') ??
    buildable.find((p) => p.style === 'THEORY') ??
    buildable[0]
  );
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}
