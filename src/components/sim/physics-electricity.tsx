'use client';

import { useState } from 'react';
import { Select, Slider } from '@/components/ui';
import { sigFig } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Ohm's law and I–V characteristics                                          */
/* -------------------------------------------------------------------------- */

type Component = 'resistor' | 'lamp' | 'diode';

/**
 * Current through each component for a given p.d.
 *  - resistor: strictly ohmic, I = V/R
 *  - lamp: resistance rises with temperature, modelled as R ∝ |I|^0.55
 *  - diode: negligible reverse current, sharp forward conduction above ~0.7 V
 */
function currentFor(component: Component, voltage: number, resistance: number): number {
  if (component === 'resistor') return voltage / resistance;

  if (component === 'lamp') {
    const sign = Math.sign(voltage);
    const magnitude = Math.abs(voltage);
    // Solved iteratively: R grows with the current it is carrying.
    let current = magnitude / resistance;
    for (let i = 0; i < 12; i++) {
      const hotResistance = resistance * (1 + 2.6 * Math.pow(Math.abs(current), 0.55));
      current = magnitude / hotResistance;
    }
    return sign * current;
  }

  if (voltage <= 0.7) return voltage < 0 ? -0.0005 : voltage * 0.004;
  return (voltage - 0.7) / (resistance * 0.25);
}

export function OhmsLaw() {
  const [component, setComponent] = useState<Component>('resistor');
  const [voltage, setVoltage] = useState(3);
  const [resistance, setResistance] = useState(10);

  const current = currentFor(component, voltage, resistance);
  const measuredResistance = current !== 0 ? voltage / current : Infinity;
  const power = voltage * current;

  const width = 640;
  const height = 320;
  const vMax = 6;
  const iMax = Math.max(
    0.2,
    ...Array.from({ length: 41 }, (_, i) => Math.abs(currentFor(component, -vMax + (i / 40) * 2 * vMax, resistance))),
  );

  const toX = (v: number) => width / 2 + (v / vMax) * (width / 2 - 40);
  const toY = (i: number) => height / 2 - (i / iMax) * (height / 2 - 30);

  const curve = Array.from({ length: 121 }, (_, index) => {
    const v = -vMax + (index / 120) * 2 * vMax;
    return `${toX(v).toFixed(1)},${toY(currentFor(component, v, resistance)).toFixed(1)}`;
  }).join(' ');

  return (
    <SimShell
      title="Ohm's law and I–V graphs"
      description="Sweep the voltage and watch the characteristic curve."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Current against voltage">
          <line x1={40} y1={height / 2} x2={width - 40} y2={height / 2} stroke="rgb(var(--border))" strokeWidth={1.5} />
          <line x1={width / 2} y1={20} x2={width / 2} y2={height - 20} stroke="rgb(var(--border))" strokeWidth={1.5} />
          <text x={width - 44} y={height / 2 - 10} textAnchor="end" fontSize={12} fill="rgb(var(--muted))">
            V (volts)
          </text>
          <text x={width / 2 + 10} y={30} fontSize={12} fill="rgb(var(--muted))">
            I (amps)
          </text>
          <polyline points={curve} fill="none" stroke="rgb(var(--physics))" strokeWidth={3} strokeLinecap="round" />
          <circle cx={toX(voltage)} cy={toY(current)} r={7} fill="rgb(var(--accent))" />
          <line x1={toX(voltage)} y1={height / 2} x2={toX(voltage)} y2={toY(current)} stroke="rgb(var(--accent))" strokeWidth={1} strokeDasharray="3 3" />
        </svg>
      }
      controls={
        <>
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="component">
              Component
            </label>
            <Select
              id="component"
              value={component}
              onChange={(event) => setComponent(event.target.value as Component)}
            >
              <option value="resistor">Fixed resistor (constant temperature)</option>
              <option value="lamp">Filament lamp</option>
              <option value="diode">Diode</option>
            </Select>
          </div>
          <Slider
            label="Potential difference"
            value={voltage}
            min={-6}
            max={6}
            step={0.1}
            unit="V"
            onChange={setVoltage}
            format={(v) => v.toFixed(1)}
          />
          <Slider label="Nominal resistance" value={resistance} min={2} max={60} unit="Ω" onChange={setResistance} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Voltage" value={voltage.toFixed(1)} unit="V" tone="physics" />
          <Readout label="Current" value={sigFig(current, 3)} unit="A" tone="accent" />
          <Readout
            label="Measured R = V/I"
            value={Number.isFinite(measuredResistance) ? sigFig(measuredResistance, 3) : '—'}
            unit="Ω"
          />
          <Readout label="Power = IV" value={sigFig(Math.abs(power), 3)} unit="W" tone="positive" />
        </div>
      }
      content={{
        observe:
          'The blue curve is the I–V characteristic. Watch the shape change as you switch component, and watch V/I as you move along it.',
        variables: 'The component, the applied potential difference, and the nominal resistance.',
        predict: {
          question: 'For a filament lamp, what happens to V/I as the voltage increases?',
          options: ['It stays constant', 'It increases', 'It decreases', 'It falls to zero'],
          answerIndex: 1,
          why: 'The filament heats up, its metal ions vibrate more, and the resistance rises — so V/I increases and the graph curves over.',
        },
        experiment: [
          'With the fixed resistor, check that V/I stays the same at 1 V, 3 V and 5 V.',
          'Switch to the filament lamp and repeat. Watch the "measured R" readout climb.',
          'Switch to the diode and sweep the voltage negative. Notice the current stays near zero.',
        ],
        explain: (
          <>
            <p>
              <strong>Ohm&rsquo;s law</strong> says that for a metallic conductor <em>at constant
              temperature</em>, current is directly proportional to potential difference. That is the
              straight line through the origin you get with the fixed resistor.
            </p>
            <p>
              A <strong>filament lamp</strong> breaks the condition: as current flows the filament heats
              up, the ions vibrate more, the electrons are impeded and the resistance rises. The graph
              flattens.
            </p>
            <p>
              A <strong>diode</strong> conducts in one direction only, and needs about 0.7 V before
              forward current rises sharply.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Series and parallel circuits                                               */
/* -------------------------------------------------------------------------- */

export function CircuitBuilder() {
  const [arrangement, setArrangement] = useState<'series' | 'parallel'>('series');
  const [r1, setR1] = useState(6);
  const [r2, setR2] = useState(3);
  const [supply, setSupply] = useState(12);

  const total = arrangement === 'series' ? r1 + r2 : 1 / (1 / r1 + 1 / r2);
  const totalCurrent = supply / total;
  const i1 = arrangement === 'series' ? totalCurrent : supply / r1;
  const i2 = arrangement === 'series' ? totalCurrent : supply / r2;
  const v1 = arrangement === 'series' ? totalCurrent * r1 : supply;
  const v2 = arrangement === 'series' ? totalCurrent * r2 : supply;

  return (
    <SimShell
      title="Series and parallel circuits"
      description="Watch how current and potential difference distribute."
      stage={
        <svg viewBox="0 0 640 300" className="h-auto w-full" role="img" aria-label="Circuit diagram">
          {arrangement === 'series' ? (
            <>
              <polyline points="120,80 520,80 520,220 120,220 120,80" fill="none" stroke="rgb(var(--physics))" strokeWidth={3} />
              <rect x={220} y={66} width={64} height={28} rx={4} fill="rgb(var(--surface-2))" stroke="rgb(var(--physics))" strokeWidth={2} />
              <text x={252} y={85} textAnchor="middle" fontSize={13} fill="rgb(var(--text))">
                {r1} Ω
              </text>
              <rect x={360} y={66} width={64} height={28} rx={4} fill="rgb(var(--surface-2))" stroke="rgb(var(--physics))" strokeWidth={2} />
              <text x={392} y={85} textAnchor="middle" fontSize={13} fill="rgb(var(--text))">
                {r2} Ω
              </text>
              <text x={252} y={58} textAnchor="middle" fontSize={11} fill="rgb(var(--accent))">
                {v1.toFixed(1)} V
              </text>
              <text x={392} y={58} textAnchor="middle" fontSize={11} fill="rgb(var(--accent))">
                {v2.toFixed(1)} V
              </text>
              <text x={320} y={244} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
                same current everywhere: {totalCurrent.toFixed(2)} A
              </text>
            </>
          ) : (
            <>
              <polyline points="120,60 520,60 520,240 120,240 120,60" fill="none" stroke="rgb(var(--chemistry))" strokeWidth={3} />
              <polyline points="250,60 250,120 390,120 390,60" fill="none" stroke="rgb(var(--chemistry))" strokeWidth={3} />
              <polyline points="250,120 250,180 390,180 390,120" fill="none" stroke="rgb(var(--chemistry))" strokeWidth={3} />
              <rect x={288} y={106} width={64} height={28} rx={4} fill="rgb(var(--surface-2))" stroke="rgb(var(--chemistry))" strokeWidth={2} />
              <text x={320} y={125} textAnchor="middle" fontSize={13} fill="rgb(var(--text))">
                {r1} Ω
              </text>
              <rect x={288} y={166} width={64} height={28} rx={4} fill="rgb(var(--surface-2))" stroke="rgb(var(--chemistry))" strokeWidth={2} />
              <text x={320} y={185} textAnchor="middle" fontSize={13} fill="rgb(var(--text))">
                {r2} Ω
              </text>
              <text x={420} y={125} fontSize={11} fill="rgb(var(--accent))">
                {i1.toFixed(2)} A
              </text>
              <text x={420} y={185} fontSize={11} fill="rgb(var(--accent))">
                {i2.toFixed(2)} A
              </text>
              <text x={320} y={268} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
                same p.d. across each branch: {supply.toFixed(1)} V
              </text>
            </>
          )}
          <rect x={296} y={arrangement === 'series' ? 208 : 228} width={48} height={24} rx={3} fill="rgb(var(--accent))" />
          <text
            x={320}
            y={arrangement === 'series' ? 225 : 245}
            textAnchor="middle"
            fontSize={12}
            fill="rgb(var(--surface-0))"
          >
            {supply} V
          </text>
        </svg>
      }
      controls={
        <>
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="arrangement">
              Arrangement
            </label>
            <Select
              id="arrangement"
              value={arrangement}
              onChange={(event) => setArrangement(event.target.value as 'series' | 'parallel')}
            >
              <option value="series">Series</option>
              <option value="parallel">Parallel</option>
            </Select>
          </div>
          <Slider label="Supply p.d." value={supply} min={1} max={24} unit="V" onChange={setSupply} />
          <Slider label="R₁" value={r1} min={1} max={40} unit="Ω" onChange={setR1} />
          <Slider label="R₂" value={r2} min={1} max={40} unit="Ω" onChange={setR2} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Total resistance" value={total.toFixed(2)} unit="Ω" tone="physics" />
          <Readout label="Total current" value={totalCurrent.toFixed(2)} unit="A" tone="accent" />
          <Readout label="Through R₁" value={i1.toFixed(2)} unit="A" />
          <Readout label="Through R₂" value={i2.toFixed(2)} unit="A" />
        </div>
      }
      content={{
        observe:
          'Compare the total resistance with R₁ and R₂ in each arrangement. One of them is always larger than both; the other is always smaller than both.',
        variables: 'The arrangement, the supply p.d. and the two resistances.',
        predict: {
          question: 'Two 6 Ω resistors are connected in parallel. What is the total resistance?',
          options: ['12 Ω', '6 Ω', '3 Ω', '0.33 Ω'],
          answerIndex: 2,
          why: '1/R = 1/6 + 1/6 = 2/6, so R = 3 Ω. Adding a parallel path always lowers the total resistance below the smallest branch.',
        },
        experiment: [
          'Set both resistors to 6 Ω in series, then switch to parallel. Compare the totals.',
          'In series, check that the two p.d.s add up to the supply voltage.',
          'In parallel, check that the two branch currents add up to the total current.',
        ],
        explain: (
          <>
            <p>
              In <strong>series</strong> there is one path, so the current is the same everywhere and the
              supply p.d. is shared in proportion to resistance. Resistances add: R = R₁ + R₂.
            </p>
            <p>
              In <strong>parallel</strong> each branch gets the full supply p.d., and the current splits.
              Because there are more paths for the charge, the total resistance falls:{' '}
              <code className="formula">1/R = 1/R₁ + 1/R₂</code>.
            </p>
            <p>
              A useful sanity check in an exam: a parallel total that comes out larger than the smallest
              branch resistance is always wrong.
            </p>
          </>
        ),
      }}
    />
  );
}
