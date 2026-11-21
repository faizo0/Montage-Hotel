import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { cn } from '@/utils/cn';

/**
 * 2026 Cinematic Exclusive Experience Card
 * Warm Ivory & Soft Rose Beige card surface with Champagne Gold trim and Royal Burgundy discovery accents.
 */
export function ExperienceCard({ experience, className = '' }) {
  if (!experience) return null;

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-[#FFFFFF] via-[#F8F3EA]/75 to-[#E9DDE0]/45',
        'shadow-[0_6px_26px_-14px_rgba(41,35,42,0.1)]',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'hover:-translate-y-1.5 hover:border-[#C6A46A]/65 hover:shadow-[0_26px_52px_-20px_rgba(112,45,67,0.2)]',
        className
      )}
    >
      <Link to={experience.route} className="relative block overflow-hidden">
        <ImageWithFallback
          src={experience.image}
          alt={`${experience.title} — ${experience.subtitle || 'The Montage'}`}
          aspectRatio="aspect-[4/3]"
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26141C]/68 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-x-6 bottom-4 flex items-center justify-between text-[#F8F3EA] opacity-0 translate-y-2 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0]">
            {experience.location}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium">
            <span>{experience.ctaLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#877B80]">
              <span>{experience.category}</span>
              <span aria-hidden="true">·</span>
              <span>{experience.schedule}</span>
            </div>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 bg-[#C6A46A]/65 transition-all duration-300 group-hover:w-10 group-hover:bg-[#C6A46A]"
            />
          </div>

          <h3 className="display-card mb-1">
            <Link to={experience.route} className="hover:text-[#702D43] transition-colors">
              {experience.title}
            </Link>
          </h3>
          {experience.subtitle && (
            <p className="text-xs font-semibold tracking-wide text-[#997A46] mb-3">
              {experience.subtitle}
            </p>
          )}
          <p className="text-sm text-[#5B5258] leading-relaxed mb-5">
            {experience.summary}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[#E3D5CE] pt-4">
          <span className="text-xs text-[#877B80]">{experience.location}</span>
          <Link
            to={experience.route}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.11em] text-[#702D43] hover:text-[#572133] whitespace-nowrap shrink-0"
          >
            <span>{experience.ctaLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;
