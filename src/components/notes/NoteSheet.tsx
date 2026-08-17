import { libraryDiagramByKey } from '@/lib/diagrams/library';
import { DiagramCanvas } from '@/components/diagram/DiagramCanvas';
import { cn } from '@/lib/utils';
import type { NoteBlock, NoteDoc, NoteStyle } from '@/lib/types';

/**
 * Renders a NoteDoc in one of five revision styles.
 *
 * The styles are genuinely different layouts rather than colour swaps: a
 * notebook has ruled lines and handwriting, a formula sheet leads with the
 * equations, a mind map arranges branches radially.
 */

export const NOTE_STYLES: { value: NoteStyle; label: string; description: string }[] = [
  { value: 'clean', label: 'Clean handwritten', description: 'Handwriting on plain paper. Easy to skim.' },
  { value: 'notebook', label: 'Notebook', description: 'Ruled lines and a margin, like a school exercise book.' },
  { value: 'revision', label: 'Revision sheet', description: 'Dense, highlighted, built for the night before.' },
  { value: 'mindmap', label: 'Mind map', description: 'Branches radiating from the central idea.' },
  { value: 'formula', label: 'Formula sheet', description: 'Equations first, everything else supporting.' },
];

export function NoteSheet({ doc, className }: { doc: NoteDoc; className?: string }) {
  const style = doc.style;
  const hand = style === 'clean' || style === 'notebook' || style === 'mindmap';

  // The formula sheet reorders blocks so equations lead.
  const blocks =
    style === 'formula'
      ? [...doc.blocks].sort((a, b) => rank(a) - rank(b))
      : doc.blocks;

  return (
    <article
      className={cn(
        'print-sheet relative overflow-hidden rounded-panel border border-line p-6 sm:p-8',
        style === 'notebook' ? 'bg-[rgb(var(--surface))]' : 'bg-surface',
        hand && 'font-hand',
        className,
      )}
    >
      {style === 'notebook' && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-ruled bg-ruled-line opacity-70"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-10 w-px bg-negative/30 sm:left-14"
            aria-hidden="true"
          />
        </>
      )}

      <div className={cn('relative', style === 'notebook' && 'pl-6 sm:pl-10')}>
        <header className="mb-6">
          <h2
            className={cn(
              'text-ink',
              hand ? 'text-3xl font-bold' : 'text-2xl font-semibold tracking-tight',
            )}
          >
            {doc.title}
          </h2>
          {doc.subtitle && (
            <p className={cn('mt-1 text-ink-muted', hand ? 'text-lg' : 'text-sm')}>{doc.subtitle}</p>
          )}
          <div className="mt-3 h-0.5 w-24 rounded-full bg-accent" />
        </header>

        <div className={cn('space-y-4', style === 'revision' && 'sm:columns-2 sm:gap-6 sm:space-y-0')}>
          {blocks.map((block, index) => (
            <div key={index} className={cn(style === 'revision' && 'mb-4 break-inside-avoid')}>
              <Block block={block} style={style} hand={hand} />
            </div>
          ))}
        </div>

        <footer className="mt-8 border-t border-line pt-3 text-xs text-ink-faint">
          <p className={hand ? 'font-sans' : undefined}>
            {doc.aiAssisted ? 'AI-assisted notes' : 'Assembled from the platform curriculum database'}
            {doc.sourceRefs.length > 0 && ` · grounded in syllabus ${doc.sourceRefs.join(', ')}`}. Check
            anything that matters against the official Cambridge syllabus.
          </p>
        </footer>
      </div>
    </article>
  );
}

function rank(block: NoteBlock) {
  if (block.type === 'formula') return 0;
  if (block.type === 'definition') return 1;
  if (block.type === 'heading') return 2;
  return 3;
}

function Block({ block, style, hand }: { block: NoteBlock; style: NoteStyle; hand: boolean }) {
  const body = hand ? 'text-lg leading-relaxed text-ink-muted' : 'text-sm leading-relaxed text-ink-muted';

  switch (block.type) {
    case 'heading':
      return (
        <h3 className={cn('mt-2 text-ink', hand ? 'text-2xl font-bold' : 'text-base font-semibold')}>
          <span className="bg-accent/15 px-1">{block.text}</span>
        </h3>
      );

    case 'text':
      return <p className={body}>{block.text}</p>;

    case 'bullets':
      return (
        <ul className={cn('space-y-1.5', body)}>
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-2.5">
              <span className="text-accent">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'definition':
      return (
        <div className="rounded-lg border-l-4 border-accent bg-accent/[0.06] px-3.5 py-2.5">
          <p className={cn('font-semibold text-ink', hand ? 'text-xl' : 'text-sm')}>{block.term}</p>
          <p className={cn('mt-0.5', body)}>{block.statement}</p>
        </div>
      );

    case 'formula':
      return (
        <div
          className={cn(
            'rounded-lg border-2 border-dashed border-physics/50 bg-physics/[0.07] px-4 py-3 text-center',
            style === 'formula' && 'border-solid',
          )}
        >
          <p className="font-mono text-lg font-semibold text-ink">{block.expression}</p>
          <p className="mt-1 font-sans text-xs text-ink-muted">
            {block.meaning}
            {block.unit ? ` · ${block.unit}` : ''}
          </p>
        </div>
      );

    case 'table':
      return (
        <div className="scroll-x">
          <table className="w-full min-w-[20rem] border-collapse text-sm">
            <thead>
              <tr>
                {block.headers.map((header, index) => (
                  <th
                    key={index}
                    className="border border-line bg-surface-raised px-2.5 py-1.5 text-left font-semibold text-ink"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-line px-2.5 py-1.5 text-ink-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout': {
      const tones = {
        tip: 'border-accent/40 bg-accent/[0.07] text-accent',
        warning: 'border-negative/40 bg-negative/[0.07] text-negative',
        exam: 'border-caution/40 bg-caution/[0.08] text-caution',
      };
      return (
        <div className={cn('rounded-lg border px-3.5 py-2.5', tones[block.tone])}>
          <p className="font-sans text-2xs font-bold uppercase tracking-wider">{block.title}</p>
          <p className={cn('mt-1', body)}>{block.text}</p>
        </div>
      );
    }

    case 'mindmap':
      return <MindMap centre={block.centre} branches={block.branches} />;

    case 'diagram': {
      const spec = libraryDiagramByKey(block.diagramKey);
      if (!spec) {
        return (
          <p className="rounded-lg border border-dashed border-line px-3 py-2 font-sans text-xs text-ink-faint">
            Diagram &ldquo;{block.diagramKey}&rdquo; is not in the checked library, so it has been left out
            rather than drawn incorrectly.
          </p>
        );
      }
      return <DiagramCanvas spec={spec} className="font-sans" />;
    }
  }
}

/** Radial mind map, drawn with CSS so it scales and prints cleanly. */
function MindMap({
  centre,
  branches,
}: {
  centre: string;
  branches: { label: string; leaves: string[] }[];
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-raised/40 p-4">
      <div className="mb-4 text-center">
        <span className="inline-block rounded-full bg-accent-sheen px-4 py-1.5 text-base font-bold text-page">
          {centre}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {branches.map((branch, index) => (
          <div key={index} className="relative rounded-lg border border-line bg-surface p-3">
            <p className="text-sm font-bold text-ink">{branch.label}</p>
            <ul className="mt-1.5 space-y-1">
              {branch.leaves.map((leaf, leafIndex) => (
                <li key={leafIndex} className="flex gap-2 text-sm text-ink-muted">
                  <span className="text-accent">•</span>
                  <span>{leaf}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
