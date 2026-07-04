import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";
import { getSubstackPosts, writingFallback } from "@/lib/substack";

const links = [
  { label: "github", href: "https://github.com/yslidev" },
  { label: "linkedin", href: "https://linkedin.com/in/liyushan27" },
  { label: "substack", href: "https://liyushan27.substack.com" },
  { label: "email", href: "mailto:yushanli@berkeley.edu" },
];

const resumes = [
  { label: "eval product", href: "/resume_eval_product.pdf" },
  { label: "MLE (eval)", href: "/resume_mle_eval.pdf" },
  { label: "product ops", href: "/resume_product_ops.pdf" },
];

export default async function Home() {
  const writing = (await getSubstackPosts()) ?? writingFallback;

  return (
    <>
      <FishCanvas variant="day" />

      <header className="masthead fade-up fade-up-1">
        <a href="/" className="masthead-brand">
          <Image src="/logo.jpg" alt="Yushan Li's persimmon logo" width={34} height={34} />
          <span className="masthead-wordmark">Yushan Li</span>
        </a>
        <span className="masthead-meta">Berkeley, CA</span>
      </header>
      <hr className="rule" />

      <main style={{ position: "relative", zIndex: 5 }}>
        <section className="hero">
          <h1 className="fade-up fade-up-1">
            Yushan <em>Li</em>
          </h1>
          <p className="hero-statement fade-up fade-up-2">
            I build AI products, paint the water they swim in, and study the
            minds that use them.
          </p>
          <p className="hero-meta fade-up fade-up-3">
            <span>CS + Cognitive Science, UC Berkeley</span>
            <span className="dot">·</span>
            <span>Shelby Davis Scholar</span>
          </p>
        </section>

        <div className="frame-wrap fade-up fade-up-3">
          <figure className="frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/banner.jpg" alt="Painting by Yushan Li: ink fish swimming through teal water above a skyline of cities she has lived in" />
            <figcaption className="frame-caption">
              <span>Cities I&apos;ve lived in, underwater — painted by me</span>
              <span className="num">no. 01</span>
            </figcaption>
          </figure>
        </div>

        {/* 01 — Now */}
        <section className="section" id="now">
          <div className="section-marker fade-up fade-up-3">
            <span className="section-num">01</span>
            <span className="section-label">Now</span>
          </div>
          <div className="section-body fade-up fade-up-4">
            <div className="prose-block">
              <p>
                I&apos;m a fourth-year studying CS + Cognitive Science at UC Berkeley,
                fully funded as a{" "}
                <a href="https://www.davisuwcscholars.org/" target="_blank" rel="noopener noreferrer" className="text-link">Shelby Davis Scholar</a>.
                Currently researching X&apos;s open-source rec-sys and building the
                AgentHLE benchmark.
              </p>
            </div>
            <div className="chip-row">
              {resumes.map((r) => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" className="chip">
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — Before */}
        <section className="section" id="before">
          <div className="section-marker fade-up fade-up-4">
            <span className="section-num">02</span>
            <span className="section-label">Before</span>
          </div>
          <div className="section-body fade-up fade-up-4">
            <div className="prose-block">
              <p>
                In 2024–25 I was the first junior hire at{" "}
                <a href="https://dipper.com/" target="_blank" rel="noopener noreferrer" className="text-link">Dipper</a>
                {" "}(<a href="https://www.forbes.com.au/news/innovation/eric-schmidts-new-secret-project-is-an-ai-video-platform-called-hooglee/" target="_blank" rel="noopener noreferrer" className="text-link">Eric Schmidt</a>&apos;s
                video AI startup), owning everything UX from day one to Series A.
                I also sidequested a lot within the company:
              </p>
              <ul className="bullet-list">
                <li>Shipped search &amp; discovery — as PM</li>
                <li>Built the account system — as PM</li>
                <li>Built the admin dashboard — as SWE</li>
                <li>Ran a 200+ creator influencer program — as user ops</li>
                <li>Won the internal hackathon on rec-sys user profiling</li>
              </ul>
              <p>
                I also spent a year as Head TA for{" "}
                <a href="https://scet.berkeley.edu/students/courses/berkeley-method-of-entrepreneurship-bootcamp/" target="_blank" rel="noopener noreferrer" className="text-link">Berkeley&apos;s largest engineering startup class</a>
                {" "}and{" "}
                <a href="https://scet.berkeley.edu/students/courses/how-to-be-a-futurist/" target="_blank" rel="noopener noreferrer" className="text-link">How to Be a Futurist</a>,
                mentored 500+ student founders, and helped organize the first{" "}
                <a href="https://globalstudentstartup.org/" target="_blank" rel="noopener noreferrer" className="text-link">Global Student Startup Competition</a>{" "}
                — sending teams to Korea.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — Writing */}
        <section className="section" id="writing">
          <div className="section-marker fade-up fade-up-4">
            <span className="section-num">03</span>
            <span className="section-label">Writing</span>
          </div>
          <div className="section-body fade-up fade-up-5">
            {writing.map((w, i) => (
              <a key={i} href={w.href} target="_blank" rel="noopener noreferrer" className="superlink">
                <span className="superlink-title">{w.title}</span>
                {w.desc && <span className="superlink-desc">{w.desc}</span>}
                <span className="superlink-year">{w.year}</span>
                <span className="superlink-arrow">↗</span>
              </a>
            ))}
            <p className="more-line">
              more on{" "}
              <a href="https://liyushan27.substack.com" target="_blank" rel="noopener noreferrer" className="text-link">
                Substack
              </a>
            </p>
          </div>
        </section>

        {/* 04 — Living */}
        <section className="section" id="living">
          <div className="section-marker fade-up fade-up-5">
            <span className="section-num">04</span>
            <span className="section-label">Living</span>
          </div>
          <div className="section-body fade-up fade-up-5">
            <div className="prose-block">
              <p>
                I grew up in China and did high school at{" "}
                <a href="https://uwc.org/school/uwc-mostar/" target="_blank" rel="noopener noreferrer" className="text-link">United World College</a>{" "}
                in 🇧🇦, where I somehow ended up studying Cultural Anthropology
                instead of anything practical. I&apos;ve been to 20+ countries since —
                the list keeps growing and I have no plans to stop.
              </p>
              <p>
                Right now I figure skate with the Cal team. A long time before
                that, I was a national champion in artistic swimming. I barely
                talk about it anymore, but it probably shaped how I think about
                discipline more than anything else has.
              </p>
              <p>
                I paint too. The persimmon logo and the painting above are mine.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <h2>Say hi —</h2>
          <div className="footer-links">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="colophon">
            <span>Designed, painted, and fish-fed by Yushan Li</span>
            <Image src="/logo.jpg" alt="" width={26} height={26} />
          </div>
        </div>
      </footer>
    </>
  );
}
