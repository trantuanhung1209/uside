import { useContext } from 'react';
import NewsNotificationContext from '../contexts/NewsNotificationContext';

export const useNewsNotificationContext = () => {
  const context = useContext(NewsNotificationContext);
  if (!context) {
    throw new Error('useNewsNotificationContext must be used within a NewsNotificationProvider');
  }
  return context;
};
