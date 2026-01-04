import APP_CONFIG from "../config/app-config";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-shekari.com';
  const today = new Date().toISOString().split('T')[0];
  APP_CONFIG
  // Generate all dynamic URLs
  const urls = [
    // Main pages
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.9', changefreq: 'weekly' },
    { url: '/team', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.9', changefreq: 'monthly' },
    
    // Doctor profiles
    { url: '/doctors/dr-nazir-shekari', priority: '0.9', changefreq: 'weekly' },
    { url: '/doctors/dr-mansour-wayar', priority: '0.9', changefreq: 'weekly' },
    
    // // Services
    // { url: '/services/kidney-stones', priority: '0.8', changefreq: 'weekly' },
    // { url: '/services/prostate-cancer', priority: '0.8', changefreq: 'weekly' },
    // { url: '/services/male-infertility', priority: '0.8', changefreq: 'weekly' },
    // { url: '/services/erectile-dysfunction', priority: '0.8', changefreq: 'weekly' },
    // { url: '/services/circumcision', priority: '0.7', changefreq: 'monthly' },
    // { url: '/services/vasectomy', priority: '0.7', changefreq: 'monthly' },
    
    // Locations
    { url: '/location/kabul', priority: '0.8', changefreq: 'monthly' },
    { url: '/location/herat', priority: '0.7', changefreq: 'monthly' },
    { url: '/location/kandahar', priority: '0.7', changefreq: 'monthly' },
    { url: '/location/mazar-e-sharif', priority: '0.7', changefreq: 'monthly' },
    
    // Information pages
    { url: '/blog', priority: '0.7', changefreq: 'daily' },
    { url: '/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/appointment', priority: '0.9', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
  
  ${urls.map(item => `
  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${item.url}" />
    <xhtml:link rel="alternate" hreflang="fa" href="${baseUrl}/fa${item.url}" />
    <xhtml:link rel="alternate" hreflang="ps" href="${baseUrl}/ps${item.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${item.url}" />
  </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}