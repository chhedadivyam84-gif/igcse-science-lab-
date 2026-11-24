/**
 * Loads the generated question and flashcard bank into the database.
 *
 * Runs at build time (see package.json). Every row has a stable id derived
 * from its content, so this is idempotent and cheap to repeat: createMany with
 * skipDuplicates inserts only what is new and never touches a row a student
 * has already answered or reviewed. A failure here must not break a deploy,
 * so errors are logged and the script exits 0.
 */
import { PrismaClient } from '@prisma/client';
import { generateBank } from '../src/lib/bank';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log('[seed-bank] DATABASE_URL not set — skipping.');
    return;
  }
  const db = new PrismaClient();
  try {
    const { questions, flashcards } = generateBank();

    const subjects = await db.subject.findMany({ select: { id: true, slug: true } });
    const subjectId = new Map(subjects.map((s) => [s.slug, s.id]));
    const subtopics = await db.subtopic.findMany({
      where: { topic: { version: { isActive: true } } },
      select: { id: true, number: true, topic: { select: { version: { select: { subject: { select: { slug: true } } } } } } },
    });
    const subtopicId = new Map(subtopics.map((s) => [`${s.topic.version.subject.slug}:${s.number}`, s.id]));
    if (!subtopicId.size) {
      console.log('[seed-bank] No syllabus in the database yet (run the main seed first) — skipping.');
      return;
    }

    const qRows = questions
      .filter((q) => subjectId.has(q.subject) && subtopicId.has(`${q.subject}:${q.subtopic}`))
      .map((q) => ({
        id: q.id,
        subjectId: subjectId.get(q.subject)!,
        subtopicId: subtopicId.get(`${q.subject}:${q.subtopic}`)!,
        type: q.type,
        difficulty: q.difficulty,
        stem: q.stem,
        options: JSON.stringify(q.options),
        answer: q.answer,
        markScheme: JSON.stringify(q.markScheme),
        marks: q.marks,
        explanation: q.explanation,
        hint: q.hint ?? null,
        origin: 'GENERATED',
        reviewStatus: 'APPROVED',
      }));

    let addedQ = 0;
    for (let i = 0; i < qRows.length; i += 1000) {
      const result = await db.question.createMany({ data: qRows.slice(i, i + 1000), skipDuplicates: true });
      addedQ += result.count;
    }

    const fRows = flashcards
      .filter((c) => subtopicId.has(`${c.subject}:${c.subtopic}`))
      .map((c) => ({
        id: c.id,
        subtopicId: subtopicId.get(`${c.subject}:${c.subtopic}`)!,
        front: c.front,
        back: c.back,
        difficulty: c.difficulty,
        origin: 'GENERATED',
      }));
    let addedF = 0;
    for (let i = 0; i < fRows.length; i += 1000) {
      const result = await db.flashcard.createMany({ data: fRows.slice(i, i + 1000), skipDuplicates: true });
      addedF += result.count;
    }

    console.log(
      `[seed-bank] questions: ${qRows.length} in bank, ${addedQ} new · flashcards: ${fRows.length} in bank, ${addedF} new`,
    );
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error('[seed-bank] failed (deploy continues):', error instanceof Error ? error.message : error);
  process.exit(0);
});
