import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { formatCurrency } from '@/utils/formatters';
import { WEEKLY_PACKAGE_PRICE, MONTHLY_PACKAGE_PRICE } from '@/data/roomsData';
import { cn } from '@/utils/cn';

/**
 * 2026 Cinematic Suite & Room Card
 * Warm Ivory & Soft Rose Beige framing, subtle 3D hover lift, Champagne Gold trim,
 * 700ms hover zoom, and Royal Burgundy discovery controls.
 */
export function HotelCard({ room, className = '' }) {
  if (!room) return null;

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-[#FFFFFF] via-[#F8F3EA]/70 to-[#E9DDE0]/45',
        'shadow-[0_6px_26px_-14px_rgba(41,35,42,0.12)]',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'hover:-translate-y-1.5 hover:border-[#C6A46A]/65 hover:shadow-[0_26px_52px_-20px_rgba(112,45,67,0.22)]',
        className
      )}
    >
      <Link
        to={`/rooms/${room.slug}`}
        className="relative block overflow-hidden focus-visible:outline-none"
      >
        <ImageWithFallback
          src={room.image}
          alt={room.name}
          aspectRatio="aspect-[4/3]"
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />

        {/* Subtle Cinematic Hover Vignette & Discovery Prompt */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26141C]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between text-[#F8F3EA] opacity-0 translate-y-2 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0]">
            {room.wing}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <span>Inspect Residence</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#877B80]">
              <span>{room.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{room.sizeSqm} m²</span>
              <span aria-hidden="true">·</span>
              <span>Up to {room.maxGuests} Guests</span>
            </div>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 bg-[#C6A46A]/65 transition-all duration-300 group-hover:w-10 group-hover:bg-[#C6A46A]"
            />
          </div>

          <h3 className="display-card mb-2.5">
            <Link
              to={`/rooms/${room.slug}`}
              className="hover:text-[#702D43] transition-colors"
            >
              {room.name}
            </Link>
          </h3>

          <p className="text-sm text-[#5B5258] leading-relaxed mb-4">
            {room.summary}
          </p>

          {room.features?.length > 0 && (
            <p className="text-xs font-medium text-[#702D43] mb-5">
              {room.features.join(' · ')}
            </p>
          )}
        </div>

        <div className="border-t border-[#E3D5CE] pt-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                Daily Stay (1 Night)
              </span>
              <span className="font-editorial text-xl font-medium text-[#29232A] tabular-nums">
                {formatCurrency(room.ratePerNight)}
              </span>
            </div>

            <Link
              to={`/rooms/${room.slug}`}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#E9DDE0] border border-[#D8C2C8] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#702D43] hover:bg-[#702D43] hover:border-[#C6A46A] hover:text-white transition-all duration-300 whitespace-nowrap shrink-0"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="text-[11px] text-[#5B5258] border-t border-[#E3D5CE]/70 pt-2.5 tabular-nums">
            Packages: Weekly (7 Nights) {formatCurrency(room.weeklyPackagePrice || WEEKLY_PACKAGE_PRICE)} · Monthly (30 Nights) {formatCurrency(room.monthlyPackagePrice || MONTHLY_PACKAGE_PRICE)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;
