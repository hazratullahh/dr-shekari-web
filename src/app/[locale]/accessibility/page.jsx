import ClientAccessibility from '@/components/rights/Accessibility';
import { Accessibility, Eye, Ear, MousePointer, Zap } from 'lucide-react';

export const metadata = {
    title: 'Accessibility Statement | Dr. Nazir Ahmad Shekari & Dr. Mansour Ahmad Wayar Clinic',
    description: 'Our commitment to making our website accessible to all users, including those with disabilities.',
    keywords: 'accessibility, ADA compliance, WCAG, accessible website, disability access',
};

const AccessibilityPage = () => {
    const features = [
        {
            icon: <Eye size={24} />,
            title: 'Visual Accessibility',
            features: [
                'High contrast mode available',
                'Text resize functionality',
                'Alternative text for all images',
                'Clear typography and spacing',
            ],
        },
        {
            icon: <Ear size={24} />,
            title: 'Auditory Accessibility',
            features: [
                'Video content with captions',
                'Audio descriptions available',
                'Transcripts for multimedia',
                'Adjustable volume controls',
            ],
        },
        {
            icon: <MousePointer size={24} />,
            title: 'Navigation Accessibility',
            features: [
                'Keyboard-only navigation',
                'Skip to main content links',
                'Consistent navigation structure',
                'Clear focus indicators',
            ],
        },
        {
            icon: <Zap size={24} />,
            title: 'Technical Compliance',
            features: [
                'WCAG 2.1 AA compliance',
                'ARIA labels implementation',
                'Semantic HTML structure',
                'Screen reader optimized',
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#E9756D]/10 to-[#F6CA97]/10 py-16">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#E9756D] to-[#F6CA97] flex items-center justify-center">
                            <Accessibility size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Accessibility Statement
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We are committed to ensuring digital accessibility for people
                        with disabilities. We are continually improving the user
                        experience for everyone.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Commitment Statement */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Our Commitment
                    </h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            Dr. Nazir Ahmad Shekari Clinic is committed to providing a
                            website that is accessible to the widest possible audience,
                            regardless of technology or ability. We aim to comply with all
                            applicable standards, including WCAG 2.1 AA guidelines.
                        </p>
                        <p>
                            As a medical practice, we understand the importance of
                            accessibility for all our patients and visitors. We believe
                            in equal access to healthcare information for everyone.
                        </p>
                    </div>
                </div>

                {/* Accessibility Features Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="text-[#E9756D] mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>
                            <ul className="space-y-2">
                                {feature.features.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="flex items-center text-gray-600"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-[#E9756D] mr-3"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact for Accessibility Issues */}
                <div className="bg-gradient-to-r from-[#E9756D]/5 to-[#F6CA97]/5 rounded-xl p-8 border border-[#E9756D]/20 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Report Accessibility Issues
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We welcome your feedback on the accessibility of our website.
                        Please let us know if you encounter accessibility barriers.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Contact Information
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>Email: accessibility@dr-shekari.com</li>
                                <li>Phone: +93792453030</li>
                                <li>Response Time: 2-3 business days</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                                What to Include
                            </h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• URL of the page with issues</li>
                                <li>• Description of the problem</li>
                                <li>• Your contact information</li>
                                <li>• Assistive technology used (if any)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <ClientAccessibility />
            </div>
        </div>
    );
};

export default AccessibilityPage;