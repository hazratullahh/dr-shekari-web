// components/team/InternationalTeam.js
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Globe, Award, GraduationCap, Users, MapPin, Clock, Star } from 'lucide-react';

const InternationalTeam = () => {
  const [activeTab, setActiveTab] = useState('all');

  const internationalDoctors = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Senior Urologist & Robotic Surgery Specialist",
      nationality: "India",
      flag: "🇮🇳",
      experience: "18+ Years",
      specialty: "Robotic Urology & Laparoscopic Surgery",
      education: "MCh Urology (AIIMS), Robotic Surgery Fellowship (USA)",
      image: "/images/team/dr-rajesh-india.jpg",
      location: "Visiting Consultant from New Delhi, India",
      schedule: "Monthly: 1st Week of Every Month",
      expertise: [
        "Da Vinci Robotic Surgery Expert",
        "Kidney Transplant Specialist",
        "Advanced Laparoscopy",
        "Prostate Cancer Surgery"
      ],
      achievements: [
        "Performed 2000+ Robotic Surgeries",
        "Trained at Cleveland Clinic, USA",
        "International Speaker & Trainer"
      ]
    },
    {
      name: "Dr. Michael Johnson",
      position: "Endourology & Advanced Laparoscopy Specialist",
      nationality: "United States",
      flag: "🇺🇸",
      experience: "20+ Years",
      specialty: "Endourology & Minimally Invasive Surgery",
      education: "MD, FACS - Johns Hopkins Hospital Fellowship",
      image: "/images/team/dr-michael-usa.jpg",
      location: "Visiting Professor from Boston, USA",
      schedule: "Quarterly: 2 Weeks Every 3 Months",
      expertise: [
        "Percutaneous Nephrolithotomy (PCNL)",
        "Ureteroscopy Expert",
        "Laser Prostate Surgery",
        "Stone Management"
      ],
      achievements: [
        "Pioneer in Minimally Invasive Techniques",
        "Published 50+ Research Papers",
        "International Award Winner"
      ]
    },
    {
      name: "Dr. Fatima Zahra",
      position: "Andrology & Male Fertility Specialist",
      nationality: "Afghanistan",
      flag: "🇦🇫",
      experience: "12+ Years",
      specialty: "Male Reproductive Health & Fertility",
      education: "MD, Andrology Fellowship (India)",
      image: "/images/team/dr-fatima-afg.jpg",
      location: "Resident Specialist, Jami Hospital",
      schedule: "Sun-Thu: 8AM-4PM",
      expertise: [
        "Male Infertility Treatment",
        "Hormonal Disorders",
        "Sexual Medicine",
        "Microsurgery"
      ],
      achievements: [
        "First Female Andrologist in Afghanistan",
        "International Training in India",
        "Patient Education Advocate"
      ]
    },
    {
      name: "Dr. Ahmed Raza",
      position: "Pediatric Urologist",
      nationality: "Afghanistan",
      flag: "🇦🇫",
      experience: "10+ Years",
      specialty: "Children's Urological Disorders",
      education: "MD, Pediatric Urology Fellowship (Turkey)",
      image: "/images/team/dr-ahmed-afg.jpg",
      location: "Resident Specialist, Jami Hospital",
      schedule: "Mon-Sat: 9AM-5PM",
      expertise: [
        "Congenital Abnormalities",
        "Pediatric Stone Disease",
        "Bedwetting Treatment",
        "Minimal Access Surgery"
      ],
      achievements: [
        "Trained at Ankara University, Turkey",
        "Specialized in Pediatric Care",
        "Child-Friendly Approach"
      ]
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Specialists', count: internationalDoctors.length },
    { id: 'afghanistan', label: '🇦🇫 Afghanistan', count: 2 },
    { id: 'india', label: '🇮🇳 India', count: 1 },
    { id: 'usa', label: '🇺🇸 USA', count: 1 },
  ];

  const filteredDoctors = activeTab === 'all' 
    ? internationalDoctors 
    : internationalDoctors.filter(doc => doc.nationality.toLowerCase().includes(activeTab));

  return (
    <section id="international-team" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center mb-4">
            <Globe className="text-[#E9756D] mr-3" size={24} />
            <span className="text-[#E9756D] font-semibold text-lg">International Specialists</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Expertise</span> Local Care
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our international team brings world-class urological expertise to Afghanistan
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-white/20 h-full">
                {/* Doctor Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 flex items-center justify-center mr-3">
                          <span className="text-2xl">{doctor.flag}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-[#E9756D] font-medium">{doctor.nationality}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full">
                        <Star size={12} className="text-[#E9756D] mr-1" />
                        <span className="text-sm font-medium text-[#E9756D]">{doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{doctor.position}</h4>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>

                {/* Doctor Details */}
                <div className="p-6">
                  {/* Education & Location */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <GraduationCap size={18} className="text-[#F6CA97] mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Education</p>
                        <p className="text-gray-700 text-sm">{doctor.education}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin size={18} className="text-[#E9756D] mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Location & Schedule</p>
                        <p className="text-gray-700 text-sm">{doctor.location}</p>
                        <p className="text-gray-600 text-sm mt-1">{doctor.schedule}</p>
                      </div>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Award size={16} className="text-[#E9756D] mr-2" />
                      Areas of Expertise
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 border border-[#F6CA97]/20 rounded-full text-xs text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Users size={16} className="text-[#F6CA97] mr-2" />
                      Notable Achievements
                    </h5>
                    <ul className="space-y-2">
                      {doctor.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E9756D] mt-1.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 text-[#E9756D] font-medium rounded-xl border border-[#F6CA97]/30 hover:border-[#E9756D] transition-all group-hover:from-[#E9756D]/10 group-hover:to-[#F6CA97]/10"
                  >
                    Schedule Consultation with {doctor.name.split(' ')[1]}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternationalTeam;