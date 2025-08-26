import { useState, useEffect, useCallback, useRef } from 'react';
import '../../../styles/extensions.css';

interface FoodSuggestion {
  time: string;
  meal: string;
  dishes: string[];
}

// Dữ liệu gợi ý món ăn Việt Nam theo thời gian
const foodSuggestions: FoodSuggestion[] = [
  {
    time: "06:00-10:00",
    meal: "Sáng",
    dishes: [
      "Phở bò", 
      "Bánh mì", 
      "Bún bò Huế", 
      "Cháo gà", 
      "Bánh cuốn",
      "Xôi xéo",
      "Hủ tiếu",
      "Bánh mì chảo",
      "Cháo sườn",
      "Bánh bao"
    ]
  },
  {
    time: "11:00-13:00", 
    meal: "Trưa",
    dishes: [
      "Cơm tấm", 
      "Bún chả", 
      "Mì Quảng", 
      "Cơm gà", 
      "Bánh xèo",
      "Bún bò Nam Bộ",
      "Cơm sườn",
      "Bánh mì thịt nướng",
      "Bún thịt nướng",
      "Cơm chiên dương châu"
    ]
  },
  {
    time: "14:00-17:00",
    meal: "Chiều",
    dishes: [
      "Chè", 
      "Bánh flan", 
      "Sinh tố", 
      "Bánh tráng nướng", 
      "Chả cá",
      "Bánh tráng trộn",
      "Kem flan",
      "Chè bưởi",
      "Bánh mì que",
      "Nước mía"
    ]
  },
  {
    time: "18:00-22:00",
    meal: "Tối", 
    dishes: [
      "Lẩu", 
      "Bún riêu", 
      "Cơm niệu chay", 
      "Bánh canh", 
      "Gỏi cuốn",
      "Bún bò Huế",
      "Cơm gà Hải Nam",
      "Bánh xèo miền Tây",
      "Mì Quảng đặc biệt",
      "Lẩu thái"
    ]
  },
  {
    time: "23:00-05:00",
    meal: "Đêm",
    dishes: [
      "Mì tôm", 
      "Cháo trắng", 
      "Bánh mì nướng", 
      "Phở tái", 
      "Chè đậu xanh",
      "Cháo lòng",
      "Bún riêu cua",
      "Bánh mì pate",
      "Mì gói trứng",
      "Chè ba màu"
    ]
  }
];

const Extensions = () => {
  const [currentSuggestion, setCurrentSuggestion] = useState<FoodSuggestion | null>(null);
  const [showAppsPopup, setShowAppsPopup] = useState(false);
  const [showFoodSuggestion, setShowFoodSuggestion] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const foodPopupRef = useRef<HTMLDivElement>(null);

  // Hàm lấy gợi ý món ăn theo thời gian hiện tại
  const getCurrentFoodSuggestion = useCallback((): FoodSuggestion => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 6 && hour < 11) {
      return foodSuggestions[0]; // Sáng
    } else if (hour >= 11 && hour < 14) {
      return foodSuggestions[1]; // Trưa
    } else if (hour >= 14 && hour < 18) {
      return foodSuggestions[2]; // Chiều
    } else if (hour >= 18 && hour < 23) {
      return foodSuggestions[3]; // Tối
    } else {
      return foodSuggestions[4]; // Đêm (23:00-05:59)
    }
  }, []);

  // Cập nhật gợi ý món ăn khi component mount
  useEffect(() => {
    setCurrentSuggestion(getCurrentFoodSuggestion());
    
    // Cập nhật mỗi phút để đảm bảo gợi ý luôn chính xác
    const interval = setInterval(() => {
      setCurrentSuggestion(getCurrentFoodSuggestion());
    }, 60000);

    return () => clearInterval(interval);
  }, [getCurrentFoodSuggestion]);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowAppsPopup(false);
      }
      if (foodPopupRef.current && !foodPopupRef.current.contains(event.target as Node)) {
        setShowFoodSuggestion(false);
      }
    };

    if (showAppsPopup || showFoodSuggestion) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAppsPopup, showFoodSuggestion]);

  return (
    <>
      <div className="inner-extentions">
        {/* Phần gợi ý món ăn bên trái */}
        <div className="inner-left relative">
          <button
            onClick={() => setShowFoodSuggestion(!showFoodSuggestion)}
            className="w-full rounded-2xl transition-all duration-300 animate-bounce-gentle"
            title="Gợi ý món ăn theo thời gian"
          >
            <div className="flex items-center gap-4 cursor-pointer">
              <span className="text-3xl filter drop-shadow-lg">🍜</span>
              <div className="text-left">
                <h3 className="text-sm xl:text-xl font-bold text-text-secondary mb-1">
                  {currentSuggestion?.meal} nay ăn gì?
                </h3>
                {currentSuggestion && (
                  <p 
                    className="text-sm font-medium px-3 py-1 rounded-full inline-block"
                    style={{
                      background: 'var(--color-accent)',
                      color: 'white'
                    }}
                  >({currentSuggestion.time})
                  </p>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Popup gợi ý món ăn ở trên màn hình */}
      {showFoodSuggestion && currentSuggestion && (
        <div 
          className="fixed inset-0 flex items-start justify-center z-[9999] p-4 pt-20"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)"
          }}
        >
          <div
            ref={foodPopupRef}
            className="food-suggestion-popup max-w-lg w-full mx-auto transform transition-all duration-300 scale-100 animate-popup-in p-4 xl:p-8 rounded-3xl max-h-[80vh] overflow-hidden flex flex-col"
            style={{
              background: 'var(--color-background)',
              boxShadow: `
                -20px -20px 40px #FAFBFF,
                20px 20px 40px rgba(22, 17, 29, 0.25)
              `,
              border: '1px solid var(--color-border)'
            }}
          >
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <span className="text-4xl filter drop-shadow-lg">🍜</span>
                <div>
                  <h3 className="text-base xl:text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Gợi ý món ăn cho bữa {currentSuggestion.meal}
                  </h3>
                  <span 
                    className="text-sm px-4 py-2 rounded-full inline-block font-medium"
                    style={{
                      background: 'var(--color-accent)',
                      color: 'white'
                    }}
                  >
                    {currentSuggestion.meal} ({currentSuggestion.time})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowFoodSuggestion(false)}
                className="cursor-pointertext-2xl font-bold p-2 rounded-xl transition-all duration-300 flex-shrink-0 cursor-pointer"
                style={{
                  color: 'var(--color-text-secondary)',
                  background: 'var(--color-background)',
                  boxShadow: `
                    -6px -6px 12px #FAFBFF,
                    6px 6px 12px rgba(22, 17, 29, 0.15)
                  `,
                  border: '1px solid var(--color-border)'
                }}
              >
                ×
              </button>
            </div>
            
            <div 
              className="space-y-3 overflow-y-auto flex-1 pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--color-accent) transparent'
              }}
            >
              {currentSuggestion.dishes.map((dish, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-2 xl:p-4 rounded-2xl transition-all duration-300 cursor-pointer group"
                  style={{
                    background: 'var(--color-background)',
                    boxShadow: `
                      -8px -8px 16px #FAFBFF,
                      8px 8px 16px rgba(22, 17, 29, 0.1)
                    `,
                    border: '1px solid var(--color-border)'
                  }}
                  onClick={() => {
                    const searchQuery = encodeURIComponent(`${dish} cách làm công thức`);
                    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                  }}
                >
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0"
                    style={{
                      background: 'var(--color-accent)',
                      color: 'white'
                    }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xl group-hover:scale-110 transition-transform">🥢</span>
                  <span 
                    className="font-medium group-hover:scale-105 transition-transform flex-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {dish}
                  </span>
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      🔍
                    </span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      Tìm công thức
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center flex-shrink-0">
              <p 
                className="text-base font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Chúc bạn có bữa {currentSuggestion.meal.toLowerCase()} ngon miệng! 😊
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Extensions;
