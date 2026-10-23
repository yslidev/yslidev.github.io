import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import Ext from "@/components/Ext";
import { ui } from "@/components/ui";
import { rows } from "@/components/rows";
import { getSubstackPosts, writingFallback } from "@/lib/substack";
import { front } from "./front";

// ysli.dev — for friends and family. Unlisted (noindex, no sitemap, never
// linked *from* yushan.li), so it can be warmer than the professional card.
// It does point *to* yushan.li: ysli.dev was the professional address, and
// CVs already sent out still link here. Same design: same water, fish, type.

const styles = stylex.create({
  writing: { marginTop: 28, scrollMarginTop: 72 },
  more: { marginTop: 16, fontSize: 15 },
  work: { marginTop: 22, fontSize: 15 },
});

export default async function PersonalHome() {
  const posts = (await getSubstackPosts()) ?? writingFallback;

  return (
    <>
      <FishCanvas />
      <PeekLayer />
      <Rail />

      <main {...stylex.props(ui.page, front.body)}>
        <h1 {...stylex.props(ui.h1, front.name)}>yushan</h1>
        <p {...stylex.props(front.lede)}>
          hi! i paint, figure skate, and write things down.
        </p>

        <div {...stylex.props(front.prose)}>
          <p>
            i was born in china and left home at sixteen for{" "}
            <Ext
              href="https://uwc.org/school/uwc-mostar/"
              peek="/assets/photo-uwc.jpg"
              alt="Yushan with classmates at United World College in Bosnia"
            >
              united world college
            </Ext>{" "}
            in mostar, bosnia: a couple hundred teenagers from eighty countries,
            in a town still marked by a war most of us had only read about.
            i&apos;ve been to twenty-odd countries since, and the list keeps
            growing. these days i&apos;m in{" "}
            <Ext
              href="https://www.berkeley.edu/"
              peek="/assets/photo-campanile.jpg"
              alt="Yushan with the bear statues at UC Berkeley"
            >
              berkeley
            </Ext>
            .
          </p>
          <p>
            i figure skate with the cal team. a long time before that, i was a
            national champion in artistic swimming. i barely talk about it
            anymore, but it probably shaped how i think about discipline more
            than anything else has.
          </p>
          <p>
            i paint too. the fish swimming around this page are cut out of{" "}
            <Ext href="/banner.jpg" peek="/banner.jpg" alt="Yushan's painting of fish over a city skyline">
              one of my paintings
            </Ext>
            , and the{" "}
            <Ext href="/logo.jpg" peek="/logo.jpg" alt="Yushan's persimmon painting">
              persimmon
            </Ext>{" "}
            is mine.
          </p>
        </div>

        <section id="writing" {...stylex.props(styles.writing)}>
          <h2 {...stylex.props(ui.h2)}>writing</h2>
          <div {...stylex.props(rows.list)}>
            {posts.map((p, i) => (
              <a
                key={i}
                data-fish
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(rows.row)}
              >
                <h3 {...stylex.props(rows.title)}>{p.title}</h3>
                <span {...stylex.props(rows.meta)}>{p.year} ↗</span>
              </a>
            ))}
          </div>
          <p {...stylex.props(styles.more)}>
            new pieces go up on{" "}
            <Ext href="https://liyushan27.substack.com">substack</Ext> first,
            so subscribe there if you want them in your inbox.
          </p>
        </section>

        <p {...stylex.props(styles.work)}>
          here for work? that&apos;s at{" "}
          <Ext href="https://yushan.li">yushan.li</Ext>.
        </p>

        <p {...stylex.props(ui.hint)}>double-click the water to feed the fish</p>
      </main>
    </>
  );
}
