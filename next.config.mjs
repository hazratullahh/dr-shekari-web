import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // Native Node modules — keep them external so Turbopack/webpack don't
  // bundle them and (on Windows) don't try to create symlinks that require
  // Developer Mode. Each is only used in server runtime (API routes).
  serverExternalPackages: ['mongoose', 'mongodb', 'nodemailer', 'bson'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'dr-shekari.com' },
      { protocol: 'https', hostname: 'www.dr-shekari.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
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
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  experimental: {
    scrollRestoration: true,
  },

  // Silence a known harmless warning from next-intl's runtime locale loader.
  // The dynamic `import(t)` inside next-intl/dist/.../format/index.js can't be
  // statically analyzed for webpack's filesystem cache, but the import target
  // is server-only and resolves correctly at runtime — no incorrect cache
  // invalidation in practice. Suppress to keep the dev console clean.
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules[\\/]next-intl[\\/]/,
        message: /Parsing of .* for build dependencies failed at 'import\(/,
      },
      {
        module: /node_modules[\\/]next-intl[\\/]/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);