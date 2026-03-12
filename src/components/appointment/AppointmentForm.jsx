'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const AppointmentForm = () => {
  const t = useTranslations('appointment_page');

  const schema = yup.object().shape({
    fullName: yup.string().required(t('form_full_name') + ' is required').min(3, t('form_full_name') + ' must be at least 3 characters'),
    age: yup.number().typeError(t('form_age') + ' must be a number').required(t('form_age') + ' is required').min(0).max(120),
    mainProblem: yup.string().required(t('form_problem') + ' is required').min(5),
    phone: yup.string().required(t('form_phone') + ' is required').matches(/^[0-9]{9}$/, t('form_phone') + ' must be 9 digits'),
    day: yup.string().required(t('form_day') + ' is required'),
    time: yup.string().required(t('form_time') + ' is required')
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      age: '',
      mainProblem: '',
      phone: '',
      day: '',
      time: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    // sanitize
    const payload = {
      fullName: data.fullName.trim(),
      age: data.age,
      mainProblem: data.mainProblem.trim(),
      phone: data.phone.trim(),
      preferredDay: data.day,
      preferredTime: data.time
    };

    try {
      const res = await fetch('https://api/dr-shekari.com.vercel.app/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Network response was not ok');
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Appointment form submission error', err);
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/20" id="appointment-form">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {t('hero_title')}
        </h2>
        <p className="text-gray-600">
          {t('hero_subtitle')}
        </p>
      </div>

      {isSubmitted && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <CheckCircle className="text-green-600 mx-3" size={24} />
            <div>
              <h4 className="font-semibold text-green-800">{t('success')}</h4>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-linear-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <AlertCircle className="text-red-600 mx-3" size={24} />
            <div>
              <h4 className="font-semibold text-red-800">{t('error')}</h4>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t('form_full_name')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="text" {...register('fullName')} className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('form_full_name')} />
            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t('form_age')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="number" {...register('age')} className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('form_age')} />
            {errors.age && <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t('form_problem')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="text" {...register('mainProblem')} className={`w-full px-4 py-3 rounded-xl border ${errors.mainProblem ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('form_problem')} />
            {errors.mainProblem && <p className="mt-2 text-sm text-red-600">{errors.mainProblem.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t('form_phone')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="tel" dir="ltr" {...register('phone')} className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border_gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder="079 123 4567" />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t('form_day')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="text" {...register('day')} className={`w-full px-4 py-3 rounded-xl border ${errors.day ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('form_day')} />
            {errors.day && <p className="mt-2 text-sm text-red-600">{errors.day.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t('form_time')} <span className="text-[#E9756D]">*</span>
            </label>
            <input type="text" {...register('time')} className={`w-full px-4 py-3 rounded-xl border ${errors.time ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#E9756D]/20 focus:border-[#E9756D] transition-all`} placeholder={t('form_time')} />
            {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>}
          </div>
        </div>

        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 cursor-pointer mt-3 bg-linear-to-r from-[#E9756D] to-[#F6CA97] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
          {isSubmitting ? (<><Loader2 className="animate-spin mx-2" size={20} />{t('submit')}...</>) : (<><Send className="mr-2" size={20} />{t('submit')}</>)}
        </motion.button>
      </form>
    </div>
  );
};

export default AppointmentForm;
