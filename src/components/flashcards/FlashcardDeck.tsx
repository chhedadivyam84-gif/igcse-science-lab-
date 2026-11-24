'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Layers, Loader2, RotateCcw, Sparkles } from 'lucide-react';

import { Badge, Button, EmptyState, ErrorState, Panel, ProgressBar, Select, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ALL_SUBJECTS } from '@/lib/subjects';

type Card = {
  id: string;
  front: string;
  back: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  origin: string;
  subtopic: { number: string; title: string; slug: string; topicSlug: string; subjectSlug: string } | null;
  repetitions: number;
  isNew: boolean;
};

const RATINGS = [
  { value: 'again', label: 'Again', hint: 'No idea — show it soon', tone: 'border-negative/40 hover:bg-negative/10' },
  { value: 'hard', label: 'Hard', hint: 'Got there slowly', tone: 'border-caution/40 hover:bg-caution/10' },
  { value: 'good', label: 'Good', hint: 'Knew it', tone: 'border-accent/40 hover:bg-accent/10' },
  { value: 'easy', label: 'Easy', hint: 'Instant — leave it longer', tone: 'border-positive/40 hover:bg-positive/10' },
] as const;

type SubtopicOption = { id: string; number: string; title: string; subject: string };

export function FlashcardDeck({
  initialSubject,
  initialSubtopicId,
  subtopics = [],
}: {
  initialSubject?: string;
  initialSubtopicId?: string;
  subtopics?: SubtopicOption[];
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

  const maker = (
    <AiCardMaker
      subtopics={subtopics}
      initialSubject={subject || initialSubject || ''}
      initialSubtopicId={initialSubtopicId}
      onCards={(fresh) => {
        setError(null);
        setCards(fresh);
        setIndex(0);
        setFlipped(false);
        setReviewed([]);
      }}
    />
  );

  return (
    <div className="space-y-6">
      {maker}
      {renderDeck()}
    </div>
  );

  function renderDeck() {
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
          {/* Listed from ALL_SUBJECTS: hard-coding the two science options left
              Biology, Maths and ICT students unable to filter their own cards. */}
          <option value="">All subjects</option>
          {ALL_SUBJECTS.map(({ slug, display }) => (
            <option key={slug} value={slug}>
              {display.name}
            </option>
          ))}
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
            href={`/learn/${card.subtopic.subjectSlug}/${card.subtopic.topicSlug}/${card.subtopic.slug}`}
            className="text-accent hover:underline"
          >
            {card.subtopic.number} {card.subtopic.title}
          </Link>
        </p>
      )}
    </div>
  );
  }
}

/**
 * "Make new cards with AI": a fresh 60-card set for one subtopic, never
 * repeating what the deck already holds. The new cards are studied straight
 * away and stay in the deck for spaced repetition.
 */
function AiCardMaker({
  subtopics,
  initialSubject,
  initialSubtopicId,
  onCards,
}: {
  subtopics: SubtopicOption[];
  initialSubject: string;
  initialSubtopicId?: string;
  onCards: (cards: Card[]) => void;
}) {
  const startSubject =
    subtopics.find((s) => s.id === initialSubtopicId)?.subject || initialSubject || subtopics[0]?.subject || 'physics';
  const [subject, setSubject] = useState(startSubject);
  const inSubject = subtopics.filter((s) => s.subject === subject);
  const [subtopicId, setSubtopicId] = useState(initialSubtopicId ?? inSubject[0]?.id ?? '');
  const [focus, setFocus] = useState('');
  const [busy, setBusy] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [note, setNote] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!inSubject.some((s) => s.id === subtopicId)) setSubtopicId(inSubject[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  useEffect(() => {
    if (!busy) return;
    setSeconds(0);
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [busy]);

  async function generate() {
    if (!subtopicId || busy) return;
    setBusy(true);
    setNote(null);
    try {
      const response = await fetch('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtopicId, focus: focus.trim() || undefined, count: 60 }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setNote({ tone: 'error', text: data.error ?? 'Could not make cards right now.' });
        return;
      }
      const picked = subtopics.find((s) => s.id === subtopicId);
      setNote({
        tone: 'ok',
        text: `${data.added} new cards added to ${picked?.number} ${picked?.title}. This topic's deck now has ${data.deckSize} cards. Ask again any time for a different set.`,
      });
      onCards(data.cards as Card[]);
    } catch {
      setNote({ tone: 'error', text: 'Lost connection while making the cards.' });
    } finally {
      setBusy(false);
    }
  }

  if (!subtopics.length) return null;

  return (
    <Panel>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <p className="text-sm font-semibold text-ink">Make 60 new flashcards with AI</p>
        <Badge tone="accent">Pro</Badge>
      </div>
      <p className="mt-1 text-sm text-ink-muted">
        Pick a topic and NOVA writes a fresh set every time — never repeating cards already in that topic.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[10rem_1fr]">
        <Select value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject for new cards">
          {ALL_SUBJECTS.filter(({ slug }) => subtopics.some((s) => s.subject === slug)).map(({ slug, display }) => (
            <option key={slug} value={slug}>
              {display.name}
            </option>
          ))}
        </Select>
        <Select value={subtopicId} onChange={(e) => setSubtopicId(e.target.value)} aria-label="Topic for new cards">
          {inSubject.map((s) => (
            <option key={s.id} value={s.id}>
              {s.number} {s.title}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="Optional focus, e.g. transformers only"
          maxLength={160}
          className="h-10 flex-1 rounded-control border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
        <Button variant="primary" onClick={generate} disabled={busy || !subtopicId}>
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Writing cards… {seconds}s
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Make 60 cards
            </>
          )}
        </Button>
      </div>
      {note && (
        <p className={cn('mt-3 text-sm', note.tone === 'ok' ? 'text-positive' : 'text-negative')}>
          {note.text}{' '}
          {note.tone === 'error' && /pro|plan|upgrade|subscri/i.test(note.text) && (
            <Link href="/pricing" className="font-medium text-accent underline-offset-2 hover:underline">
              See Pro
            </Link>
          )}
        </p>
      )}
    </Panel>
  );
}
