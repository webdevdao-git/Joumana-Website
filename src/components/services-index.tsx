import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { servicesPage } from "@/lib/content";

/**
 * Services, on the home page.
 *
 * Twice now this has been a set of photographs, and both times it was the
 * services page's own section a second time: that page carries the six as a
 * deck of pictures, and a home page version of the same thing is just the
 * trailer for a film you are standing outside. So there are no pictures here
 * at all.
 *
 * It is a printed contents page instead. Six cells on a ruled grid, each one a
 * number, the name set large in the display face, and the line that goes with
 * it. That is the one thing the home page does not otherwise have: between the
 * hero, the years, the articles and the reels it is picture after picture, and
 * this is where the typography is left to do the work on its own.
 *
 * The motion is the rules. Each one draws across as the row arrives rather
 * than anything moving or fading in place, which is the quietest way to make a
 * static grid feel made rather than laid out. Reach a cell and its number
 * comes up, its rule finishes in cream and the whole line steps right by a few
 * pixels.
 */
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
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

export function ServicesIndex() {
  const items = servicesPage.disciplines;

  return (
    <section className="bg-page py-12 xl:py-[3.4vw]">
      <div className="frame">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="s-title text-white">Services</h2>
          <Link
            href="/services"
            className="s-button group inline-flex items-center gap-3 text-white/55 transition-colors duration-300 hover:text-white"
          >
            All six in full
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>

        {/* two columns of three on a ruled grid. The rule belongs to the cell
            above it, so the last row in each column carries its own foot. */}
        <ul className="mt-7 grid lg:mt-[1.9vw] lg:grid-cols-2 lg:gap-x-[5%]">
          {items.map((d, i) => (
            <Reveal as="li" key={d.label} delay={(i % 2) * 0.06}>
              <Link
                href="/services"
                className="group block border-t border-white/15 py-5 transition-colors duration-500 last:border-b xl:py-[1.5vw] lg:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="flex items-start gap-5 xl:gap-[1.4vw]">
                  <span className="s-card-meta mt-1 shrink-0 text-white/40 transition-colors duration-500 group-hover:text-white/80">
                    {d.index}
                  </span>

                  <span className="block flex-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                    <span className="s-head block text-white">{d.label}</span>
                    <span className="s-card-body mt-1.5 block text-white/55 transition-colors duration-500 group-hover:text-white/80">
                      {d.head}
                    </span>
                  </span>

                  <span className="mt-1 text-white">
                    <ArrowUpRight />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
