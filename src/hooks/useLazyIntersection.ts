import { useEffect, useRef, useState } from 'react';

/**
 * Hook để lazy load component khi element vào viewport
 * @param threshold - Phần trăm element cần visible để trigger load (0-1)
 * @param rootMargin - Margin để trigger load sớm hơn (vd: '100px')
 */
export const useLazyIntersection = (
  threshold: number = 0.1,
  rootMargin: string = '100px'
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Ngắt kết nối observer sau khi load để tối ưu performance
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasLoaded]);

  return { elementRef, isVisible, hasLoaded };
};
