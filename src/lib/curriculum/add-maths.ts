import type { SyllabusSeed } from './types';

/**
 * Cambridge IGCSE Additional Mathematics 0606.
 *
 * The step up from 0580: calculus, logarithms, trigonometric identities and
 * more demanding algebra. Assumes 0580 material as background rather than
 * re-teaching it. Nothing here is official Cambridge wording.
 */
export const addMaths0606: SyllabusSeed = {
  subject: {
    code: '0606',
    slug: 'add-maths',
    name: 'Additional Mathematics',
    tagline: 'Calculus, logarithms, identities and the algebra that prepares you for A Level.',
    accent: 'add-maths',
  },
  version: {
    code: '0606-2023-2025',
    label: 'Additional Mathematics 0606 (for examination 2023-2025)',
    examFrom: 2023,
    examTo: 2025,
    provenance: 'TEACHER_MAPPED',
    sourceNote:
      'Topic structure paraphrased from the published Cambridge IGCSE Additional Mathematics 0606 specification. Not official Cambridge wording — always check the syllabus document.',
  },
  topics: [
    {
      number: '1',
      slug: 'functions',
      title: 'Functions',
      summary: 'Domain and range, composite and inverse functions.',
      subtopics: [
        {
          number: '1.1',
          slug: 'functions-and-inverses',
          title: 'Composite and inverse functions',
          summary: 'Combining functions and reversing them.',
          objectives: [
            { code: '1.1.1', statement: 'Understand domain and range, and find composite and inverse functions.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'functions-and-inverses',
              title: 'Composite and inverse functions',
              readingMinutes: 6,
              body: `A **function** maps each input to exactly one output. The **domain** is the set of allowed inputs; the **range** is the set of outputs produced.
### Composite functions
\`fg(x)\` means "do **g first**, then f". The function written closer to x acts first.
If \`f(x) = 2x + 1\` and \`g(x) = x²\`:
- \`fg(x) = f(x²) = 2x² + 1\`
- \`gf(x) = g(2x + 1) = (2x + 1)²\`
These are different, so **order matters** — a very common source of lost marks.
### Inverse functions
\`f⁻¹(x)\` undoes f. To find it:
1. Write \`y = f(x)\`.
2. **Swap x and y**.
3. Rearrange to make y the subject.
4. That expression is \`f⁻¹(x)\`.
For \`f(x) = 3x − 4\`: y = 3x − 4 → x = 3y − 4 → y = (x + 4)/3, so \`f⁻¹(x) = (x + 4)/3\`.
### Two facts worth knowing
- \`ff⁻¹(x) = x\` — applying a function then its inverse returns the original. This is a quick way to check your inverse.
- The graph of \`f⁻¹\` is the **reflection of f in the line y = x**.
- Only **one-to-one** functions have inverses. \`f(x) = x²\` has no inverse over all real numbers, because 4 maps back to both 2 and −2 — which is why the domain is often restricted to \`x ≥ 0\`.
### Domain and range in practice
Watch for values that break the function: division by zero, and square roots of negatives. For \`f(x) = 1/(x − 2)\`, the domain excludes \`x = 2\`.`,
              analogy: 'A composite function is a production line: the item passes through the inner machine first. An inverse is running the line backwards, which only works if no two inputs ever produced the same output.',
              misconceptions: [
                'Reading \`fg(x)\` as "f first". The inner function g acts first.',
                'Thinking \`f⁻¹(x)\` means \`1/f(x)\`. The −1 denotes the inverse function, not a reciprocal.',
                'Assuming every function has an inverse. Only one-to-one functions do, which is why domains get restricted.',
              ],
              examTips: [
                'Check an inverse by computing \`ff⁻¹(x)\`; if it does not simplify to x, the inverse is wrong.',
                'When asked for a domain, look specifically for division by zero and square roots of negative numbers.',
              ],
              workedExamples: [
                {
                  prompt: 'Given f(x) = 3x − 4 and g(x) = x + 2, find fg(x) and f⁻¹(x).',
                  steps: ['fg(x) means apply g first: g(x) = x + 2.', 'Then apply f to that: f(x + 2) = 3(x + 2) − 4 = 3x + 6 − 4 = 3x + 2.', 'For the inverse, write y = 3x − 4 and swap: x = 3y − 4.', 'Rearrange: 3y = x + 4, so y = (x + 4)/3.'],
                  answer: 'fg(x) = 3x + 2 and f⁻¹(x) = (x + 4)/3',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'In fg(x), which function acts first?', back: 'g — the inner function, written closer to x.', difficulty: 'MEDIUM' },
            { front: 'How do you find an inverse function?', back: 'Write y = f(x), swap x and y, then rearrange to make y the subject.', difficulty: 'MEDIUM' },
            { front: 'What does ff⁻¹(x) equal?', back: 'x — the inverse undoes the function.', difficulty: 'MEDIUM' },
            { front: 'What is the graph of f⁻¹ relative to f?', back: 'A reflection of f in the line y = x.', difficulty: 'HARD' },
            { front: 'Which functions have inverses?', back: 'Only one-to-one functions, which is why domains are sometimes restricted.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'STANDARD',
              stem: 'Given f(x) = 2x + 5, find f⁻¹(x) and verify your answer. [3]',
              answer:
                'Write y = 2x + 5, then swap x and y to get x = 2y + 5. Rearranging gives 2y = x − 5, so y = (x − 5)/2 and therefore f⁻¹(x) = (x − 5)/2. Verifying: ff⁻¹(x) = 2((x − 5)/2) + 5 = (x − 5) + 5 = x, as required.',
              markScheme: [
                'Swaps x and y correctly (1)',
                'Rearranges to f⁻¹(x) = (x − 5)/2 (1)',
                'Verifies that ff⁻¹(x) = x (1)',
              ],
              marks: 3,
              explanation:
                'The verification step is genuinely useful, not just presentation: it catches sign and division errors before they cost marks elsewhere in the question.',
            },
          ],
        },
      ],
    },
    {
      number: '2',
      slug: 'logarithms-and-exponentials',
      title: 'Logarithms and exponential functions',
      summary: 'Laws of logarithms and solving exponential equations.',
      subtopics: [
        {
          number: '2.1',
          slug: 'logarithms',
          title: 'Laws of logarithms',
          summary: 'What a logarithm is, and how to use the laws to solve equations.',
          objectives: [
            { code: '2.1.1', statement: 'Use the laws of logarithms and solve equations involving exponentials and logarithms.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'logarithms',
              title: 'Laws of logarithms',
              readingMinutes: 6,
              body: `### What a logarithm is
A logarithm answers the question "**what power?**".
\`log_a b = c\` means exactly \`aᶜ = b\`.
So \`log₂ 8 = 3\` because \`2³ = 8\`. Every logarithm statement can be rewritten as an index statement, and switching between the two forms is usually the key move.
### The laws
These mirror the index laws, because logarithms *are* indices:
- \`log a + log b = log(ab)\` — addition becomes multiplication.
- \`log a − log b = log(a/b)\` — subtraction becomes division.
- \`log(aⁿ) = n log a\` — a power comes down to the front.
- \`log_a a = 1\` and \`log_a 1 = 0\`.
The third law is the workhorse: it is how an unknown trapped in an exponent gets freed.
### Solving exponential equations
To solve \`3ˣ = 20\`, take logs of both sides:
\`x log 3 = log 20\`, so \`x = log 20 / log 3 ≈ 2.727\`.
The whole method is: take logs, bring the power down, divide.
### Natural logarithms
\`ln x\` means \`log_e x\`, where e ≈ 2.718. The same laws apply. \`ln e = 1\`, and \`e^(ln x) = x\`.
Exponential growth and decay use \`y = Ae^(kx)\`, with k positive for growth and negative for decay.
### The domain restriction
You cannot take the logarithm of zero or a negative number. When solving, **always check your solutions** against this — a perfectly valid-looking algebraic answer may have to be rejected.`,
              analogy: 'A logarithm is the question mark in "2 to the what makes 8?". Because it is an index in disguise, every log law is just an index law read backwards — which is why they are worth learning as pairs.',
              misconceptions: [
                'Writing \`log(a + b) = log a + log b\`. It is the other way round: **log a + log b = log(ab)**.',
                'Forgetting to reject solutions that would require the log of a negative number or zero.',
                'Thinking \`log(a/b) = log a / log b\`. Division inside becomes **subtraction** outside.',
              ],
              examTips: [
                'When the unknown is in an exponent, taking logs of both sides is almost always the intended first step.',
                'After solving any equation containing logs, substitute your answers back to check none makes a logarithm undefined.',
              ],
              workedExamples: [
                {
                  prompt: 'Solve 5ˣ = 40, giving your answer to 3 significant figures.',
                  steps: ['Take logarithms of both sides: log(5ˣ) = log 40.', 'Use the power law to bring x down: x log 5 = log 40.', 'Divide: x = log 40 / log 5.', 'x ≈ 1.60206 / 0.69897 ≈ 2.2920.'],
                  answer: 'x ≈ 2.29',
                },
                {
                  prompt: 'Solve log₂ x + log₂ (x − 2) = 3.',
                  steps: ['Combine using the addition law: log₂ (x(x − 2)) = 3.', 'Rewrite in index form: x(x − 2) = 2³ = 8.', 'Expand and rearrange: x² − 2x − 8 = 0, which factorises to (x − 4)(x + 2) = 0.', 'So x = 4 or x = −2. But x = −2 makes log₂ x undefined, so it must be rejected.'],
                  answer: 'x = 4 only',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'What does log_a b = c mean?', back: 'aᶜ = b — the logarithm answers "what power?".', difficulty: 'MEDIUM' },
            { front: 'State the law for log a + log b.', back: 'log(ab) — addition of logs becomes multiplication inside.', difficulty: 'MEDIUM' },
            { front: 'State the power law for logarithms.', back: 'log(aⁿ) = n log a', difficulty: 'MEDIUM' },
            { front: 'How do you solve aˣ = b?', back: 'Take logs of both sides, bring x down with the power law, then divide.', difficulty: 'HARD' },
            { front: 'What is ln x?', back: 'The natural logarithm, log to base e where e ≈ 2.718.', difficulty: 'MEDIUM' },
            { front: 'Why must log solutions be checked?', back: 'The logarithm of zero or a negative number is undefined, so some algebraic solutions must be rejected.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Solve the equation log₃ x + log₃ (x − 6) = 3. [4]',
              answer:
                'Combining the logarithms gives log₃ (x(x − 6)) = 3. Writing this in index form gives x(x − 6) = 3³ = 27, so x² − 6x − 27 = 0. This factorises to (x − 9)(x + 3) = 0, giving x = 9 or x = −3. However x = −3 would require log₃ (−3), which is undefined, so it is rejected. The solution is x = 9.',
              markScheme: [
                'Combines logs correctly: log₃(x(x − 6)) = 3 (1)',
                'Converts to index form: x(x − 6) = 27 (1)',
                'Solves the quadratic to get x = 9 and x = −3 (1)',
                'Rejects x = −3 because the logarithm would be undefined (1)',
              ],
              marks: 4,
              explanation:
                'The final mark is entirely for rejecting the invalid root. Giving both answers without comment loses it, and this rejection step is the most frequently dropped mark in the topic.',
              hint: 'Combine the logs first, then check whether both roots are actually allowed.',
            },
          ],
        },
      ],
    },
    {
      number: '3',
      slug: 'differentiation',
      title: 'Differentiation',
      summary: 'Rates of change, gradients of curves, and stationary points.',
      subtopics: [
        {
          number: '3.1',
          slug: 'differentiation-basics',
          title: 'Differentiation and its applications',
          summary: 'Differentiating powers, finding gradients, tangents and stationary points.',
          prerequisites: ['1.1'],
          objectives: [
            { code: '3.1.1', statement: 'Differentiate powers of x and use the chain, product and quotient rules.', tier: 'CORE' },
            { code: '3.1.2', statement: 'Find gradients, tangents, normals and stationary points, and determine their nature.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'differentiation-basics',
              title: 'Differentiation and its applications',
              readingMinutes: 7,
              body: `**Differentiation** finds the **gradient of a curve at a point** — equivalently, the rate at which y changes with x.
### The basic rule
If \`y = xⁿ\` then \`dy/dx = nxⁿ⁻¹\`: **multiply by the power, then reduce the power by one**.
- \`y = x⁵\` → \`dy/dx = 5x⁴\`
- \`y = 3x²\` → \`dy/dx = 6x\`
- \`y = 7\` → \`dy/dx = 0\` (a constant has zero gradient)
- \`y = 4x\` → \`dy/dx = 4\`
### The three rules
- **Chain rule** — for a function inside a function: \`dy/dx = dy/du × du/dx\`. For \`y = (3x + 1)⁵\`, differentiate the outside and multiply by the derivative of the inside: \`5(3x + 1)⁴ × 3 = 15(3x + 1)⁴\`.
- **Product rule** — for \`y = uv\`: \`dy/dx = u(dv/dx) + v(du/dx)\`.
- **Quotient rule** — for \`y = u/v\`: \`dy/dx = (v(du/dx) − u(dv/dx)) / v²\`. The order in the numerator matters, since subtraction is not commutative.
### Tangents and normals
The gradient of the **tangent** at a point is the value of \`dy/dx\` there.
The **normal** is perpendicular to the tangent, so its gradient is \`−1/(dy/dx)\`.
Method: differentiate, substitute the x-coordinate to get the gradient, then use \`y − y₁ = m(x − x₁)\`.
### Stationary points
At a stationary point the curve is momentarily flat, so \`dy/dx = 0\`. Solve that equation to find them.
To determine the **nature**, use the second derivative \`d²y/dx²\`:
- **Positive** → **minimum** (curve bending upwards).
- **Negative** → **maximum** (curve bending downwards).
- **Zero** → inconclusive; examine the gradient either side.
### Why it matters
Differentiation answers optimisation questions — the largest volume for a given amount of material, the minimum cost, the maximum height of a projectile — all of which are stationary point problems in disguise.`,
              analogy: 'The derivative is a speedometer for a curve: it tells you how fast y is changing at one instant, not over a stretch. A stationary point is the moment the speedometer reads zero — the top of a hill or the bottom of a valley.',
              misconceptions: [
                'Forgetting the chain rule\'s inner derivative. Differentiating \`(3x + 1)⁵\` as \`5(3x + 1)⁴\` misses the factor of 3.',
                'Using the tangent gradient for the normal. The normal gradient is the negative reciprocal.',
                'Assuming \`d²y/dx² > 0\` means a maximum. Positive means **minimum** — the curve is bending upwards like a valley.',
              ],
              examTips: [
                'Rewrite roots and fractions as powers before differentiating: \`√x\` becomes \`x^(1/2)\`, and \`1/x²\` becomes \`x⁻²\`.',
                'For any "find the maximum/minimum" question, set \`dy/dx = 0\`, solve, then justify the nature with the second derivative — the justification is usually a separate mark.',
              ],
              workedExamples: [
                {
                  prompt: 'Find the coordinates and nature of the stationary point of y = x² − 6x + 5.',
                  steps: ['Differentiate: dy/dx = 2x − 6.', 'Set equal to zero: 2x − 6 = 0, so x = 3.', 'Substitute into the original: y = 9 − 18 + 5 = −4, giving the point (3, −4).', 'Second derivative: d²y/dx² = 2, which is positive, so it is a minimum.'],
                  answer: 'Minimum at (3, −4)',
                },
                {
                  prompt: 'Find the equation of the tangent to y = x³ at the point where x = 2.',
                  steps: ['Differentiate: dy/dx = 3x².', 'At x = 2, the gradient is 3(2²) = 12.', 'The y-coordinate is y = 2³ = 8, so the point is (2, 8).', 'Use y − y₁ = m(x − x₁): y − 8 = 12(x − 2), so y = 12x − 16.'],
                  answer: 'y = 12x − 16',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'If y = xⁿ, what is dy/dx?', back: 'nxⁿ⁻¹ — multiply by the power, then reduce the power by one.', difficulty: 'EASY' },
            { front: 'What is dy/dx at a stationary point?', back: 'Zero.', difficulty: 'EASY' },
            { front: 'What does a positive second derivative indicate?', back: 'A minimum point.', difficulty: 'HARD' },
            { front: 'State the product rule.', back: 'For y = uv, dy/dx = u(dv/dx) + v(du/dx).', difficulty: 'HARD' },
            { front: 'State the quotient rule.', back: 'For y = u/v, dy/dx = (v(du/dx) − u(dv/dx)) / v².', difficulty: 'HARD' },
            { front: 'How is the normal gradient found from the tangent gradient?', back: 'Take the negative reciprocal: −1/(dy/dx).', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'A curve has equation y = x³ − 3x² + 4. Find the coordinates of the stationary points and determine the nature of each. [5]',
              answer:
                'Differentiating gives dy/dx = 3x² − 6x. Setting this to zero: 3x(x − 2) = 0, so x = 0 or x = 2. When x = 0, y = 4; when x = 2, y = 8 − 12 + 4 = 0. The second derivative is d²y/dx² = 6x − 6. At x = 0 this is −6, which is negative, so (0, 4) is a maximum. At x = 2 it is 6, which is positive, so (2, 0) is a minimum.',
              markScheme: [
                'Differentiates correctly: dy/dx = 3x² − 6x (1)',
                'Sets to zero and solves for x = 0 and x = 2 (1)',
                'Finds both y-coordinates: (0, 4) and (2, 0) (1)',
                'Finds the second derivative 6x − 6 (1)',
                'Correctly identifies (0,4) as maximum and (2,0) as minimum (1)',
              ],
              marks: 5,
              explanation:
                'Note that a cubic typically has two stationary points, one of each type. Finding only one x value usually means a factorisation error in dy/dx.',
              hint: 'Factorise dy/dx rather than using the quadratic formula — it comes out much faster.',
            },
          ],
        },
      ],
    },
    {
      number: '4',
      slug: 'integration',
      title: 'Integration',
      summary: 'Reversing differentiation, and finding areas under curves.',
      subtopics: [
        {
          number: '4.1',
          slug: 'integration-basics',
          title: 'Integration and area under a curve',
          summary: 'Indefinite and definite integration, and its use for areas.',
          prerequisites: ['3.1'],
          objectives: [
            { code: '4.1.1', statement: 'Integrate powers of x and evaluate definite integrals to find areas.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'integration-basics',
              title: 'Integration and area under a curve',
              readingMinutes: 6,
              body: `**Integration** is the reverse of differentiation.
### The basic rule
\`∫xⁿ dx = xⁿ⁺¹/(n + 1) + c\` (for n ≠ −1): **increase the power by one, then divide by the new power**. It is exactly differentiation run backwards.
- \`∫x³ dx = x⁴/4 + c\`
- \`∫6x dx = 3x² + c\`
- \`∫5 dx = 5x + c\`
### The constant of integration
The **+ c** is essential for **indefinite** integrals. Differentiating \`x² + 7\` and \`x² − 3\` both give \`2x\`, so reversing cannot recover which constant was there. Omitting c is a guaranteed lost mark.
If extra information is given — a point the curve passes through — substitute it to find c.
### Definite integration
A **definite** integral has limits and produces a number, so **no + c is needed** (it cancels):
\`∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a)\`
Always **top limit minus bottom limit**, in that order.
### Area under a curve
The definite integral between a and b gives the area between the curve and the x-axis.
Two cautions:
- Area **below** the x-axis comes out **negative**. If a question asks for total area and the curve crosses the axis, split the integral at the crossing point and add the **magnitudes**.
- To find the area **between two curves**, integrate the difference: \`∫(upper − lower) dx\`.
### Reversing kinematics
Since differentiating displacement gives velocity and differentiating velocity gives acceleration, integration goes the other way: integrate acceleration for velocity, and velocity for displacement — using initial conditions to find each constant.`,
              analogy: 'Integration is reassembling something you took apart: differentiation discarded the constant term, so putting it back requires either extra information or an honest "+ c" admitting you cannot know it.',
              misconceptions: [
                'Omitting + c from an indefinite integral, which is an automatic lost mark.',
                'Reporting a negative area. A negative definite integral means the region lies below the x-axis; area is its magnitude.',
                'Subtracting the limits the wrong way round. It is always F(b) − F(a), top minus bottom.',
              ],
              examTips: [
                'If a question gives "the curve passes through (1, 5)", it expects you to find c — that is why the point was supplied.',
                'Sketch the curve before computing an area. It reveals whether the region dips below the axis and needs splitting.',
              ],
              workedExamples: [
                {
                  prompt: 'Evaluate the definite integral of 3x² from x = 1 to x = 3.',
                  steps: ['Integrate: ∫3x² dx = x³.', 'Apply the limits: [x³]₁³ = 3³ − 1³.', '= 27 − 1 = 26.'],
                  answer: '26',
                },
                {
                  prompt: 'A curve has dy/dx = 4x + 3 and passes through (1, 6). Find the equation of the curve.',
                  steps: ['Integrate: y = 2x² + 3x + c.', 'Substitute the point (1, 6): 6 = 2(1)² + 3(1) + c.', '6 = 5 + c, so c = 1.'],
                  answer: 'y = 2x² + 3x + 1',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the basic integration rule.', back: '∫xⁿ dx = xⁿ⁺¹/(n+1) + c — raise the power by one and divide by the new power.', difficulty: 'MEDIUM' },
            { front: 'Why is + c needed?', back: 'Differentiation destroys constants, so reversing it cannot recover which constant was present.', difficulty: 'MEDIUM' },
            { front: 'How do you evaluate a definite integral?', back: 'Integrate, then compute F(b) − F(a) — top limit minus bottom limit.', difficulty: 'MEDIUM' },
            { front: 'What does a negative definite integral mean?', back: 'The region lies below the x-axis; the area is the magnitude of the value.', difficulty: 'HARD' },
            { front: 'How do you find the area between two curves?', back: 'Integrate the difference: ∫(upper − lower) dx.', difficulty: 'HARD' },
          ],
          questions: [
            {
              type: 'NUMERICAL',
              difficulty: 'STANDARD',
              stem: 'Evaluate the definite integral of (2x + 1) with respect to x, between the limits x = 0 and x = 4.',
              answer: '20',
              markScheme: [
                'Integrates to x² + x (1)',
                'Substitutes limits: (16 + 4) − (0 + 0) (1)',
                'Answer 20 (1)',
              ],
              marks: 3,
              explanation:
                'No constant of integration is needed here because it cancels in the subtraction — a definite integral always evaluates to a number.',
            },
          ],
        },
      ],
    },
    {
      number: '5',
      slug: 'trigonometric-identities',
      title: 'Trigonometry and identities',
      summary: 'Identities, exact values and solving trigonometric equations.',
      subtopics: [
        {
          number: '5.1',
          slug: 'trigonometric-identities',
          title: 'Identities and trigonometric equations',
          summary: 'The key identities and finding all solutions in a range.',
          objectives: [
            { code: '5.1.1', statement: 'Use trigonometric identities and solve trigonometric equations within a given interval.', tier: 'CORE' },
          ],
          lessons: [
            {
              slug: 'trigonometric-identities',
              title: 'Identities and trigonometric equations',
              readingMinutes: 6,
              body: `### The identities to know
- \`sin²θ + cos²θ = 1\`
- \`tan θ = sin θ / cos θ\`
- \`1 + tan²θ = sec²θ\`
- \`1 + cot²θ = cosec²θ\`
The first is by far the most used, usually rearranged as \`sin²θ = 1 − cos²θ\` to convert an equation into one function only.
### Reciprocal functions
\`sec θ = 1/cos θ\`, \`cosec θ = 1/sin θ\`, \`cot θ = 1/tan θ\`.
Note the mismatch that catches people out: **sec** pairs with **cos**, and **cosec** pairs with **sin**.
### Solving trigonometric equations
The critical point is that trigonometric equations have **many** solutions, and a calculator gives only one.
Method:
1. Rearrange to get a single trigonometric function.
2. Use the inverse function for the **principal value**.
3. Use symmetry to find **all** solutions in the required interval.
The symmetry rules within 0° to 360°:
- **sin** is positive in the 1st and 2nd quadrants: the second solution is \`180° − θ\`.
- **cos** is positive in the 1st and 4th: the second solution is \`360° − θ\`.
- **tan** repeats every 180°: add 180° successively.
### Quadratic-type equations
Equations such as \`2sin²θ − sin θ − 1 = 0\` factorise like quadratics. Substitute \`s = sin θ\` if it helps: \`(2s + 1)(s − 1) = 0\`, then solve each resulting equation separately, remembering \`sin θ\` must lie between −1 and 1 — any root outside that range is rejected.
### Exact values worth memorising
\`sin 30° = ½\`, \`cos 60° = ½\`, \`sin 45° = cos 45° = 1/√2\`, \`tan 45° = 1\`, \`sin 60° = cos 30° = √3/2\`.`,
              analogy: 'The calculator gives one solution the way a clock face shows one time matching a hand position — but the hand returns to that position repeatedly. Finding all solutions means going round the whole dial, not stopping at the first match.',
              misconceptions: [
                'Giving only the calculator\'s answer. Almost every trigonometric equation has more solutions in the stated interval.',
                'Dividing an equation by \`sin θ\` or \`cos θ\`, which discards solutions where that function is zero. Factorise instead.',
                'Accepting a value of \`sin θ\` outside −1 to 1. Such a root has no solution and must be rejected.',
              ],
              examTips: [
                'Underline the interval given (0° ≤ θ ≤ 360°, say) before starting, and check every solution you report lies inside it.',
                'When both sin²θ and cos θ appear, use \`sin²θ = 1 − cos²θ\` to reduce to a single function — that is nearly always the intended route.',
              ],
              workedExamples: [
                {
                  prompt: 'Solve sin θ = 0.5 for 0° ≤ θ ≤ 360°.',
                  steps: ['The principal value is θ = sin⁻¹(0.5) = 30°.', 'Sine is also positive in the second quadrant, giving 180° − 30° = 150°.', 'Both lie within the required interval.'],
                  answer: 'θ = 30° or θ = 150°',
                },
                {
                  prompt: 'Solve 2cos²θ + cos θ − 1 = 0 for 0° ≤ θ ≤ 360°.',
                  steps: ['Treat as a quadratic in cos θ and factorise: (2cos θ − 1)(cos θ + 1) = 0.', 'So cos θ = ½ or cos θ = −1.', 'cos θ = ½ gives θ = 60°, and by symmetry 360° − 60° = 300°.', 'cos θ = −1 gives θ = 180°.'],
                  answer: 'θ = 60°, 180° or 300°',
                },
              ],
            },
          ],
          flashcards: [
            { front: 'State the fundamental Pythagorean identity.', back: 'sin²θ + cos²θ = 1', difficulty: 'MEDIUM' },
            { front: 'What does 1 + tan²θ equal?', back: 'sec²θ', difficulty: 'HARD' },
            { front: 'What is sec θ?', back: '1/cos θ — note sec pairs with cos, not sin.', difficulty: 'MEDIUM' },
            { front: 'If sin θ = k has solution θ, what is the second solution in 0-360°?', back: '180° − θ', difficulty: 'HARD' },
            { front: 'If cos θ = k has solution θ, what is the second solution in 0-360°?', back: '360° − θ', difficulty: 'HARD' },
            { front: 'What is the exact value of sin 60°?', back: '√3/2', difficulty: 'MEDIUM' },
          ],
          questions: [
            {
              type: 'STRUCTURED',
              difficulty: 'CHALLENGE',
              stem: 'Solve 2sin²θ = 1 + cos θ for 0° ≤ θ ≤ 360°. [5]',
              answer:
                'Replace sin²θ using the identity sin²θ = 1 − cos²θ, giving 2(1 − cos²θ) = 1 + cos θ. Expanding gives 2 − 2cos²θ = 1 + cos θ, which rearranges to 2cos²θ + cos θ − 1 = 0. Factorising gives (2cos θ − 1)(cos θ + 1) = 0, so cos θ = ½ or cos θ = −1. From cos θ = ½, θ = 60° and, by symmetry, 360° − 60° = 300°. From cos θ = −1, θ = 180°.',
              markScheme: [
                'Uses sin²θ = 1 − cos²θ to express in cos only (1)',
                'Rearranges to 2cos²θ + cos θ − 1 = 0 (1)',
                'Factorises correctly (1)',
                'Obtains cos θ = ½ and cos θ = −1 (1)',
                'All three solutions 60°, 180°, 300° within the interval (1)',
              ],
              marks: 5,
              explanation:
                'Missing θ = 300° is the usual error — the calculator returns only 60° for cos θ = ½, and the fourth-quadrant solution has to be added by symmetry.',
              hint: 'Convert everything to cos θ first, then treat it as a quadratic.',
            },
          ],
        },
      ],
    },
  ],
};
