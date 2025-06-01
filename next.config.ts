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
        port: '',
        pathname: '/storage/images/products/**',
      },
    ],
  },
}

export default nextConfig
