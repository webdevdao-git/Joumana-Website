"use client";

import Link from "next/link";
import { useRef, useState } from "react";
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
 * Each card is a link into its own discipline on the services page, not to
 * the top of it: /services#podcasts opens the podcasts card in the deck there.
 * The reveal still happens on approach, so the card reads the same; the click
 * now goes somewhere useful instead of only pinning the reveal open.
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
  body,
  href,
  index,
}: {
  title: string;
  body: string;
  href: string;
  index: string;
}) {
  const reduced = useReducedMotion();
  const card = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const showing = open;
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
      onPointerEnter={(e) => {
        setOrigin(at(e));
        setOpen(true);
      }}
      onPointerMove={track}
      onPointerLeave={(e) => {
        setOrigin(at(e));
        rest();
      }}
      onFocus={() => {
        setOrigin({ x: 50, y: 50 });
        setOpen(true);
      }}
      onBlur={rest}
      className="relative block h-[228px] w-full overflow-hidden rounded-[24px] bg-card text-left will-change-transform xl:h-[252px]"
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
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-card-heading/45 xl:text-[13px]">
            {index}
          </span>
          <span className="text-card-heading/35">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </span>

        <span className="font-display text-[28px] font-light uppercase leading-[1.04] tracking-[0.01em] text-card-heading xl:text-[38px]">
          {title}
        </span>
      </span>

      {/* what it means, in two beats */}
      <span className="absolute inset-0 flex flex-col justify-center gap-3 p-6 text-white xl:p-8">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65"
          style={{
            opacity: showing ? 1 : 0,
            transform: showing || reduced ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 300ms ease 180ms, transform 600ms ${EASE} 180ms`,
          }}
        >
          {title}
        </span>
        <span
          className="text-[15px] leading-[1.45] xl:text-[17px]"
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
  return (
    <section className="flex min-h-[100svh] items-center bg-page py-14 xl:py-20">
      <div className="frame flex w-full flex-col items-center gap-7 xl:gap-9">
        <div className="flex flex-col items-center gap-4">
          <h2 className="t-section text-center text-heading">Services</h2>
          <p className="max-w-[62ch] text-center text-[15px] leading-[1.5] text-body-soft xl:text-[18px]">
            {servicesPage.hero.lede}
          </p>
        </div>

        <ul className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servicesPage.disciplines.map((d) => (
            <li key={d.label}>
              <ServiceCard
                title={d.label}
                body={d.body[0]}
                href={`/services#${d.slug}`}
                index={d.index}
              />
            </li>
          ))}
        </ul>

        <Link
          href="/services"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:text-[18px]"
        >
          View the Full Offering
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
