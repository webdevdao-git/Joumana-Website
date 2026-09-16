import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { Reveal } from "@/components/reveal";
import { BreadcrumbSchema } from "@/components/schema";
import { journalPage } from "@/lib/content";

/**
 * Node 168:864, built from the file rather than from a screenshot.
 *
 * Sizes, colours and radii are the design's own, read through the Figma API.
 * The type scale lives in globals as .s-*, expressed as a share of the 1728
 * frame the page was drawn on, so it lands exactly on the design at that
 * width and scales as one piece either side of it.
 *
 * The design's light sections are #f6f4f1. They are set in the site's cream
 * instead, which is the colour the services and work pages band with, so the
 * journal joins the same alternation rather than introducing a third
 * off white a shade away from the other two. CONFIRM if the design's own
 * value is wanted here.
 */
export const metadata: Metadata = {
  title: { absolute: "Journal | Words, Ideas and Everything in Between" },
  description:
    "A collection of stories, observations, conversations and perspectives from a career spent asking questions, finding the story and making it matter.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal | Joumana Saad",
    description:
      "Stories, observations, conversations and perspectives from journalism, business, media and communications.",
    url: "/journal",
    images: [
      { url: "/images/journal/podcast.webp", width: 1000, height: 1777, alt: "Joumana Saad, Dubai" },
    ],
  },
};

/** 56px tall, 100 radius, brown. The design's one button style on this page. */
function Pill({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="s-button inline-flex h-[48px] items-center justify-center gap-3 rounded-full bg-brown px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-14 xl:px-8"
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default function JournalPage() {
  const { hero, marquee, why, from } = journalPage;

  /* the strip is one list repeated, so the run can loop on itself without a
     seam; the copy is hidden from the reader the second time round */
  const run = [...marquee, ...marquee, ...marquee];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Journal", href: "/journal" }]} />

      {/* --------------------------------------------------------------- hero
          On the 1728 by 1088 section the copy column is 718 wide at x88 and
          the picture is 844 by 1121 at x886, riding 54 above the section and
          past its foot. Held as a two column grid so the picture keeps its
          proportion and the copy keeps the page's gutter. */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid w-full max-w-[1728px] items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[minmax(0,718fr)_minmax(0,844fr)] lg:gap-[4%] lg:px-0 lg:py-0 lg:pl-[9.72%]">
          <div className="flex flex-col gap-7 lg:py-20 xl:gap-9">
            <Reveal>
              <h1 className="s-title max-w-[14ch] text-card-heading">
                {hero.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </Reveal>

            {/* 215 by 234 at x88, the one small picture in the column */}
            <Reveal delay={0.08}>
              <figure className="relative h-[170px] w-[156px] overflow-hidden xl:h-[234px] xl:w-[215px]">
                <Image
                  src={hero.inset.src}
                  alt={hero.inset.alt}
                  fill
                  sizes="215px"
                  className="object-cover"
                />
              </figure>
            </Reveal>

            <div className="flex flex-col gap-6">
              {hero.body.map((para, i) => (
                <Reveal key={para} delay={0.12 + i * 0.06}>
                  <p className="s-body max-w-[46ch] text-card-heading">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* the design runs this to the section's right edge and past its
              top and bottom, so it is the section's full height on desktop */}
          <div className="relative -mx-6 aspect-[844/760] md:-mx-10 lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-[640px] xl:min-h-[780px]">
            <Image
              src={hero.portrait.src}
              alt={hero.portrait.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 49vw"
              className="object-cover object-[center_28%]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ marquee
          115 tall, oxblood, 32px display type running across it */}
      <section className="overflow-hidden bg-page py-5 xl:py-7" aria-hidden="true">
        <div className="flex w-max marquee-run" style={{ "--marquee-duration": "44s" } as React.CSSProperties}>
          {run.map((word, i) => (
            <span key={`${word}-${i}`} className="s-marquee flex shrink-0 items-center text-white">
              {word}
              <span className="px-4 opacity-60 xl:px-6">&middot;</span>
            </span>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- why
          966 tall, cream. A 215 by 234 mark centred at the top, the heading
          under it, then two 447 columns of copy inside a 934 measure. */}
      <section className="bg-cream py-16 xl:py-24">
        <div className="frame flex flex-col items-center gap-8 xl:gap-12">
          <Reveal>
            <figure className="relative h-[170px] w-[156px] overflow-hidden xl:h-[234px] xl:w-[215px]">
              <Image
                src={why.mark.src}
                alt={why.mark.alt}
                fill
                sizes="215px"
                className="object-cover"
              />
            </figure>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="s-title max-w-[22ch] text-center text-card-heading">
              {why.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <div className="grid w-full max-w-[934px] gap-8 md:grid-cols-2 xl:gap-10">
            {[why.left, why.right].map((column, c) => (
              <div key={c} className="flex flex-col gap-4 xl:gap-5">
                {column.map((para, i) => (
                  <Reveal key={para} delay={0.1 + i * 0.05}>
                    <p className="s-body text-card-heading">{para}</p>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- from the journal
          976 tall, oxblood. The kicker centred at the top, then a 603 by 606
          plate beside a 633 column inside a 1316 measure. */}
      <section className="bg-page py-16 xl:py-24">
        <div className="frame flex flex-col gap-10 xl:gap-16">
          <Reveal>
            <h2 className="s-title text-center text-white">{from.kicker}</h2>
          </Reveal>

          <div className="mx-auto grid w-full max-w-[1316px] items-center gap-8 lg:grid-cols-[minmax(0,603fr)_minmax(0,633fr)] lg:gap-[6%]">
            <Reveal>
              <figure className="relative aspect-[603/606] w-full overflow-hidden bg-black">
                <Image
                  src={from.image.src}
                  alt={from.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>

            <div className="flex flex-col gap-5 xl:gap-7">
              <Reveal delay={0.06}>
                <h3 className="s-head max-w-[18ch] text-white">{from.heading}</h3>
              </Reveal>
              {from.body.map((para, i) => (
                <Reveal key={para} delay={0.1 + i * 0.05}>
                  <p className="s-body text-white">{para}</p>
                </Reveal>
              ))}
              <Reveal delay={0.26}>
                <Pill label={from.cta.label} href={from.cta.href} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
