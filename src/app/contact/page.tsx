import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { BreadcrumbSchema, FaqSchema } from "@/components/schema";
import { contactCopy, faqs, pageCopy } from "@/lib/content";

/**
 * There is no contact frame in the Figma file, so this is built in the
 * language the drawn pages established rather than invented beside it: the
 * .s-* scale, the cream and oxblood alternation, the full height split
 * opening the journal uses, brown pills at 100 radius and the white 24 radius
 * panel the design puts its form in.
 *
 * What changed from the first version. It was the one page on the site with
 * no photograph, no banding and no display scale, and it read as a settings
 * screen: a form card with two more cards stacked beside it. The three facts
 * a visitor actually wants before they write, where to send it, where she is
 * and how long a reply takes, were the third card down. They open the page
 * now, on rules, and the cards are gone.
 */
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
    images: [{ url: "/images/headshot-wide.jpg", width: 1700, height: 850, alt: "Joumana Saad, Dubai" }],
  },
};

export default function ContactPage() {
  const { eyebrow, title, lede } = pageCopy.contact;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Contact", href: "/contact" }]} />
      <FaqSchema items={faqs} />

      {/* --------------------------------------------------------------- hero
          The journal's split, held to one screen: the copy in the page gutter
          and the portrait running the full height of the section to the right
          edge. */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid w-full max-w-[1728px] items-center gap-10 px-6 py-14 md:px-10 lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[640px] lg:grid-cols-[minmax(0,860fr)_minmax(0,700fr)] lg:gap-[5%] lg:px-0 lg:py-0 lg:pl-[4.63%]">
          <div className="flex flex-col gap-6 lg:py-12 xl:gap-8">
            <Reveal>
              <p className="s-button text-brown/70 tracking-[0.3em]">{eyebrow}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="s-title text-card-heading">
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="s-body max-w-[46ch] text-card-body">{lede}</p>
            </Reveal>

            {/* the three facts, on rules rather than in a card */}
            <Reveal delay={0.18}>
              <dl className="mt-1 border-t border-oxblood/15">
                {contactCopy.direct.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 border-b border-oxblood/15 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <dt className="s-button shrink-0 tracking-[0.18em] text-brown/60 sm:w-[128px] xl:w-[150px]">
                      {row.label}
                    </dt>
                    <dd className="s-body text-card-heading">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="underline decoration-oxblood/25 underline-offset-[6px] transition-colors hover:decoration-current"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <Link
                href="#brief"
                className="s-button inline-flex h-[52px] items-center justify-center gap-3 rounded-[32px] bg-oxblood px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:px-9"
              >
                Write the brief
                <span aria-hidden="true">&darr;</span>
              </Link>
            </Reveal>
          </div>

          <div className="relative -mx-6 aspect-[4/5] md:-mx-10 lg:mx-0 lg:aspect-auto lg:h-full">
            <Image
              src="/images/contact-portrait.webp"
              alt="Joumana Saad, journalist, presenter and communications specialist in Dubai"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 41vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- form
          Oxblood, with the design's own white panel holding the fields. */}
      <section id="brief" className="scroll-mt-20 bg-page py-16 xl:py-24">
        <div className="frame grid items-start gap-10 lg:grid-cols-[minmax(0,520fr)_minmax(0,880fr)] lg:gap-[5%]">
          <div className="flex flex-col gap-6 xl:gap-8">
            <Reveal>
              <h2 className="s-title text-white">Send the brief</h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="s-body max-w-[40ch] text-white/75">
                The more of it you know now the faster the answer comes back. If
                the scope is not settled yet, say so and the first call is spent
                working it out.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-2">
                <p className="s-button tracking-[0.22em] text-white/50">
                  Currently taking on
                </p>
                <ul className="mt-4 border-t border-white/15">
                  {contactCopy.availability.map((item) => (
                    <li
                      key={item}
                      className="s-card-body border-b border-white/15 py-4 text-white/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] bg-white px-6 py-8 xl:px-12 xl:py-12">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- faq
          Cream, so the page lands on the alternation and the oxblood footer
          arrives against a light band rather than another dark one. */}
      <section className="bg-cream py-16 xl:py-24">
        <div className="frame flex flex-col items-center gap-8 xl:gap-12">
          <Reveal>
            <h2 className="s-title max-w-[20ch] text-center text-card-heading">
              Before you write in
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="s-body max-w-[52ch] text-center text-card-body">
              The five questions that come up most often, answered ahead of the
              first call.
            </p>
          </Reveal>

          <ul className="w-full max-w-[1000px] border-t border-oxblood/15">
            {faqs.map((faq, i) => (
              <Reveal as="li" key={faq.q} delay={0.08 + i * 0.04}>
                <details className="group border-b border-oxblood/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 xl:py-7">
                    {/* .s-subhead capitalises, which is right for a title and wrong for
                        a question: it turns "Do you work with" into "Do You Work With" */}
                    <h3 className="s-subhead normal-case text-card-heading">{faq.q}</h3>
                    <span
                      aria-hidden="true"
                      className="relative block h-5 w-5 shrink-0 text-oxblood/60 transition-colors group-hover:text-oxblood"
                    >
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded bg-current" />
                      <span className="absolute left-1/2 top-0 h-5 w-[1.5px] -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open:rotate-90" />
                    </span>
                  </summary>
                  <p className="s-body max-w-[76ch] pb-7 pr-12 text-card-body">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
