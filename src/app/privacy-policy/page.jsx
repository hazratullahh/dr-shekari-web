import { Shield, Lock, Eye, Database } from 'lucide-react';
import ClientPrivacyPolicy from '@/components/rights/ClientPrivacyPolicy';

export const metadata = {
    title: 'Privacy Policy | Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar',
    description: 'Privacy policy for Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar Clinic. Learn how we protect your personal and medical information.',
    keywords: 'privacy policy, data protection, medical privacy, confidentiality, healthcare data',
};

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: <Database size={24} />,
            title: 'Information We Collect',
            content: `We collect information that you provide directly to us, including:
        • Personal identification information (Name, email address, phone number)
        • Medical history and health information
        • Appointment details and preferences
        • Communication records with our clinic`,
        },
        {
            icon: <Eye size={24} />,
            title: 'How We Use Your Information',
            content: `Your information is used for:
        • Providing medical services and treatment
        • Scheduling and managing appointments
        • Sending important health updates
        • Improving our services
        • Complying with legal obligations`,
        },
        {
            icon: <Lock size={24} />,
            title: 'Data Security',
            content: `We implement security measures including:
        • Encrypted data storage
        • Secure communication channels
        • Regular security audits
        • Limited access to personal information
        • Staff training on data protection`,
        },
        {
            icon: <Shield size={24} />,
            title: 'Your Rights',
            content: `You have the right to:
        • Access your personal information
        • Request correction of inaccurate data
        • Request deletion of your data
        • Object to data processing
        • Data portability
        • Withdraw consent at any time`,
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Protecting your privacy and medical information is our top priority.
                        This policy outlines how we collect, use, and protect your data.
                    </p>
                    <div className="mt-8 text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="text-[#E9756D] mb-4">{section.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {section.title}
                            </h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Medical Data Protection
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            As a medical clinic, we adhere to strict confidentiality standards
                            including doctor-patient privilege. Your medical records are
                            protected under medical ethics and applicable laws.
                        </p>
                        <p>
                            We retain medical records for the duration required by law to
                            ensure continuity of care and for medical-legal purposes.
                        </p>
                        <p>
                            We do not share your medical information with third parties
                            without your explicit consent, except when required by law or
                            for treatment coordination with your permission.
                        </p>
                    </div>
                </div>

                {/* Contact Information for Privacy Concerns */}
                <div className="bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl p-8 border border-[#E9756D]/20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Contact Our Privacy Officer
                    </h2>
                    <p className="text-gray-600 mb-6">
                        For any questions about this privacy policy or to exercise your
                        privacy rights, please contact:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">By Email</h4>
                            <a
                                href="mailto:urology@dr-shekari.com"
                                className="text-[#E9756D] hover:underline"
                            >
                                urology@dr-shekari.com
                            </a>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">By Phone</h4>
                            <a
                                href="tel:+93792453030"
                                className="text-gray-700 hover:text-[#E9756D]"
                            >
                                +93792453030
                            </a>
                        </div>
                    </div>
                </div>

                <ClientPrivacyPolicy />
            </div>
        </div>
    );
};

export default PrivacyPolicy;