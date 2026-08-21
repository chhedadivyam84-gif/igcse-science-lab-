import { syllabuses } from '../src/lib/curriculum';
import { highYieldSeeds } from '../src/lib/curriculum/high-yield';
import { simulations } from '../src/lib/curriculum/simulations';

const valid = new Set<string>();
for (const s of syllabuses) {
  for (const t of s.topics) for (const sub of t.subtopics) valid.add(`${s.subject.slug}:${sub.number}`);
}

let bad = 0;
for (const hy of highYieldSeeds) {
  const key = `${hy.subject}:${hy.subtopic}`;
  if (!valid.has(key)) {
    console.log(`BAD subtopic  ${key}  (rank ${hy.rank})`);
    bad++;
  }
}
for (const sim of simulations) {
  if (sim.subtopicNumber && !valid.has(`${sim.subject}:${sim.subtopicNumber}`)) {
    console.log(`BAD sim subtopic  ${sim.subject}:${sim.subtopicNumber}  (${sim.slug})`);
    bad++;
  }
}

// Ranks must be unique within a subject, or "#3 most asked" appears twice.
const seen = new Map<string, Set<number>>();
for (const hy of highYieldSeeds) {
  const set = seen.get(hy.subject) ?? new Set<number>();
  if (set.has(hy.rank)) {
    console.log(`DUPLICATE rank ${hy.rank} in ${hy.subject}`);
    bad++;
  }
  set.add(hy.rank);
  seen.set(hy.subject, set);
}

// Every question needs a mark scheme that adds up to something sane.
for (const hy of highYieldSeeds) {
  if (!hy.question.markScheme.length) { console.log(`NO mark scheme ${hy.subject} rank ${hy.rank}`); bad++; }
  if (hy.question.marks < 1) { console.log(`ZERO marks ${hy.subject} rank ${hy.rank}`); bad++; }
  if (!hy.trap.trim()) { console.log(`NO trap ${hy.subject} rank ${hy.rank}`); bad++; }
  if (hy.question.type === 'MCQ' && !hy.question.options?.length) {
    console.log(`MCQ with no options: ${hy.subject} rank ${hy.rank}`); bad++;
  }
}

console.log(`\n${highYieldSeeds.length} high-yield questions checked, ${bad} problems.`);
const marks = new Map<string, number>();
for (const hy of highYieldSeeds) marks.set(hy.subject, (marks.get(hy.subject) ?? 0) + hy.question.marks);
for (const [k, v] of marks) console.log(`  ${k}: +${v} marks`);

// --- definitions and formulas resolve to real subtopics --------------------
import { definitions } from '../src/lib/curriculum/definitions';
import { formulas } from '../src/lib/curriculum/formulas';
let orphaned = 0;
for (const d of definitions) {
  if (d.subtopicNumber && !valid.has(`${d.subject}:${d.subtopicNumber}`)) {
    console.log(`BAD definition subtopic ${d.subject}:${d.subtopicNumber} (${d.term})`);
    orphaned++;
  }
}
for (const f of formulas) {
  if (f.subtopicNumber && !valid.has(`${f.subject}:${f.subtopicNumber}`)) {
    console.log(`BAD formula subtopic ${f.subject}:${f.subtopicNumber} (${f.key})`);
    orphaned++;
  }
}
const keys = new Set<string>();
for (const f of formulas) {
  if (keys.has(f.key)) { console.log(`DUPLICATE formula key ${f.key}`); orphaned++; }
  keys.add(f.key);
}
console.log(`${definitions.length} definitions and ${formulas.length} formulas checked, ${orphaned} orphaned.`);

// --- practical questions ----------------------------------------------------
import { practicalSeeds } from '../src/lib/curriculum/practical';
let pBad = 0;
const pMarks = new Map<string, number>();
for (const pr of practicalSeeds) {
  if (!valid.has(`${pr.subject}:${pr.subtopic}`)) {
    console.log(`BAD practical subtopic ${pr.subject}:${pr.subtopic}`);
    pBad++;
  }
  if (!pr.question.markScheme.length) { console.log(`NO mark scheme: practical ${pr.subject}`); pBad++; }
  if (!pr.trap.trim()) { console.log(`NO trap: practical ${pr.subject}`); pBad++; }
  pMarks.set(pr.subject, (pMarks.get(pr.subject) ?? 0) + pr.question.marks);
}
console.log(`\n${practicalSeeds.length} practical questions checked, ${pBad} problems.`);
for (const [k, v] of pMarks) console.log(`  ${k}: ${v} marks available for a 40-mark Paper 6 -> ${v >= 40 ? 'OK' : 'SHORT'}`);
