// components/PWAInstaller.jsx
'use client';

import { useState, useEffect } from 'react';
import { FaMobileAlt, FaTimes } from 'react-icons/fa';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsStandalone(true);
      return;
    }

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
      localStorage.setItem('pwaPromptShown', 'true');
    };

    // Check Chrome for Android
    const isChrome = /chrome/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isChrome && isAndroid && !localStorage.getItem('pwaPromptShown')) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    // Show iOS instructions
    if (isIOSDevice && !localStorage.getItem('iosInstructionsShown')) {
      setShowBanner(true);
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
    }
  };

  const handleIOSInstall = () => {
    // Instructions for iOS
    alert(`To install this app on iOS:
1. Tap the Share button (⎙) at the bottom
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" in the top right
4. The app will appear on your home screen!`);
    localStorage.setItem('iosInstructionsShown', 'true');
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
    localStorage.setItem('pwaPromptShown', 'true');
    if (isIOS) localStorage.setItem('iosInstructionsShown', 'true');
  };

  if (isStandalone || !showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-white border-2 border-blue-500 shadow-2xl rounded-xl z-50 p-4 animate-slideUp">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <FaMobileAlt className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">
              {isIOS ? 'Install Our Medical App' : 'Install Dr. Shekari Clinic'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {isIOS 
                ? 'Get quick access to medical services'
                : 'Add to home screen for faster access & offline use'
              }
            </p>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="mt-3 flex space-x-2">
        {isIOS ? (
          <button
            onClick={handleIOSInstall}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            📱 Install on iOS
          </button>
        ) : (
          <button
            onClick={handleInstall}
            id="installPWA"
            className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            ⬇️ Install App
          </button>
        )}
        
        <button
          onClick={handleClose}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Later
        </button>
      </div>
      
      {isIOS && (
        <div className="mt-3 p-2 bg-blue-50 rounded-lg text-xs text-blue-800">
          <strong>Tip:</strong> Safari → Share → Add to Home Screen
        </div>
      )}
    </div>
  );
}