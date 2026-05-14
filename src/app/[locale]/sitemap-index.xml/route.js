//app/sitemap-index.xml
export async function GET() {
  const baseUrl = 'https://dr-shekari.com';
  const today = new Date().toISOString().split('T')[0];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <sitemap>
    <loc>${baseUrl}/sitemap-doctors.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <sitemap>
    <loc>${baseUrl}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <sitemap>
    <loc>${baseUrl}/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>

</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
