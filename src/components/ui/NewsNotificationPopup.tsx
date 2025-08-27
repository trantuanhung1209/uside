import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Bell, Clock } from "lucide-react";

interface NewsNotificationContent {
  type: 'text' | 'html' | 'rich';
  title: string;
  message?: string;
  content?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  newsId?: number;
  onDetailClick?: (newsId?: number) => void;
}

interface NewsNotificationProps {
  content: NewsNotificationContent;
  onClose?: () => void;
  autoCloseAfter?: number;
  priority?: "low" | "medium" | "high";
  showIcon?: boolean;
  title?: string;
  message?: string;
}

// Simple hook để xử lý navigation
const useSimpleNavigation = () => {
  const navigate = useNavigate();
  
  const navigateToNews = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  return { navigateToNews };
};

const NewsNotificationPopup: React.FC<NewsNotificationProps> = ({
  content,
  title: legacyTitle,
  message: legacyMessage,
  onClose,
  autoCloseAfter = 30,
  priority = "medium",
  showIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(autoCloseAfter);
  
  // Sử dụng hook đơn giản
  const { navigateToNews } = useSimpleNavigation();

  // Handle backward compatibility
  const notificationContent: NewsNotificationContent = content || {
    type: 'text',
    title: legacyTitle || '',
    message: legacyMessage || ''
  };

  const handleClose = React.useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  const handleViewDetail = () => {
    if (notificationContent.newsId) {
      try {
        // Sử dụng React Router navigation
        navigateToNews(notificationContent.newsId);
      } catch (error) {
        // Fallback: reload page navigation
        console.warn('Router navigation failed, using window.location', error);
        window.location.href = `/news/${notificationContent.newsId}`;
      }
    }
    
    // Gọi callback nếu có
    if (notificationContent.onDetailClick) {
      notificationContent.onDetailClick(notificationContent.newsId);
    }
    
    handleClose();
  };

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, handleClose]);

  const getPriorityClasses = () => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50/80";
      case "medium":
        return "border-yellow-200 bg-yellow-50/80";
      case "low":
        return "border-blue-200 bg-blue-50/80";
      default:
        return "border-yellow-200 bg-yellow-50/80";
    }
  };

  const getIconColor = () => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-yellow-500";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed top-0 left-0 right-0 h-screen bg-black/10 backdrop-blur-sm z-[9998] transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div className="fixed top-0 left-0 right-0 z-[9999] p-4 flex justify-center items-center mt-10">
        <div
          className={`relative ${
            notificationContent.type === 'rich' ? 'max-w-lg' : 'max-w-md'
          } w-full transition-all duration-500 transform ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-16"
          }`}
        >
          {/* Main Popup */}
          <div
            className={`
              relative p-6 rounded-2xl border-2 max-h-[90vh] sm:max-h-[100vh]
              flex flex-col
               ${getPriorityClasses()}
               backdrop-filter backdrop-blur-20
               shadow-neumorphic
               transition-all duration-300
               news-notification-popup
             `}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="cursor-pointer absolute top-0 right-1 xl:top-4 xl:right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white/80 hover:bg-white shadow-neumorphic-sm transition-all duration-200 hover:scale-110 group"
              aria-label="Đóng thông báo"
            >
              <X
                size={16}
                className="group-hover:rotate-90 transition-transform duration-200"
              />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              {showIcon && (
                <div
                  className={`flex-shrink-0 p-2 rounded-xl bg-white/80 shadow-neumorphic-xs ${getIconColor()} animate-pulse`}
                >
                  <Bell size={20} className="animate-bounce" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 font-quicksand">
                  {notificationContent.title}
                </h3>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={14} />
                  <span className="font-mono">
                    Tự đóng sau: {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable content (image + message) so header/actions stay visible */}
            <div className="mb-4 overflow-auto max-h-[45vh] xl:max-h-[80vh] pr-2">
              {notificationContent.image && (
                <div className="mb-4">
                  <img
                    src={notificationContent.image}
                    alt={notificationContent.imageAlt || 'News image'}
                    className="w-full h-28 sm:h-40 object-cover rounded-lg shadow-neumorphic-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="mb-4">
                {notificationContent.type === 'text' && notificationContent.message && (
                  <p className="text-gray-700 text-base leading-relaxed">
                    {notificationContent.message}
                  </p>
                )}
                
                {notificationContent.type === 'html' && notificationContent.message && (
                  <div 
                    className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: notificationContent.message }}
                  />
                )}
                
                {notificationContent.type === 'rich' && notificationContent.content && (
                  <div className="text-gray-700 text-base leading-relaxed">
                    {notificationContent.content}
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                  priority === "high"
                    ? "bg-red-500"
                    : priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
                style={{
                  width: `${((autoCloseAfter - timeLeft) / autoCloseAfter) * 100}%`,
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleClose}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white/80 hover:bg-white rounded-lg shadow-neumorphic-sm transition-all duration-200 hover:scale-105"
              >
                Đã hiểu
              </button>

              {notificationContent.newsId && (
                <button
                  onClick={handleViewDetail}
                  className="neumorphic-button cursor-pointer px-4 py-2 text-sm font-medium"
                >
                  Xem chi tiết
                </button>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/60 rounded-full shadow-neumorphic-xs animate-bounce" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/40 rounded-full shadow-neumorphic-xs animate-pulse" />
          </div>

          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-2xl -z-10 blur-xl opacity-20 ${
              priority === "high"
                ? "bg-red-400"
                : priority === "medium"
                ? "bg-yellow-400"
                : "bg-blue-400"
            } animate-pulse`}
          />
        </div>
      </div>
    </>
  );
};

export default NewsNotificationPopup;
