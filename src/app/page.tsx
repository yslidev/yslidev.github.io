"use client";

import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    title: "AgentHLE Finance",
    desc: "Automated SEC EDGAR XBRL extraction for IBD analysts. Pulls financials, comps, and DCF inputs from 10-K/Q filings with 100% accuracy targets.",
    tags: ["Python", "SEC EDGAR", "Finance"],
    href: "https://github.com/yslidev/agenthle-finance",
    year: "2026",
  },
  {
    title: "Unwind",
    desc: "A project exploring how people decompress. Built during a late-night stretch of curiosity.",
    tags: ["Design", "App"],
    href: "https://github.com/yslidev/unwind",
    year: "2024",
  },
  {
    title: "WalkWithMe",
    desc: "CS160 HCI project — a companion app for solo walks, designed around safety and light social connection.",
    tags: ["HCI", "Mobile", "UX Research"],
    href: "#",
    year: "2025",
  },
];

const writings = [
  {
    title: "On building things when you don't know what you're doing",
    date: "Feb 2026",
    desc: "A braindump on starting projects before you feel ready.",
  },
  {
    title: "What Socratica taught me about showing up",
    date: "Jan 2026",
    desc: "Notes from a semester of maker dinners and unfinished ideas.",
  },
  {
    title: "Finance as a lens, not a career",
    date: "Dec 2025",
    desc: "Why I keep building finance tools even though I'm not going to Wall Street.",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/yslidev" },
  { label: "Notion", href: "https://liyushan.notion.site" },
  { label: "Email", href: "mailto:yushan@berkeley.edu" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <FishCanvas />

      <div className="relative z-10 min-h-screen" style={{ background: "var(--background)" }}>

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
          style={{ background: "linear-gradient(to bottom, #080808ee, transparent)" }}>
          <a href="#" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/logo.svg"
              alt="ysli"
              width={32}
              height={32}
              className="rounded-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="text-sm font-medium tracking-tight" style={{ color: "var(--foreground)" }}>
              ysli.dev
            </span>
          </a>

          <div className="flex items-center gap-8">
            {["work", "writing", "about"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="text-xs uppercase tracking-widest transition-colors"
                style={{ color: activeSection === s ? "var(--accent)" : "var(--muted)" }}
                onMouseEnter={() => setActiveSection(s)}
                onMouseLeave={() => setActiveSection(null)}
              >
                {s}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col justify-end min-h-screen px-8 pb-24 pt-32 max-w-3xl mx-auto">
          <div className="fade-up fade-up-1">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--muted)" }}>
              yushan li · berkeley, ca
            </p>
          </div>

          <h1 className="fade-up fade-up-2 text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.1] mb-8"
            style={{ color: "var(--foreground)" }}>
            Student.<br />
            Builder.<br />
            <span style={{ color: "var(--accent)" }}>Occasional deep-thinker.</span>
          </h1>

          <p className="fade-up fade-up-3 text-lg leading-relaxed max-w-xl mb-10"
            style={{ color: "var(--muted)", fontSize: "1rem" }}>
            I study CS + Cognitive Science at UC Berkeley and spend my nights building
            things I find interesting — finance tools, interaction experiments, small
            software for real problems. I care a lot about how people think, what
            makes a good interface, and why most things are under-designed.
            Currently into AI agents, HCI research, and the Socratica way of doing things.
          </p>

          <div className="fade-up fade-up-4 flex flex-wrap items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="underline-hover text-sm"
                style={{ color: "var(--foreground)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-8">
          <div style={{ height: "1px", background: "var(--border)" }} />
        </div>

        {/* Work */}
        <section id="work" className="max-w-3xl mx-auto px-8 py-24">
          <p className="text-xs uppercase tracking-widest mb-12" style={{ color: "var(--muted)" }}>
            Selected Work
          </p>

          <div className="flex flex-col gap-12">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.href}
                target={p.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h2
                    className="text-xl font-medium tracking-tight transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    <span className="group-hover:text-orange-400 transition-colors duration-200">
                      {p.title}
                    </span>
                    <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }}>
                      ↗
                    </span>
                  </h2>
                  <span className="text-xs font-mono mt-1" style={{ color: "var(--muted)" }}>
                    {p.year}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  {p.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-8">
          <div style={{ height: "1px", background: "var(--border)" }} />
        </div>

        {/* Writing */}
        <section id="writing" className="max-w-3xl mx-auto px-8 py-24">
          <p className="text-xs uppercase tracking-widest mb-12" style={{ color: "var(--muted)" }}>
            Writing / Braindumps
          </p>

          <div className="flex flex-col gap-10">
            {writings.map((w, i) => (
              <div key={i} className="group flex gap-8 items-start">
                <span className="text-xs font-mono pt-1 shrink-0" style={{ color: "#333" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="text-base font-medium mb-2 transition-colors cursor-default"
                    style={{ color: "var(--foreground)" }}
                  >
                    {w.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                    {w.desc}
                  </p>
                  <span className="text-xs font-mono" style={{ color: "#333" }}>
                    {w.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-16 text-sm italic" style={{ color: "#2a2a2a" }}>
            More on Notion →
          </p>
        </section>

        {/* About */}
        <section id="about" className="max-w-3xl mx-auto px-8 py-24">
          <div style={{ height: "1px", background: "var(--border)", marginBottom: "96px" }} />

          <p className="text-xs uppercase tracking-widest mb-12" style={{ color: "var(--muted)" }}>
            About
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <p className="text-sm leading-loose" style={{ color: "var(--muted)" }}>
                I&apos;m a third-year at UC Berkeley studying Computer Science and Cognitive Science.
                I grew up in China, moved to Canada, ended up in California. I like problems
                that sit at the edge of technology and human behavior — which is why HCI,
                AI agents, and behavioral finance all feel like the same thing to me.
              </p>
              <br />
              <p className="text-sm leading-loose" style={{ color: "var(--muted)" }}>
                When I&apos;m not building, I&apos;m probably reading something about decision-making,
                arguing about product decisions with friends, or trying to make my Notion
                more organized (it never is).
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#333" }}>
                  Currently
                </p>
                <ul className="text-sm flex flex-col gap-2" style={{ color: "var(--muted)" }}>
                  <li>← CS + Cognitive Science @ Berkeley</li>
                  <li>← Building agentic finance tools</li>
                  <li>← HCI research (CS160)</li>
                  <li>← Socratica attendee</li>
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#333" }}>
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {["HCI", "AI Agents", "Behavioral Finance", "Product", "Language", "Design"].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner */}
        <div className="relative w-full mt-12 overflow-hidden" style={{ height: "200px" }}>
          <Image
            src="/banner.png"
            alt="banner"
            fill
            className="object-cover object-top"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.style.display = 'none';
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #080808 0%, transparent 30%, transparent 70%, #080808 100%)",
            }}
          />
        </div>

        {/* Footer */}
        <footer className="max-w-3xl mx-auto px-8 py-12 flex items-center justify-between">
          <p className="text-xs font-mono" style={{ color: "#2a2a2a" }}>
            ysli.dev · {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-xs underline-hover"
                style={{ color: "#333" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
