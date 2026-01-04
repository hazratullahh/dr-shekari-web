export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-shekari.com';
  
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay: 10
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;
  
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}