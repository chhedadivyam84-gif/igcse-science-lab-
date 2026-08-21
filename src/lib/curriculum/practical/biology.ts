import type { PracticalSeed } from '../types';

/**
 * Biology 0610 Paper 6 — Alternative to Practical.
 *
 * Food tests, biological drawings, magnification arithmetic, and planning an
 * investigation with the variables named and controlled. Skills rather than
 * recall, which is why they are separated from the theory bank.
 */
export const biologyPractical: PracticalSeed[] = [
  {
    subject: 'biology',
    subtopic: '2.3',
    trap: 'Dividing the wrong way round, or mixing units. Magnification has no unit, so if your answer comes out with millimetres attached you have inverted the formula.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student draws a plant cell. The drawing is 60 mm across and the actual cell is 0.15 mm across.\n\n(a) Calculate the magnification of the drawing.\n(b) State three rules for a good biological drawing.\n(c) A second drawing has a magnification of ×250 and measures 45 mm. Calculate the actual size in millimetres.',
      answer:
        '(a) M = 60 / 0.15 = ×400. (b) Use a sharp pencil with clear continuous lines and no shading; draw label lines with a ruler that do not cross, ending exactly on the structure; and make the drawing large, occupying at least half the space available. (c) actual = 45 / 250 = 0.18 mm.',
      markScheme: [
        '(a) M = image size / actual size = 60 / 0.15 (1) = ×400 (1)',
        '(b) Sharp pencil, clear unbroken lines, no shading (1)',
        '(b) Ruled label lines that do not cross, touching the structure (1)',
        '(b) Drawing large enough, at least half the space (1)',
        '(c) actual = 45 / 250 (1) = 0.18 mm (1)',
      ],
      marks: 7,
      explanation:
        'Both sizes must be in the same unit before dividing — that conversion is where most of the lost marks are. Magnification is a ratio, so it never carries a unit; if yours does, you have divided the wrong way.',
      hint: 'Magnification = image ÷ actual. Rearrange it for part (c).',
    },
  },
  {
    subject: 'biology',
    subtopic: '4.1',
    trap: 'Giving the colour without the reagent, or forgetting that Benedict\'s must be heated. Each test is marked as reagent, condition and colour change.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student tests a food sample for reducing sugar, starch and protein.\n\n(a) Describe the reducing sugar test fully, including the condition required and the colour change for a positive result.\n(b) The Benedict\'s test gives a green colour rather than brick-red. State what this indicates.\n(c) State one safety precaution when heating the water bath, and the hazard it protects against.\n(d) Explain why a control tube containing distilled water is set up alongside.',
      answer:
        '(a) Add Benedict\'s solution to the sample and heat in a water bath at about 80 °C for a few minutes. A positive result changes the colour from blue to brick-red or orange. (b) A small concentration of reducing sugar is present — the colour runs blue, green, yellow, orange, brick-red as concentration increases. (c) Wear eye protection, because hot liquid can spit from the tube; or use tongs to handle hot tubes to avoid burns. (d) It shows the colour when no reducing sugar is present, so any change in the test tube can be attributed to the food and not to the reagent itself.',
      markScheme: [
        '(a) Add Benedict\'s solution (1); heat in a water bath (1); blue → brick-red / orange (1)',
        '(b) A low concentration of reducing sugar is present (1)',
        '(c) A valid precaution (1) with the hazard it addresses (1)',
        '(d) Provides a comparison / shows the negative result, so any change is due to the food (1)',
      ],
      marks: 7,
      explanation:
        'The graded colour range is the point of part (b): Benedict\'s is semi-quantitative, so the shade tells you roughly how much sugar there is, not merely whether any is present. That is why "it is not a reducing sugar" scores nothing for a green result.',
      hint: 'Green is on the way to brick-red, not the same as blue.',
    },
  },
  {
    subject: 'biology',
    subtopic: '3.1',
    trap: 'Comparing raw mass changes when the pieces started at different masses. Percentage change is required precisely because it removes that difference.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Potato cylinders are left in sucrose solutions for one hour, then blotted and reweighed.\n\nCylinder A: initial 4.20 g, final 4.62 g\nCylinder B: initial 3.80 g, final 3.42 g\n\n(a) Calculate the percentage change in mass for each cylinder.\n(b) Explain why percentage change is used rather than the change in mass.\n(c) Explain why the cylinders must be blotted before reweighing.\n(d) State two variables that must be controlled.',
      answer:
        '(a) A: (4.62 − 4.20) / 4.20 × 100 = +10.0%. B: (3.42 − 3.80) / 3.80 × 100 = −10.0%. (b) The cylinders start with different masses, so a raw change is not comparable between them; percentage change is relative to the starting mass and so can be compared fairly. (c) Surface water left on the cylinder would add mass that did not enter the cells, making the gain appear larger than it was. (d) The temperature, the time left in the solution, and the size and shape of the cylinders.',
      markScheme: [
        '(a) A: +10.0% (1); B: −10.0% (1)',
        '(b) The starting masses differ, so raw changes are not comparable (1)',
        '(b) Percentage relates the change to the starting mass, allowing fair comparison (1)',
        '(c) Surface water would add mass not taken in by osmosis (1)',
        '(d) Two valid controls: temperature, time, size of cylinder (2)',
      ],
      marks: 7,
      explanation:
        'Both cylinders changed by 0.42 and 0.38 g, which look different — as percentages they are equal and opposite. That is exactly the comparison the percentage is there to make possible, and it is why the mark scheme insists on it.',
      hint: 'Divide by the mass it started with, not the mass it ended with.',
    },
  },
  {
    subject: 'biology',
    subtopic: '5.1',
    trap: 'Changing two things at once. If the temperature and the pH both vary, no conclusion can be drawn about either.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'Plan an investigation into the effect of temperature on the activity of the enzyme amylase, which breaks down starch.\n\nDescribe the method, state the variables, and explain how you would know when the reaction is complete.',
      answer:
        'Independent variable: temperature. Dependent variable: time taken for the starch to disappear. Controls: the same concentration and volume of amylase and starch each time, and the same pH using a buffer solution. Method: place tubes of starch solution and amylase separately in a water bath at the chosen temperature for five minutes so both reach that temperature, then mix them and start a stopwatch. Every 30 seconds remove a drop with a pipette and add it to iodine solution on a spotting tile. When the iodine stays orange-brown rather than turning blue-black, all the starch has been broken down; record that time. Repeat at a range of at least five temperatures from 10 °C to 60 °C, three times each, and take averages.',
      markScheme: [
        'Independent: temperature (1); dependent: time for starch to disappear (1)',
        'Control the volume and concentration of amylase and starch (1)',
        'Control pH with a buffer (1)',
        'Allow the solutions to reach the water-bath temperature before mixing (1)',
        'Sample at regular intervals into iodine on a spotting tile (1)',
        'End point is iodine remaining orange-brown, meaning no starch left (1)',
        'At least five temperatures, repeated and averaged (1)',
      ],
      marks: 8,
      explanation:
        'Letting both solutions reach the water-bath temperature before mixing is the mark most often dropped. If you mix cold solutions and then warm them, the reaction begins at the wrong temperature and the independent variable is not what you think it is.',
      hint: 'Iodine going orange-brown means the starch is gone.',
    },
  },
  {
    subject: 'biology',
    subtopic: '6.1',
    trap: 'Counting bubbles as a measure of volume. Bubbles vary in size, so a count is only a rough proxy — say so if asked to evaluate the method.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student investigates photosynthesis by counting the bubbles of gas released from pondweed at different distances from a lamp.\n\n(a) Name the gas being released.\n(b) Explain why the distance from the lamp is used as a measure of light intensity, and state how light intensity changes as distance increases.\n(c) State one weakness of counting bubbles, and suggest a better measurement.\n(d) Explain why a beaker of water is placed between the lamp and the pondweed.',
      answer:
        '(a) Oxygen. (b) Light intensity depends on how far the light has spread from the source, and it decreases as distance increases — it falls in proportion to one over the distance squared. (c) Bubbles are not all the same size, so counting them measures the number rather than the volume of gas. Collecting the gas in a capillary tube or gas syringe and measuring its volume in a fixed time is better. (d) It absorbs the thermal energy from the lamp, so the temperature of the pondweed stays constant and only the light intensity changes.',
      markScheme: [
        '(a) Oxygen (1)',
        '(b) Light intensity decreases as distance increases (1), in proportion to 1/distance² (1)',
        '(c) Bubbles vary in size, so a count is not a measure of volume (1)',
        '(c) Measure the volume of gas collected in a fixed time instead (1)',
        '(d) Absorbs heat from the lamp (1) so temperature is kept constant and only light intensity varies (1)',
      ],
      marks: 7,
      explanation:
        'The heat shield in part (d) is a control, not a convenience: a lamp warms the water as well as lighting it, so without it temperature and light intensity would both be changing and the experiment would test neither cleanly.',
      hint: 'A lamp gives out two things, and only one of them is being investigated.',
    },
  },
  {
    subject: 'biology',
    subtopic: '2.3',
    trap: 'Using a scale bar without converting units. If the bar is labelled in micrometres and your ruler measures millimetres, convert before dividing.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A photograph of a cell has a scale bar labelled 20 µm, and the bar measures 10 mm on the page.\n\n(a) Calculate the magnification of the photograph. (1 mm = 1000 µm)\n(b) A structure in the photograph measures 6 mm. Calculate its actual size in micrometres.\n(c) Explain why a scale bar is more reliable than stating a magnification when an image is reproduced.',
      answer:
        '(a) 10 mm = 10 000 µm, so M = 10 000 / 20 = ×500. (b) actual = 6 mm = 6000 µm; 6000 / 500 = 12 µm. (c) If the image is enlarged or reduced when it is printed or copied, a stated magnification becomes wrong, but the scale bar is resized with the image so it stays correct.',
      markScheme: [
        '(a) Converts 10 mm to 10 000 µm (1); M = 10 000 / 20 = ×500 (1)',
        '(b) 6 mm = 6000 µm (1); 6000 / 500 = 12 µm (1)',
        '(c) A printed image may be resized (1), and the bar resizes with it while a stated magnification does not (1)',
      ],
      marks: 6,
      explanation:
        'Converting both lengths to the same unit first turns this from a confusing question into a single division. Micrometres are the natural unit for cells, so convert to those rather than to millimetres.',
      hint: '10 mm is 10 000 µm. Now both numbers are in the same unit.',
    },
  },
  {
    subject: 'biology',
    subtopic: '5.1',
    trap: 'Calling every unexpected reading "human error". Name the mechanism — a tube not reaching temperature, a delay in sampling — or the mark is not given.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student obtains these times for starch to disappear at different temperatures.\n\n10 °C: 240 s\n20 °C: 150 s\n30 °C: 95 s\n40 °C: 60 s\n50 °C: 310 s\n60 °C: no reaction\n\n(a) Describe the pattern shown by the results between 10 °C and 40 °C.\n(b) Explain the result at 60 °C.\n(c) The student is asked to estimate the optimum temperature. Explain why these results are not sufficient to give it precisely, and state what should be done.',
      answer:
        '(a) As the temperature increases the time taken decreases, so the rate of reaction increases. (b) At 60 °C the enzyme has been denatured: its active site has changed shape so the substrate no longer fits and no starch is broken down. (c) Readings are only taken every 10 °C, so the optimum could be anywhere between 40 °C and 50 °C. Take further readings at smaller intervals, for example every 2 °C between 40 °C and 50 °C.',
      markScheme: [
        '(a) As temperature increases, time decreases / rate increases (1)',
        '(b) The enzyme is denatured (1); the active site changes shape so the substrate no longer fits (1)',
        '(c) The interval between readings is too large, so the optimum lies somewhere between 40 and 50 °C (1)',
        '(c) Take readings at smaller intervals in that range (1)',
      ],
      marks: 5,
      explanation:
        'Notice the results are given as times, not rates: a shorter time means a faster reaction, so the pattern is inverted from what a rate graph would show. Reading that the wrong way round reverses the whole conclusion.',
      hint: 'A smaller time means a faster reaction.',
    },
  },
  {
    subject: 'biology',
    subtopic: '3.1',
    trap: 'Giving a range that is too narrow or too few readings. A pattern needs at least five values spread across a sensible range, and repeats at each.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student wants to estimate the concentration of solutes inside potato cells.\n\n(a) Describe how the percentage change in mass could be used to find this.\n(b) State how many different concentrations should be tested and why.\n(c) Explain why each concentration should be tested three times.',
      answer:
        '(a) Place identical potato cylinders in a range of sucrose concentrations, then plot percentage change in mass against concentration. The concentration at which the line crosses zero percentage change is the point where no net osmosis occurs, so the solution matches the concentration inside the cells. (b) At least five, so that a reliable pattern can be seen and the crossing point can be read off with confidence rather than guessed between two points. (c) Repeating and averaging reduces the effect of random errors and shows whether any result is anomalous.',
      markScheme: [
        '(a) Plot percentage change in mass against sucrose concentration (1)',
        '(a) Read the concentration where the line crosses zero (1)',
        '(a) At that point there is no net osmosis, so the concentrations are equal (1)',
        '(b) At least five concentrations (1) to establish a reliable pattern (1)',
        '(c) Averaging repeats reduces random error and identifies anomalies (1)',
      ],
      marks: 6,
      explanation:
        'The zero-crossing method is the standard way this practical is examined. The point is that you never measure the internal concentration directly — you find the external concentration that produces no change, and infer that they must match.',
      hint: 'Where the line crosses zero, nothing moved. What does that tell you?',
    },
  },
];
