import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRealtimeNews } from "../../../hooks";

const SearchInput = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );
  const [newsSuggestions, setNewsSuggestions] = useState<
    { id: number; title: string }[]
  >([]);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  // Use realtime news hook instead of static data
  const { news: newsData, loading: newsLoading, error: newsError } = useRealtimeNews();

  const plugins: {
    id: number;
    name: string;
    description: string;
    link: string;
  }[] = [
    {
      id: 1,
      name: "Tin tức",
      description: "Mô tả plugin 1",
      link: "news",
    },
    {
      id: 2,
      name: "Ăn gì?",
      description: "Mô tả plugin 2",
      link: "dishes",
    },
    {
      id: 3,
      name: "Giải trí",
      description: "Mô tả plugin 3",
      link: "entertainment",
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
    {/* mini game */}

    // window.open(
    //   `https://www.google.com/search?q=${encodeURIComponent(searchValue)}`,
    //   "_blank"
    // );
    navigate(`/search?q=${searchValue}`);
    setShowPopup(false);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm flex items-center gap-2">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          const value = e.target.value;
          setSearchValue(value);
          // Suggestion cho news từ realtime data
          if (value.trim().length > 0) {
            const filtered = newsData.filter((n) =>
              n.title.toLowerCase().includes(value.toLowerCase())
            );
            setNewsSuggestions(
              filtered.map((n) => ({ id: n.id, title: n.title })).slice(0, 5)
            );
          } else {
            setNewsSuggestions([]);
          }
        }}
        onFocus={() => setShowPopup(true)}
        onClick={() => setShowPopup(true)}
        placeholder={"Tìm kiếm..."}
        className="search-input w-full px-5 xs:py-1 lg:py-2 xs:text-base bg-transparent rounded-xl focus:outline-none transition-all duration-300"
        style={{
          color: "var(--color-text-primary)",
          boxShadow:
            "inset -4px -4px 8px #FAFBFF, inset 4px 4px 8px var(--color-shadow)",
        }}
      />

      {/* Icon search */}
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 lg:w-10 lg:h-10 w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, var(--color-text-accent) 100%)",
        }}
        onClick={() => {
          if (searchValue.trim()) {
            handleSearch();
          } else {
            setShowPopup(true);
          }
        }}
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

      {/* Popup Search */}
      {showPopup && (
        <div
          ref={popupRef}
          className="absolute left-0 lg:left-[-50px] top-[120%] mt-2 w-[280px] lg:w-[380px] z-50 section-neumorphic rounded-2xl shadow-lg p-4 flex flex-col gap-4"
        >
          {/* Plugins */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Plugin</h4>
            <div className="flex gap-2 flex-wrap">
              {plugins.map((plugin) => (
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
              ))}
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
                      setShowPopup(false);
                      navigate(`/news/${item.id}`);
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Loading state cho news suggestions */}
          {newsLoading && searchValue.trim().length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Tin tức liên quan</h4>
              <div className="px-3 py-2 text-sm text-text-secondary">
                Đang tải tin tức...
              </div>
            </div>
          )}

          {/* Error state cho news */}
          {newsError && searchValue.trim().length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Tin tức liên quan</h4>
              <div className="px-3 py-2 text-sm text-red-500">
                Không thể tải tin tức: {newsError}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
