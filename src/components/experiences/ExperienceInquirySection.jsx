import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Compass,
  Phone,
  Users,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/buttons/Button';
import { CURATED_EXPERIENCES } from '@/data/experiencesData';
import { formatDateShort } from '@/utils/formatters';

const INPUT_CLASS =
  'h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all duration-200 focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none';

const GUEST_OPTIONS = [
  '2 Guests · Couple or Private Duo',
  '4 Guests · Small Group',
  '6–8 Guests · Family Gathering',
  '12–20 Guests · Private Salon',
  '25+ Guests · Milestone Celebration',
];

/**
 * Step 6 — Functional Frontend-Only Experience Inquiry Form
 * Collects guest name, contact details, preferred experience, preferred date,
 * guest count, and special requests with structured demo inquiry confirmation.
 */
export function ExperienceInquirySection({
  selectedExperienceId,
  onExperienceChange,
}) {
  const prefersReduced = useReducedMotion();
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  }, []);

  const [guestName, setGuestName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [preferredDate, setPreferredDate] = useState(defaultDate);
  const [guestCount, setGuestCount] = useState(GUEST_OPTIONS[0]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const selectedExperience =
    CURATED_EXPERIENCES.find((item) => item.id === selectedExperienceId) ||
    CURATED_EXPERIENCES[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedContact = contactDetails.trim();

    if (!trimmedName) {
      setFormError('Please enter your full name to prepare the demo experience inquiry.');
      return;
    }

    if (!trimmedContact || trimmedContact.length < 5) {
      setFormError('Please provide an email address or contact number for demo preview reference.');
      return;
    }

    setFormError('');
    setConfirmation({
      refCode: `TM-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName: trimmedName,
      contactDetails: trimmedContact,
      experience: selectedExperience,
      preferredDate,
      guestCount,
      specialRequests: specialRequests.trim(),
    });
  };

  return (
    <section
      id="experience-inquiry"
      className="border-t border-[#E3D5CE] bg-[#E9DDE0]/42 py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Concierge Experience Desk"
          title="Inquire About an Experience"
          subtitle="Select a curated activity, preferred date, party size, and custom notes. Submitting this frontend form produces an instant demo inquiry confirmation without sending external requests."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Selected Experience Summary Card */}
          <aside className="lg:col-span-4 rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/80 to-[#E9DDE0]/45 p-7 md:p-8 shadow-[0_10px_30px_-18px_rgba(41,35,42,0.12)] space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Selected Program (Demo)</p>
              </div>
              <h3 className="display-card mb-1.5">{selectedExperience.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#702D43]">
                {selectedExperience.subtitle}
              </p>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-[#E3D5CE]">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.alt}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <dl className="space-y-2.5 border-t border-[#E3D5CE] pt-4 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-[#877B80]">Category</dt>
                <dd className="font-medium text-[#29232A] text-right">
                  {selectedExperience.category}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#877B80]">Setting</dt>
                <dd className="font-medium text-[#29232A] text-right">
                  {selectedExperience.location}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-[#E3D5CE] pt-3">
                <dt className="text-[#877B80]">Illustrative Duration</dt>
                <dd className="inline-flex items-center gap-1.5 font-semibold text-[#702D43]">
                  <Clock className="h-3.5 w-3.5 text-[#C6A46A]" aria-hidden="true" />
                  <span>{selectedExperience.demoDuration}</span>
                </dd>
              </div>
            </dl>
          </aside>

          {/* Inquiry Form or Confirmation Preview */}
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
                      <span>Demo Inquiry Received</span>
                    </div>
                    <h3 className="font-editorial text-2xl md:text-3xl font-medium text-[#29232A]">
                      Prepared for {confirmation.guestName}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                      Demo Inquiry Code
                    </span>
                    <span className="font-mono text-base font-semibold text-[#702D43] tabular-nums">
                      {confirmation.refCode}
                    </span>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Preferred Experience
                    </dt>
                    <dd className="font-medium text-[#29232A]">
                      {confirmation.experience.title} ({confirmation.experience.demoDuration})
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Contact Details
                    </dt>
                    <dd className="font-medium text-[#29232A] break-all">
                      {confirmation.contactDetails}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Preferred Date
                    </dt>
                    <dd className="font-medium text-[#29232A] tabular-nums">
                      {formatDateShort(confirmation.preferredDate)}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Number of Guests
                    </dt>
                    <dd className="font-medium text-[#29232A]">{confirmation.guestCount}</dd>
                  </div>
                </dl>

                {confirmation.specialRequests && (
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4 text-sm">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Special Requests
                    </span>
                    <p className="text-[#5B5258]">{confirmation.specialRequests}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D5CE] pt-5">
                  <span className="text-xs text-[#877B80]">
                    Frontend demo confirmation only — no real booking or email dispatch was triggered.
                  </span>
                  <Button
                    type="button"
                    onClick={() => setConfirmation(null)}
                    variant="secondary"
                    size="md"
                  >
                    Submit Another Demo Inquiry
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
                  {/* Preferred Experience */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="exp-select"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Compass className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Preferred Experience</span>
                    </label>
                    <select
                      id="exp-select"
                      value={selectedExperience.id}
                      onChange={(e) => onExperienceChange?.(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {CURATED_EXPERIENCES.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} — {item.demoDuration}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Name */}
                  <div>
                    <label
                      htmlFor="exp-guest-name"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Guest Name
                    </label>
                    <input
                      id="exp-guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="Hamza Qureshi"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Contact Details */}
                  <div>
                    <label
                      htmlFor="exp-contact"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Contact Details (Email or Phone)</span>
                    </label>
                    <input
                      id="exp-contact"
                      type="text"
                      value={contactDetails}
                      onChange={(e) => {
                        setContactDetails(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="guest@example.com · +92 300 0000000"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label
                      htmlFor="exp-date"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      id="exp-date"
                      type="date"
                      min={todayIso}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={INPUT_CLASS}
                      required
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label
                      htmlFor="exp-guests"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Number of Guests</span>
                    </label>
                    <select
                      id="exp-guests"
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

                  {/* Special Requests */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="exp-requests"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Special Requests & Celebration Notes (Optional)
                    </label>
                    <textarea
                      id="exp-requests"
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Acoustic sitar preferences, floral colorway requests, dietary allergies, morning departure timing..."
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
                    Interactive frontend demo — no real reservation or message is sent.
                  </span>
                  <Button type="submit" variant="primary" size="lg" icon={ArrowRight} magnetic>
                    Send Demo Inquiry
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

export default ExperienceInquirySection;
