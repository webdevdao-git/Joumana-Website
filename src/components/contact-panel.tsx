"use client";

import { useState } from "react";
import { contactPanels, site } from "@/lib/content";

/**
 * Node 125:3165, the block that closes every page. The home page had its own
 * near copy of it; they are one component now, differing only in the words,
 * which each page passes in.
 *
 * The design draws it 1728 by 828 and places everything inside as a share of
 * that box. Pinned to that aspect it came out 828 tall on a 928 screen, which
 * is most of a screen to say one thing and hold four fields, so it is laid out
 * rather than placed now: a two column grid at the design's own 499 to 449
 * split, sized by what is in it. That is about 590, a third off.
 *
 * On the 1728 by 828 section the design puts the heading block at x80, 783
 * wide, with the heading at y278 and the copy at y458, and a white card at
 * x943, 705 by 628 with a 24 radius. Inside the card the fields sit on a 625
 * column at 40 in from its edges: a label at y140, 246, 356 and 466 with a
 * rule under each, and a 170 by 56 pill at y632.
 *
 * Those are the numbers below, as percentages of the section.
 *
 * No endpoint has been chosen, so this composes an email and hands it to the
 * visitor's mail client. Every field name is already shaped for a real POST.
 */
const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "phone", label: "Contact Number", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email" },
] as const;

export function ContactPanel({
  page,
  tone = "light",
}: {
  page: keyof typeof contactPanels;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const { heading, lede } = contactPanels[page];

  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Contact Number: ${get("phone") || "Not given"}`,
      `Email: ${get("email")}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Enquiry from ${get("name") || "the website"}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "s-body w-full border-0 border-b border-black/20 bg-transparent pb-3 text-card-body outline-none transition-colors placeholder:text-card-body focus:border-card-heading";

  return (
    <section className={dark ? "bg-page" : "bg-cream"}>
      <div className="mx-auto w-full max-w-[1728px] px-6 py-12 md:px-10 lg:px-[4.63%] lg:py-[2.6vw]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,499fr)_minmax(0,449fr)] lg:gap-[5.2%]">
          <div>
            <h2 className={`s-title ${dark ? "text-heading" : "text-card-heading"}`}>
              {heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className={`s-body mt-5 max-w-[52ch] lg:mt-[1.4vw] ${dark ? "text-body" : "text-card-body"}`}>
              {lede}
            </p>
          </div>

          {/* the white card */}
          <div className="rounded-[24px] bg-white p-6 lg:p-[2.1vw]">
            <form onSubmit={handleSubmit} className="flex flex-col">
              {FIELDS.map((f) => (
                <div key={f.name} className="mb-5 lg:mb-[1.2vw]">
                  <label htmlFor={f.name} className="sr-only">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.name !== "phone"}
                    placeholder={f.label}
                    autoComplete={f.autoComplete}
                    className={field}
                  />
                </div>
              ))}

              <div className="mb-5 lg:mb-[1.2vw]">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  required
                  placeholder="Message"
                  className={`${field} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="s-button inline-flex h-12 w-[160px] items-center justify-center gap-2 rounded-full bg-brown text-white transition-opacity duration-300 hover:opacity-90 xl:h-14 xl:w-[170px]"
                >
                  Submit
                  <span aria-hidden="true">&rarr;</span>
                </button>
                {sent ? (
                  <p role="status" className="text-[13px] text-card-body-soft">
                    Your mail app should have opened with the message filled in.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
