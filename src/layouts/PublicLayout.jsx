import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navigation/Navbar';
import { MobileDrawer } from '@/components/navigation/MobileDrawer';
import { Footer } from '@/components/navigation/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { LuxuryCursor } from '@/components/animations/LuxuryCursor';
import { useLenis } from '@/hooks/useLenis';
import { useThemeDesign } from '@/context/ThemeDesignContext';

export function PublicLayout() {
  const { pathname } = useLocation();
  const { smoothScrollEnabled } = useThemeDesign();

  useLenis(smoothScrollEnabled);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F3EA] text-[#29232A]">
      <LuxuryCursor />
      <Navbar />
      <MobileDrawer />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
