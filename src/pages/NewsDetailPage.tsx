import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Layout } from "../components/layout";
import { Title, SharePopup } from "../components";
import NewsCard from "../components/ui/NewsCard";
import { TbPinned } from "react-icons/tb";
import { useRealtimeNews, useScrollToTop } from "../hooks";


const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  useScrollToTop();
  const { news: newsData, loading, error } = useRealtimeNews();

  // Tìm newsItem theo ID - hỗ trợ cả string và number từ Firestore
  const newsItem = newsData.find((item) => {
    // Chuyển về cùng kiểu string để so sánh
    return String(item.id) === String(id);
  });

  // Tạo URL hiện tại để chia sẻ
  const currentUrl = window.location.href;

  // Function để xử lý chia sẻ với scroll to top
  const handleShare = () => {
    // Scroll lên đầu trang
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Mở popup sau khi scroll
    setTimeout(() => {
      setIsSharePopupOpen(true);
    }, 300); // Delay nhỏ để scroll hoàn thành trước
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Có lỗi xảy ra
            </h1>
            <p className="text-gray-600 mb-8">
              {error}
            </p>
            <button
              onClick={() => navigate("/news")}
              className="neumorphic-button"
            >
              ← Quay lại tin tức
            </button>
          </div>
        </main>
      </Layout>
    );
  }

  if (!newsItem) {
    return (
      <Layout>
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài viết
            </h1>
            <p className="text-gray-600 mb-8">
              Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <button
              onClick={() => navigate("/news")}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-accent"
            >
              Trang chủ
            </span>
            <span className="mx-2">→</span>
            <span
              onClick={() => navigate("/news")}
              className="cursor-pointer hover:text-accent"
            >
              Tin tức
            </span>
            <span className="mx-2">→</span>
            <span className="text-accent">{newsItem.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              {/* Pinned Badge */}
              {newsItem.pinned && (
                <span
                  className="px-3 py-1 text-xs rounded-full font-semibold bg-red-500 text-white 
                           flex items-center gap-1 animate-pulse"
                  style={{
                    boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                  }}
                >
                  <TbPinned className="w-3 h-3" />
                  Tin ghim
                </span>
              )}
              
              {newsItem.category && (
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-300 cursor-pointer`}
                  style={{
                    boxShadow:
                      "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                    background:
                      newsItem.category === "update"
                        ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                        : newsItem.category === "security"
                        ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                        : newsItem.category === "partnership"
                        ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                        : newsItem.category === "recruitment"
                        ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                        : newsItem.category === "technology"
                        ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                        : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                    color: "white",
                  }}
                >
                  {newsItem.category === "update"
                    ? "Cập nhật"
                    : newsItem.category === "security"
                    ? "Bảo mật"
                    : newsItem.category === "partnership"
                    ? "Hợp tác"
                    : newsItem.category === "recruitment"
                    ? "Tuyển dụng"
                    : newsItem.category === "technology"
                    ? "Công nghệ"
                    : "Sự kiện"}
                </span>
              )}
              <span className="text-gray-500 text-sm">{newsItem.date}</span>
              {newsItem.author && (
                <span className="text-gray-500 text-sm">
                  Bởi {newsItem.author}
                </span>
              )}
            </div>
            <h1 className="lg:text-4xl xs:text-2xl font-bold text-text-primary mb-4">
              {newsItem.title}
            </h1>
            <p className="lg:text-xl xs:text-base text-gray-600 leading-relaxed">
              {newsItem.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {newsItem.image && (
            <div className="mb-8">
              <div
                className="bg-background rounded-2xl p-4 mb-6"
                style={{
                  boxShadow:
                    "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
                }}
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-contain lg:object-cover hover:scale-105 transition-transform duration-500"
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
              onClick={() => navigate("/news")}
              className="section-neumorphic flex items-center gap-2 text-accent px-1 py-1 cursor-pointer hover:scale-103"
            >
              ← Quay lại tin tức
            </button>

            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="neumorphic-button"
              >
                Chia sẻ
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <section className="mt-12">
            <Title
              title="Bài viết liên quan"
              desc="Khám phá thêm các bài viết khác từ chúng tôi"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData
                .filter((item) => item.id !== newsItem.id)
                .slice(0, 3)
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

      {/* Share Popup */}
      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
        url={currentUrl}
        title={newsItem.title}
      />
    </Layout>
  );
};

export default NewsDetailPage;
