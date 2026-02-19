"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

const projects = [
  {
    title: "Hooglee",
    desc: "First junior hire at an ex-Google CEO's video AI startup. Built Search & Discovery with Gemini embeddings (<200ms latency), led influencer program (200+ creators), won internal hackathon.",
    tags: ["Product", "GoLang", "AI"],
    href: "https://hooglee.com",
    year: "2024–25",
  },
  {
    title: "AgentHLE Finance",
    desc: "Automated SEC EDGAR XBRL extraction for IBD analysts — pulls financials, comps, and DCF inputs from 10-K/Q filings.",
    tags: ["Python", "SEC EDGAR"],
    href: "https://github.com/yslidev/agenthle-finance",
    year: "2026",
  },
  {
    title: "Berkeley Entrepreneurship Bootcamp",
    desc: "Head TA for ENGIN 183B. Mentored 500+ students, organized the first Global Student Startup Competition in Korea.",
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

      <div className="relative z-10" style={{ background: "var(--background)" }}>

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(to bottom, #0a0f1ef5, transparent)" }}>
          <a href="#" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.jpg"
              alt="ysli"
              width={28}
              height={28}
              className="rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-sm tracking-tight" style={{ color: "#666" }}>ysli.dev</span>
          </a>

          <div className="flex items-center gap-8">
            {[["work", "#work"], ["writing", "#writing"], ["now", "#now"]].map(([label, href]) => (
              <a key={label} href={href}
                className="text-xs uppercase tracking-widest transition-colors hover:text-white"
                style={{ color: "#444" }}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-end px-8 pb-20 pt-32 max-w-2xl mx-auto">
          <p className="fade-up fade-up-1 text-xs tracking-widest uppercase mb-8" style={{ color: "#444" }}>
            yushan li
          </p>

          <h1 className="fade-up fade-up-2 font-semibold leading-[1.08] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "var(--foreground)" }}>
            CS & CogSci at Berkeley.<br />
            <span style={{ color: "var(--accent)" }}>Product, eng, and the stuff in between.</span>
          </h1>

          <p className="fade-up fade-up-3 leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "0.9rem", color: "#666" }}>
            I was the first junior hire at Hooglee, built search & discovery for a video AI platform,
            and spent a year teaching 500 students how to start companies.
            I care about interfaces that feel inevitable, and software that does more than it says.
          </p>

          <div className="fade-up fade-up-4 flex items-center gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="underline-hover text-sm"
                style={{ color: "#555" }}>
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className="max-w-2xl mx-auto px-8 py-20">
          <p className="text-xs uppercase tracking-widest mb-10" style={{ color: "#3d4a6a" }}>work</p>

          <div className="flex flex-col gap-10">
            {projects.map((p, i) => (
              <a key={i} href={p.href}
                target={p.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group"
                style={{ textDecoration: "none" }}>
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className="text-base font-medium group-hover:text-orange-400 transition-colors duration-150"
                    style={{ color: "var(--foreground)" }}>
                    {p.title}
                    <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-sm" style={{ color: "var(--accent)" }}>↗</span>
                  </h2>
                  <span className="text-xs font-mono" style={{ color: "#3d4a6a" }}>{p.year}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>{p.desc}</p>
                <div className="flex gap-2">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-8"><div style={{ height: "1px", background: "#141929" }} /></div>

        {/* Writing */}
        <section id="writing" className="max-w-2xl mx-auto px-8 py-20">
          <p className="text-xs uppercase tracking-widest mb-10" style={{ color: "#3d4a6a" }}>writing</p>

          <p className="text-sm" style={{ color: "#444" }}>
            Braindumps and notes — coming soon.{" "}
            <a href="https://liyushan.notion.site" target="_blank" rel="noopener noreferrer"
              className="underline-hover" style={{ color: "#666" }}>
              Notion →
            </a>
          </p>
        </section>

        <div className="max-w-2xl mx-auto px-8"><div style={{ height: "1px", background: "#141929" }} /></div>

        {/* Now / About */}
        <section id="now" className="max-w-2xl mx-auto px-8 py-20">
          <p className="text-xs uppercase tracking-widest mb-10" style={{ color: "#3d4a6a" }}>now</p>

          <div className="flex flex-col gap-5 text-sm" style={{ color: "#555", lineHeight: "1.8" }}>
            <p>
              Third-year at UC Berkeley, CS & Cognitive Science. Full scholarship — Shelby Davis Foundation.
            </p>
            <p>
              I grew up in China, spent time in Canada, landed in California.
              I like problems at the edge of technology and human behavior.
            </p>
            <p>
              Outside of work: figure skating on the Cal team, 20+ countries visited,
              and former national champion in artistic swimming (2015).
            </p>
            <p>
              Currently looking for what&apos;s next.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            {[
              ["CS & Cognitive Science", "UC Berkeley, graduating Dec 2026"],
              ["Product + SWE", "Hooglee (ex-Google CEO's startup, Series A)"],
              ["Head TA", "Berkeley Engineering Entrepreneurship"],
            ].map(([role, detail]) => (
              <div key={role} className="flex gap-4 items-baseline text-sm">
                <span style={{ color: "#333", minWidth: "160px" }}>{role}</span>
                <span style={{ color: "#444" }}>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
          <Image
            src="/banner.jpg"
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #0a0f1e 0%, transparent 25%, transparent 75%, #0a0f1e 100%)" }}
          />
        </div>

        {/* Footer */}
        <footer className="max-w-2xl mx-auto px-8 py-10 flex items-center justify-between">
          <p className="text-xs font-mono" style={{ color: "#3d4a6a" }}>© {new Date().getFullYear()}</p>
          <div className="flex gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-xs underline-hover"
                style={{ color: "#333" }}>
                {l.label}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
