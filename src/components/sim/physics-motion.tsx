'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Slider } from '@/components/ui';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { sigFig } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Projectile motion                                                          */
/* -------------------------------------------------------------------------- */

type Shot = { speed: number; angle: number; gravity: number; vx: number; vy: number; flightTime: number; range: number; maxHeight: number };

function shot(speed: number, angle: number, gravity: number): Shot {
  const radians = (angle * Math.PI) / 180;
  const vx = speed * Math.cos(radians);
  const vy = speed * Math.sin(radians);
  const flightTime = (2 * vy) / gravity;
  return { speed, angle, gravity, vx, vy, flightTime, range: vx * flightTime, maxHeight: (vy * vy) / (2 * gravity) };
}

/** A tidy tick step (1, 2 or 5 × 10ⁿ) giving about five ticks across `span`. */
function niceStep(span: number) {
  const raw = span / 5;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / pow;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * pow;
}

export function ProjectileMotion() {
  const [speed, setSpeed] = useState(22);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const [trails, setTrails] = useState<Shot[]>([]);
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const current = shot(speed, angle, gravity);
  const { vx, vy, flightTime, range, maxHeight } = current;
  // Long flights (the Moon) play faster so a launch never takes half a minute.
  const playback = Math.max(1, flightTime / 4);

  useEffect(() => {
    setT(0);
    setRunning(false);
  }, [speed, angle, gravity]);

  useEffect(() => {
    if (!running) return;
    // Reduced motion: show the finished flight instead of doing nothing.
    if (reduced) {
      setT(flightTime);
      setRunning(false);
      return;
    }
    lastRef.current = performance.now();

    const tick = (now: number) => {
      const delta = ((now - lastRef.current) / 1000) * playback;
      lastRef.current = now;
      setT((value) => {
        const next = value + delta;
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
  }, [running, flightTime, reduced, playback]);

  const lastShotRef = useRef<Shot | null>(null);
  function launch() {
    // The previous launch becomes a faint ghost so 30° and 60°, or Earth and
    // the Moon, can be compared on the same axes. The current flight is never
    // its own ghost.
    const previous = lastShotRef.current;
    const same = (x: Shot, y: Shot) => x.speed === y.speed && x.angle === y.angle && x.gravity === y.gravity;
    if (previous && !same(previous, current)) {
      setTrails((list) => [...list.filter((s) => !same(s, previous)), previous].slice(-4));
    }
    lastShotRef.current = current;
    setT(0);
    setRunning(true);
  }

  // Fixed axes shared by the current flight and the kept trails, so a change
  // in speed, angle or gravity is visible as a change in size, not only in
  // the numbers.
  const width = 720;
  const height = 380;
  const left = 64;
  const bottom = 48;
  const top = 24;
  const right = 24;
  const all = [current, ...trails];
  const spanX = niceStep(Math.max(...all.map((s) => s.range), 1) * 1.08) * 5.5;
  const spanY = Math.max(...all.map((s) => s.maxHeight), 1) * 1.15;
  const scale = Math.min((width - left - right) / spanX, (height - top - bottom) / spanY);
  const step = niceStep(spanX);
  const toScreen = (x: number, y: number) => [left + x * scale, height - bottom - y * scale] as const;
  const path = (s: Shot) =>
    Array.from({ length: 61 }, (_, i) => {
      const time = (i / 60) * s.flightTime;
      const [sx, sy] = toScreen(s.vx * time, s.vy * time - 0.5 * s.gravity * time * time);
      return `${sx.toFixed(1)},${sy.toFixed(1)}`;
    }).join(' ');

  const y = Math.max(0, vy * t - 0.5 * gravity * t * t);
  const [ballX, ballY] = toScreen(vx * t, y);
  const vyNow = vy - gravity * t;
  // Velocity arrows ride on the ball: the horizontal one never changes, the
  // vertical one shrinks to zero at the top and then points down.
  const arrow = 2.2 * Math.min(1, 140 / (speed * 2.2));
  const travelled = Array.from({ length: 41 }, (_, i) => {
    const time = (i / 40) * t;
    const [sx, sy] = toScreen(vx * time, Math.max(0, vy * time - 0.5 * gravity * time * time));
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  }).join(' ');

  return (
    <SimShell
      title="Projectile motion"
      description="Horizontal and vertical motion are independent."
      stage={
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Projectile trajectory">
          <defs>
            <marker id="pm-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
            </marker>
          </defs>
          {/* distance ticks */}
          {Array.from({ length: Math.floor(spanX / step) + 1 }, (_, i) => i * step).map((d) => {
            const [x] = toScreen(d, 0);
            if (x > width - right) return null;
            return (
              <g key={d}>
                <line x1={x} x2={x} y1={top} y2={height - bottom} stroke="rgb(var(--border))" strokeOpacity={0.35} />
                <text x={x} y={height - bottom + 20} textAnchor="middle" fontSize={14} fill="rgb(var(--muted))">
                  {sigFig(d, 3)}
                </text>
              </g>
            );
          })}
          <text x={width - right} y={height - 6} textAnchor="end" fontSize={13} fill="rgb(var(--muted))">
            distance / m
          </text>
          <line x1={left} y1={height - bottom} x2={width - right} y2={height - bottom} stroke="rgb(var(--border))" strokeWidth={2} />

          {trails.filter((s) => !(s.speed === speed && s.angle === angle && s.gravity === gravity)).map((s, i) => (
            <g key={`${s.speed}-${s.angle}-${s.gravity}-${i}`} opacity={0.35}>
              <polyline points={path(s)} fill="none" stroke="rgb(var(--muted))" strokeWidth={2} strokeDasharray="3 6" />
              <text x={toScreen(s.range, 0)[0]} y={height - bottom - 8} textAnchor="end" fontSize={14} fill="rgb(var(--muted))">
                {`${s.angle}°, ${s.speed} m/s${s.gravity !== 9.8 ? `, g ${s.gravity}` : ''}`}
              </text>
            </g>
          ))}

          <polyline points={path(current)} fill="none" stroke="rgb(var(--physics))" strokeWidth={2} strokeDasharray="5 6" opacity={0.55} />
          {t > 0 && <polyline points={travelled} fill="none" stroke="rgb(var(--physics))" strokeWidth={3.5} strokeLinecap="round" />}

          {/* max height marker */}
          <line
            x1={toScreen(range / 2, 0)[0]}
            x2={toScreen(range / 2, 0)[0]}
            y1={height - bottom}
            y2={toScreen(0, maxHeight)[1]}
            stroke="rgb(var(--physics))"
            strokeOpacity={0.35}
            strokeDasharray="2 4"
          />
          <text x={toScreen(range / 2, 0)[0] + 6} y={toScreen(0, maxHeight)[1] - 8} fontSize={13} fill="rgb(var(--physics))">
            {`max height ${sigFig(maxHeight, 3)} m`}
          </text>

          <line x1={ballX} y1={ballY} x2={ballX + vx * arrow} y2={ballY} stroke="rgb(var(--positive))" strokeWidth={3} markerEnd="url(#pm-head)" />
          {Math.abs(vyNow) > 0.3 && (
            <line x1={ballX} y1={ballY} x2={ballX} y2={ballY - vyNow * arrow} stroke="rgb(var(--negative))" strokeWidth={3} markerEnd="url(#pm-head)" />
          )}
          <circle cx={ballX} cy={ballY} r={9} fill="rgb(var(--accent))" stroke="white" strokeWidth={2} />

          <g fontSize={14}>
            <text x={width - right} y={top + 14} textAnchor="end" fill="rgb(var(--positive))">
              {`horizontal v = ${sigFig(vx, 3)} m/s (constant)`}
            </text>
            <text x={width - right} y={top + 34} textAnchor="end" fill="rgb(var(--negative))">
              {`vertical v = ${sigFig(vyNow, 2)} m/s ${vyNow > 0.3 ? '↑' : vyNow < -0.3 ? '↓' : '(zero at the top)'}`}
            </text>
            {playback > 1.05 && (
              <text x={width - right} y={top + 54} textAnchor="end" fill="rgb(var(--muted))">
                {`playing ×${sigFig(playback, 2)} speed`}
              </text>
            )}
          </g>
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
          <Button variant="primary" size="sm" className="w-full" onClick={launch}>
            Launch
          </Button>
          {trails.length > 0 && (
            <Button variant="ghost" size="sm" className="w-full" onClick={() => {
                setTrails([]);
                lastShotRef.current = null;
              }}>
              Clear earlier flights
            </Button>
          )}
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
          'The green arrow on the ball is the horizontal velocity and the red one is the vertical velocity. Watch which of them changes during the flight. Earlier launches stay on the graph as faint dashed paths so you can compare them.',
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
            <text x={pivotX - leftDistance * pixelsPerMetre} y={pivotY - 14} textAnchor="middle" fontSize={14} fill="rgb(var(--physics))">
              {leftForce} N
            </text>
            {/* Right load */}
            <line x1={pivotX + rightDistance * pixelsPerMetre} y1={pivotY} x2={pivotX + rightDistance * pixelsPerMetre} y2={pivotY + 40} stroke="rgb(var(--chemistry))" strokeWidth={2} />
            <rect x={pivotX + rightDistance * pixelsPerMetre - 16} y={pivotY + 40} width={32} height={20 + rightForce * 0.7} rx={3} fill="rgb(var(--chemistry))" opacity={0.85} />
            <text x={pivotX + rightDistance * pixelsPerMetre} y={pivotY - 14} textAnchor="middle" fontSize={14} fill="rgb(var(--chemistry))">
              {rightForce} N
            </text>
          </g>

          <polygon
            points={`${pivotX},${pivotY + 8} ${pivotX - 22},${pivotY + 56} ${pivotX + 22},${pivotY + 56}`}
            fill="rgb(var(--muted))"
          />
          <text x={pivotX} y={pivotY + 76} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
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
