'use client';

import type { SubjectSlug } from '@/lib/types';
import { ALL_SUBJECTS, subjectNameWithCode, subjectTone } from '@/lib/subjects';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Badge, Panel, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

export type MapNode = {
  id: string;
  number: string;
  title: string;
  summary: string;
  slug: string;
  topicSlug: string;
  topicNumber: string;
  topicTitle: string;
  subject: SubjectSlug;
  prerequisites: string[];
  mastery: number | null;
  hasLesson: boolean;
};

const ROW_HEIGHT = 78;
const COLUMN_WIDTH = 132;
const NODE_WIDTH = 108;
const NODE_HEIGHT = 44;
const MARGIN_X = 24;
const MARGIN_Y = 40;

/**
 * Syllabus map.
 *
 * Rows are topics in syllabus order, columns are subtopics within a topic, and
 * curves are prerequisite links. Laying it out this way means the picture is
 * the syllabus structure — not an arbitrary force-directed blob.
 */
export function KnowledgeMap({ nodes, subject }: { nodes: MapNode[]; subject: SubjectSlug }) {
  const [selected, setSelected] = useState<MapNode | null>(null);

  const { positioned, width, height, edges } = useMemo(() => {
    const byTopic = new Map<string, MapNode[]>();
    for (const node of nodes) {
      const list = byTopic.get(node.topicNumber) ?? [];
      list.push(node);
      byTopic.set(node.topicNumber, list);
    }

    const topics = [...byTopic.keys()].sort((a, b) => Number(a) - Number(b));
    const positions = new Map<string, { x: number; y: number; node: MapNode }>();
    let maxColumns = 0;

    topics.forEach((topicNumber, row) => {
      const list = byTopic.get(topicNumber)!;
      maxColumns = Math.max(maxColumns, list.length);
      list.forEach((node, column) => {
        positions.set(node.number, {
          x: MARGIN_X + column * COLUMN_WIDTH,
          y: MARGIN_Y + row * ROW_HEIGHT,
          node,
        });
      });
    });

    const edgeList: { from: { x: number; y: number }; to: { x: number; y: number }; key: string }[] = [];
    for (const node of nodes) {
      for (const prerequisite of node.prerequisites) {
        const from = positions.get(prerequisite);
        const to = positions.get(node.number);
        if (!from || !to) continue;
        edgeList.push({
          key: `${prerequisite}-${node.number}`,
          from: { x: from.x + NODE_WIDTH / 2, y: from.y + NODE_HEIGHT },
          to: { x: to.x + NODE_WIDTH / 2, y: to.y },
        });
      }
    }

    return {
      positioned: [...positions.values()],
      edges: edgeList,
      width: MARGIN_X * 2 + maxColumns * COLUMN_WIDTH,
      height: MARGIN_Y * 2 + topics.length * ROW_HEIGHT,
    };
  }, [nodes]);

  const accent = `rgb(var(--${subjectTone(subject)}))`;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
      <div className="scroll-x rounded-panel border border-line bg-surface p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ minWidth: width }}
          className="h-auto w-full"
          role="img"
          aria-label={`Knowledge map for ${subject}`}
        >
          <defs>
            <marker id="map-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(var(--muted))" />
            </marker>
          </defs>

          {edges.map((edge) => {
            // A vertical-ish cubic keeps the curve readable even across rows.
            const midY = (edge.from.y + edge.to.y) / 2;
            return (
              <path
                key={edge.key}
                d={`M ${edge.from.x} ${edge.from.y} C ${edge.from.x} ${midY}, ${edge.to.x} ${midY}, ${edge.to.x} ${edge.to.y}`}
                fill="none"
                stroke="rgb(var(--muted))"
                strokeWidth={1.4}
                opacity={0.55}
                markerEnd="url(#map-arrow)"
              />
            );
          })}

          {positioned.map(({ x, y, node }) => {
            const isSelected = selected?.number === node.number;
            const mastery = node.mastery;
            return (
              <g
                key={node.number}
                transform={`translate(${x} ${y})`}
                onClick={() => setSelected(node)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setSelected(node);
                }}
                tabIndex={0}
                role="button"
                aria-label={`${node.number} ${node.title}`}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  rx={7}
                  fill={mastery !== null ? accent : 'rgb(var(--surface-2))'}
                  fillOpacity={mastery !== null ? 0.1 + (mastery / 100) * 0.35 : 1}
                  stroke={isSelected ? 'rgb(var(--accent))' : 'rgb(var(--border))'}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                />
                <text x={8} y={16} fontSize={9} fill="rgb(var(--muted))" fontFamily="monospace">
                  {node.number}
                </text>
                <text x={8} y={30} fontSize={10} fill="rgb(var(--text))">
                  {node.title.length > 17 ? `${node.title.slice(0, 16)}…` : node.title}
                </text>
                {mastery !== null && (
                  <text x={NODE_WIDTH - 8} y={16} fontSize={9} textAnchor="end" fill={accent} fontFamily="monospace">
                    {mastery}%
                  </text>
                )}
                {!node.hasLesson && <circle cx={NODE_WIDTH - 8} cy={34} r={3} fill="rgb(var(--caution))" />}
              </g>
            );
          })}
        </svg>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        {selected ? (
          <Panel className="p-4">
            <p className="font-mono text-xs text-ink-faint">{selected.number}</p>
            <h2 className="mt-1 text-base font-semibold text-ink">{selected.title}</h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              Topic {selected.topicNumber} · {selected.topicTitle}
            </p>
            <p className="mt-2.5 text-sm text-ink-muted">{selected.summary}</p>

            {selected.mastery !== null && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-faint">Your mastery</span>
                  <span className="font-mono text-ink">{selected.mastery}%</span>
                </div>
                <ProgressBar value={selected.mastery} className="mt-1.5" />
              </div>
            )}

            {selected.prerequisites.length > 0 && (
              <div className="mt-4">
                <p className="eyebrow mb-1.5">Review first</p>
                <ul className="space-y-1">
                  {selected.prerequisites.map((number) => {
                    const prerequisite = nodes.find((n) => n.number === number);
                    if (!prerequisite) return <li key={number} className="text-xs text-ink-faint">{number}</li>;
                    return (
                      <li key={number}>
                        <button
                          type="button"
                          onClick={() => setSelected(prerequisite)}
                          className="text-xs text-accent hover:underline"
                        >
                          {prerequisite.number} {prerequisite.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <Link
              href={`/learn/${selected.subject}/${selected.topicSlug}/${selected.slug}`}
              className={cn(
                'mt-4 inline-flex h-9 w-full items-center justify-center rounded-xl text-sm font-medium',
                'bg-ink text-page hover:opacity-90 dark:bg-accent dark:text-[rgb(var(--surface-0))]',
              )}
            >
              Open subtopic
            </Link>
          </Panel>
        ) : (
          <Panel className="p-4">
            <p className="text-sm text-ink-muted">
              Click any box to see what it covers, what you should review first, and your mastery score.
            </p>
          </Panel>
        )}

        <Panel className="p-4">
          <p className="eyebrow mb-2.5">Key</p>
          <ul className="space-y-2 text-xs text-ink-muted">
            <li className="flex items-center gap-2">
              <span className="h-3 w-6 rounded" style={{ background: accent, opacity: 0.45 }} />
              Darker fill means higher mastery
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-6 rounded border border-line bg-surface-raised" />
              Not started yet
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-caution" />
              Lesson still being written
            </li>
            <li className="flex items-center gap-2">
              <span className="text-ink-faint">↓</span>
              Arrow points from a prerequisite to what it unlocks
            </li>
          </ul>
        </Panel>

        <Panel className="p-4">
          <p className="eyebrow mb-2">Other subjects</p>
          {/* Lists every other syllabus rather than toggling between two, which
              left five subjects with no way to reach their map. */}
          <ul className="space-y-1.5">
            {ALL_SUBJECTS.filter((s) => s.slug !== subject).map(({ slug, display }) => (
              <li key={slug}>
                <Link href={`/map?subject=${slug}`} className="text-sm text-accent hover:underline">
                  {display.name} {display.code}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </aside>
    </div>
  );
}

export function MapLegendBadges({ subject }: { subject: SubjectSlug }) {
  return <Badge tone={subjectTone(subject)}>{subjectNameWithCode(subject)}</Badge>;
}
