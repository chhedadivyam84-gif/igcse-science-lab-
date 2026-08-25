'use client';

import type { ComponentType } from 'react';
import { AVAILABLE_SIMULATIONS } from './available';

import { ProjectileMotion, MomentsBalance } from './physics-motion';
import { OhmsLaw, CircuitBuilder } from './physics-electricity';
import { WaveMachine, RayOptics, HalfLife } from './physics-waves';
import { ParticleModel, RatesLab, PhTitration } from './chemistry-sims';
import { AtomShells, ElectrolysisCell, DiffusionTube } from './chemistry-structure';
import { OsmosisLab, EnzymeLab, PhotosynthesisLab } from './biology-sims';
import { QuadraticExplorer, CircleTheorems, Transformations } from './maths-sims';
import { ValidationChecker, SpreadsheetReferences } from './ict-sims';
import { SolarSystemSim, MoleculeSim } from './ThreeSims';

/**
 * Simulation registry.
 *
 * The two-dimensional simulations are imported statically. They used to be
 * code-split with next/dynamic, which worked locally and silently failed in
 * production: the server rendered the simulation, the browser downloaded the
 * chunk, and the client never executed it — so every control was inert HTML.
 * Nothing in the console, nothing failing, just a page that did not respond.
 * Every simulation on the site was affected.
 *
 * They are all SVG and canvas drawing with no heavy dependencies, and they load
 * on this route only, so importing them directly costs little and removes the
 * failure mode entirely.
 *
 * The 3D wrappers are imported directly too. They contain no three.js
 * themselves — they render LazyScene, which loads the real scenes only once the
 * canvas scrolls into view, via `import('./Scene')` against a default export.
 * That is the form that works. The broken one was
 * `import('./x').then((m) => m.Named)`, whose module the production client
 * manifest never wired up, so three.js is still never downloaded by someone
 * opening a spring diagram.
 */

export const SIMULATIONS: Record<string, ComponentType> = {
  'projectile-motion': ProjectileMotion,
  'moments-balance': MomentsBalance,
  'ohms-law': OhmsLaw,
  'circuit-builder': CircuitBuilder,
  'wave-machine': WaveMachine,
  'ray-optics': RayOptics,
  'half-life': HalfLife,
  'particle-model': ParticleModel,
  'rates-lab': RatesLab,
  'ph-titration': PhTitration,
  'atom-shells': AtomShells,
  'electrolysis-cell': ElectrolysisCell,
  'diffusion-tube': DiffusionTube,
  'osmosis-lab': OsmosisLab,
  'enzyme-lab': EnzymeLab,
  'photosynthesis-lab': PhotosynthesisLab,
  'quadratic-explorer': QuadraticExplorer,
  'circle-theorems': CircleTheorems,
  transformations: Transformations,
  'validation-checker': ValidationChecker,
  'spreadsheet-references': SpreadsheetReferences,
  'solar-system': SolarSystemSim,
  'molecule-viewer': MoleculeSim,
};

// Guard against the catalogue promising a simulation the registry cannot render.
if (process.env.NODE_ENV !== 'production') {
  const registered = Object.keys(SIMULATIONS).sort();
  const declared = [...AVAILABLE_SIMULATIONS].sort();
  if (registered.join('|') !== declared.join('|')) {
    console.error(
      'Simulation registry mismatch.\n  registry.tsx: %s\n  available.ts: %s',
      registered.join(', '),
      declared.join(', '),
    );
  }
}

export function hasSimulation(component: string): boolean {
  return component in SIMULATIONS;
}

export function SimulationRunner({ component }: { component: string }) {
  const Simulation = SIMULATIONS[component];
  if (!Simulation) return null;
  return <Simulation />;
}
