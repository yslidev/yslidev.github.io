import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import Ext from "@/components/Ext";
import { contactLinks } from "@/components/PageFoot";
import { ui } from "@/components/ui";
import { front } from "./front";

// yushan.li — the professional card. Lead with proof; every claim here should
// trace to the published CV at /cv.pdf.

// email first on the card, the way the original name card reads
const doors = [
  contactLinks.find((l) => l.href.startsWith("mailto:"))!,
  ...contactLinks.filter((l) => !l.href.startsWith("mailto:")),
];

export default function ProfessionalHome() {
  return (
    <>
      <FishCanvas />
      <PeekLayer />
      <Rail />

      <main {...stylex.props(front.card, front.body)}>
        <h1 {...stylex.props(ui.h1, front.name)}>yushan li</h1>
        <p {...stylex.props(front.lede)}>
          i build ai products and study how people think.
        </p>

        <div {...stylex.props(front.prose)}>
          <p>
            cs and cognitive science at berkeley, fully funded as a{" "}
            <Ext
              href="https://www.davisuwcscholars.org/"
              peek="/assets/photo-campanile.jpg"
              alt="Yushan under the Berkeley clock tower"
            >
              shelby davis scholar
            </Ext>
            .
          </p>
          <ul {...stylex.props(ui.list)}>
            <li {...stylex.props(ui.item)}>
              research on agent evals at{" "}
              <Ext href="https://bair.berkeley.edu/">bair</Ext>
            </li>
            <li {...stylex.props(ui.item)}>
              one of five external reviewers of{" "}
              <Ext href="https://github.com/xai-org/x-algorithm">
                x&apos;s open-source recommendation algorithm
              </Ext>{" "}
              before launch; my feedback went into its under the hood tool
            </li>
            <li {...stylex.props(ui.item)}>
              <Ext href="/writing/x-recsys/">took the ranker apart</Ext> and found
              two mechanisms that suppress in-network posts
            </li>
            <li {...stylex.props(ui.item)}>
              contributor to{" "}
              <Ext href="https://agenthle.org/">agent last exam</Ext>: submitted to
              neurips 2026, adopted by gpt-6 astra
            </li>
            <li {...stylex.props(ui.item)}>
              first junior hire at{" "}
              <Ext
                href="https://dipper.com/"
                peek="/assets/photo-dipper.jpg"
                alt="Yushan with colleagues at Hooglee"
              >
                hooglee
              </Ext>
              , eric schmidt&apos;s video ai startup, seed to series a; won the
              company hackathon with the pipeline behind its production
              recommendations
            </li>
            <li {...stylex.props(ui.item)}>
              investing at <Ext href="https://nichevp.com">niche vp</Ext>; deal
              sourcing for moxxie and monolith
            </li>
          </ul>
        </div>

        <nav {...stylex.props(front.doors)}>
          {doors.map((l) => (
            <a
              key={l.label}
              data-fish
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              {...stylex.props(ui.link, front.door)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p {...stylex.props(ui.hint)}>double-click the water to feed the fish</p>
      </main>
    </>
  );
}
