import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, Compass } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import { cn } from '@/utils/cn';

/**
 * Step 6 — Curated Luxury Experience Card
 * Layered Warm Ivory & Soft Rose Beige architectural surface with smooth 700ms
 * image zoom, subtle desktop 3D tilt hover movement, category badge,
 * illustrative demo duration, animated arrow, and detail/inquiry actions.
 */
export function CuratedExperienceCard({
  experience,
  index = 0,
  onViewExperience,
  onQuickInquire,
}) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  if (!experience) return null;

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-py * 3.0).toFixed(2)),
      rotateY: Number((px * 3.2).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    if (tilt.rotateX !== 0 || tilt.rotateY !== 0) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  };

  return (
    <motion.div
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: Math.min((index % 2) * 0.09, 0.2),
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
          'group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-[#FFFFFF] via-[#F8F3EA]/80 to-[#E9DDE0]/45',
          'shadow-[0_10px_30px_-16px_rgba(41,35,42,0.14)]',
          'transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:-translate-y-1 hover:border-[#C6A46A]/80 hover:shadow-[0_28px_56px_-22px_rgba(112,45,67,0.22)]'
        )}
      >
        {/* Layered Image Frame */}
        <button
          type="button"
          onClick={() => onViewExperience?.(experience)}
          aria-label={`View ${experience.title} details`}
          className="relative block w-full overflow-hidden text-left cursor-pointer focus-visible:outline-none"
        >
          <ImageWithFallback
            src={experience.image}
            alt={experience.alt}
            aspectRatio="aspect-[16/10]"
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26141C]/78 via-[#26141C]/15 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85"
          />

          <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-2">
            <span className="rounded-[8px] border border-[#C6A46A]/50 bg-[#29232A]/78 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E2CCA0] backdrop-blur-sm">
              {experience.category}
            </span>
            <span className="rounded-[8px] border border-[#F8F3EA]/35 bg-[#F8F3EA]/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#702D43]">
              Demo Experience
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-center justify-between text-[#F8F3EA]">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0]">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{experience.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span>Inspect Itinerary</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </button>

        {/* Card Copy & Actions */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2 text-xs text-[#877B80]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#5B5258]">
                <Clock className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                <span>{experience.demoDuration}</span>
              </span>
              <span
                aria-hidden="true"
                className="h-[1.5px] w-7 bg-[#C6A46A]/65 transition-all duration-300 group-hover:w-12 group-hover:bg-[#C6A46A]"
              />
            </div>

            <h3 className="display-card mb-1 transition-colors group-hover:text-[#702D43]">
              {experience.title}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#702D43]/85 mb-3">
              {experience.subtitle}
            </p>
            <p className="text-sm text-[#5B5258] leading-relaxed mb-6">
              {experience.description}
            </p>
          </div>

          <div className="border-t border-[#E3D5CE] pt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onQuickInquire?.(experience)}
              className="text-xs font-semibold uppercase tracking-[0.13em] text-[#702D43] hover:text-[#29232A] transition-colors cursor-pointer"
            >
              Inquire Directly
            </button>

            <Button
              type="button"
              onClick={() => onViewExperience?.(experience)}
              variant="secondary"
              size="sm"
              icon={ArrowRight}
            >
              View Experience
            </Button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default CuratedExperienceCard;
