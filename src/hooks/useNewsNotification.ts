import { useState, useCallback } from 'react';

export interface NewsNotificationContent {
  type: 'text' | 'html' | 'rich';
  title: string;
  message?: string; // For simple text or HTML
  content?: React.ReactNode; // For rich content with JSX elements
  image?: string; // Image URL
  imageAlt?: string; // Image alt text
  newsId?: number; // ID của tin tức để xử lý "Xem chi tiết"
  onDetailClick?: (newsId?: number) => void; // Callback khi click "Xem chi tiết"
}

export interface NewsNotification {
  id: string;
  content: NewsNotificationContent;
  priority?: 'low' | 'medium' | 'high';
  autoCloseAfter?: number;
  showIcon?: boolean;
}

export const useNewsNotification = () => {
  const [notifications, setNotifications] = useState<NewsNotification[]>([]);

  const addNotification = useCallback((notificationData: {
    content: NewsNotificationContent;
    priority?: 'low' | 'medium' | 'high';
    autoCloseAfter?: number;
    showIcon?: boolean;
  }) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const newNotification: NewsNotification = {
      id,
      priority: 'medium',
      autoCloseAfter: 30,
      showIcon: true,
      ...notificationData,
    };

    // Xóa tất cả thông báo cũ trước khi thêm thông báo mới (chỉ hiển thị 1 thông báo tại 1 thời điểm)
    setNotifications([newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Helper for simple text notifications
  const showImportantNews = useCallback((title: string, message: string, options?: {
    autoCloseAfter?: number;
    showIcon?: boolean;
    image?: string;
    imageAlt?: string;
  }) => {
    return addNotification({
      content: {
        type: 'text',
        title,
        message,
        image: options?.image,
        imageAlt: options?.imageAlt,
      },
      priority: 'high',
      autoCloseAfter: options?.autoCloseAfter || 45,
      showIcon: options?.showIcon ?? true,
    });
  }, [addNotification]);

  // Helper for HTML content notifications
  const showRichNews = useCallback((content: NewsNotificationContent, options?: {
    priority?: 'low' | 'medium' | 'high';
    autoCloseAfter?: number;
    showIcon?: boolean;
  }) => {
    return addNotification({
      content,
      priority: options?.priority || 'high',
      autoCloseAfter: options?.autoCloseAfter || 45,
      showIcon: options?.showIcon ?? true,
    });
  }, [addNotification]);

  const showRegularNews = useCallback((title: string, message: string, options?: {
    autoCloseAfter?: number;
    showIcon?: boolean;
    image?: string;
    imageAlt?: string;
  }) => {
    return addNotification({
      content: {
        type: 'text',
        title,
        message,
        image: options?.image,
        imageAlt: options?.imageAlt,
      },
      priority: 'medium',
      autoCloseAfter: options?.autoCloseAfter || 30,
      showIcon: options?.showIcon ?? true,
    });
  }, [addNotification]);

  const showInfoNews = useCallback((title: string, message: string, options?: {
    autoCloseAfter?: number;
    showIcon?: boolean;
    image?: string;
    imageAlt?: string;
  }) => {
    return addNotification({
      content: {
        type: 'text',
        title,
        message,
        image: options?.image,
        imageAlt: options?.imageAlt,
      },
      priority: 'low',
      autoCloseAfter: options?.autoCloseAfter || 25,
      showIcon: options?.showIcon ?? true,
    });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showImportantNews,
    showRegularNews,
    showInfoNews,
    showRichNews, // New helper for rich content
  };
};
