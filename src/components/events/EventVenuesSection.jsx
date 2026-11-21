import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Eye } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import { VenueGalleryModal } from '@/components/events/VenueGalleryModal';
import { EVENT_VENUES } from '@/data/eventsData';
import { cn } from '@/utils/cn';

function VenueCard({ venue, index, onOpenGallery, onSelectVenue }) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-py * 2.8).toFixed(2)),
      rotateY: Number((px * 3.0).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    if (tilt.rotateX !== 0 || tilt.rotateY !== 0) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  };

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: Math.min((index % 2) * 0.1, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          prefersReduced
            ? undefined
            : {
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transformStyle: 'preserve-3d',
              }
        }
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/80 to-[#E9DDE0]/50',
          'shadow-[0_12px_32px_-18px_rgba(41,35,42,0.16)]',
          'transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:-translate-y-1 hover:border-[#C6A46A]/85 hover:shadow-[0_28px_56px_-22px_rgba(112,45,67,0.22)]'
        )}
      >
        <button
          type="button"
          onClick={() => onOpenGallery?.(venue)}
          aria-label={`Open photo gallery for ${venue.name}`}
          className="relative block w-full overflow-hidden text-left cursor-pointer focus-visible:outline-none"
        >
          <ImageWithFallback
            src={venue.image}
            alt={venue.alt}
            aspectRatio="aspect-[16/10]"
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26141C]/80 via-[#26141C]/15 to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-88"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-center justify-between text-[#F8F3EA]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0] tabular-nums">
              {venue.capacityRange}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
              <Eye className="h-3.5 w-3.5 text-[#E2CCA0]" aria-hidden="true" />
              <span>View Gallery ({venue.gallery?.length || 1})</span>
            </span>
          </div>
        </button>

        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            {/* Clean Unboxed Metadata */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#877B80]">
              <span className="font-medium text-[#702D43]">{venue.areaSqFt}</span>
              <span aria-hidden="true">·</span>
              <span>{venue.idealFor}</span>
            </div>

            <h3 className="display-card mb-1 transition-colors group-hover:text-[#702D43]">
              {venue.name}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#877B80] mb-4">
              {venue.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[#5B5258] mb-5">
              {venue.description}
            </p>

            {/* Tabular Seating Strips */}
            <div className="grid grid-cols-3 gap-3 border-y border-[#E3D5CE] py-3.5 mb-5">
              {venue.seatingModes.map((mode) => (
                <div key={mode.label}>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#877B80]">
                    {mode.label}
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-[#29232A] tabular-nums">
                    {mode.value}
                  </span>
                </div>
              ))}
            </div>

            <ul className="space-y-2 text-xs text-[#5B5258]">
              {venue.amenities.map((amenity) => (
                <li key={amenity} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A46A]" aria-hidden="true" />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-[#E3D5CE] pt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onOpenGallery?.(venue)}
              className="text-xs font-semibold uppercase tracking-[0.13em] text-[#702D43] hover:text-[#29232A] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              Inspect Photos
            </button>
            <Button
              type="button"
              onClick={() => onSelectVenue?.(venue)}
              variant="primary"
              size="sm"
              icon={ArrowRight}
            >
              Select Venue
            </Button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

/**
 * Step 7 — Four Signature Hotel Event Venues Section
 * Showcases Grand Ballroom, Luxury Banquet Hall, Outdoor Event Space,
 * and Private Celebration Hall with interactive gallery lightbox & inquiry linking.
 */
export function EventVenuesSection({ sectionRef, onSelectVenue }) {
  const [galleryVenue, setGalleryVenue] = useState(null);

  const handleSelectFromModal = (venue) => {
    setGalleryVenue(null);
    onSelectVenue?.(venue);
  };

  return (
    <section
      ref={sectionRef}
      id="event-venues"
      className="border-y border-[#E3D5CE] bg-[#E9DDE0]/42 py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Architectural Spaces"
          title="Four Distinguished Event Venues"
          subtitle="Thoughtfully proportioned halls and open-air stone courtyards designed for grand Pakistani wedding processions, executive summits, and intimate family evenings."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {EVENT_VENUES.map((venue, idx) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              index={idx}
              onOpenGallery={setGalleryVenue}
              onSelectVenue={onSelectVenue}
            />
          ))}
        </div>
      </Container>

      <VenueGalleryModal
        venue={galleryVenue}
        onClose={() => setGalleryVenue(null)}
        onSelectVenue={handleSelectFromModal}
      />
    </section>
  );
}

export default EventVenuesSection;
