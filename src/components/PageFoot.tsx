import * as stylex from "@stylexjs/stylex";
import { ui } from "./ui";

export const contactLinks = [
  { label: "github", href: "https://github.com/yslidev" },
  { label: "linkedin", href: "https://linkedin.com/in/liyushan27" },
  { label: "substack", href: "https://liyushan27.substack.com" },
  { label: "yushanli@berkeley.edu", href: "mailto:yushanli@berkeley.edu" },
];

export default function PageFoot() {
  return (
    <div {...stylex.props(ui.foot)}>
      {contactLinks.map((l) => (
        <a
          key={l.label}
          data-fish
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          {...stylex.props(ui.link, ui.footLink)}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
