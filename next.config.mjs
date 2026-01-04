
/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dr-shekari.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.56.1',
        pathname: '/**',
      },
    ],
  },
  
  compress: true,
  poweredByHeader: false,
  
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};

export default pwaConfig(nextConfig);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
  
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'dr-shekari.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         pathname: '/**',
//       },
//       {
//         protocol: 'http',
//         hostname: '192.168.56.1',
//         pathname: '/**',
//       },
//     ],
//   },
  
//   compress: true,
//   poweredByHeader: false,
  
//   async redirects() {
//     return [
//       {
//         source: '/index',
//         destination: '/',
//         permanent: true,
//       },
//       {
//         source: '/home',
//         destination: '/',
//         permanent: true,
//       },
//     ];
//   },
// };

// export default nextConfig;