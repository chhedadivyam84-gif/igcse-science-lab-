'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Select, Slider } from '@/components/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { sigFig } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Wave machine                                                               */
/* -------------------------------------------------------------------------- */

export function WaveMachine() {
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(50);
  const [speed, setSpeed] = useState(200);
  const [kind, setKind] = useState<'transverse' | 'longitudinal'>('transverse');
  const [time, setTime] = useState(0);
  const reduced = usePrefersReducedMotion();

  const wavelength = speed / frequency;

  useEffect(() => {
    if (reduced) return;
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setTime((t) => t + delta);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const width = 640;
  const height = 300;
  // 1 metre maps to 1.6 px so a 200 m/s wave fits on screen.
  const pxPerMetre = 1.6;
  const wavelengthPx = wavelength * pxPerMetre;

  const points = Array.from({ length: 161 }, (_, i) => {
    const x = (i / 160) * width;
    const phase = (x / wavelengthPx - frequency * time) * Math.PI * 2;
    const y = 150 - Math.sin(phase) * amplitude;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const particles = Array.from({ length: 44 }, (_, i) => {
    const rest = (i / 43) * width;
    const phase = (rest / wavelengthPx - frequency * time) * Math.PI * 2;
    return rest + Math.sin(phase) * (amplitude * 0.28);
  });

  return (
    <SimShell
      title="Wave machine"
      description="v = f λ, shown live."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Wave display">
          {kind === 'transverse' ? (
            <>
              <line x1={0} y1={150} x2={width} y2={150} stroke="rgb(var(--border))" strokeWidth={1} strokeDasharray="4 5" />
              <polyline points={points} fill="none" stroke="rgb(var(--physics))" strokeWidth={3} strokeLinecap="round" />
              <line x1={20} y1={150} x2={20} y2={150 - amplitude} stroke="rgb(var(--positive))" strokeWidth={2} />
              <text x={26} y={150 - amplitude / 2} fontSize={11} fill="rgb(var(--positive))">
                amplitude
              </text>
              <line x1={80} y1={62} x2={80 + wavelengthPx} y2={62} stroke="rgb(var(--accent))" strokeWidth={2} />
              <text x={80 + wavelengthPx / 2} y={54} textAnchor="middle" fontSize={11} fill="rgb(var(--accent))">
                λ = {sigFig(wavelength, 3)} m
              </text>
            </>
          ) : (
            <>
              {particles.map((x, index) => (
                <circle key={index} cx={x} cy={150} r={5} fill="rgb(var(--chemistry))" opacity={0.85} />
              ))}
              <text x={width / 2} y={230} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
                compressions (bunched) and rarefactions (spread out)
              </text>
            </>
          )}
          <text x={width / 2} y={276} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
            energy travels to the right — the particles do not
          </text>
        </svg>
      }
      controls={
        <>
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="wave-kind">
              Wave type
            </label>
            <Select id="wave-kind" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
              <option value="transverse">Transverse (light, water)</option>
              <option value="longitudinal">Longitudinal (sound)</option>
            </Select>
          </div>
          <Slider label="Frequency" value={frequency} min={0.5} max={8} step={0.1} unit="Hz" onChange={setFrequency} format={(v) => v.toFixed(1)} />
          <Slider label="Amplitude" value={amplitude} min={10} max={90} unit="px" onChange={setAmplitude} />
          <Slider label="Wave speed" value={speed} min={50} max={500} step={10} unit="m/s" onChange={setSpeed} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Speed" value={speed} unit="m/s" tone="physics" />
          <Readout label="Frequency" value={frequency.toFixed(1)} unit="Hz" tone="accent" />
          <Readout label="Wavelength" value={sigFig(wavelength, 3)} unit="m" tone="positive" />
          <Readout label="Time period" value={sigFig(1 / frequency, 3)} unit="s" />
        </div>
      }
      content={{
        observe:
          'Change one control at a time and watch which of the three readouts move together. Amplitude is the only one that never affects the others.',
        variables: 'Wave type, frequency, amplitude and wave speed.',
        predict: {
          question: 'If the frequency doubles while the wave speed stays the same, what happens to the wavelength?',
          options: ['It doubles', 'It halves', 'It stays the same', 'It quadruples'],
          answerIndex: 1,
          why: 'v = fλ. With v fixed, f and λ are inversely proportional — doubling one halves the other.',
        },
        experiment: [
          'Fix the speed at 200 m/s and double the frequency. Read the new wavelength.',
          'Change only the amplitude. Confirm the wavelength readout does not move.',
          'Switch to longitudinal and find the compressions — the regions where the dots bunch up.',
        ],
        explain: (
          <>
            <p>
              A wave transfers <strong>energy</strong> without transferring matter. In a transverse wave
              the oscillations are perpendicular to the direction of energy transfer; in a longitudinal
              wave they are parallel, giving compressions and rarefactions.
            </p>
            <p>
              The three quantities are locked together by <code className="formula">v = f λ</code>.
              Amplitude is independent — it sets how much energy the wave carries, not how fast or how
              long it is.
            </p>
            <p>
              This is also why refraction works the way it does: the frequency is fixed by the source, so
              when the speed changes at a boundary the wavelength has to change with it.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Refraction and total internal reflection                                   */
/* -------------------------------------------------------------------------- */

export function RayOptics() {
  const [angle, setAngle] = useState(35);
  const [refractiveIndex, setRefractiveIndex] = useState(1.5);
  const [direction, setDirection] = useState<'into' | 'out-of'>('into');

  const criticalAngle = (Math.asin(1 / refractiveIndex) * 180) / Math.PI;
  const incidentRad = (angle * Math.PI) / 180;

  // Snell's law, in whichever direction light is crossing the boundary.
  const sinRefracted = direction === 'into' ? Math.sin(incidentRad) / refractiveIndex : Math.sin(incidentRad) * refractiveIndex;
  const totalInternal = direction === 'out-of' && sinRefracted > 1;
  const refractedAngle = totalInternal ? null : (Math.asin(Math.min(1, sinRefracted)) * 180) / Math.PI;

  const width = 640;
  const height = 320;
  const boundaryY = 160;
  const originX = width / 2;
  const rayLength = 150;

  const incidentStart = [
    originX - Math.sin(incidentRad) * rayLength,
    direction === 'into' ? boundaryY - Math.cos(incidentRad) * rayLength : boundaryY + Math.cos(incidentRad) * rayLength,
  ];

  const refractedRad = refractedAngle !== null ? (refractedAngle * Math.PI) / 180 : 0;
  const refractedEnd = [
    originX + Math.sin(refractedRad) * rayLength,
    direction === 'into' ? boundaryY + Math.cos(refractedRad) * rayLength : boundaryY - Math.cos(refractedRad) * rayLength,
  ];
  const reflectedEnd = [
    originX + Math.sin(incidentRad) * rayLength,
    direction === 'into' ? boundaryY - Math.cos(incidentRad) * rayLength : boundaryY + Math.cos(incidentRad) * rayLength,
  ];

  return (
    <SimShell
      title="Refraction and total internal reflection"
      description="Find the critical angle for yourself."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Ray diagram">
          <rect x={0} y={boundaryY} width={width} height={height - boundaryY} fill="rgb(var(--physics))" fillOpacity={0.09} />
          <line x1={0} y1={boundaryY} x2={width} y2={boundaryY} stroke="rgb(var(--border))" strokeWidth={2} />
          <line x1={originX} y1={20} x2={originX} y2={height - 20} stroke="rgb(var(--muted))" strokeWidth={1.5} strokeDasharray="6 5" />
          <text x={originX + 8} y={34} fontSize={11} fill="rgb(var(--muted))">
            normal
          </text>
          <text x={16} y={boundaryY - 12} fontSize={12} fill="rgb(var(--muted))">
            air (n = 1.00)
          </text>
          <text x={16} y={boundaryY + 24} fontSize={12} fill="rgb(var(--muted))">
            glass (n = {refractiveIndex.toFixed(2)})
          </text>

          <line x1={incidentStart[0]} y1={incidentStart[1]} x2={originX} y2={boundaryY} stroke="rgb(var(--physics))" strokeWidth={3} />
          {totalInternal ? (
            <line x1={originX} y1={boundaryY} x2={reflectedEnd[0]} y2={reflectedEnd[1]} stroke="rgb(var(--negative))" strokeWidth={3} />
          ) : (
            <>
              <line x1={originX} y1={boundaryY} x2={refractedEnd[0]} y2={refractedEnd[1]} stroke="rgb(var(--accent))" strokeWidth={3} />
              <line x1={originX} y1={boundaryY} x2={reflectedEnd[0]} y2={reflectedEnd[1]} stroke="rgb(var(--muted))" strokeWidth={1.5} opacity={0.55} />
            </>
          )}

          <text x={originX - 40} y={direction === 'into' ? boundaryY - 30 : boundaryY + 40} fontSize={12} fill="rgb(var(--physics))">
            i = {angle}°
          </text>
          {refractedAngle !== null && (
            <text x={originX + 16} y={direction === 'into' ? boundaryY + 46 : boundaryY - 30} fontSize={12} fill="rgb(var(--accent))">
              r = {refractedAngle.toFixed(1)}°
            </text>
          )}
          {totalInternal && (
            <text x={width / 2} y={height - 16} textAnchor="middle" fontSize={14} fontWeight="600" fill="rgb(var(--negative))">
              Total internal reflection — i &gt; critical angle
            </text>
          )}
        </svg>
      }
      controls={
        <>
          <div>
            <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="ray-direction">
              Light travels
            </label>
            <Select id="ray-direction" value={direction} onChange={(event) => setDirection(event.target.value as typeof direction)}>
              <option value="into">Air → glass (into the denser medium)</option>
              <option value="out-of">Glass → air (out of the denser medium)</option>
            </Select>
          </div>
          <Slider label="Angle of incidence" value={angle} min={0} max={85} unit="°" onChange={setAngle} />
          <Slider
            label="Refractive index of glass"
            value={refractiveIndex}
            min={1.1}
            max={2.4}
            step={0.01}
            onChange={setRefractiveIndex}
            format={(v) => v.toFixed(2)}
          />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Angle of incidence" value={angle} unit="°" tone="physics" />
          <Readout label="Angle of refraction" value={refractedAngle !== null ? refractedAngle.toFixed(1) : '—'} unit="°" tone="accent" />
          <Readout label="Critical angle" value={criticalAngle.toFixed(1)} unit="°" tone="negative" />
          <Readout label="sin i / sin r" value={refractedAngle ? sigFig(Math.sin(incidentRad) / Math.sin(refractedRad), 3) : '—'} />
        </div>
      }
      content={{
        observe:
          'Angles are measured from the dashed normal, never from the surface. Watch which way the ray bends in each direction.',
        variables: 'The direction of travel, the angle of incidence and the refractive index.',
        predict: {
          question: 'Going from glass into air, what happens once the angle of incidence exceeds the critical angle?',
          options: [
            'The ray refracts along the surface',
            'All the light reflects back into the glass',
            'The ray passes straight through',
            'The ray splits into colours',
          ],
          answerIndex: 1,
          why: 'Beyond the critical angle no refracted ray is possible, so all the light is reflected back inside — total internal reflection.',
        },
        experiment: [
          'Set the direction to air → glass and confirm the ray bends towards the normal.',
          'Switch to glass → air and raise the angle slowly until the refracted ray disappears. Compare that angle with the critical angle readout.',
          'Increase the refractive index and see what happens to the critical angle.',
        ],
        explain: (
          <>
            <p>
              Light slows down entering a denser medium, so it bends <strong>towards</strong> the normal.
              Leaving a denser medium it speeds up and bends <strong>away</strong> from the normal.
            </p>
            <p>
              <code className="formula">n = sin i / sin r</code>. The <strong>critical angle</strong> is
              the angle of incidence in the denser medium that gives an angle of refraction of exactly 90°.
              Past it, refraction is impossible and every ray is reflected — which is how optical fibres
              carry light around bends without losing it.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Radioactive decay and half-life                                            */
/* -------------------------------------------------------------------------- */

export function HalfLife() {
  const [halfLife, setHalfLife] = useState(10);
  const [background, setBackground] = useState(20);
  const [initial] = useState(800);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running || reduced) return;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setElapsed((current) => {
        const next = current + delta * 4;
        if (next >= halfLife * 5) {
          setRunning(false);
          return halfLife * 5;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [running, halfLife, reduced]);

  const activity = initial * 2 ** (-elapsed / halfLife);
  const measured = activity + background;
  const maxTime = halfLife * 5;

  const width = 640;
  const height = 300;
  const toX = (t: number) => 60 + (t / maxTime) * (width - 100);
  const toY = (count: number) => height - 50 - (count / (initial + background)) * (height - 90);

  const curve = Array.from({ length: 121 }, (_, i) => {
    const t = (i / 120) * maxTime;
    return `${toX(t).toFixed(1)},${toY(initial * 2 ** (-t / halfLife) + background).toFixed(1)}`;
  }).join(' ');

  return (
    <SimShell
      title="Radioactive decay and half-life"
      description="Read the half-life off a decay curve, background included."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Decay curve">
          <line x1={60} y1={20} x2={60} y2={height - 50} stroke="rgb(var(--border))" strokeWidth={2} />
          <line x1={60} y1={height - 50} x2={width - 40} y2={height - 50} stroke="rgb(var(--border))" strokeWidth={2} />
          <text x={54} y={30} textAnchor="end" fontSize={11} fill="rgb(var(--muted))">
            counts/min
          </text>
          <text x={width / 2} y={height - 22} textAnchor="middle" fontSize={11} fill="rgb(var(--muted))">
            time (minutes)
          </text>

          <line x1={60} y1={toY(background)} x2={width - 40} y2={toY(background)} stroke="rgb(var(--caution))" strokeWidth={1.5} strokeDasharray="5 4" />
          <text x={width - 44} y={toY(background) - 6} textAnchor="end" fontSize={11} fill="rgb(var(--caution))">
            background {background}
          </text>

          <polyline points={curve} fill="none" stroke="rgb(var(--physics))" strokeWidth={3} />

          {[1, 2, 3].map((n) => (
            <g key={n}>
              <line x1={toX(halfLife * n)} y1={toY(initial * 2 ** -n + background)} x2={toX(halfLife * n)} y2={height - 50} stroke="rgb(var(--muted))" strokeWidth={1} strokeDasharray="3 4" />
              <text x={toX(halfLife * n)} y={height - 34} textAnchor="middle" fontSize={10} fill="rgb(var(--muted))">
                {n}T½
              </text>
            </g>
          ))}

          <circle cx={toX(elapsed)} cy={toY(measured)} r={7} fill="rgb(var(--accent))" />
        </svg>
      }
      controls={
        <>
          <Slider label="Half-life" value={halfLife} min={2} max={30} unit="min" onChange={setHalfLife} />
          <Slider label="Background count rate" value={background} min={0} max={80} unit="cpm" onChange={setBackground} />
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => {
              setElapsed(0);
              setRunning(true);
            }}
          >
            Run decay
          </Button>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Time elapsed" value={elapsed.toFixed(1)} unit="min" />
          <Readout label="Measured count rate" value={Math.round(measured)} unit="cpm" tone="accent" />
          <Readout label="Source activity" value={Math.round(activity)} unit="cpm" tone="physics" />
          <Readout label="Half-lives passed" value={(elapsed / halfLife).toFixed(2)} tone="positive" />
        </div>
      }
      content={{
        observe:
          'The curve never reaches zero — it flattens onto the background line. That is why background must be subtracted before measuring a half-life.',
        variables: 'The half-life of the source and the background count rate.',
        predict: {
          question: 'A source has a count rate of 800 cpm and a half-life of 15 minutes. What is the count rate after 45 minutes, ignoring background?',
          options: ['400 cpm', '200 cpm', '100 cpm', '50 cpm'],
          answerIndex: 2,
          why: '45 minutes is three half-lives: 800 → 400 → 200 → 100 cpm.',
        },
        experiment: [
          'Set background to 0 and run the decay. Check the curve halves every half-life.',
          'Set background to 60 and run again. Notice the curve now flattens at 60, not 0.',
          'Work out the half-life from the graph with background included — remember to subtract it first.',
        ],
        explain: (
          <>
            <p>
              Radioactive decay is <strong>random</strong>: you cannot say which nucleus will decay next,
              only that a fixed <em>fraction</em> decays in a given time. That fixed fraction is what
              produces the exponential curve.
            </p>
            <p>
              The <strong>half-life</strong> is the time for half the undecayed nuclei to decay, or
              equivalently for the activity to halve. It is constant for a given isotope.
            </p>
            <p>
              In a real experiment the detector also picks up <strong>background radiation</strong>.
              Subtract the background count rate from every reading before halving, or your half-life will
              come out too long.
            </p>
          </>
        ),
      }}
    />
  );
}
