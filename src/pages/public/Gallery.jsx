import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { HOTEL_IMAGES } from '@/assets/images';

export function Gallery() {
  const frames = [
    {
      src: HOTEL_IMAGES.heroExterior,
      alt: 'Grand Pakistani Hotel Exterior & Reflection Courtyard',
      kicker: 'Exterior Arrival',
      caption: 'Grand Limestone Facade & Reflection Courtyard',
    },
    {
      src: HOTEL_IMAGES.lobbyHero,
      alt: 'Signature Grand Lobby & Carved Jaali Colonnade',
      kicker: 'Arrival Hall',
      caption: 'Double-Height Lobby & Carved Stone Colonnade',
    },
    {
      src: HOTEL_IMAGES.presidentialSuite,
      alt: 'Presidential Suite & Arched Garden Sanctuary',
      kicker: 'Private Residence',
      caption: 'Presidential Suite Lounge & Arched Garden Terrace',
    },
    {
      src: HOTEL_IMAGES.fineDining,
      alt: 'Diwan Signature Fine Dining Room',
      kicker: 'Gastronomy',
      caption: 'Diwan Signature Dining Beneath Carved Arches',
    },
    {
      src: HOTEL_IMAGES.swimmingPool,
      alt: 'Travertine Infinity Swimming Pool',
      kicker: 'Tranquil Waters',
      caption: 'Courtyard Infinity Pool & Limestone Colonnade',
    },
    {
      src: HOTEL_IMAGES.eventsWedding,
      alt: 'Grand Wedding & Celebration Pavilion',
      kicker: 'Grand Gatherings',
      caption: 'Celebration Pavilion & Illuminated Floral Arches',
    },
    {
      src: HOTEL_IMAGES.spaWellness,
      alt: 'The Marble Hammam & Botanical Spa Sanctuary',
      kicker: 'Thermal Wellness',
      caption: 'Sunlit Travertine Hammam & Quiet Thermal Baths',
    },
    {
      src: HOTEL_IMAGES.executiveSuite,
      alt: 'Executive Suite with Carved Walnut Craftsmanship',
      kicker: 'Suite Craftsmanship',
      caption: 'Executive Suite & Hand-Rubbed Walnut Timber',
    },
  ];

  return (
    <PageShell
      kicker="Visual Archive"
      title="Architectural Gallery"
      description="A visual study of sculpted limestone, Mughal-inspired arches, hand-carved woodwork, and sunlit Pakistani courtyards."
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {frames.map((frame, index) => (
          <RevealOnScroll key={frame.alt} delay={(index % 2) * 0.08}>
            <figure className="group overflow-hidden rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#C6A46A]/65 hover:shadow-[0_24px_50px_-22px_rgba(112,45,67,0.2)]">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={frame.src}
                  alt={frame.alt}
                  aspectRatio="aspect-[16/10]"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#26141C]/65 via-[#26141C]/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <figcaption className="p-6">
                <div className="mb-2 flex items-center gap-2.5">
                  <span className="h-[1.5px] w-5 bg-[#C6A46A]" aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                    {frame.kicker}
                  </p>
                </div>
                <p className="font-editorial text-xl font-medium text-[#29232A] group-hover:text-[#702D43] transition-colors">
                  {frame.caption}
                </p>
              </figcaption>
            </figure>
          </RevealOnScroll>
        ))}
      </div>
    </PageShell>
  );
}

export default Gallery;
