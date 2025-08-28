import { firestoreService } from '../services';
import { newsData } from '../data/newsData';

// Function để push news ID 1 lên Firestore
export const pushNewsId1ToFirestore = async () => {
  try {
    // Tìm news với ID 1
    const newsItem = newsData.find(item => item.id === 1);
    
    if (!newsItem) {
      throw new Error('Không tìm thấy news với ID 1');
    }

    // Chuẩn bị data để push
    const firestoreData = {
      originalId: newsItem.id,
      title: newsItem.title,
      date: newsItem.date,
      timestamp: newsItem.timestamp,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      image: newsItem.image || '',
      author: newsItem.author || 'Unknown',
      category: newsItem.category || 'general',
      tags: newsItem.tags || [],
      pinned: newsItem.pinned || false,
      isRead: false,
      // Metadata
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'published',
      viewCount: 0,
      likeCount: 0,
      // SEO metadata
      seo: {
        metaTitle: newsItem.title,
        metaDescription: newsItem.excerpt,
        keywords: newsItem.tags || []
      }
    };

    // Push lên Firestore collection 'news'
    const docId = await firestoreService.addDocument('news', firestoreData);
    
    console.log('✅ News pushed successfully!');
    console.log('Original ID:', newsItem.id);
    console.log('Firestore Document ID:', docId);
    console.log('Title:', newsItem.title);
    
    return {
      success: true,
      originalId: newsItem.id,
      firestoreId: docId,
      title: newsItem.title,
      message: `Successfully pushed "${newsItem.title}" to Firestore`
    };
    
  } catch (error) {
    console.error('❌ Error pushing news:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to push news to Firestore'
    };
  }
};

// Function để kiểm tra news đã tồn tại chưa
export const checkNewsExists = async (originalId: number) => {
  try {
    const existingNews = await firestoreService.queryDocuments(
      'news',
      [{ field: 'originalId', operator: '==', value: originalId }]
    );
    
    return {
      exists: existingNews.length > 0,
      count: existingNews.length,
      documents: existingNews
    };
  } catch (error) {
    console.error('Error checking news existence:', error);
    return { exists: false, count: 0, documents: [] };
  }
};

// Function để push tất cả news data
export const pushAllNewsToFirestore = async () => {
  try {
    console.log('🚀 Starting to push all news data...');
    
    const results: Array<{
      originalId: number;
      success?: boolean;
      skipped?: boolean;
      reason?: string;
      firestoreId?: string;
      title?: string;
      message?: string;
      error?: string;
    }> = [];
    
    for (const newsItem of newsData) {
      // Kiểm tra xem news đã tồn tại chưa
      const existsCheck = await checkNewsExists(newsItem.id);
      
      if (existsCheck.exists) {
        console.log(`⚠️ News ID ${newsItem.id} already exists, skipping...`);
        results.push({
          originalId: newsItem.id,
          skipped: true,
          reason: 'Already exists'
        });
        continue;
      }
      
      // Push news mới
      const result = await pushNewsId1ToFirestore();
      results.push({
        originalId: newsItem.id,
        success: result.success,
        firestoreId: result.firestoreId,
        title: result.title,
        message: result.message,
        error: result.error
      });
      
      // Delay ngắn để tránh quá tải
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const successful = results.filter(r => r.success === true).length;
    const skipped = results.filter(r => r.skipped === true).length;
    const failed = results.filter(r => r.success === false).length;
    
    console.log(`✅ Push completed: ${successful} successful, ${skipped} skipped, ${failed} failed`);
    
    return {
      success: true,
      results,
      summary: { successful, skipped, failed }
    };
    
  } catch (error) {
    console.error('❌ Error pushing all news:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
