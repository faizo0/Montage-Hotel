import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Check, Clock, Sparkles, Users } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/buttons/Button';
import { WELLNESS_EXPERIENCES } from '@/data/spaData';
import { formatCurrency, formatDateShort } from '@/utils/formatters';

const INPUT_CLASS =
  'h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all duration-200 focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none';

const TIME_SLOTS = [
  '09:30 AM · Morning Tranquility',
  '12:00 PM · Midday Hammam',
  '03:00 PM · Afternoon Retreat',
  '05:30 PM · Golden Dusk Circuit',
  '08:00 PM · Candlelit Serenity',
];

const GUEST_OPTIONS = [
  '1 Guest · Solo Sanctuary',
  '2 Guests · Duo Relaxation Suite',
  '3 Guests',
  '4 Guests · Private Wellness Group',
];

/**
 * Step 5 — Functional Frontend-Only Spa Appointment Demo
 * Collects guest name, date, preferred time, treatment selection, guest count,
 * and special requests, displaying a structured demo confirmation card on submission.
 */
export function SpaAppointmentSection({ selectedTreatmentId, onTreatmentChange }) {
  const prefersReduced = useReducedMotion();
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }, []);

  const [guestName, setGuestName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(defaultDate);
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[2]);
  const [guestCount, setGuestCount] = useState(GUEST_OPTIONS[0]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const selectedTreatment =
    WELLNESS_EXPERIENCES.find((item) => item.id === selectedTreatmentId) ||
    WELLNESS_EXPERIENCES[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setFormError('Please enter your full name to prepare the demo appointment.');
      return;
    }

    setFormError('');
    setConfirmation({
      refCode: `TM-SPA-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName: trimmedName,
      appointmentDate,
      preferredTime,
      treatment: selectedTreatment,
      guestCount,
      specialRequests: specialRequests.trim(),
    });
  };

  return (
    <section
      id="spa-appointment"
      className="border-t border-[#E3D5CE] bg-[#E9DDE0]/40 py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Spa Appointments"
          title="Reserve Your Sanctuary Session"
          subtitle="Select a restorative ritual, preferred date, and seating time. Submitting this interactive form provides an instant frontend demo confirmation preview."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Selected Treatment Summary Card */}
          <aside className="lg:col-span-4 rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/80 to-[#E9DDE0]/45 p-7 md:p-8 shadow-[0_10px_30px_-18px_rgba(41,35,42,0.12)] space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Selected Ritual (Demo)</p>
              </div>
              <h3 className="display-card mb-1.5">{selectedTreatment.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#702D43]">
                {selectedTreatment.subtitle}
              </p>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-[#E3D5CE]">
              <img
                src={selectedTreatment.image}
                alt={selectedTreatment.alt}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <dl className="space-y-2.5 border-t border-[#E3D5CE] pt-4 text-xs">
              <div className="flex justify-between">
                <dt className="text-[#877B80]">Wing</dt>
                <dd className="font-medium text-[#29232A]">{selectedTreatment.wing}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#877B80]">Demo Duration</dt>
                <dd className="font-medium text-[#29232A]">{selectedTreatment.demoDuration}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-[#E3D5CE] pt-3">
                <dt className="text-[#877B80]">Demo Rate</dt>
                <dd className="font-editorial text-2xl font-medium text-[#702D43] tabular-nums">
                  {formatCurrency(selectedTreatment.demoPrice)}
                </dd>
              </div>
            </dl>
          </aside>

          {/* Interactive Appointment Form or Confirmation */}
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
                      <span>Demo Spa Appointment Confirmed</span>
                    </div>
                    <h3 className="font-editorial text-2xl md:text-3xl font-medium text-[#29232A]">
                      Sanctuary Reserved for {confirmation.guestName}
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
                      Selected Experience
                    </dt>
                    <dd className="font-medium text-[#29232A]">
                      {confirmation.treatment.title} ({confirmation.treatment.demoDuration})
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Demo Rate
                    </dt>
                    <dd className="font-medium text-[#702D43] tabular-nums">
                      {formatCurrency(confirmation.treatment.demoPrice)} (Demo Preview)
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Appointment Date & Time
                    </dt>
                    <dd className="font-medium text-[#29232A] tabular-nums">
                      {formatDateShort(confirmation.appointmentDate)} · {confirmation.preferredTime}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Guests
                    </dt>
                    <dd className="font-medium text-[#29232A]">{confirmation.guestCount}</dd>
                  </div>
                </dl>

                {confirmation.specialRequests && (
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4 text-sm">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Personal Wellness Preferences
                    </span>
                    <p className="text-[#5B5258]">{confirmation.specialRequests}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D5CE] pt-5">
                  <span className="text-xs text-[#877B80]">
                    Frontend demo confirmation only — no real spa reservation or payment was processed.
                  </span>
                  <Button
                    type="button"
                    onClick={() => setConfirmation(null)}
                    variant="secondary"
                    size="md"
                  >
                    Schedule Another Demo Session
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
                  {/* Treatment Selection */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="spa-treatment"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Treatment or Wellness Experience</span>
                    </label>
                    <select
                      id="spa-treatment"
                      value={selectedTreatment.id}
                      onChange={(e) => onTreatmentChange?.(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {WELLNESS_EXPERIENCES.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} — {item.demoDuration} · {formatCurrency(item.demoPrice)} (Demo)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Name */}
                  <div>
                    <label
                      htmlFor="spa-guest-name"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Guest Name
                    </label>
                    <input
                      id="spa-guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="Sana Tariq"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label
                      htmlFor="spa-guest-count"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Guest Count</span>
                    </label>
                    <select
                      id="spa-guest-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {GUEST_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Appointment Date */}
                  <div>
                    <label
                      htmlFor="spa-date"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Appointment Date</span>
                    </label>
                    <input
                      id="spa-date"
                      type="date"
                      min={todayIso}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className={INPUT_CLASS}
                      required
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label
                      htmlFor="spa-time"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Clock className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Preferred Time</span>
                    </label>
                    <select
                      id="spa-time"
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

                  {/* Special Requests */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="spa-requests"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Special Requests & Aromatherapy Notes (Optional)
                    </label>
                    <textarea
                      id="spa-requests"
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Light or firm massage pressure, warm rosewater oil, couples suite setup, saffron kahwa preference..."
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
                    Interactive frontend demo — no external reservation submitted.
                  </span>
                  <Button type="submit" variant="primary" size="lg" icon={ArrowRight} magnetic>
                    Confirm Demo Appointment
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

export default SpaAppointmentSection;
