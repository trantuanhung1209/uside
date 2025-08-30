// SEO Constants for USide Student Support System
export const SEO_CONFIG = {
  // Website Info
  SITE_NAME: 'USide',
  SITE_URL: 'https://www.uside.studio',
  
  // Main titles and descriptions
  DEFAULT_TITLE: 'USide Studio - Hệ Thống Tiện Ích Hỗ Trợ Sinh Viên IUH',
  DEFAULT_DESCRIPTION: 'USide Studio - Hệ thống tiện ích hỗ trợ sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH). Công cụ học tập và tiện ích hỗ trợ sinh viên.',
  DEFAULT_KEYWORDS: 'USide, USide Studio, uside, uside studio, IUH, Đại học Công nghiệp TP HCM, hỗ trợ sinh viên IUH, công cụ học tập, sinh viên IUH, tiện ích sinh viên, u side, u-side',
  
  // Images
  DEFAULT_IMAGE: '/images_uside/uside_welcome.png',
  LOGO_IMAGE: '/images_uside/uside_light.png',
  
  // Social Media
  SOCIAL_LINKS: {
    facebook: 'https://facebook.com/uside',
    github: 'https://github.com/uside'
  },
  
  // Page specific SEO
  PAGES: {
    HOME: {
      title: 'USide Studio - Hệ Thống Tiện Ích Hỗ Trợ Sinh Viên IUH | uside.studio',
      description: 'Khám phá USide Studio - hệ thống tiện ích dành cho sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH). Công cụ học tập và hỗ trợ sinh viên.',
      keywords: 'USide, USide Studio, uside, uside studio, sinh viên IUH, tiện ích học tập, trang chủ, IUH, u side'
    },
    ABOUT: {
      title: 'Về Chúng Tôi - USide Studio | Student Support System',
      description: 'Tìm hiểu về USide Studio - hệ thống hỗ trợ sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh với sứ mệnh hỗ trợ sinh viên IUH.',
      keywords: 'về USide, về uside studio, giới thiệu, hệ thống hỗ trợ sinh viên IUH, u side studio'
    },
    DIRECTION: {
      title: 'Hướng Dẫn & Tiện Ích - USide Studio IUH Support',
      description: 'Các công cụ hỗ trợ và tiện ích dành cho sinh viên IUH trong quá trình học tập từ USide Studio.',
      keywords: 'hướng dẫn IUH, tiện ích sinh viên, công cụ học tập, uside studio, USide Studio'
    },
    NEWS: {
      title: 'Thông Báo & Tin Tức - USide Studio IUH',
      description: 'Cập nhật thông báo và tin tức liên quan đến sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh từ USide Studio.',
      keywords: 'tin tức IUH, thông báo sinh viên, thông tin IUH, uside studio news'
    },
    CONTACT: {
      title: 'Liên Hệ - USide Studio Support',
      description: 'Liên hệ với đội ngũ USide Studio để được hỗ trợ hoặc đóng góp ý kiến. Chúng tôi luôn lắng nghe và sẵn sàng giúp đỡ sinh viên IUH.',
      keywords: 'liên hệ USide, liên hệ uside studio, hỗ trợ sinh viên IUH, feedback uside'
    }
  },
  
  // Business Info
  ORGANIZATION: {
    name: 'USide Studio',
    type: 'Student Support System',
    foundingDate: '2025',
    address: {
      locality: 'Ho Chi Minh City',
      country: 'Vietnam'
    },
    contactType: 'student support',
    alternateName: ['USide', 'uside', 'uside studio', 'U Side', 'U-Side']
  }
} as const;

// Helper function to generate page-specific SEO data
export const getPageSEO = (page: keyof typeof SEO_CONFIG.PAGES, customData?: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}) => {
  const pageData = SEO_CONFIG.PAGES[page];
  const baseUrl = SEO_CONFIG.SITE_URL;
  
  return {
    title: customData?.title || pageData.title,
    description: customData?.description || pageData.description,
    keywords: customData?.keywords || pageData.keywords,
    image: customData?.image || SEO_CONFIG.DEFAULT_IMAGE,
    url: customData?.url || `${baseUrl}/${page.toLowerCase()}`,
  };
};
