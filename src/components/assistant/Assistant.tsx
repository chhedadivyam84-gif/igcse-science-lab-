'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, AudioLines, Check, Copy, Send, Sparkles, Square, X } from 'lucide-react';

import { Button, Textarea } from '@/components/ui';
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
 * The reply streams in. Waiting for a finished answer made a fast model feel
 * slow, because nothing appeared until everything was ready; now the first
 * words land in about a second and the action buttons follow at the end.
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
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  /** True while the student is near the bottom, so auto-scroll never fights them. */
  const pinnedRef = useRef(true);

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

  // Only follow the stream while they are already at the bottom. Scrolling up to
  // re-read something and being yanked back down is the classic chat annoyance.
  useEffect(() => {
    if (pinnedRef.current) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, streaming]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  function stop() {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || streaming) return;

    setInput('');
    setError(null);
    pinnedRef.current = true;

    const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
    const replyId = `a-${Date.now()}`;

    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, role: 'user', content: question },
      { id: replyId, role: 'assistant', content: '', actions: [] },
    ]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, pathname, history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? 'The assistant is unavailable right now.');
        setMessages((current) => current.filter((m) => m.id !== replyId));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // Newline-delimited JSON: one complete object per line, so a chunk that
      // splits a line mid-way is held over rather than failing to parse.
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const raw of lines) {
          if (!raw.trim()) continue;
          let event: { type: string; text?: string; actions?: Action[]; error?: string };
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.type === 'delta' && event.text) {
            const delta = event.text;
            setMessages((current) =>
              current.map((m) => (m.id === replyId ? { ...m, content: m.content + delta } : m)),
            );
          } else if (event.type === 'actions') {
            const actions = event.actions ?? [];
            setMessages((current) =>
              current.map((m) => (m.id === replyId ? { ...m, actions } : m)),
            );
          } else if (event.type === 'error') {
            setError(event.error ?? 'The assistant stopped mid-answer.');
          }
        }
      }
    } catch (e) {
      // An aborted request is the student pressing stop, not a failure.
      if ((e as Error).name !== 'AbortError') {
        setError('Could not reach the assistant. Check your connection.');
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      // Drop the placeholder if nothing ever arrived.
      setMessages((current) =>
        current.filter((m) => !(m.id === replyId && m.role === 'assistant' && !m.content)),
      );
    }
  }

  async function copy(message: Message) {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);
      setTimeout(() => setCopiedId((id) => (id === message.id ? null : id)), 1500);
    } catch {
      /* clipboard blocked — nothing useful to say about it */
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
            className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col rounded-t-panel border border-line bg-surface shadow-float md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[26rem] md:rounded-none md:rounded-l-panel"
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
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      stop();
                      setMessages([]);
                      setError(null);
                    }}
                    className="rounded-lg px-2 py-1 text-2xs text-ink-faint transition-colors hover:bg-surface-raised hover:text-ink"
                  >
                    New chat
                  </button>
                )}
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

            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4"
            >
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

              {messages.map((message, index) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-sm bg-accent/12 px-3.5 py-2 text-sm text-ink">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div key={message.id} className="group space-y-2">
                    <div className="text-sm leading-relaxed text-ink">
                      <Formatted text={message.content} />
                      {/* Caret only on the message still being written. */}
                      {streaming && index === messages.length - 1 && (
                        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
                      )}
                    </div>

                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-col gap-1.5 pt-1">
                        {message.actions.map((action) => (
                          <Link
                            key={action.href + action.label}
                            href={action.href}
                            onClick={() => setOpen(false)}
                            className="group/action flex items-center justify-between gap-2 rounded-lg border border-accent/30 bg-accent/[0.07] px-3 py-2 text-sm text-accent transition-colors hover:bg-accent/15"
                          >
                            <span className="min-w-0 truncate">{action.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover/action:translate-x-0.5" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {message.content && !(streaming && index === messages.length - 1) && (
                      <button
                        type="button"
                        onClick={() => copy(message)}
                        className="flex items-center gap-1 text-2xs text-ink-faint opacity-0 transition-opacity hover:text-ink group-hover:opacity-100"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="h-3 w-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ),
              )}

              {/* Only shown before the first token — after that the text itself
                  is the progress indicator. */}
              {streaming && !messages[messages.length - 1]?.content && (
                <div className="flex gap-1" aria-label="Thinking">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
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
                  className="max-h-32 min-h-[2.5rem] flex-1 resize-none py-2"
                />
                {streaming ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    aria-label="Stop generating"
                    title="Stop"
                    onClick={stop}
                  >
                    <Square className="h-3.5 w-3.5" />
                  </Button>
                ) : input.trim() ? (
                  <Button type="submit" variant="primary" size="sm" aria-label="Send">
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
              <p className="mt-1.5 text-2xs text-ink-faint">
                Enter to send · Shift+Enter for a new line · ⌘J to close
              </p>
            </form>
          </aside>
        </>
      )}
    </>
  );
}

/**
 * Renders the small amount of markdown the assistant is allowed to use:
 * paragraphs, `**bold**` and simple bullets. Deliberately not a markdown
 * library — the prompt restricts the output, and a parser here would be more
 * surface area than the feature needs.
 */
function Formatted({ text }: { text: string }) {
  if (!text) return null;

  return (
    <>
      {text.split('\n').map((rawLine, index) => {
        const line = rawLine.trimEnd();
        if (!line.trim()) return <div key={index} className="h-2" />;

        const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
        const content = bullet ? bullet[1] : line;

        const parts = content.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          ),
        );

        return bullet ? (
          <div key={index} className={cn('flex gap-2', index > 0 && 'mt-1')}>
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
            <p>{parts}</p>
          </div>
        ) : (
          <p key={index} className={index > 0 ? 'mt-2' : undefined}>
            {parts}
          </p>
        );
      })}
    </>
  );
}
