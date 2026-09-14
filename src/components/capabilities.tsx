"use client";

import Link from "next/link";
import { useState } from "react";

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
const CAPABILITIES = [
  {
    title: "Journalism & Editorial",
    body: "Research-driven journalism, editorial content and storytelling across business, finance, technology and current affairs.",
  },
  {
    title: "Presenting & Moderation",
    body: "Professional presenting, panel moderation and event hosting for corporate, media and high-profile industry events.",
  },
  {
    title: "Content Strategy & Writing",
    body: "Strategic content creation across digital, editorial and corporate channels, tailored to brands, audiences and objectives.",
  },
  {
    title: "PR & Communications",
    body: "Strategic communications support spanning media relations, messaging, press materials and brand communication initiatives.",
  },
  {
    title: "Corporate Content",
    body: "Thought leadership, reports, speeches, newsletters and branded content designed to communicate ideas with clarity and impact.",
  },
  {
    title: "Media & Events",
    body: "Experienced on-camera, on-air and live-event communication for organisations seeking an informed and engaging media presence.",
  },
] as const;

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
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

function FlipCard({ title, body }: { title: string; body: string }) {
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
      className="flip-scene h-[230px] w-full xl:h-[270px]"
    >
      <span className="flip-inner block" data-flipped={flipped}>
        {/* face: the discipline, centred, nothing else */}
        <span className="flip-face flip-front flex flex-col items-center justify-center gap-4 rounded-[24px] bg-card p-6 text-center xl:p-8">
          <span className="font-display text-[22px] font-semibold uppercase leading-tight text-card-heading xl:text-[28px]">
            {title}
          </span>
          <span className="text-card-heading/70">
            <ArrowUpRight />
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
    <section className="sec bg-page">
      <div className="frame flex flex-col items-center gap-7 xl:gap-10">
        <h2 className="t-section text-center text-heading">Capabilities</h2>

        <ul className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <li key={cap.title}>
              <FlipCard {...cap} />
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
