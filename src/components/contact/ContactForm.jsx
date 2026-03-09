'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Yup validation schema
const ContactForm = () => {
  const t = useTranslations('contact');

  // Yup validation schema
  const schema = yup.object().shape({
    fullName: yup.string().required(t('full_name_required')).min(3, t('name_min_length')),
    email: yup.string().email(t('invalid_email')),
    mobileNumber: yup.string()
      .required(t('mobile_required'))
      .matches(/^[0-9]{9}$/, t('afghan_mobile_format')),
    message: yup.string().required(t('message_required')).min(10, t('message_min_length'))
  });
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
          {t('send_us_a_message')}
        </h2>
        <p className="text-gray-600">
          {t('form_description')}
        </p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <CheckCircle className="text-green-600 mx-3" size={24} />
            <div>
              <h4 className="font-semibold text-green-800">{t('message_sent_successfully')}</h4>
              <p className="text-green-700 text-sm mt-1">{t('success_message')}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <AlertCircle className="text-red-600 mx-3" size={24} />
            <div>
              <h4 className="font-semibold text-red-800">{t('error_submitting_form')}</h4>
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
              {t('full_name')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="text" {...register('fullName')} className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('enter_full_name')} />
            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">{t('email_address')}</label>
            <input type="email" {...register('email')} className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('email_placeholder')} />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Mobile Number with +93 addon */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">{t('mobile_number')} <span className="text-[#E9756D]">*</span></label>
            <div className="relative">
              {/* <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+93</div> */}
              <input
                type="tel"
                dir='ltr'
                {...register('mobileNumber')}
                className={`w-full px-4 py-3 rounded-xl border
               ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`}
                placeholder={t('mobile_placeholder')} />
            </div>
            {errors.mobileNumber && <p className="mt-2 text-sm text-red-600">{errors.mobileNumber.message}</p>}
            {/* <p className="mt-1 text-xs text-gray-500">{t('mobile_format_hint')}</p> */}
          </div>

        </div>
        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">{t('message')} <span className="text-[#E9756D]">*</span></label>
          <textarea rows={4} {...register('message')} className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all resize-none`} placeholder={t('message_placeholder')}></textarea>
          {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 cursor-pointer mt-3 bg-gradient-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
          {isSubmitting ? (<><Loader2 className="animate-spin mx-2" size={20} />{t('sending_message')}</>) : (<><Send className="mr-2" size={20} />{t('send_message')}</>)}
        </motion.button>

        {/* <p className="text-center text-sm text-gray-600 mt-4">{t('emergency_call_text')}</p> */}
      </form>
    </div>
  );
};

export default ContactForm;
