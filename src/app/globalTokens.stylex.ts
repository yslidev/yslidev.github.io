import * as stylex from "@stylexjs/stylex";

// Palette pulled straight from the banner painting: the water, the ink the
// fish and skyline are drawn in, and the persimmon from the logo.
export const colors = stylex.defineVars({
  teal: "#64cad1",   // the painting's water, sampled from banner.jpg
  tealLt: "#a8e3e8",
  tealDk: "#3aa8b2",
  ink: "#0c1c20",
  inkSoft: "rgba(12, 28, 32, 0.55)",
  rule: "rgba(12, 28, 32, 0.2)",
  orange: "#f06a17",
  orangeInk: "#7a2a00",
  paper: "#faf7f0",
  // the desk (private side) sits on ink, so its hairlines are lit not drawn
  deskRule: "rgba(168, 227, 232, 0.24)",
});

export const fonts = stylex.defineVars({
  mono: "'IBM Plex Mono', ui-monospace, Menlo, monospace",
  sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, Helvetica, sans-serif",
});
