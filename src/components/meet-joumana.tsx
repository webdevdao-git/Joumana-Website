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
 * First person, because this is her site and she is the one talking. It used
 * to read "Joumana Saad is a Dubai-based journalist", which is how a press
 * release describes someone, not how someone introduces themselves. The
 * heading above it says Meet Joumana Saad; what follows should be her.
 *
 * The figure is a date rather than a count. "13+ years" sat on the home page
 * against "nineteen years" on the work page and "more than 15 years" in the
 * services design. She began at Forbes in 2007, and a date cannot drift.
 */
const COPY = [
  "I am a communications specialist, journalist and presenter based in Dubai. Today I lead public relations and communications strategy for the Dubai Department of Economy and Tourism, across twenty markets in Asia, Africa, Europe, the United States and Latin America.",
  "I started in newsrooms in 2007, at Forbes in New York, running the video network and reporting on air. In Dubai I reported for Arabian Radio Network across Dubai Eye 103.8, Dubai 92 and Virgin Radio, filing live and producing features for Business Breakfast and Drive Live. I edited SME Advisor magazine, and covered financial markets in the UAE, Saudi Arabia and Egypt as Deputy Editor at Argaam.",
  "Six years at Dubai Chamber of Commerce taught me what a reporter's instinct is worth inside a large organisation. Newsroom, boardroom or stage, the job has never changed: understand the subject, find what actually matters in it, and say it so people listen.",
];

export function MeetJoumana() {
  return (
    <section className="relative bg-cream pb-14 xl:pb-0">
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

          {/* She rides up out of this section and into the logo band above it,
              which is what the design does and what the cutout was made for.

              On the 1728 frame her hair starts 42px above the cream and she
              runs about 1005px down, so she is the tallest thing in the
              section and sets its height rather than being fitted into it.
              Both numbers are shares of that frame, 2.43vw and 58.2vw, so the
              overlap holds at every width.

              The column clips at its own foot: the overlap has to escape
              upward, so the section cannot hide its overflow, and without this
              she would carry on down over the section below. The bottom fade
              is gone with it, since the design cuts her cleanly. */}
          <div className="relative z-10 -mt-8 h-[420px] overflow-hidden lg:-mt-[2.43vw] lg:h-[min(58.2vw,1010px)]">
            <Image
              src="/brand/portrait-cutout.webp"
              alt="Joumana Saad, journalist, presenter and moderator based in Dubai"
              fill
              sizes="(max-width: 1024px) 100vw, 47vw"
              className="object-contain object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
