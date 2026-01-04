'use client';

import { useState, useEffect } from 'react';
import { X, Download, Smartphone, Calendar, Check } from 'lucide-react';

export default function InstallAppBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false);

  useEffect(() => {
    // Don't show on server-side
    if (typeof window === 'undefined') return;

    // Multiple ways to detect if PWA is already installed
    const checkIfInstalled = () => {
      // Method 1: Check display mode
      const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
      
      // Method 2: Check for iOS standalone mode
      const isIOSStandalone = 'standalone' in navigator && navigator.standalone;
      
      // Method 3: Check for URL bar (not perfect but helpful)
      const hasUrlBar = window.innerHeight < window.outerHeight;
      
      // Method 4: Check if app was launched from home screen (iOS)
      const isLaunchedFromHomeScreen = window.navigator.standalone === true;
      
      // Method 5: Check for Android PWA (viewport height trick)
      const isAndroidPWA = window.matchMedia('(display-mode: standalone)').matches || 
                          (!hasUrlBar && window.matchMedia('(min-width: 320px)').matches);
      
      // Method 6: Check for specific PWA features
      const isPWAMode = window.matchMedia('(display-mode: standalone)').matches ||
                       window.matchMedia('(display-mode: fullscreen)').matches ||
                       window.matchMedia('(display-mode: minimal-ui)').matches;
      
      // Return true if ANY of these conditions suggest the app is installed
      return isStandaloneDisplay || 
             isIOSStandalone || 
             isLaunchedFromHomeScreen || 
             isAndroidPWA ||
             isPWAMode;
    };

    // Check immediately and also listen for changes
    const installed = checkIfInstalled();
    if (installed) {
      console.log('App is already installed, hiding banner');
      setIsAlreadyInstalled(true);
      setIsStandalone(true);
      return;
    }

    // Set up a resize listener to detect changes (e.g., when user installs)
    const handleResize = () => {
      const nowInstalled = checkIfInstalled();
      if (nowInstalled && !isAlreadyInstalled) {
        setIsAlreadyInstalled(true);
        setIsStandalone(true);
        setShowBanner(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Check if user has dismissed the banner
    const dismissedTime = localStorage.getItem('pwaBannerDismissed');
    if (dismissedTime) {
      const dismissedDate = new Date(dismissedTime);
      const now = new Date();
      const daysSinceDismiss = (now - dismissedDate) / (1000 * 60 * 60 * 24);
      
      if (daysSinceDismiss < 7) {
        setIsDismissed(true);
        return;
      } else {
        // Clear old dismissal if more than 7 days
        localStorage.removeItem('pwaBannerDismissed');
      }
    }

    // Check for iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    // Set a flag to track if we've shown the banner in this session
    const shownInSession = sessionStorage.getItem('pwaBannerShown');
    
    if (!shownInSession && !isAlreadyInstalled) {
      // For iOS, show banner if not installed
      if (iOS) {
        setTimeout(() => {
          setShowBanner(true);
          sessionStorage.setItem('pwaBannerShown', 'true');
        }, 5000); // Show after 5 seconds for better UX
        return;
      }

      // For Android/Chrome - listen for install prompt
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        
        // Show banner after 5 seconds
        setTimeout(() => {
          if (!isAlreadyInstalled) {
            setShowBanner(true);
            sessionStorage.setItem('pwaBannerShown', 'true');
          }
        }, 5000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Cleanup
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('resize', handleResize);
      };
    }

    // Cleanup resize listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isAlreadyInstalled]);

  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS installation instructions - show a more user-friendly modal
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50';
      modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800">Install Medical Center App</h3>
            <button id="close-modal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="bg-blue-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-700">1. Tap the Share button</p>
                <p class="text-sm text-gray-600">Tap <span class="font-bold">📤</span> (square with arrow up)</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="bg-blue-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-700">2. Find "Add to Home Screen"</p>
                <p class="text-sm text-gray-600">Scroll down and tap <span class="font-bold">"Add to Home Screen"</span></p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="bg-blue-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-700">3. Tap "Add"</p>
                <p class="text-sm text-gray-600">Tap <span class="font-bold">"Add"</span> in the top-right corner</p>
              </div>
            </div>
          </div>
          <div class="mt-6 bg-blue-50 p-4 rounded-lg">
            <p class="text-sm text-blue-800">
              <span class="font-bold">Benefits:</span> Quick access to appointments, medical records, and doctor consultations
            </p>
          </div>
          <button id="got-it-btn" class="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Got It, Thanks!
          </button>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      };
      
      modal.querySelector('#close-modal').onclick = closeModal;
      modal.querySelector('#got-it-btn').onclick = closeModal;
      
      // Auto-close on outside click
      modal.onclick = (e) => {
        if (e.target === modal) closeModal();
      };
      
      // Hide banner after showing instructions
      handleDismiss();
      
    } else if (deferredPrompt) {
      // Android/Chrome installation
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('User accepted the PWA installation');
          // Mark as installed
          setIsAlreadyInstalled(true);
          setIsStandalone(true);
          
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'fixed top-4 right-4 z-[9999] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInOut';
          successMsg.innerHTML = `
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>App installed successfully!</span>
            </div>
          `;
          document.body.appendChild(successMsg);
          
          // Remove after 3 seconds
          setTimeout(() => {
            if (document.body.contains(successMsg)) {
              document.body.removeChild(successMsg);
            }
          }, 3000);
        }
        
        setShowBanner(false);
        setDeferredPrompt(null);
        
      } catch (error) {
        console.error('Error during installation:', error);
      }
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setIsDismissed(true);
    // Store dismissal in localStorage for 7 days
    localStorage.setItem('pwaBannerDismissed', new Date().toISOString());
    
    // Also store in session storage to prevent showing again this session
    sessionStorage.setItem('pwaBannerShown', 'true');
  };

  // Don't show if any of these conditions are true
  if (isAlreadyInstalled || isStandalone || isDismissed || !showBanner) {
    return null;
  }

  // Mobile-only check (tablets and phones only)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#E9756D] to-[#D65B54] text-white shadow-2xl animate-slideUp border-t border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left side - Info */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm md:text-base">Install Medical Center App</h3>
              <p className="text-xs md:text-sm text-white/90">
                {isIOS 
                  ? "Quick access to your health records & appointments"
                  : "Fast loading, offline access & health notifications"}
              </p>
            </div>
          </div>
          
          {/* Right side - Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-[#E9756D] font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm md:text-base">{isIOS ? "Add to Home" : "Install Now"}</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close install prompt"
              title="Dismiss for 7 days"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Benefits row */}
        <div className="mt-2 pt-2 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-white/80">
            <span className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded">
              <Calendar className="w-3 h-3" />
              <span>Appointment Reminders</span>
            </span>
            <span className="px-2 py-1 bg-white/10 rounded">Medical Records Access</span>
            <span className="px-2 py-1 bg-white/10 rounded">Doctor Consultations</span>
            <span className="px-2 py-1 bg-white/10 rounded">Health Tips</span>
          </div>
        </div>
      </div>
    </div>
  );
}