import type { NewsItem } from '../data/newsData';

// Type cho Firestore Timestamp
type FirestoreTimestamp = {
  seconds: number;
  nanoseconds?: number;
};

// Union type cho các dạng timestamp có thể
type TimestampValue = FirestoreTimestamp | Date | number | string | null | undefined;

// Helper function để chuyển đổi Firestore timestamp thành timestamp JavaScript
export const convertFirestoreTimestamp = (firestoreValue: TimestampValue): number => {
  if (!firestoreValue) {
    return Date.now();
  }

  // Firestore Timestamp object có dạng { seconds, nanoseconds }
  if (typeof firestoreValue === 'object' && 'seconds' in firestoreValue) {
    return firestoreValue.seconds * 1000;
  }
  
  // Date object
  if (firestoreValue instanceof Date) {
    return firestoreValue.getTime();
  }
  
  // Number (Unix timestamp)
  if (typeof firestoreValue === 'number') {
    return firestoreValue;
  }
  
  // String (ISO date hoặc date string)
  if (typeof firestoreValue === 'string') {
    const parsedDate = new Date(firestoreValue);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.getTime();
    }
  }
  
  // Fallback
  return Date.now();
};

export const parseVietnameseDate = (dateString: string): Date => {
  // Tách ngày, tháng, năm từ format "DD tháng MM, YYYY" hoặc "DD tháng MM, YYYY HH:mm"
  const dateTimeMatch = dateString.match(/(\d+)\s+tháng\s+(\d+),\s+(\d+)\s+(\d+):(\d+)/);
  const dateOnlyMatch = dateString.match(/(\d+)\s+tháng\s+(\d+),\s+(\d+)/);
  
  if (dateTimeMatch) {
    // Có cả ngày và giờ
    const day = parseInt(dateTimeMatch[1]);
    const month = parseInt(dateTimeMatch[2]) - 1; // JavaScript months are 0-indexed
    const year = parseInt(dateTimeMatch[3]);
    const hour = parseInt(dateTimeMatch[4]);
    const minute = parseInt(dateTimeMatch[5]);
    
    return new Date(year, month, day, hour, minute);
  } else if (dateOnlyMatch) {
    // Chỉ có ngày, mặc định giờ là 00:00
    const day = parseInt(dateOnlyMatch[1]);
    const month = parseInt(dateOnlyMatch[2]) - 1; // JavaScript months are 0-indexed
    const year = parseInt(dateOnlyMatch[3]);
    
    return new Date(year, month, day, 0, 0);
  } else {
    return new Date(); // Fallback to current date if parsing fails
  }
};

export const categorizeNewsByDate = (newsItems: NewsItem[]) => {
  const now = new Date();
  const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000); // 12 giờ trước (thay vì 5 giờ)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const newNews: NewsItem[] = [];
  const todayNews: NewsItem[] = [];
  const olderNews: NewsItem[] = [];

  newsItems.forEach(news => {
    const newsDate = new Date(news.timestamp);
    const newsDateOnly = new Date(newsDate.getFullYear(), newsDate.getMonth(), newsDate.getDate());
    
    // Tin trong vòng 12 giờ gần đây được coi là "Tin mới"
    if (news.timestamp >= twelveHoursAgo.getTime()) {
      newNews.push(news);
    } else if (newsDateOnly.getTime() === today.getTime()) {
      // Tin trong ngày hôm nay nhưng không phải tin mới (trước 12h)
      todayNews.push(news);
    } else {
      // Tin từ những ngày trước
      olderNews.push(news);
    }
  });

  return {
    newNews,
    todayNews, 
    olderNews
  };
};

export const getRelativeTimeText = (timestamp: number): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return "Vừa xong";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInMinutes < 1440) { // 24 hours
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} giờ trước`;
  } else if (diffInMinutes < 10080) { // 7 days
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return `${diffInDays} ngày trước`;
  } else {
    // Hiển thị ngày cụ thể cho tin cũ hơn 7 ngày
    const newsDate = new Date(timestamp);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(newsDate);
  }
};
