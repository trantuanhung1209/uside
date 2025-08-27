import type { NewsItem } from '../data/newsData';

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
  const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000); // 5 giờ trước
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const newNews: NewsItem[] = [];
  const todayNews: NewsItem[] = [];
  const olderNews: NewsItem[] = [];

  newsItems.forEach(news => {
    const newsDate = new Date(news.timestamp);
    const newsDateOnly = new Date(newsDate.getFullYear(), newsDate.getMonth(), newsDate.getDate());
    
    // Tin trong vòng 5 giờ gần đây được coi là "Tin mới"
    if (news.timestamp >= fiveHoursAgo.getTime()) {
      newNews.push(news);
    } else if (newsDateOnly.getTime() === today.getTime()) {
      todayNews.push(news);
    } else {
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
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút`;
  } else if (diffInMinutes < 1440) { // 24 hours
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} giờ`;
  } else {
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return `${diffInDays} ngày`;
  }
};
