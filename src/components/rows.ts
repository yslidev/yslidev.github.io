import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../app/globalTokens.stylex";

// A list of writing as ruled rows; a fish from the painting swims in from the
// left as a row opens up. Used by /writing and by the personal home page.
export const rows = stylex.create({
  list: { display: "flex", flexDirection: "column", marginTop: 4 },
  row: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 18,
    alignItems: "baseline",
    padding: "13px 0",
    paddingLeft: { default: 0, ":hover": 32 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
    borderTopWidth: { default: 0, ":first-child": 1 },
    borderTopStyle: { default: "none", ":first-child": "solid" },
    borderTopColor: colors.rule,
    color: colors.ink,
    textDecoration: "none",
    transition: "padding-left .3s cubic-bezier(.16,1,.3,1)",
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      width: 24,
      height: 9,
      background: "url(/assets/fish/f3.png) center/contain no-repeat",
      transform: {
        default: "translate(-16px, -50%)",
        ":hover": "translate(0, -50%)",
      },
      opacity: { default: 0, ":hover": 1 },
      transition: "opacity .25s, transform .35s cubic-bezier(.16,1,.3,1)",
    },
  },
  title: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.35,
    color: { default: colors.ink, ":hover": colors.orangeInk },
  },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: "0.1em",
    color: colors.inkSoft,
    whiteSpace: "nowrap",
  },
});
