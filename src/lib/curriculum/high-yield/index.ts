import type { HighYieldSeed } from '../types';
import { physicsHighYield } from './physics';
import { chemistryHighYield } from './chemistry';
import { biologyHighYield } from './biology';
import { ictHighYield } from './ict';
import { mathsHighYield } from './maths';
import { addMathsHighYield } from './add-maths';
import { intlMathsHighYield } from './intl-maths';

/**
 * The question forms that recur across series, for every subject.
 *
 * What is being claimed, stated once here so it can be quoted in the UI and
 * checked by anyone reviewing the content:
 *
 *   These are the forms of question that the published syllabus and its
 *   assessment objectives make examinable year after year. The ranking is
 *   teaching judgement about how reliably each form appears. It is not a
 *   Cambridge statistic, it is not derived from leaked material, and no
 *   question here reproduces past-paper text — every stem, mark scheme and
 *   explanation was written for this platform.
 *
 * Anything that would misrepresent this — calling it "the real questions",
 * quoting a frequency percentage, implying endorsement — must not be added to
 * the UI. The value is that these are the right things to practise, not that
 * they are secret.
 */
export const HIGH_YIELD_BASIS =
  'Compiled from the published syllabus and its assessment objectives. These are the question forms that recur, ranked by teaching judgement — not a Cambridge statistic, and no past-paper text is reproduced.';

export const highYieldSeeds: HighYieldSeed[] = [
  ...physicsHighYield,
  ...chemistryHighYield,
  ...biologyHighYield,
  ...ictHighYield,
  ...mathsHighYield,
  ...addMathsHighYield,
  ...intlMathsHighYield,
];
