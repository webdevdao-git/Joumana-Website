import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { Reveal } from "@/components/reveal";
import { BreadcrumbSchema } from "@/components/schema";
import { journalPage } from "@/lib/content";

/**
 * Node 176:1377, the page the Explore the Journal button opens.
 *
 * A static segment, so it takes precedence over the [slug] route beside it
 * and the individual pieces keep their own URLs.
 *
 * The design states plainly that nothing is published yet, so the page is
 * marked noindex: a coming soon page that ranks is a coming soon page in
 * search results. Lift the robots block the day the first piece goes up.
 */
export const metadata: Metadata = {
  title: { absolute: "The Journal | Joumana Saad" },
  description:
    "An evolving collection of Joumana Saad's writing, observations and conversations. New pieces will be added soon.",
  alternates: { canonical: "/journal/all" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "The Journal | Joumana Saad",
    description:
      "An evolving collection of writing, observations and conversations. New pieces will be added soon.",
    url: "/journal/all",
    images: [
      { url: "/images/journal/newsstand.webp", width: 1800, height: 1348, alt: "The Journal" },
    ],
  },
};

export default function TheJournalPage() {
  const { hero, kicker, heading, body, cta } = journalPage.all;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Journal", href: "/journal" },
          { name: "The Journal", href: "/journal/all" },
        ]}
      />

      {/* --------------------------------------------------------------- hero
          929 tall on the 1728 frame, the picture full bleed under a black
          57% wash, the title centred on it at 96px */}
      <section
        className="fit-hero relative flex min-h-[56svh] items-center overflow-hidden bg-black lg:min-h-0"
        style={{ "--fit-w": 1728, "--fit-h": 929 } as React.CSSProperties}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-black/[0.57]" />
        <div className="frame relative">
          <h1 className="s-hero text-center text-white">{hero.heading}</h1>
        </div>
      </section>

      {/* --------------------------------------------------------- coming soon
          612 tall, oxblood. Kicker at 64, the line under it at 40, the copy
          on an 846 measure and the button centred below. */}
      <section className="bg-page py-16 xl:py-24">
        <div className="frame flex flex-col items-center gap-8 xl:gap-12">
          <Reveal>
            <p className="s-title text-center text-white">{kicker}</p>
          </Reveal>

          <div className="flex flex-col items-center gap-6 xl:gap-8">
            <Reveal delay={0.06}>
              <h2 className="s-head text-center text-white">{heading}</h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="s-body max-w-[52ch] text-center text-white">{body}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <Link
                href={cta.href}
                className="s-button inline-flex h-[48px] items-center justify-center gap-3 rounded-full bg-brown px-7 text-white transition-opacity duration-300 hover:opacity-90 xl:h-14 xl:px-8"
              >
                {cta.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
