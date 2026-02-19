import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yushan Li",
  description: "Student, builder, and occasional deep-thinker.",
  openGraph: {
    title: "Yushan Li",
    description: "Student, builder, and occasional deep-thinker.",
    url: "https://ysli.dev",
    siteName: "ysli.dev",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
