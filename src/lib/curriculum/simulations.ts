/**
 * Catalogue of simulations.
 *
 * `component` is a key into the client-side registry
 * (src/components/sim/registry.ts). If the registry has no entry for a key, the
 * Simulation Lab renders an honest "planned" card instead of a dead button —
 * the availability badge is derived from the registry, never hard-coded here.
 */
export type SimulationSeed = {
  slug: string;
  subject: 'physics' | 'chemistry';
  subtopicNumber?: string;
  title: string;
  description: string;
  component: string;
  concepts: string[];
  order: number;
};

export const simulations: SimulationSeed[] = [
  // --- Physics -------------------------------------------------------------
  {
    slug: 'projectile-motion',
    subject: 'physics',
    subtopicNumber: '1.2',
    title: 'Projectile motion',
    description:
      'Launch a ball and watch how the horizontal and vertical motions behave independently. Change the speed, angle and gravity.',
    component: 'projectile-motion',
    concepts: ['Independence of horizontal and vertical motion', 'Acceleration due to gravity', 'Range and maximum height'],
    order: 1,
  },
  {
    slug: 'moments-balance',
    subject: 'physics',
    subtopicNumber: '1.5',
    title: 'Moments and balance',
    description:
      'Hang masses on a pivoted beam and find the balance point. The clockwise and anticlockwise moments are calculated live.',
    component: 'moments-balance',
    concepts: ['Moment = force × perpendicular distance', 'Principle of moments', 'Equilibrium'],
    order: 2,
  },
  {
    slug: 'forces-lab',
    subject: 'physics',
    subtopicNumber: '1.5',
    title: 'Resultant force and acceleration',
    description: 'Apply forces to a trolley and observe the resultant force, acceleration and motion that follow from F = ma.',
    component: 'forces-lab',
    concepts: ['Resultant force', "Newton's second law", 'Friction'],
    order: 3,
  },
  {
    slug: 'energy-skate',
    subject: 'physics',
    subtopicNumber: '1.7',
    title: 'Energy transfer track',
    description: 'Follow a mass along a track and watch kinetic and gravitational potential stores exchange energy.',
    component: 'energy-skate',
    concepts: ['Conservation of energy', 'Kinetic energy', 'Gravitational potential energy'],
    order: 4,
  },
  {
    slug: 'pressure-depth',
    subject: 'physics',
    subtopicNumber: '1.8',
    title: 'Pressure and depth',
    description: 'Change the depth and liquid density and see how the pressure at a point changes.',
    component: 'pressure-depth',
    concepts: ['p = F / A', 'Δp = ρgΔh', 'Pressure acts in all directions'],
    order: 5,
  },
  {
    slug: 'gas-particles',
    subject: 'physics',
    subtopicNumber: '2.1',
    title: 'Gas particles and pressure',
    description:
      'Squeeze a container of gas or heat it, and count the collisions with the walls that create the pressure.',
    component: 'particle-model',
    concepts: ['Kinetic particle model', 'Pressure from collisions', 'p₁V₁ = p₂V₂'],
    order: 6,
  },
  {
    slug: 'wave-machine',
    subject: 'physics',
    subtopicNumber: '3.1',
    title: 'Wave machine',
    description:
      'Adjust frequency, amplitude and wave speed, and read wavelength straight off the display. Compare transverse and longitudinal waves.',
    component: 'wave-machine',
    concepts: ['v = fλ', 'Amplitude and wavelength', 'Transverse vs longitudinal'],
    order: 7,
  },
  {
    slug: 'ray-optics',
    subject: 'physics',
    subtopicNumber: '3.2',
    title: 'Refraction and total internal reflection',
    description:
      'Shine a ray into a glass block, vary the angle of incidence and find the critical angle for yourself.',
    component: 'ray-optics',
    concepts: ['n = sin i / sin r', 'Critical angle', 'Total internal reflection'],
    order: 8,
  },
  {
    slug: 'ohms-law',
    subject: 'physics',
    subtopicNumber: '4.2',
    title: "Ohm's law and I–V graphs",
    description:
      'Sweep the voltage across a resistor, a filament lamp or a diode and plot the I–V characteristic live.',
    component: 'ohms-law',
    concepts: ['V = IR', 'Non-ohmic components', 'I–V characteristics'],
    order: 9,
  },
  {
    slug: 'circuit-builder',
    subject: 'physics',
    subtopicNumber: '4.3',
    title: 'Series and parallel circuits',
    description:
      'Wire resistors in series or parallel and watch the total resistance, current and branch currents update.',
    component: 'circuit-builder',
    concepts: ['Series and parallel resistance', 'Current in branches', 'Potential difference sharing'],
    order: 10,
  },
  {
    slug: 'induction-lab',
    subject: 'physics',
    subtopicNumber: '4.5',
    title: 'Electromagnetic induction',
    description: 'Move a magnet through a coil and see the induced e.m.f. respond to speed, turns and field strength.',
    component: 'induction-lab',
    concepts: ['Electromagnetic induction', "Lenz's law", 'Factors affecting induced e.m.f.'],
    order: 11,
  },
  {
    slug: 'half-life',
    subject: 'physics',
    subtopicNumber: '5.2',
    title: 'Radioactive decay and half-life',
    description:
      'Watch a sample of unstable nuclei decay at random and measure the half-life from the decay curve.',
    component: 'half-life',
    concepts: ['Random decay', 'Half-life', 'Decay curves'],
    order: 12,
  },
  {
    slug: 'solar-system',
    subject: 'physics',
    subtopicNumber: '6.1',
    title: 'Solar System in 3D',
    description:
      'Orbit the Sun in three dimensions. Compare orbital radii and periods, and see why outer planets take longer.',
    component: 'solar-system',
    concepts: ['Orbits and gravity', 'Orbital period', 'v = 2πr / T'],
    order: 13,
  },

  // --- Chemistry -----------------------------------------------------------
  {
    slug: 'particle-model',
    subject: 'chemistry',
    subtopicNumber: '1.1',
    title: 'States of matter',
    description:
      'Heat and cool a substance and watch the particles change arrangement, separation and motion in real time.',
    component: 'particle-model',
    concepts: ['Particle arrangement', 'Changes of state', 'Temperature and kinetic energy'],
    order: 1,
  },
  {
    slug: 'diffusion-tube',
    subject: 'chemistry',
    subtopicNumber: '1.2',
    title: 'Diffusion tube',
    description:
      'Recreate the ammonia and hydrogen chloride experiment and predict where the white ring will form.',
    component: 'diffusion-tube',
    concepts: ['Diffusion', 'Relative molecular mass and speed', 'Random particle motion'],
    order: 2,
  },
  {
    slug: 'atom-shells',
    subject: 'chemistry',
    subtopicNumber: '2.2',
    title: 'Electron shells',
    description:
      'Build any of the first 20 atoms and see its electronic configuration, group and period appear.',
    component: 'atom-shells',
    concepts: ['Electronic configuration', 'Group and period', 'Shell capacities 2, 8, 8, 2'],
    order: 3,
  },
  {
    slug: 'ionic-bonding',
    subject: 'chemistry',
    subtopicNumber: '2.4',
    title: 'Ionic bonding',
    description: 'Transfer electrons between a metal and a non-metal atom and watch the ions and lattice form.',
    component: 'ionic-bonding',
    concepts: ['Electron transfer', 'Ion formation', 'Giant ionic lattice'],
    order: 4,
  },
  {
    slug: 'molecule-viewer',
    subject: 'chemistry',
    subtopicNumber: '2.5',
    title: '3D molecule viewer',
    description:
      'Rotate common IGCSE molecules in three dimensions and count the shared electron pairs in each bond.',
    component: 'molecule-viewer',
    concepts: ['Covalent bonding', 'Molecular shape', 'Shared electron pairs'],
    order: 5,
  },
  {
    slug: 'electrolysis-cell',
    subject: 'chemistry',
    subtopicNumber: '4.1',
    title: 'Electrolysis cell',
    description:
      'Choose an electrolyte and watch the ions migrate, then check the products predicted at each electrode.',
    component: 'electrolysis-cell',
    concepts: ['Ion migration', 'Anode and cathode products', 'Half equations'],
    order: 6,
  },
  {
    slug: 'rates-lab',
    subject: 'chemistry',
    subtopicNumber: '6.2',
    title: 'Rate of reaction lab',
    description:
      'Change concentration, temperature and surface area, then compare the gas-volume curves side by side.',
    component: 'rates-lab',
    concepts: ['Collision theory', 'Factors affecting rate', 'Interpreting rate graphs'],
    order: 7,
  },
  {
    slug: 'ph-titration',
    subject: 'chemistry',
    subtopicNumber: '7.1',
    title: 'Titration and pH',
    description: 'Add alkali to acid drop by drop and watch the pH curve and indicator colour change.',
    component: 'ph-titration',
    concepts: ['Neutralisation', 'pH scale', 'Titration curves'],
    order: 8,
  },
];
