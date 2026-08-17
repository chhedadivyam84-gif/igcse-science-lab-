import type { DefinitionSeed } from './types';

/**
 * Definitions are frequently all-or-nothing marks, so each one carries the
 * plain statement *and* the phrasing an examiner expects where they differ.
 */
export const definitions: DefinitionSeed[] = [
  // --- Physics -------------------------------------------------------------
  { subject: 'physics', subtopicNumber: '1.1', term: 'Scalar quantity', statement: 'A quantity that has magnitude only.' },
  { subject: 'physics', subtopicNumber: '1.1', term: 'Vector quantity', statement: 'A quantity that has both magnitude and direction.' },
  { subject: 'physics', subtopicNumber: '1.2', term: 'Speed', statement: 'The distance travelled per unit time.' },
  { subject: 'physics', subtopicNumber: '1.2', term: 'Velocity', statement: 'Speed in a given direction, or the rate of change of displacement.' },
  { subject: 'physics', subtopicNumber: '1.2', term: 'Acceleration', statement: 'The change in velocity per unit time.' },
  {
    subject: 'physics',
    subtopicNumber: '1.2',
    term: 'Terminal velocity',
    statement: 'The constant velocity reached by a falling object when air resistance equals its weight.',
    examWording: 'The velocity at which the resultant force on a falling object is zero, so it no longer accelerates.',
  },
  { subject: 'physics', subtopicNumber: '1.3', term: 'Mass', statement: 'A measure of the quantity of matter in an object, measured in kilograms.' },
  {
    subject: 'physics',
    subtopicNumber: '1.3',
    term: 'Weight',
    statement: 'The force acting on an object due to a gravitational field.',
    examWording: 'The gravitational force on an object, W = mg, measured in newtons.',
  },
  { subject: 'physics', subtopicNumber: '1.4', term: 'Density', statement: 'Mass per unit volume.' },
  {
    subject: 'physics',
    subtopicNumber: '1.5',
    term: 'Moment of a force',
    statement: 'The turning effect of a force about a pivot.',
    examWording: 'Moment = force × perpendicular distance from the pivot.',
  },
  {
    subject: 'physics',
    subtopicNumber: '1.5',
    term: 'Principle of moments',
    statement:
      'For a body in equilibrium, the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about that point.',
  },
  {
    subject: 'physics',
    subtopicNumber: '1.5',
    term: 'Limit of proportionality',
    statement: 'The point beyond which the extension of a spring is no longer directly proportional to the load.',
  },
  { subject: 'physics', subtopicNumber: '1.6', term: 'Momentum', statement: 'The product of mass and velocity, p = mv.' },
  {
    subject: 'physics',
    subtopicNumber: '1.7',
    term: 'Principle of conservation of energy',
    statement: 'Energy cannot be created or destroyed; it can only be transferred from one store to another.',
  },
  { subject: 'physics', subtopicNumber: '1.7', term: 'Work done', statement: 'The energy transferred when a force moves an object through a distance in the direction of the force.' },
  { subject: 'physics', subtopicNumber: '1.7', term: 'Power', statement: 'The rate of energy transfer, or the rate of doing work.' },
  { subject: 'physics', subtopicNumber: '1.7', term: 'Efficiency', statement: 'The fraction of the total input energy that is transferred usefully.' },
  { subject: 'physics', subtopicNumber: '1.8', term: 'Pressure', statement: 'Force per unit area.' },
  {
    subject: 'physics',
    subtopicNumber: '2.1',
    term: 'Evaporation',
    statement:
      'The escape of the more energetic particles from the surface of a liquid, which can occur at any temperature and cools the remaining liquid.',
  },
  {
    subject: 'physics',
    subtopicNumber: '2.2',
    term: 'Specific heat capacity',
    statement: 'The energy required to raise the temperature of 1 kg of a substance by 1 °C.',
  },
  { subject: 'physics', subtopicNumber: '3.1', term: 'Wavelength', statement: 'The distance between two neighbouring points in phase on a wave, such as crest to crest.' },
  { subject: 'physics', subtopicNumber: '3.1', term: 'Frequency', statement: 'The number of complete waves passing a point per second.' },
  { subject: 'physics', subtopicNumber: '3.1', term: 'Amplitude', statement: 'The maximum displacement of a point on a wave from its undisturbed position.' },
  { subject: 'physics', subtopicNumber: '3.1', term: 'Transverse wave', statement: 'A wave in which the oscillations are perpendicular to the direction of energy transfer.' },
  { subject: 'physics', subtopicNumber: '3.1', term: 'Longitudinal wave', statement: 'A wave in which the oscillations are parallel to the direction of energy transfer.' },
  { subject: 'physics', subtopicNumber: '3.1', term: 'Diffraction', statement: 'The spreading of a wave as it passes through a gap or around an edge.' },
  {
    subject: 'physics',
    subtopicNumber: '3.2',
    term: 'Critical angle',
    statement: 'The angle of incidence in the denser medium for which the angle of refraction is 90°.',
  },
  {
    subject: 'physics',
    subtopicNumber: '3.2',
    term: 'Total internal reflection',
    statement:
      'The complete reflection of light back into a denser medium when the angle of incidence exceeds the critical angle.',
  },
  { subject: 'physics', subtopicNumber: '4.2', term: 'Electric current', statement: 'The rate of flow of electric charge.' },
  {
    subject: 'physics',
    subtopicNumber: '4.2',
    term: 'Potential difference',
    statement: 'The energy transferred per unit charge passing between two points in a circuit.',
    examWording: 'Work done per unit charge; one volt is one joule per coulomb.',
  },
  { subject: 'physics', subtopicNumber: '4.2', term: 'Resistance', statement: 'The ratio of potential difference across a component to the current through it.' },
  {
    subject: 'physics',
    subtopicNumber: '4.2',
    term: "Ohm's law",
    statement:
      'For a metallic conductor at constant temperature, the current through it is directly proportional to the potential difference across it.',
  },
  {
    subject: 'physics',
    subtopicNumber: '4.5',
    term: 'Electromagnetic induction',
    statement:
      'The production of an e.m.f. across a conductor when it cuts magnetic field lines, or when the magnetic field through a coil changes.',
  },
  { subject: 'physics', subtopicNumber: '5.1', term: 'Proton number', statement: 'The number of protons in the nucleus of an atom.' },
  { subject: 'physics', subtopicNumber: '5.1', term: 'Nucleon number', statement: 'The total number of protons and neutrons in the nucleus of an atom.' },
  {
    subject: 'physics',
    subtopicNumber: '5.2',
    term: 'Half-life',
    statement: 'The time taken for half the radioactive nuclei in a sample to decay.',
    examWording: 'The time taken for the activity (count rate) of a sample to fall to half its initial value.',
  },
  {
    subject: 'physics',
    subtopicNumber: '5.2',
    term: 'Background radiation',
    statement: 'The low level of ionising radiation always present from natural and artificial sources in the environment.',
  },

  // --- Chemistry -----------------------------------------------------------
  {
    subject: 'chemistry',
    subtopicNumber: '1.2',
    term: 'Diffusion',
    statement:
      'The net movement of particles from a region of higher concentration to a region of lower concentration, resulting from their random motion.',
  },
  { subject: 'chemistry', subtopicNumber: '2.1', term: 'Element', statement: 'A substance made of only one type of atom, which cannot be broken down chemically.' },
  { subject: 'chemistry', subtopicNumber: '2.1', term: 'Compound', statement: 'A substance in which two or more different elements are chemically combined in fixed proportions.' },
  { subject: 'chemistry', subtopicNumber: '2.1', term: 'Mixture', statement: 'Two or more substances that are not chemically combined and can be separated by physical means.' },
  {
    subject: 'chemistry',
    subtopicNumber: '2.3',
    term: 'Isotopes',
    statement: 'Atoms of the same element with the same number of protons but different numbers of neutrons.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '2.4',
    term: 'Ionic bond',
    statement: 'The strong electrostatic attraction between oppositely charged ions.',
    examWording: 'The electrostatic attraction between oppositely charged ions formed by the transfer of electrons.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '2.5',
    term: 'Covalent bond',
    statement: 'A shared pair of electrons between two atoms.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '2.7',
    term: 'Metallic bonding',
    statement:
      'The electrostatic attraction between a lattice of positive metal ions and a sea of delocalised electrons.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '3.2',
    term: 'Relative atomic mass',
    statement:
      'The average mass of the isotopes of an element, compared with 1/12 of the mass of an atom of carbon-12.',
  },
  { subject: 'chemistry', subtopicNumber: '3.3', term: 'Mole', statement: 'The amount of substance containing 6.02 × 10²³ particles (the Avogadro constant).' },
  { subject: 'chemistry', subtopicNumber: '3.3', term: 'Empirical formula', statement: 'The simplest whole-number ratio of the atoms of each element in a compound.' },
  {
    subject: 'chemistry',
    subtopicNumber: '4.1',
    term: 'Electrolysis',
    statement:
      'The breakdown of an ionic compound, when molten or in aqueous solution, by the passage of electricity.',
  },
  { subject: 'chemistry', subtopicNumber: '4.1', term: 'Electrolyte', statement: 'A molten or dissolved ionic compound that conducts electricity and is broken down by it.' },
  {
    subject: 'chemistry',
    subtopicNumber: '5.1',
    term: 'Exothermic reaction',
    statement: 'A reaction that transfers energy to the surroundings, so the temperature of the surroundings rises and ΔH is negative.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '5.1',
    term: 'Endothermic reaction',
    statement: 'A reaction that takes in energy from the surroundings, so the temperature of the surroundings falls and ΔH is positive.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '5.1',
    term: 'Activation energy',
    statement: 'The minimum energy that colliding particles must have for a reaction to occur.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '6.2',
    term: 'Catalyst',
    statement:
      'A substance that increases the rate of a reaction by providing an alternative pathway with a lower activation energy, and is not used up in the reaction.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '6.3',
    term: 'Dynamic equilibrium',
    statement:
      'The state in a closed system where the forward and reverse reactions occur at the same rate, so the concentrations of reactants and products remain constant.',
  },
  { subject: 'chemistry', subtopicNumber: '6.4', term: 'Oxidation', statement: 'The loss of electrons (or gain of oxygen), causing an increase in oxidation number.' },
  { subject: 'chemistry', subtopicNumber: '6.4', term: 'Reduction', statement: 'The gain of electrons (or loss of oxygen), causing a decrease in oxidation number.' },
  {
    subject: 'chemistry',
    subtopicNumber: '7.1',
    term: 'Acid',
    statement: 'A substance that produces H⁺ ions in aqueous solution; a proton donor.',
  },
  { subject: 'chemistry', subtopicNumber: '7.1', term: 'Base', statement: 'A substance that neutralises an acid to form a salt and water; a proton acceptor.' },
  { subject: 'chemistry', subtopicNumber: '7.1', term: 'Alkali', statement: 'A soluble base that produces OH⁻ ions in aqueous solution.' },
  {
    subject: 'chemistry',
    subtopicNumber: '7.1',
    term: 'Strong acid',
    statement: 'An acid that is fully dissociated into ions in aqueous solution.',
    examWording: 'Completely ionised in solution — distinct from "concentrated", which describes amount per volume.',
  },
  { subject: 'chemistry', subtopicNumber: '7.1', term: 'Weak acid', statement: 'An acid that is only partially dissociated into ions in aqueous solution.' },
  { subject: 'chemistry', subtopicNumber: '7.2', term: 'Amphoteric oxide', statement: 'An oxide that reacts with both acids and bases to form a salt and water.' },
  {
    subject: 'chemistry',
    subtopicNumber: '9.3',
    term: 'Alloy',
    statement:
      'A mixture of a metal with one or more other elements, in which the different-sized atoms prevent the layers sliding, making it harder than the pure metal.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '11.1',
    term: 'Homologous series',
    statement:
      'A family of compounds with the same functional group and general formula, whose successive members differ by CH₂ and which show a gradual change in physical properties.',
  },
  { subject: 'chemistry', subtopicNumber: '11.4', term: 'Saturated hydrocarbon', statement: 'A hydrocarbon containing only single carbon–carbon bonds.' },
  { subject: 'chemistry', subtopicNumber: '11.5', term: 'Unsaturated hydrocarbon', statement: 'A hydrocarbon containing at least one carbon–carbon double bond.' },
  {
    subject: 'chemistry',
    subtopicNumber: '11.5',
    term: 'Cracking',
    statement:
      'The breaking down of large, less useful hydrocarbon molecules into smaller, more useful ones using heat and a catalyst.',
  },
  {
    subject: 'chemistry',
    subtopicNumber: '11.8',
    term: 'Addition polymerisation',
    statement: 'The joining together of many unsaturated monomer molecules to form a single long-chain polymer, with no other product.',
  },
];
