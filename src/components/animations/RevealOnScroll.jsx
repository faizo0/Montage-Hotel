import React from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { cn } from '@/utils/cn';

/**
 * GSAP ScrollTrigger reveal container prepared for editorial storytelling sections.
 */
export function RevealOnScroll({
  children,
  y = 20,
  duration = 0.8,
  delay = 0,
  className = '',
}) {
  const ref = useScrollTrigger({ y, duration, delay });

  return (
    <div ref={ref} data-reveal className={cn(className)}>
      {children}
    </div>
  );
}

export default RevealOnScroll;
