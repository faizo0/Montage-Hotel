import React, { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * HeroSlideshow — Fullscreen 6-scene cinematic hotel slideshow powered by GSAP.
 * Features seamless crossfades, slow zoom, gentle horizontal panning, responsive
 * mobile portrait sources, optional MP4 playback fallback, and natural exposure.
 */
export function HeroSlideshow({
  scenes = [],
  activeIndex = 0,
  onSceneChange,
}) {
  const slideRefs = useRef([]);
  const mediaRefs = useRef([]);
  const prevIndexRef = useRef(0);
  const [videoErrors, setVideoErrors] = useState({});

  // Preload upcoming scene one step ahead without blocking initial paint
  useEffect(() => {
    if (!scenes.length) return;
    const nextIdx = (activeIndex + 1) % scenes.length;
    const nextScene = scenes[nextIdx];
    if (nextScene?.image) {
      const img = new Image();
      img.src = nextScene.image;
    }
  }, [activeIndex, scenes]);

  // Automatic 6-second cinematic cadence
  useEffect(() => {
    if (scenes.length <= 1) return undefined;
    const currentScene = scenes[activeIndex];
    const delayMs = (currentScene?.durationSec || 6) * 1000;

    const timer = window.setTimeout(() => {
      onSceneChange?.((activeIndex + 1) % scenes.length);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [activeIndex, scenes, onSceneChange]);

  // GSAP crossfade + slow Ken Burns zoom & pan choreography
  useEffect(() => {
    if (!scenes.length) return undefined;

    const reduced = prefersReducedMotion();
    const prevIdx = prevIndexRef.current;
    const currentSlide = slideRefs.current[activeIndex];
    const currentMedia = mediaRefs.current[activeIndex];
    const prevSlide = prevIdx !== activeIndex ? slideRefs.current[prevIdx] : null;
    const scene = scenes[activeIndex];

    const ctx = gsap.context(() => {
      slideRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === activeIndex) {
          gsap.set(el, { zIndex: 2 });
        } else if (idx === prevIdx) {
          gsap.set(el, { zIndex: 1 });
        } else {
          gsap.set(el, { zIndex: 0, opacity: 0 });
        }
      });

      if (currentSlide) {
        if (prevIdx === activeIndex && currentSlide.style.opacity === '') {
          gsap.set(currentSlide, { opacity: 1 });
        } else {
          gsap.fromTo(
            currentSlide,
            { opacity: prevIdx === activeIndex ? 1 : 0 },
            {
              opacity: 1,
              duration: reduced ? 0.2 : 1.4,
              ease: 'power2.inOut',
            }
          );
        }
      }

      if (prevSlide) {
        gsap.to(prevSlide, {
          opacity: 0,
          duration: reduced ? 0.2 : 1.4,
          ease: 'power2.inOut',
        });
      }

      if (currentMedia && !reduced && scene?.motion) {
        gsap.fromTo(
          currentMedia,
          {
            scale: scene.motion.scaleFrom,
            xPercent: scene.motion.xFrom,
          },
          {
            scale: scene.motion.scaleTo,
            xPercent: scene.motion.xTo,
            duration: (scene.durationSec || 6) + 1.5,
            ease: 'sine.inOut',
            overwrite: 'auto',
          }
        );
      } else if (currentMedia) {
        gsap.set(currentMedia, { scale: 1.02, xPercent: 0 });
      }
    });

    prevIndexRef.current = activeIndex;

    return () => ctx.revert();
  }, [activeIndex, scenes]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#E9DDE0]">
      {scenes.map((scene, idx) => {
        const useVideo = Boolean(scene.videoSrc) && !videoErrors[scene.id];

        return (
          <div
            key={scene.id}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            aria-hidden={idx !== activeIndex}
            className={cn(
              'absolute inset-0 h-full w-full overflow-hidden',
              idx === 0 ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div
              ref={(el) => {
                mediaRefs.current[idx] = el;
              }}
              className="h-full w-full will-change-transform"
            >
              {useVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={scene.image}
                  onError={() =>
                    setVideoErrors((prev) => ({ ...prev, [scene.id]: true }))
                  }
                  className="h-full w-full object-cover brightness-[0.98] contrast-[1.04] saturate-[1.05]"
                >
                  <source src={scene.videoSrc} type="video/mp4" />
                </video>
              ) : (
                <picture className="block h-full w-full">
                  {scene.portraitImage && (
                    <source
                      media="(max-width: 767px)"
                      srcSet={scene.portraitImage}
                    />
                  )}
                  <img
                    src={scene.image}
                    alt={`${scene.title} — ${scene.caption}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center brightness-[0.98] contrast-[1.04] saturate-[1.05]"
                  />
                </picture>
              )}
            </div>
          </div>
        );
      })}

      {/* Measured Localized Contrast Scrims — Warm Ivory Top + Deep Plum-Charcoal Bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#F8F3EA]/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(35,20,27,0.74)_0%,rgba(35,20,27,0.36)_38%,rgba(35,20,27,0)_72%)]"
      />
    </div>
  );
}

export default HeroSlideshow;
