import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: "cs180 · project 0",
  description:
    "CS180 Project 0 — Become Friends with Your Camera. A two-way selfie, a " +
    "brick wall shot at 3x and 1x, and a dolly zoom. Shot on an iPhone 13 Pro.",
  // Unlisted: reachable at its own URL, not linked from the site, not indexed.
  robots: { index: false, follow: false },
};

// Plain HTML and a single stylesheet. The page inherits the site's background,
// type and colour from globals.css; everything below is layout only.
const css = `
.p0 { max-width: 820px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p0 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; margin-bottom: 4px; }
.p0 h2 { font-weight: 500; font-size: clamp(18px, 2.4vw, 22px); text-transform: lowercase;
         margin-bottom: 10px; }
.p0 p { margin-bottom: 14px; }
.p0 .meta { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em;
            text-transform: lowercase; color: rgba(12,28,32,0.55); margin-bottom: 26px; }
.p0 section { margin-top: 52px; padding-top: 26px; border-top: 1px solid rgba(12,28,32,0.2); }

.p0 .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 20px 0 8px; }
.p0 .six  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0 8px; }
.p0 .gif  { max-width: 380px; margin: 20px 0 8px; }
@media (max-width: 620px) { .p0 .pair { grid-template-columns: 1fr; } }

.p0 img { width: 100%; height: auto; display: block; }
.p0 figure { margin: 0; }
.p0 figcaption { font-family: 'IBM Plex Mono', monospace; font-size: 11px; line-height: 1.6;
                 letter-spacing: 0.04em; color: rgba(12,28,32,0.7); margin-top: 7px; }
.p0 .why { margin-top: 22px; }
.p0 .why h3 { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.22em;
              text-transform: lowercase; font-weight: 400; color: rgba(12,28,32,0.55);
              margin-bottom: 10px; }
.p0 code { font-family: 'IBM Plex Mono', monospace; font-size: 13px; }
`;

export default function Project0() {
  return (
    <>
      <FishCanvas />
      <style>{css}</style>

      <main className="p0">
        <h1>become friends with your camera</h1>
        <p className="meta">cs 180 · project 0 · yushan li · iphone 13 pro</p>

        <p>
          three exercises, one idea. a camera does not record distance, it
          records the <em>ratio</em> of distances — so what a picture looks like
          is decided by where you stand, and the lens only picks how much of that
          view you keep. every focal length below is read off the exif.
        </p>

        {/* ── 1 ──────────────────────────────────────────────────────────── */}
        <section>
          <h2>1. the selfie, wrong and right</h2>
          <p>
            both on the front camera, seconds apart: the first with the camera
            zoomed out and held close, the second zoomed back in from farther
            away, framed to keep the face about the same size.
          </p>

          <div className="pair">
            <figure data-fish>
              <img
                src="/cs180/project0/selfie-close.jpg"
                alt="Selfie taken close up with the front camera zoomed out; the nose reads large and the face bulges toward the camera."
              />
              <figcaption>
                wrong — close, zoomed out
                <br />
                23 mm equiv · f/2.2
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project0/selfie-far.jpg"
                alt="Selfie taken from farther back with the front camera zoomed in; the face reads flatter and more natural."
              />
              <figcaption>
                right — farther back, zoomed in
                <br />
                30 mm equiv · f/2.2 · ≈1.5× the distance
              </figcaption>
            </figure>
          </div>

          <div className="why">
            <h3>why</h3>
            <p>
              a face is not imaged at one scale. my nose sits about 12 cm in
              front of my ears, so at 30 cm the nose is imaged from 30 and the
              ears from 42 — the nose comes out 1.4× larger than it should, and
              that is the bulge. step back to 45 cm and the same 12 cm becomes 45
              against 57, a 1.27× spread. the gradient flattens and the face
              stops leaning out of the frame.
            </p>
            <p>
              the two files give the move away. focal length went 23 → 30 mm
              (1.3×) while the face got about 15% smaller, so the camera must
              have gone back roughly 1.5×. the zoom fixed nothing — it only
              raised <code>f</code> to put the face back near the size it was.
              the stepping back did the fixing.
            </p>
            <p>
              at first i liked the close one better. i changed my mind: the
              farther shot shows my whole face at proportions that actually make
              sense, and once you see that you cannot unsee the other one.
            </p>
          </div>
        </section>

        {/* ── 2 ──────────────────────────────────────────────────────────── */}
        <section>
          <h2>2. the brick wall</h2>
          <p>
            back camera this time. first at 3× from across the yard, then at 1×
            walked in close, framed to about the same size.
          </p>

          <div className="pair">
            <figure data-fish>
              <img
                src="/cs180/project0/facade-tele.jpg"
                alt="The brick wall shot from far away at 3x; the courses of brick stay nearly parallel and the wall reads flat."
              />
              <figcaption>
                far, 3× — flattened
                <br />
                ≈77 mm equiv
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project0/facade-wide.jpg"
                alt="The same brick wall shot from close up at 1x; the courses rake steeply away and the corner juts toward the viewer."
              />
              <figcaption>
                close, 1× — deep
                <br />
                26 mm equiv · f/1.5
              </figcaption>
            </figure>
          </div>

          <div className="why">
            <h3>why</h3>
            <p>
              part 1 in reverse. same framing at 3× the focal length means i shot
              the first frame from about 3× the distance — and the spread is what
              sets the flatness. call the run of wall 4 m deep. from 15 m the two
              ends sit at 15 and 19, a 1.3× spread, so the courses stay nearly
              parallel and the wall reads as a flat panel pasted onto the image.
              from 5 m the same 4 m becomes 5 and 9, a 1.8× spread: near bricks
              image nearly twice the far ones and the mortar lines rake hard
              toward a vanishing point.
            </p>
            <p>
              no wide-angle distortion is involved — the 1× lens is an ordinary
              projection. only the center of projection moved. it is the same
              reason a small room is always shot wide from the doorway.
            </p>
            <p>
              i prefer the close one. it is the less flattering of the two by the
              standards of part 1, but on a wall that is the point: the depth is
              the subject.
            </p>
          </div>
        </section>

        {/* ── 3 ──────────────────────────────────────────────────────────── */}
        <section>
          <h2>3. dolly zoom</h2>
          <p>
            six frames, walking backwards from a rabbit on a wing chun dummy
            while zooming in to hold him the same size. 26 mm to 90 mm, so the
            last frame is shot from about 3.5× the distance of the first.
          </p>

          <div className="gif">
            <figure data-fish>
              <img
                src="/cs180/project0/dolly-zoom.gif"
                alt="Animated dolly zoom: the stuffed rabbit stays the same size while the room behind it swells and flattens."
              />
              <figcaption>26 → 90 mm, then back</figcaption>
            </figure>
          </div>

          <div className="six">
            {[
              [1, 26],
              [2, 33],
              [3, 41],
              [4, 51],
              [5, 73],
              [6, 90],
            ].map(([n, mm]) => (
              <figure key={n} data-fish>
                <img
                  src={`/cs180/project0/dolly-${n}.jpg`}
                  alt={`Dolly zoom still ${n} of 6, shot at ${mm} mm equivalent.`}
                />
                <figcaption>
                  {n} · {mm} mm
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="why">
            <h3>why</h3>
            <p>
              holding the rabbit the same size means holding <code>f / d</code>{" "}
              constant for him, so tripling the distance means tripling the focal
              length. but the wall behind him sits at <code>d + Δ</code>, and
              that ratio does not hold — the background comes out scaled by{" "}
              <code>d / (d + Δ)</code>, which climbs toward 1 as you back away.
              so the background swells to meet the subject while the subject
              never moves.
            </p>
            <p>
              which is the whole trick: the object is constant and its size in
              frame is constant, and the only thing changing is how much depth
              the scene appears to have. hitchcock pointed it down a stairwell.
            </p>
            <p>
              handheld, six frames, no tripod — this is the best take i got, and
              the rabbit still drifts a little between frames.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
