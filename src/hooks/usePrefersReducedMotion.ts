'use client';

import { useEffect, useState } from 'react';

/**
 * Reads the OS "reduce motion" setting. The CSS media query handles
 * transitions; this hook lets the canvas and 3D scenes respond too, since they
 * animate outside the reach of CSS.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
