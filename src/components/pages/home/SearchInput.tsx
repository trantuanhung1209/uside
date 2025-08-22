import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [randomSuggestions, setRandomSuggestions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [newsSuggestions, setNewsSuggestions] = useState<{id: number, title: string}[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Danh sách món ăn và đồ uống
  const foodItems = [
    // Món Việt Nam
    "Phở bò Hà Nội 🍜",
    "Phở gà nóng hổi 🍲",
    "Bún chả Hà Nội 🍢",
    "Bún bò Huế cay cay 🌶️",
    "Cơm tấm sườn bì chả 🍖",
    "Bánh mì thịt Việt 🥖",
    "Bánh cuốn nóng hổi 🥟",
    "Chả cá Lã Vọng 🐟",
    "Bún riêu cua đồng 🦀",
    "Miến lươn giòn giòn 🐍",
    "Bánh đa cua Hải Phòng 🍜",
    "Nem rán Hà Nội 🥢",
    "Bún đậu mắm tôm 😋",
    "Bánh xèo miền Tây 🥞",
    "Gỏi cuốn tôm thịt 🥗",
    "Cao lầu Hội An 🍜",
    "Mì Quảng đậm vị 🌾",
    "Hủ tiếu Nam Vang 🍲",
    "Bánh canh cua 🦀",
    "Cháo lòng nóng hổi 🍵",
    "Cơm hến Huế 🥄",
    "Bánh bèo chấm nước mắm 🥟",
    "Bánh bột lọc dẻo dẻo 🍘",
    "Bánh ít lá gai 🌿",
    "Bánh chưng xanh Tết 🎋",
    "Bánh tét miền Nam 🎍",
    "Chè ba màu ngọt mát 🍧",
    "Bánh flan béo béo 🍮",
    "Xôi xéo hành phi 🍚",
    "Xôi gấc đỏ may mắn 🍊",
    "Nem nướng Nha Trang 🍢",
    "Chả giò giòn rụm 🥠",
    "Gà nướng lá chanh 🍗",
    "Tôm chua Huế 🦐",
    "Bánh khọt Vũng Tàu 🥞",
    "Bánh căn Ninh Thuận 🥟",
    "Bánh tráng nướng Đà Lạt 🍕",
    "Cơm gà Hội An 🍗",
    "Cơm gà Hải Nam 🐔",
    "Lẩu cá kèo nóng hổi 🍲",
    "Lẩu mắm miền Tây 🌶️",
    "Ốc len xào dừa 🐚🥥",
    "Cá kho tộ ngon cơm 🐟",
    "Thịt kho tàu béo mềm 🍖",
    "Bún mắm đậm vị miền Tây 🍜",
    "Bún cá Nha Trang 🐟",
    "Canh chua cá lóc 🍋🐟",
    "Cháo gà xé 🐔",
    "Mì hoành thánh nước 🥟🍜",

    // Món quốc tế
    "Pizza phô mai tan chảy 🍕",
    "Spaghetti Carbonara 🍝",
    "Hamburger bò Mỹ 🍔",
    "Fish and Chips giòn tan 🐟🍟",
    "Beef Steak mọng nước 🥩",
    "Grilled Salmon cháy cạnh 🐟",
    "Caesar Salad xanh mát 🥗",
    "Lasagna Ý béo ngậy 🧀",
    "Chicken Nuggets giòn vui 🐔",
    "Hotdog xúc xích Mỹ 🌭",
    "Sushi cá hồi tươi 🍣",
    "Tempura tôm giòn 🦐",
    "Ramen Nhật nóng hổi 🍜",
    "Takoyaki bạch tuộc 🐙",
    "Udon Nhật bản 🍲",
    "Okonomiyaki pancake Nhật 🥞",
    "Cơm cà ri Nhật 🍛",
    "Kimchi Hàn chua cay 🌶️",
    "Bibimbap cơm trộn Hàn 🍲",
    "Kimbap cuộn rong biển 🍙",
    "Tokbokki bánh gạo cay 🔥",
    "Fried Chicken Hàn giòn 🍗",
    "Lẩu kimchi Hàn Quốc 🍲",
    "Mandu há cảo Hàn 🥟",
    "Samgyeopsal thịt nướng 🥓",
    "Gimbap trứng cuộn 🍳",
    "Dimsum Trung Hoa 🥢",
    "Há cảo tôm dimsum 🦐",
    "Xiao Long Bao nước lèo 🥟",
    "Cơm chiên Dương Châu 🍚",
    "Vịt quay Bắc Kinh 🦆",
    "Hoành thánh chiên giòn 🥟",
    "Chow Mein mì xào Trung 🍜",
    "Mapo Tofu Tứ Xuyên 🌶️",
    "Kung Pao Chicken gà Tứ Xuyên 🐔",
    "Sườn xào chua ngọt 🍖",
    "Gà xào hạt điều 🥜🐔",
    "Pad Thái chua ngọt 🍤",
    "Tom Yum Thái cay nồng 🍲",
    "Green Curry Thái xanh 🌿",
    "Satay xiên nướng 🥓",
    "Bánh bao Thái ngọt 🥮",
    "Bánh crepe Pháp 🇫🇷🍰",
    "Croissant bơ thơm 🥐",
    "Macaron ngọt ngào 🍬",
    "Paella hải sản Tây Ban Nha 🦑",
    "Burrito Mexico 🌯",
    "Tacos bò Mexico 🌮",
    "Quesadilla phô mai 🧀",
    "Churros ngọt ngào 🍩",
    "Falafel Trung Đông 🧆",
    "Shawarma cuốn thịt 🥙",
    "Couscous Bắc Phi 🍲",

    // Đồ uống Việt Nam
    "Trà đá vỉa hè 🧊🍵",
    "Cà phê sữa đá Việt Nam ☕🧊",
    "Cà phê đen đá ☕❄️",
    "Nước mía ngọt lịm 🍹",
    "Nước dừa tươi 🥥",
    "Sữa đậu nành ấm nóng 🥛",
    "Sữa bắp thơm ngọt 🌽🥤",
    "Trà chanh Hà Nội 🍋🍵",
    "Trà đào cam sả 🍑🍊",
    "Sinh tố xoài 🥭🍹",
    "Sinh tố bơ 🥑🥤",
    "Sinh tố dâu 🍓🥛",
    "Nước ép cam 🍊🥤",
    "Nước ép dưa hấu 🍉🍹",
    "Nước ép ổi 🍐🥤",
    "Nước ép táo 🍏🍎",
    "Sâm bí đao mát lạnh 🍵🧊",
    "Trà sữa trân châu 🧋",
    "Sữa tươi trân châu đường đen 🥛🧋",
    "Trà gừng mật ong 🍯🍵",
    "Trà sen vàng 🌸🍵",
    "Trà ô long thanh mát 🍵",
    "Trà xanh matcha đá xay 🍵🧊",
    "Yaourt đá mát lạnh 🍦🥤",
    "Chè đậu xanh đánh 🫘🍵",

    // Đồ uống quốc tế
    "Cappuccino Ý ☕🍶",
    "Espresso Ý ☕",
    "Latte Macchiato ☕🥛",
    "Mocha Chocolate ☕🍫",
    "Americano ☕🧊",
    "Irish Coffee ☘️☕",
    "Matcha Latte 🍵🥛",
    "Chocolate nóng 🍫☕",
    "Milkshake dâu 🍓🥤",
    "Milkshake socola 🍫🥛",
    "Smoothie blueberry 🫐🍹",
    "Smoothie kiwi 🥝🍹",
    "Lemonade đá chanh tươi 🍋🥤",
    "Mojito bạc hà 🍃🍸",
    "Pina Colada dứa dừa 🍍🥥",
    "Margarita Mexico 🍸",
    "Sangria Tây Ban Nha 🍷🍇",
    "Rượu vang đỏ 🍷",
    "Rượu vang trắng 🍷🥂",
    "Champagne sủi tăm 🥂✨",
    "Bia tươi 🍺",
    "Bia thủ công 🍻",
    "Cocktail Blue Lagoon 🌊🍸",
    "Cocktail Tequila Sunrise 🌅🍹",
    "Whiskey on the rocks 🥃🧊",
    "Gin Tonic 🍸🍋",
    "Vodka chanh muối 🍋🥃",
  ];

  const news = [
    {
      id: 1,
      title: "USide ra mắt phiên bản 2.0",
      date: "7 tháng 8, 2025",
      excerpt:
        "Phiên bản mới với nhiều tính năng cải tiến và giao diện được thiết kế lại hoàn toàn.",
      category: "update",
      image: "/images_uside/news.png",
      author: "Đội ngũ USide",
      tags: ["UI/UX", "Performance", "Features"],
    },
    {
      id: 2,
      title: "Cập nhật bảo mật quan trọng",
      date: "5 tháng 8, 2025",
      excerpt:
        "Chúng tôi đã cập nhật các biện pháp bảo mật mới nhất để bảo vệ dữ liệu người dùng.",
      category: "security",
      image: "/images_uside/mascot_robot.png",
      author: "Team Security",
      tags: ["Security", "Privacy", "Protection"],
    },
    {
      id: 3,
      title: "Hợp tác với các đối tác công nghệ",
      date: "1 tháng 8, 2025",
      excerpt:
        "USide chính thức hợp tác với các công ty công nghệ hàng đầu để mở rộng dịch vụ.",
      category: "partnership",
      image: "/images_uside/uside_light.png",
      author: "Ban lãnh đạo",
      tags: ["Partnership", "Expansion", "Growth"],
    },
    {
      id: 4,
      title: "Tuyển dụng Frontend Developer",
      date: "15 tháng 8, 2025",
      excerpt:
        "USide đang tìm kiếm Frontend Developer tài năng để gia nhập đội ngũ phát triển.",
      category: "recruitment",
      image: "/images_uside/pet_cloud_uside.png",
      author: "HR Team",
      tags: ["React", "TypeScript", "Career"],
    },
    {
      id: 5,
      title: "Ứng dụng AI trong phát triển sản phẩm",
      date: "12 tháng 8, 2025",
      excerpt:
        "Khám phá cách USide tích hợp AI để cải thiện trải nghiệm người dùng.",
      category: "technology",
      image: "/images_uside/Coin-unscreen.gif",
      author: "AI Team",
      tags: ["AI", "Machine Learning", "Innovation"],
    },
    {
      id: 6,
      title: "USide Tech Conference 2025",
      date: "10 tháng 8, 2025",
      excerpt:
        "Sự kiện công nghệ lớn nhất năm với những chuyên gia hàng đầu trong ngành.",
      category: "event",
      image: "/images_uside/hero-unscreen.gif",
      author: "Event Team",
      tags: ["Conference", "Networking", "Learning"],
    },
  ];

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
            const filtered = news.filter(n => n.title.toLowerCase().includes(value.toLowerCase()));
            setNewsSuggestions(filtered.map(n => ({id: n.id, title: n.title})).slice(0, 5));
            setShowSuggestions(false);
          } else {
            setNewsSuggestions([]);
            setShowSuggestions(false);
          }
        }}
        onFocus={() => {
          // Random 5 món ăn khi focus
          const shuffled = [...foodItems].sort(() => Math.random() - 0.5);
          setRandomSuggestions(shuffled.slice(0, 5));
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => {
          setShowSuggestions(false);
          setNewsSuggestions([]);
        }, 150)}
        placeholder={location.pathname === '/' ? "Hôm nay ăn gì?" : "Tìm kiếm..."}
        className="search-input w-full px-5 py-3 bg-transparent rounded-xl focus:outline-none transition-all duration-300"
        style={{
          color: "var(--color-text-primary)",
          boxShadow:
            "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)",
        }}
      />

      {/* Icon search */}
      <div
        className="search-icon-wrapper absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg group-hover:shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, var(--color-text-accent) 100%)",
        }}
        onClick={() => {
          if (searchValue.trim()) {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                searchValue
              )}`,
              "_blank"
            );
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

      {/* Suggestions food chỉ hiện ở trang home */}
      {location.pathname === '/' && showSuggestions && randomSuggestions.length > 0 && (
        <ul className="absolute left-[20px] top-[-75px] mt-2 w-full z-100 p-2 flex flex-col gap-2">
          {randomSuggestions.slice(0, 1).map((item) => (
            <li
              key={item}
              className="px-4 py-2 rounded-xl cursor-pointer xs:text-sm lg:text-base font-semibold text-text-primary hover:text-accent"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(item)}`,
                  "_blank"
                );
                setShowSuggestions(false);
              }}
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

      {/* Suggestions news */}
      {newsSuggestions.length > 0 && (
        <ul
          className="absolute left-[-10px] top-full mt-2 w-full z-100 bg-background rounded-2xl shadow-lg p-2 flex flex-col gap-2"
          style={{
            boxShadow:
              "-4px -4px 12px #FAFBFF, 4px 4px 12px var(--color-shadow), 0 0 10px rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          {newsSuggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 rounded-xl cursor-pointer xs:text-sm lg:text-base font-medium text-text-primary bg-background hover:bg-accent transition-all duration-200 neumorphic-suggestion"
              style={{
                boxShadow:
                  "inset -2px -2px 6px #FAFBFF, inset 2px 2px 6px var(--color-shadow)",
              }}
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
      )}
    </div>
  );
};

export default SearchInput;
