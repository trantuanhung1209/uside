import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const [randomSuggestions, setRandomSuggestions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );
  const [newsSuggestions, setNewsSuggestions] = useState<
    { id: number; title: string }[]
  >([]); 
  const navigate = useNavigate();
  const location = useLocation();
  const popupRef = useRef<HTMLDivElement>(null);

  // Danh sách món ăn và đồ uống
  const foodItems = useMemo(
    () => [
      "Phở bò Hà Nội 🍜",
      "Bún chả Hà Nội 🍢",
      "Bún bò Huế cay cay 🌶️",
      "Pizza phô mai tan chảy 🍕",
      "Sushi cá hồi tươi 🍣",
      "Tokbokki bánh gạo cay 🔥",
      "Pad Thái chua ngọt 🍤",
      "Hamburger bò Mỹ 🍔",
      "Dimsum Trung Hoa 🥢",
      "Croissant bơ thơm 🥐",
    ],
    []
  );

  const news = [
    { id: 1, title: "USide ra mắt phiên bản 2.0" },
    { id: 2, title: "Cập nhật bảo mật quan trọng" },
    { id: 3, title: "Hợp tác với các đối tác công nghệ" },
    { id: 4, title: "Tuyển dụng Frontend Developer" },
    { id: 5, title: "Ứng dụng AI trong phát triển sản phẩm" },
    { id: 6, title: "USide Tech Conference 2025" },
  ];

  const plugins: { id: number; name: string; description: string; link: string }[] = [
    {
      id: 1,
      name: "Tin tức",
      description: "Mô tả plugin 1",
      link: "tin-tuc",
    },
    {
      id: 2,
      name: "Ăn gì?",
      description: "Mô tả plugin 2",
      link: "an-gi",
    },
    {
      id: 3,
      name: "Giải trí",
      description: "Mô tả plugin 3",
      link: "giai-tri",
    },
  ];

  // Click outside → close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Save search history
  const handleSearch = () => {
    if (!searchValue.trim()) return;
    const newHistory = [
      searchValue,
      ...searchHistory.filter((h) => h !== searchValue),
    ].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchValue)}`,
      "_blank"
    );
    setShowPopup(false);
  };

  // Random gợi ý function
  const randomizeFood = useCallback(() => {
    const shuffled = [...foodItems].sort(() => Math.random() - 0.5);
    setRandomSuggestions(shuffled.slice(0, 5));
    setShowFoodSuggestions(true);
  }, [foodItems]);

  // Random khi load + auto 15s random lại, chỉ khi ở trang home
  useEffect(() => {
    if (location.pathname === "/") {
      randomizeFood();
      const interval = setInterval(randomizeFood, 15000); // mỗi 15s
      return () => clearInterval(interval);
    }
    return undefined;
  }, [location.pathname, randomizeFood]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm flex items-center gap-2">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          const value = e.target.value;
          setSearchValue(value);
          // Suggestion cho news
          if (value.trim().length > 0) {
            const filtered = news.filter((n) =>
              n.title.toLowerCase().includes(value.toLowerCase())
            );
            setNewsSuggestions(
              filtered.map((n) => ({ id: n.id, title: n.title })).slice(0, 5)
            );
          } else {
            setNewsSuggestions([]);
          }
        }}
        onFocus={() => {
          setShowPopup(true);
          if (location.pathname === "/") {
            randomizeFood();
          }
        }}
        placeholder={
          location.pathname === "/" ? "Hôm nay ăn gì?" : "Tìm kiếm..."
        }
        className="search-input w-full px-5 py-3 bg-transparent rounded-xl focus:outline-none transition-all duration-300"
        style={{
          color: "var(--color-text-primary)",
          boxShadow:
            "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)",
        }}
      />

      {/* Icon search */}
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, var(--color-text-accent) 100%)",
        }}
        onClick={handleSearch}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Suggestions food chỉ hiện ở trang home */}
      {location.pathname === "/" &&
        showFoodSuggestions &&
        randomSuggestions.length > 0 && (
          <ul className="absolute left-[20px] top-[-75px] mt-2 w-full z-40 p-2 flex flex-col gap-2">
            {randomSuggestions.slice(0, 1).map((item) => (
              <li
                key={item}
                className="px-4 py-2 rounded-xl cursor-pointer font-semibold text-text-primary hover:text-accent"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(
                      item
                    )}`,
                    "_blank"
                  )
                }
              >
                {item}
              </li>
            ))}
            <div className="inner-circle flex items-center justify-center absolute top-10 left-[-40px] xs:left-[-6%]">
              {/* Thought bubbles với neumorphic style */}
              <div className="relative">
                {/* Bubble lớn nhất - gần blockquote nhất */}
                <div className="absolute bottom-[-15px] left-[20px] w-4 h-4 section-neumorphic rounded-full border-gray-200 shadow-sm animate-float-slow"></div>

                {/* Bubble trung bình */}
                <div className="absolute bottom-[-30px] left-[15px] w-3 h-3 section-neumorphic rounded-full border-gray-200 shadow-sm animate-float-medium delay-300"></div>

                {/* Bubble nhỏ nhất */}
                <div className="absolute bottom-[-40px] left-[12px] w-2 h-2 section-neumorphic rounded-full border-gray-200 shadow-sm animate-float-fast delay-700"></div>
              </div>
            </div>
          </ul>
        )}

      {/* Popup Search */}
      {showPopup && (
        <div
          ref={popupRef}
          className="absolute left-[-50px] top-[120%] mt-2 w-[320px] sm:w-[380px] z-50 section-neumorphic rounded-2xl shadow-lg p-4 flex flex-col gap-4"
        >
          {/* Plugins */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Plugin</h4>
            <div className="flex gap-2 flex-wrap">
              {plugins.map(
                (plugin) => (
                  <button
                    key={plugin.id}
                    className="px-3 cursor-pointer py-2 rounded-xl bg-accent/10 text-accent font-medium text-sm hover:bg-accent hover:text-white transition"
                    onClick={() => {
                      setShowPopup(false);
                      navigate(`/${plugin.link}`);
                    }}
                  >
                    {plugin.name}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Lịch sử search */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Lịch sử tìm kiếm</h4>
            <ul className="flex flex-col gap-2">
              {searchHistory
                .slice(-5)
                .reverse()
                .map((item, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 rounded-xl cursor-pointer text-sm text-text-secondary hover:bg-accent hover:text-white transition"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchValue(item);
                      setShowPopup(false);
                      navigate(`/search?q=${encodeURIComponent(item)}`);
                    }}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>

          {/* Nếu có newsSuggestions thì hiển thị */}
          {newsSuggestions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Tin tức liên quan</h4>
              <ul className="flex flex-col gap-2">
                {newsSuggestions.map((item) => (
                  <li
                    key={item.id}
                    className="px-3 py-2 rounded-xl cursor-pointer text-sm text-text-secondary hover:bg-accent hover:text-white transition"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setNewsSuggestions([]);
                      navigate(`/tin-tuc/${item.id}`);
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
