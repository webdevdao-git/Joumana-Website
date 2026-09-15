"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";

/**
 * A small card that opens in the corner while the visitor is still on the
 * opening screen, then folds away into a glowing button once they scroll on or
 * close it. The button stays for the rest of the visit, so the form is never
 * more than one click away and nothing has to interrupt them twice.
 *
 * Three rules it follows, because a popup that ignores them is worse than no
 * popup at all:
 *
 *  - it never appears on the contact page, which is a longer version of the
 *    same form
 *  - it opens on its own only once. After that the button is the way in.
 *  - it only appears from 768px up. A popup that covers the content on a phone
 *    is an intrusive interstitial, and Google marks a site down for it.
 *
 * Like the other forms here there is no backend, so this composes an email and
 * hands it to the visitor's mail client.
 */
type Mode = "hidden" | "open" | "tab";

const OPENED_KEY = "js-enquiry-opened";

/* Long enough to clear the hero landing, short enough that the visitor is
   still looking at the first screen when it arrives. */
const DELAY = 4000;

function remember() {
  try {
    window.localStorage.setItem(OPENED_KEY, "1");
  } catch {
    // private windows and blocked storage both throw. The card simply opens
    // again next visit, which is not worth breaking the page over.
  }
}

function alreadyOpened() {
  try {
    return window.localStorage.getItem(OPENED_KEY) === "1";
  } catch {
    return false;
  }
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 7.5 8 5.5 8-5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EnquiryPopover() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("hidden");
  const [sent, setSent] = useState(false);
  const inHero = useRef(true);

  // trailingSlash is on, so the contact page arrives as "/contact/". Matching
  // the bare path alone let the card open on top of the very form it is a
  // shortcut to.
  const route = pathname.replace(/\/+$/, "") || "/";
  const muted = route === "/contact";

  const collapse = useCallback(() => {
    setMode("tab");
    remember();
  }, []);

  /**
   * The card belongs to the opening screen. The first section of the page is
   * the hero on the home page and the page head everywhere else, so watching
   * that one element keeps the behaviour the same across the site.
   */
  useEffect(() => {
    if (muted) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const hero =
      document.querySelector<HTMLElement>(".hero-fill") ??
      document.querySelector<HTMLElement>("main section");

    let observer: IntersectionObserver | undefined;

    if (hero) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inHero.current = entry.isIntersecting;
          // scrolling on folds the card away rather than leaving it hanging
          // over the middle of the page
          if (!entry.isIntersecting) {
            setMode((m) => (m === "open" ? "tab" : m));
          }
        },
        { threshold: 0.35 },
      );
      observer.observe(hero);
    }

    const id = window.setTimeout(() => {
      if (alreadyOpened()) {
        setMode("tab");
        return;
      }
      setMode(inHero.current ? "open" : "tab");
      remember();
    }, DELAY);

    return () => {
      window.clearTimeout(id);
      observer?.disconnect();
    };
  }, [muted]);

  useEffect(() => {
    if (mode !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, collapse]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Enquiry from ${get("name") || "the website"}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    remember();
    window.setTimeout(() => setMode("tab"), 3500);
  }

  if (muted) return null;

  const field =
    "w-full border-0 border-b border-rule bg-transparent pb-1.5 text-[13px] text-card-body outline-none transition-colors placeholder:text-card-body-soft focus:border-card-heading";

  return (
    <>
      <AnimatePresence>
        {mode === "open" && (
          <motion.div
            role="dialog"
            aria-label="Quick enquiry"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-40 hidden w-[262px] rounded-[18px] bg-card p-4 shadow-[0_18px_44px_rgba(0,0,0,0.38)] md:block"
          >
            <button
              type="button"
              onClick={collapse}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-card-body-soft transition-colors hover:bg-rule hover:text-card-heading"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {sent ? (
              <div className="py-3">
                <p className="font-display text-[14px] font-semibold uppercase tracking-[0.04em] text-card-heading">
                  Thank you
                </p>
                <p className="mt-1.5 text-[12px] leading-[1.45] text-card-body-soft">
                  Your mail app should have opened with the message filled in.
                </p>
              </div>
            ) : (
              <>
                <p className="pr-7 font-display text-[14px] font-semibold uppercase leading-tight tracking-[0.04em] text-card-heading">
                  Working on something
                </p>
                <p className="mt-1 text-[12px] leading-[1.4] text-card-body-soft">
                  Send a line, I reply within a working day.
                </p>

                <form onSubmit={handleSubmit} className="mt-3.5 flex flex-col gap-3">
                  <div>
                    <label htmlFor="pop-name" className="sr-only">
                      Your name
                    </label>
                    <input
                      id="pop-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor="pop-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="pop-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Email"
                      className={field}
                    />
                  </div>

                  <div>
                    <label htmlFor="pop-message" className="sr-only">
                      What do you need
                    </label>
                    <textarea
                      id="pop-message"
                      name="message"
                      rows={2}
                      required
                      placeholder="What do you need?"
                      className={`${field} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-0.5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brown text-[12px] font-semibold uppercase tracking-[0.06em] text-white transition-opacity duration-300 hover:opacity-90"
                  >
                    Send
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === "tab" && (
          <motion.button
            type="button"
            onClick={() => setMode("open")}
            aria-label="Open the enquiry form"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="tab-glow fixed bottom-5 right-5 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-brown text-cream ring-1 ring-cream/30 transition-colors duration-300 hover:bg-oxblood md:flex"
          >
            <MailIcon />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
