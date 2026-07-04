"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import FishCanvas from "@/components/FishCanvas";
import type { WritingEntry } from "@/lib/substack";

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
    <svg className="sparkline" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} />
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
    <div className="stat">
      <div className="stat-value">
        {format(latest)}
        <span className="stat-unit">{unit}</span>
      </div>
      <div className="stat-name">{name}</div>
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

  if (!checked) return <div className="desk" />;

  // ── Locked ──
  if (!token) {
    return (
      <div className="desk">
        <FishCanvas variant="night" />
        <div className="gate">
          <div className="gate-card">
            <Image src="/logo.jpg" alt="" width={40} height={40} />
            <div className="gate-title">the desk</div>
            <p className="gate-sub">
              This side is for Yushan. Paste a fine-grained GitHub token with
              read access to <code>{BRAIN_REPO}</code> — it&apos;s both the key
              and the credential. Stored only in this browser.
            </p>
            <input
              type="password"
              placeholder="github_pat_…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              autoComplete="off"
            />
            <button onClick={unlock} disabled={busy}>
              {busy ? "checking…" : "unlock"}
            </button>
            {error && <p className="gate-error">{error}</p>}
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
    <div className="desk">
      <FishCanvas variant="night" />
      <div className="desk-inner">
        <header className="desk-header">
          <div>
            <div className="desk-title">the desk</div>
            <div className="desk-sub">{today} — hi, yushan</div>
          </div>
          <button className="desk-signout" onClick={signOut}>
            lock up ↗
          </button>
        </header>

        <div className="desk-grid">
          {/* Latest note */}
          <div className="desk-card wide">
            <div className="desk-card-label">
              <span>brain — latest note</span>
              {note && <span className="hint">{note.name}</span>}
            </div>
            {note ? (
              <div className="desk-note">{note.text}</div>
            ) : (
              <p className="desk-empty">
                {brainMissing ? (
                  <>
                    No <code>{BRAIN_REPO}</code> repo found (or the token
                    can&apos;t see it). Create it, then add{" "}
                    <code>notes/2026-07-04.md</code> and it&apos;ll appear here.
                  </>
                ) : (
                  <>
                    No notes yet — add <code>notes/YYYY-MM-DD.md</code> to{" "}
                    <code>{BRAIN_REPO}</code> and the latest one lands here.
                  </>
                )}
              </p>
            )}
          </div>

          {/* Brain commits */}
          <div className="desk-card">
            <div className="desk-card-label">
              <span>brain — commits</span>
            </div>
            {commits && commits.length > 0 ? (
              commits.map((c) => (
                <a key={c.sha} href={c.url} target="_blank" rel="noopener noreferrer" className="desk-row">
                  <span className="desk-row-main">{c.message}</span>
                  <span className="desk-row-meta">{c.date ? timeAgo(c.date) : ""}</span>
                </a>
              ))
            ) : (
              <p className="desk-empty">Nothing committed to the brain yet.</p>
            )}
          </div>

          {/* Code activity */}
          <div className="desk-card">
            <div className="desk-card-label">
              <span>code — recent</span>
            </div>
            {activity && activity.length > 0 ? (
              activity.map((a) => (
                <div key={a.id} className="desk-row">
                  <span className="desk-row-tag">{a.repo.split("/")[1] ?? a.repo}</span>
                  <span className="desk-row-main">{a.action}</span>
                  <span className="desk-row-meta">{timeAgo(a.date)}</span>
                </div>
              ))
            ) : (
              <p className="desk-empty">Quiet on GitHub lately.</p>
            )}
          </div>

          {/* Health */}
          <div className="desk-card wide">
            <div className="desk-card-label">
              <span>body — last 30 days</span>
              {health?.updated && (
                <span className="hint">updated {health.updated}</span>
              )}
            </div>
            {health ? (
              <div className="stat-row">
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
              <p className="desk-empty">
                Export Apple Health, run{" "}
                <code>scripts/apple_health_to_summary.py</code>, and commit the
                result to <code>{BRAIN_REPO}/health/summary.json</code>.
              </p>
            )}
          </div>

          {/* Writing */}
          <div className="desk-card wide">
            <div className="desk-card-label">
              <span>writing — substack</span>
            </div>
            {writing.map((w, i) => (
              <a key={i} href={w.href} target="_blank" rel="noopener noreferrer" className="desk-row">
                <span className="desk-row-main">{w.title}</span>
                <span className="desk-row-meta">{w.year}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
