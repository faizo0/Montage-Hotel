import React from 'react';
import { cn } from '@/utils/cn';

export function Container({ children, className = '', narrow = false }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-10 lg:px-12',
        narrow ? 'max-w-[1040px]' : 'max-w-[1360px]',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
