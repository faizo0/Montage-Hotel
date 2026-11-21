import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { HOTEL_IMAGES } from '@/assets/images';
import { PUBLIC_ROUTES } from '@/routes/routePaths';

export function About() {
  return (
    <PageShell
      kicker="Heritage & Craftsmanship"
      title="The Essence of Pakistani Hospitality"
      description="Rooted in Mughal-inspired limestone proportions, carved geometric woodwork, and serene courtyard gardens, The Montage Signature Hotel embodies refined five-star Pakistani luxury."
      primaryActionLabel="Explore Suites"
      primaryActionTo={PUBLIC_ROUTES.ROOMS}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 group overflow-hidden rounded-[16px] border border-[#E3D5CE] shadow-[0_16px_38px_-22px_rgba(41,35,42,0.18)]">
          <ImageWithFallback
            src={HOTEL_IMAGES.lobbyHero}
            alt="The Montage Signature Hotel Grand Lobby & Carved Colonnade in Pakistan"
            aspectRatio="aspect-[16/10]"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between rounded-[16px] border border-[#E3D5CE] bg-gradient-to-b from-white via-[#F8F3EA]/70 to-[#E9DDE0]/45 p-8 shadow-[0_6px_24px_-16px_rgba(41,35,42,0.12)]">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-[1.5px] w-6 bg-[#C6A46A]" aria-hidden="true" />
              <p className="editorial-kicker">Architectural Ethos</p>
            </div>
            <h2 className="display-card mb-4">
              Sculpted Marble, Carved Timber & Quiet Calm
            </h2>
            <p className="text-sm text-[#5B5258] leading-relaxed">
              Every colonnade, courtyard garden, and private suite pairs sunlit
              travertine stone and geometric jaali filigree with warm hand-rubbed
              walnut joinery, celebrating enduring Pakistani artistry alongside
              contemporary five-star ease.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E3D5CE] pt-5">
            <div>
              <span className="block font-editorial text-xl font-medium text-[#29232A]">
                Craftsmanship
              </span>
              <span className="text-xs text-[#877B80]">Jaali & Marble</span>
            </div>
            <div>
              <span className="block font-editorial text-xl font-medium text-[#29232A]">
                Hospitality
              </span>
              <span className="text-xs text-[#877B80]">Attentive Service</span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default About;
