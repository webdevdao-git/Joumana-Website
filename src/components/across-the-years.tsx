"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The career, as a timeline you travel down rather than a list you read.
 *
 * The year is the fixed point: it sits in its own column, pinned while its
 * entry passes, and changes over as the next one arrives. So the eye keeps one
 * anchor and the cards move against it, which is what makes four stacked
 * blocks read as a span of years rather than four blocks.
 *
 * Each entry carries its organisation's own mark, set in an oxblood chip
 * because the files are white knockouts and would vanish on the card.
 *
 * Dates and titles are from her LinkedIn record. The entries this replaces had
 * Forbes starting in 2009 rather than 2007, had her still at Arabian Radio
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
    logo: "/brand/logo-forbes.png",
    body: "Running the magazine's video network day to day, assigning and producing multimedia stories, editing copy for Forbes.com and reporting on air.",
    cta: "View Forbes Work",
  },
  {
    year: "2012",
    span: "2012 — 2015",
    org: "Arabian Radio Network",
    role: "Senior Reporter",
    place: "Dubai",
    logo: "/brand/logo-arn.png",
    body: "Reporting across Dubai Eye 103.8, Dubai 92 and Virgin Radio, filing live from events and producing features for Business Breakfast and Drive Live.",
    cta: "View Work",
  },
  {
    year: "2016",
    span: "2016 — 2023",
    org: "Dubai Chamber of Commerce",
    role: "Media & Corporate Communications",
    place: "Dubai",
    logo: "/brand/logo-dubai-chamber.png",
    body: "Developing and running the Chamber's public relations programme, media plans and press activity across the UAE and international markets.",
    cta: "View Work",
  },
  {
    year: "Now",
    span: "2022 — Present",
    org: "Dubai Department of Economy and Tourism",
    role: "Senior Communications Manager",
    place: "Dubai",
    logo: "/brand/logo-dubai-economy-tourism.png",
    body: "Leading public relations and communications strategy across twenty markets in Asia, Africa, Europe, the United States and Latin America.",
    cta: "View Work",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function AcrossTheYears() {
  const reduced = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* the rule fills as the section travels through the viewport */
  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* whichever entry is nearest the middle of the screen owns the big year */
  useEffect(() => {
    const cards = rail.current?.querySelectorAll("[data-entry]");
    if (!cards?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(Number((seen.target as HTMLElement).dataset.entry));
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const current = ROLES[active];

  return (
    <section className="sec bg-page">
      <div className="frame flex flex-col items-center gap-9 xl:gap-14">
        <h2 className="t-section text-center text-heading">Across the Years</h2>

        <div ref={rail} className="relative w-full">
          <div className="lg:grid lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
            {/* ------------------------------------------------ the year */}
            <div className="hidden lg:block">
              <div className="sticky top-[38vh] pb-24">
                <div className="relative h-[120px] xl:h-[150px]">
                  {ROLES.map((r, i) => (
                    <motion.span
                      key={r.year}
                      aria-hidden={i !== active}
                      className="absolute inset-x-0 top-0 block font-display text-[88px] font-light leading-none text-heading xl:text-[116px]"
                      initial={false}
                      animate={
                        i === active
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: reduced ? 0 : -18 }
                      }
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      {r.year}
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  key={current.span}
                  className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-body-soft"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {current.span}
                </motion.p>

                {/* how far down the span you are */}
                <div className="mt-8 flex items-center gap-2">
                  {ROLES.map((r, i) => (
                    <span
                      key={r.year}
                      aria-hidden="true"
                      className={`block h-[3px] rounded-full transition-all duration-500 ${
                        i === active ? "w-9 bg-heading" : "w-4 bg-heading/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------------------------------------- the entries */}
            <div className="relative">
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
                    data-entry={i}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
                    className="relative lg:pl-14"
                  >
                    {/* the marker sitting on the rail */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-9 hidden rounded-full border-2 border-heading bg-page transition-all duration-500 lg:block ${
                        i === active ? "h-[19px] w-[19px] bg-heading" : "h-[15px] w-[15px]"
                      }`}
                      style={i === active ? { left: -2 } : undefined}
                    />

                    <article
                      className={`group rounded-[24px] bg-card p-6 transition-all duration-500 xl:p-9 ${
                        i === active
                          ? "shadow-[0_24px_60px_-34px_rgba(0,0,0,0.6)] lg:-translate-y-0.5"
                          : "lg:opacity-[0.94]"
                      }`}
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* the organisation's own mark */}
                          <span className="flex h-[52px] w-[124px] items-center justify-center rounded-[12px] bg-oxblood px-3 xl:h-[60px] xl:w-[148px]">
                            <span className="relative block h-full w-full">
                              <Image
                                src={r.logo}
                                alt=""
                                fill
                                sizes="148px"
                                className="object-contain"
                              />
                            </span>
                          </span>

                          {/* the year, kept on the card for phones, where the
                              sticky column is not shown */}
                          <span className="font-display text-[34px] font-light leading-none text-card-heading lg:hidden">
                            {r.year}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-[24px] font-semibold uppercase leading-[1.09] text-card-heading xl:text-[34px]">
                            {r.org}
                          </h3>
                          <p className="mt-2 text-[14px] font-bold uppercase leading-[1.2] text-card-heading xl:text-[18px]">
                            {r.role} &middot; {r.place}
                          </p>
                          <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-card-body-soft lg:hidden">
                            {r.span}
                          </p>
                        </div>

                        <p className="max-w-2xl text-[16px] leading-[1.45] text-card-body xl:text-[18px]">
                          {r.body}
                        </p>

                        <div>
                          <Link
                            href="/work"
                            className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-brown px-6 text-[13px] font-semibold uppercase text-white transition-colors duration-300 hover:bg-oxblood xl:h-12 xl:px-7 xl:text-[15px]"
                          >
                            {r.cta}
                            <span
                              aria-hidden="true"
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            >
                              &rarr;
                            </span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
