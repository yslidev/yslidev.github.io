import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import PageFoot from "@/components/PageFoot";
import { ui } from "@/components/ui";
import { rows } from "@/components/rows";
import { writingPinned } from "@/lib/substack";

// Technical writing only. The Substack essays are personal and live on
// ysli.dev; a new piece of work goes in `writingPinned`.
export const metadata: Metadata = {
  title: "writing",
  description:
    "Technical writing by Yushan Li, including a teardown of X's 2026 open-source recommendation algorithm.",
};

export default function Writing() {
  return (
    <>
      <FishCanvas />
      <PeekLayer />
      <Rail current="writing" />

      <main {...stylex.props(ui.page)}>
        <h1 {...stylex.props(ui.h1)}>writing</h1>

        <div {...stylex.props(rows.list)}>
          {writingPinned.map((p) => (
            <a
              key={p.href}
              data-fish
              href={p.href}
              {...(p.href.startsWith("/")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              {...stylex.props(rows.row)}
            >
              <h3 {...stylex.props(rows.title)}>{p.title}</h3>
              <span {...stylex.props(rows.meta)}>
                {p.year}
                {p.href.startsWith("/") ? "" : " ↗"}
              </span>
            </a>
          ))}
        </div>

        <PageFoot />
      </main>
    </>
  );
}
