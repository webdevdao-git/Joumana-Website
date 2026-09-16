"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * One of the six disciplines on the services page.
 *
 * The layout is the design's, to the pixel, and none of the motion below moves
 * it: everything animates from a state that resolves to exactly where the
 * frame puts it. What the motion adds is a sense that these are six separate
 * offers rather than one long column of text.
 *
 *   the label arrives from the left, the number from the right
 *   the plate opens from the bottom while the picture settles back from an
 *     overscale, the same film move the rest of the site uses
 *   the copy and then the chips come up in sequence
 *   the plate drifts a little against the scroll, so the section is never
 *     completely still while it is on screen
 *
 * Under prefers-reduced-motion every one of those becomes a plain fade, and
 * the parallax is dropped entirely.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export type Tone = "dark" | "light";

export type Discipline = {
  label: string;
  index: string;
  head: string;
  body: readonly string[];
  includes: readonly string[];
  cta: string;
};

/** The design sets the Includes chips two to a row, whatever their widths. */
function pairs(items: readonly string[]) {
  const out: string[][] = [];
  for (let i = 0; i < items.length; i += 2) out.push(items.slice(i, i + 2));
  return out;
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/pill:translate-x-1"
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DisciplineSection({
  d,
  plate,
  tone = "dark",
}: {
  d: Discipline;
  plate: string;
  tone?: Tone;
}) {
  /* the two grounds the site alternates between, and what reads on each */
  const skin =
    tone === "light"
      ? {
          section: "bg-cream",
          head: "text-card-heading",
          body: "text-card-body",
          soft: "text-card-body-soft",
          chip: "border-card-heading/35 text-card-body",
        }
      : {
          section: "bg-page",
          head: "text-white",
          body: "text-white",
          soft: "text-white",
          chip: "border-white text-white",
        };

  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { once: true, margin: "-120px" });

  /**
   * Everything below is tied to how far the section has travelled through the
   * window, not fired once on arrival. A one shot animation plays and is over;
   * scrolling on afterwards feels like nothing is happening. Bound to scroll,
   * the section keeps answering the whole way past.
   */
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  /* the label and the number pass each other, slowly, in opposite directions */
  const labelX = useTransform(scrollYProgress, [0, 1], [-26, 26]);
  const indexX = useTransform(scrollYProgress, [0, 1], [26, -26]);

  /* the plate opens from its bottom edge as the section comes up the screen */
  const open = useTransform(scrollYProgress, [0.06, 0.42], [100, 0]);
  const clip = useTransform(open, (v) => `inset(${v}% 0% 0% 0%)`);

  /* and the picture settles back out of an overscale while the wash clears */
  const plateScale = useTransform(scrollYProgress, [0.06, 0.6], [1.16, 1]);
  const wash = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.75, delay, ease: EASE },
  });

  return (
    <section ref={section} className={`${skin.section} py-12 xl:py-[5.79vw]`}>
      <div className="mx-auto w-full max-w-[1658px] px-6 md:px-10 xl:px-20">
        <div className="flex items-start justify-between gap-6">
          <motion.h2
            className={`s-title ${skin.head}`}
            style={reduced ? undefined : { x: labelX }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {d.label}
          </motion.h2>

          <motion.span
            className={`s-title ${skin.head}`}
            style={reduced ? undefined : { x: indexX }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {d.index}
          </motion.span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[818fr_600fr] lg:gap-[4.63vw] xl:mt-[5.79vw]">
          <div className="flex flex-col">
            <motion.h3 className={`s-head ${skin.head}`} {...rise(0.12)}>
              {d.head}
            </motion.h3>

            {d.body.map((para, i) => (
              <motion.p
                key={para}
                className={`s-body ${skin.body} ${
                  i === 0 ? "mt-6 xl:mt-[2.31vw]" : "mt-5 xl:mt-[1.81vw]"
                }`}
                {...rise(0.18 + i * 0.07)}
              >
                {para}
              </motion.p>
            ))}

            <motion.p
              className={`s-head mt-8 ${skin.head} xl:mt-[2.31vw]`}
              {...rise(0.18 + d.body.length * 0.07)}
            >
              Includes
            </motion.p>

            <ul className="mt-6 flex flex-col gap-3 xl:mt-[2.31vw]">
              {pairs(d.includes).map((row, r) => (
                <li key={r}>
                  <ul className="flex flex-wrap gap-3">
                    {row.map((item, i) => (
                      <motion.li
                        key={`${item}-${i}`}
                        className={`s-chip inline-flex h-[48px] cursor-default items-center rounded-[32px] border px-6 transition-colors duration-300 xl:h-16 xl:px-8 ${skin.chip} ${
                          tone === "light"
                            ? "hover:bg-oxblood hover:text-white"
                            : "hover:bg-white hover:text-oxblood"
                        }`}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{
                          duration: 0.55,
                          delay: 0.34 + (r * 2 + i) * 0.07,
                          ease: EASE,
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* the plate, opening from the bottom, drifting against the scroll */}
          <div className="group relative self-start">
            <motion.div
              className="relative aspect-[600/667] w-full overflow-hidden"
              initial={reduced ? { opacity: 0 } : undefined}
              animate={reduced && inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8 }}
              style={reduced ? undefined : { clipPath: clip }}
            >
              <motion.div
                className="absolute inset-[-3%]"
                style={reduced ? undefined : { y: drift, scale: plateScale }}
              >
                <Image
                  src={plate}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </motion.div>

              {/* the wash clears off the picture as it comes up the screen */}
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-oxblood"
                  style={{ opacity: wash }}
                />
              )}

              {/* and it leans in a little under the pointer */}
              <span className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            </motion.div>

            <motion.div
              className="mt-5 flex justify-end lg:absolute lg:bottom-0 lg:right-0 lg:mt-0"
              {...rise(0.5)}
            >
              <Link
                href="/contact"
                className="s-button group/pill inline-flex h-[52px] items-center justify-center gap-3 rounded-[32px] bg-brown px-7 text-white transition-[background-color,transform] duration-300 hover:bg-oxblood xl:h-16 xl:px-9"
              >
                {d.cta}
                <ArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
