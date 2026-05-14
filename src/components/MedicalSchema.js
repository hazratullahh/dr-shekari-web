import Script from 'next/script';

export default function MedicalSchema() {
  const SITE = 'https://dr-shekari.com';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${SITE}/#dr-shekari`,
        name: 'Dr. Nazir Ahmad Shekari',
        alternateName: ['Dr. Nazir Shekari', 'Dr. Shekari', 'Nazir Ahmad Shekari'],
        honorificPrefix: 'Dr.',
        jobTitle: 'Urological Surgeon · Endourology Specialist · Andrology Specialist',
        description:
          "Dr. Nazir Ahmad Shekari is one of Afghanistan's leading urological surgeons, specializing in endourology and andrology. He provides advanced minimally invasive treatment for kidney stones, prostate disease, urinary tract conditions and male infertility.",
        image: `${SITE}/images/dr-shekari.jpg`,
        url: SITE,
        medicalSpecialty: ['Urology', 'Endourology', 'Andrology'],
        knowsAbout: [
          'Kidney Stone Treatment',
          'Endourology',
          'Andrology',
          'Prostate Surgery',
          'Male Infertility',
          'Laser Stone Surgery',
          'Minimally Invasive Urology',
          'Erectile Dysfunction Treatment',
        ],
        worksFor: { '@id': `${SITE}/#clinic` },
        availableService: [
          { '@type': 'MedicalProcedure', name: 'Kidney Stone Surgery' },
          { '@type': 'MedicalProcedure', name: 'Endourological Procedures' },
          { '@type': 'MedicalProcedure', name: 'Prostate Treatment' },
          { '@type': 'MedicalProcedure', name: 'Male Infertility Evaluation' },
          { '@type': 'MedicalProcedure', name: 'Andrological Care' },
        ],
      },
      {
        '@type': 'MedicalClinic',
        '@id': `${SITE}/#clinic`,
        name: 'Dr. Shekari Urology Clinic',
        url: SITE,
        logo: `${SITE}/logo.png`,
        image: `${SITE}/images/og-premium.jpg`,
        medicalSpecialty: ['Urology', 'Andrology', 'Endourology'],
        priceRange: '$$',
        telephone: '+93796040915',
        email: 'urology@dr-shekari.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chahar-e-rahi-Badmorghan, Jami Hospital',
          addressLocality: 'Herat',
          addressRegion: 'Herat',
          addressCountry: 'AF',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '20:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Sunday',
            opens: '09:00',
            closes: '14:00',
          },
        ],
        physician: { '@id': `${SITE}/#dr-shekari` },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+93796040915',
          contactType: 'customer service',
          availableLanguage: ['Dari', 'Pashto', 'English'],
        },
      },
    ],
  };

  return (
    <Script
      id="medical-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
