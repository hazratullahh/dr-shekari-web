// config/app-config.js
// Configuration for Dr. Nazir Shekari & Dr. Mansour Wayar Urology Clinic

export const APP_CONFIG = {
    // Site Information
    site: {
        name: "Dr. Shekari & Dr. Wayar Advanced Urology Center",
        shortName: "Dr. Shekari Clinic",
        description: "Afghanistan's Premier Urology, Andrology & Kidney Care Center",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://dr-shekari.com",
        email: "urology@dr-shekari.com",
        phone: "+93 79 245 3030",
        address: {
            street: "Medical District, Street 15",
            city: "Herat",
            province: "Herat Province",
            country: "Afghanistan",
            postalCode: "1001",
            coordinates: {
                lat: 34.5553,
                lng: 69.2075
            }
        },
        languages: ["en", "fa", "ps"],
        defaultLanguage: "en",
        currency: "AFN",
        timezone: "Asia/Kabul"
    },

    // Doctors Information
    doctors: {
        primary: {
            id: "dr-nazir-shekari",
            name: "Dr. Nazir Ahmad Shekari",

            // Name variations for SEO
            altNames: [
                "Dr. Nazer Ahmad Shekari",
                "Dr. Nazeer Ahmad Shekari",
                "Dr. Nazir Ahmad Shekhari",
                "Dr. Naseer Ahmad Shekari",
                "Dr. Nazir A. Shekari",
                "Dr. Shekari Urologist",
                "Doktor Nazir Shekari",
                "Dr. Nazir Shekari",
                "نذیر احمد شکری",
                "ډاکټر نذیر احمد شکری"
            ],

            // Professional Titles
            titles: [
                "Urologist",
                "Andrologist",
                "Endourologist",
                "Kidney Transplant Surgeon",
                "Laparoscopic Urology Specialist",
                "Professor of Urology"
            ],

            // Specializations
            specializations: [
                "Kidney Stone Surgery",
                "Prostate Cancer Treatment",
                "Laparoscopic Urology",
                "Renal Transplants",
                "Bladder Cancer Surgery",
                "Pediatric Urology",
                "Urinary Tract Reconstruction"
            ],

            // Qualifications
            qualifications: [
                "MBBS - Herat Jami Medical University",
                "MS Urology - India",
                "Fellowship in Endourology - Germany",
                "Diploma in Laparoscopic Surgery - Turkey"
            ],

            // Experience
            experience: {
                years: 22,
                surgeries: 15000,
                specialAchievement: "First laparoscopic nephrectomy in Afghanistan"
            },

            // Awards
            awards: [
                "Best Urologist Award - Afghan Medical Association 2023",
                "Excellence in Surgery - Ministry of Public Health 2022",
                "Patient Choice Award - 5 consecutive years"
            ],

            // Languages spoken
            languages: ["Dari", "Pashto", "English", "Urdu"],

            // Consultation
            consultationFee: "1500 AFN",
            availability: "Mon-Sat: 9 AM - 5 PM"
        },

        secondary: {
            id: "dr-mansour-wayar",
            name: "Dr. Mansour Ahmad Wayar",

            // Name variations for SEO
            altNames: [
                "Dr. Mansoor Ahmad Weyar",
                "Dr. Mansoor Ahmad Wayar",
                "Dr. Mansour A. Wayar",
                "Dr. Mansour Weyar",
                "Dr. Mansoor Weyar",
                "Dr. Wayar Andrologist",
                "Doktor Mansour Wayar",
                "Professor Mansour Wayar",
                "منصور احمد وایار",
                "ډاکټر منصور احمد وایار"
            ],

            // Professional Titles
            titles: [
                "Andrologist",
                "Endourologist",
                "Male Fertility Specialist",
                "Sexual Medicine Expert",
                "Assistant Professor",
                "Reproductive Health Consultant"
            ],

            // Specializations
            specializations: [
                "Male Infertility Treatment",
                "Erectile Dysfunction",
                "Sexual Medicine",
                "Hormonal Disorders",
                "Microsurgery",
                "Penile Implants",
                "Low Testosterone Treatment"
            ],

            // Qualifications
            qualifications: [
                "MBBS - Nangarhar Medical University",
                "MD Andrology - Pakistan",
                "Fellowship in Reproductive Medicine - Iran",
                "Training in Microsurgery - India"
            ],

            // Experience
            experience: {
                years: 18,
                patients: 12000,
                specialAchievement: "Highest success rate in male infertility treatment in Afghanistan"
            },

            // Awards
            awards: [
                "Excellence in Andrology Award 2023",
                "Best Research Paper - Asian Andrology Conference 2022",
                "Young Achiever Award - Medical Sciences 2021"
            ],

            // Languages spoken
            languages: ["Pashto", "Dari", "English", "Arabic"],

            // Consultation
            consultationFee: "1200 AFN",
            availability: "Sun-Fri: 10 AM - 6 PM"
        }
    },

    // Clinic Information
    clinic: {
        name: "Advanced Urology & Andrology Center Herat",
        altNames: [
            "Shekari Urology Clinic",
            "Wayar Andrology Center",
            "Afghanistan Urology Hospital",
            "Herat Kidney Center",
            "Premier Urology Afghanistan"
        ],

        // Departments
        departments: [
            {
                name: "Urology Department",
                services: ["Kidney Stones", "Prostate", "Bladder", "Urinary Tract"]
            },
            {
                name: "Andrology Department",
                services: ["Male Fertility", "Sexual Health", "Hormonal Issues"]
            },
            {
                name: "Endourology Department",
                services: ["Minimally Invasive Surgery", "Laser Treatments", "Laparoscopy"]
            },
            {
                name: "Nephrology Department",
                services: ["Kidney Disease", "Dialysis", "Transplant Evaluation"]
            }
        ],

        // Facilities
        facilities: [
            "24/7 Emergency Urology Care",
            "Advanced Operation Theaters",
            "Digital Radiology & CT Scan",
            "Modern Pathology Laboratory",
            "Laparoscopic Surgery Unit",
            "Laser Treatment Center",
            "In-patient Private Rooms",
            "ICU with Ventilator Support",
            "Pharmacy on Premises",
            "Ambulance Service"
        ],

        // Equipment
        equipment: [
            "Digital C-Arm for Stone Surgery",
            "Holmium Laser for Prostate",
            "Laparoscopic Tower",
            "Flexible & Rigid Ureteroscopes",
            "USG with Doppler",
            "Digital X-Ray Machine",
            "CT Scan 128-Slice",
            "Fully Automated Lab Analyzers"
        ],

        // Staff
        staff: {
            urologists: 4,
            andrologists: 3,
            nephrologists: 2,
            nurses: 12,
            technicians: 8,
            supportStaff: 6
        }
    },

    // Services Configuration
    services: {
        categories: [
            {
                id: "kidney",
                name: "Kidney Treatments",
                services: [
                    {
                        id: "kidney-stones",
                        name: "Kidney Stone Treatment",
                        procedures: ["PCNL", "RIRS", "ESWL", "URS", "Laparoscopic Stone Surgery"],
                        recoveryTime: "2-7 days",
                        successRate: "98%"
                    },
                    {
                        id: "kidney-transplant",
                        name: "Kidney Transplant",
                        procedures: ["Live Donor Transplant", "Cadaver Transplant", "Pre-transplant Evaluation"],
                        recoveryTime: "2-4 weeks",
                        successRate: "95%"
                    }
                ]
            },
            {
                id: "prostate",
                name: "Prostate Treatments",
                services: [
                    {
                        id: "prostate-cancer",
                        name: "Prostate Cancer Treatment",
                        procedures: ["Radical Prostatectomy", "HIFU", "Brachytherapy", "Hormone Therapy"],
                        recoveryTime: "2-6 weeks",
                        successRate: "92%"
                    },
                    {
                        id: "bph",
                        name: "BPH/Enlarged Prostate",
                        procedures: ["TURP", "HoLEP", "GreenLight Laser", "UroLift"],
                        recoveryTime: "3-10 days",
                        successRate: "96%"
                    }
                ]
            },
            {
                id: "andrology",
                name: "Male Health Treatments",
                services: [
                    {
                        id: "infertility",
                        name: "Male Infertility Treatment",
                        procedures: ["Micro-TESE", "Varicocelectomy", "Sperm Retrieval", "IVF/ICSI Support"],
                        recoveryTime: "3-7 days",
                        successRate: "78%"
                    },
                    {
                        id: "erectile-dysfunction",
                        name: "Erectile Dysfunction",
                        procedures: ["Penile Implants", "Shockwave Therapy", "PRP Injections", "Medication"],
                        recoveryTime: "1-4 weeks",
                        successRate: "88%"
                    }
                ]
            }
        ]
    },

    // SEO Configuration
    seo: {
        // Common misspellings for automatic correction
        misspellings: {
            // Urology variations
            urology: ["urohlogy", "urolagy", "urolojy", "urlogy", "urologi"],
            urologist: ["urohlogist", "uroligist", "urolojist", "urlogist", "urologis"],
            andrology: ["androlagy", "androhlogy", "androlojy", "androlgy"],
            andrologist: ["androligist", "androhlogist", "androlojist", "androlgist"],
            endourology: ["endourolagy", "endo urohlogy", "endourolgy", "endo urology"],

            // Medical terms
            kidney: ["kidny", "kidne", "kidni", "kideny", "kidnay"],
            prostate: ["prostat", "prostrate", "prostet", "prostaet"],
            fertility: ["fertilty", "fertlity", "fertilite", "fertillity"],
            treatment: ["tratment", "tretment", "treatmant", "treatement"],

            // Doctor names
            shekari: ["shekhari", "shekary", "shikari", "shekri", "shekery"],
            wayar: ["weyar", "wayer", "wiyar", "waar", "wyar"],

            // Locations
            kabul: ["kabol", "kebul", "kabool", "khabul", "kabyl"],
            herat: ["kabol", "kebul", "kabool", "khabul", "kabyl"],
            afghanistan: ["afganistan", "afghanstan", "afganstan", "afghanisthan"]
        },

        // Location keywords
        locations: {
            primary: [
                "Kabul", "Kabul Afghanistan", "Kabul City", "Kabul Medical District",
                "Wazir Akbar Khan", "Shahr-e-Naw", "Macroyan", "Karte Se", "Karte Char"
            ],
            secondary: [
                "Herat", "Herat Afghanistan", "Western Afghanistan",
                "Mazar-e-Sharif", "Mazar", "Balkh Province", "Northern Afghanistan",
                "Kandahar", "Kandahar Afghanistan", "Southern Afghanistan",
                "Jalalabad", "Nangarhar", "Eastern Afghanistan"
            ],
            tertiary: [
                "Ghazni", "Khost", "Kunduz", "Baghlan", "Bamyan",
                "Farah", "Helmand", "Logar", "Paktia", "Parwan"
            ]
        },

        // Service keywords
        serviceKeywords: [
            // Kidney related
            "kidney pain treatment", "renal stone surgery", "kidney failure doctor",
            "dialysis access surgery", "kidney infection treatment", "renal transplant cost",

            // Prostate related
            "prostate psa test", "prostate biopsy", "prostate laser surgery",
            "prostate medication", "prostate checkup", "prostate ultrasound",

            // Male health
            "male fertility test", "sperm analysis", "testosterone treatment",
            "premature ejaculation", "low libido treatment", "penile curvature",

            // General urology
            "urinary infection", "bladder control", "overactive bladder",
            "blood in urine", "urinary blockage", "urinary catheter"
        ],

        // Patient intent keywords
        patientIntent: [
            "best doctor for", "top specialist in", "expert treatment for",
            "advanced surgery for", "affordable treatment", "cost of surgery",
            "success rate of", "recovery time for", "side effects of",
            "second opinion for", "emergency treatment", "urgent care for"
        ],

        // Question keywords
        questionKeywords: [
            "what is", "how to treat", "symptoms of", "causes of",
            "diagnosis for", "treatment options for", "surgery for",
            "medication for", "prevention of", "recovery from",
            "cost of", "best hospital for", "specialist for"
        ]
    },

    // Appointment Configuration
    appointments: {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timings: {
            morning: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
            afternoon: ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
        },
        consultationDuration: 30, // minutes
        emergencyTimings: "24/7 Available",
        bookingMethods: ["Phone", "WhatsApp", "Website", "In-person"],
        cancellationPolicy: "24 hours notice required"
    },

    // Contact Information
    contact: {
        primaryPhone: "+93 79 245 3030",
        secondaryPhone: "+93 79 245 3030",
        emergencyPhone: "+93 79 245 3030",
        whatsapp: "+93 79 245 3030",
        email: {
            general: "urology@dr-shekari.com",
            appointments: "urology@dr-shekari.com",
            emergency: "urology@dr-shekari.com"
        },
        socialMedia: {
            facebook: "https://facebook.com/drshekari",
            twitter: "https://twitter.com/drshekari",
            instagram: "https://instagram.com/drshekari",
            linkedin: "https://linkedin.com/company/drshekari",
            youtube: "https://youtube.com/@drshekari"
        }
    },

    // Analytics & Tracking
    analytics: {
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX",
        googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXX",
        facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "XXXXXXXXXXXXXXX",
        hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || "XXXXXX"
    },

    // Performance Settings
    performance: {
        imageOptimization: true,
        lazyLoading: true,
        prefetchLinks: true,
        cacheStrategy: "stale-while-revalidate",
        cdnEnabled: false
    },

    // Legal Information
    legal: {
        companyName: "Shekari Medical Services LLC",
        licenseNumber: "MED-2023-AFG-7854",
        taxId: "TIN-789456123",
        registration: "Ministry of Commerce #456789",
        medicalLicense: "Afghan Medical Council #AMC-456-2023"
    },

    // International Patients
    internationalPatients: {
        supported: true,
        languages: ["English", "Arabic", "Urdu", "Hindi"],
        visaAssistance: true,
        airportPickup: true,
        accommodation: true,
        interpreter: true,
        insuranceAccepted: ["International", "Travel", "Corporate"]
    },

    // Updates
    lastUpdated: "2024-01-15",
    version: "2.0.0"
};

// Helper Functions
export const SEO_HELPERS = {
    // Generate all doctor name variations for SEO
    getAllDoctorNames() {
        const names = new Set();

        // Add primary doctor names
        names.add(APP_CONFIG.doctors.primary.name);
        APP_CONFIG.doctors.primary.altNames.forEach(name => names.add(name));

        // Add secondary doctor names
        names.add(APP_CONFIG.doctors.secondary.name);
        APP_CONFIG.doctors.secondary.altNames.forEach(name => names.add(name));

        // Add combinations
        names.add(`${APP_CONFIG.doctors.primary.name} and ${APP_CONFIG.doctors.secondary.name}`);
        names.add(`Dr. Shekari and Dr. Wayar`);

        return Array.from(names);
    },

    // Generate location-based keywords
    getLocationKeywords() {
        const keywords = [];

        APP_CONFIG.seo.locations.primary.forEach(location => {
            keywords.push(`Urologist in ${location}`);
            keywords.push(`Kidney specialist ${location}`);
            keywords.push(`Best doctor in ${location}`);
        });

        APP_CONFIG.seo.locations.secondary.forEach(location => {
            keywords.push(`Urology clinic ${location}`);
            keywords.push(`${location} urologist`);
        });

        return keywords;
    },

    // Generate service-based keywords
    getServiceKeywords() {
        const keywords = [];

        APP_CONFIG.services.categories.forEach(category => {
            category.services.forEach(service => {
                keywords.push(`${service.name} in Herat`);
                keywords.push(`Treatment for ${service.name.toLowerCase()}`);
                keywords.push(`Best ${service.name.toLowerCase()} doctor`);
            });
        });

        return keywords;
    },

    // Generate complete keyword list
    getAllKeywords() {
        const allKeywords = new Set();

        // Add doctor names
        this.getAllDoctorNames().forEach(name => allKeywords.add(name));

        // Add location keywords
        this.getLocationKeywords().forEach(keyword => allKeywords.add(keyword));

        // Add service keywords
        this.getServiceKeywords().forEach(keyword => allKeywords.add(keyword));

        // Add misspellings
        Object.values(APP_CONFIG.seo.misspellings).flat().forEach(word => allKeywords.add(word));

        // Add other keywords
        APP_CONFIG.seo.serviceKeywords.forEach(keyword => allKeywords.add(keyword));
        APP_CONFIG.seo.patientIntent.forEach(keyword => allKeywords.add(keyword));
        APP_CONFIG.seo.questionKeywords.forEach(keyword => allKeywords.add(keyword));

        return Array.from(allKeywords);
    }
};

// Schema.org Data Generators
export const SCHEMA_GENERATORS = {
    generateMedicalClinicSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": APP_CONFIG.site.name,
            "description": APP_CONFIG.site.description,
            "url": APP_CONFIG.site.url,
            "telephone": APP_CONFIG.contact.primaryPhone,
            "email": APP_CONFIG.contact.email.general,
            "address": {
                "@type": "PostalAddress",
                ...APP_CONFIG.site.address
            },
            "medicalSpecialty": [
                "Urology",
                "Andrology",
                "Nephrology",
                "Endourology"
            ],
            "openingHours": "Mo-Su 00:00-24:00",
            "priceRange": "$$",
            "currenciesAccepted": "AFN, USD",
            "paymentAccepted": "Cash, Credit Card",
            "hasMap": `https://maps.google.com/?q=${APP_CONFIG.site.address.coordinates.lat},${APP_CONFIG.site.address.coordinates.lng}`
        };
    },

    generateDoctorSchema(doctorId) {
        const doctor = APP_CONFIG.doctors[doctorId === 'primary' ? 'primary' : 'secondary'];

        return {
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": doctor.name,
            "medicalSpecialty": doctor.titles,
            "description": `${doctor.name} - ${doctor.titles.join(', ')} with ${doctor.experience.years} years experience`,
            "url": `${APP_CONFIG.site.url}/doctors/${doctor.id}`,
            "telephone": APP_CONFIG.contact.primaryPhone,
            "image": `${APP_CONFIG.site.url}/images/doctors/${doctor.id}.jpg`,
            "award": doctor.awards,
            "knowsLanguage": doctor.languages,
            "availableService": doctor.specializations
        };
    }
};

export default APP_CONFIG;