import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/buttons/Button';
import { EVENT_PACKAGES, formatEventPackageRate } from '@/data/eventsData';
import { cn } from '@/utils/cn';

/**
 * Step 7 — Editable PKR Event Package Tiers
 * Presents Silver Package, Gold Package, and Signature Package.
 * Displays configured PKR demo pricing or "Request a Quote" without fabricating hotel rates.
 */
export function EventPackagesSection({ selectedPackageId, onSelectPackage }) {
  const prefersReduced = useReducedMotion();

  return (
    <section id="event-packages" className="py-16 md:py-24 bg-[#F8F3EA]">
      <Container>
        <SectionHeader
          kicker="Editable Demo Packages · PKR"
          title="Three Curated Event Packages"
          subtitle="Compare Silver, Gold, and Signature hospitality frameworks. Custom proposals are quoted strictly in Pakistani Rupees (PKR) according to guest count, venue, and culinary selection."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {EVENT_PACKAGES.map((pkg, idx) => {
            const isSelected = selectedPackageId === pkg.id;
            const rateDisplay = formatEventPackageRate(pkg.numericRatePKR);

            return (
              <motion.article
                key={pkg.id}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{
                  duration: 0.62,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'flex h-full flex-col justify-between rounded-[18px] border p-7 md:p-8 transition-all duration-300',
                  pkg.featured || isSelected
                    ? 'border-[#C6A46A] bg-gradient-to-b from-white via-[#F8F3EA]/90 to-[#E9DDE0]/60 shadow-[0_22px_48px_-22px_rgba(112,45,67,0.24)]'
                    : 'border-[#E3D5CE] bg-white shadow-[0_10px_28px_-18px_rgba(41,35,42,0.12)] hover:border-[#C6A46A]/75'
                )}
              >
                <div>
                  {/* Clean Unboxed Header Line */}
                  <div className="mb-3 flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.14em] text-[#702D43]">
                      {pkg.tierLabel}
                    </span>
                    {pkg.featured && (
                      <span className="font-medium text-[#877B80]">Most Requested</span>
                    )}
                  </div>

                  <h3 className="font-editorial text-3xl font-medium text-[#29232A] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-medium text-[#877B80] mb-5">
                    Ideal for: {pkg.recommendedFor}
                  </p>

                  {/* Pricing Readout (PKR or Request a Quote) */}
                  <div className="mb-6 border-y border-[#E3D5CE] py-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877B80]">
                      Proposal Rate (PKR)
                    </span>
                    <span className="mt-1 block font-editorial text-2xl md:text-3xl font-medium text-[#702D43] tabular-nums">
                      {rateDisplay}
                    </span>
                    <span className="mt-1 block text-xs text-[#877B80]">
                      Tailored in Pakistani Rupees (PKR) by guest count &amp; menu
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[#5B5258] mb-5">
                    {pkg.summary}
                  </p>

                  <ul className="space-y-2.5 text-xs leading-relaxed text-[#5B5258]">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A46A]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-[#E3D5CE] pt-5">
                  <Button
                    type="button"
                    onClick={() => onSelectPackage?.(pkg)}
                    variant={pkg.featured || isSelected ? 'primary' : 'secondary'}
                    size="md"
                    icon={ArrowRight}
                    magnetic
                    className="w-full"
                  >
                    {isSelected ? `${pkg.name} Selected` : `Select ${pkg.name}`}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 rounded-[14px] border border-[#E3D5CE] bg-[#E9DDE0]/45 px-6 py-4 text-xs leading-relaxed text-[#5B5258]">
          <strong className="font-semibold text-[#702D43]">Editable Demo Pricing Notice:</strong>{' '}
          Exact rates vary by ceremony format, floral architecture, and culinary spread. Until exact PKR rates are configured, all packages display &ldquo;Request a Quote&rdquo; for transparent bespoke estimation.
        </div>
      </Container>
    </section>
  );
}

export default EventPackagesSection;
