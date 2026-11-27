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
    "Monitoring agents at the tool-call layer, and a three-phase view of agents, agent platforms, and the consumer AI app that follows.",
};

// Working notes: numbered sections, bullets inside them.
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

        <h2 {...stylex.props(styles.h2)}>1. Watch what agents do</h2>
        <ul {...ul}>
          <li>
            Product: a third-party, consumer-side plugin that monitors agent
            safety at the tool-call layer.
          </li>
          <li>
            Why tool calls: judge an agent by its actions, not its thoughts.
            Someone who thinks about a crime and never commits it has done
            nothing wrong; arguably they did something right by stopping
            themselves. A questionable plan that never becomes a tool call is
            harmless too. That makes the tool call a natural last line of
            defense.
          </li>
        </ul>

        <h2 {...stylex.props(styles.h2)}>2. Three phases</h2>
        <ol {...ol}>
          <li>
            Phase 1 (now): the competition is over foundation models, tokens,
            and agents.
          </li>
          <li>
            Phase 2: platforms for agents appear. They either host agents or
            help people choose the right one.
          </li>
          <li>
            Phase 3: a mass consumer AI application emerges, the way TikTok and
            the recommendation feed did for mobile.
          </li>
        </ol>
        <p {...stylex.props(ui.p)}>
          Entry point: the move from Phase 1 to Phase 2, through agent
          evaluation and safety monitoring that people trust a lot. Trust is
          the moat.
        </p>
        <p {...stylex.props(ui.p)}>
          Assumption: by then, common protocols, APIs, and developer access to
          agent harnesses are industry standard, so a third party can plug in.
        </p>

        <h2 {...stylex.props(styles.h2)}>3. What Phase 3 might look like</h2>
        <ul {...ul}>
          <li>
            Attention spans keep shrinking, so consumer products move from the
            French dessert to the bag of See&apos;s candies: a collection of
            small, packaged hits. In search, the hit is a question answered, so
            serve the clip of exactly the moment someone asked for, not the
            whole video.
          </li>
          <li>
            Watch teenage girls. They are the earliest signal of an emerging
            consumer market (K-pop, beauty, TikTok). Right now that signal
            points at human&ndash;AI romance communities on Xiaohongshu.
          </li>
          <li>
            Agents may not stay in software. Vision-language models, AR
            hardware, and on-device &ldquo;visual intelligence&rdquo; could be
            where the consumer form shows up first.
          </li>
        </ul>

        <h2 {...stylex.props(styles.h2)}>4. Open questions</h2>
        <ol {...ol}>
          <li>
            Is the tool call still the best layer? Latent-space probes and
            chain-of-thought monitoring may not survive as models change.
          </li>
          <li>Does tool-call monitoring actually beat probes on latency?</li>
          <li>
            How does a third party earn everyone&apos;s trust? It is about as
            hard as founding the UN.
            <ul {...stylex.props(styles.list, styles.bullets, styles.sub)}>
              <li>
                Agent companies have to respect it and the public has to trust
                it, and it has to stay neutral through politics.
              </li>
              <li>Timing decides it, and the window is short.</li>
            </ul>
          </li>
          <li>
            Can a plugin become a platform? Few great platforms started as a
            small add-on. Most were built as platforms or as entry-point
            products from day one; ByteDance started with a news app.
          </li>
        </ol>

        <PageFoot />
      </main>
    </>
  );
}
