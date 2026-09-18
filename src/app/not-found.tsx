import Link from "next/link";
import { Card, Pill } from "@/components/page-kit";
import { nav } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-page py-16">
      <div className="frame">
        <Card className="mx-auto flex max-w-[820px] flex-col items-center gap-6 px-6 py-14 text-center xl:gap-8 xl:px-12 xl:py-20">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-card-body-soft">
            Error 404
          </p>

          <h1 className="t-section max-w-[18ch] text-card-heading">
            That page has been filed somewhere else
          </h1>

          <p className="max-w-[52ch] text-[16px] leading-[1.5] text-card-body xl:text-[19px]">
            The link may be old, or the address may have a typo in it. Everything
            on the site is one click away below.
          </p>

          <Pill href="/">Back to home</Pill>

          <ul className="flex flex-wrap items-center justify-center gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-full border border-rule px-5 text-[13px] font-semibold tracking-[0.08em] text-card-heading transition-colors hover:bg-brown hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
