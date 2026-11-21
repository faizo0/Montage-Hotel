import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Maximize2, Users } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import { useHotel } from '@/context/HotelContext';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { formatCurrency } from '@/utils/formatters';
import {
  STAY_PACKAGES,
  getStayPackageById,
} from '@/data/roomsData';
import { cn } from '@/utils/cn';

/**
 * Step 3 — Luxury Rooms & Suites Collection Card
 * Features:
 * - Subtle 3D perspective tilt on fine pointers (disabled under reduced-motion)
 * - Large room photography with 700ms hover zoom
 * - Clearly labelled demo room size, official PKR stay packages, guest capacity, and amenities
 * - Working "View Details" & "Book This Room" controls
 */
export function RoomCollectionCard({
  room,
  index = 0,
  stayPlan = 'daily',
  className = '',
}) {
  const navigate = useNavigate();
  const { setBookingSelection } = useHotel();
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  if (!room) return null;

  const amenities = room.highlights || room.features || [];
  const activePkg = getStayPackageById(stayPlan);

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-py * 3.4).toFixed(2)),
      rotateY: Number((px * 3.8).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    if (tilt.rotateX !== 0 || tilt.rotateY !== 0) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  };

  const handleBookRoom = () => {
    setBookingSelection((prev) => {
      const checkIn = prev.checkIn || new Date().toISOString().split('T')[0];
      const nextOut = new Date(checkIn);
      nextOut.setDate(nextOut.getDate() + activePkg.nights);
      return {
        ...prev,
        suiteSlug: room.slug,
        stayPackage: activePkg.id,
        nights: activePkg.nights,
        checkOut: nextOut.toISOString().split('T')[0],
        guests: Math.min(prev.guests || 2, room.maxGuests),
        adults: Math.min(prev.adults || 2, room.maxGuests),
      };
    });
    navigate(PUBLIC_ROUTES.BOOKING);
  };

  return (
    <motion.div
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.68,
        delay: Math.min(index * 0.08, 0.28),
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
          'group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-[#FFFFFF] via-[#F8F3EA]/75 to-[#E9DDE0]/45',
          'shadow-[0_10px_30px_-16px_rgba(41,35,42,0.14)]',
          'transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:-translate-y-1 hover:border-[#C6A46A]/75 hover:shadow-[0_28px_56px_-22px_rgba(112,45,67,0.22)]',
          className
        )}
      >
        {/* Large Room Photography */}
        <Link
          to={`/rooms/${room.slug}`}
          className="relative block overflow-hidden focus-visible:outline-none"
        >
          <ImageWithFallback
            src={room.image}
            alt={`${room.name} — ${room.wing}`}
            aspectRatio="aspect-[16/10]"
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26141C]/75 via-[#26141C]/15 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85"
          />

          <div className="pointer-events-none absolute inset-x-5 top-4 flex items-center justify-between gap-2">
            <span className="rounded-[8px] border border-[#C6A46A]/45 bg-[#29232A]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0] backdrop-blur-sm">
              {room.category}
            </span>
            <span className="rounded-[8px] border border-[#F8F3EA]/30 bg-[#F8F3EA]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#702D43]">
              Demo Listing
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between text-[#F8F3EA]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E2CCA0]">
              {room.wing}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium opacity-0 translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <span>Inspect Suite</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </Link>

        {/* Body Content */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            {/* Demo Spec Strip: Room Size & Guest Capacity */}
            <div className="mb-4 flex flex-wrap items-center gap-4 border-b border-[#E3D5CE] pb-3.5 text-xs text-[#5B5258]">
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Maximize2 className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                <span>
                  {room.sizeSqm} m²{' '}
                  <span className="text-[#877B80]">(Demo Size)</span>
                </span>
              </span>
              <span aria-hidden="true" className="text-[#C6A46A]">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                <span>Up to {room.maxGuests} Guests</span>
              </span>
            </div>

            {/* Room Name & Description */}
            <h3 className="font-editorial text-2xl md:text-[1.75rem] font-medium leading-tight text-[#29232A] mb-2.5">
              <Link
                to={`/rooms/${room.slug}`}
                className="hover:text-[#702D43] transition-colors"
              >
                {room.name}
              </Link>
            </h3>

            <p className="text-sm text-[#5B5258] leading-relaxed mb-5">
              {room.summary}
            </p>

            {/* Available Amenities (Demo) */}
            {amenities.length > 0 && (
              <div className="mb-6">
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                  Amenities (Demo Showcase)
                </p>
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {amenities.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[#29232A]/85"
                    >
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-[#702D43]"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer: Official PKR Stay Package Pricing + View Details & Book This Room */}
          <div className="border-t border-[#E3D5CE] pt-5 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                  {activePkg.name} · {activePkg.durationLabel} ({activePkg.rateTypeLabel})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-editorial text-2xl font-medium text-[#29232A] tabular-nums">
                    {formatCurrency(activePkg.price)}
                  </span>
                  {activePkg.isPackage && (
                    <span className="text-[11px] font-medium text-[#702D43]">
                      Package Price
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  to={`/rooms/${room.slug}`}
                  variant="secondary"
                  size="sm"
                >
                  View Details
                </Button>
                <Button
                  type="button"
                  onClick={handleBookRoom}
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  magnetic
                >
                  Book This Room
                </Button>
              </div>
            </div>

            {/* Consistent Package Overview Strip */}
            <div className="grid grid-cols-3 gap-2 rounded-[10px] border border-[#E3D5CE]/85 bg-white/80 p-2.5 text-[11px] tabular-nums">
              {STAY_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={cn(
                    'rounded-[6px] px-2 py-1',
                    pkg.id === activePkg.id
                      ? 'bg-[#E9DDE0]/75 text-[#702D43] font-semibold'
                      : 'text-[#5B5258]'
                  )}
                >
                  <span className="block text-[9px] uppercase tracking-[0.12em] text-[#877B80]">
                    {pkg.name} ({pkg.durationLabel})
                  </span>
                  <span>
                    {formatCurrency(pkg.price)}
                    {pkg.isPackage ? ' Pkg' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default RoomCollectionCard;
