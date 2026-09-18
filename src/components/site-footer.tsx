import Link from "next/link";
import { nav, servicesPage, site } from "@/lib/content";

/**
 * Nodes 125:3187 and 125:3217.
 *
 * On the 1728 by 421 band the design puts three blocks on one line at y100:
 * the wordmark, strapline and pill at x80 in a 591 column, Contact at x917 in
 * a 264 column, and Socials at x1426 in a 222 column, ending at 1648 which is
 * the right gutter. Below it a 54 tall brown bar carries the copyright,
 * centred.
 *
 * Those positions are held as percentages of the 1568 frame, so the columns
 * stay on their own vertical lines at every width above lg and stack below it.
 *
 * Two columns are added to the three the design draws: Services and Pages.
 * The design leaves 246px of nothing between the wordmark block and Contact,
 * and a footer with no way out of it is a footer nobody uses. The six
 * disciplines come from the same data the services page reads, so they can
 * never fall out of step. Socials stays on the line the design puts it on;
 * Contact moves left to make room.
 *
 * The social marks are the four the design names: Instagram, Facebook, X and
 * LinkedIn, in that order, each in a 48 by 48 tile of white at 13 percent.
 */
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[60%] w-[60%]">
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
    </svg>
  );
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[60%] w-[60%]">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
    </svg>
  );
}


function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[56%] w-[56%]">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91V8.48Z" />
    </svg>
  );
}

const MARKS = {
  Instagram,
  Facebook,
  LinkedIn,
} as const;

/* The design's order, which is not the order they sit in `site.socials`. The
   design also draws an X tile; she is not on X, so there are three. */
const ORDER = ["Instagram", "Facebook", "LinkedIn"] as const;

function Socials() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {ORDER.map((label) => {
        const link = site.socials.find((s) => s.label === label);
        if (!link) return null;
        const Mark = MARKS[label];
        return (
          <li key={label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center rounded-[9px] bg-white/[0.13] text-white transition-colors duration-300 hover:bg-white hover:text-oxblood"
            >
              <Mark />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Column({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[17px] leading-none text-white xl:text-[20px]">{heading}</h2>
      {children}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="bg-oxblood py-12 xl:py-[5.79vw]">
        <div className="frame">
          <div className="relative mx-auto flex max-w-[1568px] flex-col gap-10 lg:block lg:min-h-[221px] lg:gap-0">
            {/* the wordmark, what she does, and the way in */}
            <div className="lg:absolute lg:left-0 lg:top-0 lg:w-[37.7%]">
              <Link
                href="/"
                aria-label={`${site.name}, home`}
                className="t-wordmark block whitespace-nowrap text-[clamp(1.5rem,2.8vw,3.25rem)] text-white"
              >
                Joumana Saad
              </Link>

              <p className="mt-5 text-[15px] leading-none text-white xl:mt-6 xl:text-[20px]">
                Journalist &middot; Presenter &middot; Moderator &middot; Communications
                Specialist
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex h-14 w-[200px] items-center justify-center gap-2 rounded-full bg-white text-[14px] font-semibold tracking-[0.04em] text-oxblood transition-opacity duration-300 hover:opacity-90 xl:mt-8 xl:text-[16px]"
              >
                Let&rsquo;s talk
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="lg:absolute lg:left-[40%] lg:top-0 lg:w-[16%]">
              <Column heading="Services">
                <ul className="flex flex-col gap-0.5 text-[15px] leading-snug text-white/75 xl:text-[17px]">
                  {servicesPage.disciplines.map((d) => (
                    <li key={d.label}>
                      <Link
                        href="/services"
                        className="inline-block py-1 transition-colors hover:text-white"
                      >
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Column>
            </div>

            <div className="lg:absolute lg:left-[57%] lg:top-0">
              <Column heading="Pages">
                <ul className="flex flex-col gap-0.5 text-[15px] leading-snug text-white/75 xl:text-[18px]">
                  {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block py-1 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Column>
            </div>

            <div className="lg:absolute lg:left-[68%] lg:top-0 lg:w-[17%]">
              <Column heading="Contact">
                <div className="flex flex-col gap-0.5 text-[15px] leading-snug text-white/75 xl:text-[18px]">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-block py-1 transition-colors hover:text-white"
                  >
                    Email: {site.email}
                  </a>
                  <span>
                    {site.city}, {site.country === "United Arab Emirates" ? "UAE" : site.country}
                  </span>
                </div>
              </Column>
            </div>

            <div className="lg:absolute lg:right-0 lg:top-0">
              <Column heading="Socials">
                <Socials />
              </Column>
            </div>
          </div>
        </div>
      </div>

      {/* the brown bar the design closes on. Two lines rather than one now,
          the copyright at the gutter and the credit opposite it; on a phone
          they stack and the bar grows to hold them. */}
      <div className="bg-brown">
        <div className="frame flex flex-col items-center justify-between gap-1.5 py-4 text-[12px] leading-snug text-white/75 sm:h-[54px] sm:flex-row sm:gap-6 sm:py-0 sm:text-[13px] xl:text-[17px]">
          <p>&copy; Copyright {new Date().getFullYear()} Joumana Saad Media</p>
          <p className="text-center sm:text-right">
            Designed and developed by{" "}
            <a
              href="https://daomarketing.com"
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-current"
            >
              DAO Marketing Management LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
