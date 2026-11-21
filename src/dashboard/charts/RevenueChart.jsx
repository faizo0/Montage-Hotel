import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] px-4 py-3 text-xs shadow-[0_12px_28px_-14px_rgba(41,35,42,0.18)]">
      <p className="font-editorial text-base font-medium text-[#29232A] mb-1.5">
        {label} 2026
      </p>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between gap-6"
          >
            <span className="text-[#5B5258] capitalize">{entry.name}</span>
            <span className="font-mono font-medium text-[#29232A] tabular-nums">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RevenueChart({ data = [] }) {
  return (
    <div className="h-[290px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="montageRoomsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#702D43" stopOpacity={0.24} />
              <stop offset="95%" stopColor="#702D43" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="montageDiningFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C6A46A" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#C6A46A" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E3D5CE" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#877B80', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#877B80', fontSize: 12 }}
            tickFormatter={(val) => `$${Math.round(val / 1000)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rooms"
            name="Suites & Residences"
            stroke="#702D43"
            strokeWidth={2}
            fill="url(#montageRoomsFill)"
          />
          <Area
            type="monotone"
            dataKey="dining"
            name="Fine Dining"
            stroke="#C6A46A"
            strokeWidth={2}
            fill="url(#montageDiningFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
