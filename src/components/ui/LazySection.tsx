import React, { Suspense } from 'react';
import { useLazyIntersection } from '../../hooks';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  id?: string;
}

// Loading component mặc định
const DefaultLoader = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
  </div>
);

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <DefaultLoader />,
  threshold = 0.1,
  rootMargin = '200px',
  className = '',
  id
}) => {
  const { elementRef, isVisible } = useLazyIntersection(threshold, rootMargin);

  return (
    <section
      ref={elementRef}
      className={className}
      id={id}
    >
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </section>
  );
};

export default LazySection;
