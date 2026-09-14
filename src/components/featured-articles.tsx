import Image from "next/image";
import Link from "next/link";
import { clips } from "@/lib/content";

/**
 * Published work, six pieces, two to a row.
 *
 * Each card is one link: the thumbnail on the left, the outlet, the headline
 * and what kind of piece it was on the right. Same light card as Capabilities
 * and Meet Joumana, so the row reads as part of the same set.
 *
 * The thumbnails are the design's placeholder, in black and white, because no
 * article artwork has been supplied. CONFIRM: a still from each piece would
 * replace them one for one.
 */
const FEATURED = [
  "Jeff Koons, The King Of Kitsch",
  "Latin America, Dubai's Final Frontier",
  "New Retirement Visas Could Be A Game Changer For Expats In The UAE",
  "A New Playing Field",
  "Dubai Chamber 2017 Highlights",
  "Say Yes To The Future, Expo Bid Book",
] as const;

const articles = FEATURED.map((title) => {
  const clip = clips.find((c) => c.title === title);
  if (!clip) throw new Error(`featured article not in clips: ${title}`);
  return clip;
});

function ArrowUpRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path
        d="M7 17 17 7M8.5 7H17v8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FeaturedArticles() {
  return (
    <section className="sec bg-page">
      <div className="frame flex flex-col items-center gap-7 xl:gap-10">
        <h2 className="t-section text-center text-heading">Featured Articles</h2>

        <ul className="grid w-full max-w-[1200px] gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <li key={article.title}>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full items-stretch gap-5 rounded-[24px] bg-card p-4 transition-opacity duration-300 hover:opacity-95 xl:gap-6 xl:p-5"
              >
                <span className="relative block w-[104px] shrink-0 self-stretch overflow-hidden rounded-[16px] xl:w-[150px]">
                  <Image
                    src="/brand/conversation-placeholder.jpg"
                    alt=""
                    fill
                    sizes="132px"
                    className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-2 py-1 xl:gap-3">
                  <span className="flex items-start justify-between gap-3 text-card-heading">
                    <span className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] xl:text-[15px]">
                      {article.outlet}
                    </span>
                    <ArrowUpRight />
                  </span>

                  <span className="text-[17px] font-semibold leading-[1.3] text-card-body xl:text-[20px]">
                    {article.title}
                  </span>

                  <span className="mt-auto text-[13px] leading-[1.3] text-card-body-soft xl:text-[15px]">
                    {article.kind}, {article.year}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:text-[18px]"
        >
          View All Published Work
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
