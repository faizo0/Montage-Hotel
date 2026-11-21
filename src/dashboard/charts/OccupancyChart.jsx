import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function OccupancyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 py-2.5 text-xs shadow-[0_12px_28px_-14px_rgba(41,35,42,0.18)]">
      <p className="font-medium text-[#29232A]">{label}</p>
      <p className="mt-1 font-mono text-[#702D43] tabular-nums">
        {payload[0].value}% Occupancy
      </p>
    </div>
  );
}

export function OccupancyChart({ data = [] }) {
  return (
    <div className="h-[290px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#E3D5CE" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#877B80', fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#877B80', fontSize: 12 }}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip content={<OccupancyTooltip />} cursor={{ fill: '#E9DDE0' }} />
          <Bar
            dataKey="occupancy"
            name="Occupancy"
            fill="#702D43"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OccupancyChart;
