"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { servicesPage } from "@/lib/content";

/**
 * Node 45:1319.
 *
 * The mark on each card is its own number, set in the display face over a
 * short rule. It was six drawn icons, a newspaper, a microphone, a pencil and
 * so on, generic enough to belong to any site; the photographs already carry
 * the six on the services page, so this one stays typographic.
 *
 * This grid and the card deck traded pages: it opened the home page and now
 * closes the services page, with the deck on the home page in its place.
 *
 * So the card no longer links into a discipline on another page, because this
 * is that page. The hover already gives you what the discipline is; the click
 * takes you to the one thing left to do about it.
 *
 * It is also where the deck on the home page sends you. Each card there
 * carries a View More that points at /services#branded-content and the like,
 * and a reader who followed one came here to read that description, not to
 * find the card and hover it. So a slug in the address pins that card open on
 * arrival, which is the same thing the hover does, held until you reach for
 * one yourself.
 */


function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-6 w-6 shrink-0 ${className}`}
    >
      <path
        d="M7 17 17 7M8.5 7H17v8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A service card.
 *
 * At rest it is the mark and the discipline. Reach it and the brown ground
 * opens from the exact point the cursor crossed the edge, as a circle growing
 * out of that point rather than a panel sliding up from a fixed side. Leave it
 * and the circle closes back to wherever you left. So the card answers where
 * you actually were, which is what separates an interaction from a transition.
 *
 * Under that the card leans a few degrees toward the cursor, which gives the
 * surface somewhere to be rather than sitting flat, and the copy arrives in
 * two beats: the discipline, then what it means.
 *
 * Touch gets the tap point as the origin, a keyboard gets the centre, and
 * reduced motion gets a plain fade with no lean and no travel.
 */
function ServiceCard({
  title,
  head,
  body,
  href,
  index,
  slug,
  pinned,
  onReach,
}: {
  title: string;
  head: string;
  body: string;
  href: string;
  index: string;
  slug: string;
  pinned: boolean;
  onReach: () => void;
}) {
  const reduced = useReducedMotion();
  const card = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const showing = open || pinned;
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  /** where the pointer is, as a percentage of the card */
  const at = (e: React.PointerEvent | React.MouseEvent) => {
    const box = card.current?.getBoundingClientRect();
    if (!box) return { x: 50, y: 50 };
    return {
      x: ((e.clientX - box.left) / box.width) * 100,
      y: ((e.clientY - box.top) / box.height) * 100,
    };
  };

  const track = (e: React.PointerEvent) => {
    if (reduced) return;
    const p = at(e);
    /* a few degrees only: enough to feel, not enough to notice */
    setLean({ x: (p.x - 50) / 12, y: (50 - p.y) / 16 });
  };

  const rest = () => {
    setOpen(false);
    setLean({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={card}
      href={href}
      id={slug}
      onPointerEnter={(e) => {
        onReach();
        setOrigin(at(e));
        setOpen(true);
      }}
      onPointerMove={track}
      onPointerLeave={(e) => {
        setOrigin(at(e));
        rest();
      }}
      onFocus={() => {
        onReach();
        setOrigin({ x: 50, y: 50 });
        setOpen(true);
      }}
      onBlur={rest}
      className="relative block h-[252px] w-full scroll-mt-[calc(var(--nav-h)+1rem)] overflow-hidden rounded-[24px] bg-card text-left will-change-transform xl:h-[256px]"
      style={{
        transform: reduced
          ? undefined
          : `perspective(900px) rotateY(${lean.x}deg) rotateX(${lean.y}deg) translateZ(0)`,
        boxShadow: showing
          ? "0 28px 60px -34px rgba(72,17,12,0.55)"
          : "0 14px 40px -30px rgba(0,0,0,0.45)",
        transition: `transform 500ms ${EASE}, box-shadow 500ms ease`,
      }}
    >
      {/* the ground, opening from where you crossed the edge */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-brown"
        style={{
          clipPath: reduced
            ? undefined
            : `circle(${showing ? 150 : 0}% at ${origin.x}% ${origin.y}%)`,
          opacity: reduced ? (showing ? 1 : 0) : 1,
          transition: reduced
            ? "opacity 300ms ease"
            : `clip-path 700ms ${EASE}`,
        }}
      />

      {/* the face. The name is the graphic: set large and ranged left, it
          fills the card on its own, which a centred line and a mark above it
          did not. The number is a small label in the corner, where a printed
          page puts it, rather than the thing you look at first. */}
      <span
        className="absolute inset-0 flex flex-col justify-between p-6 xl:p-8"
        style={{
          opacity: showing ? 0 : 1,
          transform: showing && !reduced ? "scale(0.96)" : "scale(1)",
          transition: `opacity 260ms ease, transform 500ms ${EASE}`,
        }}
      >
        <span className="flex items-start justify-between gap-4">
          <span className="text-[12px] font-semibold tracking-[0.2em] text-card-heading/45 xl:text-[13px]">
            {index}
          </span>
          <span className="text-card-heading/35">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </span>

        <span className="flex flex-col gap-2">
          <span className="font-display text-[26px] font-light uppercase leading-[1.04] tracking-[0.01em] text-card-heading xl:text-[34px]">
            {title}
          </span>
          <span className="text-[13px] leading-[1.35] text-card-body-soft xl:text-[15px]">
            {head}
          </span>
        </span>
      </span>

      {/* what it means, in two beats */}
      <span className="absolute inset-0 flex flex-col justify-center gap-3 p-6 text-white xl:p-8">
        <span
          className="text-[11px] font-semibold tracking-[0.18em] text-white/65"
          style={{
            opacity: showing ? 1 : 0,
            transform: showing || reduced ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 300ms ease 180ms, transform 600ms ${EASE} 180ms`,
          }}
        >
          {title}
        </span>
        <span
          className="text-[14px] leading-[1.45] xl:text-[16px]"
          style={{
            opacity: showing ? 1 : 0,
            transform: showing || reduced ? "translateY(0)" : "translateY(18px)",
            transition: `opacity 340ms ease 260ms, transform 640ms ${EASE} 260ms`,
          }}
        >
          {body}
        </span>
      </span>
    </Link>
  );
}

export function Capabilities() {
  /* the slug in the address, held open until the reader reaches for a card */
  const [pinned, setPinned] = useState<string | null>(null);
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const open = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!slug) return;
      const card = grid.current?.querySelector<HTMLElement>(`#${CSS.escape(slug)}`);
      if (!card) return;
      setPinned(slug);
      /* the three across fit a screen, so bring the heading with them; the
         column below lg does not, so bring the card itself */
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      (wide ? card.closest("section") : card)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <section className="flex min-h-[100svh] scroll-mt-[var(--nav-h)] items-center bg-page py-12 xl:py-14">
      <div className="frame flex w-full flex-col items-center gap-7 xl:gap-9">
        <div className="flex flex-col items-center gap-4">
          <h2 className="t-section text-center text-heading">Services</h2>
          <p className="max-w-[76ch] text-center text-[15px] leading-[1.5] text-body-soft xl:text-[17px]">
            {servicesPage.hero.lede}
          </p>
        </div>

        <ul ref={grid} className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servicesPage.disciplines.map((d) => (
            <li key={d.label}>
              <ServiceCard
                title={d.label}
                head={d.head}
                body={d.body[0]}
                href="/contact"
                index={d.index}
                slug={d.slug}
                pinned={pinned === d.slug}
                onReach={() => setPinned(null)}
              />
            </li>
          ))}
        </ul>

        {/* it used to read View the Full Offering and point at this page.
            The work is the next thing worth looking at from here; the contact
            panel directly below already asks for the conversation. */}
        <Link
          href="/work"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:text-[18px]"
        >
          See the Work
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
