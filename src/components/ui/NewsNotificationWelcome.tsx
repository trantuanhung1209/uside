import React, { useEffect } from 'react';
import { useNewsNotificationContext } from '../../hooks/useNewsNotificationContext';
import { newsData } from '../../data/newsData';
import { useNavigate, useLocation } from 'react-router-dom';

const NewsNotificationWelcome: React.FC = () => {
  const { showRichNews, removeNotification } = useNewsNotificationContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const STORAGE_KEY = 'uside_welcome_notification_shown';

  useEffect(() => {
    // Chỉ hiển thị thông báo khi đang ở trang chủ và chưa từng hiển thị trong session này
    if (location.pathname !== '/') {
      return;
    }

    // Kiểm tra xem đã hiển thị notification chưa từ sessionStorage
    const hasShownWelcomeNotification = sessionStorage.getItem(STORAGE_KEY);
    if (hasShownWelcomeNotification === 'true') {
      return;
    }

    // Tìm tin tức tuyển dụng từ newsData
    const recruitmentNews = newsData.find(news => news.category === 'recruitment');
    
    if (!recruitmentNews) {
      return;
    }

    // Delay một chút để trang load xong
    const timer = setTimeout(() => {
      const notificationId = showRichNews({
        type: 'rich',
        title: recruitmentNews.title,
        image: recruitmentNews.image,
        imageAlt: 'Tuyển dụng USide',
        newsId: recruitmentNews.id,
        content: (
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              {recruitmentNews.excerpt}
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                Chúng mình đang tìm kiếm:
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Sinh viên yêu thích công nghệ (React, TypeScript, UI/UX...)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Tinh thần học hỏi, chia sẻ và làm việc nhóm
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Cầu tiến và kiên nhẫn (không cần quá giỏi!)
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">✨</span>
                Bạn sẽ được:
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Học hỏi và làm dự án thực tế
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Phát triển kỹ năng lập trình và tư duy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Tạo ra sản phẩm ý nghĩa trong thời sinh viên
                </li>
              </ul>
            </div>

            <div className="text-center bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                💡 <span className="font-medium">Liên hệ ngay</span> để tham gia đội ngũ USide!
              </p>
            </div>
          </div>
        ),
        onDetailClick: (newsId) => {
          // Ẩn notification khi click xem chi tiết
          removeNotification(notificationId);
          
          if (newsId) {
            navigate(`/news/${newsId}`);
          }
        }
      }, {
        priority: 'high',
        autoCloseAfter: 45, // 45 giây để đọc kỹ nội dung
        showIcon: true
      });

      // Lưu trạng thái đã hiển thị vào sessionStorage
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, 2000); // Delay 2 giây

    return () => clearTimeout(timer);
  }, [showRichNews, navigate, location.pathname, removeNotification]);

  return null; // Component này không render gì, chỉ trigger notification
};

export default NewsNotificationWelcome;
