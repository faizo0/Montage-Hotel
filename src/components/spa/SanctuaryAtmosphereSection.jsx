import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/layout/Divider';
import { Button } from '@/components/buttons/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { KineticText } from '@/components/animations/KineticText';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';
import { HOTEL_IMAGES } from '@/assets/images';
import { gsap, registerGsapPlugins, prefersReducedMotion, addKineticTextToTimeline, LUXURY_EASE } from '@/utils/gsapHelpers';

/**
 * Step 5 — Calm Sanctuary Architecture Diptych
 * Highlights carved limestone hydro-baths, sunlit jaali lounges,
 * subtle scroll parallax, and GSAP image mask reveals.
 */
export function SanctuaryAtmosphereSection({ onBookPrivateSuite }) {
  const sectionRef = useRef(null);
  const primaryMaskRef = useRef(null);
  const floatFrameRef = useRef(null);
  const copyColRef = useRef(null);
  const ruleRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const followRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      if (floatFrameRef.current) {
        gsap.fromTo(
          floatFrameRef.current,
          { y: 24 },
          {
            y: -24,
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
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    registerGsapPlugins();
    let ctx;
    try {
      ctx = gsap.context(() => {
        if (primaryMaskRef.current) {
          gsap.from(primaryMaskRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.05,
            ease: LUXURY_EASE,
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: primaryMaskRef.current,
              start: 'top 84%',
              once: true,
            },
          });
        }

        const tl = gsap.timeline({
          defaults: { ease: LUXURY_EASE },
          scrollTrigger: {
            trigger: copyColRef.current,
            start: 'top 84%',
            once: true,
          },
        });

        if (ruleRef.current) {
          tl.from(
            ruleRef.current,
            { scaleX: 0, opacity: 0, duration: 0.72, ease: 'power3.out', clearProps: 'transform,opacity' },
            0
          );
        }

        if (kickerRef.current) {
          tl.from(
            kickerRef.current,
            { yPercent: -105, opacity: 0, filter: 'blur(3px)', duration: 0.7, clearProps: 'transform,opacity,filter,willChange' },
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

        const items = followRef.current
          ? followRef.current.querySelectorAll('[data-sanctuary-item]')
          : [];
        if (items.length) {
          tl.from(
            items,
            {
              y: -14,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.72,
              stagger: 0.09,
              ease: 'power3.out',
              clearProps: 'transform,opacity,filter,willChange',
            },
            lastLineStart + 0.16
          );
        }
      }, sectionRef);
    } catch {
      gsap.set(root.querySelectorAll('[data-kinetic-word], [data-sanctuary-item]'), {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-[#E3D5CE] bg-[#F8F3EA] py-16 md:py-24 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Asymmetric Spa Diptych */}
          <div className="relative lg:col-span-6">
            <div
              ref={primaryMaskRef}
              className="group w-[86%] sm:w-[82%] overflow-hidden rounded-[18px] border border-[#E3D5CE] shadow-[0_20px_48px_-22px_rgba(41,35,42,0.18)]"
            >
              <ImageWithFallback
                src={HOTEL_IMAGES.spaPrivateSuite}
                alt="Private Relaxation Suite with Sunken Travertine Rose Bath Beneath Mughal Arches"
                aspectRatio="aspect-[4/3]"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div
              ref={floatFrameRef}
              className="ml-auto -mt-20 sm:-mt-28 w-[56%] sm:w-[52%] relative z-10"
            >
              <ParallaxLayer strength={10}>
                <div className="group overflow-hidden rounded-[16px] border-4 border-[#F8F3EA] shadow-[0_24px_48px_-18px_rgba(41,35,42,0.24)]">
                  <ImageWithFallback
                    src={HOTEL_IMAGES.spaLounge}
                    alt="Quiet Wellness Tea & Daybed Lounge with Limestone Jaali Work"
                    aspectRatio="aspect-[4/3]"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </ParallaxLayer>
            </div>
          </div>

          {/* Right: Editorial Sanctuary Copy */}
          <div ref={copyColRef} className="lg:col-span-6">
            <div className="mb-3 flex items-center gap-3">
              <span
                ref={ruleRef}
                className="h-[1.5px] w-7 origin-left bg-[#C6A46A]"
                aria-hidden="true"
              />
              <div className="overflow-hidden">
                <p ref={kickerRef} data-sanctuary-item="" className="editorial-kicker">
                  Private Sanctuaries & Tea Repose
                </p>
              </div>
            </div>

            <div ref={headlineRef}>
              <KineticText
                as="h2"
                text="Architecture Designed for Quiet Renewal"
                className="display-section mb-6"
              />
            </div>

            <div ref={followRef}>
              <p
                data-sanctuary-item=""
                className="text-base md:text-lg text-[#29232A]/85 leading-relaxed mb-4 prose-measure"
              >
                Every thermal chamber balances natural travertine stone, sculpted
                limestone latticework, and hushed garden courtyards.
              </p>
              <p
                data-sanctuary-item=""
                className="text-sm md:text-base text-[#5B5258] leading-relaxed mb-7 prose-measure"
              >
                Transition seamlessly from heated cedarwood cabins and floral
                hydro-bath suites to unhurried afternoon saffron tea on cushioned
                daybeds. Rituals and suites presented here are illustrative demo
                offerings.
              </p>

              <div data-sanctuary-item="">
                <Divider ornate className="mb-7" />
              </div>

              <div
                data-sanctuary-item=""
                className="grid grid-cols-3 gap-5 pb-7 mb-7 border-b border-[#E3D5CE]"
              >
                <div>
                  <span className="block font-editorial text-xl font-medium text-[#29232A]">
                    Thermal Calm
                  </span>
                  <span className="text-xs text-[#877B80]">Hammam & Cedar</span>
                </div>
                <div>
                  <span className="block font-editorial text-xl font-medium text-[#29232A]">
                    Botanical Oils
                  </span>
                  <span className="text-xs text-[#877B80]">Rose & Saffron</span>
                </div>
                <div>
                  <span className="block font-editorial text-xl font-medium text-[#29232A]">
                    Private Suites
                  </span>
                  <span className="text-xs text-[#877B80]">Solo & Couples</span>
                </div>
              </div>

              <div data-sanctuary-item="">
                <Button
                  type="button"
                  onClick={onBookPrivateSuite}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  magnetic
                >
                  Reserve Private Suite Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SanctuaryAtmosphereSection;
