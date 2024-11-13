/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable React Strict Mode in development
  swcMinify: true,        // Enable SWC minification for faster JavaScript loading
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.interimhc.com', // Adding the external domain
        pathname: '/uploads/**',         // Allow all uploads from this domain
      },
    ],
    formats: ['image/avif', 'image/webp'], // Use modern image formats for optimized loading
  },

  // Cache-Control Headers
  async headers() {
    return [
      {
        source: '/_next/static/(.*)', // Apply cache headers to static Next.js assets
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for one year
          },
        ],
      },
      {
        source: '/uploads/(.*)', // Apply headers for Strapi images if served statically
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // Cache for 1 day (adjust as needed)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
