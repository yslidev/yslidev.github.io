import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yushan Li",
  description: "Product at Hooglee. CS + Cognitive Science at UC Berkeley.",
  openGraph: {
    title: "Yushan Li",
    description: "Product at Hooglee. CS + Cognitive Science at UC Berkeley.",
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
