/**
 * Seeds the syllabus structure, authored content and two accounts.
 *
 * Everything here is idempotent (upserts keyed on natural keys), so it is safe
 * to re-run after editing the curriculum files.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { definitions } from '../src/lib/curriculum/definitions';
import { formulas } from '../src/lib/curriculum/formulas';
import { simulations } from '../src/lib/curriculum/simulations';
import { syllabuses } from '../src/lib/curriculum';

const db = new PrismaClient();

const ACHIEVEMENTS = [
  { key: 'first-steps', title: 'First steps', description: 'Answer your first practice question.', icon: 'sparkles', xp: 25 },
  { key: 'streak-3', title: 'Three in a row', description: 'Study on three consecutive days.', icon: 'flame', xp: 50 },
  { key: 'streak-7', title: 'Full week', description: 'Study on seven consecutive days.', icon: 'flame', xp: 120 },
  { key: 'topic-master', title: 'Topic mastered', description: 'Reach 80% mastery in any subtopic.', icon: 'target', xp: 150 },
  { key: 'exam-ready', title: 'Exam ready', description: 'Complete a full timed exam paper.', icon: 'clipboard-check', xp: 200 },
  { key: 'curious', title: 'Curious mind', description: 'Ask the AI tutor 25 questions.', icon: 'message-circle', xp: 75 },
  { key: 'lab-explorer', title: 'Lab explorer', description: 'Try five different simulations.', icon: 'flask-conical', xp: 100 },
  { key: 'note-taker', title: 'Note taker', description: 'Generate ten sets of revision notes.', icon: 'notebook-pen', xp: 90 },
];

async function main() {
  console.log('Seeding IGCSE Science Lab…\n');

  // --- Subjects, syllabus versions and the topic tree ----------------------
  const subtopicIdByNumber = new Map<string, string>();
  const subjectIdBySlug = new Map<string, string>();

  for (const seed of syllabuses) {
    const subject = await db.subject.upsert({
      where: { code: seed.subject.code },
      update: {
        slug: seed.subject.slug,
        name: seed.subject.name,
        tagline: seed.subject.tagline,
        accent: seed.subject.accent,
      },
      create: {
        code: seed.subject.code,
        slug: seed.subject.slug,
        name: seed.subject.name,
        tagline: seed.subject.tagline,
        accent: seed.subject.accent,
      },
    });
    subjectIdBySlug.set(seed.subject.slug, subject.id);

    const version = await db.syllabusVersion.upsert({
      where: { code: seed.version.code },
      update: {
        label: seed.version.label,
        examFrom: seed.version.examFrom,
        examTo: seed.version.examTo,
        provenance: seed.version.provenance,
        sourceNote: seed.version.sourceNote,
        isActive: true,
      },
      create: {
        subjectId: subject.id,
        code: seed.version.code,
        label: seed.version.label,
        examFrom: seed.version.examFrom,
        examTo: seed.version.examTo,
        provenance: seed.version.provenance,
        sourceNote: seed.version.sourceNote,
        isActive: true,
      },
    });

    let topicOrder = 0;
    for (const topicSeed of seed.topics) {
      const topic = await db.topic.upsert({
        where: { syllabusVersionId_slug: { syllabusVersionId: version.id, slug: topicSeed.slug } },
        update: {
          number: topicSeed.number,
          title: topicSeed.title,
          summary: topicSeed.summary,
          order: topicOrder,
        },
        create: {
          syllabusVersionId: version.id,
          number: topicSeed.number,
          slug: topicSeed.slug,
          title: topicSeed.title,
          summary: topicSeed.summary,
          order: topicOrder,
        },
      });
      topicOrder++;

      let subOrder = 0;
      for (const subSeed of topicSeed.subtopics) {
        const subtopic = await db.subtopic.upsert({
          where: { topicId_slug: { topicId: topic.id, slug: subSeed.slug } },
          update: {
            number: subSeed.number,
            title: subSeed.title,
            summary: subSeed.summary,
            order: subOrder,
            prerequisites: JSON.stringify(subSeed.prerequisites ?? []),
          },
          create: {
            topicId: topic.id,
            number: subSeed.number,
            slug: subSeed.slug,
            title: subSeed.title,
            summary: subSeed.summary,
            order: subOrder,
            prerequisites: JSON.stringify(subSeed.prerequisites ?? []),
          },
        });
        subOrder++;
        subtopicIdByNumber.set(subSeed.number, subtopic.id);

        // Objectives — replaced wholesale so edits to the seed always win.
        await db.learningObjective.deleteMany({ where: { subtopicId: subtopic.id } });
        if (subSeed.objectives?.length) {
          await db.learningObjective.createMany({
            data: subSeed.objectives.map((o, i) => ({
              subtopicId: subtopic.id,
              code: o.code,
              statement: o.statement,
              tier: o.tier,
              order: i,
              // Teacher-mapped phrasing: not yet checked against the official
              // specification, and the UI says so.
              verified: false,
            })),
          });
        }

        for (const [i, lesson] of (subSeed.lessons ?? []).entries()) {
          await db.lesson.upsert({
            where: { subtopicId_slug: { subtopicId: subtopic.id, slug: lesson.slug } },
            update: {
              title: lesson.title,
              order: i,
              readingMinutes: lesson.readingMinutes,
              body: lesson.body,
              analogy: lesson.analogy ?? null,
              misconceptions: JSON.stringify(lesson.misconceptions),
              examTips: JSON.stringify(lesson.examTips),
              workedExamples: JSON.stringify(lesson.workedExamples),
              status: 'PUBLISHED',
            },
            create: {
              subtopicId: subtopic.id,
              slug: lesson.slug,
              title: lesson.title,
              order: i,
              readingMinutes: lesson.readingMinutes,
              body: lesson.body,
              analogy: lesson.analogy ?? null,
              misconceptions: JSON.stringify(lesson.misconceptions),
              examTips: JSON.stringify(lesson.examTips),
              workedExamples: JSON.stringify(lesson.workedExamples),
              status: 'PUBLISHED',
            },
          });
        }

        // Authored flashcards and questions are keyed by their text, since they
        // have no natural slug.
        for (const card of subSeed.flashcards ?? []) {
          const existing = await db.flashcard.findFirst({
            where: { subtopicId: subtopic.id, front: card.front },
          });
          if (existing) {
            await db.flashcard.update({
              where: { id: existing.id },
              data: { back: card.back, difficulty: card.difficulty },
            });
          } else {
            await db.flashcard.create({
              data: {
                subtopicId: subtopic.id,
                front: card.front,
                back: card.back,
                difficulty: card.difficulty,
                origin: 'AUTHORED',
              },
            });
          }
        }

        for (const q of subSeed.questions ?? []) {
          const existing = await db.question.findFirst({
            where: { subtopicId: subtopic.id, stem: q.stem },
          });
          const data = {
            subjectId: subject.id,
            subtopicId: subtopic.id,
            type: q.type,
            difficulty: q.difficulty,
            stem: q.stem,
            options: JSON.stringify(q.options ?? []),
            answer: q.answer,
            markScheme: JSON.stringify(q.markScheme),
            marks: q.marks,
            explanation: q.explanation,
            hint: q.hint ?? null,
            origin: 'AUTHORED',
            reviewStatus: 'APPROVED',
          };
          if (existing) await db.question.update({ where: { id: existing.id }, data });
          else await db.question.create({ data });
        }
      }
    }

    console.log(
      `  ${seed.subject.name} ${seed.subject.code}: ${seed.topics.length} topics, ` +
        `${seed.topics.reduce((n, t) => n + t.subtopics.length, 0)} subtopics`,
    );
  }

  // --- Formulas ------------------------------------------------------------
  for (const f of formulas) {
    const subjectId = subjectIdBySlug.get(f.subject)!;
    const data = {
      subjectId,
      subtopicId: f.subtopicNumber ? (subtopicIdByNumber.get(f.subtopicNumber) ?? null) : null,
      name: f.name,
      expression: f.expression,
      variables: JSON.stringify(f.variables),
      resultUnit: f.resultUnit,
      notes: f.notes ?? null,
      verified: false,
    };
    await db.formula.upsert({ where: { key: f.key }, update: data, create: { key: f.key, ...data } });
  }
  console.log(`  ${formulas.length} formulas`);

  // --- Definitions ---------------------------------------------------------
  for (const d of definitions) {
    const subjectId = subjectIdBySlug.get(d.subject)!;
    const existing = await db.definition.findFirst({ where: { subjectId, term: d.term } });
    const data = {
      subjectId,
      subtopicId: d.subtopicNumber ? (subtopicIdByNumber.get(d.subtopicNumber) ?? null) : null,
      term: d.term,
      statement: d.statement,
      examWording: d.examWording ?? null,
      verified: false,
    };
    if (existing) await db.definition.update({ where: { id: existing.id }, data });
    else await db.definition.create({ data });
  }
  console.log(`  ${definitions.length} definitions`);

  // --- Simulations ---------------------------------------------------------
  for (const s of simulations) {
    const subjectId = subjectIdBySlug.get(s.subject)!;
    const data = {
      subjectId,
      subtopicId: s.subtopicNumber ? (subtopicIdByNumber.get(s.subtopicNumber) ?? null) : null,
      title: s.title,
      description: s.description,
      component: s.component,
      concepts: JSON.stringify(s.concepts),
      order: s.order,
    };
    await db.simulation.upsert({ where: { slug: s.slug }, update: data, create: { slug: s.slug, ...data } });
  }
  console.log(`  ${simulations.length} simulations`);

  // --- Achievements --------------------------------------------------------
  for (const a of ACHIEVEMENTS) {
    await db.achievement.upsert({ where: { key: a.key }, update: a, create: a });
  }
  console.log(`  ${ACHIEVEMENTS.length} achievements`);

  // --- Accounts ------------------------------------------------------------
  // Development credentials only. Change them before deploying anywhere real.
  const studentPassword = await bcrypt.hash('student1234', 12);
  const adminPassword = await bcrypt.hash('admin1234', 12);

  await db.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Demo Student',
      passwordHash: studentPassword,
      role: 'STUDENT',
      targetGrade: 'A*',
      examSeries: 'May/June 2026',
    },
  });

  // Kept as a second demo login. It no longer reaches the owner console — that
  // is decided by OWNER_EMAIL, not by this role column.
  await db.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Content Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('\nDemo accounts (development only — change before deploying):');
  console.log('  student@example.com / student1234');
  console.log('  admin@example.com   / admin1234   (no owner console access)');

  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase();
  console.log('\nOwner console:');
  if (!owner) {
    console.log('  OWNER_EMAIL is not set, so /admin is disabled.');
    console.log('  Set it in .env, then register at /signup with that address.');
  } else {
    const existing = await db.user.findUnique({ where: { email: owner } });
    console.log(`  Locked to ${owner}`);
    console.log(
      existing
        ? '  That account exists — sign in and the console appears in your account menu.'
        : '  Register at /signup with that address to claim it. No password is seeded for it.',
    );
  }

  console.log('\nNew accounts start with an empty dashboard. Progress appears as you use the app.');
  console.log('\nDone.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
