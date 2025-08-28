import React, { useState } from 'react';
import { firestoreService } from '../../services';
import type { FirestoreDocument } from '../../services';

const RealtimeDataExample: React.FC = () => {
  const [data, setData] = useState<FirestoreDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function để load data
  const loadData = async (collectionName: string) => {
    setLoading(true);
    try {
      const result = await firestoreService.getDocuments(collectionName);
      setData(result);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto refresh data every 5 seconds
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        loadData('contacts'); // Refresh contacts data
      }, 5000); // 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  // Simulate adding new data for testing
  const addTestData = async () => {
    try {
      const testContact = {
        name: `Test User ${Math.floor(Math.random() * 1000)}`,
        email: `test${Math.floor(Math.random() * 1000)}@example.com`,
        subject: 'Test Subject',
        message: 'This is a test message created for demo purposes.',
        status: Math.random() > 0.5 ? 'pending' : 'processed',
        submittedAt: new Date()
      };

      await firestoreService.addDocument('contacts', testContact);
      
      // Reload data to show the new addition
      if (!autoRefresh) {
        await loadData('contacts');
      }
      
      alert('✅ Test data added successfully!');
    } catch (error) {
      console.error('Error adding test data:', error);
      alert('❌ Error adding test data');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">⚡ Real-time Data Monitoring</h1>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          onClick={() => loadData('contacts')}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          📋 Load Contacts
        </button>
        
        <button 
          onClick={() => loadData('users')}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          👥 Load Users
        </button>
        
        <button 
          onClick={addTestData}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          ➕ Add Test Data
        </button>
        
        <button 
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`px-4 py-2 rounded text-white ${
            autoRefresh 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {autoRefresh ? '⏹️ Stop Auto Refresh' : '🔄 Start Auto Refresh'}
        </button>
      </div>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <strong>📊 Total Records:</strong> {data.length}
          </div>
          <div>
            <strong>🕒 Last Updated:</strong> {
              lastUpdated 
                ? lastUpdated.toLocaleTimeString('vi-VN')
                : 'Never'
            }
          </div>
          <div>
            <strong>🔄 Auto Refresh:</strong> 
            <span className={autoRefresh ? 'text-green-600' : 'text-red-600'}>
              {autoRefresh ? ' ON (5s)' : ' OFF'}
            </span>
          </div>
          {loading && (
            <div className="text-blue-600">
              <strong>⏳ Loading...</strong>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Stats */}
      {data.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.length}</div>
            <div className="text-sm text-blue-800">Total Records</div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {data.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-sm text-green-800">Pending</div>
          </div>
          
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {data.filter(item => item.status === 'processed').length}
            </div>
            <div className="text-sm text-purple-800">Processed</div>
          </div>
          
          <div className="bg-orange-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {data.filter(item => {
                const today = new Date();
                const itemDate = new Date(item.createdAt as string || item.submittedAt as string || '');
                return itemDate.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm text-orange-800">Today</div>
          </div>
        </div>
      )}

      {/* Data Table */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name/Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email/Info</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                      {item.id.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {String(item.name || item.title || 'N/A')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {String(item.email || item.subject || item.content?.toString().slice(0, 50) || 'N/A')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.status ? (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : item.status === 'processed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {String(item.status)}
                        </span>
                      ) : (
                        <span className="text-gray-400">No status</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {(item.createdAt || item.submittedAt) 
                        ? new Date(item.createdAt as string || item.submittedAt as string)
                            .toLocaleString('vi-VN')
                        : 'N/A'
                      }
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => console.log('Item details:', item)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        👁️ View
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await firestoreService.deleteDocument('contacts', item.id);
                            await loadData('contacts');
                            alert('✅ Deleted successfully!');
                          } catch {
                            alert('❌ Error deleting item');
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Data */}
      {!loading && data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Found</h3>
          <p className="text-gray-500 mb-4">Click on "Load Contacts" or "Load Users" to fetch data</p>
          <button 
            onClick={() => loadData('contacts')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Load Sample Data
          </button>
        </div>
      )}

      {/* Code Example */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">💡 Real-time Data Code:</h3>
        
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`// Auto refresh data every 5 seconds
useEffect(() => {
  let interval: NodeJS.Timeout;
  
  if (autoRefresh) {
    interval = setInterval(async () => {
      const data = await firestoreService.getDocuments('collection');
      setData(data);
    }, 5000);
  }
  
  return () => clearInterval(interval);
}, [autoRefresh]);

// Load data on demand
const loadData = async () => {
  const result = await firestoreService.getDocuments('contacts');
  setData(result);
};`}
        </pre>
      </div>
    </div>
  );
};

export default RealtimeDataExample;
