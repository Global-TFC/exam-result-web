import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FlipWords } from "@/components/ui/flip-words";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ContactForm } from "@/components/contact-form";
import {
  Search,
  GraduationCap,
  ShieldCheck,
  Zap,
  BarChart3,
  Globe,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function InstitutionalResultPage() {
  const institutionTypes = [
    "Madrasa",
    "School",
    "Class",
    "Coaching Center",
    "Academy",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden animated-gradient">
      {/* ================== NAVBAR ================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-white/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl md:text-3xl font-bold font-display">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500">
              ResultPublisher
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-neutral-700 hover:text-blue-600 transition">
              Features
            </a>
            <a href="#contact" className="text-neutral-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          {/* Highlighted WhatsApp Button */}
          <a
            href="https://wa.me/919562695758?text=Hello%2C%20I%27m%20interested%20in%20ResultPublisher%20for%20our%20institution"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-19" />

      {/* ---------------- HERO ---------------- */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col">
        <section className="relative pt-54 md:pt-28 pb-20 sm:pb-24">
          <div className="radial-glow -top-30 -left-32 bg-blue-300" />
          <div className="radial-glow top-24 -right-28 bg-emerald-300" />

          <div className="relative z-50 max-w-6xl mx-auto px-5 sm:px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/70 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Trusted by modern institutions
              </div>

              <h1 className="mt-5 text-[2.15rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display text-neutral-900">
                Instant Results
                <span className="block">for Your</span>
                <span className="block">
                  <FlipWords
                    words={institutionTypes}
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700"
                  />
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
                Publish, verify, and analyze academic results in seconds. Secure. Scalable. Built for leadership teams and admins.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/example"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition text-center"
                >
                  Demo
                </a>
                <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-300 bg-white/80 text-neutral-800 font-semibold hover:border-blue-300 transition">
                  Explore Features
                </button>
              </div>
            </div>

            {/* <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <Stat number="500+" label="Institutions" />
              <Stat number="1M+" label="Results Published" />
              <Stat number="99.99%" label="Uptime" />
              <Stat number="24/7" label="Availability" />
            </div> */}
          </div>
        </section>
      </BackgroundLines>

      {/* ---------------- FEATURES ---------------- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Result Publishing, Done Right
          </h2>
          <p className="text-neutral-500 mt-4">
            A complete workflow from data template to a shareable results page.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<GraduationCap className="h-6 w-6 text-blue-500" />}
            title="Google Sheet Templates"
            description="We generate a Google Sheet structure for your subjects and grading method."
          />

          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Custom Result Page"
            description="We design a results page that matches your institution’s identity."
          />

          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
            title="Public Share Link"
            description="Publish results and get a public link to share with students."
          />

          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-purple-500" />}
            title="Always Available"
            description="Results are online 24/7 with fast, reliable access."
          />

          <FeatureCard
            icon={<Globe className="h-6 w-6 text-red-500" />}
            title="Secure Publishing"
            description="We handle your publishing workflow safely and professionally."
          />

          {/* NEW FEATURE */}
          <FeatureCard
            icon={<Search className="h-6 w-6 text-indigo-500" />}
            title="Student Result Search"
            description="Students can instantly check results using roll number or registration ID."
          />
        </ul>
      </section>

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section id="contact" className="py-24 px-6 bg-white/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Have questions or want a demo? Our team is ready to help your institution go digital.
            </p>
          </div>

          <div className="grid gap-12">
            {/* Contact Info */}
            <div className="space-y-5 md:flex items-center justify-around gap-12 flex-wrap">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">WhatsApp / Phone</h4>
                  <p className="text-neutral-600 mt-1">
                    +91 98765 43210<br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-neutral-600 mt-1">
                    brandso.com@gmail.com<br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-neutral-600 mt-1">
                    Kerala, India
                  </p>
                </div>
              </div>
            </div>

            {/* Simple Contact Form Placeholder */}
            {/* <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-xl">
              <ContactForm />
            </div> */}
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-3xl p-12 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Ready to Modernize Your Institution?
          </h2>
          <p className="mt-6 text-lg text-blue-100">
            Join hundreds of institutions already transforming academic publishing.
          </p>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:scale-105 transition-transform">
              Get Started
            </button>
            <button className="px-8 py-3 border border-white rounded-full font-semibold hover:bg-white/10 transition">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-neutral-900 text-neutral-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-display">
              ResultPublisher
            </h3>
            <p className="text-sm">
              Secure & instant academic result management for educational institutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition"><Instagram size={20} /></a>
            </div>
            <p className="mt-6 text-sm">
              © {new Date().getFullYear()} ResultPublisher. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Built by{" "}
              <a
                href="https://brandso.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition"
              >
                Brandso
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center md:items-start">
    <h3 className="text-2xl md:text-3xl font-bold text-blue-600 font-display">
      {number}
    </h3>
    <p className="text-neutral-500 text-sm mt-1">{label}</p>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative rounded-3xl border border-white/70 p-6 hover:shadow-2xl transition duration-300 bg-white/80 backdrop-blur">
      <GlowingEffect spread={30} glow={true} proximity={64} inactiveZone={0.01} />
      <div className="space-y-4">
        <div className="w-fit p-3 rounded-xl bg-white shadow-md">
          {icon}
        </div>
        <h3 className="text-xl font-bold font-display">{title}</h3>
        <p className="text-neutral-600 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};
