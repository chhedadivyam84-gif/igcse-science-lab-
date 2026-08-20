'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Osmosis — potato cylinders in sucrose                                      */
/* -------------------------------------------------------------------------- */

/**
 * The standard practical, made reversible.
 *
 * The point students miss is that nothing about the potato changes — what
 * changes is which side has the higher water concentration. So the external
 * concentration is the only control, and the arrows and the mass change are
 * both derived from the comparison with the cell contents.
 */
export function OsmosisLab() {
  const [external, setExternal] = useState(0.0);
  const CELL = 0.35; // Sucrose concentration inside the potato cells, mol/dm³.

  // Water moves towards the lower water concentration, i.e. the higher sucrose
  // concentration. A simple linear model is enough to make the direction and
  // the turning point visible, which is what the practical teaches.
  const difference = CELL - external;
  const massChange = Math.max(-25, Math.min(25, difference * 60));
  const state = massChange > 1.5 ? 'turgid' : massChange < -1.5 ? 'flaccid' : 'no net change';
  const direction = massChange > 1.5 ? 'in' : massChange < -1.5 ? 'out' : 'balanced';

  // The cylinder is drawn from the mass change so the visual and the number
  // can never disagree.
  const scale = 1 + massChange / 100;
  const w = 54 * scale;
  const h = 150 * scale;

  return (
    <SimShell
      title="Osmosis in potato cylinders"
      description="Water moves through a partially permeable membrane towards the lower water concentration."
      stage={
        <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-label="Potato cylinder in sucrose solution">
          {/* Beaker */}
          <path d="M120 40 L120 230 Q120 240 130 240 L350 240 Q360 240 360 230 L360 40" fill="none" stroke="rgb(var(--border))" strokeWidth={2.5} />
          <rect x={122} y={70} width={236} height={168} fill="rgb(var(--biology))" opacity={0.08 + external * 0.22} />
          <line x1={122} y1={70} x2={358} y2={70} stroke="rgb(var(--biology))" strokeWidth={1.5} opacity={0.5} />

          {/* Potato cylinder, sized by the mass change */}
          <rect
            x={240 - w / 2}
            y={150 - h / 2}
            width={w}
            height={h}
            rx={6}
            fill="rgb(var(--caution))"
            opacity={0.75}
            stroke="rgb(var(--caution))"
            strokeWidth={2}
          />

          {/* Water direction */}
          {direction !== 'balanced' &&
            [0, 1, 2].map((i) => {
              const y = 110 + i * 40;
              const inward = direction === 'in';
              const x1 = inward ? 180 : 240 - w / 2 - 6;
              const x2 = inward ? 240 - w / 2 - 6 : 180;
              return (
                <g key={i}>
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgb(var(--accent))" strokeWidth={2} />
                  <polygon
                    points={`${x2},${y} ${x2 + (inward ? -7 : 7)},${y - 4} ${x2 + (inward ? -7 : 7)},${y + 4}`}
                    fill="rgb(var(--accent))"
                  />
                </g>
              );
            })}

          <text x={240} y={30} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
            sucrose solution — {external.toFixed(2)} mol/dm³
          </text>
          <text x={240} y={256} textAnchor="middle" fontSize={11} fill="rgb(var(--faint))">
            inside the cells ≈ {CELL.toFixed(2)} mol/dm³
          </text>
        </svg>
      }
      controls={
        <Slider
          label="External sucrose concentration"
          value={external}
          min={0}
          max={0.8}
          step={0.01}
          unit="mol/dm³"
          onChange={setExternal}
          format={(v) => v.toFixed(2)}
        />
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Change in mass" value={`${massChange > 0 ? '+' : ''}${massChange.toFixed(1)}`} unit="%" tone={massChange >= 0 ? 'positive' : 'negative'} />
          <Readout label="Net water movement" value={direction === 'in' ? 'into cells' : direction === 'out' ? 'out of cells' : 'none'} />
          <Readout label="Cell state" value={state} />
        </div>
      }
      content={{
        observe:
          'The cylinder swells in dilute solutions and shrinks in concentrated ones. Somewhere between the two it does not change at all.',
        variables: 'The concentration of the sucrose solution outside the cylinder.',
        predict: {
          question: 'At which external concentration will the cylinder show no change in mass?',
          options: ['0.00 mol/dm³', 'About 0.35 mol/dm³', '0.80 mol/dm³', 'It always gains mass'],
          answerIndex: 1,
          why: 'No net movement happens when the water concentration is the same on both sides — that is, when the external solution matches the concentration inside the cells, about 0.35 mol/dm³. This is exactly how the practical is used to estimate the internal concentration.',
        },
        experiment: [
          'Set the external concentration to 0.00 and note the direction of the arrows and the change in mass.',
          'Raise the concentration slowly and watch the mass change fall towards zero.',
          'Find the concentration at which the mass change is zero, and read it off.',
          'Go past that point and confirm the arrows reverse and the cylinder becomes flaccid.',
        ],
        explain: (
          <>
            <p>
              Osmosis is the net movement of water molecules from a region of higher water
              concentration to a region of lower water concentration, through a partially permeable
              membrane. The membrane lets water through but not sucrose.
            </p>
            <p>
              In dilute solution the water concentration outside is higher, so water enters, the
              vacuole swells and the cell becomes <strong>turgid</strong>. In concentrated solution the
              water concentration outside is lower, water leaves, and the cell becomes{' '}
              <strong>flaccid</strong>. If water keeps leaving, the membrane pulls away from the cell
              wall and the cell is plasmolysed.
            </p>
            <p>
              The point of zero change is the useful one: it tells you the concentration inside the
              cells without ever measuring it directly.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Enzyme activity                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Temperature and pH against rate, with the asymmetry that matters: the fall
 * above the optimum is denaturation and is permanent, while the fall below it
 * is only slow molecules and is not.
 */
export function EnzymeLab() {
  const [temperature, setTemperature] = useState(37);
  const [ph, setPh] = useState(7);
  const [enzyme, setEnzyme] = useState<'amylase' | 'pepsin'>('amylase');

  const optimumPh = enzyme === 'pepsin' ? 2 : 7;
  const denatured = temperature > 50;

  // Below the optimum, rate rises with kinetic energy. Above it, the enzyme
  // denatures and the rate collapses — a different mechanism, so a different curve.
  const tempFactor = denatured
    ? Math.max(0, 1 - (temperature - 50) / 12)
    : Math.exp(-Math.pow((temperature - 37) / 18, 2));
  const phFactor = Math.exp(-Math.pow((ph - optimumPh) / 2.2, 2));
  const rate = Math.max(0, tempFactor * phFactor * 100);

  // The active site is drawn open at high rate and distorted once denatured.
  const distortion = denatured ? Math.min(1, (temperature - 50) / 15) : 0;

  return (
    <SimShell
      title="Enzyme activity"
      description="Rate against temperature and pH — and what denaturing actually does."
      stage={
        <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-label="Enzyme active site and rate curve">
          {/* Active site: a notch whose shape distorts as the enzyme denatures */}
          <g transform="translate(60, 60)">
            <path
              d={`M0 90 L0 20 Q0 0 20 0 L${50 + distortion * 22} 0 Q${62 + distortion * 30} ${18 + distortion * 26} ${86 - distortion * 24} ${2 + distortion * 30} L120 0 Q140 0 140 20 L140 90 Z`}
              fill="rgb(var(--biology))"
              opacity={0.75}
            />
            <text x={70} y={110} textAnchor="middle" fontSize={11} fill="rgb(var(--faint))">
              {denatured ? 'active site distorted' : 'active site'}
            </text>
            {/* Substrate sits in the notch only while the shape is complementary */}
            {!denatured && (
              <path d="M50 0 Q62 18 86 2 L86 -22 Q66 -6 50 -22 Z" fill="rgb(var(--accent))" opacity={0.85} />
            )}
          </g>

          {/* Rate bar */}
          <g transform="translate(260, 40)">
            <rect x={0} y={0} width={150} height={160} rx={8} fill="rgb(var(--surface-2))" />
            <rect
              x={0}
              y={160 - (rate / 100) * 160}
              width={150}
              height={(rate / 100) * 160}
              rx={8}
              fill={denatured ? 'rgb(var(--negative))' : 'rgb(var(--positive))'}
              opacity={0.8}
            />
            <text x={75} y={182} textAnchor="middle" fontSize={11} fill="rgb(var(--faint))">
              relative rate of reaction
            </text>
          </g>
        </svg>
      }
      controls={
        <>
          <div>
            <p className="mb-1.5 text-sm text-ink-muted">Enzyme</p>
            <div className="flex gap-1.5">
              {(['amylase', 'pepsin'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setEnzyme(option)}
                  className={cn(
                    'flex-1 rounded-lg border px-2.5 py-1.5 text-xs capitalize transition-colors',
                    enzyme === option
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-line text-ink-muted hover:border-accent/40',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-ink-faint">
              {enzyme === 'pepsin'
                ? 'Works in the stomach — optimum pH 2.'
                : 'Works in the mouth and small intestine — optimum pH 7.'}
            </p>
          </div>
          <Slider label="Temperature" value={temperature} min={0} max={80} step={1} unit="°C" onChange={setTemperature} />
          <Slider label="pH" value={ph} min={1} max={14} step={0.5} unit="" onChange={setPh} format={(v) => v.toFixed(1)} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Relative rate" value={rate.toFixed(0)} unit="%" tone={denatured ? 'negative' : 'positive'} />
          <Readout label="Optimum pH" value={optimumPh} />
          <Readout label="Enzyme state" value={denatured ? 'denatured' : 'active'} tone={denatured ? 'negative' : 'positive'} />
        </div>
      }
      content={{
        observe:
          'The rate peaks at one temperature and one pH. Past about 50 °C it does not just slow down — it collapses, and the active site visibly changes shape.',
        variables: 'Temperature, pH, and which enzyme you are testing.',
        predict: {
          question: 'An enzyme is heated to 70 °C and then cooled back to 37 °C. What happens to the rate?',
          options: [
            'It returns to its original value',
            'It stays near zero, because denaturing is permanent',
            'It becomes higher than before',
            'It halves',
          ],
          answerIndex: 1,
          why: 'Denaturing breaks the bonds holding the enzyme in shape, so the active site no longer fits the substrate. Cooling does not put those bonds back. This is why "the enzyme was killed" scores no marks — enzymes are not alive, and the examinable point is the permanent change of shape.',
        },
        experiment: [
          'Set pH to the optimum, then raise the temperature slowly from 0 °C and watch the rate rise.',
          'Note the temperature at which the rate peaks.',
          'Keep going past 50 °C and watch the active site distort as the rate falls away.',
          'Switch to pepsin and find its optimum pH — then explain why it differs from amylase.',
        ],
        explain: (
          <>
            <p>
              Below the optimum, raising the temperature gives the molecules more kinetic energy, so
              enzyme and substrate collide more often and the rate rises. That is an ordinary rate
              effect and it is fully reversible.
            </p>
            <p>
              Above the optimum, something different happens. The bonds holding the enzyme in its
              three-dimensional shape break, the <strong>active site changes shape</strong>, and the
              substrate no longer fits. The enzyme is <strong>denatured</strong>, and cooling it down
              does not restore it.
            </p>
            <p>
              pH works the same way: far from the optimum the active site is distorted and no
              enzyme–substrate complexes form. Pepsin&apos;s optimum of pH 2 matches the stomach it
              works in — enzymes are adapted to where they are found.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Photosynthesis — limiting factors                                          */
/* -------------------------------------------------------------------------- */

/**
 * Built specifically around the question that recurs: reading a rate-against-
 * light-intensity graph and saying what is limiting on the plateau. Here the
 * plateau height is set by whichever *other* factor you left low, so the answer
 * is something the student can see rather than memorise.
 */
export function PhotosynthesisLab() {
  const [light, setLight] = useState(40);
  const [co2, setCo2] = useState(60);
  const [temperature, setTemperature] = useState(25);

  // Each factor caps the rate independently; the actual rate is the smallest cap.
  const lightCap = light;
  const co2Cap = co2;
  const tempCap = temperature <= 40 ? temperature * 2.5 : Math.max(0, 100 - (temperature - 40) * 8);
  const rate = Math.max(0, Math.min(lightCap, co2Cap, tempCap));

  const limiting =
    rate === 0
      ? 'none — no photosynthesis'
      : lightCap <= co2Cap && lightCap <= tempCap
        ? 'light intensity'
        : co2Cap <= tempCap
          ? 'carbon dioxide'
          : 'temperature';

  // Rate against light intensity at the current CO2 and temperature: the curve
  // rises then flattens exactly where another factor takes over.
  const curve = Array.from({ length: 51 }, (_, i) => {
    const l = i * 2;
    const r = Math.max(0, Math.min(l, co2Cap, tempCap));
    return `${40 + (l / 100) * 400},${210 - (r / 100) * 170}`;
  }).join(' ');

  return (
    <SimShell
      title="Photosynthesis: limiting factors"
      description="The rate is set by whichever factor is in shortest supply — not by all of them together."
      stage={
        <svg viewBox="0 0 480 250" className="h-auto w-full" role="img" aria-label="Rate of photosynthesis against light intensity">
          <line x1={40} y1={210} x2={445} y2={210} stroke="rgb(var(--border))" strokeWidth={2} />
          <line x1={40} y1={30} x2={40} y2={210} stroke="rgb(var(--border))" strokeWidth={2} />
          <polyline points={curve} fill="none" stroke="rgb(var(--biology))" strokeWidth={2.5} />

          {/* Where the student currently is on the curve */}
          <circle cx={40 + (light / 100) * 400} cy={210 - (rate / 100) * 170} r={6} fill="rgb(var(--accent))" />
          <line
            x1={40 + (light / 100) * 400}
            y1={210}
            x2={40 + (light / 100) * 400}
            y2={210 - (rate / 100) * 170}
            stroke="rgb(var(--accent))"
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.6}
          />

          <text x={242} y={238} textAnchor="middle" fontSize={11} fill="rgb(var(--faint))">
            light intensity →
          </text>
          <text x={14} y={120} fontSize={11} fill="rgb(var(--faint))" transform="rotate(-90 14 120)">
            rate →
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Light intensity" value={light} min={0} max={100} step={1} unit="%" onChange={setLight} />
          <Slider label="Carbon dioxide" value={co2} min={0} max={100} step={1} unit="%" onChange={setCo2} />
          <Slider label="Temperature" value={temperature} min={0} max={55} step={1} unit="°C" onChange={setTemperature} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Relative rate" value={rate.toFixed(0)} unit="%" tone="positive" />
          <Readout label="Limiting factor" value={limiting} tone="accent" />
          <Readout label="On the graph" value={rate >= lightCap - 0.5 ? 'rising part' : 'plateau'} />
        </div>
      }
      content={{
        observe:
          'Raising the light intensity increases the rate — until it suddenly stops making any difference and the curve goes flat.',
        variables: 'Light intensity, carbon dioxide concentration and temperature.',
        predict: {
          question:
            'The curve has flattened. You increase the light intensity further. What happens to the rate?',
          options: [
            'It increases, because light drives photosynthesis',
            'Nothing, because something else is now limiting',
            'It decreases',
            'It doubles',
          ],
          answerIndex: 1,
          why: 'On the plateau, light is no longer the factor in shortest supply. Adding more of a factor that is already in excess changes nothing. Raise the carbon dioxide or the temperature instead and watch the plateau lift.',
        },
        experiment: [
          'Set carbon dioxide to 30% and drag the light intensity from 0 to 100. Note where the curve flattens.',
          'With the light high, raise the carbon dioxide and watch the plateau lift.',
          'Set the temperature to 50 °C and explain why the rate falls even with plenty of light and carbon dioxide.',
          'Find a combination where temperature is the limiting factor and check the readout agrees with you.',
        ],
        explain: (
          <>
            <p>
              A limiting factor is whichever requirement is in shortest supply. It alone sets the
              rate, so increasing anything else has no effect at all until the limiting factor is
              raised.
            </p>
            <p>
              On the rising part of the graph, light is limiting — more light, more photosynthesis.
              On the plateau, light is in excess and something else has taken over, usually carbon
              dioxide concentration or temperature. That is why an examiner asking &ldquo;what is
              limiting here?&rdquo; never accepts &ldquo;light&rdquo; as the answer for the flat part.
            </p>
            <p>
              Temperature behaves differently from the other two at the top end: past about 40 °C the
              enzymes controlling photosynthesis denature, so the rate falls rather than levelling
              off.
            </p>
          </>
        ),
      }}
    />
  );
}
