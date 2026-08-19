/** Shared vocabulary for content, AI output and student activity. */

/**
 * Every subject the platform teaches.
 *
 * Widening this union is the single switch that adds a subject: the curriculum
 * seed, accent colours, knowledge map and progress maths all derive from it
 * rather than repeating the literals, so a subject cannot be half-added and
 * silently missing from one screen.
 */
export type SubjectSlug = 'physics' | 'chemistry' | 'biology' | 'ict';
export type Tier = 'CORE' | 'SUPPLEMENT';
export type Origin = 'AUTHORED' | 'AI_GENERATED';
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type Provenance = 'UNVERIFIED' | 'TEACHER_MAPPED' | 'OFFICIAL_CHECKED';

export const TUTOR_MODES = ['SIMPLE', 'IGCSE', 'DEEP', 'EXAM', 'SOCRATIC'] as const;
export type TutorMode = (typeof TUTOR_MODES)[number];

export const TUTOR_MODE_META: Record<
  TutorMode,
  { label: string; blurb: string; hint: string }
> = {
  SIMPLE: {
    label: 'Simple',
    blurb: 'Plain words, everyday comparisons, no jargon.',
    hint: 'Best when a topic has never made sense before.',
  },
  IGCSE: {
    label: 'IGCSE',
    blurb: 'Pitched exactly at Cambridge IGCSE level.',
    hint: 'The default. Uses the vocabulary the papers use.',
  },
  DEEP: {
    label: 'Deep',
    blurb: 'The underlying physics/chemistry, beyond the syllabus.',
    hint: 'Clearly separates what is examinable from what is extra.',
  },
  EXAM: {
    label: 'Exam',
    blurb: 'What a marker is actually looking for.',
    hint: 'Command words, mark allocation, phrasing that scores.',
  },
  SOCRATIC: {
    label: 'Socratic',
    blurb: 'Guides you with questions instead of handing over answers.',
    hint: 'Slower, but it sticks.',
  },
};

export const QUESTION_TYPES = ['MCQ', 'STRUCTURED', 'NUMERICAL', 'GRAPH', 'DIAGRAM'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const DIFFICULTIES = ['FOUNDATION', 'STANDARD', 'CHALLENGE'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const MISTAKE_CATEGORIES = [
  'CONCEPTUAL',
  'CALCULATION',
  'UNIT',
  'FORMULA',
  'MISREAD',
  'DEFINITION',
  'GRAPH',
] as const;
export type MistakeCategory = (typeof MISTAKE_CATEGORIES)[number];

export const MISTAKE_META: Record<
  MistakeCategory,
  { label: string; description: string; remedy: string }
> = {
  CONCEPTUAL: {
    label: 'Conceptual error',
    description: 'The idea itself was misunderstood, not the arithmetic.',
    remedy: 'Re-read the concept, then explain it out loud without notes.',
  },
  CALCULATION: {
    label: 'Calculation error',
    description: 'Right method, wrong arithmetic.',
    remedy: 'Slow down on the substitution line and re-check with estimation.',
  },
  UNIT: {
    label: 'Unit error',
    description: 'Missing units, or a prefix converted incorrectly.',
    remedy: 'Revise SI units → prefixes → standard form before the next paper.',
  },
  FORMULA: {
    label: 'Formula error',
    description: 'Wrong equation chosen, or rearranged incorrectly.',
    remedy: 'Drill the formula sheet and practise rearranging before substituting.',
  },
  MISREAD: {
    label: 'Misreading the question',
    description: 'The command word or a given value was missed.',
    remedy: 'Underline the command word and every number before answering.',
  },
  DEFINITION: {
    label: 'Definition error',
    description: 'The definition was close but not in examinable wording.',
    remedy: 'Learn the exact wording — definitions are usually all-or-nothing marks.',
  },
  GRAPH: {
    label: 'Graph error',
    description: 'Axes, gradient or area interpreted incorrectly.',
    remedy: 'Practise reading gradient and area meanings for each graph type.',
  },
};

export const PRACTICE_MODES = [
  'quick',
  'topic',
  'mixed',
  'challenge',
  'exam',
  'timed',
  'weak',
  'random',
] as const;
export type PracticeMode = (typeof PRACTICE_MODES)[number];

// --- Notes -----------------------------------------------------------------

export type NoteStyle = 'clean' | 'notebook' | 'revision' | 'mindmap' | 'formula';

export type NoteBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'definition'; term: string; statement: string }
  | { type: 'formula'; expression: string; meaning: string; unit?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'exam'; title: string; text: string }
  | { type: 'mindmap'; centre: string; branches: { label: string; leaves: string[] }[] }
  | { type: 'diagram'; diagramKey: string; caption: string };

export type NoteDoc = {
  title: string;
  subtitle?: string;
  style: NoteStyle;
  blocks: NoteBlock[];
  /** Subtopic numbers the content was grounded in, e.g. ["4.5", "4.2"]. */
  sourceRefs: string[];
  /** True when a live model wrote the prose; false for curriculum-only notes. */
  aiAssisted: boolean;
};

// --- Diagrams --------------------------------------------------------------

/**
 * Diagrams are described as data and drawn as SVG on the client. Scientific
 * accuracy comes from the shape list, not from an image model.
 */
export type DiagramNode =
  | { kind: 'box'; id: string; x: number; y: number; w: number; h: number; label: string; tone?: string }
  | { kind: 'circle'; id: string; x: number; y: number; r: number; label?: string; tone?: string }
  | { kind: 'line'; id: string; x1: number; y1: number; x2: number; y2: number; tone?: string; dashed?: boolean }
  | { kind: 'arrow'; id: string; x1: number; y1: number; x2: number; y2: number; label?: string; tone?: string }
  | { kind: 'label'; id: string; x: number; y: number; text: string; anchor?: 'start' | 'middle' | 'end'; tone?: string }
  | { kind: 'coil'; id: string; x: number; y: number; w: number; h: number; turns: number; tone?: string }
  | { kind: 'field'; id: string; x: number; y: number; w: number; h: number; density?: number; tone?: string }
  | { kind: 'wave'; id: string; x: number; y: number; w: number; h: number; cycles: number; tone?: string }
  | { kind: 'curve'; id: string; points: [number, number][]; tone?: string; dashed?: boolean };

export type DiagramSpec = {
  title: string;
  caption: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  keyTerms: { term: string; meaning: string }[];
  explanation: string[];
  sourceRefs: string[];
  aiAssisted: boolean;
};

// --- Explainer storyboards -------------------------------------------------

export type StoryboardScene = {
  id: string;
  title: string;
  /** Narration text; also used as the caption track. */
  narration: string;
  seconds: number;
  /** Key into the animated-scene registry, or 'diagram' to render `diagram`. */
  visual: string;
  diagram?: DiagramSpec;
  bullets: string[];
};

export type Storyboard = {
  title: string;
  subject: SubjectSlug;
  scenes: StoryboardScene[];
  sourceRefs: string[];
  aiAssisted: boolean;
};

// --- Explain Anything ------------------------------------------------------

export type ExplainResult = {
  question: string;
  simple: string;
  igcse: string;
  analogy: string;
  diagram: DiagramSpec | null;
  keyTerms: { term: string; meaning: string }[];
  formulae: { expression: string; meaning: string }[];
  workedExample: { prompt: string; steps: string[]; answer: string } | null;
  commonMistake: string;
  examQuestion: { stem: string; marks: number; markScheme: string[] };
  quiz: { stem: string; options: string[]; answerIndex: number; why: string }[];
  sourceRefs: string[];
  aiAssisted: boolean;
};

// --- Planning --------------------------------------------------------------

export type PlanItem = {
  id: string;
  label: string;
  subject: SubjectSlug | null;
  subtopicNumber: string | null;
  href: string;
  minutes: number;
  kind: 'learn' | 'practice' | 'flashcards' | 'exam' | 'simulation' | 'review';
  reason: string;
  done: boolean;
};
