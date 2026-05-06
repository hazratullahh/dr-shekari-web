'use client';

import { useEffect } from 'react';

// Lenis-driven smooth scrolling. Imported dynamically so the lib isn't in the
// initial client bundle. Disabled when:
//   - the user prefers reduced motion
//   - the device is touch primary (iOS/Android already feel native)
// to avoid fighting the browser's natural inertia on mobile.

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let lenis;
    let rafId;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        infinite: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
