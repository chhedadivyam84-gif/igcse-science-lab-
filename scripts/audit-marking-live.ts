import { PrismaClient } from '@prisma/client';
import { markNumerical } from '../src/lib/marking';

const db = new PrismaClient();

/** The ways a student might reasonably type the same correct answer. */
function variants(answer: string): string[] {
  const out = new Set<string>([answer]);
  out.add(answer.replace(/\s/g, ''));                        // no spaces
  out.add(answer.replace(/²/g, '2').replace(/³/g, '3'));      // typed digits
  out.add(answer.replace(/²/g, '^2').replace(/³/g, '^3'));    // caret form
  out.add(answer.replace(/×/g, 'x'));                         // ascii times
  out.add(answer.replace(/(\d) (?=\d{3})/g, '$1,'));          // comma thousands
  out.add(answer.replace(/(\d) (?=\d{3})/g, '$1'));           // no separator
  // Just the first form, if the model answer offers an equivalent in brackets.
  const firstForm = answer.split('(')[0].trim();
  if (firstForm) out.add(firstForm);
  return [...out].filter(Boolean);
}

async function main() {
  const rows = await db.question.findMany({
    where: { reviewStatus: 'APPROVED', type: 'NUMERICAL' },
    select: { id: true, answer: true, stem: true, subject: { select: { slug: true } } },
  });

  let checked = 0;
  const failures: string[] = [];
  for (const q of rows) {
    for (const v of variants(q.answer)) {
      checked++;
      const result = markNumerical(v, q.answer);
      if (!result.correct) {
        failures.push(`  ${q.subject.slug.padEnd(10)} typed "${v}"  vs answer "${q.answer}"  -> ${result.unitProblem ? 'unit error' : 'WRONG'}`);
      }
    }
  }

  console.log(`${rows.length} numerical questions in the live bank`);
  console.log(`${checked} student spellings checked, ${failures.length} would be mismarked\n`);
  if (failures.length) console.log(failures.slice(0, 25).join('\n'));
  if (failures.length > 25) console.log(`  … and ${failures.length - 25} more`);
}

main().finally(() => db.$disconnect());
