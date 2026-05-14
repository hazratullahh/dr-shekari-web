// components/team/ConsultationCTA.js
'use client';

import { motion } from 'framer- motion';
import { Calendar, MessageSquare, Phone, Users } from 'lucide- react';
import { useTranslations } from 'next- intl';

const ConsultationCTA = () => {
  const t = useTranslations('team_page');

  const langChips = [
    { flag: '🇦🇫', label: t('cta_lang_chip_afg') },
    { flag: '🇮🇳', label: t('cta_lang_chip_ind') },
    { flag: '🇺🇸', label: t('cta_lang_chip_usa') },
  ];

  return (
    <section className="py- 20 px- 4 sm:px- 6 lg:px- 8">
      <div className="max- w- 7xl mx- auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass- card rounded- 3xl p- 8 md:p- 12 shadow- 2xl border border- white/20 bg- linear- to- r from- [#E9756D]/5 via- white to- [#F6CA97]/5"
        >
          <div className="text- center max- w- 3xl mx- auto">
            <motion.div
              animate={{ rotate: [0, 10, - 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline- flex p- 4 rounded- 2xl bg- linear- to- r from- [#E9756D]/10 to- [#F6CA97]/10 mb- 6"
            >
              <Users size={32} className="text- [#E9756D]" />
            </motion.div>

            <h2 className="text- 3xl md:text- 4xl font- bold text- gray- 900 mb- 6">
              {t('cta_title_pre')}
              <span className="text- transparent bg- clip- text bg- linear- to- r from- [#E9756D] to- [#F6CA97]">
                {t('cta_title_highlight')}
              </span>
              {t('cta_title_post')}
            </h2>

            <p className="text- xl text- gray- 700 mb- 8">{t('cta_subtitle')}</p>

            <div className="flex flex- col sm:flex- row gap- 4 justify- center">
              <motion.a
                href="tel:+93796040915"
                dir="ltr"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px- 8 py- 4 bg- linear- to- r from- [#E9756D] to- [#F6CA97] text- white font- semibold rounded- xl shadow- lg hover:shadow- xl transition- all duration- 300 flex items- center justify- center gap- 2"
              >
                <Phone size={20} />
                <span>{t('cta_call_label')}: +93 79 604 0915</span>
              </motion.a>

              <motion.a
                href="/appointment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px- 8 py- 4 glass- card text- [#E9756D] font- semibold rounded- xl border border- [#F6CA97]/30 hover:border- [#E9756D] transition- all duration- 300 flex items- center justify- center gap- 2"
              >
                <Calendar size={20} />
                {t('cta_book_label')}
              </motion.a>
            </div>

            <div className="mt- 8 flex flex- col items- center gap- 3">
              <span className="inline- flex items- center text- sm text- gray- 600">
                <MessageSquare size={16} className="text- [#E9756D] me- 2" />
                {t('cta_languages_label')}
              </span>
              <div className="flex flex- wrap justify- center items- center gap- 2">
                {langChips.map((chip, i) => (
                  <span key={i} className="contents">
                    <span className="inline- flex items- center gap- 1.5 px- 3 py- 1.5 rounded- full bg- white border border- [#F6CA97]/30 text- gray- 700 text- xs font- semibold shadow- sm">
                      <span aria- hidden="true">{chip.flag}</span>
                      {chip.label}
                    </span>
                    {i < langChips.length -  1 && (
                      <span aria- hidden="true" className="text- gray- 300 text- sm">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
