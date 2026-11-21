import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { TMMonogram } from '@/assets/logo/TMMonogram';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { cn } from '@/utils/cn';

/**
 * Refined 2026 Luxury BrandLogo Lockup
 * Combines the champagne-gold TM crest with editorial serif "THE MONTAGE"
 * and wide-tracked "SIGNATURE HOTEL" sub-title, enhanced with a subtle entrance reveal.
 */
export function BrandLogo({
  to = PUBLIC_ROUTES.HOME,
  variant = 'gold',
  size = 'md',
  className = '',
}) {
  const prefersReduced = useReducedMotion();
  const isIvory = variant === 'ivory';
  const titleColor = isIvory ? 'text-[#F8F3EA]' : 'text-[#29232A]';
  const subtitleColor = isIvory ? 'text-[#E2CCA0]' : 'text-[#997A46]';
  const monogramSize = size === 'lg' ? 48 : 38;

  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-3.5 whitespace-nowrap shrink-0 group focus-visible:outline-[#702D43]',
        className
      )}
    >
      <motion.span
        initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex shrink-0"
      >
        <TMMonogram size={monogramSize} variant={variant} className="shrink-0" />
      </motion.span>
      <span className="flex flex-col leading-none">
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'font-editorial text-lg md:text-[21px] font-semibold tracking-[0.06em] uppercase transition-colors duration-200',
            titleColor,
            !isIvory && 'group-hover:text-[#702D43]'
          )}
        >
          THE MONTAGE
        </motion.span>
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mt-1 text-[9px] font-semibold tracking-[0.28em] uppercase',
            subtitleColor
          )}
        >
          SIGNATURE HOTEL
        </motion.span>
      </span>
    </Link>
  );
}

export default BrandLogo;
