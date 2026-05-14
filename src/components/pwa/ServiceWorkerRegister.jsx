'use client';

import { useEffect } from 'react';

// Service worker disabled. This component now actively cleans up any SW
// that was installed by previous deploys (v3/v4/v5) so users stop hitting
// the offline page / ERR_FAILED. The kill- switch /sw.js will also clean
// up cache storage when it activates.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    let cancelled = false;

    const cleanup = async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        // Trigger an update check so the kill- switch /sw.js installs and
        // deletes its caches via its activate handler.
        await Promise.all(regs.map((r) => r.update().catch(() => null)));
        // Then unregister everything outright.
        await Promise.all(regs.map((r) => r.unregister().catch(() => null)));
      } catch {}

      try {
        if (typeof caches !== 'undefined') {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k).catch(() => null)));
        }
      } catch {}
    };

    // When the kill- switch SW takes control or unregisters, the controller
    // changes - reload once so the page is rendered without any SW in the
    // way. sessionStorage guards against a refresh loop.
    const onControllerChange = () => {
      if (sessionStorage.getItem('sw- cleanup- done') === '1') return;
      sessionStorage.setItem('sw- cleanup- done', '1');
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    if (document.readyState === 'complete') {
      cleanup();
    } else {
      const onLoad = () => { if (!cancelled) cleanup(); };
      window.addEventListener('load', onLoad, { once: true });
      return () => {
        window.removeEventListener('load', onLoad);
        navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
        cancelled = true;
      };
    }

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      cancelled = true;
    };
  }, []);

  return null;
}
