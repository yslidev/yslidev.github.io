// One codebase, two sites, one design.
//
//   yushan.li — professional: research, work, investing, cv.
//   ysli.dev  — friends and family: unlisted, warmer, the substack essays.
//
// A build is the professional site unless NEXT_PUBLIC_SITE=personal, which
// scripts/build-personal.sh sets. Keep the sites' styling shared; only their
// content and navigation should branch on this.
export const isPersonal = process.env.NEXT_PUBLIC_SITE === "personal";

export const SITE_URL = isPersonal ? "https://ysli.dev" : "https://yushan.li";
