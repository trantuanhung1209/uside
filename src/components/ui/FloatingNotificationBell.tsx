import React, { useState, useRef, useEffect } from "react";
import { Bell, X, Clock, ExternalLink, Pin } from "lucide-react";
import { useAccentColor, useReadNews, useRealtimeNews } from "../../hooks";
import { categorizeNewsByDate, getRelativeTimeText } from "../../utils";
import { useNavigate } from "react-router-dom";

interface FloatingNotificationBellProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  isFixed?: boolean; // Thêm prop để điều khiển position fixed hay không
}

const FloatingNotificationBell: React.FC<FloatingNotificationBellProps> = ({
  className = "",
  position = "bottom-right",
  isFixed = true,
}) => {
  const { news: newsData, loading, error } = useRealtimeNews();
  const { currentAccentColor } = useAccentColor();
  const { isNewsRead, markAsRead } = useReadNews();
  const navigate = useNavigate();
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopup]);

  // Phân loại tin tức theo thời gian  
  const { newNews, todayNews, olderNews } = categorizeNewsByDate(
    newsData.sort((a, b) => {
      // Ưu tiên tin ghim lên đầu trong mỗi nhóm
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Nếu cùng loại (cùng ghim hoặc cùng không ghim), sắp xếp theo ID giảm dần (mới nhất lên đầu)
      return b.id - a.id;
    })
  );

  // Tính số tin chưa đọc
  const unreadCount = newsData.filter(news => !isNewsRead(news.id)).length;

  // Xác định vị trí
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "bottom-4 right-4";
    }
  };

  // Xử lý click với hiệu ứng ripple
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Xóa ripple sau animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    // Toggle popup thông báo
    setShowPopup((prev) => !prev);
  };

  // Xử lý click vào tin tức
  const handleNewsClick = (newsId: number) => {
    markAsRead(newsId); // Đánh dấu tin đã đọc
    navigate(`/news/${newsId}`);
    setShowPopup(false);
  };

  return (
    <>
      <div
        className={`${isFixed ? "fixed" : "relative"} ${
          isFixed ? getPositionClasses() : ""
        } z-50 ${className}`}
      >
        {/* Hiệu ứng loang background accent */}
        <div className="absolute inset-0 rounded-full opacity-20" />

        {/* Hiệu ứng glow */}
        <div className="absolute inset-0 rounded-full blur-lg opacity-30" />

        {/* Button chính */}
        <button
          onClick={handleClick}
          className={`
            relative section-neumorphic w-8 h-8 md:w-10 md:h-10 cursor-pointer rounded-full hover:scale-105
          `}
          aria-label="Thông báo"
        >
          {/* Hiệu ứng ripple khi click */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full opacity-40"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                backgroundColor: currentAccentColor,
                animationDuration: "0.6s",
              }}
            />
          ))}

          {/* Background gradient khi hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

          {/* Icon chuông */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <Bell
              size={24}
              className="transition-all duration-300 group-hover:scale-110"
              style={{ color: currentAccentColor }}
            />
          </div>

          {/* Dot thông báo */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white animate-pulse bg-red-500">
              <div className="absolute inset-1 rounded-full bg-white/30 animate-ping" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </div>
            </div>
          )}
        </button>

        {/* Popup thông báo tin tức */}
        {showPopup && (
          <div
            ref={popupRef}
            className={`absolute top-full ${
              isFixed ? "right-0" : "right-0"
            } mt-2 w-80 max-h-[500px] overflow-hidden rounded-xl shadow-xl z-50`}
            style={{
              background: "var(--color-background)",
              boxShadow: `
                inset -3px -3px 6px rgba(255,255,255,0.9),
                inset 3px 3px 6px rgba(0,0,0,0.1),
                0 10px 30px rgba(0,0,0,0.2)
              `,
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b border-gray-200/50 flex items-center justify-between"
              style={{
                boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.1)",
              }}
            >
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Bell size={18} style={{ color: currentAccentColor }} />
                Tin tức mới nhất
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Danh sách tin tức theo 3 nhóm */}
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                 style={{
                   scrollbarWidth: 'thin',
                   scrollbarColor: '#cbd5e0 #f7fafc'
                 }}
            >
              {/* Hiển thị loading skeleton */}
              {loading && (
                <div className="p-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex gap-3 p-3 border-b border-border">
                      {/* Skeleton cho ảnh */}
                      <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse flex-shrink-0"></div>
                      {/* Skeleton cho nội dung */}
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="flex gap-2">
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Hiển thị lỗi */}
              {error && !loading && (
                <div className="p-4 text-center">
                  <div className="text-red-500 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-600 mb-3">
                    Không thể tải tin tức. Vui lòng thử lại sau.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Tải lại
                  </button>
                </div>
              )}

              {/* Hiển thị tin tức khi không loading và không lỗi */}
              {!loading && !error && (
                <>
              {/* Tin mới */}
              {newNews.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-sm font-bold text-text-primary bg-border border-b border-gray-100/50">
                    Tin mới
                  </div>
                  {newNews.map((news, index) => (
                    <div
                      key={news.id}
                      onClick={() => handleNewsClick(news.id)}
                      className="p-3 border-b border-border cursor-pointer transition-all duration-200 hover:bg-gray-50/50 group"
                      style={{
                        boxShadow:
                          index === 0 ? "inset 0 1px 2px rgba(0,0,0,0.05)" : "none",
                      }}
                    >
                      <div className="flex gap-3">
                        {/* Ảnh tin tức */}
                        {news.image && (
                          <div
                            className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                            style={{
                              boxShadow:
                                "inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        )}

                        {/* Nội dung */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            {news.pinned && (
                              <Pin
                                size={12}
                                className="text-red-500 flex-shrink-0"
                              />
                            )}
                            <h4 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-gray-900 hover:text-accent flex-1">
                              {news.title}
                            </h4>
                            {/* Dấu chấm chưa đọc */}
                            {!isNewsRead(news.id) && (
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                                style={{ backgroundColor: currentAccentColor }}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-[10px] px-1 py-0 rounded-full font-medium"
                              style={{
                                background: news.category === "update"
                                  ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                                  : news.category === "security"
                                  ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                                  : news.category === "partnership"
                                  ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                                  : news.category === "recruitment"
                                  ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                                  : news.category === "technology"
                                  ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                                  : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                                color: "white",
                              }}
                            >
                              {news.category === "recruitment"
                                ? "Tuyển dụng"
                                : news.category === "technology"
                                ? "Công nghệ"
                                : news.category === "update"
                                ? "Cập nhật"
                                : news.category === "security"
                                ? "Bảo mật"
                                : news.category === "partnership"
                                ? "Đối tác"
                                : news.category === "event"
                                ? "Sự kiện"
                                : "Tin tức"}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock size={12} />
                              <span className="text-xs">{getRelativeTimeText(news.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Icon xem chi tiết */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Hôm nay */}
              {todayNews.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-sm font-bold text-gray-600 bg-border border-b border-gray-100/50">
                    Hôm nay
                  </div>
                  {todayNews.map((news) => (
                    <div
                      key={news.id}
                      onClick={() => handleNewsClick(news.id)}
                      className="p-3 border-b border-border cursor-pointer transition-all duration-200 hover:bg-gray-50/50 group"
                    >
                      <div className="flex gap-3">
                        {/* Ảnh tin tức */}
                        {news.image && (
                          <div
                            className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                            style={{
                              boxShadow:
                                "inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        )}

                        {/* Nội dung */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            {news.pinned && (
                              <Pin
                                size={12}
                                className="text-red-500 flex-shrink-0"
                              />
                            )}
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-gray-900 hover:text-accent flex-1">
                              {news.title}
                            </h4>
                            {/* Dấu chấm chưa đọc */}
                            {!isNewsRead(news.id) && (
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                                style={{ backgroundColor: currentAccentColor }}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-[10px] px-1 py-0 rounded-full font-medium"
                              style={{
                                background: news.category === "update"
                                  ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                                  : news.category === "security"
                                  ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                                  : news.category === "partnership"
                                  ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                                  : news.category === "recruitment"
                                  ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                                  : news.category === "technology"
                                  ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                                  : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                                color: "white",
                              }}
                            >
                              {news.category === "recruitment"
                                ? "Tuyển dụng"
                                : news.category === "technology"
                                ? "Công nghệ"
                                : news.category === "update"
                                ? "Cập nhật"
                                : news.category === "security"
                                ? "Bảo mật"
                                : news.category === "partnership"
                                ? "Đối tác"
                                : news.category === "event"
                                ? "Sự kiện"
                                : "Tin tức"}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock size={12} />
                              <span className="text-xs">{getRelativeTimeText(news.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Icon xem chi tiết */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trước đó */}
              {olderNews.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-sm font-bold text-gray-600 bg-border border-b border-gray-100/50">
                    Trước đó
                  </div>
                  {olderNews.map((news) => (
                    <div
                      key={news.id}
                      onClick={() => handleNewsClick(news.id)}
                      className="p-3 border-b border-border cursor-pointer transition-all duration-200 hover:bg-gray-50/50 group"
                    >
                      <div className="flex gap-3">
                        {/* Ảnh tin tức */}
                        {news.image && (
                          <div
                            className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                            style={{
                              boxShadow:
                                "inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        )}

                        {/* Nội dung */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            {news.pinned && (
                              <Pin
                                size={12}
                                className="text-red-500 flex-shrink-0"
                              />
                            )}
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-gray-900 hover:text-accent flex-1">
                              {news.title}
                            </h4>
                            {/* Dấu chấm chưa đọc */}
                            {!isNewsRead(news.id) && (
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                                style={{ backgroundColor: currentAccentColor }}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-[10px] px-1 py-0 rounded-full font-medium"
                              style={{
                                background: news.category === "update"
                                  ? "linear-gradient(90deg, #9fc9e8, #00d2ff)" // xanh dương pastel
                                  : news.category === "security"
                                  ? "linear-gradient(90deg, #e8a9c4, #d98bb0)" // hồng pastel đậm
                                  : news.category === "partnership"
                                  ? "linear-gradient(90deg, #eabf94, #e89b5c)" // cam đào ấm
                                  : news.category === "recruitment"
                                  ? "linear-gradient(90deg, #e8e39a, #d6cf66)" // vàng pastel đậm
                                  : news.category === "technology"
                                  ? "linear-gradient(90deg, #a9d7a1, #7ecb85)" // xanh lá mint
                                  : "linear-gradient(90deg, #d4ecfa, #9fc9e8)", // default: xanh pastel
                                color: "white",
                              }}
                            >
                              {news.category === "recruitment"
                                ? "Tuyển dụng"
                                : news.category === "technology"
                                ? "Công nghệ"
                                : news.category === "update"
                                ? "Cập nhật"
                                : news.category === "security"
                                ? "Bảo mật"
                                : news.category === "partnership"
                                ? "Đối tác"
                                : news.category === "event"
                                ? "Sự kiện"
                                : "Tin tức"}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock size={12} />
                              <span className="text-xs">{news.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Icon xem chi tiết */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
                </>
              )}
            </div>

            {/* Footer */}
            <div
              className="pb-2 border-t border-border"
              style={{
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              <button
                onClick={() => {
                  navigate("/news");
                  setShowPopup(false);
                }}
                className="w-full py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  color: currentAccentColor,
                  background: "var(--color-background)",
                  boxShadow:
                    "inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.1)`;
                }}
              >
                Xem tất cả tin tức
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingNotificationBell;
