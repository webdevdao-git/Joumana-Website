"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Node 45:1248. The design leaves the hero background empty because her own
 * pictures go there.
 *
 * Seven frames, crossfading, each drifting slowly in as it holds.
 *
 * They are 2:3 portraits and the band is close to 16:9. Filling it with cover
 * scales them past two hundred percent and leaves nothing but a face, so the
 * picture is shown whole instead: it sits at its own proportions down the
 * middle, and a blurred, darkened copy of the same frame fills the width
 * behind it. The headline lands across her middle rather than her face,
 * because a portrait puts the face in the top third.
 *
 * CONFIRM: the files are 853px wide, which is what WhatsApp leaves. That is
 * under half the width this band is drawn at, so they soften on a large
 * screen. The originals would fix it.
 *
 * Reduced motion holds the first frame and nothing moves.
 */
const SLIDES = [
  { src: "/images/hero-slide-1.webp", at: "50% 20%", alt: "Joumana Saad, communications specialist and journalist in Dubai" },
  { src: "/images/hero-slide-2.webp", at: "46% 22%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-3.webp", at: "48% 24%", alt: "Joumana Saad in Dubai" },
  { src: "/images/hero-slide-4.webp", at: "52% 20%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-5.webp", at: "55% 26%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-6.webp", at: "52% 24%", alt: "Joumana Saad at work" },
  { src: "/images/hero-slide-7.webp", at: "42% 24%", alt: "Joumana Saad at work in Dubai" },
] as const;

const HOLD = 5200;

export function Hero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const go = useCallback((i: number) => {
    setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    timer.current = setTimeout(() => go(active + 1), HOLD);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, reduced, go]);

  const slide = SLIDES[active];

  return (
    <section
      ref={section}
      className="hero-fill relative flex items-center overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: mediaY }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            {/* the width, filled with the same frame thrown out of focus */}
            <Image
              src={slide.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="scale-110 object-cover blur-2xl brightness-[0.55] saturate-[0.85]"
              style={{ objectPosition: slide.at }}
            />

            {/* and the frame itself, whole, drifting in as it holds */}
            <motion.div
              className="absolute inset-0"
              initial={reduced ? { scale: 1 } : { scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: HOLD / 1000 + 3, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={active === 0}
                sizes="(max-width: 768px) 100vw, 60vh"
                className="object-cover object-[50%_18%] md:object-contain md:object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
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

          {/* which frame is showing, and a way to step through them */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show frame ${i + 1} of ${SLIDES.length}`}
                aria-current={i === active}
                className="py-2"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
