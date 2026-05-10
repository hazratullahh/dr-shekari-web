// Kill switch.
//
// Existing visitors have older SWs (v3/v4/v5) installed in their browsers,
// each of which has been intercepting navigations and breaking pages. The
// browser checks /sw.js for updates on every visit; this file replaces the
// old worker, takes control immediately, deletes every cache it created,
// then unregisters itself. After that, fetches go straight to the network
// like any non-PWA site.
//
// This file should stay in place for at least a few weeks so returning
// users get cleaned up. Once you're confident no clients have an old
// registration, you can delete it.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch {}
    try {
      await self.registration.unregister();
    } catch {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        // controllerchange in the page will catch this and reload.
        client.postMessage({ type: 'sw-killed' });
      }
    } catch {}
  })());
});

// No fetch handler — every request goes to the network.
