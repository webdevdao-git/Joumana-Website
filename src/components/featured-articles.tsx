import Link from "next/link";
import { clips } from "@/lib/content";

/**
 * Published work, six pieces, two to a row.
 *
 * The cards used to carry a thumbnail and every one of them was the same
 * placeholder, because no artwork has ever been supplied for these pieces. The
 * outlet's name takes that place instead: it is the thing a reader recognises
 * first anyway, so it is set large and it is what the card leads on.
 *
 * CONFIRM: with real artwork per piece a plate could come back above the
 * outlet line.
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

        <ul className="grid w-full max-w-[1280px] gap-4 md:grid-cols-2 xl:gap-5">
          {articles.map((article) => (
            <li key={article.title}>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col rounded-[24px] bg-card p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(0,0,0,0.6)] xl:p-8"
              >
                <div className="flex items-start justify-between gap-5 text-card-heading">
                  <span className="font-display text-[22px] font-semibold uppercase leading-[1.1] xl:text-[30px]">
                    {article.outlet}
                  </span>
                  <ArrowUpRight />
                </div>

                <p className="mt-5 flex-1 text-[17px] leading-[1.35] text-card-body xl:mt-7 xl:text-[20px]">
                  {article.title}
                </p>

                {/* the rule draws across as the card comes forward */}
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-full origin-left scale-x-[0.12] bg-rule transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 xl:mt-8"
                />

                <span className="mt-4 text-[12px] uppercase tracking-[0.14em] text-card-body-soft xl:text-[14px]">
                  {article.kind} &middot; {article.year}
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
