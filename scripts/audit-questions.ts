import { syllabuses } from '../src/lib/curriculum';

let n = 0;
for (const s of syllabuses) {
  console.log(`\n########## ${s.subject.name} ${s.subject.code} ##########`);
  for (const t of s.topics) {
    for (const st of t.subtopics) {
      for (const q of st.questions ?? []) {
        n++;
        console.log(`\n--- [${n}] ${s.subject.code} ${st.number} ${st.title} | ${q.type} | ${q.difficulty} | ${q.marks}m`);
        console.log(`Q: ${q.stem}`);
        if (q.options) q.options.forEach(o => console.log(`   (${o.id}) ${o.text}`));
        console.log(`A: ${q.answer}`);
        console.log(`MS: ${q.markScheme.join(' | ')}`);
      }
    }
  }
}
console.log(`\n\nTOTAL QUESTIONS: ${n}`);
