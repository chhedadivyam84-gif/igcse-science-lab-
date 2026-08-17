import type { Metadata } from 'next';
import { PeriodicTable } from '@/components/tools/PeriodicTable';

export const metadata: Metadata = {
  title: 'Periodic table',
  description: 'Every element with the data IGCSE Chemistry actually needs, plus interactive trends.',
};

export default function PeriodicTablePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Chemistry 0620</p>
        <h1 className="font-display mt-2 text-4xl leading-[1.05] text-ink sm:text-5xl">
          The periodic table
        </h1>
        <p className="mt-3 text-ink-muted">
          Click any element for its data. Switch the colouring to see trends across periods and down
          groups.
        </p>
      </header>

      <PeriodicTable />
    </div>
  );
}
