import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { cn } from '@/utils/cn';

/**
 * Step 7 — Interactive Venue Gallery & Specifications Modal
 * Displays multi-photo architectural gallery with Previous/Next navigation,
 * Escape support, venue capacities, and direct inquiry selection.
 */
export function VenueGalleryModal({ venue, onClose, onSelectVenue }) {
  const prefersReduced = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [venue?.id]);

  useEffect(() => {
    if (!venue) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (e.key === 'ArrowRight') {
        setActiveSlide((prev) => (prev + 1) % venue.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveSlide((prev) => (prev - 1 + venue.gallery.length) % venue.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [venue, onClose]);

  if (!venue) return null;

  const slides = venue.gallery || [{ src: venue.image, caption: venue.alt }];
  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="venue-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#29232A]/78 p-4 md:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[18px] border border-[#C6A46A]/60 bg-[#F8F3EA] shadow-[0_32px_70px_-18px_rgba(24,14,18,0.65)]"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E3D5CE] bg-[#F8F3EA]/95 px-6 py-4 backdrop-blur-md">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#702D43]">
              Venue Portfolio · {venue.areaSqFt}
            </p>
            <h3 id="venue-modal-title" className="font-editorial text-2xl font-medium text-[#29232A]">
              {venue.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close venue gallery modal"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-white text-[#29232A] transition-colors hover:border-[#702D43] hover:text-[#702D43] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Primary Active Photo */}
          <div className="relative overflow-hidden rounded-[14px] border border-[#E3D5CE] bg-[#29232A]">
            <ImageWithFallback
              src={currentSlide.src}
              alt={currentSlide.caption || venue.alt}
              aspectRatio="aspect-[16/9]"
            />

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  aria-label="Previous venue photograph"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6A46A]/50 bg-[#29232A]/80 text-[#F8F3EA] backdrop-blur-sm transition-colors hover:bg-[#702D43] cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                  aria-label="Next venue photograph"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6A46A]/50 bg-[#29232A]/80 text-[#F8F3EA] backdrop-blur-sm transition-colors hover:bg-[#702D43] cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}

            <div className="border-t border-[#C6A46A]/30 bg-[#29232A] px-4 py-2.5 flex items-center justify-between gap-4 text-xs text-[#F8F3EA]">
              <span>{currentSlide.caption}</span>
              <span className="font-mono text-[#E2CCA0] tabular-nums shrink-0">
                {activeSlide + 1} / {slides.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Selector Strip */}
          {slides.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {slides.map((item, idx) => (
                <button
                  key={`${venue.id}-slide-${idx}`}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`View slide ${idx + 1}: ${item.caption}`}
                  className={cn(
                    'overflow-hidden rounded-[10px] border transition-all cursor-pointer',
                    idx === activeSlide
                      ? 'border-[#702D43] ring-2 ring-[#702D43]/30'
                      : 'border-[#E3D5CE] opacity-75 hover:opacity-100'
                  )}
                >
                  <ImageWithFallback
                    src={item.src}
                    alt={item.caption}
                    aspectRatio="aspect-[16/10]"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Venue Details & Seating Matrix */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 border-t border-[#E3D5CE] pt-6">
            <div className="md:col-span-7 space-y-4">
              <p className="text-sm leading-relaxed text-[#5B5258]">{venue.description}</p>
              <ul className="space-y-2 text-xs text-[#5B5258]">
                {venue.amenities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A46A]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 rounded-[14px] border border-[#E3D5CE] bg-white p-5 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                Illustrative Seating Modes
              </p>
              <dl className="space-y-2.5 text-xs">
                {venue.seatingModes.map((mode) => (
                  <div
                    key={mode.label}
                    className="flex items-center justify-between border-b border-[#E3D5CE]/70 pb-2 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-[#877B80]">{mode.label}</dt>
                    <dd className="font-semibold text-[#29232A] tabular-nums">{mode.value}</dd>
                  </div>
                ))}
              </dl>
              <Button
                type="button"
                onClick={() => onSelectVenue?.(venue)}
                variant="primary"
                size="md"
                icon={ArrowRight}
                className="w-full"
              >
                Select This Venue
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VenueGalleryModal;
