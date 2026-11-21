import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Guests() {
  useDocumentTitle('Guest Directory');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Hospitality CRM</p>
        <h1 className="display-section">Guest Profiles & Preferences</h1>
      </div>
      <DashboardPanel
        title="Guest Directory"
        subtitle="VIP preference profiles, stay histories, and bespoke concierge notes."
      >
        <p className="text-sm text-[#5B5258] leading-relaxed">
          Curated guest hospitality profiles capturing room orientation, bedding, and culinary preferences.
        </p>
      </DashboardPanel>
    </div>
  );
}

export default Guests;
