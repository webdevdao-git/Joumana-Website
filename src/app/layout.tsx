import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Parisienne } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EnquiryPopover } from "@/components/enquiry-popover";
import { PersonSchema } from "@/components/schema";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/content";
import "./globals.css";

/* The design calls for Oakes Grotesk Medium and Mikea Demo. Neither file has
   been supplied, so these two stand in and carry the same CSS variables. When
   the real files arrive, add @font-face rules in globals.css and point
   --font-oakes and --font-script-stack at them; nothing else changes. */

const oakesStandIn = Hanken_Grotesk({
  variable: "--font-oakes",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const scriptStandIn = Parisienne({
  variable: "--font-script-stack",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Joumana Saad | Freelance Journalist, Editor and Content Specialist in Dubai",
    template: "%s | Joumana Saad",
  },
  description:
    "Joumana Saad is an American freelance journalist, editor and bilingual MC based in Dubai. Business and finance reporting, content strategy, editorial services and PR for clients across the Gulf.",
  keywords: [
    "freelance journalist Dubai",
    "content writer Dubai",
    "bilingual MC Dubai",
    "panel moderator UAE",
    "PR consultant Dubai",
    "freelance editor Middle East",
    "Arabic English event host",
    "corporate report writer UAE",
    "media training Dubai",
    "Joumana Saad",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.legalName,
    title:
      "Joumana Saad | Freelance Journalist, Editor and Content Specialist in Dubai",
    description:
      "Business and finance reporting, content strategy, editorial services and bilingual event hosting from a journalist with close to two decades in newsrooms in New York and Dubai.",
    images: [
      {
        url: "/images/headshot-wide.jpg",
        width: 1700,
        height: 850,
        alt: "Joumana Saad, freelance journalist and content specialist based in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joumana Saad | Freelance Journalist and Content Specialist, Dubai",
    description:
      "Business journalism, content strategy and bilingual event hosting in Dubai.",
    creator: "@joumanasaad",
    images: ["/images/headshot-wide.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "journalism",
};

export const viewport: Viewport = {
  themeColor: "#48110c",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oakesStandIn.variable} ${scriptStandIn.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-oxblood focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
        <EnquiryPopover />
        <PersonSchema />
      </body>
    </html>
  );
}
