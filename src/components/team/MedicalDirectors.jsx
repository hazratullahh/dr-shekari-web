// components/team/MedicalDirectors.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Star, Calendar, MessageSquare, MapPin, Globe } from 'lucide-react';

const MedicalDirectors = () => {
  const directors = [
    {
      name: "Dr. Nazir Ahmad Shekari",
      position: "Chief Urologist & Medical Director",
      nationality: "Afghanistan",
      flag: "🇦🇫",
      experience: "22+ Years",
      specialty: "Urology, Andrology & Endourology",
      education: "MD, PhD in Urology - Fellowship in Endourology (USA)",
      image: "/images/dr-shekari.jpg",
      achievements: [
        "Pioneer of Modern Urology in Afghanistan",
        "Trained at Johns Hopkins Hospital, USA",
        "Published 25+ International Research Papers",
        "Member: American Urological Association"
      ],
      availability: "Mon-Sat: 9AM-7PM"
    },
    {
      name: "Dr. Mansour Ahmad Wayar",
      position: "Professor Assistant & Clinical Director",
      nationality: "Afghanistan",
      flag: "🇦🇫",
      experience: "15+ Years",
      specialty: "Urology & Academic Medicine",
      education: "MD, MSc in Urology - Teaching Fellowship",
      image: "/images/dr-wayar.jpg",
      achievements: [
        "University Professor of Urology",
        "Medical Education Specialist in AFG",
        "Robotic Surgery Certified",
        "International Conference Speaker",
        "Peer-Reviewed Research Author"
      ],
      availability: "Mon-Fri: 10AM-6PM"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Directors</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our Afghan medical leadership with international training and local expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {directors.map((director, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Section */}
                    <div className="lg:w-2/5">
                      <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden">
                        <Image
                          src={director.image}
                          alt={director.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        {/* Flag Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center shadow-xl">
                            <span className="text-2xl">{director.flag}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl">
                          <div className="text-lg font-bold text-gray-900">{director.experience}</div>
                          <div className="text-xs text-gray-600">Experience</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl">
                          <div className="text-lg font-bold text-gray-900">{director.nationality}</div>
                          <div className="text-xs text-gray-600">Nationality</div>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-3/5">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 rounded-full">
                            <Award size={14} className="text-[#E9756D] mr-2" />
                            <span className="text-sm font-medium text-[#E9756D]">Medical Director</span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className="text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {director.name}
                        </h3>
                        <p className="text-[#E9756D] font-medium mb-1">{director.position}</p>
                        <p className="text-gray-600">{director.specialty}</p>
                      </div>

                      {/* Education */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl">
                        <div className="flex items-center mb-2">
                          <Globe size={18} className="text-[#F6CA97] mr-2" />
                          <span className="font-medium text-gray-900">International Education</span>
                        </div>
                        <p className="text-gray-700">{director.education}</p>
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Award size={18} className="text-[#E9756D] mr-2" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {director.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#E9756D] mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Availability & Contact */}
                      <div className="w-full fle items-center justify-center p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center">
                          <Calendar size={18} className="text-[#E9756D] mr-2" />
                          <div>
                            <span className="font-medium text-gray-900">Available: </span>
                            <p className="text-gray-700">{director.availability}</p>
                          </div>
                        </div>
                        <div className='w-full flex items-center justify-center'>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full text-center m-auto mt-2 px-4 py-2 cursor-pointer bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white text-sm font-medium rounded-lg flex items-center"
                          >
                            <MessageSquare size={16} className="mr-2" />
                            Consult Now
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicalDirectors;