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
    <section className="sec bg-page">
      <div className="frame flex flex-col items-center gap-8 xl:gap-11">
        <h2 className="t-section text-center text-heading">Featured Articles</h2>

        <ul className="grid w-full max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {articles.map((article) => (
            <li key={`${article.outlet}-${article.title}`}>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col rounded-[24px] bg-card p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(0,0,0,0.6)] xl:p-6"
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[14px]">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </span>

                <div className="mt-5 flex items-start justify-between gap-5 text-card-heading xl:mt-6">
                  <span className="font-display text-[19px] font-semibold uppercase leading-[1.1] xl:text-[23px]">
                    {article.outlet}
                  </span>
                  <ArrowUpRight />
                </div>

                <p className="mt-3 flex-1 text-[16px] leading-[1.35] text-card-body xl:text-[18px]">
                  {article.title}
                </p>

                {/* the rule draws across as the card comes forward */}
                <span
                  aria-hidden="true"
                  className="mt-5 block h-px w-full origin-left scale-x-[0.12] bg-rule transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 xl:mt-6"
                />

                <span className="mt-4 text-[12px] uppercase tracking-[0.14em] text-card-body-soft xl:text-[14px]">
                  {article.meta}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold uppercase text-white transition-colors duration-300 hover:bg-cream hover:text-oxblood xl:h-16 xl:text-[18px]"
        >
          View All Published Work
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
