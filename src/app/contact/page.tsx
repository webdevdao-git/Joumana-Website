import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { Card, PageHero, SectionHead } from "@/components/page-kit";
import { BreadcrumbSchema, FaqSchema } from "@/components/schema";
import { contactCopy, faqs, pageCopy, site } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Contact | Hire a Journalist, Writer and MC in Dubai" },
  description:
    "Enquire about editorial assignments, corporate content, press material, media training or bilingual event hosting in Dubai. Send a brief and receive a quote and a rate card.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Joumana Saad | Journalist and MC, Dubai",
    description:
      "Send the brief, the audience and the deadline. Most enquiries get a reply within one working day.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Contact", href: "/contact" }]} />
      <FaqSchema items={faqs} />

      <PageHero {...pageCopy.contact} />

      <section className="sec bg-page pt-0">
        <div className="frame grid gap-4 lg:grid-cols-[1fr_minmax(0,380px)] xl:gap-6">
          <Reveal>
            <Card className="h-full p-6 xl:p-10">
              <EnquiryForm />
            </Card>
          </Reveal>

          <div className="flex flex-col gap-4 xl:gap-6">
            <Reveal delay={0.08}>
              <Card className="p-6 xl:p-8">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-card-body-soft">
                  Currently taking on
                </h2>
                <ul className="mt-5 flex flex-col">
                  {contactCopy.availability.map((item) => (
                    <li
                      key={item}
                      className="border-b border-rule py-3 text-[15px] leading-[1.45] text-card-body last:border-b-0 xl:text-[16px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={0.14}>
              <Card className="p-6 xl:p-8">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-card-body-soft">
                  Direct
                </h2>

                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 block text-[17px] font-semibold text-card-heading underline decoration-transparent transition-colors hover:decoration-current xl:text-[19px]"
                >
                  {site.email}
                </a>

                <p className="mt-2 text-[15px] leading-[1.45] text-card-body-soft">
                  {site.city}, {site.country}. Gulf Standard Time.
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-rule pt-6">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-10 items-center rounded-full border border-rule px-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-card-heading transition-colors hover:bg-brown hover:text-white"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- faq */}
      <section className="sec bg-page">
        <div className="frame flex flex-col items-center gap-7 xl:gap-10">
          <SectionHead
            title="Before you write in"
            lede="The five questions that come up most often, answered ahead of the first call."
          />

          <ul className="w-full max-w-[900px] overflow-hidden rounded-[24px] bg-card">
            {faqs.map((faq) => (
              <li key={faq.q} className="border-b border-rule last:border-b-0">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 xl:px-8 xl:py-6">
                    <h3 className="text-[16px] font-semibold leading-snug text-card-heading xl:text-[18px]">
                      {faq.q}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="relative block h-4 w-4 shrink-0 text-card-heading"
                    >
                      <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rounded bg-current" />
                      <span className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open:rotate-90" />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-[15px] leading-[1.6] text-card-body-soft xl:px-8 xl:pb-7 xl:text-[16px]">
                    {faq.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
