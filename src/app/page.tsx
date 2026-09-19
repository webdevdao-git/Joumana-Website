import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { OutletBand } from "@/components/outlet-band";
import { MeetJoumana } from "@/components/meet-joumana";
import { AcrossTheYears } from "@/components/across-the-years";
import { DisciplinesDeck } from "@/components/disciplines-deck";
import { servicesPage } from "@/lib/content";
import { FeaturedArticles } from "@/components/featured-articles";
import { BroadcastStage } from "@/components/broadcast-stage";
import { ContactPanel } from "@/components/contact-panel";

export const metadata: Metadata = {
  title: {
    absolute: "Joumana Saad | Journalist, Presenter, Communications, Dubai",
  },
  description:
    "Joumana Saad is a Dubai based journalist, presenter, moderator and content specialist with over a decade across media, business, technology and communications.",
  alternates: { canonical: "/" },
};

/** The landing page, in the order the Figma file lays it out. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OutletBand />
      <MeetJoumana />
      <DisciplinesDeck items={servicesPage.disciplines} />
      <AcrossTheYears />
      <FeaturedArticles />
      <BroadcastStage />
      {/* On the cream, not the oxblood. Sitting dark it ran straight into the
          dark footer and the two read as one slab however the block itself was
          styled; a light band between them ends the page, and the footer
          begins. */}
      <ContactPanel />
    </>
  );
}
