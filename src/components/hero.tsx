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
 * Three things were making these read badly and all three are composition
 * rather than content:
 *
 * The headline sat dead centre, and every one of these photographs puts her
 * dead centre too, so the type landed across her face or her chest in all
 * seven. It now sits in the lower left, the way a cover line does, and the
 * pictures are left to be pictures.
 *
 * The wash was a flat black 45% over the whole frame, which takes the contrast
 * out of a photograph without making the type any easier to read. It is now
 * directional: deep in the lower left under the words, clearing away toward
 * the upper right where her face is. The photograph gets its own light back.
 *
 * The crop lines were cutting the top of her head off in several frames. They
 * are set from where her head actually starts in each file: the visible band
 * is about 485 of the 1280 rows, so the window is placed to open a little
 * above her and run down to roughly her waist.
 *
 * The seven were also shot in different light and one of them is black and
 * white, so they did not read as a set. A single low oxblood multiply over all
 * of them ties the b&w frame to the colour ones.
 *
 * CONFIRM: the files came off WhatsApp at 853px wide, which is under half the
 * width this band is drawn at. They are now upscaled 2x with Lanczos and a
 * light unsharp pass, so the browser downsamples instead of stretching, and
 * that is the whole of what can be done from here. The camera originals would
 * still be a real step up.
 *
 * Reduced motion holds the first frame and nothing moves.
 */
/**
 * Ordered, not numbered. The band is widest and the eye is freshest on the
 * first frame, so the one with the most room around her leads and the two
 * desk frames, which are the same setup in the same outfit, are kept apart.
 */
const SLIDES = [
  { src: "/images/hero-slide-3.webp", at: "50% 31%", alt: "Joumana Saad in Dubai" },
  { src: "/images/hero-slide-1.webp", at: "50% 15%", alt: "Joumana Saad, communications specialist and journalist in Dubai" },
  { src: "/images/hero-slide-5.webp", at: "50% 29%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-6.webp", at: "50% 34%", alt: "Joumana Saad at work" },
  { src: "/images/hero-slide-4.webp", at: "50% 29%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-2.webp", at: "50% 12%", alt: "Joumana Saad" },
  { src: "/images/hero-slide-7.webp", at: "50% 31%", alt: "Joumana Saad at work in Dubai" },
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
      className="hero-fill relative flex items-end overflow-hidden bg-black"
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
            {/* the frame, filling the band, drifting as it holds. It drifts
                across as well as in, so the movement has a direction rather
                than being a plain zoom. */}
            <motion.div
              className="absolute inset-0"
              initial={reduced ? { scale: 1, x: 0 } : { scale: 1.07, x: 10 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: HOLD / 1000 + 3, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={active === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.at }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* one grade over all seven, kept light: the tying together is done in
          the files themselves, and a heavy multiply here only drains them */}
      <div className="absolute inset-0 bg-oxblood/[0.12] mix-blend-multiply" />

      {/* the scrim that carries the headline: deep under the words in the
          lower left, gone by the upper right */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(20,5,4,0.86)_0%,rgba(20,5,4,0.62)_26%,rgba(20,5,4,0.22)_54%,rgba(20,5,4,0)_78%)]" />
      {/* a floor along the bottom edge and a little weight under the nav, so
          white type has something to sit on wherever a frame runs bright */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      <motion.div
        className="relative w-full pb-14 pt-24 xl:pb-20"
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        <div className="frame flex flex-col items-start gap-6 xl:gap-8">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.3em] text-white/70 xl:text-[13px]"
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
                /* the mark is 3px tall; the padding is what makes the target
                   big enough to hit on a phone */
                className="px-1.5 py-3"
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
