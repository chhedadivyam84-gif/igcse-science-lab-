'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * 3D viewer for the covalent molecules named in IGCSE Chemistry.
 *
 * Geometries are the real VSEPR shapes (tetrahedral, bent, trigonal pyramidal,
 * linear, planar), not decorative arrangements — the shape is the teaching point.
 */

type Atom = { element: string; position: [number, number, number] };
type Bond = { a: number; b: number; order: 1 | 2 | 3 };

type Molecule = {
  key: string;
  name: string;
  formula: string;
  shape: string;
  atoms: Atom[];
  bonds: Bond[];
  note: string;
};

const ELEMENT_COLOUR: Record<string, string> = {
  H: '#e2e8f0',
  C: '#475569',
  O: '#ef4444',
  N: '#3b82f6',
  Cl: '#22c55e',
  S: '#eab308',
  Br: '#b45309',
};

const ELEMENT_RADIUS: Record<string, number> = {
  H: 0.25,
  C: 0.42,
  O: 0.4,
  N: 0.4,
  Cl: 0.5,
  S: 0.5,
  Br: 0.55,
};

// Tetrahedral unit vectors, used for CH4 and (minus one arm) NH3.
const T = 0.63;

export const MOLECULES: Molecule[] = [
  {
    key: 'water',
    name: 'Water',
    formula: 'H₂O',
    shape: 'Bent, about 104.5°',
    atoms: [
      { element: 'O', position: [0, 0, 0] },
      { element: 'H', position: [0.79, 0.61, 0] },
      { element: 'H', position: [-0.79, 0.61, 0] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 0, b: 2, order: 1 },
    ],
    note: 'Oxygen shares one electron pair with each hydrogen. Two lone pairs push the bonds together, giving the bent shape.',
  },
  {
    key: 'methane',
    name: 'Methane',
    formula: 'CH₄',
    shape: 'Tetrahedral, 109.5°',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'H', position: [T, T, T] },
      { element: 'H', position: [-T, -T, T] },
      { element: 'H', position: [-T, T, -T] },
      { element: 'H', position: [T, -T, -T] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 0, b: 2, order: 1 },
      { a: 0, b: 3, order: 1 },
      { a: 0, b: 4, order: 1 },
    ],
    note: 'Carbon forms four single covalent bonds. Four shared pairs repel equally, so the shape is tetrahedral.',
  },
  {
    key: 'ammonia',
    name: 'Ammonia',
    formula: 'NH₃',
    shape: 'Trigonal pyramidal',
    atoms: [
      { element: 'N', position: [0, 0.15, 0] },
      { element: 'H', position: [0.9, -0.3, 0] },
      { element: 'H', position: [-0.45, -0.3, 0.78] },
      { element: 'H', position: [-0.45, -0.3, -0.78] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 0, b: 2, order: 1 },
      { a: 0, b: 3, order: 1 },
    ],
    note: 'Nitrogen shares three electron pairs and keeps one lone pair, which pushes the hydrogens down into a pyramid.',
  },
  {
    key: 'carbon-dioxide',
    name: 'Carbon dioxide',
    formula: 'CO₂',
    shape: 'Linear',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [1.16, 0, 0] },
      { element: 'O', position: [-1.16, 0, 0] },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2, order: 2 },
    ],
    note: 'Each oxygen shares two pairs with carbon — a double bond. With only two bonding regions, the molecule is linear.',
  },
  {
    key: 'nitrogen',
    name: 'Nitrogen',
    formula: 'N₂',
    shape: 'Linear, triple bond',
    atoms: [
      { element: 'N', position: [-0.55, 0, 0] },
      { element: 'N', position: [0.55, 0, 0] },
    ],
    bonds: [{ a: 0, b: 1, order: 3 }],
    note: 'Three shared pairs make a very strong triple bond, which is why nitrogen gas is so unreactive.',
  },
  {
    key: 'ethene',
    name: 'Ethene',
    formula: 'C₂H₄',
    shape: 'Planar, C=C double bond',
    atoms: [
      { element: 'C', position: [-0.67, 0, 0] },
      { element: 'C', position: [0.67, 0, 0] },
      { element: 'H', position: [-1.24, 0.93, 0] },
      { element: 'H', position: [-1.24, -0.93, 0] },
      { element: 'H', position: [1.24, 0.93, 0] },
      { element: 'H', position: [1.24, -0.93, 0] },
    ],
    bonds: [
      { a: 0, b: 1, order: 2 },
      { a: 0, b: 2, order: 1 },
      { a: 0, b: 3, order: 1 },
      { a: 1, b: 4, order: 1 },
      { a: 1, b: 5, order: 1 },
    ],
    note: 'The C=C double bond makes ethene unsaturated — it is what decolourises bromine water in an addition reaction.',
  },
  {
    key: 'hydrogen-chloride',
    name: 'Hydrogen chloride',
    formula: 'HCl',
    shape: 'Linear',
    atoms: [
      { element: 'H', position: [-0.62, 0, 0] },
      { element: 'Cl', position: [0.62, 0, 0] },
    ],
    bonds: [{ a: 0, b: 1, order: 1 }],
    note: 'One shared pair. In water it dissociates fully into H⁺ and Cl⁻ ions, which is why it is a strong acid.',
  },
  {
    key: 'ethanol',
    name: 'Ethanol',
    formula: 'C₂H₅OH',
    shape: 'Tetrahedral about each carbon',
    atoms: [
      { element: 'C', position: [-0.75, 0, 0] },
      { element: 'C', position: [0.65, 0.1, 0] },
      { element: 'O', position: [1.3, -1.05, 0] },
      { element: 'H', position: [2.2, -0.95, 0] },
      { element: 'H', position: [-1.15, 0.55, 0.85] },
      { element: 'H', position: [-1.15, 0.55, -0.85] },
      { element: 'H', position: [-1.15, -1.0, 0] },
      { element: 'H', position: [1.0, 0.68, 0.86] },
      { element: 'H', position: [1.0, 0.68, -0.86] },
    ],
    bonds: [
      { a: 0, b: 1, order: 1 },
      { a: 1, b: 2, order: 1 },
      { a: 2, b: 3, order: 1 },
      { a: 0, b: 4, order: 1 },
      { a: 0, b: 5, order: 1 },
      { a: 0, b: 6, order: 1 },
      { a: 1, b: 7, order: 1 },
      { a: 1, b: 8, order: 1 },
    ],
    note: 'The −OH group is the functional group of the alcohols, and is what the whole homologous series is named for.',
  },
];

function BondMesh({ from, to, order }: { from: THREE.Vector3; to: THREE.Vector3; order: 1 | 2 | 3 }) {
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const direction = to.clone().sub(from);
  const length = direction.length();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize(),
  );

  // Offsets are perpendicular to the bond, so double/triple bonds read clearly.
  const perpendicular = new THREE.Vector3(0, 0, 1).cross(direction).normalize();
  if (perpendicular.lengthSq() < 0.01) perpendicular.set(1, 0, 0);
  const spacing = 0.09;
  const offsets =
    order === 1 ? [0] : order === 2 ? [-spacing, spacing] : [-spacing * 1.6, 0, spacing * 1.6];

  return (
    <>
      {offsets.map((offset, index) => (
        <mesh
          key={index}
          position={mid.clone().add(perpendicular.clone().multiplyScalar(offset))}
          quaternion={quaternion}
        >
          <cylinderGeometry args={[0.055, 0.055, length, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.5} />
        </mesh>
      ))}
    </>
  );
}

function Model({ molecule, showLabels }: { molecule: Molecule; showLabels: boolean }) {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((state) => {
    if (reduced || !group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.28;
  });

  const vectors = useMemo(
    () => molecule.atoms.map((atom) => new THREE.Vector3(...atom.position)),
    [molecule],
  );

  return (
    <group ref={group}>
      {molecule.bonds.map((bond, index) => (
        <BondMesh key={index} from={vectors[bond.a]} to={vectors[bond.b]} order={bond.order} />
      ))}
      {molecule.atoms.map((atom, index) => (
        <group key={index} position={atom.position}>
          <mesh>
            <sphereGeometry args={[ELEMENT_RADIUS[atom.element] ?? 0.4, 32, 32]} />
            <meshStandardMaterial
              color={ELEMENT_COLOUR[atom.element] ?? '#94a3b8'}
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>
          {showLabels && (
            <Html center distanceFactor={8}>
              <span className="pointer-events-none select-none text-[11px] font-bold text-[rgb(var(--surface-0))]">
                {atom.element}
              </span>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

export default function MoleculeScene({ molecule: initial }: { molecule?: string }) {
  const [key, setKey] = useState(initial && MOLECULES.some((m) => m.key === initial) ? initial : 'water');
  const [showLabels, setShowLabels] = useState(true);
  const molecule = MOLECULES.find((m) => m.key === key) ?? MOLECULES[0];

  return (
    <div className="flex h-full w-full flex-col gap-3 lg:flex-row">
      <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-card border border-line bg-surface">
        <Canvas camera={{ position: [0, 0.8, 4.6], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={2} />
          <directionalLight position={[-3, -2, -4]} intensity={0.6} />
          <Model molecule={molecule} showLabels={showLabels} />
          <OrbitControls enablePan={false} minDistance={2.5} maxDistance={9} />
        </Canvas>
        <div className="pointer-events-none absolute bottom-2 left-3 text-[10px] text-ink-faint">
          Drag to rotate · scroll to zoom
        </div>
      </div>

      <div className="w-full shrink-0 space-y-3 lg:w-72">
        <div className="rounded-card border border-line bg-surface p-4">
          <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="molecule-picker">
            Molecule
          </label>
          <select
            id="molecule-picker"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            className="w-full cursor-pointer rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          >
            {MOLECULES.map((m) => (
              <option key={m.key} value={m.key}>
                {m.name} — {m.formula}
              </option>
            ))}
          </select>

          <h3 className="mt-4 text-base font-semibold text-ink">
            {molecule.name} <span className="font-mono text-sm text-ink-muted">{molecule.formula}</span>
          </h3>
          <p className="mt-1 text-sm text-chemistry">{molecule.shape}</p>
          <p className="mt-2 text-sm text-ink-muted">{molecule.note}</p>

          <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(event) => setShowLabels(event.target.checked)}
              className="h-4 w-4 accent-[rgb(var(--accent))]"
            />
            Show element symbols
          </label>
        </div>

        <div className="rounded-card border border-line bg-surface p-4">
          <p className="eyebrow mb-2">Bond key</p>
          <ul className="space-y-1 text-sm text-ink-muted">
            <li>One rod = one shared pair (single bond)</li>
            <li>Two rods = two shared pairs (double bond)</li>
            <li>Three rods = three shared pairs (triple bond)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
