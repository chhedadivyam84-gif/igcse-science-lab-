import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  const subs = await db.subtopic.findMany({
    include: {
      _count: { select: { lessons: true } },
      objectives: { orderBy: { order: 'asc' } },
      topic: { include: { version: { include: { subject: true } } } },
    },
    orderBy: [{ topic: { order: 'asc' } }, { order: 'asc' }],
  });
  for (const s of subs) {
    if (s._count.lessons === 0) {
      console.log(`${s.topic.version.subject.slug}\t${s.number}\t${s.slug}\t${s.title}`);
    }
  }
  const total = subs.length, missing = subs.filter(s=>s._count.lessons===0).length;
  console.log(`\n${missing} of ${total} subtopics missing a lesson`);
  await db.$disconnect();
}
main();
