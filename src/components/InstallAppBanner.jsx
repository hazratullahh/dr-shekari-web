'use client';

import { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaMobileAlt } from 'react-icons/fa';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Don't show if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check iOS
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after 10 seconds
      setTimeout(() => setShowBanner(true), 10000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show banner for iOS after 10 seconds
    if (isIOSDevice) {
      setTimeout(() => setShowBanner(true), 10000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('PWA installed successfully');
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      alert('For iOS: Tap Share → Add to Home Screen');
    }
  };

  const handleClose = () => {
    setShowBanner(false);
    // Don't show again for 30 days
    localStorage.setItem('hidePwaBanner', 'true');
  };

  // Check if user dismissed before
  useEffect(() => {
    if (localStorage.getItem('hidePwaBanner') === 'true') {
      setShowBanner(false);
    }
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#E9756D] to-[#FF8A80] text-white p-4 z-50 shadow-lg animate-slideUp">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaMobileAlt className="text-2xl" />
          <div>
            <h3 className="font-bold">Install Dr. Shekari Clinic App</h3>
            <p className="text-sm opacity-90">Get quick access to medical services</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstall}
            className="bg-white text-[#E9756D] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
          >
            <FaDownload /> Install Now
          </button>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white/20 p-2 rounded-full"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}