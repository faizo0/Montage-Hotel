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
 * Step 3 — Rooms & Suites Cinematic Editorial Hero
 * Large Pakistani luxury residence photography with warm scrim contrast,
 * subtle scroll parallax, and GSAP top-to-bottom kinetic typography reveal.
 */
export function RoomsHero({ onExploreClick }) {
  const heroRef = useRef(null);
  const backdropRef = useRef(null);
  const ruleRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaPrimaryRef = useRef(null);
  const ctaSecondaryRef = useRef(null);
  const badgeRef = useRef(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: LUXURY_EASE } });

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
            0.05
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
            0.08
          );
        }

        const lastLineStart = addKineticTextToTimeline(tl, headlineRef.current, {
          startAt: 0.16,
          yPercent: -115,
          blur: 5,
          duration: 0.92,
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

        if (badgeRef.current) {
          tl.from(
            badgeRef.current,
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
      gsap.set(root.querySelectorAll('[data-kinetic-word], [data-rooms-hero]'), {
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
          scale: 1.08,
          yPercent: 6,
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
      aria-label="Rooms and Suites Showcase"
      className="relative flex min-h-[64vh] md:min-h-[74vh] items-end overflow-hidden bg-[#29232A] py-16 md:py-24"
    >
      {/* Large Cinematic Room Photography with Parallax Depth */}
      <div
        ref={backdropRef}
        className="absolute inset-0 -inset-x-2 -inset-y-2 will-change-transform"
      >
        <img
          src={HOTEL_IMAGES.premiumSuite}
          alt="Sunlit Pakistani Luxury Suite Salon and Carved Limestone Archways"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(38,20,28,0.88) 0%, rgba(38,20,28,0.62) 48%, rgba(38,20,28,0.28) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(38,20,28,0) 0%, rgba(38,20,28,0.72) 100%)',
          }}
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', to: PUBLIC_ROUTES.HOME },
              { label: 'Rooms & Suites' },
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
                  data-rooms-hero=""
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E2CCA0]"
                >
                  Accommodations & Residences
                </p>
              </div>
            </div>

            <div ref={headlineRef}>
              <KineticText
                as="h1"
                text="Discover Your Private Sanctuary"
                className="font-editorial text-[clamp(2.5rem,4.7vw,4.35rem)] font-medium leading-[1.04] tracking-[-0.022em] text-[#F8F3EA] mb-5"
                style={{ textWrap: 'balance' }}
              />
            </div>

            <div ref={subtitleRef}>
              <KineticText
                as="p"
                text="Sunlit garden chambers, carved walnut woodwork, sculpted limestone arches, and private courtyard residences tailored for unhurried Pakistani hospitality."
                className="max-w-xl text-base md:text-lg leading-relaxed text-[#F8F3EA]/88 mb-8"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div ref={ctaPrimaryRef} data-rooms-hero="">
                <Button
                  type="button"
                  onClick={onExploreClick}
                  variant="primary"
                  size="lg"
                  icon={ArrowDown}
                  magnetic
                >
                  Explore Residences
                </Button>
              </div>
              <div ref={ctaSecondaryRef} data-rooms-hero="">
                <Button
                  to={PUBLIC_ROUTES.BOOKING}
                  variant="secondary"
                  size="lg"
                  icon={ArrowRight}
                  magnetic
                >
                  Reserve Your Stay
                </Button>
              </div>
            </div>
          </div>

          <div
            ref={badgeRef}
            data-rooms-hero=""
            className="max-w-xs rounded-[14px] border border-[#C6A46A]/45 bg-[#29232A]/70 p-5 text-[#F8F3EA] backdrop-blur-md"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E2CCA0] mb-1.5">
              Illustrative Demo Collection
            </p>
            <p className="text-xs leading-relaxed text-[#F8F3EA]/85">
              Four signature room & suite categories presented with interactive
              demo specifications, floor areas, amenities, and nightly demo rates.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RoomsHero;
