"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The six disciplines, as a deck.
 *
 * They used to be six pinned full screen sections: six screens of scrolling to
 * read six offers, each one a wall of text with a picture beside it. The
 * pictures were the best thing in it and they were the thing you saw least of.
 *
 * So the six are a row of cards now, and the row is the whole picture. One
 * card is open and the other five stand as slats beside it, each holding its
 * own photograph with the name set up the spine. Move across them and the row
 * opens and closes like a fan: the whole section is one screen, and every
 * photograph is on it at once.
 *
 * What makes it read as film rather than as a set of tabs:
 *
 *   the cards share the width rather than sliding, so opening one closes the
 *     others in the same movement, on one long ease
 *   the open card's wash clears off the photograph while the picture settles
 *     back from an overscale, which is the move the rest of the site uses
 *   the copy arrives in beats behind it, name, then line, then the chips,
 *     so the card fills rather than appears
 *   a slat lifts slightly under the pointer before it is even opened
 *
 * The card carries a caption, not a page: the name, the line under it, the
 * chips and the way out. CONFIRM: the descriptive paragraph each discipline
 * used to show is no longer rendered anywhere. It is still in content.ts under
 * `body`, so it can come back here or go on a page of its own.
 *
 * The copy sits in a fixed width box inside the card, so it does not reflow
 * while the card is growing around it. Text that rewraps mid animation is the
 * thing that makes this pattern look cheap.
 *
 * Pointer opens, click pins, keyboard opens on focus, Enter and Space pin and
 * the arrow keys walk the row. Arriving on /services#podcasts opens that one
 * and brings the whole row up, rather than the browser dropping the card at
 * the top of the window with the heading left above it. Under prefers-reduced-motion nothing moves: the cards take equal
 * widths as a plain grid and every open card shows its copy outright.
 */
export type Deck = {
  label: string;
  index: string;
  head: string;
  body: readonly string[];
  includes: readonly string[];
  cta: string;
  slug: string;
  image: string;
  alt: string;
  /** which side of the card the copy takes, so it never lands on her */
  copySide?: "left" | "right";
};

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

export function DisciplinesDeck({ items }: { items: readonly Deck[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* The home page links into a single discipline, /services#podcasts. Open
     that one and bring the row to the top, rather than letting the browser
     jump the card itself to the top of the window and leave the heading
     above the fold. */
  useEffect(() => {
    const open = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!slug) return;
      const i = items.findIndex((d) => d.slug === slug);
      if (i < 0) return;
      setActive(i);
      setHovered(null);
      /* the row only exists from lg. Below it the six are a column, so the
         card itself is what you want brought up, not the top of the section */
      const deck = window.matchMedia("(min-width: 1024px)").matches;
      const target = deck
        ? row.current?.closest("section")
        : row.current?.querySelectorAll<HTMLElement>("[data-card]")[i];
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [items]);

  const open = hovered ?? active;

  /* a slat should not open on a pointer that is only passing over it */
  const reach = useCallback((i: number) => {
    if (hold.current) clearTimeout(hold.current);
    hold.current = setTimeout(() => setHovered(i), 90);
  }, []);

  const release = useCallback(() => {
    if (hold.current) clearTimeout(hold.current);
    hold.current = setTimeout(() => setHovered(null), 140);
  }, []);

  useEffect(() => () => {
    if (hold.current) clearTimeout(hold.current);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + items.length) % items.length;
    setActive(next);
    row.current
      ?.querySelectorAll<HTMLElement>("[data-card]")
      [next]?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-page py-12 lg:flex lg:min-h-[100svh] lg:items-center lg:py-0">
      <div className="frame w-full">
        <div className="flex flex-col gap-6 lg:gap-[1.6vw]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="s-title text-white">What I Do Best</h2>
            <p className="s-card-meta text-white/65">
              {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          </div>

          {/* the deck. Below lg it is a plain column of cards; from lg the six
              share the width and one of them holds most of it. */}
          <div
            ref={row}
            role="tablist"
            aria-label="Disciplines"
            onKeyDown={onKey}
            className="flex flex-col gap-3 lg:h-[min(74svh,740px)] lg:flex-row lg:gap-[0.58vw]"
          >
            {items.map((d, i) => {
              const isOpen = i === open;
              const right = d.copySide === "right";
              // a div rather than a button: the card holds the call to
              // action, and a link inside a button is invalid HTML. The role
              // and the handlers give it the same behaviour.
              return (
                <div
                  key={d.index}
                  id={d.slug}
                  data-card
                  role="tab"
                  tabIndex={0}
                  aria-selected={isOpen}
                  aria-label={d.label}
                  onPointerEnter={() => !reduced && reach(i)}
                  onPointerLeave={() => !reduced && release()}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                      setHovered(null);
                    }
                  }}
                  onClick={() => {
                    setActive(i);
                    setHovered(null);
                  }}
                  className="dk-card group block w-full shrink-0 overflow-hidden rounded-[20px] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70 min-h-[440px] sm:min-h-[400px] lg:min-h-0 lg:h-full lg:w-auto lg:min-w-0"
                  style={
                    {
                      "--grow": reduced ? 1 : isOpen ? 7.4 : 1,
                      "--pscale": isOpen ? 1 : 1.14,
                      "--shown": isOpen ? 1 : 0,
                      "--copy-in": isOpen ? "140ms" : "0ms",
                      "--spine": isOpen ? 0 : 1,
                      "--spine-ms": isOpen ? "200ms" : "520ms",
                      "--spine-in": isOpen ? "0ms" : "260ms",
                      "--wash": isOpen
                        ? `linear-gradient(${right ? 260 : 100}deg, rgba(20,5,4,0.93) 0%, rgba(20,5,4,0.84) 26%, rgba(20,5,4,0.4) 52%, rgba(20,5,4,0.06) 100%)`
                        : "linear-gradient(180deg, rgba(20,5,4,0.55) 0%, rgba(20,5,4,0.8) 100%)",
                    } as React.CSSProperties
                  }
                >
                  {/* the photograph, settling back from an overscale as it opens */}
                  <span className="absolute inset-0 block overflow-hidden">
                    <Image
                      src={d.image}
                      alt={d.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="dk-photo object-cover"
                    />
                  </span>

                  {/* the wash: heavy over a slat so the spine reads, clearing
                      to a floor under the copy once the card is open */}
                  <span
                    aria-hidden="true"
                    className="dk-wash absolute inset-0 bg-[linear-gradient(180deg,rgba(20,5,4,0.25)_0%,rgba(20,5,4,0.55)_45%,rgba(20,5,4,0.92)_100%)]"
                  />

                  {/* the number, in the same corner whatever the card is doing */}
                  <span className="dk-chip absolute left-5 top-5 z-10 text-white/55 lg:left-[1.1vw] lg:top-[1.1vw]">
                    {d.index}
                  </span>

                  {/* the spine: the name up the side of a closed slat */}
                  <span
                    aria-hidden="true"
                    className="dk-spine-wrap absolute inset-x-0 bottom-5 z-10 hidden justify-center lg:flex lg:bottom-[1.4vw]"
                  >
                    <span
                      className="dk-spine whitespace-nowrap text-white"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {d.label}
                    </span>
                  </span>

                  {/* the copy, in a fixed box so it cannot rewrap while the
                      card is still growing around it */}
                  <span
                    className="dk-copy relative z-10 flex flex-col justify-end p-5 lg:h-full lg:p-[1.6vw]"
                  >
                    <span
                      className={`block w-full lg:w-[min(27vw,400px)] ${right ? "lg:ml-auto" : ""}`}
                    >
                      {[
                        <span key="label" className="dk-label block text-white">
                          {d.label}
                        </span>,
                        <span key="head" className="dk-head mt-2 block text-white/80 lg:mt-[0.6vw]">
                          {d.head}
                        </span>,
                        <span key="chips" className="mt-4 flex flex-wrap gap-1.5 lg:mt-[1vw]">
                          {d.includes.map((chip) => (
                            <span
                              key={chip}
                              className="dk-chip rounded-full border border-white/30 px-2.5 py-1.5 text-white/80"
                            >
                              {chip}
                            </span>
                          ))}
                        </span>,
                        <span key="cta" className="mt-4 block lg:mt-[1vw]">
                          <Link
                            href="/contact"
                            tabIndex={isOpen ? 0 : -1}
                            onClick={(e) => e.stopPropagation()}
                            className="dk-cta group/pill inline-flex h-[40px] items-center gap-2.5 rounded-full bg-white px-5 text-oxblood transition-opacity duration-300 hover:opacity-90 lg:h-[2.4vw] lg:px-[1.2vw]"
                          >
                            {d.cta}
                            <ArrowRight />
                          </Link>
                        </span>,
                      ].map((node, beat) => (
                        <span
                          key={node.key}
                          className="dk-beat block"
                          style={
                            {
                              "--beat-y": isOpen ? "0px" : "16px",
                              "--beat-in": `${240 + beat * 90}ms`,
                            } as React.CSSProperties
                          }
                        >
                          {node}
                        </span>
                      ))}
                    </span>
                  </span>

                  {/* a slat lifts under the pointer before it is opened */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/0 transition-[box-shadow,--tw-ring-color] duration-500 group-hover:ring-white/20"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
