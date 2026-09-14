"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";

/**
 * Node 45:1239. Oxblood bar, two links, the wordmark, two links.
 *
 * The three columns are laid out 1fr / auto / 1fr, so the wordmark lands on the
 * exact centre of the page whatever the labels either side of it weigh. The
 * links then hug the wordmark instead of being thrown out to the gutters.
 */
const LEFT = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
];

const RIGHT = [
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

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
          <div className="nav-bar grid grid-cols-[1fr_auto_1fr] items-center gap-10 xl:gap-20">
            <div className="flex items-center justify-start lg:justify-end">
              {/* mirrors the menu button opposite, so the two outer columns
                  weigh the same and the wordmark stays on the centre line */}
              <span aria-hidden="true" className="-ml-2 h-11 w-11 lg:hidden" />

              <nav
                className="hidden items-center gap-6 lg:flex"
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

            <div className="flex items-center justify-end lg:justify-start">
              <nav
                className="hidden items-center gap-6 lg:flex"
                aria-label="Primary"
              >
                {RIGHT.map(link)}
              </nav>

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
              {[...LEFT, ...RIGHT].map((item) => (
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
