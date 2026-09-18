import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The pieces every inner page is built from, set in the same language as the
 * home page: oxblood ground, cream type, light cards for anything that needs
 * to be read closely, one brown pill for the way out.
 *
 * Nothing here invents a new size. Headings use the same t-section as the home
 * page so no page shouts louder than another.
 */

/** The opening block of an inner page. Deliberately shorter than the home
 *  hero, which owns the full screen on its own. */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: readonly string[];
  lede: string;
}) {
  return (
    <section className="bg-page pb-12 pt-14 xl:pb-20 xl:pt-24">
      <div className="frame flex flex-col items-center gap-6 text-center xl:gap-8">
        <p className="t-nav text-body-soft">{eyebrow}</p>

        <h1 className="t-display max-w-[26ch] text-heading">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="max-w-[62ch] text-[16px] leading-[1.55] text-body-soft xl:text-[19px]">
          {lede}
        </p>
      </div>
    </section>
  );
}

/** A heading that sits directly on the oxblood, centred like the home page. */
export function SectionHead({
  title,
  lede,
  align = "center",
}: {
  title: ReactNode;
  lede?: string;
  align?: "center" | "start";
}) {
  const centred = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${
        centred ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <h2 className="t-section text-heading">{title}</h2>
      {lede ? (
        <p
          className={`text-[16px] leading-[1.55] text-body-soft xl:text-[19px] ${
            centred ? "max-w-[60ch]" : "max-w-[52ch]"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** The light card, used anywhere a block has to be read rather than scanned. */
export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag className={`rounded-[24px] bg-card ${className}`}>{children}</Tag>
  );
}

/** The one button shape on the site. */
export function Pill({
  href,
  children,
  tone = "brown",
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: "brown" | "light";
  external?: boolean;
}) {
  const skin =
    tone === "brown"
      ? "bg-brown text-white"
      : "bg-card text-card-heading";

  const className = `inline-flex h-14 items-center justify-center gap-3 rounded-full px-8 text-[15px] font-semibold transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:text-[18px] ${skin}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
        <span aria-hidden="true">&rarr;</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/** The closing invitation, shared by every inner page. */
export function CtaBand({
  title = "Tell me what you are working on",
  lede = "Send the brief, the audience and the date you need it by. Most enquiries get a reply within one working day.",
  label = "Start a conversation",
}: {
  title?: string;
  lede?: string;
  label?: string;
}) {
  return (
    <section className="sec bg-page">
      <div className="frame">
        <Card className="flex flex-col items-center gap-6 px-6 py-12 text-center xl:gap-8 xl:px-10 xl:py-16">
          <h2 className="t-section max-w-[20ch] text-card-heading">{title}</h2>
          <p className="max-w-[54ch] text-[16px] leading-[1.5] text-card-body xl:text-[19px]">
            {lede}
          </p>
          <Pill href="/contact">{label}</Pill>
        </Card>
      </div>
    </section>
  );
}

/** A thin rule used between rows inside a light card. */
export function Rule() {
  return <span aria-hidden="true" className="block h-px w-full bg-rule" />;
}
