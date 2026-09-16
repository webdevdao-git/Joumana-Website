"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { reels } from "@/lib/content";

/**
 * Node 45:1451, running as a marquee.
 *
 * The clips were shot 1080 x 1920, so the cards are 9:16 rather than the
 * landscape plates the design sketched in. The row runs continuously, but
 * unlike the logo band these cards are interactive, so it stops while the
 * pointer is over it and while a clip is playing. Without that you would be
 * chasing a moving target to press play.
 */
export function BroadcastStage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  function toggle(key: string) {
    const el = refs.current[key];
    if (!el) return;

    if (playing === key) {
      el.pause();
      setPlaying(null);
      return;
    }

    Object.entries(refs.current).forEach(([k, other]) => {
      if (k !== key && other) {
        other.pause();
        other.currentTime = 0;
      }
    });

    el.play().catch(() => {});
    setPlaying(key);
  }

  // doubled so the -50% loop meets itself with no seam
  const run = [...reels, ...reels];
  const paused = hovered || playing !== null;

  return (
    <section className="sec overflow-hidden bg-cream">
      <div className="frame">
        <h2 className="t-section text-center text-card-heading">
          From Broadcast to The Stage.
        </h2>
      </div>

      <div
        className="mt-7 overflow-hidden xl:mt-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ul
          className="marquee-run flex w-max items-start gap-3"
          data-paused={paused}
          style={{ ["--marquee-duration" as string]: "52s" }}
        >
          {run.map((reel, i) => {
            const key = `${reel.slug}-${i}`;
            const isPlaying = playing === key;
            return (
              <li
                key={key}
                className="flex w-[170px] shrink-0 flex-col gap-3 sm:w-[210px] xl:w-[251px]"
              >
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-label={`${isPlaying ? "Pause" : "Play"} ${reel.title}`}
                  aria-hidden={i >= reels.length ? true : undefined}
                  tabIndex={i >= reels.length ? -1 : undefined}
                  className="group relative aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-card"
                >
                  <video
                    ref={(el) => {
                      refs.current[key] = el;
                    }}
                    src={`/video/${reel.slug}.mp4`}
                    poster={`/video/${reel.slug}.jpg`}
                    preload="none"
                    playsInline
                    onEnded={() => setPlaying(null)}
                    className="h-full w-full object-cover"
                  />

                  <span
                    className={`pointer-events-none absolute inset-0 bg-rule transition-opacity duration-500 ${
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

                <div className="flex flex-col gap-1" aria-hidden={i >= reels.length ? true : undefined}>
                  <h3 className="text-[13px] font-semibold leading-tight text-card-heading xl:text-[15px]">
                    {reel.title}
                  </h3>
                  <p className="text-[11px] leading-tight text-card-body-soft xl:text-[13px]">
                    {reel.note} &middot; {reel.lang}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="frame mt-8 flex justify-center xl:mt-10">
        <Link
          href="/work"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-brown px-7 text-[14px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-90 xl:h-14 xl:px-8 xl:text-[16px]"
        >
          Explore Media
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
