"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Inertial scrolling. This is what makes the rest of the motion on the site
 * read as one continuous piece rather than a stack of separate animations.
 * Reduced motion and touch pointers get native scrolling instead.
 *
 * Lenis is rendered as a sibling rather than a wrapper. With `root` it binds to
 * the document anyway, and keeping it out of the tree means the whole page is
 * not torn down and remounted the moment the media query resolves.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const lenis = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!reduced.matches && !coarse.matches);
    update();
    reduced.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  /**
   * A new page starts at the top.
   *
   * Next resets window.scrollY on a route change, but Lenis holds its own
   * position and writes it back on the next frame, so a link followed while
   * the page was still gliding landed on the new page at the old page's
   * offset: 3564px down the work page, from the foot of the home timeline.
   *
   * A hash is left alone. /services#podcasts is asking for a place on the
   * page, and the deck scrolls itself there.
   */
  useEffect(() => {
    if (window.location.hash) return;
    lenis.current?.lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return (
    <>
      {enabled && (
        <ReactLenis
          ref={lenis}
          root
          options={{
            duration: 1.15,
            lerp: 0.09,
            wheelMultiplier: 0.9,
            smoothWheel: true,
          }}
        />
      )}
      {children}
    </>
  );
}
