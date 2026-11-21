import React from 'react';
import { cn } from '@/utils/cn';

/**
 * 2026 Light Luxury KPI Statistic Card
 * Warm Ivory & Soft Rose Beige surface, Champagne Gold accent rule, and Royal Burgundy delta ink.
 */
export function StatCard({ label, value, delta, context, className = '' }) {
  return (
    <div
      className={cn(
        'group flex flex-col justify-between rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/35 p-6',
        'shadow-[0_6px_22px_-14px_rgba(41,35,42,0.12)] transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-[#C6A46A]/65 hover:shadow-[0_16px_34px_-18px_rgba(112,45,67,0.18)]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="h-[1.5px] w-6 bg-[#C6A46A]/65 transition-all duration-300 group-hover:w-9 group-hover:bg-[#C6A46A]"
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="font-editorial text-3xl md:text-4xl font-medium text-[#29232A] tabular-nums leading-none">
          {value}
        </span>
      </div>

      {(delta || context) && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#E3D5CE] pt-3.5 text-xs">
          {delta && <span className="font-medium text-[#702D43]">{delta}</span>}
          {delta && context && <span aria-hidden="true" className="text-[#877B80]">·</span>}
          {context && <span className="text-[#877B80]">{context}</span>}
        </div>
      )}
    </div>
  );
}

export default StatCard;
