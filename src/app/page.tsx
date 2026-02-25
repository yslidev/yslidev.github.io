import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";

interface WritingEntry {
  title: string;
  desc: string;
  href: string;
  year: string;
}

const writingFallback: WritingEntry[] = [
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

async function getSubstackPosts(): Promise<WritingEntry[] | null> {
  try {
    const res = await fetch(
      "https://liyushan27.substack.com/api/v1/posts?limit=5",
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.map(
      (post: {
        title?: string;
        subtitle?: string;
        canonical_url?: string;
        slug?: string;
        post_date?: string;
      }) => {
        // Only accept https:// URLs from the API to prevent javascript: injection
        const href =
          post.canonical_url?.startsWith("https://")
            ? post.canonical_url
            : `https://liyushan27.substack.com/p/${post.slug ?? ""}`;
        let year = "";
        if (post.post_date) {
          const d = new Date(post.post_date);
          if (!isNaN(d.getTime())) {
            year = d.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
          }
        }
        return {
          title: post.title ?? "",
          desc: post.subtitle ?? "",
          href,
          year,
        };
      }
    );
  } catch {
    return null;
  }
}

const links = [
  { label: "github", href: "https://github.com/yslidev" },
  { label: "linkedin", href: "https://linkedin.com/in/liyushan27" },
  { label: "substack", href: "https://liyushan27.substack.com" },
  { label: "email", href: "mailto:yushanli@berkeley.edu" },
];

export default async function Home() {
  const writing = (await getSubstackPosts()) ?? writingFallback;

  return (
    <>
      <FishCanvas />

      {/* Banner — z-index 1, sits below the glass pane */}
      <div className="hero-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banner.jpg" alt="" />
      </div>

      <div className="page-content">

        {/* About */}
        <section id="about" style={{ maxWidth: "600px", margin: "0 auto", padding: "44px 32px 48px" }}>
          <p className="fade-up fade-up-1" style={{ fontSize: "1.05rem", fontWeight: 500, color: "#222", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            Welcome! I am Yushan!
            <Image src="/icon.jpg" alt="Yushan" width={36} height={36} style={{ borderRadius: "50%", display: "inline-block", verticalAlign: "middle", flexShrink: 0 }} />
          </p>
          <div className="fade-up fade-up-2 prose-block">
            <p>
              I'm a fourth-year studying CS + Cognitive Science at UC Berkeley, fully funded as a{" "}
              <a href="https://www.davisuwcscholars.org/" target="_blank" rel="noopener noreferrer" className="text-link">Shelby Davis Scholar</a>.
              I'm currently researching X's open-source rec-sys and building the AgentHLE benchmark.
            </p>
            <p>
              In 2024–25 I was the first junior hire at{" "}
              <a href="https://www.forbes.com.au/news/innovation/eric-schmidts-new-secret-project-is-an-ai-video-platform-called-hooglee/" target="_blank" rel="noopener noreferrer" className="text-link">Eric Schmidt</a>
              's video AI startup, owning everything UX from day one to Series A. I also sidequested a lot within the company:
            </p>
            <ul className="bullet-list">
              <li>Shipped search & discovery — as PM</li>
              <li>Built the account system — as PM</li>
              <li>Built the admin dashboard — as SWE</li>
              <li>Ran a 200+ creator influencer program — as user ops</li>
              <li>Won the internal hackathon on rec-sys user profiling</li>
            </ul>
            <p>
              I also spent a year as Head TA for{" "}
              <a href="https://scet.berkeley.edu/students/courses/berkeley-method-of-entrepreneurship-bootcamp/" target="_blank" rel="noopener noreferrer" className="text-link">Berkeley's largest engineering startup class</a>
              {" "}and{" "}
              <a href="https://scet.berkeley.edu/students/courses/how-to-be-a-futurist/" target="_blank" rel="noopener noreferrer" className="text-link">How to Be a Futurist</a>,
              mentored 500+ student founders, and helped organize the first{" "}
              <a href="https://globalstudentstartup.org/" target="_blank" rel="noopener noreferrer" className="text-link">Global Student Startup Competition</a>{" "}
              — sending teams to Korea.
            </p>
          </div>
          <div className="fade-up fade-up-3" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
            <a href="/resume_product.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">résumé — product ↗</a>
            <a href="/resume_engineering.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">résumé — engineering ↗</a>
          </div>
        </section>

        {/* Living */}
        <section id="living" style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px 48px" }}>
          <p className="section-label fade-up fade-up-3">living</p>
          <div className="fade-up fade-up-4 prose-block">
            <p>
              I grew up in China and did high school at{" "}
              <a href="https://uwc.org/school/uwc-mostar/" target="_blank" rel="noopener noreferrer" className="text-link">United World College</a>{" "}
              in 🇧🇦, where I somehow ended up studying Cultural Anthropology instead of anything practical.
              I've been to 20+ countries since — the list keeps growing and I have no plans to stop.
            </p>
            <p>
              Right now I figure skate with the Cal team. A long time before that, I was a national champion in artistic swimming.
              I barely talk about it anymore, but it probably shaped how I think about discipline more than anything else has.
            </p>
            <p>
              I paint too. The <span style={{ color: "#666" }}>logo and banner</span> on this page are mine.
            </p>
          </div>
        </section>

        {/* Writing */}
        <section id="writing" style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px 48px" }}>
          <p className="section-label fade-up fade-up-4">writing</p>
          {writing.map((w, i) => (
            <a key={i} href={w.href} target="_blank" rel="noopener noreferrer" className="superlink">
              <span className="superlink-title">{w.title}</span>
              {w.desc && <span className="superlink-desc">{w.desc}</span>}
              <span className="superlink-year">{w.year}</span>
              <span className="superlink-arrow">↗</span>
            </a>
          ))}
          <p style={{ fontSize: "0.75rem", color: "#666", marginTop: "16px" }}>
            more on{" "}
            <a href="https://liyushan27.substack.com" target="_blank" rel="noopener noreferrer"
              className="text-link" style={{ fontSize: "0.75rem", color: "#666" }}>
              Substack
            </a>
          </p>
        </section>

        {/* Contact */}
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 32px 80px" }}>
          <p className="section-label fade-up fade-up-5">say hi</p>
          <div className="fade-up fade-up-5" style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-link"
                style={{ fontSize: "0.8rem", color: "#666" }}>
                {l.label}
              </a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
