import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { HotelCard } from '@/components/common/HotelCard';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { ROOMS_DATA } from '@/data/roomsData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';

/**
 * Section 7 — Signature Rooms Preview
 * Showcases Deluxe Room, Executive Suite, and Presidential Suite.
 */
export function RoomsPreview() {
  return (
    <section className="border-t border-[#E3D5CE] bg-[#E9DDE0]/40 py-16 md:py-24">
      <Container>
        <SectionHeader
          kicker="Accommodations"
          title="Signature Rooms & Suites"
          subtitle="Thoughtfully proportioned residences crafted with warm marble arches, hand-carved Pakistani woodwork, and serene courtyard views."
          action={
            <Button to={PUBLIC_ROUTES.ROOMS} variant="outline" icon={ArrowRight}>
              All Rooms & Suites
            </Button>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS_DATA.map((room, index) => (
            <RevealOnScroll key={room.id} delay={index * 0.08} y={24}>
              <HotelCard room={room} className="h-full" />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default RoomsPreview;
