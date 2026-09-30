import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: { absolute: "CS 180, project 2" },
  description:
    "CS180 Project 2, Fun with Filters and Frequencies. Convolution from " +
    "scratch, edge detection, unsharp masking, hybrid images, Laplacian " +
    "stacks and multiresolution blending.",
  robots: { index: false, follow: false },
};

const css = `
.p2 { max-width: 860px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p2 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; }
.p2 h2 { font-weight: 500; font-size: clamp(19px, 2.4vw, 23px); text-transform: lowercase;
         margin-bottom: 12px; }
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
@media (max-width: 720px) {
  .p2 .three, .p2 .four, .p2 .five { grid-template-columns: repeat(2, 1fr); }
}

.p2 img { width: 100%; height: auto; display: block; }
.p2 figure { margin: 0; }
.p2 figcaption { margin-top: 7px; font-size: 14px; line-height: 1.45; }
.p2 pre { background: rgba(12,28,32,0.06); padding: 14px 16px; border-radius: 8px;
          overflow-x: auto; font-size: 13px; line-height: 1.5; margin: 14px 0; }
.p2 table { border-collapse: collapse; margin: 14px 0 18px; font-size: 15px; }
.p2 th, .p2 td { text-align: left; padding: 5px 22px 5px 0;
                 border-bottom: 1px solid rgba(12,28,32,0.15); }
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

          <p>
            Both versions flip the filter, pad with zeros, and return an output
            the same size as the input. The four-loop version walks every output
            pixel and, inside that, every kernel tap. The two-loop version loops
            over the kernel only: for each tap it multiplies the whole shifted
            image by that weight and accumulates. Same arithmetic, but NumPy
            does the per-pixel part in C.
          </p>

          <pre><code>{`def conv2d_4loop(im, k):
    k = np.flip(np.flip(k, 0), 1)          # convolution flips the filter
    kh, kw = k.shape
    p = np.pad(im, ((kh//2, kh//2), (kw//2, kw//2)))   # zero fill, 'same'
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
    for a in range(kh):                     # loop over the kernel only
        for b in range(kw):
            out += k[a, b] * p[a:a+H, b:b+W]
    return out`}</code></pre>

          <h3>runtime</h3>
          <p>
            Timed on a 128x128 crop with the 9x9 box filter, best of several
            runs.
          </p>
          <table>
            <thead><tr><th>method</th><th>time</th><th>vs four loops</th></tr></thead>
            <tbody>
              <tr><td>four loops</td><td>169 ms</td><td>1x</td></tr>
              <tr><td>two loops</td><td>0.96 ms</td><td>176x faster</td></tr>
              <tr><td>scipy.signal.convolve2d</td><td>1.02 ms</td><td>166x faster</td></tr>
            </tbody>
          </table>
          <p>
            The four-loop cost grows as H x W x kh x kw in the interpreter, so on
            the full 900x675 photo it extrapolates to about 6 seconds. My two-loop
            version is level with scipy at this size and about 30% slower on the
            full image, where scipy switches to a smarter algorithm.
          </p>

          <h3>boundaries</h3>
          <p>
            I pad with zeros, which is what scipy does by default, so the two can
            be compared directly. The cost is a darkened border, because the
            filter averages real pixels with invented black ones. My output and
            scipy&apos;s agree to 1.2e-15, which is floating point rounding rather
            than a difference in method. Everywhere in part 2 I switch to edge
            padding instead, since a blurred flat region has to stay flat.
          </p>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/11_selfie.jpg" alt="original, grayscale" loading="lazy" />
              <figcaption>original, grayscale</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_box_mine.jpg" alt="9x9 box filter, my conv2d" loading="lazy" />
              <figcaption>9x9 box filter, my conv2d</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_box_scipy.jpg" alt="9x9 box filter, scipy.signal.convolve2d" loading="lazy" />
              <figcaption>9x9 box filter, scipy.signal.convolve2d</figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/11_dx.jpg" alt="D_x = [1 -1]" loading="lazy" />
              <figcaption>D_x = [1 -1]</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_dy.jpg" alt="D_y = [1 -1] transposed" loading="lazy" />
              <figcaption>D_y = [1 -1] transposed</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/11_box_diff.jpg" alt="|mine - scipy|, max 1.2e-15, i.e. black" loading="lazy" />
              <figcaption>|mine - scipy|, max 1.2e-15, i.e. black</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>1.2 finite difference operator</h2>
          <p>
            D_x = [1 -1] and D_y is its transpose. Each partial derivative is
            bright where brightness rises in that direction and dark where it
            falls, so vertical structure shows up in the x derivative and
            horizontal structure in the y. The gradient magnitude combines them
            into one edge strength, independent of edge direction.
          </p>
          <p>
            Picking the threshold is a trade. At 0.10 every real edge survives
            but so does most of the grass, which is texture rather than edge. At
            0.30 the grass is gone but so are the tripod legs and the far
            skyline. I settled on 0.18: the camera, the coat and the buildings
            stay continuous, and only a scatter of grass speckle remains.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/12_original.jpg" alt="cameraman" loading="lazy" />
              <figcaption>cameraman</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_dx.jpg" alt="partial derivative in x" loading="lazy" />
              <figcaption>partial derivative in x</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_dy.jpg" alt="partial derivative in y" loading="lazy" />
              <figcaption>partial derivative in y</figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/12_mag.jpg" alt="gradient magnitude" loading="lazy" />
              <figcaption>gradient magnitude</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_edges_010.jpg" alt="threshold 0.10, keeps 16.0% of pixels" loading="lazy" />
              <figcaption>threshold 0.10, keeps 16.0% of pixels</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/12_edges_018.jpg" alt="threshold 0.18, keeps 8.4%, my choice" loading="lazy" />
              <figcaption>threshold 0.18, keeps 8.4%, my choice</figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/12_edges_030.jpg" alt="threshold 0.30, keeps 4.7%" loading="lazy" />
              <figcaption>threshold 0.30, keeps 4.7%</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>1.3 derivative of gaussian</h2>
          <p>
            Differentiating amplifies high frequencies, and noise lives at high
            frequencies, so the bare finite difference is speckly. Blurring first
            removes that band before differentiating.
          </p>
          <p>
            The difference is easy to see. The edges come out thicker and
            smoother, the grass speckle is almost entirely gone, and the edges
            that remain are continuous instead of broken. The cost is that fine
            detail goes too: the tripod legs thin out and the far skyline nearly
            disappears. Blurring also lets me use a lower threshold, 0.10 instead
            of 0.18, because there is much less noise competing with the real
            edges.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/13_gaussian.jpg" alt="13x13 Gaussian, sigma 2" loading="lazy" />
              <figcaption>13x13 Gaussian, sigma 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_blurred.jpg" alt="cameraman blurred" loading="lazy" />
              <figcaption>cameraman blurred</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_blur_mag.jpg" alt="gradient magnitude after blurring" loading="lazy" />
              <figcaption>gradient magnitude after blurring</figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/13_blur_dx.jpg" alt="x derivative of the blurred image" loading="lazy" />
              <figcaption>x derivative of the blurred image</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_blur_dy.jpg" alt="y derivative of the blurred image" loading="lazy" />
              <figcaption>y derivative of the blurred image</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_blur_edges.jpg" alt="binarized at 0.10" loading="lazy" />
              <figcaption>binarized at 0.10</figcaption>
            </figure>
          </div>

          <h3>one convolution instead of two</h3>
          <p>
            Convolution is associative, so instead of blurring the image and then
            differencing it, I convolve the Gaussian with D_x once on its own and
            get a single filter that does both. The result below is the same
            picture.
          </p>
          <p>
            Verified numerically: the two routes agree to 1.7e-15 across the
            interior of the image. They differ at the border, by up to 0.29,
            which is not a bug. Two sequential zero-padded convolutions invent
            black pixels twice, once per pass, while the single combined kernel
            invents them once.
          </p>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/13_dogx_filter.jpg" alt="DoG_x filter, 13x14" loading="lazy" />
              <figcaption>DoG_x filter, 13x14</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_dogy_filter.jpg" alt="DoG_y filter, 14x13" loading="lazy" />
              <figcaption>DoG_y filter, 14x13</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_dog_mag.jpg" alt="gradient magnitude, one convolution" loading="lazy" />
              <figcaption>gradient magnitude, one convolution</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/13_dog_edges.jpg" alt="binarized at 0.10, identical to above" loading="lazy" />
              <figcaption>binarized at 0.10, identical to above</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>1.3 bells and whistles: gradient orientation</h2>
          <p>
            The gradient is a vector, and the magnitude image throws away its
            direction. Mapping the angle to hue puts it back.
          </p>
          <p>
            Without a built-in angle function, np.arctan(gy / gx) only covers
            half the circle, because it cannot tell (gx, gy) from (-gx, -gy). I
            recover the full turn by adding pi when gx is negative, adding 2 pi
            in the fourth quadrant, and handling gx = 0 separately.
          </p>
          <p>
            Brightness carries the gradient magnitude. That matters: in a flat
            region the gradient is pure noise, so its angle is meaningless, and
            leaving those pixels bright would paint the whole frame in
            confident-looking random colour. Notice the coat edge changes hue
            smoothly as it curves, and the two sides of the tripod legs take
            opposite hues, because the brightness rises on one side and falls on
            the other.
          </p>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/13_orientation.jpg" alt="hue is the gradient angle, brightness is its strength" loading="lazy" />
              <figcaption>hue is the gradient angle, brightness is its strength</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2.1 image sharpening</h2>
          <p>
            A Gaussian is a low pass: it keeps the slow variation and discards
            the fast. Subtracting the blurred image from the original therefore
            leaves exactly the fast part, the edges and fine texture. Adding some
            of that back exaggerates detail that was already there, which reads
            as sharper.
          </p>
          <p>
            Distributivity folds the three steps into one kernel, so it is a
            single convolution. Its weights sum to 1, so flat regions come
            through untouched.
          </p>
          <pre><code>{`def unsharp_kernel(alpha, sigma):
    g = gaussian_kernel(ksize_for(sigma), sigma)
    delta = np.zeros_like(g)
    delta[g.shape[0]//2, g.shape[1]//2] = 1.0
    return (1 + alpha) * delta - alpha * g   # im + a*(im - im*G)`}</code></pre>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/21_taj_original.jpg" alt="original" loading="lazy" />
              <figcaption>original</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_blur.jpg" alt="low frequencies, Gaussian sigma 2" loading="lazy" />
              <figcaption>low frequencies, Gaussian sigma 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_high.jpg" alt="high frequencies, original minus blur" loading="lazy" />
              <figcaption>high frequencies, original minus blur</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_sharp.jpg" alt="sharpened, alpha 1" loading="lazy" />
              <figcaption>sharpened, alpha 1</figcaption>
            </figure>
          </div>

          <h3>varying the amount</h3>
          <p>
            As alpha grows the edges gain contrast, then overshoot. By alpha 4
            there is a visible bright halo along the roofline and the sky beside
            the dome has gone grainy, because the filter cannot tell noise from
            detail.
          </p>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/21_taj_original.jpg" alt="alpha 0, the original" loading="lazy" />
              <figcaption>alpha 0, the original</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_alpha0p5.jpg" alt="alpha 0.5" loading="lazy" />
              <figcaption>alpha 0.5</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_sharp.jpg" alt="alpha 1" loading="lazy" />
              <figcaption>alpha 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_alpha2p0.jpg" alt="alpha 2" loading="lazy" />
              <figcaption>alpha 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_taj_alpha4p0.jpg" alt="alpha 4, haloing is obvious" loading="lazy" />
              <figcaption>alpha 4, haloing is obvious</figcaption>
            </figure>
          </div>

          <h3>another image</h3>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/21_rabbit_original.jpg" alt="original" loading="lazy" />
              <figcaption>original</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_rabbit_high.jpg" alt="high frequencies" loading="lazy" />
              <figcaption>high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_rabbit_sharp.jpg" alt="sharpened, alpha 1" loading="lazy" />
              <figcaption>sharpened, alpha 1</figcaption>
            </figure>
          </div>

          <h3>blur it, then sharpen it back</h3>
          <p>
            Sharpening does not undo blurring. Mean absolute error against the
            original is 0.0250 for the blurred version and 0.0215 after
            sharpening, so it recovers only a small part of what was lost. The
            edges regain contrast, but the fur texture and the puzzle detail do
            not come back, and the result picks up halos the original never had.
            The reason is that the blur multiplied the high frequencies by nearly
            zero. Sharpening applies a bounded gain to what survived, and no
            finite gain brings back a band that was already erased.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/21_eval_original.jpg" alt="original, sharp" loading="lazy" />
              <figcaption>original, sharp</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_eval_blurred.jpg" alt="blurred with sigma 3" loading="lazy" />
              <figcaption>blurred with sigma 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_eval_resharpened.jpg" alt="sharpened again, alpha 2" loading="lazy" />
              <figcaption>sharpened again, alpha 2</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2.2 hybrid images</h2>
          <p>
            Up close your eye resolves fine detail and that dominates what you
            see. From far away the fine detail falls below what you can resolve
            and only the blurred image is left. So: high frequencies of one
            image, low frequencies of another, added together.
          </p>
          <p>
            Alignment comes first, because the illusion depends on the two
            images&apos; features grouping as one object. I pick two matching
            points in each image, the eyes, which pins down a similarity
            transform exactly: their separation fixes the scale, their angle
            fixes the rotation, their position fixes the shift. Rotating leaves
            empty corners, so I crop both images to the largest rectangle that
            lies entirely inside the warped one.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_derek_original.jpg" alt="Derek, provides the low frequencies" loading="lazy" />
              <figcaption>Derek, provides the low frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_nutmeg_original.jpg" alt="Nutmeg, before alignment" loading="lazy" />
              <figcaption>Nutmeg, before alignment</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_nutmeg_aligned.jpg" alt="Nutmeg after aligning the eyes" loading="lazy" />
              <figcaption>Nutmeg after aligning the eyes</figcaption>
            </figure>
          </div>

          <h3>choosing the cutoffs</h3>
          <p>
            Two separate cutoffs, chosen by trying values. Sigma 4 on the cat:
            lower and Derek&apos;s features leak through up close, higher and only
            whisker wisps survive. Sigma 8 on Derek: lower and his eyes stay
            sharp enough to fight the cat at close range, higher and there is
            nothing left to see at a distance. The low-pass cutoff wants to sit
            above the high-pass one, so the two bands barely overlap.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_dn_lowpass.jpg" alt="Derek low-passed, sigma 8" loading="lazy" />
              <figcaption>Derek low-passed, sigma 8</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_dn_highpass.jpg" alt="Nutmeg high-passed, sigma 4" loading="lazy" />
              <figcaption>Nutmeg high-passed, sigma 4</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_hybrid_derek_nutmeg.jpg" alt="the hybrid" loading="lazy" />
              <figcaption>the hybrid</figcaption>
            </figure>
          </div>

          <h3>frequency analysis</h3>
          <p>
            Log magnitude spectra, centred, so low frequencies sit in the middle.
            Both inputs have energy spread throughout. After the low pass, Derek
            is a bright blob at the centre with the outside knocked out. After the
            high pass, Nutmeg is the reverse, a dark hole in the middle with
            energy around it. The hybrid has both: the centre from Derek and the
            outer ring from the cat, which is the whole trick in one picture.
          </p>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/22_fft_derek.jpg" alt="Derek input" loading="lazy" />
              <figcaption>Derek input</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_nutmeg.jpg" alt="Nutmeg aligned" loading="lazy" />
              <figcaption>Nutmeg aligned</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_low.jpg" alt="Derek after the low pass" loading="lazy" />
              <figcaption>Derek after the low pass</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_high.jpg" alt="Nutmeg after the high pass" loading="lazy" />
              <figcaption>Nutmeg after the high pass</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_fft_hybrid.jpg" alt="the hybrid" loading="lazy" />
              <figcaption>the hybrid</figcaption>
            </figure>
          </div>

          <h3>two of my own</h3>
          <p>
            The first works. My face supplies the high frequencies and a blurred
            rabbit the low, so the rabbit&apos;s silhouette takes over as you step
            back.
          </p>
          <p>
            The second is an honest failure and I kept it for that reason. It
            hybridises my own two project 0 selfies, shot at 23 mm close up and
            30 mm from farther back. Because both inputs are the same face in the
            same pose, there is no interpretation to switch between, and the
            result just reads as a slightly soft selfie. A hybrid needs its two
            images to disagree about what the object is. Lens perspective is not
            a big enough disagreement.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_me_input.jpg" alt="me, high frequencies" loading="lazy" />
              <figcaption>me, high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_rabbit_aligned.jpg" alt="the rabbit, low frequencies" loading="lazy" />
              <figcaption>the rabbit, low frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_hybrid_me_rabbit.jpg" alt="hybrid: me close up, rabbit far away" loading="lazy" />
              <figcaption>hybrid: me close up, rabbit far away</figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_lens_close.jpg" alt="23 mm, close" loading="lazy" />
              <figcaption>23 mm, close</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_lens_far.jpg" alt="30 mm, farther back" loading="lazy" />
              <figcaption>30 mm, farther back</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_hybrid_lens.jpg" alt="hybrid of the two, barely changes" loading="lazy" />
              <figcaption>hybrid of the two, barely changes</figcaption>
            </figure>
          </div>

          <h3>bells and whistles: colour</h3>
          <p>
            Colour in the low frequencies is what matters. Colour is itself a
            low-frequency signal, so putting it in the high-pass band adds almost
            nothing: the high-pass output is near zero mean and reads grey
            whatever you feed it. Putting colour only in the low band gives
            nearly the full effect and makes the far-away reading arrive faster,
            because the colour cue groups the blurred shape before you can
            resolve any detail. Grayscale throughout is the weakest, since both
            readings then compete on luminance alone.
          </p>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/22_colour_both.jpg" alt="colour in both" loading="lazy" />
              <figcaption>colour in both</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_colour_high.jpg" alt="colour only in the high frequencies" loading="lazy" />
              <figcaption>colour only in the high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_colour_low.jpg" alt="colour only in the low frequencies" loading="lazy" />
              <figcaption>colour only in the low frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_colour_none.jpg" alt="grayscale throughout" loading="lazy" />
              <figcaption>grayscale throughout</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2.3 gaussian and laplacian stacks</h2>
          <p>
            A stack is a pyramid without the downsampling, so every level keeps
            the full resolution. Level 0 of the Gaussian stack is the original
            and each level after it is the previous one blurred again, with sigma
            doubling, so the stack sees the same run of scales a pyramid would.
          </p>
          <p>
            Each Laplacian level is the difference between two neighbouring
            Gaussian levels, which is one band of frequencies: the detail that
            one extra blur removed. The last level is the leftover low-pass
            residual. That last level is what makes the stack sum exactly back to
            the original, which I check numerically: 1.1e-16.
          </p>
          <h3>laplacian bands</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l0.jpg" alt="apple, band 0" loading="lazy" />
              <figcaption>apple, band 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l1.jpg" alt="apple, band 1" loading="lazy" />
              <figcaption>apple, band 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l2.jpg" alt="apple, band 2" loading="lazy" />
              <figcaption>apple, band 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l3.jpg" alt="apple, band 3" loading="lazy" />
              <figcaption>apple, band 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l4.jpg" alt="apple, band 4" loading="lazy" />
              <figcaption>apple, band 4</figcaption>
            </figure>
          </div>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l0.jpg" alt="orange, band 0" loading="lazy" />
              <figcaption>orange, band 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l1.jpg" alt="orange, band 1" loading="lazy" />
              <figcaption>orange, band 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l2.jpg" alt="orange, band 2" loading="lazy" />
              <figcaption>orange, band 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l3.jpg" alt="orange, band 3" loading="lazy" />
              <figcaption>orange, band 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l4.jpg" alt="orange, band 4" loading="lazy" />
              <figcaption>orange, band 4</figcaption>
            </figure>
          </div>
          <h3>the mask, blurred level by level</h3>
          <p>
            A sharp seam is right for fine bands and a soft one for coarse bands.
            Blurring the mask alongside the images gives exactly that, a wider
            transition at every coarser level.
          </p>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g0.jpg" alt="mask, level 0" loading="lazy" />
              <figcaption>mask, level 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g1.jpg" alt="mask, level 1" loading="lazy" />
              <figcaption>mask, level 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g2.jpg" alt="mask, level 2" loading="lazy" />
              <figcaption>mask, level 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g3.jpg" alt="mask, level 3" loading="lazy" />
              <figcaption>mask, level 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g4.jpg" alt="mask, level 4" loading="lazy" />
              <figcaption>mask, level 4</figcaption>
            </figure>
          </div>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/23_fig342.jpg" alt="Szeliski figure 3.42: each band of each image, masked, and their sum" loading="lazy" />
              <figcaption>Szeliski figure 3.42: each band of each image, masked, and their sum</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2.4 multiresolution blending</h2>
          <p>
            Blend each frequency band separately, each with its own softness of
            seam, then add the bands back up. Fine detail switches over within a
            few pixels, so the apple stays crisp right up to the join, while the
            coarse colour blends across a wide region, so there is no visible
            edge. A single blur of the finished composite cannot do both at once.
          </p>
          <div className="two">
            <figure data-fish>
              <img src="/cs180/project2/24_oraple_naive.jpg" alt="hard seam, no blending" loading="lazy" />
              <figcaption>hard seam, no blending</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_oraple.jpg" alt="multiresolution blend" loading="lazy" />
              <figcaption>multiresolution blend</figcaption>
            </figure>
          </div>

          <h3>two of my own</h3>
          <p>
            The first is a vertical seam between my two project 0 selfies, left
            half at 23 mm and right half at 30 mm, which quietly splices two
            different perspective distortions into one face. The second uses an
            irregular mask, an ellipse, to put the rabbit&apos;s face where mine
            was. Compare each against its hard-seam version: the join stops being
            a line and becomes a region.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/24_custom_lens_naive.jpg" alt="hard seam" loading="lazy" />
              <figcaption>hard seam</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_lens.jpg" alt="blended: left half at 23 mm, right half at 30 mm" loading="lazy" />
              <figcaption>blended: left half at 23 mm, right half at 30 mm</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_mask_ellipse.jpg" alt="irregular mask" loading="lazy" />
              <figcaption>irregular mask</figcaption>
            </figure>
          </div>

          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/24_custom_rabbitface_naive.jpg" alt="hard seam" loading="lazy" />
              <figcaption>hard seam</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_rabbitface.jpg" alt="blended" loading="lazy" />
              <figcaption>blended</figcaption>
            </figure>
          </div>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/24_stack_process.jpg" alt="each band of both images and the blended band, for the irregular mask" loading="lazy" />
              <figcaption>each band of both images and the blended band, for the irregular mask</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>what I learned</h2>
          <p>
            That every part of this project is the same two sentences rearranged.
            Low frequencies are the blurred image; high frequencies are the
            original minus the blurred image. Sharpening adds high frequencies
            back to their own image. Hybrids take the two bands from different
            images. Blending splits into many bands and picks a different seam
            width for each. I wrote four small functions and everything after
            that was three or four lines.
          </p>
          <p>
            The other thing, which cost me an hour, is that a filter is only
            defined once you say what happens at the border. Zero padding is fine
            for comparing against scipy and it is what part 1.1 asks for, but it
            silently darkens a blurred mask at the frame edge, which put a false
            seam around every blend until I switched those to edge padding.
          </p>
        </section>
      </main>
    </>
  );
}
