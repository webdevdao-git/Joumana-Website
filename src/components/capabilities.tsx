"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { servicesPage } from "@/lib/content";

/**
 * Node 45:1319.
 *
 * The card is a button rather than a link. Nesting a link inside it would be
 * invalid, so the one route out of the section is the button at the bottom.
 */


/* ------------------------------------------------------------------ icons
   One mark per discipline, drawn on the same 24 grid with the same 1.5 stroke
   as the arrow below, so the six read as a set rather than six borrowed
   glyphs. Line work only: a filled icon would fight the light card. */
const ICON_PROPS = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function Newspaper() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v13H6a2 2 0 0 1-2-2V6Z" />
      <path d="M17 10h2a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2" />
      <path d="M7 9h7M7 12h7M7 15h4" />
    </svg>
  );
}

function Microphone() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21M9 21h6" />
    </svg>
  );
}

function Pencil() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 20h16" />
      <path d="M14.5 4.5 17.5 7.5 9 16l-4 1 1-4 8.5-8.5Z" />
    </svg>
  );
}

function Megaphone() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 11.5v1.5a1 1 0 0 0 1 1h2l6 3.5v-12L6 10H4a1 1 0 0 0-1 1.5Z" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
      <path d="M18.5 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  );
}

function Headphones() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13.5" width="4.5" height="7" rx="2.25" />
      <rect x="17" y="13.5" width="4.5" height="7" rx="2.25" />
    </svg>
  );
}

function Broadcast() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="8" width="12" height="9" rx="2" />
      <path d="m15 12 5-3v8l-5-3" />
      <path d="M6 5.5h.01M9 5.5h.01" />
    </svg>
  );
}

/**
 * The six the services page carries, drawn from the same data so the two can
 * never drift apart. The face shows the discipline and its mark; the back
 * shows the opening line of that discipline, which is the shortest true
 * description of it in the file.
 */
const MARKS: Record<string, () => React.ReactElement> = {
  "Branded Content": Pencil,
  "Presenting & Moderation": Microphone,
  Editorial: Newspaper,
  Podcasts: Headphones,
  "Media Training": Broadcast,
  "PR & Corporate Communications": Megaphone,
};

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
  Icon,
}: {
  title: string;
  body: string;
  Icon: () => React.ReactElement;
}) {
  const reduced = useReducedMotion();
  const card = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
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
    <button
      ref={card}
      type="button"
      aria-expanded={showing}
      onPointerEnter={(e) => {
        setOrigin(at(e));
        setOpen(true);
      }}
      onPointerMove={track}
      onPointerLeave={(e) => {
        setOrigin(at(e));
        rest();
      }}
      onClick={(e) => {
        setOrigin(at(e));
        setPinned((v) => !v);
      }}
      onFocus={() => {
        setOrigin({ x: 50, y: 50 });
        setOpen(true);
      }}
      onBlur={rest}
      className="relative h-[228px] w-full overflow-hidden rounded-[24px] bg-card text-left will-change-transform xl:h-[252px]"
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

      {/* the face */}
      <span
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center xl:gap-5 xl:p-8"
        style={{
          opacity: showing ? 0 : 1,
          transform: showing && !reduced ? "scale(0.96)" : "scale(1)",
          transition: `opacity 260ms ease, transform 500ms ${EASE}`,
        }}
      >
        <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-oxblood/[0.07] text-card-heading ring-1 ring-oxblood/10">
          <Icon />
        </span>

        <span className="font-display text-[21px] font-semibold uppercase leading-tight text-card-heading xl:text-[26px]">
          {title}
        </span>

        <span className="text-card-heading/45">
          <ArrowUpRight className="h-5 w-5" />
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
    </button>
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
                Icon={MARKS[d.label] ?? Newspaper}
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
