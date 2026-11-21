import React from 'react';
import { Button } from '@/components/buttons/Button';

export function EmptyState({
  title = 'No records available',
  description = 'Adjust your active filters or create a new entry to populate this view.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA] px-6 py-14 text-center">
      <h3 className="display-card mb-2">{title}</h3>
      <p className="max-w-md text-sm text-[#877B80] leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
