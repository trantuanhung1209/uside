import React, { createContext, useState, useEffect } from 'react';

interface ReadNewsContextType {
  readNewsIds: Set<number>;
  markAsRead: (newsId: number) => void;
  markAsUnread: (newsId: number) => void;
  isNewsRead: (newsId: number) => boolean;
  getUnreadCount: () => number;
}

const ReadNewsContext = createContext<ReadNewsContextType | undefined>(undefined);

export { ReadNewsContext };

const LOCAL_STORAGE_KEY = 'uside_read_news_ids';

export const ReadNewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readNewsIds, setReadNewsIds] = useState<Set<number>>(new Set());

  // Load từ localStorage khi component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const idsArray = JSON.parse(stored);
        setReadNewsIds(new Set(idsArray));
      }
    } catch (error) {
      console.error('Error loading read news from localStorage:', error);
    }
  }, []);

  // Lưu vào localStorage khi readNewsIds thay đổi
  useEffect(() => {
    try {
      const idsArray = Array.from(readNewsIds);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(idsArray));
    } catch (error) {
      console.error('Error saving read news to localStorage:', error);
    }
  }, [readNewsIds]);

  const markAsRead = (newsId: number) => {
    setReadNewsIds(prev => new Set([...prev, newsId]));
  };

  const markAsUnread = (newsId: number) => {
    setReadNewsIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(newsId);
      return newSet;
    });
  };

  const isNewsRead = (newsId: number) => {
    return readNewsIds.has(newsId);
  };

  const getUnreadCount = () => {
    // Đếm số tin chưa đọc (sẽ được implement khi có newsData)
    return readNewsIds.size; // Placeholder
  };

  return (
    <ReadNewsContext.Provider
      value={{
        readNewsIds,
        markAsRead,
        markAsUnread,
        isNewsRead,
        getUnreadCount,
      }}
    >
      {children}
    </ReadNewsContext.Provider>
  );
};
