import React, { useState } from 'react';
import { DiningHero } from '@/components/dining/DiningHero';
import { DiningExperiencesSection } from '@/components/dining/DiningExperiencesSection';
import { SignatureDishesSection } from '@/components/dining/SignatureDishesSection';
import { AtmosphereShowcase } from '@/components/dining/AtmosphereShowcase';
import { TableReservationSection } from '@/components/dining/TableReservationSection';
import { DINING_VENUES } from '@/data/diningData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

/**
 * Step 4 — Premium Pakistani Dining & Restaurants Experience
 * Composes full-width culinary hero, 5 dining pillars, filterable signature dishes,
 * interactive restaurant atmosphere showcase, and frontend-only table reservation desk.
 */
export function Dining() {
  useDocumentTitle('Dining & Restaurants');
  const [selectedVenue, setSelectedVenue] = useState(DINING_VENUES[0]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectVenueAndReserve = (venueTitleOrName) => {
    const matched =
      DINING_VENUES.find((v) =>
        v.toLowerCase().includes((venueTitleOrName || '').toLowerCase())
      ) || DINING_VENUES[0];
    setSelectedVenue(matched);
    scrollToSection('table-reservation');
  };

  return (
    <div className="bg-[#F8F3EA]">
      <DiningHero
        onReserveClick={() => scrollToSection('table-reservation')}
        onExploreDishesClick={() => scrollToSection('signature-dishes')}
      />
      <DiningExperiencesSection onSelectVenue={handleSelectVenueAndReserve} />
      <SignatureDishesSection />
      <AtmosphereShowcase />
      <TableReservationSection
        selectedVenue={selectedVenue}
        onVenueChange={setSelectedVenue}
      />
    </div>
  );
}

export default Dining;
