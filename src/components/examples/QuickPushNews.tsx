import React, { useState } from 'react';
import { firestoreService } from '../../services';
import { newsData } from '../../data/newsData';

const QuickPushNews: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  // Push news ID 1 to Firestore
  const pushNewsId1 = async () => {
    setLoading(true);
    setResult('');
    
    try {
      // Find news with ID 6
      const newsItem = newsData.find(item => item.id === 7);
      
      if (!newsItem) {
        setResult('❌ Không tìm thấy news với ID 1');
        return;
      }

      // Prepare data for Firestore
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

      // Push to Firestore
      const docId = await firestoreService.addDocument('news', firestoreData);
      
      setResult(`✅ Success! News "${newsItem.title}" pushed to Firestore with ID: ${docId}`);
      
      console.log('🎉 News pushed successfully:', {
        originalId: newsItem.id,
        firestoreId: docId,
        title: newsItem.title,
        data: firestoreData
      });
      
    } catch (error) {
      setResult(`❌ Error: ${error}`);
      console.error('Error pushing news:', error);
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
      setResult(`📋 Found ${existingNews.length} news items in Firestore collection 'news'`);
      
      console.log('Existing news:', existingNews);
    } catch (error) {
      setResult(`❌ Error checking news: ${error}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const newsItem = newsData.find(item => item.id === 7);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🚀 Push News ID 7 to Firestore</h1>

      {/* News Preview */}
      {newsItem && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold mb-2">📄 News to Push:</h3>
          <div className="space-y-2 text-sm">
            <div><strong>ID:</strong> {newsItem.id}</div>
            <div><strong>Title:</strong> {newsItem.title}</div>
            <div><strong>Date:</strong> {newsItem.date}</div>
            <div><strong>Author:</strong> {newsItem.author}</div>
            <div><strong>Category:</strong> {newsItem.category}</div>
            <div><strong>Tags:</strong> {newsItem.tags?.join(', ')}</div>
            <div><strong>Pinned:</strong> {newsItem.pinned ? 'Yes' : 'No'}</div>
            <div><strong>Excerpt:</strong> {newsItem.excerpt}</div>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={pushNewsId1}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 flex-1"
        >
          {loading ? '⏳ Pushing...' : '🚀 Push to Firestore'}
        </button>
        
        <button 
          onClick={checkExistingNews}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 flex-1"
        >
          {loading ? '⏳ Checking...' : '🔍 Check Existing'}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`p-4 rounded-lg ${
          result.includes('✅') 
            ? 'bg-green-100 border border-green-400 text-green-700'
            : result.includes('📋')
            ? 'bg-blue-100 border border-blue-400 text-blue-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {result}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">💡 Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Click "Push to Firestore" to add the news item to your Firestore database</li>
          <li>The data will be stored in the "news" collection</li>
          <li>Check console for detailed information</li>
          <li>Use "Check Existing" to see current data in Firestore</li>
        </ol>
      </div>
    </div>
  );
};

export default QuickPushNews;
