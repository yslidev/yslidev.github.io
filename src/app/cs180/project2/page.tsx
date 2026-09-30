import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: { absolute: "CS 180, project 2" },
  description: "CS180 Project 2, Fun with Filters and Frequencies.",
  robots: { index: false, follow: false },
};

const css = `
.p2 { max-width: 860px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p2 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; }
.p2 h2 { font-weight: 500; font-size: clamp(19px, 2.4vw, 23px); text-transform: lowercase; margin-bottom: 12px; }
.p2 h3 { font-weight: 500; font-size: 17px; text-transform: lowercase; margin: 26px 0 8px; }
.p2 h2.sub { text-transform: none; font-size: clamp(17px, 2.2vw, 21px); margin-bottom: 0; }
.p2 p { margin-bottom: 14px; }
.p2 section { margin-top: 48px; padding-top: 26px; border-top: 1px solid rgba(12,28,32,0.2); }
.p2 .one   { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 18px 0; }
.p2 .two   { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 18px 0; }
.p2 .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 18px 0; }
.p2 .four  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; }
.p2 .five  { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 18px 0; }
.p2 .one, .p2 .two, .p2 .three, .p2 .four, .p2 .five { align-items: start; }
@media (max-width: 720px) { .p2 .three, .p2 .four, .p2 .five { grid-template-columns: repeat(2, 1fr); } }
.p2 img { width: 100%; height: auto; display: block; }
.p2 figure { margin: 0; }
.p2 figcaption { margin-top: 7px; font-size: 14px; line-height: 1.45; }
.p2 pre { background: rgba(12,28,32,0.06); padding: 14px 16px; border-radius: 8px;
          overflow-x: auto; font-size: 13px; line-height: 1.5; margin: 14px 0; }
.p2 table { border-collapse: collapse; margin: 14px 0 18px; font-size: 15px; }
.p2 th, .p2 td { text-align: left; padding: 5px 22px 5px 0; border-bottom: 1px solid rgba(12,28,32,0.15); }
.p2 th { font-weight: 500; }
`;

export default function Project2() {
  return (
    <>
      <FishCanvas />
      <style>{css}</style>
      <main className="p2">
        <h1>fun with filters and frequencies</h1>
        <h2 className="sub">CS 180, project 2.</h2>

        <section>
          <h2>1.1 convolutions from scratch</h2>
          <p>Both versions flip the kernel and zero-pad so the output keeps the input&apos;s size.</p>
          <pre><code>{`def conv2d_4loop(im, k):
    k = np.flip(np.flip(k, 0), 1)
    kh, kw = k.shape
    p = np.pad(im, ((kh//2, kh//2), (kw//2, kw//2)))
    out = np.zeros_like(im)
    for i in range(im.shape[0]):
        for j in range(im.shape[1]):
            acc = 0.0
            for a in range(kh):
                for b in range(kw):
                    acc += k[a, b] * p[i + a, j + b]
            out[i, j] = acc
    return out`}</code></pre>
          <pre><code>{`def conv2d_2loop(im, k):
    k = np.flip(np.flip(k, 0), 1)
    kh, kw = k.shape
    p = np.pad(im, ((kh//2, kh//2), (kw//2, kw//2)))
    H, W = im.shape
    out = np.zeros((H, W))
    for a in range(kh):
        for b in range(kw):
            out += k[a, b] * p[a:a+H, b:b+W]
    return out`}</code></pre>
          <table>
            <thead><tr><th>128x128, 9x9 box</th><th>time</th></tr></thead>
            <tbody>
              <tr><td>four loops</td><td>165 ms</td></tr>
              <tr><td>two loops</td><td>1 ms</td></tr>
              <tr><td>scipy.signal.convolve2d</td><td>1 ms</td></tr>
            </tbody>
          </table>
          <p>
            The four-loop version does every multiply in Python. The two-loop
            version loops over the 81 kernel taps and lets NumPy multiply the
            whole image at once, which puts it level with scipy. On the full
            photo the four-loop version takes about 6 seconds.
          </p>
          <p>
            Boundaries are zero-filled, the same as scipy&apos;s default, so the
            box-filtered image darkens along its edges. Both versions match scipy
            to within 1e-15.
          </p>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/11_portrait.jpg" alt="grayscale" loading="lazy" />
              <figcaption>grayscale</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_box.jpg" alt="9x9 box" loading="lazy" />
              <figcaption>9x9 box</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_dx.jpg" alt="D_x" loading="lazy" />
              <figcaption>D_x</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_dy.jpg" alt="D_y" loading="lazy" />
              <figcaption>D_y</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>1.2 finite difference operator</h2>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/12_dx.jpg" alt="D_x" loading="lazy" />
              <figcaption>D_x</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_dy.jpg" alt="D_y" loading="lazy" />
              <figcaption>D_y</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_mag.jpg" alt="gradient magnitude" loading="lazy" />
              <figcaption>gradient magnitude</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_edges.jpg" alt="threshold 0.18" loading="lazy" />
              <figcaption>threshold 0.18</figcaption>
            </figure>
          </div>
          <p>
            At 0.18 the camera, coat, tripod and skyline stay continuous. Lower,
            the grass comes through as noise. Higher, the tripod legs and the
            buildings break apart.
          </p>
        </section>

        <section>
          <h2>1.3 derivative of gaussian</h2>
          <div className="two">
            <figure data-fish>
              <img src="/cs180/project2/13_blur_mag.jpg" alt="gradient magnitude, blurred first" loading="lazy" />
              <figcaption>gradient magnitude, blurred first</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_blur_edges.jpg" alt="threshold 0.10" loading="lazy" />
              <figcaption>threshold 0.10</figcaption>
            </figure>
          </div>
          <p>
            Blurring first removes most of the noise. The grass speckle is gone and
            the edges are thicker, smoother and unbroken, so a lower threshold is
            enough. The finest detail, like the far buildings, fades.
          </p>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/13_dogx.jpg" alt="DoG_x" loading="lazy" />
              <figcaption>DoG_x</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_dogy.jpg" alt="DoG_y" loading="lazy" />
              <figcaption>DoG_y</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_dog_mag.jpg" alt="gradient magnitude, DoG" loading="lazy" />
              <figcaption>gradient magnitude, DoG</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_dog_edges.jpg" alt="threshold 0.10" loading="lazy" />
              <figcaption>threshold 0.10</figcaption>
            </figure>
          </div>
          <p>
            One convolution with the DoG filters gives the same result. The two
            agree to 1.7e-15 except within a kernel width of the border, where the
            two-step version zero-pads twice.
          </p>
        </section>

        <section>
          <h2>2.1 image sharpening</h2>
          <p>
            The Gaussian is a low-pass filter, so the original minus its blur is the
            high frequencies. Adding α times those back sharpens the image. As one
            convolution: f + α(f − f∗g) = f ∗ ((1+α)e − αg), where e is the unit
            impulse.
          </p>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/21_taj.jpg" alt="original" loading="lazy" />
              <figcaption>original</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_blur.jpg" alt="blurred" loading="lazy" />
              <figcaption>blurred</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_high.jpg" alt="high frequencies" loading="lazy" />
              <figcaption>high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_sharp.jpg" alt="sharpened, α = 1" loading="lazy" />
              <figcaption>sharpened, α = 1</figcaption>
            </figure>
          </div>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/21_library.jpg" alt="original" loading="lazy" />
              <figcaption>original</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_library_blur.jpg" alt="blurred" loading="lazy" />
              <figcaption>blurred</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_library_high.jpg" alt="high frequencies" loading="lazy" />
              <figcaption>high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_library_sharp.jpg" alt="sharpened, α = 1" loading="lazy" />
              <figcaption>sharpened, α = 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_library_resharp.jpg" alt="blurred, then sharpened, α = 2" loading="lazy" />
              <figcaption>blurred, then sharpened, α = 2</figcaption>
            </figure>
          </div>
          <p>
            Sharpening the blurred copy brings the edge contrast back, but not the
            leaf and brick detail. Mean error against the original only falls from
            0.037 to 0.031. The blur shrank those frequencies to nearly zero, and
            sharpening can only amplify what is left.
          </p>
          <h3>varying α</h3>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/21_taj_a0p5.jpg" alt="α = 0.5" loading="lazy" />
              <figcaption>α = 0.5</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_sharp.jpg" alt="α = 1" loading="lazy" />
              <figcaption>α = 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_a2p0.jpg" alt="α = 2" loading="lazy" />
              <figcaption>α = 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_a4p0.jpg" alt="α = 4" loading="lazy" />
              <figcaption>α = 4</figcaption>
            </figure>
          </div>
          <p>Larger α strengthens the edges until halos and noise take over.</p>
        </section>

        <section>
          <h2>2.2 hybrid images</h2>
          <h3>derek and nutmeg</h3>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/22_derek.jpg" alt="Derek" loading="lazy" />
              <figcaption>Derek</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_nutmeg.jpg" alt="Nutmeg" loading="lazy" />
              <figcaption>Nutmeg</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_derek_aligned.jpg" alt="Derek, aligned" loading="lazy" />
              <figcaption>Derek, aligned</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_nutmeg_aligned.jpg" alt="Nutmeg, aligned" loading="lazy" />
              <figcaption>Nutmeg, aligned</figcaption>
            </figure>
          </div>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_dn_low.jpg" alt="low pass, σ = 8" loading="lazy" />
              <figcaption>low pass, σ = 8</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_dn_high.jpg" alt="high pass, σ = 4" loading="lazy" />
              <figcaption>high pass, σ = 4</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_dn_hybrid.jpg" alt="hybrid" loading="lazy" />
              <figcaption>hybrid</figcaption>
            </figure>
          </div>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/22_fft_derek.jpg" alt="Derek" loading="lazy" />
              <figcaption>Derek</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_nutmeg.jpg" alt="Nutmeg" loading="lazy" />
              <figcaption>Nutmeg</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_low.jpg" alt="low pass" loading="lazy" />
              <figcaption>low pass</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_high.jpg" alt="high pass" loading="lazy" />
              <figcaption>high pass</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_hybrid.jpg" alt="hybrid" loading="lazy" />
              <figcaption>hybrid</figcaption>
            </figure>
          </div>
          <p>
            Aligned on the eyes. I picked the cutoffs by trying values. With a
            smaller σ on Derek, his face competes with the cat up close. With a
            larger σ on Nutmeg, only the whiskers survive.
          </p>
          <h3>library and me</h3>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_library.jpg" alt="22_library.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_me.jpg" alt="22_me.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_lib_hybrid.jpg" alt="hybrid" loading="lazy" />
              <figcaption>hybrid</figcaption>
            </figure>
          </div>
          <h3>two moments</h3>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_pose_a.jpg" alt="22_pose_a.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_pose_b.jpg" alt="22_pose_b.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_pose_hybrid.jpg" alt="hybrid" loading="lazy" />
              <figcaption>hybrid</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2.3 gaussian and laplacian stacks</h2>
          <p>
            No downsampling, and σ doubles at each level. Each Laplacian level is
            the difference of two neighbouring Gaussian levels, and the last is the
            final Gaussian level, so the stack sums back to the original.
          </p>
          <h3>apple, gaussian</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g0.jpg" alt="23_apple_g0.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g1.jpg" alt="23_apple_g1.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g2.jpg" alt="23_apple_g2.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g3.jpg" alt="23_apple_g3.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g4.jpg" alt="23_apple_g4.jpg" loading="lazy" />
            </figure>
          </div>
          <h3>apple, laplacian</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l0.jpg" alt="23_apple_l0.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l1.jpg" alt="23_apple_l1.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l2.jpg" alt="23_apple_l2.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l3.jpg" alt="23_apple_l3.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l4.jpg" alt="23_apple_l4.jpg" loading="lazy" />
            </figure>
          </div>
          <h3>orange, gaussian</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g0.jpg" alt="23_orange_g0.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g1.jpg" alt="23_orange_g1.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g2.jpg" alt="23_orange_g2.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g3.jpg" alt="23_orange_g3.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g4.jpg" alt="23_orange_g4.jpg" loading="lazy" />
            </figure>
          </div>
          <h3>orange, laplacian</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l0.jpg" alt="23_orange_l0.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l1.jpg" alt="23_orange_l1.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l2.jpg" alt="23_orange_l2.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l3.jpg" alt="23_orange_l3.jpg" loading="lazy" />
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l4.jpg" alt="23_orange_l4.jpg" loading="lazy" />
            </figure>
          </div>
          <h3>figure 3.42</h3>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/23_fig342.jpg" alt="23_fig342.jpg" loading="lazy" />
            </figure>
          </div>
        </section>

        <section>
          <h2>2.4 multiresolution blending</h2>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/24_oraple.jpg" alt="24_oraple.jpg" loading="lazy" />
            </figure>
          </div>
          <p>
            The mask gets its own Gaussian stack, so each band is joined with a
            seam as wide as that band&apos;s scale.
          </p>
          <h3>vertical seam</h3>
          <div className="two">
            <figure data-fish>
              <img src="/cs180/project2/24_poses.jpg" alt="24_poses.jpg" loading="lazy" />
            </figure>
          </div>
          <h3>irregular mask</h3>
          <div className="two">
            <figure data-fish>
              <img src="/cs180/project2/24_mask.jpg" alt="mask" loading="lazy" />
              <figcaption>mask</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_portrait_library.jpg" alt="blended" loading="lazy" />
              <figcaption>blended</figcaption>
            </figure>
          </div>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/24_process.jpg" alt="rows: portrait × mask, library × (1 − mask), their sum" loading="lazy" />
              <figcaption>rows: portrait × mask, library × (1 − mask), their sum</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>what I learned</h2>
          <p>
            Every part of this project is the same two ideas: the low frequencies
            are the blurred image, and the high frequencies are the image minus its
            blur. Sharpening, hybrids and blending just recombine those bands.
          </p>
        </section>
      </main>
    </>
  );
}
