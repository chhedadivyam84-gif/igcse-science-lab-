/**
 * Marking a numerical answer.
 *
 * This is the part of the platform a student notices when it is wrong, because
 * being told a right answer is wrong is worse than no marking at all. The rules
 * it has to cope with:
 *
 *   - Students type what a keyboard allows. "m/s2", "m/s^2", "ms^-2" and
 *     "m s⁻²" are the same unit and all four must be accepted.
 *   - Thousands separators are normal. "90,000" and "90 000" are 90000.
 *   - Standard form arrives in half a dozen spellings: "3×10^8", "3 x 10^8",
 *     "3e8", "3 × 10⁸".
 *   - Model answers often carry an equivalent in brackets — "150 000 Pa
 *     (150 kPa)" — and either form is a correct answer.
 *
 * What it must NOT do is wave things through. cm² and cm³ are different units
 * and a student who writes the wrong one has made exactly the mistake this
 * subject cares about, so superscripts are compared, not stripped.
 */

/** Tolerance on the value, as a fraction. Covers sensible rounding. */
const TOLERANCE = 0.015;

const SUPERSCRIPTS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

export type NumericMark = {
  correct: boolean;
  /** The value was right, whatever happened to the unit. */
  numberCorrect: boolean;
  /** The value was right but the unit was missing or wrong. */
  unitProblem: boolean;
};

/**
 * Rewrites the many ways a student can type the same thing into one form.
 * Applied to both sides before anything is compared.
 */
function normalise(text: string): string {
  return (
    text
      .toLowerCase()
      // Unicode minus, en dash and hyphen variants all mean minus.
      .replace(/[−‒–—]/g, '-')
      // Superscript digits become ^n; a superscript minus becomes ^-.
      .replace(/⁻/g, '^-')
      .replace(new RegExp(`[${SUPERSCRIPTS}]+`, 'g'), (run) =>
        `^${[...run].map((c) => SUPERSCRIPTS.indexOf(c)).join('')}`,
      )
      // "^-" followed by "^2" from the two rules above collapses to "^-2".
      .replace(/\^-\^/g, '^-')
      // Multiplication written in any of its usual ways, including the ASCII
      // "x" students reach for when there is no × on the keyboard. Only between
      // a digit and a power of ten, so an algebraic x is left alone.
      .replace(/[×✕✖·∙]/g, '*')
      .replace(/(\d)\s*x\s*(?=10)/g, '$1*')
      // Thousands separators, comma or space — the model answers use spaces
      // ("150 000 Pa") and students type commas ("150,000"). Only between a
      // digit and a group of exactly three, so "3 * 10^8" and "5 kg" survive.
      .replace(/(\d)[ ,](?=\d{3}(?:\D|$))/g, '$1')
  );
}

/**
 * A model answer may offer equivalents: "150 000 Pa (150 kPa)", "0.5 or 1/2".
 * Each is independently acceptable, so they are marked separately.
 */
function alternatives(expected: string): string[] {
  const forms = normalise(expected)
    // Split on brackets and on the words used to separate equivalents.
    .split(/[()]|\bor\b|\bi\.e\.\b|;/)
    .map((part) => part.trim())
    .filter(Boolean);
  return forms.length ? forms : [normalise(expected).trim()];
}

/**
 * Matches a value in any of its spellings, capturing the exponent separately:
 * "150000", "2.0e-3", "3 * 10^8", "9*10^-4".
 */
const NUMBER = /(-?\d+(?:\.\d+)?)(?:\s*\*\s*10\s*\^?\s*(-?\d+)|\s*e\s*(-?\d+))?/;

/**
 * The first value in an already-normalised string, and where it ends so the
 * unit can be read from what follows.
 *
 * Matching the whole numeric expression in one regex — rather than walking
 * characters and guessing where the number stops — is what makes "2.0e-3 mol"
 * work. The character walk treated the "e" as the start of the unit.
 */
function readNumber(normalised: string): { value: number; endsAt: number } | null {
  const match = normalised.match(NUMBER);
  if (!match) return null;

  const mantissa = Number(match[1]);
  const exponent = match[2] ?? match[3];
  const value = exponent === undefined ? mantissa : mantissa * Math.pow(10, Number(exponent));
  if (!Number.isFinite(value)) return null;

  return { value, endsAt: (match.index ?? 0) + match[0].length };
}

/**
 * Compound units students write without a separator.
 *
 * "m s⁻²" with a space already resolves correctly, but "ms⁻²" is genuinely
 * ambiguous — it could be an inverse-square millisecond — so it is listed
 * explicitly rather than split by guesswork.
 */
const UNIT_ALIASES: Record<string, string> = {
  'ms^-2': 'm/s^2',
  'ms^-1': 'm/s',
  'gcm^-3': 'g/cm^3',
  'kgm^-3': 'kg/m^3',
  'nm^-2': 'n/m^2',
  'nkg^-1': 'n/kg',
  'jkg^-1': 'j/kg',
  'wm^-2': 'w/m^2',
  'moldm^-3': 'mol/dm^3',
};

/**
 * Turns a unit into a canonical token list, so equivalent spellings match.
 *
 * "m/s^2", "ms^-2" and "m s⁻²" all become "m^1 s^-2".
 */
function canonicalUnit(raw: string): string {
  const cleaned = raw
    .replace(/[*·]/g, ' ')
    .replace(/[.,;]+$/, '')
    .trim();
  if (!cleaned) return '';

  const expanded = UNIT_ALIASES[cleaned.replace(/\s+/g, '')] ?? cleaned;
  const [numerator, ...denominators] = expanded.split('/');

  const tokens: string[] = [];
  const push = (part: string, sign: number) => {
    for (const piece of part.split(/\s+/).filter(Boolean)) {
      const match = piece.match(/^([a-zµμΩ°%]+)(?:\^?(-?\d+))?$/i);
      if (!match) {
        // Anything unrecognised is kept verbatim so it still has to match.
        tokens.push(piece);
        continue;
      }
      const power = Number(match[2] ?? '1') * sign;
      tokens.push(`${match[1]}^${power}`);
    }
  };

  push(numerator, 1);
  for (const denominator of denominators) push(denominator, -1);

  return tokens.sort().join(' ');
}

/** Splits an answer into its value and its canonical unit. */
function parse(text: string): { value: number | null; unit: string } {
  const normalised = normalise(text).trim();
  const number = readNumber(normalised);
  if (!number) return { value: null, unit: canonicalUnit(normalised) };
  return { value: number.value, unit: canonicalUnit(normalised.slice(number.endsAt)) };
}

/**
 * Last resort when the canonical forms differ: compare the raw unit as a sorted
 * character multiset. This accepts "15 Nm" for "15 N m", where the tokeniser
 * cannot tell whether "nm" is newton-metre or nanometre, while still keeping
 * cm² and cm³ apart because their digits differ.
 */
function looselyEqualUnit(a: string, b: string): boolean {
  if (!a || !b) return false;

  // Only when every token on both sides is a first power. "N m" and "Nm" are
  // the same torque; cm² and cm³ are not the same thing at all, and neither are
  // m/s² and m², so anything carrying a power other than 1 is excluded here.
  const firstPowersOnly = (unit: string) =>
    unit.split(' ').every((token) => token.endsWith('^1'));
  if (!firstPowersOnly(a) || !firstPowersOnly(b)) return false;

  const letters = (unit: string) =>
    [...unit.replace(/\^1/g, '').replace(/\s/g, '')].sort().join('');
  return letters(a) === letters(b);
}

export function markNumerical(response: string, expected: string): NumericMark {
  // Both sides are split the same way. A student who types the model answer
  // exactly — including an equivalent in brackets — must be marked correct,
  // which splitting only the expected side got wrong.
  const givenForms = alternatives(response).map(parse).filter((f) => f.value !== null);
  const given = givenForms[0] ?? parse(response);
  const forms = alternatives(expected).map(parse).filter((f) => f.value !== null);

  // Neither side is numeric: fall back to comparing the text itself.
  if (given.value === null || !forms.length) {
    return {
      correct: normalise(response).trim() === normalise(expected).trim(),
      numberCorrect: false,
      unitProblem: false,
    };
  }

  let numberCorrect = false;
  let matchedWithUnit = false;
  let anyUnitExpected = false;

  for (const form of forms) {
    const tolerance = Math.max(Math.abs(form.value as number) * TOLERANCE, 1e-9);
    for (const candidate of givenForms.length ? givenForms : [given]) {
      if (candidate.value === null) continue;
      if (Math.abs(candidate.value - (form.value as number)) > tolerance) continue;
      numberCorrect = true;
      if (form.unit) anyUnitExpected = true;
      if (!form.unit || form.unit === candidate.unit || looselyEqualUnit(form.unit, candidate.unit)) {
        matchedWithUnit = true;
        break;
      }
    }
    if (matchedWithUnit) break;
  }

  return {
    correct: matchedWithUnit,
    numberCorrect,
    unitProblem: numberCorrect && !matchedWithUnit && anyUnitExpected,
  };
}
