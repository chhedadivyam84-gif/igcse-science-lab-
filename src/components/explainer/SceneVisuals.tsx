'use client';

import { DiagramCanvas } from '@/components/diagram/DiagramCanvas';
import type { StoryboardScene } from '@/lib/types';

/**
 * Scene visuals for the explainer player.
 *
 * Every scene is a pure function of `progress` (0 → 1) rather than a CSS
 * animation, so scrubbing, pausing and stepping all stay in sync with the
 * timeline instead of drifting.
 */
export function SceneVisual({ scene, progress }: { scene: StoryboardScene; progress: number }) {
  if (scene.visual === 'diagram' && scene.diagram) {
    return <DiagramCanvas spec={scene.diagram} className="w-full" />;
  }

  switch (scene.visual) {
    case 'particles':
      return <Particles progress={progress} />;
    case 'wave':
      return <Wave progress={progress} />;
    case 'circuit':
      return <Circuit progress={progress} />;
    case 'graph':
      return <Graph progress={progress} />;
    case 'intro':
      return <Intro progress={progress} title={scene.title} />;
    default:
      return <Summary progress={progress} bullets={scene.bullets} />;
  }
}

const VIEWBOX = '0 0 640 320';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={VIEWBOX} className="h-auto w-full rounded-card border border-line bg-surface" role="img">
      {children}
    </svg>
  );
}

function Intro({ progress, title }: { progress: number; title: string }) {
  const scale = 0.6 + Math.min(progress * 2, 1) * 0.4;
  return (
    <Frame>
      {[0, 1, 2].map((ring) => {
        const phase = (progress * 1.6 + ring * 0.33) % 1;
        return (
          <circle
            key={ring}
            cx={320}
            cy={160}
            r={30 + phase * 120}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth={1.5}
            opacity={(1 - phase) * 0.5}
          />
        );
      })}
      <circle cx={320} cy={160} r={34 * scale} fill="rgb(var(--accent))" opacity={0.9} />
      <text
        x={320}
        y={250}
        textAnchor="middle"
        fontSize={20}
        fill="rgb(var(--text))"
        opacity={Math.min(progress * 3, 1)}
      >
        {title}
      </text>
    </Frame>
  );
}

function Particles({ progress }: { progress: number }) {
  // Deterministic pseudo-random start positions keep the scene stable on replay.
  const particles = Array.from({ length: 26 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rx = seed / 233280;
    const ry = ((seed * 7) % 233280) / 233280;
    const speed = 0.6 + rx * 0.9;
    const x = 90 + ((rx * 460 + progress * 620 * speed) % 460);
    const y = 60 + ((ry * 200 + progress * 320 * speed) % 200);
    return { x, y, r: 5 + rx * 3 };
  });

  return (
    <Frame>
      <rect x={80} y={50} width={480} height={220} rx={8} fill="none" stroke="rgb(var(--border))" strokeWidth={2} />
      {particles.map((particle, index) => (
        <circle key={index} cx={particle.x} cy={particle.y} r={particle.r} fill="rgb(var(--chemistry))" opacity={0.8} />
      ))}
      <text x={320} y={296} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
        Particles in constant random motion
      </text>
    </Frame>
  );
}

function Wave({ progress }: { progress: number }) {
  const points = Array.from({ length: 121 }, (_, i) => {
    const t = i / 120;
    const x = 60 + t * 520;
    const y = 160 - Math.sin(t * Math.PI * 4 - progress * Math.PI * 4) * 60;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <Frame>
      <line x1={60} y1={160} x2={580} y2={160} stroke="rgb(var(--border))" strokeWidth={1} strokeDasharray="4 5" />
      <polyline points={points} fill="none" stroke="rgb(var(--physics))" strokeWidth={3} strokeLinecap="round" />
      <circle
        cx={60 + ((progress * 520) % 520)}
        cy={160 - Math.sin(((progress * 520) % 520 / 520) * Math.PI * 4 - progress * Math.PI * 4) * 60}
        r={7}
        fill="rgb(var(--accent))"
      />
      <text x={320} y={296} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
        Energy travels; each particle only oscillates
      </text>
    </Frame>
  );
}

function Circuit({ progress }: { progress: number }) {
  const path = [
    [140, 90],
    [500, 90],
    [500, 230],
    [140, 230],
  ];
  const perimeter = 2 * (360 + 140);

  function pointAt(distance: number) {
    let remaining = distance % perimeter;
    for (let i = 0; i < path.length; i++) {
      const [x1, y1] = path[i];
      const [x2, y2] = path[(i + 1) % path.length];
      const segment = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      if (remaining <= segment) {
        const t = remaining / segment;
        return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
      }
      remaining -= segment;
    }
    return path[0];
  }

  return (
    <Frame>
      <polygon
        points={path.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke="rgb(var(--physics))"
        strokeWidth={3}
      />
      <rect x={290} y={78} width={60} height={24} rx={4} fill="rgb(var(--surface-2))" stroke="rgb(var(--physics))" strokeWidth={2} />
      <rect x={130} y={148} width={20} height={44} rx={3} fill="rgb(var(--accent))" />
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = pointAt(progress * perimeter + (i * perimeter) / 12);
        return <circle key={i} cx={x} cy={y} r={5} fill="rgb(var(--accent))" opacity={0.85} />;
      })}
      <text x={320} y={296} textAnchor="middle" fontSize={13} fill="rgb(var(--muted))">
        Current is the same at every point in a series loop
      </text>
    </Frame>
  );
}

function Graph({ progress }: { progress: number }) {
  const samples = Math.max(2, Math.round(progress * 100));
  const points = Array.from({ length: samples }, (_, i) => {
    const t = i / 99;
    const x = 90 + t * 470;
    // A rate curve: fast at first, levelling off.
    const y = 260 - (1 - Math.exp(-t * 3.2)) * 190;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <Frame>
      <line x1={90} y1={40} x2={90} y2={260} stroke="rgb(var(--border))" strokeWidth={2} />
      <line x1={90} y1={260} x2={570} y2={260} stroke="rgb(var(--border))" strokeWidth={2} />
      <text x={80} y={36} textAnchor="end" fontSize={12} fill="rgb(var(--muted))">
        Volume
      </text>
      <text x={330} y={288} textAnchor="middle" fontSize={12} fill="rgb(var(--muted))">
        Time
      </text>
      <polyline points={points} fill="none" stroke="rgb(var(--positive))" strokeWidth={3} strokeLinecap="round" />
    </Frame>
  );
}

function Summary({ progress, bullets }: { progress: number; bullets: string[] }) {
  return (
    <Frame>
      <rect x={60} y={40} width={520} height={240} rx={12} fill="rgb(var(--surface-2))" />
      {bullets.map((bullet, index) => {
        const appear = Math.min(1, Math.max(0, progress * bullets.length - index));
        return (
          <g key={index} opacity={appear}>
            <circle cx={96} cy={86 + index * 46} r={5} fill="rgb(var(--accent))" />
            <text x={116} y={91 + index * 46} fontSize={15} fill="rgb(var(--text))">
              {bullet.length > 58 ? `${bullet.slice(0, 58)}…` : bullet}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}
