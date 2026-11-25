import type { DiagramNode, DiagramSpec } from '@/lib/types';

/**
 * Tidies a model-produced diagram before it is drawn.
 *
 * Language models place nodes by guessing pixel coordinates, so generated
 * layouts routinely stack labels on top of each other ("Brush (−)", "Split
 * Ring Commutator" and "Brush (+)" printed over one another). This pass fixes
 * the geometry without touching the content:
 *  1. boxes grow to fit their (wrapped) labels;
 *  2. boxes that overlap are pushed apart sideways, carrying any line or
 *     arrow end that was attached to them;
 *  3. free labels that collide with other text or with boxes move to the
 *     nearest free spot (up, down, left or right), within the canvas.
 */

type Rect = { x: number; y: number; w: number; h: number };

const CHAR = 6.8; // px per character at 12–13px
const LINE = 15;
const PAD = 4;

const overlap = (a: Rect, b: Rect) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

function labelRect(node: Extract<DiagramNode, { kind: 'label' }>): Rect {
  const w = node.text.length * CHAR;
  const x = node.anchor === 'middle' ? node.x - w / 2 : node.anchor === 'end' ? node.x - w : node.x;
  return { x: x - PAD, y: node.y - 12 - PAD / 2, w: w + 2 * PAD, h: 16 + PAD };
}

function arrowLabelRect(node: Extract<DiagramNode, { kind: 'arrow' }>): Rect | null {
  if (!node.label) return null;
  const w = node.label.length * 6.2;
  const midX = (node.x1 + node.x2) / 2;
  const midY = (node.y1 + node.y2) / 2;
  const vertical = Math.abs(node.y2 - node.y1) > Math.abs(node.x2 - node.x1);
  return vertical ? { x: midX + 6, y: midY - 10, w: w + 4, h: 16 } : { x: midX - w / 2 - 2, y: midY - 19, w: w + 4, h: 16 };
}

function boxTextLines(label: string, width: number) {
  const max = Math.max(4, Math.floor((width - 10) / 7));
  const words = label.split(/\s+/);
  let lines = 1;
  let line = '';
  let longest = 0;
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines++;
      line = word;
    } else line = (line + ' ' + word).trim();
    longest = Math.max(longest, line.length);
  }
  return { lines, longest };
}

export function declutter(spec: DiagramSpec): DiagramSpec {
  const W = spec.width;
  const H = spec.height;
  const nodes: DiagramNode[] = spec.nodes.map((n) => ({ ...n }) as DiagramNode);
  const boxes = nodes.filter((n): n is Extract<DiagramNode, { kind: 'box' }> => n.kind === 'box');

  // 1. Grow boxes to fit their labels: at most 3 wrapped lines, else wider.
  for (const box of boxes) {
    if (!box.label) continue;
    const words = box.label.split(/\s+/);
    const longestWord = Math.max(...words.map((w) => w.length));
    // Short labels go on one line (widen the box); only long ones wrap.
    const oneLine = box.label.length * 7 + 16;
    const minWidth = Math.min(W - 40, Math.max(box.w, oneLine <= 170 ? oneLine : longestWord * 7 + 16));
    let { lines } = boxTextLines(box.label, minWidth);
    let width = minWidth;
    while (lines > 3 && width < W - 40) {
      width += 20;
      lines = boxTextLines(box.label, width).lines;
    }
    const grow = width - box.w;
    box.x = Math.max(20, box.x - grow / 2);
    box.w = width;
    box.h = Math.max(box.h, lines * LINE + 14);
    if (box.x + box.w > W - 20) box.x = Math.max(20, W - 20 - box.w);
  }

  // 2. Push overlapping boxes apart horizontally (skip boxes nested inside
  //    another, which are deliberate — a core inside a frame, for example).
  const contains = (a: Rect, b: Rect) => a.x <= b.x && a.y <= b.y && a.x + a.w >= b.x + b.w && a.y + a.h >= b.y + b.h;
  for (let pass = 0; pass < 6; pass++) {
    let moved = false;
    const sorted = [...boxes].sort((a, b) => a.x - b.x);
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const a = sorted[i];
        const b = sorted[j];
        if (!overlap(a, b) || contains(a, b) || contains(b, a)) continue;
        const dx = a.x + a.w + 12 - b.x;
        const room = W - 20 - (b.x + b.w);
        const shiftRight = Math.min(dx, Math.max(0, room));
        const shiftLeft = dx - shiftRight;
        moveBox(b, shiftRight, 0, nodes);
        if (shiftLeft > 0) moveBox(a, -Math.min(shiftLeft, a.x - 20), 0, nodes);
        moved = true;
      }
    }
    if (!moved) break;
  }

  // 3. Move colliding free labels to the nearest clear position.
  const fixed: Rect[] = [
    ...boxes.map((b) => ({ x: b.x, y: b.y, w: b.w, h: b.h })),
    ...nodes.flatMap((n) => (n.kind === 'arrow' ? [arrowLabelRect(n)].filter((r): r is Rect => !!r) : [])),
    ...nodes.flatMap((n) => (n.kind === 'circle' && n.label && n.r >= 10 ? [{ x: n.x - n.r, y: n.y - n.r, w: 2 * n.r, h: 2 * n.r }] : [])),
  ];
  const placed: Rect[] = [];
  for (const node of nodes) {
    if (node.kind !== 'label') continue;
    let rect = labelRect(node);
    const clashes = (r: Rect) =>
      r.x < 4 || r.x + r.w > W - 4 || r.y < 4 || r.y + r.h > H - 4 || [...fixed, ...placed].some((o) => overlap(r, o));
    if (clashes(rect)) {
      const offsets: [number, number][] = [];
      for (let d = 1; d <= 6; d++) offsets.push([0, -d * 16], [0, d * 16], [d * 24, 0], [-d * 24, 0]);
      for (const [dx, dy] of offsets) {
        const candidate = { ...rect, x: rect.x + dx, y: rect.y + dy };
        if (!clashes(candidate)) {
          node.x += dx;
          node.y += dy;
          rect = candidate;
          break;
        }
      }
    }
    placed.push(rect);
  }

  return { ...spec, nodes };
}

/** Moves a box and drags along any line/arrow endpoint that touched it. */
function moveBox(box: Extract<DiagramNode, { kind: 'box' }>, dx: number, dy: number, nodes: DiagramNode[]) {
  if (!dx && !dy) return;
  const inside = (x: number, y: number) => x >= box.x - 2 && x <= box.x + box.w + 2 && y >= box.y - 2 && y <= box.y + box.h + 2;
  for (const n of nodes) {
    if (n.kind !== 'line' && n.kind !== 'arrow') continue;
    if (inside(n.x1, n.y1)) {
      n.x1 += dx;
      n.y1 += dy;
    }
    if (inside(n.x2, n.y2)) {
      n.x2 += dx;
      n.y2 += dy;
    }
  }
  box.x += dx;
  box.y += dy;
}
