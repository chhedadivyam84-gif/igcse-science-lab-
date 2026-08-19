'use client';

import type { SubjectSlug } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Copy, NotebookPen, Printer, Sparkles } from 'lucide-react';

import { NOTE_STYLES, NoteSheet } from './NoteSheet';
import { Badge, Button, EmptyState, ErrorState, Input, Notice, Panel, Skeleton } from '@/components/ui';
import { cn, relativeTime } from '@/lib/utils';
import type { NoteDoc, NoteStyle } from '@/lib/types';

type SavedNote = {
  id: string;
  title: string;
  style: string;
  createdAt: string;
  generatedBy: string;
  doc: NoteDoc | null;
};

export function NotesWorkbench({
  initialTopic,
  initialSubject,
  aiConfigured,
}: {
  initialTopic?: string;
  initialSubject?: SubjectSlug;
  aiConfigured: boolean;
}) {
  const [request, setRequest] = useState(initialTopic ?? '');
  const [style, setStyle] = useState<NoteStyle>('clean');
  const [doc, setDoc] = useState<NoteDoc | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedNote[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void loadSaved();
  }, []);

  async function loadSaved() {
    try {
      const response = await fetch('/api/notes?limit=12');
      if (response.ok) setSaved(await response.json());
    } catch {
      // Not fatal — the workbench still works without the history list.
    }
  }

  async function generate(text: string, noteStyle: NoteStyle) {
    const value = text.trim();
    if (value.length < 4) {
      setError('Say what the notes should cover — for example “electromagnetic induction”.');
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: value, style: noteStyle, subject: initialSubject }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not generate notes.');
        return;
      }
      setDoc(data.doc as NoteDoc);
      void loadSaved();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  /** Restyling reuses the loaded document rather than spending another request. */
  function restyle(next: NoteStyle) {
    setStyle(next);
    if (doc) setDoc({ ...doc, style: next });
  }

  async function copyAsText() {
    if (!doc) return;
    await navigator.clipboard.writeText(toPlainText(doc));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_17rem]">
      <div className="min-w-0 space-y-5">
        <Panel className="no-print">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              generate(request, style);
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={request}
                onChange={(event) => setRequest(event.target.value)}
                placeholder="Make notes on electromagnetic induction"
                aria-label="What the notes should cover"
                className="flex-1"
              />
              <Button type="submit" variant="primary" loading={pending} className="sm:w-40">
                <Sparkles className="h-4 w-4" /> Generate
              </Button>
            </div>

            <div>
              <p className="eyebrow mb-2">Style</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {NOTE_STYLES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => restyle(option.value)}
                    aria-pressed={style === option.value}
                    className={cn(
                      'rounded-card border px-3 py-2.5 text-left transition-all',
                      style === option.value
                        ? 'border-accent bg-accent/[0.07]'
                        : 'border-line hover:border-accent/40',
                    )}
                  >
                    <span className="block text-sm font-medium text-ink">{option.label}</span>
                    <span className="mt-0.5 block text-xs text-ink-muted">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </Panel>

        {!aiConfigured && (
          <Notice tone="caution" title="AI model not connected" className="no-print">
            Notes will be assembled directly from the curriculum database. They stay accurate, but they
            will be shorter and will not include generated prose.
          </Notice>
        )}

        {error && <ErrorState description={error} onRetry={() => generate(request, style)} />}

        {pending && <Skeleton className="h-96 w-full" />}

        {!pending && !doc && !error && (
          <EmptyState
            icon={<NotebookPen className="h-6 w-6" />}
            title="No notes generated yet"
            description="Name a topic and pick a style. Notes are built from the platform's curriculum database, so definitions and equations stay accurate."
          />
        )}

        {doc && !pending && (
          <>
            <div className="no-print flex flex-wrap items-center gap-2">
              <Badge tone={doc.aiAssisted ? 'accent' : 'caution'}>
                {doc.aiAssisted ? 'AI-assisted' : 'From curriculum database'}
              </Badge>
              {doc.sourceRefs.length > 0 && <Badge tone="neutral">Syllabus {doc.sourceRefs.join(', ')}</Badge>}
              <div className="ml-auto flex gap-2">
                <Button variant="secondary" size="sm" onClick={copyAsText}>
                  <Copy className="h-3.5 w-3.5" /> {copied ? 'Copied' : 'Copy text'}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => window.print()}>
                  <Printer className="h-3.5 w-3.5" /> Print / save as PDF
                </Button>
              </div>
            </div>

            <NoteSheet doc={doc} />

            <p className="no-print text-xs text-ink-faint">
              Export uses your browser&rsquo;s print dialog — choose &ldquo;Save as PDF&rdquo; as the
              destination. Only the note sheet is printed.
            </p>
          </>
        )}
      </div>

      <aside className="no-print space-y-4 lg:sticky lg:top-20 lg:self-start">
        <Panel className="p-4">
          <p className="eyebrow mb-3">Your notes</p>
          {saved.length ? (
            <ul className="space-y-1">
              {saved.map((note) => (
                <li key={note.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (note.doc) {
                        setDoc(note.doc);
                        setStyle(note.doc.style);
                        setRequest(note.title);
                      }
                    }}
                    className="w-full rounded-lg p-2 text-left transition-colors hover:bg-surface-raised"
                  >
                    <span className="block truncate text-sm text-ink">{note.title}</span>
                    <span className="block text-xs text-ink-faint">
                      {note.style} · {relativeTime(note.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">Generated notes are saved here automatically.</p>
          )}
        </Panel>
      </aside>
    </div>
  );
}

function toPlainText(doc: NoteDoc): string {
  const lines = [doc.title, doc.subtitle ?? '', ''];

  for (const block of doc.blocks) {
    switch (block.type) {
      case 'heading':
        lines.push('', block.text.toUpperCase());
        break;
      case 'text':
        lines.push(block.text);
        break;
      case 'bullets':
        lines.push(...block.items.map((item) => `- ${item}`));
        break;
      case 'definition':
        lines.push(`${block.term}: ${block.statement}`);
        break;
      case 'formula':
        lines.push(`${block.expression}  (${block.meaning}${block.unit ? `, ${block.unit}` : ''})`);
        break;
      case 'table':
        lines.push(block.headers.join(' | '), ...block.rows.map((row) => row.join(' | ')));
        break;
      case 'callout':
        lines.push(`[${block.title}] ${block.text}`);
        break;
      case 'mindmap':
        lines.push(block.centre);
        for (const branch of block.branches) {
          lines.push(`  ${branch.label}`, ...branch.leaves.map((leaf) => `    - ${leaf}`));
        }
        break;
      case 'diagram':
        lines.push(`[diagram: ${block.caption}]`);
        break;
    }
  }

  return lines.join('\n');
}
