import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Check, Clock, Mail, Users, Utensils } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/buttons/Button';
import { DINING_VENUES } from '@/data/diningData';
import { formatDateShort } from '@/utils/formatters';

const INPUT_CLASS =
  'h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all duration-200 focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none';

const TIME_SLOTS = [
  '08:30 AM · Courtyard Breakfast',
  '01:00 PM · Midday Lunch Seating',
  '04:30 PM · Chai & Patisserie Salon',
  '07:30 PM · Dinner First Seating',
  '09:00 PM · Candlelight Late Seating',
];

const GUEST_COUNTS = [
  '2 Guests',
  '3 Guests',
  '4 Guests',
  '6 Guests (Family Table)',
  '8 Guests (Family Gathering)',
  '12+ Guests (Private Dining Alcove)',
];

/**
 * Step 4 — Frontend-Only Interactive Table Reservation Desk
 * Validates inputs cleanly and presents an immediate demo confirmation preview.
 */
export function TableReservationSection({ selectedVenue, onVenueChange }) {
  const prefersReduced = useReducedMotion();
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }, []);

  const [guestCount, setGuestCount] = useState(GUEST_COUNTS[0]);
  const [reservationDate, setReservationDate] = useState(defaultDate);
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[3]);
  const [guestName, setGuestName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const venueValue = DINING_VENUES.includes(selectedVenue)
    ? selectedVenue
    : DINING_VENUES.find((v) => v.toLowerCase().includes((selectedVenue || '').toLowerCase())) ||
      DINING_VENUES[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedContact = contactInfo.trim();

    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const digitsCount = trimmedContact.replace(/\D/g, '').length;
    const looksLikePhone = digitsCount >= 7;

    if (!trimmedName || (!looksLikeEmail && !looksLikePhone)) {
      setFormError(
        'Please enter the primary guest name and a valid email address or phone number.'
      );
      return;
    }

    setFormError('');
    setConfirmation({
      refCode: `TM-DIN-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName: trimmedName,
      contactInfo: trimmedContact,
      guestCount,
      reservationDate,
      preferredTime,
      venue: venueValue,
      specialRequests: specialRequests.trim(),
    });
  };

  const handleResetConfirmation = () => {
    setConfirmation(null);
  };

  return (
    <section
      id="table-reservation"
      className="border-t border-[#E3D5CE] bg-[#E9DDE0]/40 py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Table Reservations"
          title="Reserve Your Dining Experience"
          subtitle="Request seating for intimate dinners, family tables, afternoon Kashmiri chai service, or private celebrations. This interactive desk provides instant frontend demo confirmation only."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Editorial Summary */}
          <div className="lg:col-span-4 rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/80 to-[#E9DDE0]/45 p-7 md:p-8 shadow-[0_10px_30px_-18px_rgba(41,35,42,0.12)] space-y-6">
            <div>
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Host & Concierge Notes</p>
              </div>
              <h3 className="display-card mb-3">Attentive Pakistani Hospitality</h3>
              <p className="text-sm text-[#5B5258] leading-relaxed">
                Whether arranging a quiet candlelit dinner for two or a celebratory
                multi-generational family feast, our culinary hosts tailor every
                table setting prior to arrival.
              </p>
            </div>

            <div className="space-y-3 border-t border-[#E3D5CE] pt-5 text-xs text-[#5B5258]">
              <div className="flex justify-between">
                <span className="text-[#877B80]">Breakfast Service</span>
                <span className="font-medium text-[#29232A] tabular-nums">
                  06:30 AM – 10:45 AM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#877B80]">Afternoon Chai Salon</span>
                <span className="font-medium text-[#29232A] tabular-nums">
                  03:00 PM – 07:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#877B80]">Fine Dining Dinner</span>
                <span className="font-medium text-[#29232A] tabular-nums">
                  07:00 PM – 11:30 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#877B80]">Dress Code</span>
                <span className="font-medium text-[#702D43]">Smart Editorial</span>
              </div>
            </div>

            <p className="rounded-[10px] border border-[#C6A46A]/45 bg-[#F8F3EA] p-3.5 text-[11px] leading-relaxed text-[#5B5258]">
              <strong className="text-[#702D43]">Demo Notice:</strong> Submitting this
              form creates a local illustrative confirmation preview without connecting
              to a live booking backend.
            </p>
          </div>

          {/* Right Form or Demo Confirmation */}
          <div className="lg:col-span-8">
            {confirmation ? (
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                role="status"
                className="rounded-[18px] border border-[#C6A46A] bg-white p-8 md:p-10 shadow-[0_20px_50px_-24px_rgba(112,45,67,0.22)] space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3D5CE] pb-5">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-[8px] bg-[#E9DDE0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Demo Table Reservation Confirmed</span>
                    </div>
                    <h3 className="font-editorial text-2xl md:text-3xl font-medium text-[#29232A]">
                      We Look Forward to Welcoming You, {confirmation.guestName}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                      Demo Reference
                    </span>
                    <span className="font-mono text-base font-semibold text-[#702D43] tabular-nums">
                      {confirmation.refCode}
                    </span>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Dining Venue
                    </dt>
                    <dd className="font-medium text-[#29232A]">{confirmation.venue}</dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Party Size
                    </dt>
                    <dd className="font-medium text-[#29232A]">{confirmation.guestCount}</dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Date & Seating
                    </dt>
                    <dd className="font-medium text-[#29232A] tabular-nums">
                      {formatDateShort(confirmation.reservationDate)} · {confirmation.preferredTime}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Guest Contact
                    </dt>
                    <dd className="font-medium text-[#29232A]">{confirmation.contactInfo}</dd>
                  </div>
                </dl>

                {confirmation.specialRequests && (
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4 text-sm">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Special Requests Noted
                    </span>
                    <p className="text-[#5B5258]">{confirmation.specialRequests}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D5CE] pt-5">
                  <span className="text-xs text-[#877B80]">
                    Frontend demo confirmation only — no real table booking was created.
                  </span>
                  <Button
                    type="button"
                    onClick={handleResetConfirmation}
                    variant="secondary"
                    size="md"
                  >
                    Make Another Demo Request
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-[18px] border border-[#E3D5CE] bg-white p-7 md:p-9 shadow-[0_14px_40px_-22px_rgba(41,35,42,0.14)] space-y-6"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Dining Venue */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="dining-venue"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Utensils className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Dining Experience & Venue</span>
                    </label>
                    <select
                      id="dining-venue"
                      value={venueValue}
                      onChange={(e) => onVenueChange?.(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {DINING_VENUES.map((venue) => (
                        <option key={venue} value={venue}>
                          {venue}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label
                      htmlFor="dining-guests"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Guest Count</span>
                    </label>
                    <select
                      id="dining-guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {GUEST_COUNTS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reservation Date */}
                  <div>
                    <label
                      htmlFor="dining-date"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Reservation Date</span>
                    </label>
                    <input
                      id="dining-date"
                      type="date"
                      min={todayIso}
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className={INPUT_CLASS}
                      required
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="dining-time"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Clock className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Preferred Seating Time</span>
                    </label>
                    <select
                      id="dining-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Name */}
                  <div>
                    <label
                      htmlFor="dining-name"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Primary Guest Name
                    </label>
                    <input
                      id="dining-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="Amina Qureshi"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Contact Info */}
                  <div>
                    <label
                      htmlFor="dining-contact"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Contact Email or Phone</span>
                    </label>
                    <input
                      id="dining-contact"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => {
                        setContactInfo(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="guest@domain.com or +92 300 0000000"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="dining-requests"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Special Requests & Dietary Notes (Optional)
                    </label>
                    <textarea
                      id="dining-requests"
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Family courtyard corner table, celebration dessert note, halal or allergy preferences..."
                      className="w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] p-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
                    />
                  </div>
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-[#9E3B33]">
                    {formError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D5CE] pt-5">
                  <span className="text-xs text-[#877B80]">
                    Instant frontend demo confirmation — no real booking submitted.
                  </span>
                  <Button type="submit" variant="primary" size="lg" icon={ArrowRight} magnetic>
                    Confirm Table Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TableReservationSection;
