import type { Metadata } from 'next';
import { MoleCalculator } from '@/components/tools/MoleCalculator';

export const metadata: Metadata = {
  title: 'Mole calculator',
  description: 'Moles, concentration, gas volume, empirical formulae and yield — with full working.',
};

export default function MoleCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Chemistry 0620</p>
        <h1 className="font-display mt-2 text-4xl leading-[1.05] text-ink sm:text-5xl">
          Mole calculator
        </h1>
        <p className="mt-3 text-ink-muted">
          Every calculation shows the formula, the substitution and the units — laid out the way an
          examiner wants to see it, not just an answer.
        </p>
      </header>

      <MoleCalculator />
    </div>
  );
}
