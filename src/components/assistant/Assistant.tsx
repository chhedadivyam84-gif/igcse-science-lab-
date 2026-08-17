'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, AudioLines, Send, Sparkles, X } from 'lucide-react';

import { Button, Spinner, Textarea } from '@/components/ui';
import { VoiceMode } from './VoiceMode';
import { cn } from '@/lib/utils';

/**
 * The site-wide assistant.
 *
 * Distinct from /tutor by design: the tutor is a place you go to think, this is
 * a panel that follows you and knows which page you are on. It answers briefly
 * and — the part that makes it an assistant rather than a chat — offers real
 * actions, resolved server-side against the database so a link can never be
 * invented.
 *
 * It proposes; it never navigates on its own. Something that moved the page
 * under a student mid-revision would be hostile.
 */

type Action = { kind: string; label: string; href: string };
type Message = { id: string; role: 'user' | 'assistant'; content: string; actions?: Action[] };

const SUGGESTIONS = [
  'What should I revise today?',
  'Explain this page simply',
  'Test me on this topic',
  'Where am I weakest?',
];

export function Assistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Cmd/Ctrl+J opens it from anywhere, Escape closes.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, pending]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    setInput('');
    setError(null);
    setMessages((current) => [...current, { id: `u-${Date.now()}`, role: 'user', content: question }]);
    setPending(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          pathname,
          // A short window is enough for a side panel and keeps it quick.
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'The assistant is unavailable right now.');
        return;
      }

      setMessages((current) => [
        ...current,
        { id: `a-${Date.now()}`, role: 'assistant', content: data.reply, actions: data.actions ?? [] },
      ]);
    } catch {
      setError('Could not reach the assistant. Check your connection.');
    } finally {
      setPending(false);
    }
  }

  if (voiceOpen) return <VoiceMode onClose={() => setVoiceOpen(false)} />;

  return (
    <>
      {/* Launcher — sits above the mobile nav bar so it never overlaps it. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open NOVA assistant"
          className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent-sheen shadow-lift transition-transform duration-200 ease-spring hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
        >
          <Sparkles className="h-5 w-5 text-[rgb(var(--surface-0))]" />
        </button>
      )}

      {open && (
        <>
          {/* Backdrop only on small screens; on desktop the page stays usable. */}
          <div
            className="fixed inset-0 z-40 bg-[rgb(var(--surface-0))]/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <aside
            className="fixed inset-x-0 bottom-0 z-50 flex h-[80vh] flex-col rounded-t-panel border border-line bg-surface shadow-float md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[24rem] md:rounded-none md:rounded-l-panel"
            role="dialog"
            aria-label="NOVA assistant"
          >
            <header className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-sheen text-[10px] font-bold text-[rgb(var(--surface-0))]">
                  N
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">NOVA</p>
                  <p className="text-2xs text-ink-faint">Knows what page you are on</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setVoiceOpen(true);
                  }}
                  aria-label="Talk to NOVA instead of typing"
                  title="Voice conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-surface-raised hover:text-accent"
                >
                  <AudioLines className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-surface-raised hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div>
                  <p className="text-sm text-ink-muted">
                    Ask me anything, or about whatever you are looking at.
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => send(suggestion)}
                        className="rounded-lg border border-line px-3 py-2 text-left text-sm text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent/12 px-3 py-2 text-sm text-ink">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div key={message.id} className="space-y-2">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-ink">
                      {message.content}
                    </p>
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        {message.actions.map((action) => (
                          <Link
                            key={action.href + action.label}
                            href={action.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center justify-between gap-2 rounded-lg border border-accent/30 bg-accent/[0.07] px-3 py-2 text-sm text-accent transition-colors hover:bg-accent/15"
                          >
                            <span className="min-w-0 truncate">{action.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}

              {pending && (
                <div className="flex items-center gap-2 text-sm text-ink-faint">
                  <Spinner className="h-3.5 w-3.5" /> Thinking…
                </div>
              )}

              {error && (
                <p className="rounded-lg border border-negative/30 bg-negative/5 px-3 py-2 text-sm text-negative">
                  {error}
                </p>
              )}

              <div ref={endRef} />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="border-t border-line p-3"
            >
              <div className="flex items-end gap-2">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask NOVA…"
                  aria-label="Ask the assistant"
                  className="min-h-[2.5rem] flex-1 py-2"
                />
                {input.trim() ? (
                  <Button type="submit" variant="primary" size="sm" disabled={pending} aria-label="Send">
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  // With nothing typed, the button becomes the way into voice —
                  // the same swap ChatGPT makes, and it keeps the row to one control.
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    aria-label="Start a voice conversation"
                    onClick={() => {
                      setOpen(false);
                      setVoiceOpen(true);
                    }}
                  >
                    <AudioLines className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="mt-1.5 text-2xs text-ink-faint">⌘J to open or close</p>
            </form>
          </aside>
        </>
      )}
    </>
  );
}
