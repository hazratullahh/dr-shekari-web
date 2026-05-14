import Script from 'next/script';

const SITE = 'https://dr- shekari.com';

const FAQ_ENTRIES = [
  {
    q: 'Who is Dr. Nazir Ahmad Shekari?',
    a: 'Dr. Nazir Ahmad Shekari is the Chief of the Urology Department at Jami Hospital in Herat, Afghanistan. He is an MD Urologist with a Fellowship in Endourology from Kazakhstan, former Chief of Stone Diseases, Endourology and Lithotripsy at the Scientific Center of Urology (Almaty), and a member of the European Association of Urology (EAU).',
  },
  {
    q: "What are Dr. Shekari's specializations?",
    a: 'Dr. Shekari specializes in three areas: Urological Surgery, Endourology (minimally- invasive surgery inside the urinary tract), and Andrology (men\'s reproductive and sexual health).',
  },
  {
    q: 'Where can I book an appointment with Dr. Shekari?',
    a: 'You can book an appointment online at https://dr- shekari.com/appointment, by calling +93 79 604 0915, or by visiting the Urology Department at Jami Hospital in Herat, Afghanistan during clinic hours.',
  },
  {
    q: 'What conditions does Dr. Shekari treat?',
    a: 'Dr. Shekari treats kidney and ureteric stones (PCNL, RIRS, lithotripsy), prostate disorders, urinary tract infections, male infertility, sexual dysfunction, and provides advanced endourological surgical procedures including laser stone treatment and minimally- invasive prostate surgery.',
  },
  {
    q: 'Does Dr. Shekari offer 24/7 emergency urology care?',
    a: 'Yes. The clinic operates a 24/7 emergency urology line on +93 79 604 0915 for urgent cases such as severe kidney pain, inability to urinate, or testicular emergencies.',
  },
  {
    q: 'Is Dr. Shekari internationally trained?',
    a: 'Yes. Dr. Shekari completed an Endourology Fellowship in Kazakhstan and previously served as Chief of Stone Diseases, Endourology and Lithotripsy at the Scientific Center of Urology in Almaty. He is a member of the European Association of Urology (EAU).',
  },
];

export default function HomeStructuredData() {
  const physician = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SITE}/#dr- shekari`,
    name: 'Dr. Nazir Ahmad Shekari',
    alternateName: ['Nazir Ahmad Shekari', 'Dr. Shekari', 'دکتر نذیر احمد شکاری', 'ډاکټر نذیر احمد شکاري'],
    jobTitle: 'Chief, Urology Department of Jami Hospital · Endourology & Andrology Specialist',
    description:
      'Dr. Nazir Ahmad Shekari is the Chief of the Urology Department at Jami Hospital in Herat, Afghanistan. MD Urologist with Fellowship in Endourology (Kazakhstan), former Chief of Stone Diseases, Endourology and Lithotripsy at the Scientific Center of Urology (Almaty), and a member of the European Association of Urology (EAU).',
    image: `${SITE}/images/dr- shekari.jpg`,
    url: SITE,
    telephone: '+93796040915',
    email: 'urology@dr- shekari.com',
    nationality: 'Afghanistan',
    medicalSpecialty: ['Urology', 'Endourology', 'Andrology'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chahar- e- rahi- Badmorghan, Jami Hospital',
      addressLocality: 'Herat',
      addressRegion: 'Herat',
      addressCountry: 'AF',
    },
    knowsLanguage: ['Dari', 'Pashto', 'English'],
    knowsAbout: [
      'Kidney Stone Treatment',
      'Endourology',
      'Andrology',
      'Prostate Surgery',
      'Male Infertility',
      'Laser Stone Surgery',
      'Lithotripsy',
      'PCNL',
      'RIRS',
      'Minimally Invasive Urology',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Scientific Center of Urology, Almaty, Kazakhstan',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'European Association of Urology (EAU)',
      url: 'https://uroweb.org/',
    },
    worksFor: {
      '@type': 'Hospital',
      name: 'Jami Hospital, Herat, Afghanistan',
    },
    sameAs: [SITE, `${SITE}/en/about`, `${SITE}/fa/about`, `${SITE}/ps/about`],
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Script
        id="home- physician- schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physician) }}
      />
      <Script
        id="home- faq- schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
