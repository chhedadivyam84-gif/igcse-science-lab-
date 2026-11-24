import { type Made, type Rng, type Template, mcq, n, sf } from './core';

function calc(stem: string, value: number | string, unit: string, equation: string, working: string, extra: Partial<Made> = {}): Made {
  const answer = `${typeof value === 'number' ? sf(value) : value}${unit ? ` ${unit}` : ''}`;
  return { stem, answer, markScheme: [`Uses ${equation} (1)`, `${answer} (1)`], explanation: `${equation}. ${working} = ${answer}.`, ...extra };
}
const B = (sub: string, make: (r: Rng) => Made | null, extra: Partial<Template> = {}): Template => ({ subject: 'biology', subtopic: sub, make, ...extra });
const I = (sub: string, make: (r: Rng) => Made | null, extra: Partial<Template> = {}): Template => ({ subject: 'ict', subtopic: sub, make, ...extra });

const specimens = ['a cheek cell', 'a red blood cell', 'a palisade cell', 'a bacterium', 'a pollen grain', 'a root hair cell', 'a nucleus', 'a chloroplast', 'a sperm cell', 'a yeast cell', 'an onion cell'];

export const biologyTemplates: Template[] = [
  // --- 2.3 Magnification ---------------------------------------------------------
  B('2.3', (r) => {
    const actualUm = r.pick([2, 5, 7.5, 8, 10, 12, 20, 25, 40, 50, 60, 80, 100, 150, 200]), mag = r.pick([100, 200, 400, 500, 1000, 1500, 2000, 2500, 4000, 5000]);
    const imageMm = (actualUm * mag) / 1000;
    if (imageMm > 300 || imageMm < 1) return null;
    return calc(`A drawing of ${r.pick(specimens)} is ${n(imageMm)} mm long. The magnification is ×${mag}. Calculate the actual length in micrometres (µm).`, actualUm, 'µm', 'actual size = image size ÷ magnification', `${n(imageMm)} mm = ${n(imageMm * 1000)} µm; ${n(imageMm * 1000)} ÷ ${mag}`, { hint: '1 mm = 1000 µm. Convert first.', difficulty: 'CHALLENGE', marks: 3 });
  }, { count: 80 }),
  B('2.3', (r) => {
    const image = r.int(10, 150), actual = r.pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5]);
    return calc(`An image of ${r.pick(specimens)} is ${image} mm long. Its actual length is ${actual} mm. Calculate the magnification.`, `×${sf(image / actual)}`, '', 'magnification = image size ÷ actual size', `${image} ÷ ${actual}`, { marks: 2 });
  }, { count: 60 }),
  B('2.3', (r) => {
    const actual = r.pick([0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5]), mag = r.pick([10, 20, 40, 50, 100, 200, 400]);
    return calc(`A specimen is ${actual} mm long and is viewed at ×${mag}. How long is the image, in mm?`, actual * mag, 'mm', 'image size = actual size × magnification', `${actual} × ${mag}`, { difficulty: 'FOUNDATION' });
  }, { count: 50 }),
  B('2.3', (r) => {
    const mm = r.step(0.001, 5, 0.001);
    return calc(`Convert ${n(mm)} mm into micrometres (µm).`, mm * 1000, 'µm', '1 mm = 1000 µm', `${n(mm)} × 1000`, { marks: 1, difficulty: 'FOUNDATION' });
  }, { count: 40 }),

  // --- 3.1 Osmosis percentage change ----------------------------------------------
  B('3.1', (r) => {
    const start = r.step(1.5, 8, 0.05), change = r.step(-1.2, 1.2, 0.05);
    if (Math.abs(change) < 0.05) return null;
    const end = Number((start + change).toFixed(2));
    const pct = ((end - start) / start) * 100;
    return calc(`A potato cylinder has a mass of ${start.toFixed(2)} g before and ${end.toFixed(2)} g after 30 minutes in a sugar solution. Calculate the percentage change in mass.`, `${pct > 0 ? '+' : ''}${sf(pct)}`, '%', 'percentage change = (final − initial) ÷ initial × 100', `(${end.toFixed(2)} − ${start.toFixed(2)}) ÷ ${start.toFixed(2)} × 100`, { hint: pct < 0 ? 'A loss of mass gives a negative percentage — the cylinder lost water by osmosis.' : 'A gain means the cylinder took in water by osmosis.' });
  }, { count: 70 }),
  B('3.1', (r) => {
    const conc = r.pick([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0]), cell = r.pick([0.2, 0.25, 0.3, 0.35, 0.4]);
    const correct = conc < cell ? 'It gains mass: water enters by osmosis' : conc > cell ? 'It loses mass: water leaves by osmosis' : 'No change in mass: no net movement of water';
    const opts = mcq(r, correct, ['It gains mass: water enters by osmosis', 'It loses mass: water leaves by osmosis', 'No change in mass: no net movement of water', 'It gains mass: sugar enters by diffusion']);
    if (!opts || conc === cell) return null;
    return { stem: `Plant tissue with a cell-sap concentration equivalent to ${cell} mol/dm³ sucrose is placed in ${conc} mol/dm³ sucrose solution. What happens?`, ...opts, explanation: `Water moves by osmosis from a dilute solution (higher water potential) to a concentrated one through the partially permeable membrane. Here the ${conc < cell ? 'solution is more dilute than the cell sap, so water enters' : 'solution is more concentrated than the cell sap, so water leaves'}.` };
  }, { count: 40 }),

  // --- 6.1 Photosynthesis rates ---------------------------------------------------------
  B('6.1', (r) => {
    const bubbles = r.int(8, 120), t = r.pick([1, 2, 3, 4, 5]);
    return calc(`A pondweed releases ${bubbles} bubbles of oxygen in ${t} minute${t > 1 ? 's' : ''}. Calculate the rate of photosynthesis in bubbles per minute.`, bubbles / t, 'bubbles/min', 'rate = number of bubbles ÷ time', `${bubbles} ÷ ${t}`, { difficulty: 'FOUNDATION' });
  }, { count: 40 }),
  B('6.1', (r) => {
    const d1 = r.pick([10, 20, 25, 30, 40]), d2 = d1 * r.pick([2, 3, 4]) / 2;
    if (d2 === d1) return null;
    const factor = (d1 / d2) ** 2;
    return calc(`A lamp is moved from ${d1} cm to ${d2} cm from a plant. Using the inverse square law, by what factor does the light intensity change?`, factor, '', 'light intensity ∝ 1 ÷ distance²', `(${d1} ÷ ${d2})²`, { difficulty: 'CHALLENGE' });
  }, { count: 20 }),

  // --- 5.1 Enzyme rates ------------------------------------------------------------------------
  B('5.1', (r) => {
    const t = r.int(20, 300);
    return calc(`Starch is fully digested by amylase in ${t} s. Calculate the rate of reaction as 1000 ÷ time.`, 1000 / t, 's⁻¹', 'rate = 1000 ÷ time', `1000 ÷ ${t}`, { marks: 1 });
  }, { count: 40 }),

  // --- 19.1 Energy flow ---------------------------------------------------------------------------
  B('19.1', (r) => {
    const a = r.pick([10000, 20000, 25000, 50000, 80000, 100000, 120000]), eff = r.pick([5, 8, 10, 12, 15, 20]);
    const b = (a * eff) / 100;
    return calc(`Producers in a food chain contain ${n(a)} kJ of energy. The primary consumers contain ${n(b)} kJ. Calculate the efficiency of energy transfer.`, eff, '%', 'efficiency = energy transferred ÷ energy available × 100', `${n(b)} ÷ ${n(a)} × 100`);
  }, { count: 40 }),
  B('19.1', (r) => {
    const a = r.pick([10000, 20000, 50000, 100000]), levels = r.int(2, 4);
    return calc(`A food chain starts with ${n(a)} kJ in the producers. If 10% of energy is passed on at each step, how much reaches trophic level ${levels + 1}?`, a * Math.pow(0.1, levels), 'kJ', 'multiply by 0.1 at each transfer', `${n(a)} × 0.1^${levels}`, { difficulty: 'CHALLENGE' });
  }, { count: 12 }),

  // --- 9.1 Heart rate / cardiac --------------------------------------------------------------------
  B('9.1', (r) => {
    const beats = r.int(15, 50), secs = r.pick([10, 15, 20, 30]);
    return calc(`A student counts ${beats} pulse beats in ${secs} seconds. Calculate the heart rate in beats per minute.`, (beats * 60) / secs, 'beats/min', 'beats per minute = beats × (60 ÷ seconds counted)', `${beats} × ${60 / secs}`, { difficulty: 'FOUNDATION' });
  }, { count: 40 }),

  // --- 11.1 Breathing ------------------------------------------------------------------------------------
  B('11.1', (r) => {
    const breaths = r.int(10, 40), mins = r.pick([1, 2, 3]), vol = r.step(0.3, 2.5, 0.1);
    return calc(`A person takes ${breaths * mins} breaths in ${mins} minute${mins > 1 ? 's' : ''}, each of ${n(vol)} dm³. Calculate the volume of air breathed per minute.`, breaths * vol, 'dm³/min', 'volume per minute = breaths per minute × volume per breath', `${breaths} × ${n(vol)}`);
  }, { count: 40 }),

  // --- 17.1 Monohybrid inheritance --------------------------------------------------------------------------
  B('17.1', (r) => {
    const genes = r.pick([
      ['T', 't', 'tall', 'short', 'pea plants'],
      ['B', 'b', 'brown eyes', 'blue eyes', 'humans'],
      ['R', 'r', 'red flowers', 'white flowers', 'a plant species'],
      ['G', 'g', 'green pods', 'yellow pods', 'pea plants'],
      ['A', 'a', 'normal pigment', 'albinism', 'mice'],
    ] as const);
    const [D, d, domTrait, recTrait, org] = genes;
    const parents = r.pick([[`${D}${d}`, `${D}${d}`], [`${D}${d}`, `${d}${d}`], [`${D}${D}`, `${d}${d}`], [`${D}${D}`, `${D}${d}`]] as const);
    const kids = [...parents[0]].flatMap((x) => [...parents[1]].map((y) => [x, y].sort().join('')));
    const recessive = kids.filter((k) => k === `${d}${d}`).length;
    const ask = r.pick(['recessive', 'dominant'] as const);
    const count = ask === 'recessive' ? recessive : 4 - recessive;
    const pct = `${(count / 4) * 100}%`;
    const opts = mcq(r, pct, ['0%', '25%', '50%', '75%', '100%']);
    if (!opts) return null;
    return {
      stem: `In ${org}, the allele for ${domTrait} (${D}) is dominant to the allele for ${recTrait} (${d}). Two parents with genotypes ${parents[0]} and ${parents[1]} are crossed. What percentage of the offspring are expected to show ${ask === 'recessive' ? recTrait : domTrait}?`,
      ...opts,
      explanation: `Punnett square: offspring genotypes ${kids.join(', ')}. ${count} of 4 show ${ask === 'recessive' ? recTrait : domTrait} = ${pct}. Only ${d}${d} shows the recessive phenotype.`,
      difficulty: 'CHALLENGE',
    };
  }, { count: 60 }),

  // --- 2.3 SA:V ----------------------------------------------------------------------------------------------
  B('3.1', (r) => {
    const s = r.int(1, 10);
    return calc(`Calculate the surface area to volume ratio of a cube of side ${s} cm, as the single number surface area ÷ volume.`, (6 * s * s) / (s ** 3), '', 'SA : V = 6s² ÷ s³', `${6 * s * s} ÷ ${s ** 3}`, { hint: 'Smaller cubes have a larger ratio — why small cells exchange substances efficiently.' });
  }, { count: 10 }),
];

export const ictTemplates: Template[] = [
  // --- 20.1 Spreadsheet functions ------------------------------------------------------
  I('20.1', (r) => {
    const values = Array.from({ length: r.int(4, 7) }, () => r.int(1, 99));
    const fn = r.pick(['SUM', 'AVERAGE', 'MAX', 'MIN', 'COUNT'] as const);
    const last = String.fromCharCode(66 + values.length - 1);
    const value = fn === 'SUM' ? values.reduce((a, b) => a + b, 0) : fn === 'AVERAGE' ? values.reduce((a, b) => a + b, 0) / values.length : fn === 'MAX' ? Math.max(...values) : fn === 'MIN' ? Math.min(...values) : values.length;
    return { stem: `Cells B1 to ${last}1 contain ${values.join(', ')}. What value does =${fn}(B1:${last}1) return?`, answer: sf(value, 4), markScheme: [`${sf(value, 4)} (1)`], marks: 1, explanation: `${fn} over the range gives ${sf(value, 4)}.`, difficulty: 'FOUNDATION' };
  }, { count: 80 }),
  I('20.1', (r) => {
    const v = r.int(0, 100), threshold = r.pick([40, 50, 60, 70]);
    const pass = r.pick(['"Pass"', '"Yes"', '"Merit"']), fail = r.pick(['"Fail"', '"No"', '"Retake"']);
    const op = r.pick(['>=', '>', '<']);
    const res = op === '>=' ? v >= threshold : op === '>' ? v > threshold : v < threshold;
    const correct = (res ? pass : fail).replace(/"/g, '');
    const opts = mcq(r, correct, [pass.replace(/"/g, ''), fail.replace(/"/g, ''), 'TRUE', '#VALUE!']);
    if (!opts) return null;
    return { stem: `Cell C2 contains ${v}. What does =IF(C2${op}${threshold},${pass},${fail}) display?`, ...opts, explanation: `${v} ${op} ${threshold} is ${res ? 'TRUE' : 'FALSE'}, so IF returns ${correct}.` };
  }, { count: 60 }),
  I('20.1', (r) => {
    const rows = r.int(1, 6), col = r.pick(['B', 'C', 'D']), fixed = r.pick(['$E$1', '$F$2', '$H$1']);
    const startRow = r.int(2, 5);
    const absolute = r.pick([true, false]);
    const formula = absolute ? `=${col}${startRow}*${fixed}` : `=${col}${startRow}*${fixed.replace(/\$/g, '')}`;
    const fixedRel = fixed.replace(/\$/g, '');
    const movedRel = `${fixedRel[0]}${Number(fixedRel.slice(1)) + rows}`;
    const correct = absolute ? `=${col}${startRow + rows}*${fixed}` : `=${col}${startRow + rows}*${movedRel}`;
    const opts = mcq(r, correct, [`=${col}${startRow}*${fixed}`, `=${col}${startRow + rows}*${absolute ? movedRel : fixedRel}`, `=${col}${startRow + rows}*${fixed}`, `=${col}${startRow}*${movedRel}`]);
    if (!opts) return null;
    return { stem: `Cell G${startRow} contains ${formula}. It is copied down to G${startRow + rows}. What formula is in G${startRow + rows}?`, ...opts, explanation: `Relative references change as the formula is copied down ${rows} row${rows > 1 ? 's' : ''}; ${absolute ? `the absolute reference ${fixed} stays fixed` : 'every reference here is relative, so all row numbers increase'}: ${correct}.` };
  }, { count: 60 }),
  I('20.1', (r) => {
    const x = r.step(1, 999, 0.001), dp = r.int(0, 2);
    if (Math.round(x * Math.pow(10, dp + 1)) % 10 === 5) return null;
    return { stem: `What value does =ROUND(${x},${dp}) return?`, answer: x.toFixed(dp), markScheme: [`${x.toFixed(dp)} (1)`], marks: 1, explanation: `ROUND to ${dp} decimal place${dp === 1 ? '' : 's'}: ${x.toFixed(dp)}.` };
  }, { count: 40 }),

  // --- 18.2 Validation ---------------------------------------------------------------------
  I('18.2', (r) => {
    const cases = [
      ['A form rejects an age entered as 150 because ages must be between 0 and 120.', 'Range check'],
      ['A field must not be left blank before the form can be submitted.', 'Presence check'],
      ['A password must be at least 8 characters long.', 'Length check'],
      ['A quantity field rejects the entry "ten" because it must be a number.', 'Type check'],
      ['A postcode must match the pattern of letters and digits used by the post office.', 'Format check'],
      ['The last digit of an ISBN is calculated from the other digits to detect typing errors.', 'Check digit'],
      ['A date of birth is rejected if it is after today.', 'Range check'],
      ['A product code must be exactly 6 characters.', 'Length check'],
      ['An email address field is rejected if it does not contain an @ symbol.', 'Format check'],
      ['A phone number field only accepts digits.', 'Type check'],
      ['Data is typed in twice and the two entries are compared by the computer.', 'Double data entry (verification)'],
      ['A user reads the data on screen and compares it with the original document.', 'Visual check (verification)'],
    ] as const;
    const [desc, correct] = r.pick(cases);
    const opts = mcq(r, correct, ['Range check', 'Presence check', 'Length check', 'Type check', 'Format check', 'Check digit', 'Double data entry (verification)', 'Visual check (verification)']);
    if (!opts) return null;
    return { stem: `${desc} Which check is this?`, ...opts, explanation: `This is a ${correct.toLowerCase()}. ${correct.includes('verification') ? 'Verification checks data has been copied correctly; it does not check the data is sensible.' : 'Validation checks data is reasonable and follows the rules; it cannot check data is actually correct.'}` };
  }, { count: 12 }),

  // --- 11.1 File sizes -------------------------------------------------------------------------
  I('11.1', (r) => {
    const w = r.pick([100, 200, 320, 640, 800, 1024, 1280]), h = r.pick([100, 200, 240, 480, 600, 768]), depth = r.pick([1, 8, 16, 24]);
    return { stem: `An image is ${w} × ${h} pixels with a colour depth of ${depth} bit${depth > 1 ? 's' : ''}. Calculate its file size in bytes (ignore any header data).`, answer: `${w * h * depth / 8} bytes`, markScheme: [`${w} × ${h} × ${depth} bits (1)`, `÷ 8 = ${w * h * depth / 8} bytes (1)`], marks: 2, explanation: `${w} × ${h} × ${depth} = ${w * h * depth} bits; ÷ 8 = ${w * h * depth / 8} bytes.` };
  }, { count: 60 }),
];
