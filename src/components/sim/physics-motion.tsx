'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Slider } from '@/components/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { sigFig } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Projectile motion                                                          */
/* -------------------------------------------------------------------------- */

export function ProjectileMotion() {
  const [speed, setSpeed] = useState(22);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const radians = (angle * Math.PI) / 180;
  const vx = speed * Math.cos(radians);
  const vy = speed * Math.sin(radians);
  const flightTime = (2 * vy) / gravity;
  const range = vx * flightTime;
  const maxHeight = (vy * vy) / (2 * gravity);

  useEffect(() => {
    setT(0);
    setRunning(false);
  }, [speed, angle, gravity]);

  useEffect(() => {
    if (!running || reduced) return;
    lastRef.current = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setT((current) => {
        const next = current + delta;
        if (next >= flightTime) {
          setRunning(false);
          return flightTime;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [running, flightTime, reduced]);

  // World-to-screen mapping, scaled so the full trajectory always fits.
  const width = 640;
  const height = 320;
  const padding = 40;
  const scaleX = (width - padding * 2) / Math.max(range, 1);
  const scaleY = (height - padding * 2) / Math.max(maxHeight, 1);
  const scale = Math.min(scaleX, scaleY);
  const toScreen = (x: number, y: number) => [padding + x * scale, height - padding - y * scale];

  const pathPoints = Array.from({ length: 61 }, (_, i) => {
    const time = (i / 60) * flightTime;
    const [sx, sy] = toScreen(vx * time, vy * time - 0.5 * gravity * time * time);
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  }).join(' ');

  const [ballX, ballY] = toScreen(vx * t, Math.max(0, vy * t - 0.5 * gravity * t * t));

  return (
    <SimShell
      title="Projectile motion"
      description="Horizontal and vertical motion are independent."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Projectile trajectory">
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgb(var(--border))" strokeWidth={2} />
          <polyline points={pathPoints} fill="none" stroke="rgb(var(--physics))" strokeWidth={2} strokeDasharray="4 5" opacity={0.6} />
          {/* Velocity components at the launch point make the independence visible. */}
          <line x1={padding} y1={height - padding} x2={padding + vx * scale * 0.6} y2={height - padding} stroke="rgb(var(--positive))" strokeWidth={2.5} />
          <line x1={padding} y1={height - padding} x2={padding} y2={height - padding - vy * scale * 0.6} stroke="rgb(var(--negative))" strokeWidth={2.5} />
          <text x={padding + vx * scale * 0.3} y={height - padding + 16} fontSize={11} fill="rgb(var(--positive))">
            vₓ = {sigFig(vx, 2)} m/s
          </text>
          <text x={padding + 6} y={height - padding - vy * scale * 0.3} fontSize={11} fill="rgb(var(--negative))">
            v_y = {sigFig(vy, 2)} m/s
          </text>
          <circle cx={ballX} cy={ballY} r={8} fill="rgb(var(--accent))" />
        </svg>
      }
      controls={
        <>
          <Slider label="Launch speed" value={speed} min={5} max={45} step={1} unit="m/s" onChange={setSpeed} />
          <Slider label="Launch angle" value={angle} min={5} max={85} step={1} unit="°" onChange={setAngle} />
          <Slider
            label="Gravitational field strength"
            value={gravity}
            min={1.6}
            max={25}
            step={0.1}
            unit="N/kg"
            onChange={setGravity}
            format={(v) => v.toFixed(1)}
          />
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => {
              setT(0);
              setRunning(true);
            }}
          >
            Launch
          </Button>
          <p className="text-xs text-ink-faint">
            The Moon is about 1.6 N/kg, Earth 9.8, Jupiter about 25.
          </p>
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="Range" value={sigFig(range, 3)} unit="m" tone="physics" />
          <Readout label="Max height" value={sigFig(maxHeight, 3)} unit="m" tone="physics" />
          <Readout label="Time of flight" value={sigFig(flightTime, 3)} unit="s" />
          <Readout label="Time now" value={t.toFixed(2)} unit="s" tone="positive" />
        </div>
      }
      content={{
        observe:
          'The green arrow is the horizontal velocity and the red one is the vertical velocity. Watch which of them changes during the flight.',
        variables: 'Launch speed, launch angle and gravitational field strength.',
        predict: {
          question: 'Which launch angle gives the greatest range, with speed and gravity unchanged?',
          options: ['30°', '45°', '60°', 'It does not depend on angle'],
          answerIndex: 1,
          why: 'Ignoring air resistance, 45° gives the maximum range, because it balances a large horizontal velocity against a long flight time.',
        },
        experiment: [
          'Set the angle to 30° and note the range, then try 60°. Compare the two.',
          'Sweep the angle from 5° to 85° and find where the range peaks.',
          'Drop gravity to 1.6 N/kg (the Moon) and see what happens to the flight time.',
        ],
        explain: (
          <>
            <p>
              The horizontal and vertical motions are <strong>independent</strong>. Horizontally there
              is no force, so the horizontal velocity never changes. Vertically, gravity produces a
              constant downward acceleration, so the vertical velocity falls to zero at the top and then
              reverses.
            </p>
            <p>
              That is why 30° and 60° give the <em>same</em> range: one trades flight time for horizontal
              speed exactly as much as the other gains it. 45° is the balance point.
            </p>
            <p>
              This model ignores air resistance. In reality drag reduces both the range and the optimum
              angle.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Moments and balance                                                        */
/* -------------------------------------------------------------------------- */

export function MomentsBalance() {
  const [leftForce, setLeftForce] = useState(20);
  const [leftDistance, setLeftDistance] = useState(0.3);
  const [rightForce, setRightForce] = useState(12);
  const [rightDistance, setRightDistance] = useState(0.5);

  const anticlockwise = leftForce * leftDistance;
  const clockwise = rightForce * rightDistance;
  const difference = clockwise - anticlockwise;
  const balanced = Math.abs(difference) < 0.05;
  // Tilt saturates so an extreme imbalance still looks like a beam.
  const tilt = Math.max(-14, Math.min(14, difference * 6));

  const width = 640;
  const height = 300;
  const pivotX = width / 2;
  const pivotY = 170;
  const pixelsPerMetre = 220;

  return (
    <SimShell
      title="Moments and balance"
      description="Moment = force × perpendicular distance from the pivot."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Balanced beam">
          <g transform={`rotate(${tilt} ${pivotX} ${pivotY})`}>
            <rect x={pivotX - 260} y={pivotY - 6} width={520} height={12} rx={3} fill="rgb(var(--surface-2))" stroke="rgb(var(--border))" />
            {/* Left load */}
            <line x1={pivotX - leftDistance * pixelsPerMetre} y1={pivotY} x2={pivotX - leftDistance * pixelsPerMetre} y2={pivotY + 40} stroke="rgb(var(--physics))" strokeWidth={2} />
            <rect x={pivotX - leftDistance * pixelsPerMetre - 16} y={pivotY + 40} width={32} height={20 + leftForce * 0.7} rx={3} fill="rgb(var(--physics))" opacity={0.85} />
            <text x={pivotX - leftDistance * pixelsPerMetre} y={pivotY - 14} textAnchor="middle" fontSize={12} fill="rgb(var(--physics))">
              {leftForce} N
            </text>
            {/* Right load */}
            <line x1={pivotX + rightDistance * pixelsPerMetre} y1={pivotY} x2={pivotX + rightDistance * pixelsPerMetre} y2={pivotY + 40} stroke="rgb(var(--chemistry))" strokeWidth={2} />
            <rect x={pivotX + rightDistance * pixelsPerMetre - 16} y={pivotY + 40} width={32} height={20 + rightForce * 0.7} rx={3} fill="rgb(var(--chemistry))" opacity={0.85} />
            <text x={pivotX + rightDistance * pixelsPerMetre} y={pivotY - 14} textAnchor="middle" fontSize={12} fill="rgb(var(--chemistry))">
              {rightForce} N
            </text>
          </g>

          <polygon
            points={`${pivotX},${pivotY + 8} ${pivotX - 22},${pivotY + 56} ${pivotX + 22},${pivotY + 56}`}
            fill="rgb(var(--muted))"
          />
          <text x={pivotX} y={pivotY + 76} textAnchor="middle" fontSize={11} fill="rgb(var(--muted))">
            pivot
          </text>
          <text
            x={pivotX}
            y={40}
            textAnchor="middle"
            fontSize={15}
            fontWeight="600"
            fill={balanced ? 'rgb(var(--positive))' : 'rgb(var(--caution))'}
          >
            {balanced ? 'Balanced' : difference > 0 ? 'Tips clockwise →' : '← Tips anticlockwise'}
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Left force" value={leftForce} min={1} max={50} unit="N" onChange={setLeftForce} />
          <Slider
            label="Left distance"
            value={leftDistance}
            min={0.05}
            max={1}
            step={0.05}
            unit="m"
            onChange={setLeftDistance}
            format={(v) => v.toFixed(2)}
          />
          <div className="h-px bg-line" />
          <Slider label="Right force" value={rightForce} min={1} max={50} unit="N" onChange={setRightForce} />
          <Slider
            label="Right distance"
            value={rightDistance}
            min={0.05}
            max={1}
            step={0.05}
            unit="m"
            onChange={setRightDistance}
            format={(v) => v.toFixed(2)}
          />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Anticlockwise moment" value={anticlockwise.toFixed(2)} unit="N m" tone="physics" />
          <Readout label="Clockwise moment" value={clockwise.toFixed(2)} unit="N m" tone="chemistry" />
          <Readout
            label="Difference"
            value={Math.abs(difference).toFixed(2)}
            unit="N m"
            tone={balanced ? 'positive' : 'negative'}
          />
        </div>
      }
      content={{
        observe:
          'Both moments are calculated live. The beam tips towards whichever moment is larger, and sits level when they are equal.',
        variables: 'The force on each side, and how far each one sits from the pivot.',
        predict: {
          question: 'A 20 N weight sits 0.30 m to the left. Where must a 12 N weight go on the right to balance it?',
          options: ['0.18 m', '0.30 m', '0.50 m', '0.72 m'],
          answerIndex: 2,
          why: 'Setting 20 × 0.30 = 12 × d gives 6.0 = 12d, so d = 0.50 m. Set the sliders to check.',
        },
        experiment: [
          'Set the left side to 20 N at 0.30 m, then find the right distance that balances 12 N.',
          'Halve one force and see what has to happen to its distance.',
          'Try to balance a large force close to the pivot against a small force far away.',
        ],
        explain: (
          <>
            <p>
              The <strong>moment</strong> of a force is force × perpendicular distance from the pivot,
              measured in N m. A small force a long way out can balance a large force close in — which is
              why a long spanner works better than a short one.
            </p>
            <p>
              For a body in equilibrium two conditions hold at once: the resultant force is zero, and the{' '}
              <strong>sum of the clockwise moments equals the sum of the anticlockwise moments</strong>{' '}
              about any point. That second statement is the principle of moments.
            </p>
            <p>
              In exam questions with a uniform rule, remember its own weight acts at the centre — that
              hidden moment catches people out whenever the pivot is not at the middle.
            </p>
          </>
        ),
      }}
    />
  );
}
