'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * 3D is opt-in and lazy: nothing from three.js is downloaded until the canvas
 * actually scrolls into view, so pages that merely mention a scene stay light.
 */

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });
const SolarSystemScene = dynamic(() => import('./SolarSystemScene'), { ssr: false, loading: () => null });
const MoleculeScene = dynamic(() => import('./MoleculeScene'), { ssr: false, loading: () => null });

function WhenVisible({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Older browsers without IntersectionObserver just load it immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // If it is already on screen, load it now rather than waiting for the
    // observer to report what we can measure directly.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(element);

    // A page that never composites — a hidden tab, an embedded frame, some
    // headless browsers — gets no intersection callbacks at all, and the scene
    // would sit on "Loading…" for ever. Give up waiting after a few seconds and
    // load it anyway; the point of the observer is to save bandwidth on scenes
    // far down the page, not to withhold one the reader is looking at.
    const timer = window.setTimeout(() => setVisible(true), 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {visible ? children : fallback}
    </div>
  );
}

export function LazyHeroScene() {
  return (
    <WhenVisible>
      <HeroScene />
    </WhenVisible>
  );
}

export function LazySolarSystem() {
  return (
    <WhenVisible fallback={<SceneSkeleton label="Loading the Solar System…" />}>
      <SolarSystemScene />
    </WhenVisible>
  );
}

export function LazyMolecule({ molecule }: { molecule: string }) {
  return (
    <WhenVisible fallback={<SceneSkeleton label="Loading molecule…" />}>
      <MoleculeScene molecule={molecule} />
    </WhenVisible>
  );
}

function SceneSkeleton({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-card bg-surface-raised">
      <p className="text-sm text-ink-faint">{label}</p>
    </div>
  );
}
