import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // The Blender extension's own site, keeping the rest of the path (/blender itself matches too)
      { source: '/blender/:path*', destination: 'https://timeline.platformlessai.org/:path*', permanent: true },
      // Written into the signed Content Credentials of every clip Platformless AI for Blender delivers.
      // These must keep working for as long as those clips exist: never remove them or reuse the paths.
      { source: '/verify', destination: 'https://timeline.platformlessai.org/verify', permanent: true },
      { source: '/how-to-detect', destination: 'https://timeline.platformlessai.org/how-to-detect', permanent: true },
    ];
  },
};

export default nextConfig;
