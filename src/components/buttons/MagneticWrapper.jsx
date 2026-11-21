import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * MagneticWrapper — Subtle GSAP magnetic pull for primary luxury CTAs on desktop pointers.
 * Automatically inert on touch devices and reduced-motion preferences.
 */
export function MagneticWrapper({
  children,
  strength = 0.22,
  className = '',
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const node = wrapperRef.current;
    if (!node) return undefined;

    const xTo = gsap.quickTo(node, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(node, 'y', { duration: 0.45, ease: 'power3.out' });

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener('pointermove', handleMove, { passive: true });
    node.addEventListener('pointerleave', handleLeave, { passive: true });

    return () => {
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapperRef} className={cn('inline-block will-change-transform', className)}>
      {children}
    </div>
  );
}

export default MagneticWrapper;
