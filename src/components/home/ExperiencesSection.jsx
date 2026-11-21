import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ExperienceCard } from '@/components/common/ExperienceCard';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { EXPERIENCES_DATA } from '@/data/experiencesData';
import { PUBLIC_ROUTES } from '@/routes/routePaths';

/**
 * Section 8 — Exclusive Experiences
 * Showcases Fine Dining, Spa & Wellness, Swimming Pool, and Events & Celebrations.
 */
export function ExperiencesSection() {
  return (
    <section className="border-t border-[#E3D5CE] bg-[#F8F3EA] py-16 md:py-24">
      <Container>
        <SectionHeader
          kicker="Exclusive Experiences"
          title="A Curated Rhythm of Hospitality"
          subtitle="From signature Pakistani dining beneath carved limestone arches to tranquil spa rituals, garden pools, and grand celebration halls."
          action={
            <Button
              to={PUBLIC_ROUTES.EXPERIENCES}
              variant="secondary"
              icon={ArrowRight}
            >
              Explore All Experiences
            </Button>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {EXPERIENCES_DATA.map((experience, index) => (
            <RevealOnScroll key={experience.id} delay={index * 0.07} y={22}>
              <ExperienceCard experience={experience} className="h-full" />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExperiencesSection;
