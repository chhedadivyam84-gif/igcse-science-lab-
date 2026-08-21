import type { PracticalSeed } from '../types';
import { physicsPractical } from './physics';
import { chemistryPractical } from './chemistry';
import { biologyPractical } from './biology';

/**
 * Alternative-to-Practical questions for the three sciences.
 *
 * Paper 6 is worth 20% of Physics, Chemistry and Biology and is a written
 * paper, so leaving it out of the predicted papers ignored a fifth of each
 * qualification. It examines experimental skill rather than syllabus theory —
 * reading instruments, tabulating, plotting, spotting the source of an error —
 * so these questions are marked `practical` and are deliberately kept out of
 * the theory papers, which would otherwise fill up with apparatus questions.
 *
 * Paper 5, the practical test, has no equivalent here and never will: it is sat
 * at a bench with real apparatus, and nothing on a screen substitutes for that.
 */
export const practicalSeeds: PracticalSeed[] = [
  ...physicsPractical,
  ...chemistryPractical,
  ...biologyPractical,
];
