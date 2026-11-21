import React, { useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Official TM Monogram for THE MONTAGE SIGNATURE HOTEL.
 * Features an architectural stepped crest, Mughal-inspired corner finials,
 * and champagne gold (#C6A46A) detailing across Warm Ivory, Royal Burgundy, and transparent placements.
 */
export function TMMonogram({
  size = 44,
  variant = 'gold',
  className = '',
  title = 'TM Monogram — The Montage Signature Hotel',
}) {
  const uid = useId().replace(/:/g, '');
  const gradId = `tm-gold-${uid}`;

  const isIvory = variant === 'ivory';
  const isCharcoal = variant === 'charcoal';
  const isBurgundy = variant === 'burgundy';

  const frameBg = isBurgundy
    ? '#702D43'
    : isIvory
      ? 'rgba(41, 25, 31, 0.42)'
      : 'rgba(248, 243, 234, 0.94)';

  const outerStroke = isCharcoal ? '#29232A' : `url(#${gradId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'transition-transform duration-300 ease-out group-hover:scale-[1.03]',
        className
      )}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="4" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isIvory ? '#F1DEC0' : '#E2CCA0'} />
          <stop offset="50%" stopColor={isIvory ? '#DFC18C' : '#C6A46A'} />
          <stop offset="100%" stopColor={isIvory ? '#F6E7CB' : '#997A46'} />
        </linearGradient>
      </defs>

      {/* Architectural Crest Surface */}
      <rect
        x="2"
        y="2"
        width="52"
        height="52"
        rx="6"
        fill={frameBg}
        stroke={outerStroke}
        strokeWidth="1.25"
      />

      {/* Stepped Inner Mughal-Inspired Geometric Frame */}
      <path
        d="M11 6.5H45L49.5 11V45L45 49.5H11L6.5 45V11L11 6.5Z"
        stroke={outerStroke}
        strokeWidth="0.75"
        strokeOpacity="0.65"
      />

      {/* Cardinal Diamond Accents */}
      <circle cx="28" cy="6.5" r="1" fill={outerStroke} />
      <circle cx="28" cy="49.5" r="1" fill={outerStroke} />

      {/* Bespoke Serif-Inspired Interlocking T + M Monogram */}
      <path
        d="M15.5 19H30.5M23 19V37.5"
        stroke={outerStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15 19H17.5M28.5 19H31M20.5 37.5H25.5"
        stroke={outerStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M26 37.5V22.5L33 32L40 22.5V37.5"
        stroke={outerStroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 37.5H41.5"
        stroke={outerStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default TMMonogram;
