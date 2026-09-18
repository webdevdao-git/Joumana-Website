"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { reels } from "@/lib/content";

/**
 * Node 45:1451.
 *
 * The clips were shot 1080 x 1920, so the cards are 9:16 rather than the
 * landscape plates the design sketched in.
 *
 * The row runs on its own and can also be driven by the two arrows under it,
 * which is why it is a scroller moved frame by frame rather than a CSS
 * marquee. A marquee translates the whole track, so there is no position to
 * step from and an arrow has nothing to act on; a scroller has a scrollLeft
 * that the run, the arrows and a swipe can all share.
 *
 * The list is doubled and the run subtracts one pass whenever it crosses it,
 * so it loops with no seam and the arrows never reach an end to be disabled
 * at. At 1728 all six cards fit at once, which is exactly where arrows bound
 * to a real end would have sat there greyed out.
 *
 * It stops while the pointer is on it, while a clip is playing, and for a
 * moment after an arrow, since a row that keeps sliding under a press is the
 * thing that makes these hard to use. Under prefers-reduced-motion it never
 * starts and the arrows are the only way across.
 */
const STEP_REST = 900;

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-5 w-5 ${back ? "rotate-180" : ""}`}
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BroadcastStage() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});
  const rail = useRef<HTMLUListElement>(null);
  const restUntil = useRef(0);

  const run = [...reels, ...reels];
  const held = hovered || playing !== null;

  /* one pass is half the track, so crossing it can be taken back invisibly */
  const wrap = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const pass = el.scrollWidth / 2;
    if (el.scrollLeft >= pass) el.scrollLeft -= pass;
    else if (el.scrollLeft <= 0) el.scrollLeft += pass;
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const el = rail.current;
      if (el && !held && Date.now() > restUntil.current) {
        el.scrollLeft += 0.5; // about 30px a second, the old marquee's pace
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [held, reduced, wrap]);

  /** one card plus the gap, measured rather than assumed */
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>("li");
    if (!el || !card) return;
    restUntil.current = Date.now() + STEP_REST;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

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

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full border border-oxblood/25 text-card-heading transition-all duration-300 hover:border-oxblood hover:bg-oxblood hover:text-white";

  return (
    <section className="sec bg-cream">
      <div className="frame">
        <h2 className="t-section text-center text-card-heading">
          From Broadcast to The Stage.
        </h2>
      </div>

      <ul
        ref={rail}
        onScroll={wrap}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onTouchStart={() => {
          restUntil.current = Date.now() + STEP_REST;
        }}
        tabIndex={0}
        role="region"
        aria-label="Showreel clips"
        /* Lenis takes every wheel by default so it can drive the page, which
           leaves a sideways swipe over this row doing nothing at all. This
           hands the horizontal axis back to the row and keeps the vertical
           one with the page. */
        data-lenis-prevent-horizontal=""
        className="rail mt-7 flex gap-3 overflow-x-auto overscroll-x-contain px-6 pb-2 md:px-10 xl:mt-10 xl:px-20"
      >
        {run.map((reel, i) => {
          const key = `${reel.slug}-${i}`;
          const isPlaying = playing === key;
          const echo = i >= reels.length;
          return (
            <li
              key={key}
              className="flex w-[170px] shrink-0 flex-col gap-3 sm:w-[210px] xl:w-[251px]"
            >
              <button
                type="button"
                onClick={() => toggle(key)}
                aria-label={`${isPlaying ? "Pause" : "Play"} ${reel.title}`}
                aria-hidden={echo ? true : undefined}
                tabIndex={echo ? -1 : undefined}
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

              <div className="flex flex-col gap-1" aria-hidden={echo ? true : undefined}>
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

      {/* the two arrows, under the row on every screen */}
      <div className="frame mt-6 flex items-center justify-center gap-3 xl:mt-8">
        <button type="button" onClick={() => step(-1)} aria-label="Previous clips" className={arrow}>
          <Chevron back />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next clips" className={arrow}>
          <Chevron />
        </button>
      </div>

      <div className="frame mt-7 flex justify-center xl:mt-9">
        <Link
          href="/work"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-brown px-7 text-[14px] font-semibold text-white transition-opacity duration-300 hover:opacity-90 xl:h-14 xl:px-8 xl:text-[16px]"
        >
          Explore Media
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
