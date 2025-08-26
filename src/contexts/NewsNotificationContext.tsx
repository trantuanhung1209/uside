import React, { createContext } from 'react';
import { useNewsNotification } from '../hooks/useNewsNotification';
import type { NewsNotification, NewsNotificationContent } from '../hooks/useNewsNotification';

interface NewsNotificationContextType {
  notifications: NewsNotification[];
  addNotification: (notificationData: {
    content: NewsNotificationContent;
    priority?: 'low' | 'medium' | 'high';
    autoCloseAfter?: number;
    showIcon?: boolean;
  }) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showImportantNews: (title: string, message: string, options?: {
    autoCloseAfter?: number;
    showIcon?: boolean;
    image?: string;
    imageAlt?: string;
  }) => string;
  showRegularNews: (title: string, message: string, options?: {
    autoCloseAfter?: number;
    showIcon?: boolean;
    image?: string;
    imageAlt?: string;
  }) => string;
  showInfoNews: (title: string, message: string, options?: {
    autoCloseAfter?: number;
    showIcon?: boolean;
    image?: string;
    imageAlt?: string;
  }) => string;
  showRichNews: (content: NewsNotificationContent, options?: {
    priority?: 'low' | 'medium' | 'high';
    autoCloseAfter?: number;
    showIcon?: boolean;
  }) => string;
}

const NewsNotificationContext = createContext<NewsNotificationContextType | undefined>(undefined);

interface NewsNotificationProviderProps {
  children: React.ReactNode;
}

export const NewsNotificationProvider: React.FC<NewsNotificationProviderProps> = ({ children }) => {
  const newsNotification = useNewsNotification();

  return (
    <NewsNotificationContext.Provider value={newsNotification}>
      {children}
    </NewsNotificationContext.Provider>
  );
};

export default NewsNotificationContext;
