// Critical Resource Preloader with LCP optimization
class CriticalResourcePreloader {
  private preloadedResources = new Set<string>();
  private static instance: CriticalResourcePreloader;

  static getInstance(): CriticalResourcePreloader {
    if (!CriticalResourcePreloader.instance) {
      CriticalResourcePreloader.instance = new CriticalResourcePreloader();
    }
    return CriticalResourcePreloader.instance;
  }

  // Preload LCP critical resources immediately
  preloadLCPResources() {
    const lcpResources = [
      // Hero section critical images
      '/images_uside/pet_cloud_uside.png',
      '/images_uside/uside_welcome.png',
      '/images_uside/pet_uside_dark.png',
      // Video poster frames for faster LCP
      '/images_uside/cloud_2d.jpg',
    ];

    lcpResources.forEach(resource => this.preloadImage(resource, 'high'));
  }

  // Preload images with priority
  preloadImage(src: string, priority: 'high' | 'low' = 'low') {
    if (this.preloadedResources.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }

    document.head.appendChild(link);
    this.preloadedResources.add(src);
  }

  // Preload video with metadata only to speed up poster display
  preloadVideo(src: string, priority: 'high' | 'low' = 'low') {
    if (this.preloadedResources.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }

    document.head.appendChild(link);
    this.preloadedResources.add(src);
  }

  // Prefetch resources for next sections
  prefetchResources() {
    const prefetchResources = [
      '/images_uside/cloud_loadding.mp4',
      '/music_uside/music1.mp3',
      '/images_uside/tester.jpg',
      '/images_uside/web_dev.jpg',
    ];

    // Use requestIdleCallback for non-critical prefetching
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        prefetchResources.forEach(resource => this.prefetchResource(resource));
      });
    } else {
      setTimeout(() => {
        prefetchResources.forEach(resource => this.prefetchResource(resource));
      }, 2000);
    }
  }

  private prefetchResource(src: string) {
    if (this.preloadedResources.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = src;
    document.head.appendChild(link);
    this.preloadedResources.add(src);
  }

  // Create optimized image URLs with transformations
  getOptimizedImageUrl(src: string, options: {
    width?: number;
    height?: number;
    format?: 'webp' | 'avif' | 'auto';
    quality?: number;
  } = {}): { optimized: string; webp?: string; avif?: string } {
    const { format = 'auto' } = options;
    
    // For now, return the original src since we don't have a CDN
    // In production, this would generate optimized URLs
    const optimized = src;
    
    // Generate optimized versions (placeholder logic)
    const baseName = src.replace(/\.[^/.]+$/, '');
    
    return {
      optimized,
      webp: format === 'webp' || format === 'auto' ? `${baseName}.webp` : undefined,
      avif: format === 'avif' || format === 'auto' ? `${baseName}.avif` : undefined
    };
  }

  // Compress and resize images client-side if needed
  async compressImage(file: File, options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'webp';
  } = {}): Promise<Blob> {
    const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = 'jpeg' } = options;

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => resolve(blob!),
          `image/${format}`,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }
}

// LCP optimization utilities
export const lcpOptimizer = {
  // Mark LCP elements for optimization
  markLCPElement(element: HTMLElement) {
    element.setAttribute('data-lcp', 'true');
    
    // Add loading priority
    const img = element.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
      img.decoding = 'sync';
    }

    const video = element.querySelector('video');
    if (video) {
      video.preload = 'metadata';
      video.setAttribute('fetchpriority', 'high');
    }
  },

  // Optimize font loading to prevent LCP delays
  optimizeFontLoading() {
    const fontPreloads = [
      'Inter',
      'Inter-Bold',
      'Inter-SemiBold'
    ];

    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = `/fonts/${font}.woff2`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  },

  // Reduce loading screen time for better LCP
  reduceLoadingTime() {
    // Override loading time for better LCP - reduce from 3.5s to 1.5s
    const optimizedMinTime = 1500;
    
    return optimizedMinTime;
  },

  // Remove unnecessary animations during initial load
  optimizeInitialAnimations() {
    // Disable expensive animations until after LCP
    const style = document.createElement('style');
    style.innerHTML = `
      .lcp-optimized * {
        animation-duration: 0ms !important;
        transition-duration: 0ms !important;
      }
    `;
    document.head.appendChild(style);

    // Re-enable animations after LCP
    setTimeout(() => {
      document.head.removeChild(style);
    }, 2000);
  }
};

// Web Vitals optimization
export const webVitalsOptimizer = {
  // Optimize CLS by setting image dimensions
  preventLayoutShift() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const image = img as HTMLImageElement;
      if (!image.style.aspectRatio) {
        image.style.aspectRatio = '16/9';
        image.style.width = '100%';
        image.style.height = 'auto';
      }
    });
  },

  // Optimize FID by deferring non-critical JavaScript
  optimizeFID() {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
    scripts.forEach(script => {
      if (!script.getAttribute('src')?.includes('critical')) {
        script.setAttribute('defer', '');
      }
    });
  },

  // Measure and report Web Vitals
  measureWebVitals() {
    if ('web-vitals' in window) {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onINP(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
      }).catch(error => {
        console.warn('Failed to load web-vitals:', error);
      });
    }
  }
};

export const preloader = CriticalResourcePreloader.getInstance();
export default preloader;
