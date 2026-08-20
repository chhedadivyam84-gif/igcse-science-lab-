import type { HighYieldSeed } from '../types';

/**
 * Physics 0625 — the question forms that recur.
 *
 * Ranked by how reliably the *form* appears, not by difficulty. Every question
 * is written here from the syllabus objectives; none is past-paper text.
 */
export const physicsHighYield: HighYieldSeed[] = [
  {
    subject: 'physics',
    subtopic: '1.2',
    rank: 1,
    trap: 'Reading the area under a speed–time graph as acceleration, or the gradient as distance. Gradient is always acceleration; area is always distance.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A cyclist starts from rest and accelerates uniformly to 12 m/s in 8.0 s. She then travels at 12 m/s for 20 s, and finally decelerates uniformly to rest in 6.0 s.\n\n(a) Calculate her acceleration during the first 8.0 s.\n(b) Calculate the total distance travelled.\n(c) State what the gradient and the area under a speed–time graph each represent.',
      answer:
        '(a) 1.5 m/s². (b) 48 + 240 + 36 = 324 m. (c) Gradient = acceleration; area under the graph = distance travelled.',
      markScheme: [
        '(a) a = (v − u) / t = (12 − 0) / 8.0 (1)',
        '(a) = 1.5 m/s², unit required (1)',
        '(b) Acceleration phase: ½ × 8.0 × 12 = 48 m (1)',
        '(b) Constant phase: 12 × 20 = 240 m (1)',
        '(b) Deceleration phase: ½ × 6.0 × 12 = 36 m, total = 324 m (1)',
        '(c) Gradient = acceleration (1); area = distance travelled (1)',
      ],
      marks: 7,
      explanation:
        'Split the journey into the three straight-line sections and treat each as a triangle or rectangle. The two acceleration phases are triangles because the speed changes uniformly; the middle section is a rectangle. Adding the three areas gives the total distance, which is why the area rule matters more than any formula here.',
      hint: 'Sketch the graph first. Three shapes: triangle, rectangle, triangle.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.4',
    rank: 2,
    trap: 'Giving the volume in cm³ but the mass in kg, then quoting g/cm³. Convert one or the other before dividing, and state the unit you actually used.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Describe how you would determine the density of a small irregularly shaped stone using a balance and a measuring cylinder. State the measurements you take, the equation you use, and one precaution that improves accuracy.',
      answer:
        'Measure the mass on a balance. Part-fill a measuring cylinder with water and record the initial volume. Lower the stone in fully and record the new volume. Volume of stone = final − initial. Density = mass / volume.',
      markScheme: [
        'Measure mass of the stone using a balance (1)',
        'Record initial water volume in the measuring cylinder (1)',
        'Fully submerge the stone and record the new volume (1)',
        'Volume of stone = final volume − initial volume (1)',
        'ρ = m / V (1)',
        'Any valid precaution: read the bottom of the meniscus at eye level / ensure the stone is fully submerged / dry the stone before weighing (1)',
      ],
      marks: 6,
      explanation:
        'This is the standard displacement method. The examiner is looking for the subtraction step written explicitly — candidates who say "measure the volume of the stone" without saying how are not credited, because the whole point of the question is that an irregular solid has no volume formula.',
      hint: 'The stone has no formula for its volume, so the water has to measure it for you.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.5',
    rank: 3,
    trap: 'Measuring distances from the load instead of from the pivot. Every distance in a moment is measured perpendicular from the pivot.',
    question: {
      type: 'NUMERICAL',
      difficulty: 'STANDARD',
      stem:
        'A uniform metre rule is pivoted at its 50 cm mark. A 2.0 N weight hangs at the 20 cm mark. A weight W hangs at the 85 cm mark and the rule balances. Calculate W.',
      answer: '1.7 N',
      markScheme: [
        'Anticlockwise moment = 2.0 × 0.30 = 0.60 N m (1)',
        'Clockwise moment = W × 0.35 (1)',
        'Applying the principle of moments: W = 0.60 / 0.35 (1)',
        'W = 1.7 N (2 s.f.), unit required (1)',
      ],
      marks: 4,
      explanation:
        'Distances are measured from the pivot at 50 cm: the 2.0 N weight is 30 cm away, W is 35 cm away. Because the rule is uniform and pivoted at its centre, its own weight acts through the pivot and produces no moment — which is why the question says "uniform" and "50 cm mark".',
      hint: 'Distance from the pivot, not from the end of the rule.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.7',
    rank: 4,
    trap: 'Writing efficiency as a value greater than 1, or forgetting to multiply by 100 when the question asks for a percentage.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'An electric motor lifts a 25 kg load through a vertical height of 3.0 m in 5.0 s. The motor draws 2000 J of electrical energy in that time. (g = 10 N/kg)\n\n(a) Calculate the gravitational potential energy gained by the load.\n(b) Calculate the useful output power of the motor.\n(c) Calculate the efficiency of the motor as a percentage.\n(d) State what happens to the energy that is not usefully transferred.',
      answer: '(a) 750 J. (b) 150 W. (c) 37.5%. (d) It is transferred to the surroundings as thermal energy (and a little as sound).',
      markScheme: [
        '(a) ΔE = mgΔh = 25 × 10 × 3.0 (1) = 750 J (1)',
        '(b) P = E / t = 750 / 5.0 (1) = 150 W (1)',
        '(c) efficiency = 750 / 2000 × 100 (1) = 37.5% (1)',
        '(d) Wasted energy is transferred to the surroundings as thermal energy, by heating in the motor windings, plus some sound (1)',
      ],
      marks: 7,
      explanation:
        'Efficiency is always useful energy out divided by total energy in. The useful output here is the gravitational potential energy gained, not the power — so calculate the energy first and only then divide by time for part (b). Part (d) is worth a mark almost every series and needs the words "to the surroundings".',
      hint: 'Useful out ÷ total in. Work out the energy before you touch the time.',
    },
  },
  {
    subject: 'physics',
    subtopic: '4.3',
    rank: 5,
    trap: 'Adding parallel resistances directly. In parallel the combined resistance is always smaller than the smallest branch — if your answer is bigger, it is wrong.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A 12 V supply is connected to a 4.0 Ω resistor in series with a parallel combination of a 6.0 Ω and a 3.0 Ω resistor.\n\n(a) Calculate the resistance of the parallel combination.\n(b) Calculate the total resistance of the circuit.\n(c) Calculate the current drawn from the supply.\n(d) Calculate the potential difference across the parallel combination.',
      answer: '(a) 2.0 Ω. (b) 6.0 Ω. (c) 2.0 A. (d) 4.0 V.',
      markScheme: [
        '(a) 1/R = 1/6.0 + 1/3.0 = 1/2.0 (1), R = 2.0 Ω (1)',
        '(b) R_total = 4.0 + 2.0 = 6.0 Ω (1)',
        '(c) I = V / R = 12 / 6.0 = 2.0 A (1)',
        '(d) V = I × R = 2.0 × 2.0 = 4.0 V (1)',
      ],
      marks: 5,
      explanation:
        'Work inwards: reduce the parallel pair to a single resistance, add it to the series resistor, then use the total to find the current. Because the parallel pair is in series with the 4.0 Ω resistor, the same 2.0 A flows through both, so the p.d. across the pair follows from V = IR.',
      hint: 'Reduce the parallel pair to one resistor first, then the circuit is just two resistors in series.',
    },
  },
  {
    subject: 'physics',
    subtopic: '3.2',
    rank: 6,
    trap: 'Measuring angles from the surface instead of from the normal. Every angle in refraction is measured from the normal.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Light travels from glass of refractive index 1.5 into air.\n\n(a) Calculate the critical angle for the glass–air boundary.\n(b) State the two conditions necessary for total internal reflection.\n(c) Give one practical use of total internal reflection.',
      answer:
        '(a) 42°. (b) The light must be travelling from a denser to a less dense medium, and the angle of incidence must be greater than the critical angle. (c) Optical fibres in communications or endoscopes; prismatic reflectors.',
      markScheme: [
        '(a) sin c = 1 / n = 1 / 1.5 (1)',
        '(a) c = 42° (1)',
        '(b) Light passing from the optically denser medium into the less dense medium (1)',
        '(b) Angle of incidence greater than the critical angle (1)',
        '(c) Any valid use, e.g. optical fibre for communications, endoscope, reflecting prism in binoculars (1)',
      ],
      marks: 5,
      explanation:
        'The critical angle is the angle of incidence inside the denser medium at which the refracted ray grazes along the boundary at 90°. Both conditions in (b) are needed — candidates routinely give only the second and lose a mark, because exceeding the critical angle means nothing if the light is entering the denser medium.',
      hint: 'sin c = 1/n, and remember that "denser to less dense" is a condition in its own right.',
    },
  },
  {
    subject: 'physics',
    subtopic: '5.2',
    rank: 7,
    trap: 'Reading a half-life from the graph starting at any convenient point rather than from the initial count rate, and forgetting to subtract background radiation first.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A radioactive source has a measured count rate of 850 counts/min. The background count rate is 50 counts/min. After 30 minutes the measured count rate has fallen to 250 counts/min.\n\n(a) Explain why the background count must be subtracted.\n(b) Determine the half-life of the source.\n(c) State what is meant by "half-life".',
      answer:
        '(a) Background radiation is always present and is not from the source, so it must be removed to get the source\'s own count rate. (b) Corrected rates are 800 and 200 counts/min, a fall to one quarter, which is two half-lives in 30 min, so the half-life is 15 min. (c) The time taken for half the undecayed nuclei in a sample to decay.',
      markScheme: [
        '(a) Background radiation comes from sources other than the sample (1) and would otherwise make the measured activity too high (1)',
        '(b) Corrected counts: 850 − 50 = 800 and 250 − 50 = 200 (1)',
        '(b) 800 → 200 is a fall to a quarter, i.e. two half-lives (1)',
        '(b) half-life = 30 / 2 = 15 minutes (1)',
        '(c) Time for half the undecayed nuclei to decay, or for the activity to halve (1)',
      ],
      marks: 6,
      explanation:
        'The background subtraction is the whole point of the question. Uncorrected, 850 → 250 is not a clean fraction and the half-life cannot be read off; corrected, it is exactly two halvings. Answer (c) must refer to nuclei or activity — "the time for the source to halve" is too vague to earn the mark.',
      hint: 'Subtract the background from both readings before you compare them.',
    },
  },
  {
    subject: 'physics',
    subtopic: '2.2',
    rank: 8,
    trap: 'Using the temperature itself instead of the temperature change. E = mcΔθ needs the difference, not the final reading.',
    question: {
      type: 'NUMERICAL',
      difficulty: 'STANDARD',
      stem:
        'A 2.0 kg block of aluminium is heated from 20 °C to 70 °C. The specific heat capacity of aluminium is 900 J/(kg·°C). Calculate the thermal energy supplied.',
      answer: '90 000 J (90 kJ)',
      markScheme: [
        'Δθ = 70 − 20 = 50 °C (1)',
        'E = mcΔθ = 2.0 × 900 × 50 (1)',
        'E = 90 000 J or 90 kJ, unit required (1)',
      ],
      marks: 3,
      explanation:
        'Specific heat capacity is the energy needed to raise 1 kg of a substance by 1 °C, so the equation multiplies by both the mass and the temperature *rise*. Using 70 instead of 50 is the commonest error and loses every mark after the first.',
      hint: 'Δθ means the change in temperature.',
    },
  },
  {
    subject: 'physics',
    subtopic: '4.5',
    rank: 9,
    trap: 'Inverting the transformer ratio. More turns on the secondary means a higher secondary voltage — check your answer against that before writing it down.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'A transformer has 200 turns on its primary coil and 5000 turns on its secondary coil. The primary is connected to a 230 V a.c. supply.\n\n(a) Calculate the secondary voltage.\n(b) State whether this is a step-up or a step-down transformer.\n(c) Explain why a transformer will not work with a d.c. supply.',
      answer:
        '(a) 5750 V. (b) Step-up. (c) A transformer needs a changing magnetic field to induce a voltage in the secondary; a steady d.c. current produces a constant field, so no e.m.f. is induced.',
      markScheme: [
        '(a) V_s / V_p = N_s / N_p (1)',
        '(a) V_s = 230 × 5000 / 200 = 5750 V (1)',
        '(b) Step-up (1)',
        '(c) A changing magnetic field is required to induce an e.m.f. (1)',
        '(c) d.c. gives a constant field, so no e.m.f. is induced in the secondary (1)',
      ],
      marks: 5,
      explanation:
        'The turns ratio and the voltage ratio are the same way round. Part (c) is asked in some form nearly every series and needs both halves: the requirement for a *changing* field, and the statement that d.c. does not provide one.',
      hint: 'More turns on the secondary means more volts out.',
    },
  },
  {
    subject: 'physics',
    subtopic: '1.8',
    rank: 10,
    trap: 'Leaving the depth in centimetres. Every quantity in p = ρgh must be in SI units or the answer is out by a factor of 100.',
    question: {
      type: 'NUMERICAL',
      difficulty: 'STANDARD',
      stem:
        'Calculate the pressure due to the water at a depth of 15 m in a lake. The density of water is 1000 kg/m³ and g = 10 N/kg.',
      answer: '150 000 Pa (150 kPa)',
      markScheme: [
        'p = ρgh (1)',
        'p = 1000 × 10 × 15 (1)',
        'p = 150 000 Pa or 150 kPa, unit required (1)',
      ],
      marks: 3,
      explanation:
        'This gives the pressure due to the water alone. If a question asks for the total pressure on a diver it wants atmospheric pressure added on top, so read whether the question says "due to the water" or "total".',
      hint: 'Check whether the question wants the water pressure alone or the total.',
    },
  },
  {
    subject: 'physics',
    subtopic: '3.3',
    rank: 11,
    trap: 'Getting the order of the spectrum backwards. Radio waves have the longest wavelength and lowest frequency; gamma rays the shortest and highest.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'FOUNDATION',
      stem:
        '(a) List the seven regions of the electromagnetic spectrum in order of increasing frequency.\n(b) State the speed of all electromagnetic waves in a vacuum.\n(c) Give one use and one danger of ultraviolet radiation.',
      answer:
        '(a) Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. (b) 3.0 × 10⁸ m/s. (c) Use: sterilising water, detecting forged banknotes, or sun tanning lamps. Danger: damage to skin cells causing skin cancer, or eye damage.',
      markScheme: [
        '(a) All seven regions named (1) in the correct order (1)',
        '(b) 3.0 × 10⁸ m/s (1)',
        '(c) One valid use (1)',
        '(c) One valid danger (1)',
      ],
      marks: 5,
      explanation:
        'All electromagnetic waves travel at the same speed in a vacuum — that is the point of the family. Increasing frequency means decreasing wavelength, so an "increasing wavelength" question is the same list reversed. Read which one is asked for.',
      hint: 'Increasing frequency is the opposite order to increasing wavelength.',
    },
  },
  {
    subject: 'physics',
    subtopic: '2.3',
    rank: 12,
    trap: 'Explaining convection without saying the fluid becomes less dense and rises. Naming the process is not explaining it.',
    question: {
      type: 'STRUCTURED',
      difficulty: 'STANDARD',
      stem:
        'Explain, in terms of particles, how thermal energy is transferred through a metal by conduction, and explain why convection cannot occur in a solid.',
      answer:
        'Particles at the hot end vibrate faster and with greater kinetic energy. They collide with neighbouring particles and pass energy along the lattice. In a metal, free (delocalised) electrons also gain kinetic energy, move through the metal and transfer energy by collision, which is why metals conduct far better than non-metals. Convection cannot occur in a solid because the particles are held in fixed positions and cannot move from place to place, so no bulk flow of matter is possible.',
      markScheme: [
        'Particles at the hot end vibrate more / gain kinetic energy (1)',
        'They collide with neighbouring particles and pass energy on (1)',
        'Metals additionally contain free / delocalised electrons (1)',
        'These move through the metal and transfer energy by collision, making conduction much faster (1)',
        'In a solid the particles are in fixed positions and cannot move through the material (1)',
        'Convection requires a bulk flow of the material, so it cannot happen (1)',
      ],
      marks: 6,
      explanation:
        'Two mechanisms are being asked for, and the free-electron one carries the marks that separate grades. For convection the examiner wants the impossibility traced back to particle mobility, not just the assertion that solids do not convect.',
      hint: 'Metals have a second mechanism that non-metals do not.',
    },
  },
];
