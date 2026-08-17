import type { ReactNode } from 'react';

/**
 * Renders the light markdown subset used by lesson bodies and AI prose.
 *
 * Deliberately not a full markdown parser: supporting exactly what the content
 * uses means no third-party dependency, no HTML injection surface, and output
 * that always matches the design system.
 *
 * Supported: `### heading`, `- bullet`, `1. step`, `| tables |`, blank-line
 * paragraphs, `**bold**`, `` `code` ``.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  return <div className={className ?? 'prose-science'}>{parseBlocks(text)}</div>;
}

function parseBlocks(text: string): ReactNode[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];

  let paragraph: string[] = [];
  let bullets: string[] = [];
  let ordered: string[] = [];
  let table: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={key++}>{inline(paragraph.join(' '))}</p>);
    paragraph = [];
  };

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={key++}>
        {bullets.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  const flushOrdered = () => {
    if (!ordered.length) return;
    blocks.push(
      <ol key={key++}>
        {ordered.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ol>,
    );
    ordered = [];
  };

  const flushTable = () => {
    if (!table.length) return;
    const rows = table
      .filter((row) => !/^\|[\s:|-]+\|$/.test(row.trim()))
      .map((row) =>
        row
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((cell) => cell.trim()),
      );
    const [headers, ...body] = rows;
    if (headers) {
      blocks.push(
        <div key={key++} className="scroll-x my-4">
          <table className="w-full min-w-[26rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                {headers.map((cell, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-ink">
                    {inline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i} className="border-b border-line/60 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 align-top text-ink-muted">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    }
    table = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushBullets();
    flushOrdered();
    flushTable();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line.trim()) {
      flushAll();
      continue;
    }

    if (line.startsWith('|')) {
      flushParagraph();
      flushBullets();
      flushOrdered();
      table.push(line);
      continue;
    }
    flushTable();

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushAll();
      blocks.push(<h3 key={key++}>{inline(heading[2])}</h3>);
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      flushOrdered();
      bullets.push(bullet[1]);
      continue;
    }
    flushBullets();

    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushParagraph();
      ordered.push(numbered[1]);
      continue;
    }
    flushOrdered();

    paragraph.push(line.trim());
  }

  flushAll();
  return blocks;
}

/** Handles `**bold**` and `` `code` `` without ever emitting raw HTML. */
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];

    if (token.startsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(
        <code key={key++} className="formula">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
