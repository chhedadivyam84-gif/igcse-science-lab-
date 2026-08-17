'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Browser speech input and output.
 *
 * Two behaviours here are deliberate and worth keeping:
 *
 * **Speaking is sentence-chunked.** Text is fed to the synthesiser a sentence at
 * a time as it arrives, so a streamed reply starts being spoken after the first
 * full stop rather than after the last one.
 *
 * **The microphone stops while speaking.** Left running it hears the synthesised
 * voice through the speakers and transcribes the app talking to itself. Proper
 * barge-in needs echo cancellation this does not have, so interruption is an
 * explicit call to `stopSpeaking()`.
 */

export type SpeechSupport = { recognition: boolean; synthesis: boolean };

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
};

type RecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};

function getRecognitionCtor(): (new () => Recognition) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Markdown read aloud becomes "asterisk asterisk", so strip it first. */
export function speakable(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[*_`#>|]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function useSpeech({
  onFinalTranscript,
  silenceMs = 1100,
  lang = 'en-GB',
}: {
  onFinalTranscript?: (text: string) => void;
  silenceMs?: number;
  lang?: string;
} = {}) {
  const [support, setSupport] = useState<SpeechSupport>({ recognition: false, synthesis: false });
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [interim, setInterim] = useState('');

  const recognitionRef = useRef<Recognition | null>(null);
  const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalRef = useRef('');
  const listeningRef = useRef(false);
  const queue = useRef<string[]>([]);
  const speakingRef = useRef(false);
  const pending = useRef('');
  const onDrained = useRef<(() => void) | null>(null);
  const callbackRef = useRef(onFinalTranscript);

  useEffect(() => {
    callbackRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  useEffect(() => {
    listeningRef.current = listening;
  }, [listening]);

  useEffect(() => {
    setSupport({
      recognition: getRecognitionCtor() !== null,
      synthesis: typeof window !== 'undefined' && 'speechSynthesis' in window,
    });
  }, []);

  /* ---- output ---------------------------------------------------------- */

  const drain = useCallback(() => {
    if (speakingRef.current) return;
    const next = queue.current.shift();

    if (next === undefined) {
      setSpeaking(false);
      const done = onDrained.current;
      onDrained.current = null;
      done?.();
      return;
    }

    speakingRef.current = true;
    setSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(next);
    utterance.lang = lang;
    utterance.onend = () => {
      speakingRef.current = false;
      drain();
    };
    utterance.onerror = () => {
      speakingRef.current = false;
      drain();
    };
    window.speechSynthesis.speak(utterance);
  }, [lang]);

  /** Adds text, speaking each complete sentence as soon as it is available. */
  const speakStreaming = useCallback(
    (chunk: string) => {
      if (!support.synthesis) return;
      pending.current += chunk;

      const boundary = /[.!?…]["')\]]?\s/;
      let match = pending.current.match(boundary);
      while (match && match.index !== undefined) {
        const cut = match.index + match[0].length;
        const sentence = speakable(pending.current.slice(0, cut));
        if (sentence) queue.current.push(sentence);
        pending.current = pending.current.slice(cut);
        match = pending.current.match(boundary);
      }
      drain();
    },
    [drain, support.synthesis],
  );

  /** Speaks a complete string immediately. */
  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (!support.synthesis) {
        onDone?.();
        return;
      }
      const clean = speakable(text);
      if (!clean) {
        onDone?.();
        return;
      }
      onDrained.current = onDone ?? null;
      // Split on sentences so a long reply can still be interrupted mid-way.
      queue.current.push(...(clean.match(/[^.!?…]+[.!?…]*/g) ?? [clean]).map((s) => s.trim()).filter(Boolean));
      drain();
    },
    [drain, support.synthesis],
  );

  /** Flushes anything left after the final sentence of a stream. */
  const flushSpeech = useCallback(
    (onDone?: () => void) => {
      const rest = speakable(pending.current);
      pending.current = '';
      onDrained.current = onDone ?? null;
      if (rest) queue.current.push(rest);
      drain();
    },
    [drain],
  );

  const stopSpeaking = useCallback(() => {
    queue.current = [];
    pending.current = '';
    speakingRef.current = false;
    onDrained.current = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  /* ---- input ----------------------------------------------------------- */

  const stopListening = useCallback(() => {
    if (silenceTimer.current) clearTimeout(silenceTimer.current);
    silenceTimer.current = null;
    listeningRef.current = false;
    setListening(false);
    setInterim('');
    try {
      recognitionRef.current?.abort();
    } catch {
      // Already stopped.
    }
  }, []);

  const startListening = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;

    try {
      recognitionRef.current?.abort();
    } catch {
      // Ignore.
    }

    finalRef.current = '';
    const recognition = new Ctor();
    recognition.lang = lang;
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

      if (silenceTimer.current) clearTimeout(silenceTimer.current);
      silenceTimer.current = setTimeout(() => {
        const text = (finalRef.current || interimText).trim();
        if (text) {
          finalRef.current = '';
          setInterim('');
          callbackRef.current?.(text);
        }
      }, silenceMs);
    };

    recognition.onerror = () => {
      // Errors here are mostly "no-speech"; onend restarts if still wanted.
    };

    recognition.onend = () => {
      // Chrome ends recognition by itself after a pause.
      if (listeningRef.current) {
        try {
          recognition.start();
        } catch {
          // Ignore double-start.
        }
      }
    };

    recognitionRef.current = recognition;
    listeningRef.current = true;
    setListening(true);
    try {
      recognition.start();
    } catch {
      // Ignore double-start.
    }
  }, [lang, silenceMs]);

  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [stopListening, stopSpeaking]);

  return {
    support,
    listening,
    speaking,
    interim,
    startListening,
    stopListening,
    speak,
    speakStreaming,
    flushSpeech,
    stopSpeaking,
  };
}
