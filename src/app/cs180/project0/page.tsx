import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: "cs180 · project 0",
  description:
    "CS180 Project 0, Become Friends with Your Camera. A selfie taken two " +
    "ways, a brick wall at 3x and 1x, and a dolly zoom. Shot on an iPhone 13 Pro.",
  // Unlisted: reachable at its own URL, not linked from the site, not indexed.
  robots: { index: false, follow: false },
};

// Layout only. Background, type and colour come from globals.css.
const css = `
.p0 { max-width: 820px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p0 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; }
.p0 h2 { font-weight: 500; font-size: clamp(19px, 2.4vw, 23px); text-transform: lowercase;
         margin-bottom: 12px; }
.p0 p { margin-bottom: 14px; }
.p0 section { margin-top: 48px; padding-top: 26px; border-top: 1px solid rgba(12,28,32,0.2); }

.p0 .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 20px 0; }
.p0 .six  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 20px 0; }
.p0 .gif  { max-width: 380px; margin: 20px 0; }
@media (max-width: 620px) { .p0 .pair { grid-template-columns: 1fr; } }

.p0 img { width: 100%; height: auto; display: block; }
.p0 figure { margin: 0; }
.p0 figcaption { margin-top: 8px; }
`;

export default function Project0() {
  return (
    <>
      <FishCanvas />
      <style>{css}</style>

      <main className="p0">
        <h1>become friends with your camera</h1>
        <p>CS 180, project 0. Shot on an iPhone 13 Pro.</p>

        <section>
          <h2>1. the selfie</h2>

          <div className="pair">
            <figure data-fish>
              <img
                src="/cs180/project0/selfie-close.jpg"
                alt="Selfie taken close up with the front camera zoomed out."
              />
              <figcaption>Close, zoomed out. 23 mm.</figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project0/selfie-far.jpg"
                alt="Selfie taken from farther back with the front camera zoomed in."
              />
              <figcaption>Farther back, zoomed in. 30 mm.</figcaption>
            </figure>
          </div>

          <p>
            The camera records the ratio of distances, and that is the main
            reason why. I used the auto zoom out and then the zoom in on the
            front camera.
          </p>
          <p>
            I agree that the selfie farther back looks better. At first I
            preferred the closer one a bit more, but the farther one shows my
            entire face, which makes a lot more sense when you are looking at a
            face.
          </p>
        </section>

        <section>
          <h2>2. the brick wall</h2>

          <div className="pair">
            <figure data-fish>
              <img
                src="/cs180/project0/facade-tele.jpg"
                alt="The brick wall shot from far away at 3x, where the wall reads flat."
              />
              <figcaption>Far, 3x.</figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project0/facade-wide.jpg"
                alt="The same brick wall shot from close up at 1x, where the courses rake away."
              />
              <figcaption>Close, 1x.</figcaption>
            </figure>
          </div>

          <p>
            Here I used 3x and then 1x on the back camera. The spread is what
            impacted the flatness.
          </p>
          <p>
            I think the brick wall looks better closer up, although it is more
            compact and gives less dimension. The 1x lens is an ordinary
            projection. What moved is the center of projection, which is the same
            reason a small room is shot wide from the doorway.
          </p>
        </section>

        <section>
          <h2>3. dolly zoom</h2>

          <div className="gif">
            <figure data-fish>
              <img
                src="/cs180/project0/dolly-zoom.gif"
                alt="Animated dolly zoom. The rabbit stays the same size while the room behind it swells."
              />
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
                  alt={`Dolly zoom still ${n} of 6, shot at ${mm} mm.`}
                />
                <figcaption>{mm} mm</figcaption>
              </figure>
            ))}
          </div>

          <p>
            I walked backwards while zooming in, from 26 mm to 90 mm, so the
            rabbit stays the same size and the room behind him does not.
          </p>
          <p>
            I tried very hard to do a good job, and the gif you are seeing is the
            best that I could do.
          </p>
        </section>
      </main>
    </>
  );
}
