import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * Interactive mouse parallax container powered by GSAP quickTo for 60fps
 * silky damped motion without React re-renders.
 */
export function ParallaxLayer({
  children,
  strength = 18,
  className = '',
}) {
  const layerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return undefined;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return undefined;

    const node = layerRef.current;
    if (!node) return undefined;

    const xTo = gsap.quickTo(node, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(node, 'y', { duration: 0.7, ease: 'power3.out' });

    const handlePointerMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      xTo(nx * strength);
      yTo(ny * strength);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [strength]);

  return (
    <div ref={layerRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

export default ParallaxLayer;
