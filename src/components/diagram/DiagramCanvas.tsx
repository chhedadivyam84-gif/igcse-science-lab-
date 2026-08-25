import type { DiagramNode, DiagramSpec } from '@/lib/types';

/**
 * Draws a DiagramSpec as SVG.
 *
 * Diagrams are data, not images, so they stay sharp at any size, respond to the
 * theme, and can be checked for accuracy by reading the spec.
 */

const TONES: Record<string, string> = {
  physics: 'rgb(var(--physics))',
  chemistry: 'rgb(var(--chemistry))',
  accent: 'rgb(var(--accent))',
  muted: 'rgb(var(--muted))',
  positive: 'rgb(var(--positive))',
  negative: 'rgb(var(--negative))',
  caution: 'rgb(var(--caution))',
};

function colour(tone?: string) {
  return TONES[tone ?? 'accent'] ?? TONES.accent;
}

export function DiagramCanvas({ spec, className }: { spec: DiagramSpec; className?: string }) {
  const markerIds = new Set(
    spec.nodes.filter((node) => node.kind === 'arrow').map((node) => node.tone ?? 'accent'),
  );

  return (
    <figure className={className}>
      <div className="scroll-x rounded-card border border-line bg-surface p-2">
        <svg
          viewBox={`0 0 ${spec.width} ${spec.height}`}
          className="h-auto w-full min-w-[36rem]"
          role="img"
          aria-label={`${spec.title}. ${spec.caption}`}
        >
          <defs>
            {[...markerIds].map((tone) => (
              <marker
                key={tone}
                id={`arrow-${tone}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={colour(tone)} />
              </marker>
            ))}
          </defs>

          {spec.nodes.map((node) => (
            <Node key={node.id} node={node} />
          ))}
        </svg>
      </div>

      <figcaption className="mt-3">
        <p className="text-sm font-medium text-ink">{spec.title}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{spec.caption}</p>
      </figcaption>
    </figure>
  );
}

function Node({ node }: { node: DiagramNode }) {
  const stroke = colour(node.tone);

  switch (node.kind) {
    case 'box':
      return (
        <g>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx={6}
            fill={stroke}
            fillOpacity={0.08}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {node.label && (
            <text
              x={node.x + node.w / 2}
              y={node.y + node.h / 2 + 4}
              textAnchor="middle"
              fontSize={13}
              fill="rgb(var(--text))"
            >
              {node.label}
            </text>
          )}
        </g>
      );

    case 'circle':
      return (
        <g>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={stroke}
            fillOpacity={node.label ? 0.12 : 0.06}
            stroke={stroke}
            strokeWidth={1.5}
          />
          {node.label && (
            <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize={12} fill="rgb(var(--text))">
              {node.label}
            </text>
          )}
        </g>
      );

    case 'line':
      return (
        <line
          x1={node.x1}
          y1={node.y1}
          x2={node.x2}
          y2={node.y2}
          stroke={stroke}
          strokeWidth={1.5}
          strokeDasharray={node.dashed ? '5 4' : undefined}
        />
      );

    case 'arrow': {
      const midX = (node.x1 + node.x2) / 2;
      const midY = (node.y1 + node.y2) / 2;
      return (
        <g>
          <line
            x1={node.x1}
            y1={node.y1}
            x2={node.x2}
            y2={node.y2}
            stroke={stroke}
            strokeWidth={1.8}
            markerEnd={`url(#arrow-${node.tone ?? 'accent'})`}
          />
          {node.label && (
            <text x={midX} y={midY - 7} textAnchor="middle" fontSize={11} fill={stroke}>
              {node.label}
            </text>
          )}
        </g>
      );
    }

    case 'label':
      return (
        <text
          x={node.x}
          y={node.y}
          textAnchor={node.anchor ?? 'start'}
          fontSize={12}
          fill={node.tone ? colour(node.tone) : 'rgb(var(--text))'}
        >
          {node.text}
        </text>
      );

    case 'coil': {
      // A vertical solenoid drawn as a run of half-circles.
      const step = node.h / node.turns;
      const path = Array.from({ length: node.turns }, (_, i) => {
        const y = node.y + i * step;
        return `M ${node.x} ${y} A ${node.w / 2} ${step / 2} 0 0 1 ${node.x} ${y + step}`;
      }).join(' ');
      return <path d={path} fill="none" stroke={stroke} strokeWidth={2.2} strokeLinecap="round" />;
    }

    case 'field': {
      const density = node.density ?? 5;
      const gap = node.h / (density + 1);
      return (
        <g opacity={0.55}>
          {Array.from({ length: density }, (_, i) => (
            <line
              key={i}
              x1={node.x}
              y1={node.y + gap * (i + 1)}
              x2={node.x + node.w}
              y2={node.y + gap * (i + 1)}
              stroke={stroke}
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          ))}
        </g>
      );
    }

    case 'wave': {
      // Sampled sine, 8 points per cycle is plenty at this scale.
      const samples = Math.max(48, node.cycles * 48);
      const points = Array.from({ length: samples + 1 }, (_, i) => {
        const t = i / samples;
        const x = node.x + t * node.w;
        const y = node.y - Math.sin(t * node.cycles * Math.PI * 2) * (node.h / 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      return <polyline points={points} fill="none" stroke={stroke} strokeWidth={2.2} strokeLinecap="round" />;
    }

    case 'curve': {
      const points = node.points.map(([x, y]) => `${x},${y}`).join(' ');
      return (
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={node.dashed ? '5 4' : undefined}
        />
      );
    }
  }
}

/** The explanation and key-terms panel that accompanies a diagram. */
export function DiagramNotes({ spec }: { spec: DiagramSpec }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {spec.explanation.length > 0 && (
        <div>
          <p className="eyebrow mb-2.5">How it works</p>
          <ol className="space-y-1.5">
            {spec.explanation.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm text-ink-muted">
                <span className="font-mono text-xs text-ink-faint">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {spec.keyTerms.length > 0 && (
        <div>
          <p className="eyebrow mb-2.5">Key terms</p>
          <dl className="space-y-2.5">
            {spec.keyTerms.map((term) => (
              <div key={term.term}>
                <dt className="text-sm font-medium text-ink">{term.term}</dt>
                <dd className="text-sm text-ink-muted">{term.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
