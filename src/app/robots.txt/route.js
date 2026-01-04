// app/robots.txt/route.js - Dynamic robots.txt for Medical Clinic SEO
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-shekari.com';
  
  const robotsTxt = `# robots.txt - Dr. Nazir Shekari & Dr. Mansour Wayar Urology Center
# Generated: ${new Date().toISOString().split('T')[0]}
# Medical Clinic: Afghanistan's Premier Urology Specialists

# ========================
# PRIMARY DIRECTIVES
# ========================
User-agent: *
Allow: /
Crawl-delay: 3
Clean-param: ref /search/
Clean-param: sessionId /appointment/

# Disallowed sections
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /private/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-login.php
Disallow: /wp-signup.php
Disallow: /search?*
Disallow: /?s=*
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /*?replytocom=
Disallow: /*.js$
Disallow: /*.css$
Disallow: /*.php$

# ========================
# SEARCH ENGINE SPECIFIC
# ========================

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 2
Disallow: /api/
Disallow: /admin/
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.docx$

User-agent: Googlebot-Image
Allow: /
Crawl-delay: 2
Disallow: /api/
Disallow: /admin/

User-agent: Googlebot-Mobile
Allow: /
Crawl-delay: 2

User-agent: Googlebot-News
Allow: /
Crawl-delay: 1

User-agent: Googlebot-Video
Allow: /
Crawl-delay: 2

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 2
Disallow: /api/
Disallow: /admin/
Disallow: /*.exe$
Disallow: /*.zip$
Disallow: /*.rar$

User-agent: MSNBot
Allow: /
Crawl-delay: 3

User-agent: MSNBot-Media
Allow: /
Crawl-delay: 3

# Yandex
User-agent: Yandex
Allow: /
Crawl-delay: 3
Disallow: /api/
Disallow: /admin/
Clean-param: from /search/
Clean-param: text /search/

User-agent: YandexImages
Allow: /
Crawl-delay: 3

# Baidu
User-agent: Baiduspider
Allow: /
Crawl-delay: 5
Disallow: /api/
Disallow: /admin/

User-agent: Baiduspider-image
Allow: /
Crawl-delay: 5

# DuckDuckGo
User-agent: DuckDuckBot
Allow: /
Crawl-delay: 2

# Apple
User-agent: Applebot
Allow: /
Crawl-delay: 2

# Facebook
User-agent: facebookexternalhit
Allow: /
Crawl-delay: 3

User-agent: Facebot
Allow: /
Crawl-delay: 3

# Twitter
User-agent: Twitterbot
Allow: /
Crawl-delay: 2

# LinkedIn
User-agent: LinkedInBot
Allow: /
Crawl-delay: 3

# Pinterest
User-agent: Pinterest
Allow: /
Crawl-delay: 3

# ========================
# HARMFUL BOTS & SCRAPERS
# ========================
User-agent: AhrefsBot
Disallow: /
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /
Crawl-delay: 10

User-agent: SemrushBot
Disallow: /
Crawl-delay: 10

User-agent: DotBot
Disallow: /
Crawl-delay: 10

User-agent: MauiBot
Disallow: /
Crawl-delay: 10

User-agent: BLEXBot
Disallow: /
Crawl-delay: 10

User-agent: ia_archiver
Disallow: /

User-agent: zgrab
Disallow: /

User-agent: Java
Disallow: /

User-agent: Python-urllib
Disallow: /

User-agent: curl
Disallow: /

User-agent: wget
Disallow: /

# ========================
# MEDICAL-SPECIFIC BOTS
# ========================
User-agent: CCBot
Allow: /
Crawl-delay: 2

User-agent: GPTBot
Allow: /
Crawl-delay: 2

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /
Crawl-delay: 2

User-agent: ClaudeBot
Allow: /
Crawl-delay: 2

# ========================
# SITEMAP REFERENCES
# ========================

# Main sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Image sitemap
Sitemap: ${baseUrl}/sitemap-image.xml

# Video sitemap
Sitemap: ${baseUrl}/sitemap-video.xml

# News sitemap (if applicable)
Sitemap: ${baseUrl}/sitemap-news.xml

# ========================
# HOST & PREFERENCE
# ========================
Host: ${baseUrl.replace(/https?:\/\//, '')}

# Preferred domain (canonical)
# Use either www or non-www consistently
${
  baseUrl.includes('www.') 
    ? 'Preferred: www\n' 
    : 'Preferred: non-www\n'
}

# ========================
# ADDITIONAL NOTES
# ========================
# This medical website contains sensitive health information
# Rate limiting is implemented to ensure server stability
# Medical content is frequently updated - please index regularly

# Contact for crawl issues: webmaster@dr-shekari.com
# Medical Content License: All rights reserved`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noarchive',
      'Content-Language': 'en',
      'Last-Modified': new Date().toUTCString(),
    },
  });
}