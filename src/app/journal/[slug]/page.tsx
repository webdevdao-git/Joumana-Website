import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { CtaBand, Pill } from "@/components/page-kit";
import { BreadcrumbSchema } from "@/components/schema";
import { journal, site } from "@/lib/content";
import { formatDate } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return journal.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: { absolute: `${post.title} | Joumana Saad` },
    description: post.standfirst,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.standfirst,
      url: `/journal/${post.slug}`,
      publishedTime: post.date,
      authors: [site.name],
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = journal.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const post = journal[index];
  const next = journal[(index + 1) % journal.length];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Journal", href: "/journal" },
          { name: post.title, href: `/journal/${post.slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.standfirst,
            datePublished: post.date,
            dateModified: post.date,
            image: `${site.url}${post.image}`,
            author: { "@type": "Person", name: site.name, url: site.url },
            publisher: { "@type": "Organization", name: site.legalName },
            mainEntityOfPage: `${site.url}/journal/${post.slug}`,
          }),
        }}
      />

      {/* ------------------------------------------------------------ head */}
      <article>
        <header className="bg-page pb-10 pt-12 xl:pb-14 xl:pt-20">
          <div className="frame flex flex-col items-center gap-5 text-center xl:gap-7">
            <Link
              href="/journal"
              className="t-nav inline-block py-1.5 text-body-soft transition-opacity hover:opacity-70"
            >
              <span aria-hidden="true">&larr;</span> Journal
            </Link>

            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] tracking-[0.14em] text-body-soft xl:text-[13px]">
              <span className="font-semibold text-heading">{post.category}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.minutes} min read</span>
            </p>

            <h1 className="t-section max-w-[20ch] text-heading">{post.title}</h1>

            <p className="max-w-[58ch] text-[17px] leading-[1.5] text-body-soft xl:text-[21px]">
              {post.standfirst}
            </p>
          </div>
        </header>

        {/* --------------------------------------------------------- plate */}
        <div className="frame">
          <Reveal>
            <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-card">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_22%] grayscale"
              />
            </figure>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------- body */}
        <div className="sec bg-page">
          <div className="frame">
            <div className="mx-auto max-w-[760px] rounded-[24px] bg-card px-6 py-10 xl:px-14 xl:py-16">
              {post.body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="mt-10 font-display text-[21px] font-semibold uppercase leading-[1.2] text-card-heading first:mt-0 xl:mt-14 xl:text-[26px]"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-10 border-l-2 border-card-heading pl-6 xl:my-14 xl:pl-8"
                    >
                      <p className="font-display text-[20px] font-light leading-[1.35] text-card-heading xl:text-[26px]">
                        {block.text}
                      </p>
                    </blockquote>
                  );
                }

                return (
                  <p
                    key={i}
                    className="mt-5 text-[17px] leading-[1.65] text-card-body first:mt-0 xl:text-[19px]"
                  >
                    {block.text}
                  </p>
                );
              })}

              <footer className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-rule pt-7 xl:mt-16">
                <p className="text-[14px] leading-snug text-card-body-soft">
                  Written by {site.name}, {site.city}.
                </p>
                <Pill href="/contact" tone="brown">
                  Work with me
                </Pill>
              </footer>
            </div>
          </div>
        </div>
      </article>

      {/* ------------------------------------------------------------- next */}
      <section className="sec bg-page pt-0">
        <div className="frame">
          <Reveal>
            <Link
              href={`/journal/${next.slug}`}
              className="group grid overflow-hidden rounded-[24px] bg-card sm:grid-cols-[minmax(0,220px)_1fr]"
            >
              <figure className="relative aspect-[16/10] w-full sm:aspect-auto sm:min-h-[210px]">
                <Image
                  src={next.image}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover object-[center_22%] grayscale transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </figure>

              <div className="flex flex-col justify-center gap-2 p-6 xl:p-8">
                <span className="text-[12px] font-semibold tracking-[0.16em] text-card-body-soft">
                  Read next
                </span>
                <h2 className="font-display text-[20px] font-semibold uppercase leading-[1.2] text-card-heading xl:text-[26px]">
                  {next.title}
                </h2>
                <p className="max-w-[54ch] text-[15px] leading-[1.5] text-card-body-soft">
                  {next.standfirst}
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
