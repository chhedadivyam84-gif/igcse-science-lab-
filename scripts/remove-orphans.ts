import { PrismaClient } from '@prisma/client';
import { syllabuses } from '../src/lib/curriculum';
const db = new PrismaClient();

/** Deletes only topics/subtopics whose number no longer appears in the seed.
 *  Anything the curriculum still defines is untouched. */
async function main(){
  const wantedSub = new Set<string>();
  const wantedTop = new Set<string>();
  for (const s of syllabuses) for (const t of s.topics) {
    wantedTop.add(`${s.subject.slug}|${t.number}`);
    for (const st of t.subtopics) wantedSub.add(`${s.subject.slug}|${st.number}`);
  }

  const subs = await db.subtopic.findMany({ include:{ topic:{ include:{ version:{ include:{ subject:true } } } } } });
  const orphanSubs = subs.filter(r => !wantedSub.has(`${r.topic.version.subject.slug}|${r.number}`));
  for (const o of orphanSubs) {
    await db.subtopic.delete({ where: { id: o.id } });
    console.log(`deleted subtopic ${o.topic.version.subject.slug} ${o.number} ${o.title}`);
  }

  const tops = await db.topic.findMany({ include:{ version:{ include:{ subject:true } }, _count:{ select:{ subtopics:true } } } });
  const orphanTops = tops.filter(t => !wantedTop.has(`${t.version.subject.slug}|${t.number}`));
  for (const t of orphanTops) {
    await db.topic.delete({ where: { id: t.id } });
    console.log(`deleted topic ${t.version.subject.slug} ${t.number} ${t.title}`);
  }
  console.log(`\nRemoved ${orphanSubs.length} subtopics and ${orphanTops.length} topics.`);
  await db.$disconnect();
}
main();
