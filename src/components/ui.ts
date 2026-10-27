import * as stylex from "@stylexjs/stylex";
import { colors } from "../app/globalTokens.stylex";

// Shared pieces: the persimmon-underlined link, the inner-page shell, and the
// footer strip that closes writing and about.
export const ui = stylex.create({
  link: {
    color: { default: colors.orangeInk, ":hover": colors.ink },
    backgroundColor: { default: "transparent", ":hover": colors.orange },
    textDecoration: "none",
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: { default: colors.orange, ":hover": colors.ink },
  },
  page: {
    position: "relative",
    zIndex: 3,
    maxWidth: 660,
    marginInline: "auto",
    padding:
      "clamp(64px, 10vh, 110px) clamp(22px, 6vw, 48px) 70px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  h1: {
    fontWeight: 500,
    fontSize: "clamp(26px, 3.4vw, 38px)",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    textTransform: "lowercase",
    marginBottom: 6,
  },
  // The rail already marks which page you're on; the title stays for screen
  // readers and the tab, not the eye.
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  p: { fontSize: 16 },
  foot: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 22px",
    marginTop: 26,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  footLink: { fontSize: 15 },
});
