import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { BannerBreadcrumb } from '../components';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
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
      <BannerBreadcrumb
        pageName="Tin tức"
        image="/images_uside/banner_news.png"
      />
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-text-primary mb-8">
            Tin tức mới nhất
          </h1>
          
          <div className="space-y-6">
            {news.map((item) => (
              <div 
                key={item.id} 
                className="bg-background rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.2)",
                }}
                onClick={() => navigate(`/tin-tuc/${item.id}`)}
              >
                <h2 className="text-xl font-semibold mb-2 text-text-primary">{item.title}</h2>
                <p className="text-sm text-text-secondary mb-3">{item.date}</p>
                <p className="text-text-secondary leading-relaxed mb-4">{item.excerpt}</p>
                <button 
                  className="neumorphic-button text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tin-tuc/${item.id}`);
                  }}
                >
                  Đọc thêm →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
