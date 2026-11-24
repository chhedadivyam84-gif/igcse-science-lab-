import { syllabuses } from '@/lib/curriculum';
import { definitions } from '@/lib/curriculum/definitions';
import { formulas } from '@/lib/curriculum/formulas';
import type { SubjectSlug } from '@/lib/types';
import { type GenFlashcard, type GenQuestion, Rng, card, hashSeed, mcq, stableId } from './core';

/**
 * Conceptual questions and flashcards built from content that already exists
 * and has been checked: every authored flashcard, definition, formula and
 * worked example. Turning each authored card into a multiple-choice question
 * (with the other cards' answers from the same topic as distractors) gives
 * every subject — Biology and ICT included — a large concept bank whose
 * correct answers are the authored ones.
 */

type Fact = { subject: SubjectSlug; subtopic: string; front: string; back: string };

function authoredFacts(): Fact[] {
  const out: Fact[] = [];
  for (const s of syllabuses) {
    for (const t of s.topics) {
      for (const st of t.subtopics) {
        for (const c of st.flashcards ?? []) out.push({ subject: s.subject.slug, subtopic: st.number, front: c.front, back: c.back });
      }
    }
  }
  for (const d of definitions) {
    if (!d.subtopicNumber) continue;
    out.push({ subject: d.subject, subtopic: d.subtopicNumber, front: `Define: ${d.term}`, back: d.examWording ?? d.statement });
  }
  return out;
}

/** Authored facts as multiple choice, distractors drawn from the same topic, then the same subject. */
export function conceptQuestions(): GenQuestion[] {
  const facts = authoredFacts();
  const out: GenQuestion[] = [];
  const bySubtopic = new Map<string, Fact[]>();
  const bySubject = new Map<string, Fact[]>();
  for (const f of facts) {
    bySubtopic.set(`${f.subject}:${f.subtopic}`, [...(bySubtopic.get(`${f.subject}:${f.subtopic}`) ?? []), f]);
    bySubject.set(f.subject, [...(bySubject.get(f.subject) ?? []), f]);
  }

  for (const f of facts) {
    const r = new Rng(hashSeed(`concept:${f.subject}:${f.front}`));
    const local = (bySubtopic.get(`${f.subject}:${f.subtopic}`) ?? []).filter((x) => x.back !== f.back);
    const wide = (bySubject.get(f.subject) ?? []).filter((x) => x.back !== f.back && x.subtopic.split('.')[0] === f.subtopic.split('.')[0]);
    const pool = [...r.shuffle(local), ...r.shuffle(wide)].map((x) => x.back);
    // Distractors should look like answers of the same kind: prefer similar length.
    const near = pool.filter((b) => b.length > f.back.length * 0.4 && b.length < f.back.length * 2.2);
    const opts = mcq(r, f.back, near.length >= 3 ? near.slice(0, 6) : pool.slice(0, 6));
    if (!opts) continue;
    const stem = f.front.endsWith('?') || f.front.startsWith('Define') ? f.front : `Which is the correct answer to: “${f.front.replace(/[.:]$/, '')}”?`;
    out.push({
      id: stableId('gq', f.subject, f.subtopic, `concept:${stem}`),
      subject: f.subject,
      subtopic: f.subtopic,
      type: 'MCQ',
      difficulty: 'STANDARD',
      stem: stem.startsWith('Define: ') ? `Which statement best defines “${stem.slice(8)}”?` : stem,
      options: opts.options,
      answer: opts.answer,
      markScheme: [`${f.back} (1)`],
      marks: 1,
      explanation: f.back,
    });

    // The reverse direction for definitions: statement → term.
    if (f.front.startsWith('Define: ')) {
      const term = f.front.slice(8);
      const terms = (bySubject.get(f.subject) ?? []).filter((x) => x.front.startsWith('Define: ') && x.front !== f.front).map((x) => x.front.slice(8));
      const o2 = mcq(r, term, r.shuffle(terms).slice(0, 6));
      if (o2) {
        const stem2 = `Which term is described by: “${f.back}”?`;
        out.push({
          id: stableId('gq', f.subject, f.subtopic, `term:${stem2}`),
          subject: f.subject,
          subtopic: f.subtopic,
          type: 'MCQ',
          difficulty: 'FOUNDATION',
          stem: stem2,
          options: o2.options,
          answer: o2.answer,
          markScheme: [`${term} (1)`],
          marks: 1,
          explanation: `${term}: ${f.back}`,
        });
      }
    }
  }

  // Written recall of definitions, AI-marked against the authored wording.
  for (const d of definitions) {
    if (!d.subtopicNumber) continue;
    const stem = `State the meaning of the term “${d.term}”.`;
    out.push({
      id: stableId('gq', d.subject, d.subtopicNumber, stem),
      subject: d.subject,
      subtopic: d.subtopicNumber,
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem,
      options: [],
      answer: d.examWording ?? d.statement,
      markScheme: [`${d.examWording ?? d.statement} (2)`],
      marks: 2,
      explanation: d.examWording && d.examWording !== d.statement ? `${d.statement} Examiners expect: ${d.examWording}` : d.statement,
    });
  }

  // Formula recall: which equation links these quantities?
  for (const f of formulas) {
    if (!f.subtopicNumber) continue;
    const r = new Rng(hashSeed(`formula:${f.key}`));
    const others = formulas.filter((x) => x.subject === f.subject && x.key !== f.key).map((x) => x.expression);
    const opts = mcq(r, f.expression, r.shuffle(others).slice(0, 6));
    if (!opts) continue;
    const stem = `Which equation is used to calculate ${f.name.toLowerCase()}?`;
    out.push({
      id: stableId('gq', f.subject, f.subtopicNumber, stem),
      subject: f.subject,
      subtopic: f.subtopicNumber,
      type: 'MCQ',
      difficulty: 'FOUNDATION',
      stem,
      options: opts.options,
      answer: opts.answer,
      markScheme: [`${f.expression} (1)`],
      marks: 1,
      explanation: `${f.expression}, where ${f.variables.map((v) => `${v.symbol} = ${v.label.toLowerCase()} (${v.unit})`).join(', ')}.`,
    });
  }
  return out;
}

/** Flashcards from definitions, formulas, units and worked examples. */
export function conceptFlashcards(): GenFlashcard[] {
  const out: GenFlashcard[] = [];
  for (const d of definitions) {
    if (!d.subtopicNumber) continue;
    out.push(card(d.subject, d.subtopicNumber, `Define: ${d.term}`, d.examWording ?? d.statement, 'MEDIUM'));
    out.push(card(d.subject, d.subtopicNumber, `Which term means: “${d.statement}”`, d.term, 'EASY'));
  }
  for (const f of formulas) {
    if (!f.subtopicNumber) continue;
    out.push(card(f.subject, f.subtopicNumber, `Equation for ${f.name.toLowerCase()}?`, f.expression, 'EASY'));
    out.push(card(f.subject, f.subtopicNumber, `In ${f.expression}, what does each symbol stand for?`, f.variables.map((v) => `${v.symbol} = ${v.label.toLowerCase()} (${v.unit})`).join('; '), 'MEDIUM'));
    for (const v of f.variables) {
      if (!v.unit || v.unit === '—') continue;
      out.push(card(f.subject, f.subtopicNumber, `What is the unit of ${v.label.toLowerCase()} (${v.symbol})?`, v.unit, 'EASY'));
    }
    if (f.notes) out.push(card(f.subject, f.subtopicNumber, `Exam note on ${f.expression}?`, f.notes, 'HARD'));
  }
  for (const s of syllabuses) {
    for (const t of s.topics) {
      for (const st of t.subtopics) {
        for (const lesson of st.lessons ?? []) {
          for (const ex of lesson.workedExamples) {
            out.push(card(s.subject.slug, st.number, ex.prompt, `${ex.answer}${ex.steps.length ? ` — ${ex.steps.join(' → ')}` : ''}`.slice(0, 600), 'HARD'));
          }
        }
      }
    }
  }
  // Duplicate fronts collapse to one card (the id is a hash of the front).
  return [...new Map(out.map((c) => [c.id, c])).values()];
}
