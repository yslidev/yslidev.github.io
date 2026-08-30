"use client";

import { useEffect, useRef } from "react";
import * as stylex from "@stylexjs/stylex";

// The fish are real cut-outs from the banner painting. They roam, drift toward
// the cursor, school around any [data-fish] element while it is hovered or
// focused, and chase down crumbs the visitor drops by double-clicking.

const FISH_COUNT = 12;
const CRUMB_MS = 16000;
const CRUMB_SETTLE_MS = 2200; // let the school travel before anyone can nibble
const NIBBLE_COOLDOWN_MS = 1400;
const CRUMB_LIFE = 6;

interface Fish {
  img: HTMLImageElement;
  x: number;
  y: number;
  angle: number;
  size: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  roamAngle: number;
  roamTimer: number;
  roamInterval: number;
  speed: number;
  offsetX: number;
  offsetY: number;
  nibbleAt: number;
}

interface Crumb {
  x: number;
  y: number;
  born: number;
  until: number;
  life: number;
  dot: HTMLElement;
}

function lerpAngle(a: number, b: number, t: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

const styles = stylex.create({
  canvas: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
});

export default function FishCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── cursor ──
    const mouse = { x: -9999, y: -9999, on: false };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.on = true;
    };
    const onMouseLeave = () => {
      mouse.on = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // ── bait: whichever [data-fish] element is hovered or focused ──
    let bait: Element | null = null;
    const baitPoint = { x: 0, y: 0 };
    let baitPull = 0;

    const onOver = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.("[data-fish]");
      if (el) bait = el;
    };
    const onOut = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.("[data-fish]");
      if (el && el === bait) bait = null;
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("focusin", onOver);
    document.addEventListener("focusout", onOut);

    // ── crumbs ──
    const crumbs: Crumb[] = [];

    const popCrumb = (c: Crumb, eaten: boolean) => {
      const i = crumbs.indexOf(c);
      if (i >= 0) crumbs.splice(i, 1);
      const dot = c.dot;
      if (!dot.isConnected) return;
      const m = getComputedStyle(dot).transform;
      dot.style.transition =
        "opacity .3s ease, transform .3s cubic-bezier(.16,1,.3,1)";
      dot.style.transform = `${m === "none" ? "" : `${m} `}scale(${eaten ? 2.6 : 0.4})`;
      dot.style.opacity = "0";
      window.setTimeout(() => dot.remove(), 400);
    };

    const nibbleCrumb = (c: Crumb) => {
      const dot = c.dot;
      if (!dot.isConnected) return;
      const m = getComputedStyle(dot).transform;
      const frac = Math.max(0, c.life) / CRUMB_LIFE;
      dot.style.transition =
        "opacity .25s ease, transform .25s cubic-bezier(.16,1,.3,1)";
      dot.style.transform = `${m === "none" ? "" : `${m} `}scale(${0.45 + frac * 0.55})`;
    };

    const onDblClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.("a, button, input, textarea")) return;

      // the gesture is feeding the water, not selecting a word
      window.getSelection()?.removeAllRanges();

      const dot = document.createElement("span");
      dot.style.cssText =
        `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;` +
        "margin:-3px 0 0 -3px;border-radius:50%;background:#f06a17;z-index:4;" +
        "pointer-events:none;transition:opacity .35s ease, transform 16s linear";
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = "translateY(120px)";
      });

      const now = performance.now();
      crumbs.push({
        x: e.clientX,
        y: e.clientY,
        born: now,
        until: now + CRUMB_MS,
        life: CRUMB_LIFE,
        dot,
      });
    };
    window.addEventListener("dblclick", onDblClick);

    // ── the school ──
    const images: HTMLImageElement[] = [];
    for (let n = 1; n <= FISH_COUNT; n++) {
      const im = new Image();
      im.src = `/assets/fish/f${n}.png`;
      images.push(im);
    }

    const count = window.innerWidth < 768 ? 7 : 14;
    const fish: Fish[] = Array.from({ length: count }, (_, i) => ({
      img: images[i % images.length],
      x: Math.random() * W,
      y: Math.random() * H,
      angle: Math.random() * Math.PI * 2,
      size: 9 + Math.random() * 15,
      opacity: 0.34 + Math.random() * 0.24,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.024 + Math.random() * 0.021,
      roamAngle: Math.random() * Math.PI * 2,
      roamTimer: Math.floor(Math.random() * 120),
      roamInterval: 90 + Math.floor(Math.random() * 110),
      speed: 0.16 + Math.random() * 0.2,
      offsetX: (Math.random() - 0.5) * 90,
      offsetY: (Math.random() - 0.5) * 60,
      nibbleAt: -Infinity,
    }));

    const draw = (f: Fish) => {
      const im = f.img;
      if (!im.complete || !im.naturalWidth) return;
      const wd = f.size * 3.4;
      const ht = wd * (im.naturalHeight / im.naturalWidth);
      const facingLeft = Math.cos(f.angle) < 0;

      // keep the fish roughly level: cap the pitch, mirror when heading left
      let pitch = Math.asin(Math.max(-1, Math.min(1, Math.sin(f.angle))));
      pitch = Math.max(-0.6, Math.min(0.6, pitch));

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(facingLeft ? -pitch : pitch);
      if (facingLeft) ctx.scale(-1, 1);
      ctx.globalAlpha = f.opacity;
      ctx.drawImage(im, -wd / 2, -ht / 2 + Math.sin(f.wobble) * ht * 0.06, wd, ht);
      ctx.restore();
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const diag = Math.hypot(W, H);
      const now = performance.now();

      // expire and nibble crumbs
      for (let i = crumbs.length - 1; i >= 0; i--) {
        const c = crumbs[i];
        if (now > c.until) {
          popCrumb(c, false);
          continue;
        }
        if (now - c.born < CRUMB_SETTLE_MS) continue;
        for (const f of fish) {
          if (now - f.nibbleAt < NIBBLE_COOLDOWN_MS) continue;
          if (Math.hypot(c.x - f.x, c.y - f.y) > 14) continue;
          f.nibbleAt = now;
          c.life -= 1;
          nibbleCrumb(c);
          if (c.life <= 0) popCrumb(c, true);
          break;
        }
      }

      if (bait) {
        const r = bait.getBoundingClientRect();
        baitPoint.x = r.left + r.width / 2;
        baitPoint.y = r.top + r.height / 2;
        baitPull = Math.min(1, baitPull + 0.03);
      } else {
        baitPull = Math.max(0, baitPull - 0.02);
      }

      const nearestCrumb = (f: Fish) => {
        let best: Crumb | null = null;
        let bd = Infinity;
        for (const c of crumbs) {
          const d = Math.hypot(c.x - f.x, c.y - f.y);
          if (d < bd) {
            bd = d;
            best = c;
          }
        }
        return best;
      };

      for (const f of fish) {
        f.wobble += f.wobbleSpeed;
        f.roamTimer += 1;
        if (f.roamTimer >= f.roamInterval) {
          f.roamTimer = 0;
          f.roamInterval = 90 + Math.floor(Math.random() * 110);
          f.roamAngle += (Math.random() - 0.5) * 2.5;
        }

        let target: number;
        let speed: number;
        const food = nearestCrumb(f);

        if (food) {
          const tx = food.x + f.offsetX * 0.28;
          const ty = food.y + f.offsetY * 0.28;
          const toFood = Math.atan2(ty - f.y, tx - f.x);
          target = lerpAngle(f.roamAngle, toFood, 0.85);
          speed = f.speed * 2.1;
          f.roamAngle = lerpAngle(f.roamAngle, toFood, 0.06);
        } else if (baitPull > 0.01) {
          const tx = baitPoint.x + f.offsetX;
          const ty = baitPoint.y + f.offsetY;
          const d = Math.hypot(tx - f.x, ty - f.y);
          const toBait = Math.atan2(ty - f.y, tx - f.x);
          // circle the bait once close instead of piling onto it
          const orbit = toBait + (d < 70 ? 1.25 : 0);
          target = lerpAngle(f.roamAngle, orbit, baitPull);
          speed = f.speed * (1 + baitPull * 1.1) * (d < 50 ? 0.5 : 1);
          f.roamAngle = lerpAngle(f.roamAngle, orbit, 0.02 * baitPull);
        } else if (mouse.on) {
          const dx = mouse.x - f.x;
          const dy = mouse.y - f.y;
          const d = Math.hypot(dx, dy);
          const k = Math.max(0, 1 - d / (diag * 0.65));
          const toMouse = Math.atan2(dy, dx);
          target = lerpAngle(f.roamAngle, toMouse, k * 0.9);
          speed = f.speed * (1 + k * 0.9);
          if (k > 0.1) f.roamAngle = lerpAngle(f.roamAngle, toMouse, 0.01);
        } else {
          target = f.roamAngle;
          speed = f.speed * 0.55;
        }

        f.angle = lerpAngle(f.angle, target, 0.035);
        f.x += Math.cos(f.angle) * speed;
        f.y += Math.sin(f.angle) * speed;

        const m = f.size * 2;
        if (f.x < -m) f.x = W + m;
        if (f.x > W + m) f.x = -m;
        if (f.y < -m) f.y = H + m;
        if (f.y > H + m) f.y = -m;

        draw(f);
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("focusin", onOver);
      document.removeEventListener("focusout", onOut);
      window.removeEventListener("dblclick", onDblClick);
      crumbs.forEach((c) => c.dot.remove());
    };
  }, []);

  return <canvas ref={canvasRef} {...stylex.props(styles.canvas)} />;
}
