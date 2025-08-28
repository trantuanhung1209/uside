import React, { useState, useEffect } from 'react';
import { firestoreService } from '../../services';
import type { FirestoreDocument } from '../../services';

// Component để hiển thị và quản lý dữ liệu đã lưu
const DataManagementExample: React.FC = () => {
  const [contacts, setContacts] = useState<FirestoreDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<FirestoreDocument | null>(null);

  // Lấy tất cả contacts từ Firestore
  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await firestoreService.getDocuments('contacts');
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy contacts với điều kiện (ví dụ: chỉ lấy những contact đang pending)
  const loadPendingContacts = async () => {
    setLoading(true);
    try {
      const data = await firestoreService.queryDocuments(
        'contacts',
        [{ field: 'status', operator: '==', value: 'pending' }],
        'submittedAt',
        'desc'
      );
      setContacts(data);
    } catch (error) {
      console.error('Error loading pending contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật trạng thái contact
  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      await firestoreService.updateDocument('contacts', contactId, {
        status: newStatus,
        processedAt: new Date()
      });
      
      // Refresh danh sách
      await loadContacts();
      alert('Cập nhật thành công!');
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Có lỗi xảy ra khi cập nhật!');
    }
  };

  // Xóa contact
  const deleteContact = async (contactId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa contact này?')) return;
    
    try {
      await firestoreService.deleteDocument('contacts', contactId);
      await loadContacts();
      alert('Xóa thành công!');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Có lỗi xảy ra khi xóa!');
    }
  };

  // Load data khi component mount
  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Data Management</h1>
      
      {/* Control buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={loadContacts}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Tải tất cả contacts
        </button>
        
        <button 
          onClick={loadPendingContacts}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Chỉ tải contacts pending
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Data table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Họ tên</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Chủ đề</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Trạng thái</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Ngày gửi</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Hành động</th>
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
                      : contact.status === 'processed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
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
                <td className="px-4 py-2 text-sm space-x-2">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Xem
                  </button>
                  
                  {contact.status === 'pending' && (
                    <button
                      onClick={() => updateContactStatus(contact.id, 'processed')}
                      className="text-green-600 hover:text-green-800"
                    >
                      Đánh dấu đã xử lý
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {contacts.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </div>

      {/* Contact detail modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chi tiết Contact</h2>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div><strong>Họ tên:</strong> {selectedContact.name as string}</div>
                <div><strong>Email:</strong> {selectedContact.email as string}</div>
                <div><strong>Số điện thoại:</strong> {selectedContact.phone as string || 'N/A'}</div>
                <div><strong>Chủ đề:</strong> {selectedContact.subject as string}</div>
                <div><strong>Tin nhắn:</strong></div>
                <div className="bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {selectedContact.message as string}
                </div>
                <div><strong>Trạng thái:</strong> {selectedContact.status as string}</div>
                <div><strong>Ngày gửi:</strong> {
                  selectedContact.submittedAt 
                    ? new Date(selectedContact.submittedAt as string | number | Date).toLocaleString('vi-VN')
                    : 'N/A'
                }</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagementExample;
