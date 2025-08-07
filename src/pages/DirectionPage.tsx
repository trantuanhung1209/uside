import { Layout } from '../components/layout';

const DirectionPage: React.FC = () => {
  return (
    <Layout>
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Định hướng phát triển
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Tầm nhìn</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Trở thành nền tảng hàng đầu trong việc cung cấp các giải pháp công nghệ
              hiện đại và thân thiện với người dùng.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">Mục tiêu</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Phát triển giao diện người dùng trực quan và dễ sử dụng</li>
              <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng</li>
              <li>Xây dựng cộng đồng developers mạnh mẽ</li>
              <li>Không ngừng cải tiến và đổi mới</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default DirectionPage;
