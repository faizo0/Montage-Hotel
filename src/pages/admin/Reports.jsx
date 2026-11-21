import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Reports() {
  useDocumentTitle('Executive Reports');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Audits</p>
        <h1 className="display-section">Executive Night Audits & Reports</h1>
      </div>
      <DashboardPanel
        title="Executive Night Audits"
        subtitle="RevPAR statements, monthly hospitality board summaries, and ledger exports."
      >
        <p className="text-sm text-[#5B5258] leading-relaxed">
          Executive summary ledger structured for property performance audits and departmental night reviews.
        </p>
      </DashboardPanel>
    </div>
  );
}

export default Reports;
