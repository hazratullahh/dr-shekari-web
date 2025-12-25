'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Type, ZoomIn, ZoomOut } from 'lucide-react';

const ClientAccessibility = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100); // percentage
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Apply high contrast
    document.documentElement.classList.toggle('high-contrast', highContrast);
    
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }
  }, [highContrast, fontSize, reducedMotion]);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize(fontSize - 10);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Accessibility Tools
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Contrast Toggle */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            {highContrast ? (
              <Moon size={20} className="text-[#E9756D] mr-3" />
            ) : (
              <Sun size={20} className="text-gray-400 mr-3" />
            )}
            <span className="font-medium text-gray-700">
              {highContrast ? 'High Contrast On' : 'Normal Mode'}
            </span>
          </div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`w-12 h-6 rounded-full transition-colors ${
              highContrast
                ? 'bg-[#E9756D] justify-end'
                : 'bg-gray-300 justify-start'
            } flex items-center p-1`}
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </button>
        </div>

        {/* Font Size Controls */}
        <div className="flex flex-col p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center mb-3">
            <Type size={20} className="text-[#E9756D] mr-3" />
            <span className="font-medium text-gray-700">Text Size</span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize <= 80}
              className={`p-2 rounded ${
                fontSize <= 80
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium">{fontSize}%</span>
            <button
              onClick={increaseFontSize}
              disabled={fontSize >= 150}
              className={`p-2 rounded ${
                fontSize >= 150
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-[#E9756D]/20 to-[#F6CA97]/20 flex items-center justify-center mr-3">
              <span className="text-sm">↻</span>
            </div>
            <span className="font-medium text-gray-700">
              {reducedMotion ? 'Reduced Motion' : 'Normal Motion'}
            </span>
          </div>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              reducedMotion
                ? 'bg-[#E9756D] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {reducedMotion ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> These settings are saved temporarily for your 
          current session. For permanent accessibility settings, please use 
          your browser or operating system settings.
        </p>
      </div>
    </div>
  );
};

export default ClientAccessibility;