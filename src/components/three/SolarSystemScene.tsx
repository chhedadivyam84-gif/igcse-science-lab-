'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Solar System viewer for topic 6.1.
 *
 * Orbital radii and periods use real *ratios*, compressed logarithmically so
 * Neptune fits on screen without Mercury vanishing. The panel states this, so
 * nobody reads the picture as being to scale.
 */

type Planet = {
  name: string;
  /** Mean orbital radius in astronomical units. */
  au: number;
  /** Orbital period in Earth years. */
  years: number;
  /** Equatorial radius relative to Earth. */
  size: number;
  colour: string;
  fact: string;
};

const PLANETS: Planet[] = [
  { name: 'Mercury', au: 0.39, years: 0.24, size: 0.38, colour: '#a8a29e', fact: 'Closest to the Sun and the fastest orbit — one year is just 88 Earth days.' },
  { name: 'Venus', au: 0.72, years: 0.62, size: 0.95, colour: '#e0b980', fact: 'A thick carbon dioxide atmosphere traps energy, making it the hottest planet.' },
  { name: 'Earth', au: 1.0, years: 1.0, size: 1.0, colour: '#3b82f6', fact: 'The only planet where liquid water is stable on the surface.' },
  { name: 'Mars', au: 1.52, years: 1.88, size: 0.53, colour: '#c1440e', fact: 'A thin atmosphere and iron oxide dust give it its colour.' },
  { name: 'Jupiter', au: 5.2, years: 11.86, size: 3.5, colour: '#d9a066', fact: 'The most massive planet — over 300 times the mass of Earth.' },
  { name: 'Saturn', au: 9.54, years: 29.46, size: 3.0, colour: '#e3d3a0', fact: 'Its ring system is made of countless pieces of ice and rock in orbit.' },
  { name: 'Uranus', au: 19.2, years: 84.01, size: 2.0, colour: '#7dd3fc', fact: 'Rotates on its side, so its poles take turns facing the Sun.' },
  { name: 'Neptune', au: 30.1, years: 164.8, size: 1.94, colour: '#4f6df5', fact: 'The furthest planet — the weak gravitational field there means a very slow orbit.' },
];

/** Compresses the huge range of orbital radii into something viewable. */
function displayRadius(au: number) {
  return 1.6 + Math.log10(au + 1) * 3.4;
}

function PlanetBody({
  planet,
  timeScale,
  onSelect,
  selected,
}: {
  planet: Planet;
  timeScale: number;
  onSelect: (planet: Planet) => void;
  selected: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  const radius = displayRadius(planet.au);
  const size = 0.09 + Math.log10(planet.size + 1) * 0.22;

  useFrame((state) => {
    if (!group.current) return;
    // Angular speed ∝ 1 / period, which is what makes outer planets crawl.
    const angle = reduced
      ? (planet.au * 1.7) % (Math.PI * 2)
      : (state.clock.elapsedTime * timeScale) / planet.years;
    group.current.position.x = Math.cos(angle) * radius;
    group.current.position.z = Math.sin(angle) * radius;
  });

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.004, 6, 128]} />
        <meshBasicMaterial color={selected ? '#38bdf8' : '#64748b'} transparent opacity={selected ? 0.8 : 0.3} />
      </mesh>
      <group ref={group}>
        <mesh
          onClick={(event) => {
            event.stopPropagation();
            onSelect(planet);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color={planet.colour} roughness={0.7} />
        </mesh>
        {selected && (
          <Html center distanceFactor={12} position={[0, size + 0.3, 0]}>
            <span className="whitespace-nowrap rounded-full bg-[rgb(var(--surface))] px-2 py-0.5 text-[10px] font-semibold text-[rgb(var(--text))] shadow">
              {planet.name}
            </span>
          </Html>
        )}
      </group>
    </>
  );
}

function Sun() {
  const reduced = usePrefersReducedMotion();
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (reduced || !mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshBasicMaterial color="#fbbf24" />
    </mesh>
  );
}

export default function SolarSystemScene() {
  const [selected, setSelected] = useState<Planet | null>(PLANETS[2]);
  const [timeScale, setTimeScale] = useState(1.2);
  const stars = useMemo(() => {
    const positions = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const r = 30 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-3 lg:flex-row">
      <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-card border border-line bg-[rgb(var(--surface-0))]">
        <Canvas camera={{ position: [0, 9, 14], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.25} />
          <pointLight position={[0, 0, 0]} intensity={90} color="#fde68a" />
          <points geometry={stars}>
            <pointsMaterial color="#94a3b8" size={0.08} transparent opacity={0.6} />
          </points>
          <Sun />
          {PLANETS.map((planet) => (
            <PlanetBody
              key={planet.name}
              planet={planet}
              timeScale={timeScale}
              onSelect={setSelected}
              selected={selected?.name === planet.name}
            />
          ))}
          <OrbitControls enablePan={false} minDistance={5} maxDistance={40} />
        </Canvas>

        <div className="pointer-events-none absolute bottom-2 left-3 text-[10px] text-ink-faint">
          Drag to orbit · scroll to zoom · click a planet
        </div>
      </div>

      <div className="w-full shrink-0 space-y-3 lg:w-72">
        <div className="rounded-card border border-line bg-surface p-4">
          <p className="eyebrow mb-2">Selected</p>
          {selected ? (
            <>
              <h3 className="text-base font-semibold text-ink">{selected.name}</h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Orbital radius</dt>
                  <dd className="font-mono text-ink">{selected.au} AU</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Orbital period</dt>
                  <dd className="font-mono text-ink">{selected.years} yr</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Radius (Earth = 1)</dt>
                  <dd className="font-mono text-ink">{selected.size}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-ink-muted">{selected.fact}</p>
            </>
          ) : (
            <p className="text-sm text-ink-muted">Click a planet to see its data.</p>
          )}
        </div>

        <div className="rounded-card border border-line bg-surface p-4">
          <label className="mb-1.5 block text-sm text-ink-muted" htmlFor="orbit-speed">
            Animation speed
          </label>
          <input
            id="orbit-speed"
            type="range"
            min={0}
            max={4}
            step={0.1}
            value={timeScale}
            onChange={(event) => setTimeScale(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-raised accent-[rgb(var(--accent))]"
          />
          <p className="mt-3 text-xs text-ink-muted">
            Orbital radii and periods use real ratios, but distances are compressed logarithmically and
            planet sizes are exaggerated — otherwise Neptune would be off-screen and Mercury invisible.
          </p>
        </div>
      </div>
    </div>
  );
}
