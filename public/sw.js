/**
 * Dr. Shekari Clinic — Service Worker
 *
 * Strategies:
 *  - Static assets (/_next/static/*, /icons/*, /images/*) → Cache First
 *  - HTML navigations → Network First, falling back to cache, falling back to /offline
 *  - APIs (GET /api/*) → Network First with short cache
 *  - Same-origin fonts/css/js → Stale While Revalidate
 *  - Anything else → network passthrough
 */

const VERSION = 'dr-shekari-v4';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const HTML_CACHE = `html-${VERSION}`;
const API_CACHE = `api-${VERSION}`;
const ALL_CACHES = new Set([STATIC_CACHE, RUNTIME_CACHE, HTML_CACHE, API_CACHE]);

// Note: '/' is intentionally excluded — it always 30x-redirects to a locale,
// and Cache.add() rejects redirected responses (and serving one for a
// navigation would trigger ERR_FAILED in Chrome).
const PRECACHE_URLS = [
  '/en',
  '/en/offline',
  '/fa/offline',
  '/ps/offline',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

const OFFLINE_FALLBACKS = {
  fa: '/fa/offline',
  ps: '/ps/offline',
  en: '/en/offline',
};

const HTML_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 1 day
const API_CACHE_MAX_AGE_MS = 5 * 60 * 1000;        // 5 minutes
const HTML_CACHE_MAX_ENTRIES = 60;
const API_CACHE_MAX_ENTRIES = 30;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      // Pre-cache opportunistically; one failed asset shouldn't break install.
      await Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { credentials: 'same-origin' })).catch(() => null)
        )
      );
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !ALL_CACHES.has(k)).map((k) => caches.delete(k))
      );
      if (self.registration.navigationPreload) {
        try { await self.registration.navigationPreload.enable(); } catch {}
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache the SW itself or the bypass file
  if (url.pathname === '/sw.js' || url.pathname === '/sw.js.map') return;

  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(handleNavigation(event));
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApi(req));
    return;
  }

  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.match(/\.(?:png|jpg|jpeg|svg|webp|avif|ico|woff2?|ttf)$/)
  ) {
    event.respondWith(cacheFirst(req, RUNTIME_CACHE));
    return;
  }

  if (url.pathname.match(/\.(?:js|css)$/) || url.pathname.startsWith('/_next/')) {
    event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
    return;
  }
});

async function handleNavigation(event) {
  const req = event.request;
  try {
    const preload = event.preloadResponse ? await event.preloadResponse : null;
    const network = preload || (await fetch(req));

    // A SW cannot return a redirected response for a navigation — Chrome
    // rejects it with ERR_FAILED. Hand the redirect back to the browser
    // so it does a fresh navigation to the final URL.
    if (network && network.redirected) {
      return Response.redirect(network.url, 302);
    }

    if (network && network.ok) {
      const cache = await caches.open(HTML_CACHE);
      cache.put(req, network.clone()).catch(() => {});
      trimCache(HTML_CACHE, HTML_CACHE_MAX_ENTRIES);
      return network;
    }
    throw new Error(`bad status ${network && network.status}`);
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached; // freshness already enforced by HTML_CACHE_MAX_AGE_MS via trim
    const url = new URL(req.url);
    const localeMatch = url.pathname.match(/^\/(en|fa|ps)(\/|$)/);
    const localeKey = localeMatch ? localeMatch[1] : 'en';
    const offline = await caches.match(OFFLINE_FALLBACKS[localeKey]);
    if (offline) return offline;
    return new Response(
      `<!doctype html><meta charset="utf-8"><title>Offline</title><body style="font-family:system-ui;padding:40px;text-align:center"><h1>You're offline</h1><p>Please check your connection and try again.</p></body>`,
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

async function handleApi(req) {
  const cache = await caches.open(API_CACHE);
  try {
    const network = await fetch(req);
    if (network && network.ok) {
      cache.put(req, network.clone()).catch(() => {});
      trimCache(API_CACHE, API_CACHE_MAX_ENTRIES);
    }
    return network;
  } catch {
    const cached = await cache.match(req);
    if (cached && isFresh(cached, API_CACHE_MAX_AGE_MS)) return cached;
    return new Response(
      JSON.stringify({ ok: false, offline: true, error: 'You appear to be offline.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const network = await fetch(req);
    if (network && network.ok) cache.put(req, network.clone()).catch(() => {});
    return network;
  } catch {
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const networkPromise = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => null);
  return cached || networkPromise || Response.error();
}

function isFresh(response, maxAgeMs) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return true; // be lenient
  const ts = Date.parse(dateHeader);
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts < maxAgeMs;
}

async function trimCache(name, maxEntries) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const overflow = keys.length - maxEntries;
  for (let i = 0; i < overflow; i++) {
    await cache.delete(keys[i]);
  }
}
