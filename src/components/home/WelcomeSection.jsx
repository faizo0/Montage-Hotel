import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { Divider } from '@/components/layout/Divider';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';
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
 * Section 6 — Welcome to The Montage
 * Authentic Pakistani five-star hospitality narrative with Mughal-inspired
 * architectural photography, ScrollTrigger parallax, and kinetic typography reveal.
 */
export function WelcomeSection() {
  const sectionRef = useRef(null);
  const secondaryFrameRef = useRef(null);
  const copyColRef = useRef(null);
  const ruleRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyItemsRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      if (secondaryFrameRef.current) {
        gsap.fromTo(
          secondaryFrameRef.current,
          { y: 28 },
          {
            y: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const col = copyColRef.current;
    if (!col || prefersReducedMotion()) return undefined;

    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: LUXURY_EASE },
          scrollTrigger: {
            trigger: col,
            start: 'top 84%',
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
            0.05
          );
        }

        const lastLineStart = addKineticTextToTimeline(tl, headlineRef.current, {
          startAt: 0.12,
          yPercent: -112,
          blur: 5,
          duration: 0.9,
          lineStagger: 0.15,
          wordStagger: 0.044,
          ease: LUXURY_EASE,
        });

        const followItems = copyItemsRef.current
          ? copyItemsRef.current.querySelectorAll('[data-welcome-item]')
          : [];
        if (followItems.length) {
          tl.from(
            followItems,
            {
              y: -14,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.72,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'transform,opacity,filter,willChange',
            },
            lastLineStart + 0.18
          );
        }
      }, copyColRef);
    } catch {
      gsap.set(col.querySelectorAll('[data-kinetic-word], [data-welcome-item]'), {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="welcome-montage"
      ref={sectionRef}
      className="py-16 md:py-28 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Asymmetric Pakistani Architectural Photography Diptych */}
          <div className="relative lg:col-span-6">
            <RevealOnScroll y={28} duration={0.9}>
              <div className="group w-[86%] sm:w-[82%] overflow-hidden rounded-[16px] border border-[#E3D5CE] shadow-[0_18px_40px_-22px_rgba(41,35,42,0.18)]">
                <ImageWithFallback
                  src={HOTEL_IMAGES.courtyardPortrait}
                  alt="The Montage Signature Hotel Carved Marble Entrance Colonnade in Pakistan"
                  aspectRatio="aspect-[3/4]"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </RevealOnScroll>

            <div
              ref={secondaryFrameRef}
              className="ml-auto -mt-28 sm:-mt-40 w-[56%] sm:w-[52%] relative z-10"
            >
              <ParallaxLayer strength={12}>
                <div className="group overflow-hidden rounded-[16px] border-4 border-[#F8F3EA] shadow-[0_24px_48px_-18px_rgba(41,35,42,0.24)]">
                  <ImageWithFallback
                    src={HOTEL_IMAGES.fineDining}
                    alt="Diwan Signature Dining beneath Arched Stone Jaali Screens"
                    aspectRatio="aspect-[4/3]"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </ParallaxLayer>
            </div>
          </div>

          {/* Editorial Copy & Pakistani Craftsmanship Pillars */}
          <div ref={copyColRef} className="lg:col-span-6">
            <div className="mb-3 flex items-center gap-3">
              <span
                ref={ruleRef}
                className="h-[1.5px] w-7 origin-left bg-[#C6A46A]"
                aria-hidden="true"
              />
              <div className="overflow-hidden">
                <p ref={kickerRef} data-welcome-item="" className="editorial-kicker">
                  Welcome to The Montage
                </p>
              </div>
            </div>

            <div ref={headlineRef}>
              <KineticText
                as="h2"
                text="An Extraordinary World of Hospitality"
                className="display-section mb-6"
              />
            </div>

            <div ref={copyItemsRef}>
              <p
                data-welcome-item=""
                className="text-base md:text-lg text-[#29232A]/85 leading-relaxed mb-5 prose-measure"
              >
                Experience the perfect harmony of refined design, exceptional
                service and timeless comfort.
              </p>
              <p
                data-welcome-item=""
                className="text-sm md:text-base text-[#5B5258] leading-relaxed mb-8 prose-measure"
              >
                Rooted in the warmth of Pakistani hospitality, our property
                unites Mughal-inspired marble arches, carved geometric jaali
                work, and hand-rubbed walnut interiors with tranquil courtyard
                gardens and attentive twenty-four-hour service.
              </p>

              <div data-welcome-item="">
                <Divider ornate className="mb-7" />
              </div>

              <div
                data-welcome-item=""
                className="grid grid-cols-3 gap-6 pb-7 mb-8 border-b border-[#E3D5CE]"
              >
                <div>
                  <span className="block font-editorial text-xl md:text-2xl font-medium text-[#29232A]">
                    Craftsmanship
                  </span>
                  <span className="text-xs text-[#877B80]">
                    Marble & Carved Wood
                  </span>
                </div>
                <div>
                  <span className="block font-editorial text-xl md:text-2xl font-medium text-[#29232A]">
                    Sanctuary
                  </span>
                  <span className="text-xs text-[#877B80]">
                    Courtyard & Gardens
                  </span>
                </div>
                <div>
                  <span className="block font-editorial text-xl md:text-2xl font-medium text-[#29232A]">
                    Hospitality
                  </span>
                  <span className="text-xs text-[#877B80]">
                    24-Hour Concierge
                  </span>
                </div>
              </div>

              <div data-welcome-item="" className="flex flex-wrap items-center gap-4">
                <Button
                  to={PUBLIC_ROUTES.ABOUT}
                  variant="primary"
                  icon={ArrowRight}
                  magnetic
                >
                  Discover Our Heritage
                </Button>
                <Button to={PUBLIC_ROUTES.GALLERY} variant="secondary">
                  View Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WelcomeSection;
