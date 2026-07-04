"use client";

import { useCallback, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import FishCanvas from "@/components/FishCanvas";
import type { WritingEntry } from "@/lib/substack";
import { colors, fonts } from "../globalTokens.stylex";

// ─── Config ──────────────────────────────────────────────────────────────────
// The private "brain" repo the desk reads from. Change this one line if the
// repo lives elsewhere. Expected layout:
//   notes/YYYY-MM-DD.md          — daily notes (latest one is shown)
//   health/summary.json          — produced by scripts/apple_health_to_summary.py
const BRAIN_REPO = "yslidev/brain";
const GITHUB_USER = "yslidev";
const TOKEN_KEY = "desk_github_pat";

// ─── GitHub helpers ──────────────────────────────────────────────────────────

async function gh(path: string, token: string): Promise<Response> {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
}

function decodeBase64Utf8(b64: string): string {
  const bytes = Uint8Array.from(atob(b64.replace(/\n/g, "")), (c) =>
    c.charCodeAt(0)
  );
  return new TextDecoder("utf-8").decode(bytes);
}

function timeAgo(iso: string): string {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

// ─── Data shapes ─────────────────────────────────────────────────────────────

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

interface ActivityItem {
  id: string;
  repo: string;
  action: string;
  date: string;
}

interface Note {
  name: string;
  text: string;
}

interface HealthDay {
  date: string;
  steps?: number;
  sleep_hours?: number;
  resting_hr?: number;
}

interface HealthSummary {
  updated?: string;
  days: HealthDay[];
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = stylex.create({
  desk: {
    minHeight: "100vh",
    backgroundColor: colors.navyDeep,
    color: colors.paper,
    position: "relative",
    zIndex: 5,
  },
  inner: {
    maxWidth: 1100,
    marginInline: "auto",
    padding: { default: 40, "@media (max-width: 720px)": "24px 18px" },
    position: "relative",
    zIndex: 5,
  },
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 36,
  },
  title: {
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "2rem",
    color: colors.paper,
  },
  titleStar: { color: colors.persimmon, fontStyle: "normal", fontSize: "1.2rem" },
  sub: {
    fontSize: "0.64rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(250, 247, 240, 0.5)",
  },
  signout: {
    fontSize: "0.62rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 600,
    color: { default: colors.teal, ":hover": colors.navyDeep },
    backgroundColor: { default: "transparent", ":hover": colors.persimmon },
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: { default: colors.hairlineNight, ":hover": colors.persimmon },
    borderRadius: 999,
    padding: "6px 14px",
    cursor: "pointer",
    transform: { default: "rotate(0deg)", ":hover": "rotate(-3deg)" },
    transition: "all 0.15s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(2, 1fr)", "@media (max-width: 720px)": "1fr" },
    gap: 18,
  },
  card: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.hairlineNight,
    borderRadius: 14,
    backgroundColor: "rgba(250, 247, 240, 0.03)",
    boxShadow: "6px 6px 0 rgba(101, 202, 210, 0.12)",
    padding: "22px 24px",
    minHeight: 160,
  },
  wide: { gridColumn: "1 / -1" },
  cardLabel: {
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
  },
  cardPill: {
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: colors.navyDeep,
    backgroundColor: colors.teal,
    borderRadius: 999,
    padding: "3px 12px",
    display: "inline-block",
    transform: "rotate(-2deg)",
  },
  cardPillGold: { backgroundColor: colors.gold, transform: "rotate(1.5deg)" },
  cardPillPersimmon: { backgroundColor: colors.persimmon, transform: "rotate(-1.5deg)" },
  cardHint: {
    fontSize: "0.62rem",
    color: "rgba(250, 247, 240, 0.35)",
  },
  empty: {
    fontSize: "0.8rem",
    color: "rgba(250, 247, 240, 0.45)",
    lineHeight: 1.7,
  },
  code: { color: colors.gold, fontSize: "0.72rem", fontFamily: fonts.mono },

  row: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    padding: "7px 6px",
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: { default: "solid", ":last-child": "none" },
    borderBottomColor: "rgba(250, 247, 240, 0.07)",
    fontSize: "0.8rem",
    textDecoration: "none",
    color: { default: colors.paper, ":hover": colors.persimmon },
    backgroundColor: { default: "transparent", ":hover": "rgba(230, 181, 77, 0.08)" },
    borderRadius: 6,
    transition: "background-color 0.15s ease, color 0.15s ease",
  },
  rowMain: {
    flexGrow: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "inherit",
    transition: "color 0.15s",
  },
  rowMeta: {
    fontFamily: fonts.mono,
    fontSize: "0.66rem",
    color: "rgba(250, 247, 240, 0.45)",
    flexShrink: 0,
  },
  rowTag: {
    fontSize: "0.6rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.gold,
    flexShrink: 0,
  },

  note: {
    fontSize: "0.82rem",
    lineHeight: 1.85,
    color: "rgba(250, 247, 240, 0.82)",
    whiteSpace: "pre-wrap",
    maxHeight: 340,
    overflowY: "auto",
    fontFamily: fonts.sans,
  },

  statRow: { display: "flex", gap: 28, flexWrap: "wrap" },
  stat: { flexGrow: 1, minWidth: 130 },
  statValue: {
    fontFamily: fonts.serif,
    fontWeight: 300,
    fontSize: "2rem",
    color: colors.paper,
    lineHeight: 1.1,
  },
  statUnit: {
    fontSize: "0.7rem",
    color: "rgba(250, 247, 240, 0.5)",
    marginLeft: 4,
  },
  statName: {
    fontSize: "0.62rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(250, 247, 240, 0.5)",
    marginTop: 6,
    marginBottom: 10,
  },
  sparkline: { display: "block" },
  sparkPath: {
    fill: "none",
    stroke: colors.teal,
    strokeWidth: 1.5,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  },

  gate: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    position: "relative",
    zIndex: 5,
  },
  gateCard: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.hairlineNight,
    borderRadius: 16,
    backgroundColor: "rgba(250, 247, 240, 0.03)",
    boxShadow: `8px 8px 0 rgba(101, 202, 210, 0.15)`,
    padding: 36,
    transform: "rotate(-0.5deg)",
  },
  gateLogo: {
    borderRadius: 10,
    marginBottom: 22,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.hairlineNight,
    transform: "rotate(-8deg)",
  },
  gateTitle: {
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: "1.6rem",
    color: colors.paper,
    marginBottom: 8,
  },
  gateSub: {
    fontSize: "0.76rem",
    lineHeight: 1.7,
    color: "rgba(250, 247, 240, 0.55)",
    marginBottom: 24,
  },
  gateInput: {
    width: "100%",
    backgroundColor: "rgba(250, 247, 240, 0.06)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: { default: colors.hairlineNight, ":focus": colors.teal },
    borderRadius: 8,
    color: colors.paper,
    fontFamily: fonts.mono,
    fontSize: "0.8rem",
    padding: "11px 14px",
    outline: "none",
    marginBottom: 14,
  },
  gateButton: {
    width: "100%",
    backgroundColor: colors.persimmon,
    color: colors.navyDeep,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.persimmon,
    borderRadius: 8,
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: 12,
    cursor: { default: "pointer", ":disabled": "wait" },
    opacity: { default: 1, ":hover": 0.9, ":disabled": 0.5 },
    boxShadow: {
      default: `4px 4px 0 ${colors.gold}`,
      ":hover": `1px 1px 0 ${colors.gold}`,
    },
    transform: { default: "translate(0, 0)", ":hover": "translate(3px, 3px)" },
    transition: "transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease",
  },
  gateError: { fontSize: "0.72rem", color: "#ff9d7a", marginTop: 12 },
});

// ─── Small components ────────────────────────────────────────────────────────

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const w = 140;
  const h = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values
    .map(
      (v, i) =>
        `${((i / (values.length - 1)) * w).toFixed(1)},${(
          h - ((v - min) / range) * (h - 4) - 2
        ).toFixed(1)}`
    )
    .join(" ");
  return (
    <svg {...stylex.props(styles.sparkline)} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline {...stylex.props(styles.sparkPath)} points={pts} />
    </svg>
  );
}

function HealthStat({
  name,
  days,
  pick,
  format,
  unit,
}: {
  name: string;
  days: HealthDay[];
  pick: (d: HealthDay) => number | undefined;
  format: (v: number) => string;
  unit: string;
}) {
  const series = days
    .map(pick)
    .filter((v): v is number => typeof v === "number");
  if (series.length === 0) return null;
  const latest = series[series.length - 1];
  return (
    <div {...stylex.props(styles.stat)}>
      <div {...stylex.props(styles.statValue)}>
        {format(latest)}
        <span {...stylex.props(styles.statUnit)}>{unit}</span>
      </div>
      <div {...stylex.props(styles.statName)}>{name}</div>
      <Sparkline values={series.slice(-30)} />
    </div>
  );
}

// ─── The desk ────────────────────────────────────────────────────────────────

export default function DeskClient({ writing }: { writing: WritingEntry[] }) {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [brainMissing, setBrainMissing] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [activity, setActivity] = useState<ActivityItem[] | null>(null);
  const [health, setHealth] = useState<HealthSummary | null>(null);

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
    setChecked(true);
  }, []);

  const unlock = useCallback(async () => {
    const pat = input.trim();
    if (!pat) return;
    setBusy(true);
    setError("");
    try {
      const res = await gh("/user", pat);
      if (!res.ok) {
        setError("GitHub didn't accept that token.");
        return;
      }
      localStorage.setItem(TOKEN_KEY, pat);
      setToken(pat);
      setInput("");
    } catch {
      setError("Couldn't reach GitHub. Are you online?");
    } finally {
      setBusy(false);
    }
  }, [input]);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCommits(null);
    setNote(null);
    setActivity(null);
    setHealth(null);
    setBrainMissing(false);
  }, []);

  // Fetch everything once unlocked
  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    (async () => {
      // Brain repo: commits
      try {
        const res = await gh(`/repos/${BRAIN_REPO}/commits?per_page=8`, token);
        if (res.status === 404) {
          if (!cancelled) setBrainMissing(true);
        } else if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data)) {
            setCommits(
              data.map(
                (c: {
                  sha: string;
                  html_url: string;
                  commit: { message: string; author?: { date?: string } };
                }) => ({
                  sha: c.sha.slice(0, 7),
                  message: c.commit.message.split("\n")[0],
                  date: c.commit.author?.date ?? "",
                  url: c.html_url,
                })
              )
            );
          }
        }
      } catch {
        /* card shows empty state */
      }

      // Brain repo: latest note in notes/
      try {
        const res = await gh(`/repos/${BRAIN_REPO}/contents/notes`, token);
        if (res.ok) {
          const files = await res.json();
          if (Array.isArray(files)) {
            const mdFiles = files
              .filter((f: { name: string; type: string }) =>
                f.type === "file" && f.name.endsWith(".md")
              )
              .sort((a: { name: string }, b: { name: string }) =>
                b.name.localeCompare(a.name)
              );
            if (mdFiles.length > 0) {
              const latest = mdFiles[0];
              const fileRes = await gh(
                `/repos/${BRAIN_REPO}/contents/notes/${encodeURIComponent(latest.name)}`,
                token
              );
              if (fileRes.ok) {
                const file = await fileRes.json();
                if (!cancelled && file.content) {
                  setNote({
                    name: latest.name.replace(/\.md$/, ""),
                    text: decodeBase64Utf8(file.content),
                  });
                }
              }
            }
          }
        }
      } catch {
        /* card shows empty state */
      }

      // Recent GitHub activity (with a PAT, includes your private events)
      try {
        const res = await gh(`/users/${GITHUB_USER}/events?per_page=30`, token);
        if (res.ok) {
          const events = await res.json();
          if (!cancelled && Array.isArray(events)) {
            const items: ActivityItem[] = [];
            const seen = new Set<string>();
            for (const e of events as Array<{
              id: string;
              type: string;
              repo: { name: string };
              created_at: string;
              payload: { commits?: unknown[]; action?: string };
            }>) {
              let action = "";
              if (e.type === "PushEvent")
                action = `pushed ${e.payload.commits?.length ?? 0} commit${(e.payload.commits?.length ?? 0) === 1 ? "" : "s"}`;
              else if (e.type === "PullRequestEvent")
                action = `${e.payload.action} a PR`;
              else if (e.type === "CreateEvent") action = "created";
              else if (e.type === "IssuesEvent")
                action = `${e.payload.action} an issue`;
              else continue;
              const key = `${e.repo.name}:${action}`;
              if (seen.has(key)) continue;
              seen.add(key);
              items.push({
                id: e.id,
                repo: e.repo.name,
                action,
                date: e.created_at,
              });
              if (items.length >= 8) break;
            }
            setActivity(items);
          }
        }
      } catch {
        /* card shows empty state */
      }

      // Health summary
      try {
        const res = await gh(
          `/repos/${BRAIN_REPO}/contents/health/summary.json`,
          token
        );
        if (res.ok) {
          const file = await res.json();
          if (!cancelled && file.content) {
            const parsed = JSON.parse(decodeBase64Utf8(file.content));
            if (parsed && Array.isArray(parsed.days)) setHealth(parsed);
          }
        }
      } catch {
        /* card shows empty state */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!checked) return <div {...stylex.props(styles.desk)} />;

  // ── Locked ──
  if (!token) {
    return (
      <div {...stylex.props(styles.desk)}>
        <FishCanvas variant="night" />
        <div {...stylex.props(styles.gate)}>
          <div {...stylex.props(styles.gateCard)}>
            <Image src="/logo.jpg" alt="" width={40} height={40} {...stylex.props(styles.gateLogo)} />
            <div {...stylex.props(styles.gateTitle)}>the desk</div>
            <p {...stylex.props(styles.gateSub)}>
              This side is for Yushan. Paste a fine-grained GitHub token with
              read access to <code {...stylex.props(styles.code)}>{BRAIN_REPO}</code> —
              it&apos;s both the key and the credential. Stored only in this
              browser.
            </p>
            <input
              {...stylex.props(styles.gateInput)}
              type="password"
              placeholder="github_pat_…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              autoComplete="off"
            />
            <button {...stylex.props(styles.gateButton)} onClick={unlock} disabled={busy}>
              {busy ? "checking…" : "unlock"}
            </button>
            {error && <p {...stylex.props(styles.gateError)}>{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  // ── Unlocked ──
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div {...stylex.props(styles.desk)}>
      <FishCanvas variant="night" />
      <div {...stylex.props(styles.inner)}>
        <header {...stylex.props(styles.header)}>
          <div>
            <div {...stylex.props(styles.title)}>
              the desk <span {...stylex.props(styles.titleStar)}>✺</span>
            </div>
            <div {...stylex.props(styles.sub)}>{today} — hi, yushan</div>
          </div>
          <button {...stylex.props(styles.signout)} onClick={signOut}>
            lock up ↗
          </button>
        </header>

        <div {...stylex.props(styles.grid)}>
          {/* Latest note */}
          <div {...stylex.props(styles.card, styles.wide)}>
            <div {...stylex.props(styles.cardLabel)}>
              <span {...stylex.props(styles.cardPill)}>brain — latest note</span>
              {note && <span {...stylex.props(styles.cardHint)}>{note.name}</span>}
            </div>
            {note ? (
              <div {...stylex.props(styles.note)}>{note.text}</div>
            ) : (
              <p {...stylex.props(styles.empty)}>
                {brainMissing ? (
                  <>
                    No <code {...stylex.props(styles.code)}>{BRAIN_REPO}</code>{" "}
                    repo found (or the token can&apos;t see it). Create it, then
                    add <code {...stylex.props(styles.code)}>notes/2026-07-04.md</code>{" "}
                    and it&apos;ll appear here.
                  </>
                ) : (
                  <>
                    No notes yet — add{" "}
                    <code {...stylex.props(styles.code)}>notes/YYYY-MM-DD.md</code>{" "}
                    to <code {...stylex.props(styles.code)}>{BRAIN_REPO}</code>{" "}
                    and the latest one lands here.
                  </>
                )}
              </p>
            )}
          </div>

          {/* Brain commits */}
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.cardLabel)}>
              <span {...stylex.props(styles.cardPill, styles.cardPillGold)}>brain — commits</span>
            </div>
            {commits && commits.length > 0 ? (
              commits.map((c) => (
                <a key={c.sha} href={c.url} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.row)}>
                  <span {...stylex.props(styles.rowMain)}>{c.message}</span>
                  <span {...stylex.props(styles.rowMeta)}>{c.date ? timeAgo(c.date) : ""}</span>
                </a>
              ))
            ) : (
              <p {...stylex.props(styles.empty)}>Nothing committed to the brain yet.</p>
            )}
          </div>

          {/* Code activity */}
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.cardLabel)}>
              <span {...stylex.props(styles.cardPill, styles.cardPillPersimmon)}>code — recent</span>
            </div>
            {activity && activity.length > 0 ? (
              activity.map((a) => (
                <div key={a.id} {...stylex.props(styles.row)}>
                  <span {...stylex.props(styles.rowTag)}>{a.repo.split("/")[1] ?? a.repo}</span>
                  <span {...stylex.props(styles.rowMain)}>{a.action}</span>
                  <span {...stylex.props(styles.rowMeta)}>{timeAgo(a.date)}</span>
                </div>
              ))
            ) : (
              <p {...stylex.props(styles.empty)}>Quiet on GitHub lately.</p>
            )}
          </div>

          {/* Health */}
          <div {...stylex.props(styles.card, styles.wide)}>
            <div {...stylex.props(styles.cardLabel)}>
              <span {...stylex.props(styles.cardPill)}>body — last 30 days</span>
              {health?.updated && (
                <span {...stylex.props(styles.cardHint)}>updated {health.updated}</span>
              )}
            </div>
            {health ? (
              <div {...stylex.props(styles.statRow)}>
                <HealthStat
                  name="steps"
                  days={health.days}
                  pick={(d) => d.steps}
                  format={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${Math.round(v)}`)}
                  unit="today"
                />
                <HealthStat
                  name="sleep"
                  days={health.days}
                  pick={(d) => d.sleep_hours}
                  format={(v) => v.toFixed(1)}
                  unit="hrs"
                />
                <HealthStat
                  name="resting hr"
                  days={health.days}
                  pick={(d) => d.resting_hr}
                  format={(v) => `${Math.round(v)}`}
                  unit="bpm"
                />
              </div>
            ) : (
              <p {...stylex.props(styles.empty)}>
                Export Apple Health, run{" "}
                <code {...stylex.props(styles.code)}>scripts/apple_health_to_summary.py</code>,
                and commit the result to{" "}
                <code {...stylex.props(styles.code)}>{BRAIN_REPO}/health/summary.json</code>.
              </p>
            )}
          </div>

          {/* Writing */}
          <div {...stylex.props(styles.card, styles.wide)}>
            <div {...stylex.props(styles.cardLabel)}>
              <span {...stylex.props(styles.cardPill, styles.cardPillGold)}>writing — substack</span>
            </div>
            {writing.map((w, i) => (
              <a key={i} href={w.href} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.row)}>
                <span {...stylex.props(styles.rowMain)}>{w.title}</span>
                <span {...stylex.props(styles.rowMeta)}>{w.year}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
