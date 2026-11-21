import React, { useLayoutEffect, useRef } from 'react';
import {
  gsap,
  registerGsapPlugins,
  prefersReducedMotion,
  addKineticTextToTimeline,
  LUXURY_EASE,
} from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * Accessible Kinetic Typography Component
 * Splits text into masked word spans without altering layout flow, line-height,
 * or screen-reader semantics, enabling line-by-line + word-by-word top-to-bottom
 * vertical slides with subtle blur-to-sharp GSAP transitions.
 *
 * When `standalone` is true, it animates itself via GSAP (optionally ScrollTrigger).
 * When `standalone` is false (default), a parent GSAP timeline orchestrates it via
 * `[data-kinetic-mask]` / `[data-kinetic-word]` targets for tightly sequenced heroes.
 */
export function KineticText({
  text = '',
  as: Tag = 'h2',
  className = '',
  style,
  standalone = false,
  triggerOnScroll = false,
  scrollStart = 'top 86%',
  delay = 0,
  duration = 0.92,
  lineStagger = 0.16,
  wordStagger = 0.045,
  yPercent = -115,
  blur = 5,
  ease = LUXURY_EASE,
  dataAttr,
  ...rest
}) {
  const rootRef = useRef(null);
  const words = String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  useLayoutEffect(() => {
    if (!standalone) return undefined;
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          delay,
          ...(triggerOnScroll
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: scrollStart,
                  once: true,
                },
              }
            : {}),
        });

        addKineticTextToTimeline(tl, el, {
          startAt: 0,
          yPercent,
          blur,
          duration,
          lineStagger,
          wordStagger,
          ease,
        });
      }, rootRef);
    } catch {
      const targets = el.querySelectorAll('[data-kinetic-word]');
      gsap.set([el, ...targets], { clearProps: 'all' });
    }

    return () => ctx?.revert();
  }, [
    standalone,
    triggerOnScroll,
    scrollStart,
    delay,
    duration,
    lineStagger,
    wordStagger,
    yPercent,
    blur,
    ease,
    text,
  ]);

  const attrProps = dataAttr ? { [dataAttr]: '' } : {};

  return (
    <Tag
      ref={rootRef}
      data-kinetic-root=""
      className={cn(className)}
      style={style}
      {...attrProps}
      {...rest}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, idx) => (
          <React.Fragment key={`${word}-${idx}`}>
            <span
              data-kinetic-mask=""
              className="inline-block overflow-hidden align-baseline pt-[0.06em] pb-[0.14em] -mt-[0.06em] -mb-[0.14em]"
            >
              <span
                data-kinetic-word=""
                className="inline-block will-change-[transform,opacity,filter]"
              >
                {word}
              </span>
            </span>
            {idx < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  );
}

export default KineticText;
