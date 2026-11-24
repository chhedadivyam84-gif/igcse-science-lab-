import { type GenFlashcard, type Made, type Rng, type Template, card, mcq, n, numericDistractors, sf } from './core';

/** IGCSE relative atomic masses (as printed on the Periodic Table in the papers). */
const Ar: Record<string, number> = {
  H: 1, Li: 7, C: 12, N: 14, O: 16, F: 19, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5,
  K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Br: 80, Ag: 108, I: 127, Ba: 137, Pb: 207, Mn: 55,
};

type Compound = { name: string; formula: string; parts: Record<string, number> };

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const subscript = (k: number) => (k === 1 ? '' : String(k).split('').map((d) => SUB[Number(d)]).join(''));

function compound(name: string, formula: string, parts: Record<string, number>): Compound {
  return { name, formula, parts };
}

export const COMPOUNDS: Compound[] = [
  compound('water', 'H₂O', { H: 2, O: 1 }),
  compound('carbon dioxide', 'CO₂', { C: 1, O: 2 }),
  compound('methane', 'CH₄', { C: 1, H: 4 }),
  compound('ammonia', 'NH₃', { N: 1, H: 3 }),
  compound('sodium chloride', 'NaCl', { Na: 1, Cl: 1 }),
  compound('sodium hydroxide', 'NaOH', { Na: 1, O: 1, H: 1 }),
  compound('hydrochloric acid', 'HCl', { H: 1, Cl: 1 }),
  compound('sulfuric acid', 'H₂SO₄', { H: 2, S: 1, O: 4 }),
  compound('nitric acid', 'HNO₃', { H: 1, N: 1, O: 3 }),
  compound('calcium carbonate', 'CaCO₃', { Ca: 1, C: 1, O: 3 }),
  compound('calcium oxide', 'CaO', { Ca: 1, O: 1 }),
  compound('calcium hydroxide', 'Ca(OH)₂', { Ca: 1, O: 2, H: 2 }),
  compound('magnesium oxide', 'MgO', { Mg: 1, O: 1 }),
  compound('magnesium chloride', 'MgCl₂', { Mg: 1, Cl: 2 }),
  compound('magnesium sulfate', 'MgSO₄', { Mg: 1, S: 1, O: 4 }),
  compound('aluminium oxide', 'Al₂O₃', { Al: 2, O: 3 }),
  compound('iron(III) oxide', 'Fe₂O₃', { Fe: 2, O: 3 }),
  compound('iron(II) sulfate', 'FeSO₄', { Fe: 1, S: 1, O: 4 }),
  compound('copper(II) oxide', 'CuO', { Cu: 1, O: 1 }),
  compound('copper(II) sulfate', 'CuSO₄', { Cu: 1, S: 1, O: 4 }),
  compound('copper(II) carbonate', 'CuCO₃', { Cu: 1, C: 1, O: 3 }),
  compound('zinc oxide', 'ZnO', { Zn: 1, O: 1 }),
  compound('zinc sulfate', 'ZnSO₄', { Zn: 1, S: 1, O: 4 }),
  compound('potassium chloride', 'KCl', { K: 1, Cl: 1 }),
  compound('potassium nitrate', 'KNO₃', { K: 1, N: 1, O: 3 }),
  compound('potassium hydroxide', 'KOH', { K: 1, O: 1, H: 1 }),
  compound('sodium carbonate', 'Na₂CO₃', { Na: 2, C: 1, O: 3 }),
  compound('sodium sulfate', 'Na₂SO₄', { Na: 2, S: 1, O: 4 }),
  compound('ammonium nitrate', 'NH₄NO₃', { N: 2, H: 4, O: 3 }),
  compound('ammonium sulfate', '(NH₄)₂SO₄', { N: 2, H: 8, S: 1, O: 4 }),
  compound('silver nitrate', 'AgNO₃', { Ag: 1, N: 1, O: 3 }),
  compound('lead(II) bromide', 'PbBr₂', { Pb: 1, Br: 2 }),
  compound('ethanol', 'C₂H₅OH', { C: 2, H: 6, O: 1 }),
  compound('ethene', 'C₂H₄', { C: 2, H: 4 }),
  compound('ethane', 'C₂H₆', { C: 2, H: 6 }),
  compound('propane', 'C₃H₈', { C: 3, H: 8 }),
  compound('butane', 'C₄H₁₀', { C: 4, H: 10 }),
  compound('glucose', 'C₆H₁₂O₆', { C: 6, H: 12, O: 6 }),
  compound('ethanoic acid', 'CH₃COOH', { C: 2, H: 4, O: 2 }),
  compound('sulfur dioxide', 'SO₂', { S: 1, O: 2 }),
  compound('nitrogen dioxide', 'NO₂', { N: 1, O: 2 }),
  compound('carbon monoxide', 'CO', { C: 1, O: 1 }),
  compound('hydrogen peroxide', 'H₂O₂', { H: 2, O: 2 }),
  compound('barium sulfate', 'BaSO₄', { Ba: 1, S: 1, O: 4 }),
  compound('silicon dioxide', 'SiO₂', { Si: 1, O: 2 }),
  compound('lithium oxide', 'Li₂O', { Li: 2, O: 1 }),
  compound('potassium iodide', 'KI', { K: 1, I: 1 }),
  compound('oxygen gas', 'O₂', { O: 2 }),
  compound('nitrogen gas', 'N₂', { N: 2 }),
  compound('chlorine gas', 'Cl₂', { Cl: 2 }),
  compound('hydrogen gas', 'H₂', { H: 2 }),
];

export const mr = (c: Compound) => Object.entries(c.parts).reduce((sum, [el, k]) => sum + Ar[el] * k, 0);
const gases = COMPOUNDS.filter((c) => ['CO₂', 'CH₄', 'NH₃', 'O₂', 'N₂', 'Cl₂', 'H₂', 'SO₂', 'NO₂', 'CO', 'C₂H₄', 'C₃H₈', 'HCl'].includes(c.formula));
const solutes = COMPOUNDS.filter((c) => ['NaCl', 'NaOH', 'HCl', 'H₂SO₄', 'HNO₃', 'CuSO₄', 'KOH', 'Na₂CO₃', 'KCl', 'MgSO₄', 'AgNO₃', 'KNO₃'].includes(c.formula));

function calc(stem: string, value: number, unit: string, equation: string, working: string, hint?: string): Made {
  const answer = `${sf(value)}${unit ? ` ${unit}` : ''}`;
  return { stem, answer, markScheme: [`Uses ${equation} (1)`, `${answer} (1)`], explanation: `${equation}. ${working} = ${answer}.`, hint };
}

const C = (sub: string, make: (r: Rng) => Made | null, extra: Partial<Template> = {}): Template => ({
  subject: 'chemistry',
  subtopic: sub,
  make,
  ...extra,
});

/** Balanced reactions: [description, reactant, product, ratio product:reactant (mol)] */
const REACTIONS: { eq: string; from: Compound; to: Compound; ratio: number }[] = (() => {
  const f = (formula: string) => COMPOUNDS.find((c) => c.formula === formula)!;
  const el = (name: string, sym: string): Compound => ({ name, formula: sym, parts: { [sym]: 1 } });
  return [
    { eq: '2Mg + O₂ → 2MgO', from: el('magnesium', 'Mg'), to: f('MgO'), ratio: 1 },
    { eq: 'CaCO₃ → CaO + CO₂', from: f('CaCO₃'), to: f('CaO'), ratio: 1 },
    { eq: 'CaCO₃ → CaO + CO₂', from: f('CaCO₃'), to: f('CO₂'), ratio: 1 },
    { eq: 'CuCO₃ → CuO + CO₂', from: f('CuCO₃'), to: f('CuO'), ratio: 1 },
    { eq: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', from: f('Fe₂O₃'), to: el('iron', 'Fe'), ratio: 2 },
    { eq: '2Al₂O₃ → 4Al + 3O₂', from: f('Al₂O₃'), to: el('aluminium', 'Al'), ratio: 2 },
    { eq: 'Zn + H₂SO₄ → ZnSO₄ + H₂', from: el('zinc', 'Zn'), to: f('ZnSO₄'), ratio: 1 },
    { eq: 'CuO + H₂SO₄ → CuSO₄ + H₂O', from: f('CuO'), to: f('CuSO₄'), ratio: 1 },
    { eq: 'CH₄ + 2O₂ → CO₂ + 2H₂O', from: f('CH₄'), to: f('H₂O'), ratio: 2 },
    { eq: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', from: f('C₃H₈'), to: f('CO₂'), ratio: 3 },
    { eq: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', from: f('C₆H₁₂O₆'), to: f('C₂H₅OH'), ratio: 2 },
    { eq: 'N₂ + 3H₂ → 2NH₃', from: f('N₂'), to: f('NH₃'), ratio: 2 },
    { eq: '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O', from: f('NaOH'), to: f('Na₂SO₄'), ratio: 0.5 },
    { eq: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂', from: f('Na₂CO₃'), to: f('NaCl'), ratio: 2 },
  ];
})();

export const chemistryTemplates: Template[] = [
  // --- 3.2 Relative masses -------------------------------------------------------
  C('3.2', (r) => {
    const c = r.pick(COMPOUNDS);
    const parts = Object.entries(c.parts).map(([el, k]) => `${k > 1 ? `${k} × ` : ''}${Ar[el]}`).join(' + ');
    return { stem: `Calculate the relative formula mass (Mr) of ${c.name}, ${c.formula}. Use the relative atomic masses from the Periodic Table.`, answer: n(mr(c)), markScheme: [`${n(mr(c))} (1)`], explanation: `Mr = ${parts} = ${n(mr(c))}. Mr has no units.`, marks: 1, difficulty: 'FOUNDATION' };
  }, { count: COMPOUNDS.length }),
  C('3.2', (r) => {
    const c = r.pick(COMPOUNDS.filter((x) => Object.keys(x.parts).length > 1));
    const el = r.pick(Object.keys(c.parts));
    const pct = ((Ar[el] * c.parts[el]) / mr(c)) * 100;
    return calc(`Calculate the percentage by mass of ${el} in ${c.name} (${c.formula}).`, pct, '%', '% by mass = (Ar × number of atoms ÷ Mr) × 100', `${Ar[el]} × ${c.parts[el]} ÷ ${n(mr(c))} × 100`);
  }, { count: 80 }),
  C('2.3', (r) => {
    const el = r.pick([['chlorine', 35, 37, 75], ['copper', 63, 65, 69], ['boron', 10, 11, 20], ['lithium', 6, 7, 7.5], ['bromine', 79, 81, 50.5], ['gallium', 69, 71, 60]] as const);
    const p = el[3];
    const value = (el[1] * p + el[2] * (100 - p)) / 100;
    return calc(`A sample of ${el[0]} contains ${p}% of the isotope with mass number ${el[1]} and ${100 - p}% with mass number ${el[2]}. Calculate the relative atomic mass.`, value, '', 'Ar = Σ(mass number × abundance) ÷ 100', `(${el[1]} × ${p} + ${el[2]} × ${100 - p}) ÷ 100`);
  }, { count: 6, difficulty: 'CHALLENGE' }),

  // --- 3.3 Moles --------------------------------------------------------------------
  C('3.3', (r) => {
    const c = r.pick(COMPOUNDS), m = r.step(0.5, 200, 0.5);
    return calc(`How many moles are in ${n(m)} g of ${c.name} (${c.formula})?`, m / mr(c), 'mol', 'moles = mass ÷ Mr', `${n(m)} ÷ ${n(mr(c))}`, `Mr of ${c.formula} = ${n(mr(c))}`);
  }, { count: 80, difficulty: 'FOUNDATION' }),
  C('3.3', (r) => {
    const c = r.pick(COMPOUNDS), mol = r.step(0.05, 5, 0.05);
    return calc(`Calculate the mass of ${n(mol)} mol of ${c.name} (${c.formula}).`, mol * mr(c), 'g', 'mass = moles × Mr', `${n(mol)} × ${n(mr(c))}`);
  }, { count: 80 }),
  C('3.3', (r) => {
    const c = r.pick(COMPOUNDS), mol = r.step(0.1, 4, 0.1);
    return calc(`${n(mol * mr(c))} g of a substance is ${n(mol)} mol. Calculate its Mr.`, mr(c), '', 'Mr = mass ÷ moles', `${n(mol * mr(c))} ÷ ${n(mol)}`);
  }, { count: 40 }),
  C('3.3', (r) => {
    const c = r.pick(COMPOUNDS), mol = r.step(0.01, 3, 0.01);
    return calc(`How many molecules or formula units are in ${n(mol)} mol of ${c.formula}? (Avogadro constant = 6.02 × 10²³ per mol)`, mol * 6.02e23, '', 'number = moles × 6.02 × 10²³', `${n(mol)} × 6.02 × 10²³`);
  }, { count: 40 }),
  C('3.3', (r) => {
    const g = r.pick(gases), mol = r.step(0.05, 4, 0.05);
    return calc(`What volume does ${n(mol)} mol of ${g.name} occupy at room temperature and pressure? (molar gas volume = 24 dm³)`, mol * 24, 'dm³', 'volume = moles × 24 dm³', `${n(mol)} × 24`);
  }, { count: 40, difficulty: 'FOUNDATION' }),
  C('3.3', (r) => {
    const g = r.pick(gases), v = r.step(12, 3600, 12);
    return calc(`How many moles of ${g.name} are in ${n(v)} cm³ of the gas at r.t.p.? (molar gas volume = 24 000 cm³)`, v / 24000, 'mol', 'moles = volume ÷ 24 000 cm³', `${n(v)} ÷ 24 000`);
  }, { count: 40 }),
  C('3.3', (r) => {
    const g = r.pick(gases), m = r.step(1, 100, 1);
    return calc(`Calculate the volume at r.t.p. of ${n(m)} g of ${g.name} (${g.formula}).`, (m / mr(g)) * 24, 'dm³', 'moles = mass ÷ Mr, then volume = moles × 24 dm³', `(${n(m)} ÷ ${n(mr(g))}) × 24`, 'Find the moles first.');
  }, { count: 50, difficulty: 'CHALLENGE', marks: 3 }),
  C('3.3', (r) => {
    const c = r.pick(solutes), mol = r.step(0.005, 0.5, 0.005), v = r.pick([25, 50, 100, 200, 250, 500, 1000]);
    return calc(`${n(mol)} mol of ${c.name} is dissolved to make ${v} cm³ of solution. Calculate the concentration in mol/dm³.`, mol / (v / 1000), 'mol/dm³', 'concentration = moles ÷ volume (dm³)', `${n(mol)} ÷ ${v / 1000}`, 'Divide cm³ by 1000 to get dm³.');
  }, { count: 50 }),
  C('3.3', (r) => {
    const c = r.pick(solutes), conc = r.pick([0.05, 0.1, 0.2, 0.25, 0.5, 1, 2]), v = r.pick([10, 20, 25, 50, 100, 250]);
    return calc(`How many moles of ${c.name} are in ${v} cm³ of a ${conc} mol/dm³ solution?`, conc * (v / 1000), 'mol', 'moles = concentration × volume (dm³)', `${conc} × ${v / 1000}`);
  }, { count: 50 }),
  C('3.3', (r) => {
    const c = r.pick(solutes), conc = r.pick([0.05, 0.1, 0.2, 0.5, 1, 2]);
    return calc(`Convert a concentration of ${conc} mol/dm³ of ${c.name} (${c.formula}) into g/dm³.`, conc * mr(c), 'g/dm³', 'g/dm³ = mol/dm³ × Mr', `${conc} × ${n(mr(c))}`);
  }, { count: 40 }),
  C('3.3', (r) => {
    const rx = r.pick(REACTIONS), m = r.step(1, 100, 1);
    const molFrom = m / mr(rx.from), molTo = molFrom * rx.ratio, mass = molTo * mr(rx.to);
    return calc(`For the reaction ${rx.eq}, calculate the maximum mass of ${rx.to.formula} formed from ${n(m)} g of ${rx.from.formula}.`, mass, 'g', `moles of ${rx.from.formula} = mass ÷ Mr; use the ${rx.ratio === 1 ? '1 : 1' : `1 : ${rx.ratio}`} mole ratio; mass = moles × Mr`, `${n(m)} ÷ ${n(mr(rx.from))} × ${rx.ratio} × ${n(mr(rx.to))}`, 'Moles of reactant → mole ratio → moles of product → mass.');
  }, { count: 80, difficulty: 'CHALLENGE', marks: 3 }),
  C('3.3', (r) => {
    const theo = r.step(5, 200, 0.5), pct = r.int(40, 98);
    const actual = (theo * pct) / 100;
    return calc(`The theoretical yield of a product is ${n(theo)} g but only ${n(Number(actual.toFixed(2)))} g is obtained. Calculate the percentage yield.`, (Number(actual.toFixed(2)) / theo) * 100, '%', 'percentage yield = actual ÷ theoretical × 100', `${n(Number(actual.toFixed(2)))} ÷ ${n(theo)} × 100`);
  }, { count: 40 }),
  C('3.3', (r) => {
    const target = r.pick(COMPOUNDS.filter((c) => Object.keys(c.parts).length === 2 && !Object.values(c.parts).some((k) => k > 6)));
    const total = r.pick([10, 20, 50, 100]);
    const masses = Object.entries(target.parts).map(([el, k]) => [el, (Ar[el] * k * total) / mr(target)] as const);
    const correct = target.formula;
    const wrong = [
      Object.keys(target.parts).join(''),
      Object.entries(target.parts).map(([el, k]) => `${el}${subscript(k + 1)}`).join(''),
      Object.entries(target.parts).reverse().map(([el, k]) => `${el}${subscript(k)}`).join(''),
      Object.entries(target.parts).map(([el, k], i) => `${el}${subscript(i === 0 ? k * 2 : k)}`).join(''),
    ];
    const opts = mcq(r, correct, wrong);
    if (!opts) return null;
    return {
      stem: `A compound contains ${masses.map(([el, m]) => `${sf(m)} g of ${el}`).join(' and ')}. What is its empirical formula?`,
      ...opts,
      explanation: `Divide each mass by Ar to get moles, then divide by the smallest: ${masses.map(([el, m]) => `${el}: ${sf(m)} ÷ ${Ar[el]} = ${sf(m / Ar[el])}`).join('; ')}. The simplest whole-number ratio gives ${correct}.`,
      difficulty: 'CHALLENGE',
    };
  }, { count: 30 }),

  // --- 12.2 Titration ----------------------------------------------------------------
  C('12.2', (r) => {
    const cb = r.pick([0.1, 0.2, 0.05, 0.15]), vb = r.step(15, 35, 0.05), va = 25;
    const pair = r.pick([['hydrochloric acid', 'sodium hydroxide', 1], ['nitric acid', 'potassium hydroxide', 1], ['sulfuric acid', 'sodium hydroxide', 0.5]] as const);
    const ca = (cb * (vb / 1000) * pair[2]) / (va / 1000);
    return calc(`${va}.0 cm³ of ${pair[0]} is neutralised by ${vb.toFixed(2)} cm³ of ${cb} mol/dm³ ${pair[1]}. Calculate the concentration of the acid.${pair[2] === 0.5 ? ' (H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O)' : ''}`, ca, 'mol/dm³', `moles of alkali = c × V; mole ratio acid : alkali = ${pair[2] === 0.5 ? '1 : 2' : '1 : 1'}; concentration = moles ÷ volume`, `${cb} × ${vb.toFixed(2)}/1000${pair[2] === 0.5 ? ' ÷ 2' : ''} ÷ ${va / 1000}`, 'Moles of alkali → moles of acid → concentration.');
  }, { count: 60, difficulty: 'CHALLENGE', marks: 3 }),
  C('12.2', (r) => {
    const titres = [r.step(20, 26, 0.05)];
    titres.push(Number((titres[0] + r.pick([-0.05, 0, 0.05])).toFixed(2)));
    titres.push(Number((titres[0] + r.pick([-0.05, 0.05])).toFixed(2)));
    const rough = Number((titres[0] + r.pick([0.6, 0.8, 1.1])).toFixed(2));
    const mean = titres.reduce((a, b) => a + b, 0) / 3;
    return calc(`A student's titres are: rough ${rough.toFixed(2)} cm³, then ${titres.map((t) => t.toFixed(2)).join(' cm³, ')} cm³. Calculate the mean titre using concordant results only.`, mean, 'cm³', 'mean of concordant titres (within 0.10 cm³), ignoring the rough titre', `(${titres.map((t) => t.toFixed(2)).join(' + ')}) ÷ 3`, 'Leave out the rough titre.');
  }, { count: 40 }),

  // --- 6.2 Rates -------------------------------------------------------------------------
  C('6.2', (r) => {
    const v = r.int(10, 120), t = r.int(10, 300);
    return calc(`${v} cm³ of gas is collected in ${t} s. Calculate the mean rate of reaction.`, v / t, 'cm³/s', 'mean rate = volume of gas ÷ time', `${v} ÷ ${t}`);
  }, { count: 40, difficulty: 'FOUNDATION' }),
  C('6.2', (r) => {
    const m = r.step(0.1, 5, 0.05), t = r.int(20, 600);
    return calc(`A reaction flask loses ${n(m)} g of mass in ${t} s as carbon dioxide escapes. Calculate the mean rate of reaction.`, m / t, 'g/s', 'mean rate = mass lost ÷ time', `${n(m)} ÷ ${t}`);
  }, { count: 30 }),

  // --- 2.2 Atomic structure ---------------------------------------------------------------
  C('2.2', (r) => {
    const el = r.pick(ELEMENTS);
    const ask = r.pick(['protons', 'neutrons', 'electrons'] as const);
    const value = ask === 'neutrons' ? el.A - el.Z : el.Z;
    return { stem: `An atom of ${el.name} has proton number ${el.Z} and nucleon number ${el.A}. How many ${ask} does it have?`, answer: String(value), markScheme: [`${value} (1)`], marks: 1, difficulty: 'FOUNDATION', explanation: ask === 'neutrons' ? `neutrons = nucleon number − proton number = ${el.A} − ${el.Z} = ${value}.` : `In a neutral atom the number of ${ask} equals the proton number, ${el.Z}.` };
  }, { count: 60 }),
  C('2.2', (r) => {
    const el = r.pick(ELEMENTS.filter((e) => e.Z <= 20));
    const correct = config(el.Z);
    const wrong = [config(el.Z + 1), config(Math.max(1, el.Z - 1)), correct.split(',').reverse().join(','), shiftConfig(el.Z)];
    const opts = mcq(r, correct, wrong);
    if (!opts) return null;
    return { stem: `What is the electronic configuration of ${el.name} (proton number ${el.Z})?`, ...opts, explanation: `Shells fill 2, then 8, then 8: ${el.name} has ${el.Z} electrons, arranged ${correct}.` };
  }, { count: 20 }),
  C('8.1', (r) => {
    const el = r.pick(ELEMENTS.filter((e) => e.Z > 2 && e.Z <= 20 && e.group));
    const cfg = config(el.Z);
    const shells = cfg.split(',').length;
    const ask = r.pick(['group', 'period'] as const);
    const value = ask === 'group' ? (el.group === 8 ? 'VIII (0)' : roman(el.group!)) : String(shells);
    const answerText = ask === 'group' ? `Group ${value}` : `Period ${value}`;
    const all = ask === 'group' ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII (0)'].map((g) => `Group ${g}`) : ['1', '2', '3', '4'].map((p) => `Period ${p}`);
    const opts = mcq(r, answerText, all);
    if (!opts) return null;
    return { stem: `An element has the electronic configuration ${cfg}. Which ${ask} of the Periodic Table is it in?`, ...opts, explanation: ask === 'group' ? `The number of outer-shell electrons (${cfg.split(',').pop()}) gives the group.` : `The number of occupied shells (${shells}) gives the period.` };
  }, { count: 30 }),

  // --- 3.1 Ionic formulae ----------------------------------------------------------------
  C('3.1', (r) => {
    const cat = r.pick(CATIONS), an = r.pick(ANIONS);
    const correct = ionicFormula(cat, an);
    const wrong = [ionicFormula({ ...cat, charge: an.charge }, { ...an, charge: cat.charge }), `${cat.sym}${an.sym}`, ionicFormula({ ...cat, charge: cat.charge + 1 }, an), ionicFormula(cat, { ...an, charge: an.charge + 1 })];
    const opts = mcq(r, correct, wrong);
    if (!opts) return null;
    return { stem: `What is the formula of the compound formed between ${cat.name} ions (${cat.sym}${sup(cat.charge, '+')}) and ${an.name} ions (${an.sym}${sup(an.charge, '−')})?`, ...opts, explanation: `The charges must cancel: ${cat.sym}${sup(cat.charge, '+')} and ${an.sym}${sup(an.charge, '−')} combine in the ratio that gives zero overall charge, ${correct}.` };
  }, { count: 120 }),

  // --- 12.5 Ion tests ------------------------------------------------------------------------
  C('12.5', (r) => {
    const t = r.pick(CATION_TESTS);
    const opts = mcq(r, t.result, CATION_TESTS.map((x) => x.result));
    if (!opts) return null;
    return { stem: `Aqueous sodium hydroxide is added to a solution containing ${t.ion} ions. What is observed?`, ...opts, explanation: `${t.ion}: ${t.result}.` };
  }, { count: 30 }),
  C('12.5', (r) => {
    const t = r.pick(CATION_TESTS);
    const opts = mcq(r, t.ion, CATION_TESTS.map((x) => x.ion));
    if (!opts) return null;
    return { stem: `Adding aqueous sodium hydroxide to an unknown solution gives: ${t.result}. Which ion is present?`, ...opts, explanation: `${t.result} is the result for ${t.ion}.` };
  }, { count: 30 }),
  C('12.5', (r) => {
    const t = r.pick(ANION_TESTS);
    const opts = mcq(r, t.ion, ANION_TESTS.map((x) => x.ion));
    if (!opts) return null;
    return { stem: `Test: ${t.test}. Result: ${t.result}. Which ion is present?`, ...opts, explanation: `${t.test} → ${t.result} identifies ${t.ion}.` };
  }, { count: 20 }),
  C('12.5', (r) => {
    const t = r.pick(GAS_TESTS);
    const opts = mcq(r, t.gas, GAS_TESTS.map((x) => x.gas));
    if (!opts) return null;
    return { stem: `A gas ${t.result}. Which gas is it?`, ...opts, explanation: `${cap(t.gas)}: ${t.test} — ${t.result}.` };
  }, { count: 20 }),
];

export const chemistryMcqTemplates: Template[] = chemistryTemplates
  .filter((t) => t.difficulty === 'FOUNDATION')
  .map((t) => ({
    ...t,
    count: 30,
    make: (r: Rng) => {
      const made = t.make(r);
      if (!made || made.options) return made;
      const m = made.answer.match(/^(-?[\d.]+(?: × 10\^-?\d+)?)\s*(.*)$/);
      if (!m) return null;
      const value = Number(m[1].replace(' × 10^', 'e'));
      const opts = mcq(r, made.answer, numericDistractors(value, m[2]));
      if (!opts) return null;
      return { ...made, stem: `${made.stem} Choose the correct value.`, ...opts, type: 'MCQ', marks: 1, markScheme: [`${made.answer} (1)`] };
    },
  }));

// --- data ----------------------------------------------------------------------------------

type El = { name: string; sym: string; Z: number; A: number; group?: number };
export const ELEMENTS: El[] = [
  ['hydrogen', 'H', 1, 1, 1], ['helium', 'He', 2, 4, 8], ['lithium', 'Li', 3, 7, 1], ['beryllium', 'Be', 4, 9, 2], ['boron', 'B', 5, 11, 3],
  ['carbon', 'C', 6, 12, 4], ['nitrogen', 'N', 7, 14, 5], ['oxygen', 'O', 8, 16, 6], ['fluorine', 'F', 9, 19, 7], ['neon', 'Ne', 10, 20, 8],
  ['sodium', 'Na', 11, 23, 1], ['magnesium', 'Mg', 12, 24, 2], ['aluminium', 'Al', 13, 27, 3], ['silicon', 'Si', 14, 28, 4], ['phosphorus', 'P', 15, 31, 5],
  ['sulfur', 'S', 16, 32, 6], ['chlorine', 'Cl', 17, 35, 7], ['argon', 'Ar', 18, 40, 8], ['potassium', 'K', 19, 39, 1], ['calcium', 'Ca', 20, 40, 2],
  ['iron', 'Fe', 26, 56], ['copper', 'Cu', 29, 64], ['zinc', 'Zn', 30, 65], ['bromine', 'Br', 35, 80, 7], ['silver', 'Ag', 47, 108],
  ['iodine', 'I', 53, 127, 7], ['lead', 'Pb', 82, 207, 4], ['gold', 'Au', 79, 197], ['uranium', 'U', 92, 238],
].map(([name, sym, Z, A, group]) => ({ name: name as string, sym: sym as string, Z: Z as number, A: A as number, group: group as number | undefined }));

function config(z: number): string {
  const shells: number[] = [];
  let left = z;
  for (const cap of [2, 8, 8, 2]) {
    if (left <= 0) break;
    shells.push(Math.min(cap, left));
    left -= cap;
  }
  return shells.join(',');
}
function shiftConfig(z: number): string {
  const c = config(z).split(',').map(Number);
  if (c.length < 2) return `${c[0] + 1}`;
  c[0] = Math.min(c[0] + 1, 3);
  c[c.length - 1] = Math.max(0, c[c.length - 1] - 1);
  return c.filter((x) => x > 0).join(',');
}
const roman = (g: number) => ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][g];
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (k: number, sign: string) => `${k === 1 ? '' : SUP[k]}${sign === '+' ? '⁺' : '⁻'}`;

type Ion = { name: string; sym: string; charge: number; poly?: boolean };
const CATIONS: Ion[] = [
  { name: 'sodium', sym: 'Na', charge: 1 }, { name: 'potassium', sym: 'K', charge: 1 }, { name: 'lithium', sym: 'Li', charge: 1 },
  { name: 'magnesium', sym: 'Mg', charge: 2 }, { name: 'calcium', sym: 'Ca', charge: 2 }, { name: 'barium', sym: 'Ba', charge: 2 },
  { name: 'zinc', sym: 'Zn', charge: 2 }, { name: 'copper(II)', sym: 'Cu', charge: 2 }, { name: 'iron(II)', sym: 'Fe', charge: 2 },
  { name: 'iron(III)', sym: 'Fe', charge: 3 }, { name: 'aluminium', sym: 'Al', charge: 3 }, { name: 'ammonium', sym: 'NH₄', charge: 1, poly: true },
  { name: 'silver', sym: 'Ag', charge: 1 },
];
const ANIONS: Ion[] = [
  { name: 'chloride', sym: 'Cl', charge: 1 }, { name: 'bromide', sym: 'Br', charge: 1 }, { name: 'iodide', sym: 'I', charge: 1 },
  { name: 'oxide', sym: 'O', charge: 2 }, { name: 'sulfide', sym: 'S', charge: 2 }, { name: 'hydroxide', sym: 'OH', charge: 1, poly: true },
  { name: 'nitrate', sym: 'NO₃', charge: 1, poly: true }, { name: 'sulfate', sym: 'SO₄', charge: 2, poly: true },
  { name: 'carbonate', sym: 'CO₃', charge: 2, poly: true }, { name: 'nitride', sym: 'N', charge: 3 },
];
function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}
function ionicFormula(cat: Ion, an: Ion): string {
  const g = gcd(cat.charge, an.charge);
  const nc = an.charge / g, na = cat.charge / g;
  const part = (ion: Ion, k: number) => (k === 1 ? ion.sym : ion.poly ? `(${ion.sym})${subscript(k)}` : `${ion.sym}${subscript(k)}`);
  return `${part(cat, nc)}${part(an, na)}`;
}

const CATION_TESTS = [
  { ion: 'copper(II), Cu²⁺', result: 'a light blue precipitate, insoluble in excess' },
  { ion: 'iron(II), Fe²⁺', result: 'a green precipitate, insoluble in excess' },
  { ion: 'iron(III), Fe³⁺', result: 'a red-brown precipitate, insoluble in excess' },
  { ion: 'zinc, Zn²⁺', result: 'a white precipitate, soluble in excess giving a colourless solution' },
  { ion: 'calcium, Ca²⁺', result: 'a white precipitate, insoluble in excess' },
  { ion: 'aluminium, Al³⁺', result: 'a white precipitate that dissolves in excess (no precipitate with excess aqueous ammonia)' },
  { ion: 'ammonium, NH₄⁺', result: 'no precipitate; on warming, ammonia gas is given off that turns damp red litmus blue' },
  { ion: 'chromium(III), Cr³⁺', result: 'a green precipitate, soluble in excess' },
];
const ANION_TESTS = [
  { ion: 'chloride, Cl⁻', test: 'acidify with dilute nitric acid, then add aqueous silver nitrate', result: 'white precipitate' },
  { ion: 'bromide, Br⁻', test: 'acidify with dilute nitric acid, then add aqueous silver nitrate', result: 'cream precipitate' },
  { ion: 'iodide, I⁻', test: 'acidify with dilute nitric acid, then add aqueous silver nitrate', result: 'yellow precipitate' },
  { ion: 'sulfate, SO₄²⁻', test: 'acidify with dilute nitric acid, then add aqueous barium nitrate', result: 'white precipitate' },
  { ion: 'carbonate, CO₃²⁻', test: 'add dilute acid and bubble the gas through limewater', result: 'effervescence; the gas turns limewater milky' },
  { ion: 'nitrate, NO₃⁻', test: 'add aqueous sodium hydroxide and aluminium foil, then warm', result: 'ammonia is produced, turning damp red litmus blue' },
  { ion: 'sulfite, SO₃²⁻', test: 'add acidified aqueous potassium manganate(VII)', result: 'it turns from purple to colourless' },
];
const GAS_TESTS = [
  { gas: 'hydrogen', test: 'a lighted splint', result: 'gives a squeaky pop with a lighted splint' },
  { gas: 'oxygen', test: 'a glowing splint', result: 'relights a glowing splint' },
  { gas: 'carbon dioxide', test: 'limewater', result: 'turns limewater milky' },
  { gas: 'ammonia', test: 'damp red litmus paper', result: 'turns damp red litmus paper blue' },
  { gas: 'chlorine', test: 'damp litmus paper', result: 'bleaches damp litmus paper' },
  { gas: 'sulfur dioxide', test: 'acidified potassium manganate(VII)', result: 'turns acidified aqueous potassium manganate(VII) from purple to colourless' },
];

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Fact flashcards: Mr values, ion tests, gas tests, electron configurations, ion formulae. */
export function chemistryFlashcards(): GenFlashcard[] {
  const out: GenFlashcard[] = [];
  for (const c of COMPOUNDS) out.push(card('chemistry', '3.2', `What is the Mr of ${c.name}, ${c.formula}?`, `${n(mr(c))}`, 'EASY'));
  for (const c of COMPOUNDS) out.push(card('chemistry', '3.1', `What is the formula of ${c.name}?`, c.formula, 'EASY'));
  for (const t of CATION_TESTS) out.push(card('chemistry', '12.5', `Aqueous sodium hydroxide test for ${t.ion}: what do you see?`, cap(t.result) + '.', 'MEDIUM'));
  for (const t of ANION_TESTS) out.push(card('chemistry', '12.5', `How do you test for ${t.ion}, and what is the positive result?`, `${cap(t.test)} → ${t.result}.`, 'MEDIUM'));
  for (const t of GAS_TESTS) out.push(card('chemistry', '12.5', `What is the test for ${t.gas}?`, `Use ${t.test}: it ${t.result}.`, 'EASY'));
  for (const el of ELEMENTS.filter((e) => e.Z <= 20)) {
    out.push(card('chemistry', '2.2', `Electronic configuration of ${el.name} (Z = ${el.Z})?`, config(el.Z), 'EASY'));
    out.push(card('chemistry', '2.2', `What is the chemical symbol for ${el.name}?`, el.sym, 'EASY'));
  }
  for (const cat of CATIONS) for (const an of ANIONS.slice(0, 6)) {
    out.push(card('chemistry', '3.1', `Formula of the compound of ${cat.name} and ${an.name} ions?`, ionicFormula(cat, an), 'MEDIUM'));
  }
  for (const ion of [...CATIONS, ...ANIONS]) {
    out.push(card('chemistry', '2.4', `What is the formula and charge of the ${ion.name} ion?`, `${ion.sym}${sup(ion.charge, CATIONS.includes(ion) ? '+' : '-')}`, 'EASY'));
  }
  return out;
}
