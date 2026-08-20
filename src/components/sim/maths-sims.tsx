'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Readout, SimShell } from './SimShell';

/* -------------------------------------------------------------------------- */
/* Quadratic explorer                                                         */
/* -------------------------------------------------------------------------- */

/**
 * y = ax² + bx + c with the discriminant made visible.
 *
 * The examinable idea students most often hold as a rule rather than a fact is
 * that b² − 4ac tells you the number of roots. Here the sign of the
 * discriminant and the number of times the curve meets the axis are the same
 * thing on screen, so the rule stops being arbitrary.
 */
export function QuadraticExplorer() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);

  const discriminant = b * b - 4 * a * c;
  const rootCount = discriminant > 0 ? 2 : discriminant === 0 ? 1 : 0;
  const roots =
    discriminant >= 0 && a !== 0
      ? [(-b - Math.sqrt(discriminant)) / (2 * a), (-b + Math.sqrt(discriminant)) / (2 * a)]
      : [];
  const vertexX = a !== 0 ? -b / (2 * a) : 0;
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  // Fixed window keeps the axes readable; the curve is clipped rather than rescaled,
  // because a rescaling graph hides what changing `a` actually does to the shape.
  const W = 460;
  const H = 260;
  const unit = 22;
  const cx = W / 2;
  const cy = H / 2 + 30;
  const toX = (x: number) => cx + x * unit;
  const toY = (y: number) => cy - y * unit;

  const points = Array.from({ length: 201 }, (_, i) => {
    const x = -10 + (i / 200) * 20;
    return `${toX(x).toFixed(1)},${toY(a * x * x + b * x + c).toFixed(1)}`;
  }).join(' ');

  return (
    <SimShell
      title="Quadratic explorer"
      description="How a, b and c change the curve — and what the discriminant is telling you."
      stage={
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Graph of a quadratic function">
          <defs>
            <clipPath id="quad-clip">
              <rect x={0} y={0} width={W} height={H} />
            </clipPath>
          </defs>
          {/* Grid */}
          {Array.from({ length: 21 }, (_, i) => i - 10).map((i) => (
            <g key={i}>
              <line x1={toX(i)} y1={0} x2={toX(i)} y2={H} stroke="rgb(var(--border-soft))" strokeWidth={0.5} />
              <line x1={0} y1={toY(i)} x2={W} y2={toY(i)} stroke="rgb(var(--border-soft))" strokeWidth={0.5} />
            </g>
          ))}
          <line x1={0} y1={cy} x2={W} y2={cy} stroke="rgb(var(--border))" strokeWidth={1.5} />
          <line x1={cx} y1={0} x2={cx} y2={H} stroke="rgb(var(--border))" strokeWidth={1.5} />

          <polyline points={points} fill="none" stroke="rgb(var(--maths))" strokeWidth={2.5} clipPath="url(#quad-clip)" />

          {roots.map((r, i) => (
            <circle key={i} cx={toX(r)} cy={cy} r={5} fill="rgb(var(--positive))" />
          ))}
          <circle cx={toX(vertexX)} cy={toY(vertexY)} r={5} fill="rgb(var(--accent))" />
          <text x={toX(vertexX) + 8} y={toY(vertexY) - 8} fontSize={11} fill="rgb(var(--accent))">
            vertex
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="a  (coefficient of x²)" value={a} min={-3} max={3} step={0.1} onChange={setA} format={(v) => v.toFixed(1)} />
          <Slider label="b  (coefficient of x)" value={b} min={-8} max={8} step={0.5} onChange={setB} format={(v) => v.toFixed(1)} />
          <Slider label="c  (constant)" value={c} min={-8} max={8} step={0.5} onChange={setC} format={(v) => v.toFixed(1)} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Readout label="b² − 4ac" value={discriminant.toFixed(1)} tone={discriminant > 0 ? 'positive' : discriminant === 0 ? 'accent' : 'negative'} />
          <Readout label="Real roots" value={rootCount} />
          <Readout label="Vertex" value={`(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`} />
          <Readout label="y-intercept" value={c.toFixed(1)} />
        </div>
      }
      content={{
        observe:
          'The curve crosses the x-axis twice, touches it once, or misses it entirely — and the sign of b² − 4ac changes at exactly the same moment.',
        variables: 'The three coefficients a, b and c.',
        predict: {
          question: 'If b² − 4ac is negative, what does the graph look like?',
          options: [
            'It crosses the x-axis twice',
            'It touches the x-axis at one point',
            'It does not meet the x-axis at all',
            'It becomes a straight line',
          ],
          answerIndex: 2,
          why: 'A negative discriminant means the square root in the quadratic formula has no real value, so there are no real roots — and no real roots is exactly the same statement as "the curve never meets the x-axis".',
        },
        experiment: [
          'Set a = 1, b = 0 and move c from −4 up to +4. Watch the roots meet and then disappear as the discriminant changes sign.',
          'Find a combination where b² − 4ac is exactly 0 and check the curve touches the axis once.',
          'Make a negative and confirm the parabola turns upside down and the vertex becomes a maximum.',
          'Set a = 0 and explain why the vertex readout stops being meaningful.',
        ],
        explain: (
          <>
            <p>
              The <strong>y-intercept is always c</strong>, because putting x = 0 leaves y = c. That
              is the quickest check that you have sketched the right curve.
            </p>
            <p>
              The sign of <strong>a</strong> decides which way up the parabola sits: positive gives a
              minimum, negative gives a maximum. Its size decides how steep the curve is.
            </p>
            <p>
              The discriminant <strong>b² − 4ac</strong> is the part under the square root in the
              quadratic formula. Positive gives two real roots, zero gives one repeated root where the
              curve just touches the axis, and negative gives none — the formula would need the square
              root of a negative number.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Circle theorems                                                            */
/* -------------------------------------------------------------------------- */

/**
 * The angle at the centre against the angle at the circumference, both live.
 *
 * A static diagram lets a student believe the doubling is a property of that
 * particular picture. Moving the point around the major arc and watching the
 * circumference angle refuse to change is the argument.
 */
export function CircleTheorems() {
  const [arcAngle, setArcAngle] = useState(110);
  const [pointPosition, setPointPosition] = useState(50);

  const R = 92;
  const cx = 240;
  const cy = 130;

  // A and B sit symmetrically about the top, separated by the arc angle.
  const angleA = -90 - arcAngle / 2;
  const angleB = -90 + arcAngle / 2;
  // P runs along the major arc, so the inscribed angle stands on the same arc AB.
  const angleP = angleB + (pointPosition / 100) * (360 - arcAngle);

  const at = (deg: number) => [cx + R * Math.cos((deg * Math.PI) / 180), cy + R * Math.sin((deg * Math.PI) / 180)];
  const [ax, ay] = at(angleA);
  const [bx, by] = at(angleB);
  const [px, py] = at(angleP);

  const centreAngle = arcAngle;
  const circumferenceAngle = arcAngle / 2;

  return (
    <SimShell
      title="Circle theorems"
      description="The angle at the centre is twice the angle at the circumference, standing on the same arc."
      stage={
        <svg viewBox="0 0 480 260" className="h-auto w-full" role="img" aria-label="Circle with angles at the centre and circumference">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgb(var(--border))" strokeWidth={2} />

          {/* Radii to A and B — the angle at the centre */}
          <line x1={cx} y1={cy} x2={ax} y2={ay} stroke="rgb(var(--maths))" strokeWidth={2} />
          <line x1={cx} y1={cy} x2={bx} y2={by} stroke="rgb(var(--maths))" strokeWidth={2} />
          {/* Chords to P — the angle at the circumference */}
          <line x1={px} y1={py} x2={ax} y2={ay} stroke="rgb(var(--accent))" strokeWidth={2} />
          <line x1={px} y1={py} x2={bx} y2={by} stroke="rgb(var(--accent))" strokeWidth={2} />

          <circle cx={cx} cy={cy} r={4} fill="rgb(var(--maths))" />
          <circle cx={ax} cy={ay} r={4.5} fill="rgb(var(--text))" />
          <circle cx={bx} cy={by} r={4.5} fill="rgb(var(--text))" />
          <circle cx={px} cy={py} r={5.5} fill="rgb(var(--accent))" />

          <text x={ax - 14} y={ay + 4} fontSize={12} fill="rgb(var(--muted))">A</text>
          <text x={bx + 8} y={by + 4} fontSize={12} fill="rgb(var(--muted))">B</text>
          <text x={px + 8} y={py + 4} fontSize={12} fill="rgb(var(--accent))">P</text>
          <text x={cx + 8} y={cy + 16} fontSize={12} fill="rgb(var(--maths))">O</text>

          <text x={cx} y={244} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
            angle AOB = {centreAngle.toFixed(0)}°   ·   angle APB = {circumferenceAngle.toFixed(0)}°
          </text>
        </svg>
      }
      controls={
        <>
          <Slider label="Arc AB (angle at the centre)" value={arcAngle} min={30} max={180} step={1} unit="°" onChange={setArcAngle} />
          <Slider label="Move P around the major arc" value={pointPosition} min={5} max={95} step={1} unit="%" onChange={setPointPosition} />
        </>
      }
      readouts={
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Readout label="Angle at centre" value={centreAngle.toFixed(0)} unit="°" tone="accent" />
          <Readout label="Angle at circumference" value={circumferenceAngle.toFixed(0)} unit="°" tone="positive" />
          <Readout label="Ratio" value={`${(centreAngle / circumferenceAngle).toFixed(1)} : 1`} />
        </div>
      }
      content={{
        observe:
          'Moving P anywhere along the major arc does not change the angle at P at all. Only changing the arc AB changes it.',
        variables: 'The size of arc AB, and where P sits on the major arc.',
        predict: {
          question: 'Angle AOB at the centre is 140°. What is angle APB at the circumference?',
          options: ['280°', '140°', '70°', 'It depends where P is'],
          answerIndex: 2,
          why: 'The angle at the circumference is always half the angle at the centre when both stand on the same arc, so 140 ÷ 2 = 70°. Where P sits on the major arc makes no difference — which is the other theorem, that angles in the same segment are equal.',
        },
        experiment: [
          'Set the arc to 120° and move P from one end of the major arc to the other. Watch the angle at P stay fixed.',
          'Now change the arc and watch both angles change together, always in the ratio 2 : 1.',
          'Set the arc to exactly 180° and read the angle at P — you have just derived the angle in a semicircle.',
          'Write down, in the wording an examiner would accept, the reason the ratio is 2 : 1.',
        ],
        explain: (
          <>
            <p>
              <strong>The angle at the centre is twice the angle at the circumference</strong> when
              both stand on the same arc. That is the theorem, and it is the reason a great many
              circle problems collapse to a single division by two.
            </p>
            <p>
              Because the angle at P does not depend on where P is, every point on the major arc gives
              the same angle. That is the second theorem — <strong>angles in the same segment are
              equal</strong>.
            </p>
            <p>
              Set the arc to 180° and AB becomes a diameter, so the angle at the centre is 180° and the
              angle at P is 90°. The angle in a semicircle is not a separate fact to memorise; it is
              this theorem with the arc set to a straight line.
            </p>
            <p>
              In the exam, write the reason next to every angle you find. Most of the marks in a
              circle-theorem question are for the reasoning, not the number.
            </p>
          </>
        ),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Transformations                                                            */
/* -------------------------------------------------------------------------- */

/**
 * One shape, four transformations, with the description the exam wants shown
 * alongside. Describing a transformation fully — naming it *and* giving its
 * vector, mirror line, centre or scale factor — is where the marks are.
 */
export function Transformations() {
  const [kind, setKind] = useState<'translation' | 'reflection' | 'rotation' | 'enlargement'>('translation');
  const [dx, setDx] = useState(3);
  const [dy, setDy] = useState(2);
  const [rotation, setRotation] = useState(90);
  const [scale, setScale] = useState(2);
  const [mirror, setMirror] = useState<'x' | 'y' | 'y=x'>('y');

  const W = 460;
  const H = 260;
  const unit = 20;
  const ox = W / 2;
  const oy = H / 2;
  const toX = (x: number) => ox + x * unit;
  const toY = (y: number) => oy - y * unit;

  const shape: [number, number][] = [
    [1, 1],
    [4, 1],
    [4, 3],
    [1, 3],
  ];

  function transform([x, y]: [number, number]): [number, number] {
    switch (kind) {
      case 'translation':
        return [x + dx, y + dy];
      case 'reflection':
        if (mirror === 'x') return [x, -y];
        if (mirror === 'y') return [-x, y];
        return [y, x];
      case 'rotation': {
        const r = (rotation * Math.PI) / 180;
        return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
      }
      case 'enlargement':
        return [x * scale, y * scale];
    }
  }

  const toPoly = (pts: [number, number][]) => pts.map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ');

  const description = {
    translation: `Translation by the vector (${dx}, ${dy}).`,
    reflection: `Reflection in the line ${mirror === 'x' ? 'y = 0 (the x-axis)' : mirror === 'y' ? 'x = 0 (the y-axis)' : 'y = x'}.`,
    rotation: `Rotation of ${rotation}° anticlockwise about the origin (0, 0).`,
    enlargement: `Enlargement with scale factor ${scale}, centre the origin (0, 0).`,
  }[kind];

  return (
    <SimShell
      title="Transformations"
      description="Four transformations, and the full description each one needs to earn its marks."
      stage={
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="A shape and its image after a transformation">
          {Array.from({ length: 25 }, (_, i) => i - 12).map((i) => (
            <g key={i}>
              <line x1={toX(i)} y1={0} x2={toX(i)} y2={H} stroke="rgb(var(--border-soft))" strokeWidth={0.5} />
              <line x1={0} y1={toY(i)} x2={W} y2={toY(i)} stroke="rgb(var(--border-soft))" strokeWidth={0.5} />
            </g>
          ))}
          <line x1={0} y1={oy} x2={W} y2={oy} stroke="rgb(var(--border))" strokeWidth={1.5} />
          <line x1={ox} y1={0} x2={ox} y2={H} stroke="rgb(var(--border))" strokeWidth={1.5} />
          {kind === 'reflection' && mirror === 'y=x' && (
            <line x1={toX(-12)} y1={toY(-12)} x2={toX(12)} y2={toY(12)} stroke="rgb(var(--caution))" strokeWidth={1.5} strokeDasharray="5 4" />
          )}

          <polygon points={toPoly(shape)} fill="rgb(var(--maths))" opacity={0.3} stroke="rgb(var(--maths))" strokeWidth={2} />
          <polygon
            points={toPoly(shape.map(transform))}
            fill="rgb(var(--accent))"
            opacity={0.35}
            stroke="rgb(var(--accent))"
            strokeWidth={2}
          />
        </svg>
      }
      controls={
        <>
          <div>
            <p className="mb-1.5 text-sm text-ink-muted">Transformation</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(['translation', 'reflection', 'rotation', 'enlargement'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setKind(option)}
                  className={cn(
                    'rounded-lg border px-2 py-1.5 text-xs capitalize transition-colors',
                    kind === option ? 'border-accent bg-accent/10 text-accent' : 'border-line text-ink-muted hover:border-accent/40',
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {kind === 'translation' && (
            <>
              <Slider label="x component" value={dx} min={-6} max={6} step={1} onChange={setDx} />
              <Slider label="y component" value={dy} min={-6} max={6} step={1} onChange={setDy} />
            </>
          )}
          {kind === 'reflection' && (
            <div className="flex gap-1.5">
              {(['x', 'y', 'y=x'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMirror(option)}
                  className={cn(
                    'flex-1 rounded-lg border px-2 py-1.5 text-xs transition-colors',
                    mirror === option ? 'border-accent bg-accent/10 text-accent' : 'border-line text-ink-muted hover:border-accent/40',
                  )}
                >
                  {option === 'x' ? 'x-axis' : option === 'y' ? 'y-axis' : 'y = x'}
                </button>
              ))}
            </div>
          )}
          {kind === 'rotation' && (
            <Slider label="Angle (anticlockwise)" value={rotation} min={-180} max={180} step={90} unit="°" onChange={setRotation} />
          )}
          {kind === 'enlargement' && (
            <Slider label="Scale factor" value={scale} min={-2} max={3} step={0.5} onChange={setScale} format={(v) => v.toFixed(1)} />
          )}
        </>
      }
      readouts={
        <div className="rounded-card border border-accent/25 bg-accent/[0.06] px-4 py-3">
          <p className="text-2xs uppercase tracking-wide text-ink-faint">Full description — what the exam wants</p>
          <p className="mt-1 text-sm font-medium text-ink">{description}</p>
        </div>
      }
      content={{
        observe:
          'Translation and rotation keep the shape the same size. Enlargement does not — and a negative scale factor also turns it upside down through the centre.',
        variables: 'The type of transformation, and the vector, mirror line, angle or scale factor that goes with it.',
        predict: {
          question: 'Which of these transformations changes the size of the shape?',
          options: ['Translation', 'Reflection', 'Rotation', 'Enlargement'],
          answerIndex: 3,
          why: 'Translation, reflection and rotation are all congruent transformations — the image is exactly the same size and shape as the object. Only enlargement changes the size, which is why it is the only one that produces a similar rather than a congruent shape.',
        },
        experiment: [
          'Translate the shape by (3, 2), then read the full description. Note that a vector, not a distance, is required.',
          'Reflect in the y-axis and then in y = x, and see that the order matters.',
          'Rotate by 90° and then by −90°, and check the description names the angle, the direction and the centre.',
          'Set the enlargement scale factor to −2 and describe what a negative scale factor does.',
        ],
        explain: (
          <>
            <p>
              Marks in these questions are for the <strong>full description</strong>, and each type has
              its own required parts:
            </p>
            <ul>
              <li>Translation — name it and give the <strong>column vector</strong>.</li>
              <li>Reflection — name it and give the <strong>equation of the mirror line</strong>.</li>
              <li>Rotation — name it and give the <strong>angle, the direction and the centre</strong>.</li>
              <li>Enlargement — name it and give the <strong>scale factor and the centre</strong>.</li>
            </ul>
            <p>
              Missing any one of those parts loses a mark, and it is the commonest way to drop marks
              in the topic. &ldquo;Rotation of 90°&rdquo; is not a full description; &ldquo;rotation of
              90° anticlockwise about (0, 0)&rdquo; is.
            </p>
            <p>
              A negative scale factor puts the image on the opposite side of the centre and turns it
              through 180°, which is why it looks upside down.
            </p>
          </>
        ),
      }}
    />
  );
}
