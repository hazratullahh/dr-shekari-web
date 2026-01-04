'use client';

import { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaMobileAlt } from 'react-icons/fa';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (isIOSDevice) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('hidePwaBanner') === 'true') setShowBanner(false);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') console.log('PWA installed successfully');
      setShowBanner(false);
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert('For iOS: Tap Share → Add to Home Screen');
    }
  };

  const handleClose = () => {
    setShowBanner(false);
    localStorage.setItem('hidePwaBanner', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#E9756D] to-[#FF8A80] text-white p-4 z-50 shadow-lg animate-slideUp">
      <div className="container mx-auto relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaMobileAlt className="text-2xl" />
            <div>
              <h3 className="font-semibold">Install Dr. Shekari App</h3>
              <p className="text-xs opacity-90">Get quick access to medical services</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleInstall}
              className="bg-white text-[#E9756D] text-xs px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <FaDownload /> Install Now
            </button>
          </div>
        </div>
      </div>
      {/* Close button fixed in top-right corner */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-1 right-1 text-red-500 hover:bg-white/20 rounded-full"
        title="Close"
      >
        <FaTimes size={16} color='red' />
      </button>
    </div>
  );
}
 