import React, { useEffect, useRef } from 'react';

interface SplineViewerProps {
  url: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const SplineViewer: React.FC<SplineViewerProps> = ({
  url,
  className = '',
  style = {},
  onLoad,
  onError
}) => {
  const splineRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const splineElement = splineRef.current;
    
    if (!splineElement) return;

    const handleLoad = () => {
      console.log('Spline scene loaded successfully');
      onLoad?.();
    };

    const handleError = () => {
      const error = new Error('Failed to load Spline scene');
      console.error('Spline loading error:', error);
      onError?.(error);
    };

    // Add event listeners
    splineElement.addEventListener('load', handleLoad);
    splineElement.addEventListener('error', handleError);

    // Cleanup
    return () => {
      splineElement.removeEventListener('load', handleLoad);
      splineElement.removeEventListener('error', handleError);
    };
  }, [onLoad, onError]);

  return React.createElement('spline-viewer', {
    ref: splineRef,
    url: url,
    className: className,
    style: style,
    loading: 'lazy'
  });
};

export default SplineViewer;
