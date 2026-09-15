import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";
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
    "Selected work by Joumana Saad across strategic communications, editorial, media, branded content and broadcasting, from international media engagements to published journalism and on-camera work.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected Work | Joumana Saad",
    description:
      "International media and communications, PR, business journalism and the people behind the headlines.",
    url: "/work",
    images: [{ url: "/brand/work-hero.webp", width: 544, height: 816, alt: "Joumana Saad at work in Dubai" }],
  },
};

const PLATE = "/brand/services-columns.webp";

function ArrowCircle() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-oxblood">
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
      <section className="bg-card">
        <div className="mx-auto flex w-full max-w-[1728px] flex-col items-center px-6 py-12 lg:aspect-[1728/981] lg:justify-center lg:px-0 lg:py-0">
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

          <h1 className="mt-6 text-center font-display text-[clamp(2.5rem,8.1vw,8.75rem)] font-light uppercase leading-[1.19] tracking-[0.02em] text-oxblood lg:mt-[1.7vw]">
            {hero.title}
          </h1>

          <p className="s-body mt-4 max-w-[46ch] text-center text-card-body lg:mt-[1.3vw] lg:max-w-[57.3%]">
            {hero.lede}
          </p>

          <span
            aria-hidden="true"
            className="mt-8 flex h-12 w-8 items-center justify-center rounded-full border border-oxblood/30 text-oxblood lg:mt-[2.4vw] lg:h-[3.65vw] lg:w-[2.4vw]"
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
      <OutletBand heading={workPage.seenWith.heading} size="full" />

      {/* ------------------------------------------------------ highlights
          Label row at y100 with the pill at the right, then a two by two grid
          of 772 x 655 cards on white at six percent. Each card holds a 724 x
          380 plate, a title, a paragraph, a rule and the organisation. */}
      <section className="bg-page py-12 xl:py-[5.79vw]">
        <div className="mx-auto w-full max-w-[1498px] px-6 md:px-10 xl:px-0">
          <Reveal className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="s-title text-white">{highlights.heading}</h2>
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
                <article className="flex h-full flex-col bg-white/[0.06] p-5 xl:p-[1.39vw]">
                  <div className="relative aspect-[724/380] w-full">
                    <Image
                      src={PLATE}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="s-card-title mt-6 text-white xl:mt-[1.39vw]">
                    {card.title}
                  </h3>

                  <p className="s-card-body mt-4 text-white xl:mt-[1.39vw]">
                    {card.body}
                  </p>

                  <span
                    aria-hidden="true"
                    className="mt-auto block h-px w-full bg-white/25 pt-0 xl:mt-[1.85vw]"
                  />

                  <div className="mt-5 flex items-center justify-between gap-4 xl:mt-[1.39vw]">
                    <span className="s-card-meta text-white">{card.org}</span>
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
                  <span className="relative block w-[26%] shrink-0 self-stretch sm:w-[20%] xl:w-[20.1%]">
                    <Image
                      src="/brand/work-thumb.webp"
                      alt=""
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
          A six by four grid of 251 x 245 tiles on white. Eight carry a face;
          the rest are the outlined empties the design leaves between them,
          and the copy sits over the bottom left where four of them are. */}
      <section className="bg-white py-12 xl:py-0">
        <div className="mx-auto w-full max-w-[1728px] px-6 md:px-10 xl:px-[4.63%] xl:py-[5.79vw]">
          <div className="relative">
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:gap-[0.69vw]">
              {people.grid.flat().map((slug, i) => (
                <li
                  key={i}
                  className={`relative aspect-[251/245] overflow-hidden rounded-[12px] ${
                    slug ? "" : "border border-black/[0.04]"
                  }`}
                >
                  {slug ? (
                    <Image
                      src={`/people/${slug}.webp`}
                      alt={people.names[slug]}
                      fill
                      sizes="(max-width: 1024px) 33vw, 15vw"
                      className="object-cover"
                    />
                  ) : null}
                </li>
              ))}
            </ul>

            {/* the design lays this over the empty tiles at the lower left */}
            <div className="mt-8 xl:absolute xl:bottom-0 xl:left-0 xl:mt-0 xl:w-[41%]">
              <h2 className="s-people-head text-oxblood">
                <span className="block">{people.heading[0]}</span>
                <span className="block font-semibold">{people.heading[1]}</span>
              </h2>

              <p className="s-body mt-5 max-w-[52ch] text-card-body xl:mt-[1.39vw] xl:max-w-[81%]">
                {people.lede}
              </p>

              <Link
                href={people.cta.href}
                className="s-button mt-6 inline-flex h-[52px] items-center gap-3 rounded-[32px] bg-brown px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:mt-[1.39vw] xl:h-16 xl:px-8"
              >
                {people.cta.label}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- published work
          Heading at the gutter, then five 294 x 465 plates in a row. */}
      <section className="bg-page py-12 xl:py-[5.79vw]">
        <div className="frame">
          <Reveal>
            <h2 className="s-title text-white">{published.heading}</h2>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:mt-[5.79vw] xl:gap-[1.39vw]">
            {Array.from({ length: published.count }, (_, i) => (
              <Reveal as="li" key={i} delay={i * 0.05}>
                <div className="relative aspect-[294/465] w-full overflow-hidden rounded-[12px] bg-card">
                  <Image
                    src={PLATE}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 18vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
