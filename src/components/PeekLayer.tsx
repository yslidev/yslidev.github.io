"use client";

import { useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../app/globalTokens.stylex";

// Hovering a [data-peek] phrase surfaces a photo beside the cursor.
// If the photo is missing the box simply never appears.

const styles = stylex.create({
  box: {
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 10,
    width: "clamp(180px, 20vw, 260px)",
    pointerEvents: "none",
    transition: "opacity .22s ease",
    willChange: "transform",
    display: { default: "block", "@media (max-width: 640px)": "none" },
  },
  on: { opacity: 1 },
  off: { opacity: 0 },
  img: {
    width: "100%",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    display: "block",
    backgroundColor: colors.tealDk,
    boxShadow: "0 18px 44px rgba(6, 28, 34, 0.3)",
  },
});

export default function PeekLayer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    const img = imgRef.current;
    if (!box || !img) return;

    let active: HTMLElement | null = null;

    const place = (e: MouseEvent) => {
      const w = box.offsetWidth || 240;
      const h = box.offsetHeight || 300;
      let x = e.clientX + 18;
      let y = e.clientY - h / 2;
      if (x + w > window.innerWidth - 12) x = e.clientX - w - 18;
      y = Math.max(12, Math.min(window.innerHeight - h - 12, y));
      box.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-peek]");
      if (!el || el === active) return;
      const src = el.dataset.peek;
      if (!src) return;
      active = el;
      img.src = src;
      img.alt = el.dataset.peekAlt ?? "";
      place(e);
    };

    const onMove = (e: MouseEvent) => {
      if (active) place(e);
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-peek]");
      if (el && el === active) {
        active = null;
        setVisible(false);
      }
    };

    // Only reveal once the photo has actually decoded — a missing file
    // leaves the box hidden instead of flashing an empty frame.
    const onLoad = () => {
      if (active) setVisible(true);
    };
    const onError = () => setVisible(false);

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onOut);
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      {...stylex.props(styles.box, visible ? styles.on : styles.off)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} alt="" {...stylex.props(styles.img)} />
    </div>
  );
}
