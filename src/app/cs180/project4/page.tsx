import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: { absolute: "CS 180, project 4" },
  description: "CS180 Project 4, (Auto)stitching Photo Mosaics.",
  robots: { index: false, follow: false },
};

const css = `
.p4 { max-width: 860px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p4 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; }
.p4 h2 { font-weight: 500; font-size: clamp(19px, 2.4vw, 23px); text-transform: lowercase; margin-bottom: 12px; }
.p4 h3 { font-weight: 500; font-size: 17px; text-transform: lowercase; margin: 26px 0 8px; }
.p4 h2.sub { text-transform: none; font-size: clamp(17px, 2.2vw, 21px); margin-bottom: 0; }
.p4 h2.part { margin-top: 64px; font-size: clamp(22px, 3vw, 28px); }
.p4 p { margin-bottom: 14px; }
.p4 section { margin-top: 48px; padding-top: 26px; border-top: 1px solid rgba(12,28,32,0.2); }
.p4 .one   { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 18px 0; }
.p4 .two   { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 18px 0; }
.p4 .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 18px 0; }
.p4 .one, .p4 .two, .p4 .three { align-items: start; }
.p4 img { width: 100%; height: auto; display: block; }
.p4 img.px { image-rendering: pixelated; }
.p4 figure { margin: 0; }
.p4 figcaption { margin-top: 7px; font-size: 14px; line-height: 1.45; }
.p4 pre { font-size: 13px; line-height: 1.5; overflow-x: auto; margin: 14px 0; }
@media print {
  .p4 h2, .p4 h3 { break-after: avoid; }
  .p4 figure, .p4 p, .p4 pre { break-inside: avoid; }
}
`;

function Fig({ src, cap, px }: { src: string; cap?: string; px?: boolean }) {
  return (
    <figure data-fish>
      <img className={px ? "px" : undefined} src={`/cs180/project4/${src}`} alt={cap ?? src} loading="lazy" />
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  );
}

export default function Project4() {
  return (
    <>
      <FishCanvas />
      <style>{css}</style>
      <main className="p4">
        <h1>(auto)stitching photo mosaics</h1>
        <h2 className="sub">CS 180, project 4.</h2>

        <h2 className="part">part a: image warping and mosaicing</h2>

        <section>
          <h2>a.1 shoot the pictures</h2>
          <div className="three">
            <Fig src="src_786.jpg" />
            <Fig src="src_787.jpg" />
            <Fig src="src_788.jpg" />
          </div>
          <div className="three">
            <Fig src="src_789.jpg" />
            <Fig src="src_790.jpg" />
          </div>
          <div className="three">
            <Fig src="src_792.jpg" />
            <Fig src="src_793.jpg" />
            <Fig src="src_794.jpg" />
          </div>
        </section>

        <section>
          <h2>a.2 recover homographies</h2>
          <p>
            With h33 = 1, each pair of points (x, y) → (x′, y′) gives two
            equations in the other eight entries of H:
          </p>
          <pre>{`h11 x + h12 y + h13 − h31 x x′ − h32 y x′ = x′
h21 x + h22 y + h23 − h31 x y′ − h32 y y′ = y′`}</pre>
          <p>
            Stacking n ≥ 4 pairs gives A h = b with A of size 2n × 8, solved by
            least squares. Correspondences for 786 → 787 (9 points):
          </p>
          <div className="one"><Fig src="corr_786_787.jpg" /></div>
          <pre>{`first two rows of A h = b:
[332  97  1    0   0  0  −13944   −4074] h = 42
[  0   0  0  332  97  1  −48472  −14162] h = 146

H =
[ 1.2668   0.0178  −375.21 ]
[ 0.2125   1.0928   −15.35 ]
[ 0.0004  −0.0001     1    ]`}</pre>
          <div className="one">
            <Fig src="corr_787_788.jpg" />
            <Fig src="corr_789_790.jpg" />
            <Fig src="corr_792_793.jpg" />
            <Fig src="corr_793_794.jpg" />
          </div>
        </section>

        <section>
          <h2>a.3 warp the images</h2>
          <h3>rectification</h3>
          <div className="two">
            <Fig src="rect_book_src.jpg" />
            <Fig src="rect_book_bilinear.jpg" />
          </div>
          <div className="two">
            <Fig src="rect_monitor_src.jpg" />
            <Fig src="rect_monitor_bilinear.jpg" />
          </div>
          <h3>nearest neighbor vs bilinear</h3>
          <div className="two">
            <Fig src="rect_crop_nn.jpg" cap="nearest neighbor" px />
            <Fig src="rect_crop_bilinear.jpg" cap="bilinear" px />
          </div>
          <p>
            Nearest neighbor took 0.07 s for the book and bilinear 0.19 s,
            about 3× slower. Nearest neighbor gives jagged edges on the
            lettering; bilinear is smoother but slightly blurrier.
          </p>
        </section>

        <section>
          <h2>a.4 blend the images into a mosaic</h2>
          <p>
            The middle photo is the reference and the others are warped into
            its frame with bilinear interpolation. Each image gets a weight that
            is 1 at its center and falls to 0 at its edges (distance
            transform). The low frequencies are blended as a weighted average
            and the high frequencies come from the image with the larger
            weight, a two-band Laplacian blend.
          </p>
          <div className="one"><Fig src="mosaic_bedroom.jpg" /></div>
          <div className="one"><Fig src="mosaic_tree.jpg" /></div>
          <div className="one"><Fig src="mosaic_desk.jpg" /></div>
        </section>
      </main>
    </>
  );
}
