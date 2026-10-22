import type { Metadata, Viewport } from "next";
import "./globals.css";
import { isPersonal, SITE_URL } from "@/lib/site";

const professionalMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yushan Li",
    template: "%s — Yushan Li",
  },
  description:
    "Yushan Li researches agent evals at Berkeley AI Research, reviewed X's open-source " +
    "recommendation algorithm before launch, and invests with Niche VP. Previously the first " +
    "junior hire at Eric Schmidt's video AI startup. CS + Cognitive Science at UC Berkeley.",
  keywords: [
    "Yushan Li",
    "ysli",
    "UC Berkeley",
    "CS Cognitive Science",
    "Shelby Davis Scholar",
    "product design",
    "AI products",
    "Berkeley AI Research",
    "agent evals",
    "recommendation systems",
    "Niche VP",
  ],
  authors: [{ name: "Yushan Li", url: SITE_URL }],
  creator: "Yushan Li",
  openGraph: {
    type: "profile",
    firstName: "Yushan",
    lastName: "Li",
    username: "yslidev",
    title: "Yushan Li",
    description:
      "Agent evals at Berkeley AI Research, external reviewer of X's recommendation " +
      "algorithm, investing with Niche VP. CS + Cognitive Science at UC Berkeley.",
    url: SITE_URL,
    siteName: "yushan.li",
    locale: "en_US",
    images: [
      {
        url: "/logo.jpg",
        width: 400,
        height: 400,
        alt: "Yushan Li",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Yushan Li",
    description:
      "Agent evals at Berkeley AI Research, external reviewer of X's recommendation algorithm, investing with Niche VP.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

// ysli.dev is for friends and family: kept out of search results and never
// linked to yushan.li. Crawling is still allowed (see robots.ts) so that
// search engines can read this noindex rather than index a bare URL.
const personalMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "yushan", template: "%s — yushan" },
  description: "paintings, figure skating, and writing — for friends and family.",
  // link previews still matter here: this site travels by text message
  openGraph: {
    type: "website",
    title: "yushan",
    description: "paintings, figure skating, and writing.",
    url: SITE_URL,
    siteName: "ysli.dev",
    images: [{ url: "/logo.jpg", width: 400, height: 400, alt: "a persimmon, painted by Yushan" }],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const metadata: Metadata = isPersonal ? personalMetadata : professionalMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Safely serialize JSON-LD: JSON.stringify doesn't escape `<`, so a string
// containing `</script>` could break out of the script tag. Unicode-escape it.
function jsonLdString(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

// ── Structured data ──────────────────────────────────────────────────────────

// 1. ProfilePage — Google's recommended schema type for personal profile pages.
//    The Person entity is nested as mainEntity, which lets AI engines resolve
//    "who does this page describe" unambiguously.
const profilePageLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Yushan Li — Personal Site",
  dateModified: "2025-02-19",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Yushan Li",
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.jpg`,
      width: 400,
      height: 400,
    },
    description:
      "Yushan Li does research on agent evals at Berkeley AI Research and contributes to the " +
      "Agent Last Exam benchmark. She was one of five external reviewers of X's open-source " +
      "recommendation algorithm before launch, was the first junior hire at Eric Schmidt's video " +
      "AI startup Hooglee from seed through Series A, and invests with Niche VP. She studies CS " +
      "and Cognitive Science at UC Berkeley as a fully funded Shelby Davis Scholar.",
    jobTitle: "Undergraduate Research Assistant",
    worksFor: {
      "@type": "ResearchOrganization",
      name: "Berkeley AI Research (BAIR)",
      url: "https://bair.berkeley.edu/",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of California, Berkeley",
        url: "https://berkeley.edu",
      },
      {
        "@type": "HighSchool",
        name: "United World College Mostar",
        url: "https://uwc.org/school/uwc-mostar/",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Product Design",
      "UX Design",
      "Cognitive Science",
      "Computer Science",
      "Recommendation Systems",
      "Cultural Anthropology",
      "Figure Skating",
      "Painting",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Product Designer & Software Engineer",
      description:
        "Builds AI-powered products, owns end-to-end UX, and ships full-stack features.",
    },
    nationality: "Chinese",
    sameAs: [
      "https://github.com/yslidev",
      "https://linkedin.com/in/liyushan27",
      "https://liyushan27.substack.com",
      "https://www.davisuwcscholars.org/",
    ],
    // Speakable: marks the sections most useful for voice/AI reading
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1"],
    },
  },
};

// 2. WebSite — lets search engines associate the domain with the person entity.
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Yushan Li",
  description:
    "Personal website of Yushan Li — CS + Cognitive Science at UC Berkeley.",
  author: { "@id": `${SITE_URL}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// 3. FAQPage — AI agents (Perplexity, ChatGPT Search, Google AI Overviews)
//    extract Q&A pairs directly from this schema to answer queries about Yushan Li.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Yushan Li?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yushan Li does research on agent evals at Berkeley AI Research (BAIR) and contributes to " +
          "Agent Last Exam, a benchmark of long-horizon tasks for frontier computer-use agents submitted " +
          "to NeurIPS 2026. She was one of five external reviewers of X's open-source recommendation " +
          "algorithm before launch, and later reverse-engineered two mechanisms in it that suppress " +
          "in-network content. She was the first junior hire at Eric Schmidt's video AI startup Hooglee, " +
          "invests with Niche VP, and studies CS and Cognitive Science at UC Berkeley as a Shelby Davis Scholar.",
      },
    },
    {
      "@type": "Question",
      name: "What has Yushan Li worked on professionally?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "At Berkeley AI Research, Yushan Li works on agent evals and contributes to the Agent Last Exam " +
          "benchmark. She was one of five external reviewers of X's open-source recommendation algorithm, " +
          "working with X's VP of Product, and her feedback shaped X's Under the Hood transparency tool. " +
          "As the first junior hire at Hooglee, Eric Schmidt's video AI startup, from seed through Series A, " +
          "she ran 200 structured user interviews, led 15 growth interns, managed 450+ creators, shipped " +
          "segmented video search at under 200ms, and won the company hackathon with a user-profiling " +
          "pipeline that became the foundation of the production recommendation system. As head TA for " +
          "Berkeley's largest engineering startup bootcamp she mentored 500+ students, and she founded and " +
          "ran the first Global Student Startup Competition in Korea. She invests with Niche VP and sources " +
          "deals for Moxxie and Monolith.",
      },
    },
    {
      "@type": "Question",
      name: "Where does Yushan Li go to school?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yushan Li attends UC Berkeley, where she is a fourth-year student studying CS and Cognitive Science " +
          "as a fully funded Shelby Davis Scholar. Before Berkeley, she attended United World College Mostar " +
          "in Bosnia and Herzegovina, where she studied Cultural Anthropology.",
      },
    },
    {
      "@type": "Question",
      name: "What are Yushan Li's interests and hobbies?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yushan Li figure skates on the UC Berkeley team and is a former national champion in artistic swimming. " +
          "She paints, and has traveled to more than 20 countries.",
      },
    },
    {
      "@type": "Question",
      name: "What is Yushan Li's background?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yushan Li grew up in China and did high school at United World College Mostar in Bosnia and Herzegovina, " +
          "where she studied Cultural Anthropology. She is currently at UC Berkeley studying CS and Cognitive Science " +
          "as a Shelby Davis Scholar. She has been to 20+ countries and is interested in AI, product design, " +
          "and recommendation systems.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured data names Yushan for search and AI engines — the
            professional site only; ysli.dev should stay unattributed. */}
        {!isPersonal &&
          [profilePageLd, websiteLd, faqLd].map((ld, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
            />
          ))}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
