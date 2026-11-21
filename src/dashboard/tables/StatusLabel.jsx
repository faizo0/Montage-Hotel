import React from 'react';
import { Check, Clock, Compass } from 'lucide-react';
import { cn } from '@/utils/cn';

const STATUS_STYLE = {
  'Checked In': {
    text: 'text-[#702D43]',
    Icon: Check,
  },
  Confirmed: {
    text: 'text-[#702D43]',
    Icon: Check,
  },
  Arriving: {
    text: 'text-[#997A46]',
    Icon: Clock,
  },
  'Pre-Arrival': {
    text: 'text-[#877B80]',
    Icon: Compass,
  },
};

/**
 * Clean unboxed semantic status label with explicit icon + text pairing.
 */
export function StatusLabel({ status }) {
  const config = STATUS_STYLE[status] || {
    text: 'text-[#5B5258]',
    Icon: Clock,
  };
  const { Icon, text } = config;

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap', text)}>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}

export default StatusLabel;
