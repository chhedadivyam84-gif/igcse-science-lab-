import { syllabuses } from '../src/lib/curriculum';
import { formulas } from '../src/lib/curriculum/formulas';
import { definitions } from '../src/lib/curriculum/definitions';
import { simulations } from '../src/lib/curriculum/simulations';
import { highYieldSeeds } from '../src/lib/curriculum/high-yield';

const pad = (s: unknown, n: number) => String(s).padEnd(n);
console.log(
  pad('subject', 12) + pad('topics', 7) + pad('subs', 6) + pad('lessons', 8) +
  pad('cards', 7) + pad('quest', 7) + pad('marks', 7) + pad('formul', 8) +
  pad('defs', 6) + pad('sims', 6) + 'highYield',
);
let totalSubs = 0, noLesson = 0, noQ = 0, noCards = 0;
const gaps: string[] = [];
for (const s of syllabuses) {
  const subs = s.topics.flatMap((t) => t.subtopics);
  totalSubs += subs.length;
  const lessons = subs.reduce((n, x) => n + (x.lessons?.length ?? 0), 0);
  const cards = subs.reduce((n, x) => n + (x.flashcards?.length ?? 0), 0);
  const qs = subs.flatMap((x) => x.questions ?? []);
  const marks = qs.reduce((n, q) => n + q.marks, 0);
  noLesson += subs.filter((x) => !x.lessons?.length).length;
  noQ += subs.filter((x) => !x.questions?.length).length;
  noCards += subs.filter((x) => !x.flashcards?.length).length;
  for (const x of subs) {
    const missing: string[] = [];
    if (!x.lessons?.length) missing.push('lesson');
    if (!x.questions?.length) missing.push('questions');
    if (!x.flashcards?.length) missing.push('flashcards');
    if (missing.length) gaps.push(`${s.subject.slug} ${x.number} ${x.title} — no ${missing.join(', no ')}`);
  }
  console.log(
    pad(s.subject.slug, 12) + pad(s.topics.length, 7) + pad(subs.length, 6) + pad(lessons, 8) +
    pad(cards, 7) + pad(qs.length, 7) + pad(marks, 7) +
    pad(formulas.filter((f) => f.subject === s.subject.slug).length, 8) +
    pad(definitions.filter((d) => d.subject === s.subject.slug).length, 6) +
    pad(simulations.filter((x) => x.subject === s.subject.slug).length, 6) +
    highYieldSeeds.filter((h) => h.subject === s.subject.slug).length,
  );
}
console.log(`\nsubtopics with NO lesson:     ${noLesson} / ${totalSubs}`);
console.log(`subtopics with NO questions:  ${noQ} / ${totalSubs}`);
console.log(`subtopics with NO flashcards: ${noCards} / ${totalSubs}`);
console.log(`\n--- ${gaps.length} subtopics with gaps ---`);
console.log(gaps.slice(0, 60).join('\n'));
if (gaps.length > 60) console.log(`… and ${gaps.length - 60} more`);
