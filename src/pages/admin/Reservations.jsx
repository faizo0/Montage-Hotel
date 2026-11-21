import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { DataTable } from '@/dashboard/tables/DataTable';
import { StatusLabel } from '@/dashboard/tables/StatusLabel';
import { RECENT_RESERVATIONS } from '@/data/adminDemoData';
import { formatCurrency, formatDateShort } from '@/utils/formatters';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const COLUMNS = [
  { key: 'code', header: 'Reservation ID', mono: true },
  { key: 'guest', header: 'Primary Guest' },
  { key: 'suite', header: 'Suite' },
  { key: 'checkIn', header: 'Check-In', render: (r) => formatDateShort(r.checkIn) },
  { key: 'nights', header: 'Nights', align: 'right' },
  { key: 'total', header: 'Folio', align: 'right', render: (r) => formatCurrency(r.total) },
  { key: 'status', header: 'State', render: (r) => <StatusLabel status={r.status} /> },
];

export function Reservations() {
  useDocumentTitle('Reservations Desk');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Front Desk</p>
        <h1 className="display-section">Reservations Register</h1>
      </div>

      <DashboardPanel
        title="Active & Upcoming Bookings"
        subtitle="Live front-desk register displaying guest arrival cadences, assigned suites, and folio status."
      >
        <DataTable
          columns={COLUMNS}
          rows={RECENT_RESERVATIONS}
          searchPlaceholder="Search reservations..."
        />
      </DashboardPanel>
    </div>
  );
}

export default Reservations;
