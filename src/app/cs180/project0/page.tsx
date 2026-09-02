import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import { ui } from "@/components/ui";
import { colors, fonts } from "../../globalTokens.stylex";

export const metadata: Metadata = {
  title: "cs180 · project 0",
  description:
    "CS180 Project 0 — Become Friends with Your Camera. Perspective, focal " +
    "length and the center of projection, shot on an iPhone 13 Pro: a two-way " +
    "selfie, a compressed brick facade, and a dolly zoom.",
  // Unlisted: reachable at its own URL, but not indexed and not linked from
  // anywhere on the site.
  robots: { index: false, follow: false },
  alternates: { canonical: "https://ysli.dev/cs180/project0" },
};

// ── page-local styles ────────────────────────────────────────────────────────
// Wider than the 660px prose shell in ui.ts — the pairs need the room.
const s = stylex.create({
  // A standalone masthead — this page is not wired into the site nav, so it
  // carries its own byline instead of Rail's links back into ysli.dev.
  rail: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: "12px clamp(20px, 5vw, 44px)",
    backgroundColor: colors.ink,
  },
  railMark: {
    color: colors.orange,
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "lowercase",
  },
  railMeta: {
    color: colors.tealLt,
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "lowercase",
  },
  page: {
    position: "relative",
    zIndex: 3,
    maxWidth: 980,
    marginInline: "auto",
    padding: "clamp(64px, 10vh, 110px) clamp(22px, 6vw, 48px) 70px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  prose: { maxWidth: 660 },
  kicker: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: "0.22em",
    textTransform: "lowercase",
    color: colors.inkSoft,
  },
  lede: { fontSize: 17, maxWidth: 660 },

  // section heading: a hairline, a number, a title
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginTop: 42,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  head: { display: "flex", alignItems: "baseline", gap: 14 },
  num: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.2em",
    color: colors.orangeInk,
    backgroundColor: colors.orange,
    padding: "2px 7px",
  },
  h2: {
    fontWeight: 500,
    fontSize: "clamp(19px, 2.4vw, 24px)",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    textTransform: "lowercase",
  },

  // image pairs
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "1fr 1fr", "@media (max-width: 640px)": "1fr" },
    gap: "clamp(14px, 2.4vw, 26px)",
    marginTop: 8,
  },
  plate: { display: "flex", flexDirection: "column", gap: 9, minWidth: 0 },
  mat: {
    backgroundColor: colors.paper,
    padding: "clamp(7px, 1vw, 11px)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.rule,
    lineHeight: 0,
  },
  img: { width: "100%", height: "auto", display: "block" },
  cap: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    borderLeftColor: colors.orange,
    paddingLeft: 10,
  },
  capLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "lowercase",
    lineHeight: 1.5,
  },
  capMeta: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: "0.06em",
    color: colors.inkSoft,
    lineHeight: 1.5,
  },

  // dolly zoom
  dolly: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 372px) 1fr",
      "@media (max-width: 720px)": "1fr",
    },
    gap: "clamp(16px, 3vw, 32px)",
    alignItems: "start",
    marginTop: 8,
  },
  // 3 x 2 so the contact sheet stands as tall as the gif beside it
  strip: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "clamp(8px, 1.2vw, 12px)",
  },
  frame: { display: "flex", flexDirection: "column", gap: 5, minWidth: 0 },
  stripCol: { display: "flex", flexDirection: "column", gap: 12, minWidth: 0 },
  frameNum: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    letterSpacing: "0.1em",
    color: colors.inkSoft,
  },
  stripNote: { fontSize: 15, marginTop: 4 },

  // the "why" note
  why: {
    backgroundColor: "rgba(250, 247, 240, 0.55)",
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    borderLeftColor: colors.tealDk,
    padding: "14px 18px",
    maxWidth: 660,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  whyTag: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "lowercase",
    color: colors.inkSoft,
  },
  eq: {
    fontFamily: fonts.mono,
    fontSize: 13,
    letterSpacing: "0.02em",
    paddingBlock: 2,
  },
});

// ── a captioned plate ────────────────────────────────────────────────────────
function Plate({
  src,
  alt,
  label,
  meta,
  priority,
}: {
  src: string;
  alt: string;
  label: string;
  meta: string;
  priority?: boolean;
}) {
  return (
    <figure data-fish {...stylex.props(s.plate)}>
      <div {...stylex.props(s.mat)}>
        {/* plain <img>: next/image is unoptimized on this static export anyway */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          {...stylex.props(s.img)}
        />
      </div>
      <figcaption {...stylex.props(s.cap)}>
        <span {...stylex.props(s.capLabel)}>{label}</span>
        <span {...stylex.props(s.capMeta)}>{meta}</span>
      </figcaption>
    </figure>
  );
}

const DOLLY = [
  { n: 1, mm: 26 },
  { n: 2, mm: 33 },
  { n: 3, mm: 41 },
  { n: 4, mm: 51 },
  { n: 5, mm: 73 },
  { n: 6, mm: 90 },
];

export default function Proj0() {
  return (
    <>
      <FishCanvas />

      <header {...stylex.props(s.rail)}>
        <span {...stylex.props(s.railMark)}>yushan li</span>
        <span {...stylex.props(s.railMeta)}>cs 180 · project 0</span>
      </header>

      <main {...stylex.props(s.page)}>
        <p {...stylex.props(s.kicker)}>
          cs 180 · fall 2026 · project 0
        </p>
        <h1 {...stylex.props(ui.h1)}>become friends with your camera</h1>

        <p {...stylex.props(s.lede)}>
          three exercises in the same idea: a lens does not decide what a scene
          looks like — the position of the camera does. focal length only picks
          how much of that view you keep. everything below was shot on an iphone
          13 pro, and every number in the captions comes off the exif.
        </p>

        {/* ── part 1 ───────────────────────────────────────────────────── */}
        <section {...stylex.props(s.section)}>
          <div {...stylex.props(s.head)}>
            <span {...stylex.props(s.num)}>01</span>
            <h2 {...stylex.props(s.h2)}>the selfie, wrong and right</h2>
          </div>

          <p {...stylex.props(ui.p, s.prose)}>
            same chair, same face, same front camera, seconds apart. on the left
            the phone is right up against me at 1×. on the right my arm is
            straight out and the camera is zoomed to hold the face at roughly the
            same size.
          </p>

          <div {...stylex.props(s.pair)}>
            <Plate
              priority
              src="/cs180/project0/selfie-close.jpg"
              alt="Close-up selfie taken at arm's length bent, wide 23mm-equivalent lens; the nose reads large and the face bulges toward the camera."
              label="wrong — close + wide"
              meta="23 mm equiv · f/2.2 · 1×"
            />
            <Plate
              src="/cs180/project0/selfie-far.jpg"
              alt="Selfie taken from farther back with the camera zoomed in to 30mm equivalent; facial proportions look flatter and more natural."
              label="right — back + zoom"
              meta="30 mm equiv · f/2.2 · ≈1.5× farther back"
            />
          </div>

          <div {...stylex.props(s.why)}>
            <span {...stylex.props(s.whyTag)}>why</span>
            <p {...stylex.props(ui.p)}>
              a pinhole camera does not record distance, it records{" "}
              <em>ratios</em> of distance. everything in the image is scaled by:
            </p>
            <p {...stylex.props(s.eq)}>size on sensor ∝ f / d</p>
            <p {...stylex.props(ui.p)}>
              so a face is not imaged at one scale, it is imaged at a whole
              gradient of them. my nose sits roughly 12 cm in front of my ears.
              hold the phone 30 cm off the nose and the ears are at 42 — the
              nose is magnified 1.4× more than the ears, and that is the bulge.
              back off to 45 cm and the same 12 cm becomes 45 vs 57, a 1.27×
              spread. the gradient flattens; the face stops leaning out of the
              frame.
            </p>
            <p {...stylex.props(ui.p)}>
              i can read the move straight off the two files. focal length went
              23 → 30 mm (1.3×) while the face got about 15% smaller, so the
              camera must have gone back ≈1.5×. the zoom did none of the fixing —
              it only raised <em>f</em> to put the face back near the size it
              was. the walking did the fixing. that is also why the background
              grew about a quarter: it barely moved relative to the camera, so it
              kept almost all of the 1.3× magnification the face gave up.
            </p>
            <p {...stylex.props(ui.p)}>
              1.5× is as far as one arm goes, so the correction here is real but
              gentle. a portrait lens at 85 mm and two metres drives the same
              ratio down to about 1.06× — near-flat, which is the whole point of
              85 mm.
            </p>
          </div>
        </section>

        {/* ── part 2 ───────────────────────────────────────────────────── */}
        <section {...stylex.props(s.section)}>
          <div {...stylex.props(s.head)}>
            <span {...stylex.props(s.num)}>02</span>
            <h2 {...stylex.props(s.h2)}>a brick wall, compressed and expanded</h2>
          </div>

          <p {...stylex.props(ui.p, s.prose)}>
            the same run of brick under the same lamp, framed to about the same
            size both times. first from across the yard on the 3× telephoto, then
            walked in close on the 1× wide.
          </p>

          <div {...stylex.props(s.pair)}>
            <Plate
              src="/cs180/project0/facade-tele.jpg"
              alt="The brick wall photographed from far away on a 3x telephoto lens; the courses of brick recede gently and the wall reads almost flat."
              label="far + telephoto — flattened"
              meta="3× · ≈77 mm equiv"
            />
            <Plate
              src="/cs180/project0/facade-wide.jpg"
              alt="The same brick wall photographed from close up on the wide lens; the courses of brick rake steeply away and the corner juts toward the viewer."
              label="close + wide — deep"
              meta="26 mm equiv · f/1.5 · 1×"
            />
          </div>

          <div {...stylex.props(s.why)}>
            <span {...stylex.props(s.whyTag)}>why</span>
            <p {...stylex.props(ui.p)}>
              part 1 in reverse. equal framing at 3× the focal length means i
              shot the left frame from about 3× the distance of the right one —
              that ratio is the only thing the two files actually pin down, and
              it is enough.
            </p>
            <p {...stylex.props(ui.p)}>
              call the run of wall 4 m deep, near end to far. from far back —
              say 15 m — the two ends sit at 15 and 19: a 1.3× spread, so the
              courses of brick stay nearly parallel, the mortar lines barely
              converge, and the whole face reads as a flat panel pasted onto the
              image. walk in to 5 m and the same 4 m becomes 5 and 9, a 1.8×
              spread. near bricks now image nearly twice the size of far ones,
              the lines rake hard toward a vanishing point just off frame, and
              the corner of the concrete block juts out at you.
            </p>
            <p {...stylex.props(ui.p)}>
              nothing about the wall changed, and no &ldquo;wide-angle
              distortion&rdquo; is doing the work — the 1× lens is a perfectly
              ordinary projection. only the center of projection moved. this is
              why a long lens stacks a street of buildings like scenery flats,
              and why a small room is always shot wide from the doorway.
            </p>
          </div>
        </section>

        {/* ── part 3 ───────────────────────────────────────────────────── */}
        <section {...stylex.props(s.section)}>
          <div {...stylex.props(s.head)}>
            <span {...stylex.props(s.num)}>03</span>
            <h2 {...stylex.props(s.h2)}>dolly zoom</h2>
          </div>

          <p {...stylex.props(ui.p, s.prose)}>
            six frames, backing away from a rabbit sitting on a wing chun dummy
            while zooming in to hold him at a constant size. 26 mm to 90 mm, so
            the last frame is shot from about 3.5× the distance of the first. the
            rabbit is nailed in place; the room behind him breathes.
          </p>

          <div {...stylex.props(s.dolly)}>
            <div data-fish {...stylex.props(s.mat)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cs180/project0/dolly-zoom.gif"
                alt="Animated dolly zoom: a white stuffed rabbit stays the same size while the puzzle and wooden dummy behind it swell and the background flattens."
                {...stylex.props(s.img)}
              />
            </div>

            <div {...stylex.props(s.stripCol)}>
              <div {...stylex.props(s.strip)}>
                {DOLLY.map((d) => (
                  <figure key={d.n} data-fish {...stylex.props(s.frame)}>
                    <div {...stylex.props(s.mat)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/cs180/project0/dolly-${d.n}.jpg`}
                        alt={`Dolly zoom still ${d.n} of 6, shot at ${d.mm} mm equivalent.`}
                        loading="lazy"
                        {...stylex.props(s.img)}
                      />
                    </div>
                    <figcaption {...stylex.props(s.frameNum)}>
                      {d.n} · {d.mm}mm
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p {...stylex.props(ui.p, s.stripNote)}>
                watch the puzzle on the wall: in frame 1 you see the whole
                landscape, by frame 6 a few fields fill the same space. the
                dummy&apos;s arms swing from a steep diagonal to nearly
                head-on.
              </p>
            </div>
          </div>

          <div {...stylex.props(s.why)}>
            <span {...stylex.props(s.whyTag)}>why</span>
            <p {...stylex.props(ui.p)}>
              zoom and distance are being traded against each other. holding the
              rabbit fixed means keeping <em>f / d</em> constant for him — so
              tripling the distance requires tripling the focal length. but the
              wall behind him sits at <em>d + Δ</em>, and that ratio does not
              hold:
            </p>
            <p {...stylex.props(s.eq)}>
              background / subject = d / (d + Δ)
            </p>
            <p {...stylex.props(ui.p)}>
              as <em>d</em> grows, that fraction climbs toward 1 and the
              background swells to meet the subject. the effect isolates
              perspective as its own visual variable: the object is constant, the
              image is constant in size, and the only thing changing is how much
              depth the scene appears to have. hitchcock pointed it down a
              stairwell in <em>vertigo</em> and got vertigo.
            </p>
          </div>
        </section>

        <section {...stylex.props(s.section)}>
          <div {...stylex.props(s.head)}>
            <span {...stylex.props(s.num)}>end</span>
            <h2 {...stylex.props(s.h2)}>takeaway</h2>
          </div>
          <p {...stylex.props(ui.p, s.prose)}>
            all three parts are the same sentence said three ways. perspective is
            fixed the moment you choose where to stand — it is a property of the
            center of projection, not of the lens. focal length is a crop. if a
            picture&apos;s geometry looks wrong, the fix is in your feet.
          </p>
        </section>

        <p {...stylex.props(ui.hint)}>
          the fish came with the site. they school around whatever you hover —
          double-click anywhere to feed them.
        </p>
      </main>
    </>
  );
}
