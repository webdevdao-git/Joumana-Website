import Image from "next/image";

/**
 * Node 45:1258. Oxblood band with the logo row. The design shows a static row;
 * here it runs as a continuous marquee that never pauses, so the full set is
 * visible on any screen width.
 *
 * Each file is exported onto a canvas the same shape as the tile, with the mark
 * already scaled for optical weight: a one line wordmark like Forbes is set
 * shorter than a stacked lockup like Dubai Economy and Tourism, because at
 * equal height the wordmark reads twice as loud. That means the tile below can
 * stay one fixed box for every logo.
 */
const LOGOS = [
  { src: "/brand/logo-forbes.png", alt: "Forbes" },
  { src: "/brand/logo-dubai-chamber.png", alt: "Dubai Chamber of Commerce" },
  { src: "/brand/logo-arn.png", alt: "ARN News Centre" },
  { src: "/brand/logo-dubai-eye.png", alt: "Dubai Eye 103.8" },
  { src: "/brand/logo-cpi-media.png", alt: "CPI Media Group" },
  { src: "/brand/logo-dubai-economy-tourism.png", alt: "Dubai Economy and Tourism" },
  { src: "/brand/logo-dubai-economy.png", alt: "Dubai Economy" },
];

function Row({ full = false }: { full?: boolean }) {
  // doubled so the -50% loop meets itself with no seam
  const run = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div aria-hidden="true" className="marquee-run flex w-max items-center">
      {run.map((logo, i) => (
        <span
          key={`${logo.src}-${i}`}
          className={
            full
              ? "relative mx-5 h-[86px] w-[150px] shrink-0 xl:mx-[0.7vw] xl:h-[8.62vw] xl:w-[15.05vw]"
              : "relative mx-6 h-[42px] w-[125px] shrink-0 xl:mx-9 xl:h-[56px] xl:w-[170px]"
          }
        >
          <Image
            src={logo.src}
            alt=""
            fill
            sizes="210px"
            className="object-contain"
          />
        </span>
      ))}
    </div>
  );
}

export function OutletBand({
  heading = "Worked with",
  size = "compact",
}: {
  heading?: string;
  /** compact is the home page's cut down band, full is the design's 483. */
  size?: "compact" | "full";
}) {
  const full = size === "full";
  return (
    <section
      aria-label="Publications and organisations Joumana Saad has worked with"
      className={`relative overflow-hidden bg-band ${full ? "py-10 xl:py-[5.79vw]" : "py-10 xl:py-14"}`}
    >
      <div className="frame">
        <h2
          className={
            full
              ? "s-title text-center text-white"
              : "t-section text-center text-[clamp(1.125rem,1.7vw,1.75rem)] text-on-band"
          }
        >
          {heading}
        </h2>
      </div>

      <div className={full ? "mt-8 overflow-hidden xl:mt-[3.1vw]" : "mt-7 overflow-hidden xl:mt-9"}>
        <Row full={full} />
      </div>

      {/* the real list, for crawlers and screen readers */}
      <ul className="sr-only">
        {LOGOS.map((l) => (
          <li key={l.src}>{l.alt}</li>
        ))}
      </ul>
    </section>
  );
}
