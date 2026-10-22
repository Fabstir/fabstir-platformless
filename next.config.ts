import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // The Blender extension's own site
      { source: '/blender', destination: 'https://timeline.platformlessai.org', permanent: true },
    ];
  },
};

export default nextConfig;
