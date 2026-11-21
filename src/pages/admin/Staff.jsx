import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Staff() {
  useDocumentTitle('Staff Roster');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Team & Concierge</p>
        <h1 className="display-section">Hospitality Staff Roster</h1>
      </div>
      <DashboardPanel
        title="Departmental Roster"
        subtitle="Dedicated butler assignments, concierge shifts, and spa practitioners."
      >
        <p className="text-sm text-[#5B5258] leading-relaxed">
          Hospitality team schedule ensuring continuous twenty-four-hour concierge and suite attendant coverage.
        </p>
      </DashboardPanel>
    </div>
  );
}

export default Staff;
