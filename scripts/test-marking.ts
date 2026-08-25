import { markNumerical } from '../src/lib/marking';

type Case = { response: string; expected: string; want: 'correct' | 'unit' | 'wrong'; why: string };

const cases: Case[] = [
  // --- the reported failures ---------------------------------------------
  { response: '150000 Pa', expected: '150 000 Pa (150 kPa)', want: 'correct', why: 'model answer carries an equivalent in brackets' },
  { response: '150 kPa', expected: '150 000 Pa (150 kPa)', want: 'correct', why: 'the bracketed equivalent is also right' },
  { response: '90000 J', expected: '90 000 J (90 kJ)', want: 'correct', why: 'same, energy' },
  { response: '90 kJ', expected: '90 000 J (90 kJ)', want: 'correct', why: 'same, equivalent form' },
  { response: '90,000 J', expected: '90 000 J (90 kJ)', want: 'correct', why: 'comma thousands separator' },

  // --- units a keyboard can and cannot type -------------------------------
  { response: '1.5 m/s2', expected: '1.5 m/s²', want: 'correct', why: 'plain digit for a superscript' },
  { response: '1.5 m/s^2', expected: '1.5 m/s²', want: 'correct', why: 'caret form' },
  { response: '1.5 ms^-2', expected: '1.5 m/s²', want: 'correct', why: 'negative index form' },
  { response: '1.5 m s⁻²', expected: '1.5 m/s²', want: 'correct', why: 'unicode superscript minus' },
  { response: '1.5 m/s²', expected: '1.5 m/s²', want: 'correct', why: 'exact' },

  // --- but wrong units must still be wrong --------------------------------
  { response: '24.8 cm2', expected: '24.8 cm³', want: 'unit', why: 'cm² is NOT cm³ — must not be waved through' },
  { response: '24.8 cm³', expected: '24.8 cm³', want: 'correct', why: 'right unit' },
  { response: '5.0 m/s', expected: '5.0 m/s²', want: 'unit', why: 'missing the squared' },

  // --- standard form ------------------------------------------------------
  { response: '3e8', expected: '3.0 × 10⁸ m/s', want: 'unit', why: 'value right, unit missing' },
  { response: '3 x 10^8 m/s', expected: '3.0 × 10⁸ m/s', want: 'correct', why: 'ascii standard form' },
  { response: '3.0 × 10⁸ m/s', expected: '3.0 × 10⁸ m/s', want: 'correct', why: 'exact' },
  { response: '2.0e-3 mol', expected: '2.00 × 10⁻³ mol', want: 'correct', why: 'negative exponent, e-notation' },

  // --- rounding tolerance --------------------------------------------------
  { response: '1.71 N', expected: '1.7 N', want: 'correct', why: 'within 1.5%' },
  { response: '1.9 N', expected: '1.7 N', want: 'wrong', why: 'outside tolerance' },
  { response: '2.64 g/cm3', expected: '2.64 g/cm³', want: 'correct', why: 'density with typed digit' },

  // --- no unit expected ----------------------------------------------------
  { response: '0.60', expected: '0.60', want: 'correct', why: 'Rf value, dimensionless' },
  { response: '0.6', expected: '0.60', want: 'correct', why: 'trailing zero' },

  // --- unit required, omitted ---------------------------------------------
  { response: '90000', expected: '90 000 J (90 kJ)', want: 'unit', why: 'value right, no unit given' },

  // --- percentages ---------------------------------------------------------
  { response: '37.5%', expected: '37.5%', want: 'correct', why: 'percent sign' },
  { response: '37.5 %', expected: '37.5%', want: 'correct', why: 'spaced percent' },
];

let pass = 0;
const failures: string[] = [];
for (const c of cases) {
  const r = markNumerical(c.response, c.expected);
  const got = r.correct ? 'correct' : r.unitProblem ? 'unit' : 'wrong';
  if (got === c.want) pass++;
  else failures.push(`  "${c.response}"  vs  "${c.expected}"\n      want ${c.want}, got ${got}  — ${c.why}`);
}

console.log(`${pass}/${cases.length} passed`);
if (failures.length) {
  console.log('\nFAILURES:');
  console.log(failures.join('\n'));
  process.exit(1);
}
