import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { DataTable } from '@/dashboard/tables/DataTable';
import { ROOMS_DATA } from '@/data/roomsData';
import { formatCurrency } from '@/utils/formatters';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const COLUMNS = [
  { key: 'name', header: 'Suite Name' },
  { key: 'category', header: 'Tier' },
  { key: 'wing', header: 'Property Wing' },
  { key: 'sizeSqm', header: 'Area (m²)', align: 'right' },
  { key: 'ratePerNight', header: 'Daily Stay (1N)', align: 'right', render: (r) => formatCurrency(r.ratePerNight) },
  { key: 'weeklyPackagePrice', header: 'Weekly Pkg (7N)', align: 'right', render: (r) => formatCurrency(r.weeklyPackagePrice) },
  { key: 'monthlyPackagePrice', header: 'Monthly Pkg (30N)', align: 'right', render: (r) => formatCurrency(r.monthlyPackagePrice) },
  { key: 'availability', header: 'Status' },
];

export function RoomManagement() {
  useDocumentTitle('Room Management');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Inventory</p>
        <h1 className="display-section">Suite & Room Management</h1>
      </div>

      <DashboardPanel title="Configured Suite Categories">
        <DataTable
          columns={COLUMNS}
          rows={ROOMS_DATA}
          searchPlaceholder="Filter suites or wings..."
        />
      </DashboardPanel>
    </div>
  );
}

export default RoomManagement;
