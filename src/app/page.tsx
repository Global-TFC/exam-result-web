"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Palette,
  Share2,
  ShieldCheck,
  Upload,
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917994779605";

export default function Home() {
  const [madrasaName, setMadrasaName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const contactHref = useMemo(() => {
    const contactMessage = [
      "Assalamu Alaikum,",
      "",
      "I want to add or manage a madrasa in the ResultPublisher platform.",
      `Madrasa Name: ${madrasaName || "-"}`,
      `Location: ${location || "-"}`,
      `Message: ${message || "-"}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;
  }, [location, madrasaName, message]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(contactHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- Navigation --- */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <span className="text-xl font-bold">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">ResultPublisher</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/madrasas" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Explore Madrasas</Link>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">How it Works</a>
            <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Contact</a>
            <a href={contactHref} target="_blank" className="rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600 hover:bg-blue-100 transition">WhatsApp Support</a>
          </nav>
        </div>
      </header>

      {/* --- Hero Section --- */}
      {/* --- HERO SECTION NEW --- */}
      <section className="relative overflow-hidden px-6 pt-12 pb-20 text-center md:pt-12">
        {/* soft islamic gradient glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-[450px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100 via-sky-50 to-transparent blur-[120px]" />

        <div className="mx-auto max-w-5xl">

          {/* small trust badge */}
          <p className="inline-block mb-6 rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
            Dedicated Madrasa Result Publishing Platform
          </p>

          {/* main heading */}
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl leading-tight">
            Publish Madrasa Results
            <span className="block text-blue-600 mt-3">
              Online in Just Few Hours
            </span>
          </h1>

          {/* emotional + clear value */}
          <p className="mx-auto mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-slate-600">
            Stop sharing paper result sheets and answering hundreds of phone calls.
            We convert your Excel result file into a secure website where
            students and parents can check results instantly from anywhere.
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={contactHref}
              target="_blank"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:scale-105 hover:bg-blue-700"
            >
              Start via WhatsApp
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>

            <a
              href="#how-it-works"
              className="rounded-full px-8 py-4 text-lg font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              See How It Works
            </a>
          </div>

          {/* trust points */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-600 h-5 w-5" /> No technical work needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-600 h-5 w-5" /> Mobile friendly results
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-600 h-5 w-5" /> Share via WhatsApp link & QR
            </span>
          </div>

          {/* feature cards under hero */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Upload Excel File",
                desc: "Send your result sheet in our simple format.",
                icon: <FileSpreadsheet className="text-blue-600" />,
              },
              {
                title: "We Create Result Website",
                desc: "Beautiful branded result pages for your madrasa.",
                icon: <Palette className="text-blue-600" />,
              },
              {
                title: "Share With Students",
                desc: "Send link or QR code via WhatsApp instantly.",
                icon: <Share2 className="text-blue-600" />,
              },
            ].map((card, i) => (
              <div key={i} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  {card.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- Features Grid --- */}
      <section className="bg-slate-50/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">Bring The Power Of All To <br /> Your Result Publishing Process</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { title: "Easy Excel Format", desc: "Share your Excel file in our simple format. We handle formatting and verification.", icon: <FileSpreadsheet className="text-blue-600" /> },
              { title: "Your Brand, Your Style", desc: "Your logo, colors, and custom messages. A result page that's uniquely yours.", icon: <Palette className="text-blue-600" /> },
              { title: "Ready-to-Share Links", desc: "Receive a unique link and QR code. Share with students within hours.", icon: <Share2 className="text-blue-600" /> },
              { title: "Verified & Secure", desc: "Results are reviewed before publishing. Only authorized students see their results.", icon: <ShieldCheck className="text-blue-600" /> },
            ].map((feat, i) => (
              <div key={i} className="group rounded-[32px] border border-white bg-white p-8 shadow-sm transition-all hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  {feat.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-800">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Blue Branding CTA --- */}
      <section className="max-w-screen-xl mx-6 md:mx-auto mb-24 rounded-[40px] bg-blue-600 py-20 text-center text-white shadow-2xl shadow-blue-200">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">Professional Results, Made Simple.</h2>
        <h2 className="mb-8 text-4xl font-bold opacity-90 md:text-5xl">We Handle Everything.</h2>
        <p className="mx-auto mb-10 max-w-xl text-blue-100">
          From Excel file to professional result page in hours. No technical work on your end.
        </p>
        <button className="rounded-full w-fit bg-white px-10 py-4 font-bold text-blue-600 hover:bg-blue-50 transition-transform active:scale-95 shadow-lg">
          Get Started Now
        </button>
      </section>

      {/* --- How It Works --- */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">How To Publish Results</h2>
            <h3 className="text-4xl font-bold text-blue-600 md:text-5xl">With Us</h3>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto">Say goodbye to complex result management. We handle publishing so you can focus on what matters.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { step: "Get the ready-made template", desc: "We provide Excel templates designed for your institution type. Just fill in your result data.", icon: <Upload />, active: true },
              { step: "Share your file with us", desc: "Send your completed Excel file. Our team verifies entries and prepares results for publishing.", icon: <Zap />, active: false },
              { step: "We apply your branding", desc: "Share your institution's colors, logo, and styling. We create a consistent, professional look.", icon: <Palette />, active: true },
              { step: "Receive your result page", desc: "We publish and send you shareable links and QR codes. Ready to share with students.", icon: <Share2 />, active: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-[32px] p-10 transition-all ${item.active
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                    : "bg-white border border-slate-100 text-slate-800"
                  }`}
              >
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${item.active ? "bg-white/20" : "bg-blue-50 text-blue-600"}`}>
                  {item.icon}
                </div>
                <h4 className="mb-4 text-2xl font-bold">{item.step}</h4>
                <p className={`${item.active ? "text-blue-50" : "text-slate-500"} leading-relaxed`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="px-6 py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-slate-900 shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-12 text-white flex flex-col justify-center">
              <h2 className="mb-6 text-4xl font-bold">Contact on WhatsApp</h2>
              <p className="mb-8 text-lg text-slate-400">
                Submit your madrasa details and our team will get in touch to set up your result portal.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-blue-500" />
                  <span>Instant Result Setup</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-blue-500" />
                  <span>Free Technical Support</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-12 backdrop-blur-md">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  value={madrasaName}
                  onChange={(e) => setMadrasaName(e.target.value)}
                  placeholder="Madrasa Name"
                  className="w-full rounded-2xl border-none bg-slate-700 p-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (City/District)"
                  className="w-full rounded-2xl border-none bg-slate-700 p-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requirements"
                  rows={4}
                  className="w-full rounded-2xl border-none bg-slate-700 p-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
                >
                  Send to WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-slate-100 py-12 text-center text-slate-500">
        <p className="text-sm font-medium">© {new Date().getFullYear()} ResultPublisher. All rights reserved.</p>
      </footer>
    </div>
  );
}