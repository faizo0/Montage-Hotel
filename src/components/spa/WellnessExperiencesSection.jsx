import React, { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock, Sparkles, X } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/buttons/Button';
import { SpaExperienceCard } from '@/components/spa/SpaExperienceCard';
import { WELLNESS_EXPERIENCES } from '@/data/spaData';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const CATEGORY_TABS = [
  'All Rituals',
  'Spa & Massage',
  'Pool & Thermal',
  'Lounge & Private Suites',
];

/**
 * Step 5 — Wellness Experiences Grid & Interactive Detail Modal
 * Showcases all 6 wellness categories with live filtering and modal ritual inspection.
 */
export function WellnessExperiencesSection({ sectionRef, onSelectTreatment }) {
  const [activeTab, setActiveTab] = useState('All Rituals');
  const [activeExperience, setActiveExperience] = useState(null);
  const prefersReduced = useReducedMotion();

  const filteredExperiences = useMemo(() => {
    if (activeTab === 'All Rituals') return WELLNESS_EXPERIENCES;
    return WELLNESS_EXPERIENCES.filter((item) => item.categoryGroup === activeTab);
  }, [activeTab]);

  const handleBookFromModal = (experience) => {
    setActiveExperience(null);
    onSelectTreatment?.(experience.id);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#F8F3EA]">
      <Container>
        <SectionHeader
          kicker="Thermal & Restorative Rituals"
          title="Six Pathways to Stillness"
          subtitle="From heated marble hammam therapies and saffron stone massage to sunlit pool repose, cedarwood steam vaults, quiet tea lounges, and private relaxation suites. Details represent illustrative demo facilities."
          className="mb-10"
        />

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter wellness experiences by category"
          className="mb-10 flex flex-wrap items-center gap-2.5"
        >
          {CATEGORY_TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-[10px] border px-4 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-all duration-200 cursor-pointer',
                  isSelected
                    ? 'border-[#C6A46A]/65 bg-[#702D43] text-white shadow-[0_8px_20px_-10px_rgba(112,45,67,0.55)]'
                    : 'border-[#E3D5CE] bg-white text-[#5B5258] hover:border-[#C6A46A] hover:text-[#702D43]'
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Experience Cards Grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredExperiences.map((exp, idx) => (
              <SpaExperienceCard
                key={exp.id}
                experience={exp}
                index={idx}
                onViewExperience={setActiveExperience}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Explicit Demo Disclaimer */}
        <div className="mt-12 rounded-[14px] border border-[#E3D5CE] bg-[#E9DDE0]/45 px-6 py-4 text-xs leading-relaxed text-[#5B5258]">
          <strong className="font-semibold text-[#702D43]">Demo Content Notice:</strong>{' '}
          All spa rituals, thermal facilities, treatment durations, and pricing displayed on this page are illustrative frontend demo data and do not represent confirmed real-world hotel amenities.
        </div>
      </Container>

      {/* Experience Detail Inspection Modal */}
      <AnimatePresence>
        {activeExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="spa-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#29232A]/70 p-4 backdrop-blur-sm"
            onClick={() => setActiveExperience(null)}
          >
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[20px] border border-[#C6A46A]/55 bg-[#F8F3EA] shadow-[0_32px_70px_-20px_rgba(41,35,42,0.5)]"
            >
              <button
                type="button"
                onClick={() => setActiveExperience(null)}
                aria-label="Close experience overview"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6A46A]/50 bg-[#29232A]/75 text-[#F8F3EA] hover:bg-[#702D43] transition-colors cursor-pointer backdrop-blur-sm"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="aspect-[16/9] w-full overflow-hidden bg-[#29232A]">
                <img
                  src={activeExperience.image}
                  alt={activeExperience.alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E3D5CE] pb-5">
                  <div>
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                      <p className="editorial-kicker">
                        {activeExperience.wing} · {activeExperience.categoryGroup}
                      </p>
                    </div>
                    <h3
                      id="spa-modal-title"
                      className="font-editorial text-2xl sm:text-3xl font-medium text-[#29232A]"
                    >
                      {activeExperience.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                      {activeExperience.subtitle}
                    </p>
                  </div>

                  <div className="rounded-[12px] border border-[#E3D5CE] bg-white px-4 py-3 text-left sm:text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                      Demo Pricing
                    </span>
                    <span className="font-editorial text-2xl font-medium text-[#702D43] tabular-nums">
                      {formatCurrency(activeExperience.demoPrice)}
                    </span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-[#5B5258] leading-relaxed">
                  {activeExperience.overview}
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {activeExperience.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-[10px] border border-[#E3D5CE] bg-white px-4 py-3 text-xs font-medium text-[#29232A]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#702D43]" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D5CE] pt-5">
                  <div className="flex items-center gap-4 text-xs text-[#5B5258]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#C6A46A]" aria-hidden="true" />
                      <span>{activeExperience.demoDuration}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#702D43]">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Demo Preview Only</span>
                    </span>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleBookFromModal(activeExperience)}
                    variant="primary"
                    size="md"
                    icon={ArrowRight}
                    magnetic
                  >
                    Request Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WellnessExperiencesSection;
