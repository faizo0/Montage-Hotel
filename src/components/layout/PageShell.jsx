import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/layout/Divider';
import { Button } from '@/components/buttons/Button';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { KineticText } from '@/components/animations/KineticText';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import {
  gsap,
  registerGsapPlugins,
  prefersReducedMotion,
  addKineticTextToTimeline,
  LUXURY_EASE,
} from '@/utils/gsapHelpers';

/**
 * Reusable PageShell for public route architecture.
 * Delivers consistent editorial headers, breadcrumbs, and synchronized GSAP
 * top-to-bottom kinetic typography entrance across Rooms & Suites and all pages.
 */
export function PageShell({
  title,
  kicker,
  description,
  breadcrumbLabel,
  primaryActionLabel = 'Reserve a Stay',
  primaryActionTo = PUBLIC_ROUTES.BOOKING,
  secondaryActionLabel = 'Return Home',
  secondaryActionTo = PUBLIC_ROUTES.HOME,
  children,
}) {
  useDocumentTitle(title);

  const headerScopeRef = useRef(null);
  const kickerRuleRef = useRef(null);
  const kickerTextRef = useRef(null);
  const headlineRef = useRef(null);
  const descriptionRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: LUXURY_EASE } });

        // 1. Small kicker label & champagne hairline reveal
        if (kickerRuleRef.current) {
          tl.from(
            kickerRuleRef.current,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.72,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            0.04
          );
        }

        if (kickerTextRef.current) {
          tl.from(
            kickerTextRef.current,
            {
              yPercent: -105,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.72,
              clearProps: 'transform,opacity,filter,willChange',
            },
            0.06
          );
        }

        // 2. Main page hero heading slides TOP TO BOTTOM line-by-line & word-by-word
        const lastTitleLineStart = addKineticTextToTimeline(tl, headlineRef.current, {
          startAt: 0.14,
          yPercent: -115,
          blur: 5,
          duration: 0.9,
          lineStagger: 0.15,
          wordStagger: 0.045,
          ease: LUXURY_EASE,
        });

        // 3. Supporting description slides smoothly into position
        let nextOffset = lastTitleLineStart + 0.18;
        if (description && descriptionRef.current) {
          const lastDescLineStart = addKineticTextToTimeline(tl, descriptionRef.current, {
            startAt: nextOffset,
            yPercent: -90,
            blur: 3,
            duration: 0.76,
            lineStagger: 0.1,
            wordStagger: 0.014,
            ease: 'power3.out',
          });
          nextOffset = Math.max(nextOffset + 0.22, lastDescLineStart + 0.12);
        }

        // 4. Primary CTA enters
        if (primaryBtnRef.current) {
          tl.from(
            primaryBtnRef.current,
            {
              y: -14,
              opacity: 0,
              scale: 0.97,
              filter: 'blur(3px)',
              duration: 0.68,
              clearProps: 'transform,opacity,filter,willChange',
            },
            nextOffset
          );
        }

        // 5. Secondary CTA follows
        if (secondaryBtnRef.current) {
          tl.from(
            secondaryBtnRef.current,
            {
              y: -14,
              opacity: 0,
              scale: 0.97,
              filter: 'blur(3px)',
              duration: 0.68,
              clearProps: 'transform,opacity,filter,willChange',
            },
            nextOffset + 0.12
          );
        }
      }, headerScopeRef);
    } catch {
      const root = headerScopeRef.current;
      if (root) {
        gsap.set(root.querySelectorAll('[data-kinetic-word], [data-page-hero-item]'), {
          clearProps: 'all',
        });
      }
    }

    return () => ctx?.revert();
  }, [title, kicker, description]);

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div ref={headerScopeRef}>
          <Breadcrumbs
            items={[
              { label: 'Home', to: PUBLIC_ROUTES.HOME },
              { label: breadcrumbLabel || title },
            ]}
          />

          <div className="mt-7 max-w-3xl">
            {kicker && (
              <div className="mb-3 flex items-center gap-3">
                <span
                  ref={kickerRuleRef}
                  aria-hidden="true"
                  className="h-[1.5px] w-7 origin-left bg-[#C6A46A]"
                />
                <div className="overflow-hidden">
                  <p
                    ref={kickerTextRef}
                    data-page-hero-item=""
                    className="editorial-kicker"
                  >
                    {kicker}
                  </p>
                </div>
              </div>
            )}

            <div ref={headlineRef}>
              <KineticText
                as="h1"
                text={title}
                className="display-hero mb-5"
              />
            </div>

            {description && (
              <div ref={descriptionRef}>
                <KineticText
                  as="p"
                  text={description}
                  className="text-base md:text-lg text-[#5B5258] leading-relaxed prose-measure"
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div ref={primaryBtnRef} data-page-hero-item="">
              <Button to={primaryActionTo} variant="primary" icon={ArrowRight} magnetic>
                {primaryActionLabel}
              </Button>
            </div>
            <div ref={secondaryBtnRef} data-page-hero-item="">
              <Button to={secondaryActionTo} variant="secondary">
                {secondaryActionLabel}
              </Button>
            </div>
          </div>
        </div>

        <Divider ornate className="my-12" />

        {children || (
          <div className="rounded-[14px] border border-[#E3D5CE] bg-[#F8F3EA] p-8 md:p-10 shadow-[0_14px_34px_-22px_rgba(41,35,42,0.14)]">
            <span className="mb-4 block h-[1.5px] w-8 bg-[#C6A46A]" aria-hidden="true" />
            <h2 className="display-card mb-3">{title}</h2>
            <p className="text-sm md:text-base text-[#5B5258] max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default PageShell;
