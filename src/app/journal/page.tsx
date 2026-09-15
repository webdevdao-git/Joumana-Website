import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero } from "@/components/page-kit";
import { BreadcrumbSchema } from "@/components/schema";
import { journal, pageCopy } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "Journal | Notes on Journalism, Hosting and the Gulf" },
  description:
    "Short pieces by Joumana Saad on newsroom craft, interviewing, bilingual hosting and how the business story of Dubai is actually changing.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal | Joumana Saad",
    description:
      "Notes from the newsroom and the stage: craft, interviewing and the Gulf business story.",
    url: "/journal",
    images: [{ url: "/images/portrait-studio.jpg", width: 800, height: 1200, alt: "Joumana Saad, Dubai" }],
  },
};

function Meta({ post }: { post: (typeof journal)[number] }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.14em] text-card-body-soft xl:text-[13px]">
      <span className="font-semibold text-card-heading">{post.category}</span>
      <span aria-hidden="true">&middot;</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">&middot;</span>
      <span>{post.minutes} min read</span>
    </span>
  );
}

export default function JournalPage() {
  const [lead, ...rest] = journal;

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Journal", href: "/journal" }]} />

      <PageHero {...pageCopy.journal} />

      {/* the most recent piece, given the room it deserves */}
      <section className="bg-page pb-4 xl:pb-6">
        <div className="frame">
          <Reveal>
            <Link
              href={`/journal/${lead.slug}`}
              className="group grid overflow-hidden rounded-[24px] bg-card lg:grid-cols-[1fr_minmax(0,560px)]"
            >
              <div className="flex flex-col gap-4 p-6 lg:justify-center xl:gap-6 xl:p-12">
                <Meta post={lead} />
                <h2 className="font-display text-[26px] font-semibold uppercase leading-[1.12] text-card-heading xl:text-[40px]">
                  {lead.title}
                </h2>
                <p className="max-w-[50ch] text-[16px] leading-[1.5] text-card-body xl:text-[20px]">
                  {lead.standfirst}
                </p>
                <span className="mt-1 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-card-heading">
                  Read the piece
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </div>

              <figure className="relative order-first aspect-[16/10] w-full lg:order-none lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-[center_22%] grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </figure>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* everything else */}
      <section className="sec bg-page">
        <div className="frame">
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-card"
                >
                  <figure className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-[center_22%] grayscale transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </figure>

                  <div className="flex flex-1 flex-col gap-3 p-6 xl:p-7">
                    <Meta post={post} />
                    <h2 className="font-display text-[19px] font-semibold uppercase leading-[1.2] text-card-heading xl:text-[23px]">
                      {post.title}
                    </h2>
                    <p className="text-[15px] leading-[1.5] text-card-body-soft xl:text-[16px]">
                      {post.standfirst}
                    </p>
                    <span className="mt-auto pt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-card-heading">
                      Read
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Want one of these written for you"
        lede="Thought leadership, bylined opinion and executive ghost writing are a regular part of the work."
        label="Start a conversation"
      />
    </>
  );
}
