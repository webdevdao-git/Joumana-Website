"use client";

import Link from "next/link";
import { useState } from "react";
import { servicesPage } from "@/lib/content";

/**
 * Node 45:1319, as cards that turn over.
 *
 * The face carries the discipline, the back carries what it means. It turns on
 * hover for a pointer, on tap for touch, and on focus for a keyboard, so no one
 * is locked out of the back of the card.
 *
 * The card itself is a button rather than a link. Nesting a link inside it
 * would be invalid, so the one route out of the section is the button at the
 * bottom.
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

function FlipCard({
  title,
  body,
  Icon,
}: {
  title: string;
  body: string;
  Icon: () => React.ReactElement;
}) {
  const [pinned, setPinned] = useState(false);
  const [near, setNear] = useState(false);
  const flipped = pinned || near;

  return (
    <button
      type="button"
      aria-expanded={flipped}
      onClick={() => setPinned((v) => !v)}
      onMouseEnter={() => setNear(true)}
      onMouseLeave={() => setNear(false)}
      onFocus={() => setNear(true)}
      onBlur={() => setNear(false)}
      className="flip-scene h-[228px] w-full xl:h-[252px]"
    >
      <span className="flip-inner block" data-flipped={flipped}>
        {/* face: the mark, then the discipline, then the way in */}
        <span className="flip-face flip-front flex flex-col items-center justify-center gap-4 rounded-[24px] bg-card p-6 text-center shadow-[0_14px_40px_-30px_rgba(0,0,0,0.45)] xl:gap-5 xl:p-8">
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

        {/* back */}
        <span className="flip-face flip-back flex flex-col justify-between rounded-[24px] bg-brown p-6 text-white xl:p-8">
          <span className="text-[15px] leading-[1.45] xl:text-[17px]">{body}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
            {title}
          </span>
        </span>
      </span>
    </button>
  );
}

export function Capabilities() {
  return (
    <section className="sec bg-cream">
      <div className="frame flex flex-col items-center gap-7 xl:gap-10">
        <h2 className="t-section text-center text-card-heading">Services</h2>

        <ul className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servicesPage.disciplines.map((d) => (
            <li key={d.label}>
              <FlipCard title={d.label} body={d.body[0]} Icon={MARKS[d.label] ?? Newspaper} />
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
