import React, { useState } from 'react';
import { firestoreService } from '../../services';
import type { FirestoreDocument } from '../../services';

const AdvancedQueryExample: React.FC = () => {
  const [results, setResults] = useState<FirestoreDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [queryInfo, setQueryInfo] = useState<string>('');

  // Query 1: Lấy articles được publish trong tháng này
  const getThisMonthArticles = async () => {
    setLoading(true);
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const endOfMonth = new Date();
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);
      endOfMonth.setHours(23, 59, 59, 999);

      const articles = await firestoreService.queryDocuments(
        'articles',
        [
          { field: 'publishedAt', operator: '>=', value: startOfMonth },
          { field: 'publishedAt', operator: '<=', value: endOfMonth },
          { field: 'status', operator: '==', value: 'published' }
        ],
        'publishedAt',
        'desc'
      );

      setResults(articles);
      setQueryInfo(`📅 Articles published this month: ${articles.length} found`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Query 2: Lấy users có age trong khoảng
  const getUsersByAgeRange = async () => {
    setLoading(true);
    try {
      const youngUsers = await firestoreService.queryDocuments(
        'users',
        [
          { field: 'age', operator: '>=', value: 18 },
          { field: 'age', operator: '<=', value: 30 }
        ],
        'age',
        'asc'
      );

      setResults(youngUsers);
      setQueryInfo(`👦 Users aged 18-30: ${youngUsers.length} found`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Query 3: Lấy orders có giá trị cao
  const getHighValueOrders = async () => {
    setLoading(true);
    try {
      const highValueOrders = await firestoreService.queryDocuments(
        'orders',
        [
          { field: 'total', operator: '>', value: 1000000 }, // > 1 triệu
          { field: 'status', operator: '!=', value: 'cancelled' }
        ],
        'total',
        'desc',
        10
      );

      setResults(highValueOrders);
      setQueryInfo(`💰 High value orders (>1M): ${highValueOrders.length} found`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Query 4: Lấy contacts chưa được xử lý
  const getUnprocessedContacts = async () => {
    setLoading(true);
    try {
      const unprocessed = await firestoreService.queryDocuments(
        'contacts',
        [
          { field: 'status', operator: 'in', value: ['pending', 'new'] }
        ],
        'submittedAt',
        'asc' // Cũ nhất trước
      );

      setResults(unprocessed);
      setQueryInfo(`⏳ Unprocessed contacts: ${unprocessed.length} found`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Query 5: Search theo text (tìm trong title/name)
  const searchByText = async () => {
    const searchText = prompt('Nhập từ khóa tìm kiếm:');
    if (!searchText) return;

    setLoading(true);
    try {
      // Firestore không support full-text search, nhưng có thể dùng trick này
      const searchUpper = searchText.charAt(0).toUpperCase() + searchText.slice(1);

      const results1 = await firestoreService.queryDocuments(
        'articles',
        [
          { field: 'title', operator: '>=', value: searchText },
          { field: 'title', operator: '<', value: searchText + '\uf8ff' }
        ]
      );

      const results2 = await firestoreService.queryDocuments(
        'articles',
        [
          { field: 'title', operator: '>=', value: searchUpper },
          { field: 'title', operator: '<', value: searchUpper + '\uf8ff' }
        ]
      );

      // Combine và remove duplicates
      const combined = [...results1, ...results2];
      const unique = combined.filter((item, index, self) => 
        self.findIndex(t => t.id === item.id) === index
      );

      setResults(unique);
      setQueryInfo(`🔍 Search results for "${searchText}": ${unique.length} found`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Query 6: Lấy data với pagination
  const getDataWithPagination = async () => {
    setLoading(true);
    try {
      // Lấy 5 records đầu tiên
      const firstBatch = await firestoreService.queryDocuments(
        'users',
        [],
        'createdAt',
        'desc',
        5
      );

      setResults(firstBatch);
      setQueryInfo(`📄 First 5 users (pagination demo): ${firstBatch.length} found`);
      
      // Note: Để implement pagination đầy đủ, cần dùng startAfter() của Firestore
      console.log('For full pagination, implement startAfter() in firestoreService');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Query 7: Count documents (estimate)
  const getDataCount = async () => {
    setLoading(true);
    try {
      const allUsers = await firestoreService.getDocuments('users');
      const allContacts = await firestoreService.getDocuments('contacts');
      const allArticles = await firestoreService.getDocuments('articles');

      setResults([]);
      setQueryInfo(`📊 Data Count - Users: ${allUsers.length}, Contacts: ${allContacts.length}, Articles: ${allArticles.length}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔧 Advanced Firestore Queries</h1>
      
      {/* Query Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        <button 
          onClick={getThisMonthArticles}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          📅 This Month Articles
        </button>
        
        <button 
          onClick={getUsersByAgeRange}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          👦 Users 18-30
        </button>
        
        <button 
          onClick={getHighValueOrders}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          💰 High Value Orders
        </button>
        
        <button 
          onClick={getUnprocessedContacts}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          ⏳ Unprocessed
        </button>
        
        <button 
          onClick={searchByText}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          🔍 Search Text
        </button>
        
        <button 
          onClick={getDataWithPagination}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          📄 Pagination
        </button>
        
        <button 
          onClick={getDataCount}
          disabled={loading}
          className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg disabled:opacity-50 text-sm"
        >
          📊 Count Data
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          🔄 Executing query...
        </div>
      )}

      {/* Query Info */}
      {queryInfo && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {queryInfo}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="text-lg font-medium">Query Results ({results.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Data</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900 font-mono">
                      {item.id.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {item.title ? 'Article' : item.name && item.email ? 'Contact' : item.name ? 'User' : 'Other'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      <div className="max-w-xs truncate">
                        {String(item.title || item.name || item.subject || 'N/A')}
                      </div>
                      {item.email ? (
                        <div className="text-gray-500 text-xs">{String(item.email)}</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {(item.createdAt || item.submittedAt || item.publishedAt) 
                        ? new Date((item.createdAt || item.submittedAt || item.publishedAt) as string | number | Date)
                            .toLocaleDateString('vi-VN')
                        : 'N/A'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Examples */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">💡 Code Examples:</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <strong>🔍 Basic Query:</strong>
            <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
{`// Lấy tất cả documents
const data = await firestoreService.getDocuments('collection_name');

// Lấy 1 document by ID  
const doc = await firestoreService.getDocument('collection_name', 'doc_id');`}
            </pre>
          </div>
          
          <div>
            <strong>🎯 Query với điều kiện:</strong>
            <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
{`// Query với conditions
const filtered = await firestoreService.queryDocuments(
  'collection_name',
  [
    { field: 'status', operator: '==', value: 'active' },
    { field: 'age', operator: '>', value: 18 }
  ],
  'createdAt', // sort by
  'desc',      // direction
  10           // limit
);`}
            </pre>
          </div>
          
          <div>
            <strong>📅 Query theo ngày:</strong>
            <pre className="bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
{`// Lấy data từ 7 ngày qua
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

const recent = await firestoreService.queryDocuments(
  'collection_name',
  [{ field: 'createdAt', operator: '>=', value: lastWeek }]
);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedQueryExample;
