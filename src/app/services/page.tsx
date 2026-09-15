import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";
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
  description:
    "Branded content, presenting and moderation, editorial, podcasts, media training and corporate communications from a journalist with fifteen years across media, government and business in Dubai.",
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
      className={`s-button inline-flex h-[52px] items-center justify-center gap-3 rounded-[32px] px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:px-9 ${
        tone === "oxblood" ? "bg-oxblood" : "bg-brown"
      }`}
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/** The design sets the Includes chips two to a row, whatever their widths. */
function pairs(items: readonly string[]) {
  const out: string[][] = [];
  for (let i = 0; i < items.length; i += 2) out.push(items.slice(i, i + 2));
  return out;
}

export default function ServicesPage() {
  const { hero, bring, approach, disciplines } = servicesPage;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", href: "/services" }]} />

      {/* ------------------------------------------------------------ hero
          On the 1728 by 981 frame: Expertise centred at y196, With and Purpose
          on the line below with 273px between them, the portrait rising into
          that gap from the bottom edge where the section crops her, the lede at
          65.5 percent across, the button at the lower left. Held as
          percentages so the composition scales as one. */}
      <section className="relative overflow-hidden bg-card">
        <div className="relative mx-auto w-full max-w-[1728px] lg:aspect-[1728/981]">
          <div className="hidden lg:block">
            <h1 className="s-display absolute left-0 top-[16%] w-full text-center text-card-body">
              <span className="block">{hero.lines[0]}</span>
              <span className="mt-1 flex items-baseline justify-center gap-[15.8%]">
                <span>{hero.lines[1]}</span>
                <span>{hero.lines[2]}</span>
              </span>
            </h1>

            <div className="absolute bottom-0 left-[46.6%] h-[79%] w-[33%] -translate-x-1/2">
              <Image
                src="/brand/services-hero.webp"
                alt="Joumana Saad, journalist, presenter and communications specialist in Dubai"
                fill
                priority
                sizes="34vw"
                className="object-contain object-bottom"
              />
            </div>

            <p className="s-body absolute left-[65.5%] top-[72%] w-[23%] text-card-body">
              {hero.lede}
            </p>

            <div className="absolute bottom-[4.5%] left-[4.6%]">
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

            <div className="relative mt-2 h-[330px] w-[78%] max-w-[330px]">
              <Image
                src="/brand/services-hero.webp"
                alt=""
                fill
                priority
                sizes="78vw"
                className="object-contain object-bottom"
              />
            </div>

            <p className="s-body mt-6 max-w-[44ch] text-card-body">{hero.lede}</p>

            <div className="mb-10 mt-8 self-start">
              <Pill label={hero.cta.label} href={hero.cta.href} tone="oxblood" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- what I bring */}
      <section className="bg-page py-14 xl:py-[6.2vw]">
        <div className="frame flex flex-col items-center">
          <Reveal>
            <p className="s-script text-center text-white">{bring.script}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="s-lead mt-3 max-w-[30ch] text-center text-white">
              <span className="block">{bring.heading[0]}</span>
              <span className="block">
                {bring.heading[1]}{" "}
                <b className="font-semibold">{bring.headingAccent}</b>
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid w-full max-w-[1363px] items-end gap-10 lg:grid-cols-[644fr_639fr] xl:mt-[4vw] xl:gap-[5vw]">
            {/* 517 by 711 with a 291 by 258 plate overlapping it from below */}
            <Reveal className="relative">
              <div className="relative ml-auto aspect-[517/711] w-[80.3%]">
                <Image
                  src="/brand/services-plate.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 80vw, 517px"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 aspect-[291/258] w-[45.2%]">
                <Image
                  src="/brand/services-columns.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 45vw, 291px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-6">
              {bring.body.map((para) => (
                <p key={para} className="s-body text-white">
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- approach
          A full bleed plate with a 495 by 607 portrait and the brown panel
          laid over it. */}
      <section className="relative overflow-hidden bg-card py-12 xl:py-[3.5vw]">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/brand/services-wide.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="frame relative">
          <div className="mx-auto flex max-w-[1180px] flex-col items-stretch lg:flex-row lg:items-center">
            <Reveal className="relative aspect-[495/607] w-full max-w-[340px] shrink-0 self-center lg:self-auto xl:max-w-[28vw]">
              <Image
                src="/brand/services-approach.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 80vw, 28vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal
              delay={0.08}
              className="w-full bg-brown p-8 text-white lg:-ml-10 lg:max-w-[540px] xl:p-[2.8vw]"
            >
              <h2 className="s-subhead uppercase">
                {approach.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="s-body mt-6 text-white">{approach.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ disciplines */}
      {disciplines.map((d) => (
        <section key={d.index} className="bg-page py-12 xl:py-[3.2vw]">
          <div className="frame mx-auto max-w-[1728px]">
            <Reveal className="flex items-start justify-between gap-6">
              <h2 className="s-title text-white">{d.label}</h2>
              <span className="s-title text-white">{d.index}</span>
            </Reveal>

            <div className="mt-8 grid gap-10 lg:grid-cols-[818fr_600fr] lg:gap-[5.2vw] xl:mt-[2.2vw]">
              <Reveal className="flex flex-col">
                <h3 className="s-head text-white">{d.head}</h3>

                <p className="s-body mt-6 text-white">{d.lede}</p>
                <p className="s-body mt-6 text-white">{d.body}</p>

                <p className="s-head mt-10 text-white xl:mt-[2.8vw]">Includes</p>

                <ul className="mt-6 flex flex-col gap-3">
                  {pairs(d.includes).map((row, r) => (
                    <li key={r}>
                      <ul className="flex flex-wrap gap-3">
                        {row.map((item, i) => (
                          <li
                            key={`${item}-${i}`}
                            className="s-chip inline-flex h-[48px] items-center rounded-[32px] border border-white px-6 text-white xl:h-16 xl:px-8"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* the plate is 600 by 667, with the call to action on its lower
                  right edge */}
              <Reveal delay={0.08} className="relative self-start">
                <div className="relative aspect-[600/667] w-full">
                  <Image
                    src="/brand/services-columns.webp"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 flex justify-end lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
                  <Pill label={d.cta} href="/contact" tone="brown" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* the design closes on Tell Me What You're Working On, which is the
          same block the home page already carries */}
      <ContactBlock />
    </>
  );
}
