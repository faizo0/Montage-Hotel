import React, { useRef, useState } from 'react';
import { EventsHero } from '@/components/events/EventsHero';
import { EventCategoriesSection } from '@/components/events/EventCategoriesSection';
import { EventVenuesSection } from '@/components/events/EventVenuesSection';
import { EventPackagesSection } from '@/components/events/EventPackagesSection';
import { EventInquirySection } from '@/components/events/EventInquirySection';
import {
  EVENT_CATEGORIES,
  EVENT_PACKAGES,
  EVENT_VENUES,
} from '@/data/eventsData';

/**
 * Step 7 — Events & Weddings Page
 * Showcases 8 celebration categories, 4 Pakistani luxury hotel venues with
 * interactive galleries, 3 editable PKR / "Request a Quote" package tiers,
 * and a frontend-only celebration inquiry form.
 */
export function Events() {
  const venuesRef = useRef(null);
  const inquiryRef = useRef(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    EVENT_CATEGORIES[0]?.id || 'pakistani-wedding-events'
  );
  const [selectedVenueId, setSelectedVenueId] = useState(
    EVENT_VENUES[0]?.id || 'grand-ballroom'
  );
  const [selectedPackageId, setSelectedPackageId] = useState(
    EVENT_PACKAGES[1]?.id || 'gold-package'
  );

  const scrollToVenues = () => {
    venuesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInquiry = () => {
    setTimeout(() => {
      inquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handlePlanCategory = (category) => {
    if (category?.id) setSelectedCategoryId(category.id);
    if (category?.recommendedVenueId) setSelectedVenueId(category.recommendedVenueId);
    if (category?.recommendedPackageId) setSelectedPackageId(category.recommendedPackageId);
    scrollToInquiry();
  };

  const handleSelectVenue = (venue) => {
    if (venue?.id) setSelectedVenueId(venue.id);
    scrollToInquiry();
  };

  const handleSelectPackage = (pkg) => {
    if (pkg?.id) setSelectedPackageId(pkg.id);
    scrollToInquiry();
  };

  return (
    <div className="bg-[#F8F3EA]">
      <EventsHero
        onExploreVenues={scrollToVenues}
        onRequestQuote={scrollToInquiry}
      />

      <EventCategoriesSection onPlanCategory={handlePlanCategory} />

      <EventVenuesSection
        sectionRef={venuesRef}
        onSelectVenue={handleSelectVenue}
      />

      <EventPackagesSection
        selectedPackageId={selectedPackageId}
        onSelectPackage={handleSelectPackage}
      />

      <div ref={inquiryRef}>
        <EventInquirySection
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
          selectedVenueId={selectedVenueId}
          onVenueChange={setSelectedVenueId}
          selectedPackageId={selectedPackageId}
          onPackageChange={setSelectedPackageId}
        />
      </div>
    </div>
  );
}

export default Events;
