import { useEffect, useRef } from 'react';
import { gsap, createRevealAnimation, registerGsapPlugins } from '@/utils/gsapHelpers';

/**
 * Reusable GSAP ScrollTrigger hook using gsap.context for clean React unmount cleanup.
 */
export function useScrollTrigger(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    registerGsapPlugins();
    const el = elementRef.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      createRevealAnimation(el, options);
    }, elementRef);

    return () => ctx.revert();
  }, [options.delay, options.duration, options.start, options.y]);

  return elementRef;
}

export default useScrollTrigger;
