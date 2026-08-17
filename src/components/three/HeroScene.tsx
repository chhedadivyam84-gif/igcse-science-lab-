'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTheme } from '@/components/theme';

/**
 * The homepage hero: an atom whose electron shells double as planetary orbits —
 * the two ideas the platform is built on, in one object.
 *
 * ## Quality tiers
 *
 * This has to look expensive on a good machine without punishing a school
 * laptop, so quality is chosen twice:
 *
 *  1. **Up front**, from CPU cores, device memory and whether the pointer is
 *     coarse — enough to keep a phone off the heavy path from the first frame.
 *  2. **Continuously**, by PerformanceMonitor watching real frame times. If the
 *     machine struggles the tier drops on the fly; nothing is guessed and left.
 *
 * Reduced-motion goes straight to the lowest tier and stops the frame loop.
 */

type Tier = 'low' | 'medium' | 'high';

const SETTINGS: Record<Tier, { particles: number; dpr: [number, number]; effects: boolean; segments: number }> = {
  low: { particles: 120, dpr: [1, 1], effects: false, segments: 0 },
  medium: { particles: 260, dpr: [1, 1.25], effects: true, segments: 1 },
  high: { particles: 520, dpr: [1, 1.75], effects: true, segments: 2 },
};

/**
 * First guess at what this device can carry, made before anything renders.
 *
 * Deliberately optimistic for anything that is plainly a desktop: because
 * PerformanceMonitor demotes on real frame times within a second or two, the
 * cost of guessing too high is a brief dip, while the cost of guessing too low
 * is that a perfectly capable machine never sees the full scene at all. Only
 * devices that are clearly constrained start below the top tier.
 */
function detectTier(): Tier {
  if (typeof window === 'undefined') return 'medium';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = window.innerWidth < 768;

  // Touch devices and narrow viewports never get the expensive path: the scene
  // is decorative there and battery matters more.
  if (coarse || small) return 'low';
  if (cores <= 2 || memory <= 2) return 'low';
  if (cores <= 3 || memory <= 4) return 'medium';
  return 'high';
}

/* -------------------------------------------------------------------------- */
/* Nucleus                                                                    */
/* -------------------------------------------------------------------------- */

function Nucleus({ colour, accent, tier }: { colour: string; accent: string; tier: Tier }) {
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.x = t * 0.1;
      shell.current.rotation.y = t * 0.14;
    }
    if (core.current) {
      // A slow breath keeps the glow from reading as a static sprite.
      core.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05);
    }
  });

  return (
    <group>
      {/* Emissive core — the light source the bloom pass picks up. */}
      <mesh ref={core}>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>

      {/* Faceted glass shell. Transmission is the expensive part, so the cheap
          tier gets a plain metallic surface instead of dropping the shell. */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.95, SETTINGS[tier].segments]} />
        {tier === 'high' ? (
          <meshPhysicalMaterial
            color={colour}
            transmission={0.82}
            thickness={1.4}
            roughness={0.16}
            metalness={0.1}
            ior={1.7}
            iridescence={1}
            iridescenceIOR={1.9}
            iridescenceThicknessRange={[100, 620]}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.6}
            flatShading
          />
        ) : (
          <meshStandardMaterial
            color={colour}
            emissive={colour}
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.7}
            flatShading
          />
        )}
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Electron shells                                                            */
/* -------------------------------------------------------------------------- */

function Shell({
  radius,
  tilt,
  speed,
  electrons,
  colour,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  electrons: number;
  colour: string;
}) {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((state) => {
    if (reduced || !group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * speed;
  });

  const positions = useMemo(
    () =>
      Array.from({ length: electrons }, (_, i) => {
        const angle = (i / electrons) * Math.PI * 2;
        return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as const;
      }),
    [electrons, radius],
  );

  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 128]} />
        <meshBasicMaterial color={colour} transparent opacity={0.32} toneMapped={false} />
      </mesh>
      <group ref={group}>
        {positions.map(([x, y, z], index) => (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            {/* toneMapped=false pushes these past the bloom threshold so the
                electrons actually glow rather than just being bright dots. */}
            <meshBasicMaterial color={colour} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Particle field                                                             */
/* -------------------------------------------------------------------------- */

function ParticleField({ count, colour }: { count: number; colour: string }) {
  const points = useRef<THREE.Points>(null);
  const reduced = usePrefersReducedMotion();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distributed on a shell so the field reads as depth, not fog.
      const radius = 4.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (reduced || !points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color={colour} size={0.03} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/* Camera rig                                                                 */
/* -------------------------------------------------------------------------- */

function Rig() {
  const reduced = usePrefersReducedMotion();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (reduced) return;
    // Gentle parallax that follows the pointer without ever losing the subject.
    target.set(state.pointer.x * 0.7, state.pointer.y * 0.4, 6.2);
    state.camera.position.lerp(target, 0.035);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/* Studio lighting                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Reflections come from Lightformers rather than a downloaded HDRI: procedural
 * means no CDN request, no licence question, and it still gives the glass
 * something to catch. The bars read as softboxes on a studio rig.
 */
function Studio({ physics, chemistry }: { physics: string; chemistry: string }) {
  return (
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[10, 4, 1]} color="#ffffff" />
      <Lightformer form="circle" intensity={5} position={[-5, 2, 3]} scale={4} color={physics} />
      <Lightformer form="circle" intensity={4} position={[5, -2, 2]} scale={3.5} color={chemistry} />
      <Lightformer form="ring" intensity={2} position={[0, -4, -3]} scale={6} color="#ffffff" />
    </Environment>
  );
}

/* -------------------------------------------------------------------------- */
/* Scene                                                                      */
/* -------------------------------------------------------------------------- */

export default function HeroScene() {
  const { resolved } = useTheme();
  const reduced = usePrefersReducedMotion();
  const [tier, setTier] = useState<Tier>(() => (typeof window === 'undefined' ? 'medium' : detectTier()));

  const effectiveTier: Tier = reduced ? 'low' : tier;
  const settings = SETTINGS[effectiveTier];

  const physics = resolved === 'dark' ? '#38bdf8' : '#0276be';
  const chemistry = resolved === 'dark' ? '#a78bfa' : '#7633db';
  const dust = resolved === 'dark' ? '#7dd3fc' : '#94a3b8';

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={settings.dpr}
      // A single static frame is enough when motion is reduced, and it keeps
      // the GPU idle on low-powered machines.
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: effectiveTier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      {/* Live frame-time watch: step the tier down if the machine cannot hold
          the rate, and back up only once it has been comfortable for a while. */}
      <PerformanceMonitor
        onDecline={() => setTier((current) => (current === 'high' ? 'medium' : 'low'))}
        onIncline={() => setTier((current) => (current === 'low' ? 'medium' : 'high'))}
        flipflops={3}
        // After three oscillations, stop changing our mind and settle low.
        onFallback={() => setTier('low')}
      />
      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 5]} intensity={35} color={physics} />
      <pointLight position={[-5, -3, 2]} intensity={22} color={chemistry} />

      {effectiveTier !== 'low' && <Studio physics={physics} chemistry={chemistry} />}

      <Nucleus colour={physics} accent={physics} tier={effectiveTier} />
      <Shell radius={1.7} tilt={[1.1, 0.2, 0]} speed={0.34} electrons={2} colour={physics} />
      <Shell radius={2.5} tilt={[-0.5, 0.9, 0.3]} speed={-0.24} electrons={4} colour={chemistry} />
      <Shell radius={3.3} tilt={[0.4, -0.8, 0.9]} speed={0.16} electrons={3} colour={physics} />
      <ParticleField count={settings.particles} colour={dust} />

      <Rig />

      {settings.effects && (
        <EffectComposer
          // No depth buffer needed for these passes; skipping it is a free win.
          enableNormalPass={false}
          multisampling={effectiveTier === 'high' ? 4 : 0}
        >
          <Bloom
            intensity={effectiveTier === 'high' ? 1.15 : 0.75}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.85}
            kernelSize={effectiveTier === 'high' ? KernelSize.LARGE : KernelSize.SMALL}
            mipmapBlur
          />
          {/* Sub-pixel fringing: felt rather than seen. Anything larger reads
              as a broken display rather than a camera lens. */}
          {effectiveTier === 'high' && (
            <ChromaticAberration offset={new THREE.Vector2(0.0006, 0.0009)} />
          )}
          <Vignette eskil={false} offset={0.28} darkness={resolved === 'dark' ? 0.62 : 0.28} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
