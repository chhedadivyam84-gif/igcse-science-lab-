import { simulations } from '../src/lib/curriculum/simulations';
import { AVAILABLE_SIMULATIONS } from '../src/components/sim/available';

const avail = new Set<string>(AVAILABLE_SIMULATIONS as readonly string[]);
const bySubject = new Map<string, typeof simulations>();
for (const s of simulations) {
  const list = bySubject.get(s.subject) ?? [];
  list.push(s);
  bySubject.set(s.subject, list);
}
for (const [k, v] of bySubject) {
  console.log(`${k}: ${v.length} seeded, ${v.filter((x) => avail.has(x.component)).length} implemented`);
  for (const s of v) console.log(`   ${avail.has(s.component) ? 'OK  ' : 'MISS'} ${s.component}  (${s.slug})`);
}
const seeded = new Set(simulations.map((s) => s.component));
const orphan = (AVAILABLE_SIMULATIONS as readonly string[]).filter((c) => !seeded.has(c));
console.log(`\nimplemented but never seeded (invisible to students): ${orphan.length ? orphan.join(', ') : 'none'}`);
