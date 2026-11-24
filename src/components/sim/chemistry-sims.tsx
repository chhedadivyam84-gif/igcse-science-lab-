'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Select, Slider } from '@/components/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { sigFig } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Particle model / states of matter                                          */
/* -------------------------------------------------------------------------- */

export function ParticleModel() {
  const [temperature, setTemperature] = useState(300);
  const [volume, setVolume] = useState(100);
  const [tick, setTick] = useState(0);
  const reduced = usePrefersReducedMotion();

  const state = temperature < 273 ? 'solid' : temperature < 373 ? 'liquid' : 'gas';

  useEffect(() => {
    if (reduced) return;
    let frame: number;
    const loop = () => {
      setTick((t) => t + 1);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const width = 640;
  const height = 300;
  const boxWidth = 200 + (volume / 100) * 260;
  const boxX = (width - boxWidth) / 2;
  const boxY = 40;
  const boxHeight = 210;

  // Higher temperature = larger excursion from the rest position.
  const jitter = state === 'solid' ? 2.5 : state === 'liquid' ? 7 : 3 + temperature / 40;
  const count = 40;

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 7919) % 997;
        return { seed, phase: (seed / 997) * Math.PI * 2 };
      }),
    [],
  );

  // Collisions per second scales with speed (√T) and inversely with volume.
  const collisionRate = Math.round((Math.sqrt(temperature) * 6000) / volume);
  const pressure = Math.round((temperature / volume) * 33);

  return (
    <SimShell
      title="States of matter and gas pressure"
      description="Heat it, squeeze it, and count the collisions."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Particles in a container">
          <rect x={boxX} y={boxY} width={boxWidth} height={boxHeight} rx={6} fill="none" stroke="rgb(var(--border))" strokeWidth={3} />
          {particles.map((particle, index) => {
            let x: number;
            let y: number;

            const floor = boxY + boxHeight - 12;
            if (state === 'solid') {
              // Regular lattice of touching particles resting on the floor,
              // vibrating about fixed positions.
              const columns = 10;
              const restX = boxX + boxWidth / 2 + ((index % columns) - (columns - 1) / 2) * 16;
              const restY = floor - Math.floor(index / columns) * 16;
              x = restX + Math.sin(tick * 0.16 + particle.phase) * jitter;
              y = restY + Math.cos(tick * 0.19 + particle.phase) * jitter;
            } else if (state === 'liquid') {
              // Still touching, but irregular and sliding past one another,
              // spread across the bottom of the container.
              const columns = Math.max(10, Math.floor((boxWidth - 30) / 17));
              const row = Math.floor(index / columns);
              const restX = boxX + 15 + (index % columns) * 17 + (row % 2) * 8;
              const slide = Math.sin(tick * 0.03 + particle.phase) * 10;
              x = Math.min(boxX + boxWidth - 10, Math.max(boxX + 10, restX + slide));
              y = floor - row * 15 + Math.cos(tick * 0.06 + particle.phase * 1.7) * 2.5;
            } else {
              // Free flight in straight lines, bouncing off the walls.
              const speed = jitter * 0.55;
              const bounce = (v: number, span: number) => {
                const m = ((v % (2 * span)) + 2 * span) % (2 * span);
                return m < span ? m : 2 * span - m;
              };
              x = boxX + 10 + bounce(particle.seed * 3 + tick * speed * (0.6 + (particle.seed % 7) / 10), boxWidth - 20);
              y = boxY + 10 + bounce(particle.seed * 5 + tick * speed * (0.5 + (particle.seed % 5) / 8), boxHeight - 20);
            }

            return <circle key={index} cx={x} cy={y} r={7} fill="rgb(var(--chemistry))" opacity={0.85} />;
          })}
          <text x={width / 2} y={280} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
            {state === 'solid'
              ? 'Solid — regular, touching, vibrating about fixed positions'
              : state === 'liquid'
                ? 'Liquid — irregular, touching, sliding past one another'
                : 'Gas — random, far apart, fast in all directions'}
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Temperature" value={temperature} min={100} max={800} step={5} unit="K" onChange={setTemperature} />
          <Slider label="Container volume" value={volume} min={40} max={100} unit="%" onChange={setVolume} />
          <p className="text-xs text-ink-faint">
            Melting is modelled at 273 K and boiling at 373 K — water&rsquo;s values, for familiarity.
          </p>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="State" value={state} tone="chemistry" />
          <Readout label="Temperature" value={temperature} unit="K" />
          <Readout label="Wall collisions" value={collisionRate} unit="/s" tone="accent" />
          <Readout label="Relative pressure" value={pressure} unit="kPa" tone="positive" />
        </div>
      }
      content={{
        observe:
          'Watch three things at each temperature: how the particles are arranged, how far apart they are, and how they move. Those are the three things exam answers must cover.',
        variables: 'Temperature and container volume.',
        predict: {
          question: 'A sealed gas is heated at constant volume. What happens to the pressure?',
          options: ['It falls', 'It stays the same', 'It rises', 'It rises then falls'],
          answerIndex: 2,
          why: 'Faster particles collide with the walls more often and harder, so the force per unit area — the pressure — increases.',
        },
        experiment: [
          'Start at 150 K and raise the temperature slowly through 273 K and 373 K. Note where the arrangement changes.',
          'Set the temperature to 500 K, then shrink the volume. Watch the collision rate.',
          'Compare the collision rate at 300 K and 600 K with the volume unchanged.',
        ],
        explain: (
          <>
            <p>
              Heating gives particles more <strong>kinetic energy</strong>. At a change of state the
              energy goes into overcoming the forces of attraction between particles instead of raising
              the temperature — which is why heating curves have flat sections.
            </p>
            <p>
              Gas pressure comes from <strong>collisions with the container walls</strong>. Raise the
              temperature and the collisions become more frequent and harder. Shrink the volume and the
              same particles hit a smaller area more often. Both raise the pressure.
            </p>
            <p>
              For a fixed mass of gas at constant temperature,{' '}
              <code className="formula">p₁V₁ = p₂V₂</code>.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Rate of reaction                                                           */
/* -------------------------------------------------------------------------- */

export function RatesLab() {
  const [concentration, setConcentration] = useState(1);
  const [temperature, setTemperature] = useState(25);
  const [surface, setSurface] = useState<'lumps' | 'powder'>('lumps');
  const [catalyst, setCatalyst] = useState(false);
  const [runs, setRuns] = useState<{ label: string; k: number; colour: string }[]>([]);

  /**
   * Rate constant model. Concentration and surface area scale the collision
   * frequency; temperature raises the fraction of successful collisions
   * (roughly doubling every 10 °C); a catalyst lowers the activation energy.
   */
  const k =
    0.05 *
    concentration *
    (surface === 'powder' ? 2.2 : 1) *
    2 ** ((temperature - 25) / 10) *
    (catalyst ? 1.8 : 1);

  // Total gas produced depends only on the amount of reactant, which is fixed.
  const maxVolume = 60;
  const width = 640;
  const height = 300;
  const maxTime = 120;
  const toX = (t: number) => 60 + (t / maxTime) * (width - 100);
  const toY = (v: number) => height - 50 - (v / maxVolume) * (height - 80);

  const curveFor = (rate: number) =>
    Array.from({ length: 121 }, (_, i) => {
      const t = (i / 120) * maxTime;
      return `${toX(t).toFixed(1)},${toY(maxVolume * (1 - Math.exp(-rate * t))).toFixed(1)}`;
    }).join(' ');

  const currentLabel = `${concentration.toFixed(1)} mol/dm³, ${temperature}°C, ${surface}${catalyst ? ', catalyst' : ''}`;

  return (
    <SimShell
      title="Rate of reaction"
      description="Compare gas-volume curves side by side."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Gas volume against time">
          <line x1={60} y1={20} x2={60} y2={height - 50} stroke="rgb(var(--border))" strokeWidth={2} />
          <line x1={60} y1={height - 50} x2={width - 40} y2={height - 50} stroke="rgb(var(--border))" strokeWidth={2} />
          <line x1={60} y1={toY(maxVolume)} x2={width - 40} y2={toY(maxVolume)} stroke="rgb(var(--muted))" strokeWidth={1} strokeDasharray="4 5" />
          <text x={54} y={toY(maxVolume) + 4} textAnchor="end" fontSize={13} fill="rgb(var(--muted))">
            {maxVolume}
          </text>
          <text x={54} y={30} textAnchor="end" fontSize={13} fill="rgb(var(--muted))">
            cm³
          </text>
          <text x={width / 2} y={height - 22} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
            time (s)
          </text>

          {runs.map((run, index) => (
            <polyline key={index} points={curveFor(run.k)} fill="none" stroke={run.colour} strokeWidth={2} opacity={0.55} />
          ))}
          <polyline points={curveFor(k)} fill="none" stroke="rgb(var(--chemistry))" strokeWidth={3} />
        </svg>
      }
      controls={
        <>
          <Slider
            label="Acid concentration"
            value={concentration}
            min={0.2}
            max={2}
            step={0.1}
            unit="mol/dm³"
            onChange={setConcentration}
            format={(v) => v.toFixed(1)}
          />
          <Slider label="Temperature" value={temperature} min={10} max={70} unit="°C" onChange={setTemperature} />
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="surface">
              Solid form
            </label>
            <Select id="surface" value={surface} onChange={(event) => setSurface(event.target.value as typeof surface)}>
              <option value="lumps">Large lumps</option>
              <option value="powder">Powder (larger surface area)</option>
            </Select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={catalyst}
              onChange={(event) => setCatalyst(event.target.checked)}
              className="h-4 w-4 accent-[rgb(var(--accent))]"
            />
            Add a catalyst
          </label>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() =>
                setRuns((current) =>
                  [...current, { label: currentLabel, k, colour: 'rgb(var(--muted))' }].slice(-4),
                )
              }
            >
              Keep this curve
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setRuns([])}>
              Clear
            </Button>
          </div>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Initial rate" value={sigFig(k * maxVolume, 3)} unit="cm³/s" tone="chemistry" />
          <Readout label="Time to 30 cm³" value={sigFig(Math.log(2) / k, 3)} unit="s" tone="accent" />
          <Readout label="Final volume" value={maxVolume} unit="cm³" tone="positive" />
        </div>
      }
      content={{
        observe:
          'Every curve levels off at the same height, because the amount of reactant never changes. Only the steepness changes.',
        variables: 'Concentration, temperature, surface area and whether a catalyst is present.',
        predict: {
          question: 'Raising the temperature by 10 °C roughly doubles the rate. Which effect is the larger reason?',
          options: [
            'Particles move faster so collide more often',
            'More particles have energy above the activation energy',
            'The activation energy falls',
            'More reactant is present',
          ],
          answerIndex: 1,
          why: 'Both the frequency and the success rate of collisions rise, but the jump in the fraction of particles exceeding the activation energy is by far the bigger effect.',
        },
        experiment: [
          'Keep a curve at 25 °C, then run one at 45 °C and compare the steepness and the plateau height.',
          'Switch from lumps to powder with everything else fixed.',
          'Add a catalyst and confirm the final volume does not change.',
        ],
        explain: (
          <>
            <p>
              For a reaction to happen, particles must <strong>collide with at least the activation
              energy</strong> and in the right orientation. Anything that increases the frequency of
              collisions, or the fraction that are successful, increases the rate.
            </p>
            <ul>
              <li>Higher concentration or pressure — more particles in the same volume, so more frequent collisions.</li>
              <li>Larger surface area — more particles exposed, so more frequent collisions.</li>
              <li>Higher temperature — faster particles <em>and</em> a much larger fraction above the activation energy.</li>
              <li>Catalyst — an alternative pathway with a lower activation energy, so more collisions succeed.</li>
            </ul>
            <p>
              None of them changes how much product forms. The plateau height depends only on how much
              reactant you started with.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Titration and pH                                                           */
/* -------------------------------------------------------------------------- */

/**
 * pH after adding `v` cm³ of 0.100 mol/dm³ NaOH to 25.0 cm³ of 0.100 mol/dm³
 * acid. Strong acid: excess H⁺ directly. Weak acid (ethanoic, pKa 4.76): the
 * buffer region follows pH = pKa + log([A⁻]/[HA]), which is why its curve
 * rises quickly, flattens, then jumps — and why equivalence sits above 7.
 */
function phAfter(v: number, strength: 'strong' | 'weak'): number {
  const acid = 25 * 0.1; // mmol
  const base = v * 0.1;
  const volume = 25 + v;
  if (base > acid + 1e-9) {
    const oh = (base - acid) / volume;
    return Math.min(13, 14 + Math.log10(oh));
  }
  if (strength === 'strong') {
    if (Math.abs(base - acid) < 1e-9) return 7;
    return -Math.log10((acid - base) / volume);
  }
  if (Math.abs(base - acid) < 1e-9) return 8.7;
  if (base === 0) return 2.88; // √(Ka × 0.1)
  return Math.max(2.88, 4.76 + Math.log10(base / (acid - base)));
}

export function PhTitration() {
  const [added, setAdded] = useState(0);
  const [acidStrength, setAcidStrength] = useState<'strong' | 'weak'>('strong');
  const [running, setRunning] = useState(false);
  const rafRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const equivalence = 25;

  const pH = useMemo(() => phAfter(added, acidStrength), [added, acidStrength]);

  useEffect(() => {
    if (!running || reduced) return;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setAdded((current) => {
        const next = current + delta * 6;
        if (next >= 50) {
          setRunning(false);
          return 50;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [running, reduced]);

  const width = 640;
  const height = 300;
  const toX = (v: number) => 60 + (v / 50) * (width - 100);
  const toY = (p: number) => height - 50 - (p / 14) * (height - 80);

  const curve = Array.from({ length: 201 }, (_, i) => {
    const v = (i / 200) * 50;
    const value = phAfter(v, acidStrength);
    return `${toX(v).toFixed(1)},${toY(value).toFixed(1)}`;
  }).join(' ');

  const indicatorColour = pH < 4.4 ? '#e11d48' : pH < 6.2 ? '#f97316' : pH < 8 ? '#eab308' : pH < 10 ? '#22c55e' : '#6366f1';

  return (
    <SimShell
      title="Titration and pH"
      description="Add alkali drop by drop and watch the curve."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Titration curve">
          <line x1={60} y1={20} x2={60} y2={height - 50} stroke="rgb(var(--border))" strokeWidth={2} />
          <line x1={60} y1={height - 50} x2={width - 40} y2={height - 50} stroke="rgb(var(--border))" strokeWidth={2} />
          {[0, 7, 14].map((p) => (
            <g key={p}>
              <line x1={56} y1={toY(p)} x2={width - 40} y2={toY(p)} stroke="rgb(var(--border))" strokeWidth={1} strokeDasharray="3 6" opacity={0.6} />
              <text x={50} y={toY(p) + 4} textAnchor="end" fontSize={13} fill="rgb(var(--muted))">
                {p}
              </text>
            </g>
          ))}
          <text x={40} y={26} fontSize={13} fill="rgb(var(--muted))">
            pH
          </text>
          <text x={width / 2} y={height - 22} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
            volume of alkali added (cm³)
          </text>

          <line x1={toX(equivalence)} y1={20} x2={toX(equivalence)} y2={height - 50} stroke="rgb(var(--caution))" strokeWidth={1.5} strokeDasharray="5 4" />
          <text x={toX(equivalence) + 6} y={40} fontSize={13} fill="rgb(var(--caution))">
            equivalence
          </text>

          <polyline points={curve} fill="none" stroke="rgb(var(--chemistry))" strokeWidth={3} />
          <circle cx={toX(added)} cy={toY(pH)} r={7} fill={indicatorColour} stroke="rgb(var(--surface))" strokeWidth={2} />

          <rect x={width - 90} y={40} width={44} height={80} rx={6} fill={indicatorColour} opacity={0.85} />
          <text x={width - 68} y={134} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
            indicator
          </text>
        </svg>
      }
      controls={
        <>
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="acid-strength">
              Acid in the flask
            </label>
            <Select
              id="acid-strength"
              value={acidStrength}
              onChange={(event) => setAcidStrength(event.target.value as typeof acidStrength)}
            >
              <option value="strong">Strong acid (fully dissociated)</option>
              <option value="weak">Weak acid (partially dissociated)</option>
            </Select>
          </div>
          <Slider
            label="Alkali added"
            value={added}
            min={0}
            max={50}
            step={0.5}
            unit="cm³"
            onChange={setAdded}
            format={(v) => v.toFixed(1)}
          />
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => {
              setAdded(0);
              setRunning(true);
            }}
          >
            Run titration
          </Button>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Alkali added" value={added.toFixed(1)} unit="cm³" />
          <Readout label="pH" value={pH.toFixed(2)} tone="chemistry" />
          <Readout label="Equivalence at" value={equivalence} unit="cm³" tone="accent" />
          <Readout
            label="Solution is"
            value={pH < 6.5 ? 'acidic' : pH > 7.5 ? 'alkaline' : 'neutral'}
            tone={pH < 6.5 ? 'negative' : pH > 7.5 ? 'accent' : 'positive'}
          />
        </div>
      }
      content={{
        observe:
          'The pH barely moves for most of the titration, then jumps almost vertically over about 1 cm³. That steep section is why titrations are precise.',
        variables: 'The strength of the acid, and the volume of alkali added.',
        predict: {
          question: 'What is the pH at the equivalence point of a strong acid–strong alkali titration?',
          options: ['About 3', 'About 7', 'About 9', 'About 12'],
          answerIndex: 1,
          why: 'The salt formed is neutral, so the pH at equivalence is 7. With a weak acid the salt is slightly alkaline, so equivalence sits above 7.',
        },
        experiment: [
          'Run a strong-acid titration and read the pH at 25 cm³.',
          'Switch to a weak acid and compare both the starting pH and the pH at equivalence.',
          'Find how many cm³ it takes for the pH to travel from 4 to 10.',
        ],
        explain: (
          <>
            <p>
              Neutralisation is <code className="formula">H⁺(aq) + OH⁻(aq) → H₂O(l)</code>. As alkali is
              added, H⁺ ions are removed and the pH climbs — slowly at first, because plenty of acid
              remains.
            </p>
            <p>
              Near the equivalence point almost no H⁺ is left, so each further drop causes a large
              change: the near-vertical section of the curve.
            </p>
            <p>
              A <strong>strong</strong> acid is fully dissociated, so it starts at a much lower pH than a{' '}
              <strong>weak</strong> acid of the same concentration. That is a difference in dissociation,
              not in concentration — a distinction exam questions test constantly.
            </p>
          </>
        ),
      }}
    />
  );
}
