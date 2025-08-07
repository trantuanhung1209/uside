import { useState, useEffect } from 'react';

interface UseAppLoadingOptions {
  minimumLoadingTime?: number; // thời gian loading tối thiểu (ms)
  delayBeforeStart?: number; // độ trễ trước khi bắt đầu loading (ms)
}

export const useAppLoading = (options: UseAppLoadingOptions = {}) => {
  const { minimumLoadingTime = 3000, delayBeforeStart = 0 } = options;
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate initial app loading
    
    // Delay before starting if specified
    const startTimeout = setTimeout(() => {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      // Ensure minimum loading time
      const endTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        setLoadingProgress(100);
        
        // Small delay before hiding loader
        setTimeout(() => {
          setIsLoading(false);
          setIsInitialLoad(false);
        }, 300);
      }, minimumLoadingTime);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(endTimeout);
      };
    }, delayBeforeStart);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [minimumLoadingTime, delayBeforeStart]);

  const resetLoading = () => {
    setIsInitialLoad(true);
    setIsLoading(true);
    setLoadingProgress(0);
  };

  return {
    isInitialLoad,
    isLoading,
    loadingProgress,
    resetLoading
  };
};

export default useAppLoading;
