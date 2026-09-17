import Image from "next/image";
import Link from "next/link";
import { workPage } from "@/lib/content";

/**
 * Published work, six pieces, three to a row.
 *
 * The list is the work page's own, so the two cannot drift: the same six
 * pieces, in the same order, carrying the same plates. It used to be a
 * separate six picked out of `clips` by title, which meant the home page and
 * the work page could disagree about what her featured work is.
 *
 * The cards led on the outlet's name with no picture at all, because no
 * artwork had ever been supplied for these pieces. The plate is back above it
 * now that there is one per piece.
 */
const articles = workPage.articles.items;

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1 xl:h-7 xl:w-7"
    >
      <path
        d="M7 17 17 7M8.5 7H17v8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FeaturedArticles() {
  return (
    <section className="bg-page py-10 lg:py-0">
      {/* The padding and the gaps live on the inner wrapper, not on the box
          itself: an element cannot size itself in its own container units, so
          cqw set here would silently fall back to the viewport and the content
          would outgrow the box it is meant to fit inside. */}
      <div
        className="fit-flow mx-auto max-w-[1728px]"
        style={{ "--fit-w": 1728, "--fit-h": 1250, "--fit-reserve": "0px" } as React.CSSProperties}
      >
        <div className="flex flex-col items-center gap-6 px-6 md:px-10 lg:gap-[2.1cqw] lg:px-[4.63cqw] lg:py-[2.1cqw]">
        <h2 className="t-section text-center text-heading">Featured Articles</h2>

        <ul className="grid w-full max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[1.04cqw]">
          {articles.map((article) => (
            <li key={`${article.outlet}-${article.title}`}>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col rounded-[24px] bg-card p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(0,0,0,0.6)] lg:p-[1.16cqw]"
              >
                <span className="relative block aspect-[16/9] w-full overflow-hidden rounded-[14px]">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </span>

                <div className="mt-4 flex items-start justify-between gap-5 text-card-heading lg:mt-[0.93cqw]">
                  <span className="fa-outlet font-display text-[19px] font-semibold uppercase leading-[1.1]">
                    {article.outlet}
                  </span>
                  <ArrowUpRight />
                </div>

                <p className="fa-title mt-2 flex-1 text-[16px] leading-[1.35] text-card-body lg:mt-[0.46cqw]">
                  {article.title}
                </p>

                {/* the rule draws across as the card comes forward */}
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-full origin-left scale-x-[0.12] bg-rule transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 lg:mt-[0.93cqw]"
                />

                <span className="fa-meta mt-3 text-[12px] uppercase tracking-[0.14em] text-card-body-soft lg:mt-[0.69cqw]">
                  {article.meta}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="fa-cta inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold uppercase text-white transition-colors duration-300 hover:bg-cream hover:text-oxblood"
        >
          View All Published Work
          <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
