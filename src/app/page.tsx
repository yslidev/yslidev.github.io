import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import Image from "next/image";
import Link from "next/link";
import { getSubstackPosts, writingFallback } from "@/lib/substack";
import { colors, fonts } from "./globalTokens.stylex";

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

const tickerItems = [
  "ai products",
  "painter",
  "figure skater",
  "20+ countries",
  "rec-sys nerd",
  "artistic swimming champion",
  "cognitive science",
  "500+ founders mentored",
];

const fadeUp = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(14px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const scroll = stylex.keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-50%)" },
});

const styles = stylex.create({
  // ── shared ──
  fade: {
    opacity: 0,
    animationName: fadeUp,
    animationDuration: "0.7s",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
  },
  d1: { animationDelay: "0.05s" },
  d2: { animationDelay: "0.18s" },
  d3: { animationDelay: "0.3s" },
  d4: { animationDelay: "0.42s" },
  d5: { animationDelay: "0.54s" },

  main: { position: "relative", zIndex: 5 },

  // ── masthead ──
  masthead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 1060,
    marginInline: "auto",
    padding: { default: "26px 40px", "@media (max-width: 720px)": "20px 22px" },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    textDecoration: "none",
    color: colors.navy,
  },
  brandLogo: {
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.navy,
    boxShadow: `3px 3px 0 ${colors.teal}`,
    transform: { default: "rotate(-8deg)", ":hover": "rotate(8deg)" },
    transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  wordmark: {
    fontSize: "0.74rem",
    fontWeight: 700,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
  },
  mastheadPill: {
    fontSize: "0.62rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.tealInk,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.teal,
    borderRadius: 999,
    padding: "5px 14px",
    transform: "rotate(2deg)",
  },
  rule: {
    borderStyle: "none",
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: colors.navy,
    maxWidth: 1060,
    marginInline: "auto",
  },

  // ── hero ──
  hero: {
    maxWidth: 1060,
    marginInline: "auto",
    padding: { default: "84px 40px 56px", "@media (max-width: 720px)": "52px 22px 40px" },
  },
  h1: {
    fontFamily: fonts.serif,
    fontWeight: 340,
    fontSize: "clamp(3.6rem, 10vw, 7.6rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.02em",
    color: colors.navy,
  },
  h1Li: {
    fontStyle: "italic",
    fontWeight: 600,
    color: colors.persimmon,
  },
  h1Star: {
    display: "inline-block",
    fontStyle: "normal",
    fontSize: "0.4em",
    color: colors.teal,
    transform: "translateY(-1.2em) rotate(20deg)",
  },
  statement: {
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "clamp(1.2rem, 2.6vw, 1.6rem)",
    lineHeight: 1.55,
    color: colors.navySoft,
    maxWidth: 580,
    marginTop: 36,
  },
  marker: {
    backgroundColor: "rgba(230, 181, 77, 0.4)",
    borderRadius: 4,
    padding: "0 6px",
    whiteSpace: "nowrap",
  },
  markerTeal: {
    backgroundColor: "rgba(101, 202, 210, 0.35)",
    borderRadius: 4,
    padding: "0 6px",
    whiteSpace: "nowrap",
  },
  heroMeta: {
    marginTop: 32,
    fontSize: "0.66rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.navySoft,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  dot: { color: colors.persimmon },

  // ── ticker ──
  ticker: {
    backgroundColor: colors.navy,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: colors.navy,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: colors.navy,
    overflow: "hidden",
    whiteSpace: "nowrap",
    padding: "10px 0",
    transform: "rotate(-0.6deg) scale(1.01)",
  },
  tickerTrack: {
    display: "inline-block",
    animationName: scroll,
    animationDuration: "28s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  tickerItem: {
    fontSize: "0.68rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.paper,
    marginInline: 18,
  },
  tickerStar: { color: colors.persimmon, fontSize: "0.7rem" },

  // ── framed painting ──
  frameWrap: {
    maxWidth: 1060,
    marginInline: "auto",
    padding: { default: "64px 40px 80px", "@media (max-width: 720px)": "44px 22px 56px" },
  },
  frame: {
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: colors.navy,
    padding: { default: 14, "@media (max-width: 720px)": 9 },
    backgroundColor: colors.cream,
    boxShadow: `12px 12px 0 ${colors.teal}`,
    transform: { default: "rotate(-1deg)", ":hover": "rotate(0deg)" },
    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  frameImg: { width: "100%", height: "auto", display: "block" },
  frameCaption: {
    marginTop: 12,
    fontSize: "0.64rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: colors.navySoft,
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
  },
  frameNum: {
    fontFamily: fonts.serif,
    fontStyle: "italic",
    textTransform: "none",
    letterSpacing: "normal",
    color: colors.persimmon,
  },

  // ── sections ──
  section: {
    maxWidth: 1060,
    marginInline: "auto",
    padding: { default: "64px 40px", "@media (max-width: 720px)": "44px 22px" },
    display: "grid",
    gridTemplateColumns: { default: "190px 1fr", "@media (max-width: 720px)": "1fr" },
    gap: { default: 48, "@media (max-width: 720px)": 22 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.hairline,
  },
  sectionMarker: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    alignSelf: "start",
  },
  sectionNum: {
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "1.1rem",
    color: colors.navySoft,
  },
  pill: {
    fontSize: "0.62rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: colors.navy,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.navy,
    borderRadius: 999,
    padding: "5px 14px",
    boxShadow: `3px 3px 0 ${colors.navy}`,
    display: "inline-block",
  },
  pillTeal: { backgroundColor: colors.teal, transform: "rotate(-3deg)" },
  pillPersimmon: { backgroundColor: colors.persimmon, transform: "rotate(2deg)" },
  pillGold: { backgroundColor: colors.gold, transform: "rotate(-2deg)" },
  pillPaper: {
    backgroundColor: colors.navy,
    color: colors.paper,
    boxShadow: `3px 3px 0 ${colors.teal}`,
    transform: "rotate(2.5deg)",
  },
  sectionBody: { maxWidth: 560 },

  // ── prose ──
  prose: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    fontSize: { default: "0.925rem", "@media (max-width: 720px)": "0.875rem" },
    lineHeight: 1.9,
    color: colors.navySoft,
  },
  textLink: {
    color: { default: colors.navy, ":hover": colors.persimmon },
    textDecoration: "none",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: { default: colors.teal, ":hover": colors.persimmon },
    paddingBottom: 1,
    transition: "color 0.15s ease, border-color 0.15s ease",
  },
  bulletList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 7,
    marginBlock: 4,
  },
  bullet: {
    fontSize: "0.875rem",
    color: colors.navySoft,
    lineHeight: 1.65,
    paddingLeft: 18,
    position: "relative",
    "::before": {
      content: '"✺"',
      position: "absolute",
      left: 0,
      color: colors.persimmon,
      fontSize: "0.7rem",
    },
  },

  // ── resume chips ──
  chipRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 },
  chip: {
    fontSize: "0.66rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 600,
    color: colors.navy,
    textDecoration: "none",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.navy,
    borderRadius: 8,
    padding: "8px 16px",
    backgroundColor: colors.paper,
    boxShadow: {
      default: `4px 4px 0 ${colors.persimmon}`,
      ":hover": `1px 1px 0 ${colors.persimmon}`,
    },
    transform: { default: "translate(0, 0)", ":hover": "translate(3px, 3px)" },
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  },

  // ── writing rows ──
  superlink: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    padding: "13px 10px",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.hairline,
    borderTopWidth: { default: 0, ":first-of-type": 1 },
    borderTopStyle: { default: "none", ":first-of-type": "solid" },
    borderTopColor: colors.hairline,
    textDecoration: "none",
    color: { default: colors.navy, ":hover": colors.persimmon },
    backgroundColor: { default: "transparent", ":hover": "rgba(230, 181, 77, 0.14)" },
    transition: "background-color 0.15s ease, color 0.15s ease",
  },
  superTitle: {
    fontFamily: fonts.serif,
    fontSize: "1rem",
    fontWeight: 400,
    color: "inherit",
    flexShrink: 0,
    transition: "color 0.15s",
  },
  superDesc: {
    fontSize: "0.78rem",
    color: colors.navySoft,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexGrow: 1,
    opacity: 0.85,
    display: { default: "block", "@media (max-width: 720px)": "none" },
  },
  superYear: {
    fontFamily: fonts.mono,
    fontSize: "0.66rem",
    letterSpacing: "0.08em",
    color: colors.navySoft,
    flexShrink: 0,
  },
  superArrow: {
    fontSize: "0.75rem",
    color: colors.persimmon,
    flexShrink: 0,
    marginLeft: "auto",
  },
  moreLine: { fontSize: "0.75rem", color: colors.navySoft, marginTop: 18 },

  // ── footer ──
  footer: { backgroundColor: colors.navy, color: colors.paper, marginTop: 40 },
  footerInner: {
    maxWidth: 1060,
    marginInline: "auto",
    padding: { default: "72px 40px 40px", "@media (max-width: 720px)": "56px 22px 32px" },
  },
  footerH2: {
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    color: colors.paper,
    marginBottom: 34,
  },
  footerWave: { color: colors.persimmon },
  footerLinks: { display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 64 },
  footerLink: {
    fontSize: "0.66rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 600,
    color: { default: colors.teal, ":hover": colors.navyDeep },
    backgroundColor: { default: "transparent", ":hover": colors.persimmon },
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: { default: colors.teal, ":hover": colors.persimmon },
    borderRadius: 999,
    padding: "7px 16px",
    textDecoration: "none",
    transform: { default: "rotate(0deg)", ":hover": "rotate(-3deg)" },
    transition: "all 0.15s ease",
  },
  colophon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(250, 247, 240, 0.16)",
    paddingTop: 22,
    fontSize: "0.62rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(250, 247, 240, 0.55)",
    flexDirection: { default: "row", "@media (max-width: 720px)": "column" },
  },
  colophonLogo: { borderRadius: 6, display: "block", transform: "rotate(8deg)" },
});

export default async function Home() {
  const writing = (await getSubstackPosts()) ?? writingFallback;

  return (
    <>
      <FishCanvas variant="day" />

      <header {...stylex.props(styles.masthead, styles.fade, styles.d1)}>
        <Link href="/" {...stylex.props(styles.brand)}>
          <Image
            src="/logo.jpg"
            alt="Yushan Li's persimmon logo"
            width={36}
            height={36}
            {...stylex.props(styles.brandLogo)}
          />
          <span {...stylex.props(styles.wordmark)}>Yushan Li</span>
        </Link>
        <span {...stylex.props(styles.mastheadPill)}>Berkeley, CA</span>
      </header>
      <hr {...stylex.props(styles.rule)} />

      <main {...stylex.props(styles.main)}>
        <section {...stylex.props(styles.hero)}>
          <h1 {...stylex.props(styles.h1, styles.fade, styles.d1)}>
            yushan <em {...stylex.props(styles.h1Li)}>li</em>
            <span {...stylex.props(styles.h1Star)}>✺</span>
          </h1>
          <p {...stylex.props(styles.statement, styles.fade, styles.d2)}>
            I build <span {...stylex.props(styles.markerTeal)}>AI products</span>,
            paint the water they swim in, and study the{" "}
            <span {...stylex.props(styles.marker)}>minds</span> that use them.
          </p>
          <p {...stylex.props(styles.heroMeta, styles.fade, styles.d3)}>
            <span>CS + Cognitive Science, UC Berkeley</span>
            <span {...stylex.props(styles.dot)}>✺</span>
            <span>Shelby Davis Scholar</span>
          </p>
        </section>

        <div {...stylex.props(styles.ticker, styles.fade, styles.d3)} aria-hidden="true">
          <div {...stylex.props(styles.tickerTrack)}>
            {[0, 1].map((half) => (
              <span key={half}>
                {tickerItems.map((item) => (
                  <span key={`${half}-${item}`} {...stylex.props(styles.tickerItem)}>
                    {item} <span {...stylex.props(styles.tickerStar)}>✺</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div {...stylex.props(styles.frameWrap, styles.fade, styles.d4)}>
          <figure {...stylex.props(styles.frame)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner.jpg"
              alt="Painting by Yushan Li: ink fish swimming through teal water above a skyline of cities she has lived in"
              {...stylex.props(styles.frameImg)}
            />
            <figcaption {...stylex.props(styles.frameCaption)}>
              <span>Cities I&apos;ve lived in, underwater — painted by me</span>
              <span {...stylex.props(styles.frameNum)}>no. 01</span>
            </figcaption>
          </figure>
        </div>

        {/* 01 — Now */}
        <section {...stylex.props(styles.section)} id="now">
          <div {...stylex.props(styles.sectionMarker, styles.fade, styles.d3)}>
            <span {...stylex.props(styles.sectionNum)}>01</span>
            <span {...stylex.props(styles.pill, styles.pillTeal)}>Now</span>
          </div>
          <div {...stylex.props(styles.sectionBody, styles.fade, styles.d4)}>
            <div {...stylex.props(styles.prose)}>
              <p>
                I&apos;m a fourth-year studying CS + Cognitive Science at UC Berkeley,
                fully funded as a{" "}
                <a href="https://www.davisuwcscholars.org/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>Shelby Davis Scholar</a>.
                Currently researching X&apos;s open-source rec-sys and building the
                AgentHLE benchmark.
              </p>
            </div>
            <div {...stylex.props(styles.chipRow)}>
              {resumes.map((r) => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.chip)}>
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — Before */}
        <section {...stylex.props(styles.section)} id="before">
          <div {...stylex.props(styles.sectionMarker, styles.fade, styles.d4)}>
            <span {...stylex.props(styles.sectionNum)}>02</span>
            <span {...stylex.props(styles.pill, styles.pillPersimmon)}>Before</span>
          </div>
          <div {...stylex.props(styles.sectionBody, styles.fade, styles.d4)}>
            <div {...stylex.props(styles.prose)}>
              <p>
                In 2024–25 I was the first junior hire at{" "}
                <a href="https://dipper.com/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>Dipper</a>
                {" "}(<a href="https://www.forbes.com.au/news/innovation/eric-schmidts-new-secret-project-is-an-ai-video-platform-called-hooglee/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>Eric Schmidt</a>&apos;s
                video AI startup), owning everything UX from day one to Series A.
                I also sidequested a lot within the company:
              </p>
              <ul {...stylex.props(styles.bulletList)}>
                <li {...stylex.props(styles.bullet)}>Shipped search &amp; discovery — as PM</li>
                <li {...stylex.props(styles.bullet)}>Built the account system — as PM</li>
                <li {...stylex.props(styles.bullet)}>Built the admin dashboard — as SWE</li>
                <li {...stylex.props(styles.bullet)}>Ran a 200+ creator influencer program — as user ops</li>
                <li {...stylex.props(styles.bullet)}>Won the internal hackathon on rec-sys user profiling</li>
              </ul>
              <p>
                I also spent a year as Head TA for{" "}
                <a href="https://scet.berkeley.edu/students/courses/berkeley-method-of-entrepreneurship-bootcamp/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>Berkeley&apos;s largest engineering startup class</a>
                {" "}and{" "}
                <a href="https://scet.berkeley.edu/students/courses/how-to-be-a-futurist/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>How to Be a Futurist</a>,
                mentored 500+ student founders, and helped organize the first{" "}
                <a href="https://globalstudentstartup.org/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>Global Student Startup Competition</a>{" "}
                — sending teams to Korea.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — Writing */}
        <section {...stylex.props(styles.section)} id="writing">
          <div {...stylex.props(styles.sectionMarker, styles.fade, styles.d4)}>
            <span {...stylex.props(styles.sectionNum)}>03</span>
            <span {...stylex.props(styles.pill, styles.pillGold)}>Writing</span>
          </div>
          <div {...stylex.props(styles.sectionBody, styles.fade, styles.d5)}>
            {writing.map((w, i) => (
              <a key={i} href={w.href} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.superlink)}>
                <span {...stylex.props(styles.superTitle)}>{w.title}</span>
                {w.desc && <span {...stylex.props(styles.superDesc)}>{w.desc}</span>}
                <span {...stylex.props(styles.superYear)}>{w.year}</span>
                <span {...stylex.props(styles.superArrow)}>↗</span>
              </a>
            ))}
            <p {...stylex.props(styles.moreLine)}>
              more on{" "}
              <a href="https://liyushan27.substack.com" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>
                Substack
              </a>
            </p>
          </div>
        </section>

        {/* 04 — Living */}
        <section {...stylex.props(styles.section)} id="living">
          <div {...stylex.props(styles.sectionMarker, styles.fade, styles.d5)}>
            <span {...stylex.props(styles.sectionNum)}>04</span>
            <span {...stylex.props(styles.pill, styles.pillPaper)}>Living</span>
          </div>
          <div {...stylex.props(styles.sectionBody, styles.fade, styles.d5)}>
            <div {...stylex.props(styles.prose)}>
              <p>
                I grew up in China and did high school at{" "}
                <a href="https://uwc.org/school/uwc-mostar/" target="_blank" rel="noopener noreferrer" {...stylex.props(styles.textLink)}>United World College</a>{" "}
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

      <footer {...stylex.props(styles.footer)}>
        <div {...stylex.props(styles.footerInner)}>
          <h2 {...stylex.props(styles.footerH2)}>
            say hi <span {...stylex.props(styles.footerWave)}>~</span>
          </h2>
          <div {...stylex.props(styles.footerLinks)}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                {...stylex.props(styles.footerLink)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div {...stylex.props(styles.colophon)}>
            <span>Designed, painted, and fish-fed by Yushan Li</span>
            <Image src="/logo.jpg" alt="" width={26} height={26} {...stylex.props(styles.colophonLogo)} />
          </div>
        </div>
      </footer>
    </>
  );
}
