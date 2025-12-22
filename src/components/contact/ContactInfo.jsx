// components/contact/ContactInfo.js
'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Users, Globe } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <Phone className="text-[#E9756D]" size={24} />,
      title: "Phone Numbers",
      items: [
        { label: "Emergency", value: "+93 79 245 3030", type: "tel" },
        { label: "Appointments", value: "070 445 3030", type: "tel" },
        { label: "Administration", value: "070 445 3031", type: "tel" }
      ]
    },
    {
      icon: <Mail className="text-[#F6CA97]" size={24} />,
      title: "Email Addresses",
      items: [
        { label: "Medical Inquiries", value: "medical@drshekari.com", type: "mailto" },
        { label: "Appointments", value: "appointments@drshekari.com", type: "mailto" },
        { label: "General Info", value: "info@drshekari.com", type: "mailto" }
      ]
    },
    {
      icon: <MapPin className="text-[#E9756D]" size={24} />,
      title: "Clinic Address",
      items: [
        { label: "Main Address", value: "Jami Hospital, Chahar-e-rahi- Badmorghan, Herat, Afghanistan", type: "text" },
        { label: "Landmark", value: "Near Herat University Medical Campus", type: "text" }
      ]
    },
    {
      icon: <Clock className="text-[#F6CA97]" size={24} />,
      title: "Working Hours",
      items: [
        { label: "Monday - Saturday", value: "8:00 AM - 8:00 PM", type: "text" },
        { label: "Sunday", value: "9:00 AM - 2:00 PM", type: "text" },
        { label: "Emergency", value: "24/7 Available", type: "text" }
      ]
    }
  ];

  const languages = ["Dari", "Pashto", "English", "Hindi", "Urdu"];

  return (
    <div className="space-y-8">
      {/* Quick Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-2xl shadow-lg border border-white/20"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
        
        <div className="space-y-6">
          {contactDetails.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-3">
                  {section.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  <div className="mt-2 space-y-2">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-sm text-gray-600 w-24">{item.label}:</span>
                        {item.type === 'tel' || item.type === 'mailto' ? (
                          <a
                            href={`${item.type}:${item.value.replace(/\s/g, '')}`}
                            className="text-sm font-medium text-[#E9756D] hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-700">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Languages Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-2xl shadow-lg border border-white/20"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-3">
            <Globe className="text-[#E9756D]" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Languages Spoken</h3>
            <p className="text-sm text-gray-600">Our team is multilingual</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 border border-[#F6CA97]/20 rounded-full text-sm font-medium text-gray-700"
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Staff Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 rounded-2xl shadow-lg border border-white/20"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-3">
            <Users className="text-[#F6CA97]" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Medical Staff</h3>
            <p className="text-sm text-gray-600">Our team structure</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { role: "Urology Specialists", count: "8 Doctors" },
            { role: "Nursing Staff", count: "12 Nurses" },
            { role: "Support Staff", count: "6 Assistants" },
            { role: "Administration", count: "4 Personnel" }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5">
              <span className="font-medium text-gray-900">{item.role}</span>
              <span className="font-bold text-[#E9756D]">{item.count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;