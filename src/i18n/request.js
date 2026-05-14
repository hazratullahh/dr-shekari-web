import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

function deepMerge(base, override) {
  const out = { ...base };
  for (const key of Object.keys(override || {})) {
    const a = base?.[key];
    const b = override[key];
    if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
      out[key] = deepMerge(a, b);
    } else {
      out[key] = b;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fallback = (await import('../../messages/en.json')).default;

  let localeMessages = fallback;
  if (locale !== 'en') {
    try {
      localeMessages = (await import(`../../messages/${locale}.json`)).default;
    } catch {
      localeMessages = {};
    }
  }

  // English fills in any keys the locale file is missing -prevents broken UI
  // when translators haven't backfilled new strings yet.
  const messages = deepMerge(fallback, localeMessages);

  return {
    locale,
    messages,
    onError(error) {
      if (error?.code === 'MISSING_MESSAGE') return;
      console.error(error);
    },
    getMessageFallback({ key }) {
      return key;
    },
  };
});
