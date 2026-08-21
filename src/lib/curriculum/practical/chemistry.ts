import type { PracticalSeed } from '../types';

/**
 * Chemistry 0620 Paper 6 — Alternative to Practical.
 *
 * Reading a burette, judging concordant titres, choosing apparatus, and saying
 * what a colour change means. Almost none of it is syllabus theory, which is
 * why these are kept out of the theory papers.
 */
export const chemistryPractical: PracticalSeed[] = [
  {
    subject: 'chemistry',
    subtopic: '12.2',
    trap: 'Recording a burette reading to the nearest whole cm³. A burette is graduated in 0.1 cm³ and read to 0.05 cm³, so every value ends in .00 or .05.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student carries out a titration and records these burette readings.\n\nRough: initial 0.00, final 25.60\nTitre 1: initial 0.00, final 24.80\nTitre 2: initial 24.80, final 49.55\nTitre 3: initial 0.00, final 26.90\n\n(a) State the precision to which burette readings should be recorded.\n(b) Calculate the three accurate titres.\n(c) State which titres are concordant and calculate the mean titre to be used.\n(d) Explain why the rough titration is carried out at all.',
      answer:
        '(a) To the nearest 0.05 cm³. (b) Titre 1 = 24.80, Titre 2 = 24.75, Titre 3 = 26.90 cm³. (c) Titres 1 and 2 are concordant, agreeing within 0.10 cm³. Mean = (24.80 + 24.75) / 2 = 24.78 cm³. (d) It gives an approximate end point quickly, so the accurate runs can be added dropwise near that volume rather than overshooting.',
      markScheme: [
        '(a) 0.05 cm³ (1)',
        '(b) 24.80, 24.75 (49.55 − 24.80), 26.90 (1 for all three)',
        '(c) Titres 1 and 2 are concordant, within 0.10 cm³ (1)',
        '(c) Mean = 24.78 cm³, excluding 26.90 (1)',
        '(d) Locates the approximate end point (1) so the accurate runs can be added dropwise near it (1)',
      ],
      marks: 6,
      explanation:
        'Concordant means within 0.10 cm³ of each other. Averaging all three — including the rough or the outlier — is the commonest error in the whole paper, and it costs the marks for both the mean and every calculation that follows.',
      hint: 'Titre 2 does not start at zero.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.5',
    trap: 'Writing a conclusion without the observation, or vice versa. Every test is marked as reagent, observation, and conclusion — three separate things.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student is given a solution containing one cation and one anion.\n\n(a) Aqueous sodium hydroxide is added drop by drop and then in excess. A white precipitate forms which dissolves in excess. Name two cations this could be, and state the further test that distinguishes them.\n(b) Dilute nitric acid then aqueous silver nitrate are added, and a cream precipitate forms. Identify the anion.\n(c) Explain why the dilute nitric acid must be added before the silver nitrate.',
      answer:
        '(a) Aluminium (Al³⁺) or zinc (Zn²⁺). Add aqueous ammonia drop by drop and then in excess: with zinc the white precipitate dissolves in excess ammonia, with aluminium it does not. (b) Bromide, Br⁻. (c) The acid removes carbonate ions, which would otherwise form a white precipitate of silver carbonate and be mistaken for a positive halide result.',
      markScheme: [
        '(a) Aluminium and zinc both named (1)',
        '(a) Add aqueous ammonia in excess (1); zinc redissolves, aluminium does not (1)',
        '(b) Bromide / Br⁻ (1)',
        '(c) Removes carbonate ions (1) which would give a white precipitate and a false positive (1)',
      ],
      marks: 6,
      explanation:
        'The three silver halide colours are the ones to memorise: chloride white, bromide cream, iodide yellow. The nitric acid step is a marking point in its own right, and the reason — preventing a carbonate false positive — is what earns it.',
      hint: 'Chloride white, bromide cream, iodide yellow.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '6.2',
    trap: 'Reading the rate off the end of a gas-volume curve. The rate at any moment is the gradient, so the reaction is fastest at the start where the curve is steepest.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student measures the volume of gas produced when marble chips react with dilute hydrochloric acid, recording the volume every 30 seconds.\n\n(a) Name a suitable piece of apparatus for collecting and measuring the gas.\n(b) Explain how the graph of volume against time shows that the reaction is fastest at the start.\n(c) State two things the graph tells you when it becomes horizontal.\n(d) Suggest one reason gas could be lost, and how to prevent it.',
      answer:
        '(a) A gas syringe, or an inverted measuring cylinder filled with water over a trough. (b) The gradient of the curve is the rate. The curve is steepest at the start, so the rate is greatest there, because the acid concentration is highest and collisions are most frequent. (c) That the reaction has stopped, and that one reactant has been completely used up. (d) Gas escapes before the bung is fitted; add the acid through a syringe or tap funnel with the bung already in place.',
      markScheme: [
        '(a) Gas syringe or measuring cylinder over water (1)',
        '(b) Gradient of the curve represents the rate (1)',
        '(b) Steepest at the start, so fastest then (1), because concentration is highest (1)',
        '(c) Reaction has finished (1); a reactant has been used up / is limiting (1)',
        '(d) Gas escapes while the bung is being fitted (1); add acid through a syringe with the bung in place (1)',
      ],
      marks: 8,
      explanation:
        'The gas-loss question appears constantly and has one good answer: the delay between mixing and sealing. Anything that removes that delay — a tap funnel, a syringe through the bung — earns the improvement mark.',
      hint: 'When exactly does gas escape? Between mixing and sealing.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '5.1',
    trap: 'Recording the final temperature at a fixed time instead of at the maximum. For a temperature-change experiment you want the highest (or lowest) value reached.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student adds magnesium powder to copper(II) sulfate solution in a polystyrene cup and records the temperature.\n\n(a) Explain why a polystyrene cup is used rather than a glass beaker.\n(b) State what should be recorded as the final temperature.\n(c) The temperature rises from 21.0 °C to 46.5 °C. Calculate the temperature change and state whether the reaction is exothermic or endothermic.\n(d) Suggest two improvements that would make the measured temperature rise larger and closer to the true value.',
      answer:
        '(a) Polystyrene is a poor conductor, so less thermal energy is transferred to the surroundings and the temperature rise measured is closer to the true value. (b) The highest temperature reached, not the temperature after a fixed time. (c) ΔT = 46.5 − 21.0 = 25.5 °C; the reaction is exothermic. (d) Put a lid on the cup to reduce heat loss by evaporation and convection, and stir the mixture so the temperature is even throughout before reading.',
      markScheme: [
        '(a) Polystyrene is an insulator / poor conductor (1), so less energy is lost to the surroundings (1)',
        '(b) The maximum temperature reached (1)',
        '(c) ΔT = 25.5 °C (1); exothermic (1)',
        '(d) Use a lid (1); stir the mixture (1)',
      ],
      marks: 7,
      explanation:
        'Every improvement in a calorimetry question comes back to reducing energy transfer to the surroundings or making the reading representative. A lid, insulation and stirring cover almost all of them.',
      hint: 'Temperature went up, so energy came out of the reaction.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.3',
    trap: 'Drawing the baseline in ink, or starting with the solvent level above the spots. Both ruin the chromatogram, and both are common marking points.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student uses paper chromatography to separate the dyes in a food colouring.\n\n(a) Explain why the baseline must be drawn in pencil.\n(b) Explain why the solvent level must start below the baseline.\n(c) A dye moves 4.2 cm while the solvent front moves 7.0 cm. Calculate the Rf value.\n(d) The food colouring produces three spots. State what this shows.',
      answer:
        '(a) Pencil is insoluble in the solvent, so it will not run and contaminate the chromatogram; ink would dissolve and separate into its own spots. (b) If the solvent were above the baseline the spots would dissolve into the solvent in the tank instead of travelling up the paper. (c) Rf = 4.2 / 7.0 = 0.60. (d) The food colouring is a mixture of three different dyes.',
      markScheme: [
        '(a) Pencil is insoluble in the solvent and will not run (1)',
        '(b) The spots would dissolve into the solvent rather than travel up the paper (1)',
        '(c) Rf = 4.2 / 7.0 (1) = 0.60 (1)',
        '(d) The colouring contains three different substances / is a mixture of three dyes (1)',
      ],
      marks: 5,
      explanation:
        'Rf has no units and is always between 0 and 1, so an answer greater than 1 means the two distances have been divided the wrong way round. Distances are always measured from the baseline to the centre of the spot.',
      hint: 'Distance moved by the substance ÷ distance moved by the solvent.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.4',
    trap: 'Confusing filtration with crystallisation, and evaporating a salt solution to dryness. Evaporating to dryness drives off the water of crystallisation and leaves powder, not crystals.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A student has a mixture of sand and copper(II) sulfate.\n\n(a) Describe how to obtain pure, dry crystals of copper(II) sulfate from the mixture, naming the apparatus at each stage.\n(b) Explain why the solution is not evaporated to dryness.\n(c) Name the technique that would be used to obtain pure water from the copper(II) sulfate solution instead.',
      answer:
        '(a) Add water and stir to dissolve the copper(II) sulfate. Filter using filter paper and a funnel to remove the sand, keeping the filtrate. Heat the filtrate in an evaporating basin until crystals just start to form, then leave it to cool and crystallise. Filter off the crystals and dry them between filter papers. (b) Evaporating to dryness drives off the water of crystallisation and decomposes the hydrated salt, leaving a white powder rather than blue crystals. (c) Simple distillation.',
      markScheme: [
        '(a) Add water and stir to dissolve the salt (1)',
        '(a) Filter with filter paper and funnel; sand is the residue, solution is the filtrate (1)',
        '(a) Heat the filtrate to the point of crystallisation (1)',
        '(a) Leave to cool and crystallise, then filter and dry between filter papers (1)',
        '(b) Water of crystallisation would be driven off, giving a powder not crystals (1)',
        '(c) Simple distillation (1)',
      ],
      marks: 6,
      explanation:
        'Sand is insoluble and copper(II) sulfate is soluble, which is what makes filtration the right first step. Naming the residue and the filtrate correctly is worth a mark on its own — the residue stays in the paper, the filtrate passes through.',
      hint: 'One substance dissolves and one does not. That difference is the whole method.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.1',
    trap: 'Naming a variable without saying how it is controlled. "Same temperature" scores nothing; "use a water bath at 25 °C" scores the mark.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'Plan an investigation to find how the concentration of hydrochloric acid affects the rate of its reaction with magnesium ribbon.\n\nState the variables, describe the method, and explain how you would use the results to compare the rates.',
      answer:
        'Independent variable: acid concentration. Dependent variable: time for the magnesium to disappear, or volume of gas in a fixed time. Controls: the same length and cleaning of magnesium ribbon each time, the same volume of acid measured with a pipette, and the same temperature by using a water bath. Method: measure 25 cm³ of acid into a flask, add a 3 cm cleaned strip of magnesium, start a stopwatch immediately and stop it when the magnesium has completely disappeared. Repeat three times at each concentration and average. Use at least five concentrations. Rate is proportional to 1 / time, so plot 1 / time against concentration; a straight line through the origin shows rate is directly proportional to concentration.',
      markScheme: [
        'Independent: acid concentration (1); dependent: time taken / volume of gas (1)',
        'Control the magnesium: same length, cleaned each time (1)',
        'Control the acid volume, measured with a pipette or measuring cylinder (1)',
        'Control temperature, e.g. a water bath (1)',
        'Start timing on adding the magnesium, stop when it disappears (1)',
        'Repeat and average; use at least five concentrations (1)',
        'Rate ∝ 1 / time (1); plot 1 / time against concentration (1)',
      ],
      marks: 9,
      explanation:
        'Cleaning the magnesium matters because the oxide layer on the surface reacts first and slows the start, which would vary between runs. The 1/time step is what turns "how long it took" into "how fast it went", and is the mark that separates the top answers.',
      hint: 'A shorter time means a faster rate — so what should you plot?',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.2',
    trap: 'Rinsing the burette with distilled water and leaving it wet. Residual water dilutes the solution and makes the titre too large — rinse with the solution it will contain.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain why a burette should be rinsed with the solution it is about to contain rather than left wet with distilled water.\n(b) Name a suitable indicator for a titration between a strong acid and a strong alkali, and state the colour change at the end point when acid is added to alkali.\n(c) Explain why the conical flask may be rinsed with distilled water during the titration without affecting the result.',
      answer:
        '(a) Water left in the burette would dilute the solution added, so a larger volume would be needed to reach the end point and the titre would be too large. (b) Methyl orange; the colour changes from yellow to orange/red at the end point. Phenolphthalein is also acceptable, changing from pink to colourless. (c) The distilled water only washes drops down into the flask; it does not change the number of moles of substance present, and the titre depends on moles, not on the total volume in the flask.',
      markScheme: [
        '(a) Water would dilute the solution (1), so a larger titre would be needed and the result would be too high (1)',
        '(b) A suitable named indicator (1) with the correct colour change (1)',
        '(c) Adding water does not change the number of moles present (1), and the titre depends on moles reacting, not on the volume in the flask (1)',
      ],
      marks: 6,
      explanation:
        'This pair of questions is a favourite because it tests whether you understand what actually determines the titre. Diluting the burette solution changes its concentration and therefore the titre; adding water to the flask changes only the volume and not the moles.',
      hint: 'One dilution changes a concentration; the other does not.',
    },
  },
];
