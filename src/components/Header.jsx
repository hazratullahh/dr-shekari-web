// components/Header.js (New component with logo colors)
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">DR</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">Dr. Nazir Ahmad</div>
                  <div className="text-sm text-[#E9756D] font-medium">Shekari</div>
                </div>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-700 hover:text-[#E9756D] font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-md"
              >
                Book Now
              </motion.button>
            </nav>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-[#F6CA97]/20"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-[#E9756D] font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button className="px-6 py-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl mt-2">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}