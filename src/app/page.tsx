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

      {/* Fixed colorful banner at bottom — always visible like a skyline */}
      <div className="fixed-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner.jpg" alt="" />
      </div>

      <div className="page-content">

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
          style={{ background: "rgba(228,246,250,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid #9dd4db" }}>
          <a href="#" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="ysli" width={24} height={24} className="rounded-sm" />
            <span style={{ fontSize: "0.8rem", color: "#999", letterSpacing: "-0.01em" }}>ysli.dev</span>
          </a>
          <div className="flex items-center gap-8">
            {[["writing", "#writing"]].map(([label, href]) => (
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

          <p className="fade-up fade-up-1" style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#111", marginBottom: "32px" }}>
            Yushan Li
          </p>

          {/* About */}
          <p className="section-label fade-up fade-up-1">about</p>
          <div className="fade-up fade-up-2 prose-block">
            <p>
              Fourth-year CS + Cognitive Science at UC Berkeley, fully funded as a{" "}
              <a href="https://shelbydavisfoundation.org" target="_blank" rel="noopener noreferrer" className="text-link">Shelby Davis Scholar</a>.
              Currently researching X's open-source rec-sys and building the{" "}
              <a href="https://github.com/yslidev/agenthle-finance" target="_blank" rel="noopener noreferrer" className="text-link">AgentHLE benchmark</a>.
            </p>
            <p>
              In 2024–25 I was the first junior hire at{" "}
              <a href="https://hooglee.com" target="_blank" rel="noopener noreferrer" className="text-link">Hooglee</a>
              {" "}—{" "}
              <a href="https://www.forbes.com/sites/sarahemerson/2025/01/09/eric-schmidt-is-working-on-an-ai-startup-called-hooglee/" target="_blank" rel="noopener noreferrer" className="text-link">an NDA billionaire</a>
              's video AI startup — owning UX from day one to Series A.
              I shipped search & discovery as PM, built the account system as PM and admin dashboard as SWE,
              ran a 200+ creator influencer program as user ops, and won the internal hackathon on rec-sys user profiling.
            </p>
            <p>
              I also spent a year as Head TA for Berkeley's largest engineering startup class,
              mentored 500+ student founders, and helped organize the first{" "}
              <a href="https://entrepreneurship.berkeley.edu" target="_blank" rel="noopener noreferrer" className="text-link">Global Student Startup Competition</a>{" "}
              — sending teams to Korea.
            </p>
            <p>
              Say hi at{" "}
              <a href="mailto:yushanli@berkeley.edu" className="text-link">yushanli [at] berkeley.edu</a>!
            </p>
          </div>

          {/* Resume links */}
          <div className="fade-up fade-up-3" style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "20px 0 40px" }}>
            <a href="/resume_product.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">résumé — product ↗</a>
            <a href="/resume_engineering.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">résumé — engineering ↗</a>
          </div>

          {/* Living */}
          <p className="section-label fade-up fade-up-3">living</p>
          <div className="fade-up fade-up-4 prose-block">
            <p>
              Grew up in China, went to{" "}
              <a href="https://uwcsa.org" target="_blank" rel="noopener noreferrer" className="text-link">United World College</a>{" "}
              in 🇧🇦 where I studied Cultural Anthropology. 20+ countries and counting.
            </p>
            <p>
              I figure skate on the Cal team.
              I also used to be a national champion in artistic swimming — that was another life.
            </p>
            <p>
              I paint. I made this <span style={{ color: "#bbb" }}>logo & banner</span>.
            </p>
          </div>

          {/* Social links */}
          <div className="fade-up fade-up-5" style={{ display: "flex", flexWrap: "wrap", gap: "18px", margin: "16px 0 40px" }}>
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

        {/* Writing */}
        <section id="writing" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px 32px 60px" }}>
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


      </div>
    </>
  );
}
