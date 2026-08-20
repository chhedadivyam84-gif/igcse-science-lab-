import type { HighYieldSeed } from '../types';

/**
 * Mathematics 0580 — the question forms that recur.
 *
 * Written from the syllabus objectives; none of this is past-paper text.
 */
export const mathsHighYield: HighYieldSeed[] = [
  {
    subject: 'maths',
    subtopic: '1.4',
    rank: 1,
    trap: 'Treating a reverse percentage as a straightforward percentage. If a price has already been reduced by 15%, the reduced price is 85% of the original — you divide by 0.85, you do not add 15% back on.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) $5000 is invested at 3% per year compound interest. Calculate the value of the investment after 4 years, giving your answer correct to the nearest cent.\n(b) In a sale, the price of a coat is reduced by 15%. The sale price is $272. Calculate the original price.',
      answer: '(a) $5627.54  (b) $320',
      markScheme: [
        '(a) 5000 × 1.03⁴ (1)',
        '(a) = 5627.54 (2 d.p.) (1)',
        '(b) Recognising the sale price is 85% of the original (1)',
        '(b) 272 ÷ 0.85 = 320 (1)',
      ],
      marks: 4,
      explanation:
        'Compound interest multiplies by the same factor each year, so the power is the number of years. A reverse percentage runs the multiplication backwards: work out what percentage the given figure represents, then divide. Adding 15% to $272 gives $312.80, which is the wrong answer the question is designed to catch.',
      hint: 'For (b), $272 is not 100% of anything — decide what percentage it is first.',
    },
  },
  {
    subject: 'maths',
    subtopic: '9.3',
    rank: 2,
    trap: 'Plotting frequency on the vertical axis of a histogram with unequal class widths. The height must be frequency density = frequency ÷ class width.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'The table shows the times, t minutes, taken by 100 people to complete a task.\n\n0 < t ≤ 10 : frequency 15\n10 < t ≤ 20 : frequency 35\n20 < t ≤ 40 : frequency 30\n40 < t ≤ 70 : frequency 20\n\n(a) Calculate the frequency density for each class.\n(b) Explain why frequency density, rather than frequency, must be used for the vertical axis.\n(c) Estimate the number of people who took between 25 and 40 minutes.',
      answer:
        '(a) 1.5, 3.5, 1.5, 0.6667 (per minute). (b) The classes have different widths, so the area of each bar — not its height — must represent the frequency. (c) 22.5, so about 22 or 23 people.',
      markScheme: [
        '(a) 15/10 = 1.5, 35/10 = 3.5 (1)',
        '(a) 30/20 = 1.5, 20/30 = 0.667 (1)',
        '(b) Class widths are unequal (1), so frequency must be represented by area, not height (1)',
        '(c) 15/20 of the 20 < t ≤ 40 class = 0.75 × 30 (1) = 22.5, so about 22 people (1)',
      ],
      marks: 6,
      explanation:
        'A histogram represents frequency by area. That is why the vertical axis is a density. Part (c) assumes the data are spread evenly within the class, which is the standard assumption for estimating from grouped data — say so if the question asks you to justify the estimate.',
      hint: 'Frequency = area = frequency density × class width. Rearrange as needed.',
    },
  },
  {
    subject: 'maths',
    subtopic: '8.1',
    rank: 3,
    trap: 'Using the same denominator on both branches of a "without replacement" tree. After the first item is taken, the total has gone down by one.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A bag contains 5 red counters and 3 blue counters. Two counters are taken at random without replacement.\n\n(a) Calculate the probability that both counters are red.\n(b) Calculate the probability that the two counters are different colours.',
      answer: '(a) 5/14  (b) 15/28',
      markScheme: [
        '(a) 5/8 × 4/7 (1) = 20/56 = 5/14 (1)',
        '(b) 5/8 × 3/7 + 3/8 × 5/7 (1)',
        '(b) = 15/56 + 15/56 = 30/56 = 15/28 (1)',
      ],
      marks: 4,
      explanation:
        'Multiply along the branches, add between them. "Different colours" needs both orders — red then blue, and blue then red — which is why the answer is twice a single branch product. The second denominator is 7, not 8, because one counter has already gone.',
      hint: 'Different colours can happen two ways round.',
    },
  },
  {
    subject: 'maths',
    subtopic: '6.2',
    rank: 4,
    trap: 'Reaching for the cosine rule when the sine rule would do, or using the sine rule when the angle given is not opposite a known side. Match the rule to what you are given.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'In triangle ABC, AB = 7 cm, AC = 9 cm and angle BAC = 52°.\n\n(a) Calculate the length BC, giving your answer to 3 significant figures.\n(b) Calculate the area of triangle ABC, giving your answer to 3 significant figures.',
      answer: '(a) 7.24 cm  (b) 24.8 cm²',
      markScheme: [
        '(a) BC² = 7² + 9² − 2 × 7 × 9 × cos 52° (1)',
        '(a) = 130 − 77.57 = 52.43 (1)',
        '(a) BC = 7.24 cm (1)',
        '(b) Area = ½ × 7 × 9 × sin 52° (1)',
        '(b) = 24.8 cm² (1)',
      ],
      marks: 5,
      explanation:
        'Two sides and the angle between them means the cosine rule for the third side, and ½ab sin C for the area — both use exactly the information given. Keep the unrounded value on your calculator between steps; rounding to 7.2 before squaring loses accuracy marks.',
      hint: 'The angle sits between the two known sides. That decides which rule to use.',
    },
  },
  {
    subject: 'maths',
    subtopic: '4.2',
    rank: 5,
    trap: 'Quoting a circle theorem without naming it. Most mark schemes award a mark for the correct reason, so "angles in the same segment are equal" earns marks that the number alone does not.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'State the circle theorem that justifies each of these, and give the reason in the form an examiner would accept:\n(a) The angle in a semicircle.\n(b) The relationship between the angle at the centre and the angle at the circumference standing on the same arc.\n(c) The opposite angles of a cyclic quadrilateral.\n(d) The angle between a tangent and a radius at the point of contact.',
      answer:
        '(a) The angle in a semicircle is 90°. (b) The angle at the centre is twice the angle at the circumference standing on the same arc. (c) Opposite angles of a cyclic quadrilateral add up to 180°. (d) A tangent meets a radius at 90° at the point of contact.',
      markScheme: [
        '(a) Angle in a semicircle = 90° (1)',
        '(b) Angle at centre = 2 × angle at circumference on the same arc (1)',
        '(c) Opposite angles of a cyclic quadrilateral sum to 180° (1)',
        '(d) Tangent is perpendicular to the radius at the point of contact (1)',
      ],
      marks: 4,
      explanation:
        'Circle theorem questions are marked on the reasoning as much as the answer. Write the theorem out in words next to each step of your working — a chain of angles with no reasons will lose most of the available marks even when every number is right.',
      hint: 'Learn these as sentences, not as pictures.',
    },
  },
  {
    subject: 'maths',
    subtopic: '2.5',
    rank: 6,
    trap: 'Dropping the minus sign on −b, or dividing only part of the numerator by 2a. Write the whole formula out before substituting.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Solve 2x² − 7x + 3 = 0 by factorising.\n(b) Solve 3x² + 5x − 1 = 0, giving your answers correct to 2 decimal places.',
      answer: '(a) x = 3 or x = 0.5  (b) x = 0.18 or x = −1.85',
      markScheme: [
        '(a) (2x − 1)(x − 3) = 0 (1)',
        '(a) x = 0.5 or x = 3 (1)',
        '(b) x = (−5 ± √(25 + 12)) / 6 (1)',
        '(b) √37 = 6.083 (1)',
        '(b) x = 0.18 or x = −1.85 (1)',
      ],
      marks: 5,
      explanation:
        'If the question says "correct to 2 decimal places" it is telling you the quadratic does not factorise, so go straight to the formula. Under the root, b² − 4ac here is 25 − 4(3)(−1) = 25 + 12; two negatives making a plus is the step most often mishandled.',
      hint: 'A decimal-places instruction is a hint that factorising will not work.',
    },
  },
  {
    subject: 'maths',
    subtopic: '4.3',
    rank: 7,
    trap: 'Using the linear scale factor for areas and volumes. Areas scale by k², volumes by k³.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Two similar solids have heights 4 cm and 12 cm.\n\n(a) Write down the linear scale factor.\n(b) The surface area of the smaller solid is 30 cm². Calculate the surface area of the larger solid.\n(c) The volume of the smaller solid is 40 cm³. Calculate the volume of the larger solid.',
      answer: '(a) 3  (b) 270 cm²  (c) 1080 cm³',
      markScheme: [
        '(a) 12 / 4 = 3 (1)',
        '(b) Area scale factor = 3² = 9 (1); 30 × 9 = 270 cm² (1)',
        '(c) Volume scale factor = 3³ = 27 (1); 40 × 27 = 1080 cm³ (1)',
      ],
      marks: 5,
      explanation:
        'One idea, applied three times: lengths scale by k, areas by k², volumes by k³. Questions often run the other way — giving you two volumes and asking for a length — in which case take the cube root to get back to k.',
      hint: 'Find k first, then decide whether you need k, k² or k³.',
    },
  },
  {
    subject: 'maths',
    subtopic: '1.5',
    rank: 8,
    trap: 'Taking the upper bound of a difference or a division by using both upper bounds. For the largest possible difference use the largest first value and the smallest second value.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'A rectangle has length 12.4 cm and width 8.6 cm, each measured correct to 1 decimal place.\n\n(a) Write down the lower and upper bounds of the length.\n(b) Calculate the upper bound of the area.\n(c) Calculate the lower bound of the perimeter.',
      answer: '(a) 12.35 cm and 12.45 cm  (b) 107.6925 cm²  (c) 41.80 cm',
      markScheme: [
        '(a) 12.35 and 12.45 (1)',
        '(b) 12.45 × 8.65 (1) = 107.6925 cm² (1)',
        '(c) 2 × (12.35 + 8.55) (1) = 41.8 cm (1)',
      ],
      marks: 5,
      explanation:
        'Correct to 1 decimal place means the true value lies within half of 0.1 — that is, ±0.05. For a product or a perimeter, both upper bounds give the upper bound. It is subtraction and division where the bounds cross over, so check what the operation is before choosing.',
      hint: 'Half of the last place value, added and subtracted.',
    },
  },
  {
    subject: 'maths',
    subtopic: '2.6',
    rank: 9,
    trap: 'Testing the nth-term rule on only the first term. Always check it against at least the first and third terms.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Find the nth term of the sequence 5, 8, 11, 14, …\n(b) Find the nth term of the sequence 3, 8, 15, 24, …\n(c) Determine whether 200 is a term of the sequence in part (a), showing your reasoning.',
      answer:
        '(a) 3n + 2  (b) n² + 2n  (c) Yes. Solving 3n + 2 = 200 gives n = 66, a positive whole number, so 200 is the 66th term.',
      markScheme: [
        '(a) Common difference 3, so 3n + … (1); 3n + 2 (1)',
        '(b) Second differences are constant at 2, so the rule is quadratic in n² (1); n² + 2n (1)',
        '(c) Solving 3n + 2 = 200 gives n = 66 (1)',
        '(c) n is a positive integer, so 200 is a term — the 66th (1)',
      ],
      marks: 6,
      explanation:
        'For a linear sequence the common difference is the coefficient of n, and the constant is whatever makes the first term work. For a quadratic sequence the second difference is twice the coefficient of n², so a second difference of 2 gives n² and you then find what is left over. Part (c) is the standard "is it a term?" test: solve for n and check it is a positive whole number.',
      hint: 'For (b), work out the differences of the differences.',
    },
  },
  {
    subject: 'maths',
    subtopic: '9.2',
    rank: 10,
    trap: 'Reading the median off the frequency axis instead of the value axis, or using n/2 on a cumulative frequency curve when the question asks for a quartile.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A cumulative frequency curve is drawn for the marks of 80 students.\n\n(a) State the cumulative frequency value you would use to find the median.\n(b) State the values you would use to find the lower and upper quartiles.\n(c) Define the interquartile range and explain why it is often preferred to the range as a measure of spread.',
      answer:
        '(a) 40. (b) 20 and 60. (c) The interquartile range is the upper quartile minus the lower quartile. It is preferred because it describes the middle half of the data and so is not distorted by extreme values or outliers, whereas the range depends entirely on the two most extreme values.',
      markScheme: [
        '(a) 40 (= 80 ÷ 2) (1)',
        '(b) 20 (= 80 ÷ 4) and 60 (= 3 × 80 ÷ 4) (1)',
        '(c) IQR = upper quartile − lower quartile (1)',
        '(c) Covers the middle 50% of the data (1)',
        '(c) Not affected by extreme values / outliers (1)',
      ],
      marks: 5,
      explanation:
        'On a cumulative frequency curve you always enter on the vertical axis at a fraction of the total and read across then down. Note it is n ÷ 2 for the median here, not (n + 1) ÷ 2 — that adjustment belongs to listed data, not to a curve.',
      hint: 'Enter on the cumulative frequency axis, read off on the value axis.',
    },
  },
  {
    subject: 'maths',
    subtopic: '2.3',
    rank: 11,
    trap: 'Substituting the found value back into the equation you just derived it from, which gives you no new information. Always substitute into one of the original equations.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Solve the simultaneous equations, showing your method clearly:\n3x + 2y = 16\n5x − 2y = 8',
      answer: 'x = 3, y = 3.5',
      markScheme: [
        'Adding the equations to eliminate y: 8x = 24 (1)',
        'x = 3 (1)',
        'Substituting into 3x + 2y = 16: 9 + 2y = 16 (1)',
        'y = 3.5 (1)',
      ],
      marks: 4,
      explanation:
        'The y terms are +2y and −2y, so adding eliminates them immediately — spotting that saves the step of multiplying an equation through. Always state which equation you substitute back into; the method marks depend on the working being followable.',
      hint: 'Look at the signs of the y terms before deciding whether to add or subtract.',
    },
  },
  {
    subject: 'maths',
    subtopic: '1.3',
    rank: 12,
    trap: 'Leaving an answer as 12 × 10⁻³. Standard form requires the number in front to be between 1 and 10.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Giving each answer in standard form:\n(a) Work out (3 × 10⁵) × (4 × 10⁻⁸).\n(b) Work out (8 × 10⁶) ÷ (2 × 10⁻²).\n(c) Simplify (2x³)⁴.',
      answer: '(a) 1.2 × 10⁻²  (b) 4 × 10⁸  (c) 16x¹²',
      markScheme: [
        '(a) 12 × 10⁻³ (1) = 1.2 × 10⁻² (1)',
        '(b) 4 × 10⁸ (1)',
        '(c) 2⁴ = 16 and x³ˣ⁴ = x¹² (1), giving 16x¹² (1)',
      ],
      marks: 5,
      explanation:
        'Multiply the numbers, add the powers; divide the numbers, subtract the powers. Then check the leading number is between 1 and 10 and adjust the power to compensate. In (c) the index outside the bracket applies to the 2 as well as to the x — forgetting that gives 2x¹².',
      hint: 'Finish the arithmetic, then fix the standard form.',
    },
  },
];
