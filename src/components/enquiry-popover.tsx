"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";

/**
 * The card sits in the bottom right for as long as the opening screen is in
 * view. Scroll past it and it folds into a small glowing button in the same
 * corner, which opens it again.
 *
 * No timer and nothing remembered between visits: on the opening screen the
 * card is simply there, glowing on a slow pulse so it registers, and from the
 * second section down the button is. The
 * only thing held is an explicit close, and only until the page is reloaded,
 * so scrolling back up does not reopen something the visitor just shut.
 *
 * Three rules it does keep:
 *
 *  - it never appears on the contact page, which is a longer version of the
 *    same form
 *  - on every page but the home page it stays out of the opening screen
 *    entirely and only appears as the button once the visitor scrolls on,
 *    because those heroes are composed to the pixel and a card in the corner
 *    lands on top of the composition
 *  - it never appears below 768px. A popup that covers the content on a phone
 *    is an intrusive interstitial, and Google marks a site down for it.
 *
 * Like the other forms here there is no backend, so this composes an email and
 * hands it to the visitor's mail client.
 */
type Mode = "hidden" | "open" | "tab";

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
  // an explicit close, held for this page load only
  const closed = useRef(false);

  // trailingSlash is on, so the contact page arrives as "/contact/". Matching
  // the bare path alone let the card open on top of the very form it is a
  // shortcut to.
  const route = pathname.replace(/\/+$/, "") || "/";
  const muted = route === "/contact";
  /* The home page opens on a photograph with the words low and left, and the
     card has room in the corner. Every other opening screen is composed to the
     frame, so the card lands on top of the composition. It was a list of the
     two pages that existed when the rule was written, which left the journal
     pages out when they arrived; the rule is the page, not the list. */
  const heroIsOffLimits = route !== "/";

  const collapse = useCallback(() => {
    closed.current = true;
    setMode("tab");
  }, []);

  /**
   * The opening screen is the hero on the home page and the page head
   * everywhere else, so watching the first section keeps the behaviour the
   * same across the site. The observer reports straight away on observe, which
   * is what puts the card on screen without a timer.
   */
  useEffect(() => {
    if (muted) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const hero =
      document.querySelector<HTMLElement>(".hero-fill") ??
      document.querySelector<HTMLElement>("main section");

    // every page renders a section inside main, so this only fails if that
    // stops being true, in which case staying hidden is the safe outcome
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setMode("tab");
          return;
        }
        // in the opening screen: nothing at all anywhere but home,
        // the card on the rest, and the button if it was closed
        setMode(heroIsOffLimits ? "hidden" : closed.current ? "tab" : "open");
      },
      { threshold: 0.35 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [muted, heroIsOffLimits]);

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
    closed.current = true;
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
            className="card-glow fixed bottom-5 right-5 z-40 hidden w-[262px] rounded-[18px] bg-card p-4 shadow-[0_18px_44px_rgba(0,0,0,0.38)] md:block"
          >
            <button
              type="button"
              onClick={collapse}
              aria-label="Close"
              className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-card-body-soft transition-colors hover:bg-rule hover:text-card-heading"
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
            onClick={() => {
              closed.current = false;
              setMode("open");
            }}
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
