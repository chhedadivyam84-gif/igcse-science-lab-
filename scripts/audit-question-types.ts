import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

/**
 * A NUMERICAL question is auto-marked by comparing a value and a unit, so its
 * answer must BE a value and a unit. Anything else — a chemical equation, a
 * list of quantities, a multi-part answer — cannot be marked that way and
 * should be self-marked against the mark scheme instead.
 */
function looksUnmarkable(answer: string): string | null {
  if (/→|⇌|=>/.test(answer)) return 'chemical equation / arrow';
  if (/\([a-d]\)/i.test(answer)) return 'multi-part (a)(b)';
  if (/\b[A-Za-z]\s*=\s*[\d.]/.test(answer)) return 'named quantities (R = …)';
  // Two or more numbers each followed by a word, separated by commas.
  const labelled = answer.match(/\d+\s*[a-zA-Zµ°Ω]+/g) ?? [];
  if (answer.includes(',') && labelled.length >= 2) return 'comma-separated list';
  if (/;/.test(answer) && /[a-z]{4,}/i.test(answer.split(';')[1] ?? '')) return 'value plus a statement';
  return null;
}

async function main() {
  const rows = await db.question.findMany({
    where: { reviewStatus: 'APPROVED', type: 'NUMERICAL' },
    select: { id: true, answer: true, stem: true, subject: { select: { slug: true } } },
  });
  const bad = rows.map((q) => ({ q, why: looksUnmarkable(q.answer) })).filter((x) => x.why);
  console.log(`${rows.length} NUMERICAL questions; ${bad.length} cannot be auto-marked:\n`);
  for (const { q, why } of bad) {
    console.log(`  [${q.subject.slug}] ${why}`);
    console.log(`      answer: ${q.answer}`);
    console.log(`      stem:   ${q.stem.replace(/\n/g, ' ').slice(0, 80)}`);
  }
}

main().finally(() => db.$disconnect());
