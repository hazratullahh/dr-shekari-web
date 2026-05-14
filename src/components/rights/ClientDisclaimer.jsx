'use client';

import { useState, useEffect } from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';

const ClientDisclaimer = () => {
    const [hasRead, setHasRead] = useState(false);
    const [readTime, setReadTime] = useState(null);
    const [showReminder, setShowReminder] = useState(false);

    useEffect(() => {
        // Check if user has previously acknowledged the disclaimer
        const acknowledged = localStorage.getItem('medical_disclaimer_acknowledged');
        if (acknowledged) {
            setHasRead(true);
            setReadTime(parseInt(acknowledged));
        }

        // Show reminder if they haven't read it in a while
        if (acknowledged) {
            const lastRead = parseInt(acknowledged);
            const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
            if (lastRead < thirtyDaysAgo) {
                setShowReminder(true);
            }
        }
    }, []);

    const handleAcknowledge = () => {
        const timestamp = Date.now();
        setHasRead(true);
        setReadTime(timestamp);
        setShowReminder(false);
        localStorage.setItem('medical_disclaimer_acknowledged', timestamp.toString());
    };

    const formatTimeAgo = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    };

    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center mb-2">
                            <AlertCircle size={20} className="text-[#E9756D] mr-2" />
                            <h3 className="text-lg font-bold text-gray-900">
                                Acknowledgment of Disclaimer
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Please confirm that you have read and understood this medical disclaimer.
                            Your acknowledgment helps us ensure that our patients are properly informed.
                        </p>

                        {readTime && (
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-2" />
                                <span>Last acknowledged: {formatTimeAgo(readTime)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <button
                            type='button'
                            onClick={handleAcknowledge}
                            className={`px-6 py-3 cursor-pointer rounded-lg font-medium transition-all flex items-center ${hasRead
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white hover:shadow-md'
                                }`}
                        >
                            {hasRead ? (
                                <>
                                    <Check size={18} className="mr-2" />
                                    Acknowledged
                                </>
                            ) : (
                                'I Acknowledge & Understand'
                            )}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            {hasRead ? '✓ Disclaimer acknowledged' : 'Please read carefully before acknowledging'}
                        </p>
                    </div>
                </div>

                {showReminder && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle size={18} className="text-yellow-600 mr-2 flex-shrink-0" />
                            <p className="text-yellow-700 text-sm">
                                It's been a while since you last reviewed our medical disclaimer.
                                We recommend reviewing it again as medical information may have been updated.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDisclaimer;