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
      "Joumana Saad | Communications Specialist, Journalist and Presenter in Dubai",
    template: "%s | Joumana Saad",
  },
  description:
    "Joumana Saad is a communications specialist, journalist and presenter in Dubai. Senior Communications Manager at the Dubai Department of Economy and Tourism, with a newsroom career that began at Forbes in New York in 2007.",
  keywords: [
    "communications specialist Dubai",
    "content writer Dubai",
    "bilingual MC Dubai",
    "panel moderator UAE",
    "PR consultant Dubai",
    "corporate communications Dubai",
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
      "Joumana Saad | Communications Specialist, Journalist and Presenter in Dubai",
    description:
      "Communications strategy, editorial and bilingual presenting from a journalist whose newsroom career began at Forbes in New York in 2007.",
    images: [
      {
        url: "/images/headshot-wide.jpg",
        width: 1700,
        height: 850,
        alt: "Joumana Saad, communications specialist, journalist and presenter in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joumana Saad | Communications Specialist and Journalist, Dubai",
    description:
      "Business journalism, content strategy and bilingual event hosting in Dubai.",
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
