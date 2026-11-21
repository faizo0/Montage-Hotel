import React from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { STAY_PACKAGES } from '@/data/roomsData';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const CATEGORY_OPTIONS = [
  { value: 'All', label: 'All Categories' },
  { value: 'Room', label: 'Rooms' },
  { value: 'Suite', label: 'Suites' },
];

const GUEST_OPTIONS = [
  { value: 0, label: 'Any Capacity' },
  { value: 2, label: '2+ Guests' },
  { value: 3, label: '3+ Guests' },
  { value: 4, label: '4+ Guests' },
  { value: 5, label: '5 Guests' },
];

const SORT_OPTIONS = [
  { value: 'curated', label: 'Curated Showcase' },
  { value: 'size-desc', label: 'Demo Size: Largest First' },
  { value: 'guests-desc', label: 'Capacity: Most Guests' },
];

const SELECT_CLASS =
  'h-11 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] px-3.5 text-sm text-[#29232A] transition-all duration-200 focus:border-[#702D43] focus:bg-white focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none cursor-pointer';

/**
 * Interactive Filter & Stay Package Preview Panel for Rooms & Suites (PKR Demo Rates).
 */
export function RoomsFilterBar({
  category,
  onCategoryChange,
  minGuests,
  onMinGuestsChange,
  stayPlan,
  onStayPlanChange,
  sortBy,
  onSortByChange,
  resultCount,
  totalCount,
  onReset,
  hasActiveFilters,
}) {
  return (
    <div className="rounded-[18px] border border-[#E3D5CE] bg-white p-5 sm:p-7 shadow-[0_14px_38px_-22px_rgba(41,35,42,0.14)]">
      {/* Top Bar: Label, Results Counter & Reset */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#E3D5CE] pb-4">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-[#702D43]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#702D43]">
            Refine Collection
          </span>
          <span className="text-xs text-[#877B80] tabular-nums">
            · Showing {resultCount} of {totalCount} demo residences
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#E3D5CE] bg-[#F8F3EA] px-3 py-1.5 text-xs font-medium text-[#702D43] hover:border-[#C6A46A] hover:bg-[#E9DDE0] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
        {/* Room Category Segmented Buttons */}
        <div className="lg:col-span-3">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2">
            Room Category
          </span>
          <div
            role="group"
            aria-label="Filter by room category"
            className="grid grid-cols-3 rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] p-1"
          >
            {CATEGORY_OPTIONS.map((opt) => {
              const isActive = category === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onCategoryChange(opt.value)}
                  aria-pressed={isActive}
                  className={cn(
                    'h-9 rounded-[8px] px-2 text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap',
                    isActive
                      ? 'bg-[#702D43] text-white shadow-sm'
                      : 'text-[#5B5258] hover:text-[#29232A]'
                  )}
                >
                  {opt.label === 'All Categories' ? 'All' : opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guest Capacity */}
        <div className="lg:col-span-2">
          <label
            htmlFor="rooms-filter-guests"
            className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
          >
            Guest Capacity
          </label>
          <select
            id="rooms-filter-guests"
            value={minGuests}
            onChange={(e) => onMinGuestsChange(Number(e.target.value))}
            className={SELECT_CLASS}
          >
            {GUEST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Demo Stay Package Rate Selector (PKR) */}
        <div className="lg:col-span-4">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2">
            Stay Package Rate Preview (PKR)
          </span>
          <div
            role="group"
            aria-label="Preview stay package rates"
            className="grid grid-cols-3 gap-1.5 rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] p-1"
          >
            {STAY_PACKAGES.map((pkg) => {
              const isActive = stayPlan === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => onStayPlanChange(pkg.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'rounded-[8px] px-2 py-1.5 text-center transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-[#702D43] text-white shadow-sm'
                      : 'text-[#5B5258] hover:text-[#29232A]'
                  )}
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.08em]">
                    {pkg.name}
                  </span>
                  <span className="block text-[10px] opacity-90 tabular-nums">
                    {formatCurrency(pkg.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sorting Options */}
        <div className="lg:col-span-3">
          <label
            htmlFor="rooms-filter-sort"
            className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#877B80] mb-2"
          >
            Sort Collection
          </label>
          <select
            id="rooms-filter-sort"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className={SELECT_CLASS}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default RoomsFilterBar;
