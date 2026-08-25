import { PrismaClient } from '@prisma/client';
import { SUBJECT_SLUGS } from '../src/lib/types';

const db = new PrismaClient();

async function main() {
  console.log('Questions available to each practice mode, per subject:\n');
  console.log('subject      quick(MCQ)  challenge  topic/mixed  total');
  for (const subject of SUBJECT_SLUGS) {
    const base = { reviewStatus: 'APPROVED', subject: { slug: subject } };
    const [mcq, challenge, all] = await Promise.all([
      db.question.count({ where: { ...base, type: 'MCQ' } }),
      db.question.count({ where: { ...base, difficulty: 'CHALLENGE' } }),
      db.question.count({ where: base }),
    ]);
    const flag = mcq === 0 ? '   <-- "quick quiz" is EMPTY for this subject' : challenge === 0 ? '   <-- "difficult questions" is EMPTY' : '';
    console.log(
      `${subject.padEnd(12)} ${String(mcq).padStart(6)}   ${String(challenge).padStart(8)}   ${String(all).padStart(10)}   ${String(all).padStart(5)}${flag}`,
    );
  }
}

main().finally(() => db.$disconnect());
