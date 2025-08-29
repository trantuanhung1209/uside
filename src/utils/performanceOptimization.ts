// Performance optimization utilities for SEO

// Lazy loading images with SEO-friendly alt tags
export const lazyLoadImage = (element: HTMLImageElement) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  });

  imageObserver.observe(element);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/images_uside/uside_welcome.png',
    '/images_uside/pet_cloud_uside.png',
    '/images_uside/uside_light.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize Core Web Vitals
export const optimizeCLS = () => {
  // Add explicit dimensions to prevent layout shift
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const image = img as HTMLImageElement;
    if (!image.style.aspectRatio) {
      // Set a default aspect ratio to prevent CLS
      image.style.aspectRatio = '16/9';
      image.style.width = '100%';
      image.style.height = 'auto';
    }
  });
};

// Optimize LCP (Largest Contentful Paint)
export const optimizeLCP = () => {
  // Preload LCP element
  const lcpElement = document.querySelector('[data-lcp]');
  if (lcpElement) {
    const img = lcpElement.querySelector('img');
    if (img && img.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    }
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

// Measure and report Web Vitals
export const measureWebVitals = async () => {
  if (typeof window !== 'undefined') {
    try {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
      
      onCLS(console.log);
      onINP(console.log); // FID was replaced with INP in web-vitals v3
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
    } catch (error) {
      console.log('Web Vitals measurement failed:', error);
    }
  }
};

// Font optimization
export const optimizeFonts = () => {
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  fontLink.href = '/fonts/inter-var.woff2'; // Adjust path as needed
  document.head.appendChild(fontLink);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};
