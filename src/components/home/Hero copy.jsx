'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="z-50"
                    >
                        <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl">
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] rounded-full mb-6">
                                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                <span className="text-white text-sm font-semibold">Leading Urology Specialist</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Dr. Nazir Ahmad
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">
                                    Shekari
                                </span>
                            </h1>

                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Professor Assistant & Specialist in Urology, Andrology, and Endourology.
                                Providing advanced medical care with cutting-edge technology and
                                compassionate patient-centered approach.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <motion.button
                                    type='button'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 cursor-pointer bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    <span className="flex items-center">
                                        Book Appointment
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </motion.button>
                                <motion.button
                                    type='button'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 cursor-pointer glass-card text-[#E9756D] font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#F6CA97]/30"
                                >
                                    View Services
                                </motion.button>
                            </div>

                            <div className="mt-10 flex items-center space-x-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#E9756D]">20+</div>
                                    <div className="text-gray-600">Years Experience</div>
                                </div>
                                <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#F6CA97] to-transparent"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#E9756D]">5000+</div>
                                    <div className="text-gray-600">Successful Surgeries</div>
                                </div>
                                <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#F6CA97] to-transparent"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#E9756D]">98%</div>
                                    <div className="text-gray-600">Patient Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        {/* 3D Image Container with floating effect */}
                        <div className="relative w-full h-150">
                            {/* Floating doctor images */}
                            <div className="absolute inset-0 perspective-1000">
                                {/* Main doctor - Dr. Nazir Ahmad Shekari */}
                                <motion.div
                                    className="absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl left-10 top-10 border-2 border-white/30"
                                    style={{ transform: 'rotateY(-15deg) rotateX(10deg)' }}
                                    animate={{
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        type: 'spring', stiffness: 300,
                                        y: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    whileHover={{ scale: 1.08, rotateY: 0, rotateX: 0, zIndex: 20 }}
                                >
                                    <div className="w-full h-full bg-gradient-to-br from-[#FDF5EE] to-[#F9F0E8] flex items-center justify-center relative overflow-hidden">
                                        {/* Pattern overlay */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-[#E9756D] rounded-full -translate-x-16 -translate-y-16"></div>
                                            <div className="absolute bottom-0 right-0 w-40 h-40 border-2 border-[#F6CA97] rounded-full translate-x-20 translate-y-20"></div>
                                        </div>

                                        <div className="text-center p-6 relative z-10">
                                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center shadow-lg">
                                                <span className="text-4xl text-white font-bold">DR</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">Dr. Nazir Ahmad Shekari</h3>
                                            <p className="text-[#E9756D] font-medium mt-2">Urology Specialist</p>
                                            <div className="mt-4 flex justify-center space-x-2">
                                                <div className="w-2 h-2 bg-[#E9756D] rounded-full"></div>
                                                <div className="w-2 h-2 bg-[#F6CA97] rounded-full"></div>
                                                <div className="w-2 h-2 bg-[#E9756D] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Assistant doctor - Dr. Mansour Ahmad Wayar */}
                                <motion.div
                                    className="absolute w-64 h-72 rounded-2xl overflow-hidden shadow-2xl right-10 bottom-10 border-2 border-white/30"
                                    style={{ transform: 'rotateY(15deg) rotateX(-10deg)' }}
                                    animate={{
                                        y: [0, 15, 0],
                                    }}
                                    transition={{
                                        type: 'spring', stiffness: 300,
                                        y: {
                                            duration: 3.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.5
                                        }
                                    }}
                                    whileHover={{ scale: 1.08, rotateY: 0, rotateX: 0, zIndex: 20 }}
                                >
                                    <div className="w-full h-full bg-gradient-to-tr from-white to-[#FDF5EE] flex items-center justify-center relative overflow-hidden">
                                        {/* Pattern overlay */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute top-0 right-0 w-24 h-24 border-2 border-[#F6CA97] rounded-full translate-x-12 -translate-y-12"></div>
                                            <div className="absolute bottom-0 left-0 w-28 h-28 border-2 border-[#E9756D] rounded-full -translate-x-14 translate-y-14"></div>
                                        </div>

                                        <div className="text-center p-6 relative z-10">
                                            <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#F6CA97] to-[#E9756D] flex items-center justify-center shadow-lg">
                                                <span className="text-3xl text-white font-bold">DR</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Dr. Mansour Ahmad Wayar</h3>
                                            <p className="text-[#E9756D] font-medium mt-2">Professor Assistant</p>
                                            <div className="mt-4 flex justify-center space-x-2">
                                                <div className="w-2 h-2 bg-[#F6CA97] rounded-full"></div>
                                                <div className="w-2 h-2 bg-[#E9756D] rounded-full"></div>
                                                <div className="w-2 h-2 bg-[#F6CA97] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Medical symbol with floating animation */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    rotate: {
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }}
                            >
                                <div className="w-48 h-48 rounded-full glass-card flex items-center justify-center border border-[#F6CA97]/20">
                                    <div className="relative">
                                        <div className="w-32 h-32 relative">
                                            <div className="absolute top-1/2 left-0 w-full h-8 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] transform -translate-y-1/2 rounded-full"></div>
                                            <div className="absolute left-1/2 top-0 h-full w-8 bg-gradient-to-b from-[#E9756D] to-[#F6CA97] transform -translate-x-1/2 rounded-full"></div>
                                        </div>

                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-[#E9756D]/30"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.5, 0, 0.5]
                                            }}
                                            transition={{
                                                scale: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                },
                                                opacity: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating elements around the center */}
                            {/* {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    className={`absolute w-8 h-8 rounded-full ${item % 2 === 0 ? 'bg-[#E9756D]/20' : 'bg-[#F6CA97]/20'} border ${item % 2 === 0 ? 'border-[#E9756D]/30' : 'border-[#F6CA97]/30'}`}
                                    style={{
                                        top: `${20 + (item * 15)}%`,
                                        left: `${item % 2 === 0 ? '25%' : '75%'}`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        x: item % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3 + item,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: item * 0.5
                                    }}
                                />
                            ))} */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}