'use client';

import type { SubjectSlug } from '@/lib/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Ear, Loader2, Mic, MicOff, RotateCcw, Square, Volume2 } from 'lucide-react';

import { Badge, Button, Notice, Panel, Select, Slider } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * The spoken tutor.
 *
 * ## Two decisions worth knowing about
 *
 * **Speech starts before the answer finishes.** The reply is streamed, and each
 * completed sentence is handed to the synthesiser as soon as it arrives rather
 * than waiting for the whole response. That turns a multi-second wait into
 * roughly one sentence of delay, which is the difference between a conversation
 * and a form submission.
 *
 * **The microphone stops while NOVA talks.** Left running, it hears the
 * synthesised voice through the speakers and transcribes the tutor talking to
 * itself. True barge-in needs echo cancellation on an audio pipeline this does
 * not have, so interruption is an explicit action instead: the Interrupt button,
 * or the spacebar. Honest and reliable beats clever and looping.
 */

type Status = 'idle' | 'listening' | 'thinking' | 'speaking';

type Turn = { id: string; role: 'student' | 'nova'; text: string };

/** Minimal shape of the browser SpeechRecognition object we rely on. */
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionLikeEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
};

type SpeechRecognitionLikeEvent = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};

/** Pause after the student stops talking before the turn is sent. */
const SILENCE_MS = 1100;

const QUICK_COMMANDS = [
  { label: 'Repeat that', phrase: 'Repeat that.' },
  { label: 'Simplify', phrase: "I don't get it. Explain that much more simply." },
  { label: 'Give an example', phrase: 'Give me a worked example.' },
  { label: 'Slower', phrase: 'Go slower, one idea at a time.' },
];

export function VoiceTutor({
  subject,
  topicHint,
}: {
  subject?: SubjectSlug;
  topicHint?: string;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [handsFree, setHandsFree] = useState(true);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceUri, setVoiceUri] = useState<string>('');
  const [rate, setRate] = useState(1);

  const recognitionRef = useRef<Recognition | null>(null);
  const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalRef = useRef('');
  const statusRef = useRef<Status>('idle');
  const handsFreeRef = useRef(handsFree);
  const speakQueue = useRef<string[]>([]);
  const speakingRef = useRef(false);
  const transcriptEnd = useRef<HTMLDivElement>(null);

  // Refs mirror state because the speech callbacks are registered once and
  // would otherwise close over stale values.
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);

  useEffect(() => {
    transcriptEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns, interim]);

  /* ---- capability detection ------------------------------------------- */
  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    setSupported(Boolean(Ctor) && 'speechSynthesis' in window);

    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const english = all.filter((v) => v.lang.toLowerCase().startsWith('en'));
      setVoices(english);
      setVoiceUri((current) => {
        if (current) return current;
        // Prefer a British voice: the curriculum, spelling and units are all UK.
        const preferred =
          english.find((v) => v.lang === 'en-GB' && /female|libby|sonia|hazel/i.test(v.name)) ??
          english.find((v) => v.lang === 'en-GB') ??
          english[0];
        return preferred?.voiceURI ?? '';
      });
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  /* ---- speech output --------------------------------------------------- */

  const speakNext = useCallback(() => {
    if (speakingRef.current) return;
    const next = speakQueue.current.shift();

    if (next === undefined) {
      speakingRef.current = false;
      // Queue drained. Hand the microphone back if we are hands-free.
      if (statusRef.current === 'speaking') {
        setStatus(handsFreeRef.current ? 'listening' : 'idle');
        if (handsFreeRef.current) startRecognition();
      }
      return;
    }

    speakingRef.current = true;
    const utterance = new SpeechSynthesisUtterance(next);
    const voice = voices.find((v) => v.voiceURI === voiceUri);
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? 'en-GB';
    utterance.rate = rate;
    utterance.pitch = 1;

    utterance.onend = () => {
      speakingRef.current = false;
      speakNext();
    };
    utterance.onerror = () => {
      speakingRef.current = false;
      speakNext();
    };

    window.speechSynthesis.speak(utterance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voices, voiceUri, rate]);

  const enqueueSpeech = useCallback(
    (sentence: string) => {
      const clean = sentence.trim();
      if (!clean) return;
      speakQueue.current.push(clean);
      speakNext();
    },
    [speakNext],
  );

  const stopSpeaking = useCallback(() => {
    speakQueue.current = [];
    speakingRef.current = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  /* ---- asking ---------------------------------------------------------- */

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text) return;

      stopRecognition();
      setInterim('');
      setError(null);
      setTurns((current) => [...current, { id: `s-${Date.now()}`, role: 'student', text }]);
      setStatus('thinking');

      const novaId = `n-${Date.now()}`;
      setTurns((current) => [...current, { id: novaId, role: 'nova', text: '' }]);

      try {
        const response = await fetch('/api/voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, conversationId, subject, topicHint }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ error: 'The voice tutor is unavailable.' }));
          setTurns((current) => current.filter((t) => t.id !== novaId));
          setError(data.error ?? 'The voice tutor is unavailable.');
          setStatus('idle');
          return;
        }

        const id = response.headers.get('X-Conversation-Id');
        if (id) setConversationId(id);

        setStatus('speaking');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let full = '';
        let pending = '';

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          full += chunk;
          pending += chunk;

          setTurns((current) => current.map((t) => (t.id === novaId ? { ...t, text: full } : t)));

          // Flush whole sentences to the synthesiser as they complete, so
          // speaking overlaps with the rest of the answer still arriving.
          const boundary = /[.!?…]["')\]]?\s/;
          let match = pending.match(boundary);
          while (match && match.index !== undefined) {
            const cut = match.index + match[0].length;
            enqueueSpeech(pending.slice(0, cut));
            pending = pending.slice(cut);
            match = pending.match(boundary);
          }
        }

        // Whatever is left after the last full stop.
        if (pending.trim()) enqueueSpeech(pending);
        if (!full.trim()) {
          setError('NOVA returned an empty answer. Try asking again.');
          setStatus('idle');
        }
      } catch {
        setError('Lost connection to the tutor. Check your network and try again.');
        setTurns((current) => current.filter((t) => t.id !== novaId));
        setStatus('idle');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversationId, subject, topicHint, enqueueSpeech],
  );

  /* ---- speech input ---------------------------------------------------- */

  const stopRecognition = useCallback(() => {
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
    silenceTimer.current = null;
    try {
      recognitionRef.current?.abort();
    } catch {
      // Already stopped; nothing to do.
    }
  }, []);

  const startRecognition = useCallback(() => {
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return;

    stopRecognition();
    finalRef.current = '';

    const recognition = new Ctor();
    recognition.lang = 'en-GB';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? '';
        if (result.isFinal) finalRef.current += `${transcript} `;
        else interimText += transcript;
      }
      setInterim(interimText);

      // Send once the student has been quiet for a moment.
      if (silenceTimer.current) clearTimeout(silenceTimer.current);
      silenceTimer.current = setTimeout(() => {
        const question = finalRef.current.trim() || interimText.trim();
        if (question) {
          finalRef.current = '';
          void ask(question);
        }
      }, SILENCE_MS);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone access was blocked. Allow it in your browser settings and try again.');
        setStatus('idle');
      } else if (event.error === 'no-speech') {
        // Common and harmless — the loop below restarts listening.
      }
    };

    recognition.onend = () => {
      // Chrome ends recognition on its own after a pause; restart while we are
      // still meant to be listening.
      if (statusRef.current === 'listening') {
        try {
          recognition.start();
        } catch {
          // Start can throw if it is already running; safe to ignore.
        }
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      // Ignore double-start.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ask, stopRecognition]);

  /* ---- controls -------------------------------------------------------- */

  const startConversation = useCallback(() => {
    setError(null);
    setStatus('listening');
    startRecognition();
  }, [startRecognition]);

  const stopEverything = useCallback(() => {
    stopRecognition();
    stopSpeaking();
    setInterim('');
    setStatus('idle');
  }, [stopRecognition, stopSpeaking]);

  const interrupt = useCallback(() => {
    stopSpeaking();
    if (handsFreeRef.current) {
      setStatus('listening');
      startRecognition();
    } else {
      setStatus('idle');
    }
  }, [stopSpeaking, startRecognition]);

  // Spacebar interrupts, the way a push-to-talk control would.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /input|textarea|select/i.test(target.tagName)) return;
      if (event.code === 'Space' && statusRef.current === 'speaking') {
        event.preventDefault();
        interrupt();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [interrupt]);

  useEffect(() => {
    return () => {
      stopRecognition();
      stopSpeaking();
    };
  }, [stopRecognition, stopSpeaking]);

  /* ---- render ---------------------------------------------------------- */

  if (supported === false) {
    return (
      <Notice tone="caution" title="This browser cannot do voice">
        Speech recognition needs Chrome, Edge or another Chromium browser. Firefox and Safari do not
        support it. The written tutor at <a href="/tutor">Ask NOVA</a> does everything this page does,
        just typed instead of spoken.
      </Notice>
    );
  }

  const statusMeta: Record<Status, { label: string; tone: 'neutral' | 'accent' | 'positive' | 'caution' }> = {
    idle: { label: 'Not listening', tone: 'neutral' },
    listening: { label: 'Listening', tone: 'positive' },
    thinking: { label: 'Thinking', tone: 'caution' },
    speaking: { label: 'Speaking', tone: 'accent' },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="min-w-0 space-y-5">
        {/* ---- The orb -------------------------------------------------- */}
        <Panel className="flex flex-col items-center justify-center py-10">
          <div className="relative flex h-40 w-40 items-center justify-center">
            {/* Rings pulse only while listening or speaking, so the state is
                readable across the room without looking at the label. */}
            {(status === 'listening' || status === 'speaking') && (
              <>
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/25" />
                <span
                  className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/20"
                  style={{ animationDelay: '0.8s' }}
                />
              </>
            )}
            <button
              type="button"
              onClick={status === 'idle' ? startConversation : status === 'speaking' ? interrupt : stopEverything}
              aria-label={
                status === 'idle'
                  ? 'Start talking to NOVA'
                  : status === 'speaking'
                    ? 'Interrupt NOVA'
                    : 'Stop the conversation'
              }
              className={cn(
                'relative flex h-28 w-28 items-center justify-center rounded-full border transition-all duration-300 ease-spring',
                status === 'idle' && 'border-line bg-surface hover:scale-105 hover:border-accent/50',
                status === 'listening' && 'border-positive/50 bg-positive/15 scale-105',
                status === 'thinking' && 'border-caution/50 bg-caution/10',
                status === 'speaking' && 'border-accent/60 bg-accent/15 scale-105',
              )}
            >
              {status === 'idle' && <Mic className="h-9 w-9 text-ink-muted" />}
              {status === 'listening' && <Ear className="h-9 w-9 text-positive" />}
              {status === 'thinking' && <Loader2 className="h-9 w-9 animate-spin text-caution" />}
              {status === 'speaking' && <Volume2 className="h-9 w-9 text-accent" />}
            </button>
          </div>

          <Badge tone={statusMeta[status].tone} className="mt-6">
            {statusMeta[status].label}
          </Badge>

          <p className="mt-3 h-5 max-w-md text-center text-sm text-ink-muted">
            {status === 'idle' && 'Tap the microphone and just start talking.'}
            {status === 'listening' && (interim || 'Go ahead — I am listening.')}
            {status === 'thinking' && 'Working out how to explain it…'}
            {status === 'speaking' && 'Press space or tap to interrupt.'}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {status === 'idle' ? (
              <Button variant="primary" onClick={startConversation}>
                <Mic className="h-4 w-4" /> Start talking
              </Button>
            ) : (
              <Button variant="secondary" onClick={stopEverything}>
                <MicOff className="h-4 w-4" /> Stop
              </Button>
            )}
            {status === 'speaking' && (
              <Button variant="secondary" onClick={interrupt}>
                <Square className="h-4 w-4" /> Interrupt
              </Button>
            )}
          </div>
        </Panel>

        {error && (
          <Notice tone="caution" title="Voice tutor problem">
            {error}
          </Notice>
        )}

        {/* ---- Quick commands ------------------------------------------- */}
        <div className="flex flex-wrap gap-2">
          {QUICK_COMMANDS.map((command) => (
            <button
              key={command.label}
              type="button"
              disabled={status === 'thinking'}
              onClick={() => {
                stopSpeaking();
                void ask(command.phrase);
              }}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-accent/40 hover:text-ink disabled:opacity-50"
            >
              {command.label}
            </button>
          ))}
        </div>

        {/* ---- Transcript ------------------------------------------------ */}
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <p className="eyebrow">Transcript</p>
            {turns.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTurns([]);
                  setConversationId(undefined);
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" /> New conversation
              </Button>
            )}
          </div>

          {turns.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-muted">
              Nothing yet. Try &ldquo;Explain refraction&rdquo; or &ldquo;Why does a transformer need
              a.c.?&rdquo;
            </p>
          ) : (
            <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
              {turns.map((turn) => (
                <div
                  key={turn.id}
                  className={cn('flex', turn.role === 'student' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2 text-sm',
                      turn.role === 'student'
                        ? 'rounded-br-sm bg-accent/12 text-ink'
                        : 'rounded-bl-sm bg-surface-raised text-ink',
                    )}
                  >
                    {turn.text || <span className="text-ink-faint">…</span>}
                  </div>
                </div>
              ))}
              <div ref={transcriptEnd} />
            </div>
          )}
        </Panel>
      </div>

      {/* ---- Settings ---------------------------------------------------- */}
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <Panel className="p-4">
          <p className="eyebrow mb-3">Voice</p>

          <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="voice-picker">
            NOVA sounds like
          </label>
          <Select
            id="voice-picker"
            value={voiceUri}
            onChange={(event) => setVoiceUri(event.target.value)}
            disabled={!voices.length}
          >
            {voices.length ? (
              voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))
            ) : (
              <option>Loading voices…</option>
            )}
          </Select>

          <div className="mt-4">
            <Slider
              label="Speaking speed"
              value={rate}
              min={0.7}
              max={1.4}
              step={0.05}
              onChange={setRate}
              format={(v) => `${v.toFixed(2)}×`}
            />
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={handsFree}
              onChange={(event) => setHandsFree(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[rgb(var(--accent))]"
            />
            <span>
              <span className="block text-ink">Hands-free</span>
              <span className="block text-xs">Starts listening again as soon as NOVA finishes.</span>
            </span>
          </label>
        </Panel>

        <Panel className="p-4">
          <p className="eyebrow mb-2.5">How to use it</p>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>Just talk — it sends automatically when you stop.</li>
            <li>Say &ldquo;repeat that&rdquo;, &ldquo;simplify&rdquo; or &ldquo;give me an example&rdquo;.</li>
            <li>Press space to interrupt while NOVA is talking.</li>
          </ul>
          <p className="mt-3 border-t border-line pt-3 text-xs text-ink-faint">
            The microphone pauses while NOVA speaks, so it does not transcribe her own voice through
            your speakers. Headphones make the whole thing feel smoother.
          </p>
        </Panel>
      </aside>
    </div>
  );
}
