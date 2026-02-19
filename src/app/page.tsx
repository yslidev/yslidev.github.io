"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

const work = [
  {
    title: "Hooglee",
    desc: "0→1 product hire at Eric Schmidt's video AI startup. Owned UX & user testing; shipped search/discovery (PM), account system (PM), admin dashboard (SWE).",
    tags: ["Product", "Go", "AI"],
    href: "https://hooglee.com",
    articleHref: "https://www.forbes.com/sites/sarahemerson/2025/01/09/eric-schmidt-is-working-on-an-ai-startup-called-hooglee/",
    year: "2024–25",
  },
  {
    title: "AgentHLE Finance",
    desc: "Automated SEC EDGAR XBRL extraction — pulls financials, comps, and DCF inputs from 10-K/Q filings for IBD analysts.",
    tags: ["Python", "SEC EDGAR"],
    href: "https://github.com/yslidev/agenthle-finance",
    articleHref: null,
    year: "2026",
  },
  {
    title: "Global Student Startup Competition",
    desc: "Organized Berkeley's first Global Student Startup Competition in Korea as Head TA. Mentored the champion team and 500+ students in ENGIN 183B.",
    tags: ["Teaching", "Startups"],
    href: "#",
    articleHref: null,
    year: "2024–25",
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

        {/* Hero */}
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "140px 32px 80px" }}>

          <p className="fade-up fade-up-1" style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
            Yushan Li
          </p>

          <p className="fade-up fade-up-2" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#111", marginBottom: "28px" }}>
            CS<sup style={{ fontSize: "0.6em" }}>2</sup> at Berkeley.{" "}
            <span style={{ color: "#999", fontWeight: 300 }}>Building things, figuring the rest out.</span>
          </p>

          <p className="fade-up fade-up-3" style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "#777", maxWidth: "480px", marginBottom: "32px" }}>
            I study CS + Cognitive Science at UC Berkeley, fully sponsored as a{" "}
            <a href="https://shelbydavisfoundation.org" target="_blank" rel="noopener noreferrer" className="text-link">Shelby Davis Scholar</a>.
            Before that, I went to{" "}
            <a href="https://uwcsa.org" target="_blank" rel="noopener noreferrer" className="text-link">United World College</a>{" "}
            in 🇧🇦 and studied Cultural Anthropology.
            I travel, paint, and occasionally make things — including this{" "}
            <span style={{ color: "#bbb" }}>logo & banner</span>.
          </p>

          <div className="fade-up fade-up-5" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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
            <div key={i} className="superlink-wrapper">
              <a href={p.href}
                target={p.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="superlink">
                <span className="superlink-title">{p.title}</span>
                <span className="superlink-desc">{p.desc}</span>
                <span className="superlink-year">{p.year}</span>
                <span className="superlink-arrow">↗</span>
              </a>
              {p.articleHref && (
                <p style={{ fontSize: "0.72rem", color: "#bbb", padding: "4px 0 10px", borderBottom: "1px solid #ececec" }}>
                  <a href={p.articleHref} target="_blank" rel="noopener noreferrer"
                    className="text-link" style={{ fontSize: "0.72rem", color: "#bbb" }}>
                    Forbes ↗
                  </a>
                  {" "}— first journalist to report on Hooglee
                </p>
              )}
            </div>
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
            <p>Fourth-year at UC Berkeley. Grew up in China, spent time in Canada, landed in California.</p>
            <p>On campus I skate, paint, and try to visit a new country every few months. Former national champion in artistic swimming, though that was another life.</p>
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
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "120px", marginBottom: "-2px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5f7f6" />
                <stop offset="100%" stopColor="#5ec2c2" />
              </linearGradient>
            </defs>
            <rect width="1440" height="120" fill="url(#waveGrad)" />
            <path d="M0,60 C200,30 400,90 600,60 C800,30 1000,80 1200,55 C1320,40 1380,65 1440,60 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.09)" />
            <path d="M0,75 C180,50 360,95 540,70 C720,45 900,85 1080,65 C1260,45 1350,75 1440,70 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.06)" />
            <path d="M0,90 C240,70 480,105 720,85 C960,65 1200,100 1440,85 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.04)" />
          </svg>
        </div>

        {/* Banner */}
        <div style={{ position: "relative", width: "100%", height: "300px", marginTop: "-1px" }}>
          <Image
            src="/banner.jpg"
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
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
