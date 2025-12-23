'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

// Yup validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().email('Invalid email address'),
  mobileNumber: yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{9}$/, 'Enter 9-digit Afghan mobile number (without +93)'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      message: ''
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

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <CheckCircle className="text-green-600 mr-3" size={24} />
            <div>
              <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
              <p className="text-green-700 text-sm mt-1">We'll contact you within 2 hours. Emergency? Call +93 79 245 3030</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
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
       <div className="grid grid-cols-1 md:grid-cols-3 gap-2 space-y-4">


          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Full Name <span className="text-[#E9756D]">*</span>
            </label>
            <input type="text" {...register('fullName')} className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder="Enter your full name" />
            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <input type="email" {...register('email')} className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder="your.email@example.com" />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Mobile Number with +93 addon */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Mobile Number <span className="text-[#E9756D]">*</span></label>
            <div className="relative">
              {/* <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+93</div> */}
              <input type="tel" {...register('mobileNumber')} className={`w-full pl-12 px-4 py-3 rounded-xl border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder="79 123 4567" />
            </div>
            {errors.mobileNumber && <p className="mt-2 text-sm text-red-600">{errors.mobileNumber.message}</p>}
            <p className="mt-1 text-xs text-gray-500">Format: 79 123 4567 (without +93)</p>
          </div>

        </div>
        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Message <span className="text-[#E9756D]">*</span></label>
          <textarea rows={4} {...register('message')} className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all resize-none`} placeholder="Please describe your symptoms or reason for consultation..."></textarea>
          {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 cursor-pointer mt-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
          {isSubmitting ? (<><Loader2 className="animate-spin mr-2" size={20} />Sending Message...</>) : (<><Send className="mr-2" size={20} />Send Message</>)}
        </motion.button>

        <p className="text-center text-sm text-gray-600 mt-4">For emergencies, please call <a href="tel:+93792453030" className="text-[#E9756D] font-semibold hover:underline">+93 79 245 3030</a></p>
      </form>
    </div>
  );
};

export default ContactForm;
