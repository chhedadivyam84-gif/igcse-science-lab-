import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main(){
  const subs = await db.subtopic.findMany({ include:{ _count:{ select:{ lessons:true, questions:true, flashcards:true } }, topic:{ include:{ version:{ include:{ subject:true } } } } } });
  const q = await db.question.count();
  const qApproved = await db.question.count({ where:{ reviewStatus:'APPROVED' } });
  const cards = await db.flashcard.count();
  const sims = await db.simulation.count();
  // Derived from the data, not hard-coded, so a newly added subject cannot be
  // silently left out of the coverage report.
  const slugs = [...new Set(subs.map(s=>s.topic.version.subject.slug))].sort();
  for (const slug of slugs) {
    const mine = subs.filter(s=>s.topic.version.subject.slug===slug);
    const withLesson = mine.filter(s=>s._count.lessons>0).length;
    const withQ = mine.filter(s=>s._count.questions>0).length;
    const noContent = mine.filter(s=>s._count.lessons===0 && s._count.questions===0).length;
    console.log(`${slug}: ${mine.length} subtopics | lessons ${withLesson} (${Math.round(withLesson/mine.length*100)}%) | questions ${withQ} (${Math.round(withQ/mine.length*100)}%) | totally empty ${noContent}`);
  }
  console.log(`questions total ${q} (approved ${qApproved}) | flashcards ${cards} | simulations ${sims}`);
  const perQ = subs.reduce((n,s)=>n+s._count.questions,0);
  console.log(`avg questions per subtopic: ${(perQ/subs.length).toFixed(1)}`);
  await db.$disconnect();
}
main();
