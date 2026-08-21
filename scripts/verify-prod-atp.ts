import { PrismaClient } from '@prisma/client';
import { blueprintFor } from '../src/lib/exam/blueprints';

const db = new PrismaClient();

async function main() {
  for (const subject of ['physics', 'chemistry', 'biology'] as const) {
    const bp = blueprintFor(subject);
    const p6 = bp.papers.find((p) => p.number === '6')!;
    const p5 = bp.papers.find((p) => p.number === '5')!;

    const practicals = await db.question.findMany({
      where: { reviewStatus: 'APPROVED', subject: { slug: subject }, practical: true },
      select: { marks: true },
    });
    const theoryPool = await db.question.count({
      where: { reviewStatus: 'APPROVED', subject: { slug: subject }, type: { not: 'MCQ' }, practical: false },
    });
    const pool = practicals.reduce((n, q) => n + q.marks, 0);

    // Exact-fit search, exactly as the builder does it.
    const reachable = new Map<number, number>([[0, 0]]);
    for (const q of practicals) {
      for (const sum of [...reachable.keys()]) {
        const next = sum + q.marks;
        if (next > p6.marks || reachable.has(next)) continue;
        reachable.set(next, next);
      }
      if (reachable.has(p6.marks)) break;
    }
    const built = reachable.has(p6.marks) ? p6.marks : Math.max(...reachable.keys());

    console.log(
      `${subject.padEnd(10)} P6 buildable=${String(p6.buildable).padEnd(5)} ` +
        `${practicals.length} practicals, ${pool} marks -> paper ${built}/${p6.marks} ` +
        `${built >= p6.marks - 2 ? 'COMPLETE' : 'SHORT'} | ` +
        `P5 buildable=${p5.buildable} | theory questions (practicals excluded)=${theoryPool}`,
    );
  }
}

main().finally(() => db.$disconnect());
