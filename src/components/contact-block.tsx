"use client";

import { useState } from "react";
import { site } from "@/lib/content";

/**
 * Node 45:1471. Soft panel, heading and copy on the left, a white card holding
 * the form on the right. Underlined fields, a pill submit.
 *
 * The design labels "Your name" in Oakes Grotesk and the other three in Aeonik.
 * That reads like a slip rather than an intent, so all four use one face here.
 *
 * No endpoint has been chosen yet, so this composes an email and hands it to
 * the visitor's mail client. Swap the body of handleSubmit for a POST when the
 * endpoint is decided; the field names are already shaped for it.
 */
const FIELDS = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "phone", label: "Contact Number", type: "tel", required: false },
  { name: "email", label: "Email Address", type: "email", required: true },
] as const;

export function ContactBlock() {
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
    "w-full border-0 border-b border-rule bg-transparent pb-3 text-[18px] text-card-body outline-none transition-colors placeholder:text-card-body-soft focus:border-heading xl:text-[20px]";

  return (
    <section className="sec bg-card">
      <div className="frame grid items-center gap-8 lg:grid-cols-2 xl:gap-16">
        <div className="flex flex-col gap-6 xl:gap-10">
          <h2 className="t-section text-card-heading">
            <span className="block">Tell Me What</span>
            <span className="block">You&rsquo;re Working On</span>
          </h2>
          <p className="max-w-xl text-[17px] leading-[1.3] text-card-body xl:text-[24px]">
            Whether you&rsquo;re planning an event, looking for a presenter or
            moderator, developing content, or exploring a communications project,
            I&rsquo;d love to hear more.
          </p>
        </div>

        <div className="rounded-[24px] bg-card p-6 xl:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 xl:gap-7">
            {FIELDS.map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="sr-only">
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  placeholder={f.label}
                  autoComplete={
                    f.name === "name" ? "name" : f.name === "email" ? "email" : "tel"
                  }
                  className={field}
                />
              </div>
            ))}

            <div>
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

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                className="inline-flex h-14 w-[170px] items-center justify-center gap-1.5 rounded-full bg-brown text-[16px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-90 xl:text-[18px]"
              >
                Submit
                <span aria-hidden="true">&rarr;</span>
              </button>
              {sent ? (
                <p role="status" className="text-[14px] text-card-body-soft">
                  Your mail app should have opened with the message filled in.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
