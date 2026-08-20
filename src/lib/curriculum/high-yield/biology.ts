import type { HighYieldSeed } from '../types';

/**
 * Biology 0610 — the question forms that recur.
 *
 * Written from the syllabus objectives; none of this is past-paper text.
 */
export const biologyHighYield: HighYieldSeed[] = [
  {
    subject: 'biology',
    subtopic: '5.1',
    rank: 1,
    trap: 'Saying an enzyme is "killed" at high temperature. Enzymes are not alive — they are denatured, and the mark scheme wants the active site changing shape.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain, using the lock-and-key model, why an enzyme catalyses only one type of reaction.\n(b) Describe and explain the effect of increasing temperature from 20 °C to 60 °C on the rate of an enzyme-controlled reaction.\n(c) Explain what happens to an enzyme at a pH far from its optimum.',
      answer:
        '(a) The active site has a specific shape complementary to only one substrate, so only that substrate can bind and form an enzyme–substrate complex. (b) The rate rises to an optimum around 37 °C because molecules have more kinetic energy and collide more often with the active site; above the optimum the rate falls sharply because the enzyme denatures — bonds holding its shape break, the active site changes shape and the substrate no longer fits. (c) The enzyme is denatured: the active site changes shape and the substrate can no longer bind, so the rate falls.',
      markScheme: [
        '(a) The active site has a specific shape (1) complementary to one substrate only (1)',
        '(b) Rate increases up to the optimum as molecules gain kinetic energy and collide more frequently (1)',
        '(b) Above the optimum the rate falls (1)',
        '(b) The enzyme denatures: the active site changes shape (1) so the substrate no longer fits (1)',
        '(c) Denatured / active site changes shape, so no enzyme–substrate complexes form (1)',
      ],
      marks: 7,
      explanation:
        'The examinable idea is always the active site changing shape. "Denatured" on its own is usually one mark; the second comes from saying what denaturing does to the active site and hence to the substrate fit. Note the rate rises for a *reason* — kinetic energy — not simply "because it is hotter".',
      hint: 'Two separate things happen either side of the optimum. Explain both.',
    },
  },
  {
    subject: 'biology',
    subtopic: '4.1',
    rank: 2,
    trap: 'Forgetting that Benedict\'s test needs heating, and quoting only one colour for a positive result when the mark scheme wants the change.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'FOUNDATION',
      stem:
        'For each food test, state the reagent, any special conditions, and the colour change for a positive result:\n(a) reducing sugar\n(b) starch\n(c) protein\n(d) fat',
      answer:
        '(a) Benedict\'s solution, heated in a water bath; blue to brick-red/orange. (b) Iodine solution; orange-brown to blue-black. (c) Biuret solution; blue to purple/violet. (d) Ethanol emulsion test — shake with ethanol then add water; a cloudy white emulsion forms.',
      markScheme: [
        '(a) Benedict\'s solution (1), heated in a water bath (1), blue → brick-red / orange (1)',
        '(b) Iodine solution (1), orange-brown → blue-black (1)',
        '(c) Biuret solution (1), blue → purple / violet (1)',
        '(d) Add ethanol, shake, then add water (1), cloudy white emulsion (1)',
      ],
      marks: 9,
      explanation:
        'Recall marks that are given away every series. Heating is a marking point in its own right for Benedict\'s, and the colour change must be given as a change — "it goes red" without the starting colour often loses the mark.',
      hint: 'Reagent, condition, colour change. Three things, not one.',
    },
  },
  {
    subject: 'biology',
    subtopic: '3.1',
    rank: 3,
    trap: 'Describing osmosis as "water moving from high to low concentration" without saying *water* concentration, or omitting the partially permeable membrane.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Potato cylinders of equal size were left in sucrose solutions of different concentration for one hour, then reweighed.\n\n(a) Define osmosis.\n(b) Explain why a cylinder placed in distilled water gained mass.\n(c) Explain why a cylinder placed in concentrated sucrose solution became flaccid.\n(d) State one variable that must be kept constant and explain why.',
      answer:
        '(a) The net movement of water molecules from a region of higher water concentration to a region of lower water concentration, through a partially permeable membrane. (b) The water concentration outside was higher than inside the cells, so water entered by osmosis and the cells became turgid, increasing the mass. (c) The water concentration outside was lower than inside, so water left the cells by osmosis, the vacuoles shrank and the cells became flaccid. (d) Any of: temperature, time in solution, size of cylinder, or type of potato — so that any mass change is caused only by the sucrose concentration.',
      markScheme: [
        '(a) Net movement of water molecules (1) from higher to lower water concentration (1) through a partially permeable membrane (1)',
        '(b) Higher water concentration outside than inside the cells (1), so water enters by osmosis and cells become turgid (1)',
        '(c) Lower water concentration outside than inside (1), so water leaves the cells and they become flaccid (1)',
        '(d) Named variable (1) with the reason that only the sucrose concentration should affect the result (1)',
      ],
      marks: 9,
      explanation:
        'The definition is worth three separate marks and must contain all three elements. In (b) and (c) the direction of movement has to be justified by comparing water concentrations on the two sides — stating the outcome without the comparison scores half.',
      hint: 'Say which side has more water, then say which way the water goes.',
    },
  },
  {
    subject: 'biology',
    subtopic: '6.1',
    rank: 4,
    trap: 'Reading a limiting-factor graph and naming the factor on the x-axis as limiting on the plateau. On the plateau something *else* is limiting.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Write the balanced chemical equation for photosynthesis.\n(b) A graph shows the rate of photosynthesis rising as light intensity increases, then levelling off. Explain the shape of the graph.\n(c) State two factors, other than light intensity, that could be limiting on the level part of the graph.',
      answer:
        '(a) 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in the presence of light and chlorophyll). (b) At low light intensity, light is the limiting factor, so increasing it increases the rate. On the plateau light is no longer limiting: some other factor is, so further increases in light make no difference. (c) Carbon dioxide concentration and temperature.',
      markScheme: [
        '(a) 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, balanced (1); light and chlorophyll indicated (1)',
        '(b) On the rising part, light intensity is the limiting factor (1), so the rate increases as it increases (1)',
        '(b) On the plateau, another factor has become limiting (1), so extra light has no effect (1)',
        '(c) Carbon dioxide concentration (1); temperature (1)',
      ],
      marks: 8,
      explanation:
        'A limiting factor is whatever is in shortest supply — it is the one that, if increased, would raise the rate. That is why the plateau proves light is *no longer* limiting. Answering "light is limiting" for the whole graph is the standard way to lose three marks at once.',
      hint: 'On the flat part, adding more light does nothing. So what is holding the rate back?',
    },
  },
  {
    subject: 'biology',
    subtopic: '17.1',
    rank: 5,
    trap: 'Confusing genotype with phenotype, and writing a ratio of individuals instead of the expected ratio. Punnett squares give expected proportions, not guaranteed offspring.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'In pea plants, tall (T) is dominant to short (t). A heterozygous tall plant is crossed with a short plant.\n\n(a) State the genotypes of the two parents.\n(b) Draw or describe the Punnett square for this cross.\n(c) State the expected ratio of tall to short offspring.\n(d) Explain the difference between genotype and phenotype.',
      answer:
        '(a) Tt and tt. (b) Gametes T and t from the tall parent; t and t from the short parent. Offspring: Tt, Tt, tt, tt. (c) 1 tall : 1 short. (d) The genotype is the alleles an organism carries; the phenotype is the observable characteristic those alleles produce.',
      markScheme: [
        '(a) Tt and tt (1)',
        '(b) Correct gametes T, t and t, t (1)',
        '(b) Offspring Tt, Tt, tt, tt (1)',
        '(c) 1 tall : 1 short, or 50% each (1)',
        '(d) Genotype = the alleles present (1); phenotype = the observable characteristic / physical appearance (1)',
      ],
      marks: 6,
      explanation:
        'Because the tall parent is heterozygous and the short parent must be homozygous recessive, this is a test cross and always gives a 1 : 1 ratio. Marks are given for the gametes and the offspring separately, so show the working even when you can see the answer.',
      hint: 'A short plant can only be tt — short is recessive, so both alleles must be t.',
    },
  },
  {
    subject: 'biology',
    subtopic: '12.1',
    rank: 6,
    trap: 'Writing lactic acid as a product of anaerobic respiration in yeast. In yeast it is ethanol and carbon dioxide; lactic acid is the animal pathway.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Write the word equation for aerobic respiration.\n(b) Write the word equation for anaerobic respiration in human muscle, and for anaerobic respiration in yeast.\n(c) Explain why a sprinter continues to breathe deeply for several minutes after a race has finished.',
      answer:
        '(a) Glucose + oxygen → carbon dioxide + water (+ energy released). (b) In muscle: glucose → lactic acid (+ energy). In yeast: glucose → ethanol + carbon dioxide (+ energy). (c) Lactic acid has built up in the muscles during anaerobic respiration. Extra oxygen is needed to break it down — the oxygen debt — so deep breathing continues until the lactic acid has been oxidised.',
      markScheme: [
        '(a) Glucose + oxygen → carbon dioxide + water (1), energy released (1)',
        '(b) Glucose → lactic acid (1)',
        '(b) Glucose → ethanol + carbon dioxide (1)',
        '(c) Lactic acid builds up during anaerobic respiration in the muscles (1)',
        '(c) Oxygen is needed to break it down / repay the oxygen debt (1)',
      ],
      marks: 6,
      explanation:
        'Respiration *releases* energy, it does not produce it — the equations are marked strictly on that wording. The oxygen-debt answer needs the build-up and the repayment; naming lactic acid alone is one mark of two.',
      hint: 'Yeast makes the thing that brewing depends on. Muscles make the thing that aches.',
    },
  },
  {
    subject: 'biology',
    subtopic: '11.1',
    rank: 7,
    trap: 'Listing alveolar features without saying what each achieves. Every adaptation mark needs the feature *and* its effect on diffusion.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Describe three ways in which the alveoli are adapted for efficient gas exchange, explaining in each case how the adaptation helps.',
      answer:
        'They are very numerous and rounded, giving a large surface area so more gas can diffuse at once. Their walls are one cell thick, giving a short diffusion distance. They have a dense capillary network which maintains a steep concentration gradient by constantly removing oxygen and bringing carbon dioxide. Their surfaces are moist, so gases dissolve before diffusing.',
      markScheme: [
        'Large surface area (many alveoli) (1) so more gas diffuses per unit time (1)',
        'Walls one cell thick (1) giving a short diffusion distance / path (1)',
        'Rich blood supply from capillaries (1) maintaining a steep concentration gradient (1)',
      ],
      marks: 6,
      explanation:
        'Every exchange surface in the syllabus — alveoli, villi, root hairs, gills — is marked on the same three ideas: large surface area, short diffusion distance, steep concentration gradient. Learn the trio once and it transfers to every organ.',
      hint: 'Surface area, distance, gradient. Then say what each one does.',
    },
  },
  {
    subject: 'biology',
    subtopic: '18.1',
    rank: 8,
    trap: 'Writing that bacteria "become resistant because of the antibiotic". Resistance arises by random mutation *before* the antibiotic is applied; the antibiotic then selects for it.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'CHALLENGE',
      stem:
        'Explain how a population of bacteria becomes resistant to an antibiotic. Use the principles of natural selection in your answer.',
      answer:
        'Bacteria in the population show variation. A random mutation in some individuals gives resistance to the antibiotic. When the antibiotic is used, non-resistant bacteria are killed but resistant ones survive. The survivors reproduce and pass on the allele for resistance to their offspring. Over successive generations the proportion of resistant bacteria in the population increases until most are resistant.',
      markScheme: [
        'Variation exists within the bacterial population (1)',
        'Resistance arises by random mutation, before the antibiotic is applied (1)',
        'The antibiotic kills non-resistant bacteria; resistant ones survive (1)',
        'Survivors reproduce and pass on the resistance allele (1)',
        'Over generations the proportion of resistant bacteria increases (1)',
      ],
      marks: 5,
      explanation:
        'The mark that separates answers is the order of events. The mutation is not caused by the antibiotic — it is already present by chance, and the antibiotic acts as the selection pressure. Any answer implying the bacteria adapt in response scores poorly however fluent it is.',
      hint: 'Which came first, the mutation or the antibiotic?',
    },
  },
  {
    subject: 'biology',
    subtopic: '8.1',
    rank: 9,
    trap: 'Saying wind or heat "increases transpiration" without linking it to the water vapour concentration gradient at the stomata.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Define transpiration.\n(b) Explain how an increase in wind speed affects the rate of transpiration.\n(c) Explain how an increase in humidity affects the rate of transpiration.\n(d) Name the structures through which most water vapour is lost and state where they are most numerous on a typical leaf.',
      answer:
        '(a) The loss of water vapour from the leaves of a plant by evaporation and diffusion through the stomata. (b) Wind blows away the water vapour that collects outside the stomata, keeping the concentration gradient steep, so the rate increases. (c) High humidity means more water vapour in the air outside, so the concentration gradient is shallower and the rate decreases. (d) Stomata, most numerous on the lower surface of the leaf.',
      markScheme: [
        '(a) Loss of water vapour from the leaves (1) by evaporation and diffusion through the stomata (1)',
        '(b) Wind removes water vapour from around the stomata (1), maintaining a steep concentration gradient, so rate increases (1)',
        '(c) Humid air has a higher water vapour concentration outside (1), reducing the gradient, so rate decreases (1)',
        '(d) Stomata (1), mainly on the lower surface (1)',
      ],
      marks: 8,
      explanation:
        'Every environmental factor in this topic works through the same mechanism — the steepness of the water vapour gradient between the air spaces inside the leaf and the air outside. Answer every part by saying what happens to that gradient.',
      hint: 'What does each factor do to the water vapour just outside the stomata?',
    },
  },
  {
    subject: 'biology',
    subtopic: '9.1',
    rank: 10,
    trap: 'Saying the left ventricle wall is thicker "because it pumps more blood". Both ventricles pump equal volumes — the left pumps at higher pressure, and further.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Explain why the wall of the left ventricle is thicker than that of the right ventricle.\n(b) State the function of the valves between the atria and the ventricles.\n(c) Explain the advantage of a double circulatory system.',
      answer:
        '(a) The left ventricle pumps blood to the whole body, which requires a higher pressure, so it needs more muscle; the right ventricle pumps only to the lungs, a much shorter distance at lower pressure. (b) They prevent the backflow of blood from the ventricles into the atria when the ventricles contract. (c) Blood passes through the heart twice per circuit, so it is re-pressurised after the lungs; this maintains a high pressure and therefore a fast flow to the body tissues.',
      markScheme: [
        '(a) The left ventricle pumps blood to the whole body / a greater distance (1)',
        '(a) So a higher pressure is needed, requiring more muscle (1)',
        '(a) The right ventricle pumps only to the lungs, at lower pressure (1)',
        '(b) Prevent backflow of blood into the atria (1) when the ventricles contract (1)',
        '(c) Blood is returned to the heart and re-pressurised after the lungs (1)',
        '(c) So it can be delivered to the body at high pressure / fast flow (1)',
      ],
      marks: 7,
      explanation:
        'The comparison in (a) must mention pressure, not volume — that is the single most common error in the topic. In (c) the advantage is specifically that pressure lost in the capillary beds of the lungs is restored before the blood is sent round the body.',
      hint: 'Both sides pump the same volume. What differs is how far and how hard.',
    },
  },
  {
    subject: 'biology',
    subtopic: '19.1',
    rank: 11,
    trap: 'Drawing food-chain arrows the wrong way. The arrow points in the direction the energy flows, so it points from the eaten towards the eater.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) State what the arrows in a food chain represent.\n(b) Explain why food chains rarely have more than four or five trophic levels.\n(c) Explain why there is more energy available to humans when they eat crops directly than when they eat animals fed on those crops.',
      answer:
        '(a) The direction of energy flow, from the organism being eaten to the organism eating it. (b) Only about 10% of the energy at each level is passed on; the rest is lost as heat from respiration, in movement, and in undigested material in faeces and excretion. After a few levels there is too little energy left to support another population. (c) Eating crops directly involves only one energy transfer, whereas feeding crops to animals adds a second transfer at which most of the energy is lost, so far less reaches the human.',
      markScheme: [
        '(a) The direction of energy flow / transfer (1), from the eaten to the eater (1)',
        '(b) Energy is lost at each transfer, as heat from respiration, in movement, in faeces and excretion (2)',
        '(b) Too little energy remains to support a further trophic level (1)',
        '(c) Fewer trophic levels / only one transfer (1)',
        '(c) Less energy lost, so more is available to humans (1)',
      ],
      marks: 7,
      explanation:
        'Energy loss questions want the *routes* of loss named, not just the fact that energy is lost. Respiration as heat is the largest, and faeces and excretion are separately creditable. The shorter-food-chain argument in (c) follows directly from this.',
      hint: 'Name the ways energy escapes at each level, not just that it does.',
    },
  },
  {
    subject: 'biology',
    subtopic: '2.1',
    rank: 12,
    trap: 'Listing chloroplasts and a cell wall as "only in plant cells" but forgetting that a vacuole in an animal cell can exist — it is the large permanent vacuole that is plant-specific.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'FOUNDATION',
      stem:
        '(a) Name three structures found in a plant cell but not in an animal cell, and state the function of each.\n(b) State the function of the mitochondria and explain why muscle cells contain many of them.\n(c) State the function of the cell membrane.',
      answer:
        '(a) Cell wall — made of cellulose, supports the cell and stops it bursting; chloroplasts — contain chlorophyll and carry out photosynthesis; large permanent vacuole — contains cell sap and keeps the cell turgid. (b) Mitochondria are the site of aerobic respiration, releasing energy. Muscle cells contract and so need a great deal of energy, requiring many mitochondria. (c) It controls what enters and leaves the cell — it is partially permeable.',
      markScheme: [
        '(a) Cell wall (1) with function: support / prevents bursting (1)',
        '(a) Chloroplasts (1) with function: site of photosynthesis / contain chlorophyll (1)',
        '(a) Large permanent vacuole (1) with function: contains cell sap / keeps cell turgid (1)',
        '(b) Site of aerobic respiration, releasing energy (1); muscle cells need much energy to contract (1)',
        '(c) Controls what enters and leaves the cell / partially permeable (1)',
      ],
      marks: 9,
      explanation:
        'Each structure is marked as a name plus a function, so a bare list scores half. The mitochondria question recurs with different cell types — sperm, root hair, liver — and the answer is always the same shape: this cell does something energy-expensive, so it needs many mitochondria.',
      hint: 'Name plus function, every time.',
    },
  },
];
