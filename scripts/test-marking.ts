import { markNumerical } from '../src/lib/marking';

type Case = { response: string; expected: string; want: 'correct' | 'unit' | 'wrong'; why: string };

const cases: Case[] = [
  // --- prefixes and rounding (added) --------------------------------------
  { response: '1.5 kN', expected: '1500 N', want: 'correct', why: 'kilo prefix' },
  { response: '250 mm', expected: '0.25 m', want: 'correct', why: 'milli prefix on metre' },
  { response: '25 cm', expected: '0.25 m', want: 'correct', why: 'centi prefix' },
  { response: '2500 g', expected: '2.5 kg', want: 'correct', why: 'grams for kilograms' },
  { response: '0.5 kW', expected: '500 W', want: 'correct', why: 'kilowatt' },
  { response: '1.5 kN', expected: '15 N', want: 'wrong', why: 'prefix applied, value wrong' },
  { response: '4.9 m/s', expected: '4.93 m/s', want: 'correct', why: '2 s.f. rounding' },
  { response: '5 m/s', expected: '4.93 m/s', want: 'wrong', why: '1 s.f. is too coarse' },
  { response: '0.33 A', expected: '0.333 A', want: 'correct', why: '2 s.f.' },
  { response: '2.2 Ω', expected: '2.17 Ω', want: 'correct', why: 'rounded 2 s.f.' },
  { response: '15 cm2', expected: '0.0015 m²', want: 'correct', why: 'cm² to m²' },

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

// Regression guard for the loose-unit fallback: it must never equate a unit
// with a different power, or "m/s²" would pass as "m²".
import { markNumerical as mk } from '../src/lib/marking';
const guards: [string, string, boolean][] = [
  ['9.8 m²', '9.8 m/s²', false],
  ['9.8 m/s', '9.8 m/s²', false],
  ['15 Nm', '15 N m', true],
  ['15 N m', '15 N m', true],
  ['24 cm²', '24 cm³', false],
  ['2.7 g/cm3', '2.7 g/cm³', true],
];
let g = 0;
for (const [r, e, want] of guards) {
  const got = mk(r, e).correct;
  if (got === want) g++;
  else console.log(`GUARD FAIL: "${r}" vs "${e}" want ${want} got ${got}`);
}
console.log(`${g}/${guards.length} unit guards passed`);
if (g !== guards.length) process.exit(1);
