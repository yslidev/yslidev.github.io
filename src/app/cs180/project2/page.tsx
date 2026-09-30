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
            image by that weight and accumulates. Same arithmetic, but NumPy does
            the per-pixel part in C.
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
          <p>Timed on a 128x128 crop with the 9x9 box filter, best of several runs.</p>
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
            be compared directly. The cost is a darkened border, because the filter
            averages real pixels with invented black ones. My output and
            scipy&apos;s agree to 1.2e-15, which is floating point rounding rather
            than a difference in method. Everywhere in part 2 I switch to edge
            padding, since a blurred flat region has to stay flat.
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
            Picking the threshold is a trade. At 0.10 every real edge survives but
            so does most of the grass, which is texture rather than edge. At 0.30
            the grass is gone but so are the tripod legs and the far skyline. I
            settled on 0.18: the camera, the coat and the buildings stay
            continuous, and only a scatter of grass speckle remains.
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
            The difference is easy to see. The edges come out thicker and smoother,
            the grass speckle is almost entirely gone, and the edges that remain
            are continuous instead of broken. The cost is that fine detail goes
            too: the tripod legs thin out and the far skyline nearly disappears.
            Blurring also lets me use a lower threshold, 0.10 instead of 0.18,
            because there is much less noise competing with the real edges.
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
            interior. They differ at the border, by up to 0.29, which is not a bug.
            Two sequential zero-padded convolutions invent black pixels twice, once
            per pass, while the single combined kernel invents them once.
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
            Without a built-in angle function, np.arctan(gy / gx) only covers half
            the circle, because it cannot tell (gx, gy) from (-gx, -gy). I recover
            the full turn by adding pi when gx is negative, adding 2 pi in the
            fourth quadrant, and handling gx = 0 separately.
          </p>
          <p>
            Brightness carries the gradient magnitude. That matters: in a flat
            region the gradient is pure noise, so its angle is meaningless, and
            leaving those pixels bright would paint the frame in
            confident-looking random colour. The coat edge changes hue smoothly as
            it curves, and the two sides of each tripod leg take opposite hues,
            because brightness rises on one side and falls on the other.
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
            A Gaussian is a low pass: it keeps the slow variation and discards the
            fast. Subtracting the blurred image from the original therefore leaves
            exactly the fast part, the edges and fine texture. Adding some of that
            back exaggerates detail that was already there, which reads as sharper.
          </p>
          <p>
            Distributivity folds the three steps into one kernel, so it is a single
            convolution. Its weights sum to 1, so flat regions come through
            untouched.
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
            there is a visible bright halo along the roofline and the sky beside the
            dome has gone grainy, because the filter cannot tell noise from detail.
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
              <img src="/cs180/project2/21_library_original.jpg" alt="original" loading="lazy" />
              <figcaption>original</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_library_high.jpg" alt="high frequencies" loading="lazy" />
              <figcaption>high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/21_library_sharp.jpg" alt="sharpened, alpha 1" loading="lazy" />
              <figcaption>sharpened, alpha 1</figcaption>
            </figure>
          </div>
          <h3>blur it, then sharpen it back</h3>
          <p>
            Sharpening does not undo blurring. Mean absolute error against the
            original is 0.0453 for the blurred version and 0.0386 after sharpening,
            so it recovers only a small part of what was lost. The window frames
            and the bench regain contrast, but the leaf detail and the brickwork do
            not come back, and the result picks up halos the original never had.
            The reason is that the blur multiplied the high frequencies by nearly
            zero. Sharpening applies a bounded gain to what survived, and no finite
            gain brings back a band that was already erased.
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
            Up close your eye resolves fine detail and that dominates what you see.
            From far away the fine detail falls below what you can resolve and only
            the blurred image is left. So: high frequencies of one image, low
            frequencies of another, added together.
          </p>
          <p>
            Alignment comes first, because the illusion depends on the two
            images&apos; features grouping as one object. I pick two matching points
            in each image, the eyes, which pins down a similarity transform exactly:
            their separation fixes the scale, their angle fixes the rotation, their
            position fixes the shift. Rotating leaves empty corners, so I crop both
            images to the largest rectangle lying entirely inside the warped one.
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
            Two separate cutoffs, chosen by trying values. Sigma 4 on the cat: lower
            and Derek&apos;s features leak through up close, higher and only whisker
            wisps survive. Sigma 8 on Derek: lower and his eyes stay sharp enough to
            fight the cat at close range, higher and there is nothing left to see at
            a distance. The low-pass cutoff wants to sit above the high-pass one, so
            the two bands barely overlap.
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
            Both inputs have energy spread throughout. After the low pass, Derek is
            a bright blob at the centre with the outside knocked out. After the high
            pass, Nutmeg is the reverse, a dark hole in the middle with energy
            around it. The hybrid has both: the centre from Derek and the outer ring
            from the cat, which is the whole trick in one picture.
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
          <h3>my own: a change of expression</h3>
          <p>
            Same person, two photographs: indoors with a neutral face, and outdoors
            in sunlight mid-laugh. The outdoor shot supplies the high frequencies,
            so up close you get the squint and the open smile. Step back and the
            blurred indoor face takes over. Sigma 5 on the smile, sigma 10 on the
            neutral face.
          </p>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/22_expr_indoor.jpg" alt="indoors, neutral. low frequencies" loading="lazy" />
              <figcaption>indoors, neutral. low frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_expr_outdoor_aligned.jpg" alt="outdoors, smiling, aligned. high frequencies" loading="lazy" />
              <figcaption>outdoors, smiling, aligned. high frequencies</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/22_hybrid_expression.jpg" alt="hybrid: smiling up close, neutral from across the room" loading="lazy" />
              <figcaption>hybrid: smiling up close, neutral from across the room</figcaption>
            </figure>
          </div>
          <h3>my own: a person into a rabbit</h3>
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
          <h3>the pairing that did not work</h3>
          <p>
            My first attempt hybridised my own two project 0 selfies, shot at 23 mm
            close up and 30 mm from farther back. It produced doubled edges around
            the chair and the curtains rather than an illusion. The cause is not the
            filtering: aligning on the eyes puts the two faces on top of each other,
            but the camera moved between the shots, so everything behind the face
            sits in a different place in each image. Measured, the two frames
            disagree by 0.14 on average overall and only 0.074 on the face, so the
            background mismatch is nearly twice the facial one. The high-frequency
            edges of one scene then land on displaced low-frequency structure from
            the other. A hybrid needs two images that agree about where everything
            is and disagree only about what it is.
          </p>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/22_hybrid_lens_failed.jpg" alt="the pairing that failed: two selfies at 23 mm and 30 mm" loading="lazy" />
              <figcaption>the pairing that failed: two selfies at 23 mm and 30 mm</figcaption>
            </figure>
          </div>
          <h3>bells and whistles: colour</h3>
          <p>
            Colour in the low frequencies is what matters. Colour is itself a
            low-frequency signal, so putting it in the high-pass band adds almost
            nothing: the high-pass output is near zero mean and reads grey whatever
            you feed it. Colour in the low band alone gives nearly the full effect
            and makes the far-away reading arrive faster, because the colour cue
            groups the blurred shape before you can resolve any detail. Grayscale
            throughout is weakest, since both readings then compete on luminance
            alone.
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
            A stack is a pyramid without the downsampling, so every level keeps full
            resolution. Level 0 of the Gaussian stack is the original and each level
            after it is the previous one blurred again, with sigma doubling, so the
            stack sees the same run of scales a pyramid would.
          </p>
          <p>
            Each Laplacian level is the difference between two neighbouring Gaussian
            levels, which is one band of frequencies: the detail that one extra blur
            removed. The last level is the leftover low-pass residual. That last
            level is what makes the stack sum exactly back to the original, which I
            check numerically: 1.1e-16.
          </p>
          <p>
            The Gaussian is separable, so I run it as two 1D passes rather than one
            2D window. At the coarse end sigma reaches 16, a 97-tap kernel, which is
            194 multiplies per pixel instead of 9409. It took the whole pipeline
            from three minutes to fourteen seconds.
          </p>
          <h3>apple</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g0.jpg" alt="apple, Gaussian level 0" loading="lazy" />
              <figcaption>apple, Gaussian level 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g1.jpg" alt="apple, Gaussian level 1" loading="lazy" />
              <figcaption>apple, Gaussian level 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g2.jpg" alt="apple, Gaussian level 2" loading="lazy" />
              <figcaption>apple, Gaussian level 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g3.jpg" alt="apple, Gaussian level 3" loading="lazy" />
              <figcaption>apple, Gaussian level 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_g4.jpg" alt="apple, Gaussian level 4" loading="lazy" />
              <figcaption>apple, Gaussian level 4</figcaption>
            </figure>
          </div>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l0.jpg" alt="apple, Laplacian band 0" loading="lazy" />
              <figcaption>apple, Laplacian band 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l1.jpg" alt="apple, Laplacian band 1" loading="lazy" />
              <figcaption>apple, Laplacian band 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l2.jpg" alt="apple, Laplacian band 2" loading="lazy" />
              <figcaption>apple, Laplacian band 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l3.jpg" alt="apple, Laplacian band 3" loading="lazy" />
              <figcaption>apple, Laplacian band 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_apple_l4.jpg" alt="apple, Laplacian band 4" loading="lazy" />
              <figcaption>apple, Laplacian band 4</figcaption>
            </figure>
          </div>
          <h3>orange</h3>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g0.jpg" alt="orange, Gaussian level 0" loading="lazy" />
              <figcaption>orange, Gaussian level 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g1.jpg" alt="orange, Gaussian level 1" loading="lazy" />
              <figcaption>orange, Gaussian level 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g2.jpg" alt="orange, Gaussian level 2" loading="lazy" />
              <figcaption>orange, Gaussian level 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g3.jpg" alt="orange, Gaussian level 3" loading="lazy" />
              <figcaption>orange, Gaussian level 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_g4.jpg" alt="orange, Gaussian level 4" loading="lazy" />
              <figcaption>orange, Gaussian level 4</figcaption>
            </figure>
          </div>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l0.jpg" alt="orange, Laplacian band 0" loading="lazy" />
              <figcaption>orange, Laplacian band 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l1.jpg" alt="orange, Laplacian band 1" loading="lazy" />
              <figcaption>orange, Laplacian band 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l2.jpg" alt="orange, Laplacian band 2" loading="lazy" />
              <figcaption>orange, Laplacian band 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l3.jpg" alt="orange, Laplacian band 3" loading="lazy" />
              <figcaption>orange, Laplacian band 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_orange_l4.jpg" alt="orange, Laplacian band 4" loading="lazy" />
              <figcaption>orange, Laplacian band 4</figcaption>
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
              <img src="/cs180/project2/23_mask_g0.jpg" alt="mask, Gaussian level 0" loading="lazy" />
              <figcaption>mask, Gaussian level 0</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g1.jpg" alt="mask, Gaussian level 1" loading="lazy" />
              <figcaption>mask, Gaussian level 1</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g2.jpg" alt="mask, Gaussian level 2" loading="lazy" />
              <figcaption>mask, Gaussian level 2</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g3.jpg" alt="mask, Gaussian level 3" loading="lazy" />
              <figcaption>mask, Gaussian level 3</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/23_mask_g4.jpg" alt="mask, Gaussian level 4" loading="lazy" />
              <figcaption>mask, Gaussian level 4</figcaption>
            </figure>
          </div>
          <h3>figure 3.42</h3>
          <p>
            Rows one to three are Laplacian levels 0, 2 and 4, the high, medium and
            low frequency bands. The left column is the apple weighted by the mask
            at that level, the middle is the orange weighted by one minus the mask,
            and the right column is their sum. The bottom row sums each contribution
            over every level: (j) is the apple&apos;s total contribution, (k) the
            orange&apos;s, and (l) the finished oraple.
          </p>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/23_fig342.jpg" alt="my recreation of Szeliski figure 3.42, panels (a) through (l)" loading="lazy" />
              <figcaption>my recreation of Szeliski figure 3.42, panels (a) through (l)</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>2.4 multiresolution blending</h2>
          <p>
            Blend each frequency band separately, each with its own softness of
            seam, then add the bands back up. Fine detail switches over within a few
            pixels, so the apple stays crisp right up to the join, while the coarse
            colour blends across a wide region, so there is no visible edge. A
            single blur of the finished composite cannot do both at once.
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
          <h3>vertical seam: two poses, one frame</h3>
          <p>
            Two frames from the same walk, spliced down the middle, so both poses
            appear at once. The backgrounds do not quite line up between the shots,
            which is exactly the kind of mismatch the coarse bands absorb.
          </p>
          <div className="four">
            <figure data-fish>
              <img src="/cs180/project2/24_pose_a.jpg" alt="pose A" loading="lazy" />
              <figcaption>pose A</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_pose_b.jpg" alt="pose B" loading="lazy" />
              <figcaption>pose B</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_poses_naive.jpg" alt="hard seam" loading="lazy" />
              <figcaption>hard seam</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_poses.jpg" alt="blended, vertical seam" loading="lazy" />
              <figcaption>blended, vertical seam</figcaption>
            </figure>
          </div>
          <h3>irregular mask: the rabbit&apos;s face on mine</h3>
          <div className="three">
            <figure data-fish>
              <img src="/cs180/project2/24_mask_ellipse.jpg" alt="irregular mask" loading="lazy" />
              <figcaption>irregular mask</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_rabbitface_naive.jpg" alt="hard seam" loading="lazy" />
              <figcaption>hard seam</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_rabbitface.jpg" alt="blended" loading="lazy" />
              <figcaption>blended</figcaption>
            </figure>
          </div>
          <h3>irregular mask: the portrait in the library courtyard</h3>
          <p>
            An ellipse around the figure drops the outdoor portrait into the campus
            building shot. Against the hard-seam version the difference is the
            bougainvillea: with a hard mask it stops dead at the ellipse, and
            blended it dissolves into the facade over a wide band while her collar
            and the lace stay sharp.
          </p>
          <div className="five">
            <figure data-fish>
              <img src="/cs180/project2/24_lib_input.jpg" alt="the library" loading="lazy" />
              <figcaption>the library</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_por_input.jpg" alt="the portrait" loading="lazy" />
              <figcaption>the portrait</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_mask_portrait.jpg" alt="irregular mask" loading="lazy" />
              <figcaption>irregular mask</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_portrait_library_naive.jpg" alt="hard seam" loading="lazy" />
              <figcaption>hard seam</figcaption>
            </figure>
            <figure data-fish>
              <img src="/cs180/project2/24_custom_portrait_library.jpg" alt="blended" loading="lazy" />
              <figcaption>blended</figcaption>
            </figure>
          </div>
          <div className="one">
            <figure data-fish>
              <img src="/cs180/project2/24_stack_process.jpg" alt="every band of both images and the blended band, for the portrait and library blend" loading="lazy" />
              <figcaption>every band of both images and the blended band, for the portrait and library blend</figcaption>
            </figure>
          </div>
        </section>

        <section>
          <h2>what I learned</h2>
          <p>
            That every part of this project is the same two sentences rearranged.
            Low frequencies are the blurred image; high frequencies are the original
            minus the blurred image. Sharpening adds high frequencies back to their
            own image. Hybrids take the two bands from different images. Blending
            splits into many bands and picks a different seam width for each.
          </p>
          <p>
            The other lesson was that a filter is only defined once you say what
            happens at the border. Zero padding is what part 1.1 asks for and it is
            what scipy does, but it silently darkens a blurred mask at the frame
            edge, which planted a false seam around every blend until I switched
            part 2 to edge padding.
          </p>
        </section>
      </main>
    </>
  );
}
