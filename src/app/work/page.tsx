import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { PublishedReels } from "@/components/published-reels";
import { OutletBand } from "@/components/outlet-band";
import { Reveal } from "@/components/reveal";
import { BreadcrumbSchema } from "@/components/schema";
import { workPage } from "@/lib/content";

/**
 * Node 125:2921, built from the file.
 *
 * Every size and position below is the design's own, read through the Figma
 * API and written as a share of the 1728 frame it was drawn on. The type scale
 * is the same .s-* set the services page uses.
 *
 * One block in the design is deliberately not built: a frame titled "01 The
 * Executive Practice", set in Poppins where the rest of the page is IvyPresto
 * and Oakes Grotesk, carrying copy about CEOs, CMOs and agency relationships.
 * It overlaps the sections around it on both this page and services, and it
 * belongs to another brand. CONFIRM before adding it.
 */
export const metadata: Metadata = {
  title: { absolute: "Selected Work | Journalism, Communications and Broadcast" },
  description:
    "Selected work across strategic communications, editorial, branded content and broadcast, from international media engagements to published journalism.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected Work | Joumana Saad",
    description:
      "International media and communications, PR, business journalism and the people behind the headlines.",
    url: "/work",
    images: [{ url: "/brand/work-hero.webp", width: 544, height: 816, alt: "Joumana Saad at work in Dubai" }],
  },
};

function ArrowCircle() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-oxblood text-cream">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v14M12 19l-6-6M12 19l6-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-6 w-6 shrink-0 ${className}`}
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

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

export default function WorkPage() {
  const { hero, highlights, articles, people, published } = workPage;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "The Work", href: "/work" }]} />

      {/* ------------------------------------------------------------ hero
          1728 x 981 on the light ground. A 377 x 408 plate centred at the top,
          the title at 140px in oxblood, the lede under it, and a circled
          arrow pointing into the page. */}
      <section className="bg-cream">
        <div
          className="fit-frame flex max-w-[1728px] flex-col items-center px-6 py-12 lg:justify-center lg:px-0 lg:py-0"
          style={{ "--fit-w": 1728, "--fit-h": 981 } as React.CSSProperties}
        >
          <div className="relative aspect-[377/408] w-[52%] max-w-[240px] lg:w-[21.8%] lg:max-w-none">
            <Image
              src="/brand/work-hero.webp"
              alt="Joumana Saad at work in Dubai"
              fill
              priority
              sizes="(max-width: 1024px) 52vw, 22vw"
              className="object-cover"
            />
          </div>

          <h1 className="mt-6 text-center font-display work-title text-[clamp(2.5rem,8.1vw,8.75rem)] font-light uppercase leading-[1.19] tracking-[0.02em] text-oxblood lg:mt-[1.7cqw]">
            {hero.title}
          </h1>

          <p className="s-body mt-4 max-w-[46ch] text-center text-card-body lg:mt-[1.3cqw] lg:max-w-[57.3%]">
            {hero.lede}
          </p>

          <span
            aria-hidden="true"
            className="mt-8 flex h-12 w-8 items-center justify-center rounded-full border border-oxblood/30 text-oxblood lg:mt-[2.4cqw] lg:h-[3.65cqw] lg:w-[2.4cqw]"
          >
            <svg width="16" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M12 19l-6-6M12 19l6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </section>

      {/* the logo row the design calls As seen with, which is the band the
          home page already runs */}
      {/* the same band the home page runs, at the same size and with the
          same heading */}
      <OutletBand />

      {/* ------------------------------------------------------ highlights
          Label row at y100 with the pill at the right, then a two by two grid
          of 772 x 655 cards on white at six percent. Each card holds a 724 x
          380 plate, a title, a paragraph, a rule and the organisation. */}
      <section className="bg-cream py-12 xl:py-[5.79vw]">
        <div className="mx-auto w-full max-w-[1658px] px-6 md:px-10 xl:px-20">
          <Reveal className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="s-title text-card-heading">{highlights.heading}</h2>
            <Link
              href="/contact"
              className="s-button inline-flex h-[52px] items-center gap-3 rounded-[32px] bg-brown px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:px-8"
            >
              {highlights.cta}
              <ArrowRight />
            </Link>
          </Reveal>

          <ul className="mt-8 grid gap-6 lg:grid-cols-2 xl:mt-[5.79vw] xl:gap-[1.39vw]">
            {highlights.cards.map((card, i) => (
              <Reveal as="li" key={card.title} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col bg-card p-5 xl:p-[1.39vw]">
                  <div className="relative aspect-[724/380] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="s-card-title mt-6 text-card-heading xl:mt-[1.39vw]">
                    {card.title}
                  </h3>

                  <p className="s-card-body mt-4 text-card-body xl:mt-[1.39vw]">
                    {card.body}
                  </p>

                  <span
                    aria-hidden="true"
                    className="mt-auto block h-px w-full bg-rule pt-0 xl:mt-[1.85vw]"
                  />

                  <div className="mt-5 flex items-center justify-between gap-4 xl:mt-[1.39vw]">
                    <span className="s-card-meta text-card-body-soft">{card.org}</span>
                    <ArrowCircle />
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------- featured articles
          Heading at the gutter, then six 1259 x 280 rows centred on the page,
          each a 253 x 232 plate beside the outlet, the headline and the kind. */}
      <section className="bg-page py-12 xl:py-[5.79vw]">
        <div className="frame">
          <Reveal>
            <h2 className="s-title text-white">{articles.heading}</h2>
          </Reveal>

          <ul className="mx-auto mt-8 flex w-full max-w-[1259px] flex-col gap-6 xl:mt-[5.79vw] xl:gap-[1.39vw]">
            {articles.items.map((item, i) => (
              <Reveal as="li" key={`${item.outlet}-${item.title}`} delay={(i % 3) * 0.05}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-stretch gap-5 bg-white/[0.04] p-5 transition-colors duration-300 hover:bg-white/[0.08] lg:aspect-[1259/280] xl:gap-[1.99%] xl:p-[1.9%]"
                >
                  <span className="relative block w-[26%] shrink-0 self-stretch overflow-hidden sm:w-[20%] xl:w-[20.1%]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="253px"
                      className="object-cover"
                    />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-start justify-between gap-4 text-white">
                      <span className="s-outlet">{item.outlet}</span>
                      <ArrowUpRight />
                    </span>

                    <span className="s-card-title mt-auto pt-6 text-white">
                      {item.title}
                    </span>

                    <span className="s-card-meta mt-3 text-white">{item.meta}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- people
          A six by three grid of 251 x 245 tiles on white. Eight carry a face
          with the name across its foot; the rest are the outlined empties the
          design leaves between them. The copy runs under the grid with the
          button opposite it.

          The empties hold their cells and draw nothing. Outlining them, which
          is what this did first, turns the space between the faces into a set
          of empty boxes; the design leaves it as space. On a phone they are
          dropped altogether, since at two columns a gap in the run reads as a
          picture that failed to load. */}
      <section className="bg-cream py-12 lg:py-0">
        <div
          className="fit-frame mx-auto flex max-w-[1728px] flex-col justify-center px-6 md:px-10 lg:px-[4.63cqw] lg:py-[3.2cqw]"
          style={{ "--fit-w": 1728, "--fit-h": 1164, "--fit-reserve": "0px" } as React.CSSProperties}
        >
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-[0.69cqw]">
            {people.grid.flat().map((slug, i) => (
              <li
                key={i}
                className={`relative aspect-[251/245] rounded-[12px] ${
                  slug
                    ? "overflow-hidden shadow-[0_10px_28px_-18px_rgba(72,17,12,0.45)]"
                    : "hidden lg:block"
                }`}
              >
                {slug ? (
                  <>
                    <Image
                      src={`/people/${slug}.webp`}
                      alt={people.names[slug]}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                      className="object-cover"
                    />
                    {/* the name is set on the picture, so it needs a floor */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                    />
                    <span className="s-card-meta absolute bottom-0 left-0 right-0 px-3 pb-3 font-medium text-white lg:px-[0.93cqw] lg:pb-[0.93cqw]">
                      {people.names[slug]}
                    </span>
                  </>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8 lg:mt-[2.6cqw]">
            <div className="max-w-[52ch] xl:max-w-[41%]">
              <h2 className="s-people-head text-oxblood">
                <span className="block">{people.heading[0]}</span>
                <span className="block">
                  {people.heading[1]}{" "}
                  <span className="font-semibold">{people.headingAccent}</span>
                </span>
              </h2>

              <p className="s-body mt-5 text-card-body lg:mt-[1.39cqw]">
                {people.lede}
              </p>
            </div>

            <Link
              href={people.cta.href}
              className="s-button fit-pill inline-flex h-[52px] items-center gap-3 rounded-[32px] bg-brown px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:px-8"
            >
              {people.cta.label}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- published work
          The design draws five 294 x 465 plates in a row with no captions.
          They carry her own reels now; PublishedReels has the reasoning. */}
      <PublishedReels heading={published.heading} />

      <ContactPanel page="work" />
    </>
  );
}
