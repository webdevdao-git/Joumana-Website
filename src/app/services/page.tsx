import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { BringReels } from "@/components/bring-reels";
import { yearsIn } from "@/lib/years";
import { Capabilities } from "@/components/capabilities";
import { Reveal } from "@/components/reveal";
import { BreadcrumbSchema } from "@/components/schema";
import { servicesPage } from "@/lib/content";

/**
 * Node 125:1680, built from the file rather than from a screenshot.
 *
 * Sizes, colours and radii below are the design's own, read through the Figma
 * API. The type scale lives in globals as .s-* and is expressed as a share of
 * the 1728 frame, so the page lands exactly on the design at that width and
 * scales as one piece either side of it.
 *
 * Two things the design does that the rest of the site does not, kept because
 * the design does them: text on the oxblood is pure white here rather than
 * cream, and the opening headline is set far larger than the shared display
 * size.
 */
export const metadata: Metadata = {
  title: { absolute: "Services | Content, Communications and Media in Dubai" },
  description: `Branded content, presenting and moderation, editorial, podcasts, media training and corporate communications, from a Dubai journalist of ${yearsIn().toLowerCase()} years.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Joumana Saad, Dubai",
    description:
      "Journalism, communications and content expertise, brought together for organisations that need to be understood.",
    url: "/services",
    images: [{ url: "/images/portrait-studio.jpg", width: 800, height: 1200, alt: "Joumana Saad, Dubai" }],
  },
};

/** 64px tall, 32px radius, oxblood in the hero and brown on the disciplines. */
function Pill({
  label,
  href,
  tone,
}: {
  label: string;
  href: string;
  tone: "oxblood" | "brown";
}) {
  return (
    <Link
      href={href}
      className={`s-button fit-pill inline-flex h-[52px] items-center justify-center gap-3 rounded-[32px] px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:px-9 ${
        tone === "oxblood" ? "bg-oxblood" : "bg-brown"
      }`}
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}


export default function ServicesPage() {
  const { hero, bring, approach } = servicesPage;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", href: "/services" }]} />

      {/* ------------------------------------------------------------ hero
          Placed from the frame, in the frame's own numbers. On 1728 by 981:

            headline block   top 58              5.91%
            With / Purpose   465..707, 980..1392, so 273px apart   15.8%
            portrait         x218 y68, 1247 x 1870                 the section
                                                                   crops it
            lede             x1277 y693 w394     73.9% / 70.6% / 22.8%
            button           x80 y877 327 x 64   4.6% / 89.4%

          The portrait box is nearly twice the height of the section, which is
          why only her head and shoulders show. Scaling her to fit, which is
          what the first attempts did, makes her a third of the size.

          It also sits above the headline in the design's own layer order, so
          it does here. */}
      <section className="relative overflow-hidden bg-cream">
        <div
          className="fit-frame max-w-[1728px]"
          style={{ "--fit-w": 1728, "--fit-h": 981 } as React.CSSProperties}
        >
          <div className="hidden lg:block">
            {/* Each word is pinned to its own x. Centring the pair and
                spacing them apart looked right until it was measured: the
                design's With and Purpose sit 64px right of the frame centre,
                and any difference between the design's font metrics and ours
                moved them again. Pinned, neither can drift. */}
            <h1 className="s-display absolute inset-0 text-card-body">
              <span className="absolute left-[35.76%] top-[5.91%]">
                {hero.lines[0]}
              </span>
              <span className="absolute left-[26.91%] top-[16.62%]">
                {hero.lines[1]}
              </span>
              <span className="absolute left-[56.71%] top-[16.62%]">
                {hero.lines[2]}
              </span>
            </h1>

            <div className="absolute left-[12.6%] top-[6.9%] h-[190.6%] w-[72.2%]">
              <Image
                src="/brand/services-hero.webp"
                alt="Joumana Saad, journalist, presenter and communications specialist in Dubai"
                fill
                priority
                sizes="73vw"
                className="object-contain object-top"
              />
            </div>

            <p className="s-body absolute left-[73.9%] top-[70.6%] w-[22.8%] text-card-body">
              {hero.lede}
            </p>

            <div className="absolute left-[4.6%] top-[89.4%]">
              <Pill label={hero.cta.label} href={hero.cta.href} tone="oxblood" />
            </div>
          </div>

          {/* the words close up on a phone: there is no room to hold her head
              between them without pushing Purpose off the screen */}
          <div className="flex flex-col items-center px-6 pt-10 lg:hidden">
            <h1 className="s-display text-center text-card-body">
              <span className="block">{hero.lines[0]}</span>
              <span className="block">
                {hero.lines[1]} {hero.lines[2]}
              </span>
            </h1>

            <div className="relative -mt-2 h-[360px] w-full max-w-[420px] overflow-hidden">
              <Image
                src="/brand/services-hero.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>

            <p className="s-body mt-6 max-w-[44ch] text-card-body">{hero.lede}</p>

            <div className="mb-10 mt-8 self-start">
              <Pill label={hero.cta.label} href={hero.cta.href} tone="oxblood" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- what I bring
          The phone holds the left column and everything that is words holds
          the right, ranged left against it. The script and the heading used to
          run centred across the whole section with only the paragraphs beside
          the picture, which left the heading answering to nothing. */}
      <section className="bg-page py-12 lg:flex lg:min-h-svh lg:items-center lg:py-[4vw]">
        <div className="frame w-full">
          {/* Both columns are sized by what is in them and the pair is centred,
              rather than two proportional columns across the frame. Shares of
              the frame left the phone floating in the middle of a wide column
              with a gap of dead oxblood between it and the words; this keeps
              them next to each other at any width. */}
          <div className="grid items-center gap-10 lg:grid-cols-[auto_auto] lg:justify-center lg:gap-[clamp(2.5rem,4vw,5rem)]">
            <Reveal>
              <BringReels />
            </Reveal>

            <div className="flex flex-col lg:max-w-[52rem]">
              <Reveal>
                <p className="s-script text-white">{bring.script}</p>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="s-lead mt-4 text-white xl:mt-[1.4vw]">
                  <span className="block">{bring.heading[0]}</span>
                  <span className="block">
                    {bring.heading[1]}{" "}
                    <b className="font-semibold">{bring.headingAccent}</b>
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.12} className="mt-7 flex flex-col gap-5 xl:mt-[2.2vw]">
                {bring.body.map((para) => (
                  <p key={para} className="s-body max-w-[52ch] text-white">
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- approach
          Section 1728 x 796 on white, with the columns plate across it. A
          brown band sits at x331 y100, 1066 x 607, holding a 495 wide portrait
          on its left and a 411 wide text column at x906, which is 80px clear
          of the portrait and 80px clear of the band's right edge. The heading
          starts 85px down, the copy 64px under it.

          Everything below is those numbers as percentages. */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/brand/services-columns.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* the design lays white over the plate at 69 percent, which is what
              washes it back far enough for the band to read */}
          <span className="absolute inset-0 bg-white/[0.69]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1728px] lg:aspect-[1728/796]">
          {/* ---------------------------------------------- large screens */}
          <div className="absolute left-[19.15%] top-[12.56%] hidden h-[76.26%] w-[61.69%] bg-brown lg:block">
            <div className="absolute inset-y-0 left-0 w-[46.44%]">
              <Image
                src="/brand/services-approach.webp"
                alt="Joumana Saad at work in Dubai"
                fill
                sizes="29vw"
                className="object-cover"
              />
            </div>

            <div className="absolute left-[53.94%] top-[14%] w-[38.56%]">
              <h2 className="s-subhead text-white">
                {approach.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="s-body mt-[15%] text-white">{approach.body}</p>
            </div>
          </div>

          {/* ---------------------------------------------- small screens */}
          <div className="relative px-6 py-12 lg:hidden">
            <div className="mx-auto max-w-[520px] bg-brown">
              <div className="relative aspect-[495/607] w-full">
                <Image
                  src="/brand/services-approach.webp"
                  alt="Joumana Saad at work in Dubai"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <h2 className="s-subhead text-white">
                  {approach.heading.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="s-body mt-5 text-white">{approach.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ disciplines
          The two services sections traded places: the deck that used to sit
          here is on the home page now, and the card grid that used to be on
          the home page is here. Capabilities carries the reasoning. */}
      <Capabilities />

      {/* the design closes on Tell Me What You're Working On */}
      <ContactPanel />
    </>
  );
}
