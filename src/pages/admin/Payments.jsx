import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Payments() {
  useDocumentTitle('Payments & Folios');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Finance</p>
        <h1 className="display-section">Guest Folios & Settlements</h1>
      </div>
      <DashboardPanel
        title="Folio Ledger"
        subtitle="Guest folio settlements, suite billing statements, and deposit schedules."
      >
        <p className="text-sm text-[#5B5258] leading-relaxed">
          Resident folio overview structured around transparent nightly rates and private hospitality charges.
        </p>
      </DashboardPanel>
    </div>
  );
}

export default Payments;
