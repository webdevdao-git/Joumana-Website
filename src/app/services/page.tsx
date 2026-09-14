import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Card, CtaBand, PageHero, Rule, SectionHead } from "@/components/page-kit";
import { BreadcrumbSchema } from "@/components/schema";
import { pageCopy, services, workflow } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Services | Content, Editorial, Hosting and PR in Dubai" },
  description:
    "Content strategy and writing, bilingual MC and moderation, editorial services and PR support from a journalist with nineteen years in newsrooms in New York and Dubai.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Joumana Saad, Dubai",
    description:
      "Four disciplines built on newsroom habits: content, editorial, hosting and communications.",
    url: "/services",
  },
};

function Service({
  service,
  flip,
}: {
  service: (typeof services)[number];
  flip: boolean;
}) {
  return (
    <Reveal as="li">
      <Card className="overflow-hidden">
        <div
          className={`grid lg:grid-cols-[minmax(0,420px)_1fr] ${
            flip ? "lg:[&>figure]:order-2" : ""
          }`}
        >
          <figure className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover grayscale"
            />
          </figure>

          <div className="flex flex-col gap-4 p-6 xl:gap-6 xl:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-card-body-soft">
              {service.index} &nbsp;/&nbsp; {service.short}
            </p>

            <h3 className="font-display text-[24px] font-semibold uppercase leading-[1.15] text-card-heading xl:text-[34px]">
              {service.title}
            </h3>

            <p className="max-w-[46ch] text-[17px] leading-[1.4] text-card-body xl:text-[21px]">
              {service.summary}
            </p>

            <p className="max-w-[52ch] text-[15px] leading-[1.55] text-card-body-soft xl:text-[17px]">
              {service.detail}
            </p>
          </div>
        </div>

        <Rule />

        <div className="p-6 xl:p-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-card-body-soft">
            Included
          </p>
          <ul className="mt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.items.map((item) => (
              <li
                key={item}
                className="border-b border-rule py-3 text-[15px] leading-[1.4] text-card-body xl:text-[17px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", href: "/services" }]} />

      <PageHero {...pageCopy.services} />

      <section className="sec bg-page">
        <div className="frame">
          <ul className="flex flex-col gap-4 xl:gap-6">
            {services.map((service, i) => (
              <Service key={service.slug} service={service} flip={i % 2 === 1} />
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- process */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="How the work runs"
            lede="The same four steps whether the brief is a single feature or a year of retained content."
          />

          <ol className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 0.06}>
                <Card className="flex h-full flex-col gap-4 p-6 xl:p-8">
                  <span className="font-display text-[40px] font-light leading-none text-card-heading xl:text-[56px]">
                    {step.step}
                  </span>
                  <h3 className="font-display text-[19px] font-semibold uppercase tracking-[0.04em] text-card-heading xl:text-[22px]">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-card-body-soft xl:text-[16px]">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Start with the brief"
        lede="Tell me the audience, the outcome and the deadline. You get a written scope and a fixed fee before anything begins."
        label="Send a brief"
      />
    </>
  );
}
