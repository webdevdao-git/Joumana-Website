import { site, services, experience, aboutCopy } from "@/lib/content";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Person + WebSite graph, rendered once in the root layout. */
export function PersonSchema() {
  const personId = `${site.url}/#person`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": personId,
            name: site.name,
            url: site.url,
            image: `${site.url}/images/headshot-wide.jpg`,
            jobTitle: site.role,
            description:
              "Communications specialist, journalist and presenter in Dubai. Senior Communications Manager at the Dubai Department of Economy and Tourism, with a newsroom career that began at Forbes in New York in 2007.",
            email: `mailto:${site.email}`,
            nationality: { "@type": "Country", name: "United States" },
            knowsLanguage: ["en", "ar", "es"],
            address: {
              "@type": "PostalAddress",
              addressLocality: site.city,
              addressRegion: site.region,
              addressCountry: "AE",
            },
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: aboutCopy.education.school,
            },
            worksFor: experience.slice(0, 1).map((role) => ({
              "@type": "Organization",
              name: role.org,
            })),
            knowsAbout: [
              "Financial journalism",
              "Business reporting",
              "Technology writing",
              "Content strategy",
              "Public relations",
              "Event hosting and moderation",
              "Media training",
            ],
            sameAs: site.socials.map((s) => s.href),
          },
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.legalName,
            publisher: { "@id": personId },
            inLanguage: "en",
          },
          {
            "@type": "ProfessionalService",
            "@id": `${site.url}/#service`,
            name: site.legalName,
            url: site.url,
            image: `${site.url}/images/headshot-wide.jpg`,
            founder: { "@id": personId },
            email: `mailto:${site.email}`,
            areaServed: [
              { "@type": "Country", name: "United Arab Emirates" },
              { "@type": "Place", name: "Gulf Cooperation Council" },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: site.city,
              addressCountry: "AE",
            },
            priceRange: "$$$",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Editorial and communications services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.summary,
                },
              })),
            },
          },
        ],
      }}
    />
  );
}

/** Breadcrumbs for any page below the root. */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", href: "/" },
          ...items,
        ].map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.href === "/" ? "" : item.href}`,
        })),
      }}
    />
  );
}

export function FaqSchema({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}
