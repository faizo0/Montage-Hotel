import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { BookingBar } from '@/components/home/BookingBar';
import { WelcomeSection } from '@/components/home/WelcomeSection';
import { RoomsPreview } from '@/components/home/RoomsPreview';
import { ExperiencesSection } from '@/components/home/ExperiencesSection';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

/**
 * Step 2 — Cinematic Luxury Homepage
 * Composes Sections 2–8 inside PublicLayout (which supplies Navbar & Footer).
 */
export function Home() {
  useDocumentTitle('Welcome');

  return (
    <div className="bg-[#F8F3EA]">
      <HeroSection />
      <BookingBar />
      <WelcomeSection />
      <RoomsPreview />
      <ExperiencesSection />
    </div>
  );
}

export default Home;
