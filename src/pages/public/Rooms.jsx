import React, { useMemo, useRef, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/layout/Divider';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/buttons/Button';
import { RoomsHero } from '@/components/rooms/RoomsHero';
import { RoomsFilterBar } from '@/components/rooms/RoomsFilterBar';
import { RoomCollectionCard } from '@/components/rooms/RoomCollectionCard';
import { ROOMS_COLLECTION } from '@/data/roomsData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

/**
 * Step 3 — Premium Rooms & Suites Page
 * Features cinematic room hero, interactive frontend filters & sorting,
 * subtle 3D cards with demo size/price labeling, and direct detail & booking routes.
 */
export function Rooms() {
  useDocumentTitle('Rooms & Suites');

  const collectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const [category, setCategory] = useState('All');
  const [minGuests, setMinGuests] = useState(0);
  const [stayPlan, setStayPlan] = useState('daily');
  const [sortBy, setSortBy] = useState('curated');

  const hasActiveFilters =
    category !== 'All' || minGuests !== 0 || stayPlan !== 'daily' || sortBy !== 'curated';

  const handleResetFilters = () => {
    setCategory('All');
    setMinGuests(0);
    setStayPlan('daily');
    setSortBy('curated');
  };

  const handleExploreClick = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredRooms = useMemo(() => {
    const matches = ROOMS_COLLECTION.filter((room) => {
      if (category !== 'All' && room.categoryGroup !== category) return false;
      if (minGuests > 0 && room.maxGuests < minGuests) return false;
      return true;
    });

    const sorted = [...matches];
    switch (sortBy) {
      case 'size-desc':
        sorted.sort((a, b) => b.sizeSqm - a.sizeSqm);
        break;
      case 'guests-desc':
        sorted.sort((a, b) => b.maxGuests - a.maxGuests);
        break;
      default:
        break;
    }

    return sorted;
  }, [category, minGuests, sortBy]);

  return (
    <div className="bg-[#F8F3EA]">
      {/* 1. Cinematic Rooms Hero */}
      <RoomsHero onExploreClick={handleExploreClick} />

      {/* 2. Interactive Filter Panel & Curated Collection */}
      <section ref={collectionRef} className="py-14 md:py-20">
        <Container>
          <div className="mb-12">
            <RoomsFilterBar
              category={category}
              onCategoryChange={setCategory}
              minGuests={minGuests}
              onMinGuestsChange={setMinGuests}
              stayPlan={stayPlan}
              onStayPlanChange={setStayPlan}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              resultCount={filteredRooms.length}
              totalCount={ROOMS_COLLECTION.length}
              onReset={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          <SectionHeader
            kicker="Pakistani Luxury Collection"
            title="Curated Rooms & Private Suites"
            subtitle="Crafted with hand-carved walnut joinery, carved stone arches, and courtyard tranquility. All demo stay rates are displayed in Pakistani Rupees: Daily Stay (1 Night) PKR 5,000, Weekly Package (7 Nights) PKR 20,000, and Monthly Package (30 Nights) PKR 40,000."
            className="mb-10"
          />

          {filteredRooms.length === 0 ? (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[18px] border border-[#E3D5CE] bg-white p-10 text-center shadow-[0_10px_30px_-18px_rgba(41,35,42,0.12)]"
            >
              <p className="editorial-kicker mb-2">No Exact Matches</p>
              <h3 className="font-editorial text-2xl font-medium text-[#29232A] mb-2">
                No demo residences match your active filter selection
              </h3>
              <p className="mx-auto max-w-md text-sm text-[#5B5258] mb-6">
                Adjust the category or guest capacity filter to explore our
                complete collection of rooms and suites.
              </p>
              <Button type="button" onClick={handleResetFilters} variant="primary">
                Show All Residences
              </Button>
            </motion.div>
          ) : (
            <LayoutGroup>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {filteredRooms.map((room, index) => (
                  <RoomCollectionCard
                    key={room.id}
                    room={room}
                    index={index}
                    stayPlan={stayPlan}
                  />
                ))}
              </div>
            </LayoutGroup>
          )}

          <Divider ornate className="my-14" />

          {/* Subtle Editorial Demo Disclaimer */}
          <div className="rounded-[14px] border border-[#E3D5CE] bg-[#E9DDE0]/45 px-6 py-5 text-xs leading-relaxed text-[#5B5258] flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <strong className="font-semibold text-[#702D43]">
                Illustrative Demo Data Notice:
              </strong>{' '}
              Weekly (PKR 20,000 / 7 Nights) and Monthly (PKR 40,000 / 30 Nights) are package prices rather than nightly rates. Daily Stay (1 Night) is PKR 5,000. All rates are frontend demo figures without live payments.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Rooms;
