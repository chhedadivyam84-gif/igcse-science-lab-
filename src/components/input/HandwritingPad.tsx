'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Eraser, Pen, RotateCcw, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * A place to write an answer by hand.
 *
 * Typing "½mv²", a ray diagram or three lines of algebraic working is slow and
 * unnatural — the paper exam is written, so practice should be too. This is a
 * canvas driven by Pointer Events, which is the one API that treats a finger,
 * a stylus and a mouse the same, and reports stylus pressure where the device
 * supports it.
 *
 * Two details that matter on a real tablet:
 *
 *   - Once a stylus has been used the pad ignores touch input, so a palm
 *     resting on the screen does not draw a stripe across the working.
 *   - The bitmap is sized to devicePixelRatio, or handwriting looks soft and
 *     blurred on exactly the high-density screens people write on.
 *
 * Strokes are kept as points rather than baked into the bitmap, so undo is
 * genuinely undo and a resize can redraw at the new size without loss.
 */

type Point = { x: number; y: number; pressure: number };
type Stroke = { points: Point[]; erase: boolean; width: number };

export function HandwritingPad({
  onChange,
  height = 260,
  disabled = false,
  className,
  ariaLabel = 'Write your answer by hand',
}: {
  /** Called whenever the drawing changes; empty when nothing is drawn. */
  onChange?: (state: { isEmpty: boolean; toPng: () => Promise<Blob | null> }) => void;
  height?: number;
  /** Locks the pad — the writing stays visible but can no longer be changed. */
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const currentRef = useRef<Stroke | null>(null);
  /** Set once a stylus is seen, after which touch is ignored (palm rejection). */
  const penSeenRef = useRef(false);

  const [erasing, setErasing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const ratio = window.devicePixelRatio || 1;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);

    // Canvas cannot parse `rgb(var(--text))` — it has no CSS variable scope, and
    // an unparseable colour is silently ignored, which would leave the ink stuck
    // on default black and invisible in dark mode. So let the browser resolve it:
    // the element carries `text-ink`, and its computed `color` is a real rgb().
    const ink = window.getComputedStyle(canvas).color || '#000';

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const stroke of [...strokesRef.current, currentRef.current].filter(Boolean) as Stroke[]) {
      if (stroke.points.length === 0) continue;

      ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
      ctx.strokeStyle = ink;

      // A single tap should still leave a mark.
      if (stroke.points.length === 1) {
        const p = stroke.points[0];
        ctx.beginPath();
        ctx.arc(p.x, p.y, (stroke.width * p.pressure) / 2, 0, Math.PI * 2);
        ctx.fillStyle = ink;
        ctx.fill();
        continue;
      }

      // Each segment is drawn separately so pressure can vary along a stroke.
      for (let i = 1; i < stroke.points.length; i++) {
        const from = stroke.points[i - 1];
        const to = stroke.points[i];
        ctx.beginPath();
        ctx.lineWidth = stroke.width * ((from.pressure + to.pressure) / 2);
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = 'source-over';
  }, []);

  /** Matches the bitmap to the CSS size at device resolution, then repaints. */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    redraw();
  }, [redraw]);

  useEffect(() => {
    resize();
    const observer = new ResizeObserver(resize);
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [resize]);

  // The ink colour is baked into the bitmap at draw time, so a theme switch
  // would otherwise leave existing writing in the old, now-invisible colour.
  useEffect(() => {
    const observer = new MutationObserver(redraw);
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [redraw]);

  const toPng = useCallback(async (): Promise<Blob | null> => {
    const canvas = canvasRef.current;
    if (!canvas || strokesRef.current.length === 0) return null;

    // Flatten onto an opaque background: a transparent PNG of dark ink is
    // unreadable to anything that composites it on dark, including the model
    // if this is ever sent for transcription.
    const flat = document.createElement('canvas');
    flat.width = canvas.width;
    flat.height = canvas.height;
    const ctx = flat.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, flat.width, flat.height);
    ctx.drawImage(canvas, 0, 0);

    return new Promise((resolve) => flat.toBlob((blob) => resolve(blob), 'image/png'));
  }, []);

  const notify = useCallback(() => {
    const empty = strokesRef.current.length === 0;
    setIsEmpty(empty);
    onChange?.({ isEmpty: empty, toPng });
  }, [onChange, toPng]);

  function pointFrom(event: React.PointerEvent<HTMLCanvasElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      // Mice report 0 or a flat 0.5; only trust pressure from a real stylus.
      pressure: event.pointerType === 'pen' && event.pressure > 0 ? 0.4 + event.pressure : 1,
    };
  }

  function shouldIgnore(event: React.PointerEvent<HTMLCanvasElement>): boolean {
    if (event.pointerType === 'pen') {
      penSeenRef.current = true;
      return false;
    }
    // Palm rejection: once a stylus is in use, fingers stop drawing.
    return event.pointerType === 'touch' && penSeenRef.current;
  }

  function onPointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    if (disabled || shouldIgnore(event)) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    currentRef.current = {
      points: [pointFrom(event)],
      erase: erasing,
      width: erasing ? 22 : 2.6,
    };
    redraw();
  }

  function onPointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (disabled || !currentRef.current || shouldIgnore(event)) return;

    // Coalesced events give every sample the device captured between frames,
    // which is what makes a fast stroke smooth rather than a chain of straight
    // segments. The list can come back empty, though — browsers without the API
    // and untrusted events both do that — and taking it at face value would
    // silently drop the whole stroke, so fall back to the event itself.
    const coalesced = typeof event.nativeEvent.getCoalescedEvents === 'function'
      ? event.nativeEvent.getCoalescedEvents()
      : [];
    const events = coalesced.length > 0 ? coalesced : [event.nativeEvent];

    const rect = event.currentTarget.getBoundingClientRect();
    for (const e of events) {
      currentRef.current.points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pointerType === 'pen' && e.pressure > 0 ? 0.4 + e.pressure : 1,
      });
    }
    redraw();
  }

  function endStroke() {
    if (!currentRef.current) return;
    strokesRef.current.push(currentRef.current);
    currentRef.current = null;
    redraw();
    notify();
  }

  function undo() {
    strokesRef.current.pop();
    redraw();
    notify();
  }

  function clear() {
    strokesRef.current = [];
    currentRef.current = null;
    redraw();
    notify();
  }

  return (
    <div className={cn('rounded-card border border-line bg-surface', className)}>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line px-2 py-1.5">
        <button
          type="button"
          onClick={() => setErasing(false)}
          aria-pressed={!erasing}
          disabled={disabled}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors disabled:opacity-50',
            !erasing ? 'bg-accent/12 text-accent' : 'text-ink-muted hover:bg-surface-raised',
          )}
        >
          <Pen className="h-3.5 w-3.5" /> Write
        </button>
        <button
          type="button"
          onClick={() => setErasing(true)}
          aria-pressed={erasing}
          disabled={disabled}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors disabled:opacity-50',
            erasing ? 'bg-accent/12 text-accent' : 'text-ink-muted hover:bg-surface-raised',
          )}
        >
          <Eraser className="h-3.5 w-3.5" /> Erase
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="sm" onClick={undo} disabled={disabled || isEmpty}>
            <RotateCcw className="h-3.5 w-3.5" /> Undo
          </Button>
          <Button variant="ghost" size="sm" onClick={clear} disabled={disabled || isEmpty}>
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </Button>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          style={{ height, touchAction: 'none' }}
          className={cn('block w-full rounded-b-card text-ink', disabled ? 'cursor-default' : 'cursor-crosshair')}
          aria-label={ariaLabel}
          role="img"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          onPointerCancel={endStroke}
        />
        {isEmpty && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-ink-faint">
            Write here with a finger, stylus or mouse
          </p>
        )}
      </div>
    </div>
  );
}
