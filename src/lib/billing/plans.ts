/**
 * Plans, pricing and the free/paid feature split.
 *
 * Deliberately free of server imports so the pricing page, the paywall and the
 * API guards all read the same definitions — the marketing copy and the actual
 * enforcement can never disagree.
 */

export type PlanId = 'TRIAL' | 'FREE' | 'PRO';
export type Interval = 'MONTHLY' | 'YEARLY';

/** Length of the full-access trial every new account gets. */
export const TRIAL_DAYS = 30;

export const PRICING: Record<Interval, { amountMinor: number; label: string; per: string; note?: string }> = {
  MONTHLY: { amountMinor: 29900, label: '₹299', per: 'per month' },
  YEARLY: {
    amountMinor: 249900,
    label: '₹2,499',
    per: 'per year',
    note: 'Two months free compared with monthly',
  },
};

export function formatPrice(amountMinor: number, currency = 'INR'): string {
  const major = amountMinor / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: major % 1 === 0 ? 0 : 2,
  }).format(major);
}

/** Everything that can be gated. Add here, then add to PREMIUM_FEATURES if paid. */
export const FEATURES = [
  'tutor',
  'explain',
  'notes',
  'diagram',
  'explainer',
  'photo',
  'question-generation',
  'voice',
] as const;

export type Feature = (typeof FEATURES)[number];

/**
 * The paid set: everything that calls a model on the student's behalf.
 *
 * The reasoning is deliberate — these are the features that cost money per
 * request, so they are what a subscription pays for. Everything the platform
 * already holds (syllabus, lessons, simulations, calculators, the periodic
 * table, flashcards, the authored question bank, exam mode and progress
 * tracking) stays free forever, so the free tier is genuinely worth using.
 */
export const PREMIUM_FEATURES: ReadonlySet<Feature> = new Set<Feature>([
  'tutor',
  'explain',
  'notes',
  'diagram',
  'explainer',
  'photo',
  'question-generation',
  'voice',
]);

export const FEATURE_META: Record<Feature, { label: string; blurb: string; href: string }> = {
  tutor: { label: 'NOVA AI tutor', blurb: 'Five explanation modes, grounded in your syllabus', href: '/tutor' },
  explain: { label: 'Explain Anything', blurb: 'One question becomes a full mini-lesson', href: '/explain' },
  notes: { label: 'Handwritten notes generator', blurb: 'Five revision styles, export to PDF', href: '/notes' },
  diagram: { label: 'Diagram generator', blurb: 'Labelled scientific diagrams on demand', href: '/diagrams' },
  explainer: { label: 'Animated explainers', blurb: 'Narrated concept walkthroughs', href: '/explainer' },
  photo: { label: 'Photo help', blurb: 'Photograph your working and get it explained', href: '/tutor' },
  voice: { label: 'Talk to NOVA', blurb: 'Hands-free spoken tutoring, like a private tutor', href: '/voice' },
  'question-generation': {
    label: 'Unlimited AI questions',
    blurb: 'Generate fresh practice beyond the authored bank',
    href: '/practice',
  },
};

/** What the free tier keeps forever. Used as marketing copy and as a promise. */
export const FREE_FOREVER = [
  'The complete Physics 0625 and Chemistry 0620 syllabus',
  'Every written lesson, worked example and exam tip',
  'All interactive simulations',
  'Interactive periodic table',
  'Mole and physics calculators with full working',
  'The entire authored question bank',
  'Exam mode with timer and mark schemes',
  'Flashcards with spaced repetition',
  'Progress tracking, mistake analysis and study planner',
];

export const PLAN_META: Record<PlanId, { label: string; tone: 'accent' | 'positive' | 'neutral' }> = {
  TRIAL: { label: 'Free trial', tone: 'accent' },
  FREE: { label: 'Free', tone: 'neutral' },
  PRO: { label: 'Pro', tone: 'positive' },
};
