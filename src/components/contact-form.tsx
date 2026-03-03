"use client";

import React from "react";

export function ContactForm() {
  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const institution = String(data.get("institution") ?? "").trim();
        const count = String(data.get("students") ?? "").trim();
        const note = String(data.get("message") ?? "").trim();

        const text = [
          "Hello, I want to publish results.",
          institution ? `Institution: ${institution}` : "",
          count ? `Students: ${count}` : "",
          note ? `Message: ${note}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        const url = `https://wa.me/919562695758?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <input
        type="text"
        name="institution"
        placeholder="Institution Name"
        className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-transparent focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        name="students"
        placeholder="Students Count"
        min={1}
        className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-transparent focus:outline-none focus:border-blue-500"
      />
      <textarea
        rows={4}
        name="message"
        placeholder="WhatsApp Message (optional)"
        className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 bg-transparent focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
      >
        Send on WhatsApp
      </button>
      <p className="text-xs text-neutral-500 text-center">
        Or email us at{" "}
        <a className="text-blue-600 hover:underline" href="mailto:brandso.com@gmail.com">
          brandso.com@gmail.com
        </a>
      </p>
    </form>
  );
}
