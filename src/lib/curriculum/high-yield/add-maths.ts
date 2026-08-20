import type { HighYieldSeed } from '../types';

/**
 * Additional Mathematics 0606 — the question forms that recur.
 *
 * Written from the syllabus objectives; none of this is past-paper text.
 */
export const addMathsHighYield: HighYieldSeed[] = [
  {
    subject: 'add-maths',
    subtopic: '3.1',
    rank: 1,
    trap: 'Stopping at dy/dx = 0. A stationary point is not an answer until you have determined its nature with the second derivative or a sign change.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A curve has equation y = x³ − 6x² + 9x + 2.\n\n(a) Find dy/dx.\n(b) Find the coordinates of the two stationary points.\n(c) Determine the nature of each stationary point, showing your reasoning.',
      answer:
        '(a) dy/dx = 3x² − 12x + 9. (b) (1, 6) and (3, 2). (c) d²y/dx² = 6x − 12. At x = 1 it is −6 < 0, so (1, 6) is a maximum. At x = 3 it is 6 > 0, so (3, 2) is a minimum.',
      markScheme: [
        '(a) dy/dx = 3x² − 12x + 9 (1)',
        '(b) Setting dy/dx = 0: 3(x − 1)(x − 3) = 0, so x = 1 and x = 3 (1)',
        '(b) y-values: 6 and 2, giving (1, 6) and (3, 2) (1)',
        '(c) d²y/dx² = 6x − 12 (1)',
        '(c) At x = 1, d²y/dx² = −6 < 0, so a maximum (1)',
        '(c) At x = 3, d²y/dx² = 6 > 0, so a minimum (1)',
      ],
      marks: 6,
      explanation:
        'The routine is fixed: differentiate, set to zero, solve for x, substitute back for y, then differentiate again to classify. A negative second derivative means the gradient is decreasing through the point, which is a maximum — the sign and the conclusion are opposite ways round to what many candidates expect.',
      hint: 'Negative second derivative means the curve is bending downwards.',
    },
  },
  {
    subject: 'add-maths',
    subtopic: '4.1',
    rank: 2,
    trap: 'Forgetting that an area below the x-axis gives a negative integral. If the region crosses the axis, split the integral at the root and add the magnitudes.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Find ∫(6x² − 4x + 3) dx.\n(b) Evaluate ∫ from 1 to 3 of (2x + 1) dx.\n(c) Explain why the definite integral of a function over a region lying below the x-axis is negative, and state what you must do to find the *area* of such a region.',
      answer:
        '(a) 2x³ − 2x² + 3x + c. (b) 10. (c) Below the axis the function values are negative, so the accumulated product of height and width is negative. To find the area, integrate between the roots and take the magnitude of the result, splitting the integral wherever the curve crosses the axis.',
      markScheme: [
        '(a) 2x³ − 2x² + 3x (1) + c (1)',
        '(b) [x² + x] from 1 to 3 (1)',
        '(b) (9 + 3) − (1 + 1) = 10 (1)',
        '(c) The function is negative there, so the integral is negative (1)',
        '(c) Take the modulus, splitting at the roots where the curve crosses the axis (1)',
      ],
      marks: 6,
      explanation:
        'The constant of integration is a mark in its own right on every indefinite integral and is the single most frequently dropped mark in the topic. For definite integrals it cancels, which is why it never appears there.',
      hint: 'Indefinite integral, so it needs "+ c".',
    },
  },
  {
    subject: 'add-maths',
    subtopic: '2.1',
    rank: 3,
    trap: 'Writing log(a + b) = log a + log b. The addition law applies to a *product*: log a + log b = log(ab).',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) State the three laws of logarithms for log(ab), log(a/b) and log(aⁿ).\n(b) Solve log₂(x) + log₂(x − 2) = 3.\n(c) Explain why one of the solutions to the quadratic in part (b) must be rejected.',
      answer:
        '(a) log(ab) = log a + log b; log(a/b) = log a − log b; log(aⁿ) = n log a. (b) x = 4. (c) The quadratic gives x = 4 and x = −2. x = −2 must be rejected because log₂(x) is undefined for a negative argument.',
      markScheme: [
        '(a) All three laws stated correctly (2)',
        '(b) Combining: log₂(x(x − 2)) = 3 (1)',
        '(b) x(x − 2) = 2³ = 8, so x² − 2x − 8 = 0 (1)',
        '(b) (x − 4)(x + 2) = 0, giving x = 4 or x = −2; x = 4 (1)',
        '(c) x = −2 rejected because the logarithm of a negative number is undefined (1)',
      ],
      marks: 6,
      explanation:
        'Almost every logarithm equation of this form produces a quadratic with one invalid root, and the rejection is always worth a mark. Check every solution against the original equation — both the argument of each logarithm and the base must be positive.',
      hint: 'Solve the quadratic, then test each root in the original logarithms.',
    },
  },
  {
    subject: 'add-maths',
    subtopic: '5.1',
    rank: 4,
    trap: 'Losing solutions by dividing through by a trigonometric function. Factorise instead — dividing by cos x throws away every solution where cos x = 0.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        '(a) State the identity connecting sin²θ and cos²θ, and the identity for tan θ in terms of sin θ and cos θ.\n(b) Solve 2 sin θ cos θ = cos θ for 0° ≤ θ ≤ 360°.\n(c) Explain why dividing both sides of the equation in (b) by cos θ would lose solutions.',
      answer:
        '(a) sin²θ + cos²θ = 1, and tan θ = sin θ / cos θ. (b) θ = 30°, 90°, 150°, 270°. (c) Dividing by cos θ assumes cos θ ≠ 0, which discards the solutions θ = 90° and θ = 270° where cos θ = 0.',
      markScheme: [
        '(a) sin²θ + cos²θ = 1 (1); tan θ = sin θ / cos θ (1)',
        '(b) Rearranging to cos θ(2 sin θ − 1) = 0 (1)',
        '(b) cos θ = 0 gives θ = 90°, 270° (1)',
        '(b) sin θ = ½ gives θ = 30°, 150° (1)',
        '(c) Dividing assumes cos θ ≠ 0 and so discards those roots (1)',
      ],
      marks: 6,
      explanation:
        'Bring everything to one side and factorise — that is the whole technique. Each factor set to zero yields its own family of solutions, and the range given in the question tells you how many of each to write down.',
      hint: 'Never divide by something that might be zero. Factorise.',
    },
  },
  {
    subject: 'add-maths',
    subtopic: '1.1',
    rank: 5,
    trap: 'Applying composite functions in the wrong order. fg(x) means do g first, then f — read it right to left.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'f(x) = 2x + 3 and g(x) = x².\n\n(a) Find fg(2).\n(b) Find an expression for gf(x) in terms of x.\n(c) Find f⁻¹(x).\n(d) State the relationship between the graphs of y = f(x) and y = f⁻¹(x).',
      answer:
        '(a) 11. (b) (2x + 3)². (c) f⁻¹(x) = (x − 3)/2. (d) They are reflections of each other in the line y = x.',
      markScheme: [
        '(a) g(2) = 4 (1), f(4) = 11 (1)',
        '(b) gf(x) = (2x + 3)² (1)',
        '(c) y = 2x + 3, so x = (y − 3)/2, giving f⁻¹(x) = (x − 3)/2 (1)',
        '(d) Reflections in the line y = x (1)',
      ],
      marks: 5,
      explanation:
        'The inner function is the one written next to the x, so fg(x) applies g first. To find an inverse, swap x and y and rearrange — the reflection in y = x in part (d) is the geometric statement of exactly that swap.',
      hint: 'Read composite functions right to left.',
    },
  },
];
