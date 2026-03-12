'use client';

import { createContext, useContext, useState } from 'react';
import AppointmentForm from './AppointmentForm';
import { motion } from 'framer-motion';

const ModalContext = createContext(null);

export const AppointmentModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl overflow-auto max-h-[90vh]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close appointment form"
            >
              ×
            </button>
            <AppointmentForm />
          </motion.div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useAppointmentModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useAppointmentModal must be used within AppointmentModalProvider');
  return ctx;
};
