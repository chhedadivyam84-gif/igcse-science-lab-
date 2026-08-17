'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Badge, Spinner } from '@/components/ui';
import { ALL_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';
import type { SearchHit } from '@/app/api/search/route';

/**
 * Command palette. Searches pages instantly (they are known client-side) and
 * curriculum content through /api/search, debounced.
 */
export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const pageHits: SearchHit[] = query
    ? ALL_NAV.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      ).map((item) => ({
        kind: 'topic',
        title: item.label,
        detail: item.description,
        href: item.href,
        subject: null,
        badge: 'Page',
      }))
    : [];

  const results = [...pageHits, ...hits];

  useEffect(() => {
    if (open) {
      setActive(0);
      // Delay so the input exists before focusing.
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery('');
      setHits([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      setHits([]);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (response.ok) {
          const data = (await response.json()) as { hits: SearchHit[] };
          setHits(data.hits);
        }
      } catch {
        // Aborted or offline — the empty state already covers this.
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, open]);

  if (!open) return null;

  function go(hit: SearchHit) {
    onClose();
    router.push(hit.href);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[rgb(var(--surface-0))]/70 p-4 pt-[10vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-panel border border-line bg-surface shadow-lift animate-fade-up">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (event.key === 'Enter' && results[active]) {
                event.preventDefault();
                go(results[active]);
              }
            }}
            placeholder="Search lessons, definitions, formulae, simulations…"
            className="h-14 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-faint"
          />
          {loading && <Spinner className="h-4 w-4 text-ink-faint" />}
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink" aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <p className="px-3 py-8 text-center text-sm text-ink-muted">
              Type at least two characters. Try <span className="text-ink">moment</span>,{' '}
              <span className="text-ink">mole</span> or <span className="text-ink">refraction</span>.
            </p>
          ) : results.length === 0 && !loading ? (
            <p className="px-3 py-8 text-center text-sm text-ink-muted">
              Nothing matched “{query}”. Try a different word, or ask NOVA directly.
            </p>
          ) : (
            <ul>
              {results.map((hit, index) => (
                <li key={`${hit.kind}-${hit.href}-${index}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(hit)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      index === active ? 'bg-surface-raised' : 'hover:bg-surface-raised/60',
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{hit.title}</span>
                      <span className="block truncate text-xs text-ink-muted">{hit.detail}</span>
                    </span>
                    {hit.badge && (
                      <Badge
                        tone={hit.subject === 'physics' ? 'physics' : hit.subject === 'chemistry' ? 'chemistry' : 'neutral'}
                      >
                        {hit.badge}
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
