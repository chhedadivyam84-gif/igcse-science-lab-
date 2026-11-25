'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Maximize2, Pause, PlayCircle, Play, SkipBack, SkipForward, Sparkles, Volume2, VolumeX } from 'lucide-react';

import { SceneVisual } from './SceneVisuals';
import { Badge, Button, EmptyState, ErrorState, Input, Notice, Panel, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Storyboard } from '@/lib/types';

const EXAMPLES = [
  'Explain electromagnetic induction.',
  'Explain rate of reaction and collision theory.',
  'Explain how electrolysis works.',
  'Explain total internal reflection.',
];

export function ExplainerStudio({
  initialTopic,
  aiConfigured,
}: {
  initialTopic?: string;
  aiConfigured: boolean;
}) {
  const [request, setRequest] = useState(initialTopic ?? '');
  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [narrate, setNarrate] = useState(true);
  // The narrator is ONE continuous audio track for the whole explainer. The
  // visuals follow its clock, so scenes change exactly when their narration
  // starts, and a single Play tap is enough for phones to allow the sound.
  const [voice, setVoice] = useState<{ status: 'idle' | 'loading' | 'ready' | 'failed'; track: HTMLAudioElement | null }>({
    status: 'idle',
    track: null,
  });
  const [durations, setDurations] = useState<number[]>([]);
  const elapsedRef = useRef(0);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)');
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const scene = storyboard?.scenes[sceneIndex];
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const sceneSeconds = (index: number) =>
    durations[index] ?? storyboard?.scenes[index]?.seconds ?? 0;
  const sceneDuration = sceneSeconds(sceneIndex);

  const sceneStart = useCallback(
    (index: number) => durations.slice(0, index).reduce((sum, d) => sum + d, 0),
    [durations],
  );
  const trackActive = voice.status === 'ready' && !!voice.track && narrate;
  elapsedRef.current = elapsed;

  const goToScene = useCallback(
    (index: number) => {
      setSceneIndex(index);
      setElapsed(0);
      if (voice.track) voice.track.currentTime = sceneStart(index);
    },
    [voice.track, sceneStart],
  );

  /** Start or pause from a tap, so the browser allows the narrator to play. */
  function togglePlay(next?: boolean) {
    const play = next ?? !playing;
    const track = voice.track;
    if (track && voice.status === 'ready' && narrate) {
      if (play) {
        const at = sceneStart(sceneIndex) + elapsedRef.current;
        if (Math.abs(track.currentTime - at) > 0.3) track.currentTime = at;
        track.play().catch(() => undefined);
      } else track.pause();
    }
    setPlaying(play);
  }

  // Animation clock. With the narrator on, the audio track IS the clock;
  // otherwise a rAF timer runs the scenes at their own lengths.
  useEffect(() => {
    if (!playing || !storyboard || !scene) return;

    if (trackActive && voice.track) {
      const track = voice.track;
      const starts = storyboard.scenes.map((_, i) => sceneStart(i));
      const follow = () => {
        const t = track.currentTime;
        let index = 0;
        while (index < starts.length - 1 && t >= starts[index + 1]) index++;
        if (index !== sceneIndex) setSceneIndex(index);
        setElapsed(Math.max(0, t - starts[index]));
        if (track.ended) {
          setPlaying(false);
          return;
        }
        rafRef.current = requestAnimationFrame(follow);
      };
      rafRef.current = requestAnimationFrame(follow);
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }

    lastTickRef.current = performance.now();
    const tick = (now: number) => {
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      setElapsed((current) => {
        const next = current + delta;
        if (next >= sceneDuration) {
          if (sceneIndex < storyboard.scenes.length - 1) {
            setSceneIndex((i) => i + 1);
            return 0;
          }
          setPlaying(false);
          return sceneDuration;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, storyboard, scene, sceneIndex, sceneDuration, trackActive, voice.track, sceneStart]);

  // Narration follows the current scene rather than the clock, so a scrub does
  // not restart mid-sentence.
  useEffect(() => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    if (voice.status !== 'failed' || !narrate || !playing || !scene) return;
    // (Only when the Google narrator failed: then each scene is read aloud.)

    const utterance = new SpeechSynthesisUtterance(scene.narration);
    utterance.rate = 1.0;
    utterance.lang = 'en-GB';
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
    // Deliberately keyed on the scene id: re-narrate only when the scene changes.
  }, [scene?.id, narrate, playing, speechSupported, scene, voice.status]);

  // Turning the narrator off mid-play pauses the track; the timer takes over.
  useEffect(() => {
    const track = voice.track;
    if (!track) return;
    if (!narrate) track.pause();
    else if (playing && track.paused) {
      track.currentTime = sceneStart(sceneIndex) + elapsedRef.current;
      track.play().catch(() => undefined);
    }
    // Only when the narrator is switched on or off.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrate, voice.track]);

  useEffect(() => () => voice.track?.pause(), [voice.track]);

  async function loadVoice(board: Storyboard) {
    voice.track?.pause();
    setVoice({ status: 'loading', track: null });
    setDurations([]);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: board.scenes.map((s) => s.narration.slice(0, 700)) }),
      });
      if (!response.ok) throw new Error('tts');
      const data = (await response.json()) as { audio: string; weights: number[] };
      const track = new Audio(data.audio);
      track.preload = 'auto';
      const total = await new Promise<number>((resolve, reject) => {
        const done = () => (Number.isFinite(track.duration) && track.duration > 0 ? resolve(track.duration) : reject(new Error('length')));
        if (track.readyState >= 1) done();
        else {
          track.addEventListener('loadedmetadata', done, { once: true });
          track.addEventListener('error', () => reject(new Error('audio')), { once: true });
        }
      });
      // Each scene gets the share of the track its narration takes.
      const sum = data.weights.reduce((a, b) => a + b, 0);
      setDurations(data.weights.map((w) => (total * w) / sum));
      setVoice({ status: 'ready', track });
    } catch {
      setVoice({ status: 'failed', track: null });
    }
  }

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  async function generate(text: string) {
    const value = text.trim();
    if (value.length < 4) {
      setError('Say what the explainer should cover.');
      return;
    }

    setPending(true);
    setError(null);
    setStoryboard(null);
    setPlaying(false);

    try {
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: value }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Could not build an explainer.');
        return;
      }
      setStoryboard(data.storyboard as Storyboard);
      goToScene(0);
      loadVoice(data.storyboard as Storyboard);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  const totalSeconds = storyboard?.scenes.reduce((sum, _s, i) => sum + sceneSeconds(i), 0) ?? 0;
  const elapsedTotal =
    (storyboard?.scenes.slice(0, sceneIndex).reduce((sum, _s, i) => sum + sceneSeconds(i), 0) ?? 0) + elapsed;
  const progress = scene && sceneDuration ? Math.min(elapsed / sceneDuration, 1) : 0;
  const voiceLoading = voice.status === 'loading';

  return (
    <div className="space-y-6">
      <Panel>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            generate(request);
          }}
          className="space-y-3"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={request}
              onChange={(event) => setRequest(event.target.value)}
              placeholder="Explain electromagnetic induction"
              aria-label="What the explainer should cover"
              className="flex-1"
            />
            <Button type="submit" variant="primary" loading={pending} className="sm:w-44">
              <Sparkles className="h-4 w-4" /> Create explainer
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setRequest(example);
                  generate(example);
                }}
                className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
              >
                {example}
              </button>
            ))}
          </div>
        </form>
      </Panel>

      {!aiConfigured && (
        <Notice tone="caution" title="AI model not connected">
          Explainers will be assembled from the curriculum database — shorter, but still accurate.
        </Notice>
      )}

      {error && <ErrorState description={error} onRetry={() => generate(request)} />}
      {pending && <Skeleton className="h-96 w-full" />}

      {!pending && !storyboard && !error && (
        <EmptyState
          icon={<PlayCircle className="h-6 w-6" />}
          title="No explainer yet"
          description="Name a concept and the studio builds a teaching storyboard: what it is, the mechanism step by step, a real example, then what the exam expects."
        />
      )}

      {storyboard && scene && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_16rem]">
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-ink">{storyboard.title}</h2>
              <Badge tone={storyboard.aiAssisted ? 'accent' : 'caution'}>
                {storyboard.aiAssisted ? 'AI-assisted' : 'From curriculum database'}
              </Badge>
              {storyboard.sourceRefs.length > 0 && (
                <Badge tone="neutral">Syllabus {storyboard.sourceRefs.join(', ')}</Badge>
              )}
            </div>

            <div
              ref={playerRef}
              className={cn('relative overflow-hidden bg-black', phone ? 'mx-auto max-h-[78vh] max-w-[calc(78vh*9/16)] rounded-2xl' : '')}
            >
              <SceneVisual scene={scene} progress={progress} index={sceneIndex} subject={storyboard.subject} portrait={phone} />
              {!playing && (
                <button
                  type="button"
                  onClick={() => !voiceLoading && togglePlay(true)}
                  disabled={voiceLoading}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/25"
                  aria-label="Play explainer"
                >
                  <span className="flex items-center gap-3 rounded-full bg-white/95 px-6 py-3 text-sm font-semibold text-black shadow-xl">
                    {voiceLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Recording the narrator…
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" /> {elapsedTotal > 0 ? 'Resume' : 'Play with voice'}
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>

            {/* Captions */}
            <div className="min-h-[4.5rem] rounded-card border border-line bg-surface p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Scene {sceneIndex + 1} · {scene.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{scene.narration}</p>
            </div>

            {/* Transport */}
            <div className="rounded-card border border-line bg-surface p-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToScene(Math.max(0, sceneIndex - 1))}
                  disabled={sceneIndex === 0}
                  aria-label="Previous scene"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => togglePlay()}
                  disabled={voiceLoading && !playing}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToScene(Math.min(storyboard.scenes.length - 1, sceneIndex + 1))}
                  disabled={sceneIndex === storyboard.scenes.length - 1}
                  aria-label="Next scene"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <span className="ml-2 font-mono text-xs tabular-nums text-ink-muted">
                  {format(elapsedTotal)} / {format(totalSeconds)}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => playerRef.current?.requestFullscreen?.().catch(() => undefined)}
                  aria-label="Full screen"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                {(voice.status !== 'failed' || speechSupported) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNarrate((n) => !n)}
                    aria-pressed={narrate}
                    aria-label={narrate ? 'Turn narration off' : 'Turn narration on'}
                  >
                    {narrate ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <span className="hidden sm:inline">Narration</span>
                  </Button>
                )}
              </div>

              {/* Timeline */}
              <div className="mt-3 flex gap-1">
                {storyboard.scenes.map((s, index) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToScene(index)}
                    style={{ flexGrow: sceneSeconds(index) }}
                    aria-label={`Scene ${index + 1}: ${s.title}`}
                    className="group relative h-2 overflow-hidden rounded-full bg-surface-raised"
                  >
                    <span
                      className={cn(
                        'absolute inset-y-0 left-0 rounded-full bg-accent transition-[width]',
                        index < sceneIndex ? 'w-full' : index === sceneIndex ? '' : 'w-0',
                      )}
                      style={index === sceneIndex ? { width: `${progress * 100}%` } : undefined}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-3">
            <Panel className="p-4">
              <p className="eyebrow mb-3">Storyboard</p>
              <ol className="space-y-1">
                {storyboard.scenes.map((s, index) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goToScene(index)}
                      className={cn(
                        'w-full rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                        index === sceneIndex ? 'bg-accent/10 text-accent' : 'text-ink-muted hover:bg-surface-raised',
                      )}
                    >
                      <span className="font-mono text-xs text-ink-faint">{index + 1}</span> {s.title}
                    </button>
                  </li>
                ))}
              </ol>
            </Panel>

            {scene.bullets.length > 0 && (
              <Panel className="p-4">
                <p className="eyebrow mb-2.5">On screen</p>
                <ul className="space-y-1.5">
                  {scene.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-2 text-sm text-ink-muted">
                      <span className="text-accent">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function format(seconds: number) {
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}
