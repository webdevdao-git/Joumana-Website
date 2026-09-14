"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
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

  return (
    <>
      {enabled && (
        <ReactLenis
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
