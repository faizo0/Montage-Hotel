import React, { useRef, useState } from 'react';
import { ExperiencesHero } from '@/components/experiences/ExperiencesHero';
import { ExperiencesCollectionSection } from '@/components/experiences/ExperiencesCollectionSection';
import { ExperienceInquirySection } from '@/components/experiences/ExperienceInquirySection';
import { CURATED_EXPERIENCES } from '@/data/experiencesData';

/**
 * Step 6 — Curated Luxury Experiences & Activities Page
 * Features full-width Pakistani architectural garden hero with GSAP image mask reveal
 * & kinetic typography, 8 categorized luxury experience collections, multi-image
 * detail modal with illustrative itineraries, and a frontend-only inquiry desk.
 */
export function Experiences() {
  const collectionRef = useRef(null);
  const inquiryRef = useRef(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState(
    CURATED_EXPERIENCES[0]?.id || 'pakistani-cultural-experiences'
  );

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInquiry = (experienceId) => {
    if (experienceId) {
      setSelectedExperienceId(experienceId);
    }
    setTimeout(() => {
      inquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <div className="bg-[#F8F3EA]">
      <ExperiencesHero
        onExploreClick={scrollToCollection}
        onInquireClick={() => scrollToInquiry()}
      />

      <ExperiencesCollectionSection
        sectionRef={collectionRef}
        onInquireExperience={scrollToInquiry}
      />

      <div ref={inquiryRef}>
        <ExperienceInquirySection
          selectedExperienceId={selectedExperienceId}
          onExperienceChange={setSelectedExperienceId}
        />
      </div>
    </div>
  );
}

export default Experiences;
