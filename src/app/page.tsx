import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import LockScroll from "@/components/LockScroll";
import Rail from "@/components/Rail";
import { contactLinks } from "@/components/PageFoot";
import { ui } from "@/components/ui";

// email first on the card, the way the original name card reads
const doors = [
  contactLinks.find((l) => l.href.startsWith("mailto:"))!,
  ...contactLinks.filter((l) => !l.href.startsWith("mailto:")),
];

const styles = stylex.create({
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

export default function Home() {
  return (
    <>
      <LockScroll />
      <FishCanvas />
      <PeekLayer />
      <Rail />

      <main {...stylex.props(styles.card)}>
        <h1 {...stylex.props(ui.h1)}>yushan li</h1>
        <p {...stylex.props(styles.lede)}>
          i build ai products and study how people think.
        </p>

        <div {...stylex.props(styles.prose)}>
          <p>
            i&apos;m a fourth-year at berkeley studying cs and cognitive science,
            fully funded as a{" "}
            <a
              data-fish
              data-peek="/assets/photo-campanile.jpg"
              data-peek-alt="Yushan under the Berkeley clock tower"
              href="https://www.davisuwcscholars.org/"
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(ui.link)}
            >
              shelby davis scholar
            </a>
            . before that i was the first junior hire at{" "}
            <a
              data-fish
              data-peek="/assets/photo-dipper.jpg"
              data-peek-alt="Yushan with colleagues at Hooglee"
              href="https://dipper.com/"
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(ui.link)}
            >
              hooglee
            </a>
            , where i started and fumbled with a lot of things.
          </p>
          <p>
            at 16, i went to{" "}
            <a
              data-fish
              data-peek="/assets/photo-uwc.jpg"
              data-peek-alt="Yushan with classmates at United World College in Bosnia"
              href="https://uwc.org/school/uwc-mostar/"
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(ui.link)}
            >
              united world college
            </a>{" "}
            in bosnia.
          </p>
        </div>

        <nav {...stylex.props(styles.doors)}>
          {doors.map((l) => (
            <a
              key={l.label}
              data-fish
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              {...stylex.props(ui.link, styles.door)}
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
