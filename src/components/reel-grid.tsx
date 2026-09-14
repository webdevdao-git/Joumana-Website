"use client";

import { useRef, useState } from "react";
import { reels } from "@/lib/content";

/**
 * The same clips the home page runs past you, laid out still so they can
 * actually be watched. One plays at a time: starting a second clip stops and
 * rewinds the first, because six pieces of audio at once is nobody's idea of a
 * portfolio.
 */
export function ReelGrid() {
  const [playing, setPlaying] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  function toggle(slug: string) {
    const el = refs.current[slug];
    if (!el) return;

    if (playing === slug) {
      el.pause();
      setPlaying(null);
      return;
    }

    Object.entries(refs.current).forEach(([k, other]) => {
      if (k !== slug && other) {
        other.pause();
        other.currentTime = 0;
      }
    });

    el.play().catch(() => {});
    setPlaying(slug);
  }

  return (
    <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:gap-4">
      {reels.map((reel) => {
        const isPlaying = playing === reel.slug;
        return (
          <li key={reel.slug} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => toggle(reel.slug)}
              aria-label={`${isPlaying ? "Pause" : "Play"} ${reel.title}`}
              aria-pressed={isPlaying}
              className="group relative aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-card"
            >
              <video
                ref={(el) => {
                  refs.current[reel.slug] = el;
                }}
                src={`/video/${reel.slug}.mp4`}
                poster={`/video/${reel.slug}.jpg`}
                preload="none"
                playsInline
                onEnded={() => setPlaying(null)}
                className="h-full w-full object-cover"
              />

              <span
                className={`pointer-events-none absolute inset-0 bg-black/15 transition-opacity duration-500 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 text-white transition-all duration-500 ${
                  isPlaying
                    ? "scale-90 opacity-0"
                    : "opacity-100 group-hover:bg-white group-hover:text-card-heading"
                }`}
              >
                <svg width="11" height="13" viewBox="0 0 11 13" aria-hidden="true">
                  <path d="M0 0l11 6.5L0 13z" fill="currentColor" />
                </svg>
              </span>
            </button>

            <div className="flex flex-col gap-1">
              <h3 className="text-[13px] font-semibold leading-tight text-heading xl:text-[15px]">
                {reel.title}
              </h3>
              <p className="text-[11px] leading-tight text-body-soft xl:text-[13px]">
                {reel.note} &middot; {reel.lang}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
