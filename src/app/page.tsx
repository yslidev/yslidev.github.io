"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

const writing = [
  {
    title: "Learning, In The Omnipresent Classroom",
    desc: "Winter 2025, 1/4",
    href: "https://liyushan27.substack.com/p/learning-in-the-omnipresent-classroom",
    year: "Feb 2025",
  },
  {
    title: "The Power of Cults, Charisma, and the Fluidity of Influence",
    desc: "not inspired by election and AI corporate dramas",
    href: "https://liyushan27.substack.com/p/the-power-of-cults-charisma-and-the",
    year: "Dec 2024",
  },
  {
    title: "Turning Tides: The Unseen Journeys of Grief and Growth",
    desc: "The unexpected will surely happen again, like waves.",
    href: "https://liyushan27.substack.com/p/turning-tides-the-unseen-journeys",
    year: "Mar 2024",
  },
];

const links = [
  { label: "github", href: "https://github.com/yslidev" },
  { label: "linkedin", href: "https://linkedin.com/in/liyushan27" },
  { label: "substack", href: "https://liyushan27.substack.com" },
  { label: "email", href: "mailto:yushanli@berkeley.edu" },
];

export default function Home() {
  return (
    <>
      <FishCanvas />

      <div className="page-content min-h-screen">

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
          style={{ background: "rgba(228,246,250,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid #9dd4db" }}>
          <a href="#" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="ysli" width={24} height={24} className="rounded-sm" />
            <span style={{ fontSize: "0.8rem", color: "#999", letterSpacing: "-0.01em" }}>ysli.dev</span>
          </a>
          <div className="flex items-center gap-8">
            {[["writing", "#writing"], ["now", "#now"]].map(([label, href]) => (
              <a key={label} href={href}
                style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#bbb")}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "140px 32px 80px" }}>
          <p className="fade-up fade-up-1" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#111", marginBottom: "28px" }}>
            Yushan Li
          </p>

          <p className="fade-up fade-up-2" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "16px" }}>
            I spent 2024–25 at{" "}
            <a href="https://hooglee.com" target="_blank" rel="noopener noreferrer" className="text-link">Hooglee</a>
            {" "}— Eric Schmidt's video AI startup — as the first junior hire.
            I owned product from day one to Series A: shipped search & discovery, account system, admin dashboard,
            ran a 200+ creator influencer program, and won the internal hackathon.
          </p>

          <p className="fade-up fade-up-2" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "16px" }}>
            I also spent a year as Head TA for Berkeley's largest engineering startup class,
            mentoring 500+ students and organizing the first{" "}
            <a href="https://entrepreneurship.berkeley.edu" target="_blank" rel="noopener noreferrer" className="text-link">Global Student Startup Competition</a>{" "}
            in Korea.
          </p>

          <p className="fade-up fade-up-3" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "16px" }}>
            These days I'm researching X's open-source rec-sys algorithm and helping build the{" "}
            <a href="https://github.com/yslidev/agenthle-finance" target="_blank" rel="noopener noreferrer" className="text-link">AgentHLE benchmark</a>.
          </p>

          <p className="fade-up fade-up-3" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "32px" }}>
            I study CS + Cognitive Science at UC Berkeley on a full{" "}
            <a href="https://shelbydavisfoundation.org" target="_blank" rel="noopener noreferrer" className="text-link">Shelby Davis Scholarship</a>.
            Before Berkeley I went to{" "}
            <a href="https://uwcsa.org" target="_blank" rel="noopener noreferrer" className="text-link">United World College</a>{" "}
            in 🇧🇦 and studied Cultural Anthropology.
            I travel, paint, and make things — including this logo & banner.
          </p>

          <div className="fade-up fade-up-4" style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-link"
                style={{ fontSize: "0.8rem", color: "#999" }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Resume superlinks */}
          <div className="fade-up fade-up-5" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#" className="resume-link">
              résumé — product
            </a>
            <a href="#" className="resume-link">
              résumé — engineering
            </a>
          </div>
        </section>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ height: "1px", background: "var(--border)" }} />
        </div>

        {/* Writing */}
        <section id="writing" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 32px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            writing
          </p>
          {writing.map((w, i) => (
            <a key={i} href={w.href} target="_blank" rel="noopener noreferrer" className="superlink">
              <span className="superlink-title">{w.title}</span>
              <span className="superlink-desc">{w.desc}</span>
              <span className="superlink-year">{w.year}</span>
              <span className="superlink-arrow">↗</span>
            </a>
          ))}
          <p style={{ fontSize: "0.75rem", color: "#ccc", marginTop: "16px" }}>
            more on{" "}
            <a href="https://liyushan27.substack.com" target="_blank" rel="noopener noreferrer"
              className="text-link" style={{ fontSize: "0.75rem", color: "#aaa" }}>
              Substack
            </a>
          </p>
        </section>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ height: "1px", background: "var(--border)" }} />
        </div>

        {/* Now */}
        <section id="now" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 32px 100px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            now
          </p>
          <div style={{ fontSize: "0.875rem", color: "#777", lineHeight: 1.85, maxWidth: "440px" }}>
            <p>
              Fourth-year at UC Berkeley. Grew up in China, went to school in Bosnia, landed in California.
              I skate, paint, and try to visit a new country every few months.
              Former national champion in artistic swimming — that was another life.
            </p>
          </div>
        </section>

        {/* Wave → banner */}
        <div style={{ position: "relative", width: "100%", marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 260" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "260px" }}
            xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8f6f8" />
                <stop offset="55%" stopColor="#64cad1" />
                <stop offset="100%" stopColor="#3ab0be" />
              </linearGradient>
            </defs>
            <rect width="1440" height="260" fill="url(#waveGrad)" />
            <path d="M0,140 C240,112 480,168 720,140 C960,112 1200,162 1440,140 L1440,260 L0,260 Z"
              fill="rgba(255,255,255,0.10)" />
            <path d="M0,170 C200,148 400,192 600,170 C800,148 1040,188 1240,165 C1340,153 1400,172 1440,168 L1440,260 L0,260 Z"
              fill="rgba(255,255,255,0.07)" />
            <path d="M0,200 C280,182 560,218 840,200 C1120,182 1300,210 1440,202 L1440,260 L0,260 Z"
              fill="rgba(255,255,255,0.05)" />
            <path d="M0,228 C320,216 640,238 960,224 C1200,213 1360,230 1440,225 L1440,260 L0,260 Z"
              fill="rgba(255,255,255,0.04)" />
          </svg>
        </div>

        {/* Banner */}
        <div style={{ position: "relative", width: "100%", height: "320px" }}>
          <Image src="/banner.jpg" alt="" fill className="object-cover object-top" priority />
        </div>

        {/* Footer */}
        <footer style={{ background: "#1a1a1a", color: "#444", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>ysli.dev</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ fontSize: "0.7rem", color: "#555", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                {l.label}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
