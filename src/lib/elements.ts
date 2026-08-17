/**
 * Periodic table data.
 *
 * Electron shell configurations are stored explicitly for the first 20 elements
 * — the range Cambridge IGCSE actually examines — and derived from Aufbau
 * filling order beyond that. Every element carries `configurationSource` so the
 * UI can say which it is rather than presenting a derived value as authoritative.
 */

export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export type ElementState = 'solid' | 'liquid' | 'gas';

export type Element = {
  number: number;
  symbol: string;
  name: string;
  /** Relative atomic mass. Values in brackets in the literature (unstable
   *  elements) are stored as the mass number of the most stable isotope. */
  mass: number;
  group: number; // 1-18; 0 for lanthanides and actinides
  period: number;
  category: ElementCategory;
  state: ElementState;
  shells: number[];
  configurationSource: 'exact' | 'derived';
  /** Roman-numeral group as used in IGCSE, or null for d-block/f-block. */
  igcseGroup: string | null;
  /** Grid position for the table layout. */
  x: number;
  y: number;
  notes?: string;
};

type Row = [number, string, string, number, number, number, ElementCategory, ElementState];

// prettier-ignore
const RAW: Row[] = [
  [1,'H','Hydrogen',1.008,1,1,'nonmetal','gas'],
  [2,'He','Helium',4.003,18,1,'noble-gas','gas'],
  [3,'Li','Lithium',6.94,1,2,'alkali-metal','solid'],
  [4,'Be','Beryllium',9.012,2,2,'alkaline-earth','solid'],
  [5,'B','Boron',10.81,13,2,'metalloid','solid'],
  [6,'C','Carbon',12.011,14,2,'nonmetal','solid'],
  [7,'N','Nitrogen',14.007,15,2,'nonmetal','gas'],
  [8,'O','Oxygen',15.999,16,2,'nonmetal','gas'],
  [9,'F','Fluorine',18.998,17,2,'halogen','gas'],
  [10,'Ne','Neon',20.180,18,2,'noble-gas','gas'],
  [11,'Na','Sodium',22.990,1,3,'alkali-metal','solid'],
  [12,'Mg','Magnesium',24.305,2,3,'alkaline-earth','solid'],
  [13,'Al','Aluminium',26.982,13,3,'post-transition','solid'],
  [14,'Si','Silicon',28.085,14,3,'metalloid','solid'],
  [15,'P','Phosphorus',30.974,15,3,'nonmetal','solid'],
  [16,'S','Sulfur',32.06,16,3,'nonmetal','solid'],
  [17,'Cl','Chlorine',35.45,17,3,'halogen','gas'],
  [18,'Ar','Argon',39.948,18,3,'noble-gas','gas'],
  [19,'K','Potassium',39.098,1,4,'alkali-metal','solid'],
  [20,'Ca','Calcium',40.078,2,4,'alkaline-earth','solid'],
  [21,'Sc','Scandium',44.956,3,4,'transition','solid'],
  [22,'Ti','Titanium',47.867,4,4,'transition','solid'],
  [23,'V','Vanadium',50.942,5,4,'transition','solid'],
  [24,'Cr','Chromium',51.996,6,4,'transition','solid'],
  [25,'Mn','Manganese',54.938,7,4,'transition','solid'],
  [26,'Fe','Iron',55.845,8,4,'transition','solid'],
  [27,'Co','Cobalt',58.933,9,4,'transition','solid'],
  [28,'Ni','Nickel',58.693,10,4,'transition','solid'],
  [29,'Cu','Copper',63.546,11,4,'transition','solid'],
  [30,'Zn','Zinc',65.38,12,4,'transition','solid'],
  [31,'Ga','Gallium',69.723,13,4,'post-transition','solid'],
  [32,'Ge','Germanium',72.630,14,4,'metalloid','solid'],
  [33,'As','Arsenic',74.922,15,4,'metalloid','solid'],
  [34,'Se','Selenium',78.971,16,4,'nonmetal','solid'],
  [35,'Br','Bromine',79.904,17,4,'halogen','liquid'],
  [36,'Kr','Krypton',83.798,18,4,'noble-gas','gas'],
  [37,'Rb','Rubidium',85.468,1,5,'alkali-metal','solid'],
  [38,'Sr','Strontium',87.62,2,5,'alkaline-earth','solid'],
  [39,'Y','Yttrium',88.906,3,5,'transition','solid'],
  [40,'Zr','Zirconium',91.224,4,5,'transition','solid'],
  [41,'Nb','Niobium',92.906,5,5,'transition','solid'],
  [42,'Mo','Molybdenum',95.95,6,5,'transition','solid'],
  [43,'Tc','Technetium',98,7,5,'transition','solid'],
  [44,'Ru','Ruthenium',101.07,8,5,'transition','solid'],
  [45,'Rh','Rhodium',102.91,9,5,'transition','solid'],
  [46,'Pd','Palladium',106.42,10,5,'transition','solid'],
  [47,'Ag','Silver',107.87,11,5,'transition','solid'],
  [48,'Cd','Cadmium',112.41,12,5,'transition','solid'],
  [49,'In','Indium',114.82,13,5,'post-transition','solid'],
  [50,'Sn','Tin',118.71,14,5,'post-transition','solid'],
  [51,'Sb','Antimony',121.76,15,5,'metalloid','solid'],
  [52,'Te','Tellurium',127.60,16,5,'metalloid','solid'],
  [53,'I','Iodine',126.90,17,5,'halogen','solid'],
  [54,'Xe','Xenon',131.29,18,5,'noble-gas','gas'],
  [55,'Cs','Caesium',132.91,1,6,'alkali-metal','solid'],
  [56,'Ba','Barium',137.33,2,6,'alkaline-earth','solid'],
  [57,'La','Lanthanum',138.91,0,6,'lanthanide','solid'],
  [58,'Ce','Cerium',140.12,0,6,'lanthanide','solid'],
  [59,'Pr','Praseodymium',140.91,0,6,'lanthanide','solid'],
  [60,'Nd','Neodymium',144.24,0,6,'lanthanide','solid'],
  [61,'Pm','Promethium',145,0,6,'lanthanide','solid'],
  [62,'Sm','Samarium',150.36,0,6,'lanthanide','solid'],
  [63,'Eu','Europium',151.96,0,6,'lanthanide','solid'],
  [64,'Gd','Gadolinium',157.25,0,6,'lanthanide','solid'],
  [65,'Tb','Terbium',158.93,0,6,'lanthanide','solid'],
  [66,'Dy','Dysprosium',162.50,0,6,'lanthanide','solid'],
  [67,'Ho','Holmium',164.93,0,6,'lanthanide','solid'],
  [68,'Er','Erbium',167.26,0,6,'lanthanide','solid'],
  [69,'Tm','Thulium',168.93,0,6,'lanthanide','solid'],
  [70,'Yb','Ytterbium',173.05,0,6,'lanthanide','solid'],
  [71,'Lu','Lutetium',174.97,0,6,'lanthanide','solid'],
  [72,'Hf','Hafnium',178.49,4,6,'transition','solid'],
  [73,'Ta','Tantalum',180.95,5,6,'transition','solid'],
  [74,'W','Tungsten',183.84,6,6,'transition','solid'],
  [75,'Re','Rhenium',186.21,7,6,'transition','solid'],
  [76,'Os','Osmium',190.23,8,6,'transition','solid'],
  [77,'Ir','Iridium',192.22,9,6,'transition','solid'],
  [78,'Pt','Platinum',195.08,10,6,'transition','solid'],
  [79,'Au','Gold',196.97,11,6,'transition','solid'],
  [80,'Hg','Mercury',200.59,12,6,'transition','liquid'],
  [81,'Tl','Thallium',204.38,13,6,'post-transition','solid'],
  [82,'Pb','Lead',207.2,14,6,'post-transition','solid'],
  [83,'Bi','Bismuth',208.98,15,6,'post-transition','solid'],
  [84,'Po','Polonium',209,16,6,'metalloid','solid'],
  [85,'At','Astatine',210,17,6,'halogen','solid'],
  [86,'Rn','Radon',222,18,6,'noble-gas','gas'],
  [87,'Fr','Francium',223,1,7,'alkali-metal','solid'],
  [88,'Ra','Radium',226,2,7,'alkaline-earth','solid'],
  [89,'Ac','Actinium',227,0,7,'actinide','solid'],
  [90,'Th','Thorium',232.04,0,7,'actinide','solid'],
  [91,'Pa','Protactinium',231.04,0,7,'actinide','solid'],
  [92,'U','Uranium',238.03,0,7,'actinide','solid'],
  [93,'Np','Neptunium',237,0,7,'actinide','solid'],
  [94,'Pu','Plutonium',244,0,7,'actinide','solid'],
  [95,'Am','Americium',243,0,7,'actinide','solid'],
  [96,'Cm','Curium',247,0,7,'actinide','solid'],
  [97,'Bk','Berkelium',247,0,7,'actinide','solid'],
  [98,'Cf','Californium',251,0,7,'actinide','solid'],
  [99,'Es','Einsteinium',252,0,7,'actinide','solid'],
  [100,'Fm','Fermium',257,0,7,'actinide','solid'],
  [101,'Md','Mendelevium',258,0,7,'actinide','solid'],
  [102,'No','Nobelium',259,0,7,'actinide','solid'],
  [103,'Lr','Lawrencium',266,0,7,'actinide','solid'],
  [104,'Rf','Rutherfordium',267,4,7,'transition','solid'],
  [105,'Db','Dubnium',268,5,7,'transition','solid'],
  [106,'Sg','Seaborgium',269,6,7,'transition','solid'],
  [107,'Bh','Bohrium',270,7,7,'transition','solid'],
  [108,'Hs','Hassium',269,8,7,'transition','solid'],
  [109,'Mt','Meitnerium',278,9,7,'transition','solid'],
  [110,'Ds','Darmstadtium',281,10,7,'transition','solid'],
  [111,'Rg','Roentgenium',282,11,7,'transition','solid'],
  [112,'Cn','Copernicium',285,12,7,'transition','solid'],
  [113,'Nh','Nihonium',286,13,7,'post-transition','solid'],
  [114,'Fl','Flerovium',289,14,7,'post-transition','solid'],
  [115,'Mc','Moscovium',290,15,7,'post-transition','solid'],
  [116,'Lv','Livermorium',293,16,7,'post-transition','solid'],
  [117,'Ts','Tennessine',294,17,7,'halogen','solid'],
  [118,'Og','Oganesson',294,18,7,'noble-gas','solid'],
];

/** Shell occupancies for Z = 1–20, the range IGCSE requires. */
const EXACT_SHELLS: Record<number, number[]> = {
  1: [1], 2: [2],
  3: [2, 1], 4: [2, 2], 5: [2, 3], 6: [2, 4], 7: [2, 5], 8: [2, 6], 9: [2, 7], 10: [2, 8],
  11: [2, 8, 1], 12: [2, 8, 2], 13: [2, 8, 3], 14: [2, 8, 4], 15: [2, 8, 5],
  16: [2, 8, 6], 17: [2, 8, 7], 18: [2, 8, 8],
  19: [2, 8, 8, 1], 20: [2, 8, 8, 2],
};

/** Aufbau filling order, used only beyond Z = 20 (outside the IGCSE range). */
const AUFBAU: [number, number][] = [
  [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [3, 10], [4, 6], [5, 2], [4, 10],
  [5, 6], [6, 2], [4, 14], [5, 10], [6, 6], [7, 2], [5, 14], [6, 10], [7, 6],
];

function deriveShells(z: number): number[] {
  const shells: number[] = [];
  let remaining = z;
  for (const [shell, capacity] of AUFBAU) {
    if (remaining <= 0) break;
    const placed = Math.min(remaining, capacity);
    shells[shell - 1] = (shells[shell - 1] ?? 0) + placed;
    remaining -= placed;
  }
  return shells.map((n) => n ?? 0);
}

const ROMAN: Record<number, string> = {
  1: 'I', 2: 'II', 13: 'III', 14: 'IV', 15: 'V', 16: 'VI', 17: 'VII', 18: 'VIII',
};

function layout(z: number, group: number, period: number): { x: number; y: number } {
  if (z >= 57 && z <= 71) return { x: z - 57 + 3, y: 9 };
  if (z >= 89 && z <= 103) return { x: z - 89 + 3, y: 10 };
  return { x: group, y: period };
}

const NOTES: Record<string, string> = {
  H: 'Not a member of Group I. Its ion, H⁺, is what makes a solution acidic. Test: burns with a squeaky pop.',
  He: 'Full outer shell of 2 electrons, so it is unreactive. Used in balloons because it is less dense than air.',
  Li: 'Group I. Reacts steadily with water to give lithium hydroxide and hydrogen; flame test is red.',
  C: 'Forms four covalent bonds. Diamond and graphite are its giant covalent forms; the basis of all organic chemistry.',
  N: 'About 78% of clean dry air. Very unreactive because of the strong triple bond in N₂.',
  O: 'About 21% of clean dry air. Test: relights a glowing splint.',
  F: 'The most reactive halogen. Reactivity decreases down Group VII.',
  Ne: 'Noble gas with a full outer shell (2,8). Used in illuminated signs.',
  Na: 'Group I, configuration 2,8,1. Reacts vigorously with water; flame test is yellow.',
  Mg: 'Group II, configuration 2,8,2. Burns with a bright white flame to form magnesium oxide.',
  Al: 'Extracted by electrolysis because it is more reactive than carbon. Protected by a thin oxide layer.',
  Si: 'Metalloid. Silicon(IV) oxide is a giant covalent structure, used in sand and glass.',
  S: 'Burning sulfur compounds in fuels produces sulfur dioxide, a cause of acid rain.',
  Cl: 'Group VII, a pale green gas. Displaces bromine and iodine from their salts.',
  Ar: 'Noble gas used in filament lamps because it is unreactive.',
  K: 'Group I, configuration 2,8,8,1. More reactive than sodium; flame test is lilac.',
  Ca: 'Group II, configuration 2,8,8,2. Calcium carbonate is limestone.',
  Fe: 'Transition element. Extracted in the blast furnace; rusts in the presence of oxygen and water.',
  Cu: 'Below hydrogen in the reactivity series, so it does not react with dilute acids. Excellent electrical conductor.',
  Zn: 'Used to galvanise iron — it corrodes in preference to the iron (sacrificial protection).',
  Br: 'The only non-metal that is liquid at room temperature. Bromine water tests for alkenes.',
  Ag: 'Silver nitrate solution is used to test for halide ions.',
  I: 'A grey-black solid that sublimes to a purple vapour. Least reactive of the common halogens.',
  Pb: 'Lead(II) bromide is the standard molten electrolyte in electrolysis experiments.',
  Au: 'So unreactive it is found as the native metal. Bottom of the reactivity series.',
  U: 'Undergoes nuclear fission; used as a fuel in nuclear power stations.',
};

export const elements: Element[] = RAW.map(
  ([number, symbol, name, mass, group, period, category, state]) => {
    const exact = EXACT_SHELLS[number];
    const { x, y } = layout(number, group, period);
    return {
      number,
      symbol,
      name,
      mass,
      group,
      period,
      category,
      state,
      shells: exact ?? deriveShells(number),
      configurationSource: exact ? 'exact' : 'derived',
      igcseGroup: group in ROMAN ? ROMAN[group] : null,
      x,
      y,
      notes: NOTES[symbol],
    };
  },
);

export const elementBySymbol = new Map(elements.map((e) => [e.symbol, e]));
export const elementByNumber = new Map(elements.map((e) => [e.number, e]));

export const CATEGORY_LABELS: Record<ElementCategory, string> = {
  'alkali-metal': 'Alkali metal (Group I)',
  'alkaline-earth': 'Alkaline earth metal (Group II)',
  transition: 'Transition element',
  'post-transition': 'Other metal',
  metalloid: 'Metalloid',
  nonmetal: 'Non-metal',
  halogen: 'Halogen (Group VII)',
  'noble-gas': 'Noble gas (Group VIII)',
  lanthanide: 'Lanthanide',
  actinide: 'Actinide',
};

/** Colours are HSL strings so both themes can tint them consistently. */
export const CATEGORY_HUES: Record<ElementCategory, number> = {
  'alkali-metal': 350,
  'alkaline-earth': 20,
  transition: 200,
  'post-transition': 220,
  metalloid: 160,
  nonmetal: 130,
  halogen: 275,
  'noble-gas': 300,
  lanthanide: 45,
  actinide: 15,
};

export function electronConfiguration(element: Element): string {
  return element.shells.join(',');
}

/**
 * Relative atomic masses as they appear on the Cambridge periodic table data
 * sheet — whole numbers, apart from a handful given to one decimal place.
 *
 * Stoichiometry has to use these rather than the precise IUPAC values, or every
 * answer drifts away from the mark scheme: Mr(CaCO₃) is 100, not 100.086.
 */
const IGCSE_AR_OVERRIDES: Record<string, number> = {
  Cl: 35.5,
  Cu: 63.5,
};

export function igcseAr(element: Element): number {
  return IGCSE_AR_OVERRIDES[element.symbol] ?? Math.round(element.mass);
}

/**
 * Relative formula mass from a formula such as "Ca(OH)2" or "CuSO4.5H2O".
 *
 * Uses the IGCSE data-sheet Ar values so results match mark schemes. Returns
 * null when a symbol is not recognised, so callers can show an error rather
 * than a silently wrong number.
 */
export function relativeFormulaMass(formula: string): { mass: number; breakdown: string[] } | null {
  const counts = parseFormula(formula);
  if (!counts) return null;
  let mass = 0;
  const breakdown: string[] = [];
  for (const [symbol, count] of counts) {
    const element = elementBySymbol.get(symbol);
    if (!element) return null;
    const ar = igcseAr(element);
    mass += ar * count;
    breakdown.push(
      count === 1 ? `${symbol} = ${ar}` : `${symbol} × ${count} = ${Number((ar * count).toFixed(4))}`,
    );
  }
  return { mass: Number(mass.toFixed(4)), breakdown };
}

/** Tokenises a chemical formula, handling brackets and hydration dots. */
export function parseFormula(formula: string): Map<string, number> | null {
  const cleaned = formula.replace(/\s+/g, '').replace(/·/g, '.');
  if (!cleaned) return null;

  const totals = new Map<string, number>();
  for (const part of cleaned.split('.')) {
    // A leading number multiplies the whole unit, e.g. the "5" in ".5H2O".
    const lead = part.match(/^(\d+)(.*)$/);
    const multiplier = lead ? Number(lead[1]) : 1;
    const body = lead ? lead[2] : part;
    const parsed = parseGroup(body);
    if (!parsed) return null;
    for (const [symbol, count] of parsed) {
      totals.set(symbol, (totals.get(symbol) ?? 0) + count * multiplier);
    }
  }
  return totals.size ? totals : null;
}

function parseGroup(input: string): Map<string, number> | null {
  const stack: Map<string, number>[] = [new Map()];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (char === '(' || char === '[') {
      stack.push(new Map());
      i++;
      continue;
    }

    if (char === ')' || char === ']') {
      const group = stack.pop();
      if (!group || stack.length === 0) return null;
      i++;
      const digits = input.slice(i).match(/^\d+/);
      const multiplier = digits ? Number(digits[0]) : 1;
      if (digits) i += digits[0].length;
      const target = stack[stack.length - 1];
      for (const [symbol, count] of group) {
        target.set(symbol, (target.get(symbol) ?? 0) + count * multiplier);
      }
      continue;
    }

    const symbolMatch = input.slice(i).match(/^[A-Z][a-z]?/);
    if (!symbolMatch) return null;
    const symbol = symbolMatch[0];
    if (!elementBySymbol.has(symbol)) return null;
    i += symbol.length;

    const digits = input.slice(i).match(/^\d+/);
    const count = digits ? Number(digits[0]) : 1;
    if (digits) i += digits[0].length;

    const target = stack[stack.length - 1];
    target.set(symbol, (target.get(symbol) ?? 0) + count);
  }

  return stack.length === 1 ? stack[0] : null;
}
