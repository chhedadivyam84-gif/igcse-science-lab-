import type { Metadata } from 'next';
import { PhysicsCalculator } from '@/components/tools/PhysicsCalculator';

export const metadata: Metadata = {
  title: 'Physics calculator',
  description: 'Every IGCSE Physics equation, rearranged and solved with unit checking.',
};

export default function PhysicsCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl">
        <p className="eyebrow">Physics 0625</p>
        <h1 className="font-display mt-2 text-4xl leading-[1.05] text-ink sm:text-5xl">
          Physics calculator
        </h1>
        <p className="mt-3 text-ink-muted">
          Choose an equation, say which quantity you are after, and enter the rest. It rearranges,
          substitutes, converts prefixes and warns you when an answer is not physically possible.
        </p>
      </header>

      <PhysicsCalculator />
    </div>
  );
}
