# ysli.dev → yushan.li

The whole of the `yslidev/ysli.dev` repo. It isn't deployed from here; this copy
is the source of truth.

ysli.dev was the site's address before it moved to yushan.li, and old links
still point at it: résumés, applications, CS 180 submissions. Every path
redirects to the same path on yushan.li, so `ysli.dev/cs180/project1/` lands
on `yushan.li/cs180/project1/`.

- `404.html` does the work. GitHub Pages serves it for any path that doesn't
  exist in the repo, and a script swaps the domain while keeping the path.
- `index.html` is the same file, for the bare domain.
- `CNAME` claims ysli.dev for the repo's Pages site.

Setup: create a public repo `yslidev/ysli.dev`, upload these files, then in
Settings → Pages set the source to deploy from the `main` branch with custom
domain `ysli.dev`, and enforce HTTPS.
