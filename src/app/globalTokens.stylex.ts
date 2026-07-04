import * as stylex from "@stylexjs/stylex";

// Every color comes from Yushan's own paintings:
// navy — the ground of the persimmon logo; persimmon — the fruit;
// teal — the banner's water; gold — the fish; paper — the ivory it hangs on.
export const colors = stylex.defineVars({
  navy: "#14204a",
  navyDeep: "#0d1533",
  navySoft: "#3c4664",
  persimmon: "#ef8a2b",
  teal: "#65cad2",
  tealInk: "#1d7f8a",
  gold: "#e6b54d",
  goldInk: "#c58f2a",
  paper: "#faf7f0",
  cream: "#fffdf8",
  hairline: "rgba(20, 32, 74, 0.14)",
  hairlineNight: "rgba(101, 202, 210, 0.28)",
});

export const fonts = stylex.defineVars({
  serif: "'Fraunces', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'Courier New', Courier, monospace",
});
