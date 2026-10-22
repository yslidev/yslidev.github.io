import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import PageFoot from "@/components/PageFoot";
import Ext from "@/components/Ext";
import { ui } from "@/components/ui";

// The professional story. Figures here should trace to /cv.pdf; travel,
// skating and painting belong to the personal site (ysli.dev).
export const metadata: Metadata = {
  title: "about",
  description:
    "Yushan Li: first junior hire at Eric Schmidt's video AI startup, head TA for Berkeley's " +
    "largest engineering startup bootcamp, founder of the first Global Student Startup " +
    "Competition, and a Shelby Davis Scholar studying CS and cognitive science at UC Berkeley.",
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
          <Ext
            href="https://uwc.org/school/uwc-mostar/"
            peek="/assets/photo-uwc.jpg"
            alt="Yushan with classmates at United World College"
          >
            united world college
          </Ext>{" "}
          in mostar, bosnia. the school put a couple hundred teenagers from eighty
          countries in a town still marked by a war most of us had only read
          about. i went in expecting to study something practical and came out
          with cultural anthropology, which turned out to be the most useful thing
          i have studied. it taught me to watch what people actually do instead of
          what they say they do.
        </p>
        <p {...stylex.props(ui.p)}>
          that is also how i ended up in cognitive science. i like the questions
          underneath products more than the products: what someone expects to
          happen next, what they will forgive, what they notice and what they
          never see.
        </p>

        <h2 {...stylex.props(ui.h2)}>building</h2>
        <p {...stylex.props(ui.p)}>
          at{" "}
          <Ext
            href="https://dipper.com/"
            peek="/assets/photo-dipper.jpg"
            alt="Yushan with colleagues at Hooglee"
          >
            hooglee
          </Ext>{" "}
          i owned user research, data, and support end to end. i ran 200
          structured interviews and weekly feedback reviews that fed straight
          into the roadmap and the ai team&apos;s post-training, led 15 growth
          interns as head of the product track, recruited and managed 450+
          creators, and shipped segmented video search — gemini 2.5 pro
          embeddings with asr indexing — at under 200ms.
        </p>

        <h2 {...stylex.props(ui.h2)}>teaching</h2>
        <p {...stylex.props(ui.p)}>
          i spent a year as head ta for berkeley&apos;s largest engineering{" "}
          <Ext
            href="https://scet.berkeley.edu/students/courses/berkeley-method-of-entrepreneurship-bootcamp/"
            peek="/assets/photo-campanile.jpg"
            alt="Yushan on the Berkeley campus"
          >
            startup bootcamp
          </Ext>{" "}
          and the{" "}
          <Ext href="https://scet.berkeley.edu/students/courses/how-to-be-a-futurist/">
            how to be a futurist
          </Ext>{" "}
          class — 500+ students mentored and 300+ startups analyzed across ai,
          blockchain, and healthcare. i also founded and ran the first-ever{" "}
          <Ext href="https://globalstudentstartup.org/">
            global student startup competition
          </Ext>{" "}
          in korea, building the program, format, and judging, and coached the
          winning team. teaching a room of founders is the fastest way i know to
          find out whether you actually understand something.
        </p>

        <h2 {...stylex.props(ui.h2)}>recognition</h2>
        <p {...stylex.props(ui.p)}>
          fully funded{" "}
          <Ext href="https://www.davisuwcscholars.org/">shelby davis scholar</Ext>{" "}
          at berkeley. top 10 globally — the top 0.1% — at the international stem
          mathematics olympiad, 2021.
        </p>

        <PageFoot />
      </main>
    </>
  );
}
