"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { clips } from "@/lib/content";

/**
 * Published work, as an index rather than a grid of cards.
 *
 * It was six cards, each with a thumbnail, and every thumbnail was the same
 * placeholder because no artwork has ever been supplied. Six copies of one
 * picture is worse than none, so the pictures are gone and the type does the
 * work, which is what a byline index looks like in print anyway.
 *
 * Each row is a rule, the outlet, the headline and what kind of piece it was.
 * Reaching a row wipes a cream ground across it from the left, the type turns
 * over to oxblood as it passes, and the headline steps forward. The wipe runs
 * from whichever edge you arrived at, so coming up the list opens from the
 * bottom and coming down opens from the top.
 *
 * CONFIRM: with real artwork per piece this could carry a plate again.
 */
const FEATURED = [
  "Jeff Koons, The King Of Kitsch",
  "Latin America, Dubai's Final Frontier",
  "New Retirement Visas Could Be A Game Changer For Expats In The UAE",
  "A New Playing Field",
  "Dubai Chamber 2017 Highlights",
  "Say Yes To The Future, Expo Bid Book",
] as const;

const articles = FEATURED.map((title) => {
  const clip = clips.find((c) => c.title === title);
  if (!clip) throw new Error(`featured article not in clips: ${title}`);
  return clip;
});

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 shrink-0 xl:h-7 xl:w-7"
    >
      <path
        d="M7 17 17 7M8.5 7H17v8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row({
  item,
}: {
  item: { title: string; outlet: string; kind: string; year: string; href: string };
}) {
  const reduced = useReducedMotion();
  const row = useRef<HTMLAnchorElement>(null);
  const [on, setOn] = useState(false);
  const [from, setFrom] = useState<"top" | "bottom">("top");

  /** which edge the pointer crossed, so the wipe starts there */
  const edge = (e: React.PointerEvent) => {
    const box = row.current?.getBoundingClientRect();
    if (!box) return;
    setFrom(e.clientY < box.top + box.height / 2 ? "top" : "bottom");
  };

  return (
    <a
      ref={row}
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      onPointerEnter={(e) => {
        edge(e);
        setOn(true);
      }}
      onPointerLeave={(e) => {
        edge(e);
        setOn(false);
      }}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      className="relative block border-t border-cream/20 px-4 py-6 xl:px-7 xl:py-8"
    >
      {/* the ground, wiping in from the edge you arrived at */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-cream"
        style={{
          transformOrigin: from,
          transform: reduced ? undefined : `scaleY(${on ? 1 : 0})`,
          opacity: reduced ? (on ? 1 : 0) : 1,
          transition: reduced
            ? "opacity 260ms ease"
            : `transform 520ms ${EASE}`,
        }}
      />

      <span
        className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-10"
        style={{
          color: on ? "var(--oxblood)" : "var(--cream)",
          transition: "color 360ms ease",
        }}
      >
        <span className="w-full shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70 lg:w-[19%] xl:text-[13px]">
          {item.outlet}
        </span>

        <span
          className="flex-1 font-display text-[21px] font-semibold uppercase leading-[1.15] xl:text-[28px]"
          style={{
            transform: on && !reduced ? "translateX(10px)" : "translateX(0)",
            transition: `transform 560ms ${EASE}`,
          }}
        >
          {item.title}
        </span>

        <span className="flex w-full shrink-0 items-center justify-between gap-6 lg:w-auto lg:justify-end">
          <span className="text-[12px] uppercase tracking-[0.12em] opacity-70 xl:text-[14px]">
            {item.kind} &middot; {item.year}
          </span>
          <span
            style={{
              transform:
                on && !reduced ? "translate(4px, -4px)" : "translate(0, 0)",
              transition: `transform 480ms ${EASE}`,
            }}
          >
            <ArrowUpRight />
          </span>
        </span>
      </span>
    </a>
  );
}

export function FeaturedArticles() {
  return (
    <section className="sec bg-page">
      <div className="frame flex flex-col items-center gap-8 xl:gap-11">
        <h2 className="t-section text-center text-heading">Featured Articles</h2>

        <div className="w-full max-w-[1400px] border-b border-cream/20">
          {articles.map((article) => (
            <Row key={article.title} item={article} />
          ))}
        </div>

        <Link
          href="/work"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold uppercase text-white transition-colors duration-300 hover:bg-cream hover:text-oxblood xl:h-16 xl:text-[18px]"
        >
          View All Published Work
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
