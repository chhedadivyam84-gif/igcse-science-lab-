/**
 * The schema stores structured payloads as JSON strings so the same models work
 * on SQLite and Postgres. These helpers keep that decision from leaking: parse
 * never throws, and callers always get the shape they asked for.
 */

export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export function parseList<T>(value: string | null | undefined): T[] {
  const parsed = parseJson<T[]>(value, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function stringify(value: unknown): string {
  return JSON.stringify(value ?? null);
}

/** Pulls the first fenced or bare JSON object/array out of a model response. */
export function extractJson<T>(text: string, fallback: T): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.search(/[[{]/);
  if (start === -1) return fallback;

  // Walk forward to the matching bracket so trailing prose is ignored.
  const open = candidate[start];
  const close = open === '{' ? '}' : ']';
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < candidate.length; i++) {
    const char = candidate[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (char === '"') inString = !inString;
    if (inString) continue;
    if (char === open) depth++;
    else if (char === close) {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(candidate.slice(start, i + 1)) as T;
        } catch {
          return fallback;
        }
      }
    }
  }
  return fallback;
}
