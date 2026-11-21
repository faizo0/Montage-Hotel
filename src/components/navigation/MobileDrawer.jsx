import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/buttons/Button';
import { Divider } from '@/components/layout/Divider';
import { PUBLIC_NAV_LINKS } from '@/data/navigationData';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/routes/routePaths';
import { useHotel } from '@/context/HotelContext';
import { cn } from '@/utils/cn';

export function MobileDrawer() {
  const { mobileMenuOpen, setMobileMenuOpen } = useHotel();

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#29232A]/30 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
            className="fixed right-0 top-0 flex h-full w-full max-w-sm flex-col justify-between overflow-y-auto border-l border-[#E3D5CE] bg-[#F8F3EA] p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <BrandLogo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#E3D5CE] bg-[#E9DDE0]/60 text-[#29232A] hover:border-[#702D43] transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <Divider className="my-6" />

              <nav className="flex flex-col gap-1">
                {PUBLIC_NAV_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === PUBLIC_ROUTES.HOME}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-[10px] px-4 py-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors',
                        isActive
                          ? 'bg-[#E9DDE0] text-[#702D43]'
                          : 'text-[#29232A] hover:bg-[#E9DDE0]/50'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <NavLink
                  to={PUBLIC_ROUTES.GUEST_PORTAL}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-[10px] px-4 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#5B5258] hover:bg-[#E9DDE0]/50"
                >
                  Guest Portal
                </NavLink>
                <NavLink
                  to={ADMIN_ROUTES.DASHBOARD}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-[10px] px-4 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#5B5258] hover:bg-[#E9DDE0]/50"
                >
                  Management Console
                </NavLink>
              </nav>
            </div>

            <div className="space-y-3 border-t border-[#E3D5CE] pt-6">
              <Button
                to={PUBLIC_ROUTES.BOOKING}
                variant="primary"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Your Stay
              </Button>
              <Button
                to={PUBLIC_ROUTES.LOGIN}
                variant="secondary"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Member Sign In
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;
