import { syllabuses } from '../src/lib/curriculum';
for (const s of syllabuses) {
  console.log(`/learn/${s.subject.slug}`);
  for (const t of s.topics) {
    console.log(`/learn/${s.subject.slug}/${t.slug}`);
    for (const st of t.subtopics) console.log(`/learn/${s.subject.slug}/${t.slug}/${st.slug}`);
  }
}
