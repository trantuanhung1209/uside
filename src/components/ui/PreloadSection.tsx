import { useEffect } from 'react';

interface PreloadSectionProps {
  componentLoader: () => Promise<unknown>;
  delay?: number;
}

const PreloadSection: React.FC<PreloadSectionProps> = ({ 
  componentLoader, 
  delay = 2000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Preload component sau delay
      componentLoader().catch(error => {
        console.warn('Failed to preload component:', error);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [componentLoader, delay]);

  return null; // Component này không render gì
};

export default PreloadSection;
