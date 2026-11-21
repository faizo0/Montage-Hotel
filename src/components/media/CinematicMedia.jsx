import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * CinematicMedia — Fullscreen hotel video & architectural photography backdrop.
 * Renders a native <video autoPlay muted loop playsInline> when videoSrc is provided,
 * and applies a slow, gentle Ken Burns architectural camera motion on the poster
 * fallback so there are never static or broken frames.
 */
export function CinematicMedia({
  poster,
  videoSrc,
  alt = 'The Montage Signature Hotel',
  overlay = true,
  animateCamera = false,
  className = '',
  children,
}) {
  const mediaRef = useRef(null);

  useEffect(() => {
    if (!animateCamera || videoSrc || prefersReducedMotion()) return undefined;
    const node = mediaRef.current;
    if (!node) return undefined;

    const tween = gsap.fromTo(
      node,
      { scale: 1.07, xPercent: -1.2 },
      {
        scale: 1.0,
        xPercent: 1.2,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }
    );

    return () => tween.kill();
  }, [animateCamera, videoSrc]);

  return (
    <div className={cn('relative overflow-hidden bg-[#E9DDE0]/60', className)}>
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          ref={mediaRef}
          src={poster}
          alt={alt}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover will-change-transform"
        />
      )}

      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#F8F3EA]/75 via-[#F8F3EA]/45 to-[#F8F3EA]/90"
        />
      )}

      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default CinematicMedia;
