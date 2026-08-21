import type { PracticalSeed } from '../types';

/**
 * Physics 0625 Paper 6 — Alternative to Practical.
 *
 * The paper does not reward knowing physics; it rewards handling an experiment.
 * Almost every question is one of six things: read an instrument to the right
 * precision, tabulate, plot, take a gradient, identify a source of error, or
 * suggest an improvement. These are written to that shape.
 */
export const physicsPractical: PracticalSeed[] = [
  {
    subject: 'physics',
    subtopic: '1.1',
    trap: 'Recording a reading to a different precision from the instrument. A millimetre ruler reads to 0.1 cm, so 8.4 cm is right and 8.40 cm claims an accuracy the ruler does not have.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student measures the length of a metal rod with a millimetre ruler and records 24.6 cm.\n\n(a) State the precision of a millimetre ruler in centimetres.\n(b) Explain why the student should look directly above the scale when taking the reading, and name the error avoided by doing so.\n(c) The student repeats the measurement three times and takes an average. State the benefit of doing this, and state one type of error that averaging does NOT remove.',
      answer:
        '(a) 0.1 cm. (b) Looking along the line of sight perpendicular to the scale avoids parallax error, where the reading appears shifted because the eye is at an angle. (c) Averaging reduces the effect of random errors and gives a more reliable value. It does not remove a systematic error, such as a zero error or a ruler with a worn end.',
      markScheme: [
        '(a) 0.1 cm (or 1 mm) (1)',
        '(b) Line of sight perpendicular to the scale / directly above the mark (1)',
        '(b) Avoids parallax error (1)',
        '(c) Reduces the effect of random error / gives a more reliable average (1)',
        '(c) Does not remove systematic errors, e.g. a zero error (1)',
      ],
      marks: 5,
      explanation:
        'Random errors scatter either side of the true value, so averaging cancels them out. A systematic error shifts every reading the same way, so the average is shifted too — repeating the measurement a hundred times will not help. Naming the distinction is worth a mark almost every series.',
      hint: 'Averaging helps with scatter, not with a consistent offset.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.2',
    trap: 'Timing a single oscillation. Timing ten and dividing by ten reduces the effect of your reaction time by a factor of ten — the examiner is looking for that reasoning, not just the instruction.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student is investigating how the period of a pendulum depends on its length.\n\n(a) Describe how the student should measure the period accurately using a stopwatch, and explain why your method is better than timing one swing.\n(b) State the independent variable, the dependent variable and one variable that must be controlled.\n(c) Suggest one way of deciding exactly when to start and stop the stopwatch.',
      answer:
        '(a) Time 20 complete oscillations and divide by 20. Reaction time affects the total once, not each swing, so dividing spreads that fixed uncertainty across many periods and reduces its effect on the period by a factor of 20. (b) Independent: length of the pendulum. Dependent: period. Controlled: the mass of the bob, or the angle of swing. (c) Use a fiducial mark at the centre of the swing and start and stop as the bob passes it, because it is moving fastest there so the timing is most reproducible.',
      markScheme: [
        '(a) Time a stated number of complete oscillations, e.g. 20 (1)',
        '(a) Divide the total time by that number (1)',
        '(a) Reaction-time uncertainty is divided by the same number, so its effect is reduced (1)',
        '(b) Independent: length (1); dependent: period (1); controlled: mass of bob or angle of swing (1)',
        '(c) Fiducial mark at the centre of the swing, where the bob moves fastest (1)',
      ],
      marks: 7,
      explanation:
        'The centre of the swing is the right place to time from because the bob is moving fastest there, so a small timing slip corresponds to a smaller fraction of a period than it would at the slow-moving ends.',
      hint: 'Your reaction time does not get bigger when you time more swings.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.5',
    trap: 'Drawing a best-fit line through the origin because "it should go through zero". Draw the line the points actually support, then comment on the intercept.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student hangs masses from a spring and measures the extension. The results are plotted as extension (y-axis) against load (x-axis).\n\n(a) State two things that must be included on the axes of the graph.\n(b) Describe how to draw the best-fit line.\n(c) The line is straight through the origin up to 6.0 N, then curves upwards. State what the straight section shows and name the point where the behaviour changes.\n(d) The straight section passes through (0, 0) and (6.0, 4.8 cm). Calculate the gradient and state what it represents.',
      answer:
        '(a) A quantity and its unit for each axis, and a suitable scale using at least half the grid. (b) Draw a single thin straight line with roughly equal numbers of points on each side, ignoring any anomalous point. (c) The straight section shows extension is directly proportional to load, obeying Hooke\'s law. The point where it changes is the limit of proportionality. (d) gradient = 4.8 / 6.0 = 0.80 cm/N, which is the extension produced per newton of load.',
      markScheme: [
        '(a) Quantity and unit on both axes (1); sensible scale filling at least half the grid (1)',
        '(b) Thin single line with points balanced either side, anomalies ignored (1)',
        '(c) Extension directly proportional to load / obeys Hooke\'s law (1)',
        '(c) Limit of proportionality (1)',
        '(d) gradient = 4.8 / 6.0 = 0.80 cm/N (1)',
        '(d) Extension per unit load (1)',
      ],
      marks: 7,
      explanation:
        'Take gradient values from the drawn line, not from raw data points — the line is your averaged result, and using a data point throws that away. Use as large a triangle as the line allows to reduce the percentage uncertainty.',
      hint: 'A gradient is read off the line you drew, not off the table.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.4',
    trap: 'Reading a measuring cylinder from the top of the meniscus. Read the bottom of the curve, with your eye level with it.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student determines the density of a small stone using a balance and a measuring cylinder.\n\n(a) The water level reads 45.0 cm³ before the stone is added and 62.5 cm³ afterwards. The mass of the stone is 46.2 g. Calculate the density, giving the unit.\n(b) State how the student should read the measuring cylinder.\n(c) Suggest one reason the calculated density could be too low, and how to avoid it.',
      answer:
        '(a) V = 62.5 − 45.0 = 17.5 cm³; ρ = 46.2 / 17.5 = 2.64 g/cm³. (b) With the eye level with the liquid surface, reading the bottom of the meniscus. (c) If the stone was wet when it was weighed, the extra water adds mass — but if air bubbles cling to the stone the volume reads too high, which lowers the density; tap or tilt the cylinder to dislodge them, and dry the stone before weighing.',
      markScheme: [
        '(a) V = 62.5 − 45.0 = 17.5 cm³ (1)',
        '(a) ρ = 46.2 / 17.5 (1) = 2.64 g/cm³ with unit (1)',
        '(b) Eye level with the surface (1), reading the bottom of the meniscus (1)',
        '(c) Air bubbles trapped on the stone increase the apparent volume (1), dislodge them by tapping or tilting (1)',
      ],
      marks: 7,
      explanation:
        'Density questions in the ATP paper almost always hinge on the volume, not the mass — the balance is reliable and the measuring cylinder is where the errors live. Look for anything that changes the apparent displaced volume.',
      hint: 'Which of the two measurements is the shakier one?',
    },
  },
  {
    subject: 'physics',
    subtopic: '2.2',
    trap: 'Blaming "human error" for heat losses. Name the actual mechanism — energy transferred to the surroundings — and give a concrete fix such as insulation or a lid.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student heats 200 g of water in a beaker with an immersed electric heater and records the temperature every 30 seconds.\n\n(a) State the precision to which a thermometer reading −10 °C to 110 °C in 1 °C divisions should be recorded.\n(b) The value of specific heat capacity calculated from the results is higher than the accepted value. Explain why heat loss to the surroundings produces this result.\n(c) Suggest two improvements to reduce the error.',
      answer:
        '(a) To the nearest 1 °C (or half a division, 0.5 °C, if estimating between marks). (b) Some of the electrical energy supplied is transferred to the surroundings instead of to the water, so the temperature rise is smaller than it should be for the energy supplied. Since c = E / (mΔθ), a smaller Δθ for the same E gives a larger calculated c. (c) Insulate the beaker with lagging, and put a lid on it to reduce evaporation and convection losses.',
      markScheme: [
        '(a) To the nearest 1 °C (accept 0.5 °C) (1)',
        '(b) Energy is transferred to the surroundings, not all to the water (1)',
        '(b) The temperature rise is therefore smaller than expected for the energy supplied (1)',
        '(b) c = E / mΔθ, so a smaller Δθ gives a larger calculated c (1)',
        '(c) Two valid improvements: lagging / insulation (1); lid to reduce evaporation and convection (1)',
      ],
      marks: 6,
      explanation:
        'The chain of reasoning is what earns the marks: energy escapes, so Δθ is too small, so the calculated c is too big. An answer that says "heat was lost so the answer was wrong" without following it through to the direction of the error scores one mark of four.',
      hint: 'Work out whether the error makes Δθ too big or too small, then see what that does to the formula.',
    },
  },
  {
    subject: 'physics',
    subtopic: '4.3',
    trap: 'Putting the ammeter in parallel or the voltmeter in series. An ammeter goes in series with the component; a voltmeter goes across it.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student investigates how the resistance of a wire depends on its length.\n\n(a) Describe, in words, how the ammeter and the voltmeter must be connected relative to the wire.\n(b) The student uses a variable resistor in the circuit. State its purpose.\n(c) Explain why the current should be switched off between readings.\n(d) State how the resistance is calculated from the readings.',
      answer:
        '(a) The ammeter is connected in series with the wire so the same current passes through both. The voltmeter is connected in parallel across the wire, so it measures the potential difference across it. (b) To vary the current so that several pairs of readings can be taken, and to keep the current low. (c) A current passing continuously heats the wire, and a hotter wire has a greater resistance, so the readings would drift. (d) R = V / I.',
      markScheme: [
        '(a) Ammeter in series with the wire (1); voltmeter in parallel across the wire (1)',
        '(b) To vary the current / take several sets of readings (1)',
        '(c) The wire heats up as current flows (1), and its resistance increases with temperature, so readings would be inconsistent (1)',
        '(d) R = V / I (1)',
      ],
      marks: 6,
      explanation:
        'The heating point is the discriminating one. It also explains why the variable resistor is set to keep the current small — a large current heats the wire quickly and the resistance you measure is no longer the resistance at room temperature.',
      hint: 'What happens to a wire that carries current for a long time?',
    },
  },
  {
    subject: 'physics',
    subtopic: '3.2',
    trap: 'Measuring angles from the mirror or the glass surface. Every angle in reflection and refraction is measured from the normal, which is why the normal must be drawn first.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student traces the path of a ray of light through a rectangular glass block.\n\n(a) Describe how the student should mark the path of the incident ray accurately using optical pins.\n(b) State from where the angle of incidence must be measured.\n(c) The student obtains angles of incidence and refraction of 40° and 25°. Calculate the refractive index to 2 decimal places.\n(d) Suggest one reason the pins may give an inaccurate ray direction, and how to reduce it.',
      answer:
        '(a) Place two pins at least 5 cm apart in line with the incident ray, viewing them so one hides the other, then draw a straight line through the pin positions. (b) From the normal, drawn perpendicular to the surface at the point where the ray enters. (c) n = sin 40° / sin 25° = 0.643 / 0.423 = 1.52. (d) Pins placed close together make the line direction uncertain; place them as far apart as the paper allows, and keep them vertical.',
      markScheme: [
        '(a) Two pins in line with the ray, a stated distance apart, one hiding the other (1); line drawn through the pin marks (1)',
        '(b) From the normal at the point of entry (1)',
        '(c) n = sin i / sin r = sin 40 / sin 25 (1) = 1.52 (1)',
        '(d) Pins too close together, or not vertical (1); place them further apart / keep them upright (1)',
      ],
      marks: 7,
      explanation:
        'Two points define a line, and the further apart they are the smaller the angular uncertainty in the line you draw through them. That single idea answers most pin-and-ray improvement questions.',
      hint: 'sin 40° = 0.643, sin 25° = 0.423.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.7',
    trap: 'Listing every possible variable as "controlled" without saying how. A control is only creditable if you say what you did to keep it the same.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'Plan an investigation to find how the height from which a ball is dropped affects the height of its first bounce.\n\nYour plan should state the independent, dependent and control variables, the apparatus, how you would take the measurements accurately, and how you would present the results.',
      answer:
        'Independent variable: drop height. Dependent variable: bounce height. Controls: the same ball throughout, the same floor surface, and the ball released rather than thrown. Apparatus: metre rule clamped vertically, the ball, a clamp stand. Method: fix the rule vertically, release the ball from a measured height with its bottom level with the mark, and read the highest point of the bounce against the rule at eye level. Repeat three times at each height and take an average. Use at least five different heights. Present the results in a table with headings and units, then plot bounce height against drop height and draw a best-fit line.',
      markScheme: [
        'Independent variable: drop height (1)',
        'Dependent variable: bounce height (1)',
        'Two controls with a method, e.g. same ball, same surface, released not thrown (2)',
        'Metre rule held vertically, e.g. clamped in a stand (1)',
        'Read at eye level to avoid parallax (1)',
        'Repeat and average at each height (1)',
        'At least five different drop heights (1)',
        'Results tabulated with units, then plotted as a graph with a best-fit line (1)',
      ],
      marks: 9,
      explanation:
        'Planning questions carry the most marks in the paper and are marked against a checklist. Work through it in a fixed order every time — variables, apparatus, method, repeats, range, presentation — and you will not leave a whole section unwritten.',
      hint: 'Variables, apparatus, method, repeats, range, results. In that order.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.1',
    trap: 'Writing units inside the body of a results table. Units belong in the column heading, once, as "length / cm".',
    question: {
      type: 'STRUCTURED',
      difficulty: 'FOUNDATION',
      stem:
        'A student records the length l of a wire and the time t for a trolley to travel it.\n\n(a) Write a suitable column heading for the length measured in centimetres.\n(b) State two rules for recording the values in a results table.\n(c) The student records times of 2.3, 2.4 and 3.9 seconds for the same length. State what should be done with the third reading and why.',
      answer:
        '(a) l / cm. (b) Every value in a column is given to the same number of decimal places, matching the precision of the instrument; and no units are written beside the individual values. (c) It is an anomalous result — it does not fit the pattern of the other two. It should be repeated, and excluded from the average if it cannot be reproduced.',
      markScheme: [
        '(a) l / cm, or length / cm (1)',
        '(b) Same number of decimal places throughout the column (1)',
        '(b) Units in the heading only, not beside each value (1)',
        '(c) Identifies it as anomalous (1)',
        '(c) Repeat the measurement and exclude it from the average if not reproduced (1)',
      ],
      marks: 5,
      explanation:
        'The "quantity / unit" heading convention is examined in some form nearly every series and is free marks. The anomaly question tests whether you know that discarding a reading is only justified after you have checked it, not because it is inconvenient.',
      hint: 'The slash in the heading means "divided by", which is why the numbers underneath are plain.',
    },
  },
];
