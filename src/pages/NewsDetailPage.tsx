import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from "../components/layout";
import { Title, SharePopup } from "../components";
import NewsCard from "../components/ui/NewsCard";
import { TbPinned } from "react-icons/tb";
import { useRealtimeNews, useScrollToTop } from "../hooks";
import { migrateSupabaseUrl } from "../services/imageUploadService";


const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [zoomImageSrc, setZoomImageSrc] = useState("");
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

  // Function để xử lý zoom ảnh
  const handleImageClick = (imageSrc: string) => {
    // Scroll lên đầu trang trước khi zoom
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Mở zoom modal sau khi scroll (delay nhỏ để smooth)
    setTimeout(() => {
      setZoomImageSrc(imageSrc);
      setIsImageZoomOpen(true);
    }, 200);
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
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={migrateSupabaseUrl(newsItem.image)}
                    alt={newsItem.title}
                    className="w-full h-auto max-h-[600px] object-contain bg-gray-50 cursor-pointer hover:scale-105 transition-transform duration-300"
                    style={{
                      minHeight: "200px",
                      maxWidth: "100%",
                    }}
                    onClick={() => handleImageClick(migrateSupabaseUrl(newsItem.image!))}
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      const aspectRatio = img.naturalWidth / img.naturalHeight;
                      
                      // Nếu ảnh dọc (portrait) - như ảnh chụp từ điện thoại
                      if (aspectRatio < 1) {
                        img.style.maxHeight = "500px";
                        img.style.width = "auto";
                        img.style.margin = "0 auto";
                        img.style.display = "block";
                      }
                      // Nếu ảnh ngang (landscape) - như banner
                      else if (aspectRatio > 1.5) {
                        img.style.width = "100%";
                        img.style.height = "auto";
                        img.style.maxHeight = "400px";
                        img.style.objectFit = "cover";
                      }
                      // Ảnh vuông hoặc gần vuông
                      else {
                        img.style.maxHeight = "450px";
                        img.style.width = "auto";
                        img.style.margin = "0 auto";
                        img.style.display = "block";
                      }
                    }}
                  />
                  {/* Zoom indicator */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
                    Click để phóng to
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="bg-background rounded-2xl p-4 mb-8 w-full max-w-none"
            style={{
              boxShadow: "inset -10px -10px 20px #FAFBFF, inset 10px 10px 20px rgba(22, 17, 29, 0.1)",
            }}
          >
            <article className="w-full break-words overflow-wrap-anywhere">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom styling cho các elements - loại bỏ bg riêng biệt
                  h1: ({...props}) => (
                    <h1 
                      className="text-2xl xl:text-3xl font-bold text-text-primary mb-6 mt-8 first:mt-0" 
                      {...props} 
                    />
                  ),
                  h2: ({...props}) => (
                    <h2 
                      className="text-2xl font-bold text-text-primary mb-4 mt-6" 
                      {...props} 
                    />
                  ),
                  h3: ({...props}) => (
                    <h3 
                      className="text-xl font-semibold text-text-primary mb-3 mt-4" 
                      {...props} 
                    />
                  ),
                  p: ({...props}) => (
                    <p 
                      className="text-gray-700 leading-8 mb-6 text-justify break-words" 
                      {...props} 
                    />
                  ),
                  strong: ({...props}) => (
                    <strong 
                      className="text-text-primary font-semibold break-words" 
                      {...props} 
                    />
                  ),
                  a: ({...props}) => (
                    <a 
                      className="text-accent hover:underline transition-all duration-200 break-all" 
                      {...props} 
                    />
                  ),
                  blockquote: ({...props}) => (
                    <blockquote 
                      className="border-l-4 border-accent text-gray-600 italic text-lg leading-relaxed pl-6 py-4 my-6" 
                      {...props} 
                    />
                  ),
                  code: ({...props}) => (
                    <code 
                      className="text-text-primary font-mono text-sm font-semibold" 
                      {...props} 
                    />
                  ),
                  pre: ({...props}) => (
                    <div
                      className="my-6 bg-background"
                    >
                      <pre 
                        className="text-white text-sm leading-relaxed m-0" 
                        {...props} 
                      />
                    </div>
                  ),
                  ul: ({...props}) => (
                    <ul 
                      className="my-6 space-y-3 text-gray-700 list-disc list-inside" 
                      {...props} 
                    />
                  ),
                  ol: ({...props}) => (
                    <ol 
                      className="my-6 space-y-3 text-gray-700 list-decimal list-inside" 
                      {...props} 
                    />
                  ),
                  li: ({...props}) => (
                    <li 
                      className="leading-relaxed" 
                      {...props} 
                    />
                  ),
                  img: ({...props}) => (
                    <div className="my-8 text-center">
                      <img 
                        className="rounded-lg w-full h-auto object-cover max-h-96 mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                          boxShadow: "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.1)",
                        }}
                        onClick={() => handleImageClick(props.src || "")}
                        {...props} 
                      />
                    </div>
                  ),
                  hr: () => (
                    <div className="my-8 flex justify-center">
                      <div 
                        className="w-24 h-1 bg-accent rounded-full opacity-30"
                      />
                    </div>
                  ),
                }}
              >
                {newsItem.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <button
              onClick={() => navigate("/news")}
              className="neumorphic-button-secondary"
              style={{ 
              padding: "10px 20px",
              fontWeight: "500",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              letterSpacing: "0",
             }}
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

      {/* Image Zoom Modal */}
      {isImageZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.95)' }}
          onClick={() => setIsImageZoomOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={zoomImageSrc}
              alt="Zoomed image"
              className="max-w-full max-h-full object-contain"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            {/* Close button */}
            <button
              onClick={() => setIsImageZoomOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 transition-all duration-200 z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg text-sm z-10">
              Click để đóng
            </div>
          </div>
        </div>
      )}

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
