'use client';

import { useEffect, useState } from 'react';
import { Select, Slider } from '@/components/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { elements, electronConfiguration } from '@/lib/elements';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Electron shells                                                            */
/* -------------------------------------------------------------------------- */

export function AtomShells() {
  const [z, setZ] = useState(11);
  const element = elements[z - 1];
  const shells = element.shells;
  const outer = shells[shells.length - 1];

  const width = 640;
  const height = 340;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <SimShell
      title="Electron shells"
      description="Build any of the first 20 atoms and read off its group and period."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={`Atom of ${element.name}`}>
          {shells.map((count, shellIndex) => {
            const radius = 42 + shellIndex * 32;
            return (
              <g key={shellIndex}>
                <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgb(var(--border))" strokeWidth={1.5} />
                {Array.from({ length: count }, (_, i) => {
                  const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
                  return (
                    <circle
                      key={i}
                      cx={cx + radius * Math.cos(angle)}
                      cy={cy + radius * Math.sin(angle)}
                      r={6}
                      fill={shellIndex === shells.length - 1 ? 'rgb(var(--accent))' : 'rgb(var(--chemistry))'}
                    />
                  );
                })}
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r={26} fill="rgb(var(--chemistry))" fillOpacity={0.2} stroke="rgb(var(--chemistry))" strokeWidth={2} />
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize={18} fontWeight="700" fill="rgb(var(--text))">
            {element.symbol}
          </text>

          <text x={20} y={34} fontSize={14} fill="rgb(var(--text))">
            {element.name}
          </text>
          <text x={20} y={56} fontSize={12} fill="rgb(var(--muted))">
            Configuration {electronConfiguration(element)}
          </text>
          <text x={width - 20} y={34} textAnchor="end" fontSize={12} fill="rgb(var(--accent))">
            outer shell electrons: {outer}
          </text>
          <text x={width - 20} y={56} textAnchor="end" fontSize={12} fill="rgb(var(--muted))">
            occupied shells: {shells.length}
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Proton number (Z)" value={z} min={1} max={20} onChange={setZ} />
          <div className="rounded-card border border-line bg-surface-raised/50 p-3 text-sm">
            <p className="font-medium text-ink">{element.name}</p>
            <p className="mt-1 text-ink-muted">{element.notes ?? 'No IGCSE note recorded for this element.'}</p>
          </div>
          <p className="text-xs text-ink-faint">
            Limited to the first 20 elements — the range where IGCSE requires electronic configurations.
          </p>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Protons" value={element.number} tone="chemistry" />
          <Readout label="Electrons" value={element.number} tone="accent" />
          <Readout label="Group" value={element.igcseGroup ?? '—'} tone="positive" />
          <Readout label="Period" value={element.period} />
        </div>
      }
      content={{
        observe:
          'The outer-shell electrons are highlighted. Count them and compare with the group number; count the rings and compare with the period.',
        variables: 'The proton number, which sets everything else about a neutral atom.',
        predict: {
          question: 'An atom has the configuration 2,8,7. Which group is it in?',
          options: ['Group I', 'Group V', 'Group VII', 'Group VIII'],
          answerIndex: 2,
          why: 'Seven electrons in the outer shell means Group VII — the halogens. Set Z to 17 to check.',
        },
        experiment: [
          'Set Z to 11, then 12, then 13 and watch the outer shell fill one electron at a time.',
          'Compare Z = 2, 10 and 18. What do their outer shells have in common?',
          'Find every element whose outer shell holds exactly one electron.',
        ],
        explain: (
          <>
            <p>
              Electrons occupy shells filling from the inside out, with capacities{' '}
              <strong>2, 8, 8, 2</strong> across the first 20 elements.
            </p>
            <p>
              The <strong>number of outer-shell electrons equals the group number</strong> (for Groups
              I–VII) and the <strong>number of occupied shells equals the period number</strong>. That
              single rule lets you place any of the first 20 elements without memorising the table.
            </p>
            <p>
              Atoms react to reach a full outer shell. Metals with few outer electrons lose them;
              non-metals with nearly full shells gain or share. Every bonding topic follows from this.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Electrolysis cell                                                          */
/* -------------------------------------------------------------------------- */

type Electrolyte = {
  key: string;
  name: string;
  cathode: string;
  cathodeEquation: string;
  anode: string;
  anodeEquation: string;
  note: string;
};

const ELECTROLYTES: Electrolyte[] = [
  {
    key: 'molten-pbbr2',
    name: 'Molten lead(II) bromide',
    cathode: 'Lead',
    cathodeEquation: 'Pb²⁺ + 2e⁻ → Pb',
    anode: 'Bromine',
    anodeEquation: '2Br⁻ → Br₂ + 2e⁻',
    note: 'A molten binary compound: the metal forms at the cathode, the non-metal at the anode.',
  },
  {
    key: 'molten-zncl2',
    name: 'Molten zinc chloride',
    cathode: 'Zinc',
    cathodeEquation: 'Zn²⁺ + 2e⁻ → Zn',
    anode: 'Chlorine',
    anodeEquation: '2Cl⁻ → Cl₂ + 2e⁻',
    note: 'Same pattern as lead(II) bromide — no water present, so there is no competition.',
  },
  {
    key: 'conc-nacl',
    name: 'Concentrated aqueous sodium chloride',
    cathode: 'Hydrogen',
    cathodeEquation: '2H⁺ + 2e⁻ → H₂',
    anode: 'Chlorine',
    anodeEquation: '2Cl⁻ → Cl₂ + 2e⁻',
    note: 'Sodium is more reactive than hydrogen, so hydrogen is discharged instead. Sodium hydroxide is left in solution.',
  },
  {
    key: 'dilute-h2so4',
    name: 'Dilute sulfuric acid',
    cathode: 'Hydrogen',
    cathodeEquation: '2H⁺ + 2e⁻ → H₂',
    anode: 'Oxygen',
    anodeEquation: '4OH⁻ → O₂ + 2H₂O + 4e⁻',
    note: 'No halide present, so oxygen is discharged from hydroxide ions. This is effectively the electrolysis of water.',
  },
  {
    key: 'cuso4',
    name: 'Aqueous copper(II) sulfate (inert electrodes)',
    cathode: 'Copper',
    cathodeEquation: 'Cu²⁺ + 2e⁻ → Cu',
    anode: 'Oxygen',
    anodeEquation: '4OH⁻ → O₂ + 2H₂O + 4e⁻',
    note: 'Copper is less reactive than hydrogen, so the metal is deposited rather than hydrogen gas.',
  },
];

export function ElectrolysisCell() {
  const [key, setKey] = useState(ELECTROLYTES[0].key);
  const [current, setCurrent] = useState(1.5);
  const [tick, setTick] = useState(0);
  const reduced = usePrefersReducedMotion();
  const electrolyte = ELECTROLYTES.find((e) => e.key === key) ?? ELECTROLYTES[0];

  useEffect(() => {
    if (reduced) return;
    let frame: number;
    const loop = () => {
      setTick((t) => t + current);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [reduced, current]);

  const width = 640;
  const height = 320;
  const tankX = 140;
  const tankWidth = 360;
  const cathodeX = tankX + 40;
  const anodeX = tankX + tankWidth - 40;

  const ions = Array.from({ length: 10 }, (_, i) => {
    const positive = i % 2 === 0;
    const lane = 120 + (i % 5) * 30;
    const span = anodeX - cathodeX;
    const offset = ((tick * 0.6 + i * 37) % span) / span;
    return {
      positive,
      x: positive ? anodeX - offset * span : cathodeX + offset * span,
      y: lane,
    };
  });

  return (
    <SimShell
      title="Electrolysis cell"
      description="Watch the ions migrate and check the products."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Electrolysis cell">
          <rect x={tankX} y={90} width={tankWidth} height={180} rx={8} fill="rgb(var(--chemistry))" fillOpacity={0.07} stroke="rgb(var(--border))" strokeWidth={2} />

          <rect x={cathodeX - 10} y={60} width={20} height={190} rx={3} fill="rgb(var(--physics))" />
          <text x={cathodeX} y={48} textAnchor="middle" fontSize={12} fill="rgb(var(--physics))">
            Cathode (−)
          </text>
          <rect x={anodeX - 10} y={60} width={20} height={190} rx={3} fill="rgb(var(--negative))" />
          <text x={anodeX} y={48} textAnchor="middle" fontSize={12} fill="rgb(var(--negative))">
            Anode (+)
          </text>

          <line x1={cathodeX} y1={60} x2={cathodeX} y2={26} stroke="rgb(var(--accent))" strokeWidth={2} />
          <line x1={cathodeX} y1={26} x2={anodeX} y2={26} stroke="rgb(var(--accent))" strokeWidth={2} />
          <line x1={anodeX} y1={26} x2={anodeX} y2={60} stroke="rgb(var(--accent))" strokeWidth={2} />
          <rect x={width / 2 - 22} y={16} width={44} height={20} rx={3} fill="rgb(var(--accent))" />
          <text x={width / 2} y={31} textAnchor="middle" fontSize={11} fill="rgb(var(--surface-0))">
            {current.toFixed(1)} A
          </text>

          {ions.map((ion, index) => (
            <g key={index}>
              <circle cx={ion.x} cy={ion.y} r={9} fill={ion.positive ? 'rgb(var(--physics))' : 'rgb(var(--negative))'} opacity={0.85} />
              <text x={ion.x} y={ion.y + 4} textAnchor="middle" fontSize={11} fill="rgb(var(--surface-0))">
                {ion.positive ? '+' : '−'}
              </text>
            </g>
          ))}

          <text x={cathodeX} y={288} textAnchor="middle" fontSize={12} fill="rgb(var(--physics))">
            {electrolyte.cathode}
          </text>
          <text x={anodeX} y={288} textAnchor="middle" fontSize={12} fill="rgb(var(--negative))">
            {electrolyte.anode}
          </text>
          <text x={width / 2} y={310} textAnchor="middle" fontSize={11} fill="rgb(var(--muted))">
            PANIC — Positive is Anode, Negative Is Cathode
          </text>
        </svg>
      }
      controls={
        <>
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="electrolyte">
              Electrolyte
            </label>
            <Select id="electrolyte" value={key} onChange={(event) => setKey(event.target.value)}>
              {ELECTROLYTES.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.name}
                </option>
              ))}
            </Select>
          </div>
          <Slider label="Current" value={current} min={0.2} max={4} step={0.1} unit="A" onChange={setCurrent} format={(v) => v.toFixed(1)} />
          <div className="rounded-card border border-line bg-surface-raised/50 p-3 text-sm text-ink-muted">
            {electrolyte.note}
          </div>
        </>
      }
      readouts={
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-line bg-surface px-3.5 py-2.5">
            <p className="text-2xs uppercase tracking-wide text-ink-faint">At the cathode — reduction</p>
            <p className="mt-1 font-mono text-sm text-physics">{electrolyte.cathodeEquation}</p>
          </div>
          <div className="rounded-card border border-line bg-surface px-3.5 py-2.5">
            <p className="text-2xs uppercase tracking-wide text-ink-faint">At the anode — oxidation</p>
            <p className="mt-1 font-mono text-sm text-negative">{electrolyte.anodeEquation}</p>
          </div>
        </div>
      }
      content={{
        observe:
          'Positive ions always travel to the negative cathode, and negative ions to the positive anode. Notice how the products change once water is involved.',
        variables: 'The electrolyte and the current.',
        predict: {
          question: 'Concentrated sodium chloride solution is electrolysed. What forms at the cathode?',
          options: ['Sodium', 'Hydrogen', 'Chlorine', 'Oxygen'],
          answerIndex: 1,
          why: 'Sodium is more reactive than hydrogen, so hydrogen from the water is discharged in preference. Sodium hydroxide is left behind in solution.',
        },
        experiment: [
          'Compare molten zinc chloride with concentrated sodium chloride solution. Why do the cathode products differ?',
          'Switch to dilute sulfuric acid and look at the anode product.',
          'Try copper(II) sulfate — check whether the metal or hydrogen is deposited, and explain why.',
        ],
        explain: (
          <>
            <p>
              Electrolysis is the breakdown of an ionic compound, molten or in solution, by the passage of
              electricity. The ions must be <strong>free to move</strong>, which is why a solid ionic
              lattice does not conduct.
            </p>
            <p>
              At the cathode, positive ions <strong>gain</strong> electrons (reduction). At the anode,
              negative ions <strong>lose</strong> electrons (oxidation). OIL RIG.
            </p>
            <p>
              In aqueous solutions water supplies H⁺ and OH⁻, so there is competition. Hydrogen is
              discharged at the cathode unless the metal is <em>less</em> reactive than hydrogen. At the
              anode, a halogen wins if a halide is present in reasonable concentration; otherwise oxygen
              is discharged.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Diffusion tube                                                             */
/* -------------------------------------------------------------------------- */

export function DiffusionTube() {
  const [temperature, setTemperature] = useState(25);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Speeds go as 1/√Mr at a given temperature (Graham's law), scaled by √T.
  const mrAmmonia = 17;
  const mrHcl = 36.5;
  const speedFactor = Math.sqrt((temperature + 273) / 298);
  const vAmmonia = (1 / Math.sqrt(mrAmmonia)) * speedFactor;
  const vHcl = (1 / Math.sqrt(mrHcl)) * speedFactor;
  // Meeting point as a fraction of the tube, measured from the ammonia end.
  const meetingFraction = vAmmonia / (vAmmonia + vHcl);

  useEffect(() => {
    if (!running || reduced) return;
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setProgress((current) => {
        const next = current + delta * 0.35 * speedFactor;
        if (next >= 1) {
          setRunning(false);
          return 1;
        }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, reduced, speedFactor]);

  const width = 640;
  const height = 260;
  const tubeX = 70;
  const tubeWidth = 500;
  const tubeY = 110;

  const ammoniaFront = tubeX + progress * meetingFraction * tubeWidth;
  const hclFront = tubeX + tubeWidth - progress * (1 - meetingFraction) * tubeWidth;
  const met = progress >= 1;

  return (
    <SimShell
      title="Diffusion tube"
      description="Ammonia and hydrogen chloride, racing towards each other."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Diffusion tube experiment">
          <rect x={tubeX} y={tubeY} width={tubeWidth} height={54} rx={27} fill="none" stroke="rgb(var(--border))" strokeWidth={3} />
          <rect x={tubeX} y={tubeY} width={Math.max(0, ammoniaFront - tubeX)} height={54} rx={27} fill="rgb(var(--chemistry))" fillOpacity={0.16} />
          <rect x={hclFront} y={tubeY} width={Math.max(0, tubeX + tubeWidth - hclFront)} height={54} rx={27} fill="rgb(var(--physics))" fillOpacity={0.16} />

          <circle cx={tubeX - 18} cy={tubeY + 27} r={14} fill="rgb(var(--chemistry))" opacity={0.8} />
          <text x={tubeX - 18} y={tubeY - 6} textAnchor="middle" fontSize={11} fill="rgb(var(--chemistry))">
            NH₃
          </text>
          <text x={tubeX - 18} y={tubeY + 84} textAnchor="middle" fontSize={10} fill="rgb(var(--muted))">
            Mr 17
          </text>

          <circle cx={tubeX + tubeWidth + 18} cy={tubeY + 27} r={14} fill="rgb(var(--physics))" opacity={0.8} />
          <text x={tubeX + tubeWidth + 18} y={tubeY - 6} textAnchor="middle" fontSize={11} fill="rgb(var(--physics))">
            HCl
          </text>
          <text x={tubeX + tubeWidth + 18} y={tubeY + 84} textAnchor="middle" fontSize={10} fill="rgb(var(--muted))">
            Mr 36.5
          </text>

          {met && (
            <>
              <rect x={tubeX + meetingFraction * tubeWidth - 9} y={tubeY + 2} width={18} height={50} rx={9} fill="#ffffff" opacity={0.95} />
              <text
                x={tubeX + meetingFraction * tubeWidth}
                y={tubeY - 22}
                textAnchor="middle"
                fontSize={12}
                fill="rgb(var(--positive))"
              >
                white ring of NH₄Cl
              </text>
            </>
          )}

          <line x1={tubeX} y1={tubeY + 96} x2={tubeX + meetingFraction * tubeWidth} y2={tubeY + 96} stroke="rgb(var(--chemistry))" strokeWidth={2} />
          <text x={tubeX + (meetingFraction * tubeWidth) / 2} y={tubeY + 112} textAnchor="middle" fontSize={11} fill="rgb(var(--chemistry))">
            {(meetingFraction * 100).toFixed(0)}% of the tube
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Temperature" value={temperature} min={5} max={80} unit="°C" onChange={setTemperature} />
          <button
            type="button"
            onClick={() => {
              setProgress(0);
              setRunning(true);
            }}
            className="w-full rounded-xl bg-ink px-4 py-2 text-sm font-medium text-page transition-opacity hover:opacity-90 dark:bg-accent dark:text-[rgb(var(--surface-0))]"
          >
            Start the experiment
          </button>
          <p className="text-xs text-ink-faint">
            Temperature changes how fast both gases move, but not the ratio between them — so the ring
            forms in the same place, just sooner.
          </p>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Ring position" value={`${(meetingFraction * 100).toFixed(1)}%`} tone="chemistry" />
          <Readout label="Speed ratio NH₃ : HCl" value={(vAmmonia / vHcl).toFixed(2)} tone="accent" />
          <Readout label="√(Mr HCl / Mr NH₃)" value={Math.sqrt(mrHcl / mrAmmonia).toFixed(2)} tone="positive" />
        </div>
      }
      content={{
        observe:
          'The white ring does not form in the middle. Compare where it forms with the two relative molecular masses.',
        variables: 'Temperature only — the gases are fixed.',
        predict: {
          question: 'Where does the white ring of ammonium chloride form?',
          options: [
            'Exactly in the middle',
            'Nearer the ammonia end',
            'Nearer the hydrochloric acid end',
            'It depends on the temperature',
          ],
          answerIndex: 2,
          why: 'Ammonia (Mr 17) is lighter than hydrogen chloride (Mr 36.5), so its particles move faster and travel further before the gases meet — putting the ring nearer the HCl end.',
        },
        experiment: [
          'Run the experiment and note where the ring forms.',
          'Raise the temperature and run it again. Does the ring move, or just arrive sooner?',
          'Compare the speed ratio readout with √(36.5 / 17).',
        ],
        explain: (
          <>
            <p>
              <strong>Diffusion</strong> is the net movement of particles from a region of higher
              concentration to one of lower concentration, caused by their random motion.
            </p>
            <p>
              At the same temperature all gas particles have the same average kinetic energy. Since
              Ek = ½mv², lighter particles must be moving <strong>faster</strong>. Ammonia is lighter than
              hydrogen chloride, so it diffuses further in the same time and the ring forms nearer the HCl
              end.
            </p>
            <p>
              Raising the temperature speeds up both gases in the same proportion, so the ring forms in the
              same place — just sooner.
            </p>
          </>
        ),
      }}
    />
  );
}
