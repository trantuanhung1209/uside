import React, { useState, useEffect } from 'react';
import { firestoreService } from '../../services';
import type { FirestoreDocument } from '../../services';

const GetDataExample: React.FC = () => {
  const [users, setUsers] = useState<FirestoreDocument[]>([]);
  const [contacts, setContacts] = useState<FirestoreDocument[]>([]);
  const [singleUser, setSingleUser] = useState<FirestoreDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  // 1. Lấy TẤT CẢ documents từ một collection
  const getAllUsers = async () => {
    setLoading(true);
    setResult('');
    try {
      const data = await firestoreService.getDocuments('users');
      setUsers(data);
      setResult(`✅ Đã lấy ${data.length} users`);
      console.log('All users:', data);
    } catch (error) {
      setResult(`❌ Lỗi: ${error}`);
      console.error('Error getting users:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Lấy MỘT document cụ thể bằng ID
  const getUserById = async () => {
    const userId = prompt('Nhập user ID:');
    if (!userId) return;

    setLoading(true);
    setResult('');
    try {
      const user = await firestoreService.getDocument('users', userId);
      if (user) {
        setSingleUser(user);
        setResult(`✅ Tìm thấy user: ${user.name}`);
        console.log('User found:', user);
      } else {
        setResult('❌ Không tìm thấy user với ID này');
        setSingleUser(null);
      }
    } catch (error) {
      setResult(`❌ Lỗi: ${error}`);
      console.error('Error getting user:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Lấy data với ĐIỀU KIỆN (query)
  const getPendingContacts = async () => {
    setLoading(true);
    setResult('');
    try {
      const data = await firestoreService.queryDocuments(
        'contacts',
        [{ field: 'status', operator: '==', value: 'pending' }],
        'submittedAt', // sort by
        'desc', // descending
        10 // limit 10 records
      );
      setContacts(data);
      setResult(`✅ Đã lấy ${data.length} contacts đang pending`);
      console.log('Pending contacts:', data);
    } catch (error) {
      setResult(`❌ Lỗi: ${error}`);
      console.error('Error getting pending contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Lấy data với NHIỀU điều kiện
  const getFilteredContacts = async () => {
    setLoading(true);
    setResult('');
    try {
      const data = await firestoreService.queryDocuments(
        'contacts',
        [
          { field: 'status', operator: '==', value: 'pending' },
          // Có thể thêm nhiều điều kiện khác
        ],
        'submittedAt',
        'desc',
        5
      );
      setContacts(data);
      setResult(`✅ Đã lấy ${data.length} contacts với filter`);
      console.log('Filtered contacts:', data);
    } catch (error) {
      setResult(`❌ Lỗi: ${error}`);
      console.error('Error getting filtered contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // 5. Lấy data theo ngày tháng
  const getRecentContacts = async () => {
    setLoading(true);
    setResult('');
    try {
      // Lấy contacts từ 7 ngày trước
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const data = await firestoreService.queryDocuments(
        'contacts',
        [{ field: 'submittedAt', operator: '>=', value: sevenDaysAgo }],
        'submittedAt',
        'desc'
      );
      setContacts(data);
      setResult(`✅ Đã lấy ${data.length} contacts từ 7 ngày qua`);
      console.log('Recent contacts:', data);
    } catch (error) {
      setResult(`❌ Lỗi: ${error}`);
      console.error('Error getting recent contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // 6. Tự động load data khi component mount
  useEffect(() => {
    // Tự động load một số data khi component khởi tạo
    getAllUsers();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Lấy Data từ Firestore</h1>
      
      {/* Control Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={getAllUsers}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
        >
          📋 Lấy tất cả Users
        </button>
        
        <button 
          onClick={getUserById}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg disabled:opacity-50"
        >
          🔍 Lấy User theo ID
        </button>
        
        <button 
          onClick={getPendingContacts}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg disabled:opacity-50"
        >
          ⏳ Contacts Pending
        </button>
        
        <button 
          onClick={getFilteredContacts}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg disabled:opacity-50"
        >
          🎯 Filtered Contacts
        </button>
        
        <button 
          onClick={getRecentContacts}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50"
        >
          📅 Recent Contacts
        </button>
      </div>

      {/* Loading & Result */}
      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          🔄 Đang tải dữ liệu...
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

      {/* Single User Display */}
      {singleUser && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-2">👤 User Details:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>ID:</strong> {singleUser.id}</div>
            <div><strong>Name:</strong> {singleUser.name as string}</div>
            <div><strong>Email:</strong> {singleUser.email as string}</div>
            <div><strong>Age:</strong> {singleUser.age as number}</div>
          </div>
        </div>
      )}

      {/* Users List */}
      {users.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">👥 Users List ({users.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900 font-mono">{user.id.slice(0, 8)}...</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.name as string}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.email as string}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {user.createdAt 
                        ? new Date(user.createdAt as string | number | Date).toLocaleDateString('vi-VN')
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

      {/* Contacts List */}
      {contacts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">📞 Contacts List ({contacts.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Subject</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{contact.name as string}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{contact.email as string}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{contact.subject as string}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        contact.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {contact.status as string}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {contact.submittedAt 
                        ? new Date(contact.submittedAt as string | number | Date).toLocaleDateString('vi-VN')
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

      {/* No Data Message */}
      {!loading && users.length === 0 && contacts.length === 0 && !singleUser && (
        <div className="text-center py-8 text-gray-500">
          🔍 Chưa có dữ liệu. Hãy click vào các button ở trên để lấy data!
        </div>
      )}
    </div>
  );
};

export default GetDataExample;
