import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Button } from '@/components/buttons/Button';
import { KineticText } from '@/components/animations/KineticText';
import { HOTEL_IMAGES } from '@/assets/images';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import {
  gsap,
  registerGsapPlugins,
  prefersReducedMotion,
  addKineticTextToTimeline,
  LUXURY_EASE,
} from '@/utils/gsapHelpers';

/**
 * Step 5 — Immersive Luxury Spa & Wellness Hero
 * Full-width Pakistani spa interiors with smooth GSAP image curtain mask reveal,
 * subtle scroll parallax, and top-to-bottom kinetic typography sequence.
 */
export function SpaHero({ onBookClick, onExploreClick }) {
  const heroRef = useRef(null);
  const imageMaskRef = useRef(null);
  const backdropRef = useRef(null);
  const ruleRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const ctaSecondaryRef = useRef(null);
  const noteCardRef = useRef(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: LUXURY_EASE } });

        // Smooth curtain image mask reveal + subtle breath settle
        if (imageMaskRef.current) {
          gsap.from(imageMaskRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.25,
            ease: LUXURY_EASE,
            clearProps: 'clipPath',
          });
        }

        if (backdropRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { scale: 1.09 },
            { scale: 1.01, duration: 2.3, ease: 'power2.out' }
          );
        }

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
            0.08
          );
        }

        if (kickerRef.current) {
          tl.from(
            kickerRef.current,
            {
              yPercent: -108,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.72,
              clearProps: 'transform,opacity,filter,willChange',
            },
            0.12
          );
        }

        const lastLineStart = addKineticTextToTimeline(tl, headlineRef.current, {
          startAt: 0.2,
          yPercent: -115,
          blur: 5,
          duration: 0.94,
          lineStagger: 0.15,
          wordStagger: 0.046,
          ease: LUXURY_EASE,
        });

        const descStart = lastLineStart + 0.18;
        const lastDescStart = addKineticTextToTimeline(tl, subtitleRef.current, {
          startAt: descStart,
          yPercent: -92,
          blur: 4,
          duration: 0.78,
          lineStagger: 0.11,
          wordStagger: 0.015,
          ease: 'power3.out',
        });

        const ctaStart = Math.max(descStart + 0.2, lastDescStart + 0.12);

        if (ctaPrimaryRef.current) {
          tl.from(
            ctaPrimaryRef.current,
            {
              y: -14,
              opacity: 0,
              scale: 0.97,
              filter: 'blur(3px)',
              duration: 0.68,
              clearProps: 'transform,opacity,filter,willChange',
            },
            ctaStart
          );
        }

        if (ctaSecondaryRef.current) {
          tl.from(
            ctaSecondaryRef.current,
            {
              y: -14,
              opacity: 0,
              scale: 0.97,
              filter: 'blur(3px)',
              duration: 0.68,
              clearProps: 'transform,opacity,filter,willChange',
            },
            ctaStart + 0.12
          );
        }

        if (noteCardRef.current) {
          tl.from(
            noteCardRef.current,
            {
              y: -10,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            ctaStart + 0.08
          );
        }
      }, heroRef);
    } catch {
      gsap.set(root.querySelectorAll('[data-kinetic-word], [data-spa-hero]'), {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      if (backdropRef.current) {
        gsap.to(backdropRef.current, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Spa and Wellness Sanctuary Showcase"
      className="relative flex min-h-[66vh] md:min-h-[76vh] items-end overflow-hidden bg-[#29232A] py-16 md:py-24"
    >
      {/* Full-Width Spa Photography with Mask Reveal & Parallax */}
      <div
        ref={imageMaskRef}
        className="absolute inset-0 -inset-x-3 -inset-y-3 overflow-hidden"
      >
        <div ref={backdropRef} className="h-full w-full will-change-transform">
          <img
            src={HOTEL_IMAGES.spaWellness}
            alt="The Marble Hammam and Botanical Spa Sanctuary at The Montage Signature Hotel"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(38,20,28,0.88) 0%, rgba(38,20,28,0.60) 50%, rgba(38,20,28,0.28) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-44"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,20,28,0) 0%, rgba(38,20,28,0.74) 100%)',
          }}
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', to: PUBLIC_ROUTES.HOME },
              { label: 'Spa & Wellness' },
            ]}
            className="text-[#F8F3EA]/80 [&_a]:text-[#E2CCA0] [&_a:hover]:text-white [&_span[aria-current]]:text-[#F8F3EA]"
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                ref={ruleRef}
                aria-hidden="true"
                className="h-[1.5px] w-8 origin-left bg-[#C6A46A]"
              />
              <div className="overflow-hidden">
                <p
                  ref={kickerRef}
                  data-spa-hero=""
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E2CCA0]"
                >
                  The Marble Hammam · Thermal Sanctuary
                </p>
              </div>
            </div>

            <div ref={headlineRef}>
              <KineticText
                as="h1"
                text="Discover the Art of Relaxation"
                className="font-editorial text-[clamp(2.5rem,4.7vw,4.35rem)] font-medium leading-[1.04] tracking-[-0.022em] text-[#F8F3EA] mb-5"
                style={{ textWrap: 'balance' }}
              />
            </div>

            <div ref={subtitleRef}>
              <KineticText
                as="p"
                text="Escape into a world of tranquility, thoughtful wellness and exceptional comfort."
                className="max-w-xl text-base md:text-lg leading-relaxed text-[#F8F3EA]/88 mb-8"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div ref={ctaPrimaryRef} data-spa-hero="">
                <Button
                  type="button"
                  onClick={onBookClick}
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  magnetic
                >
                  Request Spa Appointment
                </Button>
              </div>
              <div ref={ctaSecondaryRef} data-spa-hero="">
                <Button
                  type="button"
                  onClick={onExploreClick}
                  variant="secondary"
                  size="lg"
                  icon={ArrowDown}
                  magnetic
                >
                  Explore Experiences
                </Button>
              </div>
            </div>
          </div>

          <div
            ref={noteCardRef}
            data-spa-hero=""
            className="max-w-xs rounded-[14px] border border-[#C6A46A]/45 bg-[#29232A]/70 p-5 text-[#F8F3EA] backdrop-blur-md"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E2CCA0] mb-1.5">
              Demo Wellness Showcase
            </p>
            <p className="text-xs leading-relaxed text-[#F8F3EA]/85">
              Six curated wellness rituals presented with illustrative demo durations,
              sample rates, and an interactive appointment request desk.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SpaHero;
