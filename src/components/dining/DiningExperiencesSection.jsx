import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import { DINING_EXPERIENCES } from '@/data/diningData';
import { gsap, registerGsapPlugins, prefersReducedMotion, LUXURY_EASE } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * Step 4 — Five Signature Pakistani & International Restaurant Experiences
 * Displays Pakistani Fine Dining, International Cuisine, Traditional Breakfast,
 * Signature Desserts, and Tea & Coffee Salon with smooth GSAP image mask reveals.
 */
export function DiningExperiencesSection({ onSelectVenue }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    registerGsapPlugins();
    let ctx;
    try {
      ctx = gsap.context(() => {
        const cards = root.querySelectorAll('[data-dining-exp-card]');
        const masks = root.querySelectorAll('[data-dining-img-mask]');
        const triggerEl = root.querySelector('[data-dining-exp-grid]');

        if (cards.length) {
          gsap.from(cards, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: LUXURY_EASE,
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top 84%',
              once: true,
            },
          });
        }

        if (masks.length) {
          gsap.from(masks, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.05,
            stagger: 0.12,
            ease: LUXURY_EASE,
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top 84%',
              once: true,
            },
          });
        }
      }, sectionRef);
    } catch {
      gsap.set(root.querySelectorAll('[data-dining-exp-card], [data-dining-img-mask]'), {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, []);

  const [featured, ...secondaryExperiences] = DINING_EXPERIENCES;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#F8F3EA]">
      <Container>
        <SectionHeader
          kicker="Culinary Pillars"
          title="Five Distinct Dining Experiences"
          subtitle="From candlelit Mughal-inspired evenings and seasonal international plates to sunlit courtyard breakfasts, gilded desserts, and ceremonial Pakistani chai service."
          className="mb-12"
        />

        <div data-dining-exp-grid="" className="space-y-8">
          {/* Flagship Pakistani Fine Dining Feature */}
          {featured && (
            <article
              data-dining-exp-card=""
              className="group overflow-hidden rounded-[20px] border border-[#E3D5CE] bg-gradient-to-br from-white via-[#F8F3EA]/80 to-[#E9DDE0]/45 shadow-[0_14px_40px_-20px_rgba(41,35,42,0.16)] transition-all duration-500 hover:border-[#C6A46A]/75 hover:shadow-[0_26px_54px_-22px_rgba(112,45,67,0.22)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div data-dining-img-mask="" className="relative lg:col-span-7 overflow-hidden">
                  <ImageWithFallback
                    src={featured.image}
                    alt={featured.alt}
                    aspectRatio="aspect-[16/10]"
                    className="h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
                  />
                  <span className="pointer-events-none absolute left-5 top-5 rounded-[8px] border border-[#C6A46A]/50 bg-[#29232A]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0] backdrop-blur-sm">
                    Signature Flagship
                  </span>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between p-7 md:p-10">
                  <div>
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="h-[1.5px] w-7 bg-[#C6A46A]" aria-hidden="true" />
                      <p className="editorial-kicker">{featured.venue}</p>
                    </div>
                    <h3 className="font-editorial text-3xl font-medium text-[#29232A] mb-3 group-hover:text-[#702D43] transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#5B5258] leading-relaxed mb-6">
                      {featured.summary}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {featured.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-xs font-medium text-[#29232A]/85"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#702D43]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#E3D5CE] pt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="inline-flex items-center gap-2 text-xs text-[#877B80]">
                      <Clock className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                      <span>{featured.serviceHours}</span>
                    </span>
                    <Button
                      type="button"
                      onClick={() => onSelectVenue?.('Diwan Heritage Salon (Pakistani Fine Dining)')}
                      variant="primary"
                      size="sm"
                      icon={ArrowRight}
                      magnetic
                    >
                      Reserve Table
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* 4 Companion Experiences Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {secondaryExperiences.map((exp) => (
              <article
                key={exp.id}
                data-dining-exp-card=""
                className={cn(
                  'group flex flex-col overflow-hidden rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/75 to-[#E9DDE0]/45',
                  'shadow-[0_8px_28px_-16px_rgba(41,35,42,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'hover:-translate-y-1 hover:border-[#C6A46A]/70 hover:shadow-[0_24px_48px_-20px_rgba(112,45,67,0.2)]'
                )}
              >
                <div data-dining-img-mask="" className="relative overflow-hidden">
                  <ImageWithFallback
                    src={exp.image}
                    alt={exp.alt}
                    aspectRatio="aspect-[16/10]"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#26141C]/65 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <span className="pointer-events-none absolute bottom-3.5 left-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0]">
                    {exp.venue}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                  <div>
                    <h3 className="display-card mb-2.5 group-hover:text-[#702D43] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-[#5B5258] leading-relaxed mb-5">
                      {exp.summary}
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 mb-6">
                      {exp.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-[#29232A]/85"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#702D43]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#E3D5CE] pt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#877B80]">
                      <Clock className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                      <span>{exp.serviceHours}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectVenue?.(exp.venue)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#702D43] hover:text-[#572133] transition-colors cursor-pointer"
                    >
                      <span>Reserve Salon</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DiningExperiencesSection;
