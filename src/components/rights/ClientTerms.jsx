'use client';

import { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const ClientTerms = () => {
  const [agreed, setAgreed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAgreement = () => {
    if (!agreed) {
      setAgreed(true);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Agreement Confirmation
          </h3>
          <p className="text-gray-600 text-sm">
            By confirming your agreement, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <button
          type='button'
            onClick={handleAgreement}
            disabled={agreed}
            className={`px-6 py-3 cursor-pointer rounded-lg font-medium transition-all ${
              agreed
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white hover:shadow-md'
            }`}
          >
            {agreed ? (
              <span className="flex items-center">
                <CheckCircle size={18} className="mr-2" />
                Agreement Confirmed
              </span>
            ) : (
              'I Agree to Terms'
            )}
          </button>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>Last confirmed: {agreed ? 'Just now' : 'Never'}</span>
          </div>
        </div>
      </div>
      
      {showConfirmation && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <p className="text-green-700 text-sm flex items-center">
            <CheckCircle size={16} className="mr-2" />
            Thank you for confirming your agreement to our Terms of Service.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientTerms;