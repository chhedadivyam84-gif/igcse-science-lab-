'use client';

import { useState } from 'react';
import { AlertTriangle, FlaskConical, HelpCircle } from 'lucide-react';

import { Badge, Button, Input, Label, Notice, Panel, SectionHeader, Select } from '@/components/ui';
import { relativeFormulaMass } from '@/lib/elements';
import { sigFig } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Chemistry calculator.
 *
 * Every mode returns the same shape — input → formula → substitution →
 * calculation → answer → unit → why — because that is the structure an examiner
 * wants to see on the page.
 */

const AVOGADRO = 6.02e23;
const MOLAR_GAS_VOLUME = 24; // dm³ at room temperature and pressure

type Mode =
  | 'mr'
  | 'mass-moles'
  | 'particles'
  | 'concentration'
  | 'gas-volume'
  | 'reacting-mass'
  | 'empirical'
  | 'yield'
  | 'purity'
  | 'titration';

const MODES: { value: Mode; label: string; group: string }[] = [
  { value: 'mr', label: 'Relative formula mass', group: 'Masses' },
  { value: 'mass-moles', label: 'Mass ↔ moles', group: 'Masses' },
  { value: 'particles', label: 'Moles ↔ particles', group: 'Masses' },
  { value: 'concentration', label: 'Concentration', group: 'Solutions' },
  { value: 'titration', label: 'Titration', group: 'Solutions' },
  { value: 'gas-volume', label: 'Gas volume at r.t.p.', group: 'Gases' },
  { value: 'reacting-mass', label: 'Reacting masses', group: 'Stoichiometry' },
  { value: 'empirical', label: 'Empirical formula', group: 'Stoichiometry' },
  { value: 'yield', label: 'Percentage yield', group: 'Stoichiometry' },
  { value: 'purity', label: 'Percentage purity', group: 'Stoichiometry' },
];

type Outcome = {
  steps: { label: string; text: string }[];
  answer: string;
  unit: string;
  why: string;
  warnings?: string[];
};

export function MoleCalculator() {
  const [mode, setMode] = useState<Mode>('mass-moles');
  const [fields, setFields] = useState<Record<string, string>>({ formula: 'CaCO3', mass: '25' });
  const [showWhy, setShowWhy] = useState(false);

  const set = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setFields((current) => ({ ...current, [key]: event.target.value }));

  const num = (key: string) => {
    const value = Number(fields[key]);
    return Number.isFinite(value) && fields[key]?.trim() !== '' ? value : null;
  };

  const outcome = compute(mode, fields, num);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[20rem_1fr]">
      <div className="space-y-4">
        <Panel className="p-4">
          <Label htmlFor="mode">Calculation</Label>
          <Select
            id="mode"
            value={mode}
            onChange={(event) => {
              setMode(event.target.value as Mode);
              setShowWhy(false);
            }}
          >
            {['Masses', 'Solutions', 'Gases', 'Stoichiometry'].map((group) => (
              <optgroup key={group} label={group}>
                {MODES.filter((m) => m.group === group).map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>

          <div className="mt-5 space-y-3.5">
            {mode === 'mr' && (
              <Field id="formula" label="Formula" hint="e.g. Ca(OH)2 or CuSO4.5H2O" value={fields.formula ?? ''} onChange={set('formula')} />
            )}

            {mode === 'mass-moles' && (
              <>
                <Field id="formula" label="Formula" hint="used to work out Mr" value={fields.formula ?? ''} onChange={set('formula')} />
                <Field id="mass" label="Mass" hint="g — leave blank to find it" value={fields.mass ?? ''} onChange={set('mass')} />
                <Field id="moles" label="Moles" hint="mol — leave blank to find it" value={fields.moles ?? ''} onChange={set('moles')} />
              </>
            )}

            {mode === 'particles' && (
              <>
                <Field id="moles" label="Moles" hint="mol" value={fields.moles ?? ''} onChange={set('moles')} />
                <Field id="particles" label="Number of particles" hint="leave blank to find it" value={fields.particles ?? ''} onChange={set('particles')} />
              </>
            )}

            {mode === 'concentration' && (
              <>
                <Field id="moles" label="Moles of solute" hint="mol" value={fields.moles ?? ''} onChange={set('moles')} />
                <Field id="volume" label="Volume of solution" hint="cm³" value={fields.volume ?? ''} onChange={set('volume')} />
                <Field id="conc" label="Concentration" hint="mol/dm³ — leave blank to find it" value={fields.conc ?? ''} onChange={set('conc')} />
                <Field id="formula" label="Formula (optional)" hint="to also give g/dm³" value={fields.formula ?? ''} onChange={set('formula')} />
              </>
            )}

            {mode === 'titration' && (
              <>
                <Field id="cAcid" label="Acid concentration" hint="mol/dm³" value={fields.cAcid ?? ''} onChange={set('cAcid')} />
                <Field id="vAcid" label="Acid volume" hint="cm³" value={fields.vAcid ?? ''} onChange={set('vAcid')} />
                <Field id="vBase" label="Alkali volume" hint="cm³" value={fields.vBase ?? ''} onChange={set('vBase')} />
                <Field id="ratio" label="Mole ratio acid : alkali" hint="e.g. 1 for 1:1, 2 for 2:1" value={fields.ratio ?? '1'} onChange={set('ratio')} />
              </>
            )}

            {mode === 'gas-volume' && (
              <>
                <Field id="moles" label="Moles of gas" hint="mol — leave blank to find it" value={fields.moles ?? ''} onChange={set('moles')} />
                <Field id="gasVolume" label="Volume" hint="dm³ — leave blank to find it" value={fields.gasVolume ?? ''} onChange={set('gasVolume')} />
              </>
            )}

            {mode === 'reacting-mass' && (
              <>
                <Field id="formulaA" label="Known substance formula" value={fields.formulaA ?? ''} onChange={set('formulaA')} />
                <Field id="massA" label="Mass of known substance" hint="g" value={fields.massA ?? ''} onChange={set('massA')} />
                <Field id="coeffA" label="Its coefficient in the equation" hint="e.g. 2 in 2Mg" value={fields.coeffA ?? '1'} onChange={set('coeffA')} />
                <Field id="formulaB" label="Wanted substance formula" value={fields.formulaB ?? ''} onChange={set('formulaB')} />
                <Field id="coeffB" label="Its coefficient" value={fields.coeffB ?? '1'} onChange={set('coeffB')} />
              </>
            )}

            {mode === 'empirical' && (
              <>
                <Field id="e1" label="Element 1 symbol and amount" hint="e.g. C 40" value={fields.e1 ?? ''} onChange={set('e1')} />
                <Field id="e2" label="Element 2 symbol and amount" hint="e.g. H 6.7" value={fields.e2 ?? ''} onChange={set('e2')} />
                <Field id="e3" label="Element 3 (optional)" hint="e.g. O 53.3" value={fields.e3 ?? ''} onChange={set('e3')} />
                <Field id="mr" label="Molecular mass (optional)" hint="to also give the molecular formula" value={fields.mr ?? ''} onChange={set('mr')} />
              </>
            )}

            {mode === 'yield' && (
              <>
                <Field id="actual" label="Actual yield" hint="g" value={fields.actual ?? ''} onChange={set('actual')} />
                <Field id="theoretical" label="Theoretical yield" hint="g" value={fields.theoretical ?? ''} onChange={set('theoretical')} />
              </>
            )}

            {mode === 'purity' && (
              <>
                <Field id="pure" label="Mass of pure substance" hint="g" value={fields.pure ?? ''} onChange={set('pure')} />
                <Field id="sample" label="Mass of sample" hint="g" value={fields.sample ?? ''} onChange={set('sample')} />
              </>
            )}
          </div>
        </Panel>

        <Panel className="p-4">
          <p className="eyebrow mb-2">Constants used</p>
          <ul className="space-y-1 text-sm text-ink-muted">
            <li>Avogadro constant = 6.02 × 10²³ /mol</li>
            <li>Molar gas volume at r.t.p. = 24 dm³/mol</li>
            <li>1 dm³ = 1000 cm³</li>
          </ul>
        </Panel>
      </div>

      <div className="min-w-0 space-y-4">
        <Panel>
          <SectionHeader
            eyebrow="Working"
            title={MODES.find((m) => m.value === mode)?.label ?? ''}
            action={<Badge tone="chemistry">Step by step</Badge>}
          />

          {!outcome ? (
            <div className="rounded-card border border-dashed border-line px-4 py-10 text-center">
              <FlaskConical className="mx-auto h-6 w-6 text-ink-faint" />
              <p className="mt-3 text-sm text-ink-muted">
                Fill in the values on the left. Leave the quantity you want to find blank.
              </p>
            </div>
          ) : (
            <>
              <ol className="space-y-2.5">
                {outcome.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-0.5 w-24 shrink-0 text-2xs uppercase tracking-wide text-ink-faint">
                      {step.label}
                    </span>
                    <span className="font-mono text-sm text-ink">{step.text}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 rounded-card border border-chemistry/25 bg-chemistry/[0.06] p-4">
                <p className="text-2xs uppercase tracking-wide text-chemistry">Final answer</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-ink">
                  {outcome.answer}
                  {outcome.unit && <span className="ml-2 text-base font-normal text-ink-muted">{outcome.unit}</span>}
                </p>
              </div>

              {outcome.warnings?.map((warning) => (
                <Notice key={warning} tone="caution" className="mt-3">
                  <span className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {warning}
                  </span>
                </Notice>
              ))}

              <Button variant="secondary" size="sm" className="mt-4" onClick={() => setShowWhy((s) => !s)}>
                <HelpCircle className="h-3.5 w-3.5" /> {showWhy ? 'Hide' : 'Why?'}
              </Button>

              {showWhy && (
                <div className={cn('prose-science mt-4 border-t border-line pt-4')}>
                  <p>{outcome.why}</p>
                  <p>
                    In the exam, show the moles line separately. It carries a method mark of its own, so
                    you keep it even if the final arithmetic slips.
                  </p>
                </div>
              )}
            </>
          )}
        </Panel>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <Input id={id} value={value} onChange={onChange} />
    </div>
  );
}

function compute(
  mode: Mode,
  fields: Record<string, string>,
  num: (key: string) => number | null,
): Outcome | null {
  switch (mode) {
    case 'mr': {
      const parsed = relativeFormulaMass(fields.formula ?? '');
      if (!parsed) return null;
      return {
        steps: [
          { label: 'Formula', text: fields.formula },
          { label: 'Breakdown', text: parsed.breakdown.join('  +  ') },
          { label: 'Total', text: `Mr = ${parsed.mass}` },
        ],
        answer: String(Number(parsed.mass.toFixed(2))),
        unit: '(no unit)',
        why: 'Relative formula mass is the sum of the relative atomic masses of every atom in the formula. It has no unit because it is a ratio against carbon-12.',
      };
    }

    case 'mass-moles': {
      const parsed = relativeFormulaMass(fields.formula ?? '');
      if (!parsed) return null;
      const mass = num('mass');
      const moles = num('moles');

      if (mass !== null && moles === null) {
        const value = mass / parsed.mass;
        return {
          steps: [
            { label: 'Formula', text: 'n = m / Mr' },
            { label: 'Mr', text: `Mr(${fields.formula}) = ${parsed.mass}` },
            { label: 'Substitute', text: `n = ${mass} / ${parsed.mass}` },
            { label: 'Answer', text: `n = ${sigFig(value, 4)} mol` },
          ],
          answer: sigFig(value, 3),
          unit: 'mol',
          why: 'Moles are mass divided by relative formula mass. The mole is just a counting unit: one mole is 6.02 × 10²³ particles.',
        };
      }

      if (moles !== null && mass === null) {
        const value = moles * parsed.mass;
        return {
          steps: [
            { label: 'Formula', text: 'm = n × Mr' },
            { label: 'Mr', text: `Mr(${fields.formula}) = ${parsed.mass}` },
            { label: 'Substitute', text: `m = ${moles} × ${parsed.mass}` },
            { label: 'Answer', text: `m = ${sigFig(value, 4)} g` },
          ],
          answer: sigFig(value, 3),
          unit: 'g',
          why: 'Rearranging n = m / Mr gives m = n × Mr.',
        };
      }
      return null;
    }

    case 'particles': {
      const moles = num('moles');
      const particles = num('particles');

      if (moles !== null && particles === null) {
        const value = moles * AVOGADRO;
        return {
          steps: [
            { label: 'Formula', text: 'N = n × 6.02 × 10²³' },
            { label: 'Substitute', text: `N = ${moles} × 6.02 × 10²³` },
            { label: 'Answer', text: `N = ${sigFig(value, 4)}` },
          ],
          answer: sigFig(value, 3),
          unit: 'particles',
          why: 'The Avogadro constant is the number of particles in one mole: 6.02 × 10²³.',
        };
      }
      if (particles !== null && moles === null) {
        const value = particles / AVOGADRO;
        return {
          steps: [
            { label: 'Formula', text: 'n = N / (6.02 × 10²³)' },
            { label: 'Substitute', text: `n = ${sigFig(particles, 4)} / 6.02 × 10²³` },
            { label: 'Answer', text: `n = ${sigFig(value, 4)} mol` },
          ],
          answer: sigFig(value, 3),
          unit: 'mol',
          why: 'Dividing the number of particles by the Avogadro constant converts particles into moles.',
        };
      }
      return null;
    }

    case 'concentration': {
      const moles = num('moles');
      const volumeCm3 = num('volume');
      const conc = num('conc');
      const parsed = fields.formula ? relativeFormulaMass(fields.formula) : null;

      if (moles !== null && volumeCm3 !== null && conc === null) {
        const dm3 = volumeCm3 / 1000;
        const value = moles / dm3;
        return {
          steps: [
            { label: 'Convert', text: `V = ${volumeCm3} cm³ ÷ 1000 = ${dm3} dm³` },
            { label: 'Formula', text: 'c = n / V' },
            { label: 'Substitute', text: `c = ${moles} / ${dm3}` },
            { label: 'Answer', text: `c = ${sigFig(value, 4)} mol/dm³` },
            ...(parsed
              ? [{ label: 'Also', text: `${sigFig(value * parsed.mass, 4)} g/dm³ (× Mr ${parsed.mass})` }]
              : []),
          ],
          answer: sigFig(value, 3),
          unit: 'mol/dm³',
          why: 'Concentration is moles of solute per cubic decimetre of solution. The volume must be in dm³, so divide a cm³ value by 1000 first — this is the single most common error in the topic.',
        };
      }

      if (conc !== null && volumeCm3 !== null && moles === null) {
        const dm3 = volumeCm3 / 1000;
        const value = conc * dm3;
        return {
          steps: [
            { label: 'Convert', text: `V = ${volumeCm3} cm³ ÷ 1000 = ${dm3} dm³` },
            { label: 'Formula', text: 'n = c × V' },
            { label: 'Substitute', text: `n = ${conc} × ${dm3}` },
            { label: 'Answer', text: `n = ${sigFig(value, 4)} mol` },
          ],
          answer: sigFig(value, 3),
          unit: 'mol',
          why: 'Rearranging c = n / V gives n = c × V, with the volume in dm³.',
        };
      }
      return null;
    }

    case 'titration': {
      const cAcid = num('cAcid');
      const vAcid = num('vAcid');
      const vBase = num('vBase');
      const ratio = num('ratio') ?? 1;
      if (cAcid === null || vAcid === null || vBase === null || vBase === 0) return null;

      const nAcid = cAcid * (vAcid / 1000);
      const nBase = nAcid / ratio;
      const value = nBase / (vBase / 1000);

      return {
        steps: [
          { label: 'Moles acid', text: `n = c × V = ${cAcid} × (${vAcid} / 1000) = ${sigFig(nAcid, 4)} mol` },
          { label: 'Mole ratio', text: `acid : alkali = ${ratio} : 1, so n(alkali) = ${sigFig(nBase, 4)} mol` },
          { label: 'Formula', text: 'c = n / V' },
          { label: 'Substitute', text: `c = ${sigFig(nBase, 4)} / (${vBase} / 1000)` },
          { label: 'Answer', text: `c = ${sigFig(value, 4)} mol/dm³` },
        ],
        answer: sigFig(value, 3),
        unit: 'mol/dm³',
        why: 'A titration calculation is always the same four steps: moles of the known solution, mole ratio from the balanced equation, moles of the unknown, then concentration. Convert every volume from cm³ to dm³ before you start.',
      };
    }

    case 'gas-volume': {
      const moles = num('moles');
      const volume = num('gasVolume');

      if (moles !== null && volume === null) {
        const value = moles * MOLAR_GAS_VOLUME;
        return {
          steps: [
            { label: 'Formula', text: 'V = n × 24' },
            { label: 'Substitute', text: `V = ${moles} × 24` },
            { label: 'Answer', text: `V = ${sigFig(value, 4)} dm³` },
          ],
          answer: sigFig(value, 3),
          unit: 'dm³',
          why: 'At room temperature and pressure, one mole of any gas occupies 24 dm³ — regardless of which gas it is.',
        };
      }
      if (volume !== null && moles === null) {
        const value = volume / MOLAR_GAS_VOLUME;
        return {
          steps: [
            { label: 'Formula', text: 'n = V / 24' },
            { label: 'Substitute', text: `n = ${volume} / 24` },
            { label: 'Answer', text: `n = ${sigFig(value, 4)} mol` },
          ],
          answer: sigFig(value, 3),
          unit: 'mol',
          why: 'Dividing a gas volume in dm³ by 24 gives the number of moles at r.t.p.',
        };
      }
      return null;
    }

    case 'reacting-mass': {
      const a = relativeFormulaMass(fields.formulaA ?? '');
      const b = relativeFormulaMass(fields.formulaB ?? '');
      const massA = num('massA');
      const coeffA = num('coeffA') ?? 1;
      const coeffB = num('coeffB') ?? 1;
      if (!a || !b || massA === null || coeffA === 0) return null;

      const nA = massA / a.mass;
      const nB = (nA * coeffB) / coeffA;
      const massB = nB * b.mass;

      return {
        steps: [
          { label: 'Mr values', text: `Mr(${fields.formulaA}) = ${a.mass}, Mr(${fields.formulaB}) = ${b.mass}` },
          { label: 'Moles known', text: `n = ${massA} / ${a.mass} = ${sigFig(nA, 4)} mol` },
          { label: 'Mole ratio', text: `${coeffA} : ${coeffB}, so n(${fields.formulaB}) = ${sigFig(nB, 4)} mol` },
          { label: 'Mass wanted', text: `m = ${sigFig(nB, 4)} × ${b.mass}` },
          { label: 'Answer', text: `m = ${sigFig(massB, 4)} g` },
        ],
        answer: sigFig(massB, 3),
        unit: 'g',
        why: 'Reacting-mass questions always follow four steps: balanced equation, convert the given amount to moles, apply the mole ratio from the equation, convert back to mass. You cannot scale masses directly — equations balance particles, not grams.',
      };
    }

    case 'empirical': {
      const entries = ['e1', 'e2', 'e3']
        .map((key) => (fields[key] ?? '').trim())
        .filter(Boolean)
        .map((raw) => {
          const [symbol, amount] = raw.split(/\s+/);
          return { symbol, amount: Number(amount) };
        })
        .filter((entry) => entry.symbol && Number.isFinite(entry.amount) && entry.amount > 0);

      if (entries.length < 2) return null;

      const withMoles = entries.map((entry) => {
        const mass = relativeFormulaMass(entry.symbol);
        return mass ? { ...entry, ar: mass.mass, moles: entry.amount / mass.mass } : null;
      });
      if (withMoles.some((entry) => entry === null)) return null;
      const valid = withMoles as { symbol: string; amount: number; ar: number; moles: number }[];

      const smallest = Math.min(...valid.map((entry) => entry.moles));
      const ratios = valid.map((entry) => entry.moles / smallest);
      // Scale up when the ratio lands near a simple fraction such as 1.5 or 1.33.
      const scale = [1, 2, 3, 4].find((factor) =>
        ratios.every((ratio) => Math.abs(ratio * factor - Math.round(ratio * factor)) < 0.09),
      );
      const whole = ratios.map((ratio) => Math.round(ratio * (scale ?? 1)));

      const empirical = valid
        .map((entry, index) => `${entry.symbol}${whole[index] === 1 ? '' : whole[index]}`)
        .join('');
      const empiricalMass = valid.reduce((total, entry, index) => total + entry.ar * whole[index], 0);
      const givenMr = num('mr');
      const multiple = givenMr ? Math.round(givenMr / empiricalMass) : null;

      return {
        steps: [
          { label: 'Divide by Ar', text: valid.map((e) => `${e.symbol}: ${e.amount}/${e.ar} = ${sigFig(e.moles, 3)}`).join('   ') },
          { label: 'Divide by smallest', text: valid.map((e, i) => `${e.symbol}: ${sigFig(ratios[i], 3)}`).join('   ') },
          ...(scale && scale > 1 ? [{ label: 'Scale up', text: `× ${scale} to reach whole numbers` }] : []),
          { label: 'Empirical', text: empirical },
          ...(multiple && multiple > 0
            ? [
                { label: 'Empirical Mr', text: `${sigFig(empiricalMass, 4)}` },
                { label: 'Multiple', text: `${givenMr} / ${sigFig(empiricalMass, 4)} ≈ ${multiple}` },
              ]
            : []),
        ],
        answer: multiple && multiple > 1
          ? valid.map((e, i) => `${e.symbol}${whole[i] * multiple === 1 ? '' : whole[i] * multiple}`).join('')
          : empirical,
        unit: multiple && multiple > 1 ? '(molecular formula)' : '(empirical formula)',
        why: 'Divide each mass or percentage by the relative atomic mass to get moles, then divide every result by the smallest to get the simplest ratio. The molecular formula is a whole-number multiple of the empirical formula.',
        warnings: !scale ? ['The ratios did not land on whole numbers cleanly — check your input values.'] : undefined,
      };
    }

    case 'yield': {
      const actual = num('actual');
      const theoretical = num('theoretical');
      if (actual === null || theoretical === null || theoretical === 0) return null;
      const value = (actual / theoretical) * 100;
      return {
        steps: [
          { label: 'Formula', text: '% yield = (actual / theoretical) × 100' },
          { label: 'Substitute', text: `= (${actual} / ${theoretical}) × 100` },
          { label: 'Answer', text: `= ${sigFig(value, 4)}%` },
        ],
        answer: sigFig(value, 3),
        unit: '%',
        why: 'Yield is below 100% because reactions may be reversible or incomplete, some product is lost during transfer and purification, and side reactions can occur.',
        warnings: value > 100 ? ['A yield above 100% is impossible — the product is probably still wet or impure.'] : undefined,
      };
    }

    case 'purity': {
      const pure = num('pure');
      const sample = num('sample');
      if (pure === null || sample === null || sample === 0) return null;
      const value = (pure / sample) * 100;
      return {
        steps: [
          { label: 'Formula', text: '% purity = (mass of pure substance / mass of sample) × 100' },
          { label: 'Substitute', text: `= (${pure} / ${sample}) × 100` },
          { label: 'Answer', text: `= ${sigFig(value, 4)}%` },
        ],
        answer: sigFig(value, 3),
        unit: '%',
        why: 'Percentage purity compares the mass of the substance you actually want with the total mass of the sample you have.',
        warnings: value > 100 ? ['Purity above 100% means the pure mass exceeds the sample mass — check the values.'] : undefined,
      };
    }
  }
}
