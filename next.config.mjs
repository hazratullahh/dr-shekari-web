/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dr-shekari.com' },
      { protocol: 'https', hostname: 'www.dr-shekari.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },

  trailingSlash: false,

  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/main', destination: '/', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
