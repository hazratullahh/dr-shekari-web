// components/contact/ContactForm.js
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      message: '',
      appointmentType: 'general',
      preferredDate: '',
      preferredTime: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const appointmentTypes = [
    { value: 'general', label: 'General Consultation' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'emergency', label: 'Emergency Consultation' },
    { value: 'second_opinion', label: 'Second Opinion' },
    { value: 'test_results', label: 'Test Results Discussion' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9756D] to-[#F6CA97]">Message</span>
        </h2>
        <p className="text-gray-600">
          Fill out the form below and our team will get back to you within 2 hours
        </p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
        >
          <div className="flex items-center">
            <CheckCircle className="text-green-600 mr-3" size={24} />
            <div>
              <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
              <p className="text-green-700 text-sm mt-1">
                We'll contact you within 2 hours. Emergency? Call +93 79 245 3030
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl"
        >
          <div className="flex items-center">
            <AlertCircle className="text-red-600 mr-3" size={24} />
            <div>
              <h4 className="font-semibold text-red-800">Error Submitting Form</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Full Name <span className="text-[#E9756D]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("fullName", { 
                required: "Full name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" }
              })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.fullName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email & Mobile Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Mobile Number <span className="text-[#E9756D]">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                <span className="text-gray-500">+93</span>
                <div className="w-px h-4 bg-gray-300 mx-2" />
              </div>
              <input
                type="tel"
                {...register("mobileNumber", { 
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: "Enter 9-digit Afghan mobile number (without +93)"
                  }
                })}
                className="w-full pl-16 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all"
                placeholder="79 123 4567"
              />
            </div>
            {errors.mobileNumber && (
              <p className="mt-2 text-sm text-red-600">{errors.mobileNumber.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">Format: 79 123 4567 (without +93)</p>
          </div>
        </div>

        {/* Appointment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Appointment Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {appointmentTypes.map((type) => (
              <div key={type.value} className="relative">
                <input
                  type="radio"
                  id={type.value}
                  value={type.value}
                  {...register("appointmentType")}
                  className="sr-only"
                />
                <label
                  htmlFor={type.value}
                  className={`block w-full p-3 text-center rounded-xl border cursor-pointer transition-all ${
                    type.value === 'emergency'
                      ? 'border-red-300 hover:border-red-400'
                      : 'border-gray-300 hover:border-[#E9756D]'
                  }`}
                >
                  <span className="text-sm font-medium">{type.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              {...register("preferredDate")}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Preferred Time
            </label>
            <select
              {...register("preferredTime")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Message <span className="text-[#E9756D]">*</span>
          </label>
          <textarea
            rows={4}
            {...register("message", { 
              required: "Message is required",
              minLength: { value: 10, message: "Message must be at least 10 characters" }
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.message ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all resize-none`}
            placeholder="Please describe your symptoms or reason for consultation..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            {...register("consent", { required: "You must agree to terms" })}
            className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-[#E9756D] focus:ring-[#E9756D]/20"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I agree to receive communications from Dr. Shekari Clinic regarding 
            my appointment and medical information. I understand that this form 
            is not for emergencies.
          </label>
        </div>
        {errors.consent && (
          <p className="text-sm text-red-600">{errors.consent.message}</p>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="mr-2" size={20} />
              Send Message
            </>
          )}
        </motion.button>

        <p className="text-center text-sm text-gray-600 mt-4">
          For emergencies, please call <a href="tel:+93792453030" className="text-[#E9756D] font-semibold hover:underline">+93 79 245 3030</a>
        </p>
      </form>
    </div>
  );
};

export default ContactForm;