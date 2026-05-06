'use client';

import { useEffect, useState } from 'react';

export function useStandalone() {
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(display-mode: standalone)');
    const update = () => {
      const isStandalone =
        mq.matches ||
        // iOS Safari
        window.navigator.standalone === true;
      setStandalone(isStandalone);
    };
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return standalone;
}

export function useOnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return online;
}

export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = window.navigator.userAgent || '';
    const platform = window.navigator.platform || '';
    const ios = /iphone|ipad|ipod/i.test(ua) ||
      (platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad iOS 13+
    setIsIOS(ios);
  }, []);
  return isIOS;
}
