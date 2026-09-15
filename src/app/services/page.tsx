import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";
import { Reveal } from "@/components/reveal";
import { BreadcrumbSchema } from "@/components/schema";
import { servicesPage } from "@/lib/content";

/**
 * Node 125:1680, built to the design.
 *
 * The page alternates ground deliberately: a light opening, oxblood for the
 * statement, light again for the approach, then oxblood for all six
 * disciplines and the footer. Section heights and column widths are taken
 * from the frame, scaled off the 1728 it was drawn on.
 *
 * CONFIRM: every picture here is the placeholder the design itself uses. The
 * portrait, the two plates in What I Bring, the approach plate and the six
 * discipline plates all want real photography.
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

const PLATE = "/brand/conversation-placeholder.jpg";

/** The design sets the Includes chips two to a row, whatever their widths. */
function pairs(items: readonly string[]) {
  const out: string[][] = [];
  for (let i = 0; i < items.length; i += 2) out.push(items.slice(i, i + 2));
  return out;
}

function ArrowPill({
  label,
  href,
  tone = "brown",
}: {
  label: string;
  href: string;
  tone?: "brown" | "light";
}) {
  const skin =
    tone === "brown" ? "bg-brown text-white" : "bg-card text-card-heading";
  return (
    <Link
      href={href}
      className={`inline-flex h-[54px] items-center justify-center gap-3 rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.06em] transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:px-8 xl:text-[15px] ${skin}`}
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default function ServicesPage() {
  const { hero, bring, approach, disciplines } = servicesPage;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", href: "/services" }]} />

      {/* ------------------------------------------------------------ hero
          The three words are set around the portrait rather than above it:
          Expertise across the top, then With and Purpose either side of her. */}
      <section className="relative overflow-hidden bg-card pb-10 pt-12 xl:pb-16 xl:pt-16">
        <div className="frame">
          <div className="relative mx-auto flex max-w-[1240px] flex-col items-center">
            <h1 className="t-display w-full text-center text-[clamp(2.25rem,5.1vw,5.5rem)] leading-[1.06] text-card-heading">
              <span className="block">{hero.lines[0]}</span>
              {/* the gap is the 273px the design leaves between the two words,
                  held as a share of the frame so it scales with the type */}
              <span className="mt-1 flex items-baseline justify-center gap-[17%]">
                <span>{hero.lines[1]}</span>
                <span>{hero.lines[2]}</span>
              </span>
            </h1>

            {/* the portrait sits between the two lower words and overlaps them */}
            <div className="pointer-events-none relative -mt-[7vw] h-[340px] w-full max-w-[400px] sm:h-[430px] xl:-mt-[74px] xl:h-[540px] xl:max-w-[470px]">
              <Image
                src="/brand/portrait-cutout.webp"
                alt="Joumana Saad, journalist, presenter and communications specialist in Dubai"
                fill
                priority
                sizes="(max-width: 1280px) 60vw, 500px"
                className="object-contain object-bottom"
              />
            </div>

            <div className="mt-8 flex w-full flex-col items-start gap-8 lg:flex-row lg:items-start lg:justify-between xl:-mt-16">
              <div className="order-2 pt-4 lg:order-1 lg:pt-16">
                <ArrowPill label={hero.cta.label} href={hero.cta.href} />
              </div>
              <p className="order-1 max-w-[400px] lg:order-2 text-[14px] leading-[1.5] text-card-body lg:text-right xl:text-[15px]">
                {hero.lede}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- what I bring */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center">
          <Reveal>
            <p className="t-script text-center text-[30px] text-heading xl:text-[38px]">
              {bring.script}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="t-section mt-4 max-w-[34ch] text-center text-heading">
              <span className="block">{bring.heading[0]}</span>
              <span className="block">
                {bring.heading[1]}{" "}
                <b className="font-semibold">{bring.headingAccent}</b>
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid w-full max-w-[1370px] items-end gap-10 lg:grid-cols-[644fr_639fr] xl:mt-16 xl:gap-16">
            {/* two plates, the smaller one overlapping the larger from below */}
            <Reveal className="relative">
              <div className="relative ml-auto aspect-[517/711] w-[80%] overflow-hidden">
                <Image
                  src={PLATE}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 80vw, 517px"
                  className="object-cover grayscale"
                />
              </div>
              <div className="absolute bottom-0 left-0 aspect-[291/258] w-[45%] overflow-hidden">
                <Image
                  src={PLATE}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 45vw, 291px"
                  className="object-cover object-right grayscale"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-5">
              {bring.body.map((para) => (
                <p key={para} className="text-[15px] leading-[1.6] text-body xl:text-[17px]">
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- approach
          A full bleed plate with a portrait and the brown panel laid over it,
          rather than two columns sitting side by side. */}
      <section className="relative bg-card py-12 xl:py-16">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={PLATE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale"
          />
          <span className="absolute inset-0 bg-card/25" />
        </div>

        <div className="frame relative">
          <div className="mx-auto flex max-w-[1180px] flex-col items-stretch gap-0 lg:flex-row lg:items-center">
            <Reveal className="relative aspect-[3/4] w-full max-w-[360px] shrink-0 self-center lg:self-auto">
              <Image
                src={PLATE}
                alt=""
                fill
                sizes="360px"
                className="object-cover grayscale"
              />
            </Reveal>

            <Reveal
              delay={0.08}
              className="w-full bg-brown p-8 text-white lg:-ml-10 lg:max-w-[520px] xl:p-12"
            >
              <h2 className="font-display text-[24px] font-semibold uppercase leading-[1.25] xl:text-[32px]">
                {approach.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-6 text-[14px] leading-[1.6] text-white/85 xl:text-[16px]">
                {approach.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ disciplines */}
      {disciplines.map((d) => (
        <section key={d.index} className="sec bg-page">
          <div className="frame mx-auto max-w-[1500px]">
            <Reveal className="flex items-start justify-between gap-6">
              <h2 className="t-section text-heading">{d.label}</h2>
              <span className="font-display text-[28px] font-light leading-none text-heading xl:text-[46px]">
                {d.index}
              </span>
            </Reveal>

            <div className="mt-8 grid gap-10 lg:grid-cols-[818fr_600fr] lg:gap-[80px] xl:mt-12">
              <Reveal className="flex flex-col">
                <h3 className="font-display text-[20px] font-semibold uppercase leading-tight text-heading xl:text-[26px]">
                  {d.head}
                </h3>

                <p className="mt-5 text-[15px] leading-[1.55] text-body xl:text-[17px]">
                  {d.lede}
                </p>
                <p className="mt-5 text-[15px] leading-[1.55] text-body-soft xl:text-[17px]">
                  {d.body}
                </p>

                <p className="mt-9 font-display text-[19px] font-semibold uppercase text-heading xl:text-[24px]">
                  Includes
                </p>

                <ul className="mt-5 flex flex-col gap-3">
                  {pairs(d.includes).map((row, r) => (
                    <li key={r}>
                      <ul className="flex flex-wrap gap-3">
                        {row.map((item, i) => (
                          <li
                            key={`${item}-${i}`}
                            className="inline-flex h-[52px] items-center rounded-[6px] border border-cream/30 px-6 text-[13px] leading-none text-body xl:h-[64px] xl:px-8 xl:text-[15px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* the plate, with the call to action sitting on its lower edge */}
              <Reveal delay={0.08} className="relative self-start">
                <div className="relative aspect-[600/667] w-full overflow-hidden">
                  <Image
                    src={PLATE}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="mt-5 flex justify-end lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
                  <ArrowPill label={d.cta} href="/contact" />
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
