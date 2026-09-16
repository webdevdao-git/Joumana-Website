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
import { site } from "@/lib/content";

/**
 * Node 45:1248. The design leaves the hero background empty because her own
 * pictures go there.
 *
 * Seven frames, crossfading, each drifting slowly as it holds.
 *
 * The pictures are 2:3 portraits. Stretched across a band that is close to
 * 16:9 they lose about two thirds of their height, so what survives is a
 * fragment of a portrait blown up past the size the file can carry: a face
 * with no room around it, soft at the edges. That was tried four ways and it
 * is the shape of the crop that is wrong, not the crop line.
 *
 * So on a wide screen the picture is given a column of its own instead. It
 * bleeds to the top, bottom and right edge of the section, at a proportion
 * close to its own, which leaves about three quarters of each photograph
 * standing and draws 700-odd pixels out of a 1706px file rather than pulling
 * 853 across 1500. Downsampling instead of stretching is most of why it reads
 * as a photograph again. Its left edge dissolves into the oxblood so the two
 * halves are one composition rather than a seam.
 *
 * A phone is the one place the old treatment was right: a tall screen and a
 * tall picture are the same shape, so below lg the frame still fills the
 * screen and the words sit over it.
 *
 * CONFIRM: the files came off WhatsApp at 853px. They are upscaled 2x with
 * Lanczos and a light unsharp pass so the browser always has more pixels than
 * it needs. The camera originals would still be a real step up.
 *
 * Reduced motion holds the first frame and nothing moves.
 */
const SLIDES = [
  { src: "/images/hero-slide-3.webp", at: "50% 22%", alt: "Joumana Saad in Dubai" },
  { src: "/images/hero-slide-1.webp", at: "50% 12%", alt: "Joumana Saad, communications specialist and journalist in Dubai" },
  { src: "/images/hero-slide-5.webp", at: "50% 20%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-6.webp", at: "50% 26%", alt: "Joumana Saad at work" },
  { src: "/images/hero-slide-4.webp", at: "50% 20%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-2.webp", at: "50% 10%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-7.webp", at: "50% 22%", alt: "Joumana Saad at work in Dubai" },
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
      className="hero-fill relative flex items-end overflow-hidden bg-oxblood lg:items-center"
    >
      {/* the picture: the whole band on a phone, its own column from lg up */}
      <motion.div
        className="absolute inset-0 overflow-hidden lg:left-auto lg:w-[52%]"
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
            {/* drifting as it holds: across as well as in, so the movement
                has a direction rather than being a plain zoom */}
            <motion.div
              className="absolute inset-0"
              initial={reduced ? { scale: 1, x: 0 } : { scale: 1.06, x: 8 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: HOLD / 1000 + 3, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={active === 0}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
                style={{ objectPosition: slide.at }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* one light grade over all seven, so they read as a set */}
        <div className="absolute inset-0 bg-oxblood/[0.1] mix-blend-multiply" />

        {/* on a phone the words sit on the picture, so they need a floor:
            deep in the lower left, gone by the upper right */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(20,5,4,0.86)_0%,rgba(20,5,4,0.6)_28%,rgba(20,5,4,0.2)_56%,rgba(20,5,4,0)_78%)] lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45 lg:hidden" />

        {/* from lg the words are beside the picture, not on it, so all it
            needs is for its left edge to dissolve into the oxblood */}
        <div className="absolute inset-y-0 left-0 hidden w-[15%] bg-gradient-to-r from-oxblood via-oxblood/40 to-transparent lg:block" />
        <div className="absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-oxblood/60 to-transparent lg:block" />
      </motion.div>

      <motion.div
        className="relative w-full pb-14 pt-24 lg:py-0"
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        <div className="frame">
          <div className="flex flex-col items-start gap-6 lg:max-w-[min(620px,38vw)] xl:gap-8">
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 xl:text-[13px]"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.role}
            </motion.p>

            <h1 className="t-display text-left text-white">
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  Stories worth <b>telling</b>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  Voices worth <b>hearing</b>
                </motion.span>
              </span>
            </h1>

            {/* which frame is showing, and a way to step through them */}
            <motion.div
              className="flex items-center gap-2.5"
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
        </div>
      </motion.div>
    </section>
  );
}
