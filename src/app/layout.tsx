import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://ysli.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yushan Li",
    template: "%s — Yushan Li",
  },
  description:
    "Yushan Li is a CS + Cognitive Science student at UC Berkeley and a Shelby Davis Scholar. " +
    "She builds AI products, figure skates on the Cal team, and paints.",
  keywords: [
    "Yushan Li",
    "ysli",
    "UC Berkeley",
    "CS Cognitive Science",
    "Shelby Davis Scholar",
    "product design",
    "AI products",
    "figure skater Berkeley",
    "United World College",
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
      "Yushan Li — CS + Cognitive Science at UC Berkeley, Shelby Davis Scholar. " +
      "AI product builder, figure skater, painter.",
    url: SITE_URL,
    siteName: "ysli.dev",
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
      "CS + Cognitive Science at UC Berkeley. Building AI products, figure skater, painter.",
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
      "Yushan Li is a fourth-year CS and Cognitive Science student at UC Berkeley, " +
      "fully funded as a Shelby Davis Scholar. She builds AI products, figure skates " +
      "on the Cal team, and is a former national champion in artistic swimming. " +
      "She grew up in China, attended United World College in Bosnia, and paints — " +
      "including the logo and banner on this site.",
    jobTitle: "CS + Cognitive Science Student",
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "University of California, Berkeley",
      url: "https://berkeley.edu",
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
          "Yushan Li is a fourth-year CS and Cognitive Science student at UC Berkeley, " +
          "fully funded as a Shelby Davis Scholar. She built AI products as the first junior hire " +
          "at Eric Schmidt's video AI startup (Hooglee), owned end-to-end UX from day one to Series A, " +
          "and shipped search, account systems, and an admin dashboard. She figure skates on the Cal team, " +
          "is a former national champion in artistic swimming, and paints. She grew up in China and " +
          "attended United World College in Bosnia where she studied Cultural Anthropology.",
      },
    },
    {
      "@type": "Question",
      name: "What has Yushan Li worked on professionally?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yushan Li was the first junior hire at Eric Schmidt's video AI startup Hooglee, " +
          "where she owned all UX from day one to Series A. She shipped search and discovery as PM, " +
          "built the account system as PM, built the admin dashboard as SWE, ran a 200+ creator " +
          "influencer program, and won the internal hackathon on recommendation-system user profiling. " +
          "She also served as Head TA for Berkeley's largest engineering startup class and How to Be a Futurist, " +
          "mentored 500+ student founders, and helped organize the first Global Student Startup Competition.",
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
          "She paints and created the logo and banner art on her personal website ysli.dev. " +
          "She has traveled to more than 20 countries.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(profilePageLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
