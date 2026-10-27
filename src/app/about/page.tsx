import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import PageFoot from "@/components/PageFoot";
import { ui } from "@/components/ui";

export const metadata: Metadata = {
  title: "about",
  description:
    "Yushan Li grew up in China, went to United World College in Mostar, Bosnia, " +
    "and studies CS and cognitive science at UC Berkeley.",
};

export default function About() {
  return (
    <>
      <FishCanvas />
      <PeekLayer />
      <Rail current="about" />

      <main {...stylex.props(ui.page)}>
        <h1 {...stylex.props(ui.h1)}>about</h1>

        <p {...stylex.props(ui.p)}>
          i was born in china and left at sixteen for{" "}
          <a
            data-fish
            data-peek="/assets/photo-uwc.jpg"
            data-peek-alt="Yushan with classmates at United World College"
            href="https://uwc.org/school/uwc-mostar/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ui.link)}
          >
            united world college
          </a>{" "}
          in mostar, bosnia. the school put a couple
          hundred teenagers from eighty countries in a town still marked by a war
          most of us had only read about. i went in expecting to study something
          practical and came out with cultural anthropology, which turned out to
          be the most useful thing i have studied. it taught me to watch what
          people actually do instead of what they say they do.
        </p>

        <p {...stylex.props(ui.p)}>
          that is also how i ended up in cognitive science. i like the questions
          underneath products more than the products: what someone expects to
          happen next, what they will forgive, what they notice and what they
          never see.
        </p>

        <h2 {...stylex.props(ui.h2)}>teaching</h2>
        <p {...stylex.props(ui.p)}>
          i spent a year as head ta for berkeley&apos;s largest engineering{" "}
          <a
            data-fish
            data-peek="/assets/photo-campanile.jpg"
            data-peek-alt="Yushan on the Berkeley campus"
            href="https://scet.berkeley.edu/students/courses/berkeley-method-of-entrepreneurship-bootcamp/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ui.link)}
          >
            startup bootcamp
          </a>{" "}
          and the{" "}
          <a
            data-fish
            href="https://scet.berkeley.edu/students/courses/how-to-be-a-futurist/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ui.link)}
          >
            how to be a futurist
          </a>{" "}
          class, and helped organize the first{" "}
          <a
            data-fish
            href="https://globalstudentstartup.org/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ui.link)}
          >
            global student startup competition
          </a>
          , which sent teams to korea. teaching a room of founders is the fastest
          way i know to find out whether you actually understand something.
        </p>

        <h2 {...stylex.props(ui.h2)}>elsewhere</h2>
        <p {...stylex.props(ui.p)}>
          twenty-odd countries so far, and the list keeps growing. currently in
          berkeley, california.
        </p>

        <PageFoot />
      </main>
    </>
  );
}
