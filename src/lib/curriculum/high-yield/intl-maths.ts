import type { HighYieldSeed } from '../types';

/**
 * International Mathematics 0607 — the question forms that recur.
 *
 * Written from the syllabus objectives; none of this is past-paper text.
 */
export const intlMathsHighYield: HighYieldSeed[] = [
  {
    subject: 'intl-maths',
    subtopic: '1.1',
    rank: 1,
    trap: 'Confusing ∪ with ∩, and forgetting that the complement A′ includes everything in the universal set that is not in A — including elements outside every other set on the diagram.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'The universal set is ℰ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, with A = {2, 4, 6, 8, 10} and B = {1, 2, 3, 4, 5}.\n\n(a) List the elements of A ∩ B.\n(b) List the elements of A ∪ B.\n(c) List the elements of A′.\n(d) State n(A ∩ B′).\n(e) Explain in words what the region A ∩ B′ represents.',
      answer:
        '(a) {2, 4}. (b) {1, 2, 3, 4, 5, 6, 8, 10}. (c) {1, 3, 5, 7, 9}. (d) 3. (e) The elements that are in A but not in B.',
      markScheme: [
        '(a) {2, 4} (1)',
        '(b) {1, 2, 3, 4, 5, 6, 8, 10} (1)',
        '(c) {1, 3, 5, 7, 9} (1)',
        '(d) A ∩ B′ = {6, 8, 10}, so n(A ∩ B′) = 3 (1)',
        '(e) In A but not in B (1)',
      ],
      marks: 5,
      explanation:
        'Read set expressions from the inside out: B′ first, then intersect with A. The n( ) notation asks for how many elements, not which — answering with the set itself where a number was wanted is a routine lost mark.',
      hint: '∩ is the overlap; ∪ is everything in either. n( ) means "how many".',
    },
  },
  {
    subject: 'intl-maths',
    subtopic: '2.1',
    rank: 2,
    trap: 'Giving a sketch with no key features labelled. A sketch is marked on intercepts, asymptotes and turning points, not on neatness.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Consider the function f(x) = x³ − 3x.\n\n(a) State the coordinates of the points where the graph crosses the x-axis.\n(b) Describe, in words, the shape of the curve and the features you would label on a sketch.\n(c) Explain how you would use a graphics calculator to find the local maximum, and state its coordinates to 2 decimal places.',
      answer:
        '(a) (−√3, 0), (0, 0) and (√3, 0), i.e. approximately (−1.73, 0), (0, 0) and (1.73, 0). (b) A cubic rising from bottom left to top right, with a local maximum to the left of the origin and a local minimum to the right, crossing the x-axis three times. Label the three x-intercepts, the y-intercept at (0, 0), and both turning points. (c) Graph the function, then use the calculator\'s maximum function within a window that contains the peak. The local maximum is at (−1.00, 2.00).',
      markScheme: [
        '(a) Factorising x(x² − 3) = 0 (1), giving x = 0, ±√3 (1)',
        '(b) Cubic shape, negative to positive, crossing the axis three times (1)',
        '(b) Names intercepts and turning points as the features to label (1)',
        '(c) Describes using the calculator\'s maximum tool over a suitable window (1)',
        '(c) (−1.00, 2.00) (1)',
      ],
      marks: 6,
      explanation:
        'This syllabus expects the graphics calculator to be used as a tool and the reasoning to be shown alongside it. Stating the window or the method earns method marks that a bare answer does not, and gives you something to fall back on if the calculator value is mistyped.',
      hint: 'Factorise to find the roots; use the calculator only for the turning points.',
    },
  },
  {
    subject: 'intl-maths',
    subtopic: '3.1',
    rank: 3,
    trap: 'Jumping to a general rule after two cases. The investigation marks are for tabulating results systematically, spotting the pattern, then testing the generalisation on a further case.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'An investigation asks you to find the number of diagonals in a polygon with n sides.\n\n(a) Work out the number of diagonals for a quadrilateral, a pentagon and a hexagon.\n(b) Suggest a general rule for the number of diagonals in an n-sided polygon.\n(c) Test your rule on a heptagon (7 sides).\n(d) Describe what an examiner expects to see in the working of an investigation question, beyond the final answer.',
      answer:
        '(a) 2, 5 and 9. (b) n(n − 3)/2. (c) 7 × 4 / 2 = 14, which matches a count of the heptagon\'s diagonals, so the rule holds. (d) A systematic table of results, a stated conjecture, a test of that conjecture on a case not used to form it, and where possible a justification of why the rule works.',
      markScheme: [
        '(a) 2, 5, 9 (1)',
        '(b) n(n − 3)/2 (1)',
        '(c) Substituting n = 7 to obtain 14 (1) and confirming it against a count (1)',
        '(d) Systematic table of results (1)',
        '(d) Conjecture stated and then tested on a new case (1)',
      ],
      marks: 6,
      explanation:
        'Each vertex joins to n − 3 others by a diagonal — every vertex except itself and its two neighbours — and dividing by 2 avoids counting each diagonal from both ends. Paper 6 rewards the process as much as the result, so lay the work out as table, conjecture, test, justification.',
      hint: 'Count how many diagonals leave a single vertex first.',
    },
  },
  {
    subject: 'intl-maths',
    subtopic: '3.1',
    rank: 4,
    trap: 'Reporting a modelled value to more precision than the data justify, or failing to comment on the limitations of the model.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'A population of bacteria is modelled by P = 500 × 2^t, where t is the time in hours.\n\n(a) State the initial population.\n(b) Calculate the population after 5 hours.\n(c) Determine, to the nearest hour, when the population first exceeds 100 000.\n(d) State two limitations of this model in a real situation.',
      answer:
        '(a) 500. (b) 16 000. (c) After 8 hours. (d) The model assumes unlimited food and space and no deaths, which is unrealistic; and it assumes the doubling time is exactly one hour and never changes with temperature or crowding.',
      markScheme: [
        '(a) 500 (1)',
        '(b) 500 × 2⁵ = 500 × 32 = 16 000 (1)',
        '(c) 2^t > 200, so t > 7.64 (1); first exceeds at t = 8 hours (1)',
        '(d) Two valid limitations, e.g. unlimited resources assumed; no deaths; constant doubling rate (2)',
      ],
      marks: 6,
      explanation:
        'Exponential models grow without bound, which real populations never do — that is the limitation the examiner is looking for. Part (c) needs the inequality solved and then rounded *upwards*, because the question asks when the population first exceeds the value.',
      hint: 'For (c), round up. Rounding down gives a population still under the target.',
    },
  },
  {
    subject: 'intl-maths',
    subtopic: '2.1',
    rank: 5,
    trap: 'Missing an intersection because the calculator window was too small. Always widen the window before concluding how many solutions there are.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain how you would use a graphics calculator to solve the equation x² − 4 = 2x + 1 graphically.\n(b) State the number of solutions and give them to 2 decimal places.\n(c) Explain why checking the viewing window matters before stating how many solutions an equation has.',
      answer:
        '(a) Enter y = x² − 4 and y = 2x + 1 as two functions, graph them, and use the intersection tool to find where they meet; the x-coordinates of the intersections are the solutions. (b) Two solutions: x = −1.45 and x = 3.45. (c) A window that is too narrow can hide intersections that lie outside it, so the graph would appear to have fewer solutions than it really does.',
      markScheme: [
        '(a) Enter both sides as separate functions (1) and use the intersection tool (1)',
        '(b) Two solutions (1)',
        '(b) x = −1.45 and x = 3.45 (1)',
        '(c) Intersections outside the window are not visible, so solutions can be missed (1)',
      ],
      marks: 5,
      explanation:
        'Rearranged, this is x² − 2x − 5 = 0, whose roots are 1 ± √6 — that is 3.449 and −1.449, confirming the calculator values. Checking algebraically where you can is worth the few seconds: it catches a mistyped function immediately.',
      hint: 'Graph each side separately and look for where they cross.',
    },
  },
];
