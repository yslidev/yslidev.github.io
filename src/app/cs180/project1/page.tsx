import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: { absolute: "CS 180, project 1" },
  description:
    "CS180 Project 1, Colorizing the Prokudin-Gorskii Photo Collection. " +
    "Single-scale alignment on the small scans and a multiscale pyramid on " +
    "the full-resolution glass plate negatives.",
  // Unlisted: reachable at its own URL, not linked from the site, not indexed.
  robots: { index: false, follow: false },
};

// Layout only. Background, type and colour come from globals.css.
const css = `
.p1 { max-width: 820px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p1 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; }
.p1 h2 { font-weight: 500; font-size: clamp(19px, 2.4vw, 23px); text-transform: lowercase;
         margin-bottom: 12px; }
.p1 h2.sub { text-transform: none; font-size: clamp(17px, 2.2vw, 21px); margin-bottom: 0; }
.p1 p { margin-bottom: 14px; }
.p1 section { margin-top: 48px; padding-top: 26px; border-top: 1px solid rgba(12,28,32,0.2); }

.p1 .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
             align-items: start; margin: 20px 0; }
@media (max-width: 620px) { .p1 .three { grid-template-columns: 1fr; } }

.p1 img { width: 100%; height: auto; display: block; }
.p1 figure { margin: 0; }
.p1 figcaption { margin-top: 8px; }
`;

export default function Project1() {
  return (
    <>
      <FishCanvas />
      <style>{css}</style>

      <main className="p1">
        <h1>colorizing the prokudin-gorskii collection</h1>
        <h2 className="sub">CS 180, project 1.</h2>

        <section>
          <h2>1. single-scale alignment</h2>

          <p>
            I cut each scan into three equal strips, blue on top, and aligned
            green and red to blue. For every displacement in a window of plus or
            minus fifteen pixels I score the overlap with normalized
            cross-correlation and keep the best one. I score on gradient
            magnitude rather than raw brightness, and I ignore a margin around
            the border so the plate frame does not dominate.
          </p>
          <p>Displacements below are (dy, dx) relative to blue.</p>

          <div className="three">
            <figure data-fish>
              <img
                src="/cs180/project1/cathedral.jpg"
                alt="cathedral, colour channels aligned."
              />
              <figcaption>
                cathedral
                <br />
                green (5, 2) &nbsp; red (12, 3)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/monastery.jpg"
                alt="monastery, colour channels aligned."
              />
              <figcaption>
                monastery
                <br />
                green (-3, 2) &nbsp; red (3, 2)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/tobolsk.jpg"
                alt="tobolsk, colour channels aligned."
              />
              <figcaption>
                tobolsk
                <br />
                green (3, 2) &nbsp; red (6, 3)
              </figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2. multiscale pyramid</h2>

          <p>
            The full-resolution scans shift by up to 177 pixels, which is too
            wide to search directly. I halve the image repeatedly until the short
            side is at most 128 pixels, run the same plus or minus fifteen search
            there, then walk back up doubling the offset and refining it within
            plus or minus three at each level. Each level is blurred with a
            binomial kernel before dropping every other pixel, otherwise aliasing
            puts fake structure into the coarse levels and the search locks onto
            it.
          </p>
          <p>All eleven align with no visible defects. About ten seconds each.</p>

          <div className="three">
            <figure data-fish>
              <img
                src="/cs180/project1/church.jpg"
                alt="church, colour channels aligned."
              />
              <figcaption>
                church
                <br />
                green (25, 4) &nbsp; red (58, -4)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/emir.jpg"
                alt="emir, colour channels aligned."
              />
              <figcaption>
                emir
                <br />
                green (49, 23) &nbsp; red (107, 40)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/harvesters.jpg"
                alt="harvesters, colour channels aligned."
              />
              <figcaption>
                harvesters
                <br />
                green (60, 17) &nbsp; red (124, 14)
              </figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img
                src="/cs180/project1/icon.jpg"
                alt="icon, colour channels aligned."
              />
              <figcaption>
                icon
                <br />
                green (42, 17) &nbsp; red (90, 23)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/ilemselga.jpg"
                alt="ilemselga, colour channels aligned."
              />
              <figcaption>
                ilemselga
                <br />
                green (40, 7) &nbsp; red (131, 11)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/melons.jpg"
                alt="melons, colour channels aligned."
              />
              <figcaption>
                melons
                <br />
                green (80, 10) &nbsp; red (177, 13)
              </figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img
                src="/cs180/project1/religous_painting.jpg"
                alt="religous painting, colour channels aligned."
              />
              <figcaption>
                religous painting
                <br />
                green (30, 7) &nbsp; red (70, 6)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/self_portrait.jpg"
                alt="self portrait, colour channels aligned."
              />
              <figcaption>
                self portrait
                <br />
                green (78, 29) &nbsp; red (176, 37)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/siren.jpg"
                alt="siren, colour channels aligned."
              />
              <figcaption>
                siren
                <br />
                green (49, -7) &nbsp; red (96, -24)
              </figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img
                src="/cs180/project1/three_generations.jpg"
                alt="three generations, colour channels aligned."
              />
              <figcaption>
                three generations
                <br />
                green (54, 12) &nbsp; red (111, 9)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/wharf.jpg"
                alt="wharf, colour channels aligned."
              />
              <figcaption>
                wharf
                <br />
                green (15, -7) &nbsp; red (83, -17)
              </figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>3. my own images</h2>

          <p>From the Library of Congress collection.</p>

          <div className="three">
            <figure data-fish>
              <img
                src="/cs180/project1/view_of_a_trestle_bridge.jpg"
                alt="trestle bridge, colour channels aligned."
              />
              <figcaption>
                trestle bridge
                <br />
                green (44, 25) &nbsp; red (107, 31)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/on_the_way_to_yurezan_bridge.jpg"
                alt="on the way to Yurezan bridge, colour channels aligned."
              />
              <figcaption>
                on the way to Yurezan bridge
                <br />
                green (55, 26) &nbsp; red (117, 34)
              </figcaption>
            </figure>
            <figure data-fish>
              <img
                src="/cs180/project1/waterfront_scene_including_bridges_boats.jpg"
                alt="waterfront scene, colour channels aligned."
              />
              <figcaption>
                waterfront scene
                <br />
                green (42, 12) &nbsp; red (94, 19)
              </figcaption>
            </figure>
          </div>
        </section>
      </main>
    </>
  );
}
