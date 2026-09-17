"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";

/**
 * The bar as the design draws it: Home and Services at the left, the wordmark,
 * then Work and Journal, and Contact as a white pill at the right edge.
 *
 * The three columns are 1fr / auto / 1fr, so the wordmark lands on the exact
 * centre of the page whatever the labels either side of it weigh. Spacing the
 * groups apart instead, which is what the design does on its 1728 frame, threw
 * the wordmark 91px left of centre, because the pill makes the right group
 * heavier than the left.
 *
 * The links then sit close to the wordmark rather than being pushed out to the
 * gutters, and Contact keeps its pill at the end of them.
 */
const LEFT = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

const RIGHT = [
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

  const link = (item: { label: string; href: string }) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      className="t-nav text-white transition-opacity duration-300 hover:opacity-70"
    >
      {item.label}
    </Link>
  );

  return (
    <>
      <header className="relative z-50 bg-oxblood">
        <div className="frame">
          <div className="nav-bar grid grid-cols-[1fr_auto_1fr] items-center gap-14 xl:gap-20">
            <div className="flex items-center justify-start lg:w-full">
              {/* mirrors the menu button opposite, so the two outer columns
                  weigh the same and the wordmark stays on the centre line */}
              <span aria-hidden="true" className="-ml-2 h-11 w-11 lg:hidden" />

              <nav
                className="hidden w-full items-center justify-evenly gap-8 lg:flex"
                aria-label="Primary"
              >
                {LEFT.map(link)}
              </nav>
            </div>

            <Link
              href="/"
              aria-label={`${site.name}, home`}
              className="t-wordmark whitespace-nowrap text-white"
            >
              Joumana Saad
            </Link>

            <div className="flex items-center justify-end lg:w-full lg:justify-evenly">
              <nav
                className="hidden flex-1 items-center justify-evenly gap-8 lg:flex"
                aria-label="Primary"
              >
                {RIGHT.map(link)}
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
              {[...LEFT, ...RIGHT, CONTACT].map((item) => (
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
