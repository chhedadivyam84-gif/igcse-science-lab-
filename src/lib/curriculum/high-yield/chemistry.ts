import type { HighYieldSeed } from '../types';

/**
 * Chemistry 0620 — the question forms that recur.
 *
 * Written from the syllabus objectives; none of this is past-paper text.
 */
export const chemistryHighYield: HighYieldSeed[] = [
  {
    subject: 'chemistry',
    subtopic: '4.1',
    rank: 1,
    trap: 'Forgetting that in an aqueous solution water can be discharged instead of the dissolved ion. If the metal is above hydrogen in the reactivity series, hydrogen comes off at the cathode, not the metal.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Concentrated aqueous sodium chloride is electrolysed using inert electrodes.\n\n(a) Name the product formed at the cathode and write the half equation for its formation.\n(b) Name the product formed at the anode and write the half equation for its formation.\n(c) Explain why sodium metal is not produced at the cathode.\n(d) Name the useful compound left in the solution.',
      answer:
        '(a) Hydrogen; 2H⁺ + 2e⁻ → H₂. (b) Chlorine; 2Cl⁻ → Cl₂ + 2e⁻. (c) Sodium is more reactive than hydrogen, so hydrogen ions from the water are discharged in preference. (d) Sodium hydroxide.',
      markScheme: [
        '(a) Hydrogen (1); 2H⁺ + 2e⁻ → H₂ (1)',
        '(b) Chlorine (1); 2Cl⁻ → Cl₂ + 2e⁻ (1)',
        '(c) Sodium is above hydrogen in the reactivity series / more reactive than hydrogen (1), so H⁺ ions are discharged in preference (1)',
        '(d) Sodium hydroxide (1)',
      ],
      marks: 7,
      explanation:
        'The chlor-alkali process. The examiner wants the half equations balanced for both charge and atoms — electrons on the left at the cathode (reduction) and on the right at the anode (oxidation). Part (c) is the discriminating mark: the reason must be the relative reactivity of sodium and hydrogen.',
      hint: 'Aqueous means water is present, so H⁺ and OH⁻ ions are competing to be discharged.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.5',
    rank: 2,
    trap: 'Saying "it turns limewater cloudy" for the wrong gas, or giving the observation without the reagent. A test needs both the reagent and the result.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'FOUNDATION',
      stem:
        'For each of the following, state the test and the positive result:\n(a) carbon dioxide\n(b) hydrogen\n(c) oxygen\n(d) ammonia\n(e) chlorine',
      answer:
        '(a) Bubble through limewater; it turns milky/cloudy. (b) Apply a lighted splint; it burns with a squeaky pop. (c) Insert a glowing splint; it relights. (d) Hold damp red litmus paper in the gas; it turns blue. (e) Hold damp litmus paper in the gas; it is bleached white.',
      markScheme: [
        '(a) Limewater (1), turns milky / cloudy (1)',
        '(b) Lighted splint (1), squeaky pop (1)',
        '(c) Glowing splint (1), relights (1)',
        '(d) Damp red litmus (1), turns blue (1)',
        '(e) Damp litmus paper (1), bleached / turns white (1)',
      ],
      marks: 10,
      explanation:
        'Straight recall, and it appears in some form almost every series. The word "damp" matters for ammonia and chlorine — dry litmus paper gives no result, because the gas has to dissolve to act. Each test is marked as two separate points, so writing only the observation loses half the marks.',
      hint: 'Every answer is a reagent plus what you see.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '6.2',
    rank: 3,
    trap: 'Saying "the particles move faster so they collide more" for temperature and stopping there. The energy of the collisions matters more than the number, and the mark scheme wants the activation-energy idea.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Explain, in terms of collisions between particles, why the rate of a reaction increases when:\n(a) the concentration of a solution is increased\n(b) the temperature is increased\n(c) a solid reactant is ground into a powder\n(d) a catalyst is added',
      answer:
        '(a) More particles in the same volume, so collisions are more frequent. (b) Particles have more kinetic energy, so they collide more often AND a greater proportion of collisions exceed the activation energy. (c) A larger surface area exposes more particles to collision, so collisions are more frequent. (d) A catalyst provides an alternative pathway with a lower activation energy, so a greater proportion of collisions are successful.',
      markScheme: [
        '(a) More particles per unit volume (1), so more frequent collisions (1)',
        '(b) Particles gain kinetic energy and move faster, so collide more frequently (1)',
        '(b) A greater proportion of collisions have energy ≥ the activation energy (1)',
        '(c) Greater surface area, so more particles exposed / available to collide (1), more frequent collisions (1)',
        '(d) Provides an alternative route of lower activation energy (1), so more collisions are successful (1)',
      ],
      marks: 8,
      explanation:
        'Every part is marked on the same two-step pattern: what changes about the collisions, and why that raises the rate. Temperature is the only one with two distinct effects, and the activation-energy point is the mark most often dropped. A catalyst does not lower the activation energy of the original route — it offers a different route.',
      hint: 'Frequency of collisions, and the proportion that are successful, are two separate ideas.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '3.3',
    rank: 4,
    trap: 'Using the mass of the wrong substance, or forgetting that the balancing numbers give the mole ratio. Always convert to moles first, use the ratio, then convert back.',
    question: {
      type: 'NUMERICAL',
      difficulty: 'STANDARD',
      stem:
        'Calcium carbonate decomposes on heating:\nCaCO₃ → CaO + CO₂\n\nCalculate the mass of calcium oxide produced when 25.0 g of calcium carbonate decomposes completely.\n(Ar: Ca = 40, C = 12, O = 16)',
      answer: '14.0 g',
      markScheme: [
        'Mr(CaCO₃) = 40 + 12 + 48 = 100 (1)',
        'moles CaCO₃ = 25.0 / 100 = 0.250 mol (1)',
        'Mole ratio CaCO₃ : CaO is 1 : 1, so moles CaO = 0.250 mol (1)',
        'Mr(CaO) = 40 + 16 = 56; mass = 0.250 × 56 = 14.0 g (1)',
      ],
      marks: 4,
      explanation:
        'The three-step route — mass to moles, moles to moles using the equation, moles back to mass — works for every reacting-mass question. Writing it out in those three steps also earns method marks even if the arithmetic slips.',
      hint: 'Mass → moles → moles → mass. The equation only helps you in the middle step.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '12.2',
    rank: 5,
    trap: 'Leaving the volume in cm³. Concentration in mol/dm³ needs the volume in dm³, so divide the burette reading by 1000.',
    question: {
      type: 'NUMERICAL',
      difficulty: 'CHALLENGE',
      stem:
        '25.0 cm³ of sodium hydroxide solution required 20.0 cm³ of 0.100 mol/dm³ hydrochloric acid for complete neutralisation.\nNaOH + HCl → NaCl + H₂O\n\nCalculate the concentration of the sodium hydroxide solution in mol/dm³.',
      answer: '0.0800 mol/dm³',
      markScheme: [
        'moles HCl = 0.100 × 20.0 / 1000 = 2.00 × 10⁻³ mol (1)',
        'Mole ratio NaOH : HCl is 1 : 1, so moles NaOH = 2.00 × 10⁻³ mol (1)',
        'concentration = moles / volume in dm³ = 2.00 × 10⁻³ / 0.0250 (1)',
        '= 0.0800 mol/dm³ (1)',
      ],
      marks: 4,
      explanation:
        'A titration calculation is a reacting-mass calculation with concentration in place of mass. The only new step is remembering that 1 dm³ = 1000 cm³. Because the ratio here is 1 : 1 the middle step looks trivial — but write it down anyway, since ratios of 1 : 2 are just as common and the method mark is the same.',
      hint: 'Start with the solution you know everything about.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '6.3',
    rank: 6,
    trap: 'Saying a catalyst increases the yield. A catalyst changes only the rate, never the position of equilibrium.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'The Haber process is used to manufacture ammonia:\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g)   the forward reaction is exothermic\n\n(a) State and explain the effect of increasing the pressure on the yield of ammonia.\n(b) State and explain the effect of increasing the temperature on the yield of ammonia.\n(c) Explain why a temperature of about 450 °C is used in industry even though it does not give the highest yield.\n(d) State the effect of the iron catalyst on the yield.',
      answer:
        '(a) The yield increases, because there are 4 moles of gas on the left and 2 on the right, so the equilibrium shifts to the side with fewer gas molecules. (b) The yield decreases, because the forward reaction is exothermic and the equilibrium shifts in the endothermic (backward) direction to oppose the rise. (c) A lower temperature gives a higher yield but too slowly to be economic; 450 °C is a compromise between yield and rate. (d) None — it only increases the rate at which equilibrium is reached.',
      markScheme: [
        '(a) Yield increases (1); fewer moles of gas on the right (4 → 2), so equilibrium shifts right (1)',
        '(b) Yield decreases (1); forward reaction exothermic, so equilibrium shifts in the endothermic direction (1)',
        '(c) Lower temperature gives a higher yield but a rate too slow to be economic (1); 450 °C is a compromise (1)',
        '(d) No effect on yield / it only speeds up the attainment of equilibrium (1)',
      ],
      marks: 7,
      explanation:
        'Every part is an application of Le Chatelier: the system shifts to oppose the change imposed on it. The compromise-temperature answer in (c) needs both halves — the yield penalty *and* the rate benefit — and (d) is a one-mark trap that catches candidates every year.',
      hint: 'Count the gas molecules on each side before you answer (a).',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '8.3',
    rank: 7,
    trap: 'Getting the trend backwards. Reactivity *decreases* down Group VII, the opposite of Group I.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) Describe the trend in reactivity down Group VII and explain it in terms of atomic structure.\n(b) Predict what you would observe when chlorine solution is added to potassium bromide solution, and write the ionic equation.\n(c) Explain why iodine cannot displace chlorine from potassium chloride solution.',
      answer:
        '(a) Reactivity decreases down the group. Atoms get larger and the outer shell is further from the nucleus with more shielding, so an electron is attracted less strongly and gained less readily. (b) The solution turns orange/brown as bromine is displaced: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. (c) Iodine is less reactive than chlorine, so it cannot take the electrons from chloride ions — a less reactive halogen cannot displace a more reactive one.',
      markScheme: [
        '(a) Reactivity decreases down the group (1)',
        '(a) Atoms become larger / outer shell further from nucleus, with more shielding (1)',
        '(a) So the attraction for an incoming electron is weaker and it is gained less easily (1)',
        '(b) Solution turns orange / brown / red-brown (1)',
        '(b) Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ (1)',
        '(c) Iodine is less reactive than chlorine (1), and a less reactive halogen cannot displace a more reactive one (1)',
      ],
      marks: 7,
      explanation:
        'Halogens react by *gaining* an electron, which is why the group trend runs opposite to Group I — a bigger atom holds an incoming electron less tightly. Displacement questions then follow directly: the more reactive halogen takes the electrons.',
      hint: 'Group VII atoms gain an electron. Does a bigger atom do that more easily or less?',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '11.5',
    rank: 8,
    trap: 'Drawing the repeat unit with the double bond still in it, or leaving off the extension bonds. In an addition polymer the double bond becomes single and the unit must show bonds continuing out of both sides.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) State the test that distinguishes an alkene from an alkane and give the result for each.\n(b) Name the type of reaction by which ethene forms poly(ethene).\n(c) Describe the structure of the repeat unit of poly(ethene) in words, stating what happens to the carbon–carbon double bond.\n(d) Explain why poly(ethene) is difficult to dispose of.',
      answer:
        '(a) Add aqueous bromine: an alkene decolourises it from orange to colourless; an alkane leaves it orange. (b) Addition polymerisation. (c) The repeat unit is –CH₂–CH₂–, with the double bond opened to a single bond and a bond extending from each end to the next unit. (d) It is non-biodegradable, so it persists in landfill; burning it can release toxic gases.',
      markScheme: [
        '(a) Aqueous bromine / bromine water (1)',
        '(a) Alkene decolourises it (orange to colourless); alkane stays orange (1)',
        '(b) Addition polymerisation (1)',
        '(c) Repeat unit –CH₂–CH₂– (1)',
        '(c) The C=C double bond opens to become a single bond, with bonds extending to the next units (1)',
        '(d) Non-biodegradable / not broken down by microorganisms (1)',
        '(d) Takes up landfill space, or burning releases toxic gases such as carbon monoxide (1)',
      ],
      marks: 7,
      explanation:
        'The bromine-water test is the standard unsaturation test and both results must be given for the mark. In part (c) the examiner is checking that you understand addition polymerisation opens the double bond — that single idea is what distinguishes it from condensation polymerisation.',
      hint: 'Decolourised, not "goes clear" — a solution can be clear and still orange.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '9.6',
    rank: 9,
    trap: 'Mixing up which substance is reduced. In the blast furnace the iron oxide is reduced; the carbon monoxide is oxidised.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Iron is extracted from haematite (Fe₂O₃) in a blast furnace.\n\n(a) Write the equation for the reduction of iron(III) oxide by carbon monoxide.\n(b) Explain, in terms of oxygen, which substance is reduced and which is oxidised.\n(c) State the purpose of the limestone added to the furnace and name the waste product it forms.',
      answer:
        '(a) Fe₂O₃ + 3CO → 2Fe + 3CO₂. (b) The iron(III) oxide is reduced because it loses oxygen; the carbon monoxide is oxidised because it gains oxygen. (c) The limestone decomposes to calcium oxide, which reacts with acidic silicon dioxide impurities to form slag (calcium silicate), which is removed.',
      markScheme: [
        '(a) Fe₂O₃ + 3CO → 2Fe + 3CO₂, balanced (1)',
        '(b) Iron(III) oxide is reduced, because it loses oxygen (1)',
        '(b) Carbon monoxide is oxidised, because it gains oxygen (1)',
        '(c) Limestone removes acidic impurities, principally silicon dioxide / sand (1)',
        '(c) The waste product is slag, calcium silicate (1)',
      ],
      marks: 5,
      explanation:
        'Reduction is loss of oxygen in this definition, so name the substance *and* justify it with the oxygen change — an unjustified "the iron oxide is reduced" often scores nothing. The limestone question is asked in most series and needs the acidic-impurity reason, not just the word "slag".',
      hint: 'Reduction is loss of oxygen. Which species ends up with less?',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '5.1',
    rank: 10,
    trap: 'Getting the sign of ΔH backwards, or saying bond breaking releases energy. Breaking bonds always takes energy in; making bonds always gives energy out.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        '(a) State whether bond breaking is exothermic or endothermic, and state the same for bond making.\n(b) A reaction takes in 1200 kJ to break bonds and releases 1450 kJ when new bonds form. Calculate the enthalpy change and state whether the reaction is exothermic or endothermic.\n(c) Sketch in words how the energy level diagram for this reaction would look, naming the axis labels.',
      answer:
        '(a) Bond breaking is endothermic; bond making is exothermic. (b) ΔH = 1200 − 1450 = −250 kJ/mol, so the reaction is exothermic. (c) Energy on the vertical axis and progress of reaction on the horizontal axis, with the products lower than the reactants, and the activation energy shown as a hump between them.',
      markScheme: [
        '(a) Bond breaking endothermic (1); bond making exothermic (1)',
        '(b) ΔH = energy in − energy out = 1200 − 1450 (1)',
        '(b) = −250 kJ/mol (1), exothermic (1)',
        '(c) Axes: energy (vertical) against progress of reaction (horizontal) (1)',
        '(c) Products below reactants, with an activation energy hump (1)',
      ],
      marks: 7,
      explanation:
        'The negative sign is the whole answer to "is it exothermic?" — energy has left the system. Candidates who calculate 250 kJ without the sign usually lose the second mark, because the sign is what carries the meaning.',
      hint: 'Energy in minus energy out. A negative answer means energy escaped.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '2.5',
    rank: 11,
    trap: 'Describing a giant covalent structure as having "strong intermolecular forces". Giant covalent structures have no molecules — the covalent bonds themselves must be broken.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Explain, in terms of structure and bonding, why:\n(a) sodium chloride has a high melting point and conducts electricity when molten but not when solid\n(b) methane has a very low boiling point\n(c) diamond is extremely hard and does not conduct electricity',
      answer:
        '(a) It has a giant ionic lattice with strong electrostatic forces between oppositely charged ions, needing much energy to break. Solid ions are fixed in the lattice; when molten they are free to move and carry charge. (b) Methane is a simple molecule with weak intermolecular forces between molecules, which need little energy to overcome. (c) Diamond is a giant covalent structure in which each carbon atom forms four strong covalent bonds, so a great deal of energy is needed to break them; it has no free electrons or ions, so it cannot conduct.',
      markScheme: [
        '(a) Giant ionic lattice with strong electrostatic attraction between oppositely charged ions (1)',
        '(a) Much energy needed to overcome these forces (1)',
        '(a) Ions fixed in the solid but free to move when molten, so charge can be carried (1)',
        '(b) Simple molecular structure (1) with weak intermolecular forces requiring little energy to overcome (1)',
        '(c) Giant covalent structure, each carbon bonded to four others by strong covalent bonds (1)',
        '(c) No free electrons or mobile ions, so no conduction (1)',
      ],
      marks: 7,
      explanation:
        'Every answer follows the same shape: name the structure, name the forces, then say how much energy is needed. The crucial distinction is between breaking *intermolecular forces* (simple molecular) and breaking *covalent bonds* (giant covalent) — swapping them is the commonest lost mark in the whole topic.',
      hint: 'Name the structure first; the bonding answer follows from it.',
    },
  },
  {
    subject: 'chemistry',
    subtopic: '7.3',
    rank: 12,
    trap: 'Using a soluble base with the excess-solid method. If the base dissolves you cannot filter off the excess, so a titration must be used instead.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Describe how you would prepare a pure, dry sample of copper(II) sulfate crystals starting from copper(II) oxide and dilute sulfuric acid. Give the steps in order and explain why an excess of copper(II) oxide is used.',
      answer:
        'Warm the dilute sulfuric acid, then add copper(II) oxide a little at a time, stirring, until no more dissolves and some solid remains. The excess ensures all the acid has reacted. Filter to remove the unreacted copper(II) oxide. Heat the filtrate to evaporate some water and leave the concentrated solution to crystallise. Filter off the crystals and dry them between filter papers.',
      markScheme: [
        'Warm the acid and add copper(II) oxide until no more reacts / it is in excess (1)',
        'The excess ensures all the acid is used up so no acid contaminates the product (1)',
        'Filter to remove the unreacted excess solid (1)',
        'Heat the filtrate to evaporate to the point of crystallisation (1)',
        'Leave to cool and crystallise (1)',
        'Filter off crystals and dry between filter papers / in a warm oven (1)',
      ],
      marks: 6,
      explanation:
        'The examiner is testing whether you know *why* each step is there, so the excess-then-filter logic must be explicit. Evaporating to dryness is a common error — it drives off the water of crystallisation and leaves a powder rather than crystals.',
      hint: 'Do not evaporate to dryness; crystals need to grow from a saturated solution.',
    },
  },
];
