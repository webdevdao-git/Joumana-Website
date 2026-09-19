"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The frame beside What I Bring: a phone, with the clip running in its screen.
 *
 * The screen in the supplied mockup was painted white, so it was knocked out
 * to transparency and the device trimmed to its own bounds. The numbers below
 * are that screen measured off the trimmed file rather than eyeballed, as a
 * share of it, so the video sits in the glass at every size.
 *
 * Everything the device is made of stays on top of the video: the bezel, the
 * side button, and the island, which the knockout left alone because it is
 * black rather than white. So the clip runs under the island the way it would
 * on the phone itself.
 *
 * It has sound, and it starts without it, because no browser will autoplay
 * audio at somebody who has not asked for it: press the speaker and it
 * unmutes. The clip plays only while it is on screen, nothing is fetched until
 * it scrolls into view, and it mutes itself again on the way out so it cannot
 * carry on talking from off screen.
 *
 * Under prefers-reduced-motion it never starts and the poster frame stands.
 *
 * CONFIRM: the clip arrived as a 277MB 4K HEVC recording. This is the same
 * footage at 720 wide, twice what the glass is ever drawn at, and 5.9MB with
 * its audio. The original is in source-files/videos.
 */
const FRAME = { w: 533, h: 1087 };
const SCREEN = { left: 5.25, top: 2.21, width: 89.68, height: 95.68 };

function Speaker({ off }: { off: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M11 5 6.5 8.5H3.5v7h3L11 19V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {off ? (
        <path d="m15.5 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path
          d="M15 9.2a4 4 0 0 1 0 5.6M17.8 6.6a7.8 7.8 0 0 1 0 10.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function BringReels() {
  const reduced = useReducedMotion();
  const film = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const v = film.current;
    if (!v) return;

    const seen = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src ?? "";
          void v.play().catch(() => {});
        } else {
          v.pause();
          // it should not still be talking once it has left the screen
          v.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.3 },
    );
    seen.observe(v);
    return () => seen.disconnect();
  }, [reduced]);

  const toggle = () => {
    const v = film.current;
    if (!v) return;
    if (!v.src) v.src = v.dataset.src ?? "";
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play().catch(() => {});
  };

  return (
    /* Sized by height as well as width so the section can never grow taller
       than the screen on a short window. */
    <div
      className="relative mx-auto h-[min(76vw,56svh)] lg:h-[min(52vw,80svh)]"
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}
    >
      {/* the glass, under everything the device is made of */}
      <div
        className="absolute overflow-hidden rounded-[8%/4%] bg-black"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          width: `${SCREEN.width}%`,
          height: `${SCREEN.height}%`,
        }}
      >
        <video
          ref={film}
          data-src="/video/services-phone.mp4"
          poster="/video/services-phone.jpg"
          preload="none"
          muted
          loop
          playsInline
          aria-label="Joumana Saad presenting to camera"
          className="h-full w-full object-cover"
        />
      </div>

      <Image
        src="/brand/phone-frame.png"
        alt=""
        fill
        sizes="(max-width: 1024px) 76vw, 40vw"
        className="pointer-events-none select-none object-contain"
      />

      {/* the sound, on the glass rather than beside the phone, so it reads as
          part of what is playing */}
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Turn the sound on" : "Turn the sound off"}
        aria-pressed={!muted}
        className="absolute bottom-[5%] right-[11%] flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/70 xl:h-10 xl:w-10"
      >
        <Speaker off={muted} />
      </button>
    </div>
  );
}
