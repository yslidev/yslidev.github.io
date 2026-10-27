"use client";

import { useId, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../app/globalTokens.stylex";

// The home card stays short; "more" opens the fuller story underneath. The
// panel's text is in the page from the start, so search engines read it too.

const styles = stylex.create({
  toggle: {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "1px 3px",
    marginLeft: -3,
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": colors.orange },
    color: { default: colors.orangeInk, ":hover": colors.ink },
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "lowercase",
    cursor: "pointer",
  },
  // Animating grid rows 0fr -> 1fr opens to the content's real height.
  panel: {
    display: "grid",
    gridTemplateRows: "0fr",
    opacity: 0,
    transition:
      "grid-template-rows .5s cubic-bezier(.16,1,.3,1), opacity .4s ease",
  },
  panelOpen: { gridTemplateRows: "1fr", opacity: 1 },
  clip: { overflow: "hidden", minHeight: 0 },
  body: { paddingTop: 14 },
});

export default function More({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <button
        type="button"
        data-fish
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        {...stylex.props(styles.toggle)}
      >
        {open ? "less" : "more"}
      </button>
      <div id={id} inert={!open} {...stylex.props(styles.panel, open && styles.panelOpen)}>
        <div {...stylex.props(styles.clip)}>
          <div {...stylex.props(styles.body)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
