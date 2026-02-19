"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

const work = [
  {
    title: "Hooglee",
    desc: "Search & Discovery, video AI startup",
    tags: ["Product", "Go", "AI"],
    href: "https://hooglee.com",
    year: "2024–25",
  },
  {
    title: "AgentHLE Finance",
    desc: "SEC EDGAR XBRL extraction for IBD analysts",
    tags: ["Python"],
    href: "https://github.com/yslidev/agenthle-finance",
    year: "2026",
  },
  {
    title: "Global Student Startup Competition",
    desc: "Berkeley's first in Korea — organized as Head TA",
    tags: ["Teaching"],
    href: "#",
    year: "2024–25",
  },
];

const writing = [
  {
    title: "Notes on building search at a startup",
    desc: "Gemini embeddings, latency, and tradeoffs",
    href: "https://liyushan.notion.site",
    year: "2025",
  },
  {
    title: "Teaching 500 students to start companies",
    desc: "What I learned as Head TA at Berkeley",
    href: "https://liyushan.notion.site",
    year: "2025",
  },
];

const links = [
  { label: "github", href: "https://github.com/yslidev" },
  { label: "linkedin", href: "https://linkedin.com/in/yushan-li" },
  { label: "email", href: "mailto:yushanli@berkeley.edu" },
];

export default function Home() {
  return (
    <>
      <FishCanvas />

      <div className="page-content min-h-screen" style={{ background: "var(--background)" }}>

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
          style={{ background: "rgba(245,247,246,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #eaedeb" }}>
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="ysli"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span style={{ fontSize: "0.8rem", color: "#999", letterSpacing: "-0.01em" }}>ysli.dev</span>
          </a>
          <div className="flex items-center gap-8">
            {[["work", "#work"], ["writing", "#writing"], ["now", "#now"]].map(([label, href]) => (
              <a key={label} href={href}
                style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#bbb")}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero — single centered column */}
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "140px 32px 80px" }}>

          <p className="fade-up fade-up-1" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            Yushan Li
          </p>

          <p className="fade-up fade-up-2" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.02em", color: "#111", marginBottom: "28px" }}>
            CS & Cognitive Science at Berkeley.
            <br />
            <span style={{ color: "#999", fontWeight: 300 }}>Product, eng, and the space between.</span>
          </p>

          <p className="fade-up fade-up-3" style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#777", maxWidth: "480px", marginBottom: "32px" }}>
            I was the first junior hire at{" "}
            <a href="https://hooglee.com" target="_blank" rel="noopener noreferrer" className="text-link">Hooglee</a>
            {" "}— an ex-Google CEO's video AI startup — where I built search infrastructure end-to-end.
            Spent a year teaching 500+ students to build companies as Head TA at Berkeley.
            I care about interfaces that feel inevitable.
          </p>

          <div className="fade-up fade-up-4" style={{ display: "flex", gap: "20px" }}>
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
        </section>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ height: "1px", background: "var(--border)" }} />
        </div>

        {/* Work */}
        <section id="work" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 32px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            work
          </p>
          {work.map((p, i) => (
            <a key={i} href={p.href}
              target={p.href !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="superlink">
              <span className="superlink-title">{p.title}</span>
              <span className="superlink-desc">{p.desc}</span>
              <span className="superlink-year">{p.year}</span>
              <span className="superlink-arrow">↗</span>
            </a>
          ))}
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
            <a key={i} href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="superlink">
              <span className="superlink-title">{w.title}</span>
              <span className="superlink-desc">{w.desc}</span>
              <span className="superlink-year">{w.year}</span>
              <span className="superlink-arrow">↗</span>
            </a>
          ))}
          <p style={{ fontSize: "0.75rem", color: "#ccc", marginTop: "16px" }}>
            more on{" "}
            <a href="https://liyushan.notion.site" target="_blank" rel="noopener noreferrer" className="text-link" style={{ fontSize: "0.75rem", color: "#aaa" }}>
              notion
            </a>
          </p>
        </section>

        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ height: "1px", background: "var(--border)" }} />
        </div>

        {/* Now */}
        <section id="now" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 32px 80px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            now
          </p>
          <div style={{ fontSize: "0.875rem", color: "#777", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "12px", maxWidth: "440px" }}>
            <p>Third-year at UC Berkeley, CS & Cognitive Science. Full scholarship — Shelby Davis Foundation.</p>
            <p>Grew up in China, spent time in Canada, landed in California.</p>
            <p>Figure skating on the Cal team, 20+ countries, former national champion in artistic swimming.</p>
            <p>Currently figuring out what's next.</p>
          </div>

          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              ["CS & Cognitive Science", "UC Berkeley — Dec 2026"],
              ["Product + SWE", "Hooglee, Series A"],
              ["Head TA", "Berkeley Engineering Entrepreneurship"],
            ].map(([role, detail]) => (
              <div key={role} style={{ display: "flex", gap: "24px", fontSize: "0.75rem" }}>
                <span style={{ color: "#bbb", minWidth: "160px" }}>{role}</span>
                <span style={{ color: "#999" }}>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Water wave transition → banner */}
        <div className="water-transition">
          {/* SVG wave: transitions from page background to teal */}
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "120px", marginBottom: "-2px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--background)" />
                <stop offset="100%" stopColor="#4eb3b3" />
              </linearGradient>
            </defs>
            <rect width="1440" height="120" fill="url(#waveGrad)" />
            {/* Wave pattern lines suggesting water ripples */}
            <path d="M0,60 C200,30 400,90 600,60 C800,30 1000,80 1200,55 C1320,40 1380,65 1440,60 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.08)" />
            <path d="M0,75 C180,50 360,95 540,70 C720,45 900,85 1080,65 C1260,45 1350,75 1440,70 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.06)" />
            <path d="M0,90 C240,70 480,105 720,85 C960,65 1200,100 1440,85 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.04)" />
          </svg>
        </div>

        {/* Banner image */}
        <div style={{ position: "relative", width: "100%", height: "300px", marginTop: "-1px" }}>
          <Image
            src="/banner.jpg"
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Footer — matches banner ink color */}
        <footer style={{ background: "#1a1a1a", color: "#444", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>ysli.dev</p>
          <div style={{ display: "flex", gap: "20px" }}>
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
