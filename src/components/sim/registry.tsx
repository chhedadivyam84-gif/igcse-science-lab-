'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { Skeleton } from '@/components/ui';
import { AVAILABLE_SIMULATIONS } from './available';

/**
 * Simulation registry.
 *
 * Each entry is code-split, so opening one simulation never downloads the
 * others. A slug with no entry here renders the "planned" card in the lab
 * rather than a button that does nothing — availability is derived from this
 * map, never hard-coded in the catalogue.
 */

const loading = () => <Skeleton className="h-96 w-full" />;

export const SIMULATIONS: Record<string, ComponentType> = {
  'projectile-motion': dynamic(() => import('./physics-motion').then((m) => m.ProjectileMotion), { loading }),
  'moments-balance': dynamic(() => import('./physics-motion').then((m) => m.MomentsBalance), { loading }),
  'ohms-law': dynamic(() => import('./physics-electricity').then((m) => m.OhmsLaw), { loading }),
  'circuit-builder': dynamic(() => import('./physics-electricity').then((m) => m.CircuitBuilder), { loading }),
  'wave-machine': dynamic(() => import('./physics-waves').then((m) => m.WaveMachine), { loading }),
  'ray-optics': dynamic(() => import('./physics-waves').then((m) => m.RayOptics), { loading }),
  'half-life': dynamic(() => import('./physics-waves').then((m) => m.HalfLife), { loading }),
  'particle-model': dynamic(() => import('./chemistry-sims').then((m) => m.ParticleModel), { loading }),
  'rates-lab': dynamic(() => import('./chemistry-sims').then((m) => m.RatesLab), { loading }),
  'ph-titration': dynamic(() => import('./chemistry-sims').then((m) => m.PhTitration), { loading }),
  'atom-shells': dynamic(() => import('./chemistry-structure').then((m) => m.AtomShells), { loading }),
  'electrolysis-cell': dynamic(() => import('./chemistry-structure').then((m) => m.ElectrolysisCell), { loading }),
  'diffusion-tube': dynamic(() => import('./chemistry-structure').then((m) => m.DiffusionTube), { loading }),
  'solar-system': dynamic(() => import('./ThreeSims').then((m) => m.SolarSystemSim), {
    ssr: false,
    loading,
  }),
  'molecule-viewer': dynamic(() => import('./ThreeSims').then((m) => m.MoleculeSim), {
    ssr: false,
    loading,
  }),
  'osmosis-lab': dynamic(() => import('./biology-sims').then((m) => m.OsmosisLab), { loading }),
  'enzyme-lab': dynamic(() => import('./biology-sims').then((m) => m.EnzymeLab), { loading }),
  'photosynthesis-lab': dynamic(() => import('./biology-sims').then((m) => m.PhotosynthesisLab), { loading }),
  'quadratic-explorer': dynamic(() => import('./maths-sims').then((m) => m.QuadraticExplorer), { loading }),
  'circle-theorems': dynamic(() => import('./maths-sims').then((m) => m.CircleTheorems), { loading }),
  transformations: dynamic(() => import('./maths-sims').then((m) => m.Transformations), { loading }),
  'validation-checker': dynamic(() => import('./ict-sims').then((m) => m.ValidationChecker), { loading }),
  'spreadsheet-references': dynamic(() => import('./ict-sims').then((m) => m.SpreadsheetReferences), { loading }),
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
