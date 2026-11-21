import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Users, BedDouble, X } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useHotel } from '@/context/HotelContext';
import { ROOMS_DATA, calculateStayPricing } from '@/data/roomsData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { formatCurrency } from '@/utils/formatters';
import { gsap, registerGsapPlugins, prefersReducedMotion, LUXURY_EASE } from '@/utils/gsapHelpers';

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
 * 2026 Luxury Booking Bar — Warm Ivory, Soft Rose Beige, Royal Burgundy & Champagne Gold
 * Synchronized as Step 6 (final reveal) of the homepage opening sequence via GSAP,
 * or reveals cleanly on scroll on compact mobile viewports. Never replays on state updates.
 */
export function BookingBar() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const { bookingSelection, setBookingSelection } = useHotel();
  const [showResults, setShowResults] = useState(false);

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    const formEl = formRef.current;
    if (!formEl) return undefined;

    let ctx;
    try {
      ctx = gsap.context(() => {
        const fields = formEl.querySelectorAll('[data-booking-field]');
        const rect = formEl.getBoundingClientRect();
        const isNearInitialFold =
          typeof window !== 'undefined' &&
          window.scrollY < 180 &&
          rect.top < window.innerHeight * 1.15;

        const tl = gsap.timeline({
          ...(isNearInitialFold
            ? { delay: 1.24 }
            : {
                scrollTrigger: {
                  trigger: formEl,
                  start: 'top 94%',
                  once: true,
                },
              }),
        });

        tl.from(formEl, {
          y: 26,
          opacity: 0,
          scale: 0.99,
          filter: 'blur(4px)',
          duration: 0.85,
          ease: LUXURY_EASE,
          clearProps: 'transform,opacity,filter,willChange',
        });

        if (fields.length) {
          tl.from(
            fields,
            {
              y: -10,
              opacity: 0,
              duration: 0.58,
              stagger: 0.045,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            },
            '-=0.58'
          );
        }
      }, sectionRef);
    } catch {
      gsap.set([formEl, ...formEl.querySelectorAll('[data-booking-field]')], {
        clearProps: 'all',
      });
    }

    return () => ctx?.revert();
  }, []);

  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);

  const nights = useMemo(
    () => calculateNights(bookingSelection.checkIn, bookingSelection.checkOut),
    [bookingSelection.checkIn, bookingSelection.checkOut]
  );

  const totalGuests = bookingSelection.adults + bookingSelection.children;

  const matchingRooms = useMemo(() => {
    return ROOMS_DATA.filter(
      (room) =>
        room.availableRooms >= bookingSelection.rooms &&
        room.maxGuests * bookingSelection.rooms >= totalGuests
    );
  }, [bookingSelection.rooms, totalGuests]);

  const handleCheckInChange = (value) => {
    setBookingSelection((prev) => {
      const nextOut =
        prev.checkOut <= value
          ? (() => {
              const d = new Date(value);
              d.setDate(d.getDate() + 1);
              return d.toISOString().split('T')[0];
            })()
          : prev.checkOut;

      return {
        ...prev,
        checkIn: value,
        checkOut: nextOut,
        nights: calculateNights(value, nextOut),
      };
    });
  };

  const handleCheckOutChange = (value) => {
    setBookingSelection((prev) => ({
      ...prev,
      checkOut: value,
      nights: calculateNights(prev.checkIn, value),
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setBookingSelection((prev) => ({
      ...prev,
      guests: totalGuests,
      nights,
    }));
    setShowResults(true);
  };

  const handleSelectSuite = (slug) => {
    setBookingSelection((prev) => ({
      ...prev,
      suiteSlug: slug,
      guests: totalGuests,
      nights,
    }));
    navigate(PUBLIC_ROUTES.BOOKING);
  };

  return (
    <section
      id="booking-bar"
      ref={sectionRef}
      aria-label="Check Suite Availability"
      className="relative z-20 -mt-14 pb-10 md:-mt-16"
    >
      <Container>
        <form
          ref={formRef}
          onSubmit={handleSearch}
          className="rounded-[16px] border border-[#E3D5CE] bg-white/95 backdrop-blur-md p-5 md:p-7 shadow-[0_24px_60px_-20px_rgba(41,35,42,0.16)]"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
            {/* Check-in */}
            <div data-booking-field="" className="lg:col-span-2">
              <label
                htmlFor="hero-checkin"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                <span>Check-In</span>
              </label>
              <input
                id="hero-checkin"
                type="date"
                min={todayIso}
                value={bookingSelection.checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className={INPUT_CLASS}
                required
              />
            </div>

            {/* Check-out */}
            <div data-booking-field="" className="lg:col-span-2">
              <label
                htmlFor="hero-checkout"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                <span>Check-Out</span>
              </label>
              <input
                id="hero-checkout"
                type="date"
                min={bookingSelection.checkIn}
                value={bookingSelection.checkOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className={INPUT_CLASS}
                required
              />
            </div>

            {/* Adults */}
            <div data-booking-field="" className="lg:col-span-2">
              <label
                htmlFor="hero-adults"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                <span>Adults</span>
              </label>
              <select
                id="hero-adults"
                value={bookingSelection.adults}
                onChange={(e) =>
                  setBookingSelection((prev) => ({
                    ...prev,
                    adults: Number(e.target.value),
                  }))
                }
                className={INPUT_CLASS}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div data-booking-field="" className="lg:col-span-2">
              <label
                htmlFor="hero-children"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                <span>Children</span>
              </label>
              <select
                id="hero-children"
                value={bookingSelection.children}
                onChange={(e) =>
                  setBookingSelection((prev) => ({
                    ...prev,
                    children: Number(e.target.value),
                  }))
                }
                className={INPUT_CLASS}
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>

            {/* Rooms */}
            <div data-booking-field="" className="lg:col-span-2">
              <label
                htmlFor="hero-rooms"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                <BedDouble className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                <span>Rooms</span>
              </label>
              <select
                id="hero-rooms"
                value={bookingSelection.rooms}
                onChange={(e) =>
                  setBookingSelection((prev) => ({
                    ...prev,
                    rooms: Number(e.target.value),
                  }))
                }
                className={INPUT_CLASS}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Room' : 'Rooms'}
                  </option>
                ))}
              </select>
            </div>

            {/* Search CTA */}
            <div data-booking-field="" className="sm:col-span-2 lg:col-span-2">
              <Button
                type="submit"
                variant="primary"
                className="h-11 w-full"
              >
                Search Availability
              </Button>
            </div>
          </div>
        </form>

        {/* Availability Results Panel */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 rounded-[16px] border border-[#E3D5CE] bg-[#F8F3EA] p-6 shadow-[0_18px_40px_-20px_rgba(41,35,42,0.16)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3D5CE] pb-4 mb-5">
                <div>
                  <p className="editorial-kicker mb-1">Suite Availability</p>
                  <p className="text-sm text-[#29232A] tabular-nums">
                    {nights} {nights === 1 ? 'Night' : 'Nights'} · {bookingSelection.adults} Adults
                    {bookingSelection.children > 0 ? `, ${bookingSelection.children} Children` : ''} · {bookingSelection.rooms}{' '}
                    {bookingSelection.rooms === 1 ? 'Room' : 'Rooms'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowResults(false)}
                  aria-label="Close availability panel"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-white text-[#29232A] hover:border-[#702D43] cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {matchingRooms.length === 0 ? (
                <p className="text-sm text-[#5B5258] py-4">
                  For parties of {totalGuests} guests in {bookingSelection.rooms}{' '}
                  {bookingSelection.rooms === 1 ? 'room' : 'rooms'}, please select an
                  additional room or contact our 24-hour concierge desk for connecting suites.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {matchingRooms.map((room, idx) => {
                    const pricing = calculateStayPricing(
                      nights,
                      bookingSelection.rooms
                    );
                    return (
                      <motion.div
                        key={room.id}
                        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group flex flex-col justify-between rounded-[14px] border border-[#E3D5CE] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A46A]/65 hover:shadow-[0_16px_36px_-18px_rgba(112,45,67,0.2)]"
                      >
                        <div>
                          <ImageWithFallback
                            src={room.image}
                            alt={room.name}
                            aspectRatio="aspect-[4/3]"
                            containerClassName="rounded-[10px] mb-3"
                            className="transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="flex items-center justify-between text-xs text-[#877B80] mb-1">
                            <span>{room.category}</span>
                            <span className="tabular-nums">
                              {room.availableRooms} available
                            </span>
                          </div>
                          <h3 className="font-editorial text-xl font-medium text-[#29232A] mb-1">
                            {room.name}
                          </h3>
                          <p className="text-xs text-[#5B5258] mb-4">
                            {room.features.join(' · ')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#E3D5CE] pt-3">
                          <div>
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#877B80]">
                              {pricing.isExactPackage
                                ? pricing.planName
                                : 'Est. Demo Stay Total'}
                            </span>
                            <span className="font-editorial text-lg font-medium text-[#29232A] tabular-nums">
                              {formatCurrency(pricing.total)}
                            </span>
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleSelectSuite(room.slug)}
                            variant="primary"
                            size="sm"
                            icon={ArrowRight}
                          >
                            Select
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}

export default BookingBar;
