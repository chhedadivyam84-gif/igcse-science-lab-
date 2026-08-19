'use client';

import type { SubjectSlug } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Send, Square, Volume2, VolumeX } from 'lucide-react';

import { RichText } from '@/components/content/RichText';
import { Badge, Button, ErrorState, Notice, Textarea } from '@/components/ui';
import { TUTOR_MODES, TUTOR_MODE_META, type TutorMode } from '@/lib/types';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  grounding?: string[];
  aiAssisted?: boolean;
};

const SUGGESTIONS = [
  'Explain Newton’s laws.',
  'Why does pressure increase when temperature increases?',
  'Explain ionic bonding like I’m 12.',
  'Give me a difficult exam question on moments.',
  'Teach me electromagnetic induction from zero.',
];

export function TutorChat({
  initialMessages,
  conversationId: initialConversationId,
  topicHint,
  subject,
  aiConfigured,
}: {
  initialMessages: Message[];
  conversationId?: string;
  topicHint?: string;
  subject?: SubjectSlug;
  aiConfigured: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<TutorMode>('IGCSE');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState(initialConversationId);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  // Stop any narration when the component unmounts.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    setError(null);
    setInput('');
    const userMessage: Message = { id: `u-${Date.now()}`, role: 'user', content: question };
    const assistantId = `a-${Date.now()}`;
    setMessages((current) => [...current, userMessage, { id: assistantId, role: 'assistant', content: '' }]);
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ message: question, mode, conversationId, subject, topicHint }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'The tutor is unavailable right now.' }));
        setMessages((current) => current.filter((m) => m.id !== assistantId));
        setError(data.error ?? 'The tutor is unavailable right now.');
        return;
      }

      const newConversationId = response.headers.get('X-Conversation-Id');
      if (newConversationId) setConversationId(newConversationId);
      const grounding = safeParseRefs(response.headers.get('X-Grounding'));
      const aiAssisted = response.headers.get('X-AI-Assisted') !== 'false';

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let collected = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        collected += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((m) => (m.id === assistantId ? { ...m, content: collected, grounding, aiAssisted } : m)),
        );
      }
    } catch (caught) {
      if ((caught as Error).name !== 'AbortError') {
        setError('Lost connection to the tutor. Check your network and try again.');
        setMessages((current) => current.filter((m) => m.id !== assistantId || m.content));
      }
    } finally {
      setPending(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
    setPending(false);
  }

  function speak(text: string) {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }
    // Strip markdown so the narration does not read out asterisks and backticks.
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*`#_>|]/g, '').slice(0, 4000));
    utterance.rate = 1.02;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function toggleDictation() {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => never; webkitSpeechRecognition?: new () => never })
        .SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: new () => never }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Voice input is not supported in this browser. Chrome and Edge support it.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    // The constructor type is browser-specific; the shape we use is stable.
    const recognition = new SpeechRecognition() as unknown as {
      lang: string;
      interimResults: boolean;
      continuous: boolean;
      start: () => void;
      stop: () => void;
      onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
      onend: () => void;
      onerror: () => void;
    };

    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, i) => event.results[i][0].transcript).join(' ');
      setInput((current) => `${current} ${transcript}`.trim());
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col md:h-[calc(100vh-7rem)]">
      {/* Mode selector */}
      <div className="scroll-x mb-4 flex gap-2 pb-1">
        {TUTOR_MODES.map((value) => {
          const meta = TUTOR_MODE_META[value];
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              title={meta.hint}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-all',
                mode === value
                  ? 'border-accent bg-accent/10 font-medium text-accent'
                  : 'border-line text-ink-muted hover:text-ink',
              )}
            >
              {meta.label}
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-xs text-ink-muted">{TUTOR_MODE_META[mode].blurb}</p>

      {!aiConfigured && (
        <Notice tone="caution" title="AI model not connected" className="mb-4">
          NOVA will answer from the platform&rsquo;s curriculum database instead of generating a
          response. Add an API key to <code className="formula">.env</code> to enable full conversations.
        </Notice>
      )}

      {topicHint && (
        <div className="mb-4">
          <Badge tone="accent">Context: {topicHint}</Badge>
        </div>
      )}

      {/* Messages */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <div className="py-8">
            <h2 className="text-lg font-semibold text-ink">What would you like to understand?</h2>
            <p className="mt-1 text-sm text-ink-muted">
              NOVA answers from the platform&rsquo;s own curriculum, at Cambridge IGCSE level.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
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
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent/12 px-4 py-2.5 text-sm text-ink">
                {message.content}
              </div>
            </div>
          ) : (
            <div key={message.id} className="max-w-[92%]">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-sheen text-[10px] font-bold text-page">
                  N
                </span>
                <span className="text-xs font-medium text-ink-muted">NOVA</span>
                {message.aiAssisted === false && <Badge tone="caution">From curriculum database</Badge>}
                {speechSupported && message.content && (
                  <button
                    type="button"
                    onClick={() => speak(message.content)}
                    className="ml-auto text-ink-faint transition-colors hover:text-ink"
                    aria-label={speaking ? 'Stop reading aloud' : 'Read this answer aloud'}
                  >
                    {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>

              {message.content ? <RichText text={message.content} /> : <Thinking />}

              {message.grounding && message.grounding.length > 0 && (
                <p className="mt-2.5 text-xs text-ink-faint">
                  Grounded in syllabus {message.grounding.join(', ')}
                </p>
              )}
            </div>
          ),
        )}

        {error && <ErrorState description={error} />}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="mt-4 border-t border-line pt-4"
      >
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                send(input);
              }
            }}
            rows={2}
            placeholder={`Ask anything — ${TUTOR_MODE_META[mode].label} mode`}
            className="min-h-[3rem] flex-1"
            aria-label="Your question"
          />
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              variant={listening ? 'danger' : 'secondary'}
              onClick={toggleDictation}
              aria-label={listening ? 'Stop dictation' : 'Dictate your question'}
              title="Voice input (Chrome and Edge)"
            >
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            {pending ? (
              <Button type="button" variant="secondary" onClick={stop} aria-label="Stop generating">
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" variant="primary" disabled={!input.trim()} aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          Enter sends · Shift + Enter for a new line. Answers are AI-assisted — check anything that
          matters against the official syllabus.
        </p>
      </form>
    </div>
  );
}

/**
 * The waiting state.
 *
 * Reasoning models spend a long time before the first token — measured between
 * 6 and 30 seconds on the exam-technique prompts, and it varies run to run. Bare
 * dots for half a minute read as a hung page, so after a few seconds this says
 * what is actually happening and starts counting. An explained wait is a much
 * shorter-feeling wait than an unexplained one.
 */
function Thinking() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-2" role="status" aria-live="polite">
      <div className="flex items-center gap-2">
        <span className="flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-faint"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </span>
        {seconds >= 4 && (
          <span className="text-xs text-ink-faint">
            NOVA is working through it… {seconds}s
          </span>
        )}
      </div>
      {seconds >= 15 && (
        <p className="mt-1.5 text-xs text-ink-faint">
          Longer answers take a while to reason through. It is still going.
        </p>
      )}
    </div>
  );
}

function safeParseRefs(header: string | null): string[] {
  if (!header) return [];
  try {
    const parsed = JSON.parse(header);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
