import { useState, useEffect } from 'react';
import { useAccentColor } from '../../hooks/useAccentColor';
import { ACCENT_COLORS } from '../../constants/accentColors';

interface ColorOption {
  key: keyof typeof ACCENT_COLORS;
  color: string;
  name: string;
  description: string;
}

const colorOptions: ColorOption[] = [
  {
    key: 'default',
    color: ACCENT_COLORS.default,
    name: 'Bình tĩnh',
    description: 'Thư giãn, tĩnh lặng'
  },
  {
    key: 'accent1',
    color: ACCENT_COLORS.accent1,
    name: 'Yêu thương',
    description: 'Lãng mạn, ấm áp'
  },
  {
    key: 'accent2',
    color: ACCENT_COLORS.accent2,
    name: 'Hưng phấn',
    description: 'Nhiệt huyết, năng động'
  },
  {
    key: 'accent3',
    color: ACCENT_COLORS.accent3,
    name: 'Vui vẻ',
    description: 'Tích cực, rạng rỡ'
  },
  {
    key: 'accent4',
    color: ACCENT_COLORS.accent4,
    name: 'Hy vọng',
    description: 'Tươi mới, lạc quan'
  },
  {
    key: 'accent5',
    color: ACCENT_COLORS.accent5,
    name: 'Tin tưởng',
    description: 'Chuyên nghiệp, ổn định'
  },
  {
    key: 'accent6',
    color: ACCENT_COLORS.accent6,
    name: 'Sáng tạo',
    description: 'Bí ẩn, nghệ thuật'
  },
  {
    key: 'accent7',
    color: ACCENT_COLORS.accent7,
    name: 'Thành công',
    description: 'Sang trọng, quý phái'
  },
  {
    key: 'accent8',
    color: ACCENT_COLORS.accent8,
    name: 'Quyết tâm',
    description: 'Mạnh mẽ, dứt khoát'
  }
];

const ChangeAccentColor = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasNewColors, setHasNewColors] = useState(false);
  const { currentAccentColor, changeAccentColor } = useAccentColor();

  // Kiểm tra localStorage để xem user đã từng tương tác chưa và có màu mới không
  useEffect(() => {
    const hasUserInteracted = localStorage.getItem('uside-color-interacted');
    const storedColorCount = parseInt(localStorage.getItem('uside-color-count') || '0');
    const currentColorCount = colorOptions.length;
    
    if (hasUserInteracted) {
      setHasInteracted(true);
    }
    
    // Kiểm tra có màu mới không hoặc localStorage bị xóa
    const shouldShowNewColors = 
      // Trường hợp 1: Có màu mới thực sự
      (storedColorCount > 0 && currentColorCount > storedColorCount) ||
      // Trường hợp 2: localStorage bị xóa (storedColorCount = 0) nhưng user đã từng tương tác
      (storedColorCount === 0 && hasUserInteracted) ||
      // Trường hợp 3: localStorage bị xóa hoàn toàn (cả interacted và count)
      (!hasUserInteracted && storedColorCount === 0 && currentColorCount > 0);
    
    if (shouldShowNewColors) {
      setHasNewColors(true);
      
      // Nếu localStorage bị xóa, reset trạng thái tương tác
      if (storedColorCount === 0) {
        setHasInteracted(false);
      }
      
      // Tự động cập nhật màu accent thành màu mới nhất
      const newestColor = colorOptions[colorOptions.length - 1];
      if (newestColor) {
        changeAccentColor(newestColor.color);
        
        // Hiển thị thông báo đã cập nhật màu mới
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
    
    // Cập nhật số lượng màu hiện tại
    localStorage.setItem('uside-color-count', currentColorCount.toString());
  }, [changeAccentColor]);

  const handleColorSelect = (color: string) => {
    changeAccentColor(color);
    setIsPopupOpen(false);
    
    // Đánh dấu user đã tương tác và lưu vào localStorage
    setHasInteracted(true);
    setHasNewColors(false); // Đã xem màu mới rồi
    localStorage.setItem('uside-color-interacted', 'true');
    
    // Hiển thị thông báo thành công
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    
    // Nếu user mở popup lần đầu, cũng đánh dấu đã tương tác
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('uside-color-interacted', 'true');
    }
    
    // Nếu user mở popup khi có màu mới, đánh dấu đã xem
    if (hasNewColors) {
      setHasNewColors(false);
    }
  };

  return (
    <>
      {/* Color Palette Button */}
      <div
        className={`w-12 h-12 cursor-pointer group ${
          !hasInteracted ? 'animate-gentle-bounce' : hasNewColors ? 'animate-smooth-pulse' : ''
        }`}
        onClick={togglePopup}
      >
        <div
          className="w-full h-full relative transition-all duration-300 hover:scale-105 rounded-full p-2"
          style={{
            background: "var(--color-background)",
            boxShadow: isPopupOpen
              ? `-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.25), 0 0 15px ${currentAccentColor}40`
              : !hasInteracted
              ? `-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.15), 0 0 10px ${currentAccentColor}60`
              : hasNewColors
              ? `-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.15), 0 0 15px #ff4da680, 0 0 25px #ff4da640`
              : "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.15)",
          }}
        >
          {/* Color Palette Icon */}
          <div className="w-full h-full rounded-full relative overflow-hidden">
            {/* Color segments */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 p-1">
              {colorOptions.slice(0, 4).map((option, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 group-hover:scale-110 ${
                    !hasInteracted || hasNewColors ? 'animate-smooth-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: option.color,
                    boxShadow: `inset -1px -1px 2px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(0,0,0,0.1)`,
                    animationDelay: !hasInteracted || hasNewColors ? `${index * 0.3}s` : undefined,
                  }}
                />
              ))}
            </div>
            
            {/* Center dot showing current color */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white ${
                !hasInteracted ? 'animate-ping' : hasNewColors ? 'animate-float-bounce' : 'animate-smooth-pulse'
              }`}
              style={{
                backgroundColor: currentAccentColor,
                boxShadow: `0 0 8px ${currentAccentColor}80`,
              }}
            />
          </div>

          {/* NEW Badge khi có màu mới */}
          {hasNewColors && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center animate-float-bounce"
              style={{
                background: 'linear-gradient(45deg, #ff4da6, #ff884d)',
                boxShadow: '0 0 10px #ff4da680, 0 0 20px #ff4da640',
                border: '1px solid white',
              }}
            >
              <span className="text-white text-xs font-bold" style={{ fontSize: '8px' }}>
                NEW
              </span>
            </div>
          )}
        </div>
      </div>

          {/* Color Picker Popup */}
      {isPopupOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-20 z-50"
            onClick={() => setIsPopupOpen(false)}
          />
          
          {/* Popup */}
          <div
            className="fixed xs:top-[170px] lg:top-16 right-4 w-48 z-50"
            style={{
              animation: "popupSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            {/* Arrow */}
            <div
              className="absolute -top-2 right-6 w-4 h-4 transform rotate-45"
              style={{
                background: "var(--color-background)",
                boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                zIndex: 51,
              }}
            />
            
            {/* Main Popup */}
            <div
              className="relative p-3 rounded-xl backdrop-blur-lg"
              style={{
                background: "var(--color-background)",
                boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.2)",
                border: "1px solid rgba(224, 247, 250, 0.2)",
              }}
            >
              {/* Header */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Chọn màu theo cảm xúc
                </h3>
                <p className="text-xs text-gray-500">
                  Thay đổi theo trạng thái tâm trạng của bạn
                </p>
              </div>

              {/* Color Grid with Custom Scrollbar */}
              <div 
                className="max-h-32 overflow-y-auto overflow-x-hidden mb-3"
                style={{
                  /* Custom scrollbar styles */
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${currentAccentColor} transparent`,
                }}
              >
                <style>
                  {`
                    .color-grid::-webkit-scrollbar {
                      width: 6px;
                    }
                    .color-grid::-webkit-scrollbar-track {
                      background: var(--color-background);
                      border-radius: 10px;
                      box-shadow: inset -2px -2px 4px #FAFBFF, inset 2px 2px 4px rgba(22, 17, 29, 0.1);
                    }
                    .color-grid::-webkit-scrollbar-thumb {
                      background: ${currentAccentColor};
                      border-radius: 10px;
                      box-shadow: 0 0 6px ${currentAccentColor}40;
                      transition: all 0.3s ease;
                    }
                    .color-grid::-webkit-scrollbar-thumb:hover {
                      background: ${currentAccentColor};
                      box-shadow: 0 0 10px ${currentAccentColor}60;
                    }
                  `}
                </style>
                <div className="grid grid-cols-3 gap-2 color-grid">
                  {colorOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleColorSelect(option.color)}
                      className="group relative p-2 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{
                        background: "var(--color-background)",
                        boxShadow: currentAccentColor === option.color
                          ? `inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.15), 0 0 10px ${option.color}40`
                          : "-4px -4px 8px #FAFBFF, 4px 4px 8px rgba(22, 17, 29, 0.12)",
                      }}
                    >
                      {/* Color Circle */}
                      <div
                        className="w-6 h-6 rounded-full mx-auto mb-1 transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: option.color,
                          boxShadow: `0 0 8px ${option.color}30, inset -2px -2px 4px rgba(255,255,255,0.3), inset 2px 2px 4px rgba(0,0,0,0.1)`,
                        }}
                      />
                      
                      {/* Color Name */}
                      <div className="text-xs font-medium text-gray-700 text-center leading-tight">
                        {option.name}
                      </div>

                      {/* Selected Indicator */}
                      {currentAccentColor === option.color && (
                        <div
                          className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full animate-pulse"
                          style={{
                            background: option.color,
                            boxShadow: `0 0 6px ${option.color}`,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>              {/* Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: currentAccentColor }}
                  />
                  <span className="text-xs text-gray-500">
                    {colorOptions.find(c => c.color === currentAccentColor)?.name || 'Mặc định'}
                  </span>
                </div>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-xs px-2 py-1 rounded-md transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--color-background)",
                    color: currentAccentColor,
                    boxShadow: "-2px -2px 4px #FAFBFF, 2px 2px 4px rgba(22, 17, 29, 0.1)",
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* New Colors Notification */}
      {hasNewColors && (
        <div
          className="fixed top-20 right-4 z-50 max-w-48 transition-all duration-300"
          style={{
            animation: "popupSlideIn 0.5s ease-out",
          }}
        >
          <div
            className="relative p-3 rounded-xl backdrop-blur-lg"
            style={{
              background: `linear-gradient(135deg, var(--color-background) 0%, ${currentAccentColor}15 100%)`,
              boxShadow: `-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.2), 0 0 20px ${currentAccentColor}30`,
              border: `1px solid ${currentAccentColor}40`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setHasNewColors(false)}
              className="absolute top-1 right-1 w-4 h-4 rounded-full text-gray-400 hover:text-gray-600 text-xs flex items-center justify-center"
            >
              ×
            </button>

            {/* Content */}
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center animate-gentle-bounce"
                  style={{
                    background: `linear-gradient(45deg, ${currentAccentColor}, ${currentAccentColor}CC)`,
                    boxShadow: `0 0 10px ${currentAccentColor}50`,
                  }}
                >
                  <span className="text-white text-xs">🎨</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Trạng thái mới đã áp dụng!
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Website đã tự động chuyển sang cảm xúc mới nhất. Khám phá thêm trạng thái khác?
                </p>
                <button
                  onClick={togglePopup}
                  className="mt-2 text-xs px-2 py-1 rounded-md transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(45deg, ${currentAccentColor}, ${currentAccentColor}DD)`,
                    color: 'white',
                    boxShadow: `0 2px 8px ${currentAccentColor}30`,
                  }}
                >
                  Xem thêm cảm xúc
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full animate-ping opacity-60"
              style={{ backgroundColor: currentAccentColor }}
            />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full animate-pulse opacity-40"
              style={{ backgroundColor: currentAccentColor, animationDelay: '0.5s' }}
            />
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-3 py-2 rounded-lg transition-all duration-300"
          style={{
            background: "var(--color-background)",
            boxShadow: "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.2)",
            border: `1px solid ${currentAccentColor}40`,
            animation: "popupSlideIn 0.3s ease-out",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentAccentColor }}
            />
            <span className="text-xs font-medium text-gray-700">
              {hasNewColors ? '🎨 Đã cập nhật trạng thái mới!' : '✨ Đã đổi cảm xúc!'}
            </span>
          </div>
        </div>
      )}

      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes gentleBounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translateY(0) scale(1);
            }
            40% {
              transform: translateY(-8px) scale(1.05);
            }
            43% {
              transform: translateY(-6px) scale(1.02);
            }
            70% {
              transform: translateY(-2px) scale(1.01);
            }
          }

          @keyframes floatBounce {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            25% {
              transform: translateY(-3px) scale(1.02);
            }
            50% {
              transform: translateY(-6px) scale(1.05);
            }
            75% {
              transform: translateY(-3px) scale(1.02);
            }
          }

          @keyframes smoothPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }

          @keyframes popupSlideIn {
            0% {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            60% {
              opacity: 0.8;
              transform: translateY(2px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-gentle-bounce {
            animation: gentleBounce 3s ease-in-out infinite;
          }

          .animate-float-bounce {
            animation: floatBounce 2.5s ease-in-out infinite;
          }

          .animate-smooth-pulse {
            animation: smoothPulse 2s ease-in-out infinite;
          }
        `}
      </style>
    </>
  );
};

export default ChangeAccentColor;
