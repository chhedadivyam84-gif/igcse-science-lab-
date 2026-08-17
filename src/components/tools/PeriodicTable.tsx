'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Badge, Input, Panel, Select } from '@/components/ui';
import {
  CATEGORY_HUES,
  CATEGORY_LABELS,
  electronConfiguration,
  elements,
  igcseAr,
  type Element,
  type ElementCategory,
} from '@/lib/elements';
import { cn } from '@/lib/utils';

type Trend = 'none' | 'mass' | 'group' | 'state' | 'metal';

const TRENDS: { value: Trend; label: string; description: string }[] = [
  { value: 'none', label: 'Category', description: 'Coloured by the family each element belongs to.' },
  { value: 'mass', label: 'Relative atomic mass', description: 'Darker means heavier. Mass increases across and down.' },
  { value: 'group', label: 'Outer-shell electrons', description: 'Group number equals the number of outer-shell electrons.' },
  { value: 'state', label: 'State at room temperature', description: 'Almost everything is solid; only a handful are liquid or gas.' },
  { value: 'metal', label: 'Metal or non-metal', description: 'Metals to the left, non-metals to the right, metalloids on the staircase.' },
];

const NON_METAL: ElementCategory[] = ['nonmetal', 'halogen', 'noble-gas'];

export function PeriodicTable() {
  const [query, setQuery] = useState('');
  const [trend, setTrend] = useState<Trend>('none');
  const [selected, setSelected] = useState<Element | null>(elements[10]); // sodium

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      elements
        .filter(
          (element) =>
            element.name.toLowerCase().includes(q) ||
            element.symbol.toLowerCase() === q ||
            element.symbol.toLowerCase().startsWith(q) ||
            String(element.number) === q,
        )
        .map((element) => element.number),
    );
  }, [query]);

  const maxMass = Math.max(...elements.map((element) => element.mass));

  function cellStyle(element: Element): React.CSSProperties {
    if (trend === 'mass') {
      const intensity = 0.12 + (element.mass / maxMass) * 0.65;
      return { background: `hsl(200 70% 45% / ${intensity})`, borderColor: `hsl(200 70% 45% / 0.5)` };
    }
    if (trend === 'group') {
      const outer = element.shells[element.shells.length - 1];
      return {
        background: `hsl(${260 - outer * 22} 70% 50% / 0.3)`,
        borderColor: `hsl(${260 - outer * 22} 70% 50% / 0.55)`,
      };
    }
    if (trend === 'state') {
      const hue = element.state === 'gas' ? 200 : element.state === 'liquid' ? 150 : 30;
      return { background: `hsl(${hue} 65% 48% / 0.28)`, borderColor: `hsl(${hue} 65% 48% / 0.5)` };
    }
    if (trend === 'metal') {
      const hue = NON_METAL.includes(element.category) ? 130 : element.category === 'metalloid' ? 45 : 210;
      return { background: `hsl(${hue} 65% 48% / 0.28)`, borderColor: `hsl(${hue} 65% 48% / 0.5)` };
    }
    const hue = CATEGORY_HUES[element.category];
    return { background: `hsl(${hue} 65% 50% / 0.22)`, borderColor: `hsl(${hue} 65% 50% / 0.45)` };
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="element-search">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input
              id="element-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, symbol or proton number"
              className="pl-9"
            />
          </div>
        </div>
        <div className="sm:w-64">
          <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="trend">
            Colour by
          </label>
          <Select id="trend" value={trend} onChange={(event) => setTrend(event.target.value as Trend)}>
            {TRENDS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <p className="text-xs text-ink-muted">{TRENDS.find((t) => t.value === trend)?.description}</p>

      {/* The table scrolls inside its own box so the page never moves sideways. */}
      <div className="scroll-x">
        <div
          className="grid min-w-[62rem] gap-[3px]"
          style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
          role="grid"
          aria-label="Periodic table of the elements"
        >
          {elements.map((element) => {
            const dimmed = matches !== null && !matches.has(element.number);
            const isSelected = selected?.number === element.number;

            return (
              <button
                key={element.number}
                type="button"
                onClick={() => setSelected(element)}
                aria-label={`${element.name}, proton number ${element.number}`}
                aria-pressed={isSelected}
                style={{
                  gridColumn: element.x,
                  gridRow: element.y,
                  ...cellStyle(element),
                }}
                className={cn(
                  'flex aspect-square flex-col items-center justify-center rounded border p-0.5 transition-all',
                  dimmed ? 'opacity-20' : 'hover:z-10 hover:scale-110',
                  isSelected && 'ring-2 ring-accent ring-offset-1 ring-offset-[rgb(var(--bg))]',
                )}
              >
                <span className="text-[7px] leading-none text-ink-muted">{element.number}</span>
                <span className="text-[11px] font-bold leading-tight text-ink">{element.symbol}</span>
              </button>
            );
          })}

          {/* Spacer rows separating the f-block, mirroring how the table is printed. */}
          <div style={{ gridColumn: '1 / -1', gridRow: 8, height: 8 }} aria-hidden="true" />
        </div>
      </div>

      {selected && <ElementDetail element={selected} />}
    </div>
  );
}

function ElementDetail({ element }: { element: Element }) {
  const outer = element.shells[element.shells.length - 1];

  return (
    <Panel>
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div
          className="flex h-32 w-32 flex-col items-center justify-center rounded-panel border"
          style={{
            background: `hsl(${CATEGORY_HUES[element.category]} 65% 50% / 0.18)`,
            borderColor: `hsl(${CATEGORY_HUES[element.category]} 65% 50% / 0.4)`,
          }}
        >
          <span className="text-xs text-ink-muted">{element.number}</span>
          <span className="text-4xl font-bold text-ink">{element.symbol}</span>
          <span className="mt-1 font-mono text-xs text-ink-muted">{igcseAr(element)}</span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-ink">{element.name}</h2>
            <Badge tone="neutral">{CATEGORY_LABELS[element.category]}</Badge>
            <Badge tone={element.state === 'gas' ? 'accent' : element.state === 'liquid' ? 'positive' : 'neutral'}>
              {element.state} at r.t.p.
            </Badge>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            <Item label="Proton number" value={element.number} />
            {/* Both values are shown because stoichiometry answers are marked
                against the data-sheet figure, not the precise one. */}
            <Item label="Ar (IGCSE data sheet)" value={igcseAr(element)} />
            <Item label="Precise relative atomic mass" value={element.mass} />
            <Item label="Group" value={element.igcseGroup ?? '(d-block / f-block)'} />
            <Item label="Period" value={element.period} />
            <Item label="Protons / electrons" value={`${element.number} / ${element.number}`} />
            <Item label="Electronic configuration" value={electronConfiguration(element)} />
            {element.number <= 20 && <Item label="Outer-shell electrons" value={outer} />}
          </dl>

          {element.configurationSource === 'derived' && (
            <p className="mt-3 text-xs text-ink-faint">
              This configuration is derived from Aufbau filling order rather than stored explicitly.
              Cambridge IGCSE only requires configurations up to proton number 20, where the values are
              exact.
            </p>
          )}

          {element.notes && (
            <div className="mt-4 rounded-card border border-accent/25 bg-accent/[0.06] p-3.5">
              <p className="text-2xs uppercase tracking-wide text-accent">For IGCSE</p>
              <p className="mt-1 text-sm text-ink-muted">{element.notes}</p>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

function Item({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="mt-0.5 font-mono text-sm text-ink">{value}</dd>
    </div>
  );
}
