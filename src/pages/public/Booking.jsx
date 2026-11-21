import React, { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/buttons/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useHotel } from '@/context/HotelContext';
import {
  ROOMS_COLLECTION,
  ROOMS_DATA,
  STAY_PACKAGES,
  calculateStayPricing,
  getRoomBySlug,
} from '@/data/roomsData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const BOOKABLE_SUITES = Array.from(
  new Map([...ROOMS_COLLECTION, ...ROOMS_DATA].map((r) => [r.slug, r])).values()
);

const DURATION_OPTIONS = [
  { nights: 1, label: 'Daily Stay · 1 Night (PKR 5,000)' },
  { nights: 2, label: '2 Nights · Daily Rate (PKR 10,000)' },
  { nights: 3, label: '3 Nights · Daily Rate (PKR 15,000)' },
  { nights: 7, label: 'Weekly Stay Package · 7 Nights (PKR 20,000 Package)' },
  { nights: 30, label: 'Monthly Stay Package · 30 Nights (PKR 40,000 Package)' },
];

export function Booking() {
  const { bookingSelection, setBookingSelection } = useHotel();
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  const activeSuite = getRoomBySlug(bookingSelection.suiteSlug);
  const pricing = useMemo(
    () => calculateStayPricing(bookingSelection.nights, 1),
    [bookingSelection.nights]
  );

  const handleSelectStayDuration = (nights) => {
    setSubmittedRef('');
    setBookingSelection((prev) => {
      const checkIn = prev.checkIn || new Date().toISOString().split('T')[0];
      const nextOut = new Date(checkIn);
      nextOut.setDate(nextOut.getDate() + Number(nights));
      return {
        ...prev,
        nights: Number(nights),
        stayPackage:
          Number(nights) === 30
            ? 'monthly'
            : Number(nights) === 7
            ? 'weekly'
            : 'daily',
        checkOut: nextOut.toISOString().split('T')[0],
      };
    });
  };

  const handleReserveSubmit = (event) => {
    event.preventDefault();
    if (!guestName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim())) {
      setFormError('Please provide your full name and a valid email address.');
      return;
    }
    setFormError('');
    setSubmittedRef(`TM-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <PageShell
      kicker="Direct Reservations"
      title="Reserve Your Stay"
      description="Select your preferred suite category, Daily, Weekly, or Monthly demo stay package, and hospitality preferences."
      primaryActionLabel="Explore All Suites"
      primaryActionTo={PUBLIC_ROUTES.ROOMS}
      secondaryActionLabel="Contact Concierge"
      secondaryActionTo={PUBLIC_ROUTES.CONTACT}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Configuration & Guest Form */}
        <form
          onSubmit={handleReserveSubmit}
          noValidate
          className="lg:col-span-7 rounded-[16px] border border-[#E3D5CE] bg-white p-8 shadow-[0_6px_26px_-16px_rgba(41,35,42,0.12)] space-y-6"
        >
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
              <p className="editorial-kicker">Stay Parameters (Demo PKR Rates)</p>
            </div>
            <h2 className="display-card">Tailor Your Residence</h2>
          </div>

          {/* Official 3 Stay Packages Quick Selector */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2.5">
              Select Demo Stay Package
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {STAY_PACKAGES.map((pkg) => {
                const isSelected = bookingSelection.nights === pkg.nights;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleSelectStayDuration(pkg.nights)}
                    className={cn(
                      'rounded-[12px] border p-3.5 text-left transition-all cursor-pointer tabular-nums',
                      isSelected
                        ? 'border-[#702D43] bg-[#702D43] text-white shadow-[0_10px_24px_-12px_rgba(112,45,67,0.55)]'
                        : 'border-[#E3D5CE] bg-[#F8F3EA] text-[#29232A] hover:border-[#C6A46A]'
                    )}
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em]">
                      {pkg.name}
                    </span>
                    <span
                      className={cn(
                        'block text-xs mt-0.5',
                        isSelected ? 'text-[#F8F3EA]/85' : 'text-[#877B80]'
                      )}
                    >
                      {pkg.durationLabel}
                    </span>
                    <span className="mt-2 block font-editorial text-xl font-medium">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span
                      className={cn(
                        'block text-[10px] font-medium uppercase tracking-[0.1em] mt-0.5',
                        isSelected ? 'text-[#E2CCA0]' : 'text-[#702D43]'
                      )}
                    >
                      {pkg.rateTypeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label
                htmlFor="suite-select"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Suite Category
              </label>
              <select
                id="suite-select"
                value={bookingSelection.suiteSlug}
                onChange={(e) => {
                  setSubmittedRef('');
                  setBookingSelection((prev) => ({
                    ...prev,
                    suiteSlug: e.target.value,
                  }));
                }}
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              >
                {BOOKABLE_SUITES.map((room) => (
                  <option key={room.slug} value={room.slug}>
                    {room.name} — {room.category} ({room.sizeSqm} m²)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="guests-select"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Guests
              </label>
              <select
                id="guests-select"
                value={bookingSelection.guests}
                onChange={(e) => {
                  setSubmittedRef('');
                  setBookingSelection((prev) => ({
                    ...prev,
                    guests: Number(e.target.value),
                  }));
                }}
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="nights-select"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Duration / Plan
              </label>
              <select
                id="nights-select"
                value={bookingSelection.nights}
                onChange={(e) => handleSelectStayDuration(e.target.value)}
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt.nights} value={opt.nights}>
                    {opt.label}
                  </option>
                ))}
                {!DURATION_OPTIONS.some((o) => o.nights === bookingSelection.nights) && (
                  <option value={bookingSelection.nights}>
                    {bookingSelection.nights} Nights ({formatCurrency(pricing.total)})
                  </option>
                )}
              </select>
            </div>

            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2">
                Suite Area
              </span>
              <div className="flex h-11 items-center rounded-[10px] border border-[#E3D5CE] bg-[#E9DDE0]/45 px-3.5 text-sm font-medium text-[#29232A] tabular-nums">
                {activeSuite.sizeSqm} m²
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 border-t border-[#E3D5CE] pt-6">
            <div>
              <label
                htmlFor="booking-guest-name"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Primary Guest Name
              </label>
              <input
                id="booking-guest-name"
                type="text"
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="Zainab Raza"
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="booking-guest-email"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Email Address
              </label>
              <input
                id="booking-guest-email"
                type="email"
                value={guestEmail}
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="guest@domain.com"
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="booking-notes"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Concierge Requests (Optional)
              </label>
              <input
                id="booking-notes"
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Quiet courtyard orientation, airport transfer, or late arrival..."
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              />
            </div>
          </div>

          {formError && (
            <p role="alert" className="text-xs font-medium text-[#9E3B33]">
              {formError}
            </p>
          )}

          {submittedRef && (
            <div
              role="status"
              className="rounded-[10px] border border-[#702D43]/25 bg-[#E9DDE0] p-4 text-sm text-[#702D43]"
            >
              <p className="inline-flex items-center gap-2 font-semibold">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Demo Stay Inquiry Registered · Reference {submittedRef}</span>
              </p>
              <p className="mt-1 text-xs text-[#29232A]/85 tabular-nums">
                Prepared for {guestName} ({activeSuite.name}, {pricing.planName} —{' '}
                {formatCurrency(pricing.total)}). Frontend demo only; no real payment processed.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button type="submit" variant="primary" size="lg" icon={ArrowRight} magnetic>
              Confirm Stay Inquiry
            </Button>
            <Button to={`/rooms/${activeSuite.slug}`} variant="secondary" size="lg">
              Inspect Suite Details
            </Button>
          </div>
        </form>

        {/* Right: Selected Suite Editorial Summary */}
        <aside className="lg:col-span-5">
          <div className="overflow-hidden rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 shadow-[0_6px_26px_-16px_rgba(41,35,42,0.12)]">
            <ImageWithFallback
              src={activeSuite.image}
              alt={activeSuite.name}
              aspectRatio="aspect-[16/10]"
            />
            <div className="p-7">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                  {activeSuite.category} · {activeSuite.wing}
                </p>
              </div>
              <h3 className="display-card mb-2">{activeSuite.name}</h3>
              <p className="text-sm text-[#5B5258] leading-relaxed mb-6">
                {activeSuite.summary}
              </p>

              <dl className="space-y-3 border-t border-[#E3D5CE] pt-5 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-[#877B80]">Stay Rate / Plan</dt>
                  <dd className="font-medium text-[#29232A] text-right tabular-nums">
                    {pricing.planName}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#877B80]">Rate Basis</dt>
                  <dd className="font-medium text-[#5B5258] text-right text-xs tabular-nums">
                    {pricing.breakdownLabel}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#877B80]">Stay Duration</dt>
                  <dd className="font-medium text-[#29232A] tabular-nums">
                    {bookingSelection.nights} {bookingSelection.nights === 1 ? 'Night' : 'Nights'} ·{' '}
                    {bookingSelection.guests} {bookingSelection.guests === 1 ? 'Guest' : 'Guests'}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-[#E3D5CE] pt-4">
                  <dt className="font-medium text-[#29232A]">
                    {pricing.isExactPackage ? 'Package Price Total' : 'Estimated Demo Total'}
                  </dt>
                  <dd className="font-editorial text-3xl font-medium text-[#702D43] tabular-nums">
                    {formatCurrency(pricing.total)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-[11px] text-[#877B80]">
                Illustrative PKR demo pricing only — weekly (PKR 20,000 / 7 Nights) and monthly (PKR 40,000 / 30 Nights) are package prices, not nightly rates.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

export default Booking;
