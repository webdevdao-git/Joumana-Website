import Image from "next/image";

/**
 * Node 45:1267. Soft panel, copy on the left, the cut out portrait on the
 * right. "Meet" is IvyPresto Light in oxblood at 64px; the name sits over it
 * in the script face at 77px, offset the way the design places it.
 */
const COPY = [
  "Joumana Saad is a Dubai-based journalist, presenter, moderator and content specialist with 13+ years of experience across media, business, technology and communications.",
  "For more than 13 years, I've worked across journalism, broadcasting, public relations and content, covering business, finance, technology and the people shaping the region.",
  "From interviewing global leaders and reporting for international publications to hosting corporate events and moderating high-profile conversations, my work sits at the intersection of storytelling, communication and connection.",
];

export function MeetJoumana() {
  return (
    <section className="relative bg-card pb-14 xl:pb-20">
      <div className="frame">
        {/* the design nests a 40px inset inside the 80px frame and sets a 40px
            gap between the copy and the portrait */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,765fr)_minmax(0,703fr)] lg:gap-10 lg:px-10">
          <div className="sec flex flex-col gap-8">
            <h2 className="relative">
              <span className="t-section block text-card-heading">Meet</span>
              <span className="t-script mt-1 block text-[clamp(2rem,3.6vw,3.5rem)] text-card-heading lg:absolute lg:left-[150px] lg:top-[18px] lg:mt-0">
                Joumana Saad
              </span>
            </h2>

            <div className="flex flex-col gap-5 lg:mt-10">
              {COPY.map((para) => (
                <p
                  key={para}
                  className="text-[17px] leading-[1.3] text-card-body lg:text-[24px]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* The design places this at top: -73.74px inside a 1054px frame, so
              the portrait rides up over the band above rather than starting at
              the panel edge. Kept proportional to the trimmed section height. */}
          <div className="fade-into-panel relative -mt-10 h-[380px] self-end lg:-mt-14 lg:h-[560px] xl:-mt-[74px] xl:h-[640px]">
            <Image
              src="/brand/portrait-cutout.png"
              alt="Joumana Saad"
              fill
              sizes="(max-width: 1024px) 100vw, 703px"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
