import { site } from "@/lib/content";

const WORDS: Record<number, string> = {
  10: "Ten", 11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen",
  15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen",
  19: "Nineteen", 20: "Twenty", 21: "Twenty one", 22: "Twenty two",
  23: "Twenty three", 24: "Twenty four", 25: "Twenty five",
  26: "Twenty six", 27: "Twenty seven", 28: "Twenty eight",
  29: "Twenty nine", 30: "Thirty",
};

/**
 * How long she has been doing this, spelled out.
 *
 * Counted from the year she started rather than written down, because a
 * written figure is only right until the end of December. Three different
 * ones were live on this site at once before it was tracked to a date: 13+
 * on the home page, nineteen on the work page and more than 15 in the
 * services design.
 *
 * The count is fixed when the site is built, so it steps forward on the first
 * deploy of each new year.
 */
export function yearsIn(): string {
  const n = new Date().getFullYear() - site.careerStart;
  return WORDS[n] ?? String(n);
}
