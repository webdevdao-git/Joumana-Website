"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";

/**
 * The small card that slides into the corner a little after the page settles.
 *
 * Three rules it follows, because a popup that ignores them is worse than no
 * popup at all:
 *
 *  - it never opens on the contact page, where the visitor is already looking
 *    at a longer version of the same form
 *  - once it is closed or sent, it stays closed. The answer is remembered, so
 *    nobody is asked twice.
 *  - it only appears on screens wide enough for it to sit beside the page
 *    rather than on top of it. Google treats a popup that covers the content
 *    on a phone as an intrusive interstitial and marks the site down for it.
 *
 * Like the other forms here there is no backend, so this composes an email and
 * hands it to the visitor's mail client.
 */
const SEEN_KEY = "js-enquiry-seen";
const DELAY = 12000;

function remember() {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // private windows and blocked storage both throw. The popup simply
    // reappears next visit, which is not worth breaking the page over.
  }
}

function alreadySeen() {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function EnquiryPopover() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    remember();
  }, []);

  useEffect(() => {
    // trailingSlash is on, so the contact page arrives as "/contact/". Matching
    // the bare path alone let the popup open on top of the very form it is a
    // shortcut to.
    const route = pathname.replace(/\/+$/, "") || "/";
    if (route === "/contact" || alreadySeen()) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const id = window.setTimeout(() => setOpen(true), DELAY);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // escape closes it, the same as any other dismissible layer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

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
    window.setTimeout(() => setOpen(false), 4000);
  }

  const field =
    "w-full border-0 border-b border-rule bg-transparent pb-2 text-[14px] text-card-body outline-none transition-colors placeholder:text-card-body-soft focus:border-card-heading";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={card}
          role="dialog"
          aria-label="Quick enquiry"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 hidden w-[320px] rounded-[20px] bg-card p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:block"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-card-body-soft transition-colors hover:bg-rule hover:text-card-heading"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {sent ? (
            <div className="py-4">
              <p className="font-display text-[16px] font-semibold uppercase tracking-[0.04em] text-card-heading">
                Thank you
              </p>
              <p className="mt-2 text-[13px] leading-[1.5] text-card-body-soft">
                Your mail app should have opened with the message filled in.
              </p>
            </div>
          ) : (
            <>
              <p className="pr-8 font-display text-[16px] font-semibold uppercase leading-tight tracking-[0.04em] text-card-heading">
                Working on something
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.45] text-card-body-soft">
                Send a line and I will come back to you within a working day.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
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
                  className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brown text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-opacity duration-300 hover:opacity-90"
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
  );
}
