import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { OutletBand } from "@/components/outlet-band";
import { MeetJoumana } from "@/components/meet-joumana";
import { AcrossTheYears } from "@/components/across-the-years";
import { Capabilities } from "@/components/capabilities";
import { FeaturedArticles } from "@/components/featured-articles";
import { BroadcastStage } from "@/components/broadcast-stage";
import { ContactBlock } from "@/components/contact-block";

export const metadata: Metadata = {
  title: {
    absolute:
      "Joumana Saad | Journalist, Presenter, Moderator and Communications Specialist in Dubai",
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
      <AcrossTheYears />
      <Capabilities />
      <FeaturedArticles />
      <BroadcastStage />
      <ContactBlock />
    </>
  );
}
