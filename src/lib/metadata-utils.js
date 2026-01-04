export function generatePageMetadata(pageType, additionalData = {}) {
  const baseMetadata = {
    title: `Dr. Shekari & Dr. Wayar - ${additionalData.title || 'Afghanistan\'s Top Urologists'}`,
    description: `${additionalData.description || 'World-class urological care from Afghanistan\'s foremost experts.'}`,
  };

  const pageTemplates = {
    homepage: {
      title: 'Afghanistan\'s #1 Urology Center | Dr. Shekari & Dr. Wayar',
      description: 'Experience premier urological care from Afghanistan\'s most distinguished doctors...',
    },
    about: {
      title: 'About Afghanistan\'s Top Urologists',
      description: 'Learn about Dr. Nazir Shekari and Dr. Mansour Wayar, Afghanistan\'s leading urology experts...',
    },
    services: {
      title: `Advanced ${additionalData.service || 'Urological'} Treatments`,
      description: `Expert ${additionalData.service || 'urology'} care from Afghanistan's top specialists...`,
    }
  };

  return { ...baseMetadata, ...pageTemplates[pageType] };
}