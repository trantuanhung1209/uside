import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  avifSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  avifSrc,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  onLoad,
  onError,
  sizes,
  placeholder,
  blurDataURL
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(placeholder || blurDataURL || '');
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload critical images
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = avifSrc || webpSrc || src;
      document.head.appendChild(link);
    }
  }, [priority, avifSrc, webpSrc, src]);

  // Handle image loading
  useEffect(() => {
    if (!imgRef.current) return;

    const img = new Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setCurrentSrc(img.src);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Try AVIF first, then WebP, then fallback to original
    if (avifSrc && supportsAvif()) {
      img.src = avifSrc;
    } else if (webpSrc && supportsWebP()) {
      img.src = webpSrc;
    } else {
      img.src = src;
    }

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, webpSrc, avifSrc, onLoad, onError]);

  // Check WebP support
  const supportsWebP = (): boolean => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Check AVIF support
  const supportsAvif = (): boolean => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (avifSrc && supportsAvif()) {
      return `${avifSrc} 1x`;
    }
    if (webpSrc && supportsWebP()) {
      return `${webpSrc} 1x`;
    }
    return `${src} 1x`;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Blur background */}
      {(placeholder || blurDataURL) && !isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{
            backgroundImage: `url(${placeholder || blurDataURL})`,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={currentSrc || src}
        srcSet={generateSrcSet()}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'hidden' : ''}
        `}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          onError?.();
        }}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-sm">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Không thể tải ảnh
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
