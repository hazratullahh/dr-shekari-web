import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://dr-shekari.com';
  
  // Pages with priority and changefreq
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.9, changefreq: 'weekly' },
    { url: '/team', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.9, changefreq: 'monthly' },
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms', priority: 0.3, changefreq: 'yearly' },
  ];

  // Generate XML sitemap dynamically
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
