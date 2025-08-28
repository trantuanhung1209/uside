import React, { useState } from 'react';
import { firestoreService } from '../../services';

interface UserData {
  name: string;
  email: string;
  age: number;
  role: string;
  interests: string[];
}

interface NewsData {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  isPublished: boolean;
}

const FirestoreExample: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  // Ví dụ 1: Lưu thông tin user
  const saveUser = async () => {
    setLoading(true);
    try {
      const userData: UserData = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        age: 25,
        role: 'developer',
        interests: ['React', 'TypeScript', 'Firebase']
      };

      const docId = await firestoreService.addDocument('users', userData as unknown as Record<string, unknown>);
      setResult(`✅ User saved with ID: ${docId}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Ví dụ 2: Lưu bài viết tin tức
  const saveNews = async () => {
    setLoading(true);
    try {
      const newsData: NewsData = {
        title: 'Hướng dẫn sử dụng Firebase với React',
        content: 'Nội dung chi tiết về cách tích hợp Firebase vào dự án React...',
        author: 'Admin',
        category: 'Technology',
        tags: ['Firebase', 'React', 'Tutorial'],
        publishedAt: new Date(),
        isPublished: true
      };

      const docId = await firestoreService.addDocument('news', newsData as unknown as Record<string, unknown>);
      setResult(`✅ News saved with ID: ${docId}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Ví dụ 3: Lưu dữ liệu liên hệ từ form
  const saveContact = async () => {
    setLoading(true);
    try {
      const contactData = {
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0123456789',
        subject: 'Hỏi về dịch vụ',
        message: 'Tôi muốn biết thêm thông tin về các dịch vụ của công ty.',
        status: 'pending',
        submittedAt: new Date()
      };

      const docId = await firestoreService.addDocument('contacts', contactData);
      setResult(`✅ Contact saved with ID: ${docId}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Ví dụ 4: Lưu kết quả quiz
  const saveQuizResult = async () => {
    setLoading(true);
    try {
      const quizResult = {
        userId: 'user123',
        quizId: 'react-basics',
        answers: [
          { questionId: 1, selectedAnswer: 'A', isCorrect: true },
          { questionId: 2, selectedAnswer: 'B', isCorrect: false },
          { questionId: 3, selectedAnswer: 'C', isCorrect: true }
        ],
        score: 2,
        totalQuestions: 3,
        completedAt: new Date(),
        timeSpent: 300 // seconds
      };

      const docId = await firestoreService.addDocument('quiz_results', quizResult);
      setResult(`✅ Quiz result saved with ID: ${docId}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Ví dụ 5: Lưu settings của user
  const saveUserSettings = async () => {
    setLoading(true);
    try {
      const settings = {
        userId: 'user123',
        theme: 'dark',
        language: 'vi',
        notifications: {
          email: true,
          push: false,
          sms: true
        },
        privacy: {
          profileVisible: true,
          showEmail: false,
          showPhone: false
        },
        updatedAt: new Date()
      };

      const docId = await firestoreService.addDocument('user_settings', settings);
      setResult(`✅ Settings saved with ID: ${docId}`);
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Firestore Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={saveUser}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          Save User Data
        </button>
        
        <button 
          onClick={saveNews}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          Save News Article
        </button>
        
        <button 
          onClick={saveContact}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          Save Contact Form
        </button>
        
        <button 
          onClick={saveQuizResult}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          Save Quiz Result
        </button>
        
        <button 
          onClick={saveUserSettings}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg disabled:opacity-50"
        >
          Save User Settings
        </button>
      </div>

      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          🔄 Đang lưu dữ liệu...
        </div>
      )}

      {result && (
        <div className={`px-4 py-3 rounded ${
          result.includes('✅') 
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {result}
        </div>
      )}
    </div>
  );
};

export default FirestoreExample;
