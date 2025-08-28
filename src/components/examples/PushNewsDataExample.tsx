import React, { useState } from 'react';
import { firestoreService } from '../../services';
import { newsData } from '../../data/newsData';

const PushNewsDataExample: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [pushedIds, setPushedIds] = useState<string[]>([]);

  // Push specific news item by ID
  const pushSpecificNews = async (newsId: number) => {
    setLoading(true);
    setResult('');
    
    try {
      // Tìm news item theo ID
      const newsItem = newsData.find(item => item.id === newsId);
      
      if (!newsItem) {
        setResult(`❌ Không tìm thấy news với ID: ${newsId}`);
        return;
      }

      // Chuẩn bị data để push lên Firestore
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
        // Thêm các field metadata
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'published',
        viewCount: 0,
        likeCount: 0
      };

      // Push lên Firestore
      const docId = await firestoreService.addDocument('news', firestoreData);
      
      setPushedIds(prev => [...prev, docId]);
      setResult(`✅ Đã push news "${newsItem.title}" với ID Firestore: ${docId}`);
      
      console.log('News pushed successfully:', {
        originalId: newsItem.id,
        firestoreId: docId,
        title: newsItem.title
      });
      
    } catch (error) {
      setResult(`❌ Lỗi khi push news: ${error}`);
      console.error('Error pushing news:', error);
    } finally {
      setLoading(false);
    }
  };

  // Push tất cả news data
  const pushAllNewsData = async () => {
    setLoading(true);
    setResult('');
    setPushedIds([]);
    
    try {
      const promises = newsData.map(async (newsItem) => {
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
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'published',
          viewCount: 0,
          likeCount: 0
        };

        const docId = await firestoreService.addDocument('news', firestoreData);
        return { originalId: newsItem.id, firestoreId: docId, title: newsItem.title };
      });

      const results = await Promise.all(promises);
      const firestoreIds = results.map(r => r.firestoreId);
      
      setPushedIds(firestoreIds);
      setResult(`✅ Đã push thành công ${results.length} news items lên Firestore!`);
      
      console.log('All news pushed successfully:', results);
      
    } catch (error) {
      setResult(`❌ Lỗi khi push tất cả news: ${error}`);
      console.error('Error pushing all news:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check existing news in Firestore
  const checkExistingNews = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const existingNews = await firestoreService.getDocuments('news');
      setResult(`📋 Hiện có ${existingNews.length} news items trong Firestore`);
      
      console.log('Existing news in Firestore:', existingNews);
    } catch (error) {
      setResult(`❌ Lỗi khi kiểm tra news: ${error}`);
      console.error('Error checking news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📰 Push News Data to Firestore</h1>
      
      {/* Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={() => pushSpecificNews(1)}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          🚀 Push News ID: 1
          <div className="text-sm mt-1 opacity-80">USide 2.0 Launch</div>
        </button>
        
        <button 
          onClick={pushAllNewsData}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          📤 Push All News
          <div className="text-sm mt-1 opacity-80">{newsData.length} items total</div>
        </button>
        
        <button 
          onClick={checkExistingNews}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          🔍 Check Existing
          <div className="text-sm mt-1 opacity-80">View current data</div>
        </button>
      </div>

      {/* Quick Push Buttons for Each News */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">📋 Push Individual News:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {newsData.map((news) => (
            <button
              key={news.id}
              onClick={() => pushSpecificNews(news.id)}
              disabled={loading}
              className="text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
            >
              <div className="font-medium text-sm">ID: {news.id}</div>
              <div className="text-xs text-gray-600 truncate">{news.title}</div>
              <div className="text-xs text-gray-500">{news.category} • {news.tags?.join(', ')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Result */}
      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          🔄 Đang xử lý...
        </div>
      )}

      {result && (
        <div className={`px-4 py-3 rounded mb-6 ${
          result.includes('✅') 
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {result}
        </div>
      )}

      {/* Pushed IDs Display */}
      {pushedIds.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">🎯 Firestore Document IDs:</h3>
          <div className="space-y-1">
            {pushedIds.map((id, index) => (
              <div key={id} className="text-sm font-mono bg-white p-2 rounded">
                Document #{index + 1}: {id}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">📄 Preview News Data to Push:</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm">
            <strong>Specific News (ID: 1):</strong>
          </div>
          <div className="mt-2 bg-white p-3 rounded text-sm">
            <div><strong>Title:</strong> {newsData[0]?.title}</div>
            <div><strong>Date:</strong> {newsData[0]?.date}</div>
            <div><strong>Author:</strong> {newsData[0]?.author}</div>
            <div><strong>Category:</strong> {newsData[0]?.category}</div>
            <div><strong>Tags:</strong> {newsData[0]?.tags?.join(', ')}</div>
            <div><strong>Pinned:</strong> {newsData[0]?.pinned ? 'Yes' : 'No'}</div>
            <div><strong>Excerpt:</strong> {newsData[0]?.excerpt}</div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">💡 Code được sử dụng:</h3>
        
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Push news to Firestore
const pushNews = async (newsItem: NewsItem) => {
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
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'published',
    viewCount: 0,
    likeCount: 0
  };

  const docId = await firestoreService.addDocument('news', firestoreData);
  return docId;
};`}
        </pre>
      </div>
    </div>
  );
};

export default PushNewsDataExample;
