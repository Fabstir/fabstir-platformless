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
    ];
  },
};

export default nextConfig;
