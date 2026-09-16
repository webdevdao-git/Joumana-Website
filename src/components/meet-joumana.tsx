import Image from "next/image";

/**
 * Node 45:1267. Soft panel, copy on the left, the cut out portrait on the
 * right. "Meet" is IvyPresto Light in oxblood at 64px; the name sits over it
 * in the script face at 77px, offset the way the design places it.
 */
/**
 * Written from her LinkedIn record, which Priya supplied, so every role, date
 * and remit below is verifiable.
 *
 * It is also all third person. The block used to open "Joumana Saad is a
 * Dubai-based journalist" and then switch to "For more than 13 years, I've
 * worked", which read as two people. Third person is what the services and
 * work pages use, so the site now holds one voice throughout.
 *
 * The figure is a date rather than a count. "13+ years" sat on the home page
 * against "nineteen years" on the work page and "more than 15 years" in the
 * services design. She began at Forbes in 2007, and a date cannot drift.
 */
const COPY = [
  "Joumana Saad is a communications specialist, journalist and presenter based in Dubai. She is Senior Communications Manager at the Dubai Department of Economy and Tourism, where she leads public relations and communications strategy across twenty markets in Asia, Africa, Europe, the United States and Latin America.",
  "She has worked in newsrooms since 2007, beginning at Forbes in New York, where she ran the magazine's video network and reported on air. In Dubai she reported for Arabian Radio Network across Dubai Eye 103.8, Dubai 92 and Virgin Radio, filing live and producing features for Business Breakfast and Drive Live, edited SME Advisor magazine for CPI, and was Deputy Editor at Argaam, covering financial markets in the UAE, Saudi Arabia and Egypt.",
  "Six years at Dubai Chamber of Commerce followed, running media plans, press activity and corporate communications. That is the combination behind the work today: a reporter's instinct for the story, applied inside organisations that need to be understood.",
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
              src="/brand/portrait-cutout.webp"
              alt="Joumana Saad, journalist, presenter and moderator based in Dubai"
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
