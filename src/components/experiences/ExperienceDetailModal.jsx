import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Compass,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { CURATED_EXPERIENCES } from '@/data/experiencesData';
import { cn } from '@/utils/cn';

/**
 * Step 6 — Experience Detail Inspection Modal
 * Displays multi-image interactive gallery, overview, key highlights,
 * illustrative itinerary timeline, demo duration, inquiry CTA,
 * and clickable related experience switches.
 */
export function ExperienceDetailModal({
  experience,
  onClose,
  onSelectExperience,
  onInquireExperience,
}) {
  const prefersReduced = useReducedMotion();
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Reset active gallery slide whenever experience switches
  useEffect(() => {
    setGalleryIndex(0);
  }, [experience?.id]);

  // Escape-key accessible closure
  useEffect(() => {
    if (!experience) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experience, onClose]);

  const galleryItems = experience?.gallery?.length
    ? experience.gallery
    : experience
    ? [{ src: experience.image, alt: experience.alt, caption: experience.subtitle }]
    : [];

  const activePhoto = galleryItems[galleryIndex] || galleryItems[0];

  const relatedExperiences = (experience?.relatedIds || [])
    .map((id) => CURATED_EXPERIENCES.find((item) => item.id === id))
    .filter(Boolean);

  const handlePrevPhoto = () => {
    if (galleryItems.length <= 1) return;
    setGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNextPhoto = () => {
    if (galleryItems.length <= 1) return;
    setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
  };

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#29232A]/72 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[20px] border border-[#C6A46A]/60 bg-[#F8F3EA] shadow-[0_32px_70px_-20px_rgba(41,35,42,0.55)]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close experience detail view"
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6A46A]/55 bg-[#29232A]/80 text-[#F8F3EA] hover:bg-[#702D43] transition-colors cursor-pointer backdrop-blur-sm"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Interactive Gallery Showcase */}
            <div className="relative bg-[#29232A]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {activePhoto && (
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    className="h-full w-full object-cover object-center transition-all duration-500"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#26141C]/85 to-transparent"
                />

                {/* Gallery Caption & Controls */}
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-[8px] border border-[#C6A46A]/45 bg-[#29232A]/78 px-3 py-1.5 text-xs font-medium text-[#F8F3EA] backdrop-blur-sm">
                    {activePhoto?.caption}
                  </span>

                  {galleryItems.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevPhoto}
                        aria-label="Previous gallery image"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#C6A46A]/50 bg-[#29232A]/80 text-[#F8F3EA] hover:bg-[#702D43] transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextPhoto}
                        aria-label="Next gallery image"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#C6A46A]/50 bg-[#29232A]/80 text-[#F8F3EA] hover:bg-[#702D43] transition-colors cursor-pointer"
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {galleryItems.length > 1 && (
                <div className="grid grid-cols-3 gap-2 border-t border-[#C6A46A]/25 bg-[#29232A] p-3">
                  {galleryItems.map((slide, idx) => {
                    const isActive = idx === galleryIndex;
                    return (
                      <button
                        key={slide.src + idx}
                        type="button"
                        onClick={() => setGalleryIndex(idx)}
                        aria-label={`Show photo: ${slide.caption}`}
                        className={cn(
                          'group relative overflow-hidden rounded-[8px] border transition-all cursor-pointer',
                          isActive
                            ? 'border-[#C6A46A] ring-2 ring-[#C6A46A]/45'
                            : 'border-white/15 opacity-70 hover:opacity-100'
                        )}
                      >
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 md:p-10 space-y-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E3D5CE] pb-5">
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                    <p className="editorial-kicker">
                      {experience.category} · {experience.location}
                    </p>
                  </div>
                  <h3
                    id="exp-modal-title"
                    className="font-editorial text-2xl sm:text-3xl font-medium text-[#29232A]"
                  >
                    {experience.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                    {experience.subtitle}
                  </p>
                </div>

                <div className="rounded-[12px] border border-[#E3D5CE] bg-white px-4 py-3 text-left sm:text-right">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                    Illustrative Duration
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-editorial text-xl font-medium text-[#702D43]">
                    <Clock className="h-4 w-4 text-[#C6A46A]" aria-hidden="true" />
                    <span>{experience.demoDuration}</span>
                  </span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <p className="text-sm md:text-base text-[#5B5258] leading-relaxed">
                  {experience.overview}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#702D43] mb-3">
                  Curated Highlights (Demo)
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {experience.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-[10px] border border-[#E3D5CE] bg-white px-4 py-3 text-xs font-medium text-[#29232A]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#702D43]" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustrative Itinerary */}
              {experience.itinerary?.length > 0 && (
                <div className="rounded-[14px] border border-[#E3D5CE] bg-white p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#702D43]">
                      Illustrative Experience Itinerary
                    </h4>
                    <span className="text-[11px] text-[#877B80]">
                      Demo Schedule Preview
                    </span>
                  </div>
                  <ol className="space-y-4">
                    {experience.itinerary.map((step, idx) => (
                      <li
                        key={step.stepTitle}
                        className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 border-l-2 border-[#C6A46A]/65 pl-4"
                      >
                        <span className="shrink-0 font-mono text-xs font-semibold text-[#702D43] tabular-nums sm:w-28">
                          0{idx + 1} · {step.stepTime}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#29232A]">
                            {step.stepTitle}
                          </p>
                          <p className="text-xs leading-relaxed text-[#5B5258]">
                            {step.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Inquiry CTA Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-[#E3D5CE] py-5">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5B5258]">
                  <span className="inline-flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-[#C6A46A]" aria-hidden="true" />
                    <span>{experience.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#702D43]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Illustrative Demo Experience</span>
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={() => onInquireExperience?.(experience)}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  magnetic
                >
                  Inquire About This Experience
                </Button>
              </div>

              {/* Related Experiences */}
              {relatedExperiences.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#877B80] mb-3.5">
                    Related Curated Experiences
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {relatedExperiences.map((rel) => (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => onSelectExperience?.(rel)}
                        className="group flex items-center gap-3.5 rounded-[12px] border border-[#E3D5CE] bg-white p-3 text-left transition-all hover:border-[#C6A46A] hover:shadow-md cursor-pointer"
                      >
                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-[8px]">
                          <img
                            src={rel.image}
                            alt={rel.alt}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#702D43]">
                            {rel.category}
                          </span>
                          <p className="truncate font-editorial text-lg font-medium text-[#29232A] group-hover:text-[#702D43]">
                            {rel.title}
                          </p>
                          <span className="text-[11px] text-[#877B80]">{rel.demoDuration}</span>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-[#C6A46A] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#702D43]"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ExperienceDetailModal;
