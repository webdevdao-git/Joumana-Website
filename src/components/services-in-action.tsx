"use client";

import { useRef, useState } from "react";
import { reels, servicesPage } from "@/lib/content";

/**
 * Four clips under the six disciplines, so the services page ends on her doing
 * the work rather than describing it.
 *
 * These play with sound, which is the one thing that separates them from the
 * same footage elsewhere: it runs silent behind an arrow on the home page and
 * as silent loops on the work page. On a services page the voice is a good
 * part of what is being offered, so it is the point rather than a decoration.
 *
 * Only one plays at a time, nothing is fetched until somebody asks for it, and
 * a second press stops it.
 */
const SHOWN = servicesPage.inAction.clips
  .map((c) => ({ ...c, reel: reels.find((r) => r.slug === c.slug) }))
  .filter((c): c is typeof c & { reel: (typeof reels)[number] } => !!c.reel);

export function ServicesInAction() {
  const { heading, lede } = servicesPage.inAction;
  const [playing, setPlaying] = useState<string | null>(null);
  const frames = useRef<Record<string, HTMLVideoElement | null>>({});

  function toggle(slug: string) {
    const el = frames.current[slug];
    if (!el) return;

    if (playing === slug) {
      el.pause();
      setPlaying(null);
      return;
    }

    for (const [k, other] of Object.entries(frames.current)) {
      if (k !== slug && other) {
        other.pause();
        other.currentTime = 0;
      }
    }

    if (!el.src) el.src = el.dataset.src ?? "";
    el.muted = false;
    void el.play().catch(() => {});
    setPlaying(slug);
  }

  return (
    <section className="bg-white py-12 xl:py-[3vw]">
      <div className="frame flex flex-col gap-8 xl:gap-[2.4vw]">
        <div className="flex flex-col gap-3">
          <h2 className="s-title text-card-heading">{heading}</h2>
          <p className="s-body max-w-[58ch] text-card-body">{lede}</p>
        </div>

        {/* capped so four 9:16 frames plus the heading and the captions come
            to less than a screen; at the full frame width they run to 1070 */}
        <ul className="grid w-full max-w-[1180px] grid-cols-2 gap-4 lg:grid-cols-4 xl:gap-[1.1vw]">
          {SHOWN.map(({ slug, shows, reel }) => {
            const on = playing === slug;
            return (
              <li key={slug} className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => toggle(slug)}
                  aria-label={`${on ? "Pause" : "Play"} ${reel.title}`}
                  className="group relative aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-card"
                >
                  <video
                    ref={(el) => {
                      frames.current[slug] = el;
                    }}
                    data-src={`/video/${slug}.mp4`}
                    poster={`/video/${slug}.jpg`}
                    preload="none"
                    playsInline
                    onEnded={() => setPlaying(null)}
                    className="h-full w-full object-cover"
                  />

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,5,4,0)_45%,rgba(20,5,4,0.45)_100%)] transition-opacity duration-500 ${
                      on ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 text-white transition-all duration-500 ${
                      on
                        ? "scale-90 opacity-0"
                        : "opacity-100 group-hover:bg-white group-hover:text-card-heading"
                    }`}
                  >
                    {/* a play triangle, sitting a touch right of centre so it
                        looks centred rather than measures centred */}
                    <svg width="13" height="15" viewBox="0 0 13 15" aria-hidden="true" className="ml-0.5">
                      <path d="M0 0l13 7.5L0 15z" fill="currentColor" />
                    </svg>
                  </span>
                </button>

                <div className="flex flex-col gap-1">
                  <h3 className="s-card-title text-card-heading">{reel.title}</h3>
                  <p className="s-card-meta text-card-body-soft">{shows}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
