import React, { useMemo, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { CuratedExperienceCard } from '@/components/experiences/CuratedExperienceCard';
import { ExperienceDetailModal } from '@/components/experiences/ExperienceDetailModal';
import { CURATED_EXPERIENCES } from '@/data/experiencesData';
import { cn } from '@/utils/cn';

const EXPERIENCE_FILTER_TABS = [
  'All Experiences',
  'Culture & Heritage',
  'Culinary & Romance',
  'Family & Celebrations',
  'Outdoors & Leisure',
];

/**
 * Step 6 — Curated Luxury Experiences Grid & Detail Modal Host
 * Presents all 8 Pakistani luxury hotel experiences with category filtering,
 * interactive card tilt, and full multi-gallery detail inspection modal.
 */
export function ExperiencesCollectionSection({ sectionRef, onInquireExperience }) {
  const [activeTab, setActiveTab] = useState('All Experiences');
  const [activeExperience, setActiveExperience] = useState(null);

  const filteredExperiences = useMemo(() => {
    if (activeTab === 'All Experiences') return CURATED_EXPERIENCES;
    return CURATED_EXPERIENCES.filter((item) => item.filterGroup === activeTab);
  }, [activeTab]);

  const handleInquireFromModal = (experience) => {
    setActiveExperience(null);
    onInquireExperience?.(experience.id);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#F8F3EA]">
      <Container>
        <SectionHeader
          kicker="Curated Collection"
          title="Eight Signature Experiences"
          subtitle="From evening calligraphy salons and candlelit courtyard suppers to romantic reflection-pool pavilions, manicured cypress walks, and chauffeur heritage drives. All details represent illustrative demo offerings."
          className="mb-10"
        />

        {/* Editorial Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter curated experiences by category"
          className="mb-10 flex flex-wrap items-center gap-2.5"
        >
          {EXPERIENCE_FILTER_TABS.map((tab) => {
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

        {/* Balanced Responsive Card Grid */}
        <LayoutGroup>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredExperiences.map((exp, idx) => (
              <CuratedExperienceCard
                key={exp.id}
                experience={exp}
                index={idx}
                onViewExperience={setActiveExperience}
                onQuickInquire={(item) => onInquireExperience?.(item.id)}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Explicit Demo Disclaimer */}
        <div className="mt-12 rounded-[14px] border border-[#E3D5CE] bg-[#E9DDE0]/45 px-6 py-4 text-xs leading-relaxed text-[#5B5258]">
          <strong className="font-semibold text-[#702D43]">Demo Content Notice:</strong>{' '}
          All cultural programs, excursions, celebration setups, itineraries, and timings presented on this page are illustrative frontend demo examples and do not represent guaranteed operational hotel schedules.
        </div>
      </Container>

      <ExperienceDetailModal
        experience={activeExperience}
        onClose={() => setActiveExperience(null)}
        onSelectExperience={setActiveExperience}
        onInquireExperience={handleInquireFromModal}
      />
    </section>
  );
}

export default ExperiencesCollectionSection;
