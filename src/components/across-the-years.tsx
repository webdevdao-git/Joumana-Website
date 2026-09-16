"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Node 46:1739, rebuilt as a timeline.
 *
 * The three cards in the design all carried the same portrait, which read as a
 * repeat rather than a record. The years do the work instead: a rule runs down
 * the entries and draws itself as the section passes, with each entry arriving
 * in turn.
 *
 * Dates and titles are from her LinkedIn record. The entries this replaces
 * had Forbes starting in 2009 rather than 2007, had her still at Arabian Radio
 * Network, and had her present role as a contributor at Dubai Chamber, which
 * she left in January 2023.
 */
const ROLES = [
  {
    year: "2007",
    span: "2007 — 2010",
    org: "Forbes",
    role: "Producer",
    place: "New York",
    body: "Running the magazine's video network day to day, assigning and producing multimedia stories, editing copy for Forbes.com and reporting on air.",
    cta: "View Forbes Work",
  },
  {
    year: "2012",
    span: "2012 — 2015",
    org: "Arabian Radio Network",
    role: "Senior Reporter",
    place: "Dubai",
    body: "Reporting across Dubai Eye 103.8, Dubai 92 and Virgin Radio, filing live from events and producing features for Business Breakfast and Drive Live.",
    cta: "View Work",
  },
  {
    year: "2016",
    span: "2016 — 2023",
    org: "Dubai Chamber of Commerce",
    role: "Media & Corporate Communications",
    place: "Dubai",
    body: "Developing and running the Chamber's public relations programme, media plans and press activity across the UAE and international markets.",
    cta: "View Work",
  },
  {
    year: "Now",
    span: "2022 — Present",
    org: "Dubai Department of Economy and Tourism",
    role: "Senior Communications Manager",
    place: "Dubai",
    body: "Leading public relations and communications strategy across twenty markets in Asia, Africa, Europe, the United States and Latin America.",
    cta: "View Work",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function AcrossTheYears() {
  const reduced = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);

  // the rule fills as the section travels through the viewport
  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="sec bg-page">
      <div className="frame flex flex-col items-center gap-9 xl:gap-14">
        <h2 className="t-section text-center text-heading">Across the Years</h2>

        <div ref={rail} className="relative w-full">
          {/* the rail, and the line that draws down it */}
          <div className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-heading/20 lg:block">
            {!reduced && (
              <motion.span
                className="absolute inset-x-0 top-0 block bg-heading"
                style={{ height: fill }}
              />
            )}
          </div>

          <ol className="flex flex-col gap-4">
            {ROLES.map((r, i) => (
              <motion.li
                key={r.org}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="relative lg:pl-16"
              >
                {/* the marker sitting on the rail */}
                <motion.span
                  aria-hidden="true"
                  initial={reduced ? { scale: 1 } : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.2, ease: EASE }}
                  className="absolute left-0 top-8 hidden h-[15px] w-[15px] rounded-full border-2 border-heading bg-page lg:block"
                />

                <article className="group rounded-[24px] bg-card p-6 transition-shadow duration-500 hover:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] xl:p-9">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                    {/* the year, set as the display element */}
                    <div className="shrink-0 lg:w-[180px]">
                      <span className="block font-display text-[44px] font-light leading-none text-card-heading xl:text-[72px]">
                        {r.year}
                      </span>
                      <span className="mt-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-card-body-soft xl:text-[13px]">
                        {r.span}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-4">
                      <div>
                        <h3 className="font-display text-[26px] font-semibold uppercase leading-[1.09] text-card-heading xl:text-[38px]">
                          {r.org}
                        </h3>
                        <p className="mt-2 text-[15px] font-bold uppercase leading-[1.2] text-card-heading xl:text-[20px]">
                          {r.role} &middot; {r.place}
                        </p>
                      </div>

                      <p className="max-w-2xl text-[16px] leading-[1.4] text-card-body xl:text-[19px]">
                        {r.body}
                      </p>

                      <div>
                        <Link
                          href="/work"
                          className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-brown px-6 text-[13px] font-semibold uppercase text-white transition-all duration-300 hover:opacity-90 xl:h-12 xl:px-7 xl:text-[15px]"
                        >
                          {r.cta}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>

        <Link
          href="/work"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-brown px-7 text-[14px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-90 xl:h-14 xl:px-8 xl:text-[16px]"
        >
          Explore the Full Journey
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
