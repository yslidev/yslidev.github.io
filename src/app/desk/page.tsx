import type { Metadata } from "next";
import DeskClient from "./DeskClient";
import { getSubstackPosts, writingFallback } from "@/lib/substack";

// The desk is private: unlinked, unindexed, absent from the sitemap.
export const metadata: Metadata = {
  title: "the desk",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function DeskPage() {
  const writing = (await getSubstackPosts()) ?? writingFallback;
  return <DeskClient writing={writing} />;
}
