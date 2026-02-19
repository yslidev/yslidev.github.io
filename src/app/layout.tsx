import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = "https://ysli.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yushan Li",
    template: "%s — Yushan Li",
  },
  description:
    "Yushan Li — CS + Cognitive Science at UC Berkeley, Shelby Davis Scholar. " +
    "Building AI products, figure skater, painter.",
  keywords: [
    "Yushan Li",
    "ysli",
    "UC Berkeley",
    "CS Cognitive Science",
    "Shelby Davis Scholar",
    "product design",
    "AI",
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
      "CS + Cognitive Science at UC Berkeley. Building AI products, figure skater, painter.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yushan Li",
  url: SITE_URL,
  image: `${SITE_URL}/logo.jpg`,
  description:
    "CS + Cognitive Science student at UC Berkeley, Shelby Davis Scholar, " +
    "AI product builder, figure skater, and painter.",
  jobTitle: "CS + Cognitive Science Student",
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
  sameAs: [
    "https://github.com/yslidev",
    "https://linkedin.com/in/liyushan27",
    "https://liyushan27.substack.com",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
