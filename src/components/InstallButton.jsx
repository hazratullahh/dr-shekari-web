'use client';

import { useState, useEffect } from 'react';
import { FaDownload, FaMobileAlt, FaTimes } from 'react-icons/fa';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

    // Check iOS
    const isIOSDevice = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    setIsIOS(isIOSDevice);

    // Listen for install prompt (Android/Desktop Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
      console.log('PWA install prompt available');
    };

    // Check Chrome for Android
    const isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    const isAndroid = /android/.test(navigator.userAgent.toLowerCase());

    if ((isChrome && isAndroid) || !isIOSDevice) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    // Show button after 5 seconds if not iOS
    if (!isIOSDevice) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show install prompt
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted PWA install');
        setShowButton(false);
      }
      
      setDeferredPrompt(null);
    } else if (isIOS) {
      // Show iOS instructions
      alert(`📱 To install this app on iPhone/iPad:
      
1. Tap the Share button (⎙) at the bottom
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" in the top right
4. The app will appear on your home screen!

You can then open it like a regular app.`);
    } else {
      // Fallback instructions
      alert(`To install this app:
      
For Android/Chrome:
• Tap the menu (⋮) in Chrome
• Tap "Install app" or "Add to Home Screen"

For iOS/Safari:
• Tap Share (⎙) at the bottom
• Tap "Add to Home Screen"`);
    }
  };

  const handleClose = () => {
    setShowButton(false);
    // Save to localStorage so we don't show again for 7 days
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  // Don't show if already installed or recently dismissed
  if (isStandalone || !showButton) return null;

  // Check if dismissed in last 7 days
  const lastDismissed = localStorage.getItem('pwaPromptDismissed');
  if (lastDismissed && (Date.now() - parseInt(lastDismissed)) < 7 * 24 * 60 * 60 * 1000) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fadeIn">
      <div className="relative">
        {/* Floating Install Button */}
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-2 bg-gradient-to-r from-[#E9756D] to-[#FF8A80] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold animate-pulse"
          title="Install App"
        >
          <FaDownload className="text-lg" />
          <span className="hidden sm:inline">Install App</span>
          <FaMobileAlt className="text-lg" />
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white text-gray-800 p-3 rounded-lg shadow-xl hidden sm:block animate-slideUp">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-[#E9756D]">📱 Get Our App</h4>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              <FaTimes />
            </button>
          </div>
          <p className="text-sm mb-2">Install for quick access to medical services</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Works offline</li>
            <li>✓ Fast loading</li>
            <li>✓ App-like experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}