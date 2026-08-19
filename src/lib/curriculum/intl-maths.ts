import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE International Mathematics 0607.
 *
 * Overlaps 0580 in content but differs in assessment: a graphics display
 * calculator is assumed throughout, set notation is used far more heavily, and
 * there is an additional investigation paper. This file leans into those
 * differences rather than duplicating 0580 — students taking 0607 should read
 * the 0580 material too for shared ground.
 */
export const intlMaths0607: SyllabusSeed = {
  subject: {
    code: '0607',
    slug: 'intl-maths',
    name: 'International Mathematics',
    tagline: 'Sets, functions and modelling — with the graphics calculator as a working tool.',
    accent: 'intl-maths',
  },
  version: {
    code: '0607-2023-2025',
    label: 'International Mathematics 0607 (for examination 2023-2025)',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Topic structure paraphrased from the published Cambridge IGCSE International Mathematics 0607 specification. Not official Cambridge wording — always check the syllabus document.',
  },
  topics: [
    {
      number: '1',
      slug: 'sets',
      title: 'Sets',
      summary: 'Set notation, Venn diagrams and set operations.',
      subtopics: [
        {
          number: '1.1',
          slug: 'set-notation-and-venn-diagrams',
          title: 'Set notation and Venn diagrams',
          summary: 'The symbols, and using Venn diagrams to solve problems.',
          objectives: [
            { code: '1.1.1', statement: 'Use set language, notation and Venn diagrams to describe sets and solve problems.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'set-notation-and-venn-diagrams',
              title: 'Set notation and Venn diagrams',
              readingMinutes: 6,
              body: `Set notation is used far more heavily in 0607 than in 0580, and the symbols must be read fluently.
### The notation
- \`A ∪ B\` — **union**: everything in A **or** B (or both).
- \`A ∩ B\` — **intersection**: everything in **both** A and B.
- \`A'\` — **complement**: everything **not** in A.
- \`∈\` — "is an element of"; \`∉\` — "is not an element of".
- \`⊂\` — "is a subset of".
- \`n(A)\` — the **number of elements** in A.
- \`∅\` or \`{ }\` — the **empty set**.
- \`ℰ\` — the **universal set**, everything under consideration.
A memory hook that works: **∪**nion looks like a cup that holds everything; **∩**ntersection is the overlap.
### Reading combined expressions
Work from the inside out, exactly like arithmetic brackets:
- \`(A ∪ B)'\` — everything **outside** both circles.
- \`A ∩ B'\` — in A but **not** in B, i.e. the part of A that does not overlap.
- \`n(A ∪ B) = n(A) + n(B) − n(A ∩ B)\` — subtract the overlap, otherwise it is counted twice.
### Solving Venn diagram problems
The reliable method is to **start in the middle**:
1. Fill in \`n(A ∩ B)\` first.
2. Subtract it from each total to get the parts that are only in A and only in B.
3. Fill in the outside region last, using the universal set total.
Starting from the outside almost always leads to double counting.
### Why it matters
Set notation also underpins probability questions, where \`P(A ∩ B)\` and \`P(A ∪ B)\` mean exactly the same thing as in the diagrams.`,
              analogy: 'A Venn diagram is a seating plan: people in the overlap belong to both clubs and would be counted twice if you simply added the club memberships — which is precisely why the intersection is subtracted.',
              misconceptions: [
                'Confusing ∪ and ∩. Union is the larger set (everything in either); intersection is the smaller (only the overlap).',
                'Adding \`n(A) + n(B)\` for the union without subtracting the intersection, which double-counts the middle.',
                'Filling a Venn diagram from the outside in, rather than starting with the intersection.',
              ],
              examTips: [
                'Always write the middle value first, then work outwards subtracting as you go.',
                'Shade the region described by an expression before counting — for something like \`A ∩ B\'\`, shading removes most of the ambiguity.',
              ],
              workedExamples: [
                {
                  prompt: 'In a class of 30, 18 study French and 15 study Spanish, and 7 study both. How many study neither?',
                  steps: ['Start with the intersection: 7 study both.', 'French only = 18 − 7 = 11; Spanish only = 15 − 7 = 8.', 'Total studying at least one = 11 + 7 + 8 = 26.', 'Neither = 30 − 26 = 4.'],
                  answer: '4 students study neither',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does A ∪ B mean?', back: 'Union — all elements in A or B or both.', difficulty: 'MEDIUM' },
            { front: 'What does A ∩ B mean?', back: 'Intersection — only the elements in both A and B.', difficulty: 'MEDIUM' },
            { front: 'What does A\' mean?', back: 'The complement of A — everything not in A.', difficulty: 'MEDIUM' },
            { front: 'Give the formula for n(A ∪ B).', back: 'n(A) + n(B) − n(A ∩ B)', difficulty: 'HARD' },
            { front: 'What does n(A) represent?', back: 'The number of elements in set A.', difficulty: 'EASY' },
            { front: 'Where should you start when filling a Venn diagram?', back: 'The intersection in the middle, then work outwards.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'In a group of 40 people, 22 play tennis, 19 play badminton and 6 play both. Calculate how many play neither sport. [3]',
              answer:
                'Those playing only tennis are 22 − 6 = 16, and those playing only badminton are 19 − 6 = 13. Adding the three regions inside the circles gives 16 + 6 + 13 = 35 people who play at least one sport. Therefore 40 − 35 = 5 people play neither.',
              markScheme: [
                'Subtracts the intersection to find "only" values: 16 and 13 (1)',
                'Totals those playing at least one sport: 35 (1)',
                'Answer 5 (1)',
              ],
              marks: 3,
              explanation:
                'Adding 22 + 19 = 41 exceeds the group of 40, which immediately signals that the 6 who play both have been counted twice.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'functions-and-graphs',
      title: 'Functions and graphs',
      summary: 'Function notation, graph sketching and using a graphics calculator.',
      subtopics: [
        {
          number: '2.1',
          slug: 'graphs-with-a-gdc',
          title: 'Sketching and solving graphically',
          summary: 'Using a graphics display calculator to sketch, solve and find key features.',
          objectives: [
            { code: '2.1.1', statement: 'Sketch and interpret graphs of functions, and use a graphics calculator to find intersections, roots and turning points.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'graphs-with-a-gdc',
              title: 'Sketching and solving graphically',
              readingMinutes: 6,
              body: `0607 assumes a **graphics display calculator (GDC)**, and questions are written expecting you to use it well. That changes technique rather than removing the need to understand.
### What the GDC is for
- Finding where a curve **crosses the x-axis** (roots/zeros).
- Finding **intersections** of two graphs — which is how you solve equations graphically.
- Finding **maximum and minimum** points.
- Producing a sketch you can then describe.
### Solving equations graphically
To solve \`f(x) = g(x)\`, plot **both** and find the intersection — this is often faster and more reliable than algebra, and for many 0607 equations it is the intended method.
Alternatively rearrange to \`f(x) − g(x) = 0\` and find the zeros of that single function.
### Sketching well
A sketch is not a plot. It must show:
- **Axis intercepts** — where the curve crosses each axis;
- **Turning points**;
- **Asymptotes**, drawn as dashed lines;
- The correct **overall shape** and behaviour at the extremes.
Label the axes and mark key coordinates. Marks come from these features, not from artistic accuracy.
### Choosing a sensible window
The commonest GDC error is a window that hides the interesting part of the graph. If a graph looks blank or like a straight line, **zoom out** first, then narrow in. Always sanity-check that what you see matches what the equation should do.
### Asymptotes
For a function such as \`y = 1/(x − 3)\`, there is a **vertical asymptote at x = 3** (division by zero) and a **horizontal asymptote at y = 0**. The GDC may draw a misleading near-vertical connecting line at the asymptote — that line is an artefact, not part of the graph.`,
              analogy: 'The GDC is a microscope: it shows you exactly what you point it at, so a badly chosen window is like examining the wrong slide. The instrument is only as good as the judgement directing it.',
              misconceptions: [
                'Trusting the default window. A graph that looks blank usually means the window is wrong, not that the function is undefined.',
                'Treating the vertical line a GDC draws at an asymptote as part of the curve. It is a plotting artefact.',
                'Giving a sketch with no labelled intercepts or turning points — those features are where the marks are.',
              ],
              examTips: [
                'When a question says "solve graphically" or gives an awkward-looking equation, plot both sides and find the intersection rather than attempting algebra.',
                'Write down coordinates from the GDC to the accuracy the question requests, usually 3 significant figures, and state what each point represents.',
              ],
              workedExamples: [
                {
                  prompt: 'Explain how you would use a graphics calculator to solve x³ − 2x = 1.',
                  steps: ['Rearrange so one side is zero: x³ − 2x − 1 = 0.', 'Plot y = x³ − 2x − 1 on the GDC.', 'Choose a window wide enough to show all turning points and axis crossings.', 'Use the zero/root function to find each x-intercept — these are the solutions.'],
                  answer: 'Plot y = x³ − 2x − 1 and use the calculator\'s zero function to find each x-intercept; each root is a solution of the original equation.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you solve f(x) = g(x) graphically?', back: 'Plot both and find the x-coordinates of their intersections.', difficulty: 'MEDIUM' },
            { front: 'What features must a sketch show?', back: 'Axis intercepts, turning points, asymptotes and the correct overall shape.', difficulty: 'MEDIUM' },
            { front: 'Where is the vertical asymptote of y = 1/(x − 3)?', back: 'At x = 3, where the denominator is zero.', difficulty: 'HARD' },
            { front: 'What is the most common GDC error?', back: 'Using a window that hides the important part of the graph.', difficulty: 'MEDIUM' },
            { front: 'What does finding a zero on the GDC give you?', back: 'A root of the equation — where the curve crosses the x-axis.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A student plots y = 1/(x − 2) on a graphics calculator and sees a near-vertical line at x = 2. What does this line represent?',
              options: [
                { id: 'a', text: 'A plotting artefact — the function is undefined at x = 2, where there is a vertical asymptote.', why: '' },
                { id: 'b', text: 'A genuine part of the graph showing the function is very steep there.', why: 'The function has no value at x = 2 at all; the calculator is joining points either side.' },
                { id: 'c', text: 'A root of the function.', why: 'A root is where the curve crosses the x-axis; this curve never does.' },
                { id: 'd', text: 'A turning point.', why: 'There is no maximum or minimum at an asymptote.' },
              ],
              answer: 'a',
              markScheme: ['Plotting artefact at a vertical asymptote where the function is undefined (1)'],
              marks: 1,
              explanation:
                'The calculator joins the last point before x = 2 to the first point after it, producing a line that is not part of the graph. Understanding this prevents describing the asymptote wrongly in a sketch.',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'investigation-and-modelling',
      title: 'Investigation and modelling',
      summary: 'Approaching the investigation paper and the modelling process.',
      subtopics: [
        {
          number: '3.1',
          slug: 'investigations',
          title: 'Investigations and mathematical modelling',
          summary: 'Finding patterns, generalising, justifying, and building models.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '3.1.1', statement: 'Investigate patterns, form and test generalisations, and apply the modelling cycle.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'investigations',
              title: 'Investigations and mathematical modelling',
              readingMinutes: 6,
              body: `0607 includes an **investigation paper**, which is unlike anything in 0580. It rewards a systematic approach far more than clever guessing.
### The investigation method
1. **Try small cases first.** Work out the simplest examples completely — n = 1, 2, 3 — and record them clearly in a **table**.
2. **Look for a pattern** in the results, checking differences between terms.
3. **Form a generalisation** — a formula in terms of n.
4. **Test it** on a case you have not yet used. This is where marks are won or lost.
5. **Justify or explain** why the rule works, if you can. An explanation earns more credit than a formula alone.
6. **Extend** the problem: what if the condition changed?
### Presentation is assessed
Show your working in an organised table, state results in clear sentences, and define what your variables mean. An examiner who cannot follow your reasoning cannot award method marks, however correct the final formula.
### The modelling cycle
For applied questions the process is:
**Assumptions → build the model → solve → interpret → validate against reality → refine.**
Stating your **assumptions** explicitly is a marked step. A model that assumes constant speed, no air resistance, or a fixed growth rate should say so.
### Judging a model
Every model simplifies. A good answer says both **what the model predicts** and **where it becomes unreliable** — for example, an exponential population model that eventually predicts impossible numbers because it ignores limited food and space.
Recognising the limitation is not a weakness in your answer; it is the mark.`,
              analogy: 'An investigation is detective work: gather evidence from small cases, form a theory, then deliberately test it against a case you have not seen. A theory never tested against fresh evidence is a guess.',
              misconceptions: [
                'Jumping to a formula from two data points. Two points fit infinitely many rules, so more cases are needed.',
                'Never testing the generalisation. Verifying it on an unused case is a distinct and frequently awarded mark.',
                'Presenting a model as exact. Stating its assumptions and limitations is part of a full answer.',
              ],
              examTips: [
                'Always build a table of results for small n before hunting for a formula. It makes patterns visible and shows the examiner your method.',
                'After stating a general rule, write one line testing it on a further case — "checking n = 6: formula gives 21, and counting gives 21 ✓".',
              ],
              workedExamples: [
                {
                  prompt: 'Investigate the number of handshakes when everyone in a group of n people shakes hands once with everyone else.',
                  steps: ['Try small cases: n = 2 gives 1 handshake; n = 3 gives 3; n = 4 gives 6; n = 5 gives 10.', 'Tabulate and look for a pattern — the differences are 2, 3, 4, suggesting a quadratic rule.', 'The values 1, 3, 6, 10 are the triangular numbers, giving the generalisation n(n − 1)/2.', 'Test on an unused case: n = 6 gives 6 × 5 / 2 = 15, and counting confirms 15.', 'Justify: each of the n people shakes n − 1 hands, but each handshake is counted twice, hence dividing by 2.'],
                  answer: 'The number of handshakes is n(n − 1)/2, justified because each of n people shakes n − 1 hands and every handshake is counted twice.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the first step in an investigation?', back: 'Try small cases systematically and record them in a table.', difficulty: 'MEDIUM' },
            { front: 'Why must you test a generalisation?', back: 'To check it holds for a case not used to form it — testing is a separate marked step.', difficulty: 'HARD' },
            { front: 'Give the stages of the modelling cycle.', back: 'State assumptions, build the model, solve, interpret, validate against reality, then refine.', difficulty: 'HARD' },
            { front: 'Why state assumptions in a model?', back: 'Every model simplifies reality; stating the simplifications is a marked part of the answer.', difficulty: 'MEDIUM' },
            { front: 'How many handshakes among n people?', back: 'n(n − 1)/2 — each person shakes n − 1 hands, and each handshake is counted twice.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A population is modelled by exponential growth. Give one prediction the model makes and one reason it becomes unrealistic over a long period. [2]',
              answer:
                'The model predicts that the population multiplies by a constant factor in each equal time interval, so it grows ever faster and doubles in a fixed period. Over a long period this becomes unrealistic because it assumes unlimited food, space and resources; in reality growth slows as those limits are approached, so the model overestimates the population.',
              markScheme: [
                'States a valid prediction, e.g. the population multiplies by a fixed factor each period / doubles in a fixed time (1)',
                'Gives a valid limitation, e.g. assumes unlimited resources, so it overestimates once limits are reached (1)',
              ],
              marks: 2,
              explanation:
                'Questions on modelling reliably award a mark for identifying a limitation. Treating the model as if it were exact loses that mark even when the mathematics is perfect.',
            },
          ],
        },
      ],
    },
  ],
};
