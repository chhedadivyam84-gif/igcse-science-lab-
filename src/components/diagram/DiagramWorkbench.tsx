'use client';

import { useState } from 'react';
import { Shapes, Sparkles } from 'lucide-react';

import { DiagramCanvas, DiagramNotes } from './DiagramCanvas';
import { Badge, Button, EmptyState, ErrorState, Input, Notice, Panel, Skeleton } from '@/components/ui';
import type { DiagramSpec } from '@/lib/types';

export function DiagramWorkbench({
  library,
  aiConfigured,
}: {
  library: { key: string; title: string }[];
  aiConfigured: boolean;
}) {
  const [request, setRequest] = useState('');
  const [spec, setSpec] = useState<DiagramSpec | null>(null);
  const [source, setSource] = useState<'library' | 'generated' | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(text: string) {
    const value = text.trim();
    if (value.length < 4) {
      setError('Describe the diagram you want — for example “show how a transformer works”.');
      return;
    }

    setPending(true);
    setError(null);
    setSpec(null);

    try {
      const response = await fetch('/api/diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: value }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not build that diagram.');
        return;
      }
      setSpec(data.spec as DiagramSpec);
      setSource(data.source);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-6">
      <Panel>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            generate(request);
          }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={request}
              onChange={(event) => setRequest(event.target.value)}
              placeholder="Show how a transformer works"
              aria-label="Describe the diagram"
              className="flex-1"
            />
            <Button type="submit" variant="primary" loading={pending} className="sm:w-40">
              <Sparkles className="h-4 w-4" /> Generate
            </Button>
          </div>

          <div>
            <p className="eyebrow mb-2">Checked diagrams — drawn from verified data</p>
            <div className="flex flex-wrap gap-2">
              {library.map((entry) => (
                <button
                  key={entry.key}
                  type="button"
                  onClick={() => {
                    setRequest(entry.title);
                    generate(entry.title);
                  }}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
                >
                  {entry.title}
                </button>
              ))}
            </div>
          </div>
        </form>
      </Panel>

      <Notice tone="neutral">
        Diagrams are drawn as SVG from a structured specification rather than produced by an image
        model. That is deliberate: a scientific diagram with a mislabelled electrode is worse than no
        diagram at all. Requests matching the checked library always use the verified version.
      </Notice>

      {!aiConfigured && (
        <Notice tone="caution" title="AI model not connected">
          Only the checked library above is available. Add an API key to{' '}
          <code className="formula">.env</code> to generate diagrams for other topics.
        </Notice>
      )}

      {error && <ErrorState description={error} onRetry={() => generate(request)} />}
      {pending && <Skeleton className="h-80 w-full" />}

      {!pending && !spec && !error && (
        <EmptyState
          icon={<Shapes className="h-6 w-6" />}
          title="No diagram yet"
          description="Pick one of the checked diagrams, or describe what you want to see labelled."
        />
      )}

      {spec && !pending && (
        <Panel>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge tone={source === 'library' ? 'positive' : 'accent'}>
              {source === 'library' ? 'Checked diagram' : 'AI-generated layout'}
            </Badge>
            {spec.sourceRefs.length > 0 && <Badge tone="neutral">Syllabus {spec.sourceRefs.join(', ')}</Badge>}
          </div>

          <DiagramCanvas spec={spec} />

          <div className="mt-6 border-t border-line pt-5">
            <DiagramNotes spec={spec} />
          </div>

          {source === 'generated' && (
            <p className="mt-5 text-xs text-ink-faint">
              This layout was produced by the AI model and has not been checked by a person. Verify the
              labels before relying on it.
            </p>
          )}
        </Panel>
      )}
    </div>
  );
}
