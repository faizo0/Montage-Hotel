import React, { useRef, useState } from 'react';
import { SpaHero } from '@/components/spa/SpaHero';
import { WellnessExperiencesSection } from '@/components/spa/WellnessExperiencesSection';
import { SanctuaryAtmosphereSection } from '@/components/spa/SanctuaryAtmosphereSection';
import { SpaAppointmentSection } from '@/components/spa/SpaAppointmentSection';
import { WELLNESS_EXPERIENCES } from '@/data/spaData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

/**
 * Step 5 — Luxury Pakistani Spa & Wellness Experience
 * Composes SpaHero, WellnessExperiencesSection (6 pillars + modal),
 * SanctuaryAtmosphereSection (parallax diptych), and SpaAppointmentSection (frontend demo).
 */
export function Spa() {
  useDocumentTitle('Spa & Wellness');
  const experiencesRef = useRef(null);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(
    WELLNESS_EXPERIENCES[0].id
  );

  const scrollToAppointment = () => {
    const el = document.getElementById('spa-appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToExperiences = () => {
    experiencesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectTreatmentAndBook = (treatmentId) => {
    setSelectedTreatmentId(treatmentId);
    scrollToAppointment();
  };

  return (
    <div className="bg-[#F8F3EA]">
      <SpaHero
        onBookClick={scrollToAppointment}
        onExploreClick={scrollToExperiences}
      />
      <WellnessExperiencesSection
        sectionRef={experiencesRef}
        onSelectTreatment={handleSelectTreatmentAndBook}
      />
      <SanctuaryAtmosphereSection
        onBookPrivateSuite={() =>
          handleSelectTreatmentAndBook('private-relaxation-suites')
        }
      />
      <SpaAppointmentSection
        selectedTreatmentId={selectedTreatmentId}
        onTreatmentChange={setSelectedTreatmentId}
      />
    </div>
  );
}

export default Spa;
