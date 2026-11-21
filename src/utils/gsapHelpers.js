import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

export function registerGsapPlugins() {
  if (typeof window !== 'undefined' && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reusable GSAP ScrollTrigger reveal preset respecting reduced-motion preferences.
 */
export function createRevealAnimation(target, options = {}) {
  registerGsapPlugins();
  if (!target) return null;

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0, clearProps: 'transform' });
    return null;
  }

  const {
    y = 24,
    duration = 0.85,
    delay = 0,
    ease = 'power3.out',
    start = 'top 86%',
    trigger = target,
  } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      clearProps: 'transform',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
}

export const LUXURY_EASE = 'power4.out';

/**
 * Groups `[data-kinetic-mask]` inner `[data-kinetic-word]` elements into visual
 * lines by comparing mask `offsetTop`, ordered strictly top-to-bottom.
 */
export function groupKineticWordsByLine(rootEl, tolerance = 6) {
  if (!rootEl) return [];
  const masks = Array.from(rootEl.querySelectorAll('[data-kinetic-mask]'));
  if (!masks.length) return [];

  const lines = [];
  let currentLine = [];
  let currentTop = null;

  masks.forEach((mask) => {
    const wordEl = mask.querySelector('[data-kinetic-word]') || mask;
    const top = mask.offsetTop;

    if (currentTop === null || Math.abs(top - currentTop) <= tolerance) {
      currentLine.push(wordEl);
      if (currentTop === null) currentTop = top;
    } else {
      if (currentLine.length) lines.push(currentLine);
      currentLine = [wordEl];
      currentTop = top;
    }
  });

  if (currentLine.length) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Adds a cinematic top-to-bottom kinetic typography reveal (line-by-line + word-by-word
 * vertical slide with subtle blur-to-sharp clearing) onto an existing GSAP timeline.
 * Returns the approximate start time of the final line for downstream sequencing.
 */
export function addKineticTextToTimeline(tl, rootEl, options = {}) {
  if (!tl || !rootEl) return 0;

  const {
    startAt = 0,
    yPercent = -115,
    blur = 5,
    duration = 0.92,
    lineStagger = 0.16,
    wordStagger = 0.045,
    ease = LUXURY_EASE,
  } = options;

  const lines = groupKineticWordsByLine(rootEl);
  if (!lines.length) {
    tl.from(
      rootEl,
      {
        y: -20,
        opacity: 0,
        filter: `blur(${blur}px)`,
        duration,
        ease,
        clearProps: 'transform,opacity,filter,willChange',
      },
      startAt
    );
    return startAt;
  }

  lines.forEach((lineWords, lineIdx) => {
    tl.from(
      lineWords,
      {
        yPercent,
        opacity: 0,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        duration,
        ease,
        stagger: wordStagger,
        clearProps: 'transform,opacity,filter,willChange',
      },
      startAt + lineIdx * lineStagger
    );
  });

  const lastLineOffset = Math.max(0, lines.length - 1) * lineStagger;
  return startAt + lastLineOffset;
}

export { gsap, ScrollTrigger };
