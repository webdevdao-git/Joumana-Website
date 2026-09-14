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

function Row() {
  // doubled so the -50% loop meets itself with no seam
  const run = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div aria-hidden="true" className="marquee-run flex w-max items-center">
      {run.map((logo, i) => (
        <span
          key={`${logo.src}-${i}`}
          className="relative mx-6 h-[42px] w-[125px] shrink-0 xl:mx-9 xl:h-[56px] xl:w-[170px]"
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

export function OutletBand() {
  return (
    <section
      aria-label="Publications and organisations Joumana Saad has worked with"
      className="relative overflow-hidden bg-band py-7 xl:py-9"
    >
      <div className="frame">
        <h2 className="t-section text-center text-[clamp(1.125rem,1.7vw,1.75rem)] text-on-band">
          Worked with
        </h2>
      </div>

      <div className="mt-5 overflow-hidden xl:mt-6">
        <Row />
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
