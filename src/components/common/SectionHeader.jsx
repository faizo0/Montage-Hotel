import React, { useLayoutEffect, useRef } from 'react';
import { KineticText } from '@/components/animations/KineticText';
import {
  gsap,
  registerGsapPlugins,
  prefersReducedMotion,
  addKineticTextToTimeline,
  LUXURY_EASE,
} from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * Editorial SectionHeader with GSAP ScrollTrigger kinetic typography reveal:
 * kicker & gold hairline -> top-to-bottom kinetic section heading -> subtitle -> action.
 */
export function SectionHeader({
  kicker,
  title,
  subtitle,
  action,
  align = 'left',
  className = '',
}) {
  const scopeRef = useRef(null);
  const ruleRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionRef = useRef(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReducedMotion()) return undefined;

    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: LUXURY_EASE },
          scrollTrigger: {
            trigger: scope,
            start: 'top 86%',
            once: true,
          },
        });

        if (ruleRef.current) {
          tl.from(
            ruleRef.current,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.72,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            0
          );
        }

        if (kickerRef.current) {
          tl.from(
            kickerRef.current,
            {
              yPercent: -105,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.7,
              clearProps: 'transform,opacity,filter,willChange',
            },
            0.04
          );
        }

        const lastLineStart = addKineticTextToTimeline(tl, titleRef.current, {
          startAt: 0.1,
          yPercent: -112,
          blur: 5,
          duration: 0.88,
          lineStagger: 0.14,
          wordStagger: 0.042,
          ease: LUXURY_EASE,
        });

        const afterTitle = lastLineStart + 0.16;

        if (subtitleRef.current) {
          tl.from(
            subtitleRef.current,
            {
              y: -14,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.72,
              ease: 'power3.out',
              clearProps: 'transform,opacity,filter,willChange',
            },
            afterTitle
          );
        }

        if (actionRef.current) {
          tl.from(
            actionRef.current,
            {
              y: -12,
              opacity: 0,
              duration: 0.68,
              clearProps: 'transform,opacity',
            },
            afterTitle + 0.1
          );
        }
      }, scopeRef);
    } catch {
      gsap.set(scope.querySelectorAll('[data-kinetic-word], [data-section-item]'), {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, [title, kicker, subtitle]);

  return (
    <div
      ref={scopeRef}
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center text-center',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {kicker && (
          <div className={cn('mb-2.5 flex items-center gap-2.5', align === 'center' && 'justify-center')}>
            <span
              ref={ruleRef}
              className="h-[1.5px] w-6 origin-left bg-[#C6A46A]"
              aria-hidden="true"
            />
            <div className="overflow-hidden">
              <p ref={kickerRef} data-section-item="" className="editorial-kicker">
                {kicker}
              </p>
            </div>
          </div>
        )}
        <div ref={titleRef}>
          <KineticText as="h2" text={title} className="display-section" />
        </div>
        {subtitle && (
          <p
            ref={subtitleRef}
            data-section-item=""
            className="mt-3 text-sm md:text-base text-[#5B5258] leading-relaxed"
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div ref={actionRef} data-section-item="" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
