export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "USide",
  "description": "Hệ thống tiện ích hỗ trợ sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH)",
  "url": "https://uside.vercel.app",
  "logo": "https://uside.vercel.app/images_uside/uside_light.png",
  "foundingDate": "2025",
  "areaServed": "Vietnam",
  "serviceType": ["Student Support System", "Educational Tools"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "student support",
    "availableLanguage": "Vietnamese"
  },
  "sameAs": [
    "https://facebook.com/uside",
    "https://github.com/uside"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN",
    "addressLocality": "Ho Chi Minh City"
  }
});

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "USide",
  "description": "Hệ thống tiện ích hỗ trợ sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH)",
  "url": "https://uside.vercel.app",
  "audience": {
    "@type": "Audience",
    "audienceType": "IUH Students"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://uside.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const createArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Person",
    "name": article.author || "USide Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "USide",
    "logo": "https://uside.vercel.app/images_uside/uside_light.png"
  },
  "url": article.url
});

export const createCourseSchema = (course: {
  name: string;
  description: string;
  provider: string;
  image?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": course.provider
  },
  "image": course.image,
  "url": course.url
});

export const createJobPostingSchema = (job: {
  title: string;
  description: string;
  location: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.title,
  "description": job.description,
  "hiringOrganization": {
    "@type": "Organization",
    "name": "USide",
    "sameAs": "https://uside.vercel.app"
  },
  "jobLocation": {
    "@type": "Place",
    "address": job.location
  },
  "datePosted": job.datePosted,
  "validThrough": job.validThrough,
  "employmentType": job.employmentType || "FULL_TIME",
  "url": job.url
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Schema cho Student Support Service
export const createStudentSupportSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "USide Student Support System",
  "description": "Hệ thống tiện ích hỗ trợ sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH)",
  "provider": {
    "@type": "Organization",
    "name": "USide"
  },
  "serviceType": "Educational Support",
  "areaServed": "Vietnam",
  "audience": {
    "@type": "Audience",
    "audienceType": "IUH Students"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Student Support Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Learning Tools",
          "description": "Công cụ học tập và tài nguyên giáo dục cho sinh viên IUH"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Student Utilities",
          "description": "Các tiện ích hỗ trợ sinh viên trong quá trình học tập"
        }
      }
    ]
  }
});

// Schema cho IUH Student Support
export const createIUHStudentSupportSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IUH Student Utility System",
  "description": "Hệ thống tiện ích dành riêng cho sinh viên Đại học Công nghiệp Thành phố Hồ Chí Minh",
  "provider": {
    "@type": "Organization",
    "name": "USide"
  },
  "serviceType": "Student Utilities",
  "audience": {
    "@type": "Audience",
    "audienceType": "IUH Students"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0",
    "priceCurrency": "VND"
  }
});
