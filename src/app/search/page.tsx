import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge, EmptyState, Panel } from '@/components/ui';
import type { SearchHit } from '@/app/api/search/route';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search lessons, definitions, formulae, simulations, questions and your own notes.',
};
export const dynamic = 'force-dynamic';

/**
 * Full-page search. The ⌘K palette covers quick lookups; this exists for
 * shareable URLs and for browsing a long result list.
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  let hits: SearchHit[] = [];
  if (query.length >= 2) {
    // Called through the API so the ranking logic lives in exactly one place.
    const { GET } = await import('@/app/api/search/route');
    const response = await GET(
      new Request(`http://internal/api/search?q=${encodeURIComponent(query)}&limit=20`),
    );
    if (response.ok) {
      const data = (await response.json()) as { hits: SearchHit[] };
      hits = data.hits;
    }
  }

  const grouped = hits.reduce<Record<string, SearchHit[]>>((acc, hit) => {
    (acc[hit.badge ?? 'Result'] ||= []).push(hit);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <p className="eyebrow">Search</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {query ? `Results for “${query}”` : 'Search everything'}
        </h1>
        {query && (
          <p className="mt-2 text-sm text-ink-muted">
            {hits.length} result{hits.length === 1 ? '' : 's'} across lessons, definitions, formulae,
            simulations, questions and your notes.
          </p>
        )}
      </header>

      <form action="/search" method="get" className="mb-8">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Try moment, mole, refraction, electrolysis…"
          aria-label="Search"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
        />
      </form>

      {!query ? (
        <EmptyState
          title="What are you looking for?"
          description="Search covers the whole syllabus database — every lesson, definition, equation, simulation and question, plus any notes you have generated."
        />
      ) : hits.length === 0 ? (
        <EmptyState
          title={`Nothing matched “${query}”`}
          description="Try a single keyword rather than a phrase, or ask NOVA directly — it can explain topics that are not indexed here."
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, groupHits]) => (
            <Panel key={group}>
              <p className="eyebrow mb-3">{group}</p>
              <ul className="space-y-1">
                {groupHits.map((hit, index) => (
                  <li key={`${hit.href}-${index}`}>
                    <Link
                      href={hit.href}
                      className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-surface-raised"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">{hit.title}</span>
                        <span className="block text-sm text-ink-muted">{hit.detail}</span>
                      </span>
                      {hit.subject && (
                        <Badge tone={hit.subject === 'physics' ? 'physics' : 'chemistry'}>
                          {hit.subject === 'physics' ? 'Physics' : 'Chemistry'}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
