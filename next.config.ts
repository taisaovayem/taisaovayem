import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  distDir: 'docs',
  assetPrefix: '/docs',
  rewrites() {
    return Promise.resolve([
      { source: '/docs/_next/:path*', destination: '/_next/:path*' }
    ])
  }
};

export default nextConfig;
