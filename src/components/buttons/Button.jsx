import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticWrapper } from '@/components/buttons/MagneticWrapper';
import { cn } from '@/utils/cn';

const VARIANT_CLASSES = {
  primary: [
    'bg-[#702D43] text-white border border-[#C6A46A]/40',
    'hover:bg-[#572133] hover:border-[#C6A46A]/75',
    'shadow-[inset_0_1px_0_rgba(226,204,160,0.22),0_10px_24px_-14px_rgba(112,45,67,0.58)]',
    'hover:shadow-[inset_0_1px_0_rgba(226,204,160,0.32),0_16px_34px_-14px_rgba(87,33,51,0.68)]',
  ].join(' '),
  secondary: [
    'bg-[#E9DDE0] text-[#702D43] border border-[#D8C2C8]',
    'hover:bg-[#DFCED3] hover:border-[#C6A46A]/65',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.68),0_8px_20px_-14px_rgba(112,45,67,0.22)]',
    'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_26px_-14px_rgba(112,45,67,0.32)]',
  ].join(' '),
  outline: [
    'bg-white/75 text-[#702D43] border border-[#702D43]/35',
    'hover:border-[#C6A46A] hover:bg-[#E9DDE0]/70',
    'shadow-[0_4px_14px_-10px_rgba(41,35,42,0.18)]',
  ].join(' '),
  ghost:
    'bg-transparent text-[#29232A] hover:text-[#702D43] hover:bg-[#F2EAE2] border border-transparent',
};

const SIZE_CLASSES = {
  sm: 'min-h-[38px] px-4 py-2 text-[11px] tracking-[0.11em]',
  md: 'min-h-[44px] px-6 py-2.5 text-xs tracking-[0.12em]',
  lg: 'min-h-[50px] px-8 py-3 text-xs tracking-[0.14em]',
};

/**
 * 2026 Luxury Interactive Button System
 * Primary: Royal Burgundy (#702D43) with crisp white text and subtle champagne gold micro-trim.
 * Secondary: Soft Rose Beige (#E9DDE0) with Royal Burgundy text.
 * Features depth layering, champagne sheen sweep, pressed states, animated icon glides,
 * and optional desktop magnetic motion.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  magnetic = false,
  disabled = false,
  ...props
}) {
  const classes = cn(
    'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden',
    'rounded-[10px] font-semibold uppercase whitespace-nowrap shrink-0',
    'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]',
    'cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none',
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] || SIZE_CLASSES.md,
    className
  );

  const iconMotion =
    iconPosition === 'left'
      ? 'transition-transform duration-300 group-hover/btn:-translate-x-0.5'
      : 'transition-transform duration-300 group-hover/btn:translate-x-0.5';

  const content = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#E2CCA0]/20 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
        />
      )}
      {Icon && iconPosition === 'left' && (
        <Icon className={cn('relative z-10 h-3.5 w-3.5 shrink-0', iconMotion)} aria-hidden="true" />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={cn('relative z-10 h-3.5 w-3.5 shrink-0', iconMotion)} aria-hidden="true" />
      )}
    </>
  );

  const element = to ? (
    <Link to={to} className={classes} {...props}>
      {content}
    </Link>
  ) : href ? (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  ) : (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {content}
    </button>
  );

  if (magnetic && !disabled) {
    return <MagneticWrapper>{element}</MagneticWrapper>;
  }

  return element;
}

export default Button;
