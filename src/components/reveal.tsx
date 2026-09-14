"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;
const EASE_FILM = [0.76, 0, 0.24, 1] as const;

/** Quiet fade and rise, used for copy. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

/**
 * Film style reveal for photography. The frame opens from the bottom while the
 * picture inside settles back from an overscale, so it reads as a camera move
 * rather than a fade.
 *
 * One motion value drives both the clip and the scale, because building the
 * clip string from a single number always produces a valid value, where handing
 * motion two clip-path strings to interpolate is fragile.
 *
 * The observed element is the outer wrapper, which is never clipped. Watching
 * the clipped element itself does not work: while the clip is closed its
 * visible box has no area, so the observer never reports it on screen and the
 * frame stays shut forever.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const progress = useMotionValue(100);
  const clipPath = useTransform(progress, (v) => `inset(${v}% 0% 0% 0%)`);
  const scale = useTransform(progress, [100, 0], [1.2, 1]);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(progress, 0, {
      duration: 1.15,
      delay,
      ease: EASE_FILM,
    });
    return () => controls.stop();
  }, [inView, reduced, delay, progress]);

  if (reduced) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath }}
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Moves its contents against the scroll, by a few dozen pixels at most. */
export function Parallax({
  children,
  amount = 48,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** Counts up to a figure the first time it comes into view. */
export function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const target = Number.parseInt(value, 10);
  const count = useMotionValue(0);
  const text = useTransform(count, (v) =>
    String(Math.round(v)).padStart(value.length, "0"),
  );

  useEffect(() => {
    if (!inView || reduced || Number.isNaN(target)) return;
    const controls = animate(count, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, target, count]);

  if (reduced || Number.isNaN(target)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
