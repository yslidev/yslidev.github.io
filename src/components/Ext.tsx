import * as stylex from "@stylexjs/stylex";
import { ui } from "./ui";

// An outbound link in the site's persimmon style. `peek` shows a photo beside
// the cursor on hover (see PeekLayer); every link also baits the fish.
export default function Ext({
  href,
  peek,
  alt,
  children,
}: {
  href: string;
  peek?: string;
  alt?: string;
  children: React.ReactNode;
}) {
  const external = !href.startsWith("/");
  return (
    <a
      data-fish
      data-peek={peek}
      data-peek-alt={alt}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...stylex.props(ui.link)}
    >
      {children}
    </a>
  );
}
