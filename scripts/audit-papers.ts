import { PrismaClient } from '@prisma/client';
import { assertNotProductionDatabase } from '../src/lib/db-guard';
import { SUBJECT_SLUGS } from '../src/lib/types';
import { blueprintFor } from '../src/lib/exam/blueprints';

assertNotProductionDatabase();
const db = new PrismaClient();

async function main() {
  for (const subject of SUBJECT_SLUGS) {
    const bp = blueprintFor(subject);
    console.log(`\n=== ${subject} (${bp.syllabusCode}) ===`);
    for (const paper of bp.papers) {
      if (!paper.buildable) {
        console.log(`  Paper ${paper.number}  ${paper.name.padEnd(42)} not buildable (by design)`);
        continue;
      }
      const rows = await db.question.findMany({
        where: {
          reviewStatus: 'APPROVED',
          subject: { slug: subject },
          ...(paper.style === 'MCQ' ? { type: 'MCQ' } : { type: { not: 'MCQ' } }),
          ...(paper.tier === 'CORE' ? { difficulty: { not: 'CHALLENGE' } } : {}),
        },
        select: { marks: true, highYield: true, examRank: true },
      });
      // Same greedy fill as the builder, so the number reported is the number built.
      const ordered = [
        ...rows.filter((r) => r.highYield).sort((a, b) => a.examRank - b.examRank),
        ...rows.filter((r) => !r.highYield),
      ];
      let built = 0;
      let count = 0;
      for (const q of ordered) {
        if (built >= paper.marks) break;
        if (built + q.marks > paper.marks) continue;
        built += q.marks;
        count++;
      }
      const pool = rows.reduce((n, r) => n + r.marks, 0);
      const status = built >= paper.marks ? 'COMPLETE' : `partial ${Math.round((built / paper.marks) * 100)}%`;
      console.log(
        `  Paper ${paper.number}  ${paper.name.padEnd(42)} ${String(built).padStart(3)}/${paper.marks} marks, ${count} Qs  (pool ${pool})  ${status}`,
      );
    }
  }
}

main().finally(() => db.$disconnect());
