import React, { useState } from 'react';
import { TMMonogram } from '@/assets/logo/TMMonogram';
import { cn } from '@/utils/cn';

/**
 * Zero-Broken-Image Policy:
 * Renders responsive architectural photography with referrerPolicy="no-referrer"
 * and a refined Warm Cream + TMMonogram fallback if loading fails.
 */
export function ImageWithFallback({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[4/3]',
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#E9DDE0]/60',
        aspectRatio,
        containerClassName
      )}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={cn('h-full w-full object-cover', className)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F8F3EA] to-[#E9DDE0] p-6 text-center">
          <TMMonogram size={40} variant="burgundy" />
          <span className="text-xs font-medium tracking-wide text-[#877B80]">
            {alt || 'The Montage Signature Hotel'}
          </span>
        </div>
      )}
    </div>
  );
}

export default ImageWithFallback;
