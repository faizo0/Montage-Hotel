import React, { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Users, Utensils } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { RESTAURANT_ATMOSPHERE } from '@/data/diningData';
import { gsap, registerGsapPlugins, prefersReducedMotion, LUXURY_EASE } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

const ATMOSPHERE_PILLARS = [
  { icon: Sparkles, label: 'Sculpted Limestone Interiors' },
  { icon: Utensils, label: 'Hammered Brass & Linen Tables' },
  { icon: Users, label: 'Warm Family & Private Alcoves' },
];

/**
 * Step 4 — Interactive Restaurant Atmosphere Showcase (01–05)
 * Highlights elegant interiors, dining tables, warm evening ambience,
 * family dining atmosphere, and private dining salons with GSAP mask reveal.
 */
export function AtmosphereShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const stageMaskRef = useRef(null);
  const selectorColRef = useRef(null);

  const activeItem = RESTAURANT_ATMOSPHERE[activeIdx] || RESTAURANT_ATMOSPHERE[0];

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    registerGsapPlugins();
    let ctx;
    try {
      ctx = gsap.context(() => {
        if (stageMaskRef.current) {
          gsap.from(stageMaskRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.05,
            ease: LUXURY_EASE,
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: stageMaskRef.current,
              start: 'top 84%',
              once: true,
            },
          });
        }

        const tabs = selectorColRef.current
          ? selectorColRef.current.querySelectorAll('[data-atmosphere-tab]')
          : [];
        if (tabs.length) {
          gsap.from(tabs, {
            y: 20,
            opacity: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: LUXURY_EASE,
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: selectorColRef.current,
              start: 'top 84%',
              once: true,
            },
          });
        }
      }, sectionRef);
    } catch {
      gsap.set(root.querySelectorAll('[data-atmosphere-tab]'), { clearProps: 'all' });
    }

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-[#E3D5CE] bg-[#F8F3EA] py-16 md:py-24">
      <Container>
        <SectionHeader
          kicker="Evening & Family Ambience"
          title="Spaces Crafted for Unhurried Gatherings"
          subtitle="From sunlit courtyard tables and carved arches to lantern-lit evening colonnades, welcoming family banquets, and intimate private dining salons."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Large Interactive Atmosphere Stage with GSAP Curtain Mask Reveal */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              ref={stageMaskRef}
              className="relative flex-1 overflow-hidden rounded-[20px] border border-[#E3D5CE] bg-[#29232A] shadow-[0_22px_54px_-22px_rgba(41,35,42,0.22)]"
            >
              <div className="relative aspect-[16/10] h-full min-h-[320px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.title}
                    initial={prefersReduced ? false : { opacity: 0.25, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReduced ? undefined : { opacity: 0.25 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full object-cover object-center"
                  />
                </AnimatePresence>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#26141C]/85 via-[#26141C]/30 to-transparent"
                />

                <div className="absolute inset-x-6 bottom-6 text-[#F8F3EA]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E2CCA0] mb-1">
                    0{activeIdx + 1} / 0{RESTAURANT_ATMOSPHERE.length} · {activeItem.caption}
                  </p>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-medium">
                    {activeItem.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 5 Interactive Atmosphere Selector Cards */}
          <div
            ref={selectorColRef}
            className="lg:col-span-5 flex flex-col justify-between gap-2.5"
          >
            {RESTAURANT_ATMOSPHERE.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  data-atmosphere-tab=""
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-pressed={isSelected}
                  className={cn(
                    'group text-left rounded-[14px] border px-4 py-3.5 transition-all duration-300 cursor-pointer',
                    isSelected
                      ? 'border-[#C6A46A] bg-white shadow-[0_14px_34px_-18px_rgba(112,45,67,0.22)]'
                      : 'border-[#E3D5CE] bg-[#E9DDE0]/35 hover:border-[#C6A46A]/65 hover:bg-white/80'
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        'font-mono text-[10px] font-semibold tracking-[0.16em]',
                        isSelected ? 'text-[#702D43]' : 'text-[#877B80]'
                      )}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={cn(
                        'h-[1.5px] transition-all duration-300',
                        isSelected ? 'w-10 bg-[#C6A46A]' : 'w-5 bg-[#C6A46A]/40 group-hover:w-8'
                      )}
                    />
                  </div>
                  <h4
                    className={cn(
                      'font-editorial text-lg font-medium mb-0.5 transition-colors',
                      isSelected ? 'text-[#702D43]' : 'text-[#29232A]'
                    )}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#5B5258]">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Concise Hospitality Highlights Bar */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ATMOSPHERE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="flex items-center gap-3 rounded-[12px] border border-[#E3D5CE] bg-white px-5 py-4 shadow-[0_4px_18px_-14px_rgba(41,35,42,0.12)]"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#E9DDE0] text-[#702D43]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-[#29232A]">{pillar.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default AtmosphereShowcase;
