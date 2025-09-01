import { useState, useEffect } from 'react';
import { onSnapshot, collection, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { NewsItem } from '../data/newsData';
import { convertFirestoreTimestamp } from '../utils/dateUtils';

interface UseRealtimeNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refreshNews: () => void;
}

export const useRealtimeNews = (): UseRealtimeNewsReturn => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // Tạo query KHÔNG dùng orderBy để lấy tất cả documents
    // Sau đó sẽ sort ở client-side để handle documents thiếu timestamp
    const newsQuery = query(collection(db, 'news'));

    // Setup realtime listener
    const unsubscribe = onSnapshot(
      newsQuery,
      (snapshot) => {
        try {
          
          // Debug each document
          snapshot.docs.forEach((doc, index) => {
            const data = doc.data();
            const createdAtField = data.createdAt || data.createAt;
            const processedTimestamp = createdAtField 
              ? convertFirestoreTimestamp(createdAtField)
              : (data.timestamp ? convertFirestoreTimestamp(data.timestamp) : Date.now());
              
            console.log(`📄 Doc ${index + 1}:`, {
              createdAtType: createdAtField ? typeof createdAtField : 'undefined',
              createdAtValue: createdAtField,
              processedTimestamp: processedTimestamp,
              timestampDate: new Date(processedTimestamp).toLocaleString('vi-VN'),
            });
          });
          
          const newsData: NewsItem[] = snapshot.docs.map(doc => {
            const data = doc.data();
            
            // Xử lý timestamp từ Firestore createdAt hoặc createAt
            let timestamp = Date.now(); // Fallback mặc định
            
            // Ưu tiên sử dụng createdAt hoặc createAt từ Firestore
            const createdAtField = data.createdAt || data.createAt;
            if (createdAtField) {
              timestamp = convertFirestoreTimestamp(createdAtField);
            }
            // Fallback sang timestamp field nếu có
            else if (data.timestamp) {
              timestamp = convertFirestoreTimestamp(data.timestamp);
            }
            
            return {
              id: data.originalId || data.id || doc.id,
              title: data.title || '',
              date: data.date || '',
              timestamp: timestamp,
              excerpt: data.excerpt || '',
              content: data.content || '',
              image: data.image,
              author: data.author,
              category: data.category,
              tags: data.tags || [],
              pinned: data.pinned || false,
              isRead: data.isRead || false
            };
          });

          // Client-side sorting: tin ghim lên đầu, sau đó theo timestamp
          const sortedNews = newsData.sort((a, b) => {
            // Ưu tiên tin ghim
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            
            // Sau đó sắp xếp theo timestamp mới nhất
            return b.timestamp - a.timestamp;
          });

          setNews(sortedNews);
          setError(null);
          setLoading(false);
          
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error('❌ Error processing news data:', errorMessage);
          setError(errorMessage);
          setLoading(false);
        }
      },
      (err) => {
        console.error('❌ Firestore listener error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup listener khi component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Function để force refresh (thực tế không cần thiết với realtime listener)
  const refreshNews = () => {
    setLoading(true);
    // Realtime listener sẽ tự động cập nhật data
  };

  return { 
    news, 
    loading, 
    error, 
    refreshNews 
  };
};
