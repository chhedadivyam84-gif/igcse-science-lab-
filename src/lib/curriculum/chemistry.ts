import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Chemistry 0620 — topic structure.
 *
 * Same provenance rules as Physics: numbering follows the published 0620
 * specification for first examination 2023, while objective wording is a
 * teaching paraphrase seeded as unverified until an administrator checks it.
 */
export const chemistry0620: SyllabusSeed = {
  subject: {
    code: '0620',
    slug: 'chemistry',
    name: 'Chemistry',
    tagline: 'Particles, bonding, reactions and the chemistry of the world.',
    accent: 'chemistry',
  },
  version: {
    code: '0620-2023-2025',
    label: 'Chemistry 0620 — for examination 2023–2025',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Structure mapped from the Cambridge IGCSE Chemistry 0620 specification (first examination 2023). Objective wording is a teaching paraphrase — check against the official syllabus PDF before relying on it for exam preparation.',
  },
  topics: [
    {
      number: '1',
      slug: 'states-of-matter',
      title: 'States of matter',
      summary: 'The particle model of solids, liquids and gases, changes of state, and diffusion.',
      subtopics: [
        {
          number: '1.1',
          slug: 'solids-liquids-and-gases',
          title: 'Solids, liquids and gases',
          summary: 'Particle arrangement, motion and separation in each state, and the changes between them.',
          objectives: [
            { code: '1.1.1', statement: 'Describe the states of matter in terms of the arrangement, separation and motion of particles.', tier: 'CORE' },
            { code: '1.1.2', statement: 'Describe changes of state and explain them using the kinetic particle model.', tier: 'CORE' },
            { code: '1.1.3', statement: 'Explain the effects of temperature and pressure on the volume of a gas.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['particle-model'],
          lessons: [
            {
              slug: 'the-particle-model',
              title: 'The particle model',
              readingMinutes: 6,
              body: `Everything is made of particles that are always moving. What changes between the states is how those particles are **arranged**, how far **apart** they are, and how they **move**.

| | Solid | Liquid | Gas |
| --- | --- | --- | --- |
| Arrangement | regular, ordered | irregular, random | random |
| Separation | touching | touching | far apart |
| Motion | vibrate in fixed positions | slide past one another | fast, random, in all directions |

### Changes of state
- **Melting** (solid → liquid) and **freezing** (liquid → solid)
- **Boiling / evaporating** (liquid → gas) and **condensing** (gas → liquid)
- **Sublimation** (solid → gas directly)

Heating supplies energy that increases particle kinetic energy. At a change of state, the energy instead **overcomes the forces of attraction** between particles, which is why the temperature does not rise while a substance melts.

### Boiling vs evaporation
Boiling happens at a fixed temperature, throughout the liquid, with bubbles forming. Evaporation happens at any temperature, only at the surface, and is faster when the temperature is higher, the surface area is larger, or there is more airflow.

### Gases under pressure
Gas particles are far apart, so a gas can be compressed. Increasing temperature at constant pressure makes particles move faster and spread out, increasing the volume.`,
              analogy:
                'Solid = people packed in a lift, shuffling on the spot. Liquid = a crowd at a market, touching but moving past each other. Gas = a few people sprinting around an empty stadium.',
              misconceptions: [
                'Saying particles get bigger when heated. They gain energy and move more; their size is unchanged.',
                'Confusing boiling with evaporation. Boiling is at a fixed temperature throughout the liquid; evaporation is at the surface at any temperature.',
                'Thinking there is air between particles in a gas — the space between gas particles is empty.',
              ],
              examTips: [
                'When asked to "describe" a state, always cover all three things: arrangement, separation, motion. One mark each is common.',
                'Change-of-state explanations need the phrase "overcome the forces of attraction between particles".',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a gas can be compressed but a liquid cannot easily be.',
                  steps: [
                    'In a gas the particles are far apart with large spaces between them.',
                    'Applying pressure pushes them closer together into those spaces.',
                    'In a liquid the particles are already touching, so there is almost no space to remove.',
                  ],
                  answer: 'Gases compress because of the large spaces between particles; liquids do not because their particles are already in contact.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Describe the particles in a solid.', back: 'Regularly arranged, touching, vibrating about fixed positions.', difficulty: 'EASY' },
            { front: 'What happens to the temperature during melting?', back: 'It stays constant — energy is used to overcome forces of attraction between particles.', difficulty: 'MEDIUM' },
            { front: 'Name the change of state from solid straight to gas.', back: 'Sublimation.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'In which state are the particles far apart and moving randomly at high speed?',
              options: [
                { id: 'a', text: 'Solid', why: 'Solid particles are touching and only vibrate.' },
                { id: 'b', text: 'Liquid', why: 'Liquid particles are touching but can slide past each other.' },
                { id: 'c', text: 'Gas', why: '' },
                { id: 'd', text: 'All three equally', why: 'The three states differ precisely in separation and motion.' },
              ],
              answer: 'c',
              markScheme: ['Gas (1)'],
              marks: 1,
              explanation: 'Only in a gas are particles far apart with fast, random motion in all directions.',
            },
          ],
        },
        {
          number: '1.2',
          slug: 'diffusion',
          title: 'Diffusion',
          summary: 'The movement of particles from high to low concentration, and the effect of relative molecular mass.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '1.2.1', statement: 'Describe and explain diffusion in terms of the random motion of particles.', tier: 'CORE' },
            { code: '1.2.2', statement: 'Explain why gases with a lower relative molecular mass diffuse faster.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['diffusion-tube'],
          lessons: [
            {
              slug: 'diffusion',
              title: 'Diffusion',
              readingMinutes: 6,
              body: `**Diffusion** is the net movement of particles from a region of higher concentration to a region of lower concentration, caused by their random motion. It happens in liquids and gases, where particles are free to move past one another, but not in solids.

No external force or stirring is needed — diffusion happens purely because particles move randomly in all directions, so over time they spread out and mix until evenly distributed.

### Diffusion and relative molecular mass
At a given temperature, all particles have the same average kinetic energy. Since \`Ek = ½mv²\`, a **lighter** particle must be moving **faster** than a heavier one to have the same kinetic energy. This means gases with a **lower relative molecular mass diffuse faster** than gases with a higher relative molecular mass.

This is demonstrated by the classic ammonia and hydrogen chloride experiment: cotton wool soaked in ammonia solution (Mr 17) is placed at one end of a tube, and cotton wool soaked in hydrochloric acid (Mr 36.5) at the other. A white ring of ammonium chloride forms where the two gases meet — and because ammonia is lighter and diffuses faster, the ring forms **nearer the hydrochloric acid end**.

### Rate of diffusion
Diffusion is faster at higher temperatures, because particles have more kinetic energy and move faster.`,
              analogy:
                'Diffusion is like a drop of ink spreading through still water: no one stirs it, but the random jostling of the water molecules gradually carries the ink particles outward until the colour is evenly spread through the whole glass.',
              misconceptions: [
                'Thinking diffusion needs stirring or another external force. It happens by itself, driven entirely by the random motion of particles.',
                'Believing heavier gas particles diffuse faster because they have "more energy". At the same temperature all particles share the same average kinetic energy, so it is the lighter particles that move faster.',
                'Assuming the white ring in the ammonia/HCl experiment forms exactly in the middle. It forms closer to the heavier, slower-diffusing gas (HCl), because the lighter ammonia travels further in the same time.',
              ],
              examTips: [
                'When comparing diffusion rates, always compare relative molecular masses explicitly and state that the lighter particles move faster — do not just say one gas "diffuses better".',
                'Diffusion questions about solids expect the answer "diffusion does not happen (or is negligible) in solids, because the particles are not free to move from place to place".',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Define diffusion.', back: 'The net movement of particles from a region of higher concentration to a region of lower concentration, due to their random motion.', difficulty: 'MEDIUM' },
            { front: 'Which gas diffuses faster, ammonia (Mr 17) or hydrogen chloride (Mr 36.5)?', back: 'Ammonia — lighter particles move faster at the same temperature.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Cotton wool soaked in concentrated ammonia solution is placed at one end of a long glass tube and cotton wool soaked in concentrated hydrochloric acid at the other. A white ring of ammonium chloride forms nearer the hydrochloric acid end. Explain why.',
              answer:
                'Both gases diffuse along the tube because their particles move randomly. Ammonia has a lower relative molecular mass (17) than hydrogen chloride (36.5), so its particles move faster at the same temperature and it diffuses further before they meet. The ring therefore forms nearer the hydrochloric acid end.',
              markScheme: [
                'Both gases diffuse / particles move randomly (1)',
                'Ammonia has a lower relative molecular mass than HCl (1)',
                'Lighter particles move faster, so ammonia diffuses further (1)',
                'They meet nearer the HCl end (1)',
              ],
              marks: 4,
              explanation:
                'The key comparison is relative molecular mass: NH₃ is 17, HCl is 36.5. At the same temperature the average kinetic energy is the same, so the lighter particles must be travelling faster.',
              hint: 'Compare the relative molecular masses.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'atoms-elements-compounds',
      title: 'Atoms, elements and compounds',
      summary: 'Atomic structure, the Periodic Table, isotopes, and the three types of bonding.',
      subtopics: [
        {
          number: '2.1',
          slug: 'elements-compounds-mixtures',
          title: 'Elements, compounds and mixtures',
          summary: 'The difference between an element, a compound and a mixture.',
          objectives: [
            { code: '2.1.1', statement: 'Describe the differences between elements, compounds and mixtures.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'elements-compounds-mixtures',
              title: 'Elements, compounds and mixtures',
              readingMinutes: 5,
              body: `### Elements
An **element** is a substance made of only one type of atom. It cannot be broken down into anything simpler by chemical means. There are around 118 known elements, each represented by its own symbol on the Periodic Table.

### Compounds
A **compound** forms when two or more different elements are **chemically joined** in a **fixed proportion**. Because the atoms are bonded together, a compound has different properties from the elements it is made of — for example, sodium (a reactive metal) and chlorine (a toxic gas) combine to form sodium chloride, an unreactive, edible salt. Compounds can only be separated back into their elements by a chemical reaction.

### Mixtures
A **mixture** contains two or more substances that are **not chemically joined**. There is no fixed proportion — a mixture can contain any ratio of its components — and each substance keeps its own properties. Because nothing is chemically bonded, mixtures can be separated by **physical methods** such as filtration, evaporation or distillation.

### Telling them apart
The two defining questions are: are the parts chemically joined? And is there a fixed proportion? A "yes" to both means a compound; a "no" to both means a mixture.`,
              analogy:
                'Think of building blocks: a pure colour of blocks is an element, blocks permanently glued together in a fixed pattern to make a specific model is a compound, and blocks simply tipped into the same box unglued, in whatever amounts you like, is a mixture.',
              misconceptions: [
                'Thinking air, which contains several gases, is a compound because it has a "typical" composition. It is a mixture — the gases are not chemically joined, and the proportions can vary slightly.',
                'Assuming a mixture must look uniform to be a mixture. Salt water looks completely uniform but is still a mixture, because the salt and water are not chemically combined.',
                'Believing a compound keeps the properties of the elements that formed it. A compound typically has entirely different properties from its constituent elements.',
              ],
              examTips: [
                'When asked to classify a substance, give a reason referring to bonding and proportion — "it is a mixture, because the components are not chemically joined and can be present in any ratio" scores more than just naming the category.',
                'A common exam trap is a compound name that "sounds like" a mixture, or vice versa — always check what the question tells you about how the substance was formed.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Define an element.', back: 'A substance made of only one type of atom, which cannot be broken down chemically.', difficulty: 'EASY' },
            { front: 'How does a compound differ from a mixture?', back: 'A compound has its elements chemically joined in fixed proportions; a mixture is not chemically joined and can be separated physically.', difficulty: 'MEDIUM' },
            { front: 'Define a mixture.', back: 'Two or more substances that are not chemically combined, in no fixed proportion, and can be separated by physical means.', difficulty: 'EASY' },
            { front: 'Is air an element, compound or mixture?', back: 'A mixture — mainly nitrogen and oxygen, not chemically combined.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which of these is a compound?',
              options: [
                { id: 'a', text: 'Air', why: 'Air is a mixture of gases, not chemically joined.' },
                { id: 'b', text: 'Oxygen gas, O₂', why: 'This is an element — only one type of atom.' },
                { id: 'c', text: 'Carbon dioxide, CO₂', why: '' },
                { id: 'd', text: 'Salt water', why: 'A mixture — the salt is not chemically joined to the water.' },
              ],
              answer: 'c',
              markScheme: ['Carbon dioxide (1)'],
              marks: 1,
              explanation: 'A compound contains two or more different elements chemically joined in a fixed ratio. CO₂ has carbon and oxygen chemically bonded together.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain, giving one difference, why salt water is classified as a mixture rather than a compound. [2]',
              answer:
                'In salt water the salt and water are not chemically joined — the proportions can vary, and the salt can be separated from the water by a physical method such as evaporation, whereas the elements in a compound can only be separated chemically.',
              markScheme: [
                'The components are not chemically joined / can be present in any proportion (1)',
                'The salt can be separated by a physical method such as evaporation, unlike the elements in a compound (1)',
              ],
              marks: 2,
              explanation: 'The two defining tests for a mixture are variable proportions and separability by physical means — either is creditable, but a full answer gives both.',
            },
          ],
        },
        {
          number: '2.2',
          slug: 'atomic-structure-and-periodic-table',
          title: 'Atomic structure and the Periodic Table',
          summary: 'Protons, neutrons and electrons, proton and nucleon number, electronic configuration, and its link to group and period.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.2.1', statement: 'State the relative charges and masses of protons, neutrons and electrons.', tier: 'CORE' },
            { code: '2.2.2', statement: 'Define proton number and nucleon number and use them to determine the number of each particle.', tier: 'CORE' },
            { code: '2.2.3', statement: 'Write the electronic configuration of the first 20 elements and relate it to group and period.', tier: 'CORE' },
          ],
          simulations: ['atom-shells'],
          lessons: [
            {
              slug: 'inside-the-atom',
              title: 'Inside the atom',
              readingMinutes: 7,
              body: `### The three particles
| Particle | Relative mass | Relative charge | Where |
| --- | --- | --- | --- |
| Proton | 1 | +1 | nucleus |
| Neutron | 1 | 0 | nucleus |
| Electron | 1/1836 (≈0) | −1 | shells around the nucleus |

**Proton number (Z)** = number of protons = the element's identity, and its position in the Periodic Table.
**Nucleon number (A)** = protons + neutrons.
So **neutrons = A − Z**, and in a neutral atom **electrons = protons**.

### Electronic configuration
Electrons occupy shells, filling from the inside out. For the first 20 elements the capacities are **2, 8, 8, 2**.

Examples:
- Sodium (Z = 11): 2,8,1
- Chlorine (Z = 17): 2,8,7
- Calcium (Z = 20): 2,8,8,2

### The pattern that makes the Periodic Table make sense
- The **number of outer-shell electrons = the group number** (for groups I–VII).
- The **number of occupied shells = the period number**.

Sodium has 1 outer electron and 3 shells → Group I, Period 3. That single rule lets you place any of the first 20 elements without memorising the table.

### Why elements react the way they do
Atoms react to achieve a full outer shell — the stable arrangement of the noble gases. Metals (few outer electrons) lose them; non-metals (nearly full shells) gain or share them. Every bonding topic that follows is a consequence of this one idea.

### Isotopes
Isotopes are atoms of the same element with the same proton number but **different numbers of neutrons**. They have identical chemical properties because chemistry depends on the electrons, which are unchanged.`,
              analogy:
                'The shells are like rows of seats in a theatre that fill from the front. An atom is "comfortable" only when the row it is working on is completely full.',
              misconceptions: [
                'Thinking isotopes react differently. They have the same electronic configuration, so their chemistry is the same.',
                'Writing 2,8,9 for potassium. The third shell holds 8 before the fourth starts, so potassium is 2,8,8,1.',
                'Confusing nucleon number with the number of neutrons — neutrons are nucleon number minus proton number.',
              ],
              examTips: [
                'Write electronic configurations with commas: 2,8,7 — not 287.',
                'For "explain why X is in Group II", say it has 2 electrons in its outer shell. That is the whole answer.',
                'Relative atomic mass questions with isotopes need a weighted average, not a simple mean.',
              ],
              workedExamples: [
                {
                  prompt: 'An atom has nucleon number 39 and proton number 19. State the number of protons, neutrons and electrons, and give its electronic configuration.',
                  steps: [
                    'Protons = proton number = 19',
                    'Neutrons = 39 − 19 = 20',
                    'Electrons = protons = 19 (neutral atom)',
                    'Fill shells 2, 8, 8, then 1 left over',
                  ],
                  answer: '19 protons, 20 neutrons, 19 electrons; configuration 2,8,8,1 (potassium, Group I, Period 4)',
                },
                {
                  prompt: 'Chlorine has two isotopes: 75% ³⁵Cl and 25% ³⁷Cl. Calculate its relative atomic mass.',
                  steps: ['Ar = (75 × 35 + 25 × 37) / 100', 'Ar = (2625 + 925) / 100', 'Ar = 3550 / 100'],
                  answer: 'Ar = 35.5',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the relative charge and mass of a neutron.', back: 'Charge 0, relative mass 1.', difficulty: 'EASY' },
            { front: 'How do you find the number of neutrons?', back: 'Nucleon number minus proton number.', difficulty: 'EASY' },
            { front: 'Give the electronic configuration of calcium (Z = 20).', back: '2,8,8,2', difficulty: 'MEDIUM' },
            { front: 'Define isotopes.', back: 'Atoms of the same element with the same number of protons but different numbers of neutrons.', difficulty: 'MEDIUM' },
            { front: 'How does electronic configuration relate to group number?', back: 'The number of outer-shell electrons equals the group number for Groups I–VII.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'An atom of element X has 12 protons and 12 neutrons. (a) State its nucleon number. (b) Write its electronic configuration. (c) State its group and period.',
              answer: '(a) 24  (b) 2,8,2  (c) Group II, Period 3',
              markScheme: [
                'Nucleon number = 12 + 12 = 24 (1)',
                'Electronic configuration 2,8,2 (1)',
                'Group II (2 outer electrons) (1)',
                'Period 3 (3 occupied shells) (1)',
              ],
              marks: 4,
              explanation:
                'This is magnesium. Filling the shells 2 then 8 leaves 2 electrons in the third shell, so it is in Group II, and having 3 occupied shells puts it in Period 3.',
            },
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'Boron has two isotopes: 20% ¹⁰B and 80% ¹¹B. Calculate the relative atomic mass of boron to 1 decimal place.',
              answer: '10.8',
              markScheme: ['(20 × 10 + 80 × 11) / 100 (1)', '= (200 + 880) / 100 (1)', '= 10.8 (1)'],
              marks: 3,
              explanation:
                'Relative atomic mass is a weighted average: (20 × 10 + 80 × 11) ÷ 100 = 1080 ÷ 100 = 10.8. A plain average of 10.5 would be wrong because the isotopes are not equally abundant.',
            },
          ],
        },
        {
          number: '2.3',
          slug: 'isotopes',
          title: 'Isotopes',
          summary: 'Atoms of the same element with different numbers of neutrons, and relative atomic mass.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.3.1', statement: 'Define isotopes and explain why they have identical chemical properties.', tier: 'CORE' },
            { code: '2.3.2', statement: 'Calculate relative atomic mass from isotopic abundances.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'isotopes',
              title: 'Isotopes',
              readingMinutes: 5,
              body: `**Isotopes** are atoms of the same element that have the **same number of protons** but **different numbers of neutrons**. Because they have the same proton number, they are the same element and sit in the same place on the Periodic Table — but because their neutron numbers differ, they have different nucleon numbers and different masses.

### Why isotopes react identically
Chemical reactions are governed by an atom's **electrons**, particularly the outer-shell electrons. Since isotopes of the same element have identical numbers of protons and therefore identical numbers of electrons, they have exactly the same electronic configuration — so they behave identically in chemical reactions, even though their masses differ.

### Relative atomic mass
Because natural samples of an element are a mixture of its isotopes in fixed proportions, the **relative atomic mass** you look up on the Periodic Table is a **weighted average** of the isotope masses, weighted by how abundant each isotope is. This is why relative atomic masses are rarely whole numbers — chlorine's is 35.5, reflecting a natural mixture of about 75% ³⁵Cl and 25% ³⁷Cl.`,
              analogy:
                'Isotopes are like identical twins who behave exactly alike in every social situation (chemistry, governed by electrons) but happen to have slightly different body weights (mass, governed by neutrons) — the difference in weight has no effect on how they interact with everyone else.',
              misconceptions: [
                'Thinking isotopes are different elements. They are the same element, since element identity is fixed entirely by proton number.',
                'Assuming a simple average of isotope masses gives the relative atomic mass. It must be weighted by the percentage abundance of each isotope, not just averaged equally.',
                'Believing isotopes have different chemical reactivity because they have different masses. Reactivity depends on electron arrangement, which is identical between isotopes.',
              ],
              examTips: [
                'When defining isotopes, both parts of the definition are needed for full marks: same proton number AND different neutron number.',
                'For weighted-average calculations, write out the full sum — (% × mass) + (% × mass), all divided by 100 — rather than trying to do it by inspection, since the method is worth marks independently of the final answer.',
              ],
              workedExamples: [
                {
                  prompt: 'Chlorine exists as 75% ³⁵Cl and 25% ³⁷Cl. Calculate its relative atomic mass.',
                  steps: [
                    'Ar = (75 × 35 + 25 × 37) / 100',
                    'Ar = (2625 + 925) / 100',
                  ],
                  answer: 'Ar = 35.5',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Why do isotopes of an element have the same chemical properties?', back: 'They have the same number of electrons and therefore the same electronic configuration; chemical reactions involve electrons.', difficulty: 'HARD' },
            { front: 'Define isotopes.', back: 'Atoms of the same element with the same number of protons but different numbers of neutrons.', difficulty: 'MEDIUM' },
            { front: 'Why do isotopes of an element have different physical properties, such as mass?', back: 'They have different numbers of neutrons, so different masses, even though their chemistry is identical.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Copper has two isotopes: 69% ⁶³Cu and 31% ⁶⁵Cu. Calculate the relative atomic mass of copper to 1 decimal place.',
              answer: '63.6',
              markScheme: ['(69 × 63 + 31 × 65) / 100 (1)', '= (4347 + 2015) / 100 (1)', '= 63.6 (1)'],
              marks: 3,
              explanation: 'Relative atomic mass is a weighted average: (69 × 63 + 31 × 65) ÷ 100 = 6362 ÷ 100 = 63.62, which rounds to 63.6.',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Two isotopes of chlorine are ³⁵Cl and ³⁷Cl. State one way in which atoms of these isotopes are the same, and one way in which they are different. [2]',
              answer:
                'Same: they have the same number of protons (17) and the same number of electrons / electronic configuration. Different: they have different numbers of neutrons (18 and 20), so different nucleon numbers and different masses.',
              markScheme: ['Same number of protons/electrons (1)', 'Different number of neutrons, giving different nucleon numbers (1)'],
              marks: 2,
              explanation: 'Isotopes are defined by identical proton number and differing neutron number — that single fact is both similarities and differences a question like this is testing.',
            },
          ],
        },
        {
          number: '2.4',
          slug: 'ions-and-ionic-bonds',
          title: 'Ions and ionic bonds',
          summary: 'Formation of ions by electron transfer, ionic bonding, and the properties of ionic compounds.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.4.1', statement: 'Describe the formation of positive and negative ions by loss or gain of electrons.', tier: 'CORE' },
            { code: '2.4.2', statement: 'Describe ionic bonding as the electrostatic attraction between oppositely charged ions in a giant lattice.', tier: 'CORE' },
            { code: '2.4.3', statement: 'Explain the properties of ionic compounds in terms of their structure and bonding.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['ionic-bonding'],
          lessons: [
            {
              slug: 'ionic-bonding',
              title: 'Ionic bonding',
              readingMinutes: 7,
              body: `Ionic bonding happens between a **metal** and a **non-metal**. Electrons are **transferred**, not shared.

### The sodium chloride story
Sodium (2,8,1) has one electron in its outer shell. Losing it leaves a full outer shell and a **Na⁺** ion.

Chlorine (2,8,7) needs one more electron for a full shell. Gaining one makes a **Cl⁻** ion.

Sodium hands its outer electron to chlorine. Both now have full outer shells, and the oppositely charged ions attract.

### The bond itself
An ionic bond is the **strong electrostatic attraction between oppositely charged ions**. That exact phrase is the definition examiners want.

The ions do not exist as pairs. They build a **giant ionic lattice** — a regular three-dimensional structure in which every Na⁺ is surrounded by Cl⁻ ions and vice versa.

### Properties, explained by the structure
- **High melting and boiling points**: there are many strong electrostatic attractions throughout the lattice, so a lot of energy is needed to separate the ions.
- **Conduct electricity when molten or dissolved, but not when solid**: charged ions must be free to move. In a solid lattice they are held in fixed positions.
- **Often soluble in water**, and generally brittle: knocking the lattice so that like charges align makes it split.

Notice how every property traces back to two facts — the ions are charged, and they are locked in a lattice.

### Working out the formula
The compound must be electrically neutral. Mg²⁺ with Cl⁻ needs two chloride ions: **MgCl₂**. Al³⁺ with O²⁻ needs the charges to balance at 6 each: **Al₂O₃**.`,
              analogy:
                'An ionic lattice is like a stack of alternating positive and negative magnets — enormously strong as a block, but if you slide one layer so like poles line up, the whole thing flies apart. That is why ionic solids are brittle.',
              misconceptions: [
                'Saying electrons are shared in ionic bonding. They are transferred — sharing is covalent.',
                'Writing "NaCl molecules". Ionic compounds form giant lattices, not molecules.',
                'Claiming ionic solids conduct electricity. They only conduct when molten or in solution, because only then are the ions free to move.',
              ],
              examTips: [
                'Define an ionic bond as "the strong electrostatic attraction between oppositely charged ions" — vaguer wording loses the mark.',
                'In dot-and-cross diagrams, show only the outer shell unless told otherwise, and put square brackets with the charge outside for each ion.',
                'For conductivity questions, always say *why*: "the ions are free to move and carry charge".',
              ],
              workedExamples: [
                {
                  prompt: 'Describe, in terms of electron transfer, how magnesium oxide is formed from magnesium and oxygen atoms.',
                  steps: [
                    'Magnesium has the configuration 2,8,2 and loses its two outer electrons to form Mg²⁺.',
                    'Oxygen has the configuration 2,6 and gains two electrons to form O²⁻.',
                    'Both ions now have full outer shells.',
                    'The oppositely charged ions attract electrostatically in a giant lattice.',
                  ],
                  answer: 'Mg transfers 2 electrons to O, forming Mg²⁺ and O²⁻ ions held by strong electrostatic attraction: MgO.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define an ionic bond.', back: 'The strong electrostatic attraction between oppositely charged ions.', difficulty: 'MEDIUM' },
            { front: 'Why do ionic compounds have high melting points?', back: 'The giant lattice contains many strong electrostatic attractions between ions, which need a lot of energy to overcome.', difficulty: 'HARD' },
            { front: 'Why does solid sodium chloride not conduct electricity?', back: 'Its ions are held in fixed positions in the lattice and are not free to move.', difficulty: 'MEDIUM' },
            { front: 'What is the formula of aluminium oxide?', back: 'Al₂O₃ — two Al³⁺ balance three O²⁻.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why magnesium chloride conducts electricity when molten but not when solid. [3]',
              answer:
                'Magnesium chloride is ionic. When solid, its ions are held in fixed positions in the lattice and cannot move. When molten, the lattice has broken down so the ions are free to move and carry charge through the liquid.',
              markScheme: [
                'It contains ions (1)',
                'When solid the ions are in fixed positions and cannot move (1)',
                'When molten the ions are free to move and carry charge (1)',
              ],
              marks: 3,
              explanation:
                'The examinable idea is mobility of charge carriers. An answer that says only "the ions carry the current" misses the point that they must be *free to move*.',
              hint: 'What has to be able to move for a current to flow?',
            },
          ],
        },
        {
          number: '2.5',
          slug: 'simple-molecules-and-covalent-bonds',
          title: 'Simple molecules and covalent bonds',
          summary: 'Sharing electron pairs, dot-and-cross diagrams, and the properties of simple molecular substances.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.5.1', statement: 'Describe the formation of a covalent bond as a shared pair of electrons between two non-metal atoms.', tier: 'CORE' },
            { code: '2.5.2', statement: 'Draw dot-and-cross diagrams for simple molecules including H₂, Cl₂, H₂O, CH₄, NH₃, CO₂ and N₂.', tier: 'CORE' },
            { code: '2.5.3', statement: 'Explain the low melting points and poor conductivity of simple molecular compounds in terms of weak intermolecular forces.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['molecule-viewer'],
          lessons: [
            {
              slug: 'simple-molecules-and-covalent-bonds',
              title: 'Covalent bonding',
              readingMinutes: 8,
              body: `A **covalent bond** is a **shared pair of electrons** between two atoms, usually between two non-metals. Both atoms contribute one electron to the shared pair, and both count the shared pair towards a full outer shell — this is what holds them together and what gives each atom the stable electron arrangement of a noble gas.

### Dot-and-cross diagrams
These show only the outer-shell electrons, using dots for one atom's electrons and crosses for the other's, so it is clear which atom each electron originally came from. You should be able to draw them for: H₂, Cl₂, H₂O, CH₄, NH₃, CO₂ and N₂.

- **H₂**: one shared pair between the two hydrogen atoms (single bond).
- **CO₂**: each oxygen shares **two** pairs with carbon (a double bond on each side).
- **N₂**: the two nitrogen atoms share **three** pairs (a triple bond), which is why nitrogen gas is so unreactive.

### Properties of simple molecular substances
Substances made of small covalent molecules (like water, carbon dioxide, methane) typically have **low melting and boiling points**, and **do not conduct electricity**.

This is because:
- The covalent bonds **within** each molecule are strong, but boiling or melting does not break these.
- What actually gets overcome is the **weak intermolecular forces** *between* separate molecules — and these need only a small amount of energy, giving low melting and boiling points.
- There are no free ions or delocalised electrons available to carry charge, so these substances do not conduct electricity, whether solid, liquid, or (for most) even dissolved.`,
              analogy:
                'A covalent molecule is like two people sharing one umbrella (the shared electron pair) — the umbrella bonds them together tightly. But the "crowd" of separate umbrella-sharing pairs standing near each other in the rain (the intermolecular forces) are only loosely gathered, and it takes very little effort to scatter the crowd, even though no umbrella itself needs to be broken.',
              misconceptions: [
                'Believing a low boiling point means covalent bonds are weak. Covalent bonds themselves are strong; it is only the much weaker forces *between* separate molecules that are overcome on melting or boiling.',
                'Assuming any compound containing carbon or hydrogen must be a "simple molecule". Giant covalent structures like diamond also contain only covalent bonds, but behave completely differently because there are no separate molecules.',
                'Forgetting that a double or triple bond is still one bond overall, made of two or three shared pairs — not two or three separate bonds.',
              ],
              examTips: [
                'When explaining low melting points, name explicitly what breaks (weak intermolecular forces) and what does NOT break (strong covalent bonds) — examiners specifically reward this contrast.',
                'For dot-and-cross diagrams, always check every atom (except hydrogen) ends up with 8 electron dots/crosses around it (a full outer shell), and hydrogen ends up with 2.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Define a covalent bond.', back: 'A shared pair of electrons between two atoms.', difficulty: 'EASY' },
            { front: 'Why do simple molecular substances have low melting points?', back: 'The forces *between* molecules are weak and need little energy to overcome — the strong covalent bonds inside the molecules are not broken.', difficulty: 'HARD' },
            { front: 'How many covalent bonds does carbon form?', back: 'Four.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'CHALLENGE',
              stem: 'Why does methane have a much lower boiling point than sodium chloride?',
              options: [
                { id: 'a', text: 'The covalent bonds in methane are weak.', why: 'Covalent bonds are strong — but they are not the bonds broken on boiling.' },
                { id: 'b', text: 'Only weak forces between methane molecules must be overcome.', why: '' },
                { id: 'c', text: 'Methane molecules are smaller than sodium ions.', why: 'Size alone does not determine boiling point.' },
                { id: 'd', text: 'Methane does not contain any bonds.', why: 'It contains four C–H covalent bonds.' },
              ],
              answer: 'b',
              markScheme: ['Only the weak intermolecular forces are overcome on boiling (1)'],
              marks: 1,
              explanation:
                'Boiling separates molecules; it does not break the covalent bonds inside them. Because intermolecular forces are weak, little energy is needed. Sodium chloride instead requires breaking many strong ionic attractions throughout a giant lattice.',
            },
          ],
        },
        {
          number: '2.6',
          slug: 'giant-covalent-structures',
          title: 'Giant covalent structures',
          summary: 'Diamond, graphite and silicon(IV) oxide — structure, bonding and properties.',
          prerequisites: ['2.5'],
          objectives: [
            { code: '2.6.1', statement: 'Describe the giant covalent structures of diamond and graphite and relate them to their properties and uses.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'giant-covalent-structures',
              title: 'Giant covalent structures',
              readingMinutes: 7,
              body: `Some covalent substances do not form small, separate molecules at all — instead, every atom is covalently bonded to its neighbours in one enormous, continuous lattice. These are **giant covalent structures**, and their properties are completely different from simple molecular substances, even though both involve covalent bonding.

### Diamond
In diamond, each carbon atom forms **four** strong covalent bonds to four other carbon atoms, arranged in a rigid three-dimensional lattice. This makes diamond extremely **hard**, with a very **high melting point** — a huge number of strong covalent bonds must be broken to melt it. Because every outer electron is used in a bond, there are no free electrons or ions, so diamond **does not conduct electricity**. It is used in cutting tools and drill tips because of its hardness.

### Graphite
In graphite, each carbon atom bonds to only **three** others, forming flat hexagonal layers. This leaves **one delocalised electron per atom**, free to move along the layers — which is why graphite **conducts electricity**, unusually for a non-metal. The layers themselves are held together by only **weak forces**, so they can slide over each other easily, making graphite **soft** and useful as a lubricant and in pencil "lead".

### Silicon(IV) oxide
Silicon(IV) oxide (silica, found in sand) has a giant covalent structure similar to diamond, with each silicon atom bonded to four oxygen atoms. Like diamond, it is hard with a very high melting point, because many strong covalent bonds must be broken.`,
              analogy:
                'Diamond is like a climbing frame welded rigidly at every joint in three dimensions — nothing can move without breaking a weld. Graphite is like stacked sheets of chicken wire, each sheet strongly welded internally but merely resting on the sheet below, so the sheets slide apart easily even though the wire within each one is just as strong.',
              misconceptions: [
                'Assuming all covalent substances have low melting points, based on simple molecules like water. Giant covalent structures like diamond have extremely high melting points, because breaking the structure means breaking many strong covalent bonds, not just weak intermolecular forces.',
                'Thinking graphite conducts because of ions, like a metal or an electrolyte. It conducts because of delocalised electrons, similar in principle to metallic bonding, even though graphite is not a metal.',
                'Believing diamond and graphite, both pure carbon, should have identical properties. Their very different properties come entirely from their different bonding arrangements (four bonds vs three bonds per atom).',
              ],
              examTips: [
                'A "compare diamond and graphite" question should be answered in matched pairs — structure of diamond then its property, structure of graphite then its property — rather than describing all of one substance and then all of the other.',
                'The reason graphite conducts is specifically the delocalised electron per carbon atom — say "delocalised electrons are free to move", not just "graphite has free electrons".',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Why does graphite conduct electricity but diamond does not?', back: 'Each carbon in graphite bonds to only three others, leaving one delocalised electron per atom free to move. In diamond all four outer electrons are used in bonds.', difficulty: 'HARD' },
            { front: 'Why is diamond so hard?', back: 'Every carbon atom is covalently bonded to four others in a rigid three-dimensional giant lattice.', difficulty: 'MEDIUM' },
            { front: 'Why do diamond and graphite have very high melting points?', back: 'Both are giant covalent structures with many strong covalent bonds throughout the lattice, which need a large amount of energy to break.', difficulty: 'MEDIUM' },
            { front: 'Why can the layers in graphite slide over each other?', back: 'There are only weak forces between the layers, so they can slide, which is why graphite is soft and used as a lubricant.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Diamond and graphite are both giant covalent structures made only of carbon atoms. Explain why diamond is hard and does not conduct electricity, while graphite is soft and does conduct electricity. [4]',
              answer:
                'In diamond, each carbon atom forms four strong covalent bonds to other carbon atoms in a rigid three-dimensional lattice, making it very hard; all four outer electrons are used in bonding, so there are no free electrons or ions to carry charge, and it does not conduct. In graphite, each carbon atom forms only three covalent bonds within flat layers, leaving one delocalised electron per atom free to move and carry charge, so it conducts electricity; the layers themselves are held together by only weak forces, so they can slide over each other, making graphite soft.',
              markScheme: [
                'Diamond: each carbon bonded to four others in a rigid 3D lattice — hard (1)',
                'Diamond: no free electrons or ions, so does not conduct (1)',
                'Graphite: each carbon bonded to only three others, one delocalised electron per atom free to move — conducts (1)',
                'Graphite: weak forces between layers allow them to slide — soft (1)',
              ],
              marks: 4,
              explanation: 'This is a compare-and-contrast question, so the mark scheme rewards structure separately from property for each substance — do not blend diamond and graphite into one sentence, or a marker cannot tell which point belongs to which.',
              hint: 'Deal with diamond completely first, then graphite — bonding, then the property it explains.',
            },
          ],
        },
        {
          number: '2.7',
          slug: 'metallic-bonding',
          title: 'Metallic bonding',
          summary: 'A lattice of positive ions in a sea of delocalised electrons, and why metals conduct and are malleable.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.7.1', statement: 'Describe metallic bonding as a lattice of positive ions in a sea of delocalised electrons.', tier: 'SUPPLEMENT' },
            { code: '2.7.2', statement: 'Explain electrical conductivity and malleability in terms of metallic structure.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'metallic-bonding',
              title: 'Metallic bonding',
              readingMinutes: 6,
              body: `**Metallic bonding** is the strong electrostatic attraction between a giant lattice of positive metal ions and a "sea" of **delocalised electrons** that move freely throughout the whole structure.

Each metal atom loses its outer-shell electrons into this shared "sea", becoming a positive ion. The ions are held in a regular lattice by their attraction to the surrounding delocalised electrons, which belong to the structure as a whole rather than to any single ion.

### Why metals conduct electricity
Because the delocalised electrons are **not fixed to any one ion**, they are free to move throughout the lattice, carrying charge — this is what allows metals to conduct electricity (and heat) so well, in both the solid and molten state.

### Why metals are malleable
The layers of positive ions can **slide over one another** when a force is applied, without breaking the metallic bonding — because the sea of delocalised electrons moves with them and continues to hold the structure together from any new position. This is why metals can be hammered or bent into shape (malleable) and drawn into wires (ductile), unlike ionic compounds, whose rigid lattice shatters if the layers are forced to shift.

### Why metals have high melting points
The electrostatic attraction between the positive ions and the delocalised electrons is strong and extends throughout the entire lattice, so a large amount of energy is needed to overcome it — giving metals generally high melting and boiling points.`,
              analogy:
                'A metal lattice is like a tray of marbles (the positive ions) glued together not by touching each other, but by being immersed in a pool of glue (the delocalised electrons) that surrounds and holds them all. Tilt the tray, and the marbles can slide into new positions while the glue simply flows and re-sets around them — the structure never breaks apart the way it would if the marbles were rigidly fixed.',
              misconceptions: [
                'Confusing metallic bonding with ionic bonding, since both involve positive ions. In metallic bonding the ions are held by delocalised electrons shared throughout the structure; in ionic bonding, ions are held by direct attraction to oppositely charged ions.',
                'Thinking metals are malleable because the bonds between ions are weak. The bonding is actually strong (giving high melting points) — malleability comes from the *non-directional* nature of the bonding, allowing layers to slide without breaking it.',
                'Believing only the outer electrons of some atoms are delocalised. In metallic bonding, the outer electrons of every atom in the lattice contribute to the shared sea.',
              ],
              examTips: [
                'The word "delocalised" is essential in any answer about metallic bonding or conductivity — without it, an answer describing "free electrons" can be marked as incomplete.',
                'When explaining malleability, mention explicitly that the delocalised electrons move with the shifting layers, which is why the bonding is not broken — this is the step most answers miss.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Describe metallic bonding.', back: 'A giant lattice of positive metal ions surrounded by a sea of delocalised electrons, held together by electrostatic attraction.', difficulty: 'MEDIUM' },
            { front: 'Why are metals malleable?', back: 'The layers of ions can slide over one another without breaking the metallic bonding, because the delocalised electrons move with them.', difficulty: 'HARD' },
            { front: 'Why do metals conduct electricity?', back: 'The delocalised electrons in the metallic lattice are free to move throughout the structure and carry charge.', difficulty: 'MEDIUM' },
            { front: 'Why do metals have high melting points?', back: 'The electrostatic attraction between the positive ions and the sea of delocalised electrons is strong throughout the giant lattice, needing a lot of energy to overcome.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Describe metallic bonding, and use it to explain why metals conduct electricity. [3]',
              answer:
                'Metallic bonding is the strong electrostatic attraction between a lattice of positive metal ions and a sea of delocalised electrons. Because these electrons are not attached to any one ion, they are free to move throughout the structure, and this movement of charge allows metals to conduct electricity.',
              markScheme: [
                'Lattice of positive ions and delocalised (sea of) electrons (1)',
                'Strong electrostatic attraction between them (1)',
                'The delocalised electrons are free to move and carry charge, so the metal conducts (1)',
              ],
              marks: 3,
              explanation: 'The word "delocalised" is doing the real work here — it must be clear the electrons are not fixed to individual atoms, which is precisely what lets them move and carry current.',
              hint: 'What is different about these electrons compared with the ones in a covalent bond?',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'stoichiometry',
      title: 'Stoichiometry',
      summary: 'Formulae, equations, relative masses, the mole, concentration and yield calculations.',
      subtopics: [
        {
          number: '3.1',
          slug: 'formulae',
          title: 'Formulae',
          summary: 'Writing formulae of ionic and covalent compounds and balancing chemical equations.',
          objectives: [
            { code: '3.1.1', statement: 'Write and balance chemical equations, including state symbols.', tier: 'CORE' },
            { code: '3.1.2', statement: 'Deduce the formula of an ionic compound from the charges on its ions.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'formulae',
              title: 'Formulae and balancing equations',
              readingMinutes: 7,
              body: `### Deducing ionic formulae
An ionic compound is always **electrically neutral overall**, so the total positive charge must equal the total negative charge. To find the formula:

1. Write the charge on each ion (e.g. Mg²⁺, Cl⁻).
2. Find how many of each ion are needed so the charges balance to zero.
3. Write the formula with these numbers as subscripts (1 is never written).

For magnesium chloride: Mg²⁺ needs two Cl⁻ to balance its +2 charge, giving **MgCl₂**.

### Balancing equations
A chemical equation must have the **same number of atoms of each element on both sides** — atoms are neither created nor destroyed in a reaction. To balance an equation:

1. Write the correct formulae of all reactants and products (never change a formula to balance an equation — only add numbers in front of it).
2. Count the atoms of each element on both sides.
3. Add whole-number multipliers in front of formulae until every element balances.

### State symbols
Every substance in a balanced equation can be labelled with a state symbol: **(s)** solid, **(l)** liquid, **(g)** gas, **(aq)** aqueous (dissolved in water). These are often required for full marks, especially in questions about reactions in solution.`,
              analogy:
                'Balancing an equation is like balancing accounts — every atom that goes in as a "reactant" has to be accounted for as a "product"; you are never allowed to invent or lose atoms, only to change how many complete molecules of each substance you have.',
              misconceptions: [
                'Changing the subscripts inside a formula to try to balance an equation (e.g. writing H₂O₂ instead of H₂O). This changes what the substance actually is — only the large numbers placed in front of a formula may be changed.',
                'Forgetting to balance charge as well as atoms when deducing an ionic formula — for a compound like aluminium oxide, both the number of atoms and the total charge must work out.',
                'Leaving out state symbols when a question specifically asks for them, or when comparing a solid reactant with a dissolved product.',
              ],
              examTips: [
                'Balance one element at a time, saving hydrogen and oxygen until last if they appear in several formulae — this avoids repeatedly having to re-balance elements you thought were already correct.',
                'After balancing, always recount every element on both sides as a final check before moving on.',
              ],
              workedExamples: [
                {
                  prompt: 'Deduce the formula of aluminium sulfate, formed from Al³⁺ and SO₄²⁻ ions.',
                  steps: [
                    'Find the lowest common multiple of the charges: LCM(3, 2) = 6',
                    'Need 2 × Al³⁺ (total +6) and 3 × SO₄²⁻ (total −6)',
                  ],
                  answer: 'Al₂(SO₄)₃',
                },
                {
                  prompt: 'Balance the equation: __Fe + __O₂ → __Fe₂O₃',
                  steps: [
                    'Balance oxygen: 3 O₂ gives 6 O atoms, matching 2 Fe₂O₃ (which has 6 O atoms)',
                    'Balance iron: 2 Fe₂O₃ needs 4 Fe atoms',
                  ],
                  answer: '4Fe + 3O₂ → 2Fe₂O₃',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What are the four state symbols?', back: '(s) solid, (l) liquid, (g) gas, (aq) aqueous solution.', difficulty: 'EASY' },
            { front: 'What must be equal on both sides of a balanced equation?', back: 'The number of atoms of each element (and the total charge).', difficulty: 'EASY' },
            { front: 'What charge does a calcium ion carry? What is its formula in a compound with chloride?', back: 'Ca²⁺. With Cl⁻, the charges must balance: CaCl₂.', difficulty: 'MEDIUM' },
            { front: 'How do you deduce the formula of an ionic compound from its ions?', back: 'Balance the total positive and negative charge, using the smallest whole-number ratio of ions.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Aluminium ions are Al³⁺ and oxide ions are O²⁻. Deduce the formula of aluminium oxide, showing your reasoning.',
              answer:
                'The charges must balance. Two Al³⁺ ions give a total charge of +6; three O²⁻ ions give a total charge of −6. The formula is Al₂O₃.',
              markScheme: ['Recognises charges must balance (1)', 'Correct formula Al₂O₃ (1)'],
              marks: 2,
              explanation: 'The lowest common multiple of 3 and 2 is 6, so 2 aluminium ions (2 × 3 = 6) balance 3 oxide ions (3 × 2 = 6).',
            },
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Balance the equation: __Mg + __O₂ → __MgO',
              answer: '2Mg + O₂ → 2MgO',
              markScheme: ['2Mg + O₂ → 2MgO (2, or 1 if only one side is correctly balanced)'],
              marks: 2,
              explanation: 'There are 2 oxygen atoms on the left, so 2 MgO are needed on the right to balance oxygen, which then requires 2 Mg on the left to balance magnesium.',
            },
          ],
        },
        {
          number: '3.2',
          slug: 'relative-masses',
          title: 'Relative masses of atoms and molecules',
          summary: 'Relative atomic mass and relative formula mass, and percentage composition.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '3.2.1', statement: 'Define relative atomic mass and relative formula mass and calculate Mr from a formula.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'relative-masses',
              title: 'Relative atomic mass and relative formula mass',
              readingMinutes: 5,
              body: `### Relative atomic mass
**Relative atomic mass (Ar)** is the average mass of the isotopes of an element, compared with 1/12 of the mass of an atom of carbon-12. It has no unit, because it is a ratio. You find it on the Periodic Table for every element.

### Relative formula mass
**Relative formula mass (Mr)** is the sum of the relative atomic masses of every atom shown in a formula. Work through a formula systematically:

1. List every element in the formula, along with how many atoms of it are present.
2. Look up (or recall) the Ar of each element.
3. Multiply each Ar by the number of atoms of that element, and add all the results together.

A number in a bracket applies to everything inside the bracket, so Mg(OH)₂ contains 1 Mg, 2 O and 2 H — the bracket subscript of 2 multiplies both O and H inside it.

### Percentage composition
Once you know Mr, you can find what percentage of the total mass comes from one element:

\`% of element = (Ar of element × number of atoms of it) / Mr of compound × 100\``,
              analogy:
                'Relative formula mass is like adding up a shopping receipt: you list every item (element), its unit price (relative atomic mass) and quantity (number of atoms), multiply each line, and sum the total.',
              misconceptions: [
                'Forgetting that a bracket subscript multiplies everything inside it, not just the atom written immediately before the closing bracket.',
                'Adding relative atomic masses without multiplying by how many atoms of that element are present — for CO₂, oxygen appears twice, not once.',
                'Thinking relative atomic mass has a unit like grams. It is a ratio compared with carbon-12, so it has no unit.',
              ],
              examTips: [
                'Write out the atom count for every element in the formula before doing any arithmetic — this avoids missing an atom hidden inside a bracket.',
                'Show each step of the sum separately (element by element) rather than jumping to a final total, since method marks are awarded even if the final number is wrong.',
              ],
              workedExamples: [
                {
                  prompt: 'Calculate the relative formula mass of ammonium sulfate, (NH₄)₂SO₄. (N = 14, H = 1, S = 32, O = 16)',
                  steps: [
                    'Atoms: 2 N, 8 H, 1 S, 4 O (the bracket ×2 applies to both N and the 4 H inside it)',
                    'Mr = (2 × 14) + (8 × 1) + 32 + (4 × 16)',
                    'Mr = 28 + 8 + 32 + 64',
                  ],
                  answer: 'Mr = 132',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Calculate the Mr of CaCO₃ (Ca 40, C 12, O 16).', back: '40 + 12 + (3 × 16) = 100', difficulty: 'MEDIUM' },
            { front: 'Define relative atomic mass.', back: 'The average mass of the isotopes of an element, compared with 1/12 of the mass of an atom of carbon-12.', difficulty: 'HARD' },
            { front: 'Define relative formula mass.', back: 'The sum of the relative atomic masses of all the atoms in a formula.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'FOUNDATION',
              stem: 'Calculate the relative formula mass of magnesium hydroxide, Mg(OH)₂. (Mg = 24, O = 16, H = 1)',
              answer: '58',
              markScheme: ['24 + 2 × (16 + 1) (1)', '= 24 + 34 = 58 (1)'],
              marks: 2,
              explanation: 'The bracket applies to both O and H: Mg(OH)₂ has 1 Mg, 2 O and 2 H. Mr = 24 + (2 × 16) + (2 × 1) = 24 + 32 + 2 = 58.',
            },
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Calculate the relative formula mass of hydrated copper(II) sulfate, CuSO₄·5H₂O. (Cu = 64, S = 32, O = 16, H = 1)',
              answer: '250',
              markScheme: ['Mr(CuSO₄) = 64 + 32 + 64 = 160 (1)', 'Mr(5H₂O) = 5 × 18 = 90 (1)', 'Total = 160 + 90 = 250 (1)'],
              marks: 3,
              explanation: 'The dot indicates water of crystallisation is included in the formula mass. Each H₂O has Mr 18, and there are 5 of them, adding 90 to the anhydrous mass of 160.',
            },
          ],
        },
        {
          number: '3.3',
          slug: 'the-mole',
          title: 'The mole and the Avogadro constant',
          summary: 'Moles from mass and from concentration, gas volumes, reacting-mass calculations, empirical formulae and yield.',
          prerequisites: ['3.2'],
          objectives: [
            { code: '3.3.1', statement: 'Use the relationship between mass, relative formula mass and number of moles (n = m / Mr).', tier: 'SUPPLEMENT' },
            { code: '3.3.2', statement: 'Use the mole ratio in a balanced equation to calculate reacting masses.', tier: 'SUPPLEMENT' },
            { code: '3.3.3', statement: 'Calculate concentration in mol/dm³ and g/dm³ and use it in titration calculations.', tier: 'SUPPLEMENT' },
            { code: '3.3.4', statement: 'Calculate empirical and molecular formulae from composition data.', tier: 'SUPPLEMENT' },
            { code: '3.3.5', statement: 'Calculate percentage yield and percentage purity.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'moles-and-reacting-masses',
              title: 'Moles and reacting masses',
              readingMinutes: 9,
              body: `The mole is simply a **counting unit for particles**, the way "dozen" is a counting unit for eggs. One mole contains 6.02 × 10²³ particles — the Avogadro constant.

### The three core relationships
- \`moles = mass ÷ Mr\`
- \`moles = concentration (mol/dm³) × volume (dm³)\`
- \`moles of gas = volume (dm³) ÷ 24\` at room temperature and pressure

Watch the volume unit: **1 dm³ = 1000 cm³**. Almost every lost mark in this topic is a cm³ that should have been divided by 1000.

### The universal method
Every reacting-mass question follows the same four steps:

1. Write the **balanced equation**.
2. Convert what you are **given** into moles.
3. Use the **mole ratio** from the equation to find the moles of what you want.
4. Convert those moles back into mass, volume or concentration.

If you can state those four steps, you can do every stoichiometry question in the paper.

### Empirical formula
The empirical formula is the simplest whole-number ratio of atoms.

1. Write the mass (or percentage) of each element.
2. Divide each by its relative atomic mass.
3. Divide all the answers by the smallest one.
4. Round to whole numbers.

The molecular formula is a whole-number multiple of the empirical formula, found by comparing the empirical mass with the given Mr.

### Percentage yield and purity
\`percentage yield = (actual yield ÷ theoretical yield) × 100\`

Yield is below 100% because reactions may be reversible or incomplete, some product is lost in transfer or purification, and side reactions occur.`,
              analogy:
                'A balanced equation is a recipe. The mole ratio is "2 eggs per cake" — once you know how many eggs you have, you know how many cakes you can make.',
              misconceptions: [
                'Using the mass ratio instead of the mole ratio. Equations balance particles, not grams.',
                'Forgetting that concentration in mol/dm³ needs volume in dm³, not cm³.',
                'Assuming percentage yield can exceed 100%. If it does, the product is wet or impure.',
              ],
              examTips: [
                'Always write the balanced equation first, even if the question does not explicitly ask for it — it is often worth a mark.',
                'Show the moles line separately. Method marks are awarded for it even when the final answer is wrong.',
                'Round only at the very end, and give the answer to a sensible number of significant figures with units.',
              ],
              workedExamples: [
                {
                  prompt: 'Calculate the mass of magnesium oxide formed when 4.8 g of magnesium burns completely in oxygen. (Mg = 24, O = 16)',
                  steps: [
                    'Balanced equation: 2Mg + O₂ → 2MgO',
                    'Moles of Mg = 4.8 / 24 = 0.20 mol',
                    'Mole ratio Mg : MgO is 2 : 2, i.e. 1 : 1, so moles of MgO = 0.20 mol',
                    'Mr of MgO = 24 + 16 = 40',
                    'Mass = moles × Mr = 0.20 × 40',
                  ],
                  answer: '8.0 g of magnesium oxide',
                },
                {
                  prompt: '25.0 cm³ of sodium hydroxide solution is neutralised by 20.0 cm³ of 0.100 mol/dm³ hydrochloric acid. Calculate the concentration of the sodium hydroxide.',
                  steps: [
                    'Equation: NaOH + HCl → NaCl + H₂O, ratio 1 : 1',
                    'Moles of HCl = c × V = 0.100 × (20.0 / 1000) = 2.00 × 10⁻³ mol',
                    'Moles of NaOH = 2.00 × 10⁻³ mol (1 : 1 ratio)',
                    'c = n / V = 2.00 × 10⁻³ / (25.0 / 1000)',
                  ],
                  answer: '0.0800 mol/dm³',
                },
                {
                  prompt: 'A compound contains 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. Determine its empirical formula. (C = 12, H = 1, O = 16)',
                  steps: [
                    'Divide by Ar: C = 40.0/12 = 3.33, H = 6.7/1 = 6.7, O = 53.3/16 = 3.33',
                    'Divide by the smallest (3.33): C = 1, H = 2, O = 1',
                  ],
                  answer: 'CH₂O',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the equation linking moles, mass and Mr.', back: 'moles = mass ÷ Mr', difficulty: 'EASY' },
            { front: 'What is the volume of one mole of any gas at room temperature and pressure?', back: '24 dm³ (24 000 cm³).', difficulty: 'MEDIUM' },
            { front: 'How do you convert cm³ to dm³?', back: 'Divide by 1000.', difficulty: 'EASY' },
            { front: 'Give the equation for percentage yield.', back: '(actual yield ÷ theoretical yield) × 100', difficulty: 'MEDIUM' },
            { front: 'What is the Avogadro constant?', back: '6.02 × 10²³ particles per mole.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Calculate the number of moles in 11.0 g of carbon dioxide, CO₂. (C = 12, O = 16)',
              answer: '0.250 mol',
              markScheme: ['Mr of CO₂ = 12 + 32 = 44 (1)', 'n = 11.0 / 44 (1)', 'n = 0.250 mol (1)'],
              marks: 3,
              explanation: 'Mr(CO₂) = 12 + (2 × 16) = 44. Then n = m ÷ Mr = 11.0 ÷ 44 = 0.250 mol.',
            },
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'Calculate the mass of calcium oxide produced when 25.0 g of calcium carbonate decomposes completely. CaCO₃ → CaO + CO₂. (Ca = 40, C = 12, O = 16)',
              answer: '14.0 g',
              markScheme: [
                'Mr(CaCO₃) = 100, Mr(CaO) = 56 (1)',
                'Moles CaCO₃ = 25.0 / 100 = 0.250 mol (1)',
                'Mole ratio 1 : 1, so moles CaO = 0.250 mol (1)',
                'Mass = 0.250 × 56 = 14.0 g (1)',
              ],
              marks: 4,
              explanation:
                'Follow the four steps: balanced equation (already given), convert to moles (0.250), apply the 1:1 ratio, convert back to mass (14.0 g). Note you cannot simply scale masses — you must go through moles.',
              hint: 'Convert to moles before using the equation ratio.',
            },
          ],
        },
      ],
    },
    {
      number: '4',
      slug: 'electrochemistry',
      title: 'Electrochemistry',
      summary: 'Electrolysis of molten compounds and solutions, electrode products and half equations, and fuel cells.',
      subtopics: [
        {
          number: '4.1',
          slug: 'electrolysis',
          title: 'Electrolysis',
          summary: 'Electrolytes, electrodes, products at the anode and cathode, and half equations.',
          prerequisites: ['2.4'],
          objectives: [
            { code: '4.1.1', statement: 'Define electrolysis and identify the electrolyte, anode and cathode.', tier: 'CORE' },
            { code: '4.1.2', statement: 'Predict the products of electrolysis of molten binary compounds.', tier: 'CORE' },
            { code: '4.1.3', statement: 'Predict the products of electrolysis of aqueous solutions using the reactivity series and concentration.', tier: 'SUPPLEMENT' },
            { code: '4.1.4', statement: 'Write ionic half equations for reactions at each electrode.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['electrolysis-cell'],
          lessons: [
            {
              slug: 'electrolysis-explained',
              title: 'Electrolysis explained',
              readingMinutes: 8,
              body: `**Electrolysis** is the breakdown of an ionic compound, when molten or in aqueous solution, by the passage of electricity.

### The set-up
- The **electrolyte** is the molten or dissolved ionic compound. It conducts because its ions are free to move.
- The **cathode** is the negative electrode. **Cations** (positive ions) go there.
- The **anode** is the positive electrode. **Anions** (negative ions) go there.

A memory hook that survives exam pressure: **PANIC** — Positive is Anode, Negative Is Cathode.

### What happens at each electrode
At the **cathode**, positive ions **gain electrons** (reduction):
\`Pb²⁺ + 2e⁻ → Pb\`

At the **anode**, negative ions **lose electrons** (oxidation):
\`2Br⁻ → Br₂ + 2e⁻\`

Remember **OIL RIG**: Oxidation Is Loss, Reduction Is Gain (of electrons).

### Molten compounds
Simple: the metal forms at the cathode, the non-metal at the anode. Molten lead(II) bromide gives lead and bromine.

### Aqueous solutions
Water also supplies H⁺ and OH⁻ ions, so there is competition.

At the **cathode**: hydrogen is produced **unless** the metal is less reactive than hydrogen (such as copper or silver), in which case the metal is deposited.

At the **anode**: if a halide ion is present in reasonable concentration, the halogen is produced. Otherwise oxygen is produced from OH⁻ ions.

So concentrated sodium chloride solution gives hydrogen at the cathode and chlorine at the anode, leaving sodium hydroxide behind — the industrial chlor-alkali process.`,
              analogy:
                'Electrolysis is a tug of war for electrons that the power supply referees: it forces electrons onto the cathode and pulls them off the anode, driving reactions that would never happen on their own.',
              misconceptions: [
                'Mixing up anode and cathode. In electrolysis the anode is positive — PANIC.',
                'Forgetting that water contributes ions in aqueous electrolysis, so the products are often not just the two elements in the salt.',
                'Writing half equations that do not balance for charge. Count the electrons carefully.',
              ],
              examTips: [
                'Always state the electrode *and* whether it is oxidation or reduction — both can be worth marks.',
                'Half equations must balance for both atoms and charge; include the electrons explicitly.',
                'For aqueous electrolysis, justify your prediction with the reactivity of the metal relative to hydrogen.',
              ],
              workedExamples: [
                {
                  prompt: 'Molten zinc chloride is electrolysed. Give the products and the half equation at each electrode.',
                  steps: [
                    'The electrolyte contains Zn²⁺ and Cl⁻ ions.',
                    'Cathode (negative): Zn²⁺ ions gain electrons — Zn²⁺ + 2e⁻ → Zn',
                    'Anode (positive): Cl⁻ ions lose electrons — 2Cl⁻ → Cl₂ + 2e⁻',
                  ],
                  answer: 'Zinc at the cathode, chlorine at the anode.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define electrolysis.', back: 'The breakdown of an ionic compound, when molten or in aqueous solution, by the passage of electricity.', difficulty: 'MEDIUM' },
            { front: 'Which electrode is positive in electrolysis?', back: 'The anode (PANIC: Positive is Anode, Negative Is Cathode).', difficulty: 'EASY' },
            { front: 'What does OIL RIG stand for?', back: 'Oxidation Is Loss of electrons, Reduction Is Gain of electrons.', difficulty: 'EASY' },
            { front: 'Write the half equation for copper forming at a cathode.', back: 'Cu²⁺ + 2e⁻ → Cu', difficulty: 'MEDIUM' },
            { front: 'What is produced at the cathode when concentrated sodium chloride solution is electrolysed?', back: 'Hydrogen — sodium is more reactive than hydrogen, so hydrogen is discharged instead.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Concentrated aqueous sodium chloride is electrolysed using inert electrodes. Name the product at each electrode and write the ionic half equation for each. [4]',
              answer:
                'Cathode: hydrogen, 2H⁺ + 2e⁻ → H₂. Anode: chlorine, 2Cl⁻ → Cl₂ + 2e⁻.',
              markScheme: [
                'Cathode product hydrogen (1)',
                'Cathode half equation 2H⁺ + 2e⁻ → H₂ (1)',
                'Anode product chlorine (1)',
                'Anode half equation 2Cl⁻ → Cl₂ + 2e⁻ (1)',
              ],
              marks: 4,
              explanation:
                'Sodium is more reactive than hydrogen, so hydrogen from the water is discharged at the cathode rather than sodium metal. The chloride concentration is high, so chlorine is discharged in preference to oxygen. Sodium hydroxide is left in solution.',
              hint: 'Is sodium more or less reactive than hydrogen?',
            },
          ],
        },
        {
          number: '4.2',
          slug: 'hydrogen-oxygen-fuel-cells',
          title: 'Hydrogen–oxygen fuel cells',
          summary: 'How a fuel cell produces electricity from hydrogen and oxygen, and its advantages and disadvantages.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '4.2.1', statement: 'Describe the hydrogen–oxygen fuel cell and evaluate its advantages and disadvantages compared with petrol engines.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'hydrogen-oxygen-fuel-cells',
              title: 'Hydrogen–oxygen fuel cells',
              readingMinutes: 5,
              body: `A **hydrogen–oxygen fuel cell** generates electricity directly from a chemical reaction between hydrogen and oxygen, without burning either gas.

Hydrogen is supplied at one electrode and oxygen at the other. Inside the cell, hydrogen is oxidised and oxygen is reduced, and the overall reaction is:

\`2H₂ + O₂ → 2H₂O\`

The only product is **water** — there is no combustion, and no carbon-based waste gases are formed, unlike a petrol engine burning a hydrocarbon fuel.

### Comparing fuel cells with petrol engines
**Advantages of fuel cells**: the only product is water, so there is no carbon dioxide or other polluting gas released at the point of use; fuel cells can be more energy-efficient than an internal combustion engine.

**Disadvantages of fuel cells**: hydrogen gas is difficult and costly to store and transport safely (it is highly flammable and needs high-pressure tanks); there is currently limited infrastructure for refuelling with hydrogen; and producing hydrogen in the first place often uses energy generated from fossil fuels, so the overall environmental benefit depends on how the hydrogen was made.`,
              analogy:
                'A fuel cell is like a battery that never needs recharging, as long as you keep feeding it hydrogen and oxygen — the chemical reaction happens continuously inside, generating electricity directly, rather than through the noisy, wasteful combustion of a petrol engine.',
              misconceptions: [
                'Thinking a fuel cell burns hydrogen like a petrol engine burns fuel. It generates electricity through a controlled chemical reaction, without combustion.',
                'Assuming hydrogen fuel cells are automatically "zero pollution" overall. The cell itself only produces water, but if the hydrogen used was made using energy from fossil fuels, there is pollution earlier in the process.',
                'Believing fuel cells have no drawbacks because their only product is water. Storage, transport and infrastructure remain real practical disadvantages.',
              ],
              examTips: [
                'A balanced evaluation question expects a genuine advantage AND a genuine disadvantage — do not just restate "no pollution" in different words for both marks.',
                'State the overall equation, 2H₂ + O₂ → 2H₂O, if asked to summarise how the cell works.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What is the only product of a hydrogen–oxygen fuel cell?', back: 'Water.', difficulty: 'EASY' },
            { front: 'Give one advantage of a hydrogen fuel cell over a petrol engine.', back: 'No carbon dioxide or other polluting gases are produced — the only product is water.', difficulty: 'MEDIUM' },
            { front: 'Give one disadvantage of hydrogen fuel cells.', back: 'Hydrogen is difficult and expensive to store and transport safely, and is often produced using energy from fossil fuels.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Give one advantage and one disadvantage of using a hydrogen–oxygen fuel cell to power a vehicle, compared with a petrol engine. [2]',
              answer:
                'Advantage: the only product is water, so it produces no carbon dioxide or other polluting gases at the point of use. Disadvantage: hydrogen gas is difficult to store safely and is not widely available, and producing it often uses energy from fossil fuels.',
              markScheme: ['One valid advantage, e.g. only water produced / no CO₂ or pollutant gases (1)', 'One valid disadvantage, e.g. hydrogen storage/production issues (1)'],
              marks: 2,
              explanation: 'Examiners want a genuine advantage and a genuine disadvantage, each a full point — restating "it is cleaner" twice in different words does not earn both marks.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'chemical-energetics',
      title: 'Chemical energetics',
      summary: 'Exothermic and endothermic reactions, energy level diagrams and bond energies.',
      subtopics: [
        {
          number: '5.1',
          slug: 'exothermic-and-endothermic',
          title: 'Exothermic and endothermic reactions',
          summary: 'Energy transfer to and from the surroundings, energy level diagrams, activation energy and bond breaking/making.',
          objectives: [
            { code: '5.1.1', statement: 'Describe exothermic and endothermic reactions in terms of temperature change and energy transfer.', tier: 'CORE' },
            { code: '5.1.2', statement: 'Draw and interpret energy level (reaction pathway) diagrams including activation energy and ΔH.', tier: 'CORE' },
            { code: '5.1.3', statement: 'Explain overall energy change in terms of bond breaking and bond making.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'energy-changes-in-reactions',
              title: 'Energy changes in reactions',
              readingMinutes: 6,
              body: `### The two types
**Exothermic** reactions transfer energy **to** the surroundings, so the temperature of the surroundings **rises**. ΔH is **negative**. Examples: combustion, neutralisation, most oxidation reactions.

**Endothermic** reactions take energy **in** from the surroundings, so the temperature **falls**. ΔH is **positive**. Examples: thermal decomposition, photosynthesis, dissolving ammonium nitrate.

### Energy level diagrams
- Exothermic: products are **lower** than reactants; ΔH is drawn as a downward arrow.
- Endothermic: products are **higher** than reactants; the arrow points up.
- The **activation energy** is the hump from the reactants to the peak — the minimum energy needed for a reaction to occur.

Both types of reaction have an activation energy. An exothermic reaction is not one that starts by itself.

### Bonds explain everything
- **Breaking bonds takes energy in** — always endothermic.
- **Making bonds gives energy out** — always exothermic.

Compare the two:
- If more energy is released making bonds than was used breaking them, the reaction is **exothermic**.
- If breaking costs more than making releases, it is **endothermic**.

\`ΔH = energy to break bonds − energy released making bonds\``,
              analogy:
                'Bond energy is a deposit system. You pay to break bonds apart and get paid when new ones form. Exothermic reactions are the ones where you end up in profit.',
              misconceptions: [
                'Saying an exothermic reaction "gets colder". The reaction releases energy, so the surroundings get hotter.',
                'Thinking endothermic reactions have no activation energy. Both types do.',
                'Getting the sign of ΔH backwards. Exothermic is negative.',
              ],
              examTips: [
                'Label energy level diagrams fully: reactants, products, activation energy and ΔH. Unlabelled diagrams lose easy marks.',
                'When explaining an energy change, use the phrase "energy is released when bonds are formed" explicitly.',
              ],
              workedExamples: [
                {
                  prompt: 'In a reaction, breaking the bonds in the reactants requires 1350 kJ/mol and forming the bonds in the products releases 1600 kJ/mol. Calculate ΔH and state the type of reaction.',
                  steps: ['ΔH = energy in − energy out', 'ΔH = 1350 − 1600'],
                  answer: 'ΔH = −250 kJ/mol, so the reaction is exothermic.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the sign of ΔH for an exothermic reaction?', back: 'Negative.', difficulty: 'EASY' },
            { front: 'Is bond breaking exothermic or endothermic?', back: 'Endothermic — energy must be supplied to break a bond.', difficulty: 'MEDIUM' },
            { front: 'Define activation energy.', back: 'The minimum energy that colliding particles must have for a reaction to occur.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A student mixes two solutions and the temperature of the mixture falls from 21 °C to 14 °C. What can be concluded?',
              options: [
                { id: 'a', text: 'The reaction is exothermic.', why: 'An exothermic reaction would warm the mixture.' },
                { id: 'b', text: 'The reaction is endothermic and ΔH is positive.', why: '' },
                { id: 'c', text: 'No reaction occurred.', why: 'A temperature change is evidence that a reaction occurred.' },
                { id: 'd', text: 'The reaction has no activation energy.', why: 'All reactions have an activation energy.' },
              ],
              answer: 'b',
              markScheme: ['Endothermic, ΔH positive (1)'],
              marks: 1,
              explanation:
                'A temperature fall means energy was taken in from the surroundings, which is the definition of an endothermic reaction, so ΔH is positive.',
            },
          ],
        },
      ],
    },
    {
      number: '6',
      slug: 'chemical-reactions',
      title: 'Chemical reactions',
      summary: 'Physical and chemical change, rate of reaction, reversible reactions and equilibrium, and redox.',
      subtopics: [
        {
          number: '6.1',
          slug: 'physical-and-chemical-changes',
          title: 'Physical and chemical changes',
          summary: 'How to tell a chemical change from a physical one.',
          objectives: [
            { code: '6.1.1', statement: 'Identify physical and chemical changes and describe the differences between them.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'physical-and-chemical-changes',
              title: 'Physical and chemical changes',
              readingMinutes: 5,
              body: `A **physical change** alters the form or appearance of a substance, but **no new substance is formed** — the same particles are present before and after, just arranged or moving differently. Examples: melting, freezing, boiling, condensing, dissolving. Physical changes are usually **easy to reverse**.

A **chemical change** (a chemical reaction) always produces **at least one new substance**, with different properties from the starting materials. Examples: burning, rusting, a reaction producing a gas or precipitate. Chemical changes are usually **difficult or impossible to reverse** by simple physical means.

### Signs that a chemical change has happened
- A colour change
- A gas is produced (bubbles, or a gas that can be tested for)
- A precipitate (insoluble solid) forms in a solution
- A temperature change occurs that is not simply due to heating or cooling from outside
- A new smell appears

Not every one of these has to occur — even one is usually enough evidence — but a genuinely new substance being formed is the defining test.`,
              analogy:
                'A physical change is like folding a piece of paper into an origami shape — it looks completely different, but it is still the exact same paper, and you can unfold it back to how it started. A chemical change is like burning that same paper — the ash and smoke are genuinely new substances, and there is no way to "unburn" it back into paper.',
              misconceptions: [
                'Assuming any dramatic-looking change (a big colour change, a lot of bubbles) must be chemical, and anything gentle must be physical. The correct test is always whether a new substance has formed, not how visually dramatic the change looks.',
                'Believing dissolving is a chemical change because the solid "disappears". The dissolved substance is still chemically the same, just spread throughout the solvent — it can be recovered unchanged by evaporating the solvent.',
                'Thinking all chemical changes are impossible to reverse under any circumstances. Some can be reversed, but only by another chemical reaction, not simply by a physical method like cooling or evaporating.',
              ],
              examTips: [
                'When justifying that a change is chemical, name the specific piece of evidence observed (e.g. "a gas was produced" or "the colour changed from blue to colourless") rather than just asserting "a new substance formed" with nothing to support it.',
                'For "physical or chemical?" questions, always check first whether the change can be reversed by a simple physical method (like cooling) — if yes, that is strong evidence it is physical.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Give two signs of a chemical change.', back: 'A new substance is formed; the change is usually difficult to reverse. Also: colour change, gas produced, temperature change, precipitate formed.', difficulty: 'EASY' },
            { front: 'Is melting ice a physical or chemical change?', back: 'Physical — no new substance is formed, and it is easily reversed by freezing.', difficulty: 'EASY' },
            { front: 'Is burning magnesium a physical or chemical change?', back: 'Chemical — a new substance (magnesium oxide) is formed, and the change cannot be easily reversed.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which of these is a physical change?',
              options: [
                { id: 'a', text: 'Iron rusting', why: 'A new substance, iron oxide, is formed — this is chemical.' },
                { id: 'b', text: 'Wax melting', why: '' },
                { id: 'c', text: 'Wood burning', why: 'New substances (ash, gases) are formed — this is chemical.' },
                { id: 'd', text: 'Milk turning sour', why: 'New substances are formed — this is chemical.' },
              ],
              answer: 'b',
              markScheme: ['Wax melting (1)'],
              marks: 1,
              explanation: 'Melting is a change of state. No new substance is formed, and the change is reversed simply by cooling — the defining features of a physical change.',
            },
          ],
        },
        {
          number: '6.2',
          slug: 'rate-of-reaction',
          title: 'Rate of reaction',
          summary: 'Collision theory and the effects of concentration, temperature, surface area, pressure and catalysts.',
          prerequisites: ['5.1'],
          objectives: [
            { code: '6.2.1', statement: 'Describe how to measure rate of reaction by gas volume or mass loss.', tier: 'CORE' },
            { code: '6.2.2', statement: 'Explain the effects of concentration, pressure, surface area, temperature and catalysts using collision theory.', tier: 'CORE' },
            { code: '6.2.3', statement: 'Interpret rate graphs, including the meaning of the gradient and the point where the reaction finishes.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['rates-lab'],
          lessons: [
            {
              slug: 'collision-theory-and-rates',
              title: 'Collision theory and rates',
              readingMinutes: 7,
              body: `For a reaction to happen, particles must **collide**, with enough energy (the **activation energy**) and in the right orientation.

Anything that increases either the **frequency** of collisions or the **proportion of successful** collisions will increase the rate.

### The factors
**Concentration ↑** → more particles in the same volume → more frequent collisions → faster.

**Pressure ↑** (gases) → particles pushed closer together → more frequent collisions → faster.

**Surface area ↑** (smaller pieces) → more particles exposed on the surface → more frequent collisions → faster.

**Temperature ↑** → this one has *two* effects, and good answers give both:
1. Particles move faster, so they collide more frequently.
2. More particles have energy greater than or equal to the activation energy, so a greater proportion of collisions are successful.

The second effect is by far the larger one, and it is the one most students omit.

**Catalyst** → provides an alternative reaction pathway with a **lower activation energy**, so a greater proportion of collisions succeed. The catalyst itself is not used up.

### Reading rate graphs
Plot volume of gas (or mass lost) against time:
- The **steeper** the curve, the faster the reaction.
- The curve is steepest at the **start**, when concentration is highest.
- It **levels off** when a reactant is used up. The height of the plateau shows how much product was made in total.

Two experiments with the same amount of reactant but different conditions will level off at the **same height** — only the steepness differs.`,
              analogy:
                'Collisions are like a busy corridor. More people (concentration) or faster walking (temperature) both mean more bumps — but only bumps hard enough to knock a book out of someone\'s hand count as a reaction.',
              misconceptions: [
                'Saying a catalyst "lowers the energy of the reaction". It lowers the activation energy by providing a different pathway; ΔH is unchanged.',
                'Explaining a temperature increase only by "particles move faster". The larger effect is that more particles exceed the activation energy.',
                'Thinking a faster reaction produces more product. It produces the same amount, more quickly.',
              ],
              examTips: [
                'Rate explanations need two steps: what happens to the particles, then what happens to the collisions. "More collisions" alone is usually 1 mark of 2.',
                'Say "more frequent collisions", not "more collisions" — over the whole reaction the total number is the same.',
                'On a rate graph, comparing plateau heights is how you show that the amount of reactant was unchanged.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why powdered calcium carbonate reacts faster with acid than the same mass of large lumps.',
                  steps: [
                    'Powder has a much larger total surface area than lumps of the same mass.',
                    'More calcium carbonate particles are exposed at the surface for acid particles to collide with.',
                    'The frequency of successful collisions is therefore higher.',
                  ],
                  answer: 'The greater surface area gives more frequent collisions, so the rate is higher — though the total volume of gas produced is the same.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the two conditions for a successful collision.', back: 'The particles must collide with energy greater than or equal to the activation energy, and in the correct orientation.', difficulty: 'MEDIUM' },
            { front: 'How does a catalyst speed up a reaction?', back: 'It provides an alternative pathway with a lower activation energy, so a greater proportion of collisions are successful.', difficulty: 'HARD' },
            { front: 'Give the two reasons a higher temperature increases rate.', back: 'Particles move faster so collide more frequently, and more particles have energy above the activation energy.', difficulty: 'HARD' },
            { front: 'What does the gradient of a rate graph show?', back: 'The rate of reaction at that moment.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain, using collision theory, why increasing the temperature increases the rate of a reaction. [3]',
              answer:
                'The particles gain kinetic energy and move faster, so they collide more frequently. In addition, a greater proportion of the particles have energy greater than or equal to the activation energy, so a greater proportion of collisions are successful. Both effects increase the rate.',
              markScheme: [
                'Particles have more kinetic energy / move faster (1)',
                'Collisions are more frequent (1)',
                'More particles have energy ≥ the activation energy, so more collisions are successful (1)',
              ],
              marks: 3,
              explanation:
                'The third marking point is the one most often missed. "They move faster and collide more" is only half the explanation — the energy condition is the dominant effect.',
              hint: 'Temperature changes two things about the particles, not one.',
            },
          ],
        },
        {
          number: '6.3',
          slug: 'reversible-reactions-and-equilibrium',
          title: 'Reversible reactions and equilibrium',
          summary: 'The ⇌ symbol, dynamic equilibrium, and the effect of changing conditions.',
          prerequisites: ['6.2'],
          objectives: [
            { code: '6.3.1', statement: 'Describe a reversible reaction and the characteristics of dynamic equilibrium in a closed system.', tier: 'CORE' },
            { code: '6.3.2', statement: 'Predict the effect of changing temperature, pressure or concentration on the position of equilibrium.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'reversible-reactions-and-equilibrium',
              title: 'Reversible reactions and equilibrium',
              readingMinutes: 7,
              body: `A **reversible reaction** can go in either direction — the products can react to re-form the reactants. It is written with a double arrow, \`⇌\`, instead of a single arrow.

### Dynamic equilibrium
If a reversible reaction happens in a **closed system** (nothing can enter or leave), it eventually reaches **dynamic equilibrium**. At equilibrium:
- The forward and reverse reactions are **both still happening** — the reaction has not stopped.
- They occur at **equal rates**, so there is no overall change in the concentrations of reactants and products.

"Dynamic" is the key word: it is a state of continuous activity in balance, not a state of rest.

### Shifting the position of equilibrium
Changing the conditions shifts the position of equilibrium, favouring either the forward or the reverse reaction:

- **Increasing concentration** of a reactant shifts equilibrium to produce more product (using up the extra reactant); increasing the concentration of a product shifts it back towards the reactants.
- **Increasing pressure** (for gas reactions) shifts equilibrium towards the side with **fewer moles of gas**, since that reduces the total number of gas particles and therefore the pressure.
- **Increasing temperature** shifts equilibrium in the **endothermic** direction, since that direction absorbs the extra energy; decreasing temperature shifts it in the **exothermic** direction.

These shifts are exploited industrially — for example, in the Haber process, conditions are chosen to maximise the yield of ammonia while keeping the reaction rate acceptably fast.`,
              analogy:
                'Dynamic equilibrium is like a busy escalator with exactly as many people stepping on at the bottom as stepping off at the top at every moment — the total number of people on the escalator stays constant, but it is absolutely not because everyone has stopped moving.',
              misconceptions: [
                'Thinking equilibrium means the reaction has stopped. Both the forward and reverse reactions are still occurring continuously, just at matched rates.',
                'Believing equilibrium means reactants and products are present in equal amounts. Their concentrations are constant, but not necessarily equal to each other.',
                'Forgetting that dynamic equilibrium can only be reached in a closed system — if substances can escape (an open system), equilibrium is never established.',
              ],
              examTips: [
                'Always state clearly which direction (forward/reverse, or towards products/reactants) a change shifts the equilibrium, not just that "the equilibrium changes".',
                'For pressure questions, count the number of moles of gas on each side of the equation first — the side with fewer gas moles is favoured by an increase in pressure.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What are the two conditions for dynamic equilibrium?', back: 'The rates of the forward and reverse reactions are equal, and the concentrations of reactants and products stay constant. It must be a closed system.', difficulty: 'HARD' },
            { front: 'What happens to the equilibrium position if pressure is increased?', back: 'It shifts towards the side with fewer moles of gas.', difficulty: 'HARD' },
            { front: 'What symbol shows a reaction is reversible?', back: '⇌ (a double-headed arrow, sometimes shown as two arrows in opposite directions).', difficulty: 'EASY' },
            { front: 'What is a closed system?', back: 'One in which no reactants or products can enter or leave, so equilibrium can be established.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A reversible reaction reaches dynamic equilibrium in a closed container. Explain what is meant by "dynamic equilibrium". [2]',
              answer:
                'The forward and reverse reactions are still happening, but they occur at the same rate as each other, so there is no overall change in the concentrations of reactants and products.',
              markScheme: ['Both forward and reverse reactions are still occurring (1)', 'They occur at equal rates, so concentrations remain constant (1)'],
              marks: 2,
              explanation: 'The word "dynamic" is the part students most often leave out — equilibrium is not the reaction stopping, it is the two directions continuing at matched rates.',
              hint: 'Does the reaction actually stop at equilibrium?',
            },
          ],
        },
        {
          number: '6.4',
          slug: 'redox',
          title: 'Redox',
          summary: 'Oxidation and reduction in terms of oxygen and electrons, oxidising and reducing agents, and oxidation numbers.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '6.4.1', statement: 'Define oxidation and reduction in terms of oxygen loss/gain and electron loss/gain.', tier: 'CORE' },
            { code: '6.4.2', statement: 'Identify oxidising and reducing agents in a redox reaction and use oxidation numbers.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'redox',
              title: 'Redox reactions',
              readingMinutes: 7,
              body: `**Redox** is short for "reduction–oxidation" — reactions in which oxidation and reduction happen simultaneously, one substance being oxidised while another is reduced.

### Two ways to define oxidation and reduction
In terms of **oxygen**: oxidation is the **gain** of oxygen; reduction is the **loss** of oxygen. This is the simpler, older definition, still useful for reactions like the blast furnace, where iron(III) oxide is reduced to iron.

In terms of **electrons** (the more general, more useful definition): oxidation is the **loss** of electrons; reduction is the **gain** of electrons. Remember it as **OIL RIG**: Oxidation Is Loss, Reduction Is Gain.

Both definitions describe the same underlying process viewed two different ways, and the electron definition works for reactions — like metal displacement — where oxygen is not involved at all.

### Oxidising and reducing agents
An **oxidising agent** oxidises another substance by taking electrons from it — and in doing so, the oxidising agent itself is reduced.

A **reducing agent** reduces another substance by giving it electrons — and the reducing agent itself is oxidised.

### Oxidation numbers
An **oxidation number** tracks how oxidised or reduced an atom is. Oxidation numbers increase during oxidation and decrease during reduction, giving a quick way to spot which species is which in a more complex equation.`,
              analogy:
                'A redox reaction is like a game of "electron tag" — one species chases down and steals electrons from another (getting reduced as it gains them), while the other species loses electrons and gets oxidised. Both things always happen together; you cannot have oxidation without reduction happening to something else at the same time.',
              misconceptions: [
                'Thinking a reaction can involve oxidation without any reduction taking place elsewhere. Every redox reaction has both happening together — one substance\'s gain of electrons is exactly another substance\'s loss.',
                'Mixing up which species is the oxidising agent and which is oxidised. The oxidising agent is the one that IS reduced (it does the oxidising to something else); the substance that loses electrons is the one that gets oxidised.',
                'Assuming oxidation always literally involves oxygen. The electron definition is more general — displacement reactions between metals are redox reactions with no oxygen involved at all.',
              ],
              examTips: [
                'When identifying oxidising and reducing agents, write out the half-equation for each species first (showing electrons lost or gained) — this makes it far easier to assign the correct label to each.',
                'OIL RIG is worth memorising exactly as written — many students mix up which letter pair refers to loss and which to gain under exam pressure.',
              ],
              workedExamples: [
                {
                  prompt: 'In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, state which species is the oxidising agent and which is the reducing agent.',
                  steps: [
                    'Zn → Zn²⁺ + 2e⁻ (zinc loses electrons: oxidised, so zinc is the reducing agent)',
                    'Cu²⁺ + 2e⁻ → Cu (copper ions gain electrons: reduced, so Cu²⁺ is the oxidising agent)',
                  ],
                  answer: 'Reducing agent: zinc. Oxidising agent: Cu²⁺ (copper(II) ions).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define oxidation in terms of electrons.', back: 'Loss of electrons.', difficulty: 'EASY' },
            { front: 'What does an oxidising agent do?', back: 'It oxidises another species by taking electrons from it, and is itself reduced.', difficulty: 'HARD' },
            { front: 'Define reduction in terms of electrons.', back: 'Gain of electrons.', difficulty: 'EASY' },
            { front: 'What does a reducing agent do?', back: 'It reduces another species by giving it electrons, and is itself oxidised.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, state which species is oxidised and which is reduced, giving a reason for each in terms of electrons. [2]',
              answer:
                'Zinc is oxidised, because it loses electrons to form Zn²⁺. Copper(II) ions are reduced, because they gain electrons to form Cu.',
              markScheme: ['Zinc is oxidised — loses electrons (1)', 'Cu²⁺ is reduced — gains electrons (1)'],
              marks: 2,
              explanation: 'OIL RIG: Oxidation Is Loss, Reduction Is Gain, always of electrons. Zn → Zn²⁺ + 2e⁻ is oxidation; Cu²⁺ + 2e⁻ → Cu is reduction.',
              hint: 'Which species ends up with a more positive charge, and which ends up less positive?',
            },
          ],
        },
      ],
    },
    {
      number: '7',
      slug: 'acids-bases-and-salts',
      title: 'Acids, bases and salts',
      summary: 'Properties of acids and bases, the pH scale, oxides, and how salts are prepared.',
      subtopics: [
        {
          number: '7.1',
          slug: 'properties-of-acids-and-bases',
          title: 'The characteristic properties of acids and bases',
          summary: 'Reactions of acids, indicators and the pH scale, and the H⁺/OH⁻ definition.',
          objectives: [
            { code: '7.1.1', statement: 'Describe the characteristic reactions of acids with metals, bases and carbonates.', tier: 'CORE' },
            { code: '7.1.2', statement: 'Describe the use of indicators and the pH scale.', tier: 'CORE' },
            { code: '7.1.3', statement: 'Define acids as proton donors and bases as proton acceptors, and explain strong and weak acids.', tier: 'SUPPLEMENT' },
          ],
          simulations: ['ph-titration'],
          lessons: [
            {
              slug: 'acids-bases-and-ph',
              title: 'Acids, bases and pH',
              readingMinutes: 7,
              body: `### The three reactions of acids
Learn these as word equations first — they generate most of the salt questions in the paper.

- **acid + metal → salt + hydrogen**
- **acid + base (metal oxide or hydroxide) → salt + water**
- **acid + carbonate → salt + water + carbon dioxide**

The salt formed is named from the acid: hydrochloric acid gives **chlorides**, sulfuric acid gives **sulfates**, nitric acid gives **nitrates**.

### The pH scale
pH runs from 0 to 14.
- pH < 7 is acidic — the lower the number, the more acidic.
- pH = 7 is neutral.
- pH > 7 is alkaline.

Universal indicator gives a colour range; litmus, methyl orange and thymolphthalein each give a single sharp change and are used in titrations.

### What actually makes something acidic
An acid in solution produces **H⁺ ions**. An alkali produces **OH⁻ ions**. Neutralisation is the reaction between them:

\`H⁺(aq) + OH⁻(aq) → H₂O(l)\`

That ionic equation is worth memorising — it is the same for every acid–alkali neutralisation.

### Strong and weak
This is about **degree of dissociation**, not concentration:
- A **strong** acid is fully dissociated into ions in solution (hydrochloric, sulfuric, nitric).
- A **weak** acid is only partially dissociated (ethanoic, carbonic).

A concentrated weak acid and a dilute strong acid are entirely different things. Strong/weak describes how completely the acid splits into ions; concentrated/dilute describes how much acid there is per volume.`,
              analogy:
                'Strong vs weak is about how many of the acid molecules "let go" of their hydrogen ions. Concentrated vs dilute is about how many molecules are in the glass in the first place.',
              misconceptions: [
                'Using "strong" and "concentrated" interchangeably. They describe different things.',
                'Thinking all acids react with all metals. Metals below hydrogen in the reactivity series, like copper, do not react with dilute acids.',
                'Forgetting that a carbonate produces carbon dioxide as well as salt and water.',
              ],
              examTips: [
                'Learn the three acid reactions as word equations — they let you predict products without memorising individual cases.',
                'For "explain the difference between a strong and a weak acid", the answer must contain the word "dissociated" (or "ionised").',
                'The test for carbon dioxide is limewater turning milky/cloudy. Say both words.',
              ],
              workedExamples: [
                {
                  prompt: 'Write the word and symbol equations for the reaction between hydrochloric acid and calcium carbonate.',
                  steps: [
                    'Pattern: acid + carbonate → salt + water + carbon dioxide',
                    'Hydrochloric acid gives a chloride salt: calcium chloride',
                    'Balance the symbol equation.',
                  ],
                  answer:
                    'hydrochloric acid + calcium carbonate → calcium chloride + water + carbon dioxide; 2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What are the products of acid + metal carbonate?', back: 'Salt + water + carbon dioxide.', difficulty: 'EASY' },
            { front: 'Give the ionic equation for neutralisation.', back: 'H⁺(aq) + OH⁻(aq) → H₂O(l)', difficulty: 'MEDIUM' },
            { front: 'Difference between a strong and a weak acid?', back: 'A strong acid is fully dissociated into ions in solution; a weak acid is only partially dissociated.', difficulty: 'HARD' },
            { front: 'What salt does sulfuric acid produce?', back: 'A sulfate.', difficulty: 'EASY' },
            { front: 'Test for carbon dioxide?', back: 'Bubble it through limewater — it turns milky (cloudy).', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A student adds magnesium ribbon to dilute sulfuric acid. Name the two products and describe a test for the gas produced. [3]',
              answer:
                'The products are magnesium sulfate and hydrogen. Test: collect the gas in a test tube and apply a lighted splint — hydrogen burns with a squeaky pop.',
              markScheme: ['Magnesium sulfate (1)', 'Hydrogen (1)', 'Lighted splint gives a squeaky pop (1)'],
              marks: 3,
              explanation:
                'Acid + metal → salt + hydrogen. Sulfuric acid always gives a sulfate. The squeaky-pop test is the standard test for hydrogen and both words are needed.',
            },
          ],
        },
        {
          number: '7.2',
          slug: 'oxides',
          title: 'Oxides',
          summary: 'Acidic, basic, amphoteric and neutral oxides.',
          prerequisites: ['7.1'],
          objectives: [
            { code: '7.2.1', statement: 'Classify oxides as acidic, basic, amphoteric or neutral.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'oxides',
              title: 'Acidic, basic, amphoteric and neutral oxides',
              readingMinutes: 5,
              body: `Oxides can be classified by how they react with acids and bases:

**Basic oxides** are typically **metal oxides**. They react with acids to form a salt and water, and do not react with bases. Example: copper(II) oxide + hydrochloric acid → copper(II) chloride + water.

**Acidic oxides** are typically **non-metal oxides**. They react with bases (alkalis) to form a salt and water, and many also dissolve in water to form an acidic solution. Example: carbon dioxide dissolves in water to form a weakly acidic solution (carbonic acid), and sulfur dioxide is responsible for acid rain.

**Amphoteric oxides** react with **both** acids and bases, forming a salt and water either way. The two IGCSE examples are **aluminium oxide** and **zinc oxide**.

**Neutral oxides** react with neither acids nor bases. Examples include carbon monoxide and water itself.

### The general pattern
This classification follows the Periodic Table reasonably well: elements on the left (metals) tend to form basic oxides, elements on the right (non-metals) tend to form acidic oxides, and the amphoteric examples sit near the metal/non-metal boundary.`,
              analogy:
                'An amphoteric oxide is like a person fluent in two languages who can hold a conversation with either group — it "speaks the language" of both acids and bases, reacting comfortably with either.',
              misconceptions: [
                'Assuming all metal oxides are basic without exception. Aluminium oxide and zinc oxide, both metal oxides, are amphoteric rather than simply basic.',
                'Thinking a neutral oxide is the same as a basic or acidic oxide that simply "doesn\'t work very well". Neutral oxides genuinely do not react with either acids or bases.',
                'Believing an oxidising oxide reacting with an acid always gives the same products as it would with a base. For an amphoteric oxide, the identity of the salt formed depends on which one it reacts with.',
              ],
              examTips: [
                'To prove an oxide is amphoteric, an answer needs to show it reacting with BOTH an acid and a base, forming a salt and water each time — one reaction alone does not establish amphoteric behaviour.',
                'When asked to classify an unfamiliar oxide, check first whether it is formed from a metal or a non-metal element as your starting point.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What is an amphoteric oxide?', back: 'An oxide that reacts with both acids and bases to form a salt and water — for example aluminium oxide and zinc oxide.', difficulty: 'HARD' },
            { front: 'Are metal oxides generally acidic or basic?', back: 'Basic.', difficulty: 'EASY' },
            { front: 'Are non-metal oxides generally acidic or basic?', back: 'Acidic.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Aluminium oxide reacts with both hydrochloric acid and sodium hydroxide solution. What type of oxide is it?',
              options: [
                { id: 'a', text: 'Acidic', why: 'An acidic oxide reacts with a base, not with an acid.' },
                { id: 'b', text: 'Basic', why: 'A basic oxide reacts with an acid, not with a base.' },
                { id: 'c', text: 'Amphoteric', why: '' },
                { id: 'd', text: 'Neutral', why: 'A neutral oxide reacts with neither.' },
              ],
              answer: 'c',
              markScheme: ['Amphoteric (1)'],
              marks: 1,
              explanation: 'Reacting with both an acid and a base is the definition of amphoteric — aluminium oxide and zinc oxide are the two IGCSE examples.',
            },
          ],
        },
        {
          number: '7.3',
          slug: 'preparation-of-salts',
          title: 'Preparation of salts',
          summary: 'Preparing soluble salts by titration or excess solid, and insoluble salts by precipitation.',
          prerequisites: ['7.1'],
          objectives: [
            { code: '7.3.1', statement: 'Describe the preparation, separation and purification of soluble salts.', tier: 'CORE' },
            { code: '7.3.2', statement: 'Describe the preparation of insoluble salts by precipitation.', tier: 'CORE' },
            { code: '7.3.3', statement: 'Recall the general solubility rules for common salts.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'preparation-of-salts',
              title: 'Preparing salts',
              readingMinutes: 7,
              body: `Which method is used to prepare a salt depends on whether the salt is **soluble** or **insoluble** in water.

### Solubility rules
- All sodium, potassium and ammonium salts are soluble.
- All nitrates are soluble.
- Most chlorides are soluble, except silver chloride and lead(II) chloride.
- Most sulfates are soluble, except barium sulfate, calcium sulfate and lead(II) sulfate.
- Most carbonates are insoluble, except sodium, potassium and ammonium carbonates.

### Preparing a soluble salt (excess solid method)
Used when the salt comes from an acid and an insoluble base (a metal, metal oxide or metal carbonate):

1. Warm the dilute acid and add the insoluble solid **a little at a time**, until it is in **excess** (no more dissolves).
2. **Filter** to remove the unreacted excess solid, keeping the filtrate.
3. Gently heat the filtrate to **evaporate** some water until the solution is saturated (a hot, saturated solution).
4. Allow it to **cool and crystallise**, then filter off and dry the crystals.

Excess solid is used so that all the acid reacts — ensuring the salt is not contaminated with leftover acid.

### Preparing a soluble salt (titration method)
Used when both reactants are soluble (an acid and an alkali): add a measured volume of alkali to a measured volume of acid, using an indicator to find the exact volume needed for neutralisation, then repeat without indicator using those measured volumes, and evaporate and crystallise as before.

### Preparing an insoluble salt (precipitation)
Mix two soluble solutions, each containing one of the ions needed, so they react to form an insoluble product immediately: filter, wash with distilled water to remove other soluble impurities, then dry.`,
              analogy:
                'Choosing a method is like choosing how to invite two guests to the same party: if one guest (a solid) cannot dissolve on their own, you add plenty of them and remove the leftovers afterwards (excess solid method); if both guests are already "in solution", you need to measure exact amounts carefully so they arrive in the right proportion (titration).',
              misconceptions: [
                'Using excess acid instead of excess solid. Using excess solid is correct because the unreacted solid is easy to filter off, whereas excess acid would remain dissolved in the salt solution and contaminate the product.',
                'Forgetting to filter before evaporating and crystallising in the excess solid method — without filtering first, the final crystals would be contaminated with the unreacted solid.',
                'Trying to prepare an insoluble salt by evaporation. Precipitation happens immediately on mixing; evaporating a solution containing an insoluble salt does nothing useful, since the precipitate has already formed and settled.',
              ],
              examTips: [
                'For excess-solid method questions, the four steps (react with excess, filter, evaporate/crystallise, dry) are usually each worth a mark — write them as separate, clearly labelled steps.',
                'When explaining precipitation, name both ions coming together explicitly, e.g. "Ba²⁺ ions and SO₄²⁻ ions combine to form insoluble barium sulfate".',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'How do you prepare an insoluble salt?', back: 'Precipitation: mix two soluble solutions containing the required ions, then filter, wash and dry the precipitate.', difficulty: 'MEDIUM' },
            { front: 'Which salts are always soluble?', back: 'All sodium, potassium and ammonium salts, and all nitrates.', difficulty: 'MEDIUM' },
            { front: 'How do you prepare a soluble salt from an insoluble base (excess solid method)?', back: 'Add excess insoluble base to warm dilute acid until no more reacts, filter off the excess, then evaporate and crystallise the filtrate.', difficulty: 'HARD' },
            { front: 'Why is excess solid used, rather than an exact amount, when preparing a soluble salt this way?', back: 'It ensures all the acid has reacted, so the salt produced is not contaminated with unreacted acid; the excess solid is simply filtered off.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Describe how a pure, dry sample of copper(II) sulfate crystals could be prepared from copper(II) oxide and dilute sulfuric acid. [4]',
              answer:
                'Warm the dilute sulfuric acid and add copper(II) oxide a little at a time, stirring, until the oxide is in excess and no more dissolves. Filter to remove the unreacted excess copper(II) oxide, collecting the blue filtrate. Gently heat the filtrate to evaporate some of the water until a saturated solution forms, then leave it to cool and crystallise. Filter off the crystals and pat dry between filter paper.',
              markScheme: [
                'Add excess copper(II) oxide to warm dilute sulfuric acid (1)',
                'Filter to remove unreacted excess oxide (1)',
                'Evaporate/heat the filtrate to the point of crystallisation (1)',
                'Cool, filter and dry the crystals (1)',
              ],
              marks: 4,
              explanation: 'This is the standard soluble-salt-from-an-insoluble-base method. The excess step is what most students forget to justify — it is there to guarantee all the acid is used up.',
              hint: 'Four marks means four distinct stages — react, filter, evaporate, crystallise.',
            },
          ],
        },
      ],
    },
    {
      number: '8',
      slug: 'the-periodic-table',
      title: 'The Periodic Table',
      summary: 'Arrangement of elements, Group I, Group VII, transition elements and noble gases.',
      subtopics: [
        {
          number: '8.1',
          slug: 'arrangement-of-elements',
          title: 'Arrangement of elements',
          summary: 'Periods, groups, and the link between position and electronic configuration.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '8.1.1', statement: 'Describe the Periodic Table as an arrangement of elements in order of proton number.', tier: 'CORE' },
            { code: '8.1.2', statement: 'Relate group number to outer-shell electrons and period number to the number of occupied shells.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'arrangement-of-elements',
              title: 'Arrangement of elements in the Periodic Table',
              readingMinutes: 5,
              body: `The Periodic Table arranges every known element in order of **increasing proton number**, from hydrogen (1) onward.

### Groups and periods
Elements are arranged into vertical **groups** (numbered I to VIII/0) and horizontal **periods**. This layout is not arbitrary — it directly reflects electronic configuration:

- The **group number** equals the number of electrons in an atom's outer shell (for Groups I–VII).
- The **period number** equals the number of electron shells that are occupied.

This is why elements in the same group share similar chemical properties: they have the same number of outer-shell electrons, and it is largely the outer shell that determines how an atom reacts.

### Why the pattern repeats
As proton number increases, electron shells fill up in a repeating pattern (2, 8, 8, 2 for the first 20 elements). Once a shell is completely full, the next electron starts a new shell, beginning a new period — which is exactly why the table's rows are the lengths they are, and why chemical properties recur periodically as you move across it.`,
              analogy:
                'The Periodic Table is like a filing cabinet where the drawer (period) tells you how many shelves of storage (electron shells) an item uses, and the position along a shelf (group) tells you what is on the very top layer (outer-shell electrons) — items in the same position on different shelves behave alike because their top layer is arranged the same way.',
              misconceptions: [
                'Thinking elements are arranged by relative atomic mass. They are arranged by increasing proton number — mass generally increases alongside this, but proton number is the defining order.',
                'Assuming group number always equals outer-shell electrons for every element. This rule applies cleanly to Groups I–VII (the main-group elements); transition elements do not follow it simply.',
                'Confusing group and period — remembering "group down, period across" is a fast way to keep the two straight.',
              ],
              examTips: [
                'When asked to justify an element\'s group or period from its electronic configuration, state the rule explicitly: "N outer electrons means Group N" and "M occupied shells means Period M".',
                'Elements in the same group are asked about constantly for their "similar properties" — always trace this back to their shared number of outer-shell electrons.',
              ],
              workedExamples: [
                {
                  prompt: 'An atom has the electronic configuration 2,8,2. State its group and period.',
                  steps: [
                    'Outer shell has 2 electrons, so Group II',
                    '3 shells are occupied, so Period 3',
                  ],
                  answer: 'Group II, Period 3 (this is magnesium)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What determines the order of elements in the Periodic Table?', back: 'Increasing proton number.', difficulty: 'EASY' },
            { front: 'What does the group number tell you?', back: 'The number of electrons in the outer shell (for Groups I–VII).', difficulty: 'MEDIUM' },
            { front: 'What does the period number tell you?', back: 'The number of occupied electron shells.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'An atom has the electronic configuration 2,8,3. State its group and period, and explain your reasoning. [2]',
              answer: 'Group III, because it has 3 electrons in its outer shell. Period 3, because it has 3 occupied electron shells.',
              markScheme: ['Group III, because there are 3 outer-shell electrons (1)', 'Period 3, because there are 3 occupied shells (1)'],
              marks: 2,
              explanation: 'This is aluminium. The rule is symmetrical and worth memorising as one sentence: outer electrons give the group, occupied shells give the period.',
            },
          ],
        },
        {
          number: '8.2',
          slug: 'group-i-properties',
          title: 'Group I properties',
          summary: 'The alkali metals: physical properties, reactions with water, and the trend in reactivity.',
          prerequisites: ['8.1'],
          objectives: [
            { code: '8.2.1', statement: 'Describe the physical properties and reactions with water of lithium, sodium and potassium.', tier: 'CORE' },
            { code: '8.2.2', statement: 'Explain the trend in reactivity down Group I in terms of electron loss.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'group-i-properties',
              title: 'Group I: the alkali metals',
              readingMinutes: 6,
              body: `Group I contains the **alkali metals**: lithium, sodium, potassium, and others further down the group. All have **one electron in their outer shell**, which they lose readily to form a +1 ion — this single fact explains almost everything about how they behave.

### Physical properties
Compared with typical metals, the alkali metals are unusually **soft** (can be cut with a knife) and have **low density** (lithium, sodium and potassium all float on water) and **low melting points**.

### Reaction with water
All three react vigorously with water, producing a metal hydroxide and hydrogen gas:

\`2Na + 2H₂O → 2NaOH + H₂\`

Observations: the metal floats, moves around the surface, may melt into a ball from the heat released, fizzes as hydrogen is produced, and may ignite (especially potassium, which burns with a lilac flame). The resulting solution turns universal indicator purple/blue, showing it is alkaline — consistent with the hydroxide formed.

### Trend in reactivity
Reactivity **increases down the group** (lithium < sodium < potassium). Going down the group, the outer electron is in a shell further from the nucleus, and shielded by more inner shells of electrons. This weakens the attraction between the nucleus and the outer electron, so it is lost more easily — and losing that outer electron is the reaction.`,
              analogy:
                'Losing the single outer electron in Group I is like letting go of a helium balloon: the further down the group you go, the more "layers of hands" (shielding shells) stand between the nucleus and that outer electron, and the weaker the grip becomes, so the electron drifts away more easily — explaining why potassium reacts more violently than lithium.',
              misconceptions: [
                'Thinking alkali metals become less reactive down the group, by wrongly assuming heavier atoms are always less reactive. Reactivity actually increases down Group I.',
                'Confusing the trend reasoning for Group I with Group VII — for Group I, more shielding down the group means the outer electron is lost MORE easily (more reactive); for Group VII, it means an extra electron is gained LESS easily (less reactive). These are opposite consequences of the same physical trend.',
                'Believing the alkali metals are typical "hard, shiny, unreactive" metals like iron or gold. They are soft, low density, and among the most reactive metals known — they are stored under oil to prevent reaction with air and moisture.',
              ],
              examTips: [
                'Explaining the reactivity trend needs three linked ideas: outer electron further from nucleus, more shielding by inner shells, weaker attraction so it is lost more easily — all three together, not just one.',
                'Describing the reaction with water, mention the float, the movement, and the gas produced — a full description usually needs at least two distinct observations.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What is the trend in reactivity down Group I?', back: 'Reactivity increases down the group.', difficulty: 'EASY' },
            { front: 'Why does reactivity increase down Group I?', back: 'The outer electron is in a shell further from the nucleus and is more shielded, so it is lost more easily.', difficulty: 'HARD' },
            { front: 'What is produced when sodium reacts with water?', back: 'Sodium hydroxide and hydrogen.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain why potassium is more reactive than sodium. [3]',
              answer:
                'Potassium\'s outer electron is in a shell further from the nucleus than sodium\'s. It is also shielded by more inner shells of electrons. The attraction between the nucleus and the outer electron is therefore weaker, so the electron is lost more easily and potassium reacts more vigorously.',
              markScheme: [
                'Outer electron is further from the nucleus (1)',
                'More shielding by inner electron shells (1)',
                'Weaker attraction, so the outer electron is lost more easily (1)',
              ],
              marks: 3,
              explanation:
                'The three marking points are distance, shielding and the resulting ease of electron loss. Group I reactivity is entirely about how easily the single outer electron departs.',
              hint: 'Think about the outer electron: how far away is it, and what is between it and the nucleus?',
            },
          ],
        },
        {
          number: '8.3',
          slug: 'group-vii-properties',
          title: 'Group VII properties',
          summary: 'The halogens: colours and states, the trend in reactivity, and displacement reactions.',
          prerequisites: ['8.1'],
          objectives: [
            { code: '8.3.1', statement: 'Describe the colours and physical states of chlorine, bromine and iodine and the trend down the group.', tier: 'CORE' },
            { code: '8.3.2', statement: 'Describe and explain displacement reactions of halogens with halide solutions.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'group-vii-properties',
              title: 'Group VII: the halogens',
              readingMinutes: 6,
              body: `Group VII contains the **halogens**: fluorine, chlorine, bromine, iodine and others. All have **seven electrons in their outer shell**, needing just one more to achieve a full shell — which is why they react readily by gaining an electron.

### Colours and states at room temperature
- **Chlorine**: a pale green/yellow **gas**.
- **Bromine**: a red-brown **liquid**.
- **Iodine**: a grey-black **solid** (which sublimes to a purple vapour when heated).

Notice the pattern: melting and boiling points **increase down the group**, which is why the state changes from gas to liquid to solid as you go down.

### Trend in reactivity
Reactivity **decreases down the group** — the opposite trend to Group I. Going down the group, the outer shell needing one more electron is further from the nucleus and more shielded by inner shells, so it is **harder** for the nucleus to attract an extra electron in from outside.

### Displacement reactions
A more reactive halogen will **displace** a less reactive halogen from a solution of its salt. For example, chlorine displaces bromine from potassium bromide solution:

\`Cl₂ + 2KBr → 2KCl + Br₂\`

The colour change (colourless solution turning orange-brown as bromine is released) is used as visible evidence that a displacement has occurred, and this pattern can be used to rank the halogens' reactivity experimentally.`,
              analogy:
                'Group VII reactivity works like Group I in reverse: instead of an atom trying to let go of one electron more easily as shielding increases, it is trying to grab one more electron, and the same extra shielding down the group makes that pull weaker — so fluorine (least shielded) reacts eagerly, and iodine (most shielded) is comparatively reluctant.',
              misconceptions: [
                'Applying the Group I reactivity trend (increases down the group) to Group VII by mistake. Group VII reactivity decreases down the group — the opposite direction.',
                'Assuming a less reactive halogen can displace a more reactive one. Displacement only happens from more reactive to less reactive — chlorine can displace bromine and iodine, but iodine cannot displace chlorine.',
                'Forgetting that both trends (Group I and Group VII) are caused by the same underlying idea — increasing shielding down a group — just with opposite consequences depending on whether an electron is being lost or gained.',
              ],
              examTips: [
                'For a displacement reaction, describe both the equation AND the visible colour change — questions often ask specifically "what would you observe".',
                'When explaining the Group VII reactivity trend, use the phrase "harder to attract an extra electron" rather than "harder to react", to show you understand the electron-level mechanism.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What is the trend in reactivity down Group VII?', back: 'Reactivity decreases down the group.', difficulty: 'MEDIUM' },
            { front: 'State the colour and state of bromine at room temperature.', back: 'A red-brown liquid.', difficulty: 'EASY' },
            { front: 'Will chlorine displace bromine from potassium bromide solution?', back: 'Yes — chlorine is more reactive than bromine, so it displaces it, turning the solution orange.', difficulty: 'MEDIUM' },
            { front: 'Why does reactivity decrease down Group VII?', back: 'The outer shell needing one more electron is further from the nucleus and more shielded, so it is harder for the atom to attract an extra electron.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Chlorine gas is bubbled through potassium iodide solution. What is observed?',
              options: [
                { id: 'a', text: 'No change', why: 'Chlorine is more reactive than iodine, so a displacement reaction does occur.' },
                { id: 'b', text: 'The solution turns brown as iodine is displaced.', why: '' },
                { id: 'c', text: 'A white precipitate forms.', why: 'No precipitate forms in this displacement reaction.' },
                { id: 'd', text: 'The solution turns green.', why: 'Chlorine water is pale green, but this is not the observation of this reaction.' },
              ],
              answer: 'b',
              markScheme: ['Solution turns brown, iodine is displaced (1)'],
              marks: 1,
              explanation: 'Chlorine is more reactive than iodine, so it displaces iodine from potassium iodide: Cl₂ + 2KI → 2KCl + I₂. The iodine produced colours the solution brown.',
            },
          ],
        },
        {
          number: '8.4',
          slug: 'transition-elements',
          title: 'Transition elements',
          summary: 'Characteristic properties: variable oxidation states, coloured compounds and catalytic activity.',
          prerequisites: ['8.1'],
          objectives: [
            { code: '8.4.1', statement: 'Describe the general properties of transition elements compared with Group I metals.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'transition-elements',
              title: 'Transition elements',
              readingMinutes: 5,
              body: `The **transition elements** sit in the central block of the Periodic Table (including iron, copper, zinc, silver and many others). Compared with Group I metals, they have quite different characteristic properties:

- **Hard, dense and strong**, with **high melting points** — unlike the soft, low-density, low-melting Group I metals.
- **Much less reactive** — they do not react vigorously with water or air the way alkali metals do, and can be found relatively unreactive in daily use (e.g. copper piping, iron tools).
- **Variable oxidation states** — the same element can form ions with different charges in different compounds (e.g. iron can form Fe²⁺ or Fe³⁺).
- **Coloured compounds** — solutions and compounds of transition metals are typically coloured (copper(II) compounds are blue, iron(III) compounds are orange/brown), unlike the white or colourless compounds typical of Group I metals.
- **Useful catalysts** — transition metals and their compounds are widely used as catalysts, for example iron in the Haber process and platinum in catalytic converters.

These properties combine to make transition metals the most practically useful metals for construction, wiring, and industrial catalysis.`,
              analogy:
                'If Group I metals are like fragile, hastily-built structures that react and crumble at the slightest provocation, transition metals are the sturdy, reliable workhorses of the Periodic Table — strong enough to build with, unreactive enough to last, and versatile enough (through their variable oxidation states) to take on several different roles depending on what a reaction needs.',
              misconceptions: [
                'Assuming all metals share the properties of Group I. Transition metals are a clear counterexample — far less reactive, much harder and denser, and forming coloured rather than colourless compounds.',
                'Thinking a transition element only ever forms one type of ion. Their defining feature is variable oxidation states — the same element can form different-charged ions in different compounds.',
                'Believing colour in compounds is unique to a few unusual transition metals. Coloured compounds are a general characteristic of the whole transition block, in contrast with the general colourlessness of Group I and Group II compounds.',
              ],
              examTips: [
                'A "compare with Group I" question wants direct contrasts, not just facts about transition metals alone — pair each property with its Group I opposite explicitly.',
                'When naming a use of a transition metal as a catalyst, name both the metal and the specific industrial process if you can (e.g. "iron is used as a catalyst in the Haber process").',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Give three characteristic properties of transition elements.', back: 'Variable oxidation states, coloured compounds, and useful catalytic activity. They also have high densities and high melting points.', difficulty: 'MEDIUM' },
            { front: 'Give the colour of copper(II) sulfate solution.', back: 'Blue.', difficulty: 'EASY' },
            { front: 'Name a transition element used as a catalyst in the Haber process.', back: 'Iron.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Give two ways in which the properties of transition elements differ from those of Group I metals. [2]',
              answer:
                'Transition elements form coloured compounds, while Group I compounds are white or colourless. Transition elements are much harder, denser and have higher melting points than the soft, low-density, low-melting-point Group I metals.',
              markScheme: ['Any two valid comparisons, e.g. coloured compounds vs colourless (1), higher density/melting point/hardness vs soft and low density (1)'],
              marks: 2,
              explanation: 'Any two of: coloured compounds, higher density, higher melting point, harder, less reactive, variable oxidation states, are creditable — the comparison must be explicit, not just a fact about one group alone.',
            },
          ],
        },
        {
          number: '8.5',
          slug: 'noble-gases',
          title: 'Noble gases',
          summary: 'Group VIII: full outer shells, lack of reactivity, and uses.',
          prerequisites: ['8.1'],
          objectives: [
            { code: '8.5.1', statement: 'Explain the lack of reactivity of the noble gases in terms of their electronic configuration.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'noble-gases',
              title: 'Group VIII: the noble gases',
              readingMinutes: 4,
              body: `Group VIII (sometimes called Group 0) contains the **noble gases**: helium, neon, argon, and others. They are the least reactive elements in the Periodic Table.

### Why they are so unreactive
Every noble gas atom already has a **full outer electron shell**. Since chemical bonding — whether transferring, gaining or sharing electrons — happens because atoms are trying to achieve a full outer shell, noble gas atoms have **no tendency to react at all**: they are already in the stable arrangement every other atom is aiming for.

This is also why noble gases exist as single, separate atoms (they are **monatomic**), rather than forming molecules like most other non-metal gases (e.g. oxygen exists as O₂, but neon exists as single Ne atoms) — there is no drive to share electrons with a neighbouring atom.

### Uses
Because they are so unreactive, noble gases are useful wherever a genuinely inert atmosphere is needed:
- **Argon** fills filament light bulbs, preventing the hot filament from reacting with oxygen and burning out.
- **Helium** fills balloons and airships, being far less dense than air and completely non-flammable (unlike hydrogen).
- **Neon** is used in illuminated signs, glowing distinctively when a current is passed through it.`,
              analogy:
                'A noble gas atom is like someone who already has everything they need and wants nothing more — every other atom in the Periodic Table is essentially "trading" to get to that same satisfied state, but noble gases start there already, so they have no reason to trade (react) at all.',
              misconceptions: [
                'Thinking noble gases never react under any circumstances. Under extreme conditions, some of the heavier noble gases (like xenon) can be forced to form compounds — but at IGCSE level they are treated as unreactive.',
                'Assuming all gaseous non-metals exist as single atoms like the noble gases. Most other non-metal gases (oxygen, nitrogen, chlorine) exist as diatomic molecules, held together by covalent bonds — noble gases are the exception.',
                'Believing noble gases are unreactive because they are gases. Their lack of reactivity comes from their full outer shell, which is unrelated to their physical state.',
              ],
              examTips: [
                'The explanation for unreactivity should say "full outer shell, so no tendency to gain, lose or share electrons" — this exact phrasing captures what an examiner is looking for.',
                'For a use of a noble gas, always link the use to the specific property that makes it suitable, e.g. "argon is unreactive, so it does not react with the hot filament".',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Why are noble gases unreactive?', back: 'They have full outer electron shells, so they have no tendency to gain, lose or share electrons.', difficulty: 'EASY' },
            { front: 'What is Group VIII also called?', back: 'The noble gases.', difficulty: 'EASY' },
            { front: 'Give one use of argon.', back: 'Filling filament light bulbs, because it is unreactive and does not react with the hot filament.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Why are the noble gases very unreactive?',
              options: [
                { id: 'a', text: 'They have only one electron in their outer shell.', why: 'That describes Group I, the most reactive metals.' },
                { id: 'b', text: 'They have a full outer electron shell.', why: '' },
                { id: 'c', text: 'They have no electrons at all.', why: 'All atoms have electrons.' },
                { id: 'd', text: 'They are all radioactive.', why: 'Reactivity is unrelated to radioactivity.' },
              ],
              answer: 'b',
              markScheme: ['Full outer electron shell (1)'],
              marks: 1,
              explanation: 'A full outer shell is already the stable arrangement, so noble gas atoms have no tendency to gain, lose or share electrons — which is why they almost never react.',
            },
          ],
        },
      ],
    },
    {
      number: '9',
      slug: 'metals',
      title: 'Metals',
      summary: 'Properties and uses of metals, alloys, the reactivity series, corrosion and extraction.',
      subtopics: [
        {
          number: '9.1',
          slug: 'properties-of-metals',
          title: 'Properties of metals',
          summary: 'General physical properties of metals compared with non-metals.',
          prerequisites: ['2.7'],
          objectives: [
            { code: '9.1.1', statement: 'Describe the general physical properties of metals and compare them with non-metals.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'properties-of-metals',
              title: 'Physical properties of metals',
              readingMinutes: 5,
              body: `Metals share a characteristic set of physical properties, which follow directly from their structure — a lattice of positive ions in a sea of delocalised electrons.

### Typical metal properties
- **Good conductors of heat and electricity** — the delocalised electrons carry both charge and thermal energy freely through the structure.
- **Malleable** (can be hammered/bent into shape) and **ductile** (can be drawn into a wire) — layers of ions can slide over each other without breaking the metallic bonding.
- **High density** and **high melting/boiling points** — the strong electrostatic attraction throughout the giant lattice needs a great deal of energy to overcome.
- **Shiny (lustrous)** when freshly cut or polished, as the surface reflects light well.

### Comparing with non-metals
Non-metals typically show the opposite pattern: **poor conductors** of heat and electricity (with graphite as a notable exception), **brittle** rather than malleable (they shatter rather than bend), generally **lower density**, and often **lower melting points**, especially the simple molecular non-metals.

These differences are why metals dominate applications needing strength, conductivity or shaping (wiring, construction, cookware), while non-metals are more often used for insulation or in compound form.`,
              analogy:
                'A metal is like a well-organised team where everyone shares resources freely (delocalised electrons), so energy and information (heat and electricity) pass through the whole group easily, and the team can reorganise its formation (bend and stretch) without falling apart. Many non-metals behave more like isolated individuals — each holding onto their own resources, unable to pass anything along efficiently, and prone to breaking rather than flexing under pressure.',
              misconceptions: [
                'Assuming all non-metals are poor conductors without exception. Graphite, a non-metal, conducts electricity well due to its delocalised electrons — a genuine exception worth remembering.',
                'Thinking malleable and ductile mean the same thing. Malleable means it can be hammered/bent into shape; ductile specifically means it can be drawn into a wire — they usually go together but describe different tests.',
                'Believing "shiny" is the same as "good conductor". They are separate properties that happen to often occur together in metals, but one does not cause the other.',
              ],
              examTips: [
                'When comparing metals and non-metals, state the property for BOTH explicitly (e.g. "metals conduct well; non-metals generally do not") rather than describing only one side.',
                'Density and melting point questions expect a comparison — "metals tend to have higher density/melting points than non-metals" — rather than an absolute claim, since there are exceptions on both sides.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Give three physical properties of metals.', back: 'Any three of: good conductors of heat and electricity, malleable, ductile, high density, high melting and boiling points, shiny (lustrous) when freshly cut.', difficulty: 'EASY' },
            { front: 'What does "malleable" mean?', back: 'Can be hammered or bent into shape without breaking.', difficulty: 'EASY' },
            { front: 'What does "ductile" mean?', back: 'Can be drawn out into a wire.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which property is typical of non-metals rather than metals?',
              options: [
                { id: 'a', text: 'Good conductor of electricity', why: 'This is typical of metals, not non-metals.' },
                { id: 'b', text: 'Malleable', why: 'Malleability is a metallic property.' },
                { id: 'c', text: 'Poor conductor of heat', why: '' },
                { id: 'd', text: 'High density', why: 'Metals are typically denser than non-metals.' },
              ],
              answer: 'c',
              markScheme: ['Poor conductor of heat (1)'],
              marks: 1,
              explanation: 'Non-metals are generally poor conductors of heat and electricity (with the exception of graphite), brittle rather than malleable, and lower density than most metals.',
            },
          ],
        },
        {
          number: '9.2',
          slug: 'uses-of-metals',
          title: 'Uses of metals',
          summary: 'Uses of aluminium and copper linked to their properties.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '9.2.1', statement: 'Explain the uses of aluminium and copper in terms of their properties.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'uses-of-metals',
              title: 'Uses of aluminium and copper',
              readingMinutes: 5,
              body: `Choosing a metal for a job means matching its properties to what the job needs — the IGCSE syllabus focuses on aluminium and copper as the two key examples.

### Aluminium
Aluminium has a **low density**, is **strong** (especially when alloyed), **resists corrosion** (a thin, tough layer of aluminium oxide forms naturally on its surface and protects the metal underneath from further reaction), and is a reasonably good conductor.

These properties make it ideal for:
- **Aircraft manufacture** — low density keeps the aircraft light, while alloying gives sufficient strength.
- **Overhead power cables** — low density means lighter cables needing less support, and it conducts electricity well, while corrosion resistance means it survives years of weather exposure.
- **Drink cans and food packaging** — corrosion resistance and low density (light, easy to transport), plus it does not react with the contents.

### Copper
Copper is an **excellent conductor** of electricity, is **ductile** (easily drawn into wires), and resists corrosion reasonably well in normal conditions.

These properties make it ideal for:
- **Electrical wiring** — excellent conductivity combined with ductility (it can be drawn into thin wires without breaking).
- **Water pipes** — it does not corrode easily in contact with water, and can be bent into shape without cracking.`,
              analogy:
                'Choosing a metal for a job is like choosing a material for shoes: you would not use heavy steel-toe boots for a marathon (too dense, like avoiding aluminium for an aircraft would be wrong-headed) or thin canvas for firefighting (not tough enough) — every material choice traces back to matching specific properties to a specific demand.',
              misconceptions: [
                'Naming a use of a metal without linking it to a specific property. "Aluminium is used for aircraft" alone is not an explanation — the property (low density) and its consequence (lighter aircraft, less fuel needed) must both be stated.',
                'Assuming aluminium resists corrosion because it does not react with oxygen. It does react, but the oxide layer that forms sticks tightly to the surface and protects the metal underneath from further reaction — a subtly different and important distinction.',
                'Confusing why copper is used for wiring (conductivity and ductility) with why aluminium is sometimes used for large overhead cables instead (its much lower density matters more there, despite copper conducting slightly better).',
              ],
              examTips: [
                'Every "explain the use" answer needs the structure: property → consequence → use. E.g. "Copper is ductile, so it can be drawn into thin wires, which is why it is used for electrical wiring."',
                'If two properties are relevant to one use (as with aluminium in overhead cables), mention both — questions worth 2+ marks usually expect more than one linked property.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Why is copper used for electrical wiring?', back: 'It is an excellent conductor of electricity and can be drawn into wires (ductile).', difficulty: 'MEDIUM' },
            { front: 'Why is aluminium used to make aircraft?', back: 'It has a low density (light) but is strong, especially as an alloy, and resists corrosion due to its protective oxide layer.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why aluminium, rather than a denser metal such as iron, is used to make overhead power cables. [2]',
              answer:
                'Aluminium has a low density, making the cables lighter so they need less support between pylons. It is also a good conductor of electricity, and it resists corrosion because of its protective oxide layer, so it is not eaten away by weather over time.',
              markScheme: ['Low density, so lighter cables (1)', 'Good conductor and resists corrosion (1)'],
              marks: 2,
              explanation: 'The examiner is looking for the property linked explicitly to the use — "aluminium is light" alone is weaker than "aluminium has a low density, so the cables are lighter and need less support".',
            },
          ],
        },
        {
          number: '9.3',
          slug: 'alloys',
          title: 'Alloys and their properties',
          summary: 'Why alloys are harder than pure metals, and examples including brass and steel.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '9.3.1', statement: 'Describe an alloy and explain in terms of structure why alloys are harder than pure metals.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'alloys',
              title: 'Alloys',
              readingMinutes: 5,
              body: `An **alloy** is a mixture of a metal with one or more other elements — usually other metals, or sometimes carbon — designed to improve on the properties of the pure metal alone.

### Why alloys are harder than pure metals
In a **pure metal**, all the atoms are the **same size**, arranged in regular layers that can slide over each other relatively easily — which is why pure metals tend to be comparatively soft.

In an **alloy**, atoms of a different element (a different size) are mixed in among the original metal atoms. This **disrupts the regular layered structure**, so the layers can no longer slide past each other as smoothly. The result is that alloys are generally **harder and stronger** than the pure metals they are made from.

### Common alloys
- **Brass** (copper + zinc) — harder than pure copper, used for fittings, musical instruments.
- **Steel** (iron + carbon, sometimes with other metals) — much harder and stronger than pure iron, used in construction and manufacturing.
- **Bronze** (copper + tin) — harder and more corrosion-resistant than pure copper, used for statues and some tools.

Alloys are chosen deliberately: pure metals are often too soft for demanding structural uses, so mixing in a small amount of another element solves the problem while retaining most of the useful properties (like conductivity) of the original metal.`,
              analogy:
                'A pure metal is like a stack of identical, smooth coins that slide over each other easily when you push the stack sideways. An alloy is like the same stack with a few odd-sized buttons mixed in — suddenly the stack jams and resists sliding, because the buttons do not fit the smooth layered pattern the coins had.',
              misconceptions: [
                'Thinking an alloy is a compound. It is a mixture — the different elements are not chemically bonded together in fixed proportions, they are simply mixed together in the solid structure.',
                'Believing any mixture of metals automatically makes something harder. It is specifically the disruption of the regular layered arrangement, caused by atoms of different sizes, that increases hardness.',
                'Assuming alloying always improves every property. Alloys are usually harder and stronger, but this can come at the cost of properties like conductivity, which is often slightly reduced compared with the pure metal.',
              ],
              examTips: [
                'A full explanation of alloy hardness needs the causal chain: different-sized atoms → disrupted regular layers → layers cannot slide as easily → harder material. Skipping the middle step is a common way to lose a mark.',
                'When naming an alloy\'s components, be precise — brass is copper and zinc, not copper and tin (that is bronze) — these are commonly mixed up.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Why is an alloy harder than a pure metal?', back: 'The different-sized atoms disrupt the regular layers, so the layers cannot slide over each other easily.', difficulty: 'HARD' },
            { front: 'Define an alloy.', back: 'A mixture of a metal with one or more other elements, usually other metals or carbon.', difficulty: 'EASY' },
            { front: 'Name the two main metals in brass.', back: 'Copper and zinc.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain, in terms of structure, why brass is harder than pure copper. [3]',
              answer:
                'Brass is an alloy of copper and zinc. The zinc atoms are a different size from the copper atoms, so they disrupt the regular layered structure of the copper. This makes it harder for the layers of atoms to slide over each other, so brass is harder than pure copper.',
              markScheme: [
                'Brass contains atoms of two different sizes (copper and zinc) (1)',
                'The different-sized atoms disrupt the regular layers (1)',
                'This makes it harder for the layers to slide over each other, so brass is harder (1)',
              ],
              marks: 3,
              explanation: 'Pure copper is soft because its identical-sized atoms are arranged in regular layers that slide easily. Any alloying element that is a different size breaks up that regularity.',
              hint: 'What has to happen for a metal to bend — and what stops that happening as easily in an alloy?',
            },
          ],
        },
        {
          number: '9.4',
          slug: 'reactivity-series',
          title: 'The reactivity series',
          summary: 'Order of reactivity, reactions with water and acid, and displacement reactions.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '9.4.1', statement: 'Place metals in order of reactivity using their reactions with water, steam and dilute acid.', tier: 'CORE' },
            { code: '9.4.2', statement: 'Explain displacement reactions of metals in terms of relative reactivity and electron transfer.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'reactivity-series',
              title: 'The reactivity series',
              readingMinutes: 8,
              body: `The **reactivity series** ranks metals from most to least reactive:

**Potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, (hydrogen), copper, silver, gold**

Carbon and hydrogen are included, though not metals, as useful reference points for extraction methods and for predicting reactions with acid.

### Placing metals using their reactions
- **Reaction with cold water**: the most reactive metals (potassium, sodium, calcium) react readily with cold water, producing a metal hydroxide and hydrogen gas. Potassium and sodium react vigorously enough to be dangerous; calcium reacts more gently.
- **Reaction with steam**: less reactive metals (like magnesium, zinc, iron) may not react with cold water but will react with steam, producing a metal oxide and hydrogen.
- **Reaction with dilute acid**: metals above hydrogen in the series react with dilute acids to produce a salt and hydrogen gas — and the more reactive the metal, the more vigorous the reaction (more rapid fizzing). Metals below hydrogen (copper, silver, gold) do not react with dilute acids at all.

### Displacement reactions
A **more reactive metal will displace a less reactive metal** from a solution of its salt, because the more reactive metal more readily loses electrons to form ions.

\`Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)\`

In terms of electrons: zinc atoms lose electrons (are oxidised) to form Zn²⁺ ions, while Cu²⁺ ions gain those electrons (are reduced) to form copper atoms. The reactive metal "wins" the electron transfer because it holds onto its own electrons less strongly.`,
              analogy:
                'The reactivity series is like a queue where whoever is more "eager to let go" of their electrons (more reactive) will always push in and take the place of someone less eager, in any encounter between a metal and another metal\'s ions — reactivity is really just a ranking of how readily each metal gives up its electrons.',
              misconceptions: [
                'Assuming a less reactive metal can displace a more reactive one. Displacement always goes in one direction: more reactive displaces less reactive, never the reverse.',
                'Forgetting that carbon and hydrogen, though not metals, are placed in the series as useful benchmarks — carbon for extraction methods, hydrogen for predicting reactions with dilute acid.',
                'Believing every metal reacts with water in some way. Metals below a certain point in the series (like copper, silver, gold) do not react with water or steam at all under normal conditions.',
              ],
              examTips: [
                'When explaining a displacement reaction, describe it in terms of electron transfer for full marks at supplement level — state clearly which metal loses electrons and which gains them.',
                'A common practical question describes observations from adding several metals to acid and asks you to rank them — use the rate of bubbling (fizzing) as your evidence, more vigorous meaning more reactive.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Give the reactivity series from potassium to gold.', back: 'Potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, (hydrogen), copper, silver, gold.', difficulty: 'HARD' },
            { front: 'What happens when a more reactive metal is added to a solution of a less reactive metal\'s salt?', back: 'The more reactive metal displaces the less reactive one from the solution.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which metal will displace copper from copper(II) sulfate solution?',
              options: [
                { id: 'a', text: 'Silver', why: 'Silver is less reactive than copper.' },
                { id: 'b', text: 'Gold', why: 'Gold is the least reactive of these.' },
                { id: 'c', text: 'Zinc', why: '' },
                { id: 'd', text: 'None of them', why: 'A more reactive metal will displace copper.' },
              ],
              answer: 'c',
              markScheme: ['Zinc (1)'],
              marks: 1,
              explanation:
                'Zinc is above copper in the reactivity series, so it displaces copper: Zn + CuSO₄ → ZnSO₄ + Cu. The blue solution fades and a brown copper deposit forms.',
            },
          ],
        },
        {
          number: '9.5',
          slug: 'corrosion',
          title: 'Corrosion of metals',
          summary: 'Rusting of iron, the conditions required, and methods of prevention.',
          prerequisites: ['9.4'],
          objectives: [
            { code: '9.5.1', statement: 'State the conditions required for iron to rust and describe barrier and sacrificial methods of prevention.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'corrosion',
              title: 'Corrosion of metals',
              readingMinutes: 6,
              body: `**Rusting** is the corrosion of iron, forming hydrated iron(III) oxide (rust). It requires **both** oxygen (air) and water — if either is absent, iron does not rust. This can be shown experimentally: iron in dry air (no water) does not rust; iron in boiled, oxygen-free water (no oxygen) does not rust; only iron exposed to both air and water rusts.

### Preventing rust: barrier methods
A **barrier method** simply keeps air and water away from the iron's surface. Examples: painting, oiling or greasing, coating with plastic, or **electroplating** with a less reactive metal like tin or chromium. As long as the barrier stays intact, the iron underneath is protected.

### Preventing rust: sacrificial protection
**Sacrificial protection** uses a more reactive metal in contact with the iron. Because the more reactive metal (commonly zinc or magnesium) loses electrons more readily than iron, it corrodes **in preference to** the iron — "sacrificing" itself. This works even if the coating is scratched, as long as some of the more reactive metal remains in contact with the iron.

**Galvanising** is the specific process of coating iron or steel with a layer of zinc, which acts as both a barrier AND provides sacrificial protection — giving it an advantage over barrier-only methods like paint, which fail completely once scratched.`,
              analogy:
                'Sacrificial protection is like a bodyguard who steps in front of an attack meant for someone else — the zinc "takes the hit" (loses electrons and corrodes) so that the iron behind it does not have to, and this protection keeps working even if the bodyguard is wounded (the coating scratched), as long as they are still there.',
              misconceptions: [
                'Thinking rusting only needs oxygen, or only needs water. Both must be present together for iron to rust.',
                'Believing all coatings work the same way. A pure barrier method (like paint) fails completely once scratched, exposing bare iron to air and water; a sacrificial method (like galvanising) keeps protecting the iron even after being scratched, because it is the more reactive metal itself that is being consumed.',
                'Assuming any metal coating gives sacrificial protection. Only a coating metal MORE reactive than iron (such as zinc or magnesium) provides sacrificial protection — a less reactive coating like tin only acts as a barrier, and can actually make rusting worse locally if scratched, since it would make iron the more reactive metal in that pair.',
              ],
              examTips: [
                'To prove both oxygen and water are needed, describe (or recognise) the classic three-tube experiment: iron in normal air and water (rusts), iron in dry air only (no rust), iron in boiled water with oil on top and no air (no rust).',
                'For "explain how galvanising protects iron, even when scratched", the sacrificial explanation (zinc more reactive, corrodes instead of iron) is specifically required — a barrier-only answer will not gain full marks.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'What two substances are needed for iron to rust?', back: 'Oxygen (air) and water.', difficulty: 'EASY' },
            { front: 'How does galvanising protect iron?', back: 'A zinc coating acts as a barrier and, being more reactive, corrodes in preference to the iron — sacrificial protection.', difficulty: 'HARD' },
            { front: 'What is the chemical name for rust?', back: 'Hydrated iron(III) oxide.', difficulty: 'MEDIUM' },
            { front: 'Give one barrier method of preventing rust that does not rely on a more reactive metal.', back: 'Painting, oiling, greasing, or coating with plastic — anything that keeps air and water away from the iron.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain how galvanising (coating iron with zinc) protects iron from rusting, even if the zinc coating is scratched. [3]',
              answer:
                'The zinc coating acts as a barrier, keeping air and water away from the iron. Even if the coating is scratched and the iron is exposed, zinc is more reactive than iron, so the zinc corrodes in preference to the iron — this is sacrificial protection. The iron itself is protected until all the nearby zinc has corroded away.',
              markScheme: [
                'Zinc acts as a barrier, excluding air and water (1)',
                'Zinc is more reactive than iron (1)',
                'Zinc corrodes instead of (in preference to) the iron — sacrificial protection (1)',
              ],
              marks: 3,
              explanation: 'The "even if scratched" detail in the question is a signal that a barrier-only answer is insufficient — the mark scheme specifically wants the sacrificial (reactivity-based) explanation, not just "it stops air and water".',
              hint: 'What still protects the iron once the barrier itself is broken?',
            },
          ],
        },
        {
          number: '9.6',
          slug: 'extraction-of-metals',
          title: 'Extraction of metals',
          summary: 'Extraction methods linked to reactivity, including the blast furnace and electrolysis of aluminium oxide.',
          prerequisites: ['9.4', '4.1'],
          objectives: [
            { code: '9.6.1', statement: 'Relate the method of extraction of a metal to its position in the reactivity series.', tier: 'CORE' },
            { code: '9.6.2', statement: 'Describe the extraction of iron in the blast furnace, including the main equations.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'extraction-of-metals',
              title: 'Extraction of metals',
              readingMinutes: 8,
              body: `The method used to extract a metal from its ore depends on the metal's position in the **reactivity series** — the general rule is that the extraction method needed becomes more powerful (and more expensive) the more reactive the metal is.

### The general rule
- Metals **more reactive than carbon** (potassium down to aluminium) cannot be extracted using carbon, because carbon cannot remove oxygen from their compounds. They are extracted by **electrolysis** of a molten compound instead.
- Metals **less reactive than carbon** (zinc down to gold, and iron) can be extracted by **heating with carbon**, which reduces the metal oxide by removing oxygen from it.
- The very **least reactive metals** (like gold) are found naturally as the uncombined element, needing no chemical extraction at all.

### Extracting iron: the blast furnace
Iron ore (mainly haematite, iron(III) oxide), coke (carbon) and limestone are added to the top of the blast furnace, and hot air is blasted in near the bottom.

1. Coke burns in the hot air: \`C + O₂ → CO₂\`
2. Carbon dioxide reacts with more coke to form carbon monoxide: \`CO₂ + C → 2CO\`
3. Carbon monoxide **reduces** the iron(III) oxide, removing its oxygen: \`Fe₂O₃ + 3CO → 2Fe + 3CO₂\`

Molten iron collects at the bottom and is drawn off. The limestone decomposes and reacts with impurities (mainly sand) to form slag, which floats on top of the molten iron and is removed separately.

### Extracting aluminium: electrolysis
Aluminium is more reactive than carbon, so it must be extracted by **electrolysis of molten aluminium oxide**. Because aluminium oxide has a very high melting point, it is dissolved in molten cryolite to reduce the operating temperature (and cost) of the process. Molten aluminium forms at the negative electrode (cathode) and oxygen at the positive electrode (anode).`,
              analogy:
                'Extracting a metal is like trying to free someone tightly holding onto something valuable: a weak request (heating with carbon) works on someone with a loose grip (a less reactive metal), but for someone gripping very tightly (a very reactive metal), you need a far more forceful method (electrolysis) to pry it away.',
              misconceptions: [
                'Thinking any metal oxide can be reduced by carbon. This only works for metals below carbon in the reactivity series — carbon cannot reduce the oxides of metals more reactive than itself, such as aluminium.',
                'Believing the blast furnace uses carbon directly to reduce iron oxide. It is specifically carbon MONOXIDE, formed from the carbon, that does the reducing in the main reaction.',
                'Assuming limestone is added to react with the iron ore. Limestone reacts with impurities (mainly silica/sand) in the ore to form slag — it is not involved in reducing the iron itself.',
              ],
              examTips: [
                'For the blast furnace, know all three key equations in order — many questions ask for "the equation that shows iron oxide is reduced" specifically, which is the third one, not the first.',
                'When asked why a particular extraction method is used, always link it back to the metal\'s position relative to carbon in the reactivity series, rather than just describing the method itself.',
              ],
              workedExamples: [],
            },
          ],
          flashcards: [
            { front: 'Why is aluminium extracted by electrolysis rather than with carbon?', back: 'Aluminium is more reactive than carbon, so carbon cannot reduce its oxide.', difficulty: 'HARD' },
            { front: 'What is the main reducing agent in the blast furnace?', back: 'Carbon monoxide.', difficulty: 'MEDIUM' },
            { front: 'Why can metals below carbon in the reactivity series be extracted by heating with carbon?', back: 'Carbon can displace (reduce) any metal less reactive than itself from its oxide.', difficulty: 'HARD' },
            { front: 'Name the raw materials fed into a blast furnace.', back: 'Iron ore (haematite), coke (carbon) and limestone.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain why aluminium cannot be extracted from its ore by heating with carbon, and describe the method that is used instead. [3]',
              answer:
                'Aluminium is more reactive than carbon, so carbon cannot remove oxygen from (reduce) aluminium oxide. Instead, aluminium is extracted by electrolysis: molten aluminium oxide is electrolysed, with molten aluminium forming at the cathode and oxygen at the anode.',
              markScheme: [
                'Aluminium is more reactive than carbon (1)',
                'So carbon cannot reduce/displace it from its oxide (1)',
                'Aluminium is extracted by electrolysis of molten aluminium oxide instead (1)',
              ],
              marks: 3,
              explanation: 'The general rule examined here: a metal can only be extracted using carbon if it is less reactive than carbon. Aluminium sits above carbon in the reactivity series, so electrolysis is the only option — and electrolysis needs the compound molten so the ions can move.',
              hint: 'Compare the reactivity of aluminium and carbon — which one would need to lose electrons to the other?',
            },
          ],
        },
      ],
    },
    {
      number: '10',
      slug: 'chemistry-of-the-environment',
      title: 'Chemistry of the environment',
      summary: 'Water treatment and testing, fertilisers, and air quality and climate.',
      subtopics: [
        {
          number: '10.1',
          slug: 'water',
          title: 'Water',
          summary: 'Testing for water, water treatment, and the uses of water in industry and the home.',
          objectives: [
            { code: '10.1.1', statement: 'Describe chemical tests for the presence of water and for its purity.', tier: 'CORE' },
            { code: '10.1.2', statement: 'Describe the treatment of the domestic water supply.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'water',
              title: 'Water',
              readingMinutes: 5,
              body: `Water looks like the simplest substance in chemistry, which is exactly why exam questions on it focus on two things: how do you **prove** a liquid is water, and how do you **prove** it is pure.
### Testing for water
Two chemical tests are used, and neither on its own proves *purity* — they only prove the liquid *contains* water:
- **Anhydrous copper(II) sulfate** is white. Add a drop of the liquid: if it turns **blue**, water is present (it rehydrates to hydrated copper(II) sulfate, CuSO₄·5H₂O).
- **Anhydrous cobalt(II) chloride** paper is blue. Add a drop of the liquid: if it turns **pink**, water is present.
### Testing for purity
Colour-change tests only show water is *present*, not that it is *pure*. Purity is a **physical** test: pure water has a sharp, fixed boiling point of exactly 100 °C and a sharp, fixed melting/freezing point of exactly 0 °C, both at normal atmospheric pressure. Dissolved substances **raise** the boiling point and **lower** the melting point, and they turn a sharp melting/boiling point into a range — so measuring the boiling or melting point is the definitive purity test.
### Treating the domestic water supply
Water from rivers or reservoirs is treated in stages before it reaches taps: **screening** removes large debris, **sedimentation** (often helped by adding a flocculant that makes fine particles clump and settle) removes suspended solids, **filtration** through sand removes remaining fine particles, and **chlorination** kills harmful microorganisms. Sometimes fluoride is also added to help protect teeth.`,
              analogy: 'The colour-change tests are like a smoke alarm: they tell you water is present, but not whether the air is otherwise clean. Only measuring the boiling/melting point tells you the whole sample is trustworthy.',
              misconceptions: [
                'Thinking a positive cobalt chloride or copper sulfate colour change proves the water is pure — it only proves water is present; a dissolved-salt solution gives the same colour change.',
                'Believing distilled water and "pure" water are the same as tap water — tap water is treated for safety, not purity, and still contains dissolved minerals and chlorine.',
              ],
              examTips: [
                'If asked "how would you show this liquid is pure water", the answer must be a physical test (boiling or melting point), not the colour-change chemical tests.',
                'Give both directions for impurities: they raise the boiling point AND lower the melting point compared with the pure substance.',
              ],
              workedExamples: [
                {
                  prompt: 'A student has a colourless liquid. Cobalt(II) chloride paper turns pink when dipped in it, and it boils at 100 °C exactly. What can be concluded?',
                  steps: ['Pink cobalt chloride paper confirms water is present.', 'A sharp boiling point of exactly 100 °C at atmospheric pressure confirms the water is pure (no dissolved solutes).'],
                  answer: 'The liquid is pure water.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Test for water?', back: 'Anhydrous copper(II) sulfate turns from white to blue (or anhydrous cobalt(II) chloride from blue to pink).', difficulty: 'MEDIUM' },
            { front: 'How do you show water is pure?', back: 'It boils at exactly 100 °C and freezes at exactly 0 °C at atmospheric pressure.', difficulty: 'MEDIUM' },
            { front: 'Name two stages in domestic water treatment.', back: 'Any two of: filtration (to remove solid particles), sedimentation, and chlorination (to kill microorganisms).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A student is given a colourless liquid and told it might be pure water. Describe a test, including the expected result, that would confirm it is pure water rather than water containing dissolved salts. [2]',
              answer:
                'Measure the boiling point of the liquid. Pure water boils at exactly 100 °C at normal atmospheric pressure; water with dissolved substances boils at a higher temperature.',
              markScheme: ['Measure the boiling point (1)', 'Pure water boils at exactly 100 °C — a different value means it is impure (1)'],
              marks: 2,
              explanation: 'Melting point works the same way in reverse: impurities lower the melting point and raise the boiling point compared with the pure substance.',
            },
          ],
        },
        {
          number: '10.2',
          slug: 'fertilisers',
          title: 'Fertilisers',
          summary: 'NPK fertilisers and the elements plants need.',
          objectives: [
            { code: '10.2.1', statement: 'State the elements supplied by NPK fertilisers and why plants need them.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'fertilisers',
              title: 'Fertilisers',
              readingMinutes: 4,
              body: `Plants make their own sugars by photosynthesis, but sugars alone cannot build every part of a plant. Proteins, DNA and cell membranes all need extra elements that a plant can only get from the soil through its roots — and intensive farming removes these elements faster than natural processes replace them, so farmers add them back as **fertilisers**.
### The NPK elements
**N**itrogen, **P**hosphorus and **K**potassium are the three elements added in bulk fertilisers, each for a different job:
- **Nitrogen** is needed to make **proteins**, which are essential for cell growth — a nitrogen-deficient plant grows slowly and has yellowing leaves.
- **Phosphorus** (as phosphates) is needed for healthy **root growth** and for respiration.
- **Potassium** helps enzymes work and improves resistance to disease, and helps flowering and fruiting.
### Making NPK fertilisers
Ammonium salts and nitrates (e.g. ammonium nitrate, NH₄NO₃, which conveniently supplies nitrogen twice over — once from the ammonium ion and once from the nitrate ion) are manufactured by neutralising ammonia with the appropriate acid, e.g. ammonia + nitric acid → ammonium nitrate. Industrially, ammonia itself is made by the **Haber process** (N₂ + 3H₂ ⇌ 2NH₃).`,
              analogy: 'NPK fertiliser is like a multivitamin for soil: photosynthesis supplies the plant\'s "calories" (sugars), but N, P and K are the specific nutrients the plant cannot make for itself and must absorb through its roots.',
              misconceptions: [
                'Thinking fertilisers are a plant\'s food in the way sugar is — plants make their own food by photosynthesis; fertilisers supply mineral elements the plant cannot photosynthesise.',
                'Mixing up which element does what — nitrogen is for leafy/protein growth, phosphorus is for roots, potassium is for flowering/fruiting and disease resistance.',
              ],
              examTips: [
                'If asked why crop yields fall without fertiliser, the answer is that repeated harvesting removes N, P and K from the soil faster than natural processes can replace them.',
                'Ammonium nitrate is a favourite exam salt because it supplies nitrogen from both parts of the formula — be ready to identify it as a nitrogen fertiliser made by neutralisation.',
              ],
              workedExamples: [
                {
                  prompt: 'Name the acid and alkali needed to manufacture ammonium sulfate fertiliser, and write a word equation for the reaction.',
                  steps: ['Ammonium salts are made by neutralising ammonia with the corresponding acid.', 'For a sulfate salt, the acid is sulfuric acid.', 'Word equation: ammonia + sulfuric acid → ammonium sulfate.'],
                  answer: 'Sulfuric acid and ammonia solution; ammonia + sulfuric acid → ammonium sulfate.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What do the letters N, P and K stand for in fertilisers?', back: 'Nitrogen, phosphorus and potassium.', difficulty: 'EASY' },
            { front: 'Why do plants need nitrogen?', back: 'To make proteins for healthy growth.', difficulty: 'MEDIUM' },
            { front: 'Name a common nitrogen-containing fertiliser.', back: 'Ammonium nitrate (or ammonium sulfate).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which element in NPK fertiliser is most directly needed by plants for making proteins?',
              options: [
                { id: 'a', text: 'Nitrogen', why: '' },
                { id: 'b', text: 'Phosphorus', why: 'Phosphorus is important for root growth, not primarily protein synthesis.' },
                { id: 'c', text: 'Potassium', why: 'Potassium helps flowering and fruiting, not primarily protein synthesis.' },
                { id: 'd', text: 'Oxygen', why: 'Oxygen is not one of the three NPK elements.' },
              ],
              answer: 'a',
              markScheme: ['Nitrogen (1)'],
              marks: 1,
              explanation: 'Nitrogen is a key component of amino acids, the building blocks of proteins, so plants need a nitrogen supply to grow healthily.',
            },
          ],
        },
        {
          number: '10.3',
          slug: 'air-quality-and-climate',
          title: 'Air quality and climate',
          summary: 'Composition of clean air, sources and effects of pollutants, catalytic converters and climate change.',
          objectives: [
            { code: '10.3.1', statement: 'State the composition of clean dry air and identify common atmospheric pollutants and their sources.', tier: 'CORE' },
            { code: '10.3.2', statement: 'Describe the adverse effects of pollutants and strategies for reducing them.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'air-quality-and-climate',
              title: 'Air quality and climate',
              readingMinutes: 6,
              body: `Clean, dry air is roughly **78% nitrogen, 21% oxygen**, with the remaining ~1% mostly argon and a small, currently-rising amount of carbon dioxide. Everything in this topic is really a question about what happens when combustion adds extra substances to that mixture.
### Where the main pollutants come from
- **Carbon monoxide (CO)** forms from the **incomplete combustion** of fuels, when there isn't enough oxygen to fully oxidise carbon to CO₂. It is toxic because it binds to haemoglobin in red blood cells more strongly than oxygen does, reducing the blood's oxygen-carrying capacity.
- **Sulfur dioxide (SO₂)** forms when fuels containing sulfur impurities (especially coal and some petrols) burn. It dissolves in atmospheric water to form **acid rain**, which damages plants, corrodes buildings, and acidifies lakes.
- **Oxides of nitrogen (NOₓ)** form inside car engines, where the high temperature of combustion is enough to make unreactive atmospheric nitrogen react directly with oxygen — this is a *thermal* reaction, not from impurities in the fuel. NOₓ also contributes to acid rain and to photochemical smog.
- **Particulates (soot/carbon)** form from incomplete combustion and contribute to respiratory problems and global dimming.
- **Carbon dioxide (CO₂)**, from complete combustion of any fossil fuel, is not toxic but is the main **greenhouse gas** driving climate change.
### Reducing the impact
**Catalytic converters** in car exhausts use a platinum/rhodium catalyst to convert CO and NOₓ into less harmful gases: 2CO + 2NO → 2CO₂ + N₂. This is a genuine chemical solution — it converts pollutants into other products rather than just filtering them out.`,
              analogy: 'Think of combustion pollutants as the "unwanted side dishes" of getting energy from a fuel: complete, oxygen-rich combustion serves up mostly CO₂ and water, while starved-of-oxygen or too-hot combustion serves up CO, soot and NOₓ as well.',
              misconceptions: [
                'Thinking oxides of nitrogen come from impurities in the fuel like sulfur dioxide does — they actually form from the air\'s own nitrogen and oxygen reacting due to the heat of the engine, regardless of fuel purity.',
                'Confusing carbon monoxide and carbon dioxide — CO is toxic and comes from incomplete combustion, CO₂ is non-toxic (to breathe, in normal concentrations) but is the main greenhouse gas.',
                'Thinking a catalytic converter filters pollutants out — it chemically converts them into less harmful gases via a reaction on the catalyst surface.',
              ],
              examTips: [
                'When explaining CO formation, always say "incomplete combustion due to insufficient oxygen" — a vague "burning fuel" answer will not get the mark.',
                'For NOₓ formation, the trigger word examiners look for is "high temperature" inside the engine, not fuel composition.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain, using a word or symbol equation, how a catalytic converter reduces air pollution from a car exhaust.',
                  steps: ['Exhaust gases contain the pollutants carbon monoxide and nitrogen monoxide.', 'On the catalyst surface, these react with each other: 2CO + 2NO → 2CO₂ + N₂.', 'Both products are far less harmful than the pollutants they replace.'],
                  answer: 'The catalytic converter reacts carbon monoxide with nitrogen monoxide (2CO + 2NO → 2CO₂ + N₂), converting two toxic pollutants into carbon dioxide and harmless nitrogen gas.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the composition of clean dry air.', back: 'About 78% nitrogen, 21% oxygen, and small amounts of argon, carbon dioxide and other gases.', difficulty: 'EASY' },
            { front: 'How is sulfur dioxide formed and what does it cause?', back: 'From burning fossil fuels containing sulfur compounds; it causes acid rain.', difficulty: 'MEDIUM' },
            { front: 'How are oxides of nitrogen formed in a car engine?', back: 'The high temperature inside the engine makes nitrogen and oxygen from the air react together.', difficulty: 'HARD' },
            { front: 'Why is carbon monoxide dangerous?', back: 'It is a toxic gas that binds to haemoglobin in red blood cells, reducing the blood\'s ability to carry oxygen.', difficulty: 'MEDIUM' },
            { front: 'What is the main greenhouse gas linked to climate change from burning fossil fuels?', back: 'Carbon dioxide.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain how carbon monoxide is formed when a car engine burns petrol, and why it is a hazard. [2]',
              answer:
                'Carbon monoxide forms from the incomplete combustion of fuel, when there is not enough oxygen for the carbon to fully oxidise to carbon dioxide. It is hazardous because it is a toxic, colourless and odourless gas that binds to haemoglobin in the blood, reducing the amount of oxygen the blood can carry around the body.',
              markScheme: ['Formed by incomplete combustion (not enough oxygen) (1)', 'Toxic — binds to haemoglobin, reducing oxygen transport in the blood (1)'],
              marks: 2,
              explanation: 'Complete combustion of a hydrocarbon fuel produces only carbon dioxide and water; carbon monoxide is specifically the product of incomplete combustion.',
            },
          ],
        },
      ],
    },
    {
      number: '11',
      slug: 'organic-chemistry',
      title: 'Organic chemistry',
      summary: 'Functional groups and naming, fuels, alkanes, alkenes, alcohols, carboxylic acids and polymers.',
      subtopics: [
        {
          number: '11.1',
          slug: 'formulae-functional-groups',
          title: 'Formulae, functional groups and terminology',
          summary: 'Homologous series, functional groups, general formulae and isomerism.',
          objectives: [
            { code: '11.1.1', statement: 'Define a homologous series and describe its general characteristics.', tier: 'CORE' },
            { code: '11.1.2', statement: 'Draw and interpret displayed and structural formulae of organic molecules.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'formulae-functional-groups',
              title: 'Formulae, functional groups and terminology',
              readingMinutes: 6,
              body: `Organic chemistry can feel like learning a new language, but almost the whole topic rests on one idea: molecules with the same **functional group** behave the same way chemically, no matter how long their carbon chain is.
### Homologous series
A **homologous series** is a family of compounds that: share the same **general formula**, differ from neighbour to neighbour by a **CH₂** unit, show a **gradual change** in physical properties (like boiling point, which rises as the chain gets longer, since bigger molecules have stronger intermolecular forces), and have **similar chemical properties** because they share the same functional group. Alkanes (CₙH₂ₙ₊₂), alkenes (CₙH₂ₙ), alcohols and carboxylic acids are all examples.
### Functional groups
A **functional group** is the specific atom or group of atoms responsible for a molecule's characteristic reactions — for example the C=C double bond in alkenes, or the −OH group in alcohols. The rest of the carbon chain is comparatively unreactive, which is why all alcohols undergo similar reactions regardless of chain length.
### Types of formula
- **Molecular formula** shows the number of each atom, e.g. C₂H₆O.
- **General formula** describes an entire homologous series, e.g. CₙH₂ₙ₊₂ for alkanes.
- **Structural formula** shows how atoms are grouped, e.g. CH₃CH₂OH.
- **Displayed formula** shows every atom and every bond drawn out explicitly.
### Isomerism
**Structural isomers** are compounds with the same molecular formula but a different structural arrangement of atoms — e.g. butane and methylpropane are both C₄H₁₀ but have different carbon skeletons.`,
              analogy: 'A homologous series is like a family of siblings: they all share the family "surname" (functional group) that determines how they behave in the world, while just growing taller (longer chain) as you go up the family.',
              misconceptions: [
                'Thinking a longer carbon chain changes the *type* of chemical reaction a molecule undergoes — chain length mainly affects physical properties (like boiling point); the functional group controls the chemistry.',
                'Confusing molecular formula (same for isomers) with structural formula (different for isomers) — two isomers always share a molecular formula but never a structural one.',
              ],
              examTips: [
                'If asked to define a homologous series, you need at least two of: same general formula, same functional group, differ by CH₂, gradual change in physical properties — a one-word answer will not get full marks.',
                'When drawing displayed formulae, every bond (including every C–H bond) must be shown as a explicit line — omitting hydrogens is a common way to lose marks.',
              ],
              workedExamples: [
                {
                  prompt: 'C₄H₁₀ has two structural isomers. Explain what is meant by "structural isomers" and name the two isomers of C₄H₁₀.',
                  steps: ['Structural isomers share the same molecular formula but have atoms arranged differently.', 'One isomer has an unbranched 4-carbon chain: butane.', 'The other has a branched 3-carbon chain with a methyl branch: methylpropane (2-methylpropane).'],
                  answer: 'Structural isomers have the same molecular formula but different structural arrangements of atoms. The two isomers of C₄H₁₀ are butane and methylpropane.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define a homologous series.', back: 'A family of compounds with the same functional group and general formula, whose members differ by CH₂ and show a gradual change in physical properties.', difficulty: 'HARD' },
            { front: 'What is a functional group?', back: 'An atom or group of atoms that gives a molecule its characteristic chemical properties, e.g. −OH in alcohols.', difficulty: 'MEDIUM' },
            { front: 'How does boiling point change as you go up a homologous series?', back: 'It increases gradually, because the molecules get larger and the intermolecular forces get stronger.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'State two features that all members of a homologous series have in common. [2]',
              answer: 'They have the same functional group, and they can be described by the same general formula.',
              markScheme: ['Same functional group (1)', 'Same general formula (successive members differ by CH₂) (1)'],
              marks: 2,
              explanation: 'Other correct features include a gradual change in physical properties (such as boiling point) and similar chemical properties — either of the two most central facts above is the expected minimum.',
            },
          ],
        },
        {
          number: '11.2',
          slug: 'naming-organic-compounds',
          title: 'Naming organic compounds',
          summary: 'Prefixes for chain length and suffixes for functional groups.',
          prerequisites: ['11.1'],
          objectives: [
            { code: '11.2.1', statement: 'Name and draw the first four members of the alkanes, alkenes, alcohols and carboxylic acids.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'naming-organic-compounds',
              title: 'Naming organic compounds',
              readingMinutes: 5,
              body: `Every IUPAC organic name is built from two parts glued together: a **prefix** that tells you how many carbon atoms are in the chain, and a **suffix** that tells you the functional group.
### The chain-length prefixes
| Carbons | Prefix |
|---|---|
| 1 | meth- |
| 2 | eth- |
| 3 | prop- |
| 4 | but- |
These are worth memorising cold — they appear in the name of every alkane, alkene, alcohol and carboxylic acid.
### The functional-group suffixes
- **-ane**: alkane (saturated hydrocarbon), e.g. propane, C₃H₈.
- **-ene**: alkene (contains a C=C double bond), e.g. propene, C₃H₆.
- **-ol**: alcohol (contains −OH), e.g. propanol, C₃H₇OH.
- **-oic acid**: carboxylic acid (contains −COOH), e.g. propanoic acid.
Put together: "but" + "ane" = butane (4-carbon alkane); "eth" + "ol" = ethanol (2-carbon alcohol).`,
              analogy: 'Naming an organic molecule is like naming a hybrid car: the prefix (meth-, eth-, prop-, but-) is the "model" telling you how big the chain is, and the suffix (-ane, -ene, -ol, -oic acid) is the "trim level" telling you which functional group it has.',
              misconceptions: [
                'Applying the prefix to the wrong count — but- means 4 carbons, not 2; a quick way to check is counting from meth- (1) upward: meth, eth, prop, but.',
                'Forgetting that the suffix, not the prefix, is what determines the class of compound and hence its reactions — propene and propane share a prefix but react completely differently because of the suffix.',
              ],
              examTips: [
                'When asked to name a compound from its structure, count the longest continuous carbon chain first to fix the prefix, then identify the functional group for the suffix.',
                'Carboxylic acid names always end "-oic acid", not just "-oic" — dropping "acid" is a common mark loss.',
              ],
              workedExamples: [
                {
                  prompt: 'Name the alcohol with the structural formula CH₃CH₂CH₂OH.',
                  steps: ['Count the carbon chain: 3 carbons, so the prefix is prop-.', 'The −OH functional group gives the suffix -ol.', 'Combine: propan-1-ol (commonly just "propanol" at this level).'],
                  answer: 'Propanol (propan-1-ol).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What prefix indicates three carbon atoms?', back: 'Prop-.', difficulty: 'EASY' },
            { front: 'What prefix indicates two carbon atoms? Four?', back: 'Eth- for two carbons, but- for four carbons.', difficulty: 'MEDIUM' },
            { front: 'What suffix shows a molecule is an alcohol?', back: '-ol, as in ethanol.', difficulty: 'EASY' },
            { front: 'What suffix shows a molecule is a carboxylic acid?', back: '-oic acid, as in ethanoic acid.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'What is the name of the alkane with four carbon atoms?',
              options: [
                { id: 'a', text: 'Methane', why: 'Methane has one carbon atom.' },
                { id: 'b', text: 'Propane', why: 'Propane has three carbon atoms.' },
                { id: 'c', text: 'Butane', why: '' },
                { id: 'd', text: 'Pentane', why: 'Pentane has five carbon atoms.' },
              ],
              answer: 'c',
              markScheme: ['Butane (1)'],
              marks: 1,
              explanation: 'The prefixes for the first four alkanes are meth- (1 carbon), eth- (2), prop- (3) and but- (4), each followed by -ane.',
            },
          ],
        },
        {
          number: '11.3',
          slug: 'fuels',
          title: 'Fuels',
          summary: 'Petroleum, fractional distillation and the uses of the fractions.',
          objectives: [
            { code: '11.3.1', statement: 'Name the fractions obtained from petroleum and state their uses.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'fuels',
              title: 'Fuels from petroleum',
              readingMinutes: 5,
              body: `Crude oil is not a single fuel — it is a mixture of hundreds of hydrocarbons of different chain lengths, and the whole point of **fractional distillation** is that boiling point rises steadily with chain length, so the mixture can be separated purely by heating.
### The fractionating column
Crude oil is heated until it vaporises and enters a column that is **hot at the bottom and cool at the top**. As vapour rises, each hydrocarbon condenses back to liquid once it reaches a height where the temperature drops below its own boiling point:
- **Short chains** (like the petrol/gasoline fraction) have low boiling points and condense high up, near the cool top.
- **Long chains** (like bitumen) have high boiling points and condense low down, near the hot bottom, or don't vaporise at all and are drawn off as a liquid residue.
### The main fractions and their uses
From top (shortest chains) to bottom (longest chains): **refinery gas** (bottled gas/LPG), **petrol** (car fuel), **kerosene** (jet fuel), **diesel** (fuel for lorries/trains), **fuel oil**, and **bitumen** (surfacing roads). Shorter-chain fractions are more flammable, less viscous, and burn with a cleaner flame; longer-chain fractions are more viscous, less flammable, and burn with a smokier flame.`,
              analogy: 'A fractionating column sorts hydrocarbons the way a coat-check by height would sort people: everyone rises until the "temperature" of their floor matches how easily they evaporate, and they step off (condense) there.',
              misconceptions: [
                'Thinking fractional distillation involves a chemical reaction — it is a purely physical separation based on differences in boiling point; no bonds are broken or made.',
                'Mixing up which end of the column collects short vs long chains — short chains (low boiling point) rise furthest and condense near the cool top; long chains condense low down near the hot bottom.',
              ],
              examTips: [
                'If asked why different fractions have different boiling points, the answer is about intermolecular forces: longer chains have more surface area for van der Waals forces between molecules, so more energy (a higher temperature) is needed to separate them into a gas.',
                'Learn the fraction order top-to-bottom (refinery gas, petrol, kerosene, diesel, fuel oil, bitumen) since exams often give a diagram and ask you to label or explain it.',
              ],
              workedExamples: [
                {
                  prompt: 'Two fractions from crude oil, A and B, have similar chain lengths, but A is more viscous and less flammable than B. Which fraction, A or B, condenses closer to the top of the fractionating column, and why?',
                  steps: ['More viscous and less flammable means longer carbon chains and a higher boiling point.', 'Higher-boiling-point fractions condense lower down the column (further from the cool top).', 'So A, being more viscous/less flammable, has the longer chains and condenses lower down — meaning B condenses closer to the top.'],
                  answer: 'Fraction B condenses closer to the top, because it has shorter chains, a lower boiling point, and needs less cooling to condense.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What separates the fractions in fractional distillation of petroleum?', back: 'Differences in boiling point, which depend on molecular size.', difficulty: 'MEDIUM' },
            { front: 'Which fraction has the shortest hydrocarbon chains and lowest boiling point — the one collected at the top or bottom of the column?', back: 'The top — short-chain fractions like petrol have low boiling points and rise to the top before condensing.', difficulty: 'HARD' },
            { front: 'Name one use of the bitumen fraction.', back: 'Surfacing roads (road tar).', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain how fractional distillation separates crude oil into fractions with different uses. [3]',
              answer:
                'Crude oil is heated until most of it vaporises, and the vapour rises through a fractionating column that is hotter at the bottom and cooler at the top. Hydrocarbons with longer chains have higher boiling points, so they condense and are drawn off lower down; hydrocarbons with shorter chains have lower boiling points and condense higher up, where it is cooler.',
              markScheme: [
                'Crude oil is heated and vaporised, entering a column with a temperature gradient (hot at bottom, cool at top) (1)',
                'Longer-chain hydrocarbons have higher boiling points and condense lower down (1)',
                'Shorter-chain hydrocarbons have lower boiling points and condense higher up (1)',
              ],
              marks: 3,
              explanation: 'The separation works because boiling point rises with chain length. The temperature gradient in the column, not a chemical reaction, is what does the sorting.',
              hint: 'What is different about the boiling points of long-chain and short-chain hydrocarbons?',
            },
          ],
        },
        {
          number: '11.4',
          slug: 'alkanes',
          title: 'Alkanes',
          summary: 'Saturated hydrocarbons, general formula CnH2n+2, and substitution reactions.',
          prerequisites: ['11.1'],
          objectives: [
            { code: '11.4.1', statement: 'State the general formula of the alkanes and describe them as saturated hydrocarbons.', tier: 'CORE' },
            { code: '11.4.2', statement: 'Describe the substitution reaction of alkanes with chlorine in the presence of ultraviolet light.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'alkanes',
              title: 'Alkanes',
              readingMinutes: 5,
              body: `Alkanes are the "boring but reliable" homologous series — the baseline every other organic family gets compared against, precisely because they are **saturated**: every carbon–carbon bond is a single bond, with no C=C double bond to react across.
### General formula
The general formula of the alkanes is **CₙH₂ₙ₊₂**. Substituting n = 1, 2, 3, 4 gives methane (CH₄), ethane (C₂H₆), propane (C₃H₈) and butane (C₄H₁₀).
### Why "saturated" matters
Being saturated means alkanes are relatively **unreactive**: they do not react with bromine water (unlike alkenes), and they burn cleanly in excess oxygen (complete combustion) to give carbon dioxide and water. Their main reactions are combustion (as fuels) and, under specific conditions, substitution.
### Substitution with chlorine
In the presence of **ultraviolet light**, alkanes react with chlorine in a **substitution** reaction — a hydrogen atom is replaced (substituted) by a chlorine atom, e.g. CH₄ + Cl₂ → CH₃Cl + HCl. This is fundamentally different from how alkenes react with bromine: alkanes cannot do addition because they have no double bond to open up, so the only way to fit chlorine into the molecule is by kicking a hydrogen out.`,
              analogy: 'Substitution in an alkane is like swapping one passenger for another in a full car — the car (molecule) is already "full" (saturated) so a new passenger can only get in if an existing one gets out.',
              misconceptions: [
                'Thinking alkanes react with bromine water — they do not; the bromine-water test is specifically used to distinguish alkanes (no change) from alkenes (decolourised) because alkanes lack a C=C bond.',
                'Confusing substitution (alkanes + halogens, one atom swapped for another) with addition (alkenes + halogens, atoms added across a broken double bond) — these are different mechanisms and exams test that you know which applies to which series.',
              ],
              examTips: [
                'If a question mentions "ultraviolet light" and an alkane, it is almost always testing the substitution reaction with a halogen — write the word "substitution" explicitly, not just "reaction".',
                'Complete combustion of an alkane needs "excess oxygen" specified in your answer — with limited oxygen you get incomplete combustion (carbon monoxide/soot) instead.',
              ],
              workedExamples: [
                {
                  prompt: 'Write a symbol equation for the reaction between ethane and chlorine in ultraviolet light, forming one substitution product.',
                  steps: ['Ethane, C₂H₆, has a hydrogen replaced by chlorine.', 'One product is chloroethane, C₂H₅Cl.', 'The other product is hydrogen chloride, HCl, from the displaced hydrogen.'],
                  answer: 'C₂H₆ + Cl₂ → C₂H₅Cl + HCl',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the general formula of the alkanes.', back: 'CnH2n+2', difficulty: 'EASY' },
            { front: 'What does "saturated" mean?', back: 'The molecule contains only single carbon–carbon bonds.', difficulty: 'EASY' },
            { front: 'What condition is needed for alkanes to react with chlorine?', back: 'Ultraviolet light.', difficulty: 'MEDIUM' },
            { front: 'What type of reaction occurs between an alkane and chlorine?', back: 'A substitution reaction — a hydrogen atom is replaced by a chlorine atom.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Methane reacts with chlorine in the presence of ultraviolet light. What type of reaction is this, and what is one product?',
              options: [
                { id: 'a', text: 'Addition; C₂H₆', why: 'Alkanes are saturated, so they cannot undergo addition reactions.' },
                { id: 'b', text: 'Substitution; CH₃Cl', why: '' },
                { id: 'c', text: 'Combustion; CO₂', why: 'This is not a combustion reaction — there is no oxygen involved.' },
                { id: 'd', text: 'Polymerisation; a long-chain polymer', why: 'Alkanes do not polymerise.' },
              ],
              answer: 'b',
              markScheme: ['Substitution; CH₃Cl (chloromethane) (1)'],
              marks: 1,
              explanation: 'A hydrogen atom in methane is replaced by a chlorine atom, forming chloromethane and hydrogen chloride: CH₄ + Cl₂ → CH₃Cl + HCl. Alkanes cannot undergo addition because they have no C=C double bond.',
            },
          ],
        },
        {
          number: '11.5',
          slug: 'alkenes',
          title: 'Alkenes',
          summary: 'Unsaturated hydrocarbons, cracking, the bromine water test, and addition reactions.',
          prerequisites: ['11.4'],
          objectives: [
            { code: '11.5.1', statement: 'State the general formula of the alkenes and describe them as unsaturated hydrocarbons.', tier: 'CORE' },
            { code: '11.5.2', statement: 'Describe the manufacture of alkenes by cracking.', tier: 'CORE' },
            { code: '11.5.3', statement: 'Describe the addition reactions of alkenes, including with bromine and steam.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'alkenes',
              title: 'Alkenes',
              readingMinutes: 6,
              body: `Alkenes are alkanes' more reactive cousin: swap one of the alkane's single C–C bonds for a **C=C double bond** and everything about the chemistry changes, because that double bond is a site where new atoms can be added.
### General formula and unsaturation
The general formula is **CₙH₂ₙ**. Having a C=C double bond makes alkenes **unsaturated** — able to react by opening the double bond and adding atoms across it, something saturated alkanes cannot do.
### The bromine water test
Shaking an alkene with orange/brown **bromine water** decolourises it, because the double bond opens and bromine atoms add across it: CH₂=CH₂ + Br₂ → CH₂BrCH₂Br. Alkanes leave bromine water unchanged, which is exactly why this is the standard test to distinguish the two series.
### Addition reactions
Because they are unsaturated, alkenes undergo **addition reactions** (nothing is lost, everything from both reactants ends up in one product):
- **+ hydrogen** (nickel catalyst) → alkane (hydrogenation, used to harden vegetable oils into margarine).
- **+ steam** (phosphoric acid catalyst, high temperature/pressure) → alcohol, e.g. ethene + steam → ethanol.
- **+ bromine** → dibromoalkane (the test above).
### Cracking: where alkenes come from
Long-chain alkanes from crude oil are less useful than short-chain ones. **Cracking** breaks long alkane molecules into a mixture of shorter alkanes and alkenes using heat and a catalyst (or just very high temperature): a long alkane → a shorter alkane + an alkene. This is how the alkenes needed for polymers and other chemicals are manufactured, since crude oil itself contains very few alkenes.`,
              analogy: 'A C=C double bond is like a folded coupon: while folded (double bond) it can\'t accept anything new, but as soon as it "unfolds" into two single bonds, there is a free hand on each carbon ready to grab a new atom — that\'s an addition reaction.',
              misconceptions: [
                'Forgetting that addition reactions conserve every atom — nothing is released as a by-product, unlike substitution reactions in alkanes which release HCl or similar.',
                'Thinking cracking is just heating an alkane until it "boils apart" — it specifically breaks C–C bonds to form new, shorter molecules, at least one of which is unsaturated; this is a chemical change, not a physical separation like fractional distillation.',
              ],
              examTips: [
                'Bromine water questions expect the specific colour change "orange/brown to colourless" — just saying "changes colour" loses the mark.',
                'When writing a cracking equation, check the atom count balances and that at least one product is an alkene (CₙH₂ₙ) — a common error is producing only alkanes.',
              ],
              workedExamples: [
                {
                  prompt: 'Decane, C₁₀H₂₂, is cracked to produce octane, C₈H₁₈, and one other product. Identify the other product and state its general formula.',
                  steps: ['Balance carbons: 10 = 8 + 2, so the other product has 2 carbons.', 'Balance hydrogens: 22 = 18 + 4, so the other product has 4 hydrogens.', 'C₂H₄ fits the alkene general formula CₙH₂ₙ (n = 2).'],
                  answer: 'The other product is ethene, C₂H₄, an alkene (general formula CₙH₂ₙ).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you test for an alkene?', back: 'Add bromine water — it changes from orange/brown to colourless.', difficulty: 'EASY' },
            { front: 'Give the general formula of the alkenes.', back: 'CnH2n', difficulty: 'EASY' },
            { front: 'What is cracking?', back: 'Breaking large, less useful hydrocarbon molecules into smaller, more useful ones, using heat and a catalyst.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'What is observed when ethene is bubbled through bromine water?',
              options: [
                { id: 'a', text: 'The solution turns from colourless to orange.', why: 'That is the reverse of what happens.' },
                { id: 'b', text: 'The orange colour disappears.', why: '' },
                { id: 'c', text: 'A white precipitate forms.', why: 'No precipitate is formed in this reaction.' },
                { id: 'd', text: 'There is no change.', why: 'Alkanes give no change; alkenes do react.' },
              ],
              answer: 'b',
              markScheme: ['Orange/brown bromine water is decolourised (1)'],
              marks: 1,
              explanation:
                'The C=C double bond undergoes an addition reaction with bromine, forming a colourless product. Alkanes, having no double bond, leave bromine water unchanged — which is how the test distinguishes them.',
            },
          ],
        },
        {
          number: '11.6',
          slug: 'alcohols',
          title: 'Alcohols',
          summary: 'The −OH group, manufacture of ethanol by fermentation and hydration, and combustion.',
          prerequisites: ['11.1'],
          objectives: [
            { code: '11.6.1', statement: 'Describe the manufacture of ethanol by fermentation and by catalytic addition of steam to ethene.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'alcohols',
              title: 'Alcohols',
              readingMinutes: 5,
              body: `Alcohols are defined by a single functional group, the **−OH** group, and the whole topic at this level really centres on ethanol: how it's made two different ways, and what it does when it burns or is oxidised.
### Two routes to ethanol
- **Fermentation**: yeast enzymes convert glucose into ethanol and carbon dioxide, glucose → ethanol + carbon dioxide, at 25–35 °C (warm enough for the enzymes to work quickly, not so hot that they're destroyed), in the **absence of oxygen** (anaerobic — oxygen would let the yeast respire aerobically instead, or let the ethanol oxidise). It uses a **renewable** raw material (plant sugars) but gives a dilute, impure product that needs distilling to concentrate.
- **Catalytic addition of steam to ethene**: ethene + steam ⇌ ethanol, using a **phosphoric acid catalyst** at about 300 °C and high pressure. It is fast, continuous, and gives a pure, concentrated product directly — but ethene comes from cracking crude oil, a **non-renewable** resource.
### Reactions of ethanol
Ethanol **burns** in air (combustion) to give carbon dioxide and water, releasing energy — this is why it's used as a biofuel. It can also be **oxidised** (by an oxidising agent, or slowly by microorganisms in the air) to ethanoic acid, the carboxylic acid responsible for the sour taste of wine that has been left open too long.`,
              analogy: 'Fermentation vs. the ethene route is a classic slow-artisanal-bakery vs. fast-factory trade-off: fermentation is slower and needs simple equipment but uses a renewable ingredient, while the ethene route is quick and industrial but depends on crude oil.',
              misconceptions: [
                'Thinking fermentation happens best with lots of oxygen around — it specifically needs the *absence* of oxygen (anaerobic conditions); oxygen would let other reactions (including oxidation to ethanoic acid) compete.',
                'Assuming both manufacturing routes give the same product purity — fermentation gives a dilute aqueous solution that must be distilled, while the ethene/steam route gives pure ethanol directly.',
              ],
              examTips: [
                'Comparison questions on the two ethanol-manufacture routes expect a genuine trade-off — one advantage AND one disadvantage of each, not just a fact about one method.',
                'Remember the reversible-arrow (⇌) in the ethene + steam equation — it is an equilibrium reaction, unlike fermentation which is treated as one-way.',
              ],
              workedExamples: [
                {
                  prompt: 'State the conditions needed for the industrial production of ethanol from ethene and steam, and write the equation.',
                  steps: ['Catalyst: phosphoric acid.', 'Conditions: about 300 °C and high pressure.', 'Equation: C₂H₄ + H₂O ⇌ C₂H₅OH.'],
                  answer: 'Phosphoric acid catalyst, ~300 °C, high pressure: C₂H₄ + H₂O ⇌ C₂H₅OH.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What conditions are needed for fermentation?', back: 'Yeast, an aqueous glucose solution, about 25–35 °C, and the absence of oxygen.', difficulty: 'MEDIUM' },
            { front: 'Give the word equation for fermentation.', back: 'Glucose → ethanol + carbon dioxide.', difficulty: 'EASY' },
            { front: 'What are the conditions for making ethanol from ethene and steam?', back: 'A catalyst of phosphoric acid, high temperature (about 300 °C) and high pressure.', difficulty: 'HARD' },
            { front: 'Give one advantage of fermentation over the ethene-and-steam method.', back: 'It uses a renewable raw material (glucose from plants), whereas ethene comes from crude oil, a non-renewable resource.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Compare the fermentation method and the catalytic addition of steam to ethene as ways of manufacturing ethanol, giving one advantage of each. [2]',
              answer:
                'Fermentation uses glucose, a renewable resource, and needs only simple, low-cost equipment, but produces a dilute solution of ethanol that must be distilled and is a slow, batch process. The steam and ethene method is fast and continuous and produces pure, concentrated ethanol, but ethene comes from crude oil, a non-renewable resource, and it needs high temperature and pressure.',
              markScheme: ['One valid point in favour of fermentation, e.g. renewable raw material (1)', 'One valid point in favour of the ethene route, e.g. fast/continuous/pure product (1)'],
              marks: 2,
              explanation: 'This is a "compare" question, so credit requires a genuine trade-off for each method, not just a fact about one of them.',
            },
          ],
        },
        {
          number: '11.7',
          slug: 'carboxylic-acids',
          title: 'Carboxylic acids',
          summary: 'The −COOH group, reactions of ethanoic acid, and ester formation.',
          prerequisites: ['11.6'],
          objectives: [
            { code: '11.7.1', statement: 'Describe the formation of ethanoic acid by oxidation of ethanol and its reactions as a weak acid.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'carboxylic-acids',
              title: 'Carboxylic acids',
              readingMinutes: 5,
              body: `Carboxylic acids carry the **−COOH** functional group and behave chemically as acids, which means most of what you already know about acid reactions (from Topic 7) transfers directly — you just need to recognise ethanoic acid as "an acid that happens to be organic."
### Making ethanoic acid
Ethanoic acid forms by the **oxidation of ethanol**, either using an oxidising agent (such as acidified potassium dichromate) in the lab, or slowly and naturally when ethanol is exposed to air (microorganisms/bacteria oxidise it) — which is why wine left open turns sour as it slowly becomes vinegar.
### Ethanoic acid is a weak acid
Unlike strong acids such as hydrochloric acid, ethanoic acid is a **weak acid**: it only **partially dissociates** into ions in aqueous solution (CH₃COOH ⇌ CH₃COO⁻ + H⁺), so a solution of ethanoic acid has a higher pH (is less acidic) than a strong acid of the same concentration, and reacts more slowly with, e.g., magnesium or carbonates.
### Typical acid reactions
Carboxylic acids undergo the standard acid reactions: with **metals** → salt + hydrogen (e.g. with magnesium → magnesium ethanoate + hydrogen); with **carbonates** → salt + water + carbon dioxide; with **alkalis** → salt + water (neutralisation). The salts formed are named "-anoate", e.g. sodium ethanoate.
### Esterification
Carboxylic acids react with **alcohols**, warmed with a **concentrated sulfuric acid catalyst**, to form an **ester** and water — e.g. ethanoic acid + ethanol → ethyl ethanoate + water. Esters are typically sweet-smelling and used in flavourings and perfumes.`,
              analogy: 'Ethanoic acid is a weak acid the way a half-open tap is a weak flow: the "water" (H⁺ ions) is available, but only a fraction is let through at once, compared with a strong acid where the tap is fully open (fully dissociated).',
              misconceptions: [
                'Assuming "weak acid" means "dilute acid" — weak refers to the *degree of dissociation* (only partly ionises), while dilute refers to *concentration*; a concentrated weak acid and a dilute strong acid are entirely different things.',
                'Forgetting esterification needs a catalyst and heat — simply mixing an acid and an alcohol at room temperature does not form an ester at a useful rate.',
              ],
              examTips: [
                'When comparing a weak and a strong acid of equal concentration, three comparisons are commonly tested: pH (weak acid has a higher pH), rate of reaction with a metal/carbonate (weak acid reacts more slowly), and electrical conductivity (weak acid conducts less, fewer ions present).',
                'Ester names swap the order compared with acid + alcohol: "ethanoic acid + ethanol" gives "ethyl ethanoate" — the alcohol part becomes the first word (with -yl) and the acid part becomes the second (with -oate).',
              ],
              workedExamples: [
                {
                  prompt: 'Propanoic acid reacts with methanol in the presence of concentrated sulfuric acid. Name the organic product and write a word equation.',
                  steps: ['This is an esterification reaction between an acid and an alcohol.', 'The alcohol\'s name (methan-) becomes "methyl"; the acid\'s name (propanoic) becomes "propanoate".', 'Word equation: propanoic acid + methanol → methyl propanoate + water.'],
                  answer: 'Methyl propanoate; propanoic acid + methanol → methyl propanoate + water.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is formed when a carboxylic acid reacts with an alcohol?', back: 'An ester and water (with a concentrated sulfuric acid catalyst).', difficulty: 'MEDIUM' },
            { front: 'How is ethanoic acid formed from ethanol?', back: 'By oxidation, using an oxidising agent (or by leaving it exposed to air, which oxidises it biologically).', difficulty: 'MEDIUM' },
            { front: 'Is ethanoic acid a strong or weak acid?', back: 'A weak acid — it is only partially dissociated into ions in solution.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Ethanoic acid reacts with magnesium. Which products are formed?',
              options: [
                { id: 'a', text: 'Magnesium ethanoate and hydrogen', why: '' },
                { id: 'b', text: 'Magnesium ethanoate and oxygen', why: 'Acid + metal never produces oxygen.' },
                { id: 'c', text: 'Magnesium oxide and water', why: 'This would be the product of acid + a metal oxide, not acid + metal.' },
                { id: 'd', text: 'No reaction occurs', why: 'Carboxylic acids do react with reactive metals like magnesium.' },
              ],
              answer: 'a',
              markScheme: ['Magnesium ethanoate and hydrogen (1)'],
              marks: 1,
              explanation: 'Carboxylic acids behave as acids: acid + metal → salt + hydrogen. Ethanoic acid with magnesium gives magnesium ethanoate and hydrogen gas.',
            },
          ],
        },
        {
          number: '11.8',
          slug: 'polymers',
          title: 'Polymers',
          summary: 'Addition polymerisation, condensation polymers, and the environmental impact of plastics.',
          prerequisites: ['11.5'],
          objectives: [
            { code: '11.8.1', statement: 'Describe addition polymerisation and deduce the repeat unit from a monomer.', tier: 'CORE' },
            { code: '11.8.2', statement: 'Discuss the environmental problems caused by non-biodegradable plastics.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'polymers',
              title: 'Polymers',
              readingMinutes: 5,
              body: `A **polymer** is a very large molecule made from thousands of small repeating units, called **monomers**, joined end to end into a long chain — plastics are the most familiar example.
### Addition polymerisation
**Addition polymers** are made from monomers that each contain a **C=C double bond** (i.e. alkenes). During polymerisation, every double bond opens up into a single bond, freeing a bond on each carbon to join the next monomer — so the monomers link up with **nothing left over**: no by-product is released, unlike condensation polymerisation.
- Ethene (CH₂=CH₂) → poly(ethene), repeat unit −(CH₂−CH₂)−.
- Propene (CH₂=CHCH₃) → poly(propene), repeat unit −(CH₂−CHCH₃)−.
The general rule: draw the monomer, replace the double bond with a single bond, and add extending bonds on both ends of the repeat unit to show it continues.
### Naming from the monomer, and vice versa
To go from monomer to polymer name: take the monomer's name, put it in brackets, and add "poly" in front, e.g. propene → poly(propene). To go the other way — from the repeat unit back to the monomer — reverse the process: identify the repeating −C−C− backbone, then reinstate the double bond.
### The environmental problem
Most addition polymers are **non-biodegradable**: microorganisms cannot break the strong C−C backbone down, so plastics persist in landfill and the natural environment for decades or longer, and can harm wildlife. Options for dealing with waste plastic include **recycling** (melting and reshaping), **incineration** (burning for energy, though this can release toxic gases if not carefully controlled), and using **biodegradable** plastics designed to break down naturally.`,
              analogy: 'Addition polymerisation is like a long line of people linking arms: each person (monomer) has one "hand" free on each side because they let go of holding both their own hands together (the double bond opening) — nothing is dropped, they just link up.',
              misconceptions: [
                'Forgetting the extending bonds when drawing a repeat unit — a repeat unit without bonds sticking out on both ends looks like a single, isolated molecule rather than part of a chain.',
                'Thinking the double bond survives inside the polymer — it does not; the C=C becomes a C−C single bond as soon as polymerisation happens, which is exactly what frees up the bonds needed to link to neighbouring monomers.',
                '"Recyclable" and "biodegradable" are not the same thing — a plastic can be recyclable by industrial processing while still not breaking down naturally if left in the environment.',
              ],
              examTips: [
                'When deducing a repeat unit from a monomer, always show two things: the correct atoms in brackets, and a bond extending from each end of the bracket.',
                'For "explain why non-biodegradable plastics are a problem" questions, name a specific consequence (e.g. harm to wildlife, landfill taking up space for decades) rather than just restating that they "don\'t break down".',
              ],
              workedExamples: [
                {
                  prompt: 'Chloroethene, CH₂=CHCl, is the monomer used to make PVC (poly(chloroethene)). Deduce the repeat unit.',
                  steps: ['Identify the double bond: between the two carbons.', 'Open the double bond into a single bond.', 'Add extending bonds on both ends to represent the repeating chain.'],
                  answer: 'The repeat unit is −(CH₂−CHCl)−, with a bond extending from each end.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What type of monomer is needed for addition polymerisation?', back: 'One containing a C=C double bond, such as an alkene.', difficulty: 'MEDIUM' },
            { front: 'Why are many plastics an environmental problem?', back: 'They are non-biodegradable, so they persist in landfill and the environment; burning them can release toxic gases.', difficulty: 'MEDIUM' },
            { front: 'What is a polymer?', back: 'A very large molecule built from many repeating smaller units called monomers, joined together.', difficulty: 'EASY' },
            { front: 'Give two ways of dealing with waste plastic.', back: 'Any two of: recycling, incineration (burning for energy), or using biodegradable plastics that break down naturally.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Ethene, CH₂=CH₂, undergoes addition polymerisation to form poly(ethene). Deduce the repeat unit of poly(ethene) and explain what happens to the double bond during polymerisation. [3]',
              answer:
                'The repeat unit is −(CH₂−CH₂)−, with a bond extending from each end to show it repeats. During polymerisation the C=C double bond in each ethene monomer opens up into a single bond, allowing the monomers to join to each other in a long chain.',
              markScheme: [
                'Repeat unit shown as −(CH₂−CH₂)− with bonds extending from both ends (1)',
                'The C=C double bond becomes a single bond (1)',
                'This allows monomers to join together into a long chain (1)',
              ],
              marks: 3,
              explanation: 'A very common slip is forgetting the extending bonds on the repeat unit, or forgetting that the double bond is not retained — addition polymerisation only works because that double bond opens up to form the new bonds to neighbouring monomers.',
              hint: 'What has to happen to the double bond for the monomers to be able to join up?',
            },
          ],
        },
      ],
    },
    {
      number: '12',
      slug: 'experimental-techniques',
      title: 'Experimental techniques and chemical analysis',
      summary: 'Apparatus and measurement, titrations, chromatography, separation methods, and identifying ions and gases.',
      subtopics: [
        {
          number: '12.1',
          slug: 'experimental-design',
          title: 'Experimental design',
          summary: 'Choosing apparatus, measuring accurately, and assessing purity.',
          objectives: [
            { code: '12.1.1', statement: 'Name and use appropriate apparatus for measuring time, temperature, mass and volume.', tier: 'CORE' },
            { code: '12.1.2', statement: 'Suggest suitable methods of purification and identify sources of error.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'experimental-design',
              title: 'Experimental design',
              readingMinutes: 5,
              body: `Practical chemistry questions are really testing one skill: matching the right piece of apparatus, and the right level of precision, to what is actually being measured.
### Choosing apparatus
- **Volume of liquid**: a **measuring cylinder** for an approximate volume; a **pipette** for one precise, fixed volume (e.g. 25.0 cm³); a **burette** for a precise, *variable* volume that you read before and after adding (used in titrations).
- **Mass**: a balance, typically reading to 0.01 g or 0.1 g depending on the precision needed.
- **Temperature**: a thermometer, ideally reading to at least 0.5 °C, used inside an insulated container (e.g. a polystyrene cup) to minimise heat loss to the surroundings, which would otherwise make a measured temperature change too small.
- **Time**: a stopwatch, started and stopped consistently at defined, visible end points (e.g. when a cross viewed through a solution disappears).
### Assessing purity
A pure substance has a **sharp, fixed** melting and boiling point; an impure substance melts/boils over a **range**, with the melting point **lowered** and the boiling point **raised** compared with the pure substance. This is the standard way to judge whether a prepared or purified sample has succeeded.
### Sources of error
Common sources of experimental error to be ready to identify: heat loss to the surroundings (widen with an insulated container/lid), a reaction that is too fast to time accurately (repeat and average, or slow it down), parallax error in reading a scale (read at eye level, at the bottom of the meniscus for liquids), and human reaction-time error when using a stopwatch (repeat and take a mean).`,
              analogy: 'Choosing apparatus is like choosing a measuring tool at home: you would not use kitchen scales to weigh a gold ring, and you would not use a jeweller\'s scale to weigh a sack of flour — the precision of the tool has to match the precision the task actually needs.',
              misconceptions: [
                'Using a measuring cylinder where the question implies high precision is needed (e.g. in a titration) — a measuring cylinder is far less precise than a pipette or burette and would not be accepted as the method there.',
                'Forgetting that impure substances melt/boil over a *range*, not just at a shifted single temperature — both the range and the direction of shift (melting point down, boiling point up) matter for full marks.',
              ],
              examTips: [
                'If a question asks how to improve the accuracy of a temperature-change experiment, "use a lid/insulation to reduce heat loss to the surroundings" is almost always a valid, expected answer.',
                'When justifying an apparatus choice, name the apparatus AND say why (its precision or suitability for that specific measurement) — naming it alone often only earns partial credit.',
              ],
              workedExamples: [
                {
                  prompt: 'A student wants to measure exactly 25.0 cm³ of hydrochloric acid as accurately as possible. Name the most suitable piece of apparatus and explain your choice.',
                  steps: ['A measuring cylinder could measure roughly 25 cm³ but is not very precise.', 'A pipette is designed to measure one specific, fixed volume very accurately.', '25.0 cm³ is a standard pipette volume.'],
                  answer: 'A pipette, because it measures a single fixed volume much more accurately than a measuring cylinder.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which apparatus measures a precise volume of solution in a titration?', back: 'A burette (for the variable volume) and a pipette (for the fixed volume).', difficulty: 'MEDIUM' },
            { front: 'How can you tell a substance is pure from its melting point?', back: 'A pure substance melts sharply at one exact temperature; an impure substance melts over a range and at a lower temperature.', difficulty: 'HARD' },
            { front: 'Which apparatus measures temperature change most precisely in an experiment?', back: 'A thermometer, ideally reading to at least 0.5 °C, used in an insulated container to reduce heat loss.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A student measures the melting point of a solid and finds it melts gradually between 110 °C and 118 °C, rather than sharply. What does this suggest about the solid, and why? [2]',
              answer:
                'It suggests the solid is impure. Impurities lower the melting point and cause it to melt over a range of temperatures, rather than sharply at one exact value as a pure substance would.',
              markScheme: ['The solid is impure (1)', 'Impurities lower the melting point and widen the melting range (1)'],
              marks: 2,
              explanation: 'Purity questions in this topic almost always hinge on this one idea: pure substances have one sharp melting/boiling point, impure ones melt or boil over a range.',
            },
          ],
        },
        {
          number: '12.2',
          slug: 'acid-base-titrations',
          title: 'Acid–base titrations',
          summary: 'Titration procedure, indicators, and concordant results.',
          prerequisites: ['7.1', '3.3'],
          objectives: [
            { code: '12.2.1', statement: 'Describe how to carry out an acid–base titration and select an appropriate indicator.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'acid-base-titrations',
              title: 'Acid–base titrations',
              readingMinutes: 6,
              body: `A titration answers one question very precisely: exactly what volume of one solution is needed to exactly react with a known volume of another. The whole procedure exists to nail down that volume as accurately as possible.
### The procedure, stage by stage
1. Use a **pipette** to measure a precise, fixed volume (e.g. 25.0 cm³) of one solution into a conical flask, and add a few drops of **indicator**.
2. Fill a **burette** with the other solution and record the **initial reading**.
3. Add the burette solution to the flask, **swirling constantly**, until the indicator just changes colour (the **end point**) — record the **final reading**. The difference between final and initial readings is the **titre**.
4. Do a quick, less careful **rough titration** first to find an approximate volume, so the accurate repeats can be run faster (adding quickly until near the expected end point, then drop by drop).
5. **Repeat** the titration until you get **concordant results** — titres within 0.10 cm³ of each other — and calculate the **mean of the concordant titres only** (discard any outliers).
### Choosing an indicator
The indicator needs a colour change that happens sharply at the neutralisation point. For a strong acid–strong alkali titration, most indicators (phenolphthalein, methyl orange) work well because the pH change at the end point is very sharp and spans their colour-change range. Methyl orange is red in acid and yellow in alkali; phenolphthalein is colourless in acid and pink in alkali.`,
              analogy: 'A titration is like carefully adding salt to a pot of soup by the pinch instead of pouring it all in at once — you add roughly (the rough titration) to get close, then add drop by drop once you\'re near the answer, watching for the exact moment it "tastes right" (the colour change).',
              misconceptions: [
                'Adding the titrant quickly all the way to the colour change on every attempt — the accurate repeats should be added drop by drop once near the volume found in the rough titration, otherwise the end point is easily overshot.',
                'Averaging all titre results including outliers — only concordant results (within 0.10 cm³ of each other) should be averaged; a titre far from the others should be discarded, not included.',
              ],
              examTips: [
                'A "describe the method" question is marked stage by stage: pipette + indicator, fill burette + initial reading, add while swirling until colour change + final reading, repeat for concordant results and average — missing any one stage costs a mark.',
                '"Swirling" the flask while adding from the burette is a specific, frequently-forgotten mark point — it ensures the solutions mix evenly so the colour change is seen as soon as it happens.',
              ],
              workedExamples: [
                {
                  prompt: 'In a titration, three titres were recorded: 24.60 cm³, 24.55 cm³, 27.80 cm³. Identify which titres are concordant and calculate the mean titre to use.',
                  steps: ['Concordant results are within 0.10 cm³ of each other.', '24.60 and 24.55 differ by 0.05 cm³ — concordant.', '27.80 differs from the others by far more than 0.10 cm³ — it is an outlier and should be discarded.', 'Mean of concordant results: (24.60 + 24.55) / 2 = 24.575, rounded to 24.58 cm³.'],
                  answer: '24.60 cm³ and 24.55 cm³ are concordant; 27.80 cm³ is discarded. Mean titre = 24.58 cm³ (2 d.p.).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What are concordant titres?', back: 'Titres within 0.10 cm³ of each other, which are averaged to give the final result.', difficulty: 'HARD' },
            { front: 'Why do you do a rough titration first?', back: 'To find an approximate volume, so the accurate repeats can be run quickly and the colour change is not missed by adding the alkali too fast.', difficulty: 'MEDIUM' },
            { front: 'What indicator would you choose for a strong acid–strong alkali titration and why?', back: 'Any suitable indicator such as phenolphthalein or methyl orange works, because the sharp pH change at the end point spans the colour-change range of most indicators.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Describe how you would carry out a titration to find the volume of hydrochloric acid needed to exactly neutralise 25.0 cm³ of sodium hydroxide solution. [4]',
              answer:
                'Use a pipette to measure 25.0 cm³ of sodium hydroxide solution into a conical flask, and add a few drops of indicator. Fill a burette with hydrochloric acid and record the starting reading. Add the acid to the flask, swirling constantly, until the indicator just changes colour, and record the final burette reading. Repeat the titration until concordant results (within 0.10 cm³) are obtained, then calculate the mean of the concordant titres.',
              markScheme: [
                'Pipette 25.0 cm³ of sodium hydroxide into a conical flask, add indicator (1)',
                'Fill burette with acid, note the initial reading (1)',
                'Add acid while swirling until the indicator changes colour, note the final reading (1)',
                'Repeat for concordant results and average the concordant titres (1)',
              ],
              marks: 4,
              explanation: 'Titration method answers are marked stage by stage — a common way to lose marks is describing the addition but forgetting to mention swirling the flask, or forgetting the repeat-and-average step at the end.',
              hint: 'There are four distinct stages: measure, fill, titrate, repeat.',
            },
          ],
        },
        {
          number: '12.3',
          slug: 'chromatography',
          title: 'Chromatography',
          summary: 'Paper chromatography, locating agents, and Rf values.',
          objectives: [
            { code: '12.3.1', statement: 'Describe paper chromatography and interpret chromatograms, including calculating Rf values.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'chromatography',
              title: 'Chromatography',
              readingMinutes: 5,
              body: `Chromatography separates a mixture of dissolved substances by exploiting one thing: how strongly each substance is attracted to the paper (the **stationary phase**) versus how easily it travels with the solvent (the **mobile phase**).
### The method
A spot of the mixture is placed on **pencil** (not pen — ink would itself dissolve and move) near the bottom of a sheet of chromatography paper, above the level of the solvent in a container. As the **solvent front** rises up the paper, each dissolved substance is carried along at its own rate, depending on how strongly it clings to the paper versus how soluble it is in the solvent — substances that are more soluble and less attracted to the paper travel further.
### Interpreting a chromatogram
- A **pure** substance produces exactly **one spot**; a **mixture** produces **more than one spot**.
- Comparing spots against **known reference substances** run on the same chromatogram lets you identify unknown components — matching height (and hence Rf) suggests they are the same substance.
- A **locating agent** (a chemical spray, or exposure to UV light) is used to make **colourless** spots visible, since not every substance is naturally coloured.
### Rf values
The **Rf value** (retardation factor) is calculated as \`Rf = distance moved by the substance ÷ distance moved by the solvent front\`. Both distances are measured from the same baseline (the original spot position). Rf has **no units**, since it is a ratio, and is always between 0 and 1. Rf values are a property of the substance and the solvent used, so they can be looked up and compared to identify unknowns.`,
              analogy: 'Chromatography is like a foot race through sticky mud: substances that are less "sticky" (less attracted to the paper) and more eager to move with the solvent race ahead, while substances that cling to the paper lag behind — the finishing position tells you which substance is which.',
              misconceptions: [
                'Using pen instead of pencil to mark the baseline spot — pen ink dissolves in the solvent and would move up the paper along with the sample, ruining the chromatogram.',
                'Measuring the substance and solvent distances from different starting points — both must be measured from the same baseline (the original spot) for the Rf calculation to be valid.',
                'Thinking a single spot on a chromatogram always proves a substance is pure with total certainty — it strongly suggests purity but different substances can occasionally travel the same distance in a given solvent; using a second solvent adds confidence.',
              ],
              examTips: [
                'Rf value calculations must give an answer between 0 and 1 with no units — if your answer is outside that range, you have likely swapped the numerator and denominator.',
                'When asked how to identify an unknown substance by chromatography, mention running known reference substances alongside it and comparing Rf values (or spot positions), not just "looking at the spots".',
              ],
              workedExamples: [
                {
                  prompt: 'A chromatogram shows the solvent front has moved 9.0 cm from the baseline. A spot from substance X has moved 3.6 cm. Calculate the Rf value of X.',
                  steps: ['Rf = distance moved by substance / distance moved by solvent.', 'Rf = 3.6 / 9.0.', 'Rf = 0.40.'],
                  answer: 'Rf = 0.40 (no units).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you calculate an Rf value?', back: 'Distance moved by the substance ÷ distance moved by the solvent front.', difficulty: 'MEDIUM' },
            { front: 'What is a locating agent used for?', back: 'To make a colourless spot on a chromatogram visible, for example by spraying with a chemical that reacts with it or exposing it to UV light.', difficulty: 'HARD' },
            { front: 'How can chromatography show that a substance is pure?', back: 'A pure substance produces only one spot on the chromatogram; a mixture produces more than one spot.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'On a chromatogram, a dye spot moves 6.4 cm from the baseline while the solvent front moves 8.0 cm. Calculate the Rf value of the dye.',
              answer: '0.80',
              markScheme: ['Rf = distance moved by substance / distance moved by solvent (1)', 'Rf = 6.4 / 8.0 = 0.80 (1)'],
              marks: 2,
              explanation: 'Rf = 6.4 ÷ 8.0 = 0.80. Both distances are measured from the baseline (the origin), and Rf has no unit since it is a ratio.',
            },
          ],
        },
        {
          number: '12.4',
          slug: 'separation-and-purification',
          title: 'Separation and purification',
          summary: 'Filtration, crystallisation, simple and fractional distillation.',
          objectives: [
            { code: '12.4.1', statement: 'Describe and explain methods of separation and purification and select the appropriate method for a given mixture.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'separation-and-purification',
              title: 'Separation and purification',
              readingMinutes: 6,
              body: `Choosing a separation method is really a diagnosis problem: look at what kind of mixture you have — solid-in-liquid, dissolved solid, or liquid-in-liquid — and the correct method follows almost automatically.
### Filtration
Separates an **insoluble solid** from a liquid. The mixture is poured through filter paper in a funnel: the solid (**residue**) is trapped, the liquid (**filtrate**) passes through.
### Crystallisation
Separates a **dissolved solid** from a solution, keeping the **solid**. The solution is gently heated to evaporate some of the solvent until it is saturated (tested by dipping a glass rod in and checking crystals form on cooling), then left to cool slowly so crystals grow. This is preferred over evaporating to dryness, which can decompose the solid or produce impure, poorly-formed crystals.
### Simple distillation
Separates a **solvent** from a solution, keeping the **liquid**. The solution is heated; the solvent evaporates, then is cooled and condensed back to a liquid in a separate container, leaving dissolved solids behind. Works because the dissolved solute does not evaporate at the solvent's boiling point.
### Fractional distillation
Separates **two or more miscible liquids** with **different boiling points** (e.g. ethanol and water, or crude oil fractions). A fractionating column allows the lower-boiling-point liquid to evaporate, rise, and be collected first, while the higher-boiling-point liquid stays behind for longer — essentially simple distillation repeated many times over as the vapour rises through the column.
### Choosing the method
The decision tree: is there an insoluble solid? → filtration. Is there a dissolved solid you want to keep? → crystallisation. Is there a solution and you want the pure solvent? → simple distillation. Are there two miscible liquids with different boiling points? → fractional distillation.`,
              analogy: 'Picking a separation method is like picking the right key for a lock: each method is shaped for one specific type of mixture (solid-in-liquid, dissolved-solid, liquid-in-liquid), and using the wrong one just won\'t separate anything cleanly.',
              misconceptions: [
                'Using simple distillation to separate two miscible liquids — simple distillation only separates one volatile substance (the solvent) from non-volatile dissolved solids; two liquids of different boiling points need fractional distillation.',
                'Evaporating a solution fully to dryness when asked to "obtain crystals" — this often decomposes the solid or gives poor crystals; the correct method is to evaporate only until saturated, then cool slowly to let crystals grow.',
              ],
              examTips: [
                'When a question gives you a mixture, first classify it (insoluble solid + liquid / dissolved solid + solvent / two miscible liquids) before naming a method — examiners often penalise a correct method with the wrong justification.',
                'For crystallisation, mention the saturation test (dipping a glass rod, checking for crystals forming on the cooled rod) as a specific technique point worth a mark.',
              ],
              workedExamples: [
                {
                  prompt: 'A student has a mixture of sand and salt dissolved in water. Describe how pure, dry salt crystals could be obtained.',
                  steps: ['Filter the mixture to remove the insoluble sand, keeping the salt solution as the filtrate.', 'Heat the filtrate gently to evaporate solvent until the solution is saturated.', 'Leave the saturated solution to cool slowly so crystals form, then filter and dry the crystals.'],
                  answer: 'Filter out the sand, then evaporate the salt solution until saturated, cool to crystallise, and filter/dry the crystals.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which method separates two miscible liquids with different boiling points?', back: 'Fractional distillation.', difficulty: 'EASY' },
            { front: 'Which method separates an insoluble solid from a liquid?', back: 'Filtration.', difficulty: 'EASY' },
            { front: 'Which method separates a dissolved solid from a solution, keeping the solid?', back: 'Crystallisation — evaporate some solvent, then cool to grow crystals.', difficulty: 'MEDIUM' },
            { front: 'Which method separates a pure solvent from a solution, keeping the liquid?', back: 'Simple distillation.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which technique would best separate ethanol from a mixture of ethanol and water (different boiling points, fully miscible)?',
              options: [
                { id: 'a', text: 'Filtration', why: 'Filtration only separates an insoluble solid from a liquid.' },
                { id: 'b', text: 'Simple distillation', why: '' },
                { id: 'c', text: 'Chromatography', why: 'Chromatography separates and identifies dissolved substances, not bulk liquid mixtures like this.' },
                { id: 'd', text: 'Crystallisation', why: 'There is no solid to crystallise here — both components are liquids.' },
              ],
              answer: 'b',
              markScheme: ['Simple distillation (1)'],
              marks: 1,
              explanation: 'Ethanol and water are miscible liquids with different boiling points (78 °C and 100 °C). Simple distillation heats the mixture and collects the vapour of the lower-boiling-point liquid first.',
            },
          ],
        },
        {
          number: '12.5',
          slug: 'identification-of-ions-and-gases',
          title: 'Identification of ions and gases',
          summary: 'Flame tests, tests for cations, anions and gases.',
          prerequisites: ['7.1'],
          objectives: [
            { code: '12.5.1', statement: 'Describe tests for common cations, anions and gases and state the observations.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'identification-of-ions-and-gases',
              title: 'Identification of ions and gases',
              readingMinutes: 7,
              body: `This subtopic is pure recall dressed up as chemistry — a fixed list of tests, reagents and observations that comes up in almost every paper. Learning it as a table pays off directly.
### Flame tests (for some metal cations)
A clean wire loop dipped in the sample and held in a blue Bunsen flame gives a characteristic colour: **lithium** — red, **sodium** — yellow, **potassium** — lilac, **calcium** — orange-red, **copper** — blue-green.
### Tests for cations with sodium hydroxide
Adding aqueous sodium hydroxide, drop by drop then in excess, to a solution gives a coloured **precipitate** that can identify the metal ion, and sometimes tells you more from how it behaves in excess:
- **Copper(II)**: blue precipitate, insoluble in excess.
- **Iron(II)**: green precipitate, insoluble in excess.
- **Iron(III)**: red-brown precipitate, insoluble in excess.
- **Aluminium**: white precipitate, **dissolves** in excess NaOH to give a colourless solution.
- **Ammonium ion** (test is different — warm with NaOH): releases ammonia gas, detected by damp red litmus turning blue.
### Tests for anions
- **Carbonate**: add dilute acid → **effervescence**, gas turns limewater cloudy (CO₂).
- **Chloride**: add dilute nitric acid then aqueous silver nitrate → **white** precipitate.
- **Sulfate**: add dilute hydrochloric acid then aqueous barium chloride → **white** precipitate. (Acid added first specifically to rule out a false-positive from carbonate ions, which would also give a white precipitate with barium chloride.)
### Tests for gases
- **Hydrogen**: lit splint → "pop".
- **Oxygen**: glowing splint → **relights**.
- **Carbon dioxide**: limewater → turns **milky/cloudy**.
- **Ammonia**: damp red litmus paper → turns **blue**.
- **Chlorine**: damp blue litmus paper → turns **red then bleaches white**.`,
              analogy: 'This whole subtopic is a "lock and key" catalogue: each ion has one specific reagent that produces one specific, recognisable observation, so the skill being tested is matching the right key (reagent) to the right lock (ion), not reasoning from first principles.',
              misconceptions: [
                'Forgetting to add dilute acid before testing for sulfate ions with barium chloride — without it, carbonate ions would also give a white precipitate and produce a false positive.',
                'Mixing up aluminium and other precipitates — aluminium hydroxide is unusual in that it is white AND dissolves in excess sodium hydroxide, unlike copper, iron(II) and iron(III) precipitates which stay insoluble in excess.',
                'Confusing the tests for ammonia (damp red litmus → blue) and chlorine (damp blue litmus → red then bleached white) — they are opposite colour changes and it is easy to swap them under exam pressure.',
              ],
              examTips: [
                'Always state both the reagent AND the exact observation (colour, precipitate/gas, and any colour change) — a reagent name alone rarely earns full marks.',
                'For carbonate vs sulfate vs chloride tests, the acid used and precipitate colour are all easy to confuse — write them as a fixed table and drill it, since these three come up constantly.',
              ],
              workedExamples: [
                {
                  prompt: 'A solution is thought to contain aluminium ions. Describe a test using sodium hydroxide that would confirm this, distinguishing aluminium from a metal like iron(III).',
                  steps: ['Add aqueous sodium hydroxide dropwise to the solution.', 'A white precipitate forms — this alone would not distinguish aluminium from some other metal ions.', 'Continue adding sodium hydroxide in excess: if the precipitate dissolves to give a colourless solution, the ion is aluminium (iron(III) gives a red-brown precipitate that stays insoluble in excess).'],
                  answer: 'Add NaOH dropwise: a white precipitate forms. Add excess NaOH: the precipitate dissolves to give a colourless solution, confirming aluminium ions (unlike iron(III), whose red-brown precipitate remains insoluble in excess).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Flame test colour for sodium?', back: 'Yellow.', difficulty: 'EASY' },
            { front: 'Flame test colour for potassium?', back: 'Lilac.', difficulty: 'MEDIUM' },
            { front: 'Test for chloride ions?', back: 'Add dilute nitric acid then aqueous silver nitrate — a white precipitate forms.', difficulty: 'MEDIUM' },
            { front: 'Test for oxygen?', back: 'A glowing splint relights.', difficulty: 'EASY' },
            { front: 'Test for ammonia gas?', back: 'Damp red litmus paper turns blue.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Describe a test to show that a solution contains sulfate ions, and give the expected observation. [2]',
              answer:
                'Add dilute hydrochloric acid, then aqueous barium chloride (or barium nitrate). A white precipitate of barium sulfate forms.',
              markScheme: [
                'Add dilute hydrochloric acid then aqueous barium chloride/nitrate (1)',
                'White precipitate (1)',
              ],
              marks: 2,
              explanation:
                'The acid is added first to remove carbonate ions, which would also give a white precipitate and produce a false positive. This step is frequently forgotten and is worth a mark.',
              hint: 'Why is acid added before the barium salt?',
            },
          ],
        },
      ],
    },
  ],
};
