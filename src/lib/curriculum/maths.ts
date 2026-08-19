import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Mathematics 0580 — full syllabus structure.
 *
 * Organised as the nine strands of the published specification. Worked examples
 * carry the whole method rather than just the answer, because in mathematics the
 * method is where the marks are. Nothing here is official Cambridge wording or a
 * past-paper question.
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
      summary: 'Number types, fractions, indices, standard form, ratio, percentages, bounds and surds.',
      subtopics: [
        {
          number: '1.1',
          slug: 'types-of-number-hcf-lcm',
          title: 'Types of number, HCF and LCM',
          summary: 'Primes, factors, multiples, and finding HCF and LCM by prime factorisation.',
          objectives: [
            { code: '1.1.1', statement: 'Identify and use natural numbers, primes, factors, multiples, squares and cubes.', tier: 'CORE' },
            { code: '1.1.2', statement: 'Express numbers as products of prime factors and find the HCF and LCM.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'types-of-number-hcf-lcm',
              title: 'Types of number, HCF and LCM',
              readingMinutes: 5,
              body: `### The vocabulary
- **Factor** — a number that divides exactly into another. Factors of 12: 1, 2, 3, 4, 6, 12.
- **Multiple** — the result of multiplying by an integer. Multiples of 12: 12, 24, 36, …
- **Prime** — exactly **two** factors, itself and 1. So 2, 3, 5, 7, 11, … Note **1 is not prime** (it has only one factor) and **2 is the only even prime**.
- **Square numbers** 1, 4, 9, 16; **cube numbers** 1, 8, 27, 64.
### Prime factorisation
Every integer above 1 breaks into a unique product of primes. Use a factor tree, dividing by the smallest prime that works each time:
\`60 = 2 × 2 × 3 × 5 = 2² × 3 × 5\`
### HCF and LCM from prime factors
Write both numbers in prime factor form, then:
- **HCF** (highest common factor) — multiply the **common** primes, taking the **lower** power of each.
- **LCM** (lowest common multiple) — multiply **all** primes appearing, taking the **higher** power of each.
For 60 = 2²×3×5 and 72 = 2³×3²:
- HCF = 2² × 3 = 12
- LCM = 2³ × 3² × 5 = 360
A useful check: \`HCF × LCM = product of the two numbers\`. Here 12 × 360 = 4320 = 60 × 72 ✓
### Which one does a word problem want?
- Things happening **together again** (buses, bells, laps) → **LCM**.
- Splitting into **equal largest groups** with nothing left over → **HCF**.`,
              analogy: 'Prime factors are a number\'s DNA. Once both numbers are written in that form, the HCF is what they share and the LCM is everything either of them needs — no guessing required.',
              misconceptions: [
                'Calling 1 a prime number. A prime has exactly two distinct factors; 1 has one.',
                'Taking the higher power for HCF. HCF uses the **lower** power of each shared prime.',
                'Listing multiples by hand to find the LCM of large numbers, which is slow and error-prone compared with prime factorisation.',
              ],
              examTips: [
                'Use the HCF × LCM = product check whenever both are asked for — it catches an error in seconds.',
                'Read word problems for the signal: "at the same time again" means LCM, "largest equal groups" means HCF.',
              ],
              workedExamples: [
                {
                  prompt: 'Find the HCF and LCM of 24 and 36.',
                  steps: ['Prime factorise: 24 = 2³ × 3 and 36 = 2² × 3².', 'HCF: take common primes to the lower power — 2² × 3 = 12.', 'LCM: take all primes to the higher power — 2³ × 3² = 72.', 'Check: 12 × 72 = 864 = 24 × 36 ✓'],
                  answer: 'HCF = 12, LCM = 72',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is a prime number?', back: 'A number with exactly two factors, itself and 1. Note 1 is not prime.', difficulty: 'EASY' },
            { front: 'How do you find the HCF from prime factors?', back: 'Multiply the common primes, taking the lower power of each.', difficulty: 'MEDIUM' },
            { front: 'How do you find the LCM from prime factors?', back: 'Multiply all primes that appear, taking the higher power of each.', difficulty: 'MEDIUM' },
            { front: 'What check links HCF and LCM?', back: 'HCF × LCM = the product of the two numbers.', difficulty: 'HARD' },
            { front: 'Which is the only even prime?', back: '2', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Two lighthouses flash every 12 seconds and every 18 seconds. They flash together now. After how many seconds will they next flash together?',
              answer: '36',
              markScheme: [
                'Recognises this requires the LCM (1)',
                'Correct prime factors or method: 12 = 2²×3, 18 = 2×3² (1)',
                'LCM = 36 seconds (1)',
              ],
              marks: 3,
              explanation:
                '"Flash together again" is the classic LCM signal. Taking the higher power of each prime gives 2² × 3² = 36.',
            },
          ],
        },
        {
          number: '1.2',
          slug: 'fractions-decimals-percentages',
          title: 'Fractions, decimals and percentages',
          summary: 'Converting between them and calculating with fractions.',
          objectives: [
            { code: '1.2.1', statement: 'Convert between fractions, decimals and percentages and order them.', tier: 'CORE' },
            { code: '1.2.2', statement: 'Calculate with fractions, including mixed numbers.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'fractions-decimals-percentages',
              title: 'Fractions, decimals and percentages',
              readingMinutes: 5,
              body: `### Converting
- **Fraction → decimal**: divide top by bottom. \`3/8 = 0.375\`
- **Decimal → percentage**: multiply by 100. \`0.375 = 37.5%\`
- **Percentage → fraction**: put over 100 and simplify. \`37.5% = 375/1000 = 3/8\`
To **order** a mixed list, convert everything to decimals first — comparing decimals is far safer than comparing fractions by eye.
### Calculating with fractions
- **Adding and subtracting** — you need a **common denominator**. \`2/3 + 1/4 = 8/12 + 3/12 = 11/12\`
- **Multiplying** — multiply tops and bottoms; no common denominator needed. \`2/3 × 4/5 = 8/15\`
- **Dividing** — **multiply by the reciprocal** (flip the second fraction). \`2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6\`
### Mixed numbers
Convert to **improper fractions before** calculating, then convert back at the end. \`2¼ = 9/4\`. Trying to add or multiply mixed numbers directly is where most errors appear.
### Recurring decimals
A fraction whose denominator has prime factors other than 2 and 5 gives a **recurring** decimal: \`1/3 = 0.333… = 0.3̇\`. A denominator of only 2s and 5s terminates.`,
              analogy: 'Adding fractions without a common denominator is like adding lengths in metres and feet — the numbers are meaningless until both are in the same unit. The denominator *is* the unit.',
              misconceptions: [
                'Adding denominators: \`1/2 + 1/3\` is not \`2/5\`. Only the numerators add, once denominators match.',
                'Finding a common denominator before multiplying — unnecessary, and it makes the arithmetic harder.',
                'Multiplying mixed numbers directly, e.g. treating \`2½ × 2\` as \`4½\`. Convert to \`5/2\` first.',
              ],
              examTips: [
                'For ordering questions, convert everything to decimals to 3 decimal places — it is quicker and far less error-prone.',
                'Show the improper-fraction conversion as a separate line; method marks are available even if the final arithmetic slips.',
              ],
              workedExamples: [
                {
                  prompt: 'Calculate 2¼ ÷ 1½, giving your answer as a mixed number.',
                  steps: ['Convert to improper fractions: 2¼ = 9/4 and 1½ = 3/2.', 'Dividing means multiplying by the reciprocal: 9/4 × 2/3.', '= 18/12, which simplifies to 3/2.', 'Convert back: 3/2 = 1½.'],
                  answer: '1½',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you divide by a fraction?', back: 'Multiply by its reciprocal — flip the second fraction.', difficulty: 'MEDIUM' },
            { front: 'What must be true before adding fractions?', back: 'They must have a common denominator.', difficulty: 'EASY' },
            { front: 'How do you convert a fraction to a percentage?', back: 'Divide top by bottom to get a decimal, then multiply by 100.', difficulty: 'EASY' },
            { front: 'What should you do with mixed numbers before calculating?', back: 'Convert them to improper fractions first.', difficulty: 'MEDIUM' },
            { front: 'Which fractions give terminating decimals?', back: 'Those whose denominator has only 2s and 5s as prime factors.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Calculate 3/4 + 2/5, giving your answer as a fraction in its simplest form.',
              answer: '23/20',
              markScheme: [
                'Uses a common denominator of 20 (1)',
                'Writes 15/20 + 8/20 (1)',
                'Answer 23/20 or 1 3/20 (1)',
              ],
              marks: 3,
              explanation:
                'The common denominator is the LCM of 4 and 5, which is 20. The answer is top-heavy, which is fine unless the question asks for a mixed number.',
            },
          ],
        },
        {
          number: '1.3',
          slug: 'indices-and-standard-form',
          title: 'Indices and standard form',
          summary: 'The laws of indices and writing very large or small numbers.',
          objectives: [
            { code: '1.3.1', statement: 'Use the laws of indices, including negative and fractional indices.', tier: 'CORE' },
            { code: '1.3.2', statement: 'Convert between ordinary numbers and standard form and calculate with them.', tier: 'CORE' },
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
                  steps: ['Multiply the number parts: 3 × 4 = 12.', 'Apply the index law to the powers of ten: 10⁵ × 10⁻² = 10⁵⁺⁽⁻²⁾ = 10³.', 'This gives 12 × 10³, but 12 is not between 1 and 10.', 'Rewrite 12 as 1.2 × 10¹, so the answer becomes 1.2 × 10⁴.'],
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
          number: '1.4',
          slug: 'ratio-proportion-percentage',
          title: 'Ratio, proportion and percentage',
          summary: 'Sharing in a ratio, direct and inverse proportion, and percentage change.',
          objectives: [
            { code: '1.4.1', statement: 'Divide a quantity in a given ratio and use direct and inverse proportion.', tier: 'CORE' },
            { code: '1.4.2', statement: 'Calculate percentage increase, decrease, reverse percentages and compound interest.', tier: 'CORE' },
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
        {
          number: '1.5',
          slug: 'bounds-and-estimation',
          title: 'Estimation, bounds and limits of accuracy',
          summary: 'Rounding, estimating, and the upper and lower bounds of a measurement.',
          objectives: [
            { code: '1.5.1', statement: 'Round values, estimate calculations, and find upper and lower bounds.', tier: 'CORE' },
            { code: '1.5.2', statement: 'Use bounds in calculations involving sums, differences, products and quotients.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'bounds-and-estimation',
              title: 'Estimation, bounds and limits of accuracy',
              readingMinutes: 6,
              body: `### Estimating
Round every number to **1 significant figure**, then calculate. It is meant to be quick and done without a calculator, giving a rough check on a real answer.
\`(4.87 × 19.6) / 0.51 ≈ (5 × 20) / 0.5 = 200\`
### Bounds
A measurement given to the nearest unit could be anything within **half a unit** either side.
A length of 8 cm to the nearest cm:
- **Lower bound** = 7.5 cm
- **Upper bound** = 8.5 cm
The upper bound is written as 8.5 even though 8.5 would itself round up — this is the convention, and 8.5 is the value the real length approaches but does not reach.
For 1 decimal place, half a unit is 0.05; for 2 decimal places it is 0.005.
### Calculating with bounds
This is where marks are won or lost, because you must think about which combination gives the extreme:
- **Maximum of a sum**: UB + UB
- **Minimum of a sum**: LB + LB
- **Maximum of a difference**: UB − LB (biggest minus smallest)
- **Minimum of a difference**: LB − UB
- **Maximum of a product**: UB × UB
- **Maximum of a quotient**: **UB ÷ LB** (biggest divided by smallest)
- **Minimum of a quotient**: **LB ÷ UB**
The division rules are the counter-intuitive ones. Dividing by a *smaller* number gives a *bigger* answer, which is why the maximum uses the lower bound on the bottom.`,
              analogy: 'A rounded measurement is a range in disguise. "8 cm" is really a promise that the true value lives somewhere between 7.5 and 8.5 — so any calculation using it inherits that uncertainty.',
              misconceptions: [
                'Using UB ÷ UB for the maximum of a division. It is UB ÷ LB, because dividing by less gives more.',
                'Writing the upper bound as 8.49 or 8.499. The convention is the exact half-unit, 8.5.',
                'Adding or subtracting a whole unit instead of half. For values to the nearest cm, the bounds are ±0.5, not ±1.',
              ],
              examTips: [
                'Write LB and UB for each quantity on a separate line before combining them — it makes choosing the right pairing obvious.',
                'For a maximum, ask "what makes this as big as possible?" rather than memorising all six rules. Division then follows naturally.',
              ],
              workedExamples: [
                {
                  prompt: 'A rectangle has length 12 cm and width 7 cm, each to the nearest cm. Find the upper bound of its area.',
                  steps: ['Length: LB = 11.5, UB = 12.5. Width: LB = 6.5, UB = 7.5.', 'For the maximum area, use the largest possible values of both.', 'Maximum area = 12.5 × 7.5 = 93.75 cm².'],
                  answer: '93.75 cm²',
                },
                {
                  prompt: 'A car travels 100 m (to the nearest metre) in 8 s (to the nearest second). Find the maximum possible speed.',
                  steps: ['Distance: UB = 100.5 m, LB = 99.5 m. Time: UB = 8.5 s, LB = 7.5 s.', 'Speed = distance ÷ time, so the maximum needs the largest distance and the smallest time.', 'Maximum speed = 100.5 ÷ 7.5 = 13.4 m/s.'],
                  answer: '13.4 m/s',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What are the bounds of 8 cm measured to the nearest cm?', back: 'Lower bound 7.5 cm, upper bound 8.5 cm.', difficulty: 'MEDIUM' },
            { front: 'How do you get the maximum of a division?', back: 'Upper bound ÷ lower bound — dividing by less gives more.', difficulty: 'HARD' },
            { front: 'How do you get the maximum of a subtraction?', back: 'Upper bound − lower bound.', difficulty: 'HARD' },
            { front: 'How do you estimate a calculation?', back: 'Round every number to 1 significant figure, then work it out.', difficulty: 'EASY' },
            { front: 'What are the bounds for a value given to 1 decimal place?', back: 'Half of 0.1, so ±0.05.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'A rectangle has length 15 cm and width 8 cm, each measured to the nearest centimetre. Calculate the lower bound of its perimeter, in cm.',
              answer: '44',
              markScheme: [
                'Lower bounds identified: 14.5 and 7.5 (1)',
                'Uses perimeter = 2(l + w) with both lower bounds (1)',
                'Answer 44 cm (1)',
              ],
              explanation:
                'Perimeter is a sum, so the minimum uses both lower bounds: 2(14.5 + 7.5) = 2 × 22 = 44 cm. Using the given values instead gives 46 cm, which is the mid-estimate rather than the lower bound.',
              marks: 3,
            },
          ],
        },
        {
          number: '1.6',
          slug: 'surds',
          title: 'Surds',
          summary: 'Simplifying exact roots and rationalising denominators.',
          prerequisites: ['1.3'],
          objectives: [
            { code: '1.6.1', statement: 'Simplify surds and rationalise denominators.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'surds',
              title: 'Surds',
              readingMinutes: 5,
              body: `A **surd** is a root that cannot be written exactly as a fraction — \`√2\`, \`√3\`, \`√5\`. Leaving an answer in surd form keeps it **exact**, whereas a decimal is only an approximation.
### The rules
- \`√a × √b = √(ab)\`
- \`√a / √b = √(a/b)\`
- \`√a × √a = a\`
Note there is **no rule** for \`√(a + b)\` — it does **not** equal \`√a + √b\`. Testing with 9 and 16 makes this obvious: \`√25 = 5\`, but \`3 + 4 = 7\`.
### Simplifying
Look for a factor that is a **perfect square**:
\`√50 = √(25 × 2) = √25 × √2 = 5√2\`
Always take out the **largest** square factor, or you will have to simplify twice.
### Adding and subtracting
Only **like** surds combine, exactly like algebraic terms:
\`3√2 + 5√2 = 8√2\`, but \`3√2 + 5√3\` cannot be simplified.
Sometimes simplifying first reveals like terms: \`√8 + √2 = 2√2 + √2 = 3√2\`.
### Rationalising the denominator
Convention says a surd should not be left on the bottom of a fraction. Multiply top and bottom by the surd:
\`3/√5 = (3 × √5)/(√5 × √5) = 3√5/5\`
For a denominator such as \`2 + √3\`, multiply by its **conjugate** \`2 − √3\`, because \`(2 + √3)(2 − √3) = 4 − 3 = 1\` — the surds cancel through the difference of two squares.`,
              analogy: 'A surd is an exact fingerprint of a number; the decimal is a blurred photocopy. Rationalising is tidying rather than changing — the value is identical, only the presentation improves.',
              misconceptions: [
                'Writing \`√(a + b) = √a + √b\`. This is false; only multiplication and division split.',
                'Adding unlike surds, e.g. claiming \`√2 + √3 = √5\`.',
                'Failing to take out the largest square factor, e.g. writing \`√50 = 2√12.5\` instead of \`5√2\`.',
              ],
              examTips: [
                'If a question says "give your answer in exact form" or "in surd form", do not use a calculator to decimalise it.',
                'For a two-term denominator, multiply by the conjugate — same terms, opposite sign — and the surds vanish.',
              ],
              workedExamples: [
                {
                  prompt: 'Simplify √75 + √12.',
                  steps: ['√75 = √(25 × 3) = 5√3.', '√12 = √(4 × 3) = 2√3.', 'These are like surds, so add the coefficients: 5√3 + 2√3 = 7√3.'],
                  answer: '7√3',
                },
                {
                  prompt: 'Rationalise the denominator of 6/√3.',
                  steps: ['Multiply top and bottom by √3: (6 × √3)/(√3 × √3).', 'The denominator becomes 3.', '= 6√3/3 = 2√3.'],
                  answer: '2√3',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does √a × √b equal?', back: '√(ab)', difficulty: 'MEDIUM' },
            { front: 'Does √(a + b) = √a + √b?', back: 'No — there is no such rule. Only multiplication and division split.', difficulty: 'HARD' },
            { front: 'How do you simplify √50?', back: 'Take out the largest square factor: √(25 × 2) = 5√2.', difficulty: 'MEDIUM' },
            { front: 'How do you rationalise 1/√a?', back: 'Multiply top and bottom by √a, giving √a/a.', difficulty: 'MEDIUM' },
            { front: 'What do you multiply by to rationalise 1/(2 + √3)?', back: 'The conjugate, 2 − √3.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Simplify √32 − √8, giving your answer in the form a√b. [3]',
              answer:
                '√32 = √(16 × 2) = 4√2 and √8 = √(4 × 2) = 2√2. Since both are multiples of √2 they are like surds, so 4√2 − 2√2 = 2√2.',
              markScheme: [
                'Simplifies √32 to 4√2 (1)',
                'Simplifies √8 to 2√2 (1)',
                'Subtracts to give 2√2 (1)',
              ],
              marks: 3,
              explanation:
                'Neither surd can be combined until both are written in terms of √2 — simplifying first is what reveals that they are like terms.',
              hint: 'Find the largest square factor of each number first.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'algebra-and-graphs',
      title: 'Algebra and graphs',
      summary: 'Manipulating expressions, equations, inequalities, sequences, functions and graphs.',
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
          slug: 'equations-and-rearranging',
          title: 'Linear equations and rearranging formulae',
          summary: 'Solving equations and changing the subject of a formula.',
          objectives: [
            { code: '2.2.1', statement: 'Solve linear equations, including those with brackets and fractions.', tier: 'CORE' },
            { code: '2.2.2', statement: 'Rearrange formulae to change the subject.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'equations-and-rearranging',
              title: 'Linear equations and rearranging formulae',
              readingMinutes: 5,
              body: `### Solving linear equations
The governing rule: **whatever you do to one side, do to the other**. Work backwards through the operations, undoing them in reverse order.
\`3x + 7 = 22\` → subtract 7 → \`3x = 15\` → divide by 3 → \`x = 5\`
- **With brackets**: expand first, or divide through if everything is divisible.
- **With fractions**: multiply every term by the denominator to clear it.
- **Unknown on both sides**: collect the x terms on the side where the coefficient is larger, which avoids negatives.
Always **check** by substituting back into the original equation.
### Rearranging formulae
Changing the subject uses exactly the same rules. To make x the subject:
1. Remove fractions by multiplying through.
2. Expand any brackets.
3. Collect **all terms containing x on one side**, everything else on the other.
4. Factorise out x if it appears more than once.
5. Divide by whatever multiplies x.
Step 4 is the one that distinguishes harder questions. For \`ax + b = cx + d\`:
\`ax − cx = d − b\` → \`x(a − c) = d − b\` → \`x = (d − b)/(a − c)\`
Without factorising, x cannot be isolated at all.`,
              analogy: 'An equation is a balanced scale. Any operation is legal provided it is applied to both pans; rearranging a formula is the same process performed with letters instead of numbers.',
              misconceptions: [
                'Applying an operation to only part of a side. Multiplying by 3 must multiply **every** term, not just the first.',
                'Failing to factorise when the new subject appears twice, leaving x on both sides.',
                'Taking a square root and giving only the positive answer. \`x² = 16\` has solutions \`x = ±4\`.',
              ],
              examTips: [
                'When the target letter appears more than once, plan to factorise from the start — it is the whole method.',
                'Substitute your answer back into the original. It takes ten seconds and catches sign errors reliably.',
              ],
              workedExamples: [
                {
                  prompt: 'Make r the subject of the formula A = πr².',
                  steps: ['Divide both sides by π: A/π = r².', 'Take the square root of both sides: r = √(A/π).', 'Since r is a radius it must be positive, so the negative root is discarded.'],
                  answer: 'r = √(A/π)',
                },
                {
                  prompt: 'Make x the subject of y = (3x + 2)/(x − 1).',
                  steps: ['Multiply both sides by (x − 1): y(x − 1) = 3x + 2.', 'Expand: xy − y = 3x + 2.', 'Collect x terms on one side: xy − 3x = y + 2.', 'Factorise: x(y − 3) = y + 2, so x = (y + 2)/(y − 3).'],
                  answer: 'x = (y + 2)/(y − 3)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the golden rule for solving equations?', back: 'Whatever you do to one side, do to the other.', difficulty: 'EASY' },
            { front: 'How do you clear fractions from an equation?', back: 'Multiply every term by the denominator.', difficulty: 'MEDIUM' },
            { front: 'What do you do if the new subject appears twice?', back: 'Collect those terms on one side and factorise it out.', difficulty: 'HARD' },
            { front: 'What are the solutions of x² = 16?', back: 'x = 4 or x = −4.', difficulty: 'MEDIUM' },
            { front: 'How should you check a solved equation?', back: 'Substitute the answer back into the original equation.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Make x the subject of the formula y = (x + 4)/(2x − 1). [4]',
              answer:
                'Multiply both sides by (2x − 1) to give y(2x − 1) = x + 4. Expanding gives 2xy − y = x + 4. Collecting the x terms on one side gives 2xy − x = y + 4. Factorising gives x(2y − 1) = y + 4, so x = (y + 4)/(2y − 1).',
              markScheme: [
                'Multiplies through by (2x − 1) (1)',
                'Expands to 2xy − y = x + 4 (1)',
                'Collects x terms and factorises: x(2y − 1) (1)',
                'Correct final answer x = (y + 4)/(2y − 1) (1)',
              ],
              marks: 4,
              explanation:
                'The factorising step is the crux. Without it x remains on both sides and cannot be isolated, which is why this style of question carries four marks.',
              hint: 'Get all the x terms on one side, then take x out as a factor.',
            },
          ],
        },
        {
          number: '2.3',
          slug: 'simultaneous-equations',
          title: 'Simultaneous equations',
          summary: 'Solving pairs of equations by elimination and substitution.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.3.1', statement: 'Solve simultaneous linear equations by elimination, substitution and graphically.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'simultaneous-equations',
              title: 'Simultaneous equations',
              readingMinutes: 6,
              body: `Two unknowns need **two** equations. The aim is always to get rid of one unknown so an ordinary equation remains.
### Elimination
1. Multiply one or both equations so that one unknown has the **same coefficient** in both.
2. **Add** if the signs are opposite; **subtract** if the signs are the same.
3. Solve for the remaining unknown.
4. Substitute back into either original equation to find the other.
5. Check in the equation you did **not** use for the substitution.
A memory aid for step 2: **S**ame **S**igns **S**ubtract.
### Substitution
Better when one equation already gives a subject, such as \`y = 3x + 1\`. Replace y in the other equation and solve.
### Graphically
Two straight lines meet at exactly one point, and its coordinates are the solution. Parallel lines never meet, which is why some pairs have no solution.
### Word problems
Define your variables explicitly first — "let x be the cost of one pen" — then form one equation per piece of information. Most lost marks here come from unstated or muddled definitions rather than the algebra.`,
              analogy: 'Elimination is cancelling out a common ingredient so only one variable is left to taste. Substitution is swapping in a known recipe for one ingredient — the same destination reached by a different route.',
              misconceptions: [
                'Adding when the signs are the same, which doubles a term instead of cancelling it.',
                'Finding one unknown and stopping. Both values are required, and both are usually marked.',
                'Forgetting to multiply **every** term when scaling an equation, including the constant on the right.',
              ],
              examTips: [
                'Number your equations (1) and (2) and label the ones you create, e.g. (3) = (1) × 2. Examiners follow the method more easily and method marks are safer.',
                'Check the final pair in the equation you did not use to substitute — that genuinely verifies both values.',
              ],
              workedExamples: [
                {
                  prompt: 'Solve 3x + 2y = 16 and x − 2y = 0.',
                  steps: ['The y coefficients are +2 and −2 — opposite signs, so add the equations.', '(3x + 2y) + (x − 2y) = 16 + 0 gives 4x = 16, so x = 4.', 'Substitute x = 4 into the second equation: 4 − 2y = 0, so 2y = 4 and y = 2.', 'Check in the first: 3(4) + 2(2) = 12 + 4 = 16 ✓'],
                  answer: 'x = 4, y = 2',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'When do you add simultaneous equations?', back: 'When the coefficients of one unknown have opposite signs.', difficulty: 'MEDIUM' },
            { front: 'What does "same signs subtract" mean?', back: 'If the matching coefficients have the same sign, subtract the equations to eliminate that unknown.', difficulty: 'MEDIUM' },
            { front: 'What does the intersection of two lines represent?', back: 'The solution of the simultaneous equations they represent.', difficulty: 'MEDIUM' },
            { front: 'How do you check a simultaneous solution?', back: 'Substitute both values into the equation you did not use for the substitution.', difficulty: 'MEDIUM' },
            { front: 'Why do parallel lines give no solution?', back: 'They never intersect, so no pair of values satisfies both equations.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Solve the simultaneous equations 2x + 3y = 12 and 2x − y = 4. [3]',
              answer:
                'The x coefficients are both 2 — the same sign — so subtract the second equation from the first: (2x + 3y) − (2x − y) = 12 − 4, giving 4y = 8 and so y = 2. Substituting into 2x − y = 4 gives 2x − 2 = 4, so 2x = 6 and x = 3. Checking in the first equation: 2(3) + 3(2) = 6 + 6 = 12 ✓',
              markScheme: [
                'Eliminates one variable correctly by subtracting (1)',
                'Finds y = 2 (1)',
                'Substitutes back to find x = 3 (1)',
              ],
              marks: 3,
              explanation:
                'Because both x coefficients are +2, subtracting removes x cleanly. A common error is subtracting the y terms as 3y − y = 2y instead of 4y — mind the double negative.',
            },
          ],
        },
        {
          number: '2.4',
          slug: 'inequalities',
          title: 'Inequalities',
          summary: 'Solving and representing inequalities on a number line and in regions.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.4.1', statement: 'Solve linear inequalities and represent solutions on a number line.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'inequalities',
              title: 'Inequalities',
              readingMinutes: 5,
              body: `An inequality is solved almost exactly like an equation, with **one critical exception**.
### The symbols
- \`<\` less than, \`>\` greater than
- \`≤\` less than or equal to, \`≥\` greater than or equal to
### The one rule that differs
**Multiplying or dividing by a negative number reverses the inequality sign.**
\`−2x > 6\` → divide by −2 → \`x < −3\`
Sanity check with a number: x = −4 gives −2(−4) = 8, which is indeed greater than 6 ✓
Many students avoid the problem entirely by rearranging so the variable ends up positive: \`−2x > 6\` becomes \`−6 > 2x\`, so \`x < −3\` with no sign flip required.
### Number line notation
- **Open circle** ○ for \`<\` or \`>\` — the endpoint is **not** included.
- **Filled circle** ● for \`≤\` or \`≥\` — the endpoint **is** included.
### Double inequalities
\`−3 < x ≤ 5\` means x is between −3 and 5, excluding −3 but including 5. Operate on **all three parts** at once.
### Integer solutions
If asked to **list** integers satisfying \`−2 < x ≤ 3\`, they are −1, 0, 1, 2, 3. Check each endpoint carefully against whether the inequality is strict.`,
              analogy: 'Reversing the sign when dividing by a negative is like turning around while walking: everything that was ahead is now behind. The relationship is unchanged, but the direction you describe it from has flipped.',
              misconceptions: [
                'Forgetting to reverse the sign when multiplying or dividing by a negative — the single biggest source of lost marks here.',
                'Using a filled circle for a strict inequality. \`<\` and \`>\` require an open circle.',
                'Including an excluded endpoint when listing integers, e.g. counting −2 in \`−2 < x\`.',
              ],
              examTips: [
                'Test your final answer with one value from the solution set. It confirms the direction of the inequality immediately.',
                'When listing integers, write the range first, then read off the values — it avoids endpoint slips.',
              ],
              workedExamples: [
                {
                  prompt: 'Solve 5 − 2x ≥ 11 and show the solution on a number line.',
                  steps: ['Subtract 5 from both sides: −2x ≥ 6.', 'Divide by −2 and reverse the sign: x ≤ −3.', 'Because it is ≤, use a filled circle at −3 with an arrow pointing left.', 'Check: x = −4 gives 5 − 2(−4) = 13 ≥ 11 ✓'],
                  answer: 'x ≤ −3, shown with a filled circle at −3 and an arrow to the left',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'When does an inequality sign reverse?', back: 'When multiplying or dividing both sides by a negative number.', difficulty: 'HARD' },
            { front: 'What does an open circle mean on a number line?', back: 'The endpoint is not included — the inequality is < or >.', difficulty: 'MEDIUM' },
            { front: 'What does a filled circle mean?', back: 'The endpoint is included — the inequality is ≤ or ≥.', difficulty: 'MEDIUM' },
            { front: 'List the integers satisfying −2 < x ≤ 2.', back: '−1, 0, 1, 2', difficulty: 'MEDIUM' },
            { front: 'How do you handle −3 < x ≤ 5?', back: 'Apply every operation to all three parts of the inequality.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Solve the inequality 4 − 3x < 19 and list the integer values of x that satisfy it if also x ≤ 0. [3]',
              answer:
                'Subtracting 4 gives −3x < 15. Dividing by −3 reverses the sign, giving x > −5. Combined with x ≤ 0, the solution is −5 < x ≤ 0, so the integers are −4, −3, −2, −1 and 0.',
              markScheme: [
                'Rearranges to −3x < 15 (1)',
                'Divides by −3 and reverses the sign to give x > −5 (1)',
                'Lists −4, −3, −2, −1, 0 (1)',
              ],
              marks: 3,
              explanation:
                '−5 itself is excluded because the inequality is strict, while 0 is included because x ≤ 0 allows equality. Endpoint care is exactly what the final mark tests.',
              hint: 'What must happen to the sign when you divide by −3?',
            },
          ],
        },
        {
          number: '2.5',
          slug: 'solving-quadratic-equations',
          title: 'Solving quadratic equations',
          summary: 'Solving by factorising and by the quadratic formula.',
          prerequisites: ['2.1'],
          objectives: [
            { code: '2.5.1', statement: 'Solve quadratic equations by factorising, completing the square and using the formula.', tier: 'CORE' },
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
          number: '2.6',
          slug: 'sequences',
          title: 'Sequences',
          summary: 'Term-to-term and position-to-term rules, including the nth term.',
          objectives: [
            { code: '2.6.1', statement: 'Continue sequences and find the nth term of linear and simple quadratic sequences.', tier: 'CORE' },
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
        {
          number: '2.7',
          slug: 'graphs-of-functions',
          title: 'Graphs of functions',
          summary: 'Recognising and sketching quadratic, cubic, reciprocal and exponential graphs.',
          prerequisites: ['2.5'],
          objectives: [
            { code: '2.7.1', statement: 'Recognise, sketch and interpret graphs of linear, quadratic, cubic, reciprocal and exponential functions.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'graphs-of-functions',
              title: 'Graphs of functions',
              readingMinutes: 6,
              body: `Recognising a graph from its equation — and vice versa — is quick marks once the shapes are known.
### The standard shapes
- **Linear** \`y = mx + c\` — a straight line.
- **Quadratic** \`y = ax² + bx + c\` — a **parabola**. Opens **upward** if a > 0, **downward** if a < 0. Symmetrical about a vertical line through the turning point.
- **Cubic** \`y = ax³ + …\` — an S-shape, rising overall if a > 0, falling if a < 0. Can have two turning points.
- **Reciprocal** \`y = k/x\` — a **hyperbola** in two separate parts, with **asymptotes** at both axes. Never touches either axis, because x cannot be 0 and y cannot be 0.
- **Exponential** \`y = aˣ\` — rises increasingly steeply for a > 1, always passes through **(0, 1)**, and never reaches the x-axis.
### Reading key features
- **Roots** — where the curve crosses the x-axis, found by setting y = 0.
- **y-intercept** — found by setting x = 0.
- **Turning point** — the maximum or minimum of a quadratic; it lies on the line of symmetry, midway between the roots.
### Solving equations graphically
The x-coordinates where two graphs intersect are the solutions of the equation formed by setting them equal. To solve \`x² − 3 = x\`, plot \`y = x² − 3\` and \`y = x\` and read off the intersections — or plot \`y = x² − x − 3\` and read the roots.
This is why questions often say "use your graph to solve…" — you are expected to read, not to re-derive algebraically.`,
              analogy: 'Learning graph shapes is like recognising handwriting: once you know the characteristic curve of each family, you can identify the equation at a glance instead of plotting point by point.',
              misconceptions: [
                'Thinking a reciprocal graph eventually touches the axes. It approaches them forever without reaching — that is what an asymptote means.',
                'Believing every quadratic crosses the x-axis. If the discriminant is negative it has no real roots and floats entirely above or below.',
                'Assuming an exponential graph passes through the origin. \`y = aˣ\` passes through (0, 1), since anything to the power 0 is 1.',
              ],
              examTips: [
                'When sketching, mark the intercepts and the turning point — those are the marked features, not the smoothness of your curve.',
                'For "use your graph to solve" questions, draw the required line on the graph and read intersections; algebraic re-derivation often earns no marks.',
              ],
              workedExamples: [
                {
                  prompt: 'The graph of y = x² − 4x + 3 crosses the x-axis at two points. Find them, and state the equation of the line of symmetry.',
                  steps: ['Set y = 0: x² − 4x + 3 = 0.', 'Factorise: (x − 1)(x − 3) = 0, so x = 1 and x = 3.', 'The line of symmetry lies midway between the roots: x = (1 + 3)/2 = 2.'],
                  answer: 'Roots at (1, 0) and (3, 0); line of symmetry x = 2',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What shape is the graph of a quadratic?', back: 'A parabola — opening upward if a > 0, downward if a < 0.', difficulty: 'EASY' },
            { front: 'What does the graph of y = k/x look like?', back: 'A hyperbola in two parts with asymptotes at both axes.', difficulty: 'MEDIUM' },
            { front: 'Through which point does y = aˣ always pass?', back: '(0, 1)', difficulty: 'MEDIUM' },
            { front: 'How do you find where a graph crosses the x-axis?', back: 'Set y = 0 and solve for x.', difficulty: 'EASY' },
            { front: 'Where is a parabola\'s line of symmetry?', back: 'Midway between its roots, through the turning point.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'Which equation produces a graph with asymptotes at both the x-axis and the y-axis?',
              options: [
                { id: 'a', text: 'y = 6/x', why: '' },
                { id: 'b', text: 'y = x² + 6', why: 'A parabola has no asymptotes.' },
                { id: 'c', text: 'y = 2ˣ', why: 'An exponential graph has one asymptote (the x-axis), not two.' },
                { id: 'd', text: 'y = 6x + 2', why: 'A straight line has no asymptotes.' },
              ],
              answer: 'a',
              markScheme: ['y = 6/x (1)'],
              marks: 1,
              explanation:
                'A reciprocal function is undefined at x = 0 and can never output 0, so it approaches both axes indefinitely without ever meeting them.',
            },
          ],
        },
        {
          number: '2.8',
          slug: 'functions',
          title: 'Functions',
          summary: 'Function notation, composite and inverse functions.',
          prerequisites: ['2.2'],
          objectives: [
            { code: '2.8.1', statement: 'Use function notation and find composite and inverse functions.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'functions',
              title: 'Functions',
              readingMinutes: 5,
              body: `### Notation
\`f(x) = 3x + 1\` is a rule. \`f(2)\` means substitute 2 for x, giving 7. The letter in the bracket is only a placeholder.
### Composite functions
\`fg(x)\` means "do **g first**, then f" — the function nearer x acts first.
With \`f(x) = 2x + 1\` and \`g(x) = x²\`:
- \`fg(x) = f(x²) = 2x² + 1\`
- \`gf(x) = g(2x + 1) = (2x + 1)²\`
These differ, so **order matters**.
### Inverse functions
\`f⁻¹(x)\` reverses f. To find it:
1. Write \`y = f(x)\`.
2. **Swap** x and y.
3. Rearrange to make y the subject.
For \`f(x) = 3x − 4\`: \`y = 3x − 4\` → \`x = 3y − 4\` → \`y = (x + 4)/3\`.
### Checking
\`ff⁻¹(x) = x\` always. Substituting your inverse back is the quickest way to confirm it, and takes one line.`,
              analogy: 'A function is a machine and its inverse is the same machine run backwards. Composite functions are two machines in a line — and reversing the order of the machines generally changes what comes out.',
              misconceptions: [
                'Reading \`fg(x)\` as "f first". The inner function acts first.',
                'Treating \`f⁻¹(x)\` as \`1/f(x)\`. The −1 denotes the inverse, not a reciprocal.',
                'Forgetting to swap x and y when finding an inverse, which produces the original function rearranged rather than its inverse.',
              ],
              examTips: [
                'Write out the substitution explicitly, e.g. \`fg(x) = f(x²)\`, before simplifying — it earns method marks and prevents order errors.',
                'Verify any inverse with \`ff⁻¹(x)\`; if it does not simplify to x, something is wrong.',
              ],
              workedExamples: [
                {
                  prompt: 'Given f(x) = 2x − 3 and g(x) = x + 5, find gf(x) and f⁻¹(x).',
                  steps: ['gf(x) means f acts first: f(x) = 2x − 3.', 'Then apply g: g(2x − 3) = (2x − 3) + 5 = 2x + 2.', 'For the inverse, write y = 2x − 3 and swap: x = 2y − 3.', 'Rearrange: 2y = x + 3, so y = (x + 3)/2.'],
                  answer: 'gf(x) = 2x + 2 and f⁻¹(x) = (x + 3)/2',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'In fg(x), which function is applied first?', back: 'g — the one written closer to x.', difficulty: 'MEDIUM' },
            { front: 'How do you find an inverse function?', back: 'Write y = f(x), swap x and y, then rearrange for y.', difficulty: 'MEDIUM' },
            { front: 'What does ff⁻¹(x) equal?', back: 'x', difficulty: 'MEDIUM' },
            { front: 'Does f⁻¹(x) mean 1/f(x)?', back: 'No — it means the inverse function.', difficulty: 'HARD' },
            { front: 'What does f(3) mean for f(x) = 4x − 1?', back: 'Substitute 3 for x: 4(3) − 1 = 11.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Given f(x) = 4x + 1, find f⁻¹(x). [2]',
              answer:
                'Write y = 4x + 1, then swap x and y to give x = 4y + 1. Rearranging gives 4y = x − 1, so y = (x − 1)/4 and therefore f⁻¹(x) = (x − 1)/4.',
              markScheme: [
                'Swaps x and y correctly (1)',
                'Rearranges to f⁻¹(x) = (x − 1)/4 (1)',
              ],
              marks: 2,
              explanation:
                'Checking: ff⁻¹(x) = 4((x − 1)/4) + 1 = (x − 1) + 1 = x ✓, which confirms the inverse in one line.',
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
      slug: 'geometry',
      title: 'Geometry',
      summary: 'Angles, polygons, circle theorems, similarity, congruence and constructions.',
      subtopics: [
        {
          number: '4.1',
          slug: 'angles-and-polygons',
          title: 'Angles and polygons',
          summary: 'Angle rules, parallel lines, and the angles in polygons.',
          objectives: [
            { code: '4.1.1', statement: 'Use angle properties of lines, triangles, quadrilaterals and parallel lines.', tier: 'CORE' },
            { code: '4.1.2', statement: 'Calculate interior and exterior angles of regular and irregular polygons.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'angles-and-polygons',
              title: 'Angles and polygons',
              readingMinutes: 6,
              body: `Angle questions are marked on **reasons**, not just numbers. Learn the exact phrases.
### Basic rules
- Angles on a **straight line** add to **180°**.
- Angles at a **point** add to **360°**.
- **Vertically opposite** angles are equal.
- Angles in a **triangle** add to **180°**; in a **quadrilateral**, **360°**.
- An **exterior angle of a triangle** equals the sum of the two opposite interior angles.
### Parallel lines
- **Corresponding** angles are equal (F-shape).
- **Alternate** angles are equal (Z-shape).
- **Co-interior** (allied) angles add to **180°** (C-shape).
Use the proper names in your reasons — "F angles" is not accepted wording in a mark scheme.
### Polygons
- **Sum of interior angles** = \`(n − 2) × 180°\`, because the polygon splits into n − 2 triangles.
- **Sum of exterior angles** = **360°**, for **every** polygon regardless of the number of sides.
- For a **regular** polygon: each exterior angle = \`360/n\`, and each interior angle = \`180 − 360/n\`.
- Interior + exterior at the same vertex = **180°**, since they lie on a straight line.
### Choosing the quickest route
For regular polygons, going via the **exterior** angle is almost always faster. To find the interior angle of a regular decagon: exterior = 360/10 = 36°, so interior = 180 − 36 = 144°.`,
              analogy: 'The exterior angles summing to 360° is just walking once around the shape: at every corner you turn by the exterior angle, and by the time you are back where you started, facing the same way, you have turned a full circle.',
              misconceptions: [
                'Thinking the exterior angle sum depends on the number of sides. It is always 360°.',
                'Using \`(n − 2) × 180\` and forgetting to divide by n when a **single** interior angle of a regular polygon is wanted.',
                'Giving a numerical answer with no reason. Angle questions almost always reserve a mark for the correct named rule.',
              ],
              examTips: [
                'Write the reason next to every step: "alternate angles are equal", "angles on a straight line sum to 180°". Those phrases are the marks.',
                'For regular polygons, find the exterior angle first — it is one division, and the interior angle follows immediately.',
              ],
              workedExamples: [
                {
                  prompt: 'A regular polygon has an interior angle of 156°. How many sides does it have?',
                  steps: ['Interior and exterior angles at a vertex sum to 180°, so the exterior angle is 180 − 156 = 24°.', 'For a regular polygon, exterior angle = 360/n.', 'So 24 = 360/n, giving n = 360/24 = 15.'],
                  answer: '15 sides',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What do the exterior angles of any polygon sum to?', back: '360°, regardless of the number of sides.', difficulty: 'MEDIUM' },
            { front: 'Give the formula for the interior angle sum of a polygon.', back: '(n − 2) × 180°', difficulty: 'MEDIUM' },
            { front: 'What is each exterior angle of a regular n-sided polygon?', back: '360/n', difficulty: 'MEDIUM' },
            { front: 'What are co-interior angles?', back: 'Angles between parallel lines on the same side of the transversal, which add to 180°.', difficulty: 'HARD' },
            { front: 'What does the exterior angle of a triangle equal?', back: 'The sum of the two opposite interior angles.', difficulty: 'HARD' },
            { front: 'Why must you write reasons in angle questions?', back: 'Mark schemes award marks for the correct named rule, not only the number.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Calculate the size of each interior angle of a regular 12-sided polygon, in degrees.',
              answer: '150',
              markScheme: [
                'Finds the exterior angle 360/12 = 30° (1)',
                'Interior = 180 − 30 (1)',
                'Answer 150° (1)',
              ],
              marks: 3,
              explanation:
                'The alternative route — (12 − 2) × 180 = 1800, then ÷ 12 = 150° — gives the same answer but takes longer and offers more chances to slip.',
            },
          ],
        },
        {
          number: '4.2',
          slug: 'circle-theorems',
          title: 'Circle theorems',
          summary: 'The angle rules in circles, and how to justify them.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '4.2.1', statement: 'Use circle theorems to calculate angles and give reasons.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'circle-theorems',
              title: 'Circle theorems',
              readingMinutes: 6,
              body: `Circle theorems are pure recall plus careful diagram-reading. Each theorem has an exact phrase that earns the reason mark.
### The theorems
1. **Angle at the centre is twice the angle at the circumference**, when both stand on the same arc.
2. **Angle in a semicircle is 90°** — a triangle drawn on a diameter always has a right angle at the circumference.
3. **Angles in the same segment are equal** — angles subtended by the same arc, on the same side, are equal.
4. **Opposite angles in a cyclic quadrilateral add to 180°** (a quadrilateral with all four vertices on the circle).
5. **A tangent is perpendicular to the radius** at the point of contact.
6. **Tangents from an external point are equal in length**, which creates an isosceles triangle.
7. **Alternate segment theorem** — the angle between a tangent and a chord equals the angle in the alternate segment.
### How to approach a problem
- Mark every angle you can find, working outward from what is given.
- Look first for a **diameter** (theorem 2) or a **tangent meeting a radius** (theorem 5) — these give instant right angles.
- Watch for **isosceles triangles** formed by two radii; the base angles are equal, and this is often the hidden step.
- Write the theorem name beside each step as you go.
### Where marks are lost
Nearly always by giving the correct number with no reason, or by applying a theorem when its conditions do not hold — for example using "angles in the same segment" when the two angles stand on **different** arcs.`,
              analogy: 'Circle theorems are keys on a ring: each fits exactly one lock. The skill is not forcing a key but scanning the diagram for the feature — a diameter, a tangent, a cyclic quadrilateral — that tells you which key to reach for.',
              misconceptions: [
                'Applying "angles in the same segment" to angles standing on different arcs. The arc must be the same.',
                'Assuming any four-sided shape inside a circle is cyclic. All four vertices must lie **on** the circumference.',
                'Halving instead of doubling in theorem 1. The angle at the **centre** is the larger one.',
              ],
              examTips: [
                'Name the theorem for every step. A page of correct arithmetic with no reasons typically scores about half marks.',
                'Look for two radii forming an isosceles triangle — it is the most commonly missed intermediate step in multi-stage problems.',
              ],
              workedExamples: [
                {
                  prompt: 'A, B and C lie on a circle with centre O. Angle AOC at the centre is 130°. Find angle ABC at the circumference.',
                  steps: ['Angles AOC and ABC both stand on the same arc AC.', 'The angle at the centre is twice the angle at the circumference.', 'So angle ABC = 130 ÷ 2 = 65°.'],
                  answer: '65° (angle at centre is twice the angle at the circumference)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the angle in a semicircle?', back: '90° — a triangle on a diameter has a right angle at the circumference.', difficulty: 'MEDIUM' },
            { front: 'How does the angle at the centre relate to the angle at the circumference?', back: 'The angle at the centre is twice the angle at the circumference, on the same arc.', difficulty: 'MEDIUM' },
            { front: 'What is true of opposite angles in a cyclic quadrilateral?', back: 'They add to 180°.', difficulty: 'MEDIUM' },
            { front: 'What angle does a tangent make with a radius?', back: '90° at the point of contact.', difficulty: 'EASY' },
            { front: 'State the alternate segment theorem.', back: 'The angle between a tangent and a chord equals the angle in the alternate segment.', difficulty: 'HARD' },
            { front: 'What is true of two tangents from the same external point?', back: 'They are equal in length, forming an isosceles triangle.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'PQRS is a cyclic quadrilateral. Angle PQR = 84°. Find angle PSR, giving a reason. [2]',
              answer:
                'Angle PSR = 96°, because opposite angles in a cyclic quadrilateral add up to 180°, so PSR = 180 − 84 = 96°.',
              markScheme: [
                'Answer 96° (1)',
                'Reason: opposite angles in a cyclic quadrilateral sum to 180° (1)',
              ],
              marks: 2,
              explanation:
                'Half the marks here are for the reason. Note that PQR and PSR must be the *opposite* pair — adjacent angles in a cyclic quadrilateral have no such relationship.',
            },
          ],
        },
        {
          number: '4.3',
          slug: 'similarity-and-congruence',
          title: 'Similarity and congruence',
          summary: 'Similar shapes, scale factors for area and volume, and congruence conditions.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '4.3.1', statement: 'Use similarity to find lengths, and apply area and volume scale factors.', tier: 'CORE' },
            { code: '4.3.2', statement: 'Identify congruent triangles using the standard conditions.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'similarity-and-congruence',
              title: 'Similarity and congruence',
              readingMinutes: 6,
              body: `### Similar shapes
Two shapes are **similar** if their angles are equal and their corresponding sides are in the **same ratio**. Same shape, different size.
The **linear scale factor** k is found by dividing a length on the new shape by the corresponding length on the original.
### The scale factor rule — the key idea
- **Length** scale factor = \`k\`
- **Area** scale factor = \`k²\`
- **Volume** scale factor = \`k³\`
This follows from dimensions: area is two lengths multiplied, volume is three.
So if a model is **3 times** as long, its surface area is **9 times** as large and its volume **27 times** as large. Assuming volume triples is the single most common error in the topic.
Working **backwards**: if the volume is 8 times larger, then \`k³ = 8\`, so \`k = 2\` and lengths are doubled.
### Congruence
**Congruent** shapes are identical in both shape and size — one can be placed exactly on the other, allowing rotation or reflection.
The four conditions for congruent triangles:
- **SSS** — three sides equal.
- **SAS** — two sides and the **included** angle equal.
- **ASA** (or AAS) — two angles and a corresponding side.
- **RHS** — right angle, hypotenuse and one other side.
Note **SSA is not a condition** — two sides and a non-included angle can produce two different triangles.
### Similar versus congruent
Congruent shapes are similar with a scale factor of exactly 1. All congruent shapes are similar; almost no similar shapes are congruent.`,
              analogy: 'Doubling every length of a box gives four times the wrapping paper and eight times the contents. The powers are not a rule to memorise — they are just how many lengths get multiplied together.',
              misconceptions: [
                'Using the linear scale factor for area or volume, e.g. thinking a shape twice as long has twice the area rather than four times.',
                'Treating SSA as a congruence condition — it is not, because two distinct triangles can satisfy it.',
                'Comparing non-corresponding sides when finding a scale factor. Match sides by their position between equal angles.',
              ],
              examTips: [
                'Write \`k\`, \`k²\` and \`k³\` at the top of the working and decide which is needed before calculating.',
                'For congruence proofs, name the condition (SSS, SAS, ASA, RHS) explicitly — that name is a mark on its own.',
              ],
              workedExamples: [
                {
                  prompt: 'Two similar cones have heights 4 cm and 10 cm. The smaller has volume 32 cm³. Find the volume of the larger.',
                  steps: ['Linear scale factor k = 10/4 = 2.5.', 'Volume scale factor = k³ = 2.5³ = 15.625.', 'Larger volume = 32 × 15.625 = 500 cm³.'],
                  answer: '500 cm³',
                },
                {
                  prompt: 'Two similar shapes have areas 18 cm² and 50 cm². Find the ratio of their corresponding lengths.',
                  steps: ['Area scale factor = 50/18 = 25/9.', 'Length scale factor = √(25/9) = 5/3.', 'So corresponding lengths are in the ratio 3 : 5.'],
                  answer: '3 : 5',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'If the length scale factor is k, what is the area scale factor?', back: 'k²', difficulty: 'MEDIUM' },
            { front: 'If the length scale factor is k, what is the volume scale factor?', back: 'k³', difficulty: 'MEDIUM' },
            { front: 'Name the four congruence conditions.', back: 'SSS, SAS, ASA (or AAS) and RHS.', difficulty: 'HARD' },
            { front: 'Why is SSA not a congruence condition?', back: 'Two sides and a non-included angle can produce two different triangles.', difficulty: 'HARD' },
            { front: 'What makes two shapes similar?', back: 'Equal angles and corresponding sides in the same ratio.', difficulty: 'EASY' },
            { front: 'If a volume is 27 times larger, what is the length scale factor?', back: '3, since ∛27 = 3.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'Two similar bottles have heights 12 cm and 18 cm. The smaller bottle holds 400 ml. Calculate how much the larger bottle holds, in ml.',
              answer: '1350',
              markScheme: [
                'Length scale factor 18/12 = 1.5 (1)',
                'Volume scale factor 1.5³ = 3.375 (1)',
                'Answer 400 × 3.375 = 1350 ml (1)',
              ],
              marks: 3,
              explanation:
                'Capacity is a volume, so the cube of the scale factor is needed. Using 1.5 alone gives 600 ml — the classic error this question is designed to catch.',
              hint: 'Capacity is a volume, so which power of the scale factor applies?',
            },
          ],
        },
        {
          number: '4.4',
          slug: 'constructions-bearings-symmetry',
          title: 'Constructions, loci, bearings and symmetry',
          summary: 'Ruler-and-compass constructions, describing positions, and symmetry.',
          prerequisites: ['4.1'],
          objectives: [
            { code: '4.4.1', statement: 'Carry out standard constructions and use loci to describe regions.', tier: 'CORE' },
            { code: '4.4.2', statement: 'Use three-figure bearings and describe symmetry properties.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'constructions-bearings-symmetry',
              title: 'Constructions, loci, bearings and symmetry',
              readingMinutes: 6,
              body: `### Constructions
All require **compasses and a straight edge**, and the **arcs must be left visible** — they are the evidence of method and carry the marks.
- **Perpendicular bisector** of AB: arcs from A and B of equal radius, above and below; join the crossings. Every point on it is **equidistant from A and B**.
- **Angle bisector**: arc from the vertex crossing both arms, then equal arcs from those two crossings; join to the vertex. Every point on it is **equidistant from the two lines**.
- **Perpendicular from a point to a line**: arc from the point crossing the line twice, then bisect that segment.
### Loci
A **locus** is the set of all points satisfying a rule:
- Fixed distance from a **point** → a **circle**.
- Fixed distance from a **line** → parallel lines either side, with semicircular ends.
- Equidistant from **two points** → the perpendicular bisector.
- Equidistant from **two lines** → the angle bisector.
Region questions combine these: shade where all conditions overlap, and use a **dashed** boundary if the boundary itself is excluded.
### Bearings
Three rules, all compulsory:
1. Measured from **north**.
2. **Clockwise**.
3. Always **three figures** — so 45° is written **045°**.
A **back bearing** (the return journey) differs by 180°: add 180 if the bearing is under 180, subtract 180 if it is over.
### Symmetry
- **Line symmetry** — the number of mirror lines. A regular n-sided polygon has n.
- **Rotational symmetry** — the order is how many positions look identical in a full turn. A regular n-gon has order n.
- In 3D, shapes have **planes** of symmetry rather than lines.`,
              analogy: 'A locus is the trail left by every point obeying a rule — like the mark a goat on a fixed rope wears into a field. The rope length gives a circle; two ropes give the overlap.',
              misconceptions: [
                'Rubbing out construction arcs to make the diagram tidy. The arcs are the working, and removing them removes the marks.',
                'Writing a bearing as 45° instead of 045°. Three figures are compulsory.',
                'Measuring a bearing anticlockwise or from south. Always clockwise from north.',
              ],
              examTips: [
                'Never measure a construction with a protractor when the question says "construct" — compass arcs must be visible.',
                'For a region question, shade the overlap and state clearly which conditions it satisfies.',
              ],
              workedExamples: [
                {
                  prompt: 'The bearing of B from A is 070°. Find the bearing of A from B.',
                  steps: ['The back bearing differs by 180°.', 'Since 070° is less than 180°, add: 070 + 180 = 250.', 'Write it as three figures: 250°.'],
                  answer: '250°',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What is the locus of points equidistant from two points?', back: 'The perpendicular bisector of the line joining them.', difficulty: 'MEDIUM' },
            { front: 'What is the locus of points equidistant from two lines?', back: 'The angle bisector between them.', difficulty: 'MEDIUM' },
            { front: 'Give the three rules for bearings.', back: 'Measured from north, clockwise, and always written with three figures.', difficulty: 'MEDIUM' },
            { front: 'How do you find a back bearing?', back: 'Add 180° if the bearing is under 180°, subtract 180° if it is over.', difficulty: 'HARD' },
            { front: 'Why must construction arcs be left on the diagram?', back: 'They are the evidence of method, and marks are awarded for them.', difficulty: 'EASY' },
            { front: 'What rotational symmetry does a regular hexagon have?', back: 'Order 6, and it also has 6 lines of symmetry.', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'The bearing of Q from P is 215°. Calculate the bearing of P from Q, in degrees.',
              answer: '035',
              markScheme: [
                'Recognises the back bearing differs by 180° (1)',
                'Since 215 > 180, subtracts: 215 − 180 (1)',
                'Answer 035° written with three figures (1)',
              ],
              marks: 3,
              explanation:
                'The third mark depends on the three-figure format. Writing 35° rather than 035° is a genuine and frequent mark loss.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'mensuration',
      title: 'Mensuration',
      summary: 'Area, perimeter, surface area, volume, arcs and sectors.',
      subtopics: [
        {
          number: '5.1',
          slug: 'area-volume-and-surface-area',
          title: 'Area, volume and surface area',
          summary: 'The standard formulae, and choosing the right one.',
          objectives: [
            { code: '5.1.1', statement: 'Calculate perimeter and area of common shapes including circles and compound shapes.', tier: 'CORE' },
            { code: '5.1.2', statement: 'Calculate surface area and volume of prisms, cylinders, cones and spheres.', tier: 'CORE' },
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
        {
          number: '5.2',
          slug: 'arcs-and-sectors',
          title: 'Arcs and sectors',
          summary: 'Working with parts of a circle.',
          prerequisites: ['5.1'],
          objectives: [
            { code: '5.2.1', statement: 'Calculate arc length, sector area and the perimeter of a sector.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'arcs-and-sectors',
              title: 'Arcs and sectors',
              readingMinutes: 5,
              body: `A **sector** is a "pizza slice" of a circle, bounded by two radii and an arc. An **arc** is the curved part of the circumference.
### The single idea
A sector with angle θ is the fraction \`θ/360\` of the whole circle. Every formula follows:
- **Arc length** = \`(θ/360) × 2πr\`
- **Sector area** = \`(θ/360) × πr²\`
Rather than memorising two formulas, remember one principle — take that fraction of the whole — and the rest is the circle formulas you already know.
### Perimeter of a sector — the classic trap
The perimeter is **not** just the arc. It is the arc **plus the two radii**:
\`Perimeter = arc length + 2r\`
Forgetting the two straight edges is the most common error in this topic, because "perimeter" is loosely associated with "the curved bit".
### Segments
A **segment** is cut off by a **chord** rather than by two radii. Its area is found by:
\`segment area = sector area − triangle area\`
where the triangle is formed by the two radii and the chord, with area \`½ab sin C\`.
### Semicircles and quarter circles
These are simply sectors with θ = 180° or 90°. A semicircle's perimeter is \`πr + 2r\`, not \`πr\`.`,
              analogy: 'A sector is a slice of pie. The crust is the arc, but the perimeter of the slice includes the two straight cut edges — which is exactly what people forget when they only look at the crust.',
              misconceptions: [
                'Giving the perimeter of a sector as the arc length alone, omitting \`+ 2r\`.',
                'Using \`θ/180\` instead of \`θ/360\`. The full circle is 360°.',
                'Confusing a segment with a sector. A sector is bounded by two radii; a segment by a chord.',
              ],
              examTips: [
                'Write \`θ/360\` first and multiply it by whichever whole-circle formula you need — one principle covers both arc and area.',
                'Read carefully for "perimeter" versus "arc length"; they differ by 2r and the question is often testing exactly that.',
              ],
              workedExamples: [
                {
                  prompt: 'A sector has radius 6 cm and angle 60°. Find its arc length and its perimeter, to 3 significant figures.',
                  steps: ['The fraction of the circle is 60/360 = 1/6.', 'Arc length = (1/6) × 2π(6) = (1/6) × 12π = 2π ≈ 6.283 cm.', 'Perimeter = arc + 2r = 6.283 + 12 = 18.283.', 'To 3 s.f. that is 18.3 cm.'],
                  answer: 'Arc ≈ 6.28 cm; perimeter ≈ 18.3 cm',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the formula for arc length.', back: '(θ/360) × 2πr', difficulty: 'MEDIUM' },
            { front: 'Give the formula for sector area.', back: '(θ/360) × πr²', difficulty: 'MEDIUM' },
            { front: 'What is the perimeter of a sector?', back: 'Arc length + 2r — the two radii must be included.', difficulty: 'HARD' },
            { front: 'What is the difference between a sector and a segment?', back: 'A sector is bounded by two radii and an arc; a segment is cut off by a chord.', difficulty: 'HARD' },
            { front: 'How do you find the area of a segment?', back: 'Sector area minus the area of the triangle formed by the two radii and the chord.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'A sector of a circle has radius 10 cm and angle 72°. Calculate the perimeter of the sector, in cm to 3 significant figures.',
              answer: '32.6',
              markScheme: [
                'Arc length = (72/360) × 2π × 10 = 4π (1)',
                'Adds two radii: 4π + 20 (1)',
                'Answer 32.6 cm (1)',
              ],
              marks: 3,
              explanation:
                '4π ≈ 12.566, plus 20 gives 32.566, so 32.6 cm. Answering 12.6 cm means only the arc was calculated — precisely the trap.',
              hint: 'The perimeter includes the two straight edges as well as the curve.',
            },
          ],
        },
      ],
    },
    {
      number: '6',
      slug: 'trigonometry',
      title: 'Trigonometry',
      summary: 'Pythagoras, SOHCAHTOA, the sine and cosine rules, and 3D problems.',
      subtopics: [
        {
          number: '6.1',
          slug: 'pythagoras-and-trigonometry',
          title: 'Pythagoras and right-angled trigonometry',
          summary: 'Finding sides and angles in right-angled triangles.',
          objectives: [
            { code: '6.1.1', statement: 'Apply Pythagoras\' theorem and the trigonometric ratios in right-angled triangles.', tier: 'CORE' },
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
The **angle of elevation** is measured upward from the horizontal, the **angle of depression** downward from the horizontal. Both are measured **from the horizontal**, never from the vertical.`,
              analogy: 'Choosing a trig ratio is like choosing a spanner by size: identify the two sides involved, and exactly one of sin, cos or tan fits them. Guessing wastes time; labelling first makes the choice automatic.',
              misconceptions: [
                'Labelling opposite and adjacent from the right angle rather than from the angle in use. They swap depending on which angle you are working with.',
                'Subtracting when finding the hypotenuse. Adding is required; subtraction is only for finding a shorter side.',
                'Leaving the calculator in radians. It must be in **degrees** for IGCSE.',
              ],
              examTips: [
                'Always draw and label the triangle, marking which side is opposite, adjacent and hypotenuse for the angle you are using.',
                'Check your calculator is in degree mode at the start of the paper — one wrong mode setting can ruin every trigonometry question.',
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
            { front: 'From where is an angle of elevation measured?', back: 'Upward from the horizontal.', difficulty: 'MEDIUM' },
            { front: 'Which side is the hypotenuse?', back: 'The side opposite the right angle — always the longest.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'In a right-angled triangle, the hypotenuse is 10 cm and one angle is 30°. Calculate the length of the side opposite that angle, in cm.',
              answer: '5',
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
        {
          number: '6.2',
          slug: 'sine-and-cosine-rules',
          title: 'Sine rule, cosine rule and area of a triangle',
          summary: 'Trigonometry in triangles without a right angle.',
          prerequisites: ['6.1'],
          objectives: [
            { code: '6.2.1', statement: 'Use the sine and cosine rules and the formula ½ab sin C for area.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'sine-and-cosine-rules',
              title: 'Sine rule, cosine rule and area of a triangle',
              readingMinutes: 6,
              body: `When there is **no right angle**, SOHCAHTOA does not apply. Two rules cover every case.
### Labelling
Side **a** is opposite angle **A**, side **b** opposite **B**, side **c** opposite **C**. Getting this right is half the battle.
### The sine rule
\`a/sin A = b/sin B = c/sin C\`
Use when you have a **matching pair** — a side and its opposite angle — plus one more piece of information.
Invert it when finding an angle: \`sin A/a = sin B/b\`.
### The cosine rule
\`a² = b² + c² − 2bc cos A\`
Use when the sine rule cannot start, namely:
- **Three sides** given (finding any angle), or
- **Two sides and the included angle** (finding the third side).
Rearranged for an angle: \`cos A = (b² + c² − a²)/(2bc)\`.
### Choosing between them
Ask one question: **do I have a side and its opposite angle?** If yes, sine rule. If no, cosine rule. This single test resolves nearly every question.
### Area of a triangle
\`Area = ½ab sin C\` — two sides and the **included** angle between them. If the angle is not between the two sides, it does not work.
### The ambiguous case
When the sine rule gives an angle, remember \`sin θ = sin(180 − θ)\`, so an obtuse solution may also be valid. If the diagram or context shows an obtuse angle, use \`180 − θ\`.`,
              analogy: 'The two rules divide the work like two tools for one job: the sine rule needs a matched pair to get started, and when you have no matched pair, the cosine rule is the crowbar that makes the first opening.',
              misconceptions: [
                'Using the sine rule with three sides given. There is no matching angle to start from, so the cosine rule is required.',
                'Using \`½ab sin C\` with an angle that is not between the two sides. The angle must be included.',
                'Forgetting the ambiguous case, so an obtuse triangle is reported as acute.',
              ],
              examTips: [
                'Label the diagram with a, b, c and A, B, C before choosing a rule — mismatched labelling is the main source of error.',
                'If the cosine rule produces a negative cosine, the angle is obtuse. That is correct, not a mistake.',
              ],
              workedExamples: [
                {
                  prompt: 'A triangle has sides 7 cm and 9 cm with an included angle of 40°. Find the third side, to 3 significant figures.',
                  steps: ['Two sides and the included angle means the cosine rule.', 'a² = 7² + 9² − 2(7)(9)cos 40°.', '= 49 + 81 − 126 × 0.766 = 130 − 96.5 = 33.5.', 'a = √33.5 ≈ 5.79 cm.'],
                  answer: '5.79 cm',
                },
                {
                  prompt: 'Find the area of a triangle with sides 8 cm and 5 cm and an included angle of 30°.',
                  steps: ['Use Area = ½ab sin C with a = 8, b = 5, C = 30°.', '= ½ × 8 × 5 × sin 30°.', '= 20 × 0.5 = 10 cm².'],
                  answer: '10 cm²',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the sine rule.', back: 'a/sin A = b/sin B = c/sin C', difficulty: 'MEDIUM' },
            { front: 'State the cosine rule.', back: 'a² = b² + c² − 2bc cos A', difficulty: 'MEDIUM' },
            { front: 'When do you use the cosine rule?', back: 'With three sides, or two sides and the included angle — when there is no matching side-angle pair.', difficulty: 'HARD' },
            { front: 'Give the formula for the area of a triangle using trigonometry.', back: 'Area = ½ab sin C, where C is the included angle.', difficulty: 'MEDIUM' },
            { front: 'What does a negative cosine indicate?', back: 'The angle is obtuse.', difficulty: 'HARD' },
            { front: 'What is the ambiguous case?', back: 'sin θ = sin(180 − θ), so the sine rule may give both an acute and an obtuse solution.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'A triangle has sides of 6 cm, 8 cm and 12 cm. Calculate the largest angle, in degrees to 1 decimal place.',
              answer: '117.3',
              markScheme: [
                'Recognises the largest angle is opposite the longest side and uses the cosine rule (1)',
                'cos A = (6² + 8² − 12²)/(2 × 6 × 8) (1)',
                'Answer 117.3° (1)',
              ],
              marks: 3,
              explanation:
                'cos A = (36 + 64 − 144)/96 = −44/96 = −0.4583, giving A ≈ 117.3°. The negative cosine correctly signals an obtuse angle.',
              hint: 'The largest angle sits opposite the longest side, and three sides means the cosine rule.',
            },
          ],
        },
      ],
    },
    {
      number: '7',
      slug: 'transformations-and-vectors',
      title: 'Transformations and vectors',
      summary: 'Describing transformations, and calculating with vectors.',
      subtopics: [
        {
          number: '7.1',
          slug: 'transformations',
          title: 'Transformations',
          summary: 'Reflection, rotation, translation and enlargement — and describing them fully.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '7.1.1', statement: 'Carry out and fully describe reflections, rotations, translations and enlargements.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'transformations',
              title: 'Transformations',
              readingMinutes: 6,
              body: `Marks here are awarded for **complete descriptions**. Each transformation has a required set of details, and missing one loses the mark.
### The four transformations and what a full description needs
- **Reflection** — name the transformation and give the **equation of the mirror line** (e.g. \`y = x\`, \`x = 2\`).
- **Rotation** — give the **angle**, the **direction** (clockwise or anticlockwise), and the **centre of rotation**. All three are required.
- **Translation** — give the **column vector** \`(x above y)\`, where the top number is movement right and the bottom is movement up (negatives for left and down).
- **Enlargement** — give the **scale factor** and the **centre of enlargement**.
### One transformation only
If asked to "describe **the** transformation", give exactly one. Writing "reflection then translation" scores zero even if it is geometrically true — the question guarantees a single transformation exists.
### Enlargement details
- A scale factor **between 0 and 1** makes the image **smaller**, though it is still called an enlargement.
- A **negative** scale factor puts the image on the **opposite side** of the centre, inverted.
- Only enlargement changes size; reflection, rotation and translation are **congruent** transformations, preserving lengths and angles.
### Finding a centre
For a rotation or enlargement, join corresponding points of object and image; the lines meet at the centre. For rotation, use perpendicular bisectors of the joins instead.`,
              analogy: 'A full description is a set of directions precise enough for someone else to reproduce the move exactly. "Rotate it" is as useless as "go that way" — the angle, direction and pivot are what make it repeatable.',
              misconceptions: [
                'Describing a rotation without the centre, or without the direction. All three details are required.',
                'Thinking a scale factor of ½ is a "reduction" and not an enlargement. The term covers any scale factor.',
                'Giving two transformations when one is asked for, which scores nothing.',
              ],
              examTips: [
                'Learn the required details as a checklist: reflection → mirror line; rotation → angle, direction, centre; translation → vector; enlargement → scale factor, centre.',
                'Check whether the image is the same size. If it is, the transformation cannot be an enlargement.',
              ],
              workedExamples: [
                {
                  prompt: 'A triangle is mapped onto an identical triangle turned upside down, with the point (2, 3) fixed. Describe the transformation fully.',
                  steps: ['The image is the same size, so it is not an enlargement.', 'It is inverted but not mirrored in a line through the shape, suggesting a rotation of 180°.', 'The fixed point is the centre of rotation.', 'At 180°, clockwise and anticlockwise are identical, so direction need not be specified.'],
                  answer: 'A rotation of 180° about the centre (2, 3).',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What three details describe a rotation?', back: 'Angle, direction (clockwise/anticlockwise) and centre of rotation.', difficulty: 'HARD' },
            { front: 'What describes a reflection?', back: 'The equation of the mirror line.', difficulty: 'MEDIUM' },
            { front: 'What describes an enlargement?', back: 'The scale factor and the centre of enlargement.', difficulty: 'MEDIUM' },
            { front: 'What does a negative scale factor do?', back: 'Places the image on the opposite side of the centre, inverted.', difficulty: 'HARD' },
            { front: 'Which transformations preserve size?', back: 'Reflection, rotation and translation — all are congruent transformations.', difficulty: 'MEDIUM' },
            { front: 'How is a translation described?', back: 'By a column vector, top number right and bottom number up.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'MCQ',
              difficulty: 'STANDARD',
              stem: 'A shape is transformed so that it stays the same size and orientation but moves 3 right and 2 down. Which description is complete and correct?',
              options: [
                { id: 'a', text: 'Translation by the column vector (3, −2)', why: '' },
                { id: 'b', text: 'Translation', why: 'Incomplete — a translation must be described by its column vector.' },
                { id: 'c', text: 'Enlargement with scale factor 1', why: 'Although technically size-preserving, the standard description of this movement is a translation.' },
                { id: 'd', text: 'Rotation of 90° clockwise', why: 'A rotation would change the orientation of the shape.' },
              ],
              answer: 'a',
              markScheme: ['Translation with the correct column vector, 3 right and 2 down (1)'],
              marks: 1,
              explanation:
                'Down is negative in the vertical component, so the vector is 3 over −2. Naming the transformation without the vector is exactly the incomplete answer that loses marks.',
            },
          ],
        },
        {
          number: '7.2',
          slug: 'vectors',
          title: 'Vectors',
          summary: 'Column vectors, magnitude, and vector geometry.',
          prerequisites: ['7.1'],
          objectives: [
            { code: '7.2.1', statement: 'Add, subtract and multiply vectors by a scalar, and find magnitude.', tier: 'CORE' },
            { code: '7.2.2', statement: 'Use vectors in geometric proofs, including parallel and collinear points.', tier: 'SUPPLEMENT' },
          ],
          lessons: [
            {
              slug: 'vectors',
              title: 'Vectors',
              readingMinutes: 6,
              body: `A **vector** has both **magnitude** and **direction**, unlike a scalar which has magnitude only.
### Column vectors
Written \`(x above y)\`: x is movement right, y is movement up, with negatives for left and down.
- **Adding**: add the components. Geometrically, follow one vector then the other.
- **Subtracting**: \`a − b = a + (−b)\`, where \`−b\` is the same length in the opposite direction.
- **Scalar multiple**: \`3a\` is three times as long, in the **same** direction. \`−2a\` is twice as long in the **opposite** direction.
### Magnitude
\`|a| = √(x² + y²)\` — Pythagoras applied to the components.
### Route notation
\`AB\` (with the arrow) means the vector from A to B, and \`BA = −AB\`. To travel from A to C via B: \`AC = AB + BC\`. Any journey can be broken into steps this way, which is the core skill in vector geometry.
### Parallel and collinear — the key insight
If one vector is a **scalar multiple** of another, the two are **parallel**.
If they are parallel **and share a common point**, the points are **collinear** (lie on the same straight line).
So to prove three points A, B, C are collinear:
1. Find \`AB\` and \`BC\` in terms of the base vectors.
2. Show \`BC = k × AB\` for some number k.
3. State that they are parallel **and share the point B**, therefore A, B and C lie on a straight line.
Step 3 is essential — parallel alone does not prove collinear, since parallel lines can be separate.`,
              analogy: 'A vector is an instruction, not a place: "three streets east, two north" works from wherever you start. That is why the same vector can appear in different parts of a diagram.',
              misconceptions: [
                'Concluding that parallel vectors mean collinear points. A shared point is also required.',
                'Forgetting that \`BA = −AB\`, which reverses signs when a route is traversed backwards.',
                'Adding vectors by multiplying components, or finding magnitude by adding them instead of using Pythagoras.',
              ],
              examTips: [
                'Write every route as a chain of steps through known vectors — \`AC = AB + BC\` — rather than trying to see the answer directly.',
                'For a collinearity proof, always finish with the sentence naming the common point. That sentence is a mark.',
              ],
              workedExamples: [
                {
                  prompt: 'Given a = (3 above 4), find |a|.',
                  steps: ['Magnitude uses Pythagoras on the components.', '|a| = √(3² + 4²) = √(9 + 16).', '= √25 = 5.'],
                  answer: '5',
                },
                {
                  prompt: 'OA = a and OB = b. M is the midpoint of AB. Express OM in terms of a and b.',
                  steps: ['Travel from O to A, then halfway along AB: OM = OA + ½AB.', 'AB = OB − OA = b − a.', 'So OM = a + ½(b − a) = a + ½b − ½a.', 'Simplify: OM = ½a + ½b, or ½(a + b).'],
                  answer: 'OM = ½(a + b)',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'How do you find the magnitude of a vector?', back: '|a| = √(x² + y²)', difficulty: 'MEDIUM' },
            { front: 'What does BA equal in terms of AB?', back: '−AB — the same vector reversed.', difficulty: 'MEDIUM' },
            { front: 'How do you show two vectors are parallel?', back: 'Show one is a scalar multiple of the other.', difficulty: 'HARD' },
            { front: 'What extra condition proves points are collinear?', back: 'The vectors must be parallel AND share a common point.', difficulty: 'HARD' },
            { front: 'How do you express AC via B?', back: 'AC = AB + BC', difficulty: 'MEDIUM' },
            { front: 'What is the difference between a vector and a scalar?', back: 'A vector has magnitude and direction; a scalar has magnitude only.', difficulty: 'EASY' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'OA = a and OB = b. Point C is such that BC = 2a. Show that OC = b + 2a, and explain what this tells you about the direction of AC relative to a. [3]',
              answer:
                'To reach C from O, travel to B then along BC: OC = OB + BC = b + 2a. To find AC, go from A back to O then out to C: AC = AO + OC = −a + (b + 2a) = b + a. Since AC is not a scalar multiple of a alone, AC is not parallel to a — it has a component in the direction of b as well.',
              markScheme: [
                'Uses the route OC = OB + BC (1)',
                'Obtains OC = b + 2a (1)',
                'Correctly finds AC = a + b and comments that it is not a multiple of a, so not parallel to a (1)',
              ],
              marks: 3,
              explanation:
                'Vector geometry questions are route-finding exercises. Writing the journey as a chain of known steps is what makes the algebra straightforward.',
              hint: 'Get from O to C by going via B, then build AC from AO and OC.',
            },
          ],
        },
      ],
    },
    {
      number: '8',
      slug: 'probability',
      title: 'Probability',
      summary: 'Single and combined events, tree diagrams, and relative frequency.',
      subtopics: [
        {
          number: '8.1',
          slug: 'probability',
          title: 'Probability of single and combined events',
          summary: 'Calculating probabilities and using tree diagrams.',
          objectives: [
            { code: '8.1.1', statement: 'Calculate probabilities of single and combined events using tree and Venn diagrams.', tier: 'CORE' },
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
        {
          number: '8.2',
          slug: 'relative-frequency',
          title: 'Relative frequency and expected frequency',
          summary: 'Estimating probability from data, and predicting outcomes.',
          prerequisites: ['8.1'],
          objectives: [
            { code: '8.2.1', statement: 'Use relative frequency to estimate probability and calculate expected frequencies.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'relative-frequency',
              title: 'Relative frequency and expected frequency',
              readingMinutes: 4,
              body: `### Relative frequency
When a probability cannot be worked out theoretically — an unfair dice, a drawing pin landing point up — it is **estimated from experiment**:
\`relative frequency = number of times the event happened / total number of trials\`
### Reliability
The estimate improves as the number of trials increases. With 10 trials it may be far from the true value; with 1000 it will usually be close. If asked how to improve an estimate, the answer is always to **increase the number of trials**.
### Theoretical versus experimental
- **Theoretical** probability comes from the structure of the situation — a fair dice gives 1/6 for each face.
- **Experimental** (relative frequency) comes from what actually happened.
If the two differ substantially over many trials, that is evidence the object is **biased**. Small differences over few trials mean nothing.
### Expected frequency
To predict how many times an event will occur:
\`expected frequency = probability × number of trials\`
If P(red) = 0.3 and there are 200 spins, the expected number of reds is \`0.3 × 200 = 60\`.
Expected frequency is a **prediction, not a guarantee** — getting 58 or 63 reds would be entirely unremarkable. Questions often reserve a mark for saying so.`,
              analogy: 'Relative frequency is an opinion poll on a dice: ask it ten times and the result is noisy, ask it a thousand times and you can trust the answer. More trials means a smaller margin of error.',
              misconceptions: [
                'Treating expected frequency as exactly what will happen. It is the most likely long-run average, not a promise.',
                'Concluding a dice is biased from a handful of throws. Small samples vary a great deal by chance.',
                'Confusing relative frequency with frequency. Relative frequency is the proportion, so it lies between 0 and 1.',
              ],
              examTips: [
                'If asked how to make an estimate more reliable, the expected answer is "carry out more trials".',
                'When comparing experimental with theoretical probability, comment on the **number of trials** before declaring bias.',
              ],
              workedExamples: [
                {
                  prompt: 'A spinner is spun 200 times and lands on blue 46 times. Estimate the probability of blue, and predict how many blues in 500 spins.',
                  steps: ['Relative frequency = 46/200 = 0.23.', 'Expected frequency = probability × number of trials.', '= 0.23 × 500 = 115.'],
                  answer: 'P(blue) ≈ 0.23; about 115 blues expected in 500 spins',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the formula for relative frequency.', back: 'Number of successes ÷ total number of trials.', difficulty: 'EASY' },
            { front: 'How do you improve a probability estimate?', back: 'Increase the number of trials.', difficulty: 'EASY' },
            { front: 'Give the formula for expected frequency.', back: 'Probability × number of trials.', difficulty: 'MEDIUM' },
            { front: 'Does expected frequency guarantee the outcome?', back: 'No — it is a prediction of the long-run average, not a certainty.', difficulty: 'MEDIUM' },
            { front: 'What suggests a dice is biased?', back: 'Experimental probability differing substantially from theoretical over a large number of trials.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'The probability that a machine produces a faulty item is 0.04. Calculate the expected number of faulty items in a batch of 1500.',
              answer: '60',
              markScheme: [
                'Uses expected frequency = probability × number of trials (1)',
                'Calculates 0.04 × 1500 (1)',
                'Answer 60 (1)',
              ],
              marks: 3,
              explanation:
                'This is a prediction of the long-run average. The actual number in any single batch would vary around 60 without contradicting the probability.',
            },
          ],
        },
      ],
    },
    {
      number: '9',
      slug: 'statistics',
      title: 'Statistics',
      summary: 'Averages, cumulative frequency, histograms and scatter diagrams.',
      subtopics: [
        {
          number: '9.1',
          slug: 'averages-and-data',
          title: 'Averages and representing data',
          summary: 'Mean, median, mode, range, and choosing the right average.',
          objectives: [
            { code: '9.1.1', statement: 'Calculate and interpret mean, median, mode and range, including from frequency tables.', tier: 'CORE' },
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
        {
          number: '9.2',
          slug: 'cumulative-frequency',
          title: 'Cumulative frequency and box plots',
          summary: 'Medians, quartiles and interquartile range from a curve.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '9.2.1', statement: 'Draw and interpret cumulative frequency diagrams and box-and-whisker plots.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'cumulative-frequency',
              title: 'Cumulative frequency and box plots',
              readingMinutes: 6,
              body: `### Cumulative frequency
**Cumulative frequency** is a running total. Each value is added to all those before it, so the final figure equals the total number of items.
Plot cumulative frequency against the **upper class boundary** of each group — not the midpoint — and join with a smooth curve. Plotting at the midpoint is a standard error.
### Reading the curve
For n items:
- **Median** — read across from \`n/2\`.
- **Lower quartile (Q1)** — read across from \`n/4\`.
- **Upper quartile (Q3)** — read across from \`3n/4\`.
- **Interquartile range (IQR)** = \`Q3 − Q1\`.
Note that for a *curve* we use n/2 rather than (n+1)/2 — the smoothed graph treats the data as continuous.
### Why the IQR matters
The IQR measures the spread of the **middle half** of the data, so it **ignores outliers** entirely. That is precisely why it is often preferred to the range, which is defined by the two most extreme values.
### Box-and-whisker plots
A box plot displays five values: minimum, Q1, median, Q3, maximum. The box spans the IQR with the median marked inside; the whiskers reach the extremes.
### Comparing two distributions
Always compare **two things**:
1. An **average** — usually the medians — for typical value.
2. A **spread** — usually the IQRs — for consistency.
"Group A has a higher median so scored better on average, and a smaller IQR so was more consistent." That two-part structure is what the marks are for.`,
              analogy: 'A box plot is a five-number summary of a whole dataset — like a weather summary giving the low, high and typical temperature rather than every hourly reading.',
              misconceptions: [
                'Plotting cumulative frequency against the midpoint of a class. It must be the **upper** boundary.',
                'Comparing only the medians. Spread must also be commented on for full marks.',
                'Confusing the IQR with the range. The IQR is Q3 − Q1 and deliberately excludes the extremes.',
              ],
              examTips: [
                'Draw and label your reading lines on the graph — examiners award marks for the correct construction lines even if the final read-off is slightly out.',
                'Structure comparisons in two sentences: one about average, one about spread, each interpreted in context.',
              ],
              workedExamples: [
                {
                  prompt: 'A cumulative frequency curve represents 80 students. Explain how to find the interquartile range from it.',
                  steps: ['Q1 is at n/4 = 80/4 = 20; read across from 20 to the curve and down to the value.', 'Q3 is at 3n/4 = 60; read across from 60 to the curve and down.', 'IQR = Q3 − Q1.'],
                  answer: 'Read the values at cumulative frequencies 20 and 60, then subtract the lower from the upper.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Where do you plot cumulative frequency points?', back: 'At the upper class boundary of each group.', difficulty: 'HARD' },
            { front: 'How do you find the median from a cumulative frequency curve of n items?', back: 'Read across from n/2.', difficulty: 'MEDIUM' },
            { front: 'How do you find the interquartile range?', back: 'IQR = Q3 − Q1, read at 3n/4 and n/4.', difficulty: 'MEDIUM' },
            { front: 'Why is the IQR often preferred to the range?', back: 'It measures the middle half of the data, so it is not affected by outliers.', difficulty: 'HARD' },
            { front: 'What five values does a box plot show?', back: 'Minimum, lower quartile, median, upper quartile and maximum.', difficulty: 'MEDIUM' },
            { front: 'What two things must you compare between distributions?', back: 'An average (median) and a measure of spread (IQR), both interpreted in context.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Two classes sat the same test. Class A has median 62 and IQR 8. Class B has median 55 and IQR 20. Compare the performance of the two classes. [2]',
              answer:
                'Class A has a higher median (62 compared with 55), so on average Class A scored better on the test. Class A also has a much smaller interquartile range (8 compared with 20), which means their marks were far more consistent, while Class B\'s results were much more spread out.',
              markScheme: [
                'Compares medians with interpretation: A higher, so better on average (1)',
                'Compares IQRs with interpretation: A smaller, so more consistent (1)',
              ],
              marks: 2,
              explanation:
                'Both marks require interpretation, not just the numbers. Stating "A has median 62 and B has 55" without saying what that means about performance earns nothing.',
              hint: 'One sentence about average, one about spread — and say what each means.',
            },
          ],
        },
        {
          number: '9.3',
          slug: 'histograms-and-scatter-diagrams',
          title: 'Histograms and scatter diagrams',
          summary: 'Frequency density, and correlation between two variables.',
          prerequisites: ['9.1'],
          objectives: [
            { code: '9.3.1', statement: 'Draw and interpret histograms with unequal class widths using frequency density.', tier: 'SUPPLEMENT' },
            { code: '9.3.2', statement: 'Draw scatter diagrams, describe correlation and use a line of best fit.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'histograms-and-scatter-diagrams',
              title: 'Histograms and scatter diagrams',
              readingMinutes: 6,
              body: `### Histograms
A histogram looks like a bar chart but differs in two crucial ways: the bars **touch** (the data is continuous), and when class widths are unequal the **vertical axis is frequency density**, not frequency.
\`frequency density = frequency ÷ class width\`
The rearrangement matters just as much:
\`frequency = frequency density × class width\`
which is to say **frequency is represented by the AREA of each bar**, not its height. That single fact answers most histogram questions.
### Why area rather than height
With unequal widths, using height alone would make a wide class look far more common than it is. Using area corrects for the width, so the visual impression matches the data.
### Scatter diagrams
Used to investigate a relationship between **two** variables.
**Correlation** describes the pattern:
- **Positive** — as one increases, so does the other.
- **Negative** — as one increases, the other decreases.
- **No correlation** — no discernible pattern.
Strength is described as **strong** or **weak** by how closely the points cluster around a line.
### Line of best fit
Draw a straight line following the trend with roughly equal numbers of points either side; it should pass through the mean point. Use it to **estimate** values.
- **Interpolation** — estimating **within** the data range, which is reasonably reliable.
- **Extrapolation** — estimating **beyond** the data, which is unreliable because the pattern may not continue.
### Correlation is not causation
This is examined explicitly. Ice cream sales and drownings correlate, but neither causes the other — hot weather causes both. Always be prepared to name a possible third factor.`,
              analogy: 'In a histogram, area is the honest measure: a wide, low bar can hold just as many people as a narrow, tall one — exactly as a wide shallow puddle can hold as much water as a narrow deep one.',
              misconceptions: [
                'Reading frequency directly from the height of a histogram bar. Frequency is the **area**.',
                'Leaving gaps between histogram bars. The data is continuous, so bars touch.',
                'Concluding that correlation proves causation, when a third variable may explain both.',
              ],
              examTips: [
                'For any histogram question, write \`frequency = frequency density × class width\` at the top of your working — it converts either way.',
                'When describing correlation, give **both** direction and strength, e.g. "strong positive correlation", then interpret it in context.',
              ],
              workedExamples: [
                {
                  prompt: 'A histogram bar covers the class 10 ≤ x < 30 and has frequency density 2.5. Find the frequency.',
                  steps: ['Class width = 30 − 10 = 20.', 'Frequency = frequency density × class width.', '= 2.5 × 20 = 50.'],
                  answer: '50',
                },
                {
                  prompt: 'A scatter diagram of hours revised against exam mark shows points rising closely along a line. Describe the correlation and state what it suggests.',
                  steps: ['The points rise from left to right, so the correlation is positive.', 'They lie close to a straight line, so it is strong.', 'This suggests students who revised longer tended to score higher — though it does not prove revision caused the higher marks.'],
                  answer: 'Strong positive correlation: more revision is associated with higher marks, though correlation alone does not prove causation.',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'Give the formula for frequency density.', back: 'Frequency ÷ class width.', difficulty: 'MEDIUM' },
            { front: 'What does the area of a histogram bar represent?', back: 'The frequency of that class.', difficulty: 'HARD' },
            { front: 'Why do histogram bars touch?', back: 'Because the data is continuous.', difficulty: 'MEDIUM' },
            { front: 'What is negative correlation?', back: 'As one variable increases, the other decreases.', difficulty: 'EASY' },
            { front: 'Why is extrapolation unreliable?', back: 'It predicts beyond the data range, where the observed pattern may not continue.', difficulty: 'HARD' },
            { front: 'Does correlation prove causation?', back: 'No — a third factor may cause both variables to change.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'CHALLENGE',
              stem: 'In a histogram, a bar covering the class 20 ≤ x < 50 has a frequency density of 4. Calculate the frequency of this class.',
              answer: '120',
              markScheme: [
                'Class width = 50 − 20 = 30 (1)',
                'Uses frequency = frequency density × class width (1)',
                'Answer 4 × 30 = 120 (1)',
              ],
              marks: 3,
              explanation:
                'Reading the frequency as 4 — the height — is the classic error. In a histogram the frequency is the area of the bar, so the class width must be used.',
              hint: 'Frequency is the area of the bar, not its height.',
            },
          ],
        },
      ],
    },
  ],
};
