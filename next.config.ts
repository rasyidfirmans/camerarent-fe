import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'laravel.local',
      },
    ],
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
