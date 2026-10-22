import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../app/globalTokens.stylex";
import { isPersonal } from "@/lib/site";

const styles = stylex.create({
  rail: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: "12px clamp(20px, 5vw, 44px)",
    backgroundColor: colors.ink,
  },
  mark: {
    color: { default: colors.orange, ":hover": colors.tealLt },
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "lowercase",
    textDecoration: "none",
  },
  nav: { display: "flex", gap: 22 },
  link: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "lowercase",
    textDecoration: "none",
    color: { default: colors.tealLt, ":hover": colors.ink },
    backgroundColor: { default: "transparent", ":hover": colors.orange },
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    padding: "1px 3px",
  },
  current: { color: colors.ink, backgroundColor: colors.orange },
});

type Item = {
  label: string;
  href: string;
  // opens in a new tab: off-site links, and the cv pdf
  newTab?: boolean;
  page?: "writing" | "about";
};

// Each site gets its own nav over the same rail. The personal site is a
// single page, so its "writing" is an anchor rather than a route.
const NAV: Item[] = isPersonal
  ? [
      { label: "writing", href: "/#writing" },
      { label: "substack", href: "https://liyushan27.substack.com", newTab: true },
    ]
  : [
      { label: "writing", href: "/writing", page: "writing" },
      { label: "about", href: "/about", page: "about" },
      { label: "cv", href: "/cv.pdf", newTab: true },
    ];

export default function Rail({
  current,
}: {
  current?: "writing" | "about";
}) {
  return (
    <header {...stylex.props(styles.rail)}>
      <Link href="/" {...stylex.props(styles.mark)}>
        yushan li
      </Link>
      <nav {...stylex.props(styles.nav)}>
        {NAV.map((item) => {
          const here = item.page !== undefined && item.page === current;
          const props = {
            "data-fish": true,
            "aria-current": here ? ("page" as const) : undefined,
            ...stylex.props(styles.link, here && styles.current),
          };
          return item.newTab ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" {...props}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} {...props}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
