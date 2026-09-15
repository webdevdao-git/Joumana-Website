"use client";

import { useState } from "react";
import { site } from "@/lib/content";

/**
 * Node 125:3165, the block that closes the services and work pages.
 *
 * The home page keeps its own ContactBlock, which was signed off before these
 * two were drawn and is deliberately left alone.
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

export function ContactPanel() {
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
    <section className="bg-card">
      <div className="mx-auto w-full max-w-[1728px] px-6 py-12 md:px-10 lg:aspect-[1728/828] lg:px-0 lg:py-0">
        <div className="relative h-full lg:mx-[4.63%]">
          {/* the heading block, sitting low in its column as the design has it */}
          <div className="lg:absolute lg:left-0 lg:top-[33.6%] lg:w-[49.9%]">
            <h2 className="s-title text-card-heading">
              <span className="block">Tell Me What</span>
              <span className="block">You&rsquo;re Working On</span>
            </h2>
            <p className="s-body mt-5 max-w-[52ch] text-card-body lg:mt-[4.8%]">
              Whether you&rsquo;re planning an event, looking for a presenter or
              moderator, developing content, or exploring a communications
              project, I&rsquo;d love to hear more.
            </p>
          </div>

          {/* the white card */}
          <div className="mt-10 rounded-[24px] bg-white p-7 lg:absolute lg:right-0 lg:top-[12.1%] lg:mt-0 lg:h-[75.8%] lg:w-[44.9%] lg:p-[3.6%]">
            <form onSubmit={handleSubmit} className="flex h-full flex-col">
              {FIELDS.map((f) => (
                <div key={f.name} className="mb-7 lg:mb-[4.4%]">
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

              <div className="mb-7 lg:mb-[4.4%]">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Message"
                  className={`${field} resize-none`}
                />
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="s-button inline-flex h-14 w-[170px] items-center justify-center gap-2 rounded-full bg-brown text-white transition-opacity duration-300 hover:opacity-90"
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
