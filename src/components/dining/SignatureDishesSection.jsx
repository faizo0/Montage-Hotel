import React, { useMemo, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { SIGNATURE_DISHES } from '@/data/diningData';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const CUISINE_TABS = [
  'All',
  'Pakistani Fine Dining',
  'International Cuisine',
  'Traditional Breakfast',
  'Signature Desserts',
  'Tea & Coffee',
];

/**
 * Step 4 — Signature Dishes Gallery with Interactive Cuisine Filtering
 * Displays Pakistani and international editorial food cards with clearly labelled demo pricing.
 */
export function SignatureDishesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const prefersReduced = useReducedMotion();

  const visibleDishes = useMemo(() => {
    if (activeCategory === 'All') return SIGNATURE_DISHES;
    return SIGNATURE_DISHES.filter((dish) => dish.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="signature-dishes"
      className="border-t border-[#E3D5CE] bg-[#E9DDE0]/40 py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Culinary Repertoire"
          title="Signature Dishes & Artisanal Service"
          subtitle="A seasonal taste of copper-handi classics, charcoal grill specialties, morning courtyard plates, gilded desserts, and ceremonial chai. Dish descriptions and pricing are illustrative demo examples."
          className="mb-10"
        />

        {/* Interactive Cuisine Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter signature dishes by cuisine category"
          className="mb-10 flex flex-wrap items-center gap-2.5"
        >
          {CUISINE_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab)}
                className={cn(
                  'rounded-[10px] border px-4 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'border-[#C6A46A]/65 bg-[#702D43] text-white shadow-[0_8px_20px_-10px_rgba(112,45,67,0.55)]'
                    : 'border-[#E3D5CE] bg-white text-[#5B5258] hover:border-[#C6A46A] hover:text-[#702D43]'
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Dish Cards Grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visibleDishes.map((dish, idx) => (
              <motion.article
                layout
                key={dish.id}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(idx * 0.06, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-[#E3D5CE] bg-white shadow-[0_8px_28px_-16px_rgba(41,35,42,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#C6A46A]/75 hover:shadow-[0_24px_48px_-20px_rgba(112,45,67,0.2)]"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={dish.image}
                    alt={dish.alt}
                    aspectRatio="aspect-[4/3]"
                    className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span className="pointer-events-none absolute left-4 top-4 rounded-[8px] border border-[#C6A46A]/45 bg-[#29232A]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E2CCA0] backdrop-blur-sm">
                    {dish.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-editorial text-xl md:text-2xl font-medium text-[#29232A] mb-2.5 group-hover:text-[#702D43] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-[#5B5258] leading-relaxed mb-5">
                      {dish.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E3D5CE] pt-4">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                        Demo Price
                      </span>
                      <span className="font-editorial text-xl font-medium text-[#702D43] tabular-nums">
                        {formatCurrency(dish.demoPrice)}
                      </span>
                    </div>
                    <span className="rounded-[8px] bg-[#E9DDE0]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#702D43]">
                      Sample Menu
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </LayoutGroup>
      </Container>
    </section>
  );
}

export default SignatureDishesSection;
