import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import FishCanvas from "@/components/FishCanvas";
import PeekLayer from "@/components/PeekLayer";
import Rail from "@/components/Rail";
import PageFoot from "@/components/PageFoot";
import { ui } from "@/components/ui";
import { colors, fonts } from "../../globalTokens.stylex";

// Generated from personal-agent-blog/post_en.md (English translation of the
// Chinese essay written for thinkingloop). Charts live in
// /public/writing/personal-agents/assets/en/.

export const metadata: Metadata = {
  title: "Is a personal agent a secretary, a coworker, or a friend?",
  description: "A heavy user's take on 2026's personal agents: secretary, coworker, or friend, with data from five months of Instinct and 77 invite codes.",
  openGraph: {
    title: "Is a personal agent a secretary, a coworker, or a friend?",
    description: "A heavy user's take on 2026's personal agents: secretary, coworker, or friend, with data from five months of Instinct and 77 invite codes.",
    images: ["/writing/personal-agents/assets/en/01-positioning.png"],
  },
};

const styles = stylex.create({
  meta: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: "0.1em",
    color: colors.inkSoft,
    marginBottom: 18,
  },
  h2: {
    fontWeight: 500,
    fontSize: "clamp(19px, 2.4vw, 23px)",
    lineHeight: 1.25,
    textTransform: "lowercase",
    marginTop: 34,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  list: { paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 },
  li: { fontSize: 16 },
  figure: { marginBlock: 10 },
  img: { width: "100%", height: "auto", display: "block" },
  tblWrap: { overflowX: "auto" },
  table: { borderCollapse: "collapse", width: "100%", fontSize: 14, lineHeight: 1.5 },
  th: {
    textAlign: "left",
    fontWeight: 500,
    padding: "8px 10px 8px 0",
    borderBottomWidth: 1.5,
    borderBottomStyle: "solid",
    borderBottomColor: colors.ink,
  },
  td: {
    textAlign: "left",
    verticalAlign: "top",
    padding: "8px 10px 8px 0",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  note: { fontSize: 14, color: colors.inkSoft },
});

export default function PersonalAgent() {
  return (
    <>
      <FishCanvas />
      <PeekLayer />
      <Rail current="writing" />

      <main {...stylex.props(ui.page)}>
        <h1 {...stylex.props(ui.h1)}>{"Is a personal agent a secretary, a coworker, or a friend?"}</h1>
        <div {...stylex.props(styles.meta)}>yushan li · nov 2026</div>

        <p {...stylex.props(ui.p)}>{"In the past six months, it feels like the only thing SF consumer apps do anymore is build personal agents. Just this year:"}</p>
        <ul {...stylex.props(styles.list)}>
        <li {...stylex.props(styles.li)}>{"May 2026: Google unveils Gemini Spark at I/O, a personal agent that runs in the background. "}<a data-fish href="https://www.engadget.com/2176556/googles-gemini-spark-is-an-agentic-ai-assistant/" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"Engadget"}</a></li>
        <li {...stylex.props(styles.li)}>{"Aug 11, 2026: xAI releases Grok Bot beta, a set of always-on agents, each with its own cloud computer, open to SuperGrok and Cursor subscribers. "}<a data-fish href="https://x.ai/news/introducing-grok-bot" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"xAI"}</a></li>
        <li {...stylex.props(styles.li)}>{"Sept 2026: Instinct, which lives in iMessage, closes a $1B Series C at a $10B valuation, while the product is still in early access. "}<a data-fish href="https://theaiinsider.tech/2026/09/29/instinct-announces-1b-in-series-c-funding-from-sequoia-benchmark-and-coatue-at-10b-valuation/" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"The AI Insider"}</a></li>
        <li {...stylex.props(styles.li)}>{"Sept 8, 2026: Meta launches Muse. A month and a half later, Zuckerberg says on the earnings call that it has over 10 million users in the US and Canada, about a quarter of them daily. "}<a data-fish href="https://www.cnbc.com/2026/09/08/meta-personal-ai-agents-public-reckoning-privacy-safety.html" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"CNBC"}</a>{", "}<a data-fish href="https://finance.yahoo.com/ai/meta-ai/articles/meta-muse-popular-personal-agents-195002408.html" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"Yahoo Finance"}</a></li>
        <li {...stylex.props(styles.li)}>{"Sept 29, 2026: OpenAI launches dots at DevDay. "}<a data-fish href="https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"TechCrunch"}</a></li>
        <li {...stylex.props(styles.li)}>{"Oct 2026: Anthropic releases a research preview of Claude Duet. "}<a data-fish href="https://www.cnbc.com/2026/10/21/anthropic-preview-of-claude-duet-personal-ai-agent-take-on-muse-dots.html" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"CNBC"}</a></li>
        </ul>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/05-landscape.png" alt="Major personal agents of 2026" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"Big tech, star startups, a $10B company still in early access: everyone seems crammed into the same lane, grinding. I'm a heavy user myself, I've used one almost every day for the past three months (just how heavy, I'll get to later), but the more I use it, the more confused I get. Who is this thing actually for?"}</p>
        <h2 {...stylex.props(styles.h2)}>{"XiaoIce"}</h2>
        <p {...stylex.props(ui.p)}>{"As a kid born after 2000, my first impression of a \"personal agent\" was Microsoft XiaoIce in 2014. Looking back, it was the first clue that chat would become the hottest form of AI app today (besides recsys and FSD). Twelve years later, I think today's personal agents are a lot like XiaoIce back then: stunning enough that you can see the future in them, they've even grown a crowd of heavy users, and their DAU and retention look great. And yet something always seems to be missing."}</p>
        <p {...stylex.props(ui.p)}>{"Microsoft's 2018 paper positioned XiaoIce as an \"empathetic social chatbot\" balancing IQ and EQ, but its core was the empathetic computing module "}<a data-fish href="https://arxiv.org/abs/1812.08989" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"[arXiv"}</a>{", "}<a data-fish href="https://aclanthology.org/2020.cl-1.2" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"ACL Anthology"}</a>{"]. By contrast, today's Grok Bot, OpenAI Dots, Instinct and Claude Duet position themselves as IQ + productivity tools, split into pure-productivity and secretary types (light work, mostly coordination). Which makes me wonder: what form, and what entry point, would a personal agent need to actually serve ordinary people?"}</p>
        <p {...stylex.props(ui.p)}>{"So I roughly plotted this year's hot agents by whether they get things done and whether they have any warmth (purely subjective, go easy on me):"}</p>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/01-positioning.png" alt="Where personal agents sit" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"The most expensive ones (Instinct at $10B, Town at $1B) are all secretaries or coworkers, while Tolan, the companion, has raised only about $60M in total. The money is piling into the top-left corner too."}</p>
        <h2 {...stylex.props(styles.h2)}>{"Secretary, coworker, or friend?"}</h2>
        <p {...stylex.props(ui.p)}>{"I think all three have problems."}</p>
        <p {...stylex.props(ui.p)}>{"Take the secretary. The typical user is \"a busy young 牛马 who needs a life secretary (e.g., yours truly)\" (牛马, \"oxen and horses,\" is Chinese internet slang for an overworked grunt), or \"a Silicon Valley VC who genuinely needs a secretary and may already have one.\" But most people's lives don't actually need a secretary/EA. And good secretaries are hard: they have to foresee problems and lay out options. Being \"thoughtful\" takes a lot of reading between the lines, which is not simple at all. It takes very strong coordination, memory management (surfacing the right memory at the right moment), and the human's trust in a secretary to run long-horizon tasks."}</p>
        <p {...stylex.props(ui.p)}>{"Would a top-tier secretary who can handle anyone and anything be a good entry point for personal agents? The secretary itself feels very much like a product of modern white-collar corporate society. But as AI overhauls and replaces white-collar knowledge work at scale, the secretary people actually need may not look like someone who schedules meetings and sends reminders. On top of that, agents depend heavily on ecosystems, and ecosystems badly lack a Qin Shi Huang to unify the warring states. Same with AI glasses: every big company wants you plugged into its own software ecosystem. Software is easy to build; for users, switching ecosystems is a huge pain, and very few people live entirely inside one, even in Apple-everything California."}</p>
        <p {...stylex.props(ui.p)}>{"Then the coworker. If a personal agent has too little human touch (like Claude Duet, which Every's reviewer called the first personal agent he'd call a \"pro tool\" "}<a data-fish href="https://every.to/vibe-check/vibe-check-duet-anthropic-s-always-on-agent" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"[Every"}</a>{"]), its retention as a personal agent won't be great. It feels too much like work, so you rarely open it in daily life, only when you remember you have work to do. And work accounts are usually kept separate from personal ones. Who works from their personal account after clocking out?"}</p>
        <p {...stylex.props(ui.p)}>{"And the friend. There are two directions: a second life (the user's digital twin), or an always-on-call companion. Both need very careful persona alignment and character design. Everyone needs a different kind of friend at different stages of life. LLMs make this kind of dynamic product possible, but hitting the mark precisely is still hard."}</p>
        <p {...stylex.props(ui.p)}>{"So what do ordinary people actually want? I think we can start by looking at what people use AI for day to day."}</p>
        <h2 {...stylex.props(styles.h2)}>{"Most people don't use AI for work"}</h2>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/02-chatgpt-nonwork.png" alt="ChatGPT consumer plans: share of non-work messages" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"OpenAI's own numbers: in ChatGPT's consumer plans, non-work messages went from 53% in June 2024 to 73% in June 2025 ("}<a data-fish href="https://openai.com/index/how-people-are-using-chatgpt/" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"OpenAI"}</a>{"). HBR combed through a year of public online discussion, and the number one use of AI in 2025 was, of all things, therapy and companionship ("}<a data-fish href="https://hbr.org/2025/04/how-people-are-really-using-gen-ai-in-2025" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"HBR"}</a>{")."}</p>
        <p {...stylex.props(ui.p)}>{"A good consumer product has to be entertaining and can't feel too much like work: roughly 80% 爽 (shuǎng, that hit of pure fun) and 20% useful. Chinese consumer apps have had far more playful formats than American ones over the past decade, thanks to ByteDance and co. Zhihu and Xiaohongshu are useful first, fun later; TikTok and Bilibili are fun first, useful later. Today's personal agents mostly take the useful-first route, and some are only useful, with no fun at all."}</p>
        <p {...stylex.props(ui.p)}>{"\"Human attention is the bottleneck.\" I've heard this many times, in the news and at several closed-door talks by big names. Atomic Object has a piece called \"With AI Agents, Attention is the New Bottleneck,\" and a few engineers have written about how \"I became the bottleneck\" ("}<a data-fish href="https://spin.atomicobject.com/ai-agents-attention-bottleneck/" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"Atomic Object"}</a>{", "}<a data-fish href="https://julien.danjou.info/blog/the-human-is-the-new-bottleneck" target="_blank" rel="noopener noreferrer" {...stylex.props(ui.link)}>{"Julien Danjou"}</a>{"). But they're mostly describing developers juggling many agents at once. It's a conclusion engineers drew from their own workflows, and it doesn't carry over to mass consumer use."}</p>
        <p {...stylex.props(ui.p)}>{"I disagree with everyone here. It's just an excuse for a user experience that isn't good enough. \"Training the user\" is never the right answer. Good UX takes this into account: the public has long been trained by short video to be pretty \"ADHD.\" Don't believe me? Look at the data:"}</p>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/04-daily-minutes.png" alt="Daily time spent: TikTok vs Character.AI" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"People are willing to give short video almost an hour a day, and AI characters over an hour. Attention isn't scarce; products worth paying attention to are. So maybe agents will follow the same logic."}</p>
        <p {...stylex.props(ui.p)}>{"From what I see, Gen Z is pretty ADHD across the board, and talking to an app whose core experience is a foundation model is like using a search box Pro Max: ask about feelings, then code; ask about code, then health. Good consumer experiences seem to be very general, so for personal agents to work for everyone, they probably need the same: to flourish across everyday tasks."}</p>
        <h2 {...stylex.props(styles.h2)}>{"Metrics?"}</h2>
        <p {...stylex.props(ui.p)}>{"So in a personal agent, what counts as fun, what counts as useful, and what should we even measure?"}</p>
        <p {...stylex.props(ui.p)}>{"Microsoft XiaoIce optimized for retention: the paper set CPS (conversation-turns per session) as the target, averaging 23, higher than other chatbots and even higher than conversations between humans. That echoes \"low-quality user data, keep retention high, iterate on the data.\" But RL is one thing; a meaningful relationship is about bouncing back."}</p>
        <p {...stylex.props(ui.p)}>{"Twenty-three turns a session is fun, for real. But chatting a long time doesn't mean you'll come back next week. Muse is a textbook case:"}</p>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/03-muse-vs-chatgpt-retention.png" alt="New-install return rate: Meta Muse vs ChatGPT" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"Muse's day-one fun (novelty, plus Meta's distribution) pushed next-day returns way up, but what brings people back on day 14 is usefulness and trust, in other words, bouncing back. So \"fun first, useful second\" only works if it really does become useful later."}</p>
        <p {...stylex.props(ui.p)}>{"Fun: novelty, the feeling of getting something done, gamified check-offs; like a recommender system, it caters to our shredded modern attention. Useful: finishing the task actually solves the pain point."}</p>
        <p {...stylex.props(ui.p)}>{"How should we measure trust in a personal agent? Retention isn't necessarily attention; the answer might lie back in psychology, in how people relate to each other. Speaking of retention, I can actually show you my own data."}</p>
        <h2 {...stylex.props(styles.h2)}>{"Tested on myself"}</h2>
        <p {...stylex.props(ui.p)}>{"I happen to be exactly the 牛马 who needs a secretary, so what follows shows that a secretary-style personal agent is useful for people like me."}</p>
        <p {...stylex.props(ui.p)}>{"I started using Instinct in June, but put it down after a week and barely touched it in July. In August the preview officially launched and suddenly got much better, right as school started and job season hit. Over the next 88 days I used it on 85, with a longest streak of 65 days, opening almost 6 tasks a day on average."}</p>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/09-daily-activity.png" alt="Task sessions per day" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"What for? Mostly secretary work, honestly. As an extremely heavy user, my retention and screen time went ++ every day: calendar, location, drafting emails (personal ones count too), event coordination, and some ops support work. It's roughly at ops-intern level; hand it a whole job to run on its own and it's not quite there yet."}</p>
        <p {...stylex.props(ui.p)}>{"I went through my task log: of 563 tasks, a third were job applications, a fifth were school stuff, and nearly 30% touched my calendar. But the most useful part was actually the long-running stuff: having it wait for me. In agent engineering these are called watchers. Mine fall into roughly four kinds:"}</p>
        <ol {...stylex.props(styles.list)}>
        <li {...stylex.props(styles.li)}>{"Scheduled routines: a good-morning check-in every weekday, a load check every Sunday (flagging overloaded days and deadline-risk days), a morning weather check to decide whether to remind me to swim, a nudge at 11:55 pm every night to shut my laptop, and \"proactive value creation.\""}</li>
        <li {...stylex.props(styles.li)}>{"Waiting on replies: from recruiters, professors, TAs, the housing office."}</li>
        <li {...stylex.props(styles.li)}>{"Waiting for things to open, arrive or drop in price: job postings, event tickets, package deliveries, documents in the mail, my Singles' Day (11.11) shopping list, secondhand clothes."}</li>
        <li {...stylex.props(styles.li)}>{"Global sweeps: a job-inbox watcher that scans two Gmail accounts and my calendar several times a day, syncing recruiter replies, rejections and interview invites into a tracker."}</li>
        </ol>
        <p {...stylex.props(ui.p)}>{"I think watchers are the most AI-native thing here. An app can't do \"tell me when X happens\"; you have to open it yourself. A watcher keeps the agent alive in my life even when I'm not opening it, so DAU counted by app opens actually underestimates it. That's why I say retention ≠ attention."}</p>
        <p {...stylex.props(ui.p)}>{"It has crashed and burned too. I had it resell concert tickets on the original platform, and it kept getting stuck on CAPTCHAs it couldn't get past; another time it sent an email without double-checking with me first. The more useful you want a secretary to be, the more you have to hand over, and the higher the trust bar."}</p>
        <p {...stylex.props(ui.p)}>{"As for A2A: even in San Francisco, where friends each have more than one personal agent, it doesn't seem very useful. A2A is \"my agent talking to your agent,\" most useful for intense project collaboration or families with kids sharing a calendar. It may not be the best entry point for personal agents, because it needs good organizational structure rather than one great assistant. I used it to coordinate schedules with my class project teammates; it made things a bit easier, but didn't add much value."}</p>
        <p {...stylex.props(ui.p)}>{"Agent commerce is even harder. Letting an agent spend your money takes another order of magnitude more trust than letting it send your emails. It has done price comparisons and purchase research for me, but paying is a whole other level. Personally I think that decision is hard to hand to an agent. After all, we 牛马 earn money precisely so we can have fun spending it. If you won't let me spend it, where's the 爽 in that!"}</p>
        <h2 {...stylex.props(styles.h2)}>{"I gave out 77 Instinct invite codes"}</h2>
        <p {...stylex.props(ui.p)}>{"I posted an Instinct review on RedNote. For the past month, the moment my eyes opened each morning I was on shift as an unpaid, purely-for-love customer support rep: over the month I sent out 77 invite links, and while I was at it, had Claude computer use tally up who these people were:"}</p>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/07-invite-codes.png" alt="Who got my 77 Instinct invites" loading="lazy" {...stylex.props(styles.img)} /></figure>
        <p {...stylex.props(ui.p)}>{"About two-thirds had mainland China IPs, the median follower count was 96, and many of their profiles had nothing to do with AI: new moms, picture-book bloggers, travel bloggers. The curiosity broke out of the bubble a long time ago; it's not just the VC-and-startup crowd playing with this."}</p>
        <p {...stylex.props(ui.p)}>{"The catch: you can't sign up with a Chinese phone number. Invite code, overseas phone number, iMessage: I'd guess most people gave up at one of those gates."}</p>
        <p {...stylex.props(ui.p)}>{"Looking back, I was the same. When I first got beta access in June, after a week I couldn't find a reason to go back (it wasn't very capable then, not very proactive, and overlapped heavily with what the Claude app could do). Two months later, I came back and pulled a classic 真香 (\"turns out it smells amazing,\" the internet's word for eating your own words). Before Instinct's official launch, the product got proactive, and then school started and I suddenly got busy, so my need for an agent that could actually get work done shot up."}</p>
        <h2 {...stylex.props(styles.h2)}>{"Ending"}</h2>
        <p {...stylex.props(ui.p)}>{"So, is a personal agent a secretary, a coworker, or a friend?"}</p>
        <p {...stylex.props(ui.p)}>{"For me, it's a life secretary, and I've found some real value in it. For some people, it might be a coworker. But for the general public, neither secretary nor coworker is probably a good entry point, and neither offers irreplaceable value."}</p>
        <p {...stylex.props(ui.p)}>{"Ten years ago XiaoIce bet on the friend, and it never became the friend in everyone's phone. Today everyone's betting on the secretary/assistant positioning. My guess is the real entry point sits somewhere in between: something that's fun first and makes you want to pull your friends in, and then gets things done for you on the side. Fun first, useful second!"}</p>
        <p {...stylex.props(ui.p)}>{"All of the above is speculation and my personal opinion only. Happy to discuss!"}</p>
        <h2 {...stylex.props(styles.h2)}>{"Appendix"}</h2>
        <div {...stylex.props(styles.tblWrap)}><table {...stylex.props(styles.table)}><thead><tr><th {...stylex.props(styles.th)}>{"Action"}</th><th {...stylex.props(styles.th)}>{"Approx. count"}</th><th {...stylex.props(styles.th)}>{"Examples"}</th></tr></thead><tbody><tr><td {...stylex.props(styles.td)}>{"Add to calendar"}</td><td {...stylex.props(styles.td)}>{"~98"}</td><td {...stylex.props(styles.td)}>{"moving my class schedule into the calendar; dinners, interviews and deadlines onto the calendar"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Check / verify"}</td><td {...stylex.props(styles.td)}>{"~86"}</td><td {...stylex.props(styles.td)}>{"homework deadlines, exam rooms, application deadlines"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Research / compare / pick"}</td><td {...stylex.props(styles.td)}>{"~52"}</td><td {...stylex.props(styles.td)}>{"ticket pricing, gifts, picking an e-ink display, screening job postings"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Apply / fill forms / submit"}</td><td {...stylex.props(styles.td)}>{"~51"}</td><td {...stylex.props(styles.td)}>{"job applications, OPT application, event RSVPs"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Reshuffle schedule"}</td><td {...stylex.props(styles.td)}>{"~49"}</td><td {...stylex.props(styles.td)}>{"\"move Saturday's blocks to Sunday,\" \"compress today into the evening\""}</td></tr><tr><td {...stylex.props(styles.td)}>{"Draft messages"}</td><td {...stylex.props(styles.td)}>{"~44"}</td><td {...stylex.props(styles.td)}>{"reply drafts, referral requests, emails"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Read / summarize"}</td><td {...stylex.props(styles.td)}>{"~36"}</td><td {...stylex.props(styles.td)}>{"reading tweets and papers, organizing links"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Wait for you (watcher)"}</td><td {...stylex.props(styles.td)}>{"~23"}</td><td {...stylex.props(styles.td)}>{"see above"}</td></tr><tr><td {...stylex.props(styles.td)}>{"Fix / redo"}</td><td {...stylex.props(styles.td)}>{"~23 (about 4%)"}</td><td {...stylex.props(styles.td)}>{"read the same folder 4 times, changed calendar colors over and over, duplicate events"}</td></tr></tbody></table></div>
        <figure data-fish {...stylex.props(styles.figure)}><img src="/writing/personal-agents/assets/en/08-task-history.png" alt="One user's Instinct task log" loading="lazy" {...stylex.props(styles.img)} /></figure>

        <p {...stylex.props(styles.note)}>
          {"Translated from the Chinese original, written as a guest piece for thinkingloop."}
        </p>

        <PageFoot />
      </main>
    </>
  );
}
