import ClientTerms from '@/components/rights/ClientTerms';
import { FileText, AlertTriangle, Scale, Briefcase } from 'lucide-react';

export const metadata = {
    title: 'Terms of Service | Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar Clinic',
    description: 'Terms and conditions for using Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar Clinic services and website.',
    keywords: 'terms of service, medical terms, clinic terms, service agreement',
};

const TermsOfService = () => {
    const terms = [
        {
            icon: <FileText size={24} />,
            title: 'Medical Services Agreement',
            points: [
                'All medical services are provided by licensed professionals',
                'Appointments are subject to availability',
                'Emergency cases receive priority attention',
                'Fees are due at the time of service unless otherwise arranged',
            ],
        },
        {
            icon: <AlertTriangle size={24} />,
            title: 'Disclaimer & Limitations',
            points: [
                'Information on this website is for educational purposes only',
                'Not a substitute for professional medical advice',
                'Results may vary between patients',
                'We reserve the right to refuse service',
            ],
        },
        {
            icon: <Scale size={24} />,
            title: 'Legal Compliance',
            points: [
                'Compliance with Afghan medical laws and regulations',
                'Mandatory reporting requirements',
                'Medical records retention policies',
                'Professional liability coverage',
            ],
        },
        {
            icon: <Briefcase size={24} />,
            title: 'Practice Policies',
            points: [
                '24-hour cancellation notice required',
                'Late arrival may result in rescheduling',
                'Prescription refill policies',
                'Telemedicine consultation terms',
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Please read these terms carefully before using our services.
                        By accessing our clinic services, you agree to these terms.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Terms Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
                    {terms.map((term, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                        >
                            <div className="text-[#E9756D] mb-4">{term.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {term.title}
                            </h3>
                            <ul className="space-y-2">
                                {term.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start text-gray-600">
                                        <span className="text-[#E9756D] mr-2">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Important Notices */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">
                        Important Medical Disclaimer
                    </h3>
                    <p className="text-yellow-700">
                        The content on this website is not intended to be a substitute for
                        professional medical advice, diagnosis, or treatment. Always seek
                        the advice of your physician or other qualified health provider
                        with any questions you may have regarding a medical condition.
                    </p>
                </div>

                <ClientTerms />
            </div>
        </div>
    );
};

export default TermsOfService;