/**
 * Keys of the simulations that are actually implemented.
 *
 * Server components read this to decide whether a catalogue entry links to a
 * working simulation or renders as "planned". `registry.tsx` asserts in
 * development that this list matches the components it actually exports, so the
 * two cannot drift apart and promise something that does not exist.
 */
export const AVAILABLE_SIMULATIONS = [
  'projectile-motion',
  'moments-balance',
  'ohms-law',
  'circuit-builder',
  'wave-machine',
  'ray-optics',
  'half-life',
  'particle-model',
  'rates-lab',
  'ph-titration',
  'atom-shells',
  'electrolysis-cell',
  'diffusion-tube',
  'solar-system',
  'molecule-viewer',
  'osmosis-lab',
  'enzyme-lab',
  'photosynthesis-lab',
  'quadratic-explorer',
  'circle-theorems',
  'transformations',
  'validation-checker',
  'spreadsheet-references',
] as const;

export type AvailableSimulation = (typeof AVAILABLE_SIMULATIONS)[number];

export function isSimulationAvailable(component: string): boolean {
  return (AVAILABLE_SIMULATIONS as readonly string[]).includes(component);
}
