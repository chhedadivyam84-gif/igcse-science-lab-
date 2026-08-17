import type { DiagramNode, DiagramSpec } from '@/lib/types';

/**
 * Hand-authored, checked diagrams.
 *
 * Scientific diagrams have to be right, so the generator looks here first and
 * only falls back to a model-produced spec when nothing matches. Every diagram
 * in this file has `aiAssisted: false` and cites the subtopic it belongs to.
 */

type LibraryEntry = {
  key: string;
  /** Lower-case terms that should select this diagram. */
  match: string[];
  build: () => DiagramSpec;
};

const W = 720;
const H = 420;

function base(spec: Omit<DiagramSpec, 'width' | 'height' | 'aiAssisted'>): DiagramSpec {
  return { ...spec, width: W, height: H, aiAssisted: false };
}

/** Draws an atom as a nucleus plus labelled electron shells. */
function shellNodes(
  cx: number,
  cy: number,
  shells: number[],
  nucleusLabel: string,
  tone: string,
  idPrefix: string,
): DiagramNode[] {
  const nodes: DiagramNode[] = [
    { kind: 'circle', id: `${idPrefix}-nucleus`, x: cx, y: cy, r: 16, label: nucleusLabel, tone },
  ];
  shells.forEach((count, index) => {
    const radius = 34 + index * 22;
    nodes.push({ kind: 'circle', id: `${idPrefix}-shell-${index}`, x: cx, y: cy, r: radius, tone: 'muted' });
    for (let e = 0; e < count; e++) {
      const angle = (e / count) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        kind: 'circle',
        id: `${idPrefix}-e-${index}-${e}`,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        r: 4,
        tone,
      });
    }
  });
  return nodes;
}

const ENTRIES: LibraryEntry[] = [
  {
    key: 'transformer',
    match: ['transformer', 'step-up', 'step up', 'step-down', 'step down', 'turns ratio', 'national grid'],
    build: () =>
      base({
        title: 'How a transformer works',
        caption:
          'An alternating current in the primary coil creates a changing magnetic field in the soft-iron core, which induces an alternating e.m.f. in the secondary coil.',
        nodes: [
          // Soft-iron core (a rectangular ring).
          { kind: 'box', id: 'core-outer', x: 220, y: 90, w: 280, h: 240, label: '', tone: 'muted' },
          { kind: 'box', id: 'core-inner', x: 270, y: 140, w: 180, h: 140, label: '', tone: 'muted' },
          { kind: 'label', id: 'core-label', x: 360, y: 355, text: 'Soft-iron core', anchor: 'middle', tone: 'muted' },

          // Primary side.
          { kind: 'coil', id: 'primary', x: 200, y: 130, w: 40, h: 160, turns: 5, tone: 'physics' },
          { kind: 'label', id: 'primary-label', x: 140, y: 120, text: 'Primary coil', anchor: 'middle', tone: 'physics' },
          { kind: 'label', id: 'primary-turns', x: 140, y: 138, text: 'Np turns', anchor: 'middle', tone: 'muted' },
          { kind: 'circle', id: 'ac-source', x: 90, y: 210, r: 26, label: '~', tone: 'physics' },
          { kind: 'label', id: 'ac-label', x: 90, y: 258, text: 'a.c. supply Vp', anchor: 'middle', tone: 'muted' },
          { kind: 'line', id: 'p-wire-top', x1: 90, y1: 184, x2: 90, y2: 140, tone: 'physics' },
          { kind: 'line', id: 'p-wire-top2', x1: 90, y1: 140, x2: 200, y2: 140, tone: 'physics' },
          { kind: 'line', id: 'p-wire-bot', x1: 90, y1: 236, x2: 90, y2: 280, tone: 'physics' },
          { kind: 'line', id: 'p-wire-bot2', x1: 90, y1: 280, x2: 200, y2: 280, tone: 'physics' },

          // Secondary side.
          { kind: 'coil', id: 'secondary', x: 480, y: 130, w: 40, h: 160, turns: 9, tone: 'accent' },
          { kind: 'label', id: 'secondary-label', x: 592, y: 120, text: 'Secondary coil', anchor: 'middle', tone: 'accent' },
          { kind: 'label', id: 'secondary-turns', x: 592, y: 138, text: 'Ns turns', anchor: 'middle', tone: 'muted' },
          { kind: 'line', id: 's-wire-top', x1: 520, y1: 140, x2: 630, y2: 140, tone: 'accent' },
          { kind: 'line', id: 's-wire-top2', x1: 630, y1: 140, x2: 630, y2: 190, tone: 'accent' },
          { kind: 'line', id: 's-wire-bot', x1: 520, y1: 280, x2: 630, y2: 280, tone: 'accent' },
          { kind: 'line', id: 's-wire-bot2', x1: 630, y1: 280, x2: 630, y2: 230, tone: 'accent' },
          { kind: 'circle', id: 'output', x: 630, y: 210, r: 20, label: 'V', tone: 'accent' },
          { kind: 'label', id: 'output-label', x: 630, y: 256, text: 'Output Vs', anchor: 'middle', tone: 'muted' },

          // Changing flux.
          { kind: 'arrow', id: 'flux-1', x1: 300, y1: 118, x2: 400, y2: 118, label: 'changing magnetic field', tone: 'positive' },
          { kind: 'arrow', id: 'flux-2', x1: 400, y1: 302, x2: 300, y2: 302, tone: 'positive' },

          { kind: 'label', id: 'equation', x: 360, y: 390, text: 'Vp / Vs = Np / Ns', anchor: 'middle', tone: 'accent' },
        ],
        keyTerms: [
          { term: 'Primary coil', meaning: 'The input coil, connected to the alternating supply.' },
          { term: 'Soft-iron core', meaning: 'Carries the changing magnetic field from the primary to the secondary.' },
          { term: 'Secondary coil', meaning: 'The output coil, in which an alternating e.m.f. is induced.' },
          { term: 'Step-up transformer', meaning: 'One with more turns on the secondary than the primary, so Vs > Vp.' },
        ],
        explanation: [
          'An alternating current flows in the primary coil.',
          'This produces a continuously changing magnetic field around the primary.',
          'The soft-iron core carries the changing field to the secondary coil.',
          'The changing field through the secondary induces an alternating e.m.f. across it.',
          'The turns ratio sets the output voltage: Vp / Vs = Np / Ns.',
          'A transformer cannot work on d.c., because a steady current produces an unchanging field and induces nothing.',
        ],
        sourceRefs: ['4.5'],
      }),
  },

  {
    key: 'ionic-bonding-nacl',
    match: ['ionic bond', 'ionic bonding', 'sodium and chlorine', 'sodium chloride', 'nacl', 'electron transfer'],
    build: () =>
      base({
        title: 'Ionic bonding: sodium and chlorine',
        caption:
          'Sodium transfers its single outer electron to chlorine. Both atoms achieve full outer shells and the oppositely charged ions attract.',
        nodes: [
          { kind: 'label', id: 'before', x: 200, y: 40, text: 'Before: neutral atoms', anchor: 'middle', tone: 'muted' },
          ...shellNodes(130, 150, [2, 8, 1], 'Na', 'chemistry', 'na'),
          { kind: 'label', id: 'na-config', x: 130, y: 250, text: 'Na  2,8,1', anchor: 'middle', tone: 'chemistry' },
          ...shellNodes(310, 150, [2, 8, 7], 'Cl', 'accent', 'cl'),
          { kind: 'label', id: 'cl-config', x: 310, y: 250, text: 'Cl  2,8,7', anchor: 'middle', tone: 'accent' },
          {
            kind: 'arrow',
            id: 'transfer',
            x1: 170,
            y1: 118,
            x2: 268,
            y2: 118,
            label: 'one electron transferred',
            tone: 'positive',
          },

          { kind: 'label', id: 'after', x: 560, y: 40, text: 'After: ions', anchor: 'middle', tone: 'muted' },
          ...shellNodes(490, 150, [2, 8], 'Na', 'chemistry', 'nai'),
          { kind: 'label', id: 'na-ion', x: 490, y: 250, text: '[Na]⁺  2,8', anchor: 'middle', tone: 'chemistry' },
          ...shellNodes(630, 150, [2, 8, 8], 'Cl', 'accent', 'cli'),
          { kind: 'label', id: 'cl-ion', x: 630, y: 250, text: '[Cl]⁻  2,8,8', anchor: 'middle', tone: 'accent' },
          {
            kind: 'arrow',
            id: 'attraction-a',
            x1: 540,
            y1: 296,
            x2: 570,
            y2: 296,
            tone: 'negative',
          },
          {
            kind: 'arrow',
            id: 'attraction-b',
            x1: 590,
            y1: 296,
            x2: 560,
            y2: 296,
            tone: 'negative',
          },
          {
            kind: 'label',
            id: 'attraction-label',
            x: 560,
            y: 322,
            text: 'strong electrostatic attraction',
            anchor: 'middle',
            tone: 'negative',
          },
          {
            kind: 'label',
            id: 'lattice-note',
            x: 360,
            y: 386,
            text: 'The ions build a giant ionic lattice — NaCl is not made of molecules.',
            anchor: 'middle',
            tone: 'muted',
          },
        ],
        keyTerms: [
          { term: 'Ionic bond', meaning: 'The strong electrostatic attraction between oppositely charged ions.' },
          { term: 'Cation', meaning: 'A positive ion, formed when an atom loses electrons.' },
          { term: 'Anion', meaning: 'A negative ion, formed when an atom gains electrons.' },
          { term: 'Giant ionic lattice', meaning: 'The regular 3D arrangement of alternating positive and negative ions.' },
        ],
        explanation: [
          'Sodium (2,8,1) has one electron in its outer shell.',
          'Chlorine (2,8,7) needs one more electron to fill its outer shell.',
          'Sodium transfers that electron to chlorine.',
          'Sodium becomes Na⁺ (2,8) and chlorine becomes Cl⁻ (2,8,8) — both now have full outer shells.',
          'The oppositely charged ions attract electrostatically and build a giant lattice.',
        ],
        sourceRefs: ['2.4'],
      }),
  },

  {
    key: 'refraction-tir',
    match: ['refraction', 'total internal reflection', 'critical angle', 'glass block', 'ray diagram', 'snell'],
    build: () =>
      base({
        title: 'Refraction and total internal reflection',
        caption:
          'Light bends towards the normal entering a denser medium. Above the critical angle it is reflected entirely back inside.',
        nodes: [
          { kind: 'box', id: 'block-a', x: 60, y: 170, w: 260, h: 150, label: '', tone: 'accent' },
          { kind: 'label', id: 'glass-a', x: 190, y: 300, text: 'glass (denser)', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 'air-a', x: 190, y: 152, text: 'air (less dense)', anchor: 'middle', tone: 'muted' },
          { kind: 'line', id: 'normal-a', x1: 190, y1: 110, x2: 190, y2: 300, tone: 'muted', dashed: true },
          { kind: 'arrow', id: 'incident-a', x1: 100, y1: 108, x2: 190, y2: 170, label: 'incident ray', tone: 'physics' },
          { kind: 'arrow', id: 'refracted-a', x1: 190, y1: 170, x2: 232, y2: 288, tone: 'physics' },
          { kind: 'label', id: 'angle-i', x: 168, y: 148, text: 'i', anchor: 'middle', tone: 'physics' },
          { kind: 'label', id: 'angle-r', x: 202, y: 214, text: 'r', anchor: 'middle', tone: 'physics' },
          { kind: 'label', id: 'caption-a', x: 190, y: 60, text: 'Entering glass: bends towards the normal', anchor: 'middle', tone: 'accent' },
          { kind: 'label', id: 'eq-a', x: 190, y: 348, text: 'n = sin i / sin r', anchor: 'middle', tone: 'accent' },

          { kind: 'box', id: 'block-b', x: 400, y: 170, w: 260, h: 150, label: '', tone: 'accent' },
          { kind: 'label', id: 'glass-b', x: 530, y: 300, text: 'glass (denser)', anchor: 'middle', tone: 'muted' },
          { kind: 'line', id: 'normal-b', x1: 530, y1: 110, x2: 530, y2: 300, tone: 'muted', dashed: true },
          { kind: 'arrow', id: 'incident-b', x1: 430, y1: 290, x2: 530, y2: 170, label: '', tone: 'physics' },
          { kind: 'arrow', id: 'reflected-b', x1: 530, y1: 170, x2: 630, y2: 290, tone: 'negative' },
          { kind: 'label', id: 'angle-c', x: 508, y: 200, text: 'i > c', anchor: 'end', tone: 'negative' },
          { kind: 'label', id: 'caption-b', x: 530, y: 60, text: 'Above the critical angle: total internal reflection', anchor: 'middle', tone: 'negative' },
          { kind: 'label', id: 'eq-b', x: 530, y: 348, text: 'no light escapes into the air', anchor: 'middle', tone: 'muted' },

          { kind: 'label', id: 'footnote', x: 360, y: 392, text: 'Angles are always measured from the normal, never from the surface.', anchor: 'middle', tone: 'muted' },
        ],
        keyTerms: [
          { term: 'Normal', meaning: 'The dashed line drawn at 90° to the surface, from which all angles are measured.' },
          { term: 'Refraction', meaning: 'The change in direction when a wave changes speed entering a new medium.' },
          { term: 'Critical angle (c)', meaning: 'The angle of incidence in the denser medium giving an angle of refraction of 90°.' },
          { term: 'Total internal reflection', meaning: 'All the light reflects back inside when i > c.' },
        ],
        explanation: [
          'Light slows down when it enters glass from air.',
          'Because it slows, it bends towards the normal — the angle of refraction is smaller than the angle of incidence.',
          'The refractive index is n = sin i / sin r.',
          'Going the other way, from glass into air, light bends away from the normal.',
          'Once the angle of incidence exceeds the critical angle, no light escapes and it is all reflected back inside.',
        ],
        sourceRefs: ['3.2'],
      }),
  },

  {
    key: 'electrolysis',
    match: ['electrolysis', 'electrode', 'anode', 'cathode', 'electrolyte', 'electrolytic cell'],
    build: () =>
      base({
        title: 'Electrolysis of a molten ionic compound',
        caption:
          'Positive ions travel to the cathode and gain electrons; negative ions travel to the anode and lose electrons.',
        nodes: [
          { kind: 'box', id: 'beaker', x: 180, y: 130, w: 360, h: 200, label: '', tone: 'muted' },
          { kind: 'label', id: 'electrolyte', x: 360, y: 344, text: 'molten electrolyte (ions free to move)', anchor: 'middle', tone: 'muted' },

          { kind: 'box', id: 'cathode', x: 240, y: 100, w: 22, h: 190, label: '', tone: 'physics' },
          { kind: 'label', id: 'cathode-label', x: 251, y: 88, text: 'Cathode (–)', anchor: 'middle', tone: 'physics' },
          { kind: 'box', id: 'anode', x: 458, y: 100, w: 22, h: 190, label: '', tone: 'negative' },
          { kind: 'label', id: 'anode-label', x: 469, y: 88, text: 'Anode (+)', anchor: 'middle', tone: 'negative' },

          { kind: 'circle', id: 'battery', x: 360, y: 46, r: 22, label: '⎓', tone: 'accent' },
          { kind: 'label', id: 'battery-label', x: 360, y: 20, text: 'd.c. supply', anchor: 'middle', tone: 'muted' },
          { kind: 'line', id: 'wire-l', x1: 338, y1: 46, x2: 251, y2: 46, tone: 'accent' },
          { kind: 'line', id: 'wire-l2', x1: 251, y1: 46, x2: 251, y2: 100, tone: 'accent' },
          { kind: 'line', id: 'wire-r', x1: 382, y1: 46, x2: 469, y2: 46, tone: 'accent' },
          { kind: 'line', id: 'wire-r2', x1: 469, y1: 46, x2: 469, y2: 100, tone: 'accent' },

          { kind: 'circle', id: 'cation-1', x: 340, y: 180, r: 12, label: '+', tone: 'physics' },
          { kind: 'arrow', id: 'cation-move', x1: 322, y1: 180, x2: 276, y2: 180, tone: 'physics' },
          { kind: 'circle', id: 'cation-2', x: 400, y: 250, r: 12, label: '+', tone: 'physics' },
          { kind: 'arrow', id: 'cation-move-2', x1: 382, y1: 250, x2: 276, y2: 250, tone: 'physics' },

          { kind: 'circle', id: 'anion-1', x: 380, y: 215, r: 12, label: '–', tone: 'negative' },
          { kind: 'arrow', id: 'anion-move', x1: 398, y1: 215, x2: 444, y2: 215, tone: 'negative' },
          { kind: 'circle', id: 'anion-2', x: 300, y: 285, r: 12, label: '–', tone: 'negative' },
          { kind: 'arrow', id: 'anion-move-2', x1: 318, y1: 285, x2: 444, y2: 285, tone: 'negative' },

          { kind: 'label', id: 'reduction', x: 150, y: 175, text: 'Reduction', anchor: 'middle', tone: 'physics' },
          { kind: 'label', id: 'reduction-eq', x: 150, y: 195, text: 'M²⁺ + 2e⁻ → M', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 'oxidation', x: 588, y: 175, text: 'Oxidation', anchor: 'middle', tone: 'negative' },
          { kind: 'label', id: 'oxidation-eq', x: 588, y: 195, text: '2X⁻ → X₂ + 2e⁻', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 'panic', x: 360, y: 388, text: 'PANIC — Positive is Anode, Negative Is Cathode', anchor: 'middle', tone: 'accent' },
        ],
        keyTerms: [
          { term: 'Electrolyte', meaning: 'The molten or dissolved ionic compound whose ions are free to move.' },
          { term: 'Cathode', meaning: 'The negative electrode, where positive ions gain electrons (reduction).' },
          { term: 'Anode', meaning: 'The positive electrode, where negative ions lose electrons (oxidation).' },
          { term: 'OIL RIG', meaning: 'Oxidation Is Loss of electrons, Reduction Is Gain of electrons.' },
        ],
        explanation: [
          'The compound must be molten or dissolved so its ions are free to move.',
          'The d.c. supply makes one electrode negative (cathode) and the other positive (anode).',
          'Positive ions are attracted to the cathode, where they gain electrons and are reduced.',
          'Negative ions are attracted to the anode, where they lose electrons and are oxidised.',
          'For a molten binary compound, the metal forms at the cathode and the non-metal at the anode.',
        ],
        sourceRefs: ['4.1'],
      }),
  },

  {
    key: 'wave-anatomy',
    match: ['wavelength', 'amplitude', 'wave diagram', 'transverse wave', 'crest', 'trough', 'parts of a wave'],
    build: () =>
      base({
        title: 'The parts of a transverse wave',
        caption: 'Wavelength is measured crest to crest; amplitude is measured from the undisturbed position to a crest.',
        nodes: [
          { kind: 'line', id: 'axis', x1: 70, y1: 210, x2: 650, y2: 210, tone: 'muted', dashed: true },
          { kind: 'label', id: 'axis-label', x: 660, y: 214, text: 'undisturbed position', anchor: 'start', tone: 'muted' },
          { kind: 'wave', id: 'wave', x: 70, y: 210, w: 500, h: 80, cycles: 2, tone: 'physics' },

          { kind: 'line', id: 'wl-a', x1: 132, y1: 130, x2: 132, y2: 108, tone: 'accent', dashed: true },
          { kind: 'line', id: 'wl-b', x1: 382, y1: 130, x2: 382, y2: 108, tone: 'accent', dashed: true },
          { kind: 'arrow', id: 'wl-arrow', x1: 132, y1: 108, x2: 382, y2: 108, label: 'wavelength λ', tone: 'accent' },

          { kind: 'line', id: 'amp-line', x1: 257, y1: 210, x2: 257, y2: 210, tone: 'muted' },
          { kind: 'arrow', id: 'amp-arrow', x1: 257, y1: 210, x2: 257, y2: 290, label: 'amplitude', tone: 'positive' },

          { kind: 'label', id: 'crest', x: 132, y: 146, text: 'crest', anchor: 'middle', tone: 'physics' },
          { kind: 'label', id: 'trough', x: 257, y: 306, text: 'trough', anchor: 'middle', tone: 'physics' },

          { kind: 'arrow', id: 'direction', x1: 260, y1: 356, x2: 380, y2: 356, label: 'direction of energy transfer', tone: 'muted' },
          { kind: 'arrow', id: 'oscillation', x1: 600, y1: 250, x2: 600, y2: 170, label: 'oscillation', tone: 'positive' },
          { kind: 'label', id: 'equation', x: 360, y: 394, text: 'v = f λ    and    T = 1 / f', anchor: 'middle', tone: 'accent' },
        ],
        keyTerms: [
          { term: 'Wavelength (λ)', meaning: 'The distance between two neighbouring points in phase, such as crest to crest.' },
          { term: 'Amplitude', meaning: 'The maximum displacement from the undisturbed position — not crest to trough.' },
          { term: 'Frequency (f)', meaning: 'The number of complete waves passing a point per second, in hertz.' },
          { term: 'Transverse wave', meaning: 'One where the oscillations are perpendicular to the direction of energy transfer.' },
        ],
        explanation: [
          'The dashed line is the undisturbed position the particles oscillate about.',
          'A crest is a maximum displacement upwards; a trough is a maximum displacement downwards.',
          'Wavelength is measured between corresponding points on consecutive waves.',
          'Amplitude is measured from the middle line to a crest — a common mistake is to measure crest to trough.',
          'The wave transfers energy to the right while each particle only moves up and down.',
        ],
        sourceRefs: ['3.1'],
      }),
  },

  {
    key: 'energy-profile',
    match: ['energy level diagram', 'exothermic', 'endothermic', 'activation energy', 'reaction pathway', 'energy profile'],
    build: () =>
      base({
        title: 'Reaction pathway diagrams',
        caption:
          'Exothermic reactions end lower than they started; endothermic reactions end higher. Both have an activation energy.',
        nodes: [
          { kind: 'line', id: 'axis-y1', x1: 80, y1: 70, x2: 80, y2: 330, tone: 'muted' },
          { kind: 'line', id: 'axis-x1', x1: 80, y1: 330, x2: 330, y2: 330, tone: 'muted' },
          { kind: 'label', id: 'y-label-1', x: 68, y: 60, text: 'Energy', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 'x-label-1', x: 205, y: 352, text: 'Progress of reaction', anchor: 'middle', tone: 'muted' },
          {
            kind: 'curve',
            id: 'exo-curve',
            points: [
              [95, 170], [130, 170], [160, 130], [180, 108], [205, 100], [230, 108], [250, 130], [280, 240], [315, 240],
            ],
            tone: 'positive',
          },
          { kind: 'label', id: 'exo-title', x: 205, y: 44, text: 'Exothermic (ΔH negative)', anchor: 'middle', tone: 'positive' },
          { kind: 'label', id: 'exo-react', x: 100, y: 158, text: 'reactants', anchor: 'start', tone: 'muted' },
          { kind: 'label', id: 'exo-prod', x: 290, y: 262, text: 'products', anchor: 'start', tone: 'muted' },
          { kind: 'arrow', id: 'exo-ea', x1: 140, y1: 170, x2: 140, y2: 104, label: 'Ea', tone: 'accent' },
          { kind: 'arrow', id: 'exo-dh', x1: 300, y1: 170, x2: 300, y2: 240, label: 'ΔH', tone: 'positive' },
          { kind: 'line', id: 'exo-guide-1', x1: 95, y1: 170, x2: 305, y2: 170, tone: 'muted', dashed: true },

          { kind: 'line', id: 'axis-y2', x1: 400, y1: 70, x2: 400, y2: 330, tone: 'muted' },
          { kind: 'line', id: 'axis-x2', x1: 400, y1: 330, x2: 650, y2: 330, tone: 'muted' },
          { kind: 'label', id: 'y-label-2', x: 388, y: 60, text: 'Energy', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 'x-label-2', x: 525, y: 352, text: 'Progress of reaction', anchor: 'middle', tone: 'muted' },
          {
            kind: 'curve',
            id: 'endo-curve',
            points: [
              [415, 250], [450, 250], [480, 180], [500, 130], [525, 120], [550, 130], [570, 160], [600, 180], [635, 180],
            ],
            tone: 'negative',
          },
          { kind: 'label', id: 'endo-title', x: 525, y: 44, text: 'Endothermic (ΔH positive)', anchor: 'middle', tone: 'negative' },
          { kind: 'label', id: 'endo-react', x: 420, y: 272, text: 'reactants', anchor: 'start', tone: 'muted' },
          { kind: 'label', id: 'endo-prod', x: 606, y: 168, text: 'products', anchor: 'start', tone: 'muted' },
          { kind: 'arrow', id: 'endo-ea', x1: 460, y1: 250, x2: 460, y2: 124, label: 'Ea', tone: 'accent' },
          { kind: 'arrow', id: 'endo-dh', x1: 620, y1: 250, x2: 620, y2: 180, label: 'ΔH', tone: 'negative' },
          { kind: 'line', id: 'endo-guide-1', x1: 415, y1: 250, x2: 625, y2: 250, tone: 'muted', dashed: true },

          { kind: 'label', id: 'note', x: 360, y: 392, text: 'A catalyst lowers Ea only — it does not change ΔH.', anchor: 'middle', tone: 'accent' },
        ],
        keyTerms: [
          { term: 'Activation energy (Ea)', meaning: 'The minimum energy colliding particles need for a reaction to occur.' },
          { term: 'ΔH', meaning: 'The overall energy change: negative for exothermic, positive for endothermic.' },
          { term: 'Exothermic', meaning: 'Energy is transferred to the surroundings, so their temperature rises.' },
          { term: 'Endothermic', meaning: 'Energy is taken in from the surroundings, so their temperature falls.' },
        ],
        explanation: [
          'The vertical axis is energy and the horizontal axis is the progress of the reaction.',
          'The hump is the activation energy — the barrier that must be overcome for the reaction to happen.',
          'In an exothermic reaction the products are lower than the reactants, so ΔH is negative.',
          'In an endothermic reaction the products are higher than the reactants, so ΔH is positive.',
          'A catalyst provides a route with a lower hump, but the start and end levels are unchanged.',
        ],
        sourceRefs: ['5.1'],
      }),
  },

  {
    key: 'series-parallel',
    match: ['series circuit', 'parallel circuit', 'series and parallel', 'circuit diagram', 'resistors'],
    build: () =>
      base({
        title: 'Series and parallel circuits',
        caption:
          'In series the current is the same everywhere and the p.d. is shared. In parallel the p.d. is the same across each branch and the current splits.',
        nodes: [
          { kind: 'label', id: 'series-title', x: 190, y: 46, text: 'Series', anchor: 'middle', tone: 'physics' },
          { kind: 'line', id: 's-top', x1: 80, y1: 90, x2: 300, y2: 90, tone: 'physics' },
          { kind: 'line', id: 's-left', x1: 80, y1: 90, x2: 80, y2: 200, tone: 'physics' },
          { kind: 'line', id: 's-right', x1: 300, y1: 90, x2: 300, y2: 200, tone: 'physics' },
          { kind: 'line', id: 's-bottom', x1: 80, y1: 200, x2: 300, y2: 200, tone: 'physics' },
          { kind: 'box', id: 's-cell', x: 168, y: 190, w: 44, h: 20, label: '⎓', tone: 'accent' },
          { kind: 'box', id: 's-r1', x: 118, y: 78, w: 50, h: 24, label: 'R₁', tone: 'physics' },
          { kind: 'box', id: 's-r2', x: 212, y: 78, w: 50, h: 24, label: 'R₂', tone: 'physics' },
          { kind: 'label', id: 's-eq', x: 190, y: 236, text: 'R = R₁ + R₂', anchor: 'middle', tone: 'accent' },
          { kind: 'label', id: 's-note1', x: 190, y: 258, text: 'same current everywhere', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 's-note2', x: 190, y: 278, text: 'p.d. shared between components', anchor: 'middle', tone: 'muted' },

          { kind: 'label', id: 'parallel-title', x: 520, y: 46, text: 'Parallel', anchor: 'middle', tone: 'chemistry' },
          { kind: 'line', id: 'p-top', x1: 410, y1: 90, x2: 630, y2: 90, tone: 'chemistry' },
          { kind: 'line', id: 'p-left', x1: 410, y1: 90, x2: 410, y2: 220, tone: 'chemistry' },
          { kind: 'line', id: 'p-right', x1: 630, y1: 90, x2: 630, y2: 220, tone: 'chemistry' },
          { kind: 'line', id: 'p-bottom', x1: 410, y1: 220, x2: 630, y2: 220, tone: 'chemistry' },
          { kind: 'line', id: 'p-branch-a-l', x1: 470, y1: 90, x2: 470, y2: 130, tone: 'chemistry' },
          { kind: 'line', id: 'p-branch-a-r', x1: 570, y1: 90, x2: 570, y2: 130, tone: 'chemistry' },
          { kind: 'line', id: 'p-branch-a-mid', x1: 470, y1: 130, x2: 570, y2: 130, tone: 'chemistry' },
          { kind: 'line', id: 'p-branch-b-l', x1: 470, y1: 130, x2: 470, y2: 176, tone: 'chemistry' },
          { kind: 'line', id: 'p-branch-b-r', x1: 570, y1: 130, x2: 570, y2: 176, tone: 'chemistry' },
          { kind: 'line', id: 'p-branch-b-mid', x1: 470, y1: 176, x2: 570, y2: 176, tone: 'chemistry' },
          { kind: 'box', id: 'p-r1', x: 495, y: 118, w: 50, h: 24, label: 'R₁', tone: 'chemistry' },
          { kind: 'box', id: 'p-r2', x: 495, y: 164, w: 50, h: 24, label: 'R₂', tone: 'chemistry' },
          { kind: 'box', id: 'p-cell', x: 498, y: 210, w: 44, h: 20, label: '⎓', tone: 'accent' },
          { kind: 'label', id: 'p-eq', x: 520, y: 256, text: '1/R = 1/R₁ + 1/R₂', anchor: 'middle', tone: 'accent' },
          { kind: 'label', id: 'p-note1', x: 520, y: 278, text: 'same p.d. across each branch', anchor: 'middle', tone: 'muted' },
          { kind: 'label', id: 'p-note2', x: 520, y: 298, text: 'current splits between branches', anchor: 'middle', tone: 'muted' },

          { kind: 'label', id: 'sanity', x: 360, y: 372, text: 'Sanity check: total parallel resistance is always LESS than the smallest resistor.', anchor: 'middle', tone: 'accent' },
        ],
        keyTerms: [
          { term: 'Series', meaning: 'Components joined end to end in a single loop.' },
          { term: 'Parallel', meaning: 'Components on separate branches between the same two points.' },
          { term: 'Ammeter', meaning: 'Measures current — connected in series.' },
          { term: 'Voltmeter', meaning: 'Measures potential difference — connected in parallel with a component.' },
        ],
        explanation: [
          'In a series circuit there is only one path, so the current is identical at every point.',
          'The supply p.d. is shared between the series components, in proportion to their resistances.',
          'Adding resistors in series increases the total resistance: R = R₁ + R₂.',
          'In a parallel circuit each branch gets the full supply p.d.',
          'The current splits between the branches, and the total resistance falls: 1/R = 1/R₁ + 1/R₂.',
        ],
        sourceRefs: ['4.3'],
      }),
  },

  {
    key: 'atom-structure',
    match: ['atomic structure', 'structure of the atom', 'nucleus', 'electron shell', 'proton neutron electron', 'electronic configuration'],
    build: () =>
      base({
        title: 'Structure of the atom',
        caption:
          'A dense nucleus of protons and neutrons, surrounded by electrons in shells that fill 2, 8, 8, 2 for the first 20 elements.',
        nodes: [
          ...shellNodes(250, 200, [2, 8, 8, 2], '', 'chemistry', 'atom'),
          { kind: 'label', id: 'nucleus-label', x: 250, y: 204, text: '20p 20n', anchor: 'middle', tone: 'chemistry' },
          { kind: 'arrow', id: 'nucleus-arrow', x1: 470, y1: 90, x2: 276, y2: 186, label: '', tone: 'muted' },
          { kind: 'label', id: 'nucleus-note', x: 478, y: 86, text: 'Nucleus: protons (+1) and neutrons (0)', anchor: 'start', tone: 'muted' },
          { kind: 'arrow', id: 'shell-arrow', x1: 470, y1: 150, x2: 352, y2: 178, label: '', tone: 'muted' },
          { kind: 'label', id: 'shell-note', x: 478, y: 146, text: 'Electron shells fill from the inside out', anchor: 'start', tone: 'muted' },
          { kind: 'label', id: 'capacities', x: 478, y: 200, text: 'Capacities: 2, 8, 8, 2', anchor: 'start', tone: 'accent' },
          { kind: 'label', id: 'example', x: 478, y: 226, text: 'Calcium: 2,8,8,2', anchor: 'start', tone: 'chemistry' },
          { kind: 'label', id: 'group', x: 478, y: 250, text: 'Outer electrons = group number', anchor: 'start', tone: 'muted' },
          { kind: 'label', id: 'period', x: 478, y: 272, text: 'Occupied shells = period number', anchor: 'start', tone: 'muted' },
          { kind: 'label', id: 'mass-note', x: 478, y: 306, text: 'Electron mass ≈ 1/1836 of a proton', anchor: 'start', tone: 'muted' },
          { kind: 'label', id: 'neutrons', x: 360, y: 388, text: 'neutrons = nucleon number − proton number', anchor: 'middle', tone: 'accent' },
        ],
        keyTerms: [
          { term: 'Proton number', meaning: 'The number of protons — it identifies the element.' },
          { term: 'Nucleon number', meaning: 'The total number of protons and neutrons.' },
          { term: 'Isotopes', meaning: 'Same proton number, different numbers of neutrons.' },
          { term: 'Electronic configuration', meaning: 'How the electrons are distributed between the shells, e.g. 2,8,8,2.' },
        ],
        explanation: [
          'The nucleus contains protons (relative charge +1) and neutrons (charge 0), and holds almost all the mass.',
          'Electrons (charge −1, negligible mass) occupy shells around the nucleus.',
          'Shells fill from the inside out with capacities 2, 8, 8, 2 for the first 20 elements.',
          'In a neutral atom the number of electrons equals the number of protons.',
          'The number of outer-shell electrons gives the group; the number of occupied shells gives the period.',
        ],
        sourceRefs: ['2.2', '5.1'],
      }),
  },
];

/** Returns a verified diagram when the request clearly matches one. */
export function findLibraryDiagram(query: string): DiagramSpec | null {
  const q = query.toLowerCase();
  let best: { entry: LibraryEntry; score: number } | null = null;

  for (const entry of ENTRIES) {
    const score = entry.match.reduce((total, term) => (q.includes(term) ? total + term.length : total), 0);
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }

  return best ? best.entry.build() : null;
}

export function libraryDiagramByKey(key: string): DiagramSpec | null {
  return ENTRIES.find((e) => e.key === key)?.build() ?? null;
}

export const diagramLibraryIndex = ENTRIES.map((e) => ({ key: e.key, title: e.build().title }));
