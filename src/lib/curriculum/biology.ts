import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Biology 0610.
 *
 * Same contract as physics.ts and chemistry.ts: this file is the source of
 * truth, the database is seeded from it, and nothing here is presented as
 * official Cambridge wording or as a past-paper question. Objectives are
 * paraphrased from the published specification and marked TEACHER_MAPPED until
 * an administrator checks them against the real document.
 */
export const biology0610: SyllabusSeed = {
  subject: {
    code: '0610',
    slug: 'biology',
    name: 'Biology',
    tagline: 'Cells, systems, inheritance and ecosystems — from molecules to whole organisms.',
    accent: 'biology',
  },
  version: {
    code: '0610-2023-2025',
    label: 'Biology 0610 (for examination 2023-2025)',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Topic structure paraphrased from the published Cambridge IGCSE Biology 0610 specification. Not official Cambridge wording — always check the syllabus document.',
  },
  topics: [
    {
      number: '1',
      slug: 'characteristics-and-classification',
      title: 'Characteristics and classification of living organisms',
      summary: 'What makes something alive, and how living things are grouped and named.',
      subtopics: [
        {
          number: '1.1',
          slug: 'characteristics-of-living-organisms',
          title: 'Characteristics of living organisms',
          summary: 'The seven life processes shared by every living thing.',
          objectives: [
            { code: '1.1.1', statement: 'List and describe the characteristics of living organisms.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'characteristics-of-living-organisms',
              title: 'Characteristics of living organisms',
              readingMinutes: 4,
              body: `Biology begins with a deceptively hard question: what counts as alive? A crystal grows. A river moves. A flame consumes fuel and produces waste. None of them are alive, because being alive means doing **all seven** of the following, not just one.
### The seven characteristics
- **Movement** — an action causing a change of position or place.
- **Respiration** — chemical reactions that break down nutrient molecules in living cells to release energy.
- **Sensitivity** — detecting stimuli and responding to them.
- **Growth** — a permanent increase in size and dry mass.
- **Reproduction** — making more of the same kind of organism.
- **Excretion** — removal of the toxic waste products of metabolism and substances in excess.
- **Nutrition** — taking in materials for energy, growth and development.
The usual mnemonic is **MRS GREN**, taking the first letter of each.
### Why "all seven" matters
A flame moves, releases energy, and produces waste, but it does not respond to stimuli in a controlled way, does not reproduce itself, and has no nutrition in the biological sense. A car uses fuel and moves but grows not at all. The set is what defines life, not any single member of it.`,
              analogy: 'MRS GREN is a checklist, not a menu. A restaurant that only serves one dish off a seven-item set menu has not served the set menu — and a thing doing only some of these is not alive.',
              misconceptions: [
                'Thinking movement means an animal walking — plants move too, growing towards light, just far more slowly than we notice.',
                'Confusing respiration with breathing. Breathing is the physical movement of air; respiration is the chemical release of energy inside cells, and happens in plants as well as animals.',
                'Assuming excretion and egestion are the same. Excretion removes waste made *by* the body\'s reactions; egestion passes out undigested food that never entered the cells.',
              ],
              examTips: [
                'If asked to define respiration, the mark is for "chemical reactions in cells that break down nutrient molecules to release energy" — never write "breathing".',
                'Growth must be described as a permanent increase in size **and dry mass** — a plant swelling with water has not grown.',
              ],
              workedExamples: [
                {
                  prompt: 'A student claims a candle flame is alive because it moves, uses fuel, gives out energy and produces waste gases. Give two characteristics of living organisms the flame does not show.',
                  steps: ['Check each characteristic in turn against the flame.', 'A flame does not reproduce to make more flames of its own kind as an organism does.', 'A flame does not show sensitivity — it cannot detect and respond to stimuli in a controlled way. It also does not grow by permanent increase in dry mass.'],
                  answer: 'Any two of: reproduction, sensitivity, growth (permanent increase in dry mass), or nutrition in the biological sense.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does MRS GREN stand for?', back: 'Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.', difficulty: 'EASY' },
            { front: 'Define respiration.', back: 'The chemical reactions in cells that break down nutrient molecules to release energy.', difficulty: 'MEDIUM' },
            { front: 'Define excretion.', back: 'Removal of the toxic waste products of metabolism and substances in excess from the body.', difficulty: 'MEDIUM' },
            { front: 'Define growth.', back: 'A permanent increase in size and dry mass.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain the difference between excretion and egestion. [2]',
              answer:
                'Excretion is the removal of toxic waste products made by the chemical reactions of metabolism inside the body, such as carbon dioxide and urea. Egestion is the passing out of undigested food that has never been absorbed into the cells.',
              markScheme: [
                'Excretion removes waste products of metabolism / made inside cells (1)',
                'Egestion removes undigested food that was never absorbed (1)',
              ],
              marks: 2,
              explanation:
                'The distinction hinges on whether the substance was ever part of the body\'s chemistry. Urea was made by the liver, so removing it is excretion; fibre passed straight through the gut, so removing it is egestion.',
            },
          ],
        },
        {
          number: '1.2',
          slug: 'classification-and-keys',
          title: 'Classification and dichotomous keys',
          summary: 'The binomial system, the five kingdoms, and identifying organisms with a key.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '1.2.1', statement: 'Describe the binomial system of naming species and the classification hierarchy.', tier: 'CORE' },
            { code: '1.2.2', statement: 'Construct and use dichotomous keys based on observable features.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'classification-and-keys',
              title: 'Classification and dichotomous keys',
              readingMinutes: 5,
              body: `There are millions of species. Classification is the filing system that stops that being useless.
### The binomial system
Every species gets a **two-part Latin name**: the **genus** first, with a capital letter, then the **species**, in lower case. Humans are *Homo sapiens*. The name is written in italics, or underlined when handwritten.
This matters because common names are ambiguous — a "robin" is a different bird in Britain and America — while a binomial name is unique and understood worldwide.
### The hierarchy
Organisms are grouped in a nested sequence: **kingdom, phylum, class, order, family, genus, species**. Each level down is a smaller, more closely related group.
Species are grouped together because they **share features**, and modern classification takes this further: the more similar the **DNA base sequences** of two species, the more closely related they are, and the more recently they shared a common ancestor.
### Dichotomous keys
A **dichotomous key** identifies an unknown organism through a series of paired, contrasting statements — "di" meaning two. At each step you choose the option matching your specimen, which sends you to another pair or gives you a name.
A good key uses only **visible, unambiguous** features: "has six legs" works; "is large" does not, because large compared with what?`,
              analogy: 'A dichotomous key is a game of twenty questions where every question has exactly two answers, and each answer halves the number of possibilities still in play.',
              misconceptions: [
                'Writing the species name with a capital letter — only the genus is capitalised, so it is *Homo sapiens*, never *Homo Sapiens*.',
                'Thinking classification is based on outward appearance alone. Similar-looking species can be unrelated; DNA sequence comparison is the more reliable modern evidence.',
                'Using vague features in a key, such as "big" or "pretty" — a key only works if every choice is unambiguous to a stranger.',
              ],
              examTips: [
                'If asked why the binomial system is used internationally, the mark is for it giving each species one unique name that avoids the confusion of local common names.',
                'When constructing a key, use paired opposite statements and only features that can actually be seen in the picture or specimen provided.',
              ],
              workedExamples: [
                {
                  prompt: 'Two species share the same genus name. What does this tell you about how closely related they are, compared with two species in different genera?',
                  steps: ['The genus is the level immediately above species in the hierarchy.', 'Sharing a genus means they were grouped at a lower, more specific level.', 'The lower the shared level, the more features and DNA they share.'],
                  answer: 'They are more closely related — they share more features and a more recent common ancestor than two species that only share a higher grouping such as family or order.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How is a binomial name written?', back: 'Genus with a capital letter, then species in lower case, both in italics (or underlined): e.g. Homo sapiens.', difficulty: 'MEDIUM' },
            { front: 'Give the classification hierarchy in order.', back: 'Kingdom, phylum, class, order, family, genus, species.', difficulty: 'HARD' },
            { front: 'What evidence shows two species are closely related?', back: 'Similar DNA base sequences (as well as shared observable features).', difficulty: 'HARD' },
            { front: 'What is a dichotomous key?', back: 'An identification tool using a series of paired contrasting statements, each choice leading to another pair or to a name.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which of these is written correctly as a binomial name?',
              options: [
                { id: 'a', text: 'Panthera leo', why: '' },
                { id: 'b', text: 'panthera Leo', why: 'The genus must be capitalised and the species must not be.' },
                { id: 'c', text: 'Panthera Leo', why: 'The species name is never given a capital letter.' },
                { id: 'd', text: 'PANTHERA LEO', why: 'Binomial names are not written in full capitals.' },
              ],
              answer: 'a',
              markScheme: ['Panthera leo (1)'],
              marks: 1,
              explanation:
                'The convention is fixed: genus capitalised, species lower case, both italicised in print or underlined by hand. Marks are genuinely lost in exams for capitalising the species.',
            },
          ],
        },
        {
          number: '1.3',
          slug: 'features-of-organisms',
          title: 'Features of organisms',
          summary: 'The main groups of living things, and why viruses sit outside them.',
          prerequisites: ['1.2'],
          objectives: [
            { code: '1.3.1', statement: 'List the main features used to place organisms into kingdoms and groups.', tier: 'CORE' },
            { code: '1.3.2', statement: 'Describe the main groups of vertebrates, arthropods and plants.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'features-of-organisms',
              title: 'Features of organisms',
              readingMinutes: 6,
              body: `Classification groups organisms by **shared features**, and each group has a small set of defining characteristics worth learning precisely.
### The five kingdoms
- **Animals** — multicellular, no cell walls, no chloroplasts, feed on organic material.
- **Plants** — multicellular, cellulose cell walls, chloroplasts, photosynthesise.
- **Fungi** — cell walls not made of cellulose, no chloroplasts, feed by **saprophytic** or parasitic nutrition, often multinucleate.
- **Protoctists** — mostly single-celled with a nucleus; some resemble plants, some animals.
- **Prokaryotes (bacteria)** — no nucleus, DNA loose in the cytoplasm, plus plasmids; cell wall not made of cellulose.
The dividing line that matters most: **prokaryotes have no nucleus**; everything else does.
### Vertebrate groups
| Group | Key features |
|---|---|
| Fish | wet scales, gills, external fertilisation |
| Amphibians | moist permeable skin, larval stage in water |
| Reptiles | dry scaly skin, soft-shelled eggs on land |
| Birds | feathers, beak, hard-shelled eggs |
| Mammals | fur/hair, mammary glands, external ear |
### Arthropods
All have a **hard exoskeleton** and **jointed legs**. The four groups are told apart by leg count and body sections: **insects** (6 legs, 3 body parts, usually wings), **arachnids** (8 legs, 2 body parts), **crustaceans** (many legs, chalky exoskeleton), **myriapods** (many segments, one or two pairs of legs each).
### Viruses
Viruses are **not placed in any kingdom** and are not usually considered living. They have no cell structure — just genetic material in a protein coat — and can only reproduce **inside a host cell**. Applying MRS GREN shows why: they carry out none of the seven processes independently.`,
              analogy: 'Classification groups are nested boxes with a label on each: "has a backbone", "has fur". Viruses are the object that fits in none of the boxes, which is precisely why biologists set them aside rather than forcing them in.',
              misconceptions: [
                'Placing viruses in a kingdom. They are excluded because they have no cell structure and cannot carry out life processes alone.',
                'Thinking fungi are plants. Fungi have no chloroplasts and do not photosynthesise — they feed on organic material.',
                'Confusing arachnids with insects. Spiders have 8 legs and 2 body sections, not 6 and 3.',
              ],
              examTips: [
                'For "which kingdom" questions, quote the decisive feature — presence of a nucleus, cell wall composition, or chloroplasts.',
                'When asked why viruses are not classed as living, refer to MRS GREN: they cannot respire, grow or reproduce independently.',
              ],
              workedExamples: [
                {
                  prompt: 'An organism is multicellular, has cell walls that are not cellulose, and feeds on dead organic matter. Which kingdom is it in, and why?',
                  steps: ['Cell walls are present, so it is not an animal.', 'The walls are not cellulose and there are no chloroplasts, so it is not a plant.', 'Feeding on dead organic material is saprophytic nutrition, characteristic of fungi.'],
                  answer: 'The fungi kingdom — it has non-cellulose cell walls, no chloroplasts, and feeds saprophytically.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What defines a prokaryote?', back: 'It has no nucleus — its DNA lies loose in the cytoplasm, along with plasmids.', difficulty: 'MEDIUM' },
            { front: 'Give two features of fungi.', back: 'Cell walls not made of cellulose, no chloroplasts, and saprophytic or parasitic nutrition.', difficulty: 'MEDIUM' },
            { front: 'How do you tell an arachnid from an insect?', back: 'Arachnids have 8 legs and 2 body sections; insects have 6 legs and 3 body sections.', difficulty: 'MEDIUM' },
            { front: 'Why are viruses not classed as living?', back: 'They have no cell structure and cannot carry out life processes or reproduce outside a host cell.', difficulty: 'HARD' },
            { front: 'Which vertebrate group has moist permeable skin?', back: 'Amphibians.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why viruses are not placed in any of the five kingdoms. [2]',
              answer:
                'Viruses have no cellular structure — they consist only of genetic material surrounded by a protein coat, with no cytoplasm, membrane-bound organelles or nucleus. They also cannot carry out the characteristics of living organisms independently, since they can only reproduce inside a host cell.',
              markScheme: [
                'They have no cell structure / are not made of cells (1)',
                'They cannot reproduce or carry out life processes except inside a host cell (1)',
              ],
              marks: 2,
              explanation:
                'Classification into kingdoms assumes a cellular organism. Since viruses fail that basic condition, they are treated as a separate category outside the system.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'organisation-of-the-organism',
      title: 'Organisation of the organism',
      summary: 'Cell structure, specialised cells, and the levels of organisation from cell to organism.',
      subtopics: [
        {
          number: '2.1',
          slug: 'cell-structure',
          title: 'Cell structure and organelles',
          summary: 'Animal and plant cell structures and what each one does.',
          objectives: [
            { code: '2.1.1', statement: 'Describe and compare the structure of animal and plant cells.', tier: 'CORE' },
            { code: '2.1.2', statement: 'State the functions of the main cell structures.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'cell-structure',
              title: 'Cell structure and organelles',
              readingMinutes: 6,
              body: `Every living thing is built from cells. The differences between an animal cell and a plant cell explain much of the difference between animals and plants.
### Structures in both animal and plant cells
- **Cell membrane** — a partially permeable barrier controlling what enters and leaves.
- **Cytoplasm** — the jelly-like medium where most chemical reactions happen.
- **Nucleus** — contains the DNA, controlling the cell's activities and inheritance.
- **Mitochondria** — the site of aerobic respiration, releasing energy. Cells that need a lot of energy, such as muscle cells, contain many of them.
- **Ribosomes** — where proteins are made.
### Extra structures found only in plant cells
- **Cell wall** made of **cellulose** — rigid, freely permeable, and gives the cell its shape and support. Note it is *not* the same as the membrane, and it does not control what enters.
- **Chloroplasts** — contain chlorophyll and are the site of photosynthesis. Root cells have none, because there is no light underground.
- **Permanent vacuole** — a large sac of cell sap that pushes outwards, keeping the cell firm.
### Why the differences matter
A plant cannot move to find food, so it makes its own by photosynthesis (chloroplasts) and needs to hold itself upright without a skeleton (cell wall and vacuole). An animal moves to find food, so it needs flexibility rather than rigidity.`,
              analogy: 'A plant cell is a water balloon inside a cardboard box: the vacuole pushes outwards, the rigid wall resists, and the tension between them is what keeps a stem standing up.',
              misconceptions: [
                'Saying the cell wall controls what enters the cell — it is freely permeable and structural; the partially permeable *membrane* does the controlling.',
                'Thinking all plant cells have chloroplasts. Root cells do not, because they receive no light.',
                'Believing animal cells have small vacuoles "like plants". Animal cells may have small temporary vacuoles, but not the large permanent sap-filled one.',
              ],
              examTips: [
                'When asked to compare animal and plant cells, name the three plant-only structures — cell wall, chloroplasts, permanent vacuole — and give a function, not just the name.',
                'Link organelle number to cell function: "many mitochondria because it needs a lot of energy for..." earns the mark that simply naming mitochondria does not.',
              ],
              workedExamples: [
                {
                  prompt: 'A muscle cell contains far more mitochondria than a fat storage cell. Explain why.',
                  steps: ['Mitochondria are the site of aerobic respiration, which releases energy.', 'Muscle cells contract, which requires a great deal of energy.', 'More mitochondria means more respiration and so more energy released per second.'],
                  answer: 'Muscle cells need a lot of energy for contraction, and mitochondria are where aerobic respiration releases that energy, so more mitochondria are needed.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which three structures are in plant cells but not animal cells?', back: 'Cellulose cell wall, chloroplasts, and a large permanent vacuole.', difficulty: 'EASY' },
            { front: 'Function of the cell membrane?', back: 'A partially permeable barrier that controls which substances enter and leave the cell.', difficulty: 'MEDIUM' },
            { front: 'Function of mitochondria?', back: 'Site of aerobic respiration, releasing energy from nutrient molecules.', difficulty: 'MEDIUM' },
            { front: 'Why do root hair cells have no chloroplasts?', back: 'They are underground and receive no light, so photosynthesis is impossible there.', difficulty: 'HARD' },
            { front: 'Function of ribosomes?', back: 'Protein synthesis.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'State one structural difference between a plant cell and an animal cell, and explain how it is related to the way plants live. [2]',
              answer:
                'A plant cell has chloroplasts and an animal cell does not. Chloroplasts contain chlorophyll and are the site of photosynthesis, which plants need because they make their own food rather than moving to find it.',
              markScheme: [
                'Names a valid plant-only structure — cell wall, chloroplast or permanent vacuole (1)',
                'Links it correctly to plant life, e.g. chloroplasts for photosynthesis / cell wall for support without a skeleton (1)',
              ],
              marks: 2,
              explanation:
                'The second mark is for the link, not the name. A list of differences with no explanation scores only the first mark.',
            },
          ],
        },
        {
          number: '2.2',
          slug: 'levels-of-organisation',
          title: 'Levels of organisation and specialised cells',
          summary: 'From specialised cells to tissues, organs, systems and organisms.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.2.1', statement: 'Relate the structure of specialised cells to their functions.', tier: 'CORE' },
            { code: '2.2.2', statement: 'Describe the levels of organisation: cell, tissue, organ, organ system, organism.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'levels-of-organisation',
              title: 'Levels of organisation and specialised cells',
              readingMinutes: 5,
              body: `A single cell can only do so much. Multicellular organisms work by **division of labour**: cells specialise, then cooperate.
### The levels
**Cell → tissue → organ → organ system → organism.**
- A **tissue** is a group of cells with similar structure working together on one function, such as muscle tissue.
- An **organ** is several tissues working together, such as the stomach — muscle, glandular and epithelial tissue combined.
- An **organ system** is several organs working together, such as the digestive system.
### Specialised cells and their adaptations
Structure follows function in every case:
- **Root hair cell** — a long, thin extension gives a very large surface area for absorbing water and mineral ions.
- **Red blood cell** — a biconcave disc with no nucleus, giving more room for haemoglobin and a large surface area for taking up oxygen.
- **Nerve cell (neurone)** — very long, so it can carry electrical impulses over long distances quickly.
- **Ciliated cell** — hair-like cilia that beat to sweep mucus and trapped dust away from the lungs.
- **Sperm cell** — a tail for swimming and many mitochondria to power the journey.
- **Palisade mesophyll cell** — packed with chloroplasts and near the top of the leaf to catch the most light.
### The pattern to notice
In every one of these, the exam answer has the same shape: name the feature, then say what it *achieves*. "It is long" earns nothing; "it is long so it can transmit impulses from one part of the body to another" earns the mark.`,
              analogy: 'Specialised cells are trades on a building site. One person could slowly build a whole house alone, but a bricklayer, electrician and plumber working together build it far better — provided they cooperate.',
              misconceptions: [
                'Thinking an organ is just a big tissue. An organ contains *several different* tissues working together.',
                'Assuming red blood cells are "empty". They lack a nucleus, but they are full of haemoglobin — that is the point of losing the nucleus.',
                'Describing an adaptation without its purpose. Exam marks are almost always for the consequence, not the feature.',
              ],
              examTips: [
                'Answer adaptation questions in the form "feature — so that — function". This single sentence pattern reliably picks up both marks.',
                'Learn one example organism at each level so you can illustrate the hierarchy instantly: e.g. muscle cell → muscle tissue → heart → circulatory system → human.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain two ways a root hair cell is adapted for absorbing water.',
                  steps: ['It has a long, narrow extension, which greatly increases the surface area in contact with soil water.', 'A larger surface area means a faster rate of osmosis into the cell.', 'It also has no chloroplasts and a thin cell wall, reducing the distance water must travel.'],
                  answer: 'The long hair-like projection gives a large surface area so water is absorbed faster by osmosis, and the thin wall gives a short diffusion distance.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the levels of organisation in order.', back: 'Cell → tissue → organ → organ system → organism.', difficulty: 'MEDIUM' },
            { front: 'Define a tissue.', back: 'A group of cells with similar structure working together to perform a shared function.', difficulty: 'MEDIUM' },
            { front: 'How is a red blood cell adapted to its function?', back: 'Biconcave shape for a large surface area, and no nucleus so it holds more haemoglobin to carry oxygen.', difficulty: 'HARD' },
            { front: 'How is a ciliated cell adapted?', back: 'It has cilia that beat to move mucus and trapped particles away from the lungs.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A sperm cell has a tail and many mitochondria. Explain how each feature helps it carry out its function. [2]',
              answer:
                'The tail allows the sperm to swim towards the egg. The many mitochondria carry out aerobic respiration to release the energy needed for that swimming.',
              markScheme: [
                'Tail enables movement / swimming towards the egg (1)',
                'Mitochondria release energy by respiration to power the movement (1)',
              ],
              marks: 2,
              explanation:
                'Both marks depend on stating the purpose. "It has a tail and mitochondria" simply restates the question and earns nothing.',
            },
          ],
        },
        {
          number: '2.3',
          slug: 'size-of-specimens',
          title: 'Size of specimens and magnification',
          summary: 'Calculating magnification and actual size, and converting units.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.3.1', statement: 'Calculate magnification and actual size of biological specimens.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'size-of-specimens',
              title: 'Size of specimens and magnification',
              readingMinutes: 4,
              body: `Cells are measured in units far smaller than everyday ones, and most marks lost here are unit-conversion errors rather than biology.
### The formula
\`magnification = image size ÷ actual size\`
Rearranged as needed:
- \`actual size = image size ÷ magnification\`
- \`image size = actual size × magnification\`
A memory triangle helps: image size on top, actual size and magnification underneath.
### Units
- 1 mm = **1000 µm** (micrometres)
- 1 µm = **1000 nm** (nanometres)
- 1 m = 1000 mm
Cells are usually measured in **micrometres**. A typical animal cell is around 20 µm across, a bacterium about 1-5 µm.
### The method that avoids errors
1. Measure the image with a ruler, in **mm**.
2. **Convert both measurements to the same unit** before dividing — this is the step people skip.
3. Divide.
Magnification has **no units**, because it is a ratio of two lengths. If your answer has units, something has gone wrong.
### Drawing scale
For a scale drawing, the same formula applies. If asked to state the magnification of your own drawing, measure a feature on the drawing and divide by the real size of that feature.`,
              analogy: 'Magnification is the zoom factor on a map. Saying "×400" is like "1 cm represents 25 m" — a pure ratio, which is exactly why it carries no units.',
              misconceptions: [
                'Dividing without converting units first, e.g. mixing mm and µm, which shifts the answer by a factor of 1000.',
                'Giving magnification a unit. It is a ratio and is dimensionless.',
                'Inverting the formula — magnification is image ÷ actual, not actual ÷ image.',
              ],
              examTips: [
                'Write both measurements in micrometres before dividing; the conversion step is where nearly all errors occur.',
                'Sense-check the answer: a magnified image should be larger than the real object, so magnification should exceed 1.',
              ],
              workedExamples: [
                {
                  prompt: 'A cell appears 40 mm wide in a photograph taken at ×2000 magnification. Calculate its actual width in micrometres.',
                  steps: ['actual size = image size ÷ magnification.', 'Convert the image size to micrometres first: 40 mm = 40 × 1000 = 40 000 µm.', 'actual size = 40 000 ÷ 2000 = 20 µm.'],
                  answer: '20 µm',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the magnification formula.', back: 'magnification = image size ÷ actual size', difficulty: 'EASY' },
            { front: 'How many micrometres are in 1 mm?', back: '1000 µm', difficulty: 'MEDIUM' },
            { front: 'Does magnification have units?', back: 'No — it is a ratio of two lengths, so it is dimensionless.', difficulty: 'MEDIUM' },
            { front: 'How do you find actual size?', back: 'Actual size = image size ÷ magnification.', difficulty: 'MEDIUM' },
            { front: 'What is the typical width of an animal cell?', back: 'About 20 µm.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A structure is 5 µm wide in reality and appears 15 mm wide in a drawing. Calculate the magnification of the drawing.',
              answer: '3000',
              markScheme: [
                'Converts to the same units: 15 mm = 15 000 µm (1)',
                'Uses magnification = image ÷ actual (1)',
                'Answer ×3000 (1)',
              ],
              marks: 3,
              explanation:
                '15 000 ÷ 5 = 3000. Dividing 15 by 5 without converting gives 3, which is out by a factor of 1000 — the classic error this question targets.',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'movement-into-and-out-of-cells',
      title: 'Movement into and out of cells',
      summary: 'Diffusion, osmosis and active transport.',
      subtopics: [
        {
          number: '3.1',
          slug: 'diffusion-and-osmosis',
          title: 'Diffusion and osmosis',
          summary: 'Passive movement down a concentration gradient, and the special case of water.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '3.1.1', statement: 'Define diffusion and describe its importance in living organisms.', tier: 'CORE' },
            { code: '3.1.2', statement: 'Define osmosis and describe the effects of osmosis on plant and animal cells.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'diffusion-and-osmosis',
              title: 'Diffusion and osmosis',
              readingMinutes: 6,
              body: `Substances must get in and out of cells. Two of the three ways cost the cell nothing at all.
### Diffusion
**Diffusion** is the net movement of particles from a region of **higher concentration to lower concentration**, down a concentration gradient, as a result of their random movement. It is **passive** — no energy from respiration is required.
Diffusion supplies oxygen to respiring cells and removes carbon dioxide from them. It is faster when the concentration gradient is steeper, the temperature is higher, the surface area is larger, or the distance is shorter.
### Osmosis
**Osmosis** is the net movement of **water molecules** from a region of **higher water potential** (a dilute solution) to a region of **lower water potential** (a concentrated solution), through a **partially permeable membrane**.
It is really just diffusion of water, but the membrane matters: it lets water through and holds the dissolved solute back, so only the water can move to even things out.
### Effects on cells
In a **dilute** solution, water enters:
- A **plant cell** swells, the vacuole pushes the membrane against the rigid cell wall, and the cell becomes **turgid**. The wall stops it bursting, and turgor is what holds a non-woody plant upright.
- An **animal cell** has no wall, keeps swelling and can **burst (lyse)**.
In a **concentrated** solution, water leaves:
- A plant cell becomes **flaccid**, then **plasmolysed** as the membrane pulls away from the wall. The plant wilts.
- An animal cell shrinks and **crenates**.`,
              analogy: 'Osmosis is a crowd squeezing through a turnstile that only people without luggage can pass. The people (water) redistribute freely; the luggage (solute) stays where it is, so the balancing happens entirely by people moving.',
              misconceptions: [
                'Saying osmosis is the movement of water "from high to low concentration" without saying *water* concentration or water potential — solute concentration runs the opposite way, so the sloppy version is exactly backwards.',
                'Forgetting the phrase "partially permeable membrane" in the definition of osmosis, which is a required marking point.',
                'Thinking plant cells burst in pure water. The cellulose cell wall resists the pressure — only animal cells lyse.',
              ],
              examTips: [
                'Definitions here are marked almost word for word. Learn "net movement", "down a concentration gradient" and "partially permeable membrane" as fixed phrases.',
                'For any osmosis question, state which side has the higher *water* potential first — it makes the direction of movement obvious and prevents the classic reversal error.',
              ],
              workedExamples: [
                {
                  prompt: 'A piece of potato is left in concentrated sugar solution for an hour. Predict what happens to its mass and explain why.',
                  steps: ['The sugar solution has a lower water potential than the potato cells.', 'Water therefore moves out of the cells by osmosis through their partially permeable membranes.', 'Losing water means losing mass, and the cells become flaccid or plasmolysed.'],
                  answer: 'The mass decreases, because water leaves the potato cells by osmosis into the more concentrated solution.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define diffusion.', back: 'The net movement of particles from a region of higher concentration to lower concentration, down a concentration gradient, due to random movement.', difficulty: 'MEDIUM' },
            { front: 'Define osmosis.', back: 'The net movement of water molecules from a region of higher water potential to lower water potential through a partially permeable membrane.', difficulty: 'HARD' },
            { front: 'What happens to an animal cell in pure water?', back: 'Water enters by osmosis, the cell swells and may burst (lyse), as there is no cell wall to resist.', difficulty: 'HARD' },
            { front: 'What does turgid mean?', back: 'A plant cell is full of water, with the vacuole pushing the membrane firmly against the cell wall.', difficulty: 'MEDIUM' },
            { front: 'Name four factors that increase the rate of diffusion.', back: 'Steeper concentration gradient, higher temperature, larger surface area, shorter distance.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A plant cell is placed in a solution with a lower water potential than its cytoplasm. What happens?',
              options: [
                { id: 'a', text: 'Water leaves the cell and it becomes flaccid or plasmolysed.', why: '' },
                { id: 'b', text: 'Water enters the cell and it becomes turgid.', why: 'Water moves towards lower water potential, which here is outside the cell.' },
                { id: 'c', text: 'The cell bursts.', why: 'Plant cells do not burst — the cellulose cell wall resists the pressure.' },
                { id: 'd', text: 'Nothing happens, as the cell wall blocks water.', why: 'The cell wall is freely permeable; water passes through it easily.' },
              ],
              answer: 'a',
              markScheme: ['Water leaves the cell by osmosis; it becomes flaccid/plasmolysed (1)'],
              marks: 1,
              explanation:
                'Water always moves towards the lower water potential. Here that is the external solution, so water leaves, the vacuole shrinks, and the cell loses turgor.',
            },
          ],
        },
        {
          number: '3.2',
          slug: 'active-transport',
          title: 'Active transport',
          summary: 'Moving substances against a concentration gradient using energy.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '3.2.1', statement: 'Define active transport and explain its importance, including ion uptake by root hairs.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'active-transport',
              title: 'Active transport',
              readingMinutes: 4,
              body: `Diffusion and osmosis only ever move substances **down** a gradient. But cells often need the opposite — to hoard something that is already scarce outside and plentiful inside.
### The definition
**Active transport** is the movement of particles **through a cell membrane from a region of lower concentration to a region of higher concentration** — that is, *against* a concentration gradient — using **energy from respiration** and **carrier proteins** in the membrane.
Three things distinguish it from diffusion: the direction is against the gradient, it requires energy, and it needs specific protein carriers.
### Why organisms need it
**Root hair cells** absorb mineral ions such as nitrate from the soil, where the concentration is very low, into the cell where it is already higher. Diffusion cannot do this, so the root hair cell uses active transport — and this is exactly why root cells contain many mitochondria.
The same applies to glucose absorption in the small intestine, ensuring none is wasted even when the concentration in the gut falls below that in the blood.
### The consequence of needing energy
Because active transport depends on respiration, anything that stops respiration stops it. A plant in **waterlogged soil** cannot get oxygen to its roots, aerobic respiration slows, less energy is available, and mineral ion uptake falls — so the plant becomes deficient even though the minerals are present.`,
              analogy: 'Diffusion is water flowing downhill on its own; active transport is pumping water uphill. The pump needs a power supply, and if you cut the power the water stops moving — no matter how much water there is.',
              misconceptions: [
                'Thinking active transport is just "fast diffusion". The defining feature is direction — against the gradient — not speed.',
                'Forgetting to mention carrier proteins, which is usually a separate marking point from the energy requirement.',
                'Not connecting it to respiration. Questions about waterlogged soil or a respiratory inhibitor are really testing whether you know active transport needs energy from respiration.',
              ],
              examTips: [
                'A full-mark definition needs three elements: against the concentration gradient, using energy from respiration, via carrier proteins in the membrane.',
                'If a question mentions cyanide, lack of oxygen, or low temperature reducing uptake, the expected answer is that respiration is reduced, so less energy is available for active transport.',
              ],
              workedExamples: [
                {
                  prompt: 'Root hair cells contain many mitochondria. Explain how this relates to mineral ion uptake.',
                  steps: ['Mineral ions in soil are at a lower concentration than inside the root hair cell.', 'They must therefore be absorbed by active transport, against the concentration gradient.', 'Active transport requires energy released by aerobic respiration, which occurs in mitochondria.'],
                  answer: 'Mineral ions are absorbed by active transport against a concentration gradient, which needs energy from aerobic respiration — so many mitochondria are present to supply it.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define active transport.', back: 'Movement of particles through a membrane against a concentration gradient, using energy from respiration and carrier proteins.', difficulty: 'HARD' },
            { front: 'Give one example of active transport in plants.', back: 'Uptake of mineral ions such as nitrate by root hair cells from dilute soil solution.', difficulty: 'MEDIUM' },
            { front: 'Why does waterlogged soil reduce mineral uptake?', back: 'Roots lack oxygen, so aerobic respiration slows, less energy is available for active transport.', difficulty: 'HARD' },
            { front: 'Name the three differences between active transport and diffusion.', back: 'Against the gradient (not down it), requires energy, and requires carrier proteins.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A plant is treated with a chemical that stops aerobic respiration. Explain the effect this has on the uptake of mineral ions by its roots. [3]',
              answer:
                'Mineral ions are taken up by active transport, which moves them against a concentration gradient from the dilute soil solution into the root hair cell. Active transport requires energy released by aerobic respiration. If respiration is stopped, no energy is available, so the carrier proteins cannot move the ions and mineral uptake stops or falls sharply.',
              markScheme: [
                'Mineral ions are absorbed by active transport, against the concentration gradient (1)',
                'Active transport requires energy from aerobic respiration (1)',
                'Without respiration there is no energy, so uptake stops or is greatly reduced (1)',
              ],
              marks: 3,
              explanation:
                'Note that water uptake would continue, because osmosis is passive. Questions often test whether you realise only the active process is affected.',
              hint: 'Which type of transport needs energy, and where does that energy come from?',
            },
          ],
        },
      ],
    },
    {
      number: '4',
      slug: 'biological-molecules',
      title: 'Biological molecules',
      summary: 'Carbohydrates, proteins and fats, and the food tests that identify them.',
      subtopics: [
        {
          number: '4.1',
          slug: 'biological-molecules-and-food-tests',
          title: 'Biological molecules and food tests',
          summary: 'The elements and units that build carbohydrates, proteins and fats, and how to test for each.',
          objectives: [
            { code: '4.1.1', statement: 'State the elements present in carbohydrates, fats and proteins and their smaller basic units.', tier: 'CORE' },
            { code: '4.1.2', statement: 'Describe the food tests for starch, reducing sugars, protein, fats and vitamin C.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'biological-molecules-and-food-tests',
              title: 'Biological molecules and food tests',
              readingMinutes: 5,
              body: `Three groups of large molecules make up most of what you eat and most of what you are.
### Elements and building blocks
| Molecule | Elements | Built from |
|---|---|---|
| Carbohydrate | C, H, O | simple sugars such as glucose |
| Fat (lipid) | C, H, O | fatty acids and glycerol |
| Protein | C, H, O, **N** (sometimes S) | amino acids |
The one to remember is **nitrogen**: it appears in proteins and not in carbohydrates or fats. This is why plants need nitrate ions to make protein, and why a nitrogen-deficient plant grows poorly.
Large carbohydrates are built by joining simple sugars: **starch** and **glycogen** are storage molecules, **cellulose** builds plant cell walls.
### The food tests
Each has a reagent, a condition, and a colour change. All four are common exam questions:
- **Starch** — add **iodine solution**. Brown-orange → **blue-black**.
- **Reducing sugar** — add **Benedict's solution and heat** in a water bath. Blue → green → yellow → **brick red** (the further it goes, the more sugar).
- **Protein** — add **biuret solution**. Blue → **purple/violet**.
- **Fat** — the **ethanol emulsion test**: dissolve in ethanol, then add water. A **white/cloudy emulsion** forms.
- **Vitamin C** — add the food to **DCPIP**; the blue dye is **decolourised**.`,
              analogy: 'The food tests are four different keys for four different locks. Using Benedict\'s on a protein tells you nothing at all — it is not a general "food detector", each reagent answers exactly one question.',
              misconceptions: [
                'Forgetting that Benedict\'s test requires heating. Without a hot water bath there is no colour change and the answer scores nothing.',
                'Saying the biuret test goes "blue to black" — it is blue to purple/violet.',
                'Thinking all sugars give a positive Benedict\'s result. Sucrose is a non-reducing sugar and gives no change without prior acid hydrolysis.',
              ],
              examTips: [
                'Always give the starting colour as well as the final colour. "Turns blue-black" is safer than "turns black", and many mark schemes require the change, not just the end point.',
                'For Benedict\'s, mentioning that the final colour indicates *how much* sugar is present often picks up an extra mark in a quantitative question.',
              ],
              workedExamples: [
                {
                  prompt: 'A student tests a food sample. Iodine gives no colour change, Benedict\'s gives a brick-red precipitate, and biuret turns purple. What does the sample contain?',
                  steps: ['No colour change with iodine means no starch present.', 'Brick-red with Benedict\'s means reducing sugar is present, in a high concentration.', 'Purple with biuret means protein is present.'],
                  answer: 'The sample contains reducing sugar and protein, but no starch.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which element is in proteins but not carbohydrates or fats?', back: 'Nitrogen (and sometimes sulfur).', difficulty: 'MEDIUM' },
            { front: 'Test for starch?', back: 'Add iodine solution — brown-orange turns blue-black.', difficulty: 'EASY' },
            { front: 'Test for reducing sugar?', back: 'Add Benedict\'s solution and heat — blue turns green/yellow/brick-red.', difficulty: 'MEDIUM' },
            { front: 'Test for protein?', back: 'Add biuret solution — blue turns purple/violet.', difficulty: 'MEDIUM' },
            { front: 'Test for fats?', back: 'Ethanol emulsion test — dissolve in ethanol then add water; a cloudy white emulsion forms.', difficulty: 'HARD' },
            { front: 'What are proteins built from?', back: 'Amino acids.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Describe how you would test a food sample for protein, giving the reagent and the expected positive result. [2]',
              answer:
                'Add biuret solution to the food sample. If protein is present the solution changes from blue to purple or violet.',
              markScheme: ['Add biuret solution (1)', 'Blue changes to purple/violet (1)'],
              marks: 2,
              explanation:
                'Giving both the reagent and the full colour change is what earns both marks. Naming the reagent alone is a single mark at best.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'enzymes',
      title: 'Enzymes',
      summary: 'Biological catalysts, the lock-and-key model, and the effects of temperature and pH.',
      subtopics: [
        {
          number: '5.1',
          slug: 'enzyme-action',
          title: 'Enzyme action and factors affecting it',
          summary: 'How enzymes work, and why temperature and pH change their rate.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '5.1.1', statement: 'Describe enzymes as proteins that function as biological catalysts, using the lock-and-key model.', tier: 'CORE' },
            { code: '5.1.2', statement: 'Explain the effects of temperature and pH on enzyme activity, including denaturation.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'enzyme-action',
              title: 'Enzyme action and factors affecting it',
              readingMinutes: 6,
              body: `Chemical reactions in cells would be far too slow at body temperature without help. Enzymes provide it.
### What an enzyme is
An **enzyme** is a **protein** that acts as a **biological catalyst**: it speeds up a chemical reaction without being changed or used up, so one enzyme molecule works over and over.
### The lock-and-key model
Each enzyme has an **active site** with a specific shape. Only a **substrate** with a complementary shape fits into it, forming an enzyme-substrate complex. The reaction happens, products leave, and the active site is free again.
This is why enzymes are **specific** — amylase breaks down starch and nothing else, because only starch fits its active site.
### Temperature
As temperature rises, molecules move faster, collide more often, and the rate increases — up to the **optimum**, around 37 °C in humans.
Above the optimum the rate falls **sharply**, because the heat breaks the bonds holding the protein in shape. The **active site changes shape**, the substrate no longer fits, and the enzyme is **denatured**. This is permanent — cooling it down does not restore activity.
### pH
Each enzyme has an optimum pH. Pepsin in the stomach works best at about pH 2; amylase in the mouth at about pH 7. Move too far either side of the optimum and the active site is again distorted and the enzyme denatures.`,
              analogy: 'The active site is a keyhole and the substrate is the key. Denaturing is not losing the key — it is melting the lock, so that no amount of trying will make the key fit again.',
              misconceptions: [
                'Saying an enzyme is "killed" by heat. Enzymes are molecules, not organisms — the correct word is **denatured**.',
                'Thinking denaturation is reversible. Once the active site\'s shape is lost, cooling does not bring the activity back.',
                'Claiming the rate rises steadily then stops. Beyond the optimum, the rate falls, and it falls quickly.',
              ],
              examTips: [
                'When explaining why rate falls above the optimum, you must mention that the **active site changes shape** so the substrate no longer fits — "the enzyme is denatured" alone is often only one of two marks.',
                'For low temperature, do not say denatured. The enzyme is simply working slowly because there is less kinetic energy and fewer successful collisions; it recovers on warming.',
              ],
              workedExamples: [
                {
                  prompt: 'A reaction catalysed by an enzyme is fastest at 40 °C. Explain why the rate is lower at 20 °C and also lower at 60 °C.',
                  steps: ['At 20 °C molecules have less kinetic energy, so there are fewer collisions between enzyme and substrate per second — the enzyme is not damaged.', 'At 60 °C the enzyme has been denatured: the bonds holding its shape break.', 'The active site changes shape, the substrate can no longer bind, so few or no enzyme-substrate complexes form.'],
                  answer: 'At 20 °C the rate is low because of fewer successful collisions (reversible). At 60 °C the enzyme is denatured — the active site has changed shape so substrate no longer fits (permanent).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is an enzyme?', back: 'A protein that acts as a biological catalyst, speeding up a reaction without being used up.', difficulty: 'MEDIUM' },
            { front: 'What is the active site?', back: 'The region of the enzyme with a specific shape into which only a complementary substrate fits.', difficulty: 'MEDIUM' },
            { front: 'What does denatured mean?', back: 'The enzyme\'s shape has been permanently changed so the active site no longer fits the substrate.', difficulty: 'HARD' },
            { front: 'Why are enzymes specific?', back: 'Only a substrate with a shape complementary to the active site can bind to it.', difficulty: 'MEDIUM' },
            { front: 'Optimum pH of pepsin?', back: 'About pH 2, matching the acidic conditions in the stomach.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain why the rate of an enzyme-controlled reaction decreases when the temperature rises above the optimum. [3]',
              answer:
                'Above the optimum temperature the extra heat energy breaks the bonds holding the enzyme in its three-dimensional shape. The active site therefore changes shape, so the substrate no longer fits and enzyme-substrate complexes cannot form. The enzyme is denatured and the change is permanent, so the rate falls sharply.',
              markScheme: [
                'Heat breaks the bonds holding the enzyme\'s shape (1)',
                'The active site changes shape so the substrate no longer fits (1)',
                'The enzyme is denatured / fewer enzyme-substrate complexes form, so rate falls (1)',
              ],
              marks: 3,
              explanation:
                'The middle marking point is the one most often missed. Examiners want the causal chain — heat, then shape change of the active site, then no binding.',
              hint: 'What physically happens to the shape of the enzyme, and what does that stop?',
            },
          ],
        },
      ],
    },
    {
      number: '6',
      slug: 'plant-nutrition',
      title: 'Plant nutrition',
      summary: 'Photosynthesis, limiting factors and leaf structure.',
      subtopics: [
        {
          number: '6.1',
          slug: 'photosynthesis',
          title: 'Photosynthesis and limiting factors',
          summary: 'How plants make food, and what restricts the rate.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '6.1.1', statement: 'State the word and balanced symbol equation for photosynthesis and describe the process.', tier: 'CORE' },
            { code: '6.1.2', statement: 'Investigate and explain the effects of light intensity, carbon dioxide concentration and temperature as limiting factors.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'photosynthesis',
              title: 'Photosynthesis and limiting factors',
              readingMinutes: 6,
              body: `Photosynthesis is the process that puts almost all the energy into the living world.
### The reaction
**Word equation:** carbon dioxide + water → glucose + oxygen, in the presence of light and chlorophyll.
**Symbol equation:** \`6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\`
**Chlorophyll**, the green pigment in chloroplasts, absorbs light energy and transfers it to chemical energy in glucose. Note that chlorophyll is *not* a reactant — it is not used up, which is why it does not appear in the equation.
### What the plant does with the glucose
It is used for respiration, converted to **starch** for storage (insoluble, so it does not affect osmosis), converted to **cellulose** for cell walls, and — combined with **nitrate ions** absorbed from the soil — used to make **amino acids and proteins**.
### Limiting factors
A **limiting factor** is the factor in shortest supply, which alone determines the rate: increasing any other factor has no effect until the limiting one is raised.
- **Light intensity** — rate rises as light increases, then levels off when something else becomes limiting.
- **Carbon dioxide concentration** — usually the limiting factor for crops on a warm, bright day, which is why glasshouse growers add CO₂.
- **Temperature** — photosynthesis is enzyme-controlled, so the rate rises to an optimum then falls sharply as enzymes denature.
Reading a graph: while the line is rising, the factor on the x-axis is limiting. Where it plateaus, something else has become the limit.`,
              analogy: 'Limiting factors work like a production line: if you have one packer, hiring ten more box-makers changes nothing. Only adding packers speeds things up — until packers stop being the bottleneck and something else does.',
              misconceptions: [
                'Thinking plants respire only at night. Plants respire continuously, day and night; in daylight photosynthesis simply outpaces it.',
                'Writing chlorophyll into the equation as a reactant. It is a catalyst-like pigment, written above the arrow at most.',
                'Assuming a plateau on a light-intensity graph means light is limiting. A plateau means light is *no longer* limiting — something else now is.',
              ],
              examTips: [
                'When a graph levels off, name a specific alternative limiting factor — usually carbon dioxide concentration or temperature — rather than saying "something else".',
                'Remember why glucose is stored as starch: it is insoluble, so it has no osmotic effect on the cell.',
              ],
              workedExamples: [
                {
                  prompt: 'A graph shows the rate of photosynthesis rising with light intensity, then levelling off. Explain the shape of the graph.',
                  steps: ['On the rising part, light intensity is the limiting factor — more light means more energy for the reaction.', 'At the plateau, further light makes no difference, so light is no longer limiting.', 'Another factor, such as carbon dioxide concentration or temperature, has become the limiting factor.'],
                  answer: 'Initially light is the limiting factor so rate increases with intensity. At the plateau another factor — carbon dioxide concentration or temperature — has become limiting, so extra light has no effect.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Word equation for photosynthesis?', back: 'Carbon dioxide + water → glucose + oxygen (in light, with chlorophyll).', difficulty: 'EASY' },
            { front: 'Symbol equation for photosynthesis?', back: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', difficulty: 'MEDIUM' },
            { front: 'Why is glucose stored as starch?', back: 'Starch is insoluble, so it does not affect osmosis or the water potential of the cell.', difficulty: 'HARD' },
            { front: 'What is a limiting factor?', back: 'The factor in shortest supply, which alone determines the rate of the process.', difficulty: 'MEDIUM' },
            { front: 'Why do plants need nitrate ions?', back: 'To convert glucose into amino acids and then proteins for growth.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'On a warm, bright summer day, which is most likely to be the limiting factor for photosynthesis in a field crop?',
              options: [
                { id: 'a', text: 'Carbon dioxide concentration', why: '' },
                { id: 'b', text: 'Light intensity', why: 'On a bright day light is plentiful, so it is unlikely to be the factor in shortest supply.' },
                { id: 'c', text: 'Temperature', why: 'On a warm day temperature is near optimum and unlikely to be limiting.' },
                { id: 'd', text: 'Chlorophyll concentration', why: 'Chlorophyll is not consumed and is not normally the limiting factor in a healthy crop.' },
              ],
              answer: 'a',
              markScheme: ['Carbon dioxide concentration (1)'],
              marks: 1,
              explanation:
                'Atmospheric CO₂ is only about 0.04%, so on a warm bright day when light and temperature are both favourable, CO₂ is the factor in shortest supply — which is exactly why commercial glasshouses enrich it.',
            },
          ],
        },
        {
          number: '6.2',
          slug: 'leaf-structure',
          title: 'Leaf structure and mineral needs',
          summary: 'How a leaf is adapted for photosynthesis, and why plants need minerals.',
          prerequisites: ['6.1'],
          objectives: [
            { code: '6.2.1', statement: 'Relate the structure of a leaf to its function in photosynthesis.', tier: 'CORE' },
            { code: '6.2.2', statement: 'Explain the need for nitrate and magnesium ions and the effects of deficiency.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'leaf-structure',
              title: 'Leaf structure and mineral needs',
              readingMinutes: 5,
              body: `A leaf is an organ built for one job, and every layer is an adaptation for it.
### The layers, top to bottom
- **Waxy cuticle** — waterproof, reduces water loss by evaporation. Transparent, so it does not block light.
- **Upper epidermis** — thin and transparent, letting light through to the layer below.
- **Palisade mesophyll** — tall cells packed with **chloroplasts**, positioned near the top to absorb the most light. This is where most photosynthesis happens.
- **Spongy mesophyll** — loosely packed cells with **air spaces** between them, allowing carbon dioxide to diffuse to all the cells.
- **Lower epidermis** — contains the **stomata**.
- **Stomata** — pores that let CO₂ diffuse in and O₂ and water vapour out. Each is opened and closed by two **guard cells**, which close them at night and in drought to conserve water.
- **Veins (xylem and phloem)** — deliver water and carry away sugars.
### Why leaves are broad and thin
**Broad** gives a large surface area for absorbing light; **thin** gives a short diffusion distance for gases. Most stomata are on the **underside**, which is shaded and cooler, reducing water loss.
### Mineral ions
- **Nitrate ions** — needed to make **amino acids and proteins**. Deficiency causes stunted growth and older leaves yellowing.
- **Magnesium ions** — needed to make **chlorophyll**. Deficiency causes yellowing between leaf veins (chlorosis), so less photosynthesis occurs.
These are absorbed from the soil by **active transport** through root hair cells.`,
              analogy: 'A leaf is a solar panel with plumbing: broad and flat to catch light, thin so gases move quickly, and veined so raw materials arrive and product leaves without the panel having to move.',
              misconceptions: [
                'Thinking stomata are on the upper surface. Most are on the underside, where it is shaded and water loss is lower.',
                'Confusing the roles of nitrate and magnesium. Nitrate builds proteins; magnesium builds chlorophyll.',
                'Believing the waxy cuticle blocks light. It is transparent — its role is waterproofing only.',
              ],
              examTips: [
                'For "how is a leaf adapted" questions, pair every structure with its purpose: "palisade cells contain many chloroplasts **so that** more light is absorbed".',
                'Deficiency questions want the chain: no magnesium → no chlorophyll → less photosynthesis → poor growth.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why the palisade mesophyll is located near the upper surface of a leaf.',
                  steps: ['Palisade cells contain the most chloroplasts of any leaf cell.', 'Light intensity is greatest at the top of the leaf, decreasing as light passes deeper.', 'Positioning these cells near the top means they absorb the maximum light for photosynthesis.'],
                  answer: 'Because palisade cells contain the most chloroplasts, placing them nearest the light maximises light absorption and so the rate of photosynthesis.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which leaf layer carries out most photosynthesis?', back: 'The palisade mesophyll, packed with chloroplasts near the upper surface.', difficulty: 'MEDIUM' },
            { front: 'Why does the spongy mesophyll have air spaces?', back: 'To allow carbon dioxide to diffuse freely to all the photosynthesising cells.', difficulty: 'MEDIUM' },
            { front: 'What controls the opening of stomata?', back: 'Guard cells.', difficulty: 'EASY' },
            { front: 'Why do plants need nitrate ions?', back: 'To make amino acids and therefore proteins for growth.', difficulty: 'MEDIUM' },
            { front: 'Why do plants need magnesium ions?', back: 'To make chlorophyll — deficiency causes yellowing between the veins.', difficulty: 'HARD' },
            { front: 'Why are most stomata on the lower surface?', back: 'It is shaded and cooler, so less water is lost by evaporation.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A plant grown without magnesium ions has yellow leaves and grows poorly. Explain why. [3]',
              answer:
                'Magnesium ions are needed to make chlorophyll. Without magnesium the plant cannot produce enough chlorophyll, so the leaves appear yellow rather than green. Since chlorophyll absorbs the light energy used in photosynthesis, less photosynthesis occurs, so less glucose is made for respiration and growth, and the plant grows poorly.',
              markScheme: [
                'Magnesium is needed to make chlorophyll (1)',
                'Less chlorophyll means leaves are yellow and absorb less light (1)',
                'Less photosynthesis, so less glucose for growth (1)',
              ],
              marks: 3,
              explanation:
                'Each mark is a link in the chain. Naming magnesium\'s role without following through to reduced growth scores only the first mark.',
            },
          ],
        },
      ],
    },
    {
      number: '7',
      slug: 'human-nutrition',
      title: 'Human nutrition',
      summary: 'A balanced diet, the digestive system, and the enzymes that break food down.',
      subtopics: [
        {
          number: '7.1',
          slug: 'balanced-diet',
          title: 'Diet and deficiency',
          summary: 'The components of a balanced diet and what happens when one is missing.',
          objectives: [
            { code: '7.1.1', statement: 'Describe the components of a balanced diet and the effects of deficiencies.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'balanced-diet',
              title: 'Diet and deficiency',
              readingMinutes: 4,
              body: `A **balanced diet** contains all the required nutrients in the correct proportions and amounts for the individual — and what is correct varies with age, sex, activity and pregnancy.
### What a diet must contain, and why
- **Carbohydrates** — the main source of energy.
- **Fats (lipids)** — energy storage, insulation, and making cell membranes.
- **Proteins** — growth and repair of tissues.
- **Vitamins** — small amounts needed for specific processes.
- **Minerals** — ions such as calcium and iron.
- **Fibre (roughage)** — provides bulk so muscles can push food along the gut by peristalsis; without it, constipation.
- **Water** — the solvent in which all reactions occur and substances are transported.
### Deficiency diseases worth knowing
- **Vitamin C** deficiency → **scurvy** (bleeding gums, poor wound healing), because vitamin C is needed to make collagen.
- **Vitamin D** or **calcium** deficiency → **rickets** in children, as bones are not properly hardened.
- **Iron** deficiency → **anaemia**, because iron is needed to make haemoglobin, so less oxygen can be carried.
### Malnutrition works both ways
Malnutrition means an unbalanced diet, not only too little. Persistent energy intake above what is used leads to **obesity**, raising the risk of heart disease and type 2 diabetes.`,
              analogy: 'A balanced diet is like a full toolbox. Having ten hammers and no screwdriver is not "mostly fine" — a missing tool stops a whole job, which is why a single vitamin deficiency causes such specific, dramatic symptoms.',
              misconceptions: [
                'Thinking malnutrition only means starvation. Obesity is a form of malnutrition too, because the diet is unbalanced.',
                'Believing fibre is digested. It is not — its value is precisely that it stays in the gut and provides bulk for peristalsis.',
                'Assuming any anaemia is iron deficiency alone; the exam link required is iron → haemoglobin → oxygen transport.',
              ],
              examTips: [
                'Deficiency questions want the mechanism, not just the disease name: "iron is needed to make haemoglobin, so less oxygen is carried" scores far better than "anaemia".',
                'If asked why a pregnant woman needs more calcium and iron, link to the fetus building bones and making its own blood.',
              ],
              workedExamples: [
                {
                  prompt: 'A person\'s diet lacks iron. Explain why they feel tired.',
                  steps: ['Iron is needed to make haemoglobin in red blood cells.', 'Less haemoglobin means less oxygen can be transported around the body.', 'Cells receive less oxygen, so aerobic respiration is reduced and less energy is released.'],
                  answer: 'Without iron, less haemoglobin is made, so less oxygen is carried to cells, reducing aerobic respiration and energy release — causing tiredness (anaemia).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is a balanced diet?', back: 'One containing all required nutrients in the correct proportions and amounts for that individual.', difficulty: 'MEDIUM' },
            { front: 'Why is fibre needed?', back: 'It provides bulk so the gut muscles can push food along by peristalsis, preventing constipation.', difficulty: 'MEDIUM' },
            { front: 'Which deficiency causes scurvy?', back: 'Vitamin C.', difficulty: 'EASY' },
            { front: 'Which deficiency causes rickets?', back: 'Vitamin D (or calcium).', difficulty: 'MEDIUM' },
            { front: 'Why does iron deficiency cause tiredness?', back: 'Less haemoglobin is made, so less oxygen is carried, reducing respiration and energy release.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why protein is especially important in the diet of a growing child. [2]',
              answer:
                'Protein is needed for growth and the repair of tissues. A growing child is making large amounts of new cells and tissue, so requires more protein per unit body mass than an adult who is mainly repairing existing tissue.',
              markScheme: [
                'Protein is required for growth / making new cells and tissues (1)',
                'A child is growing rapidly so needs proportionally more than an adult (1)',
              ],
              marks: 2,
              explanation:
                'Protein is the only one of the three main food groups used primarily as a building material rather than as fuel, which is why growth questions always point to it.',
            },
          ],
        },
        {
          number: '7.2',
          slug: 'digestion',
          title: 'Digestion and absorption',
          summary: 'The gut, digestive enzymes, bile, and how the small intestine is adapted for absorption.',
          prerequisites: ['5.1', '7.1'],
          objectives: [
            { code: '7.2.1', statement: 'Describe the functions of the main regions of the alimentary canal.', tier: 'CORE' },
            { code: '7.2.2', statement: 'Describe the roles of digestive enzymes and bile, and the adaptations of the small intestine.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'digestion',
              title: 'Digestion and absorption',
              readingMinutes: 6,
              body: `Food molecules are far too large to cross a cell membrane. **Digestion** breaks them into small, soluble molecules that can be absorbed.
### Two kinds of digestion
**Physical (mechanical)** digestion — chewing by the teeth, churning in the stomach, and emulsification by bile — breaks food into smaller pieces. Nothing chemical changes, but the **surface area** increases, which speeds up the next step.
**Chemical** digestion uses enzymes to break the bonds within molecules.
### The three enzyme groups
| Enzyme | Substrate | Products |
|---|---|---|
| Amylase | starch | maltose, then glucose |
| Protease (e.g. pepsin) | protein | amino acids |
| Lipase | fats | fatty acids + glycerol |
### Bile
**Bile** is made in the **liver**, stored in the **gall bladder**, and released into the small intestine. It has two jobs, and neither is enzymatic:
1. It **emulsifies fats** — breaking large fat droplets into many small ones, greatly increasing surface area for lipase to work on.
2. It is **alkaline**, neutralising the acidic mixture arriving from the stomach so that intestinal enzymes work at their optimum pH.
### Absorption in the small intestine
The small intestine is superbly adapted:
- **Very long**, giving time for absorption.
- **Villi and microvilli** give an enormous **surface area**.
- Villi have a **very thin wall (one cell thick)**, giving a short diffusion distance.
- A rich **blood supply** carries absorbed molecules away, maintaining a steep concentration gradient.
- Each villus contains a **lacteal** for absorbing fatty acids and glycerol.`,
              analogy: 'Bile emulsifying fat is like breaking one big block of butter into a thousand crumbs. There is exactly as much butter, but vastly more surface for the enzyme to attack — which is why emulsification is physical, not chemical.',
              misconceptions: [
                'Calling bile an enzyme. It contains no enzymes; it emulsifies physically and neutralises chemically.',
                'Saying bile "digests fat". Lipase digests fat; bile only increases the surface area so lipase works faster.',
                'Confusing where enzymes work. Pepsin needs acid (stomach, pH 2); most other enzymes need the alkaline small intestine.',
              ],
              examTips: [
                'A very common 3-mark question asks how the small intestine is adapted. Give surface area (villi/microvilli), thin wall (short diffusion distance) and good blood supply (maintains the gradient) — three distinct points.',
                'If asked the function of bile, always give both roles: emulsification and neutralisation. One alone rarely earns full marks.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain how bile increases the rate of fat digestion, even though it contains no enzymes.',
                  steps: ['Bile emulsifies fats, breaking large droplets into many smaller droplets.', 'This greatly increases the total surface area of fat exposed.', 'Lipase can then act on a much larger surface, so digestion is faster.'],
                  answer: 'Bile emulsifies fat into small droplets, increasing the surface area available for lipase to act on, so fat is digested faster. Bile also neutralises stomach acid so lipase is at its optimum pH.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does amylase digest, and into what?', back: 'Starch into maltose (and eventually glucose).', difficulty: 'MEDIUM' },
            { front: 'What does lipase produce?', back: 'Fatty acids and glycerol.', difficulty: 'MEDIUM' },
            { front: 'Where is bile made and stored?', back: 'Made in the liver, stored in the gall bladder.', difficulty: 'MEDIUM' },
            { front: 'Give the two functions of bile.', back: 'Emulsifies fats to increase surface area, and neutralises stomach acid to give the optimum pH for intestinal enzymes.', difficulty: 'HARD' },
            { front: 'Name three adaptations of the small intestine for absorption.', back: 'Large surface area from villi/microvilli, wall one cell thick for short diffusion distance, and a rich blood supply to maintain the concentration gradient.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain three ways in which the small intestine is adapted for the efficient absorption of digested food. [3]',
              answer:
                'It has millions of villi and microvilli, giving a very large surface area for absorption. The wall of each villus is only one cell thick, so the diffusion distance into the blood is very short. Each villus has a dense capillary network, which carries absorbed molecules away and maintains a steep concentration gradient for continued diffusion.',
              markScheme: [
                'Villi/microvilli give a large surface area (1)',
                'Wall one cell thick — short diffusion distance (1)',
                'Rich blood supply maintains a steep concentration gradient (1)',
              ],
              marks: 3,
              explanation:
                'These three points recur in every absorption question in biology — lungs, gills and roots use the same logic. Learn the trio once and it transfers.',
              hint: 'Think about surface area, distance, and what keeps the gradient steep.',
            },
          ],
        },
      ],
    },
    {
      number: '8',
      slug: 'transport-in-plants',
      title: 'Transport in plants',
      summary: 'Xylem, phloem, transpiration and translocation.',
      subtopics: [
        {
          number: '8.1',
          slug: 'transpiration-and-translocation',
          title: 'Xylem, phloem, transpiration and translocation',
          summary: 'The two transport tissues and the two processes they carry out.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '8.1.1', statement: 'Describe the functions of xylem and phloem and identify their positions in the plant.', tier: 'CORE' },
            { code: '8.1.2', statement: 'Describe transpiration and the factors affecting its rate.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'transpiration-and-translocation',
              title: 'Xylem, phloem, transpiration and translocation',
              readingMinutes: 6,
              body: `Plants have two separate transport tissues, carrying different things in different directions.
### Xylem versus phloem
| | Xylem | Phloem |
|---|---|---|
| Carries | water and mineral ions | sucrose and amino acids |
| Direction | upwards only, roots → leaves | both ways, source → sink |
| Cells | dead, hollow, lignified | living |
| Process | transpiration | translocation |
A helpful pairing: **xylem** carries **water**; **phloem** carries **food**.
### Transpiration
**Transpiration** is the loss of water vapour from the leaves, mainly through the **stomata**, by evaporation and diffusion.
This loss pulls water up the xylem in a continuous **transpiration stream**, dragging up the mineral ions with it. Transpiration also cools the leaf and keeps cells turgid.
### Factors affecting the rate
- **Higher temperature** → faster evaporation → faster transpiration.
- **Lower humidity** → steeper water vapour gradient out of the leaf → faster.
- **More wind** → blows away accumulated vapour, maintaining the gradient → faster.
- **Higher light intensity** → stomata open for photosynthesis → faster.
Notice that three of these work by the same mechanism: they keep the concentration gradient of water vapour steep.
### Wilting
If water loss exceeds uptake, cells lose water, become **flaccid**, lose turgor pressure, and the plant **wilts**. Wilting reduces the surface area exposed to the sun and the stomata close, both of which slow further loss.`,
              analogy: 'The transpiration stream is a drinking straw with the top continuously evaporating away. Water leaving the top pulls the whole column up behind it — nothing pushes from the bottom.',
              misconceptions: [
                'Thinking the roots push water up. Water is *pulled* up by evaporation from the leaves; root pressure is a minor contributor.',
                'Saying transpiration is useless water loss. It is largely an unavoidable consequence of having stomata open for CO₂, but it also cools the leaf and delivers mineral ions.',
                'Mixing up the tissues — remember xylem is dead and hollow, which is precisely what lets water flow through it freely.',
              ],
              examTips: [
                'When explaining why wind or low humidity increases transpiration, use the phrase "maintains a steeper concentration gradient of water vapour" — that is the marking point.',
                'For a potometer question, remember it strictly measures water *uptake*, which is only an estimate of transpiration since some water is used in photosynthesis.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why transpiration is faster on a windy day than on a still day.',
                  steps: ['Water vapour diffuses out of the stomata into the air just outside the leaf.', 'On a still day this vapour accumulates, reducing the concentration gradient.', 'Wind blows the humid air away, keeping the gradient steep, so diffusion out of the leaf continues rapidly.'],
                  answer: 'Wind removes the water vapour that collects around the leaf, maintaining a steeper water vapour concentration gradient, so water diffuses out of the stomata faster.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does xylem transport, and in which direction?', back: 'Water and mineral ions, upwards only from roots to leaves.', difficulty: 'MEDIUM' },
            { front: 'What does phloem transport?', back: 'Sucrose and amino acids, in both directions from source to sink (translocation).', difficulty: 'MEDIUM' },
            { front: 'Define transpiration.', back: 'The loss of water vapour from leaves by evaporation and diffusion, mainly through the stomata.', difficulty: 'MEDIUM' },
            { front: 'Name four factors that increase transpiration rate.', back: 'Higher temperature, lower humidity, more wind, higher light intensity.', difficulty: 'HARD' },
            { front: 'Why are xylem vessels hollow and dead?', back: 'So water can flow through them freely with no obstruction from cell contents.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which change would decrease the rate of transpiration from a leaf?',
              options: [
                { id: 'a', text: 'Increasing the humidity of the surrounding air', why: '' },
                { id: 'b', text: 'Increasing the temperature', why: 'Higher temperature increases evaporation and so increases transpiration.' },
                { id: 'c', text: 'Increasing wind speed', why: 'Wind removes water vapour and steepens the gradient, increasing transpiration.' },
                { id: 'd', text: 'Increasing light intensity', why: 'More light opens the stomata wider, increasing transpiration.' },
              ],
              answer: 'a',
              markScheme: ['Increasing humidity (1)'],
              marks: 1,
              explanation:
                'Higher humidity means more water vapour already in the air outside the leaf, so the concentration gradient between the leaf and the air is shallower and diffusion out is slower.',
            },
          ],
        },
      ],
    },
    {
      number: '9',
      slug: 'transport-in-animals',
      title: 'Transport in animals',
      summary: 'The heart, blood vessels, blood, and the double circulatory system.',
      subtopics: [
        {
          number: '9.1',
          slug: 'circulatory-system',
          title: 'The heart and circulatory system',
          summary: 'Double circulation, heart structure, and the three types of blood vessel.',
          objectives: [
            { code: '9.1.1', statement: 'Describe the structure and function of the heart and the double circulatory system.', tier: 'CORE' },
            { code: '9.1.2', statement: 'Relate the structure of arteries, veins and capillaries to their functions.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'circulatory-system',
              title: 'The heart and circulatory system',
              readingMinutes: 6,
              body: `Mammals have a **double circulatory system**: blood passes through the heart **twice** for each complete circuit of the body.
- **Pulmonary circulation** — heart → lungs → heart, picking up oxygen.
- **Systemic circulation** — heart → body → heart, delivering it.
The advantage is **pressure**. Blood is re-pressurised after the lungs, so it can be pushed round the whole body quickly, giving a high delivery rate of oxygen and glucose — necessary for warm-blooded animals with high energy demands.
### Structure of the heart
Four chambers: two thin-walled **atria** receiving blood, two thick-walled **ventricles** pumping it out. **Valves** between them prevent backflow.
The **left ventricle wall is much thicker** than the right, because the left must pump blood all the way around the body while the right only pumps to the nearby lungs. This is a favourite exam question and the answer is always about the distance and therefore the pressure required.
### The three vessels
| | Artery | Vein | Capillary |
|---|---|---|---|
| Direction | away from heart | towards heart | between them |
| Wall | thick, muscular, elastic | thinner | one cell thick |
| Lumen | narrow | wide | very narrow |
| Valves | no | **yes** | no |
| Pressure | high | low | falling |
Arteries have thick elastic walls to withstand and smooth out high pressure surges. Veins have valves because the pressure is too low to prevent backflow on its own. Capillaries are one cell thick to allow rapid exchange by diffusion over a short distance.`,
              analogy: 'The double circulation is a relay with a re-fuelling stop. Rather than one exhausted runner circling the whole track, the baton returns to the centre to be re-launched at full speed for the long lap.',
              misconceptions: [
                'Saying arteries always carry oxygenated blood. The **pulmonary artery** carries deoxygenated blood to the lungs — the rule is about direction (away from the heart), not oxygen.',
                'Thinking the left side of the heart is "stronger because it is more important". It is thicker specifically because the systemic circuit is longer and needs higher pressure.',
                'Forgetting valves in veins. Their presence is a standard mark, explained by the low pressure in veins.',
              ],
              examTips: [
                'For "explain why the left ventricle wall is thicker", the marking points are: pumps blood to the whole body / a much greater distance, so needs to generate a higher pressure.',
                'Capillary questions almost always want "one cell thick, so a short diffusion distance" plus "large surface area" — the same logic as the small intestine and alveoli.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why veins contain valves but arteries do not.',
                  steps: ['Blood in arteries is at high pressure, having just left the heart, so it cannot flow backwards.', 'Blood in veins is at much lower pressure, far from the pumping action of the heart.', 'Without valves, low-pressure blood could flow backwards, so valves ensure one-way flow back to the heart.'],
                  answer: 'Veins carry blood at low pressure, so valves are needed to prevent backflow and keep blood moving towards the heart. Arteries carry high-pressure blood that cannot flow backwards, so valves are unnecessary.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is a double circulatory system?', back: 'Blood passes through the heart twice per complete circuit — once to the lungs, once to the body.', difficulty: 'MEDIUM' },
            { front: 'Why is the left ventricle wall thicker?', back: 'It pumps blood all round the body, a much greater distance, so must generate a higher pressure.', difficulty: 'HARD' },
            { front: 'Which vessel carries blood away from the heart?', back: 'Arteries (regardless of whether the blood is oxygenated).', difficulty: 'EASY' },
            { front: 'Why do veins have valves?', back: 'Blood is at low pressure, so valves prevent it flowing backwards.', difficulty: 'MEDIUM' },
            { front: 'Why are capillary walls one cell thick?', back: 'To give a short diffusion distance for rapid exchange of substances with the tissues.', difficulty: 'MEDIUM' },
            { front: 'Which artery carries deoxygenated blood?', back: 'The pulmonary artery, which carries blood from the heart to the lungs.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain one advantage of a double circulatory system over a single circulatory system. [2]',
              answer:
                'In a double circulation the blood returns to the heart after passing through the lungs and is pumped again, so it leaves at high pressure. This means blood travels around the body faster, delivering oxygen and glucose to respiring cells more quickly, which supports a high metabolic rate.',
              markScheme: [
                'Blood is re-pressurised by the heart after the lungs (1)',
                'So it flows faster / delivers oxygen and nutrients more rapidly to body cells (1)',
              ],
              marks: 2,
              explanation:
                'In a single circulation, blood loses most of its pressure passing through the gill or lung capillaries and then travels to the body sluggishly — which limits how fast the animal can respire.',
            },
          ],
        },
        {
          number: '9.2',
          slug: 'blood',
          title: 'Blood and its components',
          summary: 'Red cells, white cells, platelets and plasma, and what each does.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '9.2.1', statement: 'Identify the components of blood and state their functions.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'blood',
              title: 'Blood and its components',
              readingMinutes: 5,
              body: `Blood is a **tissue**, made of four components suspended in a liquid.
### Red blood cells
Transport **oxygen**, using the protein **haemoglobin**. In the lungs haemoglobin combines with oxygen to form **oxyhaemoglobin**; in respiring tissues, where oxygen concentration is low, it releases it again.
Three adaptations, each with a reason:
- **Biconcave disc** — large surface area for gas exchange.
- **No nucleus** — more room for haemoglobin.
- **Small and flexible** — squeezes through narrow capillaries.
### White blood cells
Defend against pathogens. Two types:
- **Phagocytes** — engulf and digest pathogens; a general defence, with a lobed nucleus.
- **Lymphocytes** — produce **antibodies** specific to one antigen.
Unlike red cells, white cells **have a nucleus**.
### Platelets
Fragments of cells that trigger **blood clotting** at a wound. Clotting seals the cut, preventing further blood loss and stopping pathogens entering — so it is both a circulatory and a defensive function.
### Plasma
The straw-coloured liquid, mostly water, which transports **everything dissolved**: carbon dioxide, digested food (glucose, amino acids), urea, hormones, ions, and heat around the body.
### The one-line summary
Red cells carry oxygen, white cells fight infection, platelets clot, plasma carries everything else.`,
              analogy: 'Blood is a delivery network: red cells are the oxygen tankers, white cells the security staff, platelets the emergency repair crew, and plasma the road itself, carrying everything dissolved along with it.',
              misconceptions: [
                'Saying red blood cells "have no nucleus so they are dead". They are living cells; losing the nucleus makes room for more haemoglobin.',
                'Thinking plasma only carries carbon dioxide. It also transports glucose, amino acids, urea, hormones and heat.',
                'Confusing platelets with white cells. Platelets clot blood; white cells fight pathogens.',
              ],
              examTips: [
                'Adaptation questions want feature plus consequence: "biconcave **so that** the surface area for oxygen absorption is larger".',
                'If asked how blood transports carbon dioxide, the answer is mostly dissolved in the **plasma**, not by haemoglobin.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain two ways a red blood cell is adapted for transporting oxygen.',
                  steps: ['It has no nucleus, which leaves more space inside the cell for haemoglobin, so more oxygen can be carried.', 'Its biconcave shape gives a larger surface area to volume ratio, so oxygen diffuses in and out more quickly.'],
                  answer: 'No nucleus, giving more room for haemoglobin and so more oxygen carried; and a biconcave shape giving a large surface area for rapid diffusion of oxygen.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What protein in red blood cells carries oxygen?', back: 'Haemoglobin, which forms oxyhaemoglobin in the lungs.', difficulty: 'EASY' },
            { front: 'Give two adaptations of a red blood cell.', back: 'Biconcave shape for a large surface area, and no nucleus so it holds more haemoglobin.', difficulty: 'MEDIUM' },
            { front: 'What do platelets do?', back: 'Trigger blood clotting to seal wounds and prevent pathogen entry.', difficulty: 'MEDIUM' },
            { front: 'What does plasma transport?', back: 'Carbon dioxide, digested food, urea, hormones, ions and heat.', difficulty: 'MEDIUM' },
            { front: 'What are the two types of white blood cell?', back: 'Phagocytes, which engulf pathogens, and lymphocytes, which make antibodies.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which blood component is mainly responsible for clotting at a wound?',
              options: [
                { id: 'a', text: 'Platelets', why: '' },
                { id: 'b', text: 'Red blood cells', why: 'Red blood cells transport oxygen; they play no role in clotting.' },
                { id: 'c', text: 'Lymphocytes', why: 'Lymphocytes produce antibodies against pathogens.' },
                { id: 'd', text: 'Plasma', why: 'Plasma is the transport liquid, though it does carry the clotting proteins.' },
              ],
              answer: 'a',
              markScheme: ['Platelets (1)'],
              marks: 1,
              explanation:
                'Clotting seals the wound, which both limits blood loss and blocks a route of entry for pathogens — a defensive function as well as a circulatory one.',
            },
          ],
        },
      ],
    },
    {
      number: '10',
      slug: 'diseases-and-immunity',
      title: 'Diseases and immunity',
      summary: 'Pathogens, transmission, the body\'s defences and vaccination.',
      subtopics: [
        {
          number: '10.1',
          slug: 'pathogens-and-immunity',
          title: 'Pathogens, defences and vaccination',
          summary: 'How disease spreads, how the body fights it, and how vaccines work.',
          objectives: [
            { code: '10.1.1', statement: 'Define pathogen and transmissible disease, and describe how pathogens are transmitted.', tier: 'CORE' },
            { code: '10.1.2', statement: 'Describe the body\'s defences and explain how vaccination produces immunity.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'pathogens-and-immunity',
              title: 'Pathogens, defences and vaccination',
              readingMinutes: 6,
              body: `A **pathogen** is a disease-causing organism. A **transmissible disease** is one in which the pathogen can be passed from one host to another.
### Transmission
- **Direct contact** — blood or other body fluids.
- **Indirect** — contaminated food or water, airborne droplets, or an animal vector such as a mosquito.
### The body's defences
**Barriers that stop entry:**
- **Skin** — a physical barrier.
- **Hairs and mucus** in the nose trap pathogens; **ciliated cells** in the airways sweep mucus away.
- **Stomach acid** kills most pathogens swallowed in food.
- **Clotting** at a wound seals the entry point quickly.
**White blood cells, if entry succeeds:**
- **Phagocytes** engulf and digest pathogens — a general, non-specific defence.
- **Lymphocytes** produce **antibodies**, proteins with a shape specific to the **antigens** on one particular pathogen. Antibodies cause pathogens to clump together and mark them for destruction.
### How vaccination works
This chain is worth learning exactly, because it is asked frequently:
1. A **weakened or dead pathogen**, or its antigens, is put into the body.
2. It cannot cause disease, but it carries the same **antigens**.
3. **Lymphocytes** recognise the antigens and produce **specific antibodies**.
4. **Memory cells** remain in the blood afterwards.
5. If the real pathogen infects later, memory cells produce antibodies **faster and in greater quantity**, destroying it before symptoms develop.
### Herd immunity
If enough of a population is vaccinated, the pathogen cannot spread easily, protecting even those who are not vaccinated.`,
              analogy: 'A vaccine is a fire drill. Nothing is actually burning, but the building practises the response — so when a real fire starts, everyone reacts immediately instead of working out what to do.',
              misconceptions: [
                'Thinking a vaccine contains antibodies. It contains **antigens** (weakened/dead pathogen); your own lymphocytes make the antibodies.',
                'Confusing antigen and antibody. The antigen is on the pathogen; the antibody is the protein your body makes to match it.',
                'Believing antibodies are general-purpose. Each antibody is specific to one antigen shape, which is why one vaccine does not protect against other diseases.',
              ],
              examTips: [
                'For "explain how vaccination gives long-term immunity", the essential marking points are: antigens introduced → lymphocytes make specific antibodies → memory cells remain → faster, larger response on re-infection.',
                'Do not write that vaccines "kill the disease". They prepare the immune system; the immune system does the killing.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a person vaccinated against measles does not become ill when later exposed to the measles virus.',
                  steps: ['The vaccine introduced measles antigens, so lymphocytes produced specific antibodies.', 'Memory cells specific to measles remained in the blood afterwards.', 'On real exposure, memory cells produce large amounts of the correct antibody very quickly.', 'The virus is destroyed before it can multiply enough to cause symptoms.'],
                  answer: 'Memory cells from vaccination recognise the measles antigens and produce specific antibodies much faster and in greater quantity, destroying the virus before symptoms develop.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define pathogen.', back: 'A disease-causing organism.', difficulty: 'EASY' },
            { front: 'What is an antigen?', back: 'A molecule on the surface of a pathogen that the immune system recognises as foreign.', difficulty: 'MEDIUM' },
            { front: 'What do phagocytes do?', back: 'Engulf and digest pathogens — a non-specific defence.', difficulty: 'MEDIUM' },
            { front: 'What do lymphocytes produce?', back: 'Antibodies, each specific to one antigen.', difficulty: 'MEDIUM' },
            { front: 'Why does vaccination give long-term protection?', back: 'Memory cells remain and produce specific antibodies faster and in greater quantity on re-infection.', difficulty: 'HARD' },
            { front: 'What is herd immunity?', back: 'When enough of a population is vaccinated that the pathogen cannot spread easily, protecting unvaccinated individuals too.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Describe how vaccination produces immunity to a disease. [4]',
              answer:
                'A weakened or dead form of the pathogen, carrying its antigens, is introduced into the body. Lymphocytes recognise these antigens as foreign and produce antibodies that are specific to them. Memory cells are then produced and remain in the blood. If the live pathogen later enters the body, the memory cells produce the specific antibodies much more quickly and in larger amounts, destroying the pathogen before it causes symptoms.',
              markScheme: [
                'A weakened/dead pathogen or its antigens is introduced (1)',
                'Lymphocytes produce antibodies specific to those antigens (1)',
                'Memory cells remain in the blood (1)',
                'On re-infection, antibodies are produced faster and in greater quantity (1)',
              ],
              marks: 4,
              explanation:
                'Marks are awarded for the sequence. Missing the memory-cell step is the single most common way candidates lose a mark here, because it is what makes the immunity long-lasting.',
              hint: 'Four stages: what goes in, what recognises it, what remains, and what happens next time.',
            },
          ],
        },
      ],
    },
    {
      number: '11',
      slug: 'gas-exchange-in-humans',
      title: 'Gas exchange in humans',
      summary: 'The breathing system, alveoli, and the effect of exercise.',
      subtopics: [
        {
          number: '11.1',
          slug: 'gas-exchange',
          title: 'Gas exchange and breathing',
          summary: 'How alveoli are adapted for exchange, and how breathing changes with exercise.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '11.1.1', statement: 'Describe the features of gas exchange surfaces and relate alveolar structure to function.', tier: 'CORE' },
            { code: '11.1.2', statement: 'Explain the effects of physical activity on rate and depth of breathing.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'gas-exchange',
              title: 'Gas exchange and breathing',
              readingMinutes: 5,
              body: `Every efficient gas exchange surface in biology shares the same four features — learn them once and they apply to alveoli, gills, and leaves alike.
### Features of a good exchange surface
- **Large surface area** — more space for diffusion at once.
- **Thin** (often one cell thick) — a short diffusion distance.
- **Good blood supply** — carries substances away, maintaining a steep concentration gradient.
- **Moist** — gases dissolve before diffusing across.
### The alveoli
There are hundreds of millions of alveoli, giving an enormous total surface area. Each has a wall **one cell thick**, is surrounded by a dense capillary network, and has a moist lining.
Oxygen diffuses from the alveolar air (high concentration) into the blood (low), and carbon dioxide diffuses the other way. The blood flow constantly removes oxygen and brings more carbon dioxide, so both gradients stay steep.
### Breathing during exercise
Muscles respire faster, using more oxygen and producing more carbon dioxide. Rising CO₂ is detected, and breathing becomes **faster and deeper**.
This increases the volume of air exchanged per minute, supplying more oxygen for aerobic respiration and removing CO₂ faster. Heart rate rises for the same reason — to transport the gases more quickly.
### Oxygen debt
If exercise is vigorous enough that oxygen cannot be delivered fast enough, muscles respire **anaerobically**, producing **lactic acid**. This builds up an **oxygen debt**, which is why you continue breathing hard after stopping — the extra oxygen is needed to break down the lactic acid.`,
              analogy: 'The alveoli are a bunch of grapes rather than a balloon: the same volume, but far more skin. That is the whole point — surface area, not space, is what limits gas exchange.',
              misconceptions: [
                'Saying we breathe faster because "we need more air". The stimulus is rising carbon dioxide concentration, not a sensation of needing oxygen.',
                'Thinking breathing and respiration are the same thing. Breathing moves air; respiration releases energy inside cells.',
                'Believing the oxygen debt is repaid during exercise. It is repaid afterwards, which is why heavy breathing continues once you stop.',
              ],
              examTips: [
                'The four exchange-surface features earn marks in questions on lungs, gills, leaves and intestines. It is the highest-value list in the syllabus.',
                'For exercise questions, always name carbon dioxide as the detected stimulus and link the response to supplying oxygen for aerobic respiration.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why breathing becomes deeper and faster during exercise.',
                  steps: ['Muscles contract more, so they respire aerobically at a higher rate.', 'This uses more oxygen and produces more carbon dioxide, raising blood CO₂ concentration.', 'The increased CO₂ is detected and breathing rate and depth increase.', 'This supplies oxygen faster for respiration and removes the extra carbon dioxide.'],
                  answer: 'Exercising muscles respire faster, raising carbon dioxide levels in the blood. This is detected, so breathing becomes faster and deeper to supply more oxygen and remove the excess carbon dioxide.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Name the four features of an efficient gas exchange surface.', back: 'Large surface area, thin (short diffusion distance), good blood supply, and moist.', difficulty: 'HARD' },
            { front: 'How thick is an alveolus wall?', back: 'One cell thick, giving a very short diffusion distance.', difficulty: 'MEDIUM' },
            { front: 'What stimulus causes breathing rate to increase during exercise?', back: 'An increase in the concentration of carbon dioxide in the blood.', difficulty: 'HARD' },
            { front: 'What is produced in anaerobic respiration in muscle?', back: 'Lactic acid.', difficulty: 'MEDIUM' },
            { front: 'What is oxygen debt?', back: 'The extra oxygen needed after exercise to break down the lactic acid built up during anaerobic respiration.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Describe two ways an alveolus is adapted for efficient gas exchange, explaining each. [2]',
              answer:
                'The alveolus wall is only one cell thick, giving a very short diffusion distance so gases cross quickly. It is surrounded by a dense network of capillaries, which continually carries oxygen away and brings carbon dioxide, maintaining a steep concentration gradient for diffusion.',
              markScheme: [
                'Wall one cell thick — short diffusion distance (1)',
                'Rich capillary network — maintains a steep concentration gradient (1)',
              ],
              marks: 2,
              explanation:
                'Large surface area and a moist lining are equally valid alternatives, provided each is paired with the reason it helps.',
            },
          ],
        },
      ],
    },
    {
      number: '12',
      slug: 'respiration',
      title: 'Respiration',
      summary: 'Aerobic and anaerobic respiration and their equations.',
      subtopics: [
        {
          number: '12.1',
          slug: 'aerobic-and-anaerobic-respiration',
          title: 'Aerobic and anaerobic respiration',
          summary: 'Releasing energy with and without oxygen.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '12.1.1', statement: 'State the equations for aerobic and anaerobic respiration and compare their energy yields.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'aerobic-and-anaerobic-respiration',
              title: 'Aerobic and anaerobic respiration',
              readingMinutes: 5,
              body: `**Respiration** is the set of chemical reactions in cells that break down nutrient molecules to **release energy**. It happens in every living cell, all the time — plants included.
### Aerobic respiration
Respiration **using oxygen**, in the mitochondria.
**Word:** glucose + oxygen → carbon dioxide + water
**Symbol:** \`C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O\`
This releases a **large** amount of energy per glucose molecule, because glucose is broken down completely.
### Anaerobic respiration
Respiration **without oxygen**, releasing a **much smaller** amount of energy because glucose is only partly broken down.
**In muscle:** glucose → lactic acid
**In yeast:** glucose → alcohol (ethanol) + carbon dioxide
The yeast reaction is the basis of brewing and baking — the carbon dioxide makes bread rise, and the ethanol is the alcohol in beer and wine.
### Why energy yield differs
In aerobic respiration glucose is fully oxidised to CO₂ and water, extracting nearly all the chemical energy. In anaerobic respiration the products — lactic acid or ethanol — still contain a great deal of unreleased energy, so far less is available to the cell.
### The energy is used for
Muscle contraction, protein synthesis, cell division, active transport, and in mammals and birds, maintaining a constant body temperature.`,
              analogy: 'Aerobic respiration burns the log completely to ash; anaerobic respiration only chars it. The charred log still holds most of its energy — which is exactly why yeast can leave behind something as energy-rich as alcohol.',
              misconceptions: [
                'Thinking plants respire only at night. Plants respire constantly; during the day photosynthesis simply produces more oxygen than respiration consumes.',
                'Writing that anaerobic respiration produces "no" energy. It produces much less, not none.',
                'Confusing the two anaerobic products — lactic acid in animal muscle, ethanol and carbon dioxide in yeast.',
              ],
              examTips: [
                'Learn both anaerobic word equations separately. Writing the yeast equation for a muscle question is a common and costly slip.',
                'If asked to compare, the three comparison points are: oxygen required or not, relative energy released, and different products.',
              ],
              workedExamples: [
                {
                  prompt: 'A runner sprints hard for 30 seconds. Explain why lactic acid builds up in their muscles.',
                  steps: ['During intense exercise, muscles need energy faster than oxygen can be delivered by the blood.', 'With insufficient oxygen, muscle cells respire anaerobically as well as aerobically.', 'Anaerobic respiration in muscle converts glucose to lactic acid, which accumulates.'],
                  answer: 'Oxygen cannot be supplied fast enough for the energy demand, so muscles respire anaerobically, converting glucose into lactic acid, which builds up and causes fatigue.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Word equation for aerobic respiration?', back: 'Glucose + oxygen → carbon dioxide + water.', difficulty: 'EASY' },
            { front: 'Symbol equation for aerobic respiration?', back: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', difficulty: 'MEDIUM' },
            { front: 'Anaerobic respiration in muscle produces?', back: 'Lactic acid.', difficulty: 'MEDIUM' },
            { front: 'Anaerobic respiration in yeast produces?', back: 'Alcohol (ethanol) and carbon dioxide.', difficulty: 'MEDIUM' },
            { front: 'Why does anaerobic respiration release less energy?', back: 'Glucose is only partially broken down, so the products still contain much unreleased chemical energy.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'FOUNDATION',
              stem: 'Which products are formed by anaerobic respiration in yeast?',
              options: [
                { id: 'a', text: 'Alcohol and carbon dioxide', why: '' },
                { id: 'b', text: 'Lactic acid only', why: 'Lactic acid is the product of anaerobic respiration in animal muscle, not in yeast.' },
                { id: 'c', text: 'Carbon dioxide and water', why: 'These are the products of aerobic respiration.' },
                { id: 'd', text: 'Glucose and oxygen', why: 'These are reactants of aerobic respiration, not products.' },
              ],
              answer: 'a',
              markScheme: ['Alcohol (ethanol) and carbon dioxide (1)'],
              marks: 1,
              explanation:
                'This is the reaction used in brewing and baking: the ethanol makes the alcohol in beer, and the carbon dioxide makes bread dough rise.',
            },
          ],
        },
      ],
    },
    {
      number: '13',
      slug: 'excretion-in-humans',
      title: 'Excretion in humans',
      summary: 'The kidneys, urea formation and osmoregulation.',
      subtopics: [
        {
          number: '13.1',
          slug: 'excretion-and-the-kidney',
          title: 'Excretion and the kidney',
          summary: 'How waste is removed and water balance is maintained.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '13.1.1', statement: 'Describe the role of the kidneys in excretion and osmoregulation.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'excretion-and-the-kidney',
              title: 'Excretion and the kidney',
              readingMinutes: 5,
              body: `**Excretion** is the removal of the toxic waste products of metabolism and substances in excess of requirements.
### The main excretory products
- **Carbon dioxide** from respiration, excreted by the **lungs**.
- **Urea** from the breakdown of excess amino acids, excreted by the **kidneys**.
- Excess **water** and **salts**, excreted by the kidneys (and in sweat).
### Where urea comes from
Excess amino acids cannot be stored. In the **liver** they undergo **deamination**: the nitrogen-containing amino group is removed and converted into **urea**, and the rest can be respired. Urea is toxic, so it is carried in the blood to the kidneys and removed.
### How the kidney works
Each kidney contains around a million tiny tubules. In each:
1. **Filtration** — blood at high pressure is filtered. Small molecules (water, glucose, urea, salts) pass out; large ones (proteins) and blood cells stay in the blood.
2. **Selective reabsorption** — useful substances are taken back. **All the glucose** is reabsorbed, along with the amount of water and salts the body needs.
3. What remains — urea, excess water and excess salts — forms **urine**, which passes to the bladder.
The word **selective** carries the whole idea: filtration is indiscriminate, so reabsorption must be choosy.
### Osmoregulation
The kidney also controls the water content of the blood. On a hot day, or after little drinking, more water is reabsorbed, producing a **small volume of concentrated** urine. After drinking a lot, less is reabsorbed, producing a **large volume of dilute** urine.`,
              analogy: 'The kidney tips out the whole handbag and then puts back only what is wanted. Filtering everything and selectively reclaiming is far more reliable than trying to pick out the rubbish item by item.',
              misconceptions: [
                'Thinking glucose is normally present in urine. All glucose is reabsorbed in a healthy person — glucose in urine is a sign of diabetes.',
                'Confusing excretion with egestion. Faeces are egested, not excreted, since they were never absorbed into the body\'s cells.',
                'Believing the kidneys make urea. The **liver** makes urea by deamination; the kidneys only remove it.',
              ],
              examTips: [
                'If asked why protein is not found in urine, the answer is that protein molecules are too large to pass through the filter.',
                'For urine concentration questions, state both the volume and the concentration — "a small volume of concentrated urine" is the expected phrasing.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a person who drinks very little water on a hot day produces a small volume of dark, concentrated urine.',
                  steps: ['Sweating and low intake reduce the water content of the blood.', 'The kidney responds by reabsorbing more water back into the blood from the tubules.', 'Less water is left to dilute the urea and salts, so a small volume of concentrated urine is produced.'],
                  answer: 'The blood has a low water content, so the kidneys reabsorb more water, leaving a small volume of concentrated urine and conserving water in the body.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Where is urea made and from what?', back: 'In the liver, by deamination of excess amino acids.', difficulty: 'HARD' },
            { front: 'Name the two main stages of kidney function.', back: 'Filtration of the blood, then selective reabsorption of useful substances.', difficulty: 'MEDIUM' },
            { front: 'Why is there no protein in normal urine?', back: 'Protein molecules are too large to be filtered out of the blood.', difficulty: 'MEDIUM' },
            { front: 'Why is there no glucose in normal urine?', back: 'All the glucose filtered out is selectively reabsorbed back into the blood.', difficulty: 'HARD' },
            { front: 'What urine is produced after drinking a lot of water?', back: 'A large volume of dilute urine, as less water is reabsorbed.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Glucose is filtered out of the blood in the kidney, yet healthy urine contains no glucose. Explain why. [2]',
              answer:
                'Glucose is a small molecule so it is filtered out of the blood along with water, salts and urea. However, glucose is useful to the body, so it is all reabsorbed back into the blood by selective reabsorption before the urine leaves the kidney.',
              markScheme: [
                'Glucose is small enough to be filtered out (1)',
                'It is then all reabsorbed by selective reabsorption because it is useful (1)',
              ],
              marks: 2,
              explanation:
                'This two-stage design is the point of the kidney: filter indiscriminately by size, then reclaim selectively by usefulness. Glucose appearing in urine indicates the reabsorption capacity has been exceeded, as in diabetes.',
            },
          ],
        },
      ],
    },
    {
      number: '14',
      slug: 'coordination-and-response',
      title: 'Coordination and response',
      summary: 'The nervous system, reflexes, hormones and homeostasis.',
      subtopics: [
        {
          number: '14.1',
          slug: 'nervous-system-and-reflexes',
          title: 'The nervous system and reflex actions',
          summary: 'Neurones, synapses and the reflex arc.',
          objectives: [
            { code: '14.1.1', statement: 'Describe the human nervous system and the reflex arc.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'nervous-system-and-reflexes',
              title: 'The nervous system and reflex actions',
              readingMinutes: 5,
              body: `The nervous system coordinates fast responses using electrical impulses.
### Structure
- **Central nervous system (CNS)** — brain and spinal cord, where decisions are made.
- **Peripheral nervous system** — the nerves connecting the CNS to the rest of the body.
Three neurone types: **sensory** (receptor → CNS), **relay** (within the CNS), and **motor** (CNS → effector).
### The reflex arc
A **reflex action** is a rapid, automatic response that does not involve conscious thought — which is exactly what makes it fast enough to protect you.
The pathway, which must be learned in order:
**stimulus → receptor → sensory neurone → relay neurone (spinal cord) → motor neurone → effector → response**
Touching a hot object: heat is the stimulus, receptors in the skin detect it, the impulse travels to the spinal cord, and a motor neurone makes the arm muscle (the effector) contract to pull the hand away. The brain registers the pain **afterwards** — the hand is already moving.
### Synapses
Neurones do not physically touch. At a **synapse**, the impulse arriving triggers release of a **neurotransmitter**, which diffuses across the tiny gap and starts a new impulse in the next neurone.
Because the transmitter is released on one side and detected on the other, synapses make impulses travel in **one direction only**.`,
              analogy: 'A reflex is a spinal shortcut — like a receptionist who redirects an urgent call immediately instead of waiting for the manager. The manager (brain) is told, but only after the action has been taken.',
              misconceptions: [
                'Thinking the brain controls reflexes. The spinal cord handles the reflex; the brain is informed afterwards, which is why the response is so fast.',
                'Saying neurones touch each other. They are separated by a synaptic gap crossed chemically by a neurotransmitter.',
                'Mixing up receptor and effector. The receptor detects the stimulus; the effector (muscle or gland) carries out the response.',
              ],
              examTips: [
                'Write the reflex arc as an ordered sequence with arrows. Marks are given for the correct order, and a jumbled list loses them.',
                'Always name the effector specifically — "muscle contracts" or "gland secretes" — rather than just writing "the body reacts".',
              ],
              workedExamples: [
                {
                  prompt: 'Describe the pathway of a reflex action when a person steps on a sharp object.',
                  steps: ['The sharp object is the stimulus, detected by pain receptors in the skin of the foot.', 'A sensory neurone carries the impulse to a relay neurone in the spinal cord.', 'A motor neurone carries the impulse to the leg muscle.', 'The muscle (effector) contracts, lifting the foot away.'],
                  answer: 'Stimulus → receptor in skin → sensory neurone → relay neurone in spinal cord → motor neurone → leg muscle (effector) → foot lifts away.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What makes up the CNS?', back: 'The brain and the spinal cord.', difficulty: 'EASY' },
            { front: 'Give the reflex arc in order.', back: 'Stimulus → receptor → sensory neurone → relay neurone → motor neurone → effector → response.', difficulty: 'HARD' },
            { front: 'What is a synapse?', back: 'A junction between two neurones where a neurotransmitter diffuses across the gap to pass the impulse on.', difficulty: 'MEDIUM' },
            { front: 'Why is a reflex action fast?', back: 'It does not involve conscious thought — the pathway goes through the spinal cord rather than the brain.', difficulty: 'MEDIUM' },
            { front: 'What is an effector?', back: 'A muscle or gland that carries out the response.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why reflex actions are important for survival. [2]',
              answer:
                'Reflex actions are very rapid because the impulse does not travel to the brain for a conscious decision, passing instead through the spinal cord. This speed means the body can move away from danger, such as a hot or sharp object, before serious damage is done.',
              markScheme: [
                'They are rapid / automatic, not involving conscious thought (1)',
                'This protects the body from damage, e.g. moving away from a harmful stimulus quickly (1)',
              ],
              marks: 2,
              explanation:
                'The survival argument rests entirely on speed, and the speed comes from bypassing the brain — that causal link is what the marks reward.',
            },
          ],
        },
        {
          number: '14.2',
          slug: 'hormones-and-homeostasis',
          title: 'Hormones and homeostasis',
          summary: 'Chemical coordination, blood glucose control and negative feedback.',
          prerequisites: ['14.1'],
          objectives: [
            { code: '14.2.1', statement: 'Define a hormone and compare nervous and hormonal control.', tier: 'CORE' },
            { code: '14.2.2', statement: 'Explain homeostasis, including the control of blood glucose by insulin.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'hormones-and-homeostasis',
              title: 'Hormones and homeostasis',
              readingMinutes: 6,
              body: `A **hormone** is a chemical substance produced by a **gland**, carried by the **blood**, which alters the activity of one or more specific **target organs**.
### Nervous versus hormonal control
| | Nervous | Hormonal |
|---|---|---|
| Transmitted by | electrical impulses along neurones | chemicals in the blood |
| Speed | very fast | slower |
| Duration | short-lived | longer-lasting |
| Target | precise, localised | widespread target organs |
**Adrenaline** illustrates the hormonal route: released from the adrenal glands when frightened, it increases heart rate and breathing rate and diverts blood to the muscles — the "fight or flight" response.
### Homeostasis
**Homeostasis** is the maintenance of a constant internal environment. Body temperature, blood glucose and water content are all held within narrow limits, because enzymes only work properly within them.
### Negative feedback
The control mechanism always follows the same loop: a change away from the norm is **detected**, a response is triggered that **counteracts** the change, and conditions return to normal — at which point the response stops.
### Blood glucose control
- Blood glucose **too high** (after a meal) → the **pancreas** releases **insulin** → the **liver** converts excess glucose into **glycogen** for storage → blood glucose falls.
- Blood glucose **too low** → the pancreas releases **glucagon** → the liver converts glycogen back into glucose → blood glucose rises.
In **type 1 diabetes** the pancreas produces insufficient insulin, so blood glucose can rise dangerously high. It is treated with insulin injections and by managing diet.`,
              analogy: 'Negative feedback is a thermostat. It does not aim to make the room a particular temperature and stop caring — it constantly notices deviation and pushes back the other way, which is why the temperature stays steady rather than drifting.',
              misconceptions: [
                'Thinking homeostasis means nothing changes. Conditions fluctuate constantly; homeostasis keeps them oscillating within narrow limits.',
                'Confusing glycogen (animal storage carbohydrate in the liver) with glucagon (the hormone) — the names differ by one letter and cost marks every year.',
                'Believing insulin "removes" glucose. It causes the liver to convert glucose to glycogen for storage.',
              ],
              examTips: [
                'Blood glucose answers should name three things: the stimulus (high or low glucose), the hormone, and the effect on the liver.',
                'When comparing nervous and hormonal control, give speed and duration — they are the two contrasts marked most often.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain how blood glucose concentration is brought back to normal after a meal high in carbohydrate.',
                  steps: ['Digestion produces glucose, which is absorbed into the blood, raising blood glucose above normal.', 'The pancreas detects the rise and secretes insulin into the blood.', 'Insulin travels to the liver, which converts excess glucose into glycogen for storage.', 'Blood glucose concentration falls back to normal, and insulin secretion decreases.'],
                  answer: 'The pancreas detects the rise and releases insulin, which causes the liver to convert excess glucose into glycogen, lowering blood glucose back to normal — an example of negative feedback.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define a hormone.', back: 'A chemical made by a gland, carried in the blood, which alters the activity of specific target organs.', difficulty: 'MEDIUM' },
            { front: 'Define homeostasis.', back: 'The maintenance of a constant internal environment.', difficulty: 'MEDIUM' },
            { front: 'Which hormone lowers blood glucose, and how?', back: 'Insulin — it causes the liver to convert excess glucose into glycogen.', difficulty: 'HARD' },
            { front: 'Which hormone raises blood glucose?', back: 'Glucagon, which causes the liver to convert glycogen back into glucose.', difficulty: 'HARD' },
            { front: 'Give two differences between nervous and hormonal control.', back: 'Nervous is fast and short-lived via neurones; hormonal is slower and longer-lasting via the blood.', difficulty: 'HARD' },
            { front: 'What causes type 1 diabetes?', back: 'The pancreas produces too little insulin, so blood glucose is not lowered properly.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Blood glucose concentration rises after a meal. Which sequence describes the response?',
              options: [
                { id: 'a', text: 'Pancreas releases insulin → liver converts glucose to glycogen → blood glucose falls', why: '' },
                { id: 'b', text: 'Pancreas releases glucagon → liver converts glycogen to glucose → blood glucose falls', why: 'Glucagon raises blood glucose; it is released when glucose is low, not high.' },
                { id: 'c', text: 'Liver releases insulin → pancreas stores glycogen → blood glucose falls', why: 'The pancreas makes insulin and the liver stores glycogen, not the other way round.' },
                { id: 'd', text: 'Pancreas releases adrenaline → muscles absorb glucose → blood glucose falls', why: 'Adrenaline is made in the adrenal glands and raises blood glucose.' },
              ],
              answer: 'a',
              markScheme: ['Pancreas → insulin → liver converts glucose to glycogen → blood glucose falls (1)'],
              marks: 1,
              explanation:
                'Keep the pair straight by the first letters: insulin is released when glucose is **i**ncreased. Glucagon does the opposite job.',
            },
          ],
        },
        {
          number: '14.3',
          slug: 'the-eye',
          title: 'Sense organs — the eye',
          summary: 'Structure of the eye, and the pupil and accommodation reflexes.',
          prerequisites: ['14.1'],
          objectives: [
            { code: '14.3.1', statement: 'Identify the structures of the eye and describe the pupil reflex and accommodation.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'the-eye',
              title: 'Sense organs — the eye',
              readingMinutes: 6,
              body: `The eye is a **sense organ**: a group of receptor cells responding to one stimulus, here **light**.
### The structures
- **Cornea** — transparent front layer; does most of the **refraction** (bending) of light.
- **Iris** — the coloured ring of muscle controlling pupil size.
- **Pupil** — the hole letting light in (not a structure, but a gap).
- **Lens** — **fine-focuses** light onto the retina; its shape can change.
- **Retina** — contains light receptors: **rods** (dim light, no colour) and **cones** (colour, bright light).
- **Fovea** — the region of the retina with the highest concentration of cones, giving sharpest vision.
- **Optic nerve** — carries impulses to the brain.
- **Blind spot** — where the optic nerve leaves; no receptors, so no image forms there.
### The pupil reflex
In **bright** light: circular muscles of the iris **contract**, radial muscles relax, the pupil **constricts**, and less light enters — protecting the retina from damage.
In **dim** light: radial muscles contract, circular muscles relax, the pupil **dilates**, letting more light in.
This is a **reflex**, so it is automatic and rapid. The two muscle types are **antagonistic** — one contracts as the other relaxes.
### Accommodation — focusing
- **Near object**: ciliary muscles **contract**, suspensory ligaments **slacken**, and the lens becomes **fatter** (more curved), refracting light more strongly.
- **Distant object**: ciliary muscles **relax**, suspensory ligaments **pull tight**, and the lens becomes **thinner**, refracting light less.
The counter-intuitive part is that the ligaments slacken when the muscle contracts — because the ciliary muscle forms a ring, contracting it reduces the ring's diameter and releases the tension.`,
              analogy: 'The iris is a camera aperture and the lens is the focus ring. Accommodation is not moving the lens back and forth as a camera does — the eye changes the lens\'s *shape* instead.',
              misconceptions: [
                'Thinking the lens does most of the focusing. The **cornea** does most of the refraction; the lens fine-tunes it.',
                'Getting accommodation backwards. For a **near** object the lens becomes **fatter**, not thinner.',
                'Believing the pupil itself changes size actively. The pupil is a hole — the **iris muscles** change it.',
              ],
              examTips: [
                'For accommodation, state all three changes together: ciliary muscle, suspensory ligaments, and lens shape.',
                'For the pupil reflex, name both muscle types and say which contracts — "circular muscles contract" is the marking point, not just "the pupil gets smaller".',
              ],
              workedExamples: [
                {
                  prompt: 'Describe what happens in the eye when a person moves from a dark room into bright sunlight.',
                  steps: ['Light receptors detect the increase in light intensity.', 'This is a reflex, so the response is automatic.', 'The circular muscles of the iris contract and the radial muscles relax.', 'The pupil constricts, so less light enters and the retina is protected from damage.'],
                  answer: 'Circular iris muscles contract and radial muscles relax, constricting the pupil so less light enters and the retina is not damaged.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which part of the eye does most of the refraction?', back: 'The cornea — the lens only fine-focuses.', difficulty: 'HARD' },
            { front: 'What happens to the iris muscles in bright light?', back: 'Circular muscles contract and radial muscles relax, constricting the pupil.', difficulty: 'MEDIUM' },
            { front: 'What shape is the lens for a near object?', back: 'Fatter and more curved, because the ciliary muscles contract and the ligaments slacken.', difficulty: 'HARD' },
            { front: 'What is the difference between rods and cones?', back: 'Rods work in dim light without colour; cones detect colour in bright light.', difficulty: 'MEDIUM' },
            { front: 'What is the blind spot?', back: 'Where the optic nerve leaves the retina — there are no receptor cells there.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Describe how the eye changes to focus on a nearby object. [3]',
              answer:
                'The ciliary muscles contract, which reduces the diameter of the ciliary ring and causes the suspensory ligaments to slacken. With less tension pulling on it, the lens becomes fatter and more curved. This refracts the light more strongly, bringing the light from the near object to a focus on the retina.',
              markScheme: [
                'Ciliary muscles contract (1)',
                'Suspensory ligaments slacken / lose tension (1)',
                'Lens becomes fatter/more curved, refracting light more (1)',
              ],
              marks: 3,
              explanation:
                'The most common error is stating that the ligaments tighten when the muscle contracts. Because the ciliary muscle is a ring, contraction shrinks the ring and releases tension.',
              hint: 'What happens to the diameter of a ring of muscle when it contracts?',
            },
          ],
        },
        {
          number: '14.4',
          slug: 'tropisms',
          title: 'Tropic responses in plants',
          summary: 'Phototropism, gravitropism and the role of auxin.',
          prerequisites: ['14.1'],
          objectives: [
            { code: '14.4.1', statement: 'Describe phototropism and gravitropism and explain the role of auxin.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'tropisms',
              title: 'Tropic responses in plants',
              readingMinutes: 5,
              body: `Plants respond to stimuli by **growing**, which is slower than an animal's movement but achieves the same end.
### The definitions
A **tropism** is a growth response in which the **direction** of growth is determined by the direction of the stimulus.
- **Phototropism** — response to **light**. Shoots are **positively** phototropic (grow towards light); roots are negatively phototropic.
- **Gravitropism (geotropism)** — response to **gravity**. Roots are **positively** gravitropic (grow downwards); shoots are negatively gravitropic.
"Positive" means growing **towards** the stimulus, "negative" means away.
### Why these responses help
A shoot growing towards light reaches more light for **photosynthesis**. A root growing downwards reaches **water and mineral ions** and anchors the plant.
### The role of auxin
**Auxin** is a plant hormone made at the shoot tip that stimulates **cell elongation**.
When light comes from one side:
1. Auxin moves to the **shaded** side of the shoot.
2. A higher auxin concentration there makes those cells **elongate more**.
3. The shaded side grows longer than the lit side, so the shoot **bends towards the light**.
The bending is caused by **unequal growth**, not by the plant "turning".
### The root behaves oppositely
In roots, a high auxin concentration **inhibits** elongation. So on the lower side of a horizontal root, accumulated auxin slows growth there, the upper side grows faster, and the root bends **downwards**. The same hormone produces opposite effects in the two organs, which is exactly what makes this a favourite exam question.`,
              analogy: 'A shoot bends towards light the way a marching column turns when the outside rank takes longer strides. Nobody steers — one side simply grows more than the other.',
              misconceptions: [
                'Thinking the plant "moves" towards light. It **grows** unequally; no existing tissue relocates.',
                'Assuming auxin accumulates on the lit side. It moves to the **shaded** side.',
                'Applying the shoot rule to roots. In roots, high auxin **inhibits** elongation, producing the opposite bend.',
              ],
              examTips: [
                'Always name the direction of the stimulus and the side auxin moves to before describing the bend — those are the marking points.',
                'State the benefit if asked "why is this an advantage": more light for photosynthesis, or reaching water and anchorage.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a shoot grows towards a light source coming from one side.',
                  steps: ['Auxin is produced at the shoot tip.', 'Light causes auxin to move to the shaded side of the shoot.', 'The higher auxin concentration there stimulates greater cell elongation on that side.', 'The shaded side therefore grows longer than the lit side, bending the shoot towards the light.'],
                  answer: 'Auxin accumulates on the shaded side, where it stimulates more cell elongation, so that side grows longer and the shoot bends towards the light.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define a tropism.', back: 'A growth response in which the direction of growth is determined by the direction of the stimulus.', difficulty: 'MEDIUM' },
            { front: 'Are shoots positively or negatively phototropic?', back: 'Positively — they grow towards light.', difficulty: 'EASY' },
            { front: 'Are roots positively or negatively gravitropic?', back: 'Positively — they grow downwards, towards gravity.', difficulty: 'MEDIUM' },
            { front: 'Which side of a shoot does auxin move to in one-sided light?', back: 'The shaded side.', difficulty: 'HARD' },
            { front: 'What does auxin do in shoots and in roots?', back: 'In shoots it stimulates cell elongation; in roots high concentrations inhibit it.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain the advantage to a plant of its roots being positively gravitropic. [2]',
              answer:
                'Growing downwards in the direction of gravity means the roots grow deeper into the soil, where they can absorb water and mineral ions needed for growth. Deeper roots also anchor the plant firmly so it is not easily blown over or washed away.',
              markScheme: [
                'Roots grow down into the soil to reach water and mineral ions (1)',
                'Provides anchorage and stability for the plant (1)',
              ],
              marks: 2,
              explanation:
                'Both marks are for the biological benefit, not the mechanism. Describing how auxin works would not answer the question asked.',
            },
          ],
        },
      ],
    },
    {
      number: '15',
      slug: 'drugs',
      title: 'Drugs',
      summary: 'Medicinal and recreational drugs, antibiotics and misuse.',
      subtopics: [
        {
          number: '15.1',
          slug: 'drugs-and-antibiotics',
          title: 'Drugs, antibiotics and resistance',
          summary: 'How antibiotics work, and why resistance develops.',
          prerequisites: ['10.1'],
          objectives: [
            { code: '15.1.1', statement: 'Define a drug, describe the use of antibiotics, and explain the development of resistant bacteria.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'drugs-and-antibiotics',
              title: 'Drugs, antibiotics and resistance',
              readingMinutes: 5,
              body: `A **drug** is any substance taken into the body that modifies or affects chemical reactions in the body.
### Antibiotics
**Antibiotics** kill or stop the growth of **bacteria**. They have no effect whatsoever on **viruses**, because viruses reproduce inside your own cells and lack the bacterial structures antibiotics attack. Taking antibiotics for a cold or flu is useless.
### How resistance develops
This is a direct example of natural selection, and the sequence matters:
1. Within a bacterial population there is **variation** — by chance, a few bacteria carry a mutation making them resistant.
2. When antibiotic is used, the non-resistant bacteria are killed.
3. The **resistant** ones survive and **reproduce**, passing on the resistance allele.
4. Over time the whole population becomes resistant, and the antibiotic no longer works.
The crucial point: the antibiotic does **not create** resistance. The mutation was already there by chance; the antibiotic merely selects for it.
### Reducing the problem
Only prescribe antibiotics when genuinely needed, **complete the full course** even after feeling better (so surviving bacteria are not left to breed), and avoid routine use in farming.
### Misused drugs
**Alcohol** is a depressant: it slows reaction times, impairs judgement and self-control, and long-term use damages the liver. **Heroin** is highly addictive, and injecting with shared needles risks transmitting HIV.`,
              analogy: 'Antibiotic resistance is a sieve, not a factory. The antibiotic does not manufacture resistant bacteria — it removes everything that is not resistant, leaving the rare survivors to fill the space.',
              misconceptions: [
                'Thinking bacteria "become resistant because of" the antibiotic. Mutation happens randomly beforehand; the antibiotic only selects for survivors.',
                'Believing antibiotics treat viral infections. They do not — this misunderstanding is a major driver of resistance.',
                'Thinking you can stop the course once you feel better. Stopping early leaves the hardier bacteria alive to multiply.',
              ],
              examTips: [
                'Answer resistance questions with the four-step natural-selection sequence: variation → selection pressure → survival and reproduction → allele frequency increases.',
                'Never write that bacteria "want" or "try" to become resistant. Mutation is random, and describing it as purposeful loses credit.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain how a population of bacteria can become resistant to an antibiotic.',
                  steps: ['Random mutation means a small number of bacteria in the population are already resistant.', 'When the antibiotic is used, the non-resistant bacteria are killed.', 'The resistant bacteria survive and reproduce, passing on the resistance allele.', 'Over generations the proportion of resistant bacteria increases until the antibiotic is ineffective.'],
                  answer: 'Random mutation produces a few resistant bacteria. The antibiotic kills the rest, so only the resistant survive and reproduce, and resistance spreads through the population by natural selection.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define a drug.', back: 'Any substance taken into the body that modifies or affects chemical reactions in the body.', difficulty: 'MEDIUM' },
            { front: 'Why do antibiotics not work on viruses?', back: 'Viruses reproduce inside the body\'s own cells and lack the bacterial structures antibiotics target.', difficulty: 'MEDIUM' },
            { front: 'Why must you finish a course of antibiotics?', back: 'To kill all the bacteria — stopping early leaves the most resistant ones alive to multiply.', difficulty: 'MEDIUM' },
            { front: 'Does an antibiotic cause resistance?', back: 'No. Resistance arises by random mutation; the antibiotic only selects for bacteria that already have it.', difficulty: 'HARD' },
            { front: 'What type of drug is alcohol?', back: 'A depressant — it slows reactions and impairs judgement and self-control.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A doctor prescribes an antibiotic for a patient with a cold. Explain why this is unhelpful and may be harmful. [3]',
              answer:
                'A cold is caused by a virus, and antibiotics only kill bacteria, so the antibiotic will not treat the illness at all. Meanwhile it kills non-resistant bacteria elsewhere in the body, leaving any bacteria that happen to carry a resistance mutation to survive and reproduce. This increases the proportion of resistant bacteria in the population, making the antibiotic less effective when it is genuinely needed.',
              markScheme: [
                'A cold is viral and antibiotics have no effect on viruses (1)',
                'Unnecessary use kills non-resistant bacteria, selecting for resistant ones (1)',
                'Resistant bacteria reproduce, so resistance spreads and the antibiotic becomes less useful in future (1)',
              ],
              marks: 3,
              explanation:
                'This question links two topics — pathogen type and natural selection. The harm is not to the individual patient so much as to everyone who needs that antibiotic later.',
              hint: 'What causes a cold, and what does the antibiotic do to the bacteria that are present anyway?',
            },
          ],
        },
      ],
    },
    {
      number: '16',
      slug: 'reproduction',
      title: 'Reproduction',
      summary: 'Asexual and sexual reproduction in plants and humans.',
      subtopics: [
        {
          number: '16.1',
          slug: 'asexual-and-sexual-reproduction',
          title: 'Asexual and sexual reproduction',
          summary: 'The two strategies, and the advantages of each.',
          objectives: [
            { code: '16.1.1', statement: 'Define asexual and sexual reproduction and discuss the advantages and disadvantages of each.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'asexual-and-sexual-reproduction',
              title: 'Asexual and sexual reproduction',
              readingMinutes: 5,
              body: `### Definitions
**Asexual reproduction** is the process resulting in genetically identical offspring from **one parent**. No gametes are involved, and the offspring are **clones**.
**Sexual reproduction** is the process involving the **fusion of the nuclei of two gametes** (sex cells) to form a **zygote**, producing genetically **different** offspring.
### The trade-off
Everything about this topic follows from one fact: asexual reproduction produces no variation, sexual reproduction does.
**Asexual advantages** — only one parent is needed, so no mate is required; it is fast; and all the good characteristics of the parent are kept exactly.
**Asexual disadvantage** — no genetic variation, so if the environment changes or a new disease appears, the whole population is equally vulnerable. There is nothing for natural selection to work with.
**Sexual advantages** — variation means some offspring may survive a change in conditions or resist a new disease, and variation is the raw material for natural selection and selective breeding.
**Sexual disadvantages** — two parents are usually needed, it is slower, and useful parental combinations are broken up.
### Where variation comes from
In sexual reproduction, gametes are made by **meiosis**, which halves the chromosome number and shuffles the genetic material. Fertilisation then combines two different sets at random, so no two offspring (other than identical twins) are alike.`,
              analogy: 'Asexual reproduction is photocopying; sexual reproduction is remixing. Photocopies are fast and faithful — but if the original has a flaw, every copy shares it, and none of them can adapt.',
              misconceptions: [
                'Thinking variation in asexual offspring can arise "sometimes". Barring rare mutation, offspring are genetically identical clones.',
                'Believing sexual reproduction is simply "better". It is slower and needs a mate; in a stable environment asexual reproduction is often more efficient.',
                'Defining sexual reproduction as needing two parents rather than as the **fusion of gamete nuclei** — the fusion is the defining feature.',
              ],
              examTips: [
                'Learn both definitions word for word: "genetically identical offspring from one parent" and "fusion of the nuclei of two gametes to form a zygote".',
                'When asked for advantages, always tie variation to a consequence — surviving disease or environmental change — rather than just saying "there is variation".',
              ],
              workedExamples: [
                {
                  prompt: 'A farmer grows a field of genetically identical potato plants produced asexually. Explain the risk of this.',
                  steps: ['Asexual reproduction produces clones with no genetic variation.', 'If a new disease appears that one plant is susceptible to, all the plants are equally susceptible.', 'There is no resistant variation in the population, so the entire crop could be destroyed.'],
                  answer: 'All the plants are genetically identical, so if a disease affects one it can affect all of them — with no variation, none will be resistant, risking total crop loss.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define asexual reproduction.', back: 'A process resulting in genetically identical offspring from one parent.', difficulty: 'MEDIUM' },
            { front: 'Define sexual reproduction.', back: 'A process involving the fusion of the nuclei of two gametes to form a zygote, producing genetically different offspring.', difficulty: 'HARD' },
            { front: 'Give one advantage of asexual reproduction.', back: 'Only one parent needed (no mate), it is fast, and desirable characteristics are passed on exactly.', difficulty: 'MEDIUM' },
            { front: 'Give one advantage of sexual reproduction.', back: 'Genetic variation means some offspring may survive environmental change or resist new diseases.', difficulty: 'MEDIUM' },
            { front: 'What is a zygote?', back: 'The cell formed when the nuclei of two gametes fuse at fertilisation.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why genetic variation produced by sexual reproduction is an advantage to a species. [2]',
              answer:
                'Sexual reproduction produces offspring that are genetically different from each other. If the environment changes or a new disease appears, some individuals are likely to have characteristics that allow them to survive, and they can reproduce and pass those characteristics on, so the species continues.',
              markScheme: [
                'Offspring show genetic variation / are genetically different (1)',
                'Some are likely to survive environmental change or disease and reproduce (1)',
              ],
              marks: 2,
              explanation:
                'Variation itself is not the advantage — the advantage is that variation makes it likely *someone* survives a change that would otherwise wipe out an identical population.',
            },
          ],
        },
        {
          number: '16.2',
          slug: 'reproduction-in-plants',
          title: 'Sexual reproduction in plants',
          summary: 'Flower structure, pollination, fertilisation and seed dispersal.',
          prerequisites: ['16.1'],
          objectives: [
            { code: '16.2.1', statement: 'Identify the parts of a flower and describe pollination and fertilisation.', tier: 'CORE' },
            { code: '16.2.2', statement: 'Compare insect-pollinated and wind-pollinated flowers.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'reproduction-in-plants',
              title: 'Sexual reproduction in plants',
              readingMinutes: 6,
              body: `### Parts of a flower
**Male parts (stamen)**: the **anther** produces pollen; the **filament** holds it up.
**Female parts (carpel)**: the **stigma** receives pollen; the **style** connects it to the **ovary**, which contains the **ovules**.
Also: **petals** (attract insects), **sepals** (protect the bud).
### Pollination versus fertilisation
These are different events and the distinction is examined constantly:
- **Pollination** is the **transfer of pollen** from anther to stigma.
- **Fertilisation** is the **fusion of the pollen nucleus with the ovule nucleus**, which happens later, after a pollen tube grows down the style.
Pollination is transport; fertilisation is fusion.
### Self versus cross pollination
- **Self-pollination** — pollen lands on the stigma of the same plant. Produces less variation, but does not need another plant.
- **Cross-pollination** — pollen transfers to a different plant of the same species. Produces **more genetic variation**, which is the advantage.
### Insect versus wind pollination
| | Insect-pollinated | Wind-pollinated |
|---|---|---|
| Petals | large, brightly coloured, scented | small, green, no scent |
| Nectar | present | absent |
| Anthers | inside the flower | hanging outside, exposed |
| Stigma | inside, sticky | outside, large and feathery |
| Pollen | sticky or spiky, small amounts | smooth and light, large amounts |
Every difference follows from the mechanism: insects must be attracted and must brush past the parts, whereas wind requires exposure and sheer quantity.
### After fertilisation
The **ovule becomes the seed**, and the **ovary becomes the fruit**. Seeds are then dispersed — by wind, animals, water or explosive mechanisms — so that seedlings do not compete with the parent plant for light, water and minerals.`,
              analogy: 'Insect pollination is a courier with an address; wind pollination is dropping thousands of leaflets from a rooftop. One invests in precision, the other in volume — which explains every structural difference between the flowers.',
              misconceptions: [
                'Using pollination and fertilisation interchangeably. Pollination is transfer; fertilisation is nuclear fusion afterwards.',
                'Thinking wind-pollinated plants have no flowers. They have flowers, but small, green and unscented ones — there is nothing to attract.',
                'Saying the ovary becomes the seed. The **ovule** becomes the seed; the **ovary** becomes the fruit.',
              ],
              examTips: [
                'When comparing pollination types, give the feature **and** the reason: "feathery stigma **to** catch pollen blowing past".',
                'For dispersal questions, state the benefit: reduced competition with the parent plant for light, water and minerals.',
              ],
              workedExamples: [
                {
                  prompt: 'A flower has small green petals, no scent, anthers hanging outside and a large feathery stigma. How is it pollinated, and how do you know?',
                  steps: ['Small green unscented petals and no nectar mean insects are not attracted.', 'Anthers hanging outside allow pollen to be blown away easily.', 'A large feathery stigma has a big surface area to catch pollen carried in the air.'],
                  answer: 'It is wind-pollinated — the exposed anthers and feathery stigma are adaptations for releasing and catching airborne pollen, and there is nothing to attract insects.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define pollination.', back: 'The transfer of pollen from the anther to the stigma.', difficulty: 'MEDIUM' },
            { front: 'Define fertilisation in a plant.', back: 'The fusion of the pollen nucleus with the ovule nucleus.', difficulty: 'MEDIUM' },
            { front: 'What do the ovule and ovary become?', back: 'The ovule becomes the seed; the ovary becomes the fruit.', difficulty: 'HARD' },
            { front: 'Give two features of a wind-pollinated flower.', back: 'Exposed anthers and a large feathery stigma; also small green petals and no nectar.', difficulty: 'MEDIUM' },
            { front: 'What is the advantage of cross-pollination?', back: 'It produces greater genetic variation in the offspring.', difficulty: 'MEDIUM' },
            { front: 'Why is seed dispersal important?', back: 'It reduces competition between seedlings and the parent plant for light, water and minerals.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain the difference between pollination and fertilisation in a flowering plant. [2]',
              answer:
                'Pollination is the transfer of pollen grains from the anther to the stigma, which is simply the movement of pollen. Fertilisation occurs afterwards, when a pollen tube has grown down the style and the nucleus from the pollen grain fuses with the nucleus of the ovule.',
              markScheme: [
                'Pollination is the transfer of pollen from anther to stigma (1)',
                'Fertilisation is the fusion of the pollen nucleus with the ovule nucleus (1)',
              ],
              marks: 2,
              explanation:
                'Pollination can occur without fertilisation following — for example if the pollen is from a different species. That is why they must be defined separately.',
            },
          ],
        },
        {
          number: '16.3',
          slug: 'reproduction-in-humans',
          title: 'Sexual reproduction in humans',
          summary: 'Gametes, fertilisation, pregnancy and the role of hormones.',
          prerequisites: ['16.1'],
          objectives: [
            { code: '16.3.1', statement: 'Describe fertilisation, the development of the fetus and the function of the placenta.', tier: 'CORE' },
            { code: '16.3.2', statement: 'Describe the menstrual cycle and the roles of oestrogen and progesterone.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'reproduction-in-humans',
              title: 'Sexual reproduction in humans',
              readingMinutes: 6,
              body: `### The gametes
- **Sperm** — small, motile, with a **tail** for swimming and **many mitochondria** for energy. Produced in vast numbers.
- **Egg (ovum)** — much larger, non-motile, containing **food stores (yolk)** for the early embryo.
The size difference is the point: the egg supplies resources, the sperm supplies mobility.
### Fertilisation
**Fertilisation** is the fusion of the sperm nucleus with the egg nucleus, forming a **zygote**. It occurs in the **oviduct** (fallopian tube), not the uterus.
The zygote divides by **mitosis** to form an embryo, which travels to the uterus and **implants** in the thickened uterus lining.
### The placenta
The organ of exchange between mother and fetus. Their blood **does not mix**; instead materials diffuse across a thin barrier with a very large surface area.
- **To the fetus**: oxygen, glucose, amino acids, antibodies.
- **From the fetus**: carbon dioxide and urea.
Why blood must not mix: the mother's blood pressure would damage fetal vessels, blood groups may differ, and it limits pathogen transfer.
The **umbilical cord** connects fetus to placenta, and the **amniotic fluid** cushions the fetus against physical damage.
### The menstrual cycle
Roughly 28 days, controlled by hormones:
- **Oestrogen** — from the ovaries, **repairs and thickens** the uterus lining, and triggers ovulation.
- **Progesterone** — **maintains** the uterus lining. When it falls, the lining breaks down and menstruation begins.
- **Ovulation** — release of an egg, around day 14.
The pattern to remember: oestrogen builds, progesterone maintains, and withdrawal of progesterone triggers the period.`,
              analogy: 'The placenta is a service interface, not a merger: two separate blood supplies run close enough to trade goods across a membrane, but never join — much like passing parcels through a hatch rather than opening the door.',
              misconceptions: [
                'Thinking fertilisation happens in the uterus. It occurs in the **oviduct**; implantation happens in the uterus.',
                'Believing maternal and fetal blood mix in the placenta. They stay separate and exchange by diffusion.',
                'Confusing the hormone roles — oestrogen builds the lining, progesterone maintains it.',
              ],
              examTips: [
                'For placenta questions, always state "large surface area and thin barrier for diffusion" plus "blood does not mix".',
                'For hormone questions, link the falling level of progesterone to the start of menstruation — that causal step is a mark.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain how the placenta allows the fetus to receive oxygen without the two blood supplies mixing.',
                  steps: ['The placenta has villi giving a very large surface area for exchange.', 'The barrier between maternal and fetal blood is very thin, giving a short diffusion distance.', 'Oxygen concentration is higher in the mother\'s blood, so oxygen diffuses down its concentration gradient into fetal blood.', 'The two circulations remain separate throughout, so only dissolved substances cross.'],
                  answer: 'Oxygen diffuses across a thin, large-surface-area barrier from the mother\'s blood, where its concentration is higher, into the fetal blood — the two blood supplies stay separate.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Where does fertilisation occur in humans?', back: 'In the oviduct (fallopian tube).', difficulty: 'MEDIUM' },
            { front: 'Give two adaptations of a sperm cell.', back: 'A tail for swimming and many mitochondria to release energy for movement.', difficulty: 'MEDIUM' },
            { front: 'What passes from mother to fetus across the placenta?', back: 'Oxygen, glucose, amino acids and antibodies.', difficulty: 'MEDIUM' },
            { front: 'Why must maternal and fetal blood not mix?', back: 'The mother\'s blood pressure would damage fetal vessels, blood groups may differ, and it limits pathogen transfer.', difficulty: 'HARD' },
            { front: 'What does progesterone do?', back: 'Maintains the uterus lining; when it falls, the lining breaks down and menstruation begins.', difficulty: 'HARD' },
            { front: 'What is the function of amniotic fluid?', back: 'It cushions and protects the fetus from physical damage.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Describe two ways the placenta is adapted for the exchange of substances between mother and fetus. [2]',
              answer:
                'The placenta has villi that project into the uterus lining, giving a very large surface area over which substances can diffuse. The barrier separating maternal and fetal blood is only a few cells thick, giving a short diffusion distance so exchange is rapid.',
              markScheme: [
                'Villi give a large surface area for exchange (1)',
                'Thin barrier gives a short diffusion distance (1)',
              ],
              marks: 2,
              explanation:
                'These are the same two adaptations seen in alveoli and the small intestine — surface area and diffusion distance recur wherever exchange happens efficiently.',
            },
          ],
        },
      ],
    },
    {
      number: '17',
      slug: 'inheritance',
      title: 'Inheritance',
      summary: 'Chromosomes, genes, alleles and monohybrid crosses.',
      subtopics: [
        {
          number: '17.1',
          slug: 'genetics-and-monohybrid-inheritance',
          title: 'Genes, alleles and monohybrid inheritance',
          summary: 'The vocabulary of genetics and how to work out a genetic cross.',
          prerequisites: ['16.1'],
          objectives: [
            { code: '17.1.1', statement: 'Define chromosome, gene and allele, and distinguish genotype from phenotype.', tier: 'CORE' },
            { code: '17.1.2', statement: 'Use genetic diagrams and Punnett squares to predict the results of monohybrid crosses.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'genetics-and-monohybrid-inheritance',
              title: 'Genes, alleles and monohybrid inheritance',
              readingMinutes: 6,
              body: `### The vocabulary
Getting these precise is most of the battle:
- **Chromosome** — a thread of DNA, made up of many genes.
- **Gene** — a length of DNA coding for one protein, and so for a characteristic.
- **Allele** — a different version of the same gene, e.g. the allele for brown eyes and the allele for blue eyes.
- **Genotype** — the alleles an organism has, e.g. Bb.
- **Phenotype** — the observable characteristic, e.g. brown eyes.
- **Homozygous** — two identical alleles (BB or bb).
- **Heterozygous** — two different alleles (Bb).
- **Dominant** — an allele expressed even when only one copy is present (capital letter).
- **Recessive** — an allele only expressed when two copies are present (lower case).
### Working a monohybrid cross
Use a **Punnett square** and work methodically:
1. Write the parents' genotypes.
2. Write the gametes each can produce.
3. Combine them in the grid.
4. Read off the genotype ratio, then convert to a phenotype ratio.
For **Bb × Bb**: gametes are B and b from each parent. The grid gives **BB, Bb, Bb, bb** — a genotype ratio of 1:2:1 and a **phenotype ratio of 3 brown : 1 blue**, since BB and Bb both show the dominant phenotype.
### Why recessive conditions can skip generations
Two heterozygous parents (Bb) both show the dominant phenotype but each carry the recessive allele. There is a 1 in 4 chance their child inherits bb and shows the recessive phenotype — which is how a condition can appear in a child whose parents do not have it.`,
              analogy: 'Alleles are two copies of a recipe. A dominant allele is a recipe shouted loudly enough to drown out the other; the quiet recessive recipe is still there and can be passed on, only being heard when both copies are quiet.',
              misconceptions: [
                'Using "gene" when you mean "allele". The gene is for eye colour; the allele is the particular version, brown or blue.',
                'Thinking dominant means "more common". Dominance is about expression when heterozygous, not frequency in a population.',
                'Reading a 3:1 ratio as a guarantee. It is a probability — four children could easily all show the dominant phenotype.',
              ],
              examTips: [
                'Always show the full genetic diagram: parental genotypes, gametes (usually circled), the Punnett square, and the offspring ratio. Marks are given for the working, not just the answer.',
                'Choose sensible letters where the capital and lower case look different — B and b are clear; S and s cause errors when handwritten.',
              ],
              workedExamples: [
                {
                  prompt: 'Two brown-eyed parents, both heterozygous (Bb), have a child. What is the probability the child has blue eyes (bb)?',
                  steps: ['Parents: Bb × Bb.', 'Gametes from each parent: B or b.', 'Punnett square gives BB, Bb, Bb, bb.', 'Only bb gives blue eyes — that is 1 of the 4 equally likely outcomes.'],
                  answer: '1 in 4, or 25%.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define an allele.', back: 'A different version of the same gene.', difficulty: 'MEDIUM' },
            { front: 'Difference between genotype and phenotype?', back: 'Genotype is the alleles present (e.g. Bb); phenotype is the observable characteristic (e.g. brown eyes).', difficulty: 'MEDIUM' },
            { front: 'What does homozygous mean?', back: 'Having two identical alleles for a gene (BB or bb).', difficulty: 'MEDIUM' },
            { front: 'What phenotype ratio results from Bb × Bb?', back: '3 dominant : 1 recessive.', difficulty: 'HARD' },
            { front: 'Define a gene.', back: 'A length of DNA that codes for one protein, and so for a characteristic.', difficulty: 'MEDIUM' },
            { front: 'When is a recessive allele expressed?', back: 'Only when two copies are present (homozygous recessive).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A plant with red flowers (RR) is crossed with a plant with white flowers (rr). Red is dominant. State the genotype and phenotype of the offspring, and explain your answer. [3]',
              answer:
                'All the offspring have the genotype Rr and the phenotype red flowers. The RR parent can only produce gametes carrying R, and the rr parent can only produce gametes carrying r, so every offspring receives one of each and must be heterozygous Rr. Since red is dominant, the single R allele is expressed, so all offspring have red flowers.',
              markScheme: [
                'All offspring are Rr / heterozygous (1)',
                'All have red flowers (1)',
                'Because each parent can only pass on one type of allele, and R is dominant so it is expressed in the heterozygote (1)',
              ],
              marks: 3,
              explanation:
                'A homozygous dominant crossed with a homozygous recessive always gives 100% heterozygous offspring showing the dominant phenotype — the classic F1 generation result.',
              hint: 'What gametes can each parent make if they are homozygous?',
            },
          ],
        },
        {
          number: '17.2',
          slug: 'dna-and-protein-synthesis',
          title: 'DNA and protein synthesis',
          summary: 'The structure of DNA and how genes code for proteins.',
          prerequisites: ['17.1'],
          objectives: [
            { code: '17.2.1', statement: 'Describe the structure of DNA and explain how a gene codes for a protein.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'dna-and-protein-synthesis',
              title: 'DNA and protein synthesis',
              readingMinutes: 6,
              body: `### Structure of DNA
DNA is a **double helix**: two strands twisted around each other, held together by **base pairs**.
There are four bases, and they pair in a fixed way — **complementary base pairing**:
- **A pairs with T**
- **C pairs with G**
So a strand reading \`ATGCC\` has the complementary strand \`TACGG\`.
Because the pairing is fixed, one strand carries all the information needed to rebuild the other, which is what makes accurate copying possible.
### Genes and proteins
A **gene** is a length of DNA that codes for one **protein**. The sequence of bases determines the sequence of **amino acids**, and the amino acid sequence determines the protein's shape and therefore its function.
Each amino acid is coded by a sequence of **three bases**.
### How a protein is made
1. The gene stays in the **nucleus** — DNA is too large to leave.
2. A copy of the gene is made as **mRNA**, which is small enough to pass out through a nuclear pore.
3. The mRNA travels to a **ribosome** in the cytoplasm.
4. The ribosome reads the base sequence in threes and assembles the matching **amino acids** in order.
5. The chain of amino acids folds into a protein.
### Why this matters
Different cells make different proteins because different genes are **switched on**. A muscle cell and a nerve cell contain identical DNA — their difference lies entirely in which genes are expressed.
A **mutation** — a change in the base sequence — can change one amino acid, altering the protein's shape. In an enzyme, that may change the active site so the substrate no longer fits.`,
              analogy: 'DNA is a reference library that cannot be taken out. mRNA is a photocopy of a single page, carried to the workshop (ribosome) where the item is built to that specification.',
              misconceptions: [
                'Thinking DNA leaves the nucleus. It does not — mRNA carries the copy instead.',
                'Believing different cells contain different DNA. They contain the same DNA; different genes are switched on.',
                'Getting base pairing wrong. A pairs with T and C with G — never A with C.',
              ],
              examTips: [
                'For "how does a gene control a characteristic", give the chain: base sequence → amino acid sequence → protein shape → function.',
                'When asked why a mutation matters, link the changed base to a changed amino acid and then to a changed protein shape.',
              ],
              workedExamples: [
                {
                  prompt: 'One strand of DNA reads TACGGA. Write the complementary strand and explain your reasoning.',
                  steps: ['Base pairing is fixed: A pairs with T, and C pairs with G.', 'Take each base in turn: T→A, A→T, C→G, G→C, G→C, A→T.', 'This gives ATGCCT.'],
                  answer: 'ATGCCT — because A always pairs with T and C always pairs with G.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What shape is a DNA molecule?', back: 'A double helix — two strands held together by paired bases.', difficulty: 'EASY' },
            { front: 'Which bases pair together?', back: 'A with T, and C with G.', difficulty: 'EASY' },
            { front: 'What does a gene code for?', back: 'One protein — the base sequence determines the amino acid sequence.', difficulty: 'MEDIUM' },
            { front: 'How many bases code for one amino acid?', back: 'Three.', difficulty: 'MEDIUM' },
            { front: 'Why is mRNA needed?', back: 'DNA is too large to leave the nucleus, so mRNA carries a copy of the gene to the ribosome.', difficulty: 'HARD' },
            { front: 'Why do different cells make different proteins?', back: 'They contain the same DNA but different genes are switched on.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain how a mutation in a gene can stop an enzyme from working. [3]',
              answer:
                'A mutation changes the sequence of bases in the gene, which changes the sequence of amino acids assembled at the ribosome. Since the amino acid sequence determines how the protein folds, the enzyme takes on a different three-dimensional shape. If this alters the shape of the active site, the substrate can no longer fit into it, so no enzyme-substrate complexes form and the enzyme cannot catalyse its reaction.',
              markScheme: [
                'Mutation changes the base sequence, so the amino acid sequence changes (1)',
                'The protein folds into a different shape (1)',
                'The active site shape changes so the substrate no longer fits (1)',
              ],
              marks: 3,
              explanation:
                'This question links three topics — DNA, proteins and enzymes. The marks follow the causal chain, so each step must be stated explicitly.',
              hint: 'Follow the chain: bases → amino acids → shape → active site.',
            },
          ],
        },
        {
          number: '17.3',
          slug: 'mitosis-and-meiosis',
          title: 'Mitosis and meiosis',
          summary: 'The two types of cell division and what each is for.',
          prerequisites: ['17.1'],
          objectives: [
            { code: '17.3.1', statement: 'Describe mitosis and meiosis and state their roles.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'mitosis-and-meiosis',
              title: 'Mitosis and meiosis',
              readingMinutes: 5,
              body: `Both are cell division, but they serve opposite purposes — one preserves the genome, the other shuffles it.
### Mitosis
Produces **two genetically identical** daughter cells, each with the **same** chromosome number as the parent (**diploid**).
Used for **growth**, **repair** of damaged tissue, **replacement** of worn-out cells, and **asexual reproduction**.
Before division, the DNA is **replicated exactly**, so each daughter cell receives a complete identical copy.
### Meiosis
Produces **four genetically different** cells, each with **half** the chromosome number (**haploid**). Used **only** to make **gametes**.
Two features generate variation:
- Chromosomes are **shuffled** so each gamete gets a different combination.
- Which gamete fuses at fertilisation is **random**.
### Why halving is essential
If gametes were diploid, fertilisation would double the chromosome number every generation. Meiosis halves it so that fusion of two haploid gametes restores the **normal diploid** number — 46 in humans, from two gametes of 23.
### Comparison
| | Mitosis | Meiosis |
|---|---|---|
| Daughter cells | 2 | 4 |
| Genetically | identical | different |
| Chromosome number | same (diploid) | halved (haploid) |
| Purpose | growth, repair, asexual reproduction | gamete formation |
The link to earlier work: mitosis produces **clones**, which is why asexual reproduction gives no variation; meiosis is one of the two sources of variation in sexual reproduction.`,
              analogy: 'Mitosis is photocopying a document — two identical copies. Meiosis is dealing a shuffled deck into four hands, each holding half the cards and no two alike.',
              misconceptions: [
                'Thinking meiosis produces two cells. It produces **four**, each haploid.',
                'Believing mitosis creates variation. It produces genetically identical cells; only mutation introduces change.',
                'Saying gametes are diploid. They are **haploid** — that is the entire point of meiosis.',
              ],
              examTips: [
                'If a question mentions growth, repair or asexual reproduction, the answer is mitosis. If it mentions gametes or variation, it is meiosis.',
                'For "why must gametes be haploid", state that fertilisation would otherwise double the chromosome number each generation.',
              ],
              workedExamples: [
                {
                  prompt: 'Human body cells contain 46 chromosomes. State the number in a human sperm cell and explain why.',
                  steps: ['Sperm are gametes, produced by meiosis.', 'Meiosis halves the chromosome number, producing haploid cells.', 'Half of 46 is 23.', 'At fertilisation, 23 from the sperm and 23 from the egg restore the diploid number of 46.'],
                  answer: '23 — meiosis halves the chromosome number so that fertilisation restores the normal diploid number of 46.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How many cells does mitosis produce, and are they identical?', back: 'Two, genetically identical to each other and to the parent cell.', difficulty: 'EASY' },
            { front: 'How many cells does meiosis produce?', back: 'Four, all genetically different and haploid.', difficulty: 'MEDIUM' },
            { front: 'What is mitosis used for?', back: 'Growth, repair, replacement of cells, and asexual reproduction.', difficulty: 'MEDIUM' },
            { front: 'What is meiosis used for?', back: 'Producing gametes.', difficulty: 'MEDIUM' },
            { front: 'Why must gametes be haploid?', back: 'So fertilisation restores the diploid number rather than doubling it each generation.', difficulty: 'HARD' },
            { front: 'What do diploid and haploid mean?', back: 'Diploid has the full chromosome number; haploid has half.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which process produces cells used for the repair of damaged tissue?',
              options: [
                { id: 'a', text: 'Mitosis, because it produces genetically identical diploid cells', why: '' },
                { id: 'b', text: 'Meiosis, because it produces four cells', why: 'Meiosis produces haploid gametes, which cannot replace body cells.' },
                { id: 'c', text: 'Meiosis, because the cells are genetically different', why: 'Repair requires identical replacement cells, not varied ones.' },
                { id: 'd', text: 'Fertilisation', why: 'Fertilisation is the fusion of gametes, not a form of cell division for repair.' },
              ],
              answer: 'a',
              markScheme: ['Mitosis — genetically identical diploid cells for repair (1)'],
              marks: 1,
              explanation:
                'Repair needs replacement cells identical to those lost. Haploid, genetically varied cells from meiosis would be useless for rebuilding a tissue.',
            },
          ],
        },
      ],
    },
    {
      number: '18',
      slug: 'variation-and-selection',
      title: 'Variation and selection',
      summary: 'Variation, mutation, natural selection and selective breeding.',
      subtopics: [
        {
          number: '18.1',
          slug: 'natural-and-artificial-selection',
          title: 'Natural selection and selective breeding',
          summary: 'How adaptation arises naturally, and how humans direct it.',
          prerequisites: ['17.1'],
          objectives: [
            { code: '18.1.1', statement: 'Describe variation and mutation as the source of genetic variation.', tier: 'CORE' },
            { code: '18.1.2', statement: 'Explain natural selection and compare it with selective breeding.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'natural-and-artificial-selection',
              title: 'Natural selection and selective breeding',
              readingMinutes: 6,
              body: `### Variation and its source
**Variation** is the differences between individuals of the same species. **Continuous** variation gives a range of values with no distinct categories (height, mass); **discontinuous** variation gives distinct categories with nothing in between (blood group, tongue rolling).
The ultimate source of new genetic variation is **mutation** — a random change in the base sequence of DNA. Most mutations are neutral or harmful, but occasionally one is beneficial, and that is what natural selection can act on.
### Natural selection
The same four-step sequence explains resistance in bacteria, peppered moths and Darwin's finches:
1. There is **variation** within a population, caused by mutation.
2. There is **competition** for limited resources, and more offspring are produced than can survive.
3. Individuals with **advantageous characteristics** are more likely to survive and **reproduce** — "survival of the fittest".
4. They pass the advantageous **alleles** to their offspring, so over many generations the allele becomes more common in the population.
### Selective breeding (artificial selection)
Humans do deliberately what the environment does blindly:
1. Choose the individuals with the desired characteristic.
2. Breed them together.
3. Select the best of the offspring.
4. Repeat over many generations.
This produces high-yield crops, cows producing more milk, and domestic dog breeds.
### The key difference
In natural selection the **environment** determines who reproduces; in selective breeding **humans** do. Selective breeding is much faster, but it reduces the gene pool, leaving populations with less variation and so more vulnerable to disease.`,
              analogy: 'Natural selection is a filter the environment holds; selective breeding is the same filter held by a farmer. The mechanism is identical — only the hand doing the choosing changes.',
              misconceptions: [
                'Saying organisms "adapt" during their lifetime to pass on the change. Individuals do not adapt; populations change as the proportion of alleles shifts over generations.',
                'Thinking mutations occur *because* they are needed. Mutation is random and happens regardless of usefulness.',
                'Describing "the fittest" as the strongest. It means best suited to the environment — which may mean best camouflaged or most disease-resistant.',
              ],
              examTips: [
                'Use the four-step structure for every natural-selection question: variation → competition → survival and reproduction of the advantaged → allele frequency increases over generations.',
                'Include the phrase "over many generations" — questions frequently reserve a mark for showing the change is not immediate.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain how a population of insects can become resistant to a pesticide.',
                  steps: ['Random mutation means a few insects in the population are already resistant.', 'When the pesticide is applied, non-resistant insects are killed while resistant ones survive.', 'The survivors reproduce and pass the resistance allele to their offspring.', 'Over many generations the proportion of resistant insects increases until the pesticide is ineffective.'],
                  answer: 'Variation from mutation means some insects are resistant. The pesticide kills the rest, so resistant insects survive, reproduce, and pass on the allele — increasing its frequency over generations.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the source of new genetic variation?', back: 'Mutation — a random change in the base sequence of DNA.', difficulty: 'MEDIUM' },
            { front: 'Difference between continuous and discontinuous variation?', back: 'Continuous gives a range with no distinct categories (height); discontinuous gives distinct categories (blood group).', difficulty: 'MEDIUM' },
            { front: 'Give the four steps of natural selection.', back: 'Variation → competition for resources → the better-adapted survive and reproduce → advantageous alleles increase in frequency over generations.', difficulty: 'HARD' },
            { front: 'What does "fittest" mean in natural selection?', back: 'Best suited to the environment — not necessarily strongest.', difficulty: 'HARD' },
            { front: 'Give one disadvantage of selective breeding.', back: 'It reduces genetic variation in the population, making it more vulnerable to disease.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which statement correctly describes how a beneficial characteristic becomes more common in a population?',
              options: [
                { id: 'a', text: 'Individuals with the characteristic survive and reproduce more, passing on the allele over generations.', why: '' },
                { id: 'b', text: 'Individuals develop the characteristic during their lifetime and pass it on.', why: 'Characteristics acquired during life are not inherited; only alleles in gametes are passed on.' },
                { id: 'c', text: 'The environment causes the mutation that is needed.', why: 'Mutations occur randomly, not in response to need.' },
                { id: 'd', text: 'All individuals gradually change together over time.', why: 'Populations change because allele proportions shift, not because every individual changes.' },
              ],
              answer: 'a',
              markScheme: ['Survival and reproduction of individuals with the advantageous allele, over generations (1)'],
              marks: 1,
              explanation:
                'The distinction between inherited alleles and characteristics acquired during a lifetime is the single most examined idea in this topic.',
            },
          ],
        },
      ],
    },
    {
      number: '19',
      slug: 'organisms-and-their-environment',
      title: 'Organisms and their environment',
      summary: 'Energy flow, food chains and webs, and nutrient cycles.',
      subtopics: [
        {
          number: '19.1',
          slug: 'food-chains-and-energy-flow',
          title: 'Food chains, food webs and energy flow',
          summary: 'How energy moves through an ecosystem, and why it runs out.',
          objectives: [
            { code: '19.1.1', statement: 'Describe food chains and webs and the terms producer, consumer, herbivore, carnivore and decomposer.', tier: 'CORE' },
            { code: '19.1.2', statement: 'Explain energy loss between trophic levels and the shape of pyramids of biomass.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'food-chains-and-energy-flow',
              title: 'Food chains, food webs and energy flow',
              readingMinutes: 6,
              body: `Almost all energy in an ecosystem enters as **sunlight** and is captured by **producers** through photosynthesis.
### The vocabulary
- **Producer** — an organism that makes its own organic nutrients, usually by photosynthesis. Always the start of a food chain.
- **Consumer** — an organism that gets energy by feeding on other organisms. Primary consumers eat producers, secondary consumers eat primary consumers, and so on.
- **Herbivore** eats plants; **carnivore** eats other animals.
- **Decomposer** — an organism that gets energy from dead or waste organic matter, returning nutrients to the soil.
- **Trophic level** — the position an organism occupies in a food chain.
A **food chain** shows one pathway; a **food web** shows many interconnected chains, which is far more realistic.
### Why energy runs out
Only about **10%** of the energy at one trophic level passes to the next. The rest is lost through:
- **Respiration** — energy released as heat to the surroundings.
- **Excretion and egestion** — energy remaining in urine and faeces.
- **Uneaten parts** — bones, roots and other material not consumed.
This is why food chains rarely have more than four or five links: after four transfers, too little energy remains to support another level.
### Consequence for food supply
Because energy is lost at each transfer, feeding grain to humans directly supports far more people than feeding the grain to cattle and eating the beef. Shortening the food chain wastes less energy.`,
              analogy: 'Each trophic level is a leaky bucket poured into the next. Roughly nine-tenths spills as heat and waste on the way, so by the fourth bucket there is barely a splash left.',
              misconceptions: [
                'Drawing arrows the wrong way. Arrows in a food chain show the direction of **energy flow**, so they point from the eaten to the eater.',
                'Thinking energy is "recycled" like nutrients. Nutrients cycle; energy flows one way and is ultimately lost as heat.',
                'Believing a pyramid of numbers is always pyramid-shaped. One oak tree supporting thousands of insects inverts it — which is why pyramids of **biomass** are more reliable.',
              ],
              examTips: [
                'When explaining energy loss, name at least two specific processes — respiration/heat, and egestion or excretion — rather than saying energy is "lost".',
                'For "why are food chains short", link it explicitly: only ~10% transfers, so after several levels there is insufficient energy to support another consumer.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a food chain rarely contains more than five trophic levels.',
                  steps: ['Only about 10% of energy is transferred from one trophic level to the next.', 'The rest is lost as heat from respiration, and in egestion and excretion.', 'After several transfers, so little energy remains that it cannot support the biomass of another level.'],
                  answer: 'Because roughly 90% of energy is lost at each transfer — mostly as heat from respiration and in waste — too little energy remains after four or five levels to support another consumer.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is a producer?', back: 'An organism that makes its own organic nutrients, usually using sunlight in photosynthesis.', difficulty: 'EASY' },
            { front: 'What do arrows in a food chain represent?', back: 'The direction of energy flow — from the organism eaten to the organism that eats it.', difficulty: 'MEDIUM' },
            { front: 'Roughly how much energy passes between trophic levels?', back: 'About 10%.', difficulty: 'MEDIUM' },
            { front: 'Name three ways energy is lost between trophic levels.', back: 'Heat from respiration, energy in excretion and egestion, and uneaten parts of organisms.', difficulty: 'HARD' },
            { front: 'What is a decomposer?', back: 'An organism that obtains energy from dead or waste organic matter, returning nutrients to the soil.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why more people could be fed from a given area of land by growing crops than by grazing cattle. [3]',
              answer:
                'Growing crops for people to eat makes the food chain shorter, with only one energy transfer from producer to human. Grazing cattle adds an extra trophic level, and only about 10% of the energy is passed on at each transfer, the rest being lost as heat in respiration and in egestion and excretion. So far more of the original energy captured by the plants reaches people when they eat the crops directly.',
              markScheme: [
                'Eating crops directly means a shorter food chain / fewer trophic levels (1)',
                'Only about 10% of energy is transferred at each level, the rest lost as heat/waste (1)',
                'So more energy from the plants is available to humans, supporting more people (1)',
              ],
              marks: 3,
              explanation:
                'This is the practical consequence of the 10% rule, and a favourite exam application because it connects biology to food security.',
              hint: 'How many energy transfers happen in each case?',
            },
          ],
        },
        {
          number: '19.2',
          slug: 'nutrient-cycles',
          title: 'The carbon and nitrogen cycles',
          summary: 'How carbon and nitrogen are recycled through ecosystems.',
          prerequisites: ['19.1'],
          objectives: [
            { code: '19.2.1', statement: 'Describe the carbon cycle and the role of decomposers.', tier: 'CORE' },
            { code: '19.2.2', statement: 'Describe the nitrogen cycle and the roles of the bacteria involved.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'nutrient-cycles',
              title: 'The carbon and nitrogen cycles',
              readingMinutes: 6,
              body: `Energy **flows** through an ecosystem and is lost as heat. Nutrients are different — they **cycle**, being used repeatedly.
### The carbon cycle
Carbon **removed** from the atmosphere:
- **Photosynthesis** — the only significant route, converting CO₂ into glucose in plants.
Carbon **returned** to the atmosphere:
- **Respiration** by plants, animals and decomposers.
- **Combustion** of fuels, including fossil fuels and wood.
- **Decomposition** — decomposers respire as they break down dead material.
Carbon passes **along food chains** when animals eat plants, and is locked away long-term as **fossil fuels** when dead organisms do not fully decompose.
The modern imbalance: combustion of fossil fuels releases carbon stored for millions of years faster than photosynthesis removes it, raising atmospheric CO₂.
### Decomposers
**Bacteria and fungi** break down dead organisms and waste, releasing **mineral ions** back into the soil for plants to reuse. Without them, nutrients would stay locked in dead material and ecosystems would collapse — which is why they appear in every cycle.
### The nitrogen cycle
Nitrogen gas is 78% of the air but **unreactive**, so most organisms cannot use it directly. Four groups of bacteria do the work:
- **Nitrogen-fixing bacteria** — convert atmospheric N₂ into nitrogen compounds. Some live free in soil, some in **root nodules of legumes**.
- **Decomposers** — break down proteins in dead matter into **ammonium** compounds.
- **Nitrifying bacteria** — convert ammonium into **nitrites** then **nitrates**, the form plants absorb.
- **Denitrifying bacteria** — convert nitrates back into **nitrogen gas**, reducing soil fertility. They thrive in **waterlogged, low-oxygen** soils, which is why good drainage matters.
Plants absorb **nitrates** to make **amino acids and proteins**; animals obtain nitrogen by eating plants.
Lightning also fixes small amounts of nitrogen.`,
              analogy: 'Nutrients are library books and energy is the electricity bill: the books circulate endlessly between borrowers, while the electricity is consumed and gone. That is why one cycles and the other must be constantly resupplied by the Sun.',
              misconceptions: [
                'Saying energy is recycled. Energy flows one way and is lost as heat; only nutrients cycle.',
                'Thinking plants absorb nitrogen gas from the air. They absorb **nitrates** from the soil.',
                'Confusing nitrifying with denitrifying bacteria. Nitrifying makes nitrates (helpful); denitrifying destroys them (harmful to fertility).',
              ],
              examTips: [
                'Name the specific bacteria group in nitrogen cycle answers — "bacteria" alone rarely earns the mark.',
                'For the carbon cycle, remember photosynthesis is the only major process removing CO₂, while three processes return it.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why waterlogged soil becomes less fertile for crop growth.',
                  steps: ['Waterlogged soil contains little oxygen.', 'Denitrifying bacteria thrive in low-oxygen conditions.', 'They convert nitrates in the soil back into nitrogen gas, which plants cannot absorb.', 'With fewer nitrates, plants cannot make enough amino acids and proteins, so growth is poor.'],
                  answer: 'Low oxygen favours denitrifying bacteria, which convert useful nitrates back into unusable nitrogen gas, so plants have less nitrate for making proteins.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Which process removes carbon dioxide from the atmosphere?', back: 'Photosynthesis.', difficulty: 'EASY' },
            { front: 'Name three processes that return CO₂ to the atmosphere.', back: 'Respiration, combustion and decomposition.', difficulty: 'MEDIUM' },
            { front: 'What do decomposers do for nutrient cycles?', back: 'Break down dead material, releasing mineral ions back into the soil for plants.', difficulty: 'MEDIUM' },
            { front: 'What do nitrogen-fixing bacteria do?', back: 'Convert atmospheric nitrogen gas into nitrogen compounds plants can use.', difficulty: 'HARD' },
            { front: 'What do denitrifying bacteria do?', back: 'Convert nitrates back into nitrogen gas, reducing soil fertility.', difficulty: 'HARD' },
            { front: 'In what form do plants absorb nitrogen?', back: 'As nitrate ions from the soil.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain the importance of decomposers in the carbon cycle. [3]',
              answer:
                'Decomposers such as bacteria and fungi break down dead organisms and waste material. As they do so they respire, releasing carbon dioxide back into the atmosphere where it becomes available for photosynthesis again. They also release mineral ions back into the soil, so nutrients locked in dead material are recycled rather than lost from the ecosystem.',
              markScheme: [
                'Decomposers break down dead organisms and waste (1)',
                'They respire, returning carbon dioxide to the atmosphere (1)',
                'Nutrients/mineral ions are released back into the soil for reuse (1)',
              ],
              marks: 3,
              explanation:
                'Without decomposers, carbon and mineral nutrients would remain trapped in dead bodies indefinitely, and the cycle would stop.',
            },
          ],
        },
        {
          number: '19.3',
          slug: 'populations',
          title: 'Populations and population growth',
          summary: 'The phases of a population growth curve and what limits size.',
          prerequisites: ['19.1'],
          objectives: [
            { code: '19.3.1', statement: 'Describe the phases of a population growth curve and the factors affecting population size.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'populations',
              title: 'Populations and population growth',
              readingMinutes: 5,
              body: `### Definitions
- **Population** — all the organisms of **one species** in an area at one time.
- **Community** — all the populations of **different species** in that area.
- **Ecosystem** — the community plus the **non-living** environment it interacts with.
### The population growth curve
Four phases, each with a cause:
1. **Lag phase** — slow growth. Few individuals are present and they are adapting to the conditions.
2. **Exponential (log) phase** — rapid growth. Resources are plentiful, so the population roughly doubles in each equal time period.
3. **Stationary phase** — growth levels off. Birth rate equals death rate as resources become limited. The population has reached the **carrying capacity** of the environment.
4. **Death phase** — the population falls, as food runs out and toxic waste accumulates.
### What limits population size
- **Food supply** and **water**
- **Predation**
- **Disease**, which spreads faster in dense populations
- **Competition** for space, light or mates
- **Accumulation of waste**
These are **density-dependent** — their effect increases as the population grows, which is exactly why growth slows rather than continuing forever.
### Human population
The human population shows exponential growth, driven by improved food supply, better medical care and sanitation reducing death rates. Whether a stationary phase follows depends on whether resources can keep pace — the same biological limits apply to us as to any other species.`,
              analogy: 'The growth curve is a party in a small flat: slow at first, then filling rapidly, then jammed to the doors because the space simply cannot hold more. The carrying capacity is how many the flat holds, not how many wanted to come.',
              misconceptions: [
                'Thinking a population stops growing because reproduction ceases. Birth rate simply comes to **equal** death rate.',
                'Confusing population and community — a population is one species only.',
                'Assuming exponential growth can continue indefinitely. Resource limits always intervene.',
              ],
              examTips: [
                'Name all four phases in order and give a **cause** for each — the causes are the marks, not the labels.',
                'Use the term "carrying capacity" when explaining the stationary phase; it is a specific marking point.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain why a population of bacteria in a closed flask eventually stops increasing and then falls.',
                  steps: ['During exponential growth, nutrients are plentiful and the population increases rapidly.', 'As numbers rise, nutrients are used up and competition increases, so the birth rate falls until it equals the death rate — the stationary phase.', 'In a closed flask no new nutrients arrive and toxic waste products accumulate.', 'The death rate then exceeds the birth rate, so the population declines.'],
                  answer: 'Nutrients become limiting and waste accumulates, so birth rate first equals then falls below death rate, giving a stationary phase followed by a death phase.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Define a population.', back: 'All the organisms of one species living in an area at one time.', difficulty: 'EASY' },
            { front: 'Name the four phases of a population growth curve.', back: 'Lag, exponential (log), stationary and death phase.', difficulty: 'MEDIUM' },
            { front: 'What happens in the stationary phase?', back: 'Birth rate equals death rate as resources become limiting — the carrying capacity is reached.', difficulty: 'HARD' },
            { front: 'What is carrying capacity?', back: 'The maximum population size an environment can support with its available resources.', difficulty: 'MEDIUM' },
            { front: 'Name three factors limiting population size.', back: 'Food supply, predation, disease, competition or waste accumulation.', difficulty: 'MEDIUM' },
            { front: 'Why does the death phase occur in a closed container?', back: 'Nutrients run out and toxic waste products accumulate.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Explain why the exponential phase of population growth cannot continue indefinitely. [2]',
              answer:
                'During exponential growth the population increases rapidly because resources are plentiful. As numbers rise, food, water and space become limiting and competition between individuals increases, while disease spreads more easily in a dense population. The death rate therefore rises until it equals the birth rate, and growth stops at the carrying capacity of the environment.',
              markScheme: [
                'Resources such as food, water or space become limiting / competition increases (1)',
                'Death rate rises until it equals birth rate, so growth stops at the carrying capacity (1)',
              ],
              marks: 2,
              explanation:
                'The key idea is that limiting factors are density-dependent — their effect strengthens as the population grows, which is what produces the levelling off.',
            },
          ],
        },
      ],
    },
    {
      number: '20',
      slug: 'human-influences-on-ecosystems',
      title: 'Human influences on ecosystems',
      summary: 'Pollution, deforestation, and conservation.',
      subtopics: [
        {
          number: '20.1',
          slug: 'pollution-and-conservation',
          title: 'Pollution, deforestation and conservation',
          summary: 'How human activity damages ecosystems, and what can be done.',
          prerequisites: ['19.1'],
          objectives: [
            { code: '20.1.1', statement: 'Describe the causes and effects of water and air pollution, including eutrophication.', tier: 'CORE' },
            { code: '20.1.2', statement: 'Describe the effects of deforestation and the need for conservation.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'pollution-and-conservation',
              title: 'Pollution, deforestation and conservation',
              readingMinutes: 6,
              body: `### Eutrophication
This sequence is examined often and must be given in order:
1. Excess **fertiliser** (nitrate) runs off farmland into a river or lake.
2. The nutrients cause **algae to grow rapidly**, forming an algal bloom on the surface.
3. The bloom **blocks light** from reaching plants below, so they cannot photosynthesise and they **die**.
4. **Decomposing bacteria** feed on the dead plants and multiply rapidly.
5. These bacteria **respire aerobically**, using up the dissolved **oxygen** in the water.
6. Fish and other aquatic organisms **die** from lack of oxygen.
The crucial insight is that the fish are not poisoned by the fertiliser — they suffocate because bacteria consumed the oxygen.
### Deforestation
Effects include **habitat loss** and reduced **biodiversity**, **soil erosion** once roots no longer bind the soil, **flooding** as less water is intercepted, and increased atmospheric **carbon dioxide** — both because fewer trees photosynthesise and because burning the timber releases it.
### Air pollution
- **Carbon dioxide and methane** are greenhouse gases, causing enhanced global warming.
- **Sulfur dioxide** causes acid rain, damaging trees and acidifying lakes.
### Conservation
Reasons to conserve species include maintaining **biodiversity**, protecting food chains from collapse, preserving a **gene pool** for future crop breeding and medicines, and the value of ecosystems in themselves.
Methods include protected areas and national parks, **captive breeding** programmes and zoos, seed banks, controlling fishing with quotas and net-size limits, and **replanting** forests.`,
              analogy: 'Eutrophication is a party that eats all the food: the algae arrive first and thrive, but the bacteria clearing up afterwards consume all the oxygen — and everyone else in the room suffocates.',
              misconceptions: [
                'Saying fertiliser poisons the fish. The fish die of oxygen deprivation caused by decomposing bacteria, not by chemical toxicity.',
                'Leaving out the bacteria step in eutrophication, which is the step that actually removes the oxygen.',
                'Thinking deforestation only matters for animals. Soil erosion, flooding and CO₂ increase are equally examinable consequences.',
              ],
              examTips: [
                'Write eutrophication as a numbered sequence. Mark schemes award each linked step, and jumping from "fertiliser" to "fish die" scores almost nothing.',
                'For deforestation, give a range of effect types — biodiversity, soil, water and atmosphere — rather than four versions of "animals lose homes".',
              ],
              workedExamples: [
                {
                  prompt: 'Fertiliser runs off a field into a lake and fish begin to die. Explain the sequence of events.',
                  steps: ['Nitrates in the fertiliser enrich the water, causing algae to grow rapidly and form a bloom.', 'The algal bloom blocks light, so submerged plants cannot photosynthesise and die.', 'Decomposer bacteria feed on the dead plants and multiply rapidly.', 'These bacteria respire aerobically, using up the dissolved oxygen in the water.', 'Fish die because there is too little oxygen left for their respiration.'],
                  answer: 'Nitrates cause an algal bloom, which blocks light and kills plants. Bacteria decomposing them multiply and use up the dissolved oxygen in respiration, so the fish suffocate.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the steps of eutrophication.', back: 'Fertiliser runoff → algal bloom → light blocked → plants die → decomposer bacteria multiply → oxygen used up → fish die.', difficulty: 'HARD' },
            { front: 'Why do fish die during eutrophication?', back: 'Decomposing bacteria use up the dissolved oxygen in aerobic respiration, so fish cannot respire.', difficulty: 'HARD' },
            { front: 'Name three effects of deforestation.', back: 'Habitat loss and reduced biodiversity, soil erosion and flooding, and increased atmospheric carbon dioxide.', difficulty: 'MEDIUM' },
            { front: 'Why conserve endangered species?', back: 'To maintain biodiversity, protect food chains, and preserve a gene pool for future breeding and medicines.', difficulty: 'MEDIUM' },
            { front: 'Name two conservation methods.', back: 'Any two of: protected areas/national parks, captive breeding, seed banks, fishing quotas, replanting forests.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Explain how the use of nitrate fertiliser on farmland can lead to the death of fish in a nearby river. [4]',
              answer:
                'Nitrate fertiliser is washed off the land into the river, enriching the water with nutrients. This causes algae to reproduce rapidly, forming a bloom that blocks light from reaching plants below the surface, so those plants cannot photosynthesise and they die. Decomposer bacteria feed on the dead plants and multiply rapidly, respiring aerobically and using up the dissolved oxygen in the water. With too little oxygen remaining, the fish cannot respire and die.',
              markScheme: [
                'Nitrate leaches/runs off into the water (1)',
                'Algae grow rapidly forming a bloom, blocking light so plants die (1)',
                'Decomposer bacteria multiply and respire aerobically (1)',
                'Dissolved oxygen is used up, so fish die (1)',
              ],
              marks: 4,
              explanation:
                'Each mark depends on the causal link to the next step. The most common error is omitting the bacteria, which breaks the chain between plants dying and oxygen disappearing.',
              hint: 'What grows first, what does it block, and what uses up the oxygen?',
            },
          ],
        },
      ],
    },
    {
      number: '21',
      slug: 'biotechnology-and-genetic-modification',
      title: 'Biotechnology and genetic modification',
      summary: 'Using microorganisms industrially, and modifying genes.',
      subtopics: [
        {
          number: '21.1',
          slug: 'biotechnology-and-genetic-engineering',
          title: 'Biotechnology and genetic engineering',
          summary: 'Why bacteria are useful, and how genes are transferred between species.',
          prerequisites: ['17.1'],
          objectives: [
            { code: '21.1.1', statement: 'Describe the use of microorganisms in biotechnology, including anaerobic respiration in yeast.', tier: 'CORE' },
            { code: '21.1.2', statement: 'Outline genetic modification and discuss its advantages and disadvantages.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'biotechnology-and-genetic-engineering',
              title: 'Biotechnology and genetic engineering',
              readingMinutes: 6,
              body: `### Why bacteria are so useful
Bacteria are ideal for industrial biotechnology because they **reproduce very rapidly**, have **simple growth requirements**, contain **plasmids** that make gene transfer straightforward, and there are fewer ethical concerns than with animals.
### Familiar biotechnology
- **Bread and beer** rely on **anaerobic respiration in yeast**: glucose → ethanol + carbon dioxide. The CO₂ makes dough rise; the ethanol is the alcohol in beer.
- **Yoghurt** is made by bacteria fermenting lactose to lactic acid.
- **Enzymes in washing powders** — proteases digest protein stains, lipases digest fat stains, working at lower temperatures and saving energy.
### Genetic modification
**Genetic modification** means changing an organism's genetic material by removing, adding or changing genes.
The standard example is producing **human insulin** in bacteria, and the sequence is worth knowing:
1. The **human insulin gene is cut out** of human DNA using **restriction enzymes**, leaving sticky ends.
2. A bacterial **plasmid** is cut open with the **same** restriction enzyme, so the sticky ends match.
3. The gene is inserted into the plasmid and joined using **ligase**.
4. The plasmid is put back into a bacterium.
5. The bacterium **reproduces rapidly**, and the whole population makes human insulin, which is extracted and purified.
### Weighing it up
**Advantages** — insulin identical to human insulin, produced in large quantities cheaply and free from animal disease; crops modified for pest resistance or better nutrition, such as vitamin-A-enriched rice.
**Disadvantages** — concerns about modified genes spreading to wild species, unknown long-term effects, the cost of seed for small farmers, and ethical objections to altering organisms.`,
              analogy: 'Restriction enzymes cut DNA the way scissors cut a jigsaw edge — because the same scissors cut both the gene and the plasmid, the two edges are complementary and slot together only the right way round.',
              misconceptions: [
                'Thinking the same enzyme does the cutting and joining. **Restriction enzymes** cut; **ligase** joins.',
                'Believing GM insulin is "artificial" and different from human insulin. It is produced from the human gene, so the protein is identical — an advantage over the pig insulin used historically.',
                'Forgetting that both the human DNA and the plasmid must be cut with the *same* restriction enzyme, which is what makes the sticky ends complementary.',
              ],
              examTips: [
                'Name the two enzymes explicitly. "Restriction enzyme cuts, ligase joins" is worth easy marks and is frequently confused.',
                'For evaluation questions, give a genuine point on each side and then a conclusion. A list of advantages alone will not access the top marks.',
              ],
              workedExamples: [
                {
                  prompt: 'Describe how bacteria can be genetically modified to produce human insulin.',
                  steps: ['The human insulin gene is cut out of human DNA using a restriction enzyme, producing sticky ends.', 'A plasmid is removed from a bacterium and cut open with the same restriction enzyme, giving complementary sticky ends.', 'The insulin gene is inserted into the plasmid and sealed in place using ligase.', 'The recombinant plasmid is returned to a bacterium, which is then grown in a fermenter.', 'The rapidly reproducing bacteria all express the gene, and the insulin is extracted and purified.'],
                  answer: 'The insulin gene is cut from human DNA with a restriction enzyme, inserted into a plasmid cut with the same enzyme and joined with ligase, then the plasmid is put back into bacteria which are cultured to produce insulin in bulk.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Why are bacteria useful in biotechnology?', back: 'They reproduce very rapidly, have simple growth requirements, contain plasmids for gene transfer, and raise fewer ethical concerns.', difficulty: 'MEDIUM' },
            { front: 'What is a plasmid?', back: 'A small circular loop of DNA in a bacterium, used as a vector to carry genes.', difficulty: 'MEDIUM' },
            { front: 'Which enzyme cuts DNA, and which joins it?', back: 'Restriction enzymes cut; ligase joins.', difficulty: 'HARD' },
            { front: 'Why must the same restriction enzyme cut both the gene and the plasmid?', back: 'So the sticky ends are complementary and the pieces fit together.', difficulty: 'HARD' },
            { front: 'Give one advantage of GM insulin over animal insulin.', back: 'It is identical to human insulin, can be made in large amounts cheaply, and carries no risk of animal disease.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'In genetic engineering, what is the role of ligase?',
              options: [
                { id: 'a', text: 'To join the gene into the plasmid', why: '' },
                { id: 'b', text: 'To cut the gene out of the DNA', why: 'Cutting is done by restriction enzymes, not ligase.' },
                { id: 'c', text: 'To kill bacteria that did not take up the plasmid', why: 'That is done using antibiotic marker genes, not ligase.' },
                { id: 'd', text: 'To extract the insulin from the fermenter', why: 'Extraction is a physical purification process involving no enzyme.' },
              ],
              answer: 'a',
              markScheme: ['Ligase joins/seals the gene into the plasmid (1)'],
              marks: 1,
              explanation:
                'Remember the pair together: restriction enzymes are the scissors, ligase is the glue. Questions very often test whether you have confused the two.',
            },
          ],
        },
      ],
    },
  ],
};
