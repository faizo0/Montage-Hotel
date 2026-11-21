import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Hairline Champagne Beige Divider with optional subtle Mughal-inspired
 * geometric architectural centerpiece.
 */
export function Divider({ className = '', ornate = false }) {
  if (!ornate) {
    return (
      <hr
        className={cn('border-0 border-t border-[#E3D5CE] w-full m-0', className)}
      />
    );
  }

  return (
    <div className={cn('flex items-center gap-4 w-full', className)} role="separator">
      <span className="h-px flex-1 bg-[#E3D5CE]" />
      <svg
        width="28"
        height="16"
        viewBox="0 0 28 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 text-[#C6A46A]"
      >
        <path
          d="M14 1.5L19.5 8L14 14.5L8.5 8L14 1.5Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="14" cy="8" r="1.5" fill="currentColor" />
        <path d="M1 8H6.5M21.5 8H27" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-[#E3D5CE]" />
    </div>
  );
}

export default Divider;
