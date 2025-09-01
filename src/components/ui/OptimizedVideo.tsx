import React, { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  webmSrc?: string;
  mp4Src?: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  webmSrc,
  mp4Src,
  poster,
  width,
  height,
  className = '',
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  priority = false,
  onLoad,
  onError,
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [priority]);

  // Preload video if priority
  useEffect(() => {
    if (priority && isInView) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = webmSrc || mp4Src || src;
      document.head.appendChild(link);
    }
  }, [priority, isInView, webmSrc, mp4Src, src]);

  const handleVideoLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleVideoError = () => {
    setHasError(true);
    onError?.();
  };

  // Get video source based on browser support
  const getVideoSources = () => {
    const sources = [];
    
    if (webmSrc) {
      sources.push({ src: webmSrc, type: 'video/webm' });
    }
    
    if (mp4Src) {
      sources.push({ src: mp4Src, type: 'video/mp4' });
    }
    
    if (src) {
      sources.push({ src, type: 'video/mp4' });
    }
    
    return sources;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : '16/9'
      }}
    >
      {/* Poster placeholder */}
      {poster && !isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* Video element */}
      {isInView && (
        <video
          ref={videoRef}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${hasError ? 'hidden' : ''}
          `}
          width={width}
          height={height}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onClick={onClick}
        >
          {getVideoSources().map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            {poster ? (
              <img 
                src={poster} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <p>Trình duyệt không hỗ trợ video</p>
              </div>
            )}
          </div>
        </video>
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Đang tải video...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Không thể tải video</p>
          </div>
        </div>
      )}

      {/* Lazy loading placeholder */}
      {!isInView && !priority && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Video sẽ tải khi cần thiết</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo;
