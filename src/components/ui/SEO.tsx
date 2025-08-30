import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  structuredData?: object;
}

export default function SEO({
  title = "USide - Hệ Thống Tiện Ích Hỗ Trợ Sinh Viên & Định Hướng Nghề Nghiệp IT",
  description = "USide - Hệ thống tiện ích toàn diện hỗ trợ sinh viên công nghệ thông tin. Định hướng nghề nghiệp, công cụ học tập, tin tức ngành IT, và kết nối cộng đồng developer.",
  keywords = "USide, hỗ trợ sinh viên IT, định hướng nghề nghiệp, công cụ học tập, tin tức IT, cộng đồng developer, sinh viên CNTT, career path IT",
  image = "https://www.uside.studio/images_uside/uside_welcome.png",
  url = "https://www.uside.studio/",
  type = "website",
  noIndex = false,
  structuredData
}: SEOProps) {
  const fullTitle = title.includes('USide') ? title : `${title} | USide`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    }

    // Open Graph tags
    updateMetaTag('', type, 'og:type');
    updateMetaTag('', url, 'og:url');
    updateMetaTag('', fullTitle, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', image, 'og:image');
    updateMetaTag('', 'USide', 'og:site_name');

    // Twitter tags
    updateMetaTag('', 'summary_large_image', 'twitter:card');
    updateMetaTag('', url, 'twitter:url');
    updateMetaTag('', fullTitle, 'twitter:title');
    updateMetaTag('', description, 'twitter:description');
    updateMetaTag('', image, 'twitter:image');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, keywords, image, url, type, noIndex, structuredData]);

  return null;
}
