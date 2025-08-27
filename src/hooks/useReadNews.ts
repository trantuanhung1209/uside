import { useContext } from 'react';
import { ReadNewsContext } from '../contexts/ReadNewsContext';

export const useReadNews = () => {
  const context = useContext(ReadNewsContext);
  if (context === undefined) {
    throw new Error('useReadNews must be used within a ReadNewsProvider');
  }
  return context;
};
