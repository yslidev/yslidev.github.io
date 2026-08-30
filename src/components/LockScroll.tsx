"use client";

import { useEffect } from "react";

// The home page is a single card that never scrolls — the water fills the
// viewport behind it.
export default function LockScroll() {
  useEffect(() => {
    const { overflow, height } = document.body.style;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100svh";
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.height = height;
    };
  }, []);
  return null;
}
