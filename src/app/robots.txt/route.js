// app/robots.txt/route.js - Dynamic robots.txt
import { NextResponse } from 'next/server';

export async function GET() {
  const robots = `# https://dr-shekari.com/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://dr-shekari.com/sitemap.xml

# Crawl-delay: 10

User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /api/

User-agent: Yandex
Disallow: /`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}