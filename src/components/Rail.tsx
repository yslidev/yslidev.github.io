import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../app/globalTokens.stylex";

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

export default function Rail({
  current,
}: {
  current?: "writing" | "about";
}) {
  return (
    <header {...stylex.props(styles.rail)}>
      {/* The mark is a plain span on the home page so it isn't a link to itself */}
      <Link href="/" {...stylex.props(styles.mark)}>
        yushan li
      </Link>
      <nav {...stylex.props(styles.nav)}>
        <Link
          data-fish
          href="/writing"
          aria-current={current === "writing" ? "page" : undefined}
          {...stylex.props(styles.link, current === "writing" && styles.current)}
        >
          writing
        </Link>
        <Link
          data-fish
          href="/about"
          aria-current={current === "about" ? "page" : undefined}
          {...stylex.props(styles.link, current === "about" && styles.current)}
        >
          about
        </Link>
        <a
          data-fish
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.link)}
        >
          résumé
        </a>
      </nav>
    </header>
  );
}
