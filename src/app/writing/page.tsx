import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import PageFoot from "@/components/PageFoot";
import { ui } from "@/components/ui";
import { colors, fonts } from "../globalTokens.stylex";
import { getSubstackPosts, writingFallback } from "@/lib/substack";

export const metadata: Metadata = {
  title: "writing",
  description: "Essays by Yushan Li on learning, influence, grief, and growth.",
};

const styles = stylex.create({
  rows: { display: "flex", flexDirection: "column", marginTop: 4 },
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
    // a fish from the painting swims in from the left as the row opens up
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
  more: { marginTop: 16, fontSize: 15 },
});

export default async function Writing() {
  const posts = (await getSubstackPosts()) ?? writingFallback;

  return (
    <>
      <FishCanvas />
      <PeekLayer />
      <Rail current="writing" />

      <main {...stylex.props(ui.page)}>
        <h1 {...stylex.props(ui.h1)}>writing</h1>

        <div {...stylex.props(styles.rows)}>
          {posts.map((p, i) => (
            <a
              key={i}
              data-fish
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(styles.row)}
            >
              <h3 {...stylex.props(styles.title)}>{p.title}</h3>
              <span {...stylex.props(styles.meta)}>{p.year} ↗</span>
            </a>
          ))}
        </div>

        <p {...stylex.props(styles.more)}>
          older pieces live on{" "}
          <a
            data-fish
            href="https://liyushan27.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ui.link)}
          >
            substack
          </a>
          . new ones will appear in this list.
        </p>

        <PageFoot />
      </main>
    </>
  );
}
