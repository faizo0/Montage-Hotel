import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/buttons/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useHotel } from '@/context/HotelContext';
import { calculateStayPricing, getRoomBySlug } from '@/data/roomsData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { formatCurrency } from '@/utils/formatters';

export function GuestPortal() {
  const { bookingSelection } = useHotel();
  const activeSuite = getRoomBySlug(bookingSelection.suiteSlug);
  const pricing = calculateStayPricing(bookingSelection.nights, 1);

  const [pillowPref, setPillowPref] = useState('Down & Feather');
  const [teaService, setTeaService] = useState('Evening Kashmiri Chai');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = (event) => {
    event.preventDefault();
    setSavedNotice(true);
  };

  return (
    <PageShell
      kicker="Resident Privileges"
      title="Guest Stay Portal"
      description="View upcoming suite itineraries, bespoke pillow and linen preferences, spa scheduling, and attentive chauffeur coordination."
      primaryActionLabel="Modify Reservation"
      primaryActionTo={PUBLIC_ROUTES.BOOKING}
      secondaryActionLabel="Contact Concierge"
      secondaryActionTo={PUBLIC_ROUTES.CONTACT}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6 overflow-hidden rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)]">
          <ImageWithFallback
            src={activeSuite.image}
            alt={activeSuite.name}
            aspectRatio="aspect-[16/10]"
          />
          <div className="p-7">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
              <p className="editorial-kicker">Upcoming Residence</p>
            </div>
            <h2 className="display-card mb-2">{activeSuite.name}</h2>
            <p className="text-sm text-[#5B5258] leading-relaxed mb-5">
              {activeSuite.summary}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-[#E3D5CE] pt-5 text-sm">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-[#877B80]">
                  Duration
                </span>
                <span className="font-medium text-[#29232A] tabular-nums">
                  {bookingSelection.nights} {bookingSelection.nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-[#877B80]">
                  Party
                </span>
                <span className="font-medium text-[#29232A] tabular-nums">
                  {bookingSelection.guests} {bookingSelection.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-[#877B80]">
                  Wing
                </span>
                <span className="font-medium text-[#29232A]">
                  {activeSuite.wing}
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.12em] text-[#877B80]">
                  {pricing.isExactPackage ? 'Package Price' : 'Demo Rate'}
                </span>
                <span className="font-semibold text-[#702D43] tabular-nums">
                  {formatCurrency(pricing.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSavePreferences}
          className="lg:col-span-6 flex flex-col justify-between rounded-[16px] border border-[#E3D5CE] bg-white p-8 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)]"
        >
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                <p className="editorial-kicker">In-Suite Customization</p>
              </div>
              <h2 className="display-card">Bespoke Hospitality Preferences</h2>
            </div>

            <div>
              <label
                htmlFor="pillow-select"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Pillow & Bedding Selection
              </label>
              <select
                id="pillow-select"
                value={pillowPref}
                onChange={(e) => {
                  setPillowPref(e.target.value);
                  setSavedNotice(false);
                }}
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              >
                <option value="Down & Feather">Down & Feather</option>
                <option value="Hypoallergenic Firm">Hypoallergenic Firm</option>
                <option value="Botanical Memory Foam">Botanical Memory Foam</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="tea-select"
                className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
              >
                Welcome & Turndown Refreshment
              </label>
              <select
                id="tea-select"
                value={teaService}
                onChange={(e) => {
                  setTeaService(e.target.value);
                  setSavedNotice(false);
                }}
                className="h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
              >
                <option value="Evening Kashmiri Chai">Evening Kashmiri Chai</option>
                <option value="Peshawari Kahwa & Cardamom">Peshawari Kahwa & Cardamom</option>
                <option value="Chilled Rose & Mint Infusion">Chilled Rose & Mint Infusion</option>
              </select>
            </div>

            {savedNotice && (
              <p
                role="status"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#E9DDE0] px-3.5 py-2.5 text-xs font-medium text-[#702D43]"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>In-suite preferences noted for your upcoming arrival.</span>
              </p>
            )}
          </div>

          <div className="mt-8 border-t border-[#E3D5CE] pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs text-[#877B80]">
              <Sparkles className="h-4 w-4 text-[#C6A46A]" aria-hidden="true" />
              <span>Attentive 24-Hour Concierge</span>
            </span>
            <Button type="submit" variant="primary" size="md" magnetic>
              Save Suite Preferences
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

export default GuestPortal;
