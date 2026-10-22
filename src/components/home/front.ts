import * as stylex from "@stylexjs/stylex";

// Front-page type, shared by both sites so they stay one design: the name in
// script, the body in Karla. Inner pages stay on IBM Plex Sans.
export const front = stylex.create({
  name: {
    fontFamily: "'Pinyon Script', 'Birds of Paradise', cursive",
    fontWeight: 400,
    fontSize: "clamp(3.6rem, 11vw, 6rem)",
    lineHeight: 1.1,
    letterSpacing: "0.01em",
  },
  body: {
    fontFamily: "'Karla', 'IBM Plex Sans', -apple-system, sans-serif",
  },
  card: {
    position: "relative",
    zIndex: 3,
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: { default: 18, "@media (max-width: 640px)": 14 },
    maxWidth: 640,
    marginInline: "auto",
    padding: "76px clamp(22px, 6vw, 48px) 40px",
  },
  lede: { fontSize: 17, maxWidth: "40ch" },
  prose: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    fontSize: 16,
    maxWidth: "56ch",
  },
  doors: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 22px",
    marginTop: 6,
  },
  door: { fontSize: 16 },
});
