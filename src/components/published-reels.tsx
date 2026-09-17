"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { reels } from "@/lib/content";

/**
 * The five plates that close the work page.
 *
 * The design draws five empty frames here, and they held a placeholder. They
 * hold her own footage now: the reels are already shot 720 by 1280, which is
 * almost exactly the 294 by 465 the design asks for, so they drop straight in.
 *
 * They run themselves, silent and looping, and only while they are on screen.
 * Five autoplaying files would otherwise be a few megabytes of video fetched
 * by a visitor who has not asked for any of it, so nothing is preloaded, each
 * one starts when it scrolls into view and pauses again when it leaves. Under
 * prefers-reduced-motion none of them ever start and the poster frame stands.
 */
const SHOWN = reels.slice(0, 5);

export function PublishedReels({ heading }: { heading: string }) {
  const reduced = useReducedMotion();
  const frames = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;

    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            // the file is only fetched once it is worth fetching
            if (!v.src) v.src = v.dataset.src ?? "";
            void v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.35 },
    );

    const list = frames.current.filter(Boolean) as HTMLVideoElement[];
    for (const v of list) seen.observe(v);
    return () => seen.disconnect();
  }, [reduced]);

  return (
    <section className="bg-page py-12 xl:py-[4vw]">
      <div className="frame">
        <h2 className="s-title text-white">{heading}</h2>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:mt-[3vw] xl:gap-[1.39vw]">
          {SHOWN.map((reel, i) => (
            <li
              key={reel.slug}
              className="group relative aspect-[294/465] w-full overflow-hidden rounded-[12px] bg-black/30"
            >
              <video
                ref={(el) => {
                  frames.current[i] = el;
                }}
                data-src={`/video/${reel.slug}.mp4`}
                poster={`/video/${reel.slug}.jpg`}
                preload="none"
                muted
                loop
                playsInline
                aria-label={`${reel.title}, ${reel.note}, ${reel.lang}`}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* the foot, so the caption reads over whatever the frame is
                  doing at that moment */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(20,5,4,0)_0%,rgba(20,5,4,0.72)_100%)]"
              />

              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3 xl:p-[0.9vw]">
                <span className="s-card-meta font-medium text-white">
                  {reel.title}
                </span>
                <span className="s-card-meta text-white/60">{reel.lang}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
