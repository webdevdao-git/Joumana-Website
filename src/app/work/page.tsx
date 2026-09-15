import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ReelGrid } from "@/components/reel-grid";
import { Card, CtaBand, PageHero, SectionHead } from "@/components/page-kit";
import { BreadcrumbSchema } from "@/components/schema";
import {
  broadcast,
  caseStudy,
  clips,
  experience,
  hosting,
  interviews,
  pageCopy,
} from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "The Work | Published Journalism, Broadcast and Hosting" },
  description:
    "Selected work by Joumana Saad: features for Forbes and Arabian Business, radio reporting for Dubai Eye 103.8, bilingual event hosting and corporate publications across the UAE.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "The Work | Joumana Saad",
    description:
      "Published journalism, broadcast reporting, bilingual hosting and corporate publications.",
    url: "/work",
    images: [{ url: "/video/hero-loop.jpg", width: 1600, height: 900, alt: "Joumana Saad hosting in Dubai" }],
  },
};

function ArrowUpRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

/**
 * The published piece, set as a text card.
 *
 * The home page runs the same information with a thumbnail beside it. Here
 * there are eleven of them, and every thumbnail would be the same placeholder,
 * so the picture is dropped rather than repeated down the page. CONFIRM: with
 * real artwork per piece the thumbnail comes back.
 */
function ClipCard({
  item,
}: {
  item: { title: string; outlet: string; kind: string; year: string; href: string };
}) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full flex-col gap-3 rounded-[24px] bg-card p-6 transition-opacity duration-300 hover:opacity-95 xl:gap-4 xl:p-8"
    >
      <span className="flex items-start justify-between gap-4 text-card-heading">
        <span className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] xl:text-[15px]">
          {item.outlet}
        </span>
        <ArrowUpRight />
      </span>

      <span className="text-[18px] font-semibold leading-[1.3] text-card-body xl:text-[22px]">
        {item.title}
      </span>

      <span className="mt-auto pt-1 text-[13px] uppercase tracking-[0.1em] text-card-body-soft xl:text-[14px]">
        {item.kind} &middot; {item.year}
      </span>
    </a>
  );
}

export default function WorkPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "The Work", href: "/work" }]} />

      <PageHero {...pageCopy.work} />

      {/* -------------------------------------------------------- on camera */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="On camera"
            lede="Six pieces to camera, in English and in Arabic. Sound is off until you press play."
          />
          <ReelGrid />
        </div>
      </section>

      {/* ---------------------------------------------------------- hosting */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="Hosting and moderating"
            lede="Close to a decade of live work, from national celebrations to awards nights and boutique launches."
          />

          <ul className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {hosting.map((event, i) => (
              <Reveal as="li" key={event.title} delay={i * 0.06}>
                <Card className="flex h-full flex-col overflow-hidden">
                  <figure className="relative aspect-[4/3] w-full">
                    <Image
                      src={event.image}
                      alt={`Joumana Saad hosting ${event.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </figure>
                  <figcaption className="flex flex-1 flex-col gap-2 p-5 xl:p-6">
                    <h3 className="font-display text-[17px] font-semibold uppercase leading-tight text-card-heading xl:text-[20px]">
                      {event.title}
                    </h3>
                    <p className="text-[14px] leading-[1.45] text-card-body-soft xl:text-[15px]">
                      {event.detail}
                    </p>
                  </figcaption>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------- published work */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="Published work"
            lede="Features, profiles and analysis for Forbes, Arabian Business, The Epoch Times and the organisations that publish once a year and need it right."
          />

          <ul className="grid w-full max-w-[1200px] gap-4 md:grid-cols-2">
            {clips.map((clip, i) => (
              <Reveal as="li" key={clip.title} delay={(i % 2) * 0.06}>
                <ClipCard item={clip} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ on air */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="On air"
            lede="Reported features produced for the network's flagship programmes."
          />

          <ul className="grid w-full max-w-[1200px] gap-4 md:grid-cols-2">
            {broadcast.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06}>
                <ClipCard item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- interviews */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="People she has interviewed"
            lede="Presidents, founders, investors and the correspondents who covered them."
          />

          <ul className="grid w-full max-w-[1100px] grid-cols-2 gap-3 sm:grid-cols-4">
            {interviews.map((name, i) => (
              <Reveal as="li" key={name} delay={i * 0.04}>
                <Card className="flex h-full items-center justify-center px-4 py-6 text-center">
                  <span className="font-display text-[15px] font-semibold uppercase leading-tight tracking-[0.04em] text-card-heading xl:text-[18px]">
                    {name}
                  </span>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ case study */}
      <section className="sec bg-page">
        <div className="frame">
          <Reveal>
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-[minmax(0,460px)_1fr]">
                <figure className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[440px]">
                  <Image
                    src={caseStudy.image}
                    alt={`Joumana Saad, ${caseStudy.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="object-cover grayscale"
                  />
                </figure>

                <div className="flex flex-col gap-5 p-6 xl:gap-7 xl:p-10">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-card-body-soft">
                    {caseStudy.kicker}
                  </p>
                  <h2 className="font-display text-[26px] font-semibold uppercase leading-[1.1] text-card-heading xl:text-[38px]">
                    {caseStudy.title}
                  </h2>
                  <p className="text-[14px] uppercase tracking-[0.08em] text-card-body-soft xl:text-[15px]">
                    {caseStudy.meta}
                  </p>

                  <dl className="mt-1 grid gap-5 sm:grid-cols-3">
                    {caseStudy.columns.map((column) => (
                      <div key={column.head} className="border-t border-rule pt-4">
                        <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-card-body-soft">
                          {column.head}
                        </dt>
                        <dd className="mt-2 text-[15px] leading-[1.5] text-card-body">
                          {column.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- experience */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="Where the work was done"
            lede="Nineteen years across two media markets, in newsrooms, studios and communications teams."
          />

          <ul className="flex w-full max-w-[1100px] flex-col gap-4">
            {experience.map((role, i) => (
              <Reveal as="li" key={`${role.org}-${role.period}`} delay={i * 0.05}>
                <Card className="grid gap-4 p-6 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-10 xl:p-8">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[18px] font-semibold uppercase leading-tight text-card-heading xl:text-[21px]">
                      {role.role}
                    </h3>
                    <p className="text-[15px] leading-snug text-card-body">{role.org}</p>
                    <p className="text-[13px] leading-snug text-card-body-soft">
                      {role.place} &middot; {role.period}
                    </p>
                  </div>
                  <p className="text-[15px] leading-[1.55] text-card-body-soft xl:text-[16px]">
                    {role.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Something here worth talking about"
        lede="If a piece of this looks like the thing you need, send the brief and we can work out the shape of it."
        label="Get in touch"
      />
    </>
  );
}
