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
      {/* Robot Button */}
      <div
        className="absolute top-[11%] left-[90%] w-20 h-28 cursor-pointer z-1"
        style={{
          animation: "float 4s ease-in-out infinite",
          animationDelay: "1s",
        }}
        onClick={togglePopup}
      >
        <div
          className="2xl:w-full 2xl:h-full w-10 h-10 relative transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--color-background)",
            boxShadow: isPopupOpen
              ? `-15px -15px 30px #FAFBFF, 15px 15px 30px rgba(22, 17, 29, 0.25), 0 0 25px ${currentAccentColor}`
              : "-10px -10px 20px #FAFBFF, 10px 10px 20px rgba(22, 17, 29, 0.18)",
            borderRadius: "16px",
          }}
        >
          {/* Robot Head */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 2xl:w-14 2xl:h-14 w-10 h-10 rounded-xl transition-all duration-300"
            style={{
              background: currentAccentColor,
              boxShadow:
                "inset -6px -6px 12px rgba(255,255,255,0.3), inset 6px 6px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Visor */}
            <div
              className="absolute top-2 left-2 right-2 h-4 rounded-lg animate-pulse"
              style={{
                background: `linear-gradient(90deg, ${currentAccentColor}, #3aefc4)`,
                animationDuration: "2s",
              }}
            ></div>
            
            {/* Indicator dots showing current color */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div
                className="w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: currentAccentColor,
                  filter: 'brightness(1.5)',
                  animationDelay: '0.5s'
                }}
              />
              <div
                className="w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: currentAccentColor,
                  filter: 'brightness(1.3)',
                  animationDelay: '1s'
                }}
              />
            </div>
          </div>

          {/* Body with chest display */}
          <div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 2xl:w-16 2xl:h-14 w-12 h-12 rounded-lg"
            style={{
              background: "var(--color-primary)",
              boxShadow:
                "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px rgba(22, 17, 29, 0.1)",
            }}
          >
            {/* Color Palette Screen */}
            <div className="absolute top-1 left-1 right-1 bottom-1 rounded-md bg-black flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1">
                {colorOptions.slice(0, 6).map((option, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: option.color,
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Hover Effect Glow */}
          {isPopupOpen && (
            <div
              className="absolute inset-0 rounded-2xl animate-pulse"
              style={{
                background: `radial-gradient(circle, ${currentAccentColor}15 0%, transparent 70%)`,
                filter: 'blur(10px)',
                zIndex: -1,
              }}
            />
          )}
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
            className="absolute top-36 right-24 w-80 z-50"
            style={{
              animation: "popupSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            {/* Arrow */}
            <div
              className="absolute top-4 right-8 w-4 h-4 transform rotate-45"
              style={{
                background: "var(--color-background)",
                boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                zIndex: 51,
              }}
            />
            
            {/* Main Popup */}
            <div
              className="relative p-6 rounded-2xl backdrop-blur-lg"
              style={{
                background: "var(--color-background)",
                boxShadow: "-15px -15px 30px #FAFBFF, 15px 15px 30px rgba(22, 17, 29, 0.25)",
                border: "1px solid rgba(224, 247, 250, 0.2)",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Chọn màu accent
                </h3>
                <p className="text-sm text-gray-600">
                  Thay đổi màu chủ đạo của website
                </p>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {colorOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleColorSelect(option.color)}
                    className="group relative p-3 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: "var(--color-background)",
                      boxShadow: currentAccentColor === option.color
                        ? `inset -6px -6px 12px #FAFBFF, inset 6px 6px 12px rgba(22, 17, 29, 0.15), 0 0 15px ${option.color}50`
                        : "-6px -6px 12px #FAFBFF, 6px 6px 12px rgba(22, 17, 29, 0.15)",
                    }}
                  >
                    {/* Color Circle */}
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-2 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: option.color,
                        boxShadow: `0 0 15px ${option.color}50, inset -2px -2px 4px rgba(255,255,255,0.3), inset 2px 2px 4px rgba(0,0,0,0.1)`,
                      }}
                    />
                    
                    {/* Color Name */}
                    <div className="text-xs font-medium text-gray-700 text-center">
                      {option.name}
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      {option.description}
                    </div>

                    {/* Selected Indicator */}
                    {currentAccentColor === option.color && (
                      <div
                        className="absolute top-1 right-1 w-3 h-3 rounded-full animate-pulse"
                        style={{
                          background: option.color,
                          boxShadow: `0 0 8px ${option.color}`,
                        }}
                      />
                    )}

                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${option.color}15 0%, transparent 70%)`,
                        filter: 'blur(5px)',
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: currentAccentColor }}
                    />
                    <span className="text-xs text-gray-500">
                      {colorOptions.find(c => c.color === currentAccentColor)?.name || 'Tùy chỉnh'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        changeAccentColor(ACCENT_COLORS.default);
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 2000);
                      }}
                      className="text-xs px-2 py-1 rounded-md transition-all duration-300 hover:scale-105"
                      style={{
                        background: "var(--color-background)",
                        color: "var(--color-text-secondary)",
                        boxShadow: "-2px -2px 4px #FAFBFF, 2px 2px 4px rgba(22, 17, 29, 0.1)",
                      }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      className="text-xs px-3 py-1 rounded-md transition-all duration-300 hover:scale-105"
                      style={{
                        background: "var(--color-background)",
                        color: currentAccentColor,
                        boxShadow: "-3px -3px 6px #FAFBFF, 3px 3px 6px rgba(22, 17, 29, 0.15)",
                      }}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full animate-pulse opacity-60"
                style={{ backgroundColor: currentAccentColor }}
              />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full animate-pulse opacity-40"
                style={{ backgroundColor: currentAccentColor, animationDelay: '0.5s' }}
              />
            </div>
          </div>
        </>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg transition-all duration-300"
          style={{
            background: "var(--color-background)",
            boxShadow: "-8px -8px 16px #FAFBFF, 8px 8px 16px rgba(22, 17, 29, 0.25)",
            border: `1px solid ${currentAccentColor}`,
            animation: "popupSlideIn 0.3s ease-out",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: currentAccentColor }}
            />
            <span className="text-sm font-medium text-gray-700">
              Đã thay đổi màu thành công!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeAccentColor;
