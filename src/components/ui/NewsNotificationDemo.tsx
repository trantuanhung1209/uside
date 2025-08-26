import React, { useEffect, useState, useCallback } from 'react';
import { useNewsNotificationContext } from '../../hooks/useNewsNotificationContext';
import { newsData } from '../../data/newsData';
import { useNavigate } from 'react-router-dom';

const NewsNotificationTrigger: React.FC = () => {
  const { showRichNews } = useNewsNotificationContext();
  const [hasShownWelcomeNews, setHasShownWelcomeNews] = useState(false);
  const navigate = useNavigate();

  // Xử lý khi click "Xem chi tiết"
  const handleDetailClick = useCallback((newsId?: number) => {
    if (newsId) {
      // Chuyển hướng đến trang chi tiết tin tức
      navigate(`/news/${newsId}`);
    }
  }, [navigate]);

  // Hiển thị thông báo tin tức chỉ lần đầu tiên vào website
  useEffect(() => {
    // Kiểm tra xem đã hiển thị thông báo chưa (trong session hiện tại)
    const hasShown = sessionStorage.getItem('uside_welcome_news_shown');
    
    if (!hasShown && !hasShownWelcomeNews) {
      const timer = setTimeout(() => {
        // Lấy tất cả tin tức recruitment từ newsData
        const recruitmentNews = newsData.filter(news => news.category === 'recruitment');
        
        if (recruitmentNews.length > 0) {
          // Lấy tin tức recruitment mới nhất (theo ngày)
          const latestRecruitmentNews = recruitmentNews.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];

          // Sử dụng rich content với dữ liệu thực
          showRichNews({
            type: 'rich',
            title: `🎯 ${latestRecruitmentNews.title}`,
            image: latestRecruitmentNews.image || '/images_uside/join_team.png',
            imageAlt: 'Tuyển dụng USide',
            newsId: latestRecruitmentNews.id, // Truyền ID của tin tức
            onDetailClick: handleDetailClick, // Truyền callback
            content: (
              <div className="space-y-4">
                <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  🚀 Cơ Hội Nghề Nghiệp Đang Chờ Bạn!
                </h1>
                
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {latestRecruitmentNews.excerpt}
                </p>
                
                <div 
                  className="p-3 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    borderLeftColor: 'var(--color-accent)'
                  }}
                >
                  <h2 className="font-semibold mb-2" style={{ color: 'var(--color-text-accent)' }}>
                    📅 Ngày đăng: {latestRecruitmentNews.date}
                  </h2>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                    dangerouslySetInnerHTML={{ __html: latestRecruitmentNews.content }}
                  />
                  {latestRecruitmentNews.tags && latestRecruitmentNews.tags.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium text-xs" style={{ color: 'var(--color-text-accent)' }}>
                        🏷️ Tags: 
                      </span>
                      {latestRecruitmentNews.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-block text-xs px-2 py-1 rounded mr-1"
                          style={{ 
                            backgroundColor: 'var(--color-accent-5)',
                            color: 'var(--color-text-accent)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {recruitmentNews.length > 1 && (
                  <div 
                    className="p-3 rounded-lg border-l-4"
                    style={{ 
                      backgroundColor: 'var(--color-accent-2)',
                      borderLeftColor: 'var(--color-accent-3)'
                    }}
                  >
                    <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      💼 Còn <strong>{recruitmentNews.length - 1}</strong> vị trí tuyển dụng khác đang chờ bạn khám phá!
                    </p>
                  </div>
                )}
              </div>
            )
          }, {
            priority: 'high',
            autoCloseAfter: 45, // Thời gian dài hơn cho thông báo tuyển dụng
          });
        }
        
        // Đánh dấu đã hiển thị thông báo
        setHasShownWelcomeNews(true);
        sessionStorage.setItem('uside_welcome_news_shown', 'true');
      }, 2000); // Hiện sau 2 giây khi vào trang

      return () => clearTimeout(timer);
    }
  }, [showRichNews, hasShownWelcomeNews, navigate, handleDetailClick]);

  // Component này không render gì cả, chỉ để trigger thông báo
  return null;
};

export default NewsNotificationTrigger;
