"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Node 45:1248. The design leaves the hero background empty because the film
 * goes there: her hosting the Dubai Chamber National Day celebration.
 *
 * The poster frame is painted first and the film fades in over it once it can
 * actually play, so there is never an empty black box while it buffers.
 * Reduced motion keeps the poster and never starts the film.
 */
const VIDEO = "/video/hero-loop.mp4";
const POSTER = "/video/hero-loop.jpg";

export function Hero() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [wantsVideo, setWantsVideo] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /**
   * The film is 2.6MB. On a phone that is most of the page weight, spent on
   * something the visitor did not ask for, so narrow screens and anyone on a
   * metered connection keep the poster frame instead. Decided in an effect
   * rather than during render, because the server has no viewport to measure
   * and guessing one produces a hydration mismatch.
   */
  useEffect(() => {
    if (reduced) return;

    const wide = window.matchMedia("(min-width: 768px)");
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;

    const decide = () => setWantsVideo(wide.matches && !saveData);
    decide();
    wide.addEventListener("change", decide);
    return () => wide.removeEventListener("change", decide);
  }, [reduced]);

  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;
    const play = () => {
      el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    };
    if (el.readyState >= 3) play();
    else el.addEventListener("canplay", play, { once: true });
    return () => el.removeEventListener("canplay", play);
  }, [reduced, wantsVideo]);

  return (
    <section
      ref={section}
      className="hero-fill relative flex items-center overflow-hidden bg-black"
    >
      <motion.div
        className="absolute -inset-y-[8%] inset-x-0"
        style={reduced ? undefined : { y: mediaY }}
      >
        <Image
          src={POSTER}
          alt="Joumana Saad hosting the Dubai Chamber National Day celebration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {!reduced && wantsVideo && (
          <video
            ref={video}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            src={VIDEO}
            poster={POSTER}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
      </motion.div>

      {/* the wash that carries the white headline */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      <motion.div
        className="relative w-full py-10"
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        <div className="frame">
          <h1 className="t-display text-center text-white">
            <span className="block">
              <motion.span
                className="inline-block"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Stories worth <b>telling</b>
              </motion.span>
            </span>
            <span className="block">
              <motion.span
                className="inline-block"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Voices worth <b>hearing</b>
              </motion.span>
            </span>
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
