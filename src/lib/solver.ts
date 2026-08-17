import { sigFig } from './utils';

/**
 * Equation solver for the physics calculator.
 *
 * Most IGCSE equations are a product or a quotient, so those are handled
 * generically — including every rearrangement — and only genuinely different
 * shapes (squares, reciprocals, ratios) need their own entry.
 *
 * Every solve returns the working, not just the answer: formula → rearrangement
 * → substitution → result → unit.
 */

export type SolverVariable = {
  symbol: string;
  label: string;
  unit: string;
};

type Relation =
  /** out = factors[0] × factors[1] × … */
  | { kind: 'product'; out: string; factors: string[] }
  /** out = numerator ÷ denominator */
  | { kind: 'quotient'; out: string; numerator: string; denominator: string }
  /** Anything else, with hand-written rearrangements. */
  | {
      kind: 'custom';
      solve: (known: Record<string, number>, target: string) => { value: number; steps: string[] } | null;
    };

export type SolverEntry = {
  key: string;
  name: string;
  expression: string;
  variables: SolverVariable[];
  resultUnit: string;
  relation: Relation;
  note?: string;
};

const p = (out: string, ...factors: string[]): Relation => ({ kind: 'product', out, factors });
const q = (out: string, numerator: string, denominator: string): Relation => ({
  kind: 'quotient',
  out,
  numerator,
  denominator,
});

export const SOLVERS: SolverEntry[] = [
  {
    key: 'speed',
    name: 'Speed',
    expression: 'v = s / t',
    variables: [
      { symbol: 'v', label: 'Speed', unit: 'm/s' },
      { symbol: 's', label: 'Distance', unit: 'm' },
      { symbol: 't', label: 'Time', unit: 's' },
    ],
    resultUnit: 'm/s',
    relation: q('v', 's', 't'),
  },
  {
    key: 'acceleration',
    name: 'Acceleration',
    expression: 'a = Δv / t',
    variables: [
      { symbol: 'a', label: 'Acceleration', unit: 'm/s²' },
      { symbol: 'Δv', label: 'Change in velocity', unit: 'm/s' },
      { symbol: 't', label: 'Time', unit: 's' },
    ],
    resultUnit: 'm/s²',
    relation: q('a', 'Δv', 't'),
  },
  {
    key: 'density',
    name: 'Density',
    expression: 'ρ = m / V',
    variables: [
      { symbol: 'ρ', label: 'Density', unit: 'kg/m³' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'V', label: 'Volume', unit: 'm³' },
    ],
    resultUnit: 'kg/m³',
    relation: q('ρ', 'm', 'V'),
  },
  {
    key: 'weight',
    name: 'Weight',
    expression: 'W = m g',
    variables: [
      { symbol: 'W', label: 'Weight', unit: 'N' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'g', label: 'Gravitational field strength', unit: 'N/kg' },
    ],
    resultUnit: 'N',
    relation: p('W', 'm', 'g'),
    note: 'On Earth g ≈ 9.8 N/kg (10 N/kg is usually accepted).',
  },
  {
    key: 'force',
    name: "Newton's second law",
    expression: 'F = m a',
    variables: [
      { symbol: 'F', label: 'Resultant force', unit: 'N' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'a', label: 'Acceleration', unit: 'm/s²' },
    ],
    resultUnit: 'N',
    relation: p('F', 'm', 'a'),
    note: 'F must be the resultant force, not one of several forces.',
  },
  {
    key: 'moment',
    name: 'Moment of a force',
    expression: 'M = F d',
    variables: [
      { symbol: 'M', label: 'Moment', unit: 'N m' },
      { symbol: 'F', label: 'Force', unit: 'N' },
      { symbol: 'd', label: 'Perpendicular distance from pivot', unit: 'm' },
    ],
    resultUnit: 'N m',
    relation: p('M', 'F', 'd'),
  },
  {
    key: 'momentum',
    name: 'Momentum',
    expression: 'p = m v',
    variables: [
      { symbol: 'p', label: 'Momentum', unit: 'kg m/s' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'v', label: 'Velocity', unit: 'm/s' },
    ],
    resultUnit: 'kg m/s',
    relation: p('p', 'm', 'v'),
  },
  {
    key: 'kinetic-energy',
    name: 'Kinetic energy',
    expression: 'Ek = ½ m v²',
    variables: [
      { symbol: 'Ek', label: 'Kinetic energy', unit: 'J' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'v', label: 'Speed', unit: 'm/s' },
    ],
    resultUnit: 'J',
    note: 'The speed is squared — doubling v quadruples Ek.',
    relation: {
      kind: 'custom',
      solve: (known, target) => {
        if (target === 'Ek') {
          const value = 0.5 * known.m * known.v ** 2;
          return {
            value,
            steps: [
              'Ek = ½ m v²',
              `Ek = ½ × ${known.m} × ${known.v}²`,
              `Ek = ½ × ${known.m} × ${sigFig(known.v ** 2, 4)}`,
            ],
          };
        }
        if (target === 'm') {
          const value = (2 * known.Ek) / known.v ** 2;
          return {
            value,
            steps: ['Ek = ½ m v²', 'm = 2Ek / v²', `m = (2 × ${known.Ek}) / ${known.v}²`],
          };
        }
        if (target === 'v') {
          const value = Math.sqrt((2 * known.Ek) / known.m);
          return {
            value,
            steps: ['Ek = ½ m v²', 'v = √(2Ek / m)', `v = √((2 × ${known.Ek}) / ${known.m})`],
          };
        }
        return null;
      },
    },
  },
  {
    key: 'gravitational-pe',
    name: 'Change in gravitational potential energy',
    expression: 'ΔEp = m g Δh',
    variables: [
      { symbol: 'ΔEp', label: 'Change in g.p.e.', unit: 'J' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'g', label: 'Gravitational field strength', unit: 'N/kg' },
      { symbol: 'Δh', label: 'Change in height', unit: 'm' },
    ],
    resultUnit: 'J',
    relation: p('ΔEp', 'm', 'g', 'Δh'),
  },
  {
    key: 'work',
    name: 'Work done',
    expression: 'W = F d',
    variables: [
      { symbol: 'W', label: 'Work done', unit: 'J' },
      { symbol: 'F', label: 'Force', unit: 'N' },
      { symbol: 'd', label: 'Distance in the direction of the force', unit: 'm' },
    ],
    resultUnit: 'J',
    relation: p('W', 'F', 'd'),
  },
  {
    key: 'power',
    name: 'Power',
    expression: 'P = E / t',
    variables: [
      { symbol: 'P', label: 'Power', unit: 'W' },
      { symbol: 'E', label: 'Energy transferred', unit: 'J' },
      { symbol: 't', label: 'Time', unit: 's' },
    ],
    resultUnit: 'W',
    relation: q('P', 'E', 't'),
  },
  {
    key: 'efficiency',
    name: 'Efficiency',
    expression: 'efficiency = useful output ÷ total input',
    variables: [
      { symbol: 'eff', label: 'Efficiency (0–1)', unit: '' },
      { symbol: 'Eout', label: 'Useful output energy', unit: 'J' },
      { symbol: 'Ein', label: 'Total input energy', unit: 'J' },
    ],
    resultUnit: '(no unit — × 100 for %)',
    relation: q('eff', 'Eout', 'Ein'),
    note: 'Efficiency can never exceed 1. If it does, the fraction is upside down.',
  },
  {
    key: 'pressure',
    name: 'Pressure',
    expression: 'p = F / A',
    variables: [
      { symbol: 'p', label: 'Pressure', unit: 'Pa' },
      { symbol: 'F', label: 'Force', unit: 'N' },
      { symbol: 'A', label: 'Area', unit: 'm²' },
    ],
    resultUnit: 'Pa',
    relation: q('p', 'F', 'A'),
  },
  {
    key: 'liquid-pressure',
    name: 'Pressure difference in a liquid',
    expression: 'Δp = ρ g Δh',
    variables: [
      { symbol: 'Δp', label: 'Pressure difference', unit: 'Pa' },
      { symbol: 'ρ', label: 'Density', unit: 'kg/m³' },
      { symbol: 'g', label: 'Gravitational field strength', unit: 'N/kg' },
      { symbol: 'Δh', label: 'Change in depth', unit: 'm' },
    ],
    resultUnit: 'Pa',
    relation: p('Δp', 'ρ', 'g', 'Δh'),
  },
  {
    key: 'boyles-law',
    name: 'Fixed mass of gas at constant temperature',
    expression: 'p₁V₁ = p₂V₂',
    variables: [
      { symbol: 'p₁', label: 'Initial pressure', unit: 'Pa' },
      { symbol: 'V₁', label: 'Initial volume', unit: 'm³' },
      { symbol: 'p₂', label: 'Final pressure', unit: 'Pa' },
      { symbol: 'V₂', label: 'Final volume', unit: 'm³' },
    ],
    resultUnit: 'matches the quantity you are finding',
    note: 'Only valid at constant temperature for a fixed mass of gas.',
    relation: {
      kind: 'custom',
      solve: (known, target) => {
        const map: Record<string, [string, string, string]> = {
          'p₁': ['p₂', 'V₂', 'V₁'],
          'V₁': ['p₂', 'V₂', 'p₁'],
          'p₂': ['p₁', 'V₁', 'V₂'],
          'V₂': ['p₁', 'V₁', 'p₂'],
        };
        const entry = map[target];
        if (!entry) return null;
        const [a, b, c] = entry;
        const value = (known[a] * known[b]) / known[c];
        return {
          value,
          steps: ['p₁V₁ = p₂V₂', `${target} = (${a} × ${b}) / ${c}`, `${target} = (${known[a]} × ${known[b]}) / ${known[c]}`],
        };
      },
    },
  },
  {
    key: 'specific-heat',
    name: 'Specific heat capacity',
    expression: 'E = m c Δθ',
    variables: [
      { symbol: 'E', label: 'Energy transferred', unit: 'J' },
      { symbol: 'm', label: 'Mass', unit: 'kg' },
      { symbol: 'c', label: 'Specific heat capacity', unit: 'J/(kg °C)' },
      { symbol: 'Δθ', label: 'Temperature change', unit: '°C' },
    ],
    resultUnit: 'J',
    relation: p('E', 'm', 'c', 'Δθ'),
    note: 'Water has c = 4200 J/(kg °C).',
  },
  {
    key: 'wave-equation',
    name: 'Wave equation',
    expression: 'v = f λ',
    variables: [
      { symbol: 'v', label: 'Wave speed', unit: 'm/s' },
      { symbol: 'f', label: 'Frequency', unit: 'Hz' },
      { symbol: 'λ', label: 'Wavelength', unit: 'm' },
    ],
    resultUnit: 'm/s',
    relation: p('v', 'f', 'λ'),
  },
  {
    key: 'time-period',
    name: 'Time period and frequency',
    expression: 'T = 1 / f',
    variables: [
      { symbol: 'T', label: 'Time period', unit: 's' },
      { symbol: 'f', label: 'Frequency', unit: 'Hz' },
    ],
    resultUnit: 's',
    relation: {
      kind: 'custom',
      solve: (known, target) => {
        if (target === 'T') return { value: 1 / known.f, steps: ['T = 1 / f', `T = 1 / ${known.f}`] };
        if (target === 'f') return { value: 1 / known.T, steps: ['T = 1 / f', 'f = 1 / T', `f = 1 / ${known.T}`] };
        return null;
      },
    },
  },
  {
    key: 'refractive-index',
    name: 'Refractive index',
    expression: 'n = sin i / sin r',
    variables: [
      { symbol: 'n', label: 'Refractive index', unit: '' },
      { symbol: 'i', label: 'Angle of incidence', unit: '°' },
      { symbol: 'r', label: 'Angle of refraction', unit: '°' },
    ],
    resultUnit: '(no unit)',
    note: 'Angles are measured from the normal, never from the surface.',
    relation: {
      kind: 'custom',
      solve: (known, target) => {
        const rad = (deg: number) => (deg * Math.PI) / 180;
        const deg = (r: number) => (r * 180) / Math.PI;

        if (target === 'n') {
          const value = Math.sin(rad(known.i)) / Math.sin(rad(known.r));
          return {
            value,
            steps: [
              'n = sin i / sin r',
              `n = sin ${known.i}° / sin ${known.r}°`,
              `n = ${sigFig(Math.sin(rad(known.i)), 4)} / ${sigFig(Math.sin(rad(known.r)), 4)}`,
            ],
          };
        }
        if (target === 'i') {
          const sine = known.n * Math.sin(rad(known.r));
          if (sine > 1) return null;
          return {
            value: deg(Math.asin(sine)),
            steps: ['n = sin i / sin r', 'sin i = n × sin r', `sin i = ${known.n} × sin ${known.r}°`],
          };
        }
        if (target === 'r') {
          const sine = Math.sin(rad(known.i)) / known.n;
          if (sine > 1) return null;
          return {
            value: deg(Math.asin(sine)),
            steps: ['n = sin i / sin r', 'sin r = sin i / n', `sin r = sin ${known.i}° / ${known.n}`],
          };
        }
        return null;
      },
    },
  },
  {
    key: 'current',
    name: 'Current and charge',
    expression: 'I = Q / t',
    variables: [
      { symbol: 'I', label: 'Current', unit: 'A' },
      { symbol: 'Q', label: 'Charge', unit: 'C' },
      { symbol: 't', label: 'Time', unit: 's' },
    ],
    resultUnit: 'A',
    relation: q('I', 'Q', 't'),
  },
  {
    key: 'potential-difference',
    name: 'Potential difference',
    expression: 'V = E / Q',
    variables: [
      { symbol: 'V', label: 'Potential difference', unit: 'V' },
      { symbol: 'E', label: 'Energy transferred', unit: 'J' },
      { symbol: 'Q', label: 'Charge', unit: 'C' },
    ],
    resultUnit: 'V',
    relation: q('V', 'E', 'Q'),
    note: 'One volt is one joule per coulomb.',
  },
  {
    key: 'ohms-law',
    name: "Ohm's law",
    expression: 'V = I R',
    variables: [
      { symbol: 'V', label: 'Potential difference', unit: 'V' },
      { symbol: 'I', label: 'Current', unit: 'A' },
      { symbol: 'R', label: 'Resistance', unit: 'Ω' },
    ],
    resultUnit: 'V',
    relation: p('V', 'I', 'R'),
    note: 'Valid for a metallic conductor at constant temperature.',
  },
  {
    key: 'electrical-power',
    name: 'Electrical power',
    expression: 'P = I V',
    variables: [
      { symbol: 'P', label: 'Power', unit: 'W' },
      { symbol: 'I', label: 'Current', unit: 'A' },
      { symbol: 'V', label: 'Potential difference', unit: 'V' },
    ],
    resultUnit: 'W',
    relation: p('P', 'I', 'V'),
  },
  {
    key: 'electrical-energy',
    name: 'Electrical energy',
    expression: 'E = I V t',
    variables: [
      { symbol: 'E', label: 'Energy transferred', unit: 'J' },
      { symbol: 'I', label: 'Current', unit: 'A' },
      { symbol: 'V', label: 'Potential difference', unit: 'V' },
      { symbol: 't', label: 'Time', unit: 's' },
    ],
    resultUnit: 'J',
    relation: p('E', 'I', 'V', 't'),
  },
  {
    key: 'transformer',
    name: 'Transformer turns ratio',
    expression: 'Vp / Vs = Np / Ns',
    variables: [
      { symbol: 'Vp', label: 'Primary voltage', unit: 'V' },
      { symbol: 'Vs', label: 'Secondary voltage', unit: 'V' },
      { symbol: 'Np', label: 'Primary turns', unit: '' },
      { symbol: 'Ns', label: 'Secondary turns', unit: '' },
    ],
    resultUnit: 'matches the quantity you are finding',
    relation: {
      kind: 'custom',
      solve: (known, target) => {
        // Vp·Ns = Vs·Np, so every rearrangement is a product over a single term.
        const map: Record<string, [string, string, string]> = {
          Vp: ['Vs', 'Np', 'Ns'],
          Vs: ['Vp', 'Ns', 'Np'],
          Np: ['Ns', 'Vp', 'Vs'],
          Ns: ['Np', 'Vs', 'Vp'],
        };
        const entry = map[target];
        if (!entry) return null;
        const [a, b, c] = entry;
        return {
          value: (known[a] * known[b]) / known[c],
          steps: [
            'Vp / Vs = Np / Ns',
            `${target} = (${a} × ${b}) / ${c}`,
            `${target} = (${known[a]} × ${known[b]}) / ${known[c]}`,
          ],
        };
      },
    },
  },
  {
    key: 'orbital-speed',
    name: 'Orbital speed',
    expression: 'v = 2πr / T',
    variables: [
      { symbol: 'v', label: 'Orbital speed', unit: 'm/s' },
      { symbol: 'r', label: 'Orbital radius', unit: 'm' },
      { symbol: 'T', label: 'Orbital period', unit: 's' },
    ],
    resultUnit: 'm/s',
    relation: {
      kind: 'custom',
      solve: (known, target) => {
        if (target === 'v')
          return {
            value: (2 * Math.PI * known.r) / known.T,
            steps: ['v = 2πr / T', `v = (2 × π × ${known.r}) / ${known.T}`],
          };
        if (target === 'r')
          return {
            value: (known.v * known.T) / (2 * Math.PI),
            steps: ['v = 2πr / T', 'r = vT / 2π', `r = (${known.v} × ${known.T}) / (2 × π)`],
          };
        if (target === 'T')
          return {
            value: (2 * Math.PI * known.r) / known.v,
            steps: ['v = 2πr / T', 'T = 2πr / v', `T = (2 × π × ${known.r}) / ${known.v}`],
          };
        return null;
      },
    },
  },
];

export type SolveResult = {
  value: number;
  formatted: string;
  unit: string;
  steps: string[];
  warnings: string[];
};

export function solverFor(key: string) {
  return SOLVERS.find((entry) => entry.key === key);
}

/** Solves for `target` given every other variable. Returns null if not possible. */
export function solve(entry: SolverEntry, known: Record<string, number>, target: string): SolveResult | null {
  const targetVariable = entry.variables.find((v) => v.symbol === target);
  if (!targetVariable) return null;

  const missing = entry.variables.filter((v) => v.symbol !== target && !Number.isFinite(known[v.symbol]));
  if (missing.length) return null;

  let value: number;
  let steps: string[];

  if (entry.relation.kind === 'product') {
    const { out, factors } = entry.relation;
    if (target === out) {
      value = factors.reduce((total, symbol) => total * known[symbol], 1);
      steps = [entry.expression, `${out} = ${factors.map((s) => known[s]).join(' × ')}`];
    } else {
      const others = factors.filter((s) => s !== target);
      const denominator = others.reduce((total, symbol) => total * known[symbol], 1);
      value = known[out] / denominator;
      steps = [
        entry.expression,
        `${target} = ${out} / (${others.join(' × ')})`,
        `${target} = ${known[out]} / (${others.map((s) => known[s]).join(' × ')})`,
      ];
    }
  } else if (entry.relation.kind === 'quotient') {
    const { out, numerator, denominator } = entry.relation;
    if (target === out) {
      value = known[numerator] / known[denominator];
      steps = [entry.expression, `${out} = ${known[numerator]} / ${known[denominator]}`];
    } else if (target === numerator) {
      value = known[out] * known[denominator];
      steps = [entry.expression, `${numerator} = ${out} × ${denominator}`, `${numerator} = ${known[out]} × ${known[denominator]}`];
    } else {
      value = known[numerator] / known[out];
      steps = [entry.expression, `${denominator} = ${numerator} / ${out}`, `${denominator} = ${known[numerator]} / ${known[out]}`];
    }
  } else {
    const result = entry.relation.solve(known, target);
    if (!result) return null;
    value = result.value;
    steps = result.steps;
  }

  if (!Number.isFinite(value)) return null;

  const warnings: string[] = [];
  if (entry.key === 'efficiency' && target === 'eff' && value > 1) {
    warnings.push(
      'Efficiency came out above 1 (100%), which is impossible. Check that the useful output and total input are the right way round.',
    );
  }
  if (value < 0 && ['m', 'V', 't', 'A', 'R'].includes(target)) {
    warnings.push(`A negative ${targetVariable.label.toLowerCase()} is not physically meaningful — check your inputs.`);
  }

  steps.push(`${target} = ${sigFig(value, 4)} ${targetVariable.unit}`.trim());

  return {
    value,
    formatted: sigFig(value, 3),
    unit: targetVariable.unit,
    steps,
    warnings,
  };
}

/** SI prefixes offered in the calculator, with the factor each represents. */
export const PREFIXES: { label: string; symbol: string; factor: number }[] = [
  { label: 'nano', symbol: 'n', factor: 1e-9 },
  { label: 'micro', symbol: 'µ', factor: 1e-6 },
  { label: 'milli', symbol: 'm', factor: 1e-3 },
  { label: 'centi', symbol: 'c', factor: 1e-2 },
  { label: 'none', symbol: '', factor: 1 },
  { label: 'kilo', symbol: 'k', factor: 1e3 },
  { label: 'mega', symbol: 'M', factor: 1e6 },
  { label: 'giga', symbol: 'G', factor: 1e9 },
];
