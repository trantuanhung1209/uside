import { firestoreService } from './firestoreService';
import type { NewsItem } from '../data/newsData';

export interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  tags: string[];
  pinned: boolean;
}

export interface FirestoreNewsItem extends Omit<NewsItem, 'id' | 'timestamp'> {
  originalId?: number;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

class NewsService {
  private readonly COLLECTION_NAME = 'news';

  // Helper function để chuyển đổi an toàn sang Date
  private safeToDate(dateValue: unknown): Date {
    if (dateValue instanceof Date) {
      return dateValue;
    }
    if (typeof dateValue === 'string' || typeof dateValue === 'number') {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    // Nếu có seconds và nanoseconds (Firestore Timestamp)
    if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
      const timestamp = dateValue as { seconds: number; nanoseconds?: number };
      return new Date(timestamp.seconds * 1000);
    }
    return new Date(); // Fallback to current date
  }

  // Tạo tin tức mới
  async createNews(newsData: NewsFormData): Promise<string> {
    try {
      const now = new Date();
      const firestoreData: Omit<FirestoreNewsItem, 'id'> = {
        title: newsData.title,
        date: this.formatDate(now),
        excerpt: newsData.excerpt,
        content: newsData.content,
        image: newsData.image,
        author: newsData.author,
        category: newsData.category,
        tags: newsData.tags,
        pinned: newsData.pinned,
        isRead: false,
        status: 'published',
        viewCount: 0,
        likeCount: 0,
        createdAt: now,
        updatedAt: now
      };

      const docId = await firestoreService.addDocument(this.COLLECTION_NAME, firestoreData);
      return docId;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  // Cập nhật tin tức
  async updateNews(newsId: string, newsData: Partial<NewsFormData>): Promise<void> {
    try {
      const updateData: Record<string, unknown> = {
        ...newsData,
        updatedAt: new Date()
      };

      await firestoreService.updateDocument(this.COLLECTION_NAME, newsId, updateData);
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }

  // Xóa tin tức
  async deleteNews(newsId: string): Promise<void> {
    try {
      await firestoreService.deleteDocument(this.COLLECTION_NAME, newsId);
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  }

  // Lấy tất cả tin tức
  async getAllNews(): Promise<(FirestoreNewsItem & { id: string })[]> {
    try {
      const docs = await firestoreService.queryDocuments(
        this.COLLECTION_NAME,
        [],
        'createdAt',
        'desc'
      );

      return docs.map(doc => {
        return {
          ...doc,
          createdAt: this.safeToDate(doc.createdAt),
          updatedAt: this.safeToDate(doc.updatedAt),
        };
      }) as (FirestoreNewsItem & { id: string })[];
    } catch (error) {
      console.error('Error getting all news:', error);
      throw error;
    }
  }

  // Lấy tin tức theo ID
  async getNewsById(newsId: string): Promise<(FirestoreNewsItem & { id: string }) | null> {
    try {
      const doc = await firestoreService.getDocument(this.COLLECTION_NAME, newsId);
      if (!doc) return null;

      return {
        ...doc,
        createdAt: this.safeToDate(doc.createdAt),
        updatedAt: this.safeToDate(doc.updatedAt),
      } as (FirestoreNewsItem & { id: string });
    } catch (error) {
      console.error('Error getting news by ID:', error);
      throw error;
    }
  }

  // Cập nhật trạng thái ghim
  async togglePinNews(newsId: string, pinned: boolean): Promise<void> {
    try {
      await firestoreService.updateDocument(this.COLLECTION_NAME, newsId, {
        pinned,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error toggling pin news:', error);
      throw error;
    }
  }

  // Cập nhật trạng thái bài viết
  async updateNewsStatus(newsId: string, status: 'draft' | 'published' | 'archived'): Promise<void> {
    try {
      await firestoreService.updateDocument(this.COLLECTION_NAME, newsId, {
        status,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating news status:', error);
      throw error;
    }
  }

  // Tăng view count
  async incrementViewCount(newsId: string): Promise<void> {
    try {
      const news = await this.getNewsById(newsId);
      if (news) {
        await firestoreService.updateDocument(this.COLLECTION_NAME, newsId, {
          viewCount: news.viewCount + 1,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
      throw error;
    }
  }

  // Lấy thống kê
  async getNewsStats(): Promise<{
    total: number;
    published: number;
    draft: number;
    archived: number;
    pinned: number;
  }> {
    try {
      const allNews = await this.getAllNews();
      
      return {
        total: allNews.length,
        published: allNews.filter(news => news.status === 'published').length,
        draft: allNews.filter(news => news.status === 'draft').length,
        archived: allNews.filter(news => news.status === 'archived').length,
        pinned: allNews.filter(news => news.pinned).length,
      };
    } catch (error) {
      console.error('Error getting news stats:', error);
      throw error;
    }
  }

  // Định dạng ngày
  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    return `${day} tháng ${month}, ${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
}

export const newsService = new NewsService();