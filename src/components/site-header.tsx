"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";

/**
 * The wordmark holds the left gutter and every page sits at the right, with
 * Contact keeping its white pill at the end of the row.
 *
 * The design splits the links either side of a centred wordmark. That was
 * built first and went through several arrangements, none of which could hold
 * both an exactly centred name and evenly weighted sides, because the Contact
 * pill makes the right hand group heavier than the left: centred, the links
 * crowded the name; pushed to the gutters, a void opened either side of it;
 * spaced equally in one row, the name sat 182px left of the page centre.
 *
 * Anchoring the name to one edge and the navigation to the other removes the
 * problem rather than balancing it, and it is the arrangement most of this
 * kind of site uses.
 */
const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Journal", href: "/journal" },
];

const CONTACT = { label: "Contact", href: "/contact" };

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* The menu and the button are both below lg, so widening a window past it
     leaves the menu open with nothing on screen to close it, and the body
     locked with it. */
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const close = () => wide.matches && setOpen(false);
    close();
    wide.addEventListener("change", close);
    return () => wide.removeEventListener("change", close);
  }, []);

  const link = (item: { label: string; href: string }) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      className="t-nav inline-block py-1.5 text-white transition-opacity duration-300 hover:opacity-70"
    >
      {item.label}
    </Link>
  );

  return (
    <>
      <header className="relative z-50 bg-oxblood">
        <div className="frame">
          <div className="nav-bar flex items-center justify-between gap-8">
            <Link
              href="/"
              aria-label={`${site.name}, home`}
              className="t-wordmark whitespace-nowrap text-white"
            >
              Joumana Saad
            </Link>

            <div className="flex items-center justify-end">
              <nav
                className="hidden items-center gap-9 lg:flex xl:gap-12"
                aria-label="Primary"
              >
                {NAV.map(link)}
              </nav>

              <Link
                href={CONTACT.href}
                aria-current={pathname === CONTACT.href ? "page" : undefined}
                className="t-nav ml-8 hidden h-10 items-center gap-2 rounded-full bg-white px-6 text-card-heading transition-opacity duration-300 hover:opacity-90 lg:inline-flex xl:h-11 xl:px-7"
              >
                {CONTACT.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
              >
                <span className="relative block h-3.5 w-7">
                  <span
                    className={`absolute left-0 block h-px w-7 bg-current transition-all duration-300 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-7 bg-current transition-all duration-300 ${
                      open ? "opacity-0" : "top-1.5 opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-7 bg-current transition-all duration-300 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-oxblood lg:hidden"
          >
            <div className="frame flex h-full flex-col justify-center gap-8">
              {[...NAV, CONTACT].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="t-section text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
