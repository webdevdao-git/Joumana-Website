"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Next remounts this on every navigation, which gives us a transition without
 * needing exit animations. The flag keeps it off the very first paint, so the
 * hero is never hidden behind a panel while the page is being measured.
 */
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [isFirstPaint] = useState(() => !hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {!isFirstPaint && !reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[200] origin-top bg-brand"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
        />
      )}
      {children}
    </>
  );
}
