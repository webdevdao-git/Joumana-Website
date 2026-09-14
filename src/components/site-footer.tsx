import Link from "next/link";
import { site } from "@/lib/content";

/**
 * Nodes 45:1493 and 46:2545. Oxblood, the wordmark and strapline on the left,
 * contact and socials to the right, a thin copyright line underneath.
 *
 * The wordmark is set the same way as the one in the bar at the top, so the
 * page opens and closes on the same mark.
 */
export function SiteFooter() {
  return (
    <footer className="bg-oxblood text-white">
      <div className="frame py-10 xl:py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label={`${site.name}, home`}
              className="t-wordmark inline-block text-[clamp(1.25rem,2vw,1.75rem)] text-white"
            >
              Joumana Saad
            </Link>
            <p className="mt-4 text-[15px] text-white/75">
              Journalist &middot; Presenter &middot; Moderator &middot; Communications
              Specialist
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-card-heading transition-opacity hover:opacity-90"
            >
              Let&rsquo;s talk
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-[15px] font-semibold">Contact</h2>
            <p className="mt-4 text-[15px] text-white/75">
              Email:{" "}
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </p>
            <p className="text-[15px] text-white/75">
              {site.city}, {site.country}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[15px] font-semibold">Socials</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-[11px] transition-colors hover:bg-white hover:text-card-heading"
                  >
                    {s.label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="frame py-4">
          <p className="text-right text-[13px] text-white/60">
            &copy; Copyright {new Date().getFullYear()} Joumana Saad Media
          </p>
        </div>
      </div>
    </footer>
  );
}
