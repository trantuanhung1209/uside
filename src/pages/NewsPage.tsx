import { Layout } from '../components/layout';

const NewsPage: React.FC = () => {
  const news = [
    {
      id: 1,
      title: 'USide ra mắt phiên bản 2.0',
      date: '7 tháng 8, 2025',
      excerpt: 'Phiên bản mới với nhiều tính năng cải tiến và giao diện được thiết kế lại hoàn toàn.',
    },
    {
      id: 2,
      title: 'Cập nhật bảo mật quan trọng',
      date: '5 tháng 8, 2025',
      excerpt: 'Chúng tôi đã cập nhật các biện pháp bảo mật mới nhất để bảo vệ dữ liệu người dùng.',
    },
    {
      id: 3,
      title: 'Hợp tác với các đối tác công nghệ',
      date: '1 tháng 8, 2025',
      excerpt: 'USide chính thức hợp tác với các công ty công nghệ hàng đầu để mở rộng dịch vụ.',
    },
  ];

  return (
    <Layout>
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Tin tức mới nhất
          </h1>
          
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-gray-500 mb-3">{item.date}</p>
                <p className="text-gray-600 leading-relaxed">{item.excerpt}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                  Đọc thêm →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default NewsPage;
