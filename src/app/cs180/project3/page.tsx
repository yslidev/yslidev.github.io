import type { Metadata } from "next";
import FishCanvas from "@/components/FishCanvas";

export const metadata: Metadata = {
  title: { absolute: "CS 180, project 3" },
  description: "CS180 Project 3, Fun with Flow Models.",
  robots: { index: false, follow: false },
};

const css = `
.p3 { max-width: 860px; margin: 0 auto; padding: 56px 22px 90px; position: relative; z-index: 3; }
.p3 h1 { font-weight: 500; font-size: clamp(26px, 4vw, 38px); line-height: 1.15;
         letter-spacing: -0.02em; text-transform: lowercase; }
.p3 h2 { font-weight: 500; font-size: clamp(19px, 2.4vw, 23px); text-transform: lowercase; margin-bottom: 12px; }
.p3 h3 { font-weight: 500; font-size: 17px; text-transform: lowercase; margin: 26px 0 8px; }
.p3 h2.sub { text-transform: none; font-size: clamp(17px, 2.2vw, 21px); margin-bottom: 0; }
.p3 h2.part { margin-top: 64px; font-size: clamp(22px, 3vw, 28px); }
.p3 p { margin-bottom: 14px; }
.p3 section { margin-top: 48px; padding-top: 26px; border-top: 1px solid rgba(12,28,32,0.2); }
.p3 .one   { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 18px 0; }
.p3 .two   { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 18px 0; }
.p3 .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 18px 0; }
.p3 .one, .p3 .two, .p3 .three { align-items: start; }
@media (max-width: 720px) { .p3 .three { grid-template-columns: repeat(2, 1fr); } }
.p3 img { width: 100%; height: auto; display: block; }
.p3 img.small { width: 64px; image-rendering: auto; }
.p3 figure { margin: 0; }
.p3 figcaption { margin-top: 7px; font-size: 14px; line-height: 1.45; }
`;

function Fig({ src, cap }: { src: string; cap?: string }) {
  return (
    <figure data-fish>
      <img src={`/cs180/project3/${src}`} alt={cap ?? src} loading="lazy" />
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  );
}

export default function Project3() {
  return (
    <>
      <FishCanvas />
      <style>{css}</style>
      <main className="p3">
        <h1>fun with flow models</h1>
        <h2 className="sub">CS 180, project 3.</h2>

        <h2 className="part">part a: the power of flow models</h2>

        <section>
          <h2>1.1 noisy training inputs</h2>
          <div className="one"><Fig src="a_training_inputs.jpg" /></div>
        </section>

        <section>
          <h2>1.2 classical denoising</h2>
          <div className="one">
            <Fig src="a_blur_0.25.jpg" />
            <Fig src="a_blur_0.5.jpg" />
            <Fig src="a_blur_0.75.jpg" />
          </div>
        </section>

        <section>
          <h2>1.3 one-step denoising</h2>
          <div className="one">
            <Fig src="a_one_step_0.25.jpg" />
            <Fig src="a_one_step_0.5.jpg" />
            <Fig src="a_one_step_0.75.jpg" />
          </div>
        </section>

        <section>
          <h2>1.4 visualizing velocity</h2>
          <div className="three"><Fig src="a_velocity_original.jpg" cap="original" /></div>
          <div className="one">
            <Fig src="a_velocity_0.25.jpg" />
            <Fig src="a_velocity_0.50.jpg" />
            <Fig src="a_velocity_0.75.jpg" />
          </div>
        </section>

        <section>
          <h2>1.5 iterative denoising</h2>
          <div className="one">
            <Fig src="a_trajectory.jpg" />
            <Fig src="a_comparison.jpg" />
          </div>
        </section>

        <section>
          <h2>1.6 sampling from noise</h2>
          <div className="one"><Fig src="a_conditional_samples.jpg" /></div>
          <p>
            &quot;a high quality photo&quot; gives a portrait of a person every
            time. Two of the five faces come out smeared or melted.
          </p>
        </section>

        <section>
          <h2>2.1 classifier-free guidance</h2>
          <div className="one"><Fig src="a_cfg_samples.jpg" /></div>
          <p>
            With the same noise, CFG gives five sharp, clean faces with no
            distortion. They are also more alike: all front-facing headshots on a
            plain background.
          </p>
        </section>

        <section>
          <h2>3.1 image-to-image editing</h2>
          <div className="one">
            <Fig src="a_edit_campanile.jpg" />
            <Fig src="a_edit_my_image_1.jpg" />
            <Fig src="a_edit_my_image_2.jpg" />
          </div>
          <h3>web image</h3>
          <div className="one"><Fig src="a_edit_web_image.jpg" /></div>
          <h3>drawings</h3>
          <div className="one">
            <Fig src="a_edit_drawing_1.jpg" />
            <Fig src="a_edit_drawing_2.jpg" />
          </div>
        </section>

        <section>
          <h2>3.2 text-guided editing</h2>
          <div className="one">
            <Fig src="a_text_edit_campanile.jpg" />
            <Fig src="a_text_edit_my_image_1.jpg" />
            <Fig src="a_text_edit_my_image_2.jpg" />
          </div>
        </section>

        <section>
          <h2>3.3 visual anagrams</h2>
          <div className="one">
            <Fig src="a_anagram_0.jpg" />
            <Fig src="a_anagram_1.jpg" />
          </div>
        </section>

        <section>
          <h2>3.4 hybrid images</h2>
          <div className="two">
            <Fig src="a_hybrid_0.jpg" cap="near: a lithograph of waterfalls" />
            <figure data-fish>
              <img className="small" src="/cs180/project3/a_hybrid_0_distant.jpg" alt="far: a lithograph of a skull" loading="lazy" />
              <figcaption>far: a lithograph of a skull</figcaption>
            </figure>
          </div>
          <div className="two">
            <Fig src="a_hybrid_1.jpg" cap="near: a lithograph of a forest" />
            <figure data-fish>
              <img className="small" src="/cs180/project3/a_hybrid_1_distant.jpg" alt="far: a lithograph of a cat" loading="lazy" />
              <figcaption>far: a lithograph of a cat</figcaption>
            </figure>
          </div>
        </section>

        <h2 className="part">part b: flow matching from scratch</h2>

        <section>
          <h2>1.2 noising</h2>
          <div className="one"><Fig src="b_noising.png" /></div>
        </section>

        <section>
          <h2>1.2.1 training</h2>
          <div className="one">
            <Fig src="b_denoiser_loss.png" />
            <Fig src="b_denoise_epoch1.png" />
            <Fig src="b_denoise_epoch5.png" />
          </div>
        </section>

        <section>
          <h2>1.2.2 out-of-distribution testing</h2>
          <div className="one"><Fig src="b_ood.png" /></div>
        </section>

        <section>
          <h2>1.2.3 denoising pure noise</h2>
          <div className="one">
            <Fig src="b_pure_noise_loss.png" />
            <Fig src="b_pure_epoch1.png" />
            <Fig src="b_pure_epoch5.png" />
          </div>
          <div className="three"><Fig src="b_train_mean.png" /></div>
          <p>
            Every input gives the same blurry blob, a mix of 0, 8 and 9 that
            matches the mean of the training set. The input is pure noise, so it
            says nothing about which digit is the target. Under MSE the best
            single guess is then the average of all training digits.
          </p>
        </section>

        <section>
          <h2>2.2 training the time-conditioned unet</h2>
          <div className="one"><Fig src="b_time_conditioned_loss.png" /></div>
        </section>

        <section>
          <h2>2.3 sampling from the time-conditioned unet</h2>
          <div className="one">
            <Fig src="b_time_epoch1.png" />
            <Fig src="b_time_epoch5.png" />
            <Fig src="b_time_epoch10.png" />
          </div>
        </section>

        <section>
          <h2>2.5 training the class-conditioned unet</h2>
          <div className="one"><Fig src="b_class_conditioned_loss.png" /></div>
        </section>

        <section>
          <h2>2.6 sampling from the class-conditioned unet</h2>
          <div className="one">
            <Fig src="b_class_epoch1.png" />
            <Fig src="b_class_epoch5.png" />
            <Fig src="b_class_epoch10.png" />
          </div>
          <h3>without the scheduler</h3>
          <div className="one">
            <Fig src="b_class_conditioned_no_scheduler_loss.png" />
            <Fig src="b_class_no_scheduler.png" />
          </div>
          <p>
            The scheduler takes the learning rate from 1e-2 down to 1e-3 over 10
            epochs. Without it I used a constant 1e-3, the rate the schedule
            ends at. The epoch 10 samples look as good as with the scheduler.
          </p>
        </section>
      </main>
    </>
  );
}
