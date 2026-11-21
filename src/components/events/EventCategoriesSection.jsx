import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import { EVENT_CATEGORIES } from '@/data/eventsData';
import { cn } from '@/utils/cn';

const FILTER_GROUPS = [
  'All Celebrations',
  'Weddings & Ceremonies',
  'Social & Family',
  'Corporate & Diplomatic',
];

/**
 * Step 7 — Eight Dedicated Event Categories Showcase
 * Presents Pakistani Wedding Events, Mehndi Celebrations, Baraat & Walima,
 * Engagement Ceremonies, Birthday Celebrations, Corporate Events, Private Parties,
 * and Family Gatherings with functional filtering and form pre-selection.
 */
export function EventCategoriesSection({ onPlanCategory }) {
  const prefersReduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('All Celebrations');

  const visibleCategories = useMemo(() => {
    if (activeFilter === 'All Celebrations') return EVENT_CATEGORIES;
    return EVENT_CATEGORIES.filter((item) => item.filterGroup === activeFilter);
  }, [activeFilter]);

  return (
    <section id="event-categories" className="py-16 md:py-24 bg-[#F8F3EA]">
      <Container>
        <SectionHeader
          kicker="Celebration Categories"
          title="Crafted for Every Pakistani Milestone"
          subtitle="Select from eight curated celebration formats spanning multi-day weddings, vibrant courtyard Mehndis, formal corporate galas, and discreet family dinners."
          className="mb-10"
        />

        {/* Functional Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter celebration categories"
          className="mb-10 flex flex-wrap items-center gap-2.5"
        >
          {FILTER_GROUPS.map((group) => {
            const isSelected = activeFilter === group;
            return (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(group)}
                className={cn(
                  'rounded-[10px] border px-4 py-2 text-xs font-semibold uppercase tracking-[0.11em] whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer',
                  isSelected
                    ? 'border-[#C6A46A]/65 bg-[#702D43] text-white shadow-[0_8px_20px_-10px_rgba(112,45,67,0.55)]'
                    : 'border-[#E3D5CE] bg-white text-[#5B5258] hover:border-[#C6A46A] hover:text-[#702D43]'
                )}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* 2-Column Editorial Category Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {visibleCategories.map((category, idx) => (
            <motion.article
              key={category.id}
              initial={prefersReduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.6,
                delay: Math.min((idx % 2) * 0.08, 0.18),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/80 to-[#E9DDE0]/45 shadow-[0_10px_30px_-18px_rgba(41,35,42,0.14)] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#C6A46A]/80 hover:shadow-[0_24px_48px_-22px_rgba(112,45,67,0.20)]"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.alt}
                  aspectRatio="aspect-[16/10]"
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26141C]/65 via-transparent to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                <div>
                  {/* Clean Unboxed Metadata */}
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#877B80]">
                    <span className="font-mono font-semibold text-[#702D43] tabular-nums">
                      {category.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#5B5258]">
                      {category.filterGroup}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{category.setting}</span>
                  </div>

                  <h3 className="display-card mb-2.5 transition-colors group-hover:text-[#702D43]">
                    {category.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5B5258] mb-5">
                    {category.summary}
                  </p>

                  <ul className="space-y-2 border-t border-[#E3D5CE] pt-4 text-xs text-[#5B5258]">
                    {category.highlights.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A46A]"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-[#E3D5CE] pt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#877B80]">
                    PKR Quote Upon Request
                  </span>
                  <Button
                    type="button"
                    onClick={() => onPlanCategory?.(category)}
                    variant="secondary"
                    size="sm"
                    icon={ArrowRight}
                  >
                    Plan This Event
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default EventCategoriesSection;
