import ClientDisclaimer from '@/components/rights/ClientDisclaimer';
import { AlertTriangle, Shield, FileWarning, Stethoscope, BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Medical Disclaimer | Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar Clinic',
    description: 'Important medical disclaimer for Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar Clinic website. Information provided is for educational purposes only.',
    keywords: 'medical disclaimer, healthcare information, educational content, not medical advice, doctor consultation',
};

const MedicalDisclaimer = () => {
    const disclaimerPoints = [
        {
            icon: <AlertTriangle size={24} />,
            title: 'Not Medical Advice',
            content: 'The content on this website is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.',
            emphasis: true,
        },
        {
            icon: <Stethoscope size={24} />,
            title: 'Doctor Consultation Required',
            content: 'Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this website.',
            emphasis: true,
        },
        {
            icon: <Shield size={24} />,
            title: 'No Doctor-Patient Relationship',
            content: 'Viewing or using the content on this website does not establish a doctor-patient relationship. A doctor-patient relationship is only established through an in-person consultation and proper registration at our clinic.',
            emphasis: false,
        },
        {
            icon: <BookOpen size={24} />,
            title: 'Educational Information Only',
            content: 'Medical information changes constantly. While we strive to provide accurate and up-to-date information, we make no guarantees about the completeness, reliability, or accuracy of the information on this website.',
            emphasis: false,
        },
        {
            icon: <FileWarning size={24} />,
            title: 'Emergency Situations',
            content: 'In case of a medical emergency, immediately call emergency services or visit the nearest hospital. Do not rely on information from this website for emergency medical situations.',
            emphasis: true,
        },
    ];

    const importantSections = [
        {
            title: 'Treatment Information',
            content: 'Information about treatments, procedures, medications, or outcomes described on this website are for general information only. Individual results may vary, and specific treatments should be discussed with your healthcare provider.',
        },
        {
            title: 'Third-Party Content',
            content: 'This website may contain links to third-party websites. We are not responsible for the content or accuracy of information on linked websites and do not endorse their products or services.',
        },
        {
            title: 'Medical Liability',
            content: 'Dr. Nazir Ahmad Shekari Clinic, its doctors, staff, and affiliates shall not be liable for any direct, indirect, consequential, special, exemplary, or other damages arising from the use of this website or the information contained herein.',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center">
                            <AlertTriangle size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Medical Disclaimer
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Important legal and medical information about the use of this website.
                        Please read carefully before using any information provided.
                    </p>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-400" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-bold text-red-800">
                                Important Medical Warning
                            </h3>
                            <div className="mt-2 text-red-700">
                                <p>
                                    This website contains general medical information. If you have or
                                    suspect you have a medical condition, please consult a healthcare
                                    professional immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Disclaimer Points */}
                <div className="space-y-8 mb-12">
                    {disclaimerPoints.map((point, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-xl border ${point.emphasis
                                ? 'bg-red-50 border-red-100'
                                : 'bg-white border-gray-100'
                                } shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <div className="flex items-start">
                                <div className={`mr-4 ${point.emphasis ? 'text-red-500' : 'text-[#E9756D]'}`}>
                                    {point.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-xl font-bold mb-3 ${point.emphasis ? 'text-red-800' : 'text-gray-900'
                                        }`}>
                                        {point.title}
                                    </h3>
                                    <p className={point.emphasis ? 'text-red-700' : 'text-gray-600'}>
                                        {point.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Information Sections */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Additional Legal Information
                    </h2>
                    <div className="space-y-8">
                        {importantSections.map((section, index) => (
                            <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {section.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl p-8 border border-[#E9756D]/20">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Need Medical Assistance?
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            If you require medical attention or have health concerns,
                            please contact our clinic directly for proper consultation and care.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+93792453030"
                                className="px-6 py-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-medium rounded-lg hover:shadow-md transition-shadow inline-flex items-center justify-center"
                            >
                                Call for Emergency: +93792453030
                            </a>
                            <a
                                href="/contact"
                                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-[#E9756D] hover:text-[#E9756D] transition-colors inline-flex items-center justify-center"
                            >
                                Schedule Consultation
                            </a>
                        </div>
                    </div>
                </div>

                <ClientDisclaimer />
            </div>

            {/* Bottom Notice */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
                <div className="text-center text-sm text-gray-500">
                    <p>
                        This disclaimer is effective as of{' '}
                        {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                        {' '}and may be updated periodically.
                    </p>
                    <p className="mt-2">
                        By using this website, you acknowledge that you have read,
                        understood, and agree to this medical disclaimer.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MedicalDisclaimer;