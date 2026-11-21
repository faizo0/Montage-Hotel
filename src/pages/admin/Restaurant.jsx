import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Restaurant() {
  useDocumentTitle('Restaurant Operations');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Culinary</p>
        <h1 className="display-section">Diwan Signature Dining</h1>
      </div>
      <DashboardPanel
        title="Dining & Table Ledger"
        subtitle="Tasting menu covers, courtyard seating reservations, and private dining salons."
      >
        <p className="text-sm text-[#5B5258] leading-relaxed">
          Diwan Signature Dining operations overview uniting evening table service and bespoke culinary requests.
        </p>
      </DashboardPanel>
    </div>
  );
}

export default Restaurant;
