import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/buttons/Button';
import { useHotel } from '@/context/HotelContext';
import { HOTEL_IMAGES } from '@/assets/images';
import { STAY_PACKAGES } from '@/data/roomsData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { formatCurrency } from '@/utils/formatters';

const OFFER_DETAILS = [
  {
    pkgId: 'daily',
    kicker: '1 Night Stay Option',
    title: 'Daily Stay',
    durationLabel: 'Duration: 1 Night',
    priceNote: 'Standard 1-Night Rate (Demo)',
    summary:
      'Ideal for flexible overnight visits across any Deluxe, Executive, Premium, or Presidential residence with complimentary courtyard hospitality.',
    image: HOTEL_IMAGES.deluxeRoom,
    ctaLabel: 'Select Daily Stay',
  },
  {
    pkgId: 'weekly',
    kicker: '7-Night Package Price',
    title: 'Weekly Stay Package',
    durationLabel: 'Duration: 7 Nights',
    priceNote: 'Package Price (Not a Nightly Rate)',
    summary:
      'Preferential seven-night residence package uniting carved sanctuary comfort, unhurried courtyard garden access, and generous stay savings.',
    image: HOTEL_IMAGES.executiveSuite,
    ctaLabel: 'Reserve Weekly Package',
  },
  {
    pkgId: 'monthly',
    kicker: '30-Night Package Price',
    title: 'Monthly Stay Package',
    durationLabel: 'Duration: 30 Nights',
    priceNote: 'Package Price (Not a Nightly Rate)',
    summary:
      'Comprehensive thirty-night residential stay package curated for extended diplomatic, business, and family visits at our five-star sanctuary.',
    image: HOTEL_IMAGES.presidentialSuite,
    ctaLabel: 'Reserve Monthly Package',
  },
];

export function Offers() {
  const navigate = useNavigate();
  const { setBookingSelection } = useHotel();

  const handleSelectOffer = (pkg) => {
    setBookingSelection((prev) => {
      const checkIn = prev.checkIn || new Date().toISOString().split('T')[0];
      const nextOut = new Date(checkIn);
      nextOut.setDate(nextOut.getDate() + pkg.nights);
      return {
        ...prev,
        stayPackage: pkg.id,
        nights: pkg.nights,
        checkOut: nextOut.toISOString().split('T')[0],
      };
    });
    navigate(PUBLIC_ROUTES.BOOKING);
  };

  return (
    <PageShell
      kicker="Seasonal Privileges · PKR Demo Rates"
      title="Curated Stay Packages"
      description="Transparent illustrative stay options across all room categories: Daily Stay (1 Night — PKR 5,000), Weekly Stay Package (7 Nights — PKR 20,000), and Monthly Stay Package (30 Nights — PKR 40,000)."
      primaryActionLabel="Reserve a Stay"
      primaryActionTo={PUBLIC_ROUTES.BOOKING}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {OFFER_DETAILS.map((offer) => {
          const pkg = STAY_PACKAGES.find((item) => item.id === offer.pkgId) || STAY_PACKAGES[0];
          return (
            <article
              key={offer.pkgId}
              className="group flex flex-col overflow-hidden rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#C6A46A]/65 hover:shadow-[0_24px_50px_-22px_rgba(112,45,67,0.2)]"
            >
              <div className="overflow-hidden">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  aspectRatio="aspect-[4/3]"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                      {offer.kicker}
                    </p>
                  </div>
                  <h2 className="display-card mb-1.5 group-hover:text-[#702D43] transition-colors">
                    {offer.title}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#702D43] mb-3">
                    {offer.durationLabel}
                  </p>
                  <p className="text-sm text-[#5B5258] leading-relaxed mb-5">
                    {offer.summary}
                  </p>
                </div>

                <div className="border-t border-[#E3D5CE] pt-5 space-y-4">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
                      {offer.priceNote}
                    </span>
                    <span className="font-editorial text-2xl font-medium text-[#702D43] tabular-nums">
                      {formatCurrency(pkg.price)}
                    </span>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleSelectOffer(pkg)}
                    variant="secondary"
                    size="sm"
                    icon={ArrowRight}
                    className="w-full"
                  >
                    {offer.ctaLabel}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-[14px] border border-[#E3D5CE] bg-[#E9DDE0]/45 px-6 py-4 text-xs leading-relaxed text-[#5B5258]">
        <strong className="font-semibold text-[#702D43]">Demo Stay Packages Notice:</strong>{' '}
        Daily Stay (PKR 5,000 / 1 Night), Weekly Stay (PKR 20,000 / 7-Night Package Price), and Monthly Stay (PKR 40,000 / 30-Night Package Price) are illustrative frontend demo rates. No real payments are processed.
      </div>
    </PageShell>
  );
}

export default Offers;
