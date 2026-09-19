/**
 * How long she has been doing this.
 *
 * Counted from the year she started rather than written down, because a
 * written figure is only right until the end of December, and because four
 * different ones were live on this site at once before it was tracked to a
 * date: 13+ on the home page, nineteen on the work page, more than 15 in the
 * services design and over 18 in her own introduction. Everything that states
 * a figure now reads it from here, so the site can only ever say one number.
 *
 * The count is fixed when the site is built, so it steps forward on the first
 * deploy of each new year.
 *
 * This lives here rather than in content.ts because content.ts reads it. The
 * dependency has to point one way or the two modules import each other.
 */

/** Al Jazeera, the first newsroom, which is where the timeline opens. */
export const CAREER_START = 2006;

const WORDS: Record<number, string> = {
  10: "Ten", 11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen",
  15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen",
  19: "Nineteen", 20: "Twenty", 21: "Twenty one", 22: "Twenty two",
  23: "Twenty three", 24: "Twenty four", 25: "Twenty five",
  26: "Twenty six", 27: "Twenty seven", 28: "Twenty eight",
  29: "Twenty nine", 30: "Thirty",
};

export function yearsInDigits(): number {
  return new Date().getFullYear() - CAREER_START;
}

/** Spelled out and capitalised: "Twenty". Lowercase it for running prose. */
export function yearsIn(): string {
  const n = yearsInDigits();
  return WORDS[n] ?? String(n);
}
