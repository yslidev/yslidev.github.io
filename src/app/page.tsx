"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

const currentWork = [
  {
    title: "X (Twitter) Rec-Sys",
    role: "Research",
    year: "2025–26",
    href: "https://github.com/twitter/the-algorithm",
    forbesNote: null,
    tags: ["Research", "Rec-Sys", "Open Source"],
    bullets: [
      "Studying Twitter's open-source recommendation algorithm and contributing to research on social media content ranking and distribution.",
    ],
  },
  {
    title: "AgentHLE Benchmark",
    role: "Open Source",
    year: "2026",
    href: "https://github.com/yslidev/agenthle-finance",
    forbesNote: null,
    tags: ["Python", "Evals", "AI"],
    bullets: [
      "Helping build AgentHLE — an agentic benchmark for evaluating AI on expert-level tasks. Finance module: automated SEC EDGAR XBRL extraction for IBD analysts.",
    ],
  },
];

const prevWork = [
  {
    title: "Hooglee",
    role: "Product Intern (& SWE)",
    year: "2024–25",
    href: "https://hooglee.com",
    forbesNote: "as reported by Forbes",
    tags: ["Product", "Go", "AI"],
    bullets: [
      "First junior hire at ex-Google CEO's video AI startup — reporting to ex-TikTok Head of Product, from day one to Series A.",
      "Owned Search & Discovery end-to-end: PRD, design, cross-functional launch with 2 engineers. Gemini 2.5 Pro embeddings + vector retrieval, <200ms latency.",
      "Built account system, notifications, and admin panel for trust & safety and growth analytics.",
      "Built user research funnel and 4-batch influencer program (200+ creators), 100+ interviews to validate PMF.",
      "Won internal hackathon — context personalization became the foundation for the content discovery system.",
      "Refactored GoLang services (identity UID, middleware, notifications APIs) as platform scaled to Series A.",
    ],
  },
  {
    title: "Head Teaching Assistant",
    role: "UC Berkeley College of Engineering",
    year: "2024–25",
    href: "https://entrepreneurship.berkeley.edu/engin-183b/",
    forbesNote: null,
    tags: ["Teaching", "Startups"],
    bullets: [
      "Head TA for ENGIN 183B — Berkeley's largest startup class for engineering students, 500+ students per semester.",
      "Organized Berkeley's first Global Student Startup Competition in Korea; mentored the champion team.",
      "Directed market research of 300+ startups across AI, blockchain, and healthcare for ENGIN 283. Produced an eBook on future technology trends.",
    ],
  },
];

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

function WorkEntry({ p }: { p: typeof prevWork[0] }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
          <a href={p.href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "0.9rem", fontWeight: 500, color: "#111", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "#111")}>
            {p.title} ↗
          </a>
          <span style={{ fontSize: "0.75rem", color: "#bbb" }}>{p.role}</span>
        </div>
        <span style={{ fontSize: "0.7rem", color: "#ccc", fontFamily: "monospace", flexShrink: 0, marginLeft: "8px" }}>{p.year}</span>
      </div>
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
        {p.bullets.map((b, j) => (
          <li key={j} style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.7, paddingLeft: "12px", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "#ccc" }}>·</span>
            {b}
          </li>
        ))}
      </ul>
      {"forbesNote" in p && p.forbesNote && (
        <p style={{ marginTop: "8px", fontSize: "0.72rem", color: "#bbb", fontStyle: "italic" }}>{p.forbesNote}</p>
      )}
    </div>
  );
}

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

        {/* Hero */}
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "140px 32px 80px" }}>
          <p className="fade-up fade-up-1" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#111", marginBottom: "28px" }}>
            Yushan Li
          </p>

          <p className="fade-up fade-up-2" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "16px" }}>
            Previously built product at{" "}
            <a href="https://hooglee.com" target="_blank" rel="noopener noreferrer" className="text-link">Hooglee</a>
            {" "}— Eric Schmidt's video AI startup — as first junior hire, reporting to the ex-TikTok Head of Product.
            Also ran Berkeley's largest engineering startup class as Head TA, mentoring 500+ students and organizing the{" "}
            <a href="https://entrepreneurship.berkeley.edu" target="_blank" rel="noopener noreferrer" className="text-link">Global Student Startup Competition</a>{" "}
            in Korea.
          </p>

          <p className="fade-up fade-up-3" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "32px" }}>
            CS + Cognitive Science at UC Berkeley, fully sponsored as a{" "}
            <a href="https://shelbydavisfoundation.org" target="_blank" rel="noopener noreferrer" className="text-link">Shelby Davis Scholar</a>.
            {" "}Before that, I went to{" "}
            <a href="https://uwcsa.org" target="_blank" rel="noopener noreferrer" className="text-link">United World College</a>{" "}
            in 🇧🇦 and studied Cultural Anthropology.
            I travel, paint, and make things — including this logo & banner.
          </p>

          <div className="fade-up fade-up-4" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "28px" }}>
            now
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "36px", marginBottom: "52px" }}>
            {currentWork.map((p, i) => <WorkEntry key={i} p={p} />)}
          </div>

          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "28px" }}>
            prev
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {prevWork.map((p, i) => <WorkEntry key={i} p={p} />)}
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
        <section id="now" style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 32px 80px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            now
          </p>
          <div style={{ fontSize: "0.875rem", color: "#777", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "10px", maxWidth: "440px" }}>
            <p>Fourth-year at UC Berkeley. Grew up in China, went to school in Bosnia, landed in California.</p>
            <p>I skate, paint, and try to visit a new country every few months. Former national champion in artistic swimming — that was another life.</p>
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
            {/* White wave ripples echoing the banner illustration */}
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
