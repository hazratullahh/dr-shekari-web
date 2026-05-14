// components/team/MedicalDirectors.js
'use client';

import { motion } from 'framer- motion';
import Image from 'next/image';
import { useTranslations } from 'next- intl';
import {
  Award,
  Star,
  GraduationCap,
  ShieldCheck,
  MapPin,
  Languages,
  HeartPulse,
} from 'lucide- react';

const MedicalDirectors = () => {
  const t = useTranslations('team_page');

  const drShekari = {
    name: t('shekari_name'),
    position: t('shekari_position'),
    nationality: t('label_nationality'),
    flag: '🇦🇫',
    experience: t('shekari_experience'),
    specialty: t('shekari_specialty'),
    education: t('shekari_education'),
    image: '/images/dr- shekari.jpg',
    achievements: [
      t('shekari_achievement_1'),
      t('shekari_achievement_2'),
      t('shekari_achievement_3'),
      t('shekari_achievement_4'),
    ],
    languages: [t('shekari_lang_dari'), t('shekari_lang_pashto'), t('shekari_lang_english')],
    location: t('shekari_location'),
  };

  const drWayar = {
    name: t('wayar_name'),
    position: t('wayar_position'),
    roleShort: t('wayar_role_short'),
    specialty: t('wayar_specialty'),
    dept: t('wayar_dept'),
    nationality: t('label_nationality'),
    flag: '🇦🇫',
    image: '/images/dr- wayar.jpg',
    imageAlt: t('wayar_image_alt'),
    status: t('wayar_status'),
    location: t('wayar_location'),
  };

  return (
    <section
      id="medical- directors"
      className="py- 20 px- 4 sm:px- 6 lg:px- 8 bg- linear- to- b from- white to- gray- 50"
      itemScope
      itemType="https://schema.org/MedicalOrganization"
    >
      <meta itemProp="name" content="Dr. Shekari Urology Clinic - Medical Leadership" />
      <div className="max- w- 6xl mx- auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text- center mb- 14"
        >
          <span className="inline- flex items- center gap- 2 px- 4 py- 1.5 rounded- full bg- white border border- [#E9756D]/20 shadow- sm text- [#E9756D] text- xs font- semibold tracking- wide uppercase mb- 5">
            <Award size={13} />
            {t('leadership_badge')}
          </span>
          <h2 className="text- 4xl md:text- 5xl font- bold text- gray- 900 mb- 4">
            {t('leadership_title_pre')}
            <span className="text- transparent bg- clip- text bg- linear- to- r from- [#E9756D] to- [#F6CA97]">
              {t('leadership_title_name')}
            </span>
          </h2>
          <p className="text- lg text- gray- 700 max- w- 3xl mx- auto">
            {t('leadership_subtitle')}
          </p>
        </motion.div>

        {/* === FEATURED LANDSCAPE CARD - Dr. Shekari === */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          itemProp="employee"
          itemScope
          itemType="https://schema.org/Physician"
          className="group relative overflow- hidden rounded- 3xl bg- white shadow- [0_30px_80px_- 30px_rgba(233,117,109,0.35)] ring- 1 ring- [#F6CA97]/40"
        >
          <meta itemProp="name" content={drShekari.name} />
          <meta itemProp="jobTitle" content={drShekari.position} />
          <meta itemProp="medicalSpecialty" content="Urology" />
          <meta itemProp="medicalSpecialty" content="Endourology" />
          <meta itemProp="medicalSpecialty" content="Andrology" />
          <meta itemProp="nationality" content={drShekari.nationality} />

          {/* soft brand glow */}
          <div
            aria- hidden="true"
            className="absolute - top- 32 - right- 24 w- 104 h- 104 rounded- full bg- [#E9756D]/10 blur- 3xl pointer- events- none"
          />
          <div
            aria- hidden="true"
            className="absolute - bottom- 24 - left- 16 w- 88 h- 88 rounded- full bg- [#F6CA97]/15 blur- 3xl pointer- events- none"
          />

          <div className="relative grid grid- cols- 1 lg:grid- cols- 12 gap- 0 items- stretch">
            {/* Portrait - balanced 6/12 split, perfectly centered with object- top so face is visible */}
            <div className="lg:col- span- 6 relative bg- linear- to- br from- [#FDF5EE] via- white to- [#F6CA97]/10">
              <div className="relative w- full h- 80 sm:h- 112 lg:h- full lg:min- h- 140 overflow- hidden flex items- center justify- center">
                <Image
                  src={drShekari.image}
                  alt={`${drShekari.name} - ${drShekari.position}`}
                  fill
                  itemProp="image"
                  className="object- cover object- [center_top] transition- transform duration- 700 group- hover:scale- [1.04]"
                  sizes="(max- width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset- 0 bg- linear- to- t from- black/55 via- black/5 to- transparent lg:bg- linear- to- r lg:from- transparent lg:via- transparent lg:to- white/15" />

                {/* flag chip */}
                <div className="absolute top- 5 left- 5 inline- flex items- center gap- 2 px- 3 py- 1.5 rounded- full bg- white/95 backdrop- blur text- gray- 900 text- xs font- semibold shadow- lg z- 10">
                  <span className="text- base leading- none" aria- hidden="true">
                    {drShekari.flag}
                  </span>
                  {drShekari.nationality}
                </div>

                {/* rating */}
                <div className="absolute top- 5 right- 5 inline- flex items- center gap- 1 px- 3 py- 1.5 rounded- full bg- white/95 backdrop- blur text- amber- 500 text- xs font- bold shadow- lg z- 10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill- current" />
                  ))}
                </div>

                {/* mobile name overlay */}
                <div className="absolute bottom- 5 left- 5 right- 5 lg:hidden z- 10">
                  <h3 className="text- 2xl font- bold text- white leading- tight drop- shadow- md">{drShekari.name}</h3>
                  <p className="text- [#F6CA97] text- sm font- medium mt- 1 drop- shadow">{drShekari.position}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col- span- 6 p- 7 sm:p- 9 lg:p- 10">
              <div className="hidden lg:flex items- center gap- 2 mb- 4">
                <span className="inline- flex items- center gap- 2 px- 3 py- 1 rounded- full bg- linear- to- r from- [#E9756D]/10 to- [#F6CA97]/10 border border- [#F6CA97]/30 text- [#E9756D] text- [11px] font- semibold uppercase tracking- wider">
                  <ShieldCheck size={12} /> {t('label_chief')}
                </span>
                <span className="inline- flex items- center gap- 1.5 px- 3 py- 1 rounded- full bg- emerald- 50 border border- emerald- 100 text- emerald- 700 text- [11px] font- semibold uppercase tracking- wider">
                  <span className="w- 1.5 h- 1.5 rounded- full bg- emerald- 500 animate- pulse" />
                  {t('label_practicing')}
                </span>
              </div>

              <h3 className="hidden lg:block text- 3xl xl:text- 4xl font- extrabold text- gray- 900 leading- tight tracking- tight">
                {drShekari.name}
              </h3>
              <p className="hidden lg:block text- lg font- semibold mt- 2 bg- clip- text text- transparent bg- linear- to- r from- [#E9756D] to- [#F6CA97]">
                {drShekari.position}
              </p>
              <p className="text- gray- 600 mt- 2 lg:mt- 1.5" itemProp="description">
                {drShekari.specialty}
              </p>

              {/* highlight grid */}
              <dl className="mt- 6 grid grid- cols- 2 gap- 3">
                <div className="rounded- 2xl border border- gray- 100 bg- white/60 backdrop- blur- sm p- 4">
                  <dt className="text- [10px] font- semibold uppercase tracking- wider text- gray- 500">
                    {t('label_experience')}
                  </dt>
                  <dd className="text- lg font- bold text- gray- 900 mt- 1">{drShekari.experience}</dd>
                </div>
                <div className="rounded- 2xl border border- gray- 100 bg- white/60 backdrop- blur- sm p- 4">
                  <dt className="text- [10px] font- semibold uppercase tracking- wider text- gray- 500">
                    {t('label_department')}
                  </dt>
                  <dd className="text- sm font- bold text- gray- 900 mt- 1 leading- tight">
                    {t('label_department_value')}
                  </dd>
                </div>
              </dl>

              {/* education */}
              <div className="mt- 5 p- 4 rounded- 2xl bg- linear- to- r from- [#E9756D]/5 to- [#F6CA97]/5 border border- [#F6CA97]/20">
                <div className="flex items- center gap- 2 mb- 1.5">
                  <GraduationCap size={16} className="text- [#E9756D]" />
                  <span className="text- xs font- semibold uppercase tracking- wider text- gray- 700">
                    {t('label_international_training')}
                  </span>
                </div>
                <p className="text- gray- 800 font- medium" itemProp="alumniOf">
                  {drShekari.education}
                </p>
              </div>

              {/* achievements */}
              <div className="mt- 6">
                <h4 className="flex items- center gap- 2 font- semibold text- gray- 900 mb- 3">
                  <Award size={16} className="text- [#E9756D]" />
                  {t('label_key_achievements')}
                </h4>
                <ul className="space- y- 2.5" itemProp="award">
                  {drShekari.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: - 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      viewport={{ once: true }}
                      className="flex items- start gap- 3"
                    >
                      <span className="mt- 1.5 w- 1.5 h- 1.5 rounded- full bg- linear- to- r from- [#E9756D] to- [#F6CA97] shrink- 0" />
                      <span className="text- gray- 700 leading- relaxed text- [15px]">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* footer meta */}
              <div className="mt- 7 pt- 5 border- t border- gray- 100 flex flex- wrap gap- x- 6 gap- y- 2 text- sm text- gray- 600">
                <span className="inline- flex items- center gap- 1.5" itemProp="workLocation">
                  <MapPin size={14} className="text- [#E9756D]" />
                  {drShekari.location}
                </span>
                <span className="inline- flex items- center gap- 1.5" itemProp="knowsLanguage">
                  <Languages size={14} className="text- [#E9756D]" />
                  {drShekari.languages.join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* === SUPPORTING CARD - Dr. Mansour Ahmad Wayar (Surgical Assistant) === */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          viewport={{ once: true }}
          whileHover={{ y: - 3 }}
          itemScope
          itemType="https://schema.org/Physician"
          className="group relative mt- 6 overflow- hidden rounded- 2xl border border- gray- 100 bg- linear- to- r from- white via- white to- [#FDF5EE]/60 backdrop- blur- sm shadow- sm hover:shadow- xl hover:shadow- [#E9756D]/10 hover:border- [#F6CA97]/50 transition- all duration- 500"
          aria- label={`${drWayar.name} - ${drWayar.position}`}
        >
          {/* SEO microdata */}
          <meta itemProp="name" content={drWayar.name} />
          <meta itemProp="jobTitle" content={drWayar.position} />
          <meta itemProp="medicalSpecialty" content="Urology" />
          <meta itemProp="medicalSpecialty" content="Surgical Assistance" />
          <meta itemProp="nationality" content={drWayar.nationality} />
          <meta itemProp="affiliation" content="Jami Hospital, Herat, Afghanistan" />
          <meta itemProp="worksFor" content="Urology Department, Jami Hospital" />
          <meta itemProp="knowsLanguage" content="Dari" />
          <meta itemProp="knowsLanguage" content="Pashto" />
          <meta itemProp="knowsLanguage" content="English" />

          {/* gradient accent strip */}
          <div
            aria- hidden="true"
            className="absolute inset- y- 0 start- 0 w- 1 bg- linear- to- b from- [#E9756D] to- [#F6CA97]"
          />

          {/* soft glow on hover */}
          <div
            aria- hidden="true"
            className="absolute - right- 16 - bottom- 16 w- 48 h- 48 rounded- full bg- [#F6CA97]/10 blur- 3xl opacity- 0 group- hover:opacity- 100 transition- opacity duration- 700 pointer- events- none"
          />

          <div className="relative flex flex- col sm:flex- row sm:items- center gap- 4 sm:gap- 5 p- 5 sm:p- 6 ps- 6 sm:ps- 7">
            {/* Portrait + mobile name */}
            <div className="flex items- center gap- 4 sm:gap- 5 sm:shrink- 0">
              <div className="relative shrink- 0">
                {/* Real photo, perfectly centered, head- positioned */}
                <div className="relative w- 20 h- 20 sm:w- 24 sm:h- 24 rounded- 2xl overflow- hidden ring- 2 ring- white shadow- lg shadow- [#E9756D]/20 bg- linear- to- br from- [#E9756D]/10 to- [#F6CA97]/10">
                  <Image
                    src={drWayar.image}
                    alt={drWayar.imageAlt}
                    fill
                    itemProp="image"
                    className="object- cover object- [center_top]"
                    sizes="96px"
                  />
                </div>
                <span
                  className="absolute - bottom- 1 - end- 1 w- 6 h- 6 rounded- full bg- white border- 2 border- white shadow- md flex items- center justify- center"
                  aria- hidden="true"
                >
                  <span className="text- [11px] leading- none">{drWayar.flag}</span>
                </span>
              </div>

              <div className="sm:hidden min- w- 0">
                <h3 className="text- base font- bold text- gray- 900 leading- tight">{drWayar.name}</h3>
                <p className="text- xs text- [#E9756D] font- semibold mt- 0.5">{drWayar.roleShort}</p>
              </div>
            </div>

            {/* Main content */}
            <div className="flex- 1 min- w- 0 hidden sm:block">
              <div className="flex items- center gap- 2 mb- 1 flex- wrap">
                <span className="inline- flex items- center gap- 1 px- 2 py- 0.5 rounded- full bg- [#E9756D]/10 text- [#E9756D] text- [10px] font- bold uppercase tracking- wider">
                  <HeartPulse size={10} />
                  {drWayar.roleShort}
                </span>
                <span className="text- [10px] text- gray- 400 font- medium">·</span>
                <span className="text- [10px] text- gray- 500 font- medium">{drWayar.dept}</span>
              </div>
              <h3 className="text- lg font- bold text- gray- 900 leading- tight">{drWayar.name}</h3>
              <p className="text- sm text- gray- 600 mt- 1 leading- snug" itemProp="description">
                {drWayar.specialty}
              </p>
            </div>

            {/* Mobile specialty */}
            <p className="sm:hidden text- xs text- gray- 600 leading- relaxed">{drWayar.specialty}</p>

            {/* Right meta */}
            <div className="flex items- center gap- 2 flex- wrap sm:flex- nowrap sm:shrink- 0">
              <span className="inline- flex items- center gap- 1.5 px- 3 py- 1.5 rounded- full bg- emerald- 50 text- emerald- 700 text- [11px] font- bold border border- emerald- 100">
                <span className="w- 1.5 h- 1.5 rounded- full bg- emerald- 500 animate- pulse" />
                {drWayar.status}
              </span>
              <span className="inline- flex items- center gap- 1.5 px- 3 py- 1.5 rounded- full bg- gray- 50 text- gray- 700 text- [11px] font- semibold border border- gray- 100">
                <MapPin size={11} className="text- [#E9756D]" />
                {drWayar.location}
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default MedicalDirectors;
