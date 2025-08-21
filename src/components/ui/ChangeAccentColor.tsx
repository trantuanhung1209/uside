import { useState } from 'react';
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
    name: 'Cyan',
    description: 'Mặc định'
  },
  {
    key: 'accent1',
    color: ACCENT_COLORS.accent1,
    name: 'Hồng',
    description: 'Nhẹ nhàng'
  },
  {
    key: 'accent2',
    color: ACCENT_COLORS.accent2,
    name: 'Cam',
    description: 'Ấm áp'
  },
  {
    key: 'accent3',
    color: ACCENT_COLORS.accent3,
    name: 'Vàng',
    description: 'Năng lượng'
  },
  {
    key: 'accent4',
    color: ACCENT_COLORS.accent4,
    name: 'Xanh lá',
    description: 'Tươi mới'
  },
  {
    key: 'accent5',
    color: ACCENT_COLORS.accent5,
    name: 'Xanh dương',
    description: 'Dịu dàng'
  }
];

const ChangeAccentColor = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { currentAccentColor, changeAccentColor } = useAccentColor();

  const handleColorSelect = (color: string) => {
    changeAccentColor(color);
    setIsPopupOpen(false);
    
    // Hiển thị thông báo thành công
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {/* Color Palette Button */}
      <div
        className="fixed top-4 right-4 w-12 h-12 cursor-pointer z-10 group"
        onClick={togglePopup}
      >
        <div
          className="w-full h-full relative transition-all duration-300 hover:scale-105 rounded-full p-2"
          style={{
            background: "var(--color-background)",
            boxShadow: isPopupOpen
              ? `-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.25), 0 0 15px ${currentAccentColor}40`
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
                  className="rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: option.color,
                    boxShadow: `inset -1px -1px 2px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(0,0,0,0.1)`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Center dot showing current color */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse border border-white"
              style={{
                backgroundColor: currentAccentColor,
                boxShadow: `0 0 8px ${currentAccentColor}80`,
              }}
            />
          </div>

          {/* Tooltip */}
          <div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            style={{ fontSize: '10px' }}
          >
            Đổi màu
          </div>
        </div>
      </div>

      {/* Color Picker Popup */}
      {isPopupOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-20 z-40"
            onClick={() => setIsPopupOpen(false)}
          />
          
          {/* Popup */}
          <div
            className="fixed top-16 right-4 w-48 z-50"
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
              className="relative p-4 rounded-xl backdrop-blur-lg"
              style={{
                background: "var(--color-background)",
                boxShadow: "-12px -12px 24px #FAFBFF, 12px 12px 24px rgba(22, 17, 29, 0.2)",
                border: "1px solid rgba(224, 247, 250, 0.2)",
              }}
            >
              {/* Header */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Chọn màu accent
                </h3>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
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

              {/* Footer */}
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
              Đã đổi màu!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeAccentColor;
