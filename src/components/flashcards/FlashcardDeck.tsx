'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Layers, RotateCcw } from 'lucide-react';

import { Badge, Button, EmptyState, ErrorState, Panel, ProgressBar, Select, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

type Card = {
  id: string;
  front: string;
  back: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  origin: string;
  subtopic: { number: string; title: string; slug: string; topicSlug: string } | null;
  repetitions: number;
  isNew: boolean;
};

const RATINGS = [
  { value: 'again', label: 'Again', hint: 'No idea — show it soon', tone: 'border-negative/40 hover:bg-negative/10' },
  { value: 'hard', label: 'Hard', hint: 'Got there slowly', tone: 'border-caution/40 hover:bg-caution/10' },
  { value: 'good', label: 'Good', hint: 'Knew it', tone: 'border-accent/40 hover:bg-accent/10' },
  { value: 'easy', label: 'Easy', hint: 'Instant — leave it longer', tone: 'border-positive/40 hover:bg-positive/10' },
] as const;

export function FlashcardDeck({
  initialSubject,
  initialSubtopicId,
}: {
  initialSubject?: string;
  initialSubtopicId?: string;
}) {
  const [subject, setSubject] = useState(initialSubject ?? '');
  const [difficulty, setDifficulty] = useState('');
  const [cards, setCards] = useState<Card[] | null>(null);
  const [dueCount, setDueCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<{ rating: string }[]>([]);

  const load = useCallback(async () => {
    setCards(null);
    setError(null);
    setIndex(0);
    setFlipped(false);
    setReviewed([]);

    const params = new URLSearchParams({ limit: '20' });
    if (subject) params.set('subject', subject);
    if (difficulty) params.set('difficulty', difficulty);
    if (initialSubtopicId) params.set('subtopicId', initialSubtopicId);

    try {
      const response = await fetch(`/api/flashcards?${params}`);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not load cards.');
        return;
      }
      setCards(data.cards as Card[]);
      setDueCount(data.dueCount as number);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    }
  }, [subject, difficulty, initialSubtopicId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Space flips, 1–4 rate. Keyboard use makes a deck genuinely fast.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!cards?.length) return;
      if (event.code === 'Space') {
        event.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && ['1', '2', '3', '4'].includes(event.key)) {
        void rate(RATINGS[Number(event.key) - 1].value);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, flipped, index]);

  async function rate(rating: string) {
    const card = cards?.[index];
    if (!card) return;

    setReviewed((current) => [...current, { rating }]);
    setFlipped(false);
    setIndex((i) => i + 1);

    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flashcardId: card.id, rating }),
      });
    } catch {
      // The local session continues either way; the schedule syncs next load.
    }
  }

  if (error) return <ErrorState description={error} onRetry={load} />;
  if (cards === null) return <Skeleton className="h-80 w-full" />;

  if (!cards.length) {
    return (
      <EmptyState
        icon={<Layers className="h-6 w-6" />}
        title="No cards for that filter"
        description="Try a different subject or difficulty, or open a subtopic and generate cards from its lesson."
        action={
          <Button variant="secondary" onClick={load}>
            Reload
          </Button>
        }
      />
    );
  }

  if (index >= cards.length) {
    const counts = RATINGS.map((rating) => ({
      ...rating,
      count: reviewed.filter((r) => r.rating === rating.value).length,
    }));

    return (
      <Panel>
        <p className="eyebrow">Deck complete</p>
        <h2 className="mt-1.5 text-2xl font-semibold text-ink">{reviewed.length} cards reviewed</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {counts.map((entry) => (
            <li key={entry.value} className="rounded-card border border-line p-3">
              <p className="text-2xs uppercase tracking-wide text-ink-faint">{entry.label}</p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums text-ink">{entry.count}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">
          Cards you found hard will come back sooner. Anything you marked easy will not reappear for a
          while.
        </p>
        <Button variant="primary" className="mt-5" onClick={load}>
          <RotateCcw className="h-4 w-4" /> Another deck
        </Button>
      </Panel>
    );
  }

  const card = cards[index];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={subject} onChange={(event) => setSubject(event.target.value)} aria-label="Subject" className="w-40">
          <option value="">Both subjects</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </Select>
        <Select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          aria-label="Difficulty"
          className="w-36"
        >
          <option value="">Any difficulty</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </Select>
        <span className="text-sm text-ink-muted">{dueCount} due today</span>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-ink-muted">
          <span>
            Card {index + 1} of {cards.length}
          </span>
          <span className="text-ink-faint">{card.isNew ? 'New card' : `Seen ${card.repetitions}×`}</span>
        </div>
        <ProgressBar value={(index / cards.length) * 100} />
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full text-left"
        aria-label={flipped ? 'Show the question' : 'Show the answer'}
      >
        <div
          className={cn(
            'flex min-h-[16rem] flex-col justify-center rounded-panel border p-8 transition-all duration-300 ease-spring',
            flipped ? 'border-accent/40 bg-accent/[0.05]' : 'border-line bg-surface',
          )}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone={flipped ? 'accent' : 'neutral'}>{flipped ? 'Answer' : 'Question'}</Badge>
            <Badge
              tone={card.difficulty === 'HARD' ? 'negative' : card.difficulty === 'EASY' ? 'positive' : 'neutral'}
            >
              {card.difficulty.toLowerCase()}
            </Badge>
            {card.subtopic && <span className="text-xs text-ink-faint">{card.subtopic.number}</span>}
          </div>
          <p className="text-xl leading-relaxed text-ink sm:text-2xl">{flipped ? card.back : card.front}</p>
          {!flipped && <p className="mt-6 text-xs text-ink-faint">Click the card or press Space to flip</p>}
        </div>
      </button>

      {flipped ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RATINGS.map((rating, i) => (
            <button
              key={rating.value}
              type="button"
              onClick={() => rate(rating.value)}
              className={cn(
                'rounded-card border bg-surface px-3 py-3 text-center transition-colors',
                rating.tone,
              )}
            >
              <span className="block text-sm font-medium text-ink">{rating.label}</span>
              <span className="mt-0.5 block text-xs text-ink-faint">{rating.hint}</span>
              <span className="mt-1 block font-mono text-2xs text-ink-faint">{i + 1}</span>
            </button>
          ))}
        </div>
      ) : (
        <Button variant="primary" className="w-full" onClick={() => setFlipped(true)}>
          Show answer
        </Button>
      )}

      {card.subtopic && (
        <p className="text-center text-sm text-ink-muted">
          From{' '}
          <Link
            href={`/learn/${subject || 'physics'}/${card.subtopic.topicSlug}/${card.subtopic.slug}`}
            className="text-accent hover:underline"
          >
            {card.subtopic.number} {card.subtopic.title}
          </Link>
        </p>
      )}
    </div>
  );
}
