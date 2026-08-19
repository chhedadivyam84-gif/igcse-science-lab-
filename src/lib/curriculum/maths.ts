import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Mathematics 0580.
 *
 * Written like the science files: worked examples carry the full method, not
 * just the answer, because in maths the method is where the marks are. Nothing
 * here is official Cambridge wording or a past-paper question.
 */
export const maths0580: SyllabusSeed = {
  subject: {
    code: '0580',
    slug: 'maths',
    name: 'Mathematics',
    tagline: 'Number, algebra, geometry, trigonometry and statistics — with the working that earns the marks.',
    accent: 'maths',
  },
  version: {
    code: '0580-2023-2025',
    label: 'Mathematics 0580 (for examination 2023-2025)',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Topic structure paraphrased from the published Cambridge IGCSE Mathematics 0580 specification. Not official Cambridge wording — always check the syllabus document.',
  },
  topics: [
    {
      number: '1',
      slug: 'number',
      title: 'Number',
      summary: 'Integers, fractions, indices, standard form, ratio and percentages.',
      subtopics: [
        {
          number: '1.1',
          slug: 'indices-and-standard-form',
          title: 'Indices and standard form',
          summary: 'The laws of indices and writing very large or small numbers.',
          objectives: [
            { code: '1.1.1', statement: 'Use the laws of indices, including negative and fractional indices.', tier: 'CORE' },
            { code: '1.1.2', statement: 'Convert between ordinary numbers and standard form and calculate with them.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'indices-and-standard-form',
              title: 'Indices and standard form',
              readingMinutes: 6,
              body: `### The laws of indices
All of these follow from what an index means — how many times the base is multiplied by itself.
- \`aᵐ × aⁿ = aᵐ⁺ⁿ\` — **add** the powers when multiplying.
- \`aᵐ ÷ aⁿ = aᵐ⁻ⁿ\` — **subtract** when dividing.
- \`(aᵐ)ⁿ = aᵐⁿ\` — **multiply** when raising a power to a power.
- \`a⁰ = 1\` for any non-zero a.
- \`a⁻ⁿ = 1/aⁿ\` — a negative index means **reciprocal**, not a negative answer.
- \`a^(1/n) = ⁿ√a\`, so \`a^(m/n) = (ⁿ√a)ᵐ\`.
The two that cause most errors: a negative index never makes the answer negative, and \`a⁰ = 1\` rather than 0.
### Standard form
A number in **standard form** is written \`a × 10ⁿ\` where **1 ≤ a < 10** and n is an integer.
- Large numbers give a **positive** n: 4 500 000 = \`4.5 × 10⁶\`.
- Small numbers give a **negative** n: 0.00032 = \`3.2 × 10⁻⁴\`.
The condition 1 ≤ a < 10 is strict: \`45 × 10⁵\` is **not** in standard form even though it is numerically correct, and it loses the mark.
### Calculating in standard form
Multiply or divide the number parts, then apply the index laws to the powers of ten. Afterwards, **check a is still between 1 and 10** and adjust if not — this final adjustment is the step most often forgotten.`,
              analogy: 'Standard form is scientific shorthand for scale: the power of ten tells you how many places the decimal point has moved, so a positive power means "this is big" and a negative one means "this is small".',
              misconceptions: [
                'Thinking \`2⁻³\` is negative. It equals 1/8 — a positive number. The minus sign inverts, it does not negate.',
                'Writing an answer like \`45 × 10⁵\` and calling it standard form. The first part must satisfy 1 ≤ a < 10, so it should be \`4.5 × 10⁶\`.',
                'Assuming \`a⁰ = 0\`. Any non-zero number to the power zero is 1.',
              ],
              examTips: [
                'After any standard form calculation, look at the number part and fix it if it is not between 1 and 10 — that adjustment is a mark on its own.',
                'For fractional indices, deal with the root first and the power second; the numbers stay smaller and mistakes are less likely.',
              ],
              workedExamples: [
                {
                  prompt: 'Calculate (3 × 10⁵) × (4 × 10⁻²), giving your answer in standard form.',
                  steps: ['Multiply the number parts: 3 × 4 = 12.', 'Apply the index law to the powers of ten: 10⁵ × 10⁻² = 10⁵⁺⁽⁻²⁾ = 10³.', 'This gives 12 × 10³, but 12 is not between 1 and 10.', 'Rewrite 12 as 1.2 × 10¹, so the answer becomes 1.2 × 10¹ × 10³ = 1.2 × 10⁴.'],
                  answer: '1.2 × 10⁴',
                },
                {
                  prompt: 'Evaluate 16^(3/4).',
                  steps: ['A fractional index m/n means take the nth root, then raise to the power m.', 'The denominator 4 means the fourth root: ⁴√16 = 2.', 'The numerator 3 means cube it: 2³ = 8.'],
                  answer: '8',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the rule for aᵐ × aⁿ.', back: 'aᵐ⁺ⁿ — add the indices when multiplying powers of the same base.', difficulty: 'EASY' },
            { front: 'What does a⁻ⁿ equal?', back: '1/aⁿ — a negative index means the reciprocal, not a negative answer.', difficulty: 'MEDIUM' },
            { front: 'What does a^(m/n) mean?', back: 'The nth root of a, raised to the power m.', difficulty: 'HARD' },
            { front: 'What are the conditions for standard form?', back: 'Written as a × 10ⁿ where 1 ≤ a < 10 and n is an integer.', difficulty: 'MEDIUM' },
            { front: 'What is a⁰ for any non-zero a?', back: '1', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Work out (6 × 10⁴) ÷ (2 × 10⁻³), giving your answer in standard form.',
              answer: '3 × 10⁷',
              markScheme: [
                'Divides number parts: 6 ÷ 2 = 3 (1)',
                'Applies index law: 10⁴ ÷ 10⁻³ = 10⁴⁻⁽⁻³⁾ = 10⁷ (1)',
                'Answer 3 × 10⁷ in correct standard form (1)',
              ],
              marks: 3,
              explanation:
                'Subtracting a negative index adds: 4 − (−3) = 7. Here the number part is already between 1 and 10, so no adjustment is needed.',
              hint: 'What happens when you subtract a negative power?',
            },
          ],
        },
        {
          number: '1.2',
          slug: 'ratio-proportion-percentage',
          title: 'Ratio, proportion and percentage',
          summary: 'Sharing in a ratio, direct and inverse proportion, and percentage change.',
          objectives: [
            { code: '1.2.1', statement: 'Divide a quantity in a given ratio and use direct and inverse proportion.', tier: 'CORE' },
            { code: '1.2.2', statement: 'Calculate percentage increase, decrease, reverse percentages and compound interest.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'ratio-proportion-percentage',
              title: 'Ratio, proportion and percentage',
              readingMinutes: 6,
              body: `### Sharing in a ratio
To divide a quantity in a ratio, **add the parts** to find the total number of shares, divide the quantity by that total to find one share, then multiply out.
Share £120 in the ratio 2 : 3. Total parts = 5, so one part = £24, giving £48 and £72. Always check the parts add back to the original.
### Direct and inverse proportion
- **Direct** (\`y ∝ x\`, so \`y = kx\`): as one increases, the other increases in the same ratio.
- **Inverse** (\`y ∝ 1/x\`, so \`y = k/x\`): as one increases, the other decreases — more workers, less time.
Method: substitute the known pair to find **k**, then use k with the new value.
### Percentages — the multiplier method
Using multipliers is faster and far less error-prone than finding a percentage and adding it separately:
- Increase by 15% → multiply by **1.15**.
- Decrease by 15% → multiply by **0.85**.
- **Compound interest** over n years → multiply by the multiplier **n times**: \`Final = P × (multiplier)ⁿ\`.
### Reverse percentages — the classic trap
If a price **after** a 20% increase is £60, you must **divide** by 1.2 to get the original £50. Taking 20% off £60 gives £48, which is wrong, because the 20% was calculated on the smaller original, not on £60.
The test: if the question gives you the value *after* the change and asks for the value *before*, you divide.`,
              analogy: 'A percentage change is a scale factor, not a fixed amount. Undoing it means dividing by that factor — just as the way back from a photo enlarged 3× is to divide by 3, not to subtract what was added.',
              misconceptions: [
                'Doing reverse percentages by subtracting. If £60 is after a 20% rise, the original is 60 ÷ 1.2 = £50, not 60 − 20% = £48.',
                'Thinking a 10% rise followed by a 10% fall returns to the start. 1.1 × 0.9 = 0.99, a 1% overall loss.',
                'Treating compound interest as simple interest. Compound multiplies repeatedly, so it grows faster each year.',
              ],
              examTips: [
                'Write the multiplier before calculating anything. It makes multi-stage percentage questions almost mechanical.',
                'For "find the original amount" questions, divide by the multiplier — and check your answer by applying the change forwards.',
              ],
              workedExamples: [
                {
                  prompt: 'A jacket costs £84 after a 40% reduction in a sale. Find the original price.',
                  steps: ['A 40% reduction means the sale price is 60% of the original, so the multiplier is 0.6.', 'Sale price = original × 0.6, so original = 84 ÷ 0.6.', 'original = £140.', 'Check: 140 × 0.6 = 84 ✓'],
                  answer: '£140',
                },
                {
                  prompt: '£2000 is invested at 5% compound interest per year. Find the value after 3 years.',
                  steps: ['The multiplier for a 5% increase is 1.05.', 'For compound interest over 3 years, apply it three times: 2000 × 1.05³.', '1.05³ = 1.157625, so 2000 × 1.157625 = 2315.25.'],
                  answer: '£2315.25',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you share a quantity in a ratio?', back: 'Add the parts to get total shares, divide the quantity by that total to find one share, then multiply out.', difficulty: 'EASY' },
            { front: 'What is the multiplier for a 15% decrease?', back: '0.85', difficulty: 'EASY' },
            { front: 'How do you find the original amount before a percentage increase?', back: 'Divide the new amount by the multiplier (e.g. ÷ 1.2 for a 20% rise).', difficulty: 'HARD' },
            { front: 'Give the compound interest formula.', back: 'Final = P × (multiplier)ⁿ, where n is the number of periods.', difficulty: 'MEDIUM' },
            { front: 'What is the relationship for inverse proportion?', back: 'y = k/x — as x increases, y decreases.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'The population of a town is 12 000 after a 20% increase over ten years. Calculate the population ten years ago.',
              answer: '10000',
              markScheme: [
                'Recognises the multiplier for a 20% increase is 1.2 (1)',
                'Divides rather than subtracts: 12000 ÷ 1.2 (1)',
                'Answer 10 000 (1)',
              ],
              marks: 3,
              explanation:
                'The commonest wrong answer is 9600, from taking 20% off 12 000. That treats the increase as 20% of the final figure, when it was 20% of the original.',
              hint: 'The 20% was calculated on the old population, not the new one.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'algebra-and-graphs',
      title: 'Algebra and graphs',
      summary: 'Manipulating expressions, solving equations, sequences and graphs.',
      subtopics: [
        {
          number: '2.1',
          slug: 'expanding-and-factorising',
          title: 'Expanding and factorising',
          summary: 'Brackets, common factors, quadratics and the difference of two squares.',
          objectives: [
            { code: '2.1.1', statement: 'Expand brackets and simplify algebraic expressions.', tier: 'CORE' },
            { code: '2.1.2', statement: 'Factorise expressions including quadratics and the difference of two squares.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'expanding-and-factorising',
              title: 'Expanding and factorising',
              readingMinutes: 6,
              body: `Expanding and factorising are opposite operations, and checking one with the other catches most errors.
### Expanding
Multiply every term inside by the term outside. For two brackets, every term in the first multiplies every term in the second:
\`(x + 3)(x + 5) = x² + 5x + 3x + 15 = x² + 8x + 15\`
Watch signs carefully: \`(x − 4)(x + 2) = x² + 2x − 4x − 8 = x² − 2x − 8\`.
### Factorising — always look for a common factor first
\`6x² + 9x = 3x(2x + 3)\`. Take out the **highest** common factor, not just any factor.
### Factorising quadratics of the form x² + bx + c
Find two numbers that **multiply to c** and **add to b**.
For \`x² + 7x + 12\`: the numbers are 3 and 4, so it factorises to \`(x + 3)(x + 4)\`.
For \`x² − x − 6\`: multiply to −6, add to −1, giving −3 and +2, so \`(x − 3)(x + 2)\`.
When c is negative the two numbers have **opposite signs**; when c is positive they share the sign of b. Noticing that narrows the search immediately.
### Difference of two squares
\`a² − b² = (a + b)(a − b)\`
Recognise it whenever you see one square subtracted from another: \`x² − 25 = (x + 5)(x − 5)\`, and \`9x² − 16 = (3x + 4)(3x − 4)\`. It appears constantly and is easy marks once spotted.`,
              analogy: 'Factorising is unmultiplying. Just as 12 can be rewritten as 3 × 4, a quadratic can be rewritten as two brackets — and expanding is how you check you unmultiplied correctly.',
              misconceptions: [
                'Expanding \`(x + 3)²\` as \`x² + 9\`. It means \`(x + 3)(x + 3) = x² + 6x + 9\` — the middle term is real.',
                'Losing a sign when the second bracket is subtracted. \`−(x − 2)\` is \`−x + 2\`, not \`−x − 2\`.',
                'Taking out only part of the common factor, e.g. writing \`2(3x² + 4.5x)\` instead of \`3x(2x + 3)\`.',
              ],
              examTips: [
                'Always check a factorisation by expanding it back. It takes seconds and catches sign errors reliably.',
                'Before anything else, check for a common factor — many quadratics become far easier once it is removed.',
              ],
              workedExamples: [
                {
                  prompt: 'Factorise x² − 3x − 10.',
                  steps: ['Look for two numbers that multiply to −10 and add to −3.', 'Since the product is negative, the numbers have opposite signs.', '−5 × 2 = −10 and −5 + 2 = −3, so the numbers are −5 and 2.', 'Therefore x² − 3x − 10 = (x − 5)(x + 2).', 'Check by expanding: x² + 2x − 5x − 10 = x² − 3x − 10 ✓'],
                  answer: '(x − 5)(x + 2)',
                },
                {
                  prompt: 'Factorise 49x² − 64.',
                  steps: ['Both terms are perfect squares: 49x² = (7x)² and 64 = 8².', 'This is a difference of two squares, a² − b² = (a + b)(a − b).', 'With a = 7x and b = 8, it factorises to (7x + 8)(7x − 8).'],
                  answer: '(7x + 8)(7x − 8)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the difference of two squares identity.', back: 'a² − b² = (a + b)(a − b)', difficulty: 'MEDIUM' },
            { front: 'How do you factorise x² + bx + c?', back: 'Find two numbers that multiply to c and add to b.', difficulty: 'MEDIUM' },
            { front: 'Expand (x + 3)².', back: 'x² + 6x + 9 — not x² + 9.', difficulty: 'MEDIUM' },
            { front: 'What should you always check for before factorising?', back: 'A highest common factor that can be taken outside a bracket.', difficulty: 'EASY' },
            { front: 'If c is negative in x² + bx + c, what do you know?', back: 'The two numbers in the brackets have opposite signs.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Factorise fully 3x² − 27. [2]',
              answer:
                'First take out the common factor 3, giving 3(x² − 9). Then x² − 9 is a difference of two squares, so it factorises to (x + 3)(x − 3). The full factorisation is 3(x + 3)(x − 3).',
              markScheme: [
                'Takes out the common factor 3 to give 3(x² − 9) (1)',
                'Factorises the difference of two squares: 3(x + 3)(x − 3) (1)',
              ],
              marks: 2,
              explanation:
                'The word "fully" is the instruction that matters. Stopping at 3(x² − 9) leaves a factorisable expression inside the bracket and loses the second mark.',
            },
          ],
        },
        {
          number: '2.2',
          slug: 'solving-quadratic-equations',
          title: 'Solving quadratic equations',
          summary: 'Solving by factorising and by the quadratic formula.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.2.1', statement: 'Solve quadratic equations by factorising, completing the square and using the formula.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'solving-quadratic-equations',
              title: 'Solving quadratic equations',
              readingMinutes: 6,
              body: `A quadratic equation has the form \`ax² + bx + c = 0\` and usually has **two** solutions.
### Step zero — rearrange to equal zero
Nothing works until everything is on one side. \`x² = 5x − 6\` must become \`x² − 5x + 6 = 0\` first.
### Solving by factorising
Factorise, then use the fact that if two things multiply to zero, **at least one must be zero**.
\`x² − 5x + 6 = 0\` → \`(x − 2)(x − 3) = 0\` → \`x = 2\` or \`x = 3\`.
### The quadratic formula
When factorising fails, use
\`x = (−b ± √(b² − 4ac)) / 2a\`
Write down a, b and c explicitly first, **with their signs**, before substituting. Most formula errors are sign errors made while substituting, not arithmetic errors afterwards.
### The discriminant
The part under the root, \`b² − 4ac\`, tells you how many solutions exist:
- **Positive** → two distinct real solutions.
- **Zero** → one repeated solution.
- **Negative** → no real solutions (the curve never crosses the x-axis).
### Presenting answers
Give both solutions. If the question asks for a specific number of decimal places or significant figures, round only at the very end — rounding early shifts the answer.`,
              analogy: 'The "equals zero" step is the whole trick: zero is the only number where a product tells you something definite about its factors. If two numbers multiply to 12 you know nothing; if they multiply to 0, one of them *is* 0.',
              misconceptions: [
                'Using the formula without rearranging to = 0 first, so a, b and c are wrong from the start.',
                'Giving only one solution. A quadratic normally has two, and both are usually needed for full marks.',
                'Mis-signing b when b is negative. For \`x² − 3x + 2\`, b = −3, so −b = +3.',
              ],
              examTips: [
                'If a question says "give your answers to 2 decimal places", that is a strong hint the equation does not factorise — go straight to the formula.',
                'State a, b and c on their own line before substituting. It costs one line and prevents the most common error in the topic.',
              ],
              workedExamples: [
                {
                  prompt: 'Solve x² − 5x + 6 = 0 by factorising.',
                  steps: ['Find two numbers that multiply to 6 and add to −5: these are −2 and −3.', 'Factorise: (x − 2)(x − 3) = 0.', 'For the product to be zero, one bracket must be zero.', 'So x − 2 = 0 giving x = 2, or x − 3 = 0 giving x = 3.'],
                  answer: 'x = 2 or x = 3',
                },
                {
                  prompt: 'Solve 2x² + 3x − 4 = 0, giving answers to 2 decimal places.',
                  steps: ['Identify a = 2, b = 3, c = −4.', 'Substitute into x = (−b ± √(b² − 4ac)) / 2a: x = (−3 ± √(9 − 4×2×(−4))) / 4.', 'The discriminant is 9 + 32 = 41, and √41 ≈ 6.4031.', 'x = (−3 + 6.4031)/4 = 0.8508 or x = (−3 − 6.4031)/4 = −2.3508.'],
                  answer: 'x = 0.85 or x = −2.35 (2 d.p.)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the quadratic formula.', back: 'x = (−b ± √(b² − 4ac)) / 2a', difficulty: 'MEDIUM' },
            { front: 'What must you do before solving a quadratic?', back: 'Rearrange it so one side equals zero.', difficulty: 'EASY' },
            { front: 'What does a negative discriminant mean?', back: 'There are no real solutions — the curve does not cross the x-axis.', difficulty: 'HARD' },
            { front: 'What does b² − 4ac = 0 mean?', back: 'There is exactly one repeated solution.', difficulty: 'HARD' },
            { front: 'Why does factorising to zero solve the equation?', back: 'If a product equals zero, at least one factor must be zero.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Solve the equation x² + 2x − 8 = 0, showing your method. [3]',
              answer:
                'Look for two numbers that multiply to −8 and add to +2: these are +4 and −2. So the equation factorises to (x + 4)(x − 2) = 0. For the product to be zero, either x + 4 = 0 giving x = −4, or x − 2 = 0 giving x = 2.',
              markScheme: [
                'Correct factorisation (x + 4)(x − 2) = 0 (1)',
                'Sets each factor equal to zero (1)',
                'Both solutions x = −4 and x = 2 (1)',
              ],
              marks: 3,
              explanation:
                'Giving only x = 2 loses a mark. Both roots are required, and the middle mark is for showing the reasoning rather than jumping straight to answers.',
              hint: 'Which two numbers multiply to −8 and add to 2?',
            },
          ],
        },
        {
          number: '2.3',
          slug: 'sequences',
          title: 'Sequences',
          summary: 'Term-to-term and position-to-term rules, including the nth term.',
          objectives: [
            { code: '2.3.1', statement: 'Continue sequences and find the nth term of linear and simple quadratic sequences.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'sequences',
              title: 'Sequences',
              readingMinutes: 5,
              body: `### Linear (arithmetic) sequences
A sequence with a **constant difference** between terms.
To find the nth term:
1. Find the **common difference d**. This is the coefficient of n.
2. Work out the **zero-th term** — what would come before the first term.
3. The nth term is \`dn + (zero-th term)\`.
For 5, 8, 11, 14: d = 3, and the term before 5 would be 2, so the nth term is \`3n + 2\`. Check with n = 1: 3(1) + 2 = 5 ✓
### Why the "zero-th term" method works
Writing \`3n\` alone gives 3, 6, 9, 12 — each term is 2 less than the sequence we want, so we add 2. Understanding this makes the method memorable rather than mechanical.
### Quadratic sequences
If the **first differences** are not constant, look at the **second differences**. If those are constant, the sequence is quadratic and the coefficient of n² is **half the second difference**.
For 3, 8, 15, 24: first differences 5, 7, 9; second difference 2, so the n² coefficient is 1. Subtracting n² (1, 4, 9, 16) from the sequence leaves 2, 4, 6, 8 — which is 2n. So the nth term is \`n² + 2n\`.
### Other sequences worth recognising
Square numbers (\`n²\`), cube numbers (\`n³\`), triangular numbers, and geometric sequences where each term is **multiplied** by a constant.`,
              analogy: 'The nth term is a formula that jumps straight to any position, like a page number rather than turning pages one at a time. That is exactly why it beats the term-to-term rule when asked for the 100th term.',
              misconceptions: [
                'Writing the nth term as "+3" or "3n" alone. A rule must let you calculate any term, so it needs both the difference and the constant.',
                'Assuming every sequence is linear. If first differences vary, check second differences before forcing a linear rule.',
                'Testing the formula on no terms. Substituting n = 1 takes seconds and catches a wrong constant immediately.',
              ],
              examTips: [
                'Always verify your nth term by substituting n = 1 and n = 2 and checking against the given sequence.',
                'For quadratic sequences, remember the n² coefficient is **half** the constant second difference — not the second difference itself.',
              ],
              workedExamples: [
                {
                  prompt: 'Find the nth term of the sequence 7, 12, 17, 22, ...',
                  steps: ['The common difference is 5, so the rule begins 5n.', '5n alone gives 5, 10, 15, 20 — each is 2 less than the sequence.', 'So add 2: the nth term is 5n + 2.', 'Check n = 1: 5(1) + 2 = 7 ✓ and n = 4: 5(4) + 2 = 22 ✓'],
                  answer: '5n + 2',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you find the nth term of a linear sequence?', back: 'The common difference gives the coefficient of n; add the zero-th term as the constant.', difficulty: 'MEDIUM' },
            { front: 'How do you recognise a quadratic sequence?', back: 'The first differences vary but the second differences are constant.', difficulty: 'HARD' },
            { front: 'In a quadratic sequence, what is the coefficient of n²?', back: 'Half the constant second difference.', difficulty: 'HARD' },
            { front: 'How should you check an nth term rule?', back: 'Substitute n = 1 and n = 2 and compare with the given sequence.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A sequence begins 4, 9, 14, 19. Find the 50th term.',
              answer: '249',
              markScheme: [
                'Identifies the nth term as 5n − 1 (1)',
                'Substitutes n = 50 (1)',
                'Answer 249 (1)',
              ],
              marks: 3,
              explanation:
                'The common difference is 5 and the zero-th term is −1, giving 5n − 1. Then 5(50) − 1 = 249. Continuing the sequence by hand to the 50th term is far slower and error-prone.',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'coordinate-geometry',
      title: 'Coordinate geometry',
      summary: 'Gradient, the equation of a straight line, and parallel and perpendicular lines.',
      subtopics: [
        {
          number: '3.1',
          slug: 'straight-line-graphs',
          title: 'Straight line graphs',
          summary: 'Gradient, intercept, y = mx + c, and parallel and perpendicular lines.',
          objectives: [
            { code: '3.1.1', statement: 'Find the gradient and equation of a straight line and interpret y = mx + c.', tier: 'CORE' },
            { code: '3.1.2', statement: 'Determine the conditions for lines to be parallel or perpendicular.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'straight-line-graphs',
              title: 'Straight line graphs',
              readingMinutes: 6,
              body: `### The equation of a straight line
\`y = mx + c\` where **m** is the **gradient** and **c** is the **y-intercept** — where the line crosses the y-axis.
### Gradient
\`m = (y₂ − y₁) / (x₂ − x₁)\` — the change in y divided by the change in x, often remembered as "rise over run".
- A **positive** gradient slopes upward from left to right.
- A **negative** gradient slopes downward.
- A **steeper** line has a larger magnitude of gradient.
Take the coordinates in the **same order** on top and bottom. Swapping one but not the other flips the sign.
### Finding the equation from two points
1. Calculate the gradient m.
2. Substitute m and one point into \`y = mx + c\` and solve for c.
3. Write the full equation.
### Parallel and perpendicular
- **Parallel** lines have **equal gradients**: m₁ = m₂.
- **Perpendicular** lines have gradients whose product is **−1**: \`m₁ × m₂ = −1\`, so m₂ is the **negative reciprocal** of m₁.
If a line has gradient 2, a perpendicular line has gradient −1/2. If it has gradient −3/4, a perpendicular line has gradient 4/3.
### Midpoint and length
- **Midpoint** = the mean of the coordinates: \`((x₁+x₂)/2, (y₁+y₂)/2)\`.
- **Length** by Pythagoras: \`√((x₂−x₁)² + (y₂−y₁)²)\`.`,
              analogy: 'The negative reciprocal makes sense physically: turning a slope through 90° swaps how far you go across with how far you go up, and reverses the direction — which is exactly "flip the fraction and change the sign".',
              misconceptions: [
                'Calculating gradient as change in x over change in y. It is always **y over x**.',
                'Saying perpendicular gradients are just negatives of each other. The gradient perpendicular to 2 is −1/2, not −2.',
                'Reading the y-intercept off a graph without checking the scale on the axes.',
              ],
              examTips: [
                'When finding a line through two points, always verify by substituting the *other* point at the end — it should satisfy the equation.',
                'Rearrange any equation into y = mx + c form before comparing gradients; \`2y = 6x + 4\` has gradient 3, not 6.',
              ],
              workedExamples: [
                {
                  prompt: 'Find the equation of the line passing through (1, 5) and (3, 11).',
                  steps: ['Gradient m = (11 − 5) / (3 − 1) = 6/2 = 3.', 'Substitute m = 3 and the point (1, 5) into y = mx + c: 5 = 3(1) + c.', 'So c = 2.', 'The equation is y = 3x + 2. Check with (3, 11): 3(3) + 2 = 11 ✓'],
                  answer: 'y = 3x + 2',
                },
                {
                  prompt: 'A line has equation y = 4x − 7. Find the gradient of a line perpendicular to it.',
                  steps: ['The gradient of the given line is m₁ = 4.', 'Perpendicular gradients satisfy m₁ × m₂ = −1.', 'So m₂ = −1/4.'],
                  answer: '−1/4',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'In y = mx + c, what do m and c represent?', back: 'm is the gradient; c is the y-intercept.', difficulty: 'EASY' },
            { front: 'Give the gradient formula.', back: 'm = (y₂ − y₁) / (x₂ − x₁)', difficulty: 'MEDIUM' },
            { front: 'What is true of parallel lines?', back: 'They have equal gradients.', difficulty: 'EASY' },
            { front: 'What is the condition for perpendicular lines?', back: 'The product of their gradients is −1, so each is the negative reciprocal of the other.', difficulty: 'HARD' },
            { front: 'Give the midpoint formula.', back: '((x₁ + x₂)/2, (y₁ + y₂)/2)', difficulty: 'MEDIUM' },
            { front: 'Give the formula for the length of a line segment.', back: '√((x₂ − x₁)² + (y₂ − y₁)²)', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Find the equation of the line perpendicular to y = 2x + 1 that passes through the point (4, 3). [3]',
              answer:
                'The given line has gradient 2, so a perpendicular line has gradient −1/2, the negative reciprocal. Substituting m = −1/2 and the point (4, 3) into y = mx + c gives 3 = −1/2(4) + c, so 3 = −2 + c and c = 5. The equation is y = −1/2 x + 5.',
              markScheme: [
                'Perpendicular gradient −1/2 (1)',
                'Substitutes the point into y = mx + c to find c (1)',
                'Correct equation y = −½x + 5 (1)',
              ],
              marks: 3,
              explanation:
                'A quick check: substituting x = 4 gives −2 + 5 = 3, matching the given point. That verification catches an arithmetic slip in c immediately.',
              hint: 'What is the negative reciprocal of 2?',
            },
          ],
        },
      ],
    },
    {
      number: '4',
      slug: 'mensuration',
      title: 'Mensuration',
      summary: 'Area, perimeter, surface area and volume of standard shapes and solids.',
      subtopics: [
        {
          number: '4.1',
          slug: 'area-volume-and-surface-area',
          title: 'Area, volume and surface area',
          summary: 'The standard formulae, and choosing the right one.',
          objectives: [
            { code: '4.1.1', statement: 'Calculate perimeter and area of common shapes including circles and compound shapes.', tier: 'CORE' },
            { code: '4.1.2', statement: 'Calculate surface area and volume of prisms, cylinders, cones and spheres.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'area-volume-and-surface-area',
              title: 'Area, volume and surface area',
              readingMinutes: 6,
              body: `### Areas worth knowing cold
- Rectangle: \`length × width\`
- Triangle: \`½ × base × height\` (perpendicular height, not the slant side)
- Parallelogram: \`base × perpendicular height\`
- Trapezium: \`½(a + b) × h\`
- Circle: \`A = πr²\`, circumference \`C = 2πr\` or \`πd\`
### Volumes
- **Prism** (constant cross-section): \`area of cross-section × length\`
- **Cylinder**: \`πr²h\`
- **Cone**: \`⅓πr²h\`
- **Sphere**: \`4/3 πr³\`
- **Pyramid**: \`⅓ × base area × height\`
The cone and pyramid both carry the \`⅓\`, which is the factor most often dropped.
### Surface areas
- **Cylinder** (closed): \`2πr² + 2πrh\` — two circles plus the curved surface, which unrolls into a rectangle of width \`2πr\` and height h.
- **Cone**: \`πr² + πrl\`, where **l is the slant height**, not the vertical height.
- **Sphere**: \`4πr²\`
If a question says "open cylinder" or "no lid", leave out one or both circles — read carefully.
### Compound shapes
Split into standard shapes, calculate each, then add or subtract. Label each part so the method is visible to the examiner.
### Units — a reliable source of lost marks
Area is in **square** units, volume in **cubic** units. When converting, remember 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³, because the conversion factor is squared or cubed.`,
              analogy: 'The curved surface of a cylinder is a label peeled off a tin: it unrolls into a rectangle whose width is the circumference. That is exactly where \`2πrh\` comes from, so the formula need not be memorised blindly.',
              misconceptions: [
                'Using the slant height in the cone **volume** formula. Volume uses the perpendicular height h; the slant height l belongs in the curved surface area.',
                'Converting areas with a linear factor — 1 m² is 10 000 cm², not 100.',
                'Forgetting the ⅓ in cone and pyramid volumes, which triples the answer.',
              ],
              examTips: [
                'Write the formula down before substituting. It earns method marks even if the arithmetic later goes wrong.',
                'Keep π in your calculator to full precision and round only at the end, unless asked to leave the answer in terms of π.',
              ],
              workedExamples: [
                {
                  prompt: 'A cylinder has radius 5 cm and height 12 cm. Find its volume and total surface area, to 3 significant figures.',
                  steps: ['Volume = πr²h = π × 5² × 12 = 300π ≈ 942.48 cm³.', 'Surface area = 2πr² + 2πrh.', '2π(5²) = 50π and 2π(5)(12) = 120π.', 'Total = 170π ≈ 534.07 cm².'],
                  answer: 'Volume ≈ 942 cm³; surface area ≈ 534 cm²',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Volume of a cylinder?', back: 'πr²h', difficulty: 'EASY' },
            { front: 'Volume of a cone?', back: '⅓πr²h — note the one third.', difficulty: 'MEDIUM' },
            { front: 'Volume of a sphere?', back: '4/3 πr³', difficulty: 'MEDIUM' },
            { front: 'Curved surface area of a cone?', back: 'πrl, where l is the slant height.', difficulty: 'HARD' },
            { front: 'Total surface area of a closed cylinder?', back: '2πr² + 2πrh', difficulty: 'HARD' },
            { front: 'How many cm² are in 1 m²?', back: '10 000 — the linear factor of 100 is squared.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'A cone has radius 3 cm and perpendicular height 8 cm. Calculate its volume, giving your answer to 3 significant figures.',
              answer: '75.4 cm³',
              markScheme: [
                'Uses V = ⅓πr²h (1)',
                'Substitutes correctly: ⅓ × π × 3² × 8 (1)',
                'Answer 75.4 cm³ (accept 24π) (1)',
              ],
              marks: 3,
              explanation:
                '⅓ × π × 9 × 8 = 24π ≈ 75.398, so 75.4 cm³ to 3 s.f. Omitting the ⅓ gives 226 cm³ — a common and costly slip.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'trigonometry',
      title: 'Trigonometry',
      summary: 'Pythagoras, SOHCAHTOA, and the sine and cosine rules.',
      subtopics: [
        {
          number: '5.1',
          slug: 'pythagoras-and-trigonometry',
          title: 'Pythagoras and right-angled trigonometry',
          summary: 'Finding sides and angles in right-angled triangles.',
          objectives: [
            { code: '5.1.1', statement: 'Apply Pythagoras\' theorem and the trigonometric ratios in right-angled triangles.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'pythagoras-and-trigonometry',
              title: 'Pythagoras and right-angled trigonometry',
              readingMinutes: 6,
              body: `### Pythagoras' theorem
For a right-angled triangle, \`a² + b² = c²\`, where **c is the hypotenuse** — the side opposite the right angle, and always the longest.
- Finding the hypotenuse: **add** the squares, then square root.
- Finding a shorter side: **subtract** the squares, then square root.
Getting this the wrong way round produces an impossible triangle, so sense-check: the hypotenuse must be the largest value.
### The trigonometric ratios — SOHCAHTOA
Label the sides **relative to the angle you are using**:
- **Hypotenuse** — opposite the right angle (fixed).
- **Opposite** — opposite your angle.
- **Adjacent** — next to your angle.
Then:
- \`sin θ = O/H\`
- \`cos θ = A/H\`
- \`tan θ = O/A\`
### Choosing which ratio
Mark the side you know and the side you want, then pick the ratio containing exactly those two. This is the whole decision, and doing it explicitly prevents most errors.
### Finding an angle
Use the inverse functions: \`sin⁻¹\`, \`cos⁻¹\`, \`tan⁻¹\`. If \`sin θ = 0.5\` then \`θ = sin⁻¹(0.5) = 30°\`.
### Angles of elevation and depression
The **angle of elevation** is measured upward from the horizontal, the **angle of depression** downward from the horizontal. Both are measured **from the horizontal**, never from the vertical — a frequent source of wrong diagrams.
### Non-right-angled triangles
- **Sine rule**: \`a/sin A = b/sin B = c/sin C\` — use when you have a matching side-and-angle pair.
- **Cosine rule**: \`a² = b² + c² − 2bc cos A\` — use for three sides, or two sides and the included angle.`,
              analogy: 'Choosing a trig ratio is like choosing a spanner by size: identify the two sides involved, and exactly one of sin, cos or tan fits them. Guessing wastes time; labelling first makes the choice automatic.',
              misconceptions: [
                'Labelling opposite and adjacent from the right angle rather than from the angle in use. They swap depending on which angle you are working with.',
                'Subtracting when finding the hypotenuse. Adding is required; subtraction is only for finding a shorter side.',
                'Leaving the calculator in radians. It must be in **degrees** for IGCSE, and an answer that looks wildly wrong is often this.',
              ],
              examTips: [
                'Always draw and label the triangle, marking which side is opposite, adjacent and hypotenuse for the angle you are using.',
                'Check your calculator is in degree mode at the start of the paper — a single wrong mode setting can ruin every trigonometry question.',
              ],
              workedExamples: [
                {
                  prompt: 'A ladder 6 m long leans against a wall, with its foot 2 m from the base. Find the angle between the ladder and the ground, to 1 decimal place.',
                  steps: ['The ladder is the hypotenuse (6 m); the 2 m distance is adjacent to the angle at the ground.', 'Adjacent and hypotenuse means use cosine: cos θ = A/H = 2/6.', 'cos θ = 0.3333, so θ = cos⁻¹(0.3333).', 'θ ≈ 70.5°.'],
                  answer: '70.5°',
                },
                {
                  prompt: 'A right-angled triangle has shorter sides 5 cm and 12 cm. Find the hypotenuse.',
                  steps: ['Use a² + b² = c² with a = 5 and b = 12.', '5² + 12² = 25 + 144 = 169.', 'c = √169 = 13.'],
                  answer: '13 cm',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State Pythagoras\' theorem.', back: 'a² + b² = c², where c is the hypotenuse.', difficulty: 'EASY' },
            { front: 'What does SOHCAHTOA stand for?', back: 'sin = O/H, cos = A/H, tan = O/A.', difficulty: 'EASY' },
            { front: 'How do you find an angle from a ratio?', back: 'Use the inverse function: sin⁻¹, cos⁻¹ or tan⁻¹.', difficulty: 'MEDIUM' },
            { front: 'State the sine rule.', back: 'a/sin A = b/sin B = c/sin C', difficulty: 'HARD' },
            { front: 'State the cosine rule.', back: 'a² = b² + c² − 2bc cos A', difficulty: 'HARD' },
            { front: 'From where is an angle of elevation measured?', back: 'Upward from the horizontal.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'In a right-angled triangle, the hypotenuse is 10 cm and one angle is 30°. Calculate the length of the side opposite that angle.',
              answer: '5 cm',
              markScheme: [
                'Identifies sine as the correct ratio (opposite and hypotenuse) (1)',
                'Writes sin 30° = x/10 (1)',
                'Answer 5 cm (1)',
              ],
              marks: 3,
              explanation:
                'sin 30° = 0.5 exactly, so x = 10 × 0.5 = 5 cm. Recognising which ratio links the known and required sides is the whole skill here.',
            },
          ],
        },
      ],
    },
    {
      number: '6',
      slug: 'probability',
      title: 'Probability',
      summary: 'Single and combined events, tree diagrams and Venn diagrams.',
      subtopics: [
        {
          number: '6.1',
          slug: 'probability',
          title: 'Probability of single and combined events',
          summary: 'Calculating probabilities and using tree diagrams.',
          objectives: [
            { code: '6.1.1', statement: 'Calculate probabilities of single and combined events using tree and Venn diagrams.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'probability',
              title: 'Probability of single and combined events',
              readingMinutes: 6,
              body: `### Basics
\`P(event) = number of favourable outcomes / total number of outcomes\`, always between 0 and 1.
\`P(not A) = 1 − P(A)\`, which is often the fastest route to an answer.
### The two rules
- **AND → multiply.** For two events both happening: \`P(A and B) = P(A) × P(B)\` (when independent).
- **OR → add.** For either of two mutually exclusive events: \`P(A or B) = P(A) + P(B)\`.
Reading the question for the words "and" and "or" tells you which operation to use.
### Tree diagrams
Each branch shows an outcome with its probability. To use one:
- **Multiply along** the branches for a particular path;
- **Add** the results of all paths that satisfy the condition.
Probabilities on each set of branches must sum to 1 — a quick check that catches errors early.
### With and without replacement
This distinction decides the whole question.
- **With replacement**: the item goes back, so the total stays the same and probabilities on the second set of branches are **unchanged**.
- **Without replacement**: the total decreases by one, **and** the count of whatever was removed decreases too. From 5 red in 8 balls, drawing a red leaves 4 red in 7.
### "At least one"
Almost always faster via the complement:
\`P(at least one) = 1 − P(none)\`
Listing every way of getting one, two or three is slow and error-prone; calculating "none" is usually a single product.`,
              analogy: 'Without replacement is like dealing cards rather than rolling a die: every card dealt changes what remains, so the second probability must be recalculated from a smaller deck.',
              misconceptions: [
                'Keeping the same denominator without replacement. Both the numerator and the total must be reduced.',
                'Adding when the question means "and". Two events both happening requires multiplication.',
                'Listing all cases for "at least one" instead of using 1 − P(none), which is far quicker and less error-prone.',
              ],
              examTips: [
                'Label tree diagram branches with the fractions as you go, and check each pair sums to 1 before calculating.',
                'The words "at least one" should immediately prompt the complement method.',
              ],
              workedExamples: [
                {
                  prompt: 'A bag contains 5 red and 3 blue balls. Two are taken without replacement. Find the probability that both are red.',
                  steps: ['P(first red) = 5/8.', 'After removing a red ball, 4 red remain out of 7 balls, so P(second red) = 4/7.', 'Both happening means multiply: 5/8 × 4/7 = 20/56.', 'Simplify: 20/56 = 5/14.'],
                  answer: '5/14',
                },
                {
                  prompt: 'The probability a train is late is 0.2. Over two days, find the probability it is late at least once.',
                  steps: ['P(not late on one day) = 1 − 0.2 = 0.8.', 'P(not late on both days) = 0.8 × 0.8 = 0.64.', 'P(at least one late) = 1 − 0.64 = 0.36.'],
                  answer: '0.36',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does P(not A) equal?', back: '1 − P(A)', difficulty: 'EASY' },
            { front: 'When do you multiply probabilities?', back: 'When both events must happen — the word "and".', difficulty: 'MEDIUM' },
            { front: 'How do you calculate "at least one"?', back: '1 − P(none), which is almost always faster than listing cases.', difficulty: 'HARD' },
            { front: 'What changes without replacement?', back: 'Both the number of that item and the total decrease for the next draw.', difficulty: 'HARD' },
            { front: 'How do you use a tree diagram?', back: 'Multiply along branches for one path, then add the results of all paths that satisfy the condition.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A box contains 4 green and 6 yellow counters. Two counters are taken at random without replacement. Calculate the probability that they are different colours. [3]',
              answer:
                'There are two ways to get different colours. P(green then yellow) = 4/10 × 6/9 = 24/90. P(yellow then green) = 6/10 × 4/9 = 24/90. Since either satisfies the condition, add them: 24/90 + 24/90 = 48/90 = 8/15.',
              markScheme: [
                'Identifies both orders: green-yellow and yellow-green (1)',
                'Correct products using reduced denominators, e.g. 4/10 × 6/9 (1)',
                'Adds and simplifies to 8/15 (1)',
              ],
              marks: 3,
              explanation:
                'Forgetting the second order halves the answer — the most common error here. Note the denominator drops from 10 to 9 because the first counter is not replaced.',
              hint: 'There are two different orders that give two different colours.',
            },
          ],
        },
      ],
    },
    {
      number: '7',
      slug: 'statistics',
      title: 'Statistics',
      summary: 'Averages, data representation and interpreting statistical diagrams.',
      subtopics: [
        {
          number: '7.1',
          slug: 'averages-and-data',
          title: 'Averages and representing data',
          summary: 'Mean, median, mode, range, and choosing the right average.',
          objectives: [
            { code: '7.1.1', statement: 'Calculate and interpret mean, median, mode and range, including from frequency tables.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'averages-and-data',
              title: 'Averages and representing data',
              readingMinutes: 6,
              body: `### The three averages
- **Mean** — add all values, divide by how many. Uses every value, but is **distorted by extreme values**.
- **Median** — the middle value **when the data is in order**. Unaffected by extremes.
- **Mode** — the most frequent value. The only average usable for non-numerical data such as favourite colour.
- **Range** — largest minus smallest. A measure of **spread**, not an average.
### Choosing which average
This is a favourite exam question:
- Use the **median** when there are **outliers**, such as one very high salary in a small company.
- Use the **mode** for **categorical** data.
- Use the **mean** when data is fairly symmetric and every value should count.
### Median position
For n values in order, the median is at position \`(n + 1)/2\`. With an even number of values, take the **mean of the middle two**. Forgetting to order the data first is the single most common error in the topic.
### Mean from a frequency table
Multiply each value by its frequency, add those products, then divide by the **total frequency**:
\`mean = Σ(fx) / Σf\`
Dividing by the number of *rows* rather than the total frequency is a frequent mistake.
### Grouped data
With grouped data you cannot know exact values, so use the **midpoint** of each class as x. The result is an **estimate** of the mean — and questions often award a mark for saying so.
The **modal class** is the group with the highest frequency, not the highest midpoint.`,
              analogy: 'The mean is a see-saw balance point, so one very heavy value at the far end tips it a long way. The median just counts along to the middle, which is why it shrugs off a millionaire in a room of ordinary earners.',
              misconceptions: [
                'Finding the median without sorting the data. The middle of an unordered list is meaningless.',
                'Dividing by the number of rows in a frequency table instead of the total frequency.',
                'Calling the range an average. It measures spread.',
              ],
              examTips: [
                'For grouped data, always write "estimate of the mean" — the word estimate is often worth a mark because midpoints are assumptions.',
                'When asked which average is "most appropriate", name it **and** justify with reference to outliers or data type.',
              ],
              workedExamples: [
                {
                  prompt: 'Find the median of 7, 3, 9, 4, 12, 6.',
                  steps: ['Put the values in order: 3, 4, 6, 7, 9, 12.', 'There are 6 values, an even number, so the median is the mean of the 3rd and 4th.', 'Those are 6 and 7, so the median is (6 + 7)/2 = 6.5.'],
                  answer: '6.5',
                },
                {
                  prompt: 'The salaries in a small firm are £18k, £20k, £21k, £22k and £150k. Which average best represents a typical salary, and why?',
                  steps: ['The mean is (18+20+21+22+150)/5 = £46.2k, which is higher than four of the five salaries.', 'The £150k value is an outlier distorting the mean.', 'The median is the middle value when ordered: £21k, which is typical of most employees.'],
                  answer: 'The median (£21k), because the single very high salary is an outlier that pulls the mean up to a figure no ordinary employee earns.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you find the median?', back: 'Order the data, then take the middle value (or the mean of the middle two if there is an even number).', difficulty: 'EASY' },
            { front: 'When is the median a better average than the mean?', back: 'When the data contains outliers, which distort the mean.', difficulty: 'MEDIUM' },
            { front: 'Give the formula for the mean from a frequency table.', back: 'Σ(fx) / Σf — the sum of value × frequency, divided by the total frequency.', difficulty: 'HARD' },
            { front: 'Why is the mean from grouped data only an estimate?', back: 'Exact values are unknown, so class midpoints are used as an assumption.', difficulty: 'HARD' },
            { front: 'What is the range?', back: 'Largest value minus smallest value — a measure of spread, not an average.', difficulty: 'EASY' },
            { front: 'Which average can be used for categorical data?', back: 'The mode.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'A class of 30 students sat a test. Explain why the median might be a more suitable average than the mean if two students scored zero because they were absent. [2]',
              answer:
                'The two zero scores are outliers that are much lower than the rest of the data, and because the mean uses every value it would be pulled down by them, giving a figure lower than most students actually achieved. The median is the middle value once the data is ordered, so it is unaffected by these two extreme scores and better represents a typical performance.',
              markScheme: [
                'The zeros are outliers which distort/lower the mean (1)',
                'The median is unaffected by extreme values, so better represents typical performance (1)',
              ],
              marks: 2,
              explanation:
                'This is the standard "which average" reasoning: name the effect of the outlier on the mean, then explain why the median resists it.',
            },
          ],
        },
      ],
    },
  ],
};
