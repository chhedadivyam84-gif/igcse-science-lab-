'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2, Mic, PhoneOff, Volume2 } from 'lucide-react';

import { useSpeech } from '@/hooks/useSpeech';
import { cn } from '@/lib/utils';

/**
 * Full-screen voice conversation.
 *
 * Modelled on the phone-call pattern: tap once, then just talk. There are no
 * buttons between turns — the loop runs itself.
 *
 *   listening → (silence) → thinking → speaking → listening …
 *
 * It keeps the assistant's ability to *act*: spoken commands still come back
 * with real, server-resolved links. When exactly one action is offered, the
 * agent asks out loud whether to open it and accepts a spoken yes, so it can
 * complete a task hands-free without ever navigating unasked.
 */

type Action = { kind: string; label: string; href: string };
type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';
type Turn = { role: 'student' | 'nova'; text: string };

const AFFIRMATIVE = /^(yes|yeah|yep|yes please|ok|okay|sure|go on|do it|open it|open|please do|go ahead)\b/i;
const NEGATIVE = /^(no|nope|not now|cancel|never mind|nevermind|stop)\b/i;

export function VoiceMode({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('idle');
  const [turns, setTurns] = useState<Turn[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Set when the agent has asked "shall I open it?" and is awaiting a yes.
  const offered = useRef<Action | null>(null);
  const phaseRef = useRef<Phase>('idle');
  const busy = useRef(false);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const handleTranscript = useCallback(
    async (text: string) => {
      if (busy.current) return;

      // Answering a "shall I open it?" question rather than asking something new.
      const pendingAction = offered.current;
      if (pendingAction) {
        if (AFFIRMATIVE.test(text.trim())) {
          offered.current = null;
          speech.stopListening();
          speech.speak('Opening it now.', () => {
            router.push(pendingAction.href);
            onClose();
          });
          return;
        }
        if (NEGATIVE.test(text.trim())) {
          offered.current = null;
          // Fall through and treat it as a normal turn.
        }
      }

      busy.current = true;
      offered.current = null;
      speech.stopListening();
      setTurns((current) => [...current, { role: 'student', text }]);
      setPhase('thinking');
      setActions([]);

      try {
        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            pathname,
            history: turns.slice(-6).map((t) => ({
              role: t.role === 'student' ? 'user' : 'assistant',
              content: t.text,
            })),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error ?? 'The assistant is unavailable.');
          setPhase('idle');
          busy.current = false;
          return;
        }

        const replyActions: Action[] = data.actions ?? [];
        setTurns((current) => [...current, { role: 'nova', text: data.reply }]);
        setActions(replyActions);
        setPhase('speaking');

        // If there is exactly one thing to do, ask for consent out loud so the
        // whole task can be finished without touching the screen.
        const single = replyActions.length === 1 ? replyActions[0] : null;
        const spoken = single ? `${data.reply} Shall I open ${single.label}?` : data.reply;
        if (single) offered.current = single;

        speech.speak(spoken, () => {
          busy.current = false;
          // Hand the microphone straight back — this is what makes it a
          // conversation rather than a series of separate questions.
          if (phaseRef.current !== 'idle') {
            setPhase('listening');
            speech.startListening();
          }
        });
      } catch {
        setError('Lost connection. Check your network.');
        setPhase('idle');
        busy.current = false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, turns, router, onClose],
  );

  const speech = useSpeech({ onFinalTranscript: handleTranscript });

  const begin = useCallback(() => {
    setError(null);
    setPhase('listening');
    speech.startListening();
  }, [speech]);

  const hangUp = useCallback(() => {
    speech.stopListening();
    speech.stopSpeaking();
    setPhase('idle');
    onClose();
  }, [speech, onClose]);

  /** Tapping the orb while it talks cuts it off and listens again. */
  const interrupt = useCallback(() => {
    if (phase === 'speaking') {
      speech.stopSpeaking();
      offered.current = null;
      busy.current = false;
      setPhase('listening');
      speech.startListening();
    }
  }, [phase, speech]);

  // Start the conversation as soon as the screen opens — tapping twice to begin
  // a call would be a strange thing to ask for.
  useEffect(() => {
    if (speech.support.recognition) begin();
    return () => {
      speech.stopListening();
      speech.stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.support.recognition]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hangUp();
      if (event.code === 'Space' && phaseRef.current === 'speaking') {
        event.preventDefault();
        interrupt();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hangUp, interrupt]);

  if (!speech.support.recognition) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgb(var(--surface-0))]/95 p-6 backdrop-blur-xl">
        <div className="max-w-sm text-center">
          <p className="text-lg font-semibold text-ink">Voice needs Chrome or Edge</p>
          <p className="mt-2 text-sm text-ink-muted">
            Speech recognition is not available in this browser. You can still type to NOVA.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 rounded-xl border border-line px-4 py-2 text-sm text-ink"
          >
            Back to typing
          </button>
        </div>
      </div>
    );
  }

  const last = turns[turns.length - 1];
  const caption =
    phase === 'listening'
      ? speech.interim || 'Listening…'
      : phase === 'thinking'
        ? 'Thinking…'
        : phase === 'speaking'
          ? last?.text ?? ''
          : 'Tap to start talking';

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[rgb(var(--surface-0))]/97 backdrop-blur-xl">
      {/* Ambient light that shifts with the state, so the phase is readable
          from across a desk without reading any text. */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-700',
          phase === 'listening' && 'bg-[radial-gradient(50%_40%_at_50%_45%,rgb(var(--positive)/0.16),transparent_70%)]',
          phase === 'thinking' && 'bg-[radial-gradient(50%_40%_at_50%_45%,rgb(var(--caution)/0.14),transparent_70%)]',
          phase === 'speaking' && 'bg-[radial-gradient(50%_40%_at_50%_45%,rgb(var(--accent)/0.18),transparent_70%)]',
        )}
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6">
        {/* The orb */}
        <button
          type="button"
          onClick={phase === 'speaking' ? interrupt : phase === 'idle' ? begin : undefined}
          aria-label={phase === 'speaking' ? 'Interrupt' : phase === 'idle' ? 'Start talking' : 'Listening'}
          className="relative flex h-48 w-48 items-center justify-center"
        >
          {(phase === 'listening' || phase === 'speaking') && (
            <>
              <span
                className={cn(
                  'absolute inset-0 animate-pulse-ring rounded-full',
                  phase === 'listening' ? 'bg-positive/25' : 'bg-accent/25',
                )}
              />
              <span
                className={cn(
                  'absolute inset-0 animate-pulse-ring rounded-full',
                  phase === 'listening' ? 'bg-positive/20' : 'bg-accent/20',
                )}
                style={{ animationDelay: '1s' }}
              />
            </>
          )}

          <span
            className={cn(
              'relative flex h-32 w-32 items-center justify-center rounded-full border transition-all duration-500 ease-spring',
              phase === 'idle' && 'border-line bg-surface',
              phase === 'listening' && 'scale-105 border-positive/50 bg-positive/15',
              phase === 'thinking' && 'border-caution/50 bg-caution/12',
              phase === 'speaking' && 'scale-110 border-accent/60 bg-accent/18',
            )}
          >
            {phase === 'thinking' ? (
              <Loader2 className="h-10 w-10 animate-spin text-caution" />
            ) : phase === 'speaking' ? (
              <Volume2 className="h-10 w-10 text-accent" />
            ) : (
              <Mic className={cn('h-10 w-10', phase === 'listening' ? 'text-positive' : 'text-ink-muted')} />
            )}
          </span>
        </button>

        {/* Caption */}
        <p className="mt-10 max-w-lg text-center text-lg leading-relaxed text-ink">{caption}</p>

        {phase === 'speaking' && (
          <p className="mt-3 text-xs text-ink-faint">Tap the orb or press space to interrupt</p>
        )}

        {/* Actions stay tappable — a spoken yes is offered, not required. */}
        {actions.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {actions.map((action) => (
              <Link
                key={action.href + action.label}
                href={action.href}
                onClick={hangUp}
                className="group flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/20"
              >
                {action.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-negative/30 bg-negative/10 px-4 py-2 text-sm text-negative">
            {error}
          </p>
        )}
      </div>

      {/* Hang up */}
      <div className="relative flex justify-center pb-12">
        <button
          type="button"
          onClick={hangUp}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-negative text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
          aria-label="End the conversation"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
