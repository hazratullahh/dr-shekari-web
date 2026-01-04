export async function GET() {
  const baseUrl = 'https://dr-shekari.com';
  const today = new Date().toISOString().split('T')[0];

  const doctors = [
    {
      name: 'Dr. Nazir Ahmad Shekari',
      slug: '/team/dr-nazir-ahmad-shekari',
      image: '/images/doctors/dr-nazir-ahmad-shekari.jpg',
      specialty: 'Urologist & Surgeon',
    },
    {
      name: 'Dr. Mansour Ahmad Wayar',
      slug: '/team/dr-mansour-ahmad-wayar',
      image: '/images/doctors/dr-mansour-ahmad-wayar.jpg',
      specialty: 'Urology Specialist',
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

${doctors.map(d => `
  <url>
    <loc>${baseUrl}${d.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>

    <image:image>
      <image:loc>${baseUrl}${d.image}</image:loc>
      <image:title>${d.name}</image:title>
      <image:caption>${d.specialty}</image:caption>
    </image:image>

    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${d.slug}" />
  </url>
`).join('')}

</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
