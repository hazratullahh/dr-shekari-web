// next.config.mjs - FOR NEXT.JS 16
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 'swcMinify' is no longer needed in Next.js 16 - it's enabled by default
  // 'api' configuration is no longer valid in Next.js 16
  
  // ===== IMAGE OPTIMIZATION =====
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dr-shekari.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.dr-shekari.com',
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  
  // ===== PERFORMANCE OPTIMIZATIONS =====
  compress: true,
  poweredByHeader: false,
  
  // ===== TRAILING SLASH =====
  trailingSlash: false,
  
  // ===== REDIRECTS FOR SEO =====
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
      {
        source: '/main',
        destination: '/',
        permanent: true,
      },
      
      // Doctor name misspellings
      {
        source: '/dr-nazer-shekari',
        destination: '/doctors/dr-nazir-shekari',
        permanent: true,
      },
      {
        source: '/dr-nazir-shekhari',
        destination: '/doctors/dr-nazir-shekari',
        permanent: true,
      },
      {
        source: '/dr-mansoor-weyar',
        destination: '/doctors/dr-mansour-wayar',
        permanent: true,
      },
      {
        source: '/dr-mansoor-wayar',
        destination: '/doctors/dr-mansour-wayar',
        permanent: true,
      },
      
      // Medical term misspellings
      {
        source: '/urohlogy',
        destination: '/urology',
        permanent: true,
      },
      {
        source: '/urohlogist',
        destination: '/urologist',
        permanent: true,
      },
      {
        source: '/androlagy',
        destination: '/andrology',
        permanent: true,
      },
      {
        source: '/androligist',
        destination: '/andrologist',
        permanent: true,
      },
      {
        source: '/kidny',
        destination: '/kidney',
        permanent: true,
      },
      {
        source: '/prostat',
        destination: '/prostate',
        permanent: true,
      },
      
      // Location-based
      {
        source: '/kabul-urologist',
        destination: '/location/kabul',
        permanent: true,
      },
      {
        source: '/kabul-urology',
        destination: '/location/kabul',
        permanent: true,
      },
      {
        source: '/afghanistan-urology',
        destination: '/location/afghanistan',
        permanent: true,
      },
      
      // Services
      {
        source: '/kidney-ston',
        destination: '/services/kidney-stones',
        permanent: true,
      },
      {
        source: '/kidne-stones',
        destination: '/services/kidney-stones',
        permanent: true,
      },
      {
        source: '/prostate-cancer-treatment',
        destination: '/services/prostate-cancer',
        permanent: true,
      },
      {
        source: '/male-infertility',
        destination: '/services/infertility',
        permanent: true,
      },
      
      // Old URLs
      {
        source: '/clinic',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/team',
        permanent: true,
      },
      // {
      //   source: '/treatments',
      //   destination: '/services',
      //   permanent: true,
      // },
    ];
  },
  
  // ===== SECURITY HEADERS =====
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
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
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
      },
      {
        key: 'X-Permitted-Cross-Domain-Policies',
        value: 'none'
      },
    ];
    
    const pwaHeaders = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, stale-while-revalidate=86400'
      },
    ];

    return [
      {
        source: '/:path*',
        headers: [...securityHeaders, ...pwaHeaders],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable'
          }
        ]
      },
      { 
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800'
          }
        ]
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
    ];
  },
  
  // ===== WEBPACK OPTIMIZATIONS =====
  webpack: (config, { isServer, dev }) => {
    config.plugins = config.plugins || [];
    
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxSize: 200000,
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom|react-is|scheduler)[\\/]/,
            priority: 40,
          },
          next: {
            name: 'next',
            test: /[\\/]node_modules[\\/](next)[\\/]/,
            priority: 30,
          },
        },
      },
    };
    
    return config;
  },
  
  // ===== ENVIRONMENT VARIABLES =====
  env: {
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-shekari.com',
    GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_ID,
    GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@dr-shekari.com',
    CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+93 79 245 3030',
  },
  
  // ===== EXPERIMENTAL FEATURES - FIXED FOR NEXT 16 =====
  experimental: {
    // Remove nextScriptWorkers or install Partytown
    // nextScriptWorkers: true, // REMOVE THIS or install @builder.io/partytown
    optimizeCss: true,
    scrollRestoration: true,
    // For Next.js 16, you might want these:
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },
  
  // ===== PRODUCTION OPTIMIZATIONS =====
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
  }),
};

const pwaOptions = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
};

export default withPWA(pwaOptions)(nextConfig);