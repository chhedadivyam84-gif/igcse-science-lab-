'use client';

import { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

import { RichText } from '@/components/content/RichText';
import { Badge, Button, ErrorState, Input, Notice, Panel, Skeleton } from '@/components/ui';

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Upload a photo of your work and get taught the method.
 *
 * The preview is a local object URL — the image is only sent when you press
 * the button, and it is not stored on the server.
 */
export function PhotoHelp({ aiConfigured }: { aiConfigured: boolean }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function choose(selected: File | null) {
    setError(null);
    setAnswer(null);
    if (preview) URL.revokeObjectURL(preview);

    if (!selected) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError('That image is over 5 MB. Take a smaller photo or crop it first.');
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function submit() {
    if (!file) return;
    setPending(true);
    setError(null);
    setAnswer(null);

    const form = new FormData();
    form.append('image', file);
    if (note.trim()) form.append('note', note.trim());

    try {
      const response = await fetch('/api/analyze', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not read that image.');
        return;
      }
      setAnswer(data.answer as string);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-5">
      <Notice tone="neutral" title="How this works">
        You get the method and the reasoning, plus a parallel worked example where that helps — not a
        finished answer to copy. If the photo shows an assessment you are being marked on, work through
        the explanation rather than transcribing it.
      </Notice>

      {!aiConfigured && (
        <Notice tone="caution" title="AI model not connected">
          Photo analysis needs a model with image support. Add an API key to{' '}
          <code className="formula">.env</code>, or type your question into Ask NOVA instead.
        </Notice>
      )}

      <Panel>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="sr-only"
          onChange={(event) => choose(event.target.files?.[0] ?? null)}
        />

        {preview ? (
          <div className="relative">
            {/* A plain img: the source is a local blob URL, not a remote asset. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="The work you uploaded"
              className="max-h-96 w-full rounded-card border border-line object-contain"
            />
            <button
              type="button"
              onClick={() => choose(null)}
              aria-label="Remove image"
              className="absolute right-2 top-2 rounded-full border border-line bg-surface p-1.5 text-ink-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-card border border-dashed border-line px-6 py-14 transition-colors hover:border-accent/40"
          >
            <Camera className="h-7 w-7 text-ink-faint" />
            <span className="mt-3 text-sm font-medium text-ink">Choose a photo</span>
            <span className="mt-1 text-xs text-ink-muted">
              Homework, a diagram, a calculation or your handwritten working · PNG, JPEG, WebP or GIF, up
              to 5 MB
            </span>
          </button>
        )}

        <div className="mt-4">
          <Input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Optional: what are you stuck on?"
            aria-label="What are you stuck on?"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" loading={pending} disabled={!file} onClick={submit}>
            <Upload className="h-4 w-4" /> Explain this
          </Button>
          {preview && (
            <Button variant="secondary" onClick={() => inputRef.current?.click()}>
              Choose a different photo
            </Button>
          )}
        </div>
      </Panel>

      {error && <ErrorState description={error} />}
      {pending && <Skeleton className="h-64 w-full" />}

      {answer && (
        <Panel>
          <div className="mb-3 flex items-center gap-2">
            <Badge tone="accent">AI-assisted</Badge>
            <span className="text-xs text-ink-faint">Check anything that matters against the syllabus.</span>
          </div>
          <RichText text={answer} />
        </Panel>
      )}
    </div>
  );
}
