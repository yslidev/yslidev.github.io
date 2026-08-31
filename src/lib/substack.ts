export interface WritingEntry {
  title: string;
  desc: string;
  href: string;
  year: string;
}

// Self-hosted long-form. /writing is populated from the Substack API, so a
// piece that does not live on Substack has to be pinned or it never appears.
export const writingPinned: WritingEntry[] = [
  {
    title: "Inside the Machine",
    desc: "a technical analysis of X's 2026 recommendation algorithm",
    href: "/writings/x-recsys/",
    year: "Aug 2026",
  },
];

export const writingFallback: WritingEntry[] = [
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

export async function getSubstackPosts(): Promise<WritingEntry[] | null> {
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
