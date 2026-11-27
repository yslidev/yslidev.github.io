import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import Rail from "@/components/Rail";
import PageFoot from "@/components/PageFoot";
import { ui } from "@/components/ui";
import { colors, fonts } from "../../globalTokens.stylex";

export const metadata: Metadata = {
  title: "Monitor Consumer Extension: Core Logic",
  description:
    "A third-party consumer agent plugin that monitors safety at the tool-call layer: thesis, timeline, open questions, org design.",
};

// Working notes, kept as written: numbered sections, bullets inside them.
const styles = stylex.create({
  title: { textTransform: "none" },
  date: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: "0.1em",
    color: colors.inkSoft,
    marginTop: -10,
  },
  h2: {
    fontWeight: 500,
    fontSize: 18,
    marginTop: 18,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 16,
    paddingLeft: 22,
  },
  bullets: { listStyleType: "disc" },
  numbers: { listStyleType: "decimal" },
  sub: { marginTop: 8 },
});

export default function Monitor() {
  const ul = stylex.props(styles.list, styles.bullets);
  const ol = stylex.props(styles.list, styles.numbers);

  return (
    <>
      <FishCanvas />
      <Rail current="writing" />

      <main {...stylex.props(ui.page)}>
        <h1 {...stylex.props(ui.h1, styles.title)}>
          Monitor Consumer Extension: Core Logic
        </h1>
        <p {...stylex.props(styles.date)}>Nov 2026</p>

        <h2 {...stylex.props(styles.h2)}>1. Core thesis</h2>
        <ul {...ul}>
          <li>
            Product: a third-party consumer agent plugin that monitors safety at
            the tool-call layer.
          </li>
          <li>
            Why tool calls: an agent&apos;s safety depends on what it does, not
            on what it thinks. Monitoring actions is enough, so this layer can
            act as the last line of defense.
          </li>
        </ul>

        <h2 {...stylex.props(styles.h2)}>2. Three-phase timeline</h2>
        <ol {...ol}>
          <li>
            Phase 1 (now): the competition is over foundation models, tokens,
            and agents.
          </li>
          <li>
            Phase 2: platforms for agents appear. They either host agents or
            help users choose the right one.
          </li>
          <li>Phase 3: a mass consumer AI application emerges.</li>
        </ol>
        <p {...stylex.props(ui.p)}>
          Entry point: enter during the move from Phase 1 to Phase 2, through
          agent evaluation and safety monitoring. Deep trust is the moat.
        </p>
        <p {...stylex.props(ui.p)}>
          Assumption: by then, agent protocols, APIs, and harness access are
          industry standard, so third parties can plug in.
        </p>

        <h2 {...stylex.props(styles.h2)}>3. Open questions</h2>
        <ol {...ol}>
          <li>Will tool calls stay the right layer to monitor?</li>
          <li>Does tool-call monitoring actually beat probes on latency?</li>
          <li>
            How do you become a third party everyone trusts?
            <ul {...stylex.props(styles.list, styles.bullets, styles.sub)}>
              <li>
                It needs buy-in from both agent companies and the public, plus
                credible neutrality.
              </li>
              <li>Timing decides it, and the window is limited.</li>
            </ul>
          </li>
        </ol>

        <h2 {...stylex.props(styles.h2)}>4. Organization design</h2>
        <ul {...ul}>
          <li>Task-driven: people are held together by shared work.</li>
          <li>
            Mission-driven: stronger cohesion, but internal conviction has to be
            balanced against external public trust.
          </li>
          <li>
            What a flat org offers talent: unique problems and resources, high
            trust in individual contributors, welfare, and a &ldquo;do no
            evil&rdquo; baseline.
          </li>
        </ul>

        <h2 {...stylex.props(styles.h2)}>5. Personal path</h2>
        <ul {...ul}>
          <li>
            Where do I stand now, and what has to happen before Phase 2?
          </li>
          <li>
            Core challenge: turning a third-party plugin into a platform. Most
            big platforms were built as platforms or as entry-point products from
            day one, so the plugin-first path needs a direct answer to that.
          </li>
        </ul>

        <PageFoot />
      </main>
    </>
  );
}
