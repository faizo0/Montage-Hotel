import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { HOTEL_INFO } from '@/data/hotelInfo';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Settings() {
  useDocumentTitle('Property Settings');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Configuration</p>
        <h1 className="display-section">Property & Design System Settings</h1>
      </div>
      <DashboardPanel
        title={HOTEL_INFO.brandName}
        subtitle="Core property constants and Light Luxury configuration."
      >
        <dl className="divide-y divide-[#E3D5CE] text-sm max-w-xl">
          <div className="flex justify-between py-3">
            <dt className="text-[#877B80]">Region</dt>
            <dd className="font-medium text-[#29232A]">{HOTEL_INFO.country}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-[#877B80]">Check-In / Check-Out</dt>
            <dd className="font-medium text-[#29232A] tabular-nums">
              {HOTEL_INFO.checkIn} · {HOTEL_INFO.checkOut}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-[#877B80]">Concierge Contact</dt>
            <dd className="font-medium text-[#29232A]">{HOTEL_INFO.conciergeEmail}</dd>
          </div>
        </dl>
      </DashboardPanel>
    </div>
  );
}

export default Settings;
