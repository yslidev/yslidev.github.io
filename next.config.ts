import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  // Emit each route as <route>/index.html rather than <route>.html. Needed
  // because /writing is now both a route and a directory (it holds the
  // self-hosted article at /writing/x-recsys/): without this, a request for
  // /writing redirects into the directory and finds no index.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
