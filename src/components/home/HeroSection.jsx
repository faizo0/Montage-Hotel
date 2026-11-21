import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { TMMonogram } from '@/assets/logo/TMMonogram';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';
import { KineticText } from '@/components/animations/KineticText';
import { HeroSlideshow } from '@/components/home/HeroSlideshow';
import { HERO_SCENES } from '@/data/heroData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import {
  gsap,
  registerGsapPlugins,
  prefersReducedMotion,
  addKineticTextToTimeline,
  LUXURY_EASE,
} from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

const HERO_HEADLINE = 'Where Timeless Elegance Meets Exceptional Hospitality';
const HERO_SUBTITLE =
  'Discover an extraordinary world of refined luxury, extraordinary comfort and unforgettable experiences.';

/**
 * 2026 Cinematic Fullscreen Hero Section
 * Preserves all existing hero photography, scene order, layout, and visual identity.
 * Opening choreography (GSAP Timeline, plays once on mount):
 *   1. Small welcome label & TM crest
 *   2. Main headline lines slide down from TOP TO BOTTOM with blur-to-sharp & word stagger
 *   3. Supporting paragraph glides smoothly into place
 *   4. Primary CTA button enters
 *   5. Secondary CTA button & quiet scene navigator follow
 */
export function HeroSection() {
  const heroRef = useRef(null);
  const backdropWrapperRef = useRef(null);
  const foregroundRef = useRef(null);
  const crestRef = useRef(null);
  const brandLineRef = useRef(null);
  const subbrandLineRef = useRef(null);
  const ruleRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);
  const indicatorRef = useRef(null);

  const prefersReduced = useReducedMotion();
  const [activeScene, setActiveScene] = useState(0);

  // Master GSAP Opening Kinetic Typography Timeline (runs once on mount; never replays on scene switch)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: LUXURY_EASE } });

        // 1. Small welcome label & TM monogram crest
        if (crestRef.current) {
          tl.from(
            crestRef.current,
            {
              y: -14,
              opacity: 0,
              scale: 0.92,
              filter: 'blur(4px)',
              duration: 0.72,
              clearProps: 'transform,opacity,filter,willChange',
            },
            0.04
          );
        }

        const labelLines = [brandLineRef.current, subbrandLineRef.current].filter(Boolean);
        if (labelLines.length) {
          tl.from(
            labelLines,
            {
              yPercent: -108,
              opacity: 0,
              filter: 'blur(4px)',
              duration: 0.76,
              stagger: 0.08,
              clearProps: 'transform,opacity,filter,willChange',
            },
            0.08
          );
        }

        if (ruleRef.current) {
          tl.from(
            ruleRef.current,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.85,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            0.2
          );
        }

        // 2. Main hero headline: TOP-TO-BOTTOM line-by-line + sequential word-by-word reveal
        const lastHeadlineLineStart = addKineticTextToTimeline(tl, headlineRef.current, {
          startAt: 0.22,
          yPercent: -115,
          blur: 6,
          duration: 0.96,
          lineStagger: 0.16,
          wordStagger: 0.046,
          ease: LUXURY_EASE,
        });

        // 3. Supporting paragraph glides smoothly downward line-by-line
        const paragraphStart = lastHeadlineLineStart + 0.18;
        const lastParagraphLineStart = addKineticTextToTimeline(tl, subtitleRef.current, {
          startAt: paragraphStart,
          yPercent: -95,
          blur: 4,
          duration: 0.82,
          lineStagger: 0.11,
          wordStagger: 0.015,
          ease: 'power3.out',
        });

        // 4. Primary CTA button enters
        const primaryStart = Math.max(paragraphStart + 0.24, lastParagraphLineStart + 0.12);
        if (primaryCtaRef.current) {
          tl.from(
            primaryCtaRef.current,
            {
              y: -16,
              opacity: 0,
              scale: 0.97,
              filter: 'blur(3px)',
              duration: 0.72,
              clearProps: 'transform,opacity,filter,willChange',
            },
            primaryStart
          );
        }

        // 5. Secondary CTA button & quiet scene navigator follow
        const secondaryStart = primaryStart + 0.14;
        if (secondaryCtaRef.current) {
          tl.from(
            secondaryCtaRef.current,
            {
              y: -16,
              opacity: 0,
              scale: 0.97,
              filter: 'blur(3px)',
              duration: 0.72,
              clearProps: 'transform,opacity,filter,willChange',
            },
            secondaryStart
          );
        }

        if (indicatorRef.current) {
          tl.from(
            indicatorRef.current,
            {
              y: -12,
              opacity: 0,
              duration: 0.75,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            primaryStart + 0.08
          );
        }
      }, heroRef);
    } catch {
      const root = heroRef.current;
      if (root) {
        gsap.set(root.querySelectorAll('[data-kinetic-word], [data-hero-item]'), {
          clearProps: 'all',
        });
      }
    }

    return () => ctx?.revert();
  }, []);

  // Scroll parallax scrub (kept strictly intact)
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      if (backdropWrapperRef.current) {
        gsap.to(backdropWrapperRef.current, {
          scale: 1.07,
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

      if (foregroundRef.current) {
        gsap.to(foregroundRef.current, {
          y: -46,
          opacity: 0.15,
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

  const handleExploreHotel = () => {
    const target = document.getElementById('welcome-montage');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentScene = HERO_SCENES[activeScene] || HERO_SCENES[0];

  return (
    <section
      ref={heroRef}
      aria-label="The Montage Signature Hotel Showcase"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden pt-28 pb-24 md:pb-28"
    >
      {/* Fullscreen 6-Scene Cinematic Slideshow with Subtle Mouse Depth */}
      <div
        ref={backdropWrapperRef}
        className="absolute inset-0 -inset-x-3 -inset-y-3 will-change-transform"
      >
        <ParallaxLayer strength={14} className="h-full w-full">
          <HeroSlideshow
            scenes={HERO_SCENES}
            activeIndex={activeScene}
            onSceneChange={setActiveScene}
          />
        </ParallaxLayer>
      </div>

      {/* Foreground Brand Composition & Scene Navigator */}
      <Container className="relative z-20">
        <div
          ref={foregroundRef}
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Left: Welcome Crest, Top-to-Bottom Kinetic Headline, Paragraph & CTAs */}
          <div className="max-w-3xl">
            <ParallaxLayer strength={6}>
              {/* 1. Small Welcome Label & TM Crest */}
              <div className="mb-6 flex items-center gap-4">
                <span
                  ref={crestRef}
                  data-hero-item=""
                  className="inline-flex shrink-0 will-change-transform"
                >
                  <TMMonogram size={50} variant="ivory" className="shrink-0" />
                </span>
                <div>
                  <div className="overflow-hidden">
                    <p
                      ref={brandLineRef}
                      data-hero-item=""
                      className="font-editorial text-sm md:text-base font-semibold tracking-[0.22em] uppercase text-[#F8F3EA] will-change-transform"
                    >
                      THE MONTAGE
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    <p
                      ref={subbrandLineRef}
                      data-hero-item=""
                      className="mt-0.5 text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#E2CCA0] will-change-transform"
                    >
                      SIGNATURE HOTEL
                    </p>
                  </div>
                  <span
                    ref={ruleRef}
                    aria-hidden="true"
                    className="mt-2 block h-[1px] w-24 origin-left bg-gradient-to-r from-[#C6A46A] to-transparent"
                  />
                </div>
              </div>

              {/* 2. Main Hero Headline: Masked Line & Word Top-to-Bottom Kinetic Reveal */}
              <div ref={headlineRef}>
                <KineticText
                  as="h1"
                  text={HERO_HEADLINE}
                  className="font-editorial text-[clamp(2.45rem,4.7vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.022em] text-[#F8F3EA] mb-5"
                  style={{ textWrap: 'balance' }}
                />
              </div>

              {/* 3. Supporting Editorial Paragraph */}
              <div ref={subtitleRef}>
                <KineticText
                  as="p"
                  text={HERO_SUBTITLE}
                  className="mb-8 max-w-xl text-base md:text-lg leading-relaxed text-[#F8F3EA]/90"
                />
              </div>

              {/* 4 & 5. Sequenced Primary CTA -> Secondary CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <div
                  ref={primaryCtaRef}
                  data-hero-item=""
                  className="will-change-transform"
                >
                  <Button
                    to={PUBLIC_ROUTES.BOOKING}
                    variant="primary"
                    size="lg"
                    magnetic
                    icon={ArrowRight}
                  >
                    BOOK YOUR STAY
                  </Button>
                </div>

                <div
                  ref={secondaryCtaRef}
                  data-hero-item=""
                  className="will-change-transform"
                >
                  <Button
                    type="button"
                    onClick={handleExploreHotel}
                    variant="secondary"
                    size="lg"
                    magnetic
                    icon={ArrowDown}
                  >
                    EXPLORE THE HOTEL
                  </Button>
                </div>
              </div>
            </ParallaxLayer>
          </div>

          {/* Right: Quiet Editorial Scene Indicator (01–06) */}
          <div
            ref={indicatorRef}
            data-hero-item=""
            className="flex flex-col items-start lg:items-end gap-3 shrink-0 pb-1"
          >
            <div className="text-left lg:text-right min-h-[64px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={prefersReduced ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#E2CCA0] tabular-nums">
                    {currentScene.indexLabel} / 0{HERO_SCENES.length}
                  </p>
                  <p className="font-editorial text-xl font-medium text-[#F8F3EA]">
                    {currentScene.title}
                  </p>
                  <p className="text-xs text-[#F8F3EA]/80">{currentScene.caption}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              role="tablist"
              aria-label="Select hero architectural scene"
              className="flex items-center gap-2"
            >
              {HERO_SCENES.map((scene, idx) => {
                const isCurrent = idx === activeScene;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`View scene ${scene.indexLabel}: ${scene.title}`}
                    onClick={() => setActiveScene(idx)}
                    className="group py-2 px-0.5 cursor-pointer focus-visible:outline-[#F8F3EA]"
                  >
                    <span
                      className={cn(
                        'block h-[2px] rounded-full transition-all duration-300',
                        isCurrent
                          ? 'w-9 bg-[#C6A46A]'
                          : 'w-4 bg-[#F8F3EA]/45 group-hover:bg-[#F8F3EA]/80'
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
