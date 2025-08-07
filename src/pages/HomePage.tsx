import React from 'react';
import { Button, Input } from '../components/ui';
import { Layout } from '../components/layout';

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <main className="py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Chào mừng đến với USide! 🤖
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Robot Loading Demo</h2>
            <p className="text-gray-600 mb-4">
              Con robot đã hoàn thành việc kéo cánh cửa sổ lên! Bạn có thể reload trang để xem lại hiệu ứng.
            </p>
            <Button 
              variant="primary" 
              onClick={handleReloadPage}
              className="mb-6"
            >
              🔄 Xem lại hiệu ứng loading
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Demo Components</h2>
            
            <div className="space-y-4">
              <Input
                label="Nhập tên của bạn"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tên của bạn..."
                helpText="Đây là một input component tùy chỉnh"
              />
              
              <div className="flex space-x-4">
                <Button variant="primary">
                  Button Primary
                </Button>
                <Button variant="secondary">
                  Button Secondary
                </Button>
                <Button variant="danger">
                  Button Danger
                </Button>
              </div>
              
              {inputValue && (
                <div className="p-4 bg-blue-50 rounded-md">
                  <p className="text-blue-800">
                    Xin chào, <strong>{inputValue}</strong>! 👋
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Cấu trúc dự án</h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/components/ui/RobotImageLoader.tsx</code> - Component loading với robot</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/hooks/useAppLoading.ts</code> - Hook quản lý trạng thái loading</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/styles/robot-loading.css</code> - CSS animations cho robot</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/components/</code> - Các component tái sử dụng</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/hooks/</code> - Custom hooks</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/services/</code> - API services</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/utils/</code> - Utility functions</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/types/</code> - TypeScript type definitions</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/constants/</code> - Hằng số ứng dụng</p>
              <p><code className="bg-gray-100 px-2 py-1 rounded">src/pages/</code> - Các trang của ứng dụng</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
