import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Title } from '../components';
import NewsCard from '../components/ui/NewsCard';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - trong thực tế bạn sẽ fetch từ API
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: 'USide ra mắt phiên bản 2.0',
      date: '7 tháng 8, 2025',
      excerpt: 'Phiên bản mới với nhiều tính năng cải tiến và giao diện được thiết kế lại hoàn toàn.',
      content: `
        <p>USide tự hào giới thiệu phiên bản 2.0 với nhiều cải tiến đáng kể trong trải nghiệm người dùng và hiệu suất.</p>
        
        <h3>Tính năng mới</h3>
        <ul>
          <li>Giao diện người dùng được thiết kế lại hoàn toàn</li>
          <li>Hiệu suất cải thiện 40% so với phiên bản trước</li>
          <li>Tích hợp AI để cá nhân hóa trải nghiệm</li>
          <li>Hỗ trợ đa ngôn ngữ</li>
        </ul>
        
        <p>Chúng tôi tin rằng phiên bản 2.0 sẽ mang lại trải nghiệm tốt nhất cho người dùng.</p>
      `,
      image: '/images_uside/news.png',
      author: 'Đội ngũ USide',
      category: 'Cập nhật'
    },
    {
      id: 2,
      title: 'Cập nhật bảo mật quan trọng',
      date: '5 tháng 8, 2025',
      excerpt: 'Chúng tôi đã cập nhật các biện pháp bảo mật mới nhất để bảo vệ dữ liệu người dùng.',
      content: `
        <p>Bảo mật là ưu tiên hàng đầu của USide. Chúng tôi đã triển khai các cập nhật bảo mật quan trọng.</p>
        
        <h3>Các cải tiến bảo mật</h3>
        <ul>
          <li>Mã hóa end-to-end cho tất cả dữ liệu</li>
          <li>Xác thực hai yếu tố (2FA)</li>
          <li>Kiểm tra bảo mật định kỳ</li>
          <li>Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
        </ul>
        
        <p>Dữ liệu của bạn được bảo vệ với các công nghệ bảo mật tiên tiến nhất.</p>
      `,
      image: '/images_uside/mascot_robot.png',
      author: 'Team Security',
      category: 'Bảo mật'
    },
    {
      id: 3,
      title: 'Hợp tác với các đối tác công nghệ',
      date: '1 tháng 8, 2025',
      excerpt: 'USide chính thức hợp tác với các công ty công nghệ hàng đầu để mở rộng dịch vụ.',
      content: `
        <p>Chúng tôi vui mừng thông báo về các quan hệ đối tác chiến lược mới với các công ty công nghệ hàng đầu.</p>
        
        <h3>Lợi ích từ việc hợp tác</h3>
        <ul>
          <li>Mở rộng phạm vi dịch vụ</li>
          <li>Tích hợp công nghệ tiên tiến</li>
          <li>Cải thiện trải nghiệm người dùng</li>
          <li>Tăng cường khả năng cạnh tranh</li>
        </ul>
        
        <p>Những hợp tác này sẽ giúp USide phát triển mạnh mẽ hơn trong tương lai.</p>
      `,
      image: '/images_uside/uside_light.png',
      author: 'Ban lãnh đạo',
      category: 'Đối tác'
    },
  ];

  const newsItem = newsData.find(item => item.id === parseInt(id || '0'));

  if (!newsItem) {
    return (
      <Layout>
        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài viết
            </h1>
            <p className="text-gray-600 mb-8">
              Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <button 
              onClick={() => navigate('/tin-tuc')}
              className="neumorphic-button"
            >
              ← Quay lại tin tức
            </button>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <span 
              onClick={() => navigate('/tin-tuc')} 
              className="cursor-pointer hover:text-accent"
            >
              Tin tức
            </span>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{newsItem.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {newsItem.category && (
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  {newsItem.category}
                </span>
              )}
              <span className="text-gray-500 text-sm">{newsItem.date}</span>
              {newsItem.author && (
                <span className="text-gray-500 text-sm">Bởi {newsItem.author}</span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              {newsItem.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {newsItem.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {newsItem.image && (
            <div className="mb-8">
              <div 
                className="bg-background rounded-2xl p-4 mb-6"
                style={{
                  boxShadow: "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                }}
              >
                <div className="h-[400px] overflow-hidden rounded-xl">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <button 
              onClick={() => navigate('/tin-tuc')}
              className="neumorphic-button flex items-center gap-2"
            >
              ← Quay lại tin tức
            </button>
            
            <div className="flex gap-4">
              <button className="neumorphic-button">
                Chia sẻ
              </button>
              <button className="neumorphic-button">
                In bài viết
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <section className="mt-12">
            <Title title='Bài viết liên quan' desc='Khám phá thêm các bài viết khác từ chúng tôi' />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsData
                .filter(item => item.id !== newsItem.id)
                .slice(0, 2)
                .map((relatedItem) => (
                <NewsCard
                  key={relatedItem.id} 
                  article={relatedItem} 
                  index={0} // Chỉ cần index 0 vì không cần animation delay
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default NewsDetailPage;
