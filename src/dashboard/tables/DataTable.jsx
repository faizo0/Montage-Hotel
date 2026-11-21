import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';

/**
 * High-density Light Luxury DataTable with built-in client search and tabular alignment.
 */
export function DataTable({
  columns = [],
  rows = [],
  searchPlaceholder = 'Search records...',
  searchableKeys = [],
  emptyTitle = 'No matching entries',
  emptyDescription = 'Clear your search query to restore all records.',
}) {
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return rows;
    return rows.filter((row) => {
      const keysToCheck = searchableKeys.length
        ? searchableKeys
        : Object.keys(row);
      return keysToCheck.some((key) =>
        String(row[key] ?? '')
          .toLowerCase()
          .includes(trimmed)
      );
    });
  }, [query, rows, searchableKeys]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#877B80]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA] pl-9 pr-3 text-sm text-[#29232A] placeholder:text-[#877B80] transition-all focus:border-[#702D43] focus:ring-2 focus:ring-[#702D43]/15 focus:outline-none"
          />
        </div>
        <span className="text-xs text-[#877B80] tabular-nums">
          {filteredRows.length} of {rows.length} entries
        </span>
      </div>

      {filteredRows.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={query ? 'Clear Search' : undefined}
          onAction={query ? () => setQuery('') : undefined}
        />
      ) : (
        <div className="overflow-x-auto rounded-[12px] border border-[#E3D5CE] shadow-[0_6px_18px_-14px_rgba(41,35,42,0.12)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E3D5CE] bg-[#E9DDE0]/55">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#877B80] whitespace-nowrap',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D5CE]/70 bg-white">
              {filteredRows.map((row, idx) => (
                <tr
                  key={row.id || row.code || idx}
                  className="transition-colors hover:bg-[#F8F3EA]/80"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'px-4 py-3.5 text-sm text-[#29232A] whitespace-nowrap',
                        col.align === 'right' && 'text-right tabular-nums',
                        col.mono && 'font-mono text-xs tabular-nums'
                      )}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTable;
