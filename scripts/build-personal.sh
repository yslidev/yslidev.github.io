#!/usr/bin/env bash
# Build the friends-and-family site (ysli.dev) from this same codebase, so the
# two sites share one design. Output: ./out, ready to publish as-is.
#
#   bash scripts/build-personal.sh
#
# The professional site (yushan.li) is the default `npm run build`.
set -euo pipefail
cd "$(dirname "$0")/.."

NEXT_PUBLIC_SITE=personal npx next build

cd out

# ysli.dev used to be the professional site, and its URLs are out in the
# world: on every CV sent before the split, in shared posts, in coursework.
# Each professional page becomes a redirect to the same path on yushan.li.
PRO_DIRS=(about cs180 desk project writing)
mapfile -t moved < <(find "${PRO_DIRS[@]}" -name index.html | sort)
rm -rf "${PRO_DIRS[@]}" sitemap.xml assets/photo-dipper.jpg

for page in "${moved[@]}"; do
  path="/${page%index.html}"
  target="https://yushan.li${path}"
  mkdir -p "$(dirname "$page")"
  cat > "$page" <<EOF
<!doctype html>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>moved to yushan.li</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<p>this page moved to <a href="${target}">yushan.li${path}</a>.</p>
EOF
done

# GitHub Pages can't redirect a PDF, so cv.pdf simply stays: old CVs link here.

echo "ysli.dev" > CNAME

# Branch-deployed GitHub Pages runs Jekyll, which skips directories starting
# with an underscore — that would drop _next/ and every script on the page.
touch .nojekyll

# Fail loudly if professional content ever leaks into this build: the only
# thing left under the professional directories should be redirect stubs.
leaks=$(find "${PRO_DIRS[@]}" -type f ! -exec grep -q 'moved to yushan.li' {} \; -print 2>/dev/null || true)
[[ -z "$leaks" ]] || { echo "build-personal: professional files survived: $leaks" >&2; exit 1; }
grep -q 'noindex' index.html || { echo "build-personal: index.html is missing noindex" >&2; exit 1; }
! grep -q 'application/ld+json' index.html || { echo "build-personal: structured data leaked" >&2; exit 1; }

echo "build-personal: ok — $(find . -type f | wc -l | tr -d ' ') files, ${#moved[@]} redirects to yushan.li"
