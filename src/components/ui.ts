import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../app/globalTokens.stylex";

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
  h2: {
    fontWeight: 500,
    fontSize: 16,
    textTransform: "lowercase",
    color: "rgba(12, 28, 32, 0.7)",
    marginTop: 14,
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
  hint: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: "0.2em",
    textTransform: "lowercase",
    color: colors.inkSoft,
    marginTop: 10,
  },
});
