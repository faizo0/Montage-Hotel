import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/gsapHelpers';

/**
 * Subtle, refined luxury pointer halo for desktop viewports.
 * Enlarges softly when hovering interactive links or buttons.
 */
export function LuxuryCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const el = cursorRef.current;
    if (!el) return undefined;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' });

    const handleMove = (e) => {
      el.style.opacity = '1';
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleOver = (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target) {
        gsap.to(el, { scale: 1.75, duration: 0.2, ease: 'power2.out' });
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target) {
        gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' });
      }
    };

    const handleLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#702D43]/45 bg-[#702D43]/[0.05] opacity-0 transition-opacity duration-200 lg:block"
    />
  );
}

export default LuxuryCursor;
