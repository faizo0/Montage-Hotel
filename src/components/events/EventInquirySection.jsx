import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Crown,
  Phone,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import {
  EVENT_CATEGORIES,
  EVENT_PACKAGES,
  EVENT_VENUES,
  formatEventPackageRate,
} from '@/data/eventsData';
import { formatDateShort } from '@/utils/formatters';

const INPUT_CLASS =
  'h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all duration-200 focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none';

/**
 * Step 7 — Functional Frontend Demo Events & Weddings Inquiry Form
 * Includes: Customer Name, Contact Number, Event Type, Event Date,
 * Expected Guests, Preferred Venue, Package Selection, and Additional Requirements.
 */
export function EventInquirySection({
  selectedCategoryId,
  onCategoryChange,
  selectedVenueId,
  onVenueChange,
  selectedPackageId,
  onPackageChange,
}) {
  const prefersReduced = useReducedMotion();

  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const defaultEventDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split('T')[0];
  }, []);

  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [eventDate, setEventDate] = useState(defaultEventDate);
  const [expectedGuests, setExpectedGuests] = useState('150');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const selectedCategory =
    EVENT_CATEGORIES.find((item) => item.id === selectedCategoryId) ||
    EVENT_CATEGORIES[0];
  const selectedVenue =
    EVENT_VENUES.find((item) => item.id === selectedVenueId) || EVENT_VENUES[0];
  const selectedPackage =
    EVENT_PACKAGES.find((item) => item.id === selectedPackageId) ||
    EVENT_PACKAGES[1];

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanName = customerName.trim();
    const cleanPhone = contactNumber.trim();
    const guestsNumeric = Number(expectedGuests);

    if (!cleanName) {
      setFormError('Please enter your Customer Name to prepare your demo event proposal.');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 7) {
      setFormError('Please provide a valid Contact Number (e.g., +92 300 0000000).');
      return;
    }

    if (!eventDate) {
      setFormError('Please select a preferred Event Date.');
      return;
    }

    if (!Number.isFinite(guestsNumeric) || guestsNumeric < 10) {
      setFormError('Please enter Expected Guests (minimum 10 guests for event setups).');
      return;
    }

    setFormError('');
    setConfirmation({
      refCode: `TM-EVT-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: cleanName,
      contactNumber: cleanPhone,
      eventCategory: selectedCategory,
      eventDate,
      expectedGuests: Math.round(guestsNumeric),
      venue: selectedVenue,
      pkg: selectedPackage,
      additionalRequirements: additionalRequirements.trim(),
    });
  };

  return (
    <section
      id="event-inquiry"
      className="border-t border-[#E3D5CE] bg-[#E9DDE0]/42 py-16 md:py-24"
    >
      <Container>
        <SectionHeader
          kicker="Events & Weddings Concierge Desk"
          title="Request a Private Celebration Proposal"
          subtitle="Configure your celebration format, preferred hotel venue, expected guest count, and package tier. Submitting creates an immediate frontend demo inquiry confirmation."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Live Configuration Preview Card */}
          <aside className="lg:col-span-4 rounded-[18px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/80 to-[#E9DDE0]/45 p-7 md:p-8 shadow-[0_10px_30px_-18px_rgba(41,35,42,0.12)] space-y-5">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">Selected Setup Preview</p>
              </div>
              <h3 className="display-card mb-1">{selectedVenue.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#702D43]">
                {selectedCategory.title}
              </p>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-[#E3D5CE]">
              <ImageWithFallback
                src={selectedVenue.image}
                alt={selectedVenue.alt}
                aspectRatio="aspect-[16/10]"
              />
            </div>

            <dl className="space-y-3 border-t border-[#E3D5CE] pt-4 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-[#877B80]">Venue Area</dt>
                <dd className="font-medium text-[#29232A] text-right">
                  {selectedVenue.areaSqFt}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#877B80]">Venue Capacity</dt>
                <dd className="font-medium text-[#29232A] text-right tabular-nums">
                  {selectedVenue.capacityRange}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#877B80]">Selected Tier</dt>
                <dd className="font-semibold text-[#702D43] text-right">
                  {selectedPackage.name}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-[#E3D5CE] pt-3">
                <dt className="text-[#877B80]">Estimated Rate</dt>
                <dd className="font-semibold text-[#702D43] tabular-nums">
                  {formatEventPackageRate(selectedPackage.numericRatePKR)} (PKR)
                </dd>
              </div>
            </dl>
          </aside>

          {/* Inquiry Form or Confirmation View */}
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
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                      <Check className="h-4 w-4 text-[#C6A46A]" aria-hidden="true" />
                      <span>Demo Event Inquiry Confirmed</span>
                    </div>
                    <h3 className="font-editorial text-2xl md:text-3xl font-medium text-[#29232A]">
                      Prepared for {confirmation.customerName}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                      Demo Inquiry Reference
                    </span>
                    <span className="font-mono text-base font-semibold text-[#702D43] tabular-nums">
                      {confirmation.refCode}
                    </span>
                  </div>
                </div>

                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Event Type
                    </dt>
                    <dd className="font-medium text-[#29232A]">
                      {confirmation.eventCategory.title}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Preferred Venue
                    </dt>
                    <dd className="font-medium text-[#29232A]">
                      {confirmation.venue.name}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Event Date &amp; Guests
                    </dt>
                    <dd className="font-medium text-[#29232A] tabular-nums">
                      {formatDateShort(confirmation.eventDate)} · {confirmation.expectedGuests} Guests
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Package Selection (PKR)
                    </dt>
                    <dd className="font-medium text-[#702D43]">
                      {confirmation.pkg.name} — {formatEventPackageRate(confirmation.pkg.numericRatePKR)}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4 sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Contact Number
                    </dt>
                    <dd className="font-medium text-[#29232A] tabular-nums">
                      {confirmation.contactNumber}
                    </dd>
                  </div>
                </dl>

                {confirmation.additionalRequirements && (
                  <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] p-4 text-sm">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-1">
                      Additional Requirements
                    </span>
                    <p className="text-[#5B5258]">{confirmation.additionalRequirements}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D5CE] pt-5">
                  <span className="text-xs text-[#877B80]">
                    Frontend demo confirmation only — no backend submission or real reservation was created.
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
                  {/* Customer Name */}
                  <div>
                    <label
                      htmlFor="evt-customer-name"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <User className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Customer Name</span>
                    </label>
                    <input
                      id="evt-customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="Sanaullah & Ayesha Khan"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label
                      htmlFor="evt-contact-number"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Contact Number</span>
                    </label>
                    <input
                      id="evt-contact-number"
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => {
                        setContactNumber(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="+92 300 0000000"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label
                      htmlFor="evt-type"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Event Type</span>
                    </label>
                    <select
                      id="evt-type"
                      value={selectedCategory.id}
                      onChange={(e) => onCategoryChange?.(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {EVENT_CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label
                      htmlFor="evt-date"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Event Date</span>
                    </label>
                    <input
                      id="evt-date"
                      type="date"
                      min={todayIso}
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        if (formError) setFormError('');
                      }}
                      className={INPUT_CLASS}
                      required
                    />
                  </div>

                  {/* Expected Guests */}
                  <div>
                    <label
                      htmlFor="evt-guests"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Users className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Expected Guests</span>
                    </label>
                    <input
                      id="evt-guests"
                      type="number"
                      min={10}
                      max={1000}
                      step={5}
                      value={expectedGuests}
                      onChange={(e) => {
                        setExpectedGuests(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="150"
                      className={`${INPUT_CLASS} tabular-nums`}
                      required
                    />
                  </div>

                  {/* Preferred Venue */}
                  <div>
                    <label
                      htmlFor="evt-venue"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Building2 className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Preferred Venue</span>
                    </label>
                    <select
                      id="evt-venue"
                      value={selectedVenue.id}
                      onChange={(e) => onVenueChange?.(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {EVENT_VENUES.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name} ({venue.capacityRange})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Package Selection */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="evt-package"
                      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      <Crown className="h-3.5 w-3.5 text-[#702D43]" aria-hidden="true" />
                      <span>Package Selection (PKR)</span>
                    </label>
                    <select
                      id="evt-package"
                      value={selectedPackage.id}
                      onChange={(e) => onPackageChange?.(e.target.value)}
                      className={INPUT_CLASS}
                    >
                      {EVENT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {formatEventPackageRate(pkg.numericRatePKR)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional Requirements */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="evt-requirements"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
                    >
                      Additional Requirements (Stage Styling, Cuisine, Suite Blocks)
                    </label>
                    <textarea
                      id="evt-requirements"
                      rows={3}
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      placeholder="Floral color scheme, traditional Mehndi jhoola staging, live kebab stations, bridal suite reservation dates..."
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
                    Frontend demo only — rates quoted in PKR; no real payment or booking is processed.
                  </span>
                  <Button type="submit" variant="primary" size="lg" icon={ArrowRight} magnetic>
                    Submit Demo Event Inquiry
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

export default EventInquirySection;
