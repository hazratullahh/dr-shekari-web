const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dr- shekari.com';

const ROUTES = [
  { path: '', priority: 1.0, frequency: 'weekly' },
  { path: 'about', priority: 0.9, frequency: 'monthly' },
  { path: 'services', priority: 0.9, frequency: 'monthly' },
  { path: 'team', priority: 0.8, frequency: 'monthly' },
  { path: 'research', priority: 0.7, frequency: 'weekly' },
  { path: 'faq', priority: 0.7, frequency: 'monthly' },
  { path: 'appointment', priority: 0.95, frequency: 'monthly' },
  { path: 'contact', priority: 0.9, frequency: 'monthly' },
  { path: 'privacy- policy', priority: 0.3, frequency: 'yearly' },
  { path: 'terms', priority: 0.3, frequency: 'yearly' },
  { path: 'accessibility', priority: 0.3, frequency: 'yearly' },
  { path: 'disclaimer', priority: 0.3, frequency: 'yearly' },
];

const LOCALES = ['en', 'fa', 'ps'];

export default function sitemap() {
  const now = new Date();
  const entries = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const url = `${SITE}/${locale}${route.path ? `/${route.path}` : ''}`;
      const alternates = {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE}/${l}${route.path ? `/${route.path}` : ''}`])
        ),
      };

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route.frequency,
        priority: route.priority,
        alternates,
      });
    }
  }

  return entries;
}
