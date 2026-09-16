"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The career, as a timeline you travel down rather than a list you read.
 *
 * It runs backwards, from the desk she is at now to the newsroom she started
 * in. What she does today is the thing a visitor came to find out; the route
 * she took to get there is the supporting argument, and an argument goes after
 * its claim.
 *
 * The year is the fixed point: it sits in its own column, pinned while its
 * entry passes, and changes over as the next one arrives. So the eye keeps one
 * anchor and the cards move against it, which is what makes four stacked
 * blocks read as a span of years rather than four blocks.
 *
 * Each entry carries its organisation's own mark, set in an oxblood panel on
 * the right of the card, which is where the card had room going spare. The
 * files are white knockouts, so they need a dark ground or they vanish.
 *
 * Dates and titles are from her LinkedIn record. The entries this replaces had
 * Forbes starting in 2009 rather than 2007, had her still at Arabian Radio
 * Network, and had her present role as a contributor at Dubai Chamber, which
 * she left in January 2023.
 */
const ROLES = [
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
    year: "2007",
    span: "2007 — 2010",
    org: "Forbes",
    role: "Producer",
    place: "New York",
    logo: "/brand/logo-forbes.png",
    body: "Running the magazine's video network day to day, assigning and producing multimedia stories, editing copy for Forbes.com and reporting on air.",
    cta: "View Forbes Work",
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

  /**
   * Which entry owns the big year.
   *
   * An IntersectionObserver was watching a narrow band across the middle of
   * the screen, and the cards are shorter than that band is tall: two of them
   * would qualify at once, the winner decided on a ratio that flips as you
   * scroll, and sometimes none qualified at all and the year stuck.
   *
   * Measuring is not ambiguous. On every frame that scroll produces, take the
   * card whose centre is nearest a fixed line at 45 percent of the viewport.
   * One card always wins and the answer only ever moves by one.
   */
  useEffect(() => {
    const host = rail.current;
    if (!host) return;

    let frame = 0;
    const pick = () => {
      frame = 0;
      const cards = host.querySelectorAll<HTMLElement>("[data-entry]");
      if (!cards.length) return;

      const line = window.innerHeight * 0.45;
      let best = 0;
      let bestGap = Infinity;

      cards.forEach((card) => {
        const box = card.getBoundingClientRect();
        const gap = Math.abs(box.top + box.height / 2 - line);
        if (gap < bestGap) {
          bestGap = gap;
          best = Number(card.dataset.entry);
        }
      });

      setActive((was) => (was === best ? was : best));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = ROLES[active];

  return (
    <section className="bg-cream py-10 xl:py-14">
      <div className="frame flex flex-col items-center gap-7 xl:gap-10">
        <h2 className="t-section text-center text-card-heading">Across the Years</h2>

        <div ref={rail} className="relative w-full">
          <div className="lg:grid lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12">
            {/* ------------------------------------------------ the year */}
            <div className="hidden lg:block">
              <div className="sticky top-[38vh] pb-24">
                <div className="relative h-[92px] xl:h-[118px]">
                  {ROLES.map((r, i) => (
                    <motion.span
                      key={r.year}
                      aria-hidden={i !== active}
                      className="absolute inset-x-0 top-0 block font-display text-[68px] font-light leading-none text-card-heading xl:text-[92px]"
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
                  className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-card-body-soft"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {current.span}
                </motion.p>

                {/* how far down the span you are */}
                <div className="mt-6 flex items-center gap-2">
                  {ROLES.map((r, i) => (
                    <span
                      key={r.year}
                      aria-hidden="true"
                      className={`block h-[3px] rounded-full transition-all duration-500 ${
                        i === active ? "w-9 bg-card-heading" : "w-4 bg-card-heading/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------------------------------------- the entries */}
            <div className="relative">
              {/* the rail, and the line that draws down it */}
              <div className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-card-heading/20 lg:block">
                {!reduced && (
                  <motion.span
                    className="absolute inset-x-0 top-0 block bg-card-heading"
                    style={{ height: fill }}
                  />
                )}
              </div>

              <ol className="flex flex-col gap-3">
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
                      className={`absolute left-0 top-7 hidden rounded-full border-2 border-card-heading bg-cream transition-all duration-500 lg:block ${
                        i === active ? "h-[19px] w-[19px] bg-card-heading" : "h-[15px] w-[15px]"
                      }`}
                      style={i === active ? { left: -2 } : undefined}
                    />

                    <article
                      className={`group rounded-[24px] bg-card p-5 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.45)] transition-all duration-500 xl:p-7 ${
                        i === active
                          ? "shadow-[0_24px_60px_-34px_rgba(0,0,0,0.6)] lg:-translate-y-0.5"
                          : "lg:opacity-[0.94]"
                      }`}
                    >
                      <div className="flex items-center gap-8">
                        <div className="flex min-w-0 flex-1 flex-col gap-4">
                          {/* on a phone there is no pinned column, so the year
                              and the mark ride at the top of the card instead */}
                          <div className="flex items-center justify-between gap-4 lg:hidden">
                            <span className="flex h-[40px] w-[96px] shrink-0 items-center justify-center rounded-[10px] bg-oxblood px-2.5">
                              <span className="relative block h-full w-full">
                                <Image
                                  src={r.logo}
                                  alt=""
                                  fill
                                  sizes="96px"
                                  className="object-contain"
                                />
                              </span>
                            </span>
                            <div className="text-right">
                              <span className="block font-display text-[26px] font-light leading-none text-card-heading">
                                {r.year}
                              </span>
                              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-card-body-soft">
                                {r.span}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-display text-[21px] font-semibold uppercase leading-[1.09] text-card-heading xl:text-[28px]">
                              {r.org}
                            </h3>
                            <p className="mt-1.5 text-[13px] font-bold uppercase leading-[1.2] text-card-heading xl:text-[16px]">
                              {r.role} &middot; {r.place}
                            </p>
                          </div>

                          <p className="max-w-2xl text-[15px] leading-[1.45] text-card-body xl:text-[17px]">
                            {r.body}
                          </p>

                          <div>
                            <Link
                              href="/work"
                              className="inline-flex h-10 items-center justify-center gap-2.5 rounded-full bg-brown px-5 text-[12px] font-semibold uppercase text-white transition-colors duration-300 hover:bg-oxblood xl:h-11 xl:px-6 xl:text-[14px]"
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

                        {/* the mark, in the room the card was leaving empty */}
                        <span className="hidden h-[92px] w-[210px] shrink-0 items-center justify-center rounded-[16px] bg-oxblood px-6 transition-transform duration-500 group-hover:scale-[1.03] lg:flex xl:h-[104px] xl:w-[240px]">
                          <span className="relative block h-full w-full">
                            <Image
                              src={r.logo}
                              alt=""
                              fill
                              sizes="240px"
                              className="object-contain"
                            />
                          </span>
                        </span>
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
