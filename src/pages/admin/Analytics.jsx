import React from 'react';
import { DashboardPanel } from '@/dashboard/components/DashboardPanel';
import { RevenueChart } from '@/dashboard/charts/RevenueChart';
import { OccupancyChart } from '@/dashboard/charts/OccupancyChart';
import { REVENUE_SERIES_DATA } from '@/data/adminDemoData';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Analytics() {
  useDocumentTitle('Revenue Analytics');

  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker mb-1">Performance</p>
        <h1 className="display-section">Revenue & Occupancy Analytics</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DashboardPanel title="Revenue Trajectory">
          <RevenueChart data={REVENUE_SERIES_DATA} />
        </DashboardPanel>
        <DashboardPanel title="Occupancy Distribution">
          <OccupancyChart data={REVENUE_SERIES_DATA} />
        </DashboardPanel>
      </div>
    </div>
  );
}

export default Analytics;
