import React from 'react';
import { cn } from '@/utils/cn';

export function DashboardPanel({
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = '',
}) {
  return (
    <section
      className={cn(
        'rounded-[16px] border border-[#E3D5CE] bg-white shadow-[0_6px_24px_-16px_rgba(41,35,42,0.1)]',
        className
      )}
    >
      {(title || action) && (
        <header className="flex flex-col gap-3 border-b border-[#E3D5CE] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h2 className="font-editorial text-xl md:text-2xl font-medium text-[#29232A]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-[#877B80]">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={cn('p-6', bodyClassName)}>{children}</div>
    </section>
  );
}

export default DashboardPanel;
