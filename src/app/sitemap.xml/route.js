import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://dr-shekari.com';
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.9, changefreq: 'weekly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/urology', priority: 0.8 },
    { url: '/services/andrology', priority: 0.8 },
    { url: '/services/endourology', priority: 0.8 },
    { url: '/team', priority: 0.7 },
    { url: '/contact', priority: 0.9, changefreq: 'monthly' },
    { url: '/privacy-policy', priority: 0.3 },
    { url: '/terms-of-service', priority: 0.3 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq || 'monthly'}</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>
  `).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}