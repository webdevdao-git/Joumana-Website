"use client";

import { useState } from "react";
import { services, site } from "@/lib/content";

/**
 * The full enquiry form, a longer relative of the short one on the home page.
 *
 * There is still no backend, so this composes a formatted email and hands it to
 * the visitor's mail client. Every field name below is already shaped for a
 * real endpoint: to move over, replace the body of handleSubmit with a fetch
 * and nothing in the markup has to change.
 */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `Enquiry from ${get("name") || "the website"}: ${
      get("service") || "General"
    }`;

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Organisation: ${get("organisation") || "Not given"}`,
      `Service: ${get("service") || "Not specified"}`,
      `Deadline: ${get("deadline") || "Not specified"}`,
      "",
      "Brief:",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  const field =
    "w-full border-0 border-b border-rule bg-transparent pb-3 text-[17px] text-card-body outline-none transition-colors placeholder:text-card-body-soft focus:border-card-heading xl:text-[19px]";
  const label =
    "block text-[12px] font-semibold uppercase tracking-[0.14em] text-card-body-soft";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 xl:gap-9">
      <div className="grid gap-8 sm:grid-cols-2 xl:gap-9">
        <div>
          <label className={label} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            className={`mt-3 ${field}`}
          />
        </div>

        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={`mt-3 ${field}`}
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:gap-9">
        <div>
          <label className={label} htmlFor="organisation">
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            placeholder="Company or publication"
            className={`mt-3 ${field}`}
          />
        </div>

        <div>
          <label className={label} htmlFor="service">
            What do you need
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={`mt-3 cursor-pointer ${field}`}
          >
            <option value="">Select one</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="deadline">
          Date you need it by
        </label>
        <input
          id="deadline"
          name="deadline"
          type="text"
          placeholder="For example, end of next month"
          className={`mt-3 ${field}`}
        />
      </div>

      <div>
        <label className={label} htmlFor="message">
          The brief
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Audience, outcome, and anything already written"
          className={`mt-3 resize-none ${field}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brown px-8 text-[15px] font-semibold uppercase text-white transition-opacity duration-300 hover:opacity-90 xl:h-16 xl:text-[17px]"
        >
          Send the brief
          <span aria-hidden="true">&rarr;</span>
        </button>

        {sent ? (
          <p role="status" className="max-w-[36ch] text-[14px] text-card-body-soft">
            Your mail app should have opened with the brief filled in. If it did
            not, write to{" "}
            <a href={`mailto:${site.email}`} className="text-card-heading underline">
              {site.email}
            </a>
            .
          </p>
        ) : (
          <p className="text-[14px] text-card-body-soft">
            Replies usually within one working day.
          </p>
        )}
      </div>
    </form>
  );
}
