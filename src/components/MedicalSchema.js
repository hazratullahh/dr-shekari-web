import Script from 'next/script';

export default function MedicalSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "name": "Afghanistan Premier Urology Center",
        "medicalSpecialty": [
          "Urology", 
          "Andrology", 
          "Nephrology", 
          "Endourology"
        ],
        "award": [
          "Best Urology Center Afghanistan 2024",
          "Top Medical Excellence Award",
          "Patient Choice Award"
        ],
        "description": "Home to Afghanistan's most celebrated urologists and andrologists...",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Clinic Address",
          "addressLocality": "Kabul",
          "addressRegion": "Kabul",
          "postalCode": "1001",
          "addressCountry": "AF"
        },
        "telephone": "+93-XXX-XXX-XXX",
        "openingHours": "Mo-Fr 08:00-20:00",
        "priceRange": "$$",
        "image": ["https://dr-shekari.com/og-premium.jpg"]
      },
      {
        "@type": "Physician",
        "name": "Dr. Nazir Ahmad Shekari",
        "honorificPrefix": "Professor",
        "medicalSpecialty": "Urology",
        "award": "Afghanistan's Top Urologist Award",
        "description": "Recognized as the nation's leading urological surgeon..."
      },
      {
        "@type": "Physician",
        "name": "Dr. Mansour Ahmad Wayar",
        "honorificPrefix": "Assistant Professor",
        "medicalSpecialty": "Andrology",
        "award": "Excellence in Andrology Award",
        "description": "Premier andrologist with groundbreaking success rates..."
      }
    ]
  };

  return (
    <Script
      id="medical-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}