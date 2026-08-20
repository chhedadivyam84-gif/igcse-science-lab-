import { PrismaClient } from '@prisma/client';
import { syllabuses } from '../src/lib/curriculum';
const db = new PrismaClient();
async function main(){
  const wanted = new Set<string>();
  for (const s of syllabuses) for (const t of s.topics) for (const st of t.subtopics)
    wanted.add(`${s.subject.slug}|${st.number}`);
  const rows = await db.subtopic.findMany({ include:{ _count:{select:{lessons:true,questions:true}}, topic:{include:{version:{include:{subject:true}}}} } });
  const orphans = rows.filter(r => !wanted.has(`${r.topic.version.subject.slug}|${r.number}`));
  console.log(`DB subtopics: ${rows.length} | in seed: ${wanted.size} | ORPHANS: ${orphans.length}`);
  orphans.forEach(o => console.log(`  ${o.topic.version.subject.slug}  ${o.number}  ${o.title}  (topic ${o.topic.number} ${o.topic.title}) lessons=${o._count.lessons} questions=${o._count.questions}`));
  const topics = await db.topic.findMany({ include:{ _count:{select:{subtopics:true}}, version:{include:{subject:true}} } });
  const wantedT = new Set<string>();
  for (const s of syllabuses) for (const t of s.topics) wantedT.add(`${s.subject.slug}|${t.number}`);
  const oT = topics.filter(t => !wantedT.has(`${t.version.subject.slug}|${t.number}`));
  console.log(`\nORPHAN TOPICS: ${oT.length}`);
  oT.forEach(t => console.log(`  ${t.version.subject.slug}  ${t.number}  ${t.title}  subtopics=${t._count.subtopics}`));
  await db.$disconnect();
}
main();
