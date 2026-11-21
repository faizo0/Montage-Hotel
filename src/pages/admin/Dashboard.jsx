import React from 'react';
import { StatCard } from '@/dashboard/components/StatCard';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { RevenueChart } from '@/dashboard/charts/RevenueChart';
import { OccupancyChart } from '@/dashboard/charts/OccupancyChart';
import { DataTable } from '@/dashboard/tables/DataTable';
import { StatusLabel } from '@/dashboard/tables/StatusLabel';
import { Button } from '@/components/buttons/Button';
import {
  ADMIN_KPI_METRICS,
  RECENT_RESERVATIONS,
  REVENUE_SERIES_DATA,
} from '@/data/adminDemoData';
import { ADMIN_ROUTES } from '@/routes/routePaths';
import { formatCurrency, formatDateShort } from '@/utils/formatters';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const RESERVATION_COLUMNS = [
  { key: 'code', header: 'Code', mono: true },
  { key: 'guest', header: 'Guest Name' },
  { key: 'suite', header: 'Suite Category' },
  {
    key: 'checkIn',
    header: 'Arrival',
    render: (row) => formatDateShort(row.checkIn),
  },
  {
    key: 'nights',
    header: 'Nights',
    align: 'right',
  },
  {
    key: 'total',
    header: 'Folio Total',
    align: 'right',
    render: (row) => formatCurrency(row.total),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusLabel status={row.status} />,
  },
];

export function Dashboard() {
  useDocumentTitle('Executive Dashboard');

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="editorial-kicker mb-1.5">Property Operations</p>
          <h1 className="display-section">Executive Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button to={ADMIN_ROUTES.REPORTS} variant="secondary" size="sm">
            View Reports
          </Button>
          <Button to={ADMIN_ROUTES.RESERVATIONS} variant="primary" size="sm">
            Reservations Desk
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_KPI_METRICS.map((kpi) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            context={kpi.context}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <DashboardPanel
          title="Departmental Revenue Performance"
          subtitle="Trailing 6-month suite and fine dining ledger (PKR)"
          className="xl:col-span-7"
        >
          <RevenueChart data={REVENUE_SERIES_DATA} />
        </DashboardPanel>

        <DashboardPanel
          title="Monthly Occupancy Pace"
          subtitle="Percentage of suite inventory occupied per month"
          className="xl:col-span-5"
        >
          <OccupancyChart data={REVENUE_SERIES_DATA} />
        </DashboardPanel>
      </div>

      {/* Reservations Table */}
      <DashboardPanel
        title="Upcoming Arrivals & In-House Folios"
        subtitle="Real-time front desk register"
        action={
          <Button to={ADMIN_ROUTES.RESERVATIONS} variant="outline" size="sm">
            Full Register
          </Button>
        }
      >
        <DataTable
          columns={RESERVATION_COLUMNS}
          rows={RECENT_RESERVATIONS}
          searchPlaceholder="Filter by guest, code, or suite..."
          searchableKeys={['code', 'guest', 'suite', 'status']}
        />
      </DashboardPanel>
    </div>
  );
}

export default Dashboard;
