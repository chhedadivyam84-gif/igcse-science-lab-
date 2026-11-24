'use client';

import { DiagramCanvas } from '@/components/diagram/DiagramCanvas';
import type { GraphShape, StoryboardScene, SubjectSlug } from '@/lib/types';

/**
 * Motion graphics for the explainer player.
 *
 * Every frame is a pure function of `progress` (0 → 1 through the scene), so
 * pausing, stepping and replaying stay in sync with the narrator. Every scene
 * draws from the storyboard's own data — labels, equations, steps, axes — so
 * the picture always matches what is being said.
 */

type Props = { scene: StoryboardScene; progress: number; index: number; subject: SubjectSlug };

const W = 1280;
const H = 720;
const DISPLAY = { fontFamily: 'var(--font-video), var(--font-sans), sans-serif' };
const BODY = { fontFamily: 'var(--font-video-body), var(--font-sans), sans-serif' };

// --- easing -----------------------------------------------------------------

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const backOut = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
/** Eased 0→1 while progress moves from a to b. */
const seg = (p: number, a: number, b: number) => easeOut(clamp01((p - a) / (b - a)));
const tri = (x: number) => 1 - Math.abs((((x % 2) + 2) % 2) - 1);
const rand = (i: number, salt = 1) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

const color = (subject: SubjectSlug) => `rgb(var(--${subject}))`;
const SECOND = 'rgb(var(--positive, 52 211 153))';

// --- entry ------------------------------------------------------------------

export function SceneVisual(props: Props) {
  const { scene } = props;

  if (scene.visual === 'diagram' && scene.diagram) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-card border border-line bg-[#070b14]">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
          <Backdrop {...props} />
          <Header {...props} />
        </svg>
        <div
          className="absolute inset-x-[8%] bottom-[6%] top-[20%] flex items-center justify-center rounded-2xl bg-white/95 p-3"
          style={{ opacity: seg(props.progress, 0.05, 0.2) }}
        >
          <DiagramCanvas spec={scene.diagram} className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="aspect-video h-auto w-full rounded-card border border-line bg-[#070b14]"
      role="img"
      aria-label={scene.title}
    >
      <Backdrop {...props} />
      {scene.visual !== 'intro' && <Header {...props} />}
      <Body {...props} />
      {scene.visual !== 'intro' && <Caption {...props} />}
    </svg>
  );
}

function Body(props: Props) {
  switch (props.scene.visual) {
    case 'intro':
      return <Intro {...props} />;
    case 'definition':
      return <Definition {...props} />;
    case 'equation':
      return <Equation {...props} />;
    case 'process':
      return <Process {...props} />;
    case 'graph':
      return <Graph {...props} />;
    case 'compare':
      return <Compare {...props} />;
    case 'particles':
      return <Particles {...props} />;
    case 'wave':
      return <Wave {...props} />;
    case 'circuit':
      return <Circuit {...props} />;
    default:
      return <Summary {...props} />;
  }
}

// --- shared layers ----------------------------------------------------------

function Backdrop({ progress, subject, index }: Props) {
  const c = color(subject);
  const drift = progress * 60;
  return (
    <g>
      <defs>
        <radialGradient id="glowA">
          <stop offset="0" stopColor={c} stopOpacity="0.35" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glowB">
          <stop offset="0" stopColor="rgb(var(--accent))" stopOpacity="0.22" />
          <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="white" strokeOpacity="0.045" />
        </pattern>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={W} height={H} fill="#070b14" />
      <rect width={W} height={H} fill="url(#grid)" />
      <circle cx={180 + drift + (index % 2) * 700} cy={120 + drift * 0.6} r={420} fill="url(#glowA)" />
      <circle cx={1100 - drift} cy={640 - drift * 0.4} r={380} fill="url(#glowB)" />
    </g>
  );
}

function Header({ scene, progress, index, subject }: Props) {
  const a = seg(progress, 0, 0.08);
  return (
    <g opacity={a} transform={`translate(${(1 - a) * -24} 0)`}>
      <rect x={64} y={56} width={6} height={52} rx={3} fill={color(subject)} />
      <text x={86} y={74} fontSize={16} letterSpacing={3} fill="rgb(255 255 255 / 0.55)" style={BODY} fontWeight={600}>
        {`SCENE ${index + 1}`}
      </text>
      <text x={86} y={106} fontSize={34} fill="white" style={DISPLAY} fontWeight={700}>
        {scene.title}
      </text>
    </g>
  );
}

function Caption({ scene, progress }: Props) {
  const text = scene.caption;
  if (!text) return null;
  const a = seg(progress, 0.12, 0.24);
  const width = Math.min(1120, text.length * 13.5 + 64);
  return (
    <g opacity={a} transform={`translate(0 ${(1 - a) * 16})`}>
      <rect x={(W - width) / 2} y={636} width={width} height={50} rx={25} fill="rgb(255 255 255 / 0.08)" stroke="rgb(255 255 255 / 0.12)" />
      <text x={W / 2} y={668} textAnchor="middle" fontSize={22} fill="rgb(255 255 255 / 0.92)" style={BODY} fontWeight={500}>
        {text}
      </text>
    </g>
  );
}

// --- scenes -----------------------------------------------------------------

function Intro({ scene, progress, subject }: Props) {
  const c = color(subject);
  const lines = wrap(scene.title, 22).slice(0, 3);
  const spin = progress * 90;

  return (
    <g>
      <g transform={`translate(${W / 2} 250)`} opacity={seg(progress, 0, 0.15)}>
        {[0, 1, 2].map((r) => (
          <ellipse
            key={r}
            rx={150 + r * 34}
            ry={46 + r * 10}
            fill="none"
            stroke={c}
            strokeOpacity={0.5 - r * 0.12}
            strokeWidth={2}
            transform={`rotate(${spin * (r % 2 ? -1 : 1) + r * 60})`}
          />
        ))}
        {[0, 1, 2].map((r) => {
          const ang = ((progress * 360 * (1 + r * 0.4) + r * 120) * Math.PI) / 180;
          const rot = ((spin * (r % 2 ? -1 : 1) + r * 60) * Math.PI) / 180;
          const ex = Math.cos(ang) * (150 + r * 34);
          const ey = Math.sin(ang) * (46 + r * 10);
          return (
            <circle
              key={`e${r}`}
              cx={ex * Math.cos(rot) - ey * Math.sin(rot)}
              cy={ex * Math.sin(rot) + ey * Math.cos(rot)}
              r={7}
              fill="white"
              filter="url(#soft)"
            />
          );
        })}
        <circle r={34 + Math.sin(progress * 20) * 3} fill={c} filter="url(#soft)" />
      </g>

      {lines.map((line, li) => {
        const k = clamp01((progress - 0.08 - li * 0.07) / 0.16);
        return (
          <text
            key={li}
            x={W / 2}
            y={470 + li * 84 + (1 - easeOut(k)) * 50}
            opacity={k}
            textAnchor="middle"
            fontSize={72}
            fontWeight={800}
            fill="white"
            style={DISPLAY}
            transform={`translate(${W / 2} ${470 + li * 84}) scale(${0.92 + 0.08 * backOut(k)}) translate(${-W / 2} ${-(470 + li * 84)})`}
          >
            {line}
          </text>
        );
      })}
      <rect
        x={W / 2 - 120 * seg(progress, 0.35, 0.55)}
        y={470 + lines.length * 84 - 40}
        width={240 * seg(progress, 0.35, 0.55)}
        height={6}
        rx={3}
        fill={c}
      />
      {scene.caption && (
        <text
          x={W / 2}
          y={470 + lines.length * 84 + 10}
          textAnchor="middle"
          fontSize={26}
          fill="rgb(255 255 255 / 0.7)"
          opacity={seg(progress, 0.45, 0.6)}
          style={BODY}
        >
          {scene.caption}
        </text>
      )}
    </g>
  );
}

function Definition({ scene, progress, subject }: Props) {
  const c = color(subject);
  const def = scene.definition ?? '';
  const typed = def.slice(0, Math.floor(seg(progress, 0.18, 0.7) * def.length));
  const lines = wrap(typed, 52);
  const a = seg(progress, 0.04, 0.18);
  const caret = Math.floor(progress * 40) % 2 === 0 && typed.length < def.length;

  return (
    <g>
      <rect x={120} y={200} width={8} height={330 * seg(progress, 0.02, 0.2)} rx={4} fill={c} />
      <text x={160} y={196} fontSize={18} letterSpacing={4} fill={c} opacity={a} style={BODY} fontWeight={700}>
        KEY TERM
      </text>
      <text
        x={160 + (1 - a) * 40}
        y={280}
        opacity={a}
        fontSize={scene.term && scene.term.length > 22 ? 52 : 68}
        fontWeight={800}
        fill="white"
        style={DISPLAY}
      >
        {scene.term}
      </text>
      {lines.map((line, i) => (
        <text key={i} x={160} y={360 + i * 48} fontSize={34} fill="rgb(255 255 255 / 0.88)" style={BODY}>
          {line}
          {caret && i === lines.length - 1 ? '▍' : ''}
        </text>
      ))}
    </g>
  );
}

function Equation({ scene, progress, subject }: Props) {
  const c = color(subject);
  const eq = scene.equation!;
  const a = seg(progress, 0.05, 0.25);
  const legend = eq.legend;
  const n = Math.max(1, legend.length);
  const cardW = Math.min(300, (1080 - (n - 1) * 24) / n);
  const startX = (W - (n * cardW + (n - 1) * 24)) / 2;
  const size = eq.expression.length > 18 ? 72 : 104;

  return (
    <g>
      <g opacity={a} transform={`translate(${W / 2} 300) scale(${0.85 + 0.15 * a})`}>
        <rect x={-460} y={-92} width={920} height={150} rx={28} fill="rgb(255 255 255 / 0.05)" stroke={c} strokeOpacity={0.5} />
        <text textAnchor="middle" y={size * 0.25} fontSize={size} fontWeight={700} fill="white" style={DISPLAY} filter="url(#soft)">
          {eq.expression}
        </text>
      </g>
      {legend.map((item, i) => {
        const b = seg(progress, 0.3 + i * 0.08, 0.42 + i * 0.08);
        const x = startX + i * (cardW + 24);
        const meaning = wrap(item.meaning, Math.floor(cardW / 12)).slice(0, 2);
        return (
          <g key={i} opacity={b} transform={`translate(${x} ${430 + (1 - b) * 30})`}>
            <rect width={cardW} height={170} rx={20} fill="rgb(255 255 255 / 0.06)" stroke="rgb(255 255 255 / 0.12)" />
            <text x={cardW / 2} y={62} textAnchor="middle" fontSize={44} fontWeight={700} fill={c} style={DISPLAY}>
              {item.symbol}
            </text>
            {meaning.map((m, j) => (
              <text key={j} x={cardW / 2} y={104 + j * 26} textAnchor="middle" fontSize={20} fill="white" style={BODY}>
                {m}
              </text>
            ))}
            {item.unit && (
              <text x={cardW / 2} y={156} textAnchor="middle" fontSize={18} fill="rgb(255 255 255 / 0.55)" style={BODY}>
                {`unit: ${item.unit}`}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

function Process({ scene, progress, subject }: Props) {
  const c = color(subject);
  const steps = scene.steps ?? [];
  const n = steps.length;
  const gap = 56;
  const cardW = (1160 - gap * (n - 1)) / n;
  const x0 = 60;
  const active = Math.min(n - 1, Math.floor(clamp01((progress - 0.05) / 0.85) * n));
  const chars = Math.max(10, Math.floor(cardW / 13));

  return (
    <g>
      {steps.map((step, i) => {
        const appear = seg(progress, 0.03 + i * 0.05, 0.15 + i * 0.05);
        const isActive = i === active;
        const done = i < active;
        const x = x0 + i * (cardW + gap);
        const lines = wrap(step, chars).slice(0, 5);
        const lift = isActive ? -14 : 0;
        return (
          <g key={i} opacity={appear} transform={`translate(${x} ${250 + lift + (1 - appear) * 40})`}>
            <rect
              width={cardW}
              height={280}
              rx={24}
              fill={isActive ? 'rgb(255 255 255 / 0.1)' : 'rgb(255 255 255 / 0.04)'}
              stroke={isActive ? c : 'rgb(255 255 255 / 0.12)'}
              strokeWidth={isActive ? 3 : 1.5}
            />
            <circle cx={44} cy={46} r={24} fill={done || isActive ? c : 'rgb(255 255 255 / 0.1)'} />
            <text x={44} y={55} textAnchor="middle" fontSize={24} fontWeight={700} fill="white" style={DISPLAY}>
              {done ? '✓' : i + 1}
            </text>
            {lines.map((line, j) => (
              <text
                key={j}
                x={24}
                y={118 + j * 32}
                fontSize={24}
                fill={isActive ? 'white' : 'rgb(255 255 255 / 0.7)'}
                style={BODY}
                fontWeight={isActive ? 600 : 400}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
      {steps.slice(0, -1).map((_, i) => {
        const x = x0 + (i + 1) * cardW + i * gap + 6;
        const grow = i < active ? 1 : i === active ? seg(progress, 0.05 + ((i + 0.6) / n) * 0.85, 0.05 + ((i + 1) / n) * 0.85) : 0;
        return (
          <g key={`a${i}`}>
            <line x1={x} y1={390} x2={x + (gap - 12) * grow} y2={390} stroke={c} strokeWidth={4} strokeLinecap="round" />
            {grow > 0.95 && <path d={`M${x + gap - 22} 380 L${x + gap - 10} 390 L${x + gap - 22} 400`} fill="none" stroke={c} strokeWidth={4} strokeLinecap="round" />}
          </g>
        );
      })}
    </g>
  );
}

function curve(shape: GraphShape, t: number): number {
  switch (shape) {
    case 'linear':
      return 0.15 + 0.72 * t;
    case 'proportional':
      return 0.88 * t;
    case 'levelling':
      return 0.88 * (1 - Math.exp(-4 * t));
    case 'decay':
      return 0.9 * Math.exp(-3.4 * t);
    case 'inverse':
      return Math.min(0.92, 0.09 / (t + 0.06));
    case 'curve-up':
      return 0.88 * t * t;
    case 'peak':
      return 0.85 * Math.exp(-Math.pow(t - 0.45, 2) / 0.045);
  }
}

function Graph({ scene, progress, subject }: Props) {
  const c = color(subject);
  const g = scene.graph!;
  const ox = 220;
  const oy = 570;
  const gw = 860;
  const gh = 380;
  const axes = seg(progress, 0.02, 0.15);
  const draw = seg(progress, 0.15, 0.75);
  const samples = Math.max(2, Math.round(draw * 120));
  const pts = Array.from({ length: samples }, (_, i) => {
    const t = (i / 120) * 1;
    return [ox + t * gw, oy - curve(g.shape, t) * gh] as const;
  });
  const tip = pts[pts.length - 1];

  return (
    <g>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={ox} x2={ox + gw * axes} y1={oy - f * gh} y2={oy - f * gh} stroke="white" strokeOpacity={0.06} />
      ))}
      <line x1={ox} y1={oy} x2={ox} y2={oy - (gh + 30) * axes} stroke="white" strokeOpacity={0.7} strokeWidth={3} />
      <line x1={ox} y1={oy} x2={ox + (gw + 30) * axes} y2={oy} stroke="white" strokeOpacity={0.7} strokeWidth={3} />
      <text x={ox + gw / 2} y={oy + 52} textAnchor="middle" fontSize={24} fill="rgb(255 255 255 / 0.85)" opacity={axes} style={BODY}>
        {g.xLabel}
      </text>
      <text
        transform={`translate(${ox - 44} ${oy - gh / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize={24}
        fill="rgb(255 255 255 / 0.85)"
        opacity={axes}
        style={BODY}
      >
        {g.yLabel}
      </text>
      <polyline
        points={pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}
        fill="none"
        stroke={c}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#soft)"
      />
      {draw > 0 && <circle cx={tip[0]} cy={tip[1]} r={10} fill="white" filter="url(#soft)" />}
      {g.note && (
        <g opacity={seg(progress, 0.75, 0.88)}>
          <rect x={ox + gw - 420} y={150} width={430} height={56} rx={14} fill="rgb(255 255 255 / 0.08)" stroke={c} strokeOpacity={0.6} />
          <text x={ox + gw - 205} y={186} textAnchor="middle" fontSize={21} fill="white" style={BODY}>
            {g.note.length > 40 ? `${g.note.slice(0, 39)}…` : g.note}
          </text>
        </g>
      )}
    </g>
  );
}

function Compare({ scene, progress, subject }: Props) {
  const sides = [
    { ...scene.compare!.left, col: color(subject), dir: -1 },
    { ...scene.compare!.right, col: SECOND, dir: 1 },
  ];
  const vs = backOut(clamp01((progress - 0.15) / 0.15));
  const most = Math.max(scene.compare!.left.points.length, scene.compare!.right.points.length);
  const cardH = Math.min(440, 150 + most * 84);

  return (
    <g>
      {sides.map((side, s) => {
        const a = seg(progress, 0.03 + s * 0.06, 0.2 + s * 0.06);
        const x = s === 0 ? 80 : 680;
        return (
          <g key={s} opacity={a} transform={`translate(${x + side.dir * (1 - a) * 80} ${380 - cardH / 2})`}>
            <rect width={520} height={cardH} rx={28} fill="rgb(255 255 255 / 0.05)" stroke={side.col} strokeOpacity={0.7} strokeWidth={2} />
            <rect width={520} height={84} rx={28} fill={side.col} fillOpacity={0.22} />
            <text x={260} y={56} textAnchor="middle" fontSize={32} fontWeight={700} fill="white" style={DISPLAY}>
              {side.title}
            </text>
            {side.points.map((pt, i) => {
              const b = seg(progress, 0.25 + i * 0.1 + s * 0.04, 0.35 + i * 0.1 + s * 0.04);
              const lines = wrap(pt, 34).slice(0, 2);
              return (
                <g key={i} opacity={b} transform={`translate(${(1 - b) * 20} 0)`}>
                  <circle cx={40} cy={140 + i * 84} r={7} fill={side.col} />
                  {lines.map((l, j) => (
                    <text key={j} x={64} y={148 + i * 84 + j * 30} fontSize={23} fill="white" style={BODY}>
                      {l}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
        );
      })}
      <g transform={`translate(${W / 2} 380) scale(${clamp01(vs) * 1})`}>
        <circle r={40} fill="#070b14" stroke="white" strokeOpacity={0.5} strokeWidth={2} />
        <text y={10} textAnchor="middle" fontSize={26} fontWeight={800} fill="white" style={DISPLAY}>
          VS
        </text>
      </g>
    </g>
  );
}

function Particles({ scene, progress, subject }: Props) {
  const c = color(subject);
  const mode = scene.particleMode ?? 'gas';
  const box = { x: 180, y: 160, w: 640, h: 420 };
  const t = progress * 12;
  const r = 15;
  const parts: { x: number; y: number; col: string }[] = [];

  if (mode === 'solid') {
    for (let row = 0; row < 6; row++)
      for (let col = 0; col < 10; col++) {
        const i = row * 10 + col;
        parts.push({
          x: box.x + 50 + col * 60 + Math.sin(t * 6 + i) * 4,
          y: box.y + 380 - row * 36 + Math.cos(t * 7 + i * 1.3) * 4,
          col: c,
        });
      }
  } else if (mode === 'liquid') {
    for (let i = 0; i < 52; i++) {
      const row = Math.floor(i / 11);
      parts.push({
        x: box.x + 30 + ((i % 11) * 56 + rand(i) * 20 + Math.sin(t * 1.4 + i) * 22 + 640) % 600,
        y: box.y + 390 - row * 34 + Math.sin(t * 2 + i * 0.7) * 6,
        col: c,
      });
    }
  } else if (mode === 'gas') {
    for (let i = 0; i < 22; i++) {
      const sp = 0.6 + rand(i) * 0.9;
      parts.push({
        x: box.x + r + tri(rand(i, 2) * 2 + t * sp * 0.35) * (box.w - 2 * r),
        y: box.y + r + tri(rand(i, 3) * 2 + t * sp * 0.27) * (box.h - 2 * r),
        col: c,
      });
    }
  } else {
    const mix = easeInOut(seg(progress, 0.1, 0.95));
    for (let i = 0; i < 44; i++) {
      const left = i < 22;
      const home = left ? box.x + 40 + rand(i, 4) * 260 : box.x + 340 + rand(i, 4) * 260;
      const free = box.x + 30 + rand(i, 5) * 580;
      parts.push({
        x: home + (free - home) * mix + Math.sin(t * 2 + i) * 10,
        y: box.y + 30 + rand(i, 6) * 360 + Math.cos(t * 2.3 + i) * 10,
        col: left ? c : SECOND,
      });
    }
  }

  const a = seg(progress, 0.02, 0.15);
  return (
    <g opacity={a}>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={24} fill="rgb(255 255 255 / 0.03)" stroke="white" strokeOpacity={0.35} strokeWidth={3} />
      {parts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={r} fill={p.col} opacity={0.92} />
      ))}
      <text x={box.x + box.w + 30} y={box.y + 40} fontSize={22} letterSpacing={3} fill={c} style={BODY} fontWeight={700}>
        {mode.toUpperCase()}
      </text>
      {(scene.labels ?? []).slice(0, 4).map((l, i) => (
        <text key={i} x={box.x + box.w + 30} y={box.y + 90 + i * 40} fontSize={22} fill="rgb(255 255 255 / 0.8)" opacity={seg(progress, 0.3 + i * 0.1, 0.4 + i * 0.1)} style={BODY}>
          {`• ${l}`}
        </text>
      ))}
    </g>
  );
}

function Wave({ scene, progress, subject }: Props) {
  const c = color(subject);
  const longitudinal = scene.waveMode === 'longitudinal';
  const t = progress * 6;
  const x0 = 140;
  const x1 = 1040;
  const mid = 380;
  const a = seg(progress, 0.02, 0.15);
  const lam = (x1 - x0) / 3;

  if (longitudinal) {
    const lines = Array.from({ length: 70 }, (_, i) => {
      const base = x0 + (i / 69) * (x1 - x0);
      return base + Math.sin(((base - x0) / lam) * 2 * Math.PI - t * 2 * Math.PI) * 14;
    });
    return (
      <g opacity={a}>
        {lines.map((x, i) => (
          <line key={i} x1={x} x2={x} y1={mid - 110} y2={mid + 110} stroke={c} strokeWidth={4} strokeLinecap="round" />
        ))}
        <g opacity={seg(progress, 0.35, 0.5)}>
          <text x={x0 + lam * 0.25 + 20} y={mid - 140} textAnchor="middle" fontSize={22} fill="white" style={BODY}>
            compression
          </text>
          <text x={x0 + lam * 0.75 + 20} y={mid + 160} textAnchor="middle" fontSize={22} fill="rgb(255 255 255 / 0.7)" style={BODY}>
            rarefaction
          </text>
        </g>
        <path d={`M${x0} ${mid + 200} H${x0 + 260}`} stroke="white" strokeOpacity={0.6} strokeWidth={3} opacity={seg(progress, 0.55, 0.7)} />
        <text x={x0 + 280} y={mid + 208} fontSize={20} fill="rgb(255 255 255 / 0.7)" opacity={seg(progress, 0.55, 0.7)} style={BODY}>
          direction of energy transfer →
        </text>
      </g>
    );
  }

  const amp = 120;
  const pts = Array.from({ length: 201 }, (_, i) => {
    const x = x0 + (i / 200) * (x1 - x0);
    const y = mid - Math.sin(((x - x0) / lam) * 2 * Math.PI - t * 2 * Math.PI) * amp;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const crest = x0 + lam * 0.25 + ((t % 1) * lam);

  return (
    <g opacity={a}>
      <line x1={x0} x2={x1} y1={mid} y2={mid} stroke="white" strokeOpacity={0.25} strokeDasharray="8 10" />
      <polyline points={pts.join(' ')} fill="none" stroke={c} strokeWidth={6} strokeLinecap="round" filter="url(#soft)" />
      <g opacity={seg(progress, 0.3, 0.45)}>
        <line x1={crest} x2={crest + lam} y1={mid - amp - 40} y2={mid - amp - 40} stroke="white" strokeWidth={2} />
        <line x1={crest} x2={crest} y1={mid - amp - 52} y2={mid - amp - 28} stroke="white" strokeWidth={2} />
        <line x1={crest + lam} x2={crest + lam} y1={mid - amp - 52} y2={mid - amp - 28} stroke="white" strokeWidth={2} />
        <text x={crest + lam / 2} y={mid - amp - 58} textAnchor="middle" fontSize={22} fill="white" style={BODY}>
          wavelength λ
        </text>
      </g>
      <g opacity={seg(progress, 0.5, 0.65)}>
        <line x1={x1 + 30} x2={x1 + 30} y1={mid} y2={mid - amp} stroke="white" strokeWidth={2} />
        <text x={x1 + 44} y={mid - amp / 2} fontSize={22} fill="white" style={BODY}>
          amplitude
        </text>
      </g>
    </g>
  );
}

function Circuit({ scene, progress, subject }: Props) {
  const c = color(subject);
  const parallel = scene.circuitMode === 'parallel';
  const a = seg(progress, 0.02, 0.15);
  const L = 300;
  const R = 980;
  const T = 200;
  const B = 540;
  const loop = (R - L) * 2 + (B - T) * 2;
  const flow = progress * loop * 1.5;
  const labels = scene.labels ?? [];

  function along(d: number, path: [number, number][]) {
    const segs = path.slice(1).map((p, i) => [path[i], p] as const);
    const total = segs.reduce((s, [p, q]) => s + Math.hypot(q[0] - p[0], q[1] - p[1]), 0);
    let rem = ((d % total) + total) % total;
    for (const [p, q] of segs) {
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
      if (rem <= len) return [p[0] + ((q[0] - p[0]) * rem) / len, p[1] + ((q[1] - p[1]) * rem) / len];
      rem -= len;
    }
    return path[0];
  }

  const outer: [number, number][] = [[L, T], [R, T], [R, B], [L, B], [L, T]];
  const mid = (T + B) / 2;
  const branch: [number, number][] = [[L, T], [R, T], [R, mid], [L, mid], [L, T]];
  const glow = 0.55 + 0.45 * Math.sin(progress * 30) ** 2;

  const Lamp = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r={30} fill="#070b14" stroke="white" strokeWidth={3} />
      <circle r={22} fill="rgb(253 224 71)" opacity={glow * seg(progress, 0.15, 0.3)} filter="url(#soft)" />
      <path d="M-21 -21 L21 21 M21 -21 L-21 21" stroke="white" strokeWidth={3} />
    </g>
  );

  return (
    <g opacity={a}>
      <polyline points={outer.map((p) => p.join(',')).join(' ')} fill="none" stroke="white" strokeOpacity={0.8} strokeWidth={5} />
      {parallel && <line x1={L} x2={R} y1={mid} y2={mid} stroke="white" strokeOpacity={0.8} strokeWidth={5} />}
      {/* cell on the left side */}
      <rect x={L - 30} y={mid - 40 + (parallel ? 85 : 0)} width={60} height={80} fill="#070b14" />
      <line x1={L - 34} x2={L + 34} y1={mid - 10 + (parallel ? 85 : 0)} y2={mid - 10 + (parallel ? 85 : 0)} stroke="white" strokeWidth={5} />
      <line x1={L - 18} x2={L + 18} y1={mid + 12 + (parallel ? 85 : 0)} y2={mid + 12 + (parallel ? 85 : 0)} stroke="white" strokeWidth={9} />
      <Lamp x={(L + R) / 2 - 120} y={T} />
      <Lamp x={(L + R) / 2 + 120} y={parallel ? mid : T} />
      {Array.from({ length: 14 }, (_, i) => {
        const path = parallel && i % 2 ? branch : outer;
        const [x, y] = along(flow + (i * loop) / 14, path);
        return <circle key={i} cx={x} cy={y} r={7} fill={c} filter="url(#soft)" />;
      })}
      {labels.slice(0, 3).map((l, i) => (
        <text key={i} x={R + 40} y={T + 30 + i * 44} fontSize={22} fill="rgb(255 255 255 / 0.85)" opacity={seg(progress, 0.3 + i * 0.1, 0.4 + i * 0.1)} style={BODY}>
          {`• ${l}`}
        </text>
      ))}
      <text x={L} y={B + 56} fontSize={20} letterSpacing={3} fill={c} style={BODY} fontWeight={700}>
        {parallel ? 'PARALLEL CIRCUIT' : 'SERIES CIRCUIT'}
      </text>
    </g>
  );
}

function Summary({ scene, progress, subject }: Props) {
  const c = color(subject);
  const bullets = scene.bullets.slice(0, 4);
  return (
    <g>
      <text x={W / 2} y={190} textAnchor="middle" fontSize={20} letterSpacing={5} fill={c} opacity={seg(progress, 0, 0.12)} style={BODY} fontWeight={700}>
        WHAT TO REMEMBER
      </text>
      {bullets.map((bullet, i) => {
        const a = seg(progress, 0.08 + i * 0.12, 0.22 + i * 0.12);
        const tick = seg(progress, 0.16 + i * 0.12, 0.28 + i * 0.12);
        const lines = wrap(bullet, 58).slice(0, 2);
        const y = 230 + i * 100;
        return (
          <g key={i} opacity={a} transform={`translate(${(1 - a) * -40} 0)`}>
            <rect x={180} y={y} width={920} height={84} rx={20} fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.1)" />
            <circle cx={226} cy={y + 42} r={20} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={2} />
            <path
              d={`M${215} ${y + 42} l8 8 l14 -16`}
              fill="none"
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={40}
              strokeDashoffset={40 * (1 - tick)}
            />
            {lines.map((l, j) => (
              <text key={j} x={266} y={y + (lines.length === 1 ? 52 : 38 + j * 30)} fontSize={26} fill="white" style={BODY} fontWeight={500}>
                {l}
              </text>
            ))}
          </g>
        );
      })}
    </g>
  );
}
