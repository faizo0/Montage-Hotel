import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/buttons/Button';
import { Container } from '@/components/layout/Container';
import { PUBLIC_NAV_LINKS } from '@/data/navigationData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';
import { useHotel } from '@/context/HotelContext';
import { cn } from '@/utils/cn';

/**
 * Premium Luxury Hotel Navbar — Royal Burgundy, Champagne Gold & Warm Ivory
 * Transparent over the Homepage hero; transitions cleanly into Warm Ivory (#F8F3EA) on scroll.
 */
export function Navbar() {
  const { setMobileMenuOpen } = useHotel();
  const { pathname } = useLocation();
  const prefersReduced = useReducedMotion();
  const isHome = pathname === PUBLIC_ROUTES.HOME;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const showSolidIvory = !isHome || scrolled;

  return (
    <motion.header
      initial={prefersReduced ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'z-40 h-20 w-full transition-[background-color,border-color,box-shadow] duration-300 ease-out',
        isHome ? 'fixed top-0 left-0 right-0' : 'sticky top-0',
        showSolidIvory
          ? 'border-b border-[#E3D5CE] bg-[#F8F3EA]/95 backdrop-blur-md shadow-[0_6px_26px_-14px_rgba(41,35,42,0.12)]'
          : 'border-b border-transparent bg-gradient-to-b from-[#F8F3EA]/75 via-[#F8F3EA]/35 to-transparent'
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        {/* Left: Champagne Gold TM Monogram & Brand Wordmark */}
        <BrandLogo />

        {/* Center: 7 Single-Line Editorial Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center justify-center gap-4 xl:gap-6"
        >
          {PUBLIC_NAV_LINKS.map((item, idx) => (
            <motion.div
              key={item.to}
              initial={prefersReduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.14 + idx * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <NavLink
                to={item.to}
                end={item.to === PUBLIC_ROUTES.HOME}
                className={({ isActive }) =>
                  cn(
                    'group relative py-1.5 text-[11px] xl:text-xs font-medium tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200',
                    isActive
                      ? 'text-[#702D43]'
                      : 'text-[#29232A]/85 hover:text-[#702D43]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0 left-0 h-[1.5px] w-full bg-[#702D43] transition-transform duration-300 ease-out origin-left',
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      )}
                    />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Right: Primary Royal Burgundy CTA + Mobile Trigger */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="hidden sm:block">
            <Button to={PUBLIC_ROUTES.BOOKING} variant="primary" size="sm" magnetic>
              Book Your Stay
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-[#F8F3EA]/90 text-[#29232A] hover:border-[#702D43] hover:bg-white lg:hidden cursor-pointer transition-all duration-200"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      </Container>
    </motion.header>
  );
}

export default Navbar;
