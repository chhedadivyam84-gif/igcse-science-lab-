import { type GenFlashcard, type Made, type Rng, type Template, card, mcq, n, sf } from './core';

const M = (sub: string, make: (r: Rng) => Made | null, extra: Partial<Template> = {}): Template => ({
  subject: 'maths',
  subtopic: sub,
  make,
  ...extra,
});

function ans(stem: string, value: number | string, working: string, opts: Partial<Made> = {}): Made {
  const answer = typeof value === 'number' ? sf(value, 3) : value;
  return { stem, answer, markScheme: [`${answer} (${opts.marks ?? 2})`], explanation: `${working} = ${answer}.`, ...opts };
}

function choice(r: Rng, stem: string, correct: string, wrong: string[], explanation: string, extra: Partial<Made> = {}): Made | null {
  const o = mcq(r, correct, wrong);
  return o ? { stem, ...o, explanation, ...extra } : null;
}

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
const frac = (p: number, q: number) => {
  const g = gcd(p, q);
  const [a, b] = [p / g, q / g];
  return b === 1 ? `${a}` : `${a}/${b}`;
};
const signed = (k: number, first = false) => (k < 0 ? `${first ? '−' : ' − '}${-k}` : `${first ? '' : ' + '}${k}`);
const term = (k: number, v: string, first = false) =>
  k === 0 ? '' : `${k < 0 ? (first ? '−' : ' − ') : first ? '' : ' + '}${Math.abs(k) === 1 ? '' : Math.abs(k)}${v}`;
const deg = Math.PI / 180;

export const mathsTemplates: Template[] = [
  // --- 1.1 Number ----------------------------------------------------------------
  M('1.1', (r) => {
    const g = r.pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 15]), a = g * r.int(2, 12), b = g * r.int(2, 12);
    if (a === b) return null;
    return ans(`Find the highest common factor (HCF) of ${a} and ${b}.`, gcd(a, b), `Prime factorise both and multiply the common factors: HCF(${a}, ${b})`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 50 }),
  M('1.1', (r) => {
    const a = r.int(3, 30), b = r.int(3, 30);
    if (a === b) return null;
    return ans(`Find the lowest common multiple (LCM) of ${a} and ${b}.`, lcm(a, b), `LCM = ${a} × ${b} ÷ HCF = ${a * b} ÷ ${gcd(a, b)}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 50 }),
  M('1.1', (r) => {
    const ps = [2, 2, 3, 3, 5, 7].filter(() => r.next() < 0.6);
    if (ps.length < 2) return null;
    const value = ps.reduce((a, b) => a * b, 1);
    const counts = new Map<number, number>();
    ps.forEach((p) => counts.set(p, (counts.get(p) ?? 0) + 1));
    const fmt = (m: Map<number, number>) => [...m].sort((a, b) => a[0] - b[0]).map(([p, k]) => (k > 1 ? `${p}${'⁰¹²³⁴⁵'[k]}` : `${p}`)).join(' × ');
    const correct = fmt(counts);
    const w1 = new Map(counts); w1.set(2, (w1.get(2) ?? 0) + 1);
    const w2 = new Map(counts); w2.delete([...counts.keys()][0]); w2.set(11, 1);
    return choice(r, `Write ${value} as a product of its prime factors.`, correct, [fmt(w1), fmt(w2), `${value / ps[0]} × ${ps[0]}`], `Divide repeatedly by primes: ${value} = ${correct}.`);
  }, { count: 30 }),

  // --- 1.2 Fractions, decimals, percentages -------------------------------------------
  M('1.2', (r) => {
    const p = r.pick([5, 10, 12.5, 15, 17.5, 20, 25, 30, 35, 40, 45, 60, 65, 75, 80, 85, 120, 150]), x = r.int(4, 900) * r.pick([1, 2, 5]);
    return ans(`Find ${p}% of ${x}.`, (p * x) / 100, `${p} ÷ 100 × ${x}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('1.2', (r) => {
    const b = r.int(3, 12), a = r.int(1, b - 1), x = b * r.int(2, 40);
    return ans(`Find ${frac(a, b)} of ${x}.`, (a * x) / b, `${x} ÷ ${b} × ${a}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 50 }),
  M('1.2', (r) => {
    const a = r.int(1, 9), b = r.int(2, 10), c = r.int(1, 9), d = r.int(2, 10);
    const op = r.pick(['+', '−', '×', '÷']);
    let p: number, q: number;
    if (op === '+') [p, q] = [a * d + c * b, b * d];
    else if (op === '−') [p, q] = [a * d - c * b, b * d];
    else if (op === '×') [p, q] = [a * c, b * d];
    else [p, q] = [a * d, b * c];
    if (p <= 0) return null;
    const correct = frac(p, q);
    return choice(r, `Work out ${frac(a, b)} ${op} ${frac(c, d)}, giving your answer as a fraction in its simplest form.`, correct, [frac(a + c, b + d), frac(p + 1, q), frac(p, q + 1), frac(a * c + 1, b + d)], `${op === '÷' ? 'Multiply by the reciprocal' : op === '×' ? 'Multiply numerators and denominators' : 'Use a common denominator of ' + b * d}: the answer simplifies to ${correct}.`);
  }, { count: 60 }),
  M('1.2', (r) => {
    const d = r.pick([0.125, 0.2, 0.25, 0.375, 0.4, 0.45, 0.6, 0.625, 0.75, 0.8, 0.875, 0.05, 0.35, 0.65]);
    return ans(`Write ${d} as a percentage.`, `${n(d * 100)}%`, `${d} × 100`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 14 }),

  // --- 1.3 Indices and standard form ------------------------------------------------
  M('1.3', (r) => {
    const base = r.pick([2, 3, 5, 7, 10, 'x', 'a', 'y']), a = r.int(2, 9), b = r.int(2, 9);
    const op = r.pick(['×', '÷', 'pow'] as const);
    const power = op === '×' ? a + b : op === '÷' ? a - b : a * b;
    const expr = op === 'pow' ? `(${base}${sup(a)})${sup(b)}` : `${base}${sup(a)} ${op} ${base}${sup(b)}`;
    return choice(r, `Simplify ${expr}, leaving your answer as a power of ${base}.`, `${base}${sup(power)}`, [`${base}${sup(a * b)}`, `${base}${sup(a + b)}`, `${base}${sup(a - b)}`, `${base}${sup(Math.abs(power) + 1)}`], `${op === '×' ? 'Add the indices' : op === '÷' ? 'Subtract the indices' : 'Multiply the indices'}: ${base}${sup(power)}.`);
  }, { count: 60 }),
  M('1.3', (r) => {
    const [base, root, power] = r.pick([[8, 3, 2], [27, 3, 2], [16, 4, 3], [25, 2, 3], [64, 3, 2], [81, 4, 3], [32, 5, 2], [9, 2, 3], [4, 2, 5], [125, 3, 2], [16, 2, 3], [100, 2, 3]] as const);
    const value = Math.pow(Math.round(Math.pow(base, 1 / root)), power);
    return ans(`Evaluate ${base}^(${power}/${root}).`, value, `Take the ${root === 2 ? 'square' : root === 3 ? 'cube' : `${root}th`} root of ${base} (${Math.round(Math.pow(base, 1 / root))}) then raise to the power ${power}`, { marks: 2 });
  }, { count: 12 }),
  M('1.3', (r) => {
    const mant = r.step(1.1, 9.9, 0.1), exp = r.int(-6, 9);
    if (exp === 0) return null;
    const value = mant * Math.pow(10, exp);
    const plain = exp > 0 ? n(Number(value.toPrecision(3))) : value.toFixed(-exp + 1).replace(/0+$/, '');
    return choice(r, `Write ${plain} in standard form.`, `${mant} × 10${sup(exp)}`, [`${mant} × 10${sup(exp + 1)}`, `${mant} × 10${sup(exp - 1)}`, `${n(mant * 10)} × 10${sup(exp - 1)}`, `${mant} × 10${sup(-exp)}`], `Move the decimal point so one non-zero digit is in front: ${mant} × 10${sup(exp)}.`);
  }, { count: 60 }),
  M('1.3', (r) => {
    const a = r.step(1.5, 9.5, 0.5), b = r.step(1.2, 8, 0.2), p = r.int(2, 8), q = r.int(2, 8);
    const op = r.pick(['×', '÷'] as const);
    const value = op === '×' ? a * Math.pow(10, p) * b * Math.pow(10, q) : (a * Math.pow(10, p)) / (b * Math.pow(10, q));
    return ans(`Work out (${a} × 10${sup(p)}) ${op} (${b} × 10${sup(q)}). Give your answer in standard form.`, sfStd(value), `${op === '×' ? 'Multiply' : 'Divide'} the numbers and ${op === '×' ? 'add' : 'subtract'} the powers, then adjust to standard form`);
  }, { count: 50 }),

  // --- 1.4 Ratio, proportion, percentage change ---------------------------------------
  M('1.4', (r) => {
    const a = r.int(1, 9), b = r.int(1, 9), k = r.int(2, 60), total = (a + b) * k;
    const who = r.pick([['Ali', 'Ben'], ['Maya', 'Leo'], ['Priya', 'Sam'], ['Zara', 'Omar']]);
    return ans(`${total} is shared between ${who[0]} and ${who[1]} in the ratio ${a} : ${b}. How much does ${who[0]} get?`, a * k, `${total} ÷ (${a} + ${b}) × ${a}`, { difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('1.4', (r) => {
    const x = r.int(20, 2000), p = r.pick([2, 3, 4, 5, 8, 10, 12, 15, 17.5, 20, 25, 30, 35]);
    const up = r.pick([true, false]);
    return ans(`${up ? 'Increase' : 'Decrease'} ${x} by ${p}%.`, up ? x * (1 + p / 100) : x * (1 - p / 100), `${x} × ${up ? 1 + p / 100 : n(1 - p / 100)}`, { difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('1.4', (r) => {
    const old = r.int(20, 900), nw = old + r.int(-old + 5, old);
    if (nw === old) return null;
    return ans(`A price changes from $${old} to $${nw}. Calculate the percentage ${nw > old ? 'increase' : 'decrease'}.`, `${sf((Math.abs(nw - old) / old) * 100)}%`, `${Math.abs(nw - old)} ÷ ${old} × 100`);
  }, { count: 60 }),
  M('1.4', (r) => {
    const orig = r.int(10, 500) * 2, p = r.pick([5, 10, 12, 15, 20, 25, 30, 40]);
    const up = r.pick([true, false]);
    const after = up ? orig * (1 + p / 100) : orig * (1 - p / 100);
    return ans(`After a ${p}% ${up ? 'increase' : 'reduction'}, a price is $${n(after)}. What was the original price?`, orig, `${n(after)} ÷ ${up ? 1 + p / 100 : n(1 - p / 100)} (reverse percentage)`, { difficulty: 'CHALLENGE', marks: 3, hint: 'Divide by the multiplier — do not take the percentage off again.' });
  }, { count: 60 }),
  M('1.4', (r) => {
    const P = r.int(1, 50) * 100, rate = r.pick([1.5, 2, 2.5, 3, 3.5, 4, 5, 6]), y = r.int(2, 10);
    const compound = r.pick([true, false]);
    const value = compound ? P * Math.pow(1 + rate / 100, y) : P * (1 + (rate * y) / 100);
    return ans(`$${P} is invested at ${rate}% per year ${compound ? 'compound' : 'simple'} interest. What is it worth after ${y} years? Give your answer to the nearest cent.`, `$${value.toFixed(2)}`, compound ? `${P} × ${1 + rate / 100}^${y}` : `${P} + ${P} × ${rate / 100} × ${y}`, { marks: compound ? 3 : 2, difficulty: compound ? 'CHALLENGE' : 'STANDARD' });
  }, { count: 60 }),
  M('1.4', (r) => {
    const k = r.int(2, 12), x1 = r.int(2, 10), x2 = r.int(2, 20);
    const inverse = r.pick([true, false]);
    const y1 = inverse ? (k * 60) / x1 : k * x1;
    const y2 = inverse ? (k * 60) / x2 : k * x2;
    return ans(`y is ${inverse ? 'inversely' : 'directly'} proportional to x. When x = ${x1}, y = ${n(y1)}. Find y when x = ${x2}.`, y2, inverse ? `y = k/x with k = ${n(y1 * x1)}, so y = ${n(y1 * x1)} ÷ ${x2}` : `y = kx with k = ${k}, so y = ${k} × ${x2}`);
  }, { count: 60 }),

  // --- 1.5 Bounds and rounding -----------------------------------------------------------
  M('1.5', (r) => {
    const unit = r.pick([1, 10, 0.1, 5, 100, 0.5]), v = r.int(3, 400) * unit;
    const upper = r.pick([true, false]);
    return ans(`A length is ${n(v)} cm, correct to the nearest ${n(unit)} cm. Write down the ${upper ? 'upper' : 'lower'} bound.`, `${n(v + (upper ? unit / 2 : -unit / 2))} cm`, `${n(v)} ${upper ? '+' : '−'} ½ × ${n(unit)}`, { marks: 1 });
  }, { count: 60 }),
  M('1.5', (r) => {
    const x = r.int(1000, 99999) / Math.pow(10, r.int(0, 4)), f = r.int(1, 4);
    return ans(`Round ${x} to ${f} significant figure${f > 1 ? 's' : ''}.`, String(Number(x.toPrecision(f))), `Keep ${f} significant figure${f > 1 ? 's' : ''}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('1.5', (r) => {
    const l = r.int(5, 40), w = r.int(3, 30);
    return ans(`A rectangle measures ${l} cm by ${w} cm, both correct to the nearest cm. Calculate the upper bound of its area.`, `${n((l + 0.5) * (w + 0.5))} cm²`, `${l + 0.5} × ${w + 0.5}`, { difficulty: 'CHALLENGE' });
  }, { count: 40 }),

  // --- 1.6 Surds ----------------------------------------------------------------------------
  M('1.6', (r) => {
    const sq = r.pick([4, 9, 16, 25, 36, 49]), k = r.pick([2, 3, 5, 6, 7, 10, 11]);
    const a = Math.sqrt(sq);
    return choice(r, `Simplify √${sq * k}.`, `${a}√${k}`, [`${k}√${a}`, `${a * 2}√${k}`, `${sq}√${k}`, `√${k}`], `√${sq * k} = √${sq} × √${k} = ${a}√${k}.`);
  }, { count: 40 }),

  // --- 2.1 Expanding and factorising ------------------------------------------------------------
  M('2.1', (r) => {
    const a = r.int(-9, 9), b = r.int(-9, 9);
    if (!a || !b) return null;
    const correct = `x²${term(a + b, 'x')}${signed(a * b)}`.replace(' + 0', '');
    return choice(r, `Expand and simplify (x ${a < 0 ? '−' : '+'} ${Math.abs(a)})(x ${b < 0 ? '−' : '+'} ${Math.abs(b)}).`, correct, [`x²${signed(a * b)}`, `x²${term(a * b, 'x')}${signed(a + b)}`, `x²${term(a + b, 'x')}${signed(-a * b)}`, `2x${signed(a + b)}`], `Multiply every term: x² + (${a} + ${b})x + (${a} × ${b}) = ${correct}.`);
  }, { count: 60 }),
  M('2.1', (r) => {
    const a = r.int(-9, 9), b = r.int(-9, 9);
    if (!a || !b || a === b || a + b === 0) return null;
    const expr = `x²${term(a + b, 'x')}${signed(a * b)}`;
    const f = (p: number, q: number) => `(x ${p < 0 ? '−' : '+'} ${Math.abs(p)})(x ${q < 0 ? '−' : '+'} ${Math.abs(q)})`;
    // Distractors must be genuinely different factorisations: never a
    // reordering of the right one, never a zero term.
    const same = (p: number, q: number) => (p === a && q === b) || (p === b && q === a);
    const wrong = ([[-a, -b], [a, -b], [-a, b], [a + 1, b - 1], [a * b, 1], [a - 1, b + 1]] as const)
      .filter(([p, q]) => p !== 0 && q !== 0 && !same(p, q))
      .map(([p, q]) => f(p, q));
    return choice(r, `Factorise ${expr}.`, f(a, b), wrong, `Find two numbers that multiply to ${a * b} and add to ${a + b}: ${a} and ${b}. So ${f(a, b)}.`);
  }, { count: 60 }),
  M('2.1', (r) => {
    const k = r.int(2, 9), a = r.int(1, 9), b = r.int(1, 9), v = r.pick(['x', 'a', 'y']);
    return choice(r, `Factorise completely ${k * a}${v}² + ${k * b}${v}.`, `${k}${v}(${a}${v} + ${b})`.replace(/\b1(?=[a-z])/g, ''), [`${k}(${a}${v}² + ${b}${v})`, `${v}(${k * a}${v} + ${k * b})`, `${k}${v}(${a}${v} + ${b}${v})`], `Take out the highest common factor, ${k}${v}.`);
  }, { count: 40 }),

  // --- 2.2 Linear equations --------------------------------------------------------------------
  M('2.2', (r) => {
    const x = r.int(-12, 15), a = r.int(2, 12), b = r.int(-30, 30);
    return ans(`Solve ${a}x${signed(b)} = ${a * x + b}.`, x, `${a}x = ${a * x + b}${signed(-b)} = ${a * x}, so x = ${a * x} ÷ ${a}`, { difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('2.2', (r) => {
    const x = r.int(-10, 12), a = r.int(2, 9), b = r.int(-9, 9), c = r.int(1, 8);
    if (a === c) return null;
    const d = a * (x + b) - c * x;
    return ans(`Solve ${a}(x${signed(b)}) = ${c}x${signed(d)}.`, x, `Expand: ${a}x${signed(a * b)} = ${c}x${signed(d)}; collect: ${a - c}x = ${d - a * b}`);
  }, { count: 60 }),
  M('2.2', (r) => {
    const x = r.int(-8, 12), a = r.int(2, 6), b = r.int(1, 9);
    const rhs = (x + b) / a;
    if (!Number.isInteger(rhs)) return null;
    return ans(`Solve (x${signed(b)}) / ${a} = ${rhs}.`, x, `x${signed(b)} = ${rhs * a}`, { difficulty: 'FOUNDATION' });
  }, { count: 40 }),

  // --- 2.3 Simultaneous equations -----------------------------------------------------------------
  M('2.3', (r) => {
    const x = r.int(-6, 8), y = r.int(-6, 8);
    const a1 = r.int(1, 5), b1 = r.int(-5, 5), a2 = r.int(1, 5), b2 = r.int(-5, 5);
    if (!b1 || !b2 || a1 * b2 - a2 * b1 === 0) return null;
    const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    const eq = (a: number, b: number, c: number) => `${a === 1 ? '' : a}x${b < 0 ? ' − ' : ' + '}${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${c}`;
    return choice(r, `Solve the simultaneous equations ${eq(a1, b1, c1)} and ${eq(a2, b2, c2)}.`, `x = ${x}, y = ${y}`, [`x = ${y}, y = ${x}`, `x = ${-x}, y = ${y}`, `x = ${x}, y = ${-y}`, `x = ${x + 1}, y = ${y - 1}`], `Eliminate one variable, solve for the other, then substitute back: x = ${x}, y = ${y}. Check in both equations.`, { marks: 3, difficulty: 'CHALLENGE' });
  }, { count: 60 }),

  // --- 2.4 Inequalities ------------------------------------------------------------------------------
  M('2.4', (r) => {
    const a = r.int(2, 9), x = r.int(-8, 10), b = r.int(-15, 15);
    const s = r.pick(['<', '>', '≤', '≥']);
    const neg = r.pick([false, false, true]);
    const k = neg ? -a : a;
    const flip: Record<string, string> = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' };
    const correct = `x ${neg ? flip[s] : s} ${x}`;
    return choice(r, `Solve ${k}x${signed(b)} ${s} ${k * x + b}.`, correct, [`x ${neg ? s : flip[s]} ${x}`, `x ${s} ${-x}`, `x ${neg ? flip[s] : s} ${x + 1}`], `Subtract ${b}, then divide by ${k}${neg ? ' — dividing by a negative reverses the inequality sign' : ''}: ${correct}.`);
  }, { count: 60 }),

  // --- 2.5 Quadratics --------------------------------------------------------------------------------
  M('2.5', (r) => {
    const p = r.int(-9, 9), q = r.int(-9, 9);
    if (p === q) return null;
    const expr = `x²${term(-(p + q), 'x')}${signed(p * q)}`.replace(' + 0', '');
    const sol = (a: number, b: number) => `x = ${Math.min(a, b)} or x = ${Math.max(a, b)}`;
    return choice(r, `Solve ${expr} = 0.`, sol(p, q), [sol(-p, -q), sol(p, -q), sol(p * q, 1), sol(p + 1, q - 1)], `Factorise to (x ${p < 0 ? '+' : '−'} ${Math.abs(p)})(x ${q < 0 ? '+' : '−'} ${Math.abs(q)}) = 0, so ${sol(p, q)}.`);
  }, { count: 60 }),
  M('2.5', (r) => {
    const a = r.int(1, 4), b = r.int(-9, 9), c = r.int(-12, 6);
    const disc = b * b - 4 * a * c;
    if (disc <= 0 || Number.isInteger(Math.sqrt(disc))) return null;
    const x1 = (-b - Math.sqrt(disc)) / (2 * a), x2 = (-b + Math.sqrt(disc)) / (2 * a);
    const sol = (u: number, v: number) => `x = ${u.toFixed(2)} or x = ${v.toFixed(2)}`;
    return choice(r, `Solve ${a === 1 ? '' : a}x²${term(b, 'x')}${signed(c)} = 0, giving your answers to 2 decimal places.`, sol(x1, x2), [sol(-x2, -x1), sol(x1 * 2, x2 * 2), sol((-b - disc) / (2 * a), (-b + disc) / (2 * a))], `Use the quadratic formula: x = (${-b} ± √${disc}) ÷ ${2 * a}, giving ${sol(x1, x2)}.`, { marks: 3, difficulty: 'CHALLENGE' });
  }, { count: 60 }),

  // --- 2.6 Sequences -----------------------------------------------------------------------------------
  M('2.6', (r) => {
    const d = r.pick([-7, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9, 11]), c = r.int(-10, 15);
    const terms = [1, 2, 3, 4, 5].map((k) => d * k + c);
    const rule = (dd: number, cc: number) => `${dd === 1 ? '' : dd === -1 ? '−' : dd}n${cc ? signed(cc) : ''}`;
    return choice(r, `Find the nth term of the sequence ${terms.join(', ')}, …`, rule(d, c), [rule(d, c + d), rule(c, d), `n${signed(d)}`, rule(d, -c)], `The common difference is ${d}, so the rule is ${d}n + k. When n = 1, ${d} + k = ${terms[0]}, so k = ${c}: ${rule(d, c)}.`);
  }, { count: 60 }),
  M('2.6', (r) => {
    const d = r.int(2, 9), c = r.int(-10, 12), k = r.pick([10, 20, 25, 50, 100]);
    return ans(`The nth term of a sequence is ${d}n${signed(c)}. Find the ${k}th term.`, d * k + c, `${d} × ${k}${signed(c)}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 40 }),
  M('2.6', (r) => {
    const a = r.int(1, 3), b = r.int(-4, 4), c = r.int(-5, 8), k = r.int(4, 12);
    return ans(`The nth term of a sequence is ${a === 1 ? '' : a}n²${term(b, 'n')}${signed(c)}. Find the ${k}th term.`, a * k * k + b * k + c, `${a} × ${k}²${signed(b)} × ${k}${signed(c)}`, { marks: 1 });
  }, { count: 40 }),

  // --- 2.8 Functions -------------------------------------------------------------------------------------
  M('2.8', (r) => {
    const a = r.int(2, 7), b = r.int(-9, 9), c = r.int(1, 5), d = r.int(-6, 6), x = r.int(-5, 6);
    const order = r.pick(['fg', 'gf']);
    const f = (v: number) => a * v + b, g = (v: number) => c * v * v + d;
    const value = order === 'fg' ? f(g(x)) : g(f(x));
    return ans(`f(x) = ${a}x${signed(b)} and g(x) = ${c === 1 ? '' : c}x²${signed(d)}. Find ${order}(${x}).`, value, order === 'fg' ? `g(${x}) = ${g(x)}, then f(${g(x)})` : `f(${x}) = ${f(x)}, then g(${f(x)})`);
  }, { count: 60 }),
  M('2.8', (r) => {
    const a = r.int(2, 9), b = r.int(-12, 12), y = r.int(-20, 40);
    return ans(`f(x) = ${a}x${signed(b)}. Find f⁻¹(${y}).`, (y - b) / a, `f⁻¹(x) = (x${signed(-b)}) ÷ ${a}, so f⁻¹(${y}) = (${y}${signed(-b)}) ÷ ${a}`);
  }, { count: 50 }),

  // --- 3.1 Coordinate geometry -----------------------------------------------------------------------------
  M('3.1', (r) => {
    const x1 = r.int(-8, 8), y1 = r.int(-8, 8), x2 = r.int(-8, 8), y2 = r.int(-8, 8);
    if (x1 === x2) return null;
    return ans(`Find the gradient of the line joining (${x1}, ${y1}) and (${x2}, ${y2}).`, (y2 - y1) / (x2 - x1), `(${y2} − ${y1 < 0 ? `(${y1})` : y1}) ÷ (${x2} − ${x1 < 0 ? `(${x1})` : x1})`);
  }, { count: 60 }),
  M('3.1', (r) => {
    const x1 = r.int(-8, 8), y1 = r.int(-8, 8), x2 = r.int(-8, 8), y2 = r.int(-8, 8);
    if (x1 === x2 && y1 === y2) return null;
    return ans(`Calculate the length of the line segment from (${x1}, ${y1}) to (${x2}, ${y2}).`, Math.hypot(x2 - x1, y2 - y1), `√((${x2 - x1})² + (${y2 - y1})²)`);
  }, { count: 60 }),
  M('3.1', (r) => {
    const x1 = r.int(-9, 9), y1 = r.int(-9, 9), x2 = r.int(-9, 9), y2 = r.int(-9, 9);
    const mid = `(${n((x1 + x2) / 2)}, ${n((y1 + y2) / 2)})`;
    return choice(r, `Find the midpoint of (${x1}, ${y1}) and (${x2}, ${y2}).`, mid, [`(${x2 - x1}, ${y2 - y1})`, `(${n((x2 - x1) / 2)}, ${n((y2 - y1) / 2)})`, `(${x1 + x2}, ${y1 + y2})`], `Average the coordinates: ${mid}.`, { marks: 1 });
  }, { count: 50 }),
  M('3.1', (r) => {
    const m = r.int(-5, 6), x1 = r.int(-6, 6), c = r.int(-9, 9);
    if (!m) return null;
    const y1 = m * x1 + c;
    const line = (mm: number, cc: number) => `y = ${mm === 1 ? '' : mm === -1 ? '−' : mm}x${cc ? signed(cc) : ''}`;
    return choice(r, `Find the equation of the line with gradient ${m} that passes through (${x1}, ${y1}).`, line(m, c), [line(m, y1), line(-m, c), line(m, c + m), line(c, m)], `y − ${y1} = ${m}(x − ${x1}), which rearranges to ${line(m, c)}.`);
  }, { count: 60 }),

  // --- 4.1 Angles and polygons ----------------------------------------------------------------------------------
  M('4.1', (r) => {
    const sides = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]);
    const ask = r.pick(['interior', 'exterior', 'sum']);
    const value = ask === 'exterior' ? 360 / sides : ask === 'interior' ? 180 - 360 / sides : (sides - 2) * 180;
    return ans(`${ask === 'sum' ? `Find the sum of the interior angles of a ${sides}-sided polygon.` : `Find the size of one ${ask} angle of a regular ${sides}-sided polygon.`}`, `${n(value)}°`, ask === 'exterior' ? `360 ÷ ${sides}` : ask === 'interior' ? `180 − 360 ÷ ${sides}` : `(${sides} − 2) × 180`, { difficulty: 'FOUNDATION' });
  }, { count: 36 }),
  M('4.1', (r) => {
    const ext = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120]);
    return ans(`Each exterior angle of a regular polygon is ${ext}°. How many sides does it have?`, 360 / ext, `360 ÷ ${ext}`, { marks: 1 });
  }, { count: 18 }),
  M('4.1', (r) => {
    const a = r.int(20, 100), b = r.int(20, 150 - a);
    return ans(`Two angles of a triangle are ${a}° and ${b}°. Find the third angle.`, `${180 - a - b}°`, `180 − ${a} − ${b}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 40 }),

  // --- 4.2 Circle theorems ------------------------------------------------------------------------------------------
  M('4.2', (r) => {
    const x = r.int(20, 85);
    const kind = r.pick(['centre', 'circ', 'cyclic', 'semi', 'tangent'] as const);
    const map = {
      centre: [`The angle at the circumference subtended by an arc is ${x}°. Find the angle at the centre subtended by the same arc.`, 2 * x, `angle at centre = 2 × angle at circumference = 2 × ${x}`],
      circ: [`The angle at the centre subtended by an arc is ${2 * x}°. Find the angle at the circumference subtended by the same arc.`, x, `angle at circumference = ½ × ${2 * x}`],
      cyclic: [`ABCD is a cyclic quadrilateral. Angle A = ${x + 40}°. Find angle C.`, 180 - x - 40, `opposite angles in a cyclic quadrilateral add up to 180°: 180 − ${x + 40}`],
      semi: [`AB is a diameter of a circle and C is a point on the circumference. Angle CAB = ${x}°. Find angle CBA.`, 90 - x, `angle in a semicircle is 90°, so 180 − 90 − ${x}`],
      tangent: [`A tangent touches a circle at T. O is the centre and P is a point on the tangent. Angle TOP = ${x}°. Find angle OPT.`, 90 - x, `a tangent is perpendicular to the radius, so 180 − 90 − ${x}`],
    } as const;
    const [stem, value, working] = map[kind];
    return ans(stem, `${value}°`, working);
  }, { count: 60 }),

  // --- 5.1 Mensuration ------------------------------------------------------------------------------------------------
  M('5.1', (r) => {
    const shape = r.pick(['rectangle', 'triangle', 'trapezium', 'parallelogram', 'circle', 'circumference'] as const);
    const a = r.int(2, 30), b = r.int(2, 30), h = r.int(2, 20);
    const [stem, value, working] = (
      {
        rectangle: [`Find the area of a rectangle ${a} cm by ${b} cm.`, a * b, `${a} × ${b}`],
        triangle: [`Find the area of a triangle with base ${a} cm and perpendicular height ${h} cm.`, 0.5 * a * h, `½ × ${a} × ${h}`],
        trapezium: [`Find the area of a trapezium with parallel sides ${a} cm and ${b} cm and height ${h} cm.`, 0.5 * (a + b) * h, `½ × (${a} + ${b}) × ${h}`],
        parallelogram: [`Find the area of a parallelogram with base ${a} cm and perpendicular height ${h} cm.`, a * h, `${a} × ${h}`],
        circle: [`Find the area of a circle of radius ${a} cm. Give your answer to 3 significant figures.`, Math.PI * a * a, `π × ${a}²`],
        circumference: [`Find the circumference of a circle of diameter ${a} cm. Give your answer to 3 significant figures.`, Math.PI * a, `π × ${a}`],
      } as const
    )[shape];
    return ans(stem, `${sf(value)} ${shape === 'circumference' ? 'cm' : 'cm²'}`, working, { difficulty: 'FOUNDATION' });
  }, { count: 80 }),
  M('5.1', (r) => {
    const solid = r.pick(['cuboid', 'cylinder', 'cone', 'sphere', 'prism', 'pyramid'] as const);
    const a = r.int(2, 20), b = r.int(2, 15), h = r.int(2, 25);
    const [stem, value, working] = (
      {
        cuboid: [`Find the volume of a cuboid ${a} cm × ${b} cm × ${h} cm.`, a * b * h, `${a} × ${b} × ${h}`],
        cylinder: [`Find the volume of a cylinder of radius ${b} cm and height ${h} cm, to 3 significant figures.`, Math.PI * b * b * h, `π × ${b}² × ${h}`],
        cone: [`Find the volume of a cone of radius ${b} cm and height ${h} cm, to 3 significant figures. (V = ⅓πr²h)`, (Math.PI * b * b * h) / 3, `⅓ × π × ${b}² × ${h}`],
        sphere: [`Find the volume of a sphere of radius ${b} cm, to 3 significant figures. (V = 4/3 πr³)`, (4 / 3) * Math.PI * b ** 3, `4/3 × π × ${b}³`],
        prism: [`A prism has a triangular cross-section of base ${a} cm and height ${b} cm, and length ${h} cm. Find its volume.`, 0.5 * a * b * h, `½ × ${a} × ${b} × ${h}`],
        pyramid: [`Find the volume of a pyramid with a square base of side ${a} cm and height ${h} cm, to 3 significant figures. (V = ⅓ × base area × h)`, (a * a * h) / 3, `⅓ × ${a}² × ${h}`],
      } as const
    )[solid];
    return ans(stem, `${sf(value)} cm³`, working);
  }, { count: 90 }),
  M('5.1', (r) => {
    const solid = r.pick(['cuboid', 'cylinder', 'sphere', 'cube'] as const);
    const a = r.int(2, 15), b = r.int(2, 12), h = r.int(2, 20);
    const [stem, value, working] = (
      {
        cuboid: [`Find the total surface area of a cuboid ${a} cm × ${b} cm × ${h} cm.`, 2 * (a * b + a * h + b * h), `2(${a}×${b} + ${a}×${h} + ${b}×${h})`],
        cylinder: [`Find the total surface area of a closed cylinder of radius ${b} cm and height ${h} cm, to 3 s.f.`, 2 * Math.PI * b * b + 2 * Math.PI * b * h, `2π×${b}² + 2π×${b}×${h}`],
        sphere: [`Find the surface area of a sphere of radius ${b} cm, to 3 s.f. (A = 4πr²)`, 4 * Math.PI * b * b, `4π × ${b}²`],
        cube: [`Find the total surface area of a cube of side ${a} cm.`, 6 * a * a, `6 × ${a}²`],
      } as const
    )[solid];
    return ans(stem, `${sf(value)} cm²`, working);
  }, { count: 60 }),

  // --- 5.2 Arcs and sectors -------------------------------------------------------------------------------------------
  M('5.2', (r) => {
    const rr = r.int(3, 25), th = r.pick([20, 30, 40, 45, 60, 72, 80, 90, 100, 120, 135, 150, 210, 240, 270, 300]);
    const area = r.pick([true, false]);
    return ans(area ? `Find the area of a sector of radius ${rr} cm and angle ${th}°, to 3 s.f.` : `Find the arc length of a sector of radius ${rr} cm and angle ${th}°, to 3 s.f.`, `${sf(area ? (th / 360) * Math.PI * rr * rr : (th / 360) * 2 * Math.PI * rr)} ${area ? 'cm²' : 'cm'}`, area ? `${th}/360 × π × ${rr}²` : `${th}/360 × 2π × ${rr}`);
  }, { count: 80 }),

  // --- 6.1 Pythagoras and trigonometry ---------------------------------------------------------------------------------
  M('6.1', (r) => {
    const a = r.int(3, 25), b = r.int(3, 25);
    return ans(`A right-angled triangle has shorter sides ${a} cm and ${b} cm. Find the length of the hypotenuse, to 3 s.f.`, `${sf(Math.hypot(a, b))} cm`, `√(${a}² + ${b}²)`, { difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('6.1', (r) => {
    const c = r.int(10, 40), a = r.int(3, c - 2);
    return ans(`The hypotenuse of a right-angled triangle is ${c} cm and one other side is ${a} cm. Find the third side, to 3 s.f.`, `${sf(Math.sqrt(c * c - a * a))} cm`, `√(${c}² − ${a}²)`);
  }, { count: 60 }),
  M('6.1', (r) => {
    const ang = r.int(15, 75), side = r.int(4, 30);
    const kind = r.pick(['opp-from-hyp', 'adj-from-hyp', 'opp-from-adj', 'hyp-from-opp'] as const);
    const t = ang * deg;
    const [stem, value, working] = (
      {
        'opp-from-hyp': [`In a right-angled triangle the hypotenuse is ${side} cm and one angle is ${ang}°. Find the side opposite this angle, to 3 s.f.`, side * Math.sin(t), `${side} × sin ${ang}°`],
        'adj-from-hyp': [`In a right-angled triangle the hypotenuse is ${side} cm and one angle is ${ang}°. Find the side adjacent to this angle, to 3 s.f.`, side * Math.cos(t), `${side} × cos ${ang}°`],
        'opp-from-adj': [`In a right-angled triangle the side adjacent to an angle of ${ang}° is ${side} cm. Find the opposite side, to 3 s.f.`, side * Math.tan(t), `${side} × tan ${ang}°`],
        'hyp-from-opp': [`In a right-angled triangle the side opposite an angle of ${ang}° is ${side} cm. Find the hypotenuse, to 3 s.f.`, side / Math.sin(t), `${side} ÷ sin ${ang}°`],
      } as const
    )[kind];
    return ans(stem, `${sf(value)} cm`, working);
  }, { count: 80 }),
  M('6.1', (r) => {
    const o = r.int(3, 20), a = r.int(3, 20);
    const kind = r.pick(['tan', 'sin', 'cos'] as const);
    const h = Math.max(o, a) + r.int(1, 10);
    const [stem, value, working] = (
      {
        tan: [`A right-angled triangle has opposite side ${o} cm and adjacent side ${a} cm. Find the angle, to 1 decimal place.`, Math.atan(o / a) / deg, `tan⁻¹(${o} ÷ ${a})`],
        sin: [`A right-angled triangle has opposite side ${o} cm and hypotenuse ${h} cm. Find the angle, to 1 decimal place.`, Math.asin(o / h) / deg, `sin⁻¹(${o} ÷ ${h})`],
        cos: [`A right-angled triangle has adjacent side ${a} cm and hypotenuse ${h} cm. Find the angle, to 1 decimal place.`, Math.acos(a / h) / deg, `cos⁻¹(${a} ÷ ${h})`],
      } as const
    )[kind];
    return ans(stem, `${value.toFixed(1)}°`, working);
  }, { count: 80 }),

  // --- 6.2 Non-right-angled triangles -----------------------------------------------------------------------------------
  M('6.2', (r) => {
    const a = r.int(4, 20), b = r.int(4, 20), C = r.int(25, 150);
    const kind = r.pick(['cos', 'area'] as const);
    if (kind === 'cos') return ans(`In triangle ABC, a = ${a} cm, b = ${b} cm and angle C = ${C}°. Find c, to 3 s.f.`, `${sf(Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * deg)))} cm`, `c² = ${a}² + ${b}² − 2 × ${a} × ${b} × cos ${C}°`, { marks: 3, difficulty: 'CHALLENGE' });
    return ans(`Find the area of triangle ABC where a = ${a} cm, b = ${b} cm and angle C = ${C}°, to 3 s.f.`, `${sf(0.5 * a * b * Math.sin(C * deg))} cm²`, `½ × ${a} × ${b} × sin ${C}°`);
  }, { count: 80 }),
  M('6.2', (r) => {
    const A = r.int(25, 80), B = r.int(25, 80), a = r.int(5, 25);
    if (A + B >= 170) return null;
    return ans(`In triangle ABC, angle A = ${A}°, angle B = ${B}° and a = ${a} cm. Find b, to 3 s.f.`, `${sf((a * Math.sin(B * deg)) / Math.sin(A * deg))} cm`, `b = ${a} × sin ${B}° ÷ sin ${A}°`, { marks: 3, difficulty: 'CHALLENGE' });
  }, { count: 60 }),

  // --- 7.2 Vectors ------------------------------------------------------------------------------------------------------------
  M('7.2', (r) => {
    const x = r.int(-12, 12), y = r.int(-12, 12);
    if (!x && !y) return null;
    return ans(`Find the magnitude of the vector (${x}, ${y}) written as a column vector, to 3 s.f.`, Math.hypot(x, y), `√(${x}² + ${y}²)`);
  }, { count: 50 }),
  M('7.2', (r) => {
    const [a1, a2, b1, b2] = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)], k = r.int(2, 4), m = r.int(-3, 3);
    if (!m) return null;
    const v = `(${k * a1 + m * b1}, ${k * a2 + m * b2})`;
    return choice(r, `a = (${a1}, ${a2}) and b = (${b1}, ${b2}) as column vectors. Find ${k}a ${m < 0 ? '−' : '+'} ${Math.abs(m) === 1 ? '' : Math.abs(m)}b.`, v, [`(${k * a1 - m * b1}, ${k * a2 - m * b2})`, `(${a1 + m * b1}, ${a2 + m * b2})`, `(${k * a1 + m * b1}, ${k * a2 - m * b2})`], `Multiply each component and add: ${v}.`, { marks: 2 });
  }, { count: 50 }),

  // --- 8.1 / 8.2 Probability -------------------------------------------------------------------------------------------------
  M('8.1', (r) => {
    const red = r.int(1, 9), blue = r.int(1, 9), green = r.int(0, 6), total = red + blue + green;
    const pick = r.pick(['red', 'blue', 'not red'] as const);
    const k = pick === 'red' ? red : pick === 'blue' ? blue : total - red;
    return choice(r, `A bag has ${red} red, ${blue} blue${green ? ` and ${green} green` : ''} counters. One is taken at random. What is the probability it is ${pick}?`, frac(k, total), [frac(total - k, total), frac(k, total + 1), `${k}/${total - k}`, frac(1, total)], `P = favourable ÷ total = ${k}/${total}${frac(k, total) !== `${k}/${total}` ? ` = ${frac(k, total)}` : ''}.`, { difficulty: 'FOUNDATION' });
  }, { count: 60 }),
  M('8.1', (r) => {
    const red = r.int(2, 8), blue = r.int(2, 8), total = red + blue;
    const replace = r.pick([true, false]);
    const p = replace ? [red * red, total * total] : [red * (red - 1), total * (total - 1)];
    return choice(r, `A bag has ${red} red and ${blue} blue sweets. Two are taken at random ${replace ? 'with' : 'without'} replacement. Find the probability that both are red.`, frac(p[0], p[1]), [frac(red * red, total * total + 1), frac(2 * red, total), frac(red * (red - 1), total * total), frac(red, total)].filter((x) => x !== frac(p[0], p[1])), `${red}/${total} × ${replace ? `${red}/${total}` : `${red - 1}/${total - 1}`} = ${frac(p[0], p[1])}.`, { marks: 3, difficulty: 'CHALLENGE' });
  }, { count: 60 }),
  M('8.2', (r) => {
    const p = r.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.75]), trials = r.pick([20, 40, 60, 80, 100, 120, 200, 300, 500]);
    return ans(`The probability of an event is ${p}. How many times would you expect it to happen in ${trials} trials?`, p * trials, `${p} × ${trials}`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 50 }),
  M('8.2', (r) => {
    const t = r.int(20, 400), k = r.int(1, t - 1);
    return ans(`A dice is rolled ${t} times and lands on 6 a total of ${k} times. Find the relative frequency of a 6, as a decimal to 3 s.f.`, k / t, `${k} ÷ ${t}`, { marks: 1 });
  }, { count: 40 }),

  // --- 9.1 Averages -----------------------------------------------------------------------------------------------------------
  M('9.1', (r) => {
    const data = Array.from({ length: r.int(5, 10) }, () => r.int(1, 40));
    const kind = r.pick(['mean', 'median', 'range'] as const);
    const sorted = [...data].sort((a, b) => a - b);
    const value = kind === 'mean' ? data.reduce((a, b) => a + b, 0) / data.length : kind === 'range' ? sorted[sorted.length - 1] - sorted[0] : sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    return ans(`Find the ${kind} of: ${data.join(', ')}.`, value, kind === 'mean' ? `${data.reduce((a, b) => a + b, 0)} ÷ ${data.length}` : kind === 'range' ? `${sorted[sorted.length - 1]} − ${sorted[0]}` : `In order: ${sorted.join(', ')}; the middle value`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 90 }),
  M('9.1', (r) => {
    const values = [0, 1, 2, 3, 4, 5], freq = values.map(() => r.int(1, 12));
    const total = freq.reduce((a, b) => a + b, 0), sum = values.reduce((s, v, i) => s + v * freq[i], 0);
    return ans(`The number of pets owned by students: ${values.map((v, i) => `${v} pets — ${freq[i]} students`).join('; ')}. Calculate the mean number of pets.`, sum / total, `Σfx ÷ Σf = ${sum} ÷ ${total}`, { marks: 3, difficulty: 'CHALLENGE' });
  }, { count: 50 }),
  M('9.1', (r) => {
    const k = r.int(4, 12), mean = r.int(10, 60), extra = r.int(5, 90);
    return ans(`The mean of ${k} numbers is ${mean}. Another number, ${extra}, is added. Find the new mean.`, (k * mean + extra) / (k + 1), `(${k} × ${mean} + ${extra}) ÷ ${k + 1}`);
  }, { count: 40 }),
];

function sup(k: number): string {
  const S = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  return `${k < 0 ? '⁻' : ''}${String(Math.abs(k)).split('').map((d) => S[Number(d)]).join('')}`;
}
function sfStd(v: number): string {
  const exp = Math.floor(Math.log10(Math.abs(v)));
  const mant = Number((v / Math.pow(10, exp)).toPrecision(3));
  return `${mant} × 10^${exp}`;
}

/** Additional Mathematics 0606 and International Mathematics 0607. */
export const addMathsTemplates: Template[] = [
  {
    subject: 'add-maths',
    subtopic: '3.1',
    count: 80,
    make: (r) => {
      const [a, b, c, d] = [r.int(-4, 4), r.int(-6, 6), r.int(-9, 9), r.int(-9, 9)], x = r.int(-4, 4);
      if (!a) return null;
      const grad = 3 * a * x * x + 2 * b * x + c;
      return ans(`y = ${a === 1 ? '' : a === -1 ? '−' : a}x³${term(b, 'x²')}${term(c, 'x')}${signed(d)}. Find the gradient of the curve at x = ${x}.`, grad, `dy/dx = ${3 * a}x²${term(2 * b, 'x')}${signed(c)}; at x = ${x}`, { marks: 3 });
    },
  },
  {
    subject: 'add-maths',
    subtopic: '3.1',
    count: 60,
    make: (r) => {
      const a = r.int(1, 5) * r.pick([1, -1]), x0 = r.int(-6, 6), c = r.int(-10, 10);
      const b = -2 * a * x0;
      const y0 = a * x0 * x0 + b * x0 + c;
      return choice(r, `Find the coordinates of the stationary point of y = ${a === 1 ? '' : a === -1 ? '−' : a}x²${term(b, 'x')}${signed(c)}, and state whether it is a maximum or minimum.`, `(${x0}, ${y0}), ${a > 0 ? 'minimum' : 'maximum'}`, [`(${x0}, ${y0}), ${a > 0 ? 'maximum' : 'minimum'}`, `(${-x0}, ${y0}), ${a > 0 ? 'minimum' : 'maximum'}`, `(${x0}, ${c}), ${a > 0 ? 'minimum' : 'maximum'}`], `dy/dx = ${2 * a}x${signed(b)} = 0 gives x = ${x0}, y = ${y0}. d²y/dx² = ${2 * a} ${a > 0 ? '> 0, a minimum' : '< 0, a maximum'}.`, { marks: 4, difficulty: 'CHALLENGE' });
    },
  },
  {
    subject: 'add-maths',
    subtopic: '4.1',
    count: 80,
    make: (r) => {
      const [a, b, c] = [r.int(-3, 6), r.int(-6, 6), r.int(-8, 8)], lo = r.int(-2, 2), hi = lo + r.int(1, 4);
      if (!a) return null;
      const F = (x: number) => (a * x ** 3) / 3 + (b * x * x) / 2 + c * x;
      return ans(`Evaluate the integral of (${a === 1 ? '' : a}x²${term(b, 'x')}${signed(c)}) dx from x = ${lo} to x = ${hi}.`, F(hi) - F(lo), `[${n(a / 3)}x³ + ${n(b / 2)}x² + ${c}x] from ${lo} to ${hi}`, { marks: 3 });
    },
  },
  {
    subject: 'add-maths',
    subtopic: '2.1',
    count: 60,
    make: (r) => {
      const base = r.pick([2, 3, 4, 5, 10]), k = r.int(-3, 6);
      const value = Math.pow(base, k);
      const kind = r.pick(['solve', 'log'] as const);
      if (kind === 'solve') return ans(`Solve ${base}ˣ = ${n(value)}.`, k, `${n(value)} = ${base}^${k}`, { marks: 1 });
      return ans(`Find the value of log${sub(base)} ${n(value)}.`, k, `${base}^${k} = ${n(value)}`, { marks: 1 });
    },
  },
  {
    subject: 'add-maths',
    subtopic: '2.1',
    count: 50,
    make: (r) => {
      const a = r.int(2, 9), b = r.int(2, 20);
      return ans(`Solve ${a}ˣ = ${b}, giving x to 3 significant figures.`, Math.log(b) / Math.log(a), `x = lg ${b} ÷ lg ${a}`, { marks: 2 });
    },
  },
  {
    subject: 'add-maths',
    subtopic: '1.1',
    count: 60,
    make: (r) => {
      const a = r.int(2, 6), b = r.int(-8, 8), c = r.int(1, 4), x = r.int(-4, 5);
      const f = (v: number) => a * v + b, g = (v: number) => c * v * v - 1;
      return ans(`f(x) = ${a}x${signed(b)}, g(x) = ${c === 1 ? '' : c}x² − 1. Find gf(${x}).`, g(f(x)), `f(${x}) = ${f(x)}, g(${f(x)}) = ${c} × ${f(x)}² − 1`, { marks: 2 });
    },
  },
  {
    subject: 'add-maths',
    subtopic: '5.1',
    count: 40,
    make: (r) => {
      const k = r.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, -0.3, -0.5, -0.7]);
      const fn = r.pick(['sin', 'cos'] as const);
      const base = (fn === 'sin' ? Math.asin(k) : Math.acos(k)) / deg;
      const sols = fn === 'sin' ? [base < 0 ? 180 - base : base, base < 0 ? 360 + base : 180 - base] : [base, 360 - base];
      const [s1, s2] = sols.sort((a, b) => a - b);
      return choice(r, `Solve ${fn} x = ${k} for 0° ≤ x ≤ 360°, to 1 decimal place.`, `x = ${s1.toFixed(1)}° or x = ${s2.toFixed(1)}°`, [`x = ${base.toFixed(1)}° only`, `x = ${s1.toFixed(1)}° or x = ${(s1 + 180).toFixed(1)}°`, `x = ${(180 - s1).toFixed(1)}° or x = ${(180 + s1).toFixed(1)}°`], `${fn}⁻¹(${k}) = ${base.toFixed(1)}°; the ${fn} graph gives a second solution in range: ${s1.toFixed(1)}° and ${s2.toFixed(1)}°.`, { marks: 3, difficulty: 'CHALLENGE' });
    },
  },
  {
    subject: 'intl-maths',
    subtopic: '1.1',
    count: 60,
    make: (r) => {
      const a = r.int(5, 30), b = r.int(5, 30), both = r.int(1, Math.min(a, b) - 1);
      const ask = r.pick(['union', 'only A', 'neither'] as const);
      const total = a + b - both + r.int(0, 15);
      const value = ask === 'union' ? a + b - both : ask === 'only A' ? a - both : total - (a + b - both);
      return ans(`In a class of ${total} students, ${a} study French (F), ${b} study Spanish (S) and ${both} study both. ${ask === 'union' ? 'Find n(F ∪ S).' : ask === 'only A' ? 'How many study French only?' : 'How many study neither?'}`, value, ask === 'union' ? `${a} + ${b} − ${both}` : ask === 'only A' ? `${a} − ${both}` : `${total} − (${a} + ${b} − ${both})`, { marks: 2 });
    },
  },
];

function sub(k: number): string {
  const S = '₀₁₂₃₄₅₆₇₈₉';
  return String(k).split('').map((d) => S[Number(d)]).join('');
}

/** Facts every IGCSE maths student should know instantly. */
export function mathsFlashcards(): GenFlashcard[] {
  const out: GenFlashcard[] = [];
  for (let k = 2; k <= 20; k++) out.push(card('maths', '1.1', `What is ${k}²?`, String(k * k), 'EASY'));
  for (let k = 2; k <= 10; k++) out.push(card('maths', '1.1', `What is ${k}³?`, String(k ** 3), 'EASY'));
  for (let k = 2; k <= 15; k++) out.push(card('maths', '1.1', `What is √${k * k}?`, String(k), 'EASY'));
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  out.push(card('maths', '1.1', 'List the prime numbers below 50.', primes.join(', '), 'MEDIUM'));
  for (const [f, d] of [[1, 2], [1, 3], [1, 4], [3, 4], [1, 5], [1, 8], [3, 8], [1, 10], [2, 3], [5, 8], [1, 20], [7, 8]] as const) {
    out.push(card('maths', '1.2', `Write ${f}/${d} as a decimal and a percentage.`, `${n(f / d)} = ${n((f / d) * 100)}%`, 'EASY'));
  }
  for (const [name, val] of [['sin 30°', '½'], ['cos 30°', '√3/2'], ['tan 30°', '1/√3 (= √3/3)'], ['sin 45°', '√2/2'], ['cos 45°', '√2/2'], ['tan 45°', '1'], ['sin 60°', '√3/2'], ['cos 60°', '½'], ['tan 60°', '√3'], ['sin 90°', '1'], ['cos 90°', '0'], ['sin 0°', '0'], ['cos 0°', '1']] as const) {
    out.push(card('maths', '6.1', `Exact value of ${name}?`, val, 'MEDIUM'));
  }
  const facts: [string, string, string][] = [
    ['5.1', 'Area of a trapezium?', '½(a + b)h, where a and b are the parallel sides'],
    ['5.1', 'Area of a circle?', 'πr²'],
    ['5.1', 'Circumference of a circle?', 'πd or 2πr'],
    ['5.1', 'Volume of a cylinder?', 'πr²h'],
    ['5.1', 'Volume of a cone?', '⅓πr²h'],
    ['5.1', 'Volume of a sphere?', '4/3 πr³'],
    ['5.1', 'Surface area of a sphere?', '4πr²'],
    ['5.1', 'Curved surface area of a cone?', 'πrl, where l is the slant height'],
    ['5.1', 'Volume of a prism?', 'area of cross-section × length'],
    ['5.1', 'Volume of a pyramid?', '⅓ × base area × height'],
    ['5.2', 'Arc length of a sector of angle θ?', 'θ/360 × 2πr'],
    ['5.2', 'Area of a sector of angle θ?', 'θ/360 × πr²'],
    ['6.1', "State Pythagoras' theorem.", 'In a right-angled triangle, a² + b² = c², where c is the hypotenuse.'],
    ['6.1', 'SOH CAH TOA stands for?', 'sin = opp/hyp, cos = adj/hyp, tan = opp/adj'],
    ['6.2', 'The sine rule?', 'a/sin A = b/sin B = c/sin C'],
    ['6.2', 'The cosine rule (finding a side)?', 'a² = b² + c² − 2bc cos A'],
    ['6.2', 'Area of a triangle using sine?', '½ab sin C'],
    ['4.1', 'Sum of interior angles of an n-sided polygon?', '(n − 2) × 180°'],
    ['4.1', 'Exterior angles of any polygon add up to?', '360°'],
    ['4.1', 'Angles on a straight line add up to?', '180°'],
    ['4.1', 'Angles around a point add up to?', '360°'],
    ['4.1', 'Alternate angles are…?', 'Equal (Z-shape between parallel lines)'],
    ['4.1', 'Corresponding angles are…?', 'Equal (F-shape on parallel lines)'],
    ['4.1', 'Co-interior angles add up to?', '180° (C-shape between parallel lines)'],
    ['4.2', 'Angle at the centre vs angle at the circumference?', 'The angle at the centre is twice the angle at the circumference subtended by the same arc.'],
    ['4.2', 'Angle in a semicircle?', '90°'],
    ['4.2', 'Angles in the same segment are…?', 'Equal'],
    ['4.2', 'Opposite angles of a cyclic quadrilateral?', 'Add up to 180°'],
    ['4.2', 'Angle between a tangent and a radius?', '90°'],
    ['4.2', 'Two tangents from an external point are…?', 'Equal in length'],
    ['4.2', 'The alternate segment theorem?', 'The angle between a tangent and a chord equals the angle in the alternate segment.'],
    ['2.5', 'The quadratic formula?', 'x = (−b ± √(b² − 4ac)) ÷ 2a'],
    ['2.5', 'What does the discriminant b² − 4ac tell you?', '> 0: two real roots; = 0: one repeated root; < 0: no real roots'],
    ['2.1', 'Difference of two squares?', 'a² − b² = (a + b)(a − b)'],
    ['3.1', 'Gradient between two points?', '(y₂ − y₁) ÷ (x₂ − x₁)'],
    ['3.1', 'Equation of a straight line?', 'y = mx + c, m = gradient, c = y-intercept'],
    ['3.1', 'Gradients of perpendicular lines?', 'Multiply to −1 (m₁ × m₂ = −1)'],
    ['3.1', 'Gradients of parallel lines?', 'Equal'],
    ['3.1', 'Midpoint of (x₁, y₁) and (x₂, y₂)?', '((x₁ + x₂)/2, (y₁ + y₂)/2)'],
    ['1.3', 'a⁰ = ?', '1'],
    ['1.3', 'a⁻ⁿ = ?', '1 ÷ aⁿ'],
    ['1.3', 'a^(1/n) = ?', 'the nth root of a'],
    ['1.3', 'aᵐ × aⁿ = ?', 'aᵐ⁺ⁿ'],
    ['1.3', 'aᵐ ÷ aⁿ = ?', 'aᵐ⁻ⁿ'],
    ['1.3', '(aᵐ)ⁿ = ?', 'aᵐⁿ'],
    ['1.4', 'Compound interest formula?', 'Value = P(1 + r/100)ⁿ'],
    ['1.4', 'Percentage change?', 'change ÷ original × 100'],
    ['1.4', 'How do you find an original value after a percentage change?', 'Divide the new value by the multiplier (reverse percentage).'],
    ['8.1', 'P(not A) = ?', '1 − P(A)'],
    ['8.1', 'For independent events, P(A and B) = ?', 'P(A) × P(B)'],
    ['8.1', 'For mutually exclusive events, P(A or B) = ?', 'P(A) + P(B)'],
    ['8.2', 'Expected frequency = ?', 'probability × number of trials'],
    ['9.1', 'How do you find the mean from a frequency table?', 'Σfx ÷ Σf'],
    ['9.2', 'Interquartile range = ?', 'upper quartile − lower quartile'],
    ['9.3', 'Frequency density = ?', 'frequency ÷ class width'],
  ];
  for (const [sub, f, b] of facts) out.push(card('maths', sub, f, b, 'MEDIUM'));
  return out;
}
