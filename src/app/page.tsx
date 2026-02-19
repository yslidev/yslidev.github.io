"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

const projects = [
  {
    title: "Hooglee",
    desc: "First junior hire at an ex-Google CEO's video AI startup. Built Search & Discovery end-to-end with Gemini embeddings (<200ms latency), led a 200+ creator influencer program, won the internal hackathon.",
    tags: ["Product", "GoLang", "AI"],
    href: "https://hooglee.com",
    year: "2024–25",
  },
  {
    title: "AgentHLE Finance",
    desc: "Automated SEC EDGAR XBRL extraction — pulls financials, comps, and DCF inputs from 10-K/Q filings for IBD analysts.",
    tags: ["Python", "SEC EDGAR"],
    href: "https://github.com/yslidev/agenthle-finance",
    year: "2026",
  },
  {
    title: "Global Student Startup Competition",
    desc: "Organized Berkeley's first Global Student Startup Competition in Korea as Head TA. Mentored the champion team. Also mentored 500+ students in ENGIN 183B.",
    tags: ["Teaching", "Startups"],
    href: "#",
    year: "2024–25",
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

      <div className="relative z-10 min-h-screen" style={{ background: "var(--background)" }}>

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
          style={{ background: "rgba(244,246,245,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #eaedeb" }}>
          <a href="#" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.jpg"
              alt="ysli"
              width={26}
              height={26}
              className="rounded-sm"
            />
            <span className="text-sm" style={{ color: "#aaa", letterSpacing: "-0.01em" }}>ysli.dev</span>
          </a>
          <div className="flex items-center gap-8">
            {[["work", "#work"], ["now", "#now"]].map(([label, href]) => (
              <a key={label} href={href}
                className="text-xs uppercase tracking-widest transition-colors hover:text-black"
                style={{ color: "#bbb" }}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-2xl mx-auto px-8 pt-40 pb-24">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-6" style={{ color: "#bbb" }}>
            yushan li
          </p>

          <h1 className="fade-up fade-up-2 font-semibold leading-[1.1] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", color: "#111" }}>
            CS & CogSci at Berkeley.<br />
            <span style={{ color: "var(--accent)" }}>Product, eng, and the&nbsp;stuff&nbsp;in&nbsp;between.</span>
          </h1>

          <p className="fade-up fade-up-3 leading-relaxed mb-8 max-w-md"
            style={{ fontSize: "0.9rem", color: "#888" }}>
            I was the first junior hire at Hooglee — an ex-Google CEO's video AI startup.
            Spent a year building search infrastructure and teaching 500 students to start companies.
            I care about interfaces that feel inevitable.
          </p>

          <div className="fade-up fade-up-4 flex items-center gap-5">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="underline-hover text-sm"
                style={{ color: "#999" }}>
                {l.label}
              </a>
            ))}
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-8"><div style={{ height: "1px", background: "var(--border)" }} /></div>

        {/* Work */}
        <section id="work" className="max-w-2xl mx-auto px-8 py-20">
          <p className="text-xs uppercase tracking-widest mb-10" style={{ color: "#bbb" }}>work</p>
          <div className="flex flex-col gap-10">
            {projects.map((p, i) => (
              <a key={i} href={p.href}
                target={p.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group"
                style={{ textDecoration: "none" }}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <h2 className="text-sm font-medium transition-colors duration-150"
                    style={{ color: "#111" }}>
                    <span className="group-hover:text-orange-500 transition-colors">{p.title}</span>
                    {p.href !== "#" && (
                      <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }}>↗</span>
                    )}
                  </h2>
                  <span className="text-xs font-mono" style={{ color: "#ccc" }}>{p.year}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#999" }}>{p.desc}</p>
                <div className="flex gap-2">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-8"><div style={{ height: "1px", background: "var(--border)" }} /></div>

        {/* Now */}
        <section id="now" className="max-w-2xl mx-auto px-8 py-20">
          <p className="text-xs uppercase tracking-widest mb-10" style={{ color: "#bbb" }}>now</p>

          <div className="flex flex-col gap-4 max-w-md" style={{ fontSize: "0.9rem", color: "#888", lineHeight: "1.85" }}>
            <p>Third-year at UC Berkeley, CS & Cognitive Science. Full scholarship — Shelby Davis Foundation.</p>
            <p>I grew up in China, spent time in Canada, landed in California.</p>
            <p>
              Outside of work: figure skating on the Cal team, 20+ countries,
              former national champion in artistic swimming.
            </p>
            <p>Currently figuring out what's next.</p>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {[
              ["CS & Cognitive Science", "UC Berkeley, Dec 2026"],
              ["Product + SWE intern", "Hooglee — Series A"],
              ["Head Teaching Assistant", "Berkeley Engineering Entrepreneurship"],
            ].map(([role, detail]) => (
              <div key={role} className="flex gap-6 text-xs">
                <span style={{ color: "#bbb", minWidth: "180px" }}>{role}</span>
                <span style={{ color: "#999" }}>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Banner — full width, taller, no fade so the art shows */}
        <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
          <Image
            src="/banner.jpg"
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Footer */}
        <footer style={{ background: "#111", color: "#444" }}
          className="px-8 py-6 flex items-center justify-between">
          <p className="text-xs font-mono">ysli.dev</p>
          <div className="flex gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#555" }}>
                {l.label}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
