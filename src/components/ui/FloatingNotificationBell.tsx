import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAccentColor } from '../../hooks';
import NewsNotificationPopup from './NewsNotificationPopup';
import { newsData } from '../../data/newsData';

interface FloatingNotificationBellProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const FloatingNotificationBell: React.FC<FloatingNotificationBellProps> = ({
  className = '',
  position = 'bottom-right'
}) => {
  const { currentAccentColor } = useAccentColor();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showPopup, setShowPopup] = useState(false);

  // Xác định vị trí
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  // Xử lý click với hiệu ứng ripple
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    // Xóa ripple sau animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    // Mở popup thông báo
    setShowPopup(true);
  };

  const recruitmentNews = newsData.find((item) => item.category === 'recruitment');

  return (
    <>
      <div className={`fixed ${getPositionClasses()} z-50 ${className}`}>
        {/* Hiệu ứng loang background accent */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ 
            backgroundColor: currentAccentColor,
            animationDuration: '3s'
          }}
        />
        
        {/* Hiệu ứng glow */}
        <div 
          className="absolute inset-0 rounded-full blur-lg opacity-30 animate-pulse"
          style={{ 
            backgroundColor: currentAccentColor,
            filter: 'blur(8px)',
            transform: 'scale(1.2)'
          }}
        />

        {/* Button chính */}
        <button
          onClick={handleClick}
          className={`
            relative w-14 h-14 rounded-full cursor-pointer
            bg-white/90 backdrop-blur-sm
            shadow-lg hover:shadow-xl
            border-2 border-white/50
            transition-all duration-300 ease-out
            hover:scale-110 active:scale-95
            group overflow-hidden
          `}
          style={{ 
            borderColor: `${currentAccentColor}40`,
            boxShadow: `0 8px 32px -8px ${currentAccentColor}40`
          }}
          aria-label="Thông báo"
        >
          {/* Hiệu ứng ripple khi click */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full animate-ping opacity-40"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                backgroundColor: currentAccentColor,
                animationDuration: '0.6s',
              }}
            />
          ))}

          {/* Background gradient khi hover */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ 
              background: `radial-gradient(circle at center, ${currentAccentColor} 0%, transparent 70%)`
            }}
          />

          {/* Icon chuông */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <Bell 
              size={24} 
              className="transition-all duration-300 group-hover:scale-110"
              style={{ color: currentAccentColor }}
            />
          </div>

          {/* Dot thông báo */}
          <div 
            className="absolute top-1 right-1 w-4 h-4 rounded-full border-2 border-white animate-pulse bg-red-400"
          >
            <div className="absolute inset-1 rounded-full bg-white/30 animate-ping" />
          </div>
        </button>
      </div>
      
      {/* Popup thông báo */}
      {showPopup && recruitmentNews && (
        <NewsNotificationPopup
          content={{
            type: 'rich',
            title: recruitmentNews.title,
            content: (
              <div
                className="space-y-4"
                dangerouslySetInnerHTML={{ __html: recruitmentNews.content }}
              />
            ),
            image: recruitmentNews.image,
            imageAlt: recruitmentNews.title,
            newsId: recruitmentNews.id,
          }}
          priority="high"
          autoCloseAfter={45}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default FloatingNotificationBell;
