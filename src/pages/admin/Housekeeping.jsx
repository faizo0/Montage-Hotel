import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Housekeeping() {
  useDocumentTitle('Housekeeping');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Suite Readiness</p>
        <h1 className="display-section">Housekeeping & Turndown</h1>
      </div>
      <DashboardPanel
        title="Housekeeping Operations"
        subtitle="Suite inspection cadences, linen turnarounds, and VIP arrival readiness."
      >
        <p className="text-sm text-[#5B5258] leading-relaxed">
          Coordinated suite readiness and evening turndown schedule across all residential wings.
        </p>
      </DashboardPanel>
    </div>
  );
}

export default Housekeeping;
