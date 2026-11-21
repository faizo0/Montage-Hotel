import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGsapPlugins, prefersReducedMotion } from '@/utils/gsapHelpers';
import { cn } from '@/utils/cn';

/**
 * ScrollVideoFrame — Foundation hook for scroll-controlled video scrubbing or
 * frame-sequence storytelling using GSAP ScrollTrigger.
 */
export function ScrollVideoFrame({
  poster,
  videoSrc,
  alt = 'Architectural Sequence',
  className = '',
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoSrc || prefersReducedMotion()) return undefined;
    registerGsapPlugins();

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = self.progress * video.duration;
        }
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(video);
    };
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-[14px] border border-[#E3D5CE] bg-[#E9DDE0]/50',
        className
      )}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt={alt}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default ScrollVideoFrame;
