import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FlipWords } from "@/components/ui/flip-words";
import { GlowingEffect } from "@/components/ui/glowing-effect";
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-black dark:via-neutral-950 dark:to-black overflow-x-hidden">
      {/* ================== NAVBAR ================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl md:text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              ResultPublisher
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Features
            </a>
            <a href="#contact" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Contact
            </a>
          </div>

          {/* Highlighted WhatsApp Button */}
          <a
            href="https://wa.me/919876543210?text=Hello%2C%20I%27m%20interested%20in%20ResultPublisher%20for%20our%20institution"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg shadow-green-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* ---------------- HERO ---------------- */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col">
        <section className="relative pt-16 pb-24">
          <div className="z-50 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Instant Results
              </span>
              <br />
              for Your{" "}
              <span className="text-black dark:text-white">
                <FlipWords words={institutionTypes} />
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
              Publish, verify, and analyze academic results in seconds.
              Secure. Scalable. Trusted by institutions worldwide.
            </p>

            {/* Search Bar */}
            {/* <div className="mt-10 flex justify-center">
              <div className="flex items-center w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg px-4 py-2">
                <Search className="text-neutral-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Enter Roll Number or Registration ID..."
                  className="flex-1 bg-transparent outline-none text-sm md:text-base"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </div> */}

            {/* Trust Stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Stat number="500+" label="Institutions" />
              <Stat number="1M+" label="Results Published" />
              <Stat number="99.99%" label="Uptime" />
              <Stat number="24/7" label="Availability" />
            </div>
          </div>
        </section>
      </BackgroundLines>

      {/* ---------------- FEATURES ---------------- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            Powerful Yet Simple
          </h2>
          <p className="text-neutral-500 mt-4">
            From exam completion to verified result publishing.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<GraduationCap className="h-6 w-6 text-blue-500" />}
            title="Institution Onboarding"
            description="Secure registration with multi-level admin access control."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Lightning Fast Upload"
            description="Bulk upload Excel/CSV files with automatic AI validation."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-green-500" />}
            title="Tamper-Proof Verification"
            description="Each result digitally signed and QR-verifiable."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-purple-500" />}
            title="Smart Analytics"
            description="Deep performance insights, comparisons & exportable reports."
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6 text-red-500" />}
            title="Instant Publishing"
            description="Notify students instantly via Web + SMS integration."
          />
        </ul>
      </section>

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section id="contact" className="py-24 px-6 bg-neutral-50/50 dark:bg-neutral-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Have questions or want a demo? Our team is ready to help your institution go digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">WhatsApp / Phone</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    +91 98765 43210<br />
                    Mon–Sat: 9:30 AM – 6:30 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    support@resultpublisher.com<br />
                    demo@resultpublisher.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    Malappuram, Kerala, India
                  </p>
                </div>
              </div>
            </div>

            {/* Simple Contact Form Placeholder */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-blue-500"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message..."
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-3xl p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold">
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
            <h3 className="text-xl font-bold text-white mb-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div>
    <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
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
    <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-xl transition duration-300 bg-white dark:bg-neutral-900">
      <GlowingEffect spread={30} glow={true} proximity={64} inactiveZone={0.01} />
      <div className="space-y-4">
        <div className="w-fit p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};