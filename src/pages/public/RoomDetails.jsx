import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Maximize2,
  Sparkles,
  Users,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/layout/Divider';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Button } from '@/components/buttons/Button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { RoomCollectionCard } from '@/components/rooms/RoomCollectionCard';
import { KineticText } from '@/components/animations/KineticText';
import { useHotel } from '@/context/HotelContext';
import {
  ROOMS_COLLECTION,
  STAY_PACKAGES,
  calculateStayPricing,
  getRoomBySlug,
} from '@/data/roomsData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatCurrency, formatDateShort } from '@/utils/formatters';
import {
  gsap,
  registerGsapPlugins,
  prefersReducedMotion,
  addKineticTextToTimeline,
  LUXURY_EASE,
} from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 1;
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

const INPUT_CLASS =
  'h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] tabular-nums transition-all duration-200 focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none';

/**
 * Step 3 — Reusable Room Detail Page
 * Features:
 * - GSAP top-to-bottom kinetic heading entrance
 * - Large interactive image gallery with thumbnails & crossfade controls
 * - Architectural overview, demo amenities, room specs & guest capacity
 * - Interactive demo date/guest selection and Book Now confirmation flow
 */
export function RoomDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const { bookingSelection, setBookingSelection } = useHotel();

  const room = useMemo(() => getRoomBySlug(slug), [slug]);
  useDocumentTitle(room.name);

  const gallery = useMemo(() => {
    if (room.gallery?.length) return room.gallery;
    return [{ src: room.image, alt: room.name, caption: room.wing }];
  }, [room]);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(bookingSelection.checkIn);
  const [checkOut, setCheckOut] = useState(bookingSelection.checkOut);
  const [adults, setAdults] = useState(
    Math.min(bookingSelection.adults || 2, room.maxGuests)
  );
  const [children, setChildren] = useState(0);
  const [bookingRef, setBookingRef] = useState('');

  const headerScopeRef = useRef(null);
  const ruleRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    setActivePhotoIndex(0);
    setBookingRef('');
    setAdults((prev) => Math.min(Math.max(1, prev), room.maxGuests));
    setChildren(0);
  }, [room.slug, room.maxGuests]);

  useLayoutEffect(() => {
    const scope = headerScopeRef.current;
    if (!scope || prefersReducedMotion()) return undefined;

    registerGsapPlugins();
    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: LUXURY_EASE } });

        if (ruleRef.current) {
          tl.from(
            ruleRef.current,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.72,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            0.04
          );
        }

        if (kickerRef.current) {
          tl.from(
            kickerRef.current,
            {
              yPercent: -105,
              opacity: 0,
              filter: 'blur(3px)',
              duration: 0.72,
              clearProps: 'transform,opacity,filter,willChange',
            },
            0.06
          );
        }

        const lastLineStart = addKineticTextToTimeline(tl, headlineRef.current, {
          startAt: 0.14,
          yPercent: -115,
          blur: 5,
          duration: 0.9,
          lineStagger: 0.15,
          wordStagger: 0.045,
          ease: LUXURY_EASE,
        });

        addKineticTextToTimeline(tl, summaryRef.current, {
          startAt: lastLineStart + 0.16,
          yPercent: -90,
          blur: 3,
          duration: 0.76,
          lineStagger: 0.1,
          wordStagger: 0.015,
          ease: 'power3.out',
        });
      }, headerScopeRef);
    } catch {
      gsap.set(scope.querySelectorAll('[data-kinetic-word], [data-detail-hero]'), {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, [room.name]);

  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const totalGuests = adults + children;
  const maxChildrenAllowed = Math.max(0, room.maxGuests - adults);
  const pricing = useMemo(() => calculateStayPricing(nights, 1), [nights]);
  const estimatedDemoTotal = pricing.total;
  const activeFrame = gallery[activePhotoIndex] || gallery[0];
  const amenities = room.highlights || room.features || [];

  const handleSelectStayPackage = (pkg) => {
    setBookingRef('');
    const base = new Date(checkIn || todayIso);
    if (Number.isNaN(base.getTime())) return;
    const nextOut = new Date(base);
    nextOut.setDate(nextOut.getDate() + pkg.nights);
    setCheckOut(nextOut.toISOString().split('T')[0]);
  };

  const handleCheckInChange = (val) => {
    setBookingRef('');
    setCheckIn(val);
    if (checkOut <= val) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      setCheckOut(next.toISOString().split('T')[0]);
    }
  };

  const handleAdultsChange = (val) => {
    setBookingRef('');
    const nextAdults = Number(val);
    setAdults(nextAdults);
    if (nextAdults + children > room.maxGuests) {
      setChildren(Math.max(0, room.maxGuests - nextAdults));
    }
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    setBookingSelection((prev) => ({
      ...prev,
      suiteSlug: room.slug,
      stayPackage:
        nights === 30 ? 'monthly' : nights === 7 ? 'weekly' : 'daily',
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      guests: totalGuests,
      rooms: 1,
    }));
    setBookingRef(`TM-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const otherResidences = useMemo(
    () => ROOMS_COLLECTION.filter((item) => item.slug !== room.slug).slice(0, 2),
    [room.slug]
  );

  return (
    <div className="bg-[#F8F3EA] py-12 md:py-16">
      <Container>
        {/* Editorial Room Header */}
        <div ref={headerScopeRef} className="mb-10">
          <Breadcrumbs
            items={[
              { label: 'Home', to: PUBLIC_ROUTES.HOME },
              { label: 'Rooms & Suites', to: PUBLIC_ROUTES.ROOMS },
              { label: room.name },
            ]}
          />

          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span
                  ref={ruleRef}
                  aria-hidden="true"
                  className="h-[1.5px] w-7 origin-left bg-[#C6A46A]"
                />
                <div className="overflow-hidden">
                  <p ref={kickerRef} data-detail-hero="" className="editorial-kicker">
                    {room.category} · {room.wing}
                  </p>
                </div>
              </div>

              <div ref={headlineRef}>
                <KineticText as="h1" text={room.name} className="display-hero mb-4" />
              </div>

              <div ref={summaryRef}>
                <KineticText
                  as="p"
                  text={room.summary}
                  className="text-base md:text-lg text-[#5B5258] leading-relaxed prose-measure"
                />
              </div>
            </div>

            <div className="rounded-[12px] border border-[#E3D5CE] bg-white px-5 py-3.5 shadow-[0_6px_20px_-14px_rgba(41,35,42,0.12)] shrink-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                Demo Daily Rate · 1 Night
              </span>
              <span className="font-editorial text-2xl font-medium text-[#702D43] tabular-nums">
                {formatCurrency(room.ratePerNight)}
              </span>
              <span className="mt-1 block text-[11px] text-[#5B5258] tabular-nums">
                Weekly Pkg (7 Nights): {formatCurrency(STAY_PACKAGES[1].price)} · Monthly Pkg (30 Nights): {formatCurrency(STAY_PACKAGES[2].price)}
              </span>
            </div>
          </div>
        </div>

        {/* Large Interactive Image Gallery */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-[20px] border border-[#E3D5CE] bg-[#29232A] shadow-[0_24px_60px_-24px_rgba(41,35,42,0.22)]">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFrame.src + activePhotoIndex}
                  src={activeFrame.src}
                  alt={activeFrame.alt}
                  initial={prefersReduced ? false : { opacity: 0.3, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReduced ? undefined : { opacity: 0.3 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full object-cover object-center"
                />
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#26141C]/80 via-[#26141C]/25 to-transparent"
              />

              {/* Gallery Controls & Caption */}
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div className="text-[#F8F3EA]">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#E2CCA0] tabular-nums">
                    0{activePhotoIndex + 1} / 0{gallery.length}
                  </p>
                  <p className="font-editorial text-lg sm:text-xl font-medium">
                    {activeFrame.caption}
                  </p>
                </div>

                {gallery.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === 0 ? gallery.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous residence photograph"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6A46A]/45 bg-[#29232A]/75 text-[#F8F3EA] hover:bg-[#702D43] hover:border-[#C6A46A] transition-colors cursor-pointer backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex((prev) => (prev + 1) % gallery.length)
                      }
                      aria-label="Next residence photograph"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#C6A46A]/45 bg-[#29232A]/75 text-[#F8F3EA] hover:bg-[#702D43] hover:border-[#C6A46A] transition-colors cursor-pointer backdrop-blur-sm"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Selector Strip */}
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.map((frame, idx) => {
                const isSelected = idx === activePhotoIndex;
                return (
                  <button
                    key={`${frame.src}-${idx}`}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`View gallery photo ${idx + 1}: ${frame.caption}`}
                    aria-pressed={isSelected}
                    className={cn(
                      'group relative overflow-hidden rounded-[12px] border text-left transition-all duration-300 cursor-pointer',
                      isSelected
                        ? 'border-[#702D43] ring-2 ring-[#C6A46A]/70 shadow-[0_12px_28px_-14px_rgba(112,45,67,0.3)]'
                        : 'border-[#E3D5CE] opacity-80 hover:opacity-100 hover:border-[#C6A46A]'
                    )}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={frame.src}
                        alt={frame.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Detail Split: Overview/Amenities/Specs + Interactive Demo Booking Box */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Overview, Amenities & Specifications */}
          <div className="lg:col-span-7 space-y-8">
            {/* Architectural Overview */}
            <div className="rounded-[18px] border border-[#E3D5CE] bg-white p-7 md:p-9 shadow-[0_8px_28px_-18px_rgba(41,35,42,0.12)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Residence Overview</p>
              </div>
              <h2 className="display-card mb-4">
                Pakistani Craftsmanship & Quiet Luxury
              </h2>
              <p className="text-sm md:text-base text-[#5B5258] leading-relaxed mb-4">
                {room.overview || room.summary}
              </p>
              <p className="text-xs text-[#877B80]">
                Note: All room specifications, floor areas, facilities, and pricing
                presented here are illustrative frontend demo data.
              </p>
            </div>

            {/* Demo Specifications & Guest Capacity */}
            <div className="rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 p-7 md:p-9 shadow-[0_8px_28px_-18px_rgba(41,35,42,0.12)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Specifications (Demo Data)</p>
              </div>
              <h2 className="display-card mb-5">Proportions & Occupancy</h2>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[12px] border border-[#E3D5CE] bg-white p-4">
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                    <Maximize2 className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                    <span>Demo Interior Area</span>
                  </dt>
                  <dd className="font-editorial text-xl font-medium text-[#29232A] tabular-nums">
                    {room.sizeSqm} m²
                  </dd>
                </div>

                <div className="rounded-[12px] border border-[#E3D5CE] bg-white p-4">
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                    <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                    <span>Guest Capacity</span>
                  </dt>
                  <dd className="font-editorial text-xl font-medium text-[#29232A] tabular-nums">
                    Up to {room.maxGuests} Guests
                  </dd>
                </div>

                <div className="rounded-[12px] border border-[#E3D5CE] bg-white p-4">
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                    <BedDouble className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                    <span>Bedding</span>
                  </dt>
                  <dd className="text-sm font-medium text-[#29232A]">
                    {room.bedding}
                  </dd>
                </div>

                <div className="rounded-[12px] border border-[#E3D5CE] bg-white p-4">
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                    <Compass className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                    <span>Exposure</span>
                  </dt>
                  <dd className="text-sm font-medium text-[#29232A]">
                    {room.view}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Amenities Showcase */}
            <div className="rounded-[18px] border border-[#E3D5CE] bg-white p-7 md:p-9 shadow-[0_8px_28px_-18px_rgba(41,35,42,0.12)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Amenities (Demo Features)</p>
              </div>
              <h2 className="display-card mb-5">Curated In-Suite Privileges</h2>

              <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {amenities.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA]/65 px-4 py-3 text-sm text-[#29232A]"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-[#702D43]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sticky Column: Interactive Demo Booking Panel */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <form
              onSubmit={handleBookNow}
              className="rounded-[18px] border border-[#E3D5CE] bg-white p-7 md:p-8 shadow-[0_22px_50px_-24px_rgba(41,35,42,0.18)] space-y-6"
            >
              <div className="border-b border-[#E3D5CE] pb-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                      {pricing.planName}
                    </span>
                    <span className="font-editorial text-3xl font-medium text-[#702D43] tabular-nums">
                      {formatCurrency(estimatedDemoTotal)}
                    </span>
                    <span className="ml-1.5 text-xs text-[#877B80]">
                      {pricing.isExactPackage ? 'Package Price' : `/ ${nights} ${nights === 1 ? 'Night' : 'Nights'}`}
                    </span>
                  </div>
                  <span className="rounded-[8px] bg-[#E9DDE0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                    Demo PKR
                  </span>
                </div>

                {/* Official Demo Stay Package Selector */}
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2">
                    Select Stay Package Duration
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {STAY_PACKAGES.map((pkg) => {
                      const isActive = nights === pkg.nights;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handleSelectStayPackage(pkg)}
                          className={cn(
                            'rounded-[10px] border px-2.5 py-2 text-left transition-all cursor-pointer tabular-nums',
                            isActive
                              ? 'border-[#702D43] bg-[#702D43] text-white shadow-sm'
                              : 'border-[#E3D5CE] bg-[#F8F3EA] text-[#29232A] hover:border-[#C6A46A]'
                          )}
                        >
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em]">
                            {pkg.name}
                          </span>
                          <span
                            className={cn(
                              'block text-[10px]',
                              isActive ? 'text-[#F8F3EA]/85' : 'text-[#877B80]'
                            )}
                          >
                            {pkg.durationLabel}
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold">
                            {formatCurrency(pkg.price)}
                            {pkg.isPackage ? ' Pkg' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="detail-checkin"
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                  >
                    <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                    <span>Check-In</span>
                  </label>
                  <input
                    id="detail-checkin"
                    type="date"
                    min={todayIso}
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className={INPUT_CLASS}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="detail-checkout"
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                  >
                    <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                    <span>Check-Out</span>
                  </label>
                  <input
                    id="detail-checkout"
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => {
                      setBookingRef('');
                      setCheckOut(e.target.value);
                    }}
                    className={INPUT_CLASS}
                    required
                  />
                </div>
              </div>

              {/* Guest Selection */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="detail-adults"
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                  >
                    <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                    <span>Adults</span>
                  </label>
                  <select
                    id="detail-adults"
                    value={adults}
                    onChange={(e) => handleAdultsChange(e.target.value)}
                    className={INPUT_CLASS}
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="detail-children"
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                  >
                    <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                    <span>Children</span>
                  </label>
                  <select
                    id="detail-children"
                    value={children}
                    onChange={(e) => {
                      setBookingRef('');
                      setChildren(Number(e.target.value));
                    }}
                    className={INPUT_CLASS}
                  >
                    {Array.from({ length: maxChildrenAllowed + 1 }, (_, i) => i).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Child' : 'Children'}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Stay Summary */}
              <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4 space-y-2.5 text-sm">
                <div className="flex justify-between gap-2 text-[#5B5258]">
                  <span className="text-xs leading-snug">{pricing.breakdownLabel}</span>
                  <span className="font-medium text-[#29232A] tabular-nums shrink-0">
                    {formatCurrency(estimatedDemoTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5B5258]">
                  <span>Guest Selection</span>
                  <span className="font-medium text-[#29232A] tabular-nums">
                    {totalGuests} of {room.maxGuests} max guests
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-t border-[#E3D5CE] pt-2.5">
                  <span className="font-medium text-[#29232A]">
                    {pricing.isExactPackage ? 'Estimated Package Total' : 'Estimated Demo Total'}
                  </span>
                  <span className="font-editorial text-2xl font-medium text-[#702D43] tabular-nums">
                    {formatCurrency(estimatedDemoTotal)}
                  </span>
                </div>
              </div>

              {/* Book Now CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                magnetic
                className="w-full"
              >
                Book Now
              </Button>

              {/* Interactive Booking Confirmation Drawer */}
              <AnimatePresence>
                {bookingRef && (
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    role="status"
                    className="rounded-[12px] border border-[#C6A46A]/65 bg-[#E9DDE0] p-4 text-[#29232A] space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                      <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Demo Stay Selection Saved · {bookingRef}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#5B5258] tabular-nums">
                      {room.name} selected for {formatDateShort(checkIn)} to{' '}
                      {formatDateShort(checkOut)} ({nights}{' '}
                      {nights === 1 ? 'night' : 'nights'}, {totalGuests}{' '}
                      {totalGuests === 1 ? 'guest' : 'guests'}) — Demo Total{' '}
                      <strong className="text-[#702D43]">
                        {formatCurrency(estimatedDemoTotal)}
                      </strong>
                      .
                    </p>
                    <Button
                      type="button"
                      onClick={() => navigate(PUBLIC_ROUTES.BOOKING)}
                      variant="primary"
                      size="sm"
                      icon={ArrowRight}
                      className="w-full"
                    >
                      Proceed to Reservation Page
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[11px] leading-relaxed text-[#877B80] text-center">
                Frontend demo reservation preview only. No live charge or real
                hotel booking is processed.
              </p>
            </form>
          </aside>
        </div>

        <Divider ornate className="my-16" />

        {/* Cross-Navigation to Other Residences */}
        <div>
          <SectionHeader
            kicker="Continue Exploring"
            title="Other Residences in Our Collection"
            action={
              <Button to={PUBLIC_ROUTES.ROOMS} variant="secondary" icon={ArrowRight}>
                All Rooms & Suites
              </Button>
            }
            className="mb-10"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {otherResidences.map((item, idx) => (
              <RoomCollectionCard key={item.id} room={item} index={idx} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RoomDetails;
