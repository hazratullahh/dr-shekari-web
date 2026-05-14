'use client';

import { useState } from 'react';
import { Check, Download } from 'lucide-react';

const ClientPrivacyPolicy = () => {
  const [accepted, setAccepted] = useState(false);

  const downloadPolicy = () => {
    // In a real app, this would download a PDF
    alert('Privacy policy document download started');
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <button
          type="button"
            onClick={() => setAccepted(!accepted)}
            className={`w-6 h-6 rounded cursor-pointer border flex items-center justify-center mr-3 cursor-pointer transition-colors ${
              accepted
                ? 'bg-[#E9756D] border-[#E9756D]'
                : 'border-gray-300 hover:border-[#E9756D]'
            }`}
          >
            {accepted && <Check size={14} className="text-white" />}
          </button>
          <span className="text-gray-700">
            I have read and understood the privacy policy
          </span>
        </div>
        
        <button
        type="button"
          onClick={downloadPolicy}
          className="flex items-center cursor-pointer px-4 py-2 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white rounded-lg hover:shadow-md transition-shadow"
        >
          <Download size={18} className="mr-2" />
          Download Policy (PDF)
        </button>
      </div> */}
    </div>
  );
};

export default ClientPrivacyPolicy;